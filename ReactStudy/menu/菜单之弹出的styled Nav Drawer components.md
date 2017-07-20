### Styled Nav Drawer components

#### library and plugin needed

```shell
yarn add material-ui
yarn add react-tap-event-plugin
yarn add styled-components
```

#### single component

```javascript
import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/svg-icons/navigation/menu'

const StayVisible = styled.div`
  position: aboslute;
  margin-left: ${(props)=>(props.open)?`${props.width}px`:'none'};
  transition: margin .2s;
`
class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      width: 200
    };
  }

  toggle = () => {
    this.setState((prevState, props) => {
      return {
        open: !prevState.open
      }  
    });
  }

  render(){
    return (
      <div>
        <StayVisible
          open={this.state.open}
          width={this.state.width}
        >
          <FloatingActionButton onTouchTap={this.toggle}><Menu /></FloatingActionButton>
        </StayVisible>
        <Drawer 
          open={this.state.open}
          width={this.state.width}>
          <div 
            style={{
              height: '200px',
              width: '100%',
              backgroundColor: 'salmon'
            }}
          >LoginContainer</div>
          <Link to='/'>
            <MenuItem primaryText="Play" onTouchTap={this.toggle}></MenuItem>
          </Link>
          <Link to='/profile'>
            <MenuItem primaryText="Profile" onTouchTap={this.toggle}></MenuItem>
          </Link>
          <Divider />
          <MenuItem primaryText="TicTacToe" />
        </Drawer>
      </div>
    )
  }
}
export default NavDrawer;
```

#### seperate components

```javascript
//components\NavDrawer.js
import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavToggleButton from '../styled/NavDrawer'

class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {   // two parameters pass to styled\NavDrawer.js
      open: false,
      width: 200
    };
  }
  toggle = () => {  // one method pass to styled\NavDrawer.js
    this.setState((prevState, props) => {
      return { open: !prevState.open }  
    });
  }
  render(){
    return (
      <div>
        <NavToggleButton 
          toggle={this.toggle}
          open={this.state.open}
          width={this.state.width}
        />
        <Drawer 
          open={this.state.open}
          width={this.state.width}>
          <div style={{height: '200px',width: '100%',backgroundColor: 'salmon'}}>LoginContainer</div>
          <Link to='/'><MenuItem primaryText="Play" onTouchTap={this.toggle}></MenuItem></Link>
          <Link to='/profile'><MenuItem primaryText="Profile" onTouchTap={this.toggle}></MenuItem></Link>
          <Divider />
          <MenuItem primaryText="TicTacToe" />
        </Drawer>
      </div>
    )
  }
}
export default NavDrawer;
//styled\NavDrawer.js
import React from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/svg-icons/navigation/menu'

const StayVisible = styled.div`
  position: aboslute;
  margin-left: ${(props)=>(props.open)?`${props.width}px`:'none'};
  transition: margin .2s;
`
const NavToggleButton = (props) => {  // note: need props
  return (
    <StayVisible {...props}>    //pass all parent component props to child component
      <FloatingActionButton onTouchTap={props.toggle}>
        <Menu />
      </FloatingActionButton>
    </StayVisible>
  )
};
export default NavToggleButton;
```
