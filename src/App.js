import ToyReact, { Component } from './ToyReact'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      content: 'hello world'
    }
  }

  render() {
    const { content } = this.state
    return (
      <div>
        <h1>Toy-react</h1>
        <p>{content}</p>
        {this.children}
      </div>
    )
  }
}
