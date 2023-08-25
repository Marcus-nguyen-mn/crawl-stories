var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

request('https://mangaeffect.com/manga/one-punch-man/chapter-1', function(err, res, body){
    if(err) console.log('Erro: '+ err);

    var $ = cheerio.load(body);
    var count = 0;
    $('.reading-content .page-break').each(function(){
        count = count + 1;
        var mcGetImage = $(this).find('img').attr('data-src');
        download(mcGetImage, `image/${count}.jpg`, function(){
            console.log('done');
        });
    })
});
