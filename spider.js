var request = require('request');
var cheerio = require('cheerio');

request('https://mangaeffect.com/manga/one-punch-man/chapter-1', function(err, res, body){
    console.log('join');
    if(err) console.log('Erro: '+ err);

    var $ = cheerio.load(body);

    $('.reading-content .page-break').each(function(){
        var mcGetImage = $(this).find('img').attr('data-src');
        console.log('Image: ' + mcGetImage);
    })
});
