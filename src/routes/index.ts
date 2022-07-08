import { Router } from "express";
import { webAuthRouter } from "./web/auth/webAuthRouter";
import { webPackageRouter } from "./web/package/webPackageRouter";
import { adminPackageRouter } from "./admin/package/adminPackageRouter";
import { webTwitterRouter } from "./web/twitter/webTwitterRouter";
import { webPostRouter } from "./web/post/webPostRouter";
import { webLinkedinRouter } from "./web/linkedin/webLinkedinRouter";
import { webFacebookRouter } from "./web/facebook/webFacebookRouter";
import { webUserRouter } from "./web/user/webUserRouter";



const urlDirectory = [
  { prefix: "/web/auth", router: webAuthRouter },
  { prefix: "/web/package", router: webPackageRouter },
  { prefix: "/web/post", router: webPostRouter },
  { prefix: "/web/user", router: webUserRouter },
  { prefix: "/web/twitter", router: webTwitterRouter },
  { prefix: "/web/linkedin", router: webLinkedinRouter },
  { prefix: "/web/facebook", router: webFacebookRouter },

  { prefix: "/admin/package", router: adminPackageRouter },
];

export const registerRoutes = (): Router => {
  const router = Router();
  urlDirectory.forEach((handler) => {
    router.use(handler.prefix, handler.router);
  });
  return router;
};

