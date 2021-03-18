const { readFileSync, writeFileSync } = require('fs');

const jointxt = readFileSync('JoinList.txt').swap16().toString('utf16le').split(' ');
const joinTable = {};

jointxt.forEach(j => {
  joinTable[j[0]] = joinTable[j[0]] || {};
  joinTable[j[0]][j[2]] = j[1];
});

writeFileSync('join-list.json', JSON.stringify(joinTable));
