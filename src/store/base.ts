import { login, register, logout } from '../service'
import { AsyncsTree, ActionTree, BaseState } from 'types/context'

export const state: BaseState = {
	isLoading: false,
	loginInfo: { token: "" },
	user: {
		id: "1",
		name: "jeff",
		email: "jeff@gmail.com"
	},
};

export const actions: ActionTree<BaseState> = {
	// setLoading({ isLoading }, payload: boolean) {
	// 	isLoading = payload;
	// },
	// setLogin({ loginInfo }, payload = {}) {
	// 	loginInfo = payload;
	// },
	clearLogin({ loginInfo }) {
		loginInfo.token = null;
	},
	setUser({ user }, payload = {}) {
		Object.assign(user, payload);
	},
	clearUser({ user }) {
		user.id = null;
		user.name = null;
		user.email = null;
	},
};

export const asyncs: AsyncsTree = {
	async login(dispatch, payload = {}) {
		// dispatch(setLoading(true));
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
	async register(dispatch, payload = {}) {
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
	async logoutService(dispatch) {
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
