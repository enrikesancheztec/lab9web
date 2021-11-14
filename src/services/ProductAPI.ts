import axios from 'axios';

const baseURL = process.env.REACT_APP_PRODUCT_API_BASE_URL;

const ProductAPI = axios.create({
    baseURL: baseURL,
    responseType: 'json'
});

export default ProductAPI;