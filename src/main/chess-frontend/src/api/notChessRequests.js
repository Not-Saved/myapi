import axios from 'axios';

const BASE_RUL = process.env.REACT_APP_DOMAIN;

export const notChessRequest = axios.create({
	baseURL: BASE_RUL,
	timeout: 1000,
	headers: {
		"access_token": ''
	}
});

const basicAuth = axios.create({
	baseURL: BASE_RUL + "/oauth/token",
	auth: {
		username: "myClient",
		password: "secret"
	},
	headers: {
		"content-type": "application/x-www-form-urlencoded"
	}
});

export const accessToken = (username, password) => {
	var querystring = require('querystring');
	return basicAuth.post('',
		querystring.stringify({
			"grant_type": "password",
			"username": username,
			"password": password
		})
	)
}

export const refreshToken = (refreshToken) => {
	var querystring = require('querystring');
	return basicAuth.post('',
		querystring.stringify({
			"grant_type": "refresh_token",
			"refresh_token": refreshToken
		})
	)
}

