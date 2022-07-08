import { NextFunction, Request, Response, Router } from "express";
import { addProfileContact, editProfileContact, getAllProfilePrivacySettings, getProfileContactById, getProfileContactByUser } from "../../../controllers/web/user/webUserController";
import ErrorResponse from "../../../utils/errorResponse";
export const webUserRouter = Router();
webUserRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const result = await addProfileContact(body);
        if (result)
            res.status(201).send({ "message": "User profile contact details created successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `User profile contact already exist or invalid fields`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webUserRouter.patch("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await editProfileContact(req.body);
        if (result)
            res.status(200).send({ "message": "User profile contact details updated successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `User profile contact details updation failed`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webUserRouter.get("/id/:profileContactId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { profileContactId },
        } = req;
        const result = await getProfileContactById(Number(profileContactId));
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get user profile contact details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched user profile contact details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webUserRouter.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { userId },
        } = req;
        const result = await getProfileContactByUser(Number(userId));
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get user profile contact details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched user profile contact details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webUserRouter.get("/profile-privacy/settings", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllProfilePrivacySettings();
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get profile privacy settings details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched profile privacy settings details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});