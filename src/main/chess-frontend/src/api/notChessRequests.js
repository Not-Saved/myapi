import axios from 'axios';

const BASE_URL = process.env.REACT_APP_DOMAIN + '/api';

export const notChessReq = axios.create({
	baseURL: BASE_URL
});

const basicAuth = axios.create({
	baseURL: BASE_URL + "/oauth/token",
	auth: {
		username: "notChessApi",
		password: "notChessApi"
	},
	headers: {
		"content-type": "application/x-www-form-urlencoded"
	}
});

export const accessToken = (credentials) => {
	var querystring = require('querystring');
	return basicAuth.post('',
		querystring.stringify({
			"grant_type": "password",
			"username": credentials.username,
			"password": credentials.password
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

