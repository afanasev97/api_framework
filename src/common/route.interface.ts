import { NextFunction, Response, Request, Router } from "express";
import { IMiddleWare } from "./middleware.interface";

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "get" | "post" | "put" | "delete" | "patch">;
	middlewares?: IMiddleWare[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
