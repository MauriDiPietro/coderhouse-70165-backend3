import Controllers from "./controller.manager.js";
import { userService } from '../services/user.services.js';
import { httpResponse } from "../utils/http.response.js";

class UserController extends Controllers {
  constructor(){
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      httpResponse.Ok(res, user);
    } catch (error) {
      console.log('PARA POR EL CONTROLLER --> next');
      next(error);
    }
  };
  
  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      res
        .cookie('token', token, { httpOnly: true })
        .json({ message: 'Login OK', token });
    } catch (error) {
      next(error);
    }
  };
  
  privateData = (req, res, next) => {
    try {
      if (!req.user)
        throw new Error("No se puede acceder a los datos del usuario");
      res.json({
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();

