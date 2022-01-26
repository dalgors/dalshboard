import { createStore } from 'vuex';

const store = createStore({
	state: {
		problems: {},
		competitions: [],
		submissions: [],
		usernames: [],
	},
});

export default store;
