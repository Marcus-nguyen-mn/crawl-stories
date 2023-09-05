var fs = require('fs');
var dir = './tmp';

for(let i = 1; i <= 87; i++){
    if (!fs.existsSync(`./image/comics/spy-x-family/chapter-${i}`)){
        fs.mkdirSync(`./image/comics/spy-x-family/chapter-${i}`);
    }
}
