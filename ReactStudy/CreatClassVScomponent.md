```javascript
const Contacts = React.createClass({
  // propTypes and getDefaultProps and State differences
  propTypes: {
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState () {  //State differences
    return {
    };
  },
  handleClick() {
    console.log(this);    //this: React Component instance
  },
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
});
export default Contacts;
//React.Component
class Contacts extends React.Component {
  constructor(props) {  //could skip
    super(props);
    this.state = {      //State differences
    }
  }
  handleClick() {
    console.log(this);      //this:null, With ES6 classes this is slightly different, properties of the class do not automatically bind to the React class instance
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
}
Contacts.propTypes = {
};
Contacts.defaultProps = {
};
export default Contacts;
```

**This**-- there are a few ways we could bind the right context, here’s how we could bind inline:

```javascript
class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log(this);    //this: React Component instance
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}></div>   //using bind
    );
  }
}
//or change the context of this.handleClick inside the constructor to avoid inline repetition
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);  //
  }
  handleClick() {
    console.log(this);    //this: React Component instance
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
}
```

Facebook does suggest the future removal of React.createClass completely in favour of ES6 classes. For now, use what makes sense, they’re both just syntax with different semantics that do the same thing - they’re both classes!
