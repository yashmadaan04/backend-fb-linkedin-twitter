import prisma from '../../../database/database';
export const addPost = async (body: any,userId:number) => {
    try {
      const { postText,postFileUrl,postContentType,promotionId,userPageId,postAvailability} = body;
      const posts= await prisma.userPost.create({
        data: {                 
            UserID:userId,                 
            PostDateTime: new Date(),              
            PostText:postText,          
            PostFileUrl:postFileUrl,             
            PostContentType:postContentType,           
            TotalLikes:0,
            TotalShares:0,
            TotalComments:0,           
            PromotionID:promotionId,   
            UserPageID:userPageId,
            PostAvailability:postAvailability,         
            IsActive:true
        }
      });
      if(posts)
        return "Success"
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message);
    }
  }
export const editPost = async (body: any,userId:number) => {
  try {
    const { postId,postText,postFileUrl,postContentType,postAvailability} = body;
    const posts: any = await prisma.userPost.update({
      where: {
        ID: postId
      },
      data: {
        UserID:userId,                 
        PostText:postText,          
        PostFileUrl:postFileUrl,             
        PostContentType:postContentType,                        
        PostAvailability:postAvailability,         
      }
    });
    if (posts)
      return "Success";
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
}
export const deletePost = async (postId: number) => {
  try {
    const posts = await prisma.userPost.update({
      where: {
        ID: postId
      },
      data: {
        IsActive: false
      }
    })
    if (posts)
      return "Success"
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
}
export const getAllPosts = async () => {
  try {
    const result = await prisma.userPost.findMany({
      include:{
        PostComments:true,
        PostReactions:true,
        PostToBeHiddenFrom:true
      },
      orderBy:{
        ID:'desc'
      }
    });
    return result
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
};
export const getAllPostsByPagination = async (limit:number,offset:number) => {
  try {
    const result = await prisma.userPost.findMany({skip: offset,
      take: limit});
    return result
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
};
export const getAllPostsByUser = async (userId:number) => {
  try {
    const result = await prisma.userPost.findMany({
      where:{
        UserID:userId
      },
      include:{
        PostComments:true,
        PostReactions:true,
        PostToBeHiddenFrom:true
      }
    });
    return result
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
};
export const getAllPostsForUser = async (userId:number,limit:number,offset:number) => {
  try {
    const result = await prisma.userConnection.findMany({
      skip: offset,
      take: limit,
      where:{
        OR:[
        {UserID1:userId},
        {UserID2:userId}
        ],
        IsConnected:true
      },
      select:{
        UserID1:true,
        UserID2:true
        
      }
    });
    const userIds: number[] = [];
    result.forEach((x: any) => {
      if (!userIds.includes(x.UserID2,x.UserID1))
      userIds.push(x.UserID1,x.UserID2)
    })
    if (userIds){
      const User = await prisma.userPost.findMany({
        where:{
          UserID:{in:userIds}
        },
      include:{
        PostComments:true,
        PostReactions:true,
        PostToBeHiddenFrom:true
      },
      orderBy:{
        ID:"desc"
      }
      });
      return User
    } 
    return result
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message);
  }
};







// export const addPostComments = async (body: any) => {
//   try {
//     const { postId,parentCommentId,userId,commentText,commentFileUrl,commentType,totalLikes,isActive} = body;
//     const posts= await prisma.postComments.create({
//       data: {   
//           PostID:postId,
//           ParentCommentID:parentCommentId,              
//           UserID:userId,                 
//           CommentDateTime: new Date(),              
//           CommentText:commentText,          
//           CommentFileUrl:commentFileUrl,             
//           CommentType:commentType,           
//           TotalLikes:totalLikes,         
//           IsActive:isActive
//       }
//     });
//     if(posts)
//       return "Success"
//   } catch (error) {
//     if (error instanceof Error)
//       throw new Error(error.message);
//   }
// }
// export const editPostComments = async (body: any) => {
//   try {
//     const { postCommentId,postId,parentCommentId,userId,commentText,commentFileUrl,commentType,totalLikes,isActive} = body;
//     const posts: any = await prisma.postComments.update({
//       where: {
//         ID: postCommentId
//       },
//       data: {
//           PostID:postId,
//           ParentCommentID:parentCommentId,              
//           UserID:userId,                 
//           CommentDateTime: new Date(),              
//           CommentText:commentText,          
//           CommentFileUrl:commentFileUrl,             
//           CommentType:commentType,           
//           TotalLikes:totalLikes,         
//           IsActive:isActive
//       }
//     });
//     if (posts)
//       return "Success";
//   } catch (error) {
//     if (error instanceof Error)
//       throw new Error(error.message);
//   }
// }
// export const deletePostComments = async (postCommentId: number) => {
//   try {
//     const posts = await prisma.postComments.update({
//       where: {
//         ID: postCommentId
//       },
//       data: {
//         IsActive: false
//       }
//     })
//     if (posts)
//       return "Success"
//   } catch (error) {
//     if (error instanceof Error)
//       throw new Error(error.message);
//   }
// }
// export const getAllPostComments = async () => {
//   try {
//     const result = await prisma.postComments.findMany();
//     return result
//   } catch (error) {
//     if (error instanceof Error)
//       throw new Error(error.message);
//   }
// };