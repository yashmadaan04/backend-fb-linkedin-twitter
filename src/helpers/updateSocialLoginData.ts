
import prisma from '../database/database';

export const updateSocialLoginData = async (profile: any, accessToken: string, tokenSecret: string, AuthenticationTypeId: number) => {
    try {
        let user: any;
        if (profile) {
            user = await prisma.user.findFirst({
                where: { Email: profile.email, AuthenticationTypeID: AuthenticationTypeId }
            })
            if (user) {
                await prisma.userLogin.create({
                    data: {
                        IsEmailLogin: false,
                        UserID: user.ID,
                        AuthenticationTypeID: AuthenticationTypeId,
                        LoggedOn: new Date(),
                    }
                })
                const account = await prisma.linkedAccount.findFirst({
                    where: { UserID: user.ID, AuthenticationTypeID: AuthenticationTypeId }
                })
                if (account) {
                    await prisma.linkedAccount.updateMany({
                        where: { UserID: user.ID, AuthenticationTypeID: AuthenticationTypeId },
                        data: { AccessToken: accessToken, TokenSecret: tokenSecret }
                    })
                } else {
                    await prisma.linkedAccount.create({
                        data: {
                            AccessToken: accessToken,
                            ProfileID: profile.id,
                            TokenSecret: tokenSecret,
                            AuthenticationTypeID: AuthenticationTypeId,
                            UserID: user.ID
                        }
                    })
                }
                return user.ID;
            }
            else {
                user = await prisma.user.create({
                    data: {
                        Email: profile.email,
                        FirstName: profile.first_name,
                        LastName: profile.last_name,
                        AuthenticationTypeID: AuthenticationTypeId,
                        IsActive: true,
                        CreatedOn: new Date(),
                    }
                })
                if (user) {
                    await prisma.userLogin.create({
                        data: {
                            AuthenticationTypeID: AuthenticationTypeId,
                            UserID: user.ID,
                            LoggedOn: new Date(),
                            Token: accessToken,
                            IsEmailLogin: false,
                        }
                    })
                    const account = await prisma.linkedAccount.findFirst({
                        where: { UserID: user.ID, AuthenticationTypeID: AuthenticationTypeId }
                    })
                    if (account) {
                        await prisma.linkedAccount.updateMany({
                            where: { UserID: user.ID, AuthenticationTypeID: AuthenticationTypeId },
                            data: { AccessToken: accessToken, TokenSecret: tokenSecret }
                        })
                    } else {
                        await prisma.linkedAccount.create({
                            data: {
                                AccessToken: accessToken,
                                ProfileID: profile.id,
                                TokenSecret: tokenSecret,
                                AuthenticationTypeID: AuthenticationTypeId,
                                UserID: user.ID
                            }
                        })
                    }
                }
                return user.ID;
            }
        }
    } catch (error) {
        console.log(error);
        return false;

    }
};

export default updateSocialLoginData