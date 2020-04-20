const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const currentDate = new Date();

report.generate({
   jsonDir: '.tmp/report/',
   reportPath: '.tmp/report/htmlReport',
   customMetadata: true,
   pageTitle: 'Weather Checker API',
   reportName: 'Weather Checker API',
   displayDuration: true,
   customData: {
       title: 'Run info',
       data: [
           {label: 'Project', value: 'Weather Checker API'},
           {label: 'Execution Start Time', value: currentDate.getDate() + "/"
                   + (currentDate.getMonth() + 1) + " "
                   + currentDate.getHours() + ":"
                   + currentDate.getMinutes()}
       ]
   }
});

async function updateHtmlFile() {
    const filePath = require('path').join(__dirname, '.tmp', 'report', 'htmlReport', 'index.html');
    await fs.readFile(filePath, 'utf8',function(err, data){
        if (err) {
            throw new Error(err.message);
        }
        const result = data.replace('<h2>Features</h2>', '<h2>Endpoints</h2>')
            .replace('<h2>Features overview</h2>', '<h2>Endpoints overview</h2>');
        fs.writeFile(filePath, result,'utf8', function (err) {
            if (err) { throw new Error(err.message); }
        })
    });
    console.log('Index.html updated.')
}
updateHtmlFile().then(() => {});