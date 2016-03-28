var fs = require('fs');

var md = `

## Sample Markdown title

### Sample subtitle
---
* point
* point
* point

`;

fs.writeFile('sample.md',md.trim(),function (err) {
  console.log("File created.");
});
