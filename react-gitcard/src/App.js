import React from 'react';
import axios from 'axios';
import GitGrid from './components/GitGrid';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    console.log("App cDM starting.");

    axios.get('https://api.github.com/users/emilyelri')
    .then(response => {
      this.setState({ 
      users: [...this.state.users,  response.data]
    })})
    .catch(error => {
      console.log("Error fetching user.", error)})

      axios.get("https://api.github.com/users/emilyelri/followers")
      .then(response => {
        response.data.forEach(follower => {
        axios.get(follower.url)
        .then(response => {
          this.setState({users: [...this.state.users, response.data]})
        })
      })})
      .catch(error => console.log("Error fetching followers.", error))

      console.log(this.state.users)
  }

  render() { 
    return (
      <div className="App">
        <h1>My GitHub User Database</h1>
        <GitGrid users={this.state.users} />
      </div>
    )
  }
}

export default App;