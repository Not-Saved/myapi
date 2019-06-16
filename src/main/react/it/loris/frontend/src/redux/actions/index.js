export const login = credentials => {
	return {
		type: 'LOGIN_REQUEST',
		payload: credentials
	};
};

export const logout = () => {
	return {
		type: 'LOGOUT'
	};
};