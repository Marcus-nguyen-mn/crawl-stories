var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var mcArray = [];

axios.get('https://mangakomi.io/manga/one-punch-man/chapter-1')
.then(response => {
    var $ = cheerio.load(response.data);

    $('.reading-content .page-break').each(function(){
        var mcGetImage = $(this).find('img').attr('data-src');
        console.log('Image: ' + mcGetImage);
    })
})
