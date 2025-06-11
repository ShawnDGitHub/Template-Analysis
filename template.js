import Stack from './structure/stack.js';
function html (templateString) {
  const units = [];
  const trimString = templateString.trim();
  const lines = trimString.split('\n');
  lines.forEach(line => {
    const regexTagStart = /(?<=<)[^/].*?(?=\s|>)/g;
    const regexTagEnd = /(?<=<)\/\w+/g;
    const regexSelfClosingTagEnd = /(?<=\/)>/g;
    const regexAttrValue = /\"([^\"]*)\"+/g;
    const regexAttrName = /\w+(?=\=")/g;
    const regexInnerText = /(?<=>).*(?=<)/g;
    const TAGSSTART = regexIter(regexTagStart, line);
    let TAGSEND = regexIter(regexTagEnd, line);
    // 自闭合标签 self closed element like <img/> or <input/>
    if (!TAGSEND.length) TAGSEND = regexIter(regexSelfClosingTagEnd, line);
    const ATTRIBUTES = regexIter(regexAttrName, line);
    const ATTRVALUES = regexIter(regexAttrValue, line);
    const INNERTEXT = regexIter(regexInnerText, line);
    const unit = astCT(TAGSSTART, TAGSEND, ATTRIBUTES, ATTRVALUES, INNERTEXT);
    units.push(unit);
  });
  const html = toHTML(units);
  return html;
} // html
function regexIter (regex, string) {
  let match = null;
  const matchs = [];
  while ((match = regex.exec(string.trim())) !== null) {
    if (match.index === regex.lastIndex) regex.lastIndex++;
    matchs.push(match[1]||match[0]);
  }
  return matchs;
} // regexIter
/** scan ast */
function astCT (s, e, a, av, it) {
  let unit = {
    tag: null,
    within: false,
    start: false,
    end: false,
    attributes: {},
    text: ''
  }
  // handle base
  if (s.length && !e.length) {
    unit.start = true;
    unit.tag = s[0];
  } else if (e.length && !s.length) {
    unit.end = true;
    unit.tag = e[0];
  } else if (s.length && e.length) {
    unit.within = true;
    unit.tag = s[0];
  } else console.error('wrong ast progress.');
  if (it) unit.text = it;
  // handle attributes
  for (let i = 0; i < a.length; i++) { unit.attributes[`${a[i]}`] = av[i]; }
  return unit;
} // astCT
/** */
function toHTML (units) {
  const ms = new Stack();
  const [element] = match(units, ms);
  return element;
} // toHTML
function createElement (tagName, attributes = null,
  innerText = null) {
  const element = document.createElement(tagName);
  if (attributes) {
    const keys = Object.keys(attributes);
    keys.forEach(key => {
      element.setAttribute(key, attributes[key]);
    });
  }
  if (innerText) element.innerText = innerText;
  return element;
}
function match (units, stack) {
  // 回调遍历后外层需要忽略的遍历次数
  // how many times the for block should ignore
  let ignore = 0;
  let element = null;
  for (let i = 0; i < units.length; i++) {
    if (ignore !== 0) { ignore--; continue; }
    const u = units[i];
    if (u.start) {
      stack.Push(u);
      if (element === null) element = createElement(u.tag, u.attributes);
      else {
        const dividedUnits = units.slice(i);
        const [child, ignoreTImes] = match(dividedUnits, stack);
        element.appendChild(child);
        ignore = ignoreTImes;
      }
    } else if (u.within) {
      const child = createElement(u.tag, u.attributes, u.text);
      element.appendChild(child);
    } else {
      if (u.end && stack.StackEmpty()) {
        console.error('The ast units have error.');
        return null;
      }
      stack.Pop(); // 弹出最近的起始tag | pop out the nearest start tag
      // 返回回调创建的元素和已经遍历个数
      // return the elements created by the callback and the number that has been traversed
      return [element, i];
    }
  }
}
export { html };
