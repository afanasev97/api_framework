import { UserModel } from "@prisma/client";
import { Container } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { UserService } from "./users.service";
import { IUsersService } from "./users.service.interface";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.IUsersService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	usersService = container.get<IUsersService>(TYPES.IUsersService);
});

let createdUser: UserModel | null;

describe("User Service", () => {
	it("createUser", async () => {
		configService.get = jest.fn().mockReturnValueOnce("1");
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: "a@a.com",
			name: "a",
			password: "1",
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual("1");
	});

	it("validateUser - succes", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: "a@a.com",
			password: "1",
		});
		expect(res).toBeTruthy();
	});

	it("validateUser - wrong pass", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: "a@a.com",
			password: "2",
		});
		expect(res).toBeFalsy();
	});

	it("validateUser - wrong user", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: "a1@a.com",
			password: "1",
		});
		expect(res).toBeFalsy();
	});
});
