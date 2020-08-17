import ToyReact, { Component } from './ToyReact'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Toy-react</h1>
        <p>hello world</p>
        {this.children}
      </div>
    )
  }
}
