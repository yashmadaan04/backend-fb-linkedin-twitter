// Function for generating jwt tokens
import prisma from '../database/database'
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../constants/constants";

export const generateJwtToken = async (user: any) => {
  const token = jwt.sign(user, "secret", {
    expiresIn: '7d',
  });
  return token;
};

export const generateAccessToken = async (
  email: string,
  authenticationTypeId: number
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        Email: email,
        AuthenticationTypeID: authenticationTypeId
      }
    })
    if (!user) {
      return null;
    }
    const token = jwt.sign(
      { user_id: user.ID, auth_type: user.AuthenticationTypeID },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};