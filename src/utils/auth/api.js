// API Service
import axios from 'axios'
import store from '../../store'

const getHost = type => {
    return type === '' 
        ? `https://devpayments.atlas.money/v1`
        : `https://devpayments.atlas.money/v1`
}

const getHeader = type => {
    return type === 'auth' 
        ? { headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + store.getters.getToken  } }
        : type === 'business' 
            ? { auth: { 'username': store.getters.getBusinessTokens.test.public_key, 'password': store.getters.getBusinessTokens.test.secret_key } }
            : { headers: { 'Content-Type': 'application/json'} }
}
  
const getQueryParams = type => {
    return type === '' 
        ? ''
        : ''
}

export default {
    get: (url, params = {}, type = '') => new Promise((resolve, reject) => {
        axios.get(getHost(type) + url, getHeader(type))
        .then(response => {
            console.log(`GET response from ${url}:`, response)
            resolve(response)
        })
        .catch(error => {
            console.log(`GET error from ${url}:`, error)
            reject(error)
        })
    }),

    post: (url, params = {}, type = '') => new Promise((resolve, reject) => {
        axios.post(getHost(type) + url, params, getHeader(type))
        .then(response => {
            console.log(`POST response from ${url}:`, response)
            resolve(response)
        })
        .catch(error => {
            console.log(`POST error from ${url}:`, error)
            reject(error)
        })
    }),

    put: (url, params = {}, type = '') => new Promise((resolve, reject) => {
        axios.put(getHost(type) + url, params, getHeader(type))
        .then(response => {
            console.log(`PUT response from ${url}:`, response)
            resolve(response)
        })
        .catch(error => {
            console.log(`PUT error from ${url}:`, error)
            reject(error)
        })
    }),

    delete: (url, param = {}, type = '') => new Promise((resolve, reject) => {
        axios.delete(getHost(type) + `${url/param}`, getHeader(type))
        .then(response => {
            console.log(`DELETE response from ${url}:`, response)
            resolve(response)
        })
        .catch(error => {
            console.log(`DELETE error from ${url}:`, error)
            reject(error)
        })
    }),
  
  }