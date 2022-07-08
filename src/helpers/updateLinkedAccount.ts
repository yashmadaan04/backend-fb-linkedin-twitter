
import prisma from '../database/database';

export const updateLinkedAccount = async (profile: any, accessToken: string, tokenSecret: string, AuthenticationTypeId: number,userId:number) => {
    try {
        if (profile) {
            const account = await prisma.linkedAccount.findFirst({
                where: { UserID: userId, AuthenticationTypeID: AuthenticationTypeId }
            })
                if (account) {
                    await prisma.linkedAccount.updateMany({
                        where: { UserID: userId, AuthenticationTypeID: AuthenticationTypeId },
                        data: { AccessToken: accessToken, TokenSecret: tokenSecret }
                    })
                    return true;

                } else {
                    await prisma.linkedAccount.create({
                        data: {
                            AccessToken: accessToken,
                            ProfileID: profile.id,
                            TokenSecret: tokenSecret,
                            AuthenticationTypeID: AuthenticationTypeId,
                            UserID: userId
                        }
                    })
                    return true;
                }
        }
    } catch (error) {
        console.log(error);
        return false;

    }
};

export default updateLinkedAccount