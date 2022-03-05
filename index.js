const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const request = require("request");
const app = express();
var cors = require("cors");
var os = require("os");
const ytdl = require('ytdl-core');
const puppeteer = require('puppeteer');


app.use(cors());


// const main = async () => {
//     const browser = await puppeteer.launch({headless: false,args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//       ],});
//         const page = await browser.newPage();
//         await page.goto('https://google.com');

//         const pdf = await page.pdf();
//         return pdf;
//      }


const cloudloginandrenew = async () => {
    const browser = await puppeteer.launch({
        headless: false, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });

    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720})
    await page.goto('https://ccp.cloudaccess.net/index.php?rp=/login', { waitUntil: 'networkidle0' });
    await page.waitForNavigation();
    await page.type('#inputEmail', "martmast60@gmail.com");
    await page.type('#inputPassword', "@Anu123456");

  // click and wait for navigation
  await Promise.all([
    page.click('#login'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

    const pdf = await page.pdf();
    return pdf;
}


app.get('/cloudlogin', async function (req, res) {
    const pdf = await cloudloginandrenew();
    res.contentType("application/pdf");

    res.send(pdf);
});



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.htm"));
});


app.listen(3000);

