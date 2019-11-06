import { get, post } from "./common/request";

const login = arg => post("/sign", arg);
const register = arg => post("/register", arg);
const logout = arg => post("/signout", arg);

export {
	login,
	register,
	logout
};
