const axios = require('axios');
const urlEquipamento = 'http://localhost:5005/';
const api = axios.create({
    baseURL:urlEquipamento,
});


module.exports = api ;