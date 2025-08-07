const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip protocol', () =>
{
    const input = 'https://google.com/path';
    const actual = normalizeURL(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});


test('normalizeURL strip trailing slash', () =>
{
    const input = 'https://google.com/path/';
    const actual = normalizeURL(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});


test('normalizeURL capitals', () =>
{
    const input = 'https://GOOGLe.com/path/';
    const actual = normalizeURL(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});


test('getURLsFromHTML absolute', () =>
{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
            Boot.dev blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML both', () =>
{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev blog path 1
            </a>
            <a href="/path2/">
            Boot.dev blog path 2
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
});


test('getURLsFromHTML invalid', () =>
{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
            Invalid
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})