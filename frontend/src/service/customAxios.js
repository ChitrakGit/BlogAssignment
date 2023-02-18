import axios from 'axios';
const {URL} = require("../constant/constant")

export const CUSTOM_AXIOS =  axios.create({
    baseURL: URL
	
})


CUSTOM_AXIOS.interceptors.request.use(function (config) {
    // Do something before request is sent
    
    config.headers={
        Accept: 'application/json',
          auth_token:localStorage.getItem("auth_token"),
          secret_token:localStorage.getItem("secret_token")
      
    }
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });

// Add a response interceptor
CUSTOM_AXIOS.interceptors.response.use(function (response) {
    
    const {secret_token,auth_token} = response.headers;
    // console.log("fromRes", secret_token,auth_token )
    if(secret_token != "null"){
      // console.log("secret_token_eeor_2222222222222222")
        localStorage.setItem("secret_token",secret_token);
    }else{
      // console.log("secret_token_eeor")
      localStorage.removeItem("secret_token")
    }
    if(auth_token != "null"){
        // console.log("auth_token_eeor_222222222111111111")
        localStorage.setItem("auth_token",auth_token);
    }else{
      // console.log("auth_token_eeor")
      localStorage.removeItem("auth_token")
    }
    return response;
  }, function (error) {
    
    return Promise.reject(error);
  });