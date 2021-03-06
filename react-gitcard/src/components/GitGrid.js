import React from 'react';
import GitCard from './GitCard';

class GitGrid extends React.Component {

  componentDidMount() {
      console.log("GitGrid component did mount.")
  }

  render() {
    return (
      <>
        {this.props.users.map(user => 
           <GitCard key={user.id} user={user} />
        )}
      </>
    )
  }
}

export default GitGrid;