import { createHash, isValidPassword } from "../utils.js";
import Services from "./service.manager.js";
import { userDao } from "../daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { CustomError, ERRORS_DICTIONARY, NotFoundError } from "../utils/error.manager.js";

class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken = (user) => {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
  };

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (user) => {
    try {
      const { email, password, isGithub } = user;
      const existUser = await this.getUserByEmail(email);
      if (existUser) throw new NotFoundError(ERRORS_DICTIONARY.USER_NOT_FOUND);
      if (isGithub) {
        const newUser = await this.dao.register(user);
        return newUser;
      }
      // const cart = cartService.create()
      const newUser = await this.dao.register({
        ...user,
        password: createHash(password),
        // cart: cart._id
      });
      return newUser;
    } catch (error) {
      console.log('HAY ERROR EN SERVICE')
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.getUserByEmail(email);
      if (!userExist) throw new CustomError(ERRORS_DICTIONARY.USER_NOT_FOUND, 404);
      const passValid = isValidPassword(password, userExist);
      if (!passValid) throw new Error("incorrect credentials");
      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService();
