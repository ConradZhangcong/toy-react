class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}

/**
 * 将children挂载到target上
 * @param {class|object} children
 * @param {HTMLDocument} target
 * @return {void}
 */
export function render(component, target) {
  target.appendChild(component.root)
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
  get root() {
    if (!this._root) {
      this._root = this.render().root
      return this._root
    }
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

export default {
  render,
  createElement,
  Component
}
