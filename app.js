const request = require('request');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const date = new Date();
const saveNews = require('./models');

saveNews();
