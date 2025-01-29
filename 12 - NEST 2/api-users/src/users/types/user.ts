import { Request } from "express";

export interface RequestUser extends Request {
    user: {
        first_name: string;
        last_name: string;
        role: string;
    }
}