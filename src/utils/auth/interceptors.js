import axios from 'axios';
import { apiAxiosInstance } from './api.service';
import store from '../../store'

export default function setup() {
    apiAxiosInstance.interceptors.request.use(function(config) {
        if(store.state.accountUser.token) {
            config.headers.Authorization = `Bearer ${store.state.accountUser.token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}
