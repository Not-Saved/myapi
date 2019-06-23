import axios from 'axios';
import store from '../index';
import { refresh } from "../redux/actions/authAction";

const BASE_URL = process.env.REACT_APP_DOMAIN + '/api';

const getTokenFromStore = () => {
    if (store && store.getState().auth.isSignedIn) {
        const { auth } = store.getState();
        return auth.tokenObject;
    }
};

const notChessReq = () => axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': "bearer " + getTokenFromStore().access_token }
});

export function* wrappedChessReq(config, thisRequestSourceAction) {
    try {
        return yield notChessReq().request(config);
    } catch (e) {
        if (e.response && e.response.status === 401) {
            yield store.dispatch(refresh(thisRequestSourceAction));
            return yield { data: {} };
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

export const refreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token") || getTokenFromStore().refresh_token;
    let querystring = require('querystring');
    return basicAuth.post('',
        querystring.stringify({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    );
};

