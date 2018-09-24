import React from 'react';

const RepoList = (props) => {
  
  return (
    <section>
      <ul className="repoList repoList__heading">
        <li><h4>Name</h4></li>
        <li><h4>Language</h4></li>
        <li><h4>Latest Tag</h4></li>
      </ul>
    {
      props.repoList ?
        <ul className="">
          {
            props.repoList.map((repo, i) => {
              return (
                <li className="repoList" data-full_name={repo.full_name} key={i}>
                  <a href={repo.html_url}>
                    <h4>{repo.full_name}</h4>
                  </a>
                  <h4>{repo.language}</h4>
                  <h4>{repo.recentTag}</h4>
                  {
                    repo.add ?
                    <button className="moveRepoButton" onClick={props.addToFavourites}>Add</button>
                    :
                      <button className="moveRepoButton" onClick={props.removeFromFavourites}>Remove</button>
                  }
                </li>
              )
            })
          }
        </ul>
      : null
      }
    </section>
  )
}

export default RepoList;