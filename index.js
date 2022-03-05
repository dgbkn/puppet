const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const request = require("request");
const app = express();
var cors = require("cors");
var os = require("os");
const ytdl = require('ytdl-core');
const puppeteer = require ('puppeteer');


app.use(cors());


const main = async () => {
    const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],});
        const page = await browser.newPage();
        await page.goto('https://google.com');
    
        const pdf = await page.pdf();
        return pdf;
     }





     app.get('/test', async function (req, res) {
        const pdf = await main();
        res.contentType("application/pdf");
        res.send(pdf);
});



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.htm"));
  });


app.listen(3000);

