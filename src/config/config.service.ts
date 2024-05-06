import { inject, injectable } from "inversify";
import { IConfigService } from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error(`[ConfigService] Error loading .env file: ${result.error}`);
		} else {
			this.logger.log(`[ConfigService] Success loading .env file`);
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
