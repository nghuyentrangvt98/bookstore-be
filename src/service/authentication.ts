import Authentication from "../utils/authentication";
import { userRepo } from "../repo";
import jwt from "jsonwebtoken";
import { secretKey } from "../setting";

interface IAuthenticationService {
  verifyUser(username: string, password: string): Promise<string>;
}

export class AuthenticationService implements IAuthenticationService {
  async verifyUser(username: string, password: string): Promise<string> {
    const user = await userRepo.FindByUsername(username);

    if (!user) {
      throw new Error("wrong username or password");
    }
    // check password
    let compare = await Authentication.verifyPassword(
      password,
      user.hashedPassword
    );

    // generate token
    if (compare) {
      return Authentication.generateToken(user._id);
    }
    return "";
  }
}

export const verifyJWT = async (token: string): Promise<any> => {
  const credential: any = jwt.verify(token, secretKey);
  if (credential) {
    const user = await userRepo.findById(credential.userId);
    return {
      user: user,
      credential: credential,
    };
  }
  return null;
};
