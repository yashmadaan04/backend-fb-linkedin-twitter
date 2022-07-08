import { NextFunction, Request, Response, Router } from "express";
import { getAllUserFbPages, postToFb } from "../../../controllers/web/facebook/webFacebookController";
import ErrorResponse from "../../../utils/errorResponse";
import { authenticate } from "../../../middlewares/authenticate";
export const webFacebookRouter = Router();

webFacebookRouter.get("/user/pages",authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllUserFbPages(req.user_id);
        if(result == "No Accounts")
            res.status(200).send({ "error":"No Account Linked","message": "No Account Linked ", "status": "Failed", "result": result });
        else
            res.status(200).send({ "message": "Fetched User Pages ", "status": "Success", "result": result });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

webFacebookRouter.post("/user/page", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await postToFb(req.body);
        if(result)
            res.status(200).send({ "message": "Posted To Fb ", "status": "Success", "result": result });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

