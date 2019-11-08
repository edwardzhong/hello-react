import { useReducer, ChangeEvent } from "react";

function stateReducer(state: object | Function, newState: object) {
	return typeof newState == "function" ? newState(state) : { ...state, ...newState };
}

function useForm(initialState: object) {
	const [state, setState] = useReducer(stateReducer, initialState || {});

	const createPropsGetter = (type: string) => (name: string, ownValue: string) => {
		const hasValueInState = state[name] !== undefined;
		function setInitialValue() {
			let value = ownValue || '';
			setState({ [name]: value });
		}

		const inputProps = {
			name, // 添加name属性
			get type(): string { // 给 input 添加 type: text or password ...
				if (!/select|textarea/i.test(type)) {
					return type;
				}
				return '';
			},
			get value() {
				if (!hasValueInState) {
					setInitialValue(); // 给初始化值
				}
				return hasValueInState ? state[name] : ""; // 赋值
			},
			onChange(e: ChangeEvent) {
				const { value } = e.target as HTMLInputElement;
				setState({ [name]: value }); // 修改对应 Key 的值
			}
		};
		return inputProps;
	};

	const inputPropsCreators = ["text", "password", "number", "email", "search", "url", "color", "textarea"].reduce(
		(methods, type) => ({ ...methods, [type]: createPropsGetter(type) }),
		{}
	);

	return [
		{ values: state }, // formState
		inputPropsCreators
	];
}

export default useForm;
