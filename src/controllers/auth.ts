import { Request, Response } from "express";
import { AuthenticationService } from "../service/authentication";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await new AuthenticationService().verifyUser(
      username,
      password
    );
    if (token === "") {
      return res.status(400).json({
        status: "Bad Request!",
        message: "Wrong email or password!",
      });
    }
    const res_token = { type: "Bearer", token: token };
    return res.status(200).json({
      status: "Ok!",
      message: "Successfully login!",
      result: res_token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal server Error!",
      message: "Internal server Error!",
    });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { user } = req.body;
  delete user["hashed_password"];
  console.log(user);
  return res.status(200).json(user).end();
};
