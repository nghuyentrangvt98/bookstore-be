import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../service/authentication";
import { UserRole, UserRoleWithGuess } from "../schemas/enum";

const verifyAccessToken = async (req: Request): Promise<boolean> => {
  if (!req.headers.authorization) {
    return false;
  }

  const token: string = req.headers.authorization.split(" ")[1];
  try {
    const { credential, user } = await verifyJWT(token);
    if (credential) {
      req.app.locals.credential = credential;
      req.body.user = user;
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (await verifyAccessToken(req)) {
    return next();
  }
  return res.status(401).send({ error: "invalid token!" });
};

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (await verifyAccessToken(req)) {
    if (req.body.user.role != UserRole.ADMIN) {
      return res.status(403).send({
        error: "not enough permission to perform this action!",
      });
    }
    return next();
  }
  return res.status(401).send({ error: "invalid token!" });
};

export const authorizeGuess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.headers.authorization && !req.headers["session-id"]) {
    return res.status(400).send({
      error: "either access token or session-id must be provided!",
    });
  }
  if (req.headers.authorization) {
    return await authorizeUser(req, res, next);
  }
  req.body.user = {
    role: UserRoleWithGuess.GUESS,
    _id: req.headers["session-id"],
  };
  return next();
};
