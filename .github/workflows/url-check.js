'use strict';

const options = { method: 'HEAD' };

const requestHttp = require('http').request;
const requestHttps = require('https').request;

const resultOk = 0;
const resultWarn = 1;
const resultError = 2;

const codeOk = 0;
const codeErr = 1;

const registryPath = './../../registry.json';

async function main() {
    let results;
    try {
        results = await getResults();
    } catch (e) {
        console.log(`error: ${e}`);
        process.exit(codeErr);
    }

    let errorCount = 0;

    for (const result of results) {
        const { type, message } = result;

        switch (type) {
            case resultOk:
                // Skip
                break;
            case resultWarn:
                console.log(`warning: ${message}`);
                break;
            case resultError:
                errorCount++;
                console.log(`error: ${message}`);
                break;
            default:
                throw new Error(`Unknown problem type: ${type}`);
        }
    }

    if (errorCount > 0) {
        console.log(`Total errors: ${errorCount}`);
    }

    process.exit(errorCount > 0 ? codeErr : codeOk);
}

async function getResults() {
    const { packages } = require(registryPath);

    return await Promise.all(packages.map((pkg) => {
        const { url, name } = pkg;

        return getHeadResponse(url).then((response) => {
            const { statusCode } = response;

            if (statusCode == 301) {
                return makeRedirectWarning(pkg, response);
            } else if (statusCode == 404) {
                return makeNotFoundError(pkg);
            }

            return makeOkResult(pkg);
        }).catch((err) => {
            if (err.errno === 'ENOTFOUND') {
                return makeNotFoundError(pkg);
            }

            return makeGenericError(pkg, err.message);
        });
    }));
}

function makeOkResult(pkg) {
    const message = `${pkg.url} is ok`;

    return makeResultObject(pkg, resultOk, message);
}

function makeNotFoundError(pkg) {
    const message = `${pkg.url} not found`;

    return makeResultObject(pkg, resultError, message);
}

function makeGenericError(pkg, message) {
    return makeResultObject(pkg, resultError, message);
}

function makeRedirectWarning(pkg, response) {
    const newUrl = response.headers.location;
    const message = `${pkg.url} redirects to ${newUrl}`;

    return makeResultObject(pkg, resultWarn, message);
}

function makeResultObject(pkg, type, body) {
    const message = `[${pkg.name}] ${body}`;

    return { pkg, type, message };
}

async function getHeadResponse(url) {
    return new Promise((resolve, reject) => {
        const req = getRequestFunction(url)(url, options, (r) => {
            resolve(r);
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

function getRequestFunction(urlStr) {
    const url = new URL(urlStr);

    let request;
    switch (url.protocol) {
        case 'http:':
            return requestHttp;

        case 'https:':
            return requestHttps;
    }

    throw new Error(`Unsupported "${url.protocol}" protocol in ${urlStr}`);
}

main();
