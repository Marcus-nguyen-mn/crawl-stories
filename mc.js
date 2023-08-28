var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var mcArray = [];
var check = 0;

async function downloadImage(url, filename) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
  
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err;
      console.log('Image downloaded successfully!', check);
      check = check + 1;
    });
  }
  

axios.get('https://mangakomi.io/manga/one-punch-man/chapter-1')
.then(response => {
    var $ = cheerio.load(response.data);
    var count = 1;
    $('.reading-content .page-break').each(function(){
        var mcGetImage = $(this).find('img').attr('data-src').trim();
        mcArray.push(mcGetImage);
        // downloadImage(mcGetImage, `image/${count}.jpg`);
        // console.log('Image: ' + mcGetImage);
        count = count + 1;
    })
    // console.log(mcArray);
    mcArray.forEach((element, index) => {
        downloadImage(element, `image/${index}.jpg`);
    });
    
}).catch(function (error) {
    console.log(error);
});
