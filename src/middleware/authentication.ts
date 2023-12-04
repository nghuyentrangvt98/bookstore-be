import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../service/authentication";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.headers.authorization) {
    return res.status(401).send("invalid token!");
  }

  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const { credential, user } = await verifyJWT(token);
    if (credential) {
      req.app.locals.credential = credential;
      req.body.user = user;
      return next();
    }
    return res.status(401).send("invalid token!");
  } catch (err) {
    return res.status(401).send("invalid token!");
  }
};
