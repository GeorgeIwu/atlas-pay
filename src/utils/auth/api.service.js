// API Service
import Vue from 'vue'

import axios from 'axios'
import store from '../../store'

export const apiAxiosInstance = axios.create({
      // baseURL: `https://devpayments.atlas.money/v1`,
      baseURL: `https://devpayments.atlas.money/v1`,
 })

export const cleanApiAxiosInstance = axios.create({
  // baseURL: `https://devpayments.atlas.money/v1`,
  baseURL: `https://devpayments.atlas.money/v1`,
})



