## Chrome DevTools new features

### 1. $0 in console

- gives you a reference to the currently selected DOM node in the Elements panel - DOM-style representation of the object
- see the element as a JavaScript object-- `console.dir($0)`
- `$r` is a reference to the react component

### 2. Selector selecting

- `.section-inner p:nth-of-type(2)`

### 3. Edit any text on the page

- type `document.designMode = "on"` in console to turn on design mode, then click and type any text on the page

### 4. Filmstrip mode on the Network tab - capture screenshots during a page load

- Click on the camera icon to enable the Filmstrip
- Reload the page to capture the screenshots. The screenshots are displayed above the Overview

### 5. Snippet code

- [Run snippets of code from any page
](https://developers.google.com/web/tools/chrome-devtools/debug/snippets/?hl=en) - `Source -> Snippets`
- the snippet code will behave the same as your application code with regards to DOM access, relative URLs, cookies, and CORSs stuff

> Reference

- https://developers.google.com/web/tools/chrome-devtools/
- [Twelve Fancy Chrome DevTools Tips](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
