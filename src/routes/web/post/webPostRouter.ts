import { NextFunction, Request, Response, Router } from "express";
import { addPost, deletePost, editPost, getAllPosts, getAllPostsByPagination, getAllPostsByUser, getAllPostsForUser } from "../../../controllers/web/post/webPostController";
import ErrorResponse from "../../../utils/errorResponse";
import { authenticate } from "../../../middlewares/authenticate";
export const webPostRouter = Router();
webPostRouter.post("/",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const result = await addPost(body,req.user_id);
        if (result)
            res.status(201).send({ "message": "Post added successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Post already exist or invalid fields`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPostRouter.patch("/",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await editPost(req.body,req.user_id);
        if (result == "Success")
            res.status(200).send({ "message": "User post details updated successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `User post details updation failed`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webPostRouter.delete("/id/:postId",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { postId},
        } = req;
        const result = await deletePost(Number(postId))
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "No such post", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully deleted details for post ID:${postId}`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webPostRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllPosts();
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get user post details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all user post details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPostRouter.get("/get-by-page",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query:{limit,offset}} = req;
        const result = await getAllPostsByPagination(Number(limit),Number(offset));
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get user post details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all user post details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPostRouter.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { userId},
        } = req;
        const result = await getAllPostsByUser(Number(userId));
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get user post details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all user post details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPostRouter.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params:{userId},query:{limit,offset}
        } = req;
        const result = await getAllPostsForUser(Number(userId),Number(limit),Number(offset));
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get user post and user connection details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all user post and user connection details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
// webPostRouter.post("/comments",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { body } = req;
//         const result = await addPostComments(body);
//         if (result)
//             res.status(201).send({ "message": "Post comments added successfully", "status": "Success", "result": result });
//         else
//             res.status(400).send({ "message": `Post comments already exist or invalid fields`, "status": "Failed", "result": null });
//     } catch (error) {
//         if (error instanceof Error)
//             next(new ErrorResponse(error.message, 500));
//     }
// });
// webPostRouter.patch("/comments",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await editPostComments(req.body);
//         if (result)
//             res.status(200).send({ "message": "Post comment details updated successfully", "status": "Success", "result": result });
//         else
//             res.status(400).send({ "message": `Post comment details updation failed`, "status": "Failed", "result": null });
//     } catch (error) {
//         if (error instanceof Error)
//             next(new ErrorResponse(error.message, 500));
//     }

// });
// webPostRouter.delete("/comments/id/:postCommentId",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const {
//             params: { postCommentId},
//         } = req;
//         const result = await deletePostComments(Number(postCommentId))
//         if (!result) {
//             res.status(400).send({ "error": "Wrong ID", "message": "No such post comments", "status": "Failed", "result": null });
//         }
//         else {
//             res.status(200).send({ "error": null, "message": `Sucessfully deleted details for post comments of ID:${postCommentId}`, "status": "Success", "result": result }
//             );
//         }
//     } catch (error) {
//         if (error instanceof Error)
//             next(new ErrorResponse(error.message, 500));
//     }

// });
// webPostRouter.get("/comments",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await getAllPostComments();
//         if (!result) {
//             res.status(400).send({ "error": "Not found", "message": "Could not get user post details", "status": "Failed", "result": null });
//         }
//         else {
//             res.status(200).send({ "error": null, "message": `Sucessfully fetched all user post details`, "status": "Success", "result": result }
//             );
//         }
//     } catch (error) {
//         if (error instanceof Error)
//             next(new ErrorResponse(error.message, 500));
//     }
// });