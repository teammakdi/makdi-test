const { HttpCrawler, log, LogLevel, Configuration } = require('crawlee');
const express = require('express')

const app = express()
const port = 3000

const config = Configuration.getGlobalConfig();
config.set('persistStorage', false);

log.setLevel(LogLevel.DEBUG);

const crawler = new HttpCrawler({
    requestHandler({ request, body }) {
        log.info(`Processed ${request.url}...`)
    },
    failedRequestHandler({ request }) {
        log.error(`Request ${request.url} failed twice.`);
    }
});

app.get('/crawl', async (req, res) => {    
    await crawler.run([
        'https://crawlee.dev',
    ]);
    res.send('Crawled!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
