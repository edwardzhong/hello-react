import { post } from "./common/request";
import { loginAdd, loginClear, selfClear} from "./action";

const login = arg => post("/sign", arg);
const register = arg => post("/register", arg);
const logout = arg => post("/signout", arg);

async function loginService(dispatch, payload) {
	try {
		const ret = await login(payload);
		if (ret.code == 200) {
            dispatch(loginAdd(ret.data));
            // account.save(ret.data);
		} else {
            dispatch(loginClear());
            // account.clear();
		}
		return ret;
	} catch (err) {
        dispatch(loginClear());
        // account.clear();
		return err;
	}
}

async function registerService(dispatch, payload) {
	try {
		const ret = await register(payload);
		if (ret.code == 200) {
			const loginRet = await login(payload);
			loginRet.isSucc = true;
			if (loginRet.code == 200) {
                dispatch(loginAdd(loginRet.data));
                // account.save(loginRet.data);
			}
			return loginRet;
		} else {
			return ret;
		}
	} catch (err) {
		return err;
	}
}

async function logoutService(dispatch) {
	try {
		const ret = await logout();
		if (ret.code == 200) {
			dispatch(loginClear());
            dispatch(selfClear());
            // account.clear();
		}
		return ret;
	} catch (err) {
		return err;
	}
}

export {
	loginService,
	registerService,
	logoutService
};
