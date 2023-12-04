import express from "express";

import {
  deleteUserById,
  getUsers,
  getUserById,
  createOneUser,
} from "../repo/users";

import Authentication from "../utils/authentication";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    const res_users = users.map((user) => {
      delete user.hashed_password;
      return user;
    });
    return res.status(200).json(res_users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();
    delete user.hashed_password;
    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    req.body.hashed_password = await Authentication.hashPassword(
      req.body.password
    );
    const user = await createOneUser(req.body);
    delete user.hashed_password;
    return res.status(201).json(user).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};
