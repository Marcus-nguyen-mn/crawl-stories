var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var mcArray = [];
var check = 0;
var txtSave = '';
var chap = 'chapter-2';

async function downloadImage(url, filename) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
  
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err;
      console.log('Image downloaded successfully!', check);
      check = check + 1;
    });
  }
  

axios.get('https://mangaeffect.com/manga/spy-x-family/chapter-2')
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
        downloadImage(element, `image/comics/spy-x-family/${chap}/${index+1}.jpg`);
        txtSave += `<img src="https://comicshito.com/wp-content/mcmedia/comics/spy-x-family/${chap}/${index+1}.jpg" class="content-comics" alt="Content Image">\n`;
    });
    fs.writeFile(`image/comics/spy-x-family/${chap}/input.txt`, txtSave,  function(err) {
            if (err) {
                return console.error(err);
            }
            // fs.readFile('image/comics/input.txt', function (err, data) {
            //    if (err) {
            //       return console.error(err);
            //    }
            //    console.log("Noi dung file: " + data.toString());
            // });
    });
    
}).catch(function (error) {
    console.log(error);
});

// https://comicshito.com/wp-content/mcmedia/comics/acb.png

