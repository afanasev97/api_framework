import { App } from "../src/app";
import { boot } from "../src/main";
import request from "supertest";

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe("Users E2E", () => {
	it("Register - error", async () => {
		const res = await request(application.app).post("/users/register").send({
			email: "a@a.com",
			password: "1",
		});
		expect(res.statusCode).toBe(422);
	});

	it("Login - success", async () => {
		const res = await request(application.app).post("/users/login").send({
			email: "alex@m.ru",
			password: "alex123",
		});
		expect(res.body.jwt).not.toBeUndefined();
	});

	it("Login - error", async () => {
		const res = await request(application.app).post("/users/login").send({
			email: "a@a.com",
			password: "112",
		});
		expect(res.statusCode).toBe(401);
	});

	it("Info - success", async () => {
		const login = await request(application.app).post("/users/login").send({
			email: "alex@m.ru",
			password: "alex123",
		});
		const res = await request(application.app)
			.get("/users/info")
			.set("Authorization", `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe("alex@m.ru");
	});

	it("Info - error", async () => {
		const login = await request(application.app).post("/users/login").send({
			email: "alex@m.ru",
			password: "alex123",
		});
		const res = await request(application.app)
			.get("/users/info")
			.set("Authorization", `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	application.close();
});
