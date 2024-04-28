import { App } from "./app";
import { ExecptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootsrap() {
	const logger = new LoggerService();
	const app = new App(
		logger,
		new UserController(logger),
		new ExecptionFilter(logger)
	);
	await app.init();
}

bootsrap();