import ToyReact, { render } from './ToyReact'

import App from './App'

render(
  <App id="toy-react" className="toy-react-wrapper">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </App>,
  document.getElementById('app')
)
