import { login, register, logout } from '../service'
import { Dispatch } from 'types/context'

export const states = {
	isLoading: false,
	loginInfo: { token: "" },
	user: {
		id: "1",
		name: "jeff",
		email: "jeff@gmail.com"
	},
};

export const actions = {
	setLoading({ isLoading }, payload: any) {
		isLoading = payload;
	},
	setLogin({ loginInfo }, payload: any) {
		loginInfo = payload;
	},
	clearLogin({ loginInfo }) {
		loginInfo.token = null;
	},
	setUser({ user }, payload: any) {
		Object.assign(user, payload);
	},
	clearUser({ user }) {
		user.id = null;
		user.name = null;
		user.email = null;
	},
};

export const asyncs = {
	async login(dispatch: Dispatch, payload: any) {
		dispatch("setLoading", true);
		const ret = await login(payload);
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			dispatch("setLogin", data.data);
			localStorage.setItem("loginInfo", JSON.stringify(data.data));
		} else {
			dispatch("clearLogin");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	},
	async register(dispatch: Dispatch, payload: any) {
		dispatch("setLoading", true);
		const ret = await register(payload);
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			const loginRet = await login(payload);
			const rdata = loginRet.data;
			if (rdata.code == 200) {
				dispatch("setLogin", rdata.data);
				localStorage.setItem("loginInfo", JSON.stringify(rdata.data));
			}
			return loginRet;
		}
		return ret;
	},
	async logoutService(dispatch: Dispatch) {
		dispatch("setLoading", true);
		const ret = await logout();
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			dispatch("clearLogin");
			dispatch("clearUser");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	}
};
