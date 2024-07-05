import axios from 'axios'
import humps from 'humps'
import { useAuthStore, useAlertStore } from "@/stores";



const httpRequest = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'X-Key-Inflection': 'camel'
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
})
httpRequest.interceptors.request.use(function (config) {
  var user = localStorage.getItem('user');
  var token = ''
  if(user){
    token = JSON.parse(user).token
  }
  config.headers['x-token'] =  token
  return config;
});

httpRequest.interceptors.response.use(function (response) {
  var alertStore = useAlertStore()
  // Any status code that lies within the range of 2xx cause this function to trigger
  // Do something with response data
  if(response.data && response.data.message){
    var message = response.data.message
    alertStore.success(message)
  }
  return response;

}, function (error) {
  var authStore = useAuthStore();
  var alertStore = useAlertStore();
  console.log("Response interceptor", error.response.data)

  if(error.response && error.response.status == 401){
    authStore.logout();
  }
  if(error.response && error.response.data && error.response.data.errors){
    var message = error.response.data.errors.join(", ")
    alertStore.error(message)
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export  { httpRequest };
