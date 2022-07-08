import { NextFunction, Request, Response, Router } from "express";
import { addPackage,editPackage,deletePackage,getAllPackages,getPackageById,addPackageFeature, editPackageFeature,deletePackageFeature, getAllPackageFeatures, getPackageFeatureById, addpayAsYouGoPackage, editpayAsYouGoPackage, deletepayAsYouGoPackage, getpayAsYouGoPackageById, getAllpayAsYouGoPackage } from "../../../controllers/admin/package/adminPackageController";
import ErrorResponse from "../../../utils/errorResponse";
export const adminPackageRouter = Router();
adminPackageRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const result = await addPackage(body);
        if (result)
            res.status(201).send({ "message": "Package added successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Package already exist or invalid fields`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
adminPackageRouter.patch("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await editPackage(req.body);
        if (result)
            res.status(200).send({ "message": "Package details updated successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Package details updation failed`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.delete("/id/:packageId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { packageId},
        } = req;
        const result = await deletePackage(Number(packageId))
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "No such package", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully deleted details for package ID:${packageId}`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.get("/id/:packageId", async (req: Request, res: Response, next: NextFunction) => {
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
adminPackageRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
adminPackageRouter.post("/feature", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const result = await addPackageFeature(body);
        if (result)
            res.status(201).send({ "message": "Package feature added successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Package feature already exist or invalid fields`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
adminPackageRouter.patch("/feature", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await editPackageFeature(req.body);
        if (result)
            res.status(200).send({ "message": "Package feature details updated successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Package feature details updation failed`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.delete("/feature/:packageFeatureId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { packageFeatureId},
        } = req;
        const result = await deletePackageFeature(Number(packageFeatureId))
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "No such package feature", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully deleted details for package feature ID:${packageFeatureId}`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.get("/feature/:packageFeatureId", async (req: Request, res: Response, next: NextFunction) => {
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
adminPackageRouter.get("/feature", async (req: Request, res: Response, next: NextFunction) => {
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
adminPackageRouter.post("/pay/package", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const result = await addpayAsYouGoPackage(body);
        if (result)
            res.status(201).send({ "message": "Pay as you go package details added successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Pay as you go package details already exist or invalid fields`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
adminPackageRouter.patch("/pay/package", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await editpayAsYouGoPackage(req.body);
        if (result)
            res.status(200).send({ "message": "Pay as you go package details updated successfully", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": `Pay as you go package details updation failed`, "status": "Failed", "result": null });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.delete("/pay/package/:payAsYouGoPackageId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { payAsYouGoPackageId},
        } = req;
        const result = await deletepayAsYouGoPackage(Number(payAsYouGoPackageId))
        if (!result) {
            res.status(400).send({ "error": "Wrong ID", "message": "No such Pay as you go package", "status": "Failed", "result": null });
        }
        else {
            res.status(200).send({ "error": null, "message": `Sucessfully deleted details for Pay as you go package of ID:${payAsYouGoPackageId}`, "status": "Success", "result": result }
            );
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }

});
adminPackageRouter.get("/pay/package/:payAsYouGoPackageId", async (req: Request, res: Response, next: NextFunction) => {
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
adminPackageRouter.get("/pay/package", async (req: Request, res: Response, next: NextFunction) => {
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
