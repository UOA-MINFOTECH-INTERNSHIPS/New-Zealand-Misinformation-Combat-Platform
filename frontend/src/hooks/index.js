import axios from'axios';

const API = axios.create({baseURL: 'http://localhost:3000'});

export const fetchArticles = () => API.get('/articles');
export const createArticle = (newArticle) => API.post('/newarticle', newArticle);


export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
