import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';

export class App {
	app: Express;
	server: Server;
	port: number;

	constructor() {
		this.app = express();
		this.port = 8000;
	}

	useRoutes() {
		this.app.use("/users", userRouter);
	}

	public async init() {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		// TODO use logger when it will be implemented
		console.log(`Server running at http://localhost:${this.port}`);
	}
}