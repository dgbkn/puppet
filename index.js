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

const RENEW_BTN = "#trials-table > tbody > tr > td:nth-child(5) > form > input.btn.btn-warning.js-show-upgrade-popup";

app.use(cors());

async function startBrowser(headless = true) {
    const browser = await puppeteer.launch({
        headless: headless,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}


async function cloudloginandrenew() {
    const { browser, page } = await startBrowser(false);
    page.setViewport({ width: 1366, height: 768 });
    await page.goto("https://ccp.cloudaccess.net/index.php?rp=/login");
    await page.click('#inputEmail');
    await page.keyboard.type('martmast60@gmail.com');
    await page.click('#inputPassword');
    await page.keyboard.type('@Anu123456');
    await page.click('#login');
    await page.waitForNavigation();

    await page.click(RENEW_BTN);
    await page.waitForNavigation();



    const ss = await page.screenshot();
    return ss;
}



app.get('/cloudlogin', async function (req, res) {
    const pdf = await cloudloginandrenew();
    res.contentType("image/png");
    res.send(pdf);
});



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});


app.listen(3000);

