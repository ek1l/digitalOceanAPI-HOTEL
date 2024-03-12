import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AnyZodObject } from "zod";
import { AppError } from "../errors/appError.erros";
import { injectable } from "tsyringe";

interface IRequestSchemas {
   params?: AnyZodObject;
   body?: AnyZodObject;
   query?: AnyZodObject;
}

@injectable()
export class Validates {
   validateBody(schemas: IRequestSchemas) {
      return async (req: Request, res: Response, next: NextFunction) => {
         if (schemas.params) {
            req.params = await schemas.params.parseAsync(req.params);
         }

         if (schemas.body) {
            req.body = await schemas.body.parseAsync(req.body);
         }

         if (schemas.query) {
            req.query = await schemas.query.parseAsync(req.query);
         }
         next();
      };
   }

   validateToken(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
         throw new AppError(401, "Token is required",);
      }

      const secret = process.env.SECRET_KEY_TOKEN as string;
      jwt.verify(token, secret, (err, decode) => {
         if (err) {
            throw new AppError(401, "Token Expired")
         }
         res.locals.decode = jwt.decode(token);
         next();
      });
   }

   validateAdminRole (req: Request, res: Response, next: NextFunction) {
      const token = res.locals.decode
      if(token.role != "admin"){
         throw new AppError(401, "You do not have sufficient privileges to perform this action.")
      }
      next()
   }
}