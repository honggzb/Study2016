## Nodejs debugging with Chrome Devtool

### Needs

- Node.js 6.3+
- Chrome 55+ [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html)

### Enable Nodejs debugging in Chrome

- Open the `chrome://flags/#enable-devtools-experiments` URL
- Enable the Developer Tools experiments flag
- Relaunch Chrome
- Open DevTools Setting -> Experiments tab (it started being visible after the reload)
- Press "SHIFT" 6 times ( enjoy it  ~~~~(>_<)~~~~  to show the hidden experiments
- Check the "Node debugging" checkbox
- Open/close DevTools

### debug

`node --inspect node.js`

https://blog.hospodarets.com/nodejs-debugging-in-chrome-devtools?utm_source=nodeweekly&utm_medium=email#enable-a-new-way-of-nodejs-debugging-in-chrome
