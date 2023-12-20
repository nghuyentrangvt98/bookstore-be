import express from "express";

import { userRepo } from "../repo";

import Authentication from "../utils/authentication";
import { UserRole } from "../schemas/enum";
import { NotFound } from "../exc/others";
import { PasswordNotMatch } from "../exc/auth";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const filter = (req.query.filter as string) || "{}";
  const users = await userRepo.find(JSON.parse(filter));
  const resUsers = users.map((user) => {
    delete user.hashedPassword;
    return user;
  });
  return res.json(resUsers);
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const user = await userRepo.delete(id);
  delete user.hashedPassword;
  return res.json(user);
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const user = await userRepo.findById(id);
  if (!user) {
    throw new NotFound("user", id);
  }
  if (req.body.password) {
    req.body.hashedPassword = await Authentication.hashPassword(
      req.body.password
    );
  }
  req.body.username = user.username;
  await userRepo.update(id, req.body);
  const userUpdated = await userRepo.findById(id);
  delete userUpdated.hashedPassword;
  return res.status(200).json(userUpdated).end();
};

export const updateMe = async (req: express.Request, res: express.Response) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword && newPassword) {
    if (
      !(await Authentication.verifyPassword(
        currentPassword,
        req.body.user.hashedPassword
      ))
    ) {
      throw new PasswordNotMatch();
    }
    req.body.hashedPassword = await Authentication.hashPassword(newPassword);
  }

  await userRepo.update(req.body.user._id, req.body);
  const userUpdated = await userRepo.findById(req.body.user._id);
  delete userUpdated.hashedPassword;
  return res.status(200).json(userUpdated).end();
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  req.body.hashedPassword = await Authentication.hashPassword(
    req.body.password
  );
  const currentUser = req.body.user;
  if (!currentUser || currentUser.role != UserRole.ADMIN) {
    req.body.role = UserRole.USER;
  }
  const user = await userRepo.create(req.body);
  delete user.hashedPassword;
  return res.status(201).json(user).end();
};
