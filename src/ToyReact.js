const RENDER_TO_DOM = Symbol('render to dom')

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    let range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    component[RENDER_TO_DOM](range)
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  [RENDER_TO_DOM](range) {
    this.render()[RENDER_TO_DOM](range)
  }
}

/**
 * @param {string|class|object} type
 * @param {object} attributes
 * @param {array} children
 * @return {HTMLDocument}
 */
export function createElement(type, attributes, ...children) {
  let e
  if (typeof type === 'string') {
    // 当type为string时渲染原生html标签
    e = new ElementWrapper(type)
  } else {
    // 当type不为string时渲染组件
    e = new type()
  }
  for (let attr in attributes) {
    e.setAttribute(attr, attributes[attr])
  }

  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child)
      } else {
        e.appendChild(child)
      }
    }
  }

  insertChildren(children)

  return e
}

/**
 * @param {class|object} children
 * @param {HTMLDocument} target
 * @return {void}
 */
export function render(component, target) {
  let range = document.createRange()
  range.setStart(target, 0)
  range.setEnd(target, target.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}

export default {
  render,
  createElement,
  Component
}
