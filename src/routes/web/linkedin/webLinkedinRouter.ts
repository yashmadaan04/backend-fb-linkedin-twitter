import { NextFunction, Request, Response, Router } from "express";
import { postToLinkedin } from "../../../controllers/web/linkedin/webLinkedinController";
import ErrorResponse from "../../../utils/errorResponse";
import { authenticate } from "../../../middlewares/authenticate";
export const webLinkedinRouter = Router();

webLinkedinRouter.post("/",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result:any = await postToLinkedin(req.body,req.user_id);
        if (result)
            res.status(200).send({ "message": "Posted To Linkedin ", "status": "Success", "result": result });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

