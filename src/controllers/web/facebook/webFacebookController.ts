import prisma from '../../../database/database';
import axios from 'axios';
export const getAllUserFbPages = async (userId:number) => {
    try {
        const linkedAccount = await prisma.linkedAccount.findFirst({
            where:{
                UserID:userId,
                AuthenticationTypeID:2
            }
        })
        if(!linkedAccount){
            return "No Accounts"
        }
        const fbPagesDetails = await axios.get(`${process.env.FACEBOOK_GRAPH_API_URL}/me/accounts?access_token=${linkedAccount?.AccessToken}`);
        return fbPagesDetails.data;
    } catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
}

export const postToFb = async (body:any) => {
    try {
        const res = await axios.post(`${process.env.FACEBOOK_GRAPH_API_URL}/me/feed?access_token=${body.access_token}`,{message:body.message});
        if(res)
            return "Success"
    } catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
}

