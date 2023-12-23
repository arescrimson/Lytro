require('dotenv').config()
const { TheCatAPI } = require("@thatapicompany/thecatapi");
const { CATS_TOKEN } = require('../../config');
const CAT_CLIENT = new TheCatAPI(CATS_TOKEN);

module.exports = { 
    CAT_CLIENT
}