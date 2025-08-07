const {normalizeURL} = require('./crawl.js');
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
})