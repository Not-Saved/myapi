import axios from 'axios';
import store from '../index';
import { logout } from "../redux/actions";

const BASE_URL = process.env.REACT_APP_DOMAIN + '/api';

const token = () => {
    if (store && store.getState().auth.isSignedIn) {
        const {auth} = store.getState();
        return auth.tokenObject.access_token;
    }
};

const notChessReq = () => axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': "bearer " + token()}
});

export function* wrappedChessReq(config) {
    try {
        return yield notChessReq().request(config);
    } catch (e) {
        if (e.response && e.response.status === 401) {
            yield store.dispatch(logout());
            return yield {data: {}};
        }
        throw e;
    }
};

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
    let querystring = require('querystring');
    return basicAuth.post('',
        querystring.stringify({
            "grant_type": "password",
            "username": credentials.username,
            "password": credentials.password
        })
    );
};

export const refreshToken = (refreshToken) => {
    let querystring = require('querystring');
    return basicAuth.post('',
        querystring.stringify({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    );
};

