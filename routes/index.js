const request = require('request')
const cheerio = require('cheerio')
const { get } = require('request')
const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

const URL = 'https://sneakernews.com/air-jordan-release-dates/'

request(URL, (error, response, body) => {
    let $ = cheerio.load(body)
    let results = $('.releases-box')
    let filteredResults = results.map((index, element) => {
        return {
            name: $(element).find('a').text(),
            img: $(element).find('img').attr('src'),
        }
    })
    console.log(filteredResults.get())
})

router.get('/', (req, res) => {

    res.render('index')
})


module.exports = router;