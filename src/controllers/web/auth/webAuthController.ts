import crypto from "crypto";
import prisma from '../../../database/database';
import { generateAccessToken } from "../../../helpers/generateJwtToken";
import generateRandomNumber from '../../../helpers/generateOtp';
import { hashPassword } from "../../../helpers/hashPassword";
import moment from "moment";
import bcrypt from "bcrypt";

export const webUserSignUp = async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        Email: email,
        AuthenticationTypeID:1
      }
    })

    if (getUser)
      return 'User Registered'
    else {
      const salt = bcrypt.genSaltSync(12);
      const user = await prisma.user.create({
        data: {
          UserTypeID: 1,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Phone: phone,
          PasswordHash: hashPassword(password, salt),
          PasswordSalt: salt,
          AuthenticationTypeID: 1,
          CreatedOn: new Date(),
          UpdatedOn: new Date(),
          IsActive: true
        }
      })
      const accessToken = await generateAccessToken(email, 1)
      return {
        AccessToken: accessToken,
        UserID: user.ID
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const otp = generateRandomNumber();
    console.log(otp, token)
    const user = await prisma.user.findFirst({ where: { Email: email } })
    if (!user) {
      return "No User"
    } else {
      const IssueDateTime = new Date()
      const ExpiryDateTime = new Date(new Date().getTime() + (10 * 60000))
      const passwordreset = await prisma.passwordReset.create({
        data: {
          UserID: user.ID,
          PasswordToken: token,
          Otp:otp,
          IssueDateTime: IssueDateTime,
          IsValid: false,
          ExpiryDateTime: ExpiryDateTime,
        }
      });
      const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
      const mailchimp = mailchimpFactory("5f8569bac88a3a062dde35f256a59e16-us18");
      // const mailchimp = require("mailchimp_transactional")(
      //   "5f8569bac88a3a062dde35f256a59e16-us18"
      // );

      const message = {
        from_email: "ashnalilac@gmail.com",
        subject: "Hello world",
        text: otp,
        to: [
          {
            email: "ashnakc2020@gmail.com",
            type: "to"
          }
        ]
      };

      async function run() {
        const response = await mailchimp.messages.send({
          message
        });
        console.log(response);
      }
      run();

      return user;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);

  }
}

export const updateTwitterDetails = async (data: any, userID: number) => {
  try {
    let twitterAccount: any = [];
    if (userID) {
      twitterAccount = await prisma.linkedAccount.findMany({
        where: {
          UserID: userID,
          AuthenticationTypeID: 3
        }
      })
      if (twitterAccount.length > 0) {
        twitterAccount = await prisma.linkedAccount.updateMany({
          where: {
            UserID: userID,
            AuthenticationTypeID: 3
          },
          data: {
            AccessToken: data.token,
            ProfileID: data.id,
            TokenSecret: data.tokenSecret,
            AuthenticationTypeID: 3,
          }
        })
      } else {
        twitterAccount = await prisma.linkedAccount.create({
          data: {
            AccessToken: data.token,
            ProfileID: data.id,
            TokenSecret: data.tokenSecret,
            AuthenticationTypeID: 3,
            UserID: userID
          }
        })
      }
    }
    return twitterAccount;
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}
export const changePassword = async (token: string, password: string, userId: number) => {
  try {
    const passwordResetDetails = await prisma.passwordReset.findFirst({ where: { UserID: userId, PasswordToken: token } })
    const passwordToken = passwordResetDetails?.PasswordToken;
    if (passwordToken == token) {
      const expiryDateTime: any = passwordResetDetails?.ExpiryDateTime;
      const now = new Date();
      const exp = new Date(expiryDateTime)
      const isafter = moment(exp).isAfter(now);
      const salt = bcrypt.genSaltSync(12);
      if (isafter == true) {
        const user = await prisma.user.update({
          where: { ID: userId },
          data: {
            PasswordHash: hashPassword(password, salt),
            PasswordSalt: salt
          }
        })
        if (user)
          return true;
      }
      return false;
    }
    return false
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}

export const loginWebUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        Email: email,
        AuthenticationTypeID: 1
      }
    })
    const hashPassword = user?.PasswordHash;
    let isMatch = false;
    if (hashPassword)
      isMatch = await bcrypt.compare(password, hashPassword);

    if (isMatch && user) {
      await prisma.userLogin.create({
        data: {
          IsEmailLogin: true,
          UserID: user.ID,
          AuthenticationTypeID: 1,
          LoggedOn: new Date(),
        }
      })
      const accessToken = await generateAccessToken(email, 1)
      return {
        AccessToken: accessToken,
        UserID: user.ID
      }
    } else {
      return false
    }

  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}

export const verifyOtp = async (otp: number,userId:number,token:string) => {
  try {
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        UserID:userId,
        PasswordToken:token
      }
    })
    const otpKey = passwordReset?.Otp
    if ( otpKey === otp ){
      return true
    } else{
      return false
    }

  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}

export const getLinkedAccountsByUserId = async (userId: number) => {
  try {
    const linkedAccounts = await prisma.linkedAccount.findMany({
      where: {
        UserID: userId,
      },
      select:{
        AccessToken:true,
        TokenSecret:true,
        UserID:true,
        AuthenticationTypeID:true,
        AuthenticationType:{
          select:{ ID:true,ThirdPartyName:true, ThirdPartyIcon:true,IsEnabled:true }
        }
      }
    })
    return linkedAccounts;

  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      throw new Error(error.message);
  }
}