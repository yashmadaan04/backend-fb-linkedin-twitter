import { NextFunction, Request, Response, Router } from "express";
import { getAllPackages,getPackageById, getAllPackageFeatures, getPackageFeatureById, getpayAsYouGoPackageById, getAllpayAsYouGoPackage } from "../../../controllers/web/package/webPackageController";
import ErrorResponse from "../../../utils/errorResponse";
export const webPackageRouter = Router();
webPackageRouter.get("/id/:packageId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { packageId },
        } = req;
        const result = await getPackageById(Number(packageId));
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get package detail", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched package detail`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webPackageRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllPackages();
        if (!result) {
            res.status(400).send({ "error": "No packages found", "message": "Could not get packages details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all packages details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPackageRouter.get("/feature/:packageFeatureId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { packageFeatureId },
        } = req;
        const result = await getPackageFeatureById(Number(packageFeatureId));
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get package feature detail", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched package feature detail`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webPackageRouter.get("/features", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllPackageFeatures();
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get package feature details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all package feature details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webPackageRouter.get("/pay/package/:payAsYouGoPackageId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { payAsYouGoPackageId },
        } = req;
        const result = await getpayAsYouGoPackageById(Number(payAsYouGoPackageId));
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "Could not get Pay as you go package detail", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched Pay as you go package detail`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
webPackageRouter.get("/pay/package", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllpayAsYouGoPackage();
        if (!result) {
            res.status(400).send({ "error": "Not found", "message": "Could not get Pay as you go package details", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully fetched all Pay as you go package details`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});