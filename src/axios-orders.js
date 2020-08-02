import axios from 'axios';

const instance  = axios.create({
    baseURL: 'https://burguer-app-b2532.firebaseio.com/'
});


export default instance;