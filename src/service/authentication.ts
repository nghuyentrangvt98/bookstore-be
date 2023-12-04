import Authentication from "../utils/authentication";
import { getUserByUsername, getUserById } from "../repo/users";
import jwt from "jsonwebtoken";
import { secretKey } from "../setting";

interface IAuthenticationService {
  verifyUser(username: string, password: string): Promise<string>;
}

export class AuthenticationService implements IAuthenticationService {
  async verifyUser(username: string, password: string): Promise<string> {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("wrong username or password");
    }
    // check password
    let compare = await Authentication.verifyPassword(
      password,
      user.hashed_password
    );

    // generate token
    if (compare) {
      return Authentication.generateToken(user.id);
    }
    return "";
  }
}

export const verifyJWT = async (token: string): Promise<any> => {
  const credential: any = jwt.verify(token, secretKey);
  if (credential) {
    const user = await getUserById(credential.userId);
    return {
      user: user,
      credential: credential,
    };
  }
  return null;
};
