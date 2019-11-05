export const states = {
    user: {
        name: 'jeff',
        email: 'jeff@gmail.com'
    },
    list: [
        { id: 1, txt: 'webpack 4' },
        { id: 2, txt: 'react' },
        { id: 3, txt: 'redux' },
        { id: 4, txt: 'react-hooks' },
    ]
};

export const actions = {
	addComment({list}, payload) {
		if (Array.isArray(payload)) {
			list.concat(payload);
		} else {
			list.push(payload);
		}
	},
	removeComment({list}, payload) {
		const index = list.findIndex(obj => obj.id == payload.id);
		if(index >= 0){
			list.splice(index, 1);
		}
	},
	updateUser({user}, payload) {
		Object.assign(user, payload);
	},
};

export const asyncs = {
	login(dispatch, payload){
		setTimeout(() => {
			dispatch('updateUser', payload);
		}, 2000);
	},
	logout(dispatch){
		setTimeout(() => {
			dispatch('updateUser',{name:'',email:''});
		}, 1000);
	}
}
