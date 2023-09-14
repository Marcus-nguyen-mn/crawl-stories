var fs = require('fs');

for(let i = 1; i <= 232; i++){
    if (!fs.existsSync(`./image/comics/blue-lock/chapter-${i}`)){
        fs.mkdirSync(`./image/comics/blue-lock/chapter-${i}`);
    }
}
