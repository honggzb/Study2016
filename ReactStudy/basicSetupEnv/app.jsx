class HelloWorld extends React.Component {
  render(){
    return (
      <h2>Hello World from react!</h2>
    );
  }
}

React.render(
  <HelloWorld />,
  document.getElementById('content')
)
