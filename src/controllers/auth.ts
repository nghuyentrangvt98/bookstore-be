import { Request, Response } from "express";
import { AuthenticationService } from "../service/authentication";
import { WrongUsernamePassword } from "../exc/auth";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await new AuthenticationService().verifyUser(
    username,
    password
  );
  if (token === "") {
    throw new WrongUsernamePassword();
  }
  const accessToken = { type: "Bearer", accessToken: token };
  return res.status(200).json({
    status: "Ok!",
    message: "Successfully login!",
    result: accessToken,
  });
};

export const verify = async (req: Request, res: Response) => {
  const { user } = req.body;
  delete user["hashedPassword"];
  return res.status(200).json(user).end();
};
