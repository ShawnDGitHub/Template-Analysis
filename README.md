# Template-Analysis
Analysis the string template of the html structure, and return your the real dom.
## how to use
- For project: ```npm install template-analysis```, then ```import { html } from 'template-analysis';``` pass html string to function html.
  ```js
  const realStructure = html(`
    <div>
      <i>italic text</i>
      <i>italic text</i>
    </div>
  `)
  ```
- For github files download test: Open index.html with a browser, see the console output. **No package is required.**
## things it can return currently
- element with children elements. like ```<div><i>italic text</i></div>```
- element with attributes. like 
  ```html
  <div class="m-t-8">
    <i class="italic" style="margin: 8px;">italic text</i>
  </div>
  ```
## mention
You must follow the principle below:
- **Only for Browser Environment**. That means you can't use it for Node Server.
- The DOM must have only one root element.
- It doesn't accept simple element input with just a innerText, like ```<div>text</div>```
- If a child element is included, the element must write like:
  ```html
  <div>
    <i>italic text</i>
  </div>
  ``` 
  The inline form is not allowed currently. ```<div><i>text</i></div>``` **!! Not allowed !!**
  
- The syntax of function in element tag is not support now. ```<div onclick="() => console.log('do something...')">``` **!!  Not supported !!**