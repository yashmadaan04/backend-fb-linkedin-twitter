import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants/constants";

export const authenticate = (): RequestHandler => async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.method.toLowerCase() === "options") {
    return next();
  }

  const token = <string>request.headers["x-access-key"];
  if (!token) {
    return response.status(401).json({ error: "No credentials provided" });
  }
  try {
    const { user_id, auth_type  } = <{ user_id: number; auth_type:number; }>(
      jwt.verify(token, ACCESS_TOKEN_SECRET)
    );
      request.user_id = user_id;
      request.auth_type = auth_type;
     // request.user_type = user_type
      
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(403).json({ error: "access_token_expired" });
    }
    return response.status(401).json({ error: "No credentials provided" });
  }
};

