import React from 'react';
import axios from 'axios';
import GitGrid from './components/GitGrid';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: 'emilyelri',
      next: '',
      prev: '',
      first: '',
      last: '',
      input: '',
    }
  }

  accessGithub = user => {
    axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
      this.setState({ 
      users: [...this.state.users,  response.data]
    })})
    .catch(error => {
      console.log("Error fetching user.", error)})

      axios.get(`https://api.github.com/users/${user}/followers`)
      .then(response => {
        console.log("FETCHING FOLLOWERS", response)
        this.setState({next: response.headers.link});
        this.setState({prev: response.headers.link});
        this.setState({first: response.headers.link});
        this.setState({last: response.headers.link});
        response.data.forEach(follower => {
        axios.get(follower.url)
        .then(response => {
          this.setState({users: [...this.state.users, response.data]})
        })
      })})
      .catch(error => console.log("Error fetching followers.", error))

      console.log(this.state.users)
  }

  //lifecycle and form methods

  componentDidMount() {
    console.log("App cDM starting.");
    this.accessGithub(this.state.user);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.user !== prevState.user){
      this.accessGithub(this.state.user);
    }
  }

  handleChange = (e) => {
    console.log("user input:", e.target.value);
    this.setState({input: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({users: []});
    this.setState({user: this.state.input})
    e.target.value = '';
  }

  render() { 
    return (
      <div className="App">
        <h1>{this.state.user}'s GitHub User Database</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <label></label>
          <input type="text" name="user" placeholder="...user" onChange={this.handleChange} />
          <button type="submit">Change</button>
        </form>
        <GitGrid users={this.state.users} />
        <div className="pagination">
        <button className="pag-btn">First</button><button className="pag-btn">Previous</button><button className="pag-btn">Next</button><button className="pag-btn">Last</button>
        </div>
      </div>
    )
  }
}

export default App;