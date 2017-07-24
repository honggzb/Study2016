1 [React一个标准组件的组织结构](#React一个标准组件的组织结构)

### React一个标准组件的组织结构

* class definition
    * constructor
        * 1. event handlers
    * 'component' lifecycle events
    * getters
    * render
* defaultProps
* proptypes

```javascript
class MyComponent extends Component {
  constructor (props) {
    super(props);
    this.state = { smiling: false };
    this.handleClick = () => {
      this.setState({smiling: !this.state.smiling});
    };
  }
  componentWillMount () {/* add event listeners (Flux Store, WebSocket, document, etc.)*/ }
  componentDidMount () { /* React.getDOMNode()*/ }
  componentWillUnmount () { /* remove event listeners (Flux Store, WebSocket, document, etc.)*/ }
  get smilingMessage () {   //Computed Props: use getters to name Computed Props
    return (this.state.smiling) ? "is smiling" : "";
  }
  get isHappyAndKnowsIt () {  //Compound State: Prefix compound state getters with a verb for readability. These methods MUST return a boolean value.
    return this.state.happy && this.state.knowsIt;
  }
  render () {
    return (
      <div onClick={this.handleClick}>
        {this.props.name} {this.smilingMessage}
      </div>
    );
  }
}
Person.defaultProps = {
  name: 'Guest'
};
Person.propTypes = {
  name: React.PropTypes.string
};
```
