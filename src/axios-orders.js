import axios from 'axios';

const axe = axios.create({
    baseURL: 'https://jalfrezi-build-a-burger.firebaseio.com/'
});

export default axe;