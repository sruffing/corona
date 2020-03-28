const fs = require('fs');
const download = require('download');

download('https://datahub.io/core/covid-19/r/covid-19_zip.zip', 'data', {extract:true}).then(() => {
    console.log('done!');
});