import { useReducer } from "react";

function stateReducer(state, newState) {
	return typeof newState == "function" ? newState(state) : { ...state, ...newState };
}

function useForm(initialState) {
	const [state, setState] = useReducer(stateReducer, initialState || {});

	const createPropsGetter = type => (name, ownValue) => {
		const hasOwnValue = !!ownValue;
		const hasValueInState = state[name] !== undefined;

		function setInitialValue() {
			let value = "";
			setState({ [name]: value });
		}

		const inputProps = {
			name, // 添加name属性
			get type() { // 给 input 添加 type: text or password ...
				if (!/select|textarea/i.test(type)) {
					return type;
				}
			},
			get value() {
				if (!hasValueInState) {
					setInitialValue(); // 给初始化值
				}
				return hasValueInState ? state[name] : ""; // 赋值
			},
			onChange(e) {
				let { value } = e.target;
				setState({ [name]: value }); // 修改对应 Key 的值
			}
		};

		return inputProps;
	};

	const inputPropsCreators = [ "text", "password", "number", "email", "search", "url", "color","textarea" ].reduce(
		(methods, type) => ({ ...methods, [type]: createPropsGetter(type) }),
		{}
	);

	return [
		{ values: state }, // formState
		inputPropsCreators
	];
}

export default useForm;
