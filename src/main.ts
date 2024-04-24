import { App } from "./app";

async function bootsrap() {
	const app = new App();
	await app.init();
}

bootsrap();