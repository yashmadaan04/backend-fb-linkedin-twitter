import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../../../middlewares/authenticate";
import ErrorResponse from "../../../utils/errorResponse";
import passport from 'passport';
import { webUserSignUp, forgotPassword, updateTwitterDetails, changePassword, loginWebUser, verifyOtp, getLinkedAccountsByUserId } from "../../../controllers/web/auth/webAuthController";
import { generateAccessToken } from "../../../helpers/generateJwtToken";
import updateSocialLoginData from "../../../helpers/updateSocialLoginData";
import updateLinkedAccount from "../../../helpers/updateLinkedAccount";

export const webAuthRouter = Router();

webAuthRouter.get("/fail", async (req: Request, res: Response, next: NextFunction) => {
    res.status(401).send({ "error": null, "message": "Failure", "status": "Failed", "result": [] });
});

webAuthRouter.get("/success", async (req: Request, res: Response, next: NextFunction) => {
    res.status(401).send({ "error": null, "message": "Success", "status": "Success", "result": [] });
});

//router for facebook login
webAuthRouter.get("/facebook", passport.authenticate("facebook",
    { scope: ['email', 'publish_to_groups', 'pages_manage_posts'] }));

//router for faceBook linking 

webAuthRouter.get(`/:userId/facebook`, async (req: any, res, next) => {
    const { userId } = req.params
    req.session.user_id = userId;
    const authenticator = passport.authenticate("facebook", { scope: ['email', 'publish_to_groups', 'pages_manage_posts'] })
    authenticator(req, res, next)
})

webAuthRouter.get('/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: '/web/auth/fail' }), async function (req: any, res: any, next: any) {
        try {
            const data = {
                id: req.user.id,
                email: req.user._json.email,
                first_name: req.user._json.first_name,
                last_name: req.user._json.last_name,
            }
            const toLinkAccount = req.user.toLinkAccount;
            if (toLinkAccount) {
                const linkedAccountData = await updateLinkedAccount(data, req.user.token, req.user.tokenSecret, 2, Number(req.user.user_id));
                if (linkedAccountData)
                    res.status(200).send({ "message": "Successfully Linked ", "status": "Success", "result": "Success" });
                else
                    res.status(500).send({ "message": "Error", "status": "Failed", "result": "false" });

            } else {
                const user: any = await updateSocialLoginData(data, req.user.token, req.user.tokenSecret, 2);
                if (user) {
                    const accessToken = await generateAccessToken(req.user._json.email, 2);
                    const result = {
                        AccessToken: accessToken,
                        UserID: user
                    }
                    // res.status(200)
                    // .cookie('data', result, {
                    //     expires: new Date(Date.now() + 8 * 3600000),httpOnly: true  // cookie will be removed after 8 hours
                    // })
                    //  .redirect(301,`${process.env.CLIENT_URL}`);
                    res.status(200).send({ "message": "Successfully Logged In", "status": "Success", "result": result });
                } else {
                    res.status(400).send({ "message": "Login Unsuccessfull", "status": "Failed", "result": [] });
                }
            }

        } catch (error) {
            if (error instanceof Error)
                next(new ErrorResponse(error.message, 500));
        }
    });


//router for twitter linking 
webAuthRouter.get(`/:userId/twitter`, authenticate(), async (req: any, res, next) => {
    const { userId } = req.params
    req.session.user_id = userId;
    const authenticator = passport.authenticate('twitter')
    authenticator(req, res, next)
})

webAuthRouter.get('/twitter/callback', passport.authenticate('twitter',
    { failureRedirect: '/web/auth/fail' }), async function (req: any, res: any, next: NextFunction) {
        try {
            const userID = req.user.user_id;
            const result = await updateTwitterDetails(req.user, Number(userID));
            res.status(200).send({ "error": null, "message": "SuccessFully Linked Twitter", "status": "Success", "result": result });
        } catch (error) {
            if (error instanceof Error)
                next(new ErrorResponse(error.message, 500));
        }
    });

//router for linkedin linking

webAuthRouter.get(`/:userId/linkedin`, async (req: any, res, next) => {
    const { userId } = req.params
    req.session.user_id = userId;
    const authenticator = webAuthRouter.get('/linkedin', passport.authenticate('linkedin'));
    authenticator(req, res, next)
})

//router for linkedin login
webAuthRouter.get('/linkedin', passport.authenticate('linkedin'));

webAuthRouter.get('/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/web/auth/fail' }),
    async function (req: any, res, next: any) {
        try {
            const data = {
                id: req.user.id,
                email: req.user.emails[0].value,
                first_name: req.user.name.givenName,
                last_name: req.user.name.familyName,
            }
            const toLinkAccount = req.user.toLinkAccount;
            if (toLinkAccount) {
                const linkedAccountData = await updateLinkedAccount(data, req.user.token, req.user.tokenSecret, 4, Number(req.user.user_id));
                if (linkedAccountData)
                    res.status(200).send({ "message": "Successfully Linked ", "status": "Success", "result": "Success" });
                else
                    res.status(500).send({ "message": "Error", "status": "Failed", "result": "false" });

            } else {

                const user: any = await updateSocialLoginData(data, req.user.token, req.user.tokenSecret, 4);
                if (user) {
                    const accessToken = await generateAccessToken(req.user.emails[0].value, 4);
                    const result = {
                        AccessToken: accessToken,
                        UserID: user
                    }
                    res.status(200)
                    .cookie('data', result, {
                        expires: new Date(Date.now() + 8 * 3600000),httpOnly: true  // cookie will be removed after 8 hours
                    })
                    .redirect(301,`${process.env.CLIENT_URL}`);
                    //res.status(200).send({ "message": "Successfully Logged In", "status": "Success", "result": result });
                } else {
                    res.status(400).send({ "message": "Login Unsuccessfull", "status": "Failed", "result": [] });
                }
            }
        } catch (error) {
            if (error instanceof Error)
                next(new ErrorResponse(error.message, 500));
        }
    });
//router for google login

webAuthRouter.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

webAuthRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/web/auth/fail' }),
    async function (req: any, res, next: any) {
        try {
            const data = {
                id: req.user.id,
                email: req.user.email,
                first_name: req.user.name.givenName,
                last_name: req.user.name.familyName,
            }
            const user: any = await updateSocialLoginData(data, req.user.token, req.user.tokenSecret, 6);
            if (user) {
                const accessToken = await generateAccessToken(req.user.emails[0].value, 6);
                const result = {
                    AccessToken: accessToken,
                    UserID: user
                }
                res.status(200)
                    .cookie('data', result, {
                        expires: new Date(Date.now() + 8 * 3600000),httpOnly: true  // cookie will be removed after 8 hours
                    })
                    .redirect(301,`${process.env.CLIENT_URL}`);
                //res.status(200).send({ "message": "Successfully Logged In", "status": "Success", "result": result });
            } else {
                res.status(400).send({ "message": "Login Unsuccessfull", "status": "Failed", "result": [] });
            }
        } catch (error) {
            if (error instanceof Error)
                next(new ErrorResponse(error.message, 500));
        }
    });

webAuthRouter.get('/instagram', passport.authenticate('instagram'));
webAuthRouter.get('/instagram/callback', passport.authenticate('instagram',
    { failureRedirect: '/web/auth/fail' }), async function (req: any, res: any, next: NextFunction) {
        try {
            const userID = req.user.user_id;
            // const result = await updateTwitterDetails(req.user, Number(userID));
            //res.status(200).send({ "error": null, "message": "SuccessFully Linked Twitter", "status": "Success", "result": result });
        } catch (error) {
            if (error instanceof Error)
                next(new ErrorResponse(error.message, 500));
        }
    });

webAuthRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body: { firstName, lastName, email, phone, password } } = req;
    const result = await webUserSignUp(firstName, lastName, email, phone, password);
    if (result == "User Registered")
        res.status(400).send({"message":"Email already registered ","status":"Failed","result":null});
    else
        res.status(200).send({ "message": "Registered successfully", "status": "Success", "data": result });
    } catch (error) {
        if (error instanceof Error)
        next(new ErrorResponse(error.message, 500));
    }
    
});
webAuthRouter.post("/forgot-password", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            body: { email },
        } = req;

        const result = await forgotPassword(email);
        if (result === "No User") {
            res.status(500).send({ "message": "Email not registered", "status": "Failed", "result": null });
        } else {
            res.status(200).send({ "message": `Password recovery link has been sent to ${email}`, "status": "Success", "result": null });
        }
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

webAuthRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            body: { email, password },
        } = req;

        const result = await loginWebUser(email, password);
        if (result)
            res.status(200).send({ "message": "Successfully Logged In", "status": "Success", "result": result });
        else
            res.status(400).send({ "message": "Invalid Credentials", "status": "Failed", "result": false });

    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});
webAuthRouter.post("/change-password/:token/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            body: { password }, params: { token, userId }
        } = req;
        const result = await changePassword(token, password, Number(userId));
        if (!result)
            res.status(401).send({ "error": "Token expired or incorrect token", "message": "Token expired or incorrect token", "status": "Failed", "result": false });
        else
            res.status(200).send({ "error": null, "message": "Password Updated", "status": "Success", "result": true });
    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});


webAuthRouter.get("/linked-accounts/:userId", authenticate(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { userId },
        } = req;

        const result: any = await getLinkedAccountsByUserId(Number(userId));
        if (result.length > 0)
            res.status(200).send({ "error": null, "message": "Fetched Total Linked Accounts for user", "status": "Success", "result": result });
        else
            res.status(200).send({ "error": null, "message": "No Accounts Linked", "status": "Success", "result": [] });

    } catch (error) {
        if (error instanceof Error)
            next(new ErrorResponse(error.message, 500));
    }
});

webAuthRouter.post("/verify-otp/:token/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            body: { otp }, params: { token, userId }
        } = req;
        const result = await verifyOtp(otp, Number(userId), String(token));
        if (result) {
            res.status(200).send({ "message": "Otp verified successfully", "status": "Success", "result": true });
        }
        else {
            res.status(400).send({ "error": "Otp expired or incorrect", "message": "Invalid otp", "status": "Failed", "result": false });
        }
    } catch (error) {
        if (error instanceof Error) {
            next(new ErrorResponse(error.message, 500))
        }
    }
});
