import React from 'react';

function GitCard (props) {
    const user = props.user;
    const startDate = user.created_at.slice(0, 10);
    // console.log("GitCard props:", user);

    return (
        <div className="card">
            <img src = {user.avatar_url} alt="user profile" />
            <div className="user-info">   
                <span className="name">{user.name}</span>
                <span className="login">{user.login}</span>
                <span><a href={user.html_url}><button className="gh-btn"><img className="gh" alt="github icon" src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} /></button></a></span>
                <h4>{user.location}</h4>
                <p>{user.bio}</p>
            </div>
            <div className="user-stats">
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Member Since: {startDate}</p>
            </div>
        </div>
    )
}

export default GitCard;