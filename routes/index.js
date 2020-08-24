const request = require('request')
const cheerio = require('cheerio')
const { get } = require('request')
const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');



router.get('/', async (req, res) => {
    const URL = await 'https://sneakernews.com/air-jordan-release-dates/'

    request(URL, (error, response, body) => {
            let $ = cheerio.load(body)
            let results = $('.releases-box')
            let filteredResults = results.map((index, element) => {
                let nameClean = $(element).find('h2', 'a').text();
                nameClean = nameClean.substring(29, nameClean.length-25)

                let sizeClean = $(element).find('p', '.post-data').text();
                sizeClean = sizeClean.substring(33, sizeClean.length-250)

                return {
                name: nameClean,
                img: $(element).find('img').attr('src'),
                date: $(element).find('span', '.release-date').text().substring(29,34),
                price: $(element).find('span[class=release-price]').text(),
                size: sizeClean,
            }
            })
            filteredResults = filteredResults.get()
            // console.log(filteredResults.get())
            res.render('index', {data: filteredResults})
    })
    .catch((error) => {
    console.log(error)
    res.status(400).render('404')
  })
})


// const URL = 'https://sneakernews.com/air-jordan-release-dates/'

// request(URL, (error, response, body) => {
//         let $ = cheerio.load(body)
//         let results = $('.releases-box')
//         let filteredResults = results.map((index, element) => {
//             let nameClean = $(element).find('h2', 'a').text();
//             nameClean = nameClean.substring(29, nameClean.length-25)

//             let sizeClean = $(element).find('p', '.post-data').text();
//             sizeClean = sizeClean.substring(33, sizeClean.length-200)
//             return {
//             name: nameClean,
//             img: $(element).find('img').attr('src'),
//             price: $(element).find('span[class=release-price]').text(),
//             size: sizeClean,
//             date: $(element).find('span', '.release-date').text().substring(29,34)
//             }
//         })
//         filteredResults = filteredResults.get()
//         console.log(filteredResults)
// })


module.exports = router;