# Template-Analysis
Analysis the string template of the html structure, and return your the real dom.
## how to use
Open it with a browser, see the console output. **No package is required.**
## the thing it can return currently
- element tag. like ```<h1>TITLE</h1>```
- element with attributes. like ```<div class="m-t-8"></div>```
- element with children elements. like ```<div><i>italic text</i></div>```
## mention
You must follow the principle below:
1. If a child element is included, the element must write like:
  ```html
  <div>
    <i>italic text</i>
  </div>
  ```
  The inline form is not allow currently. ```<div><i>text</i></div>``` **!! Not allowed !!**
2. The syntax of function in element tag is not support now. ```<div onclick="() => console.log('do something...')">``` **!!  Not supported !!**