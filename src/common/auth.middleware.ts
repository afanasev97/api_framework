import { JwtPayload, verify } from "jsonwebtoken";
import { IMiddleWare } from "./middleware.interface";
import { NextFunction, Response, Request } from "express";

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					const payloadWithEmail = payload as JwtPayload; // Assert that payload is a JwtPayload object
					req.user = payloadWithEmail.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
