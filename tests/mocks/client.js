var test = require('jsdom');
var dom = new test.JSDOM()
global.document = dom.window.document
global.window = dom.window
