import express from "express";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
	console.log("Users middleware ", Date.now());
	next();
})

userRouter.post("/login", (req, res) => {
	res.send("login");
});

userRouter.post("/register", (req, res) => {
	res.send("register");
});

userRouter.get("/err", (req, res) => {
	throw new Error("user error");
});

export { userRouter };