import { login, register, logout } from "./service";

export const states = {
	isLoading: false,
	loginInfo: { token: "" },
	user: {
		id: "1",
		name: "jeff",
		email: "jeff@gmail.com"
	},
	list: [
		{ id: 1, txt: "webpack 4" },
		{ id: 2, txt: "react" },
		{ id: 3, txt: "redux" },
		{ id: 4, txt: "react-hooks" }
	]
};

export const actions = {
	setLoading({ isLoading }, payload) {
		isLoading = payload;
	},
	setLogin({ loginInfo }, payload) {
		loginInfo = payload;
	},
	clearLogin({ loginInfo }) {
		loginInfo.token = null;
	},
	setUser({ user }, payload) {
		Object.assign(user, payload);
	},
	clearUser({ user }) {
		user.id = null;
		user.name = null;
		user.email = null;
	},
	addComment({ list }, payload) {
		if (Array.isArray(payload)) {
			list.concat(payload);
		} else {
			list.push(payload);
		}
	},
	removeComment({ list }, payload) {
		const index = list.findIndex(obj => obj.id == payload.id);
		if (index >= 0) {
			list.splice(index, 1);
		}
	}
};

export const asyncs = {
	async login(dispatch, payload) {
		dispatch("setLoading", true);
		const ret = await login(payload);
		dispatch("setLoading", false);
		if (ret.code == 200) {
			dispatch("setLogin", ret.data);
			localStorage.setItem("loginInfo", JSON.stringify(ret.data));
		} else {
			dispatch("clearLogin");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	},
	async register(dispatch, payload) {
		dispatch("setLoading", true);
		const ret = await register(payload);
		dispatch("setLoading", false);
		if (ret.code == 200) {
			const loginRet = await login(payload);
			loginRet.isSucc = true;
			if (loginRet.code == 200) {
				dispatch("setLogin", loginRet.data);
				localStorage.setItem("loginInfo", JSON.stringify(ret.data));
			}
			return loginRet;
		}
		return ret;
	},
	async logoutService(dispatch) {
		dispatch("setLoading", true);
		const ret = await logout();
		dispatch("setLoading", false);
		if (ret.code == 200) {
			dispatch("clearLogin");
			dispatch("clearUser");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	}
};
