import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import "reflect-metadata";

@injectable()
export class UserController extends BaseController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: "/login", method: "get", func: this.login },
			{ path: "/register", method: "post", func: this.register }
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, "Authorize error"));
		// this.ok(res, "login");
	}
	
	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, "register");
	}
}