import prisma from '../../../database/database';
import axios from 'axios';
export const postToLinkedin = async (body: any,userId:number) => {
    try {
        const linkedAccount = await prisma.linkedAccount.findFirst({
            where:{
                UserID:userId,
                AuthenticationTypeID:4
            }
        });
        const json = {
            "author": "urn:li:person:"+linkedAccount?.ProfileID,
               "lifecycleState": "PUBLISHED",
               "specificContent": {
                   "com.linkedin.ugc.ShareContent": {
                       "shareCommentary": {
                           "text": body.message
                       },
                       "shareMediaCategory": "NONE"
                   }
               },
               "visibility": {
                   "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
               }
       };
        
        const res = await axios.post(`${process.env.LINKEDIN_API_URL}/v2/ugcPosts` ,json, { headers: {"Authorization" : `Bearer ${linkedAccount?.AccessToken}`} })
        
        return "success";
    } catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
}