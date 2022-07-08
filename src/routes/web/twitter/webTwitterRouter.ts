import { NextFunction, Request, Response, Router } from "express";
import { tweetStatus } from "../../../controllers/web/twitter/webTwitterController";
import ErrorResponse from "../../../utils/errorResponse";
import { authenticate } from "../../../middlewares/authenticate";

export const webTwitterRouter = Router();

webTwitterRouter.post("/tweet",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { statusMessage } = req.body;
        const result:any = await tweetStatus(statusMessage);
        
        if (result)
            res.status(200).send({ "message": "Tweet Succesfully Done", "status": "Success", "result": result });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

