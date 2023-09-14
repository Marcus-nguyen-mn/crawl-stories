var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var mcArray = [];
var check = 0;
var txtSave = '';
var inter = 1;
var chap = '';

async function downloadImage(url, filename) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
  
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err;
    //   console.log('Image downloaded successfully!', check);
      check = check + 1;
    }); 
  }
  
const myInterval = setInterval(mcCrawl, 6000);
function mcCrawl(){
    if(inter > 2){
        clearInterval(myInterval);
    }else{
        chap = 'chapter-'+inter;
        console.log("chap", chap);
        axios.get(`https://mangaeffect.com/manga/blue-lock/${chap}`)
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
                downloadImage(element, `image/comics/blue-lock/${chap}/${index+1}.jpg`);
                txtSave += `<img src="https://comicshito.com/wp-content/mcmedia/comics/blue-lock/${chap}/${index+1}.jpg" class="content-comics" alt="Blue lock">\n`;
            });
            console.log("Done", inter);
            fs.writeFile(`image/comics/blue-lock/content/${chap}.txt`, txtSave,  function(err) {
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
            mcArray = [];
            inter = inter + 1;
            txtSave = '';
            
        }).catch(function (error) {
            console.log(error);
        });
    }
    
}


// https://comicshito.com/wp-content/mcmedia/comics/acb.png

