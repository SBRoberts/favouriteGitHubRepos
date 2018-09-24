import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

// COMPONENTS
import RepoList from './components/RepoList'
import Form from './components/Form'

class App extends Component {
  constructor(){
    super()
    this.state = {
      repoQuery: [],
      favouriteRepos: [],
    }
  }
  // MAKE SECOND API TO GET TAGS
  // https://api.github.com/repos/Shopify/polaris-telescope/tags
  componentDidMount(){
  }

  queryGitHub = (searchTerm) => {
    axios.get(`https://api.github.com/search/repositories?q=${searchTerm}&sort=&order=desc`)
    .then(({data}) => {
      
      let refinedData = data.items.map((repo) => {
        const repoObj = {
          full_name: repo.full_name,
          html_url: repo.html_url ,
          language: repo.language,
          tags_url: repo.tags_url, 
          add: true,
        }
        
        // console.log(data.items.tags_url)
        return repoObj
        
      }).slice(0,10)
      this.setState({
        repoQuery: refinedData,
      }, () => {
        this.getTags(this.state.repoQuery)
      })
      // console.log(refinedData);
    })
  }

  getTags = (array) => {

    // create a temporary array to push mutated objects
    const tempArr = []

    // map through array, retrive tags w/ api call
    array.map((repo) => {
      axios.get(`${repo.tags_url}`)
      .then(({ data }) => {

        // if there is a tag, use it, else blank
        const recentTag = data.length > 0 ? data[0].name : "";
        repo.recentTag = recentTag

        // push mutated object to tempArr and set repoQuery to tempArr in state
        tempArr.push(repo)
        this.setState({
          repoQuery: tempArr,
        })

      })
    })
  }

  addToFavourites = (e) => {
    const repoName = e.currentTarget.parentElement.dataset.full_name

    // make a clone of our queried repos/favouriterepos so we don't mutate state directly
    // create empty array to hold favourited repos
    const favouriteRepos = Array.from(this.state.favouriteRepos)
    const queryClone = Array.from(this.state.repoQuery)

    // use filter method to find repo that matched the one clicked
    const matchedRepo = queryClone.filter((repo) => repo.full_name === repoName)
    matchedRepo[0].add = false;

    //get index of matched repo, add object to favouriteRepos in state
    const repoIndex = queryClone.indexOf(matchedRepo[0])

    // remove the matched repo from the query clone so we can update state to exclude it
    queryClone.splice(repoIndex,1)

    // push the matched repo to our favourites list
    favouriteRepos.push(matchedRepo[0])

    this.setState({
      repoQuery: queryClone,
      favouriteRepos: favouriteRepos,
    })
  }

  removeFromFavourites = (e) => {
    
    const repoName = e.currentTarget.parentElement.dataset.full_name

    // make a clone of our queried favouriterepos so we don't mutate state directly
    // create empty array to hold favourited repos
    const favouriteRepos = Array.from(this.state.favouriteRepos)
    const queryClone = Array.from(this.state.repoQuery)

    // use filter method to find repo that matched the one clicked
    const matchedRepo = queryClone.filter((repo) => repo.full_name === repoName)

    //get index of matched repo, add object to favouriteRepos in state
    const repoIndex = queryClone.indexOf(matchedRepo[0])

    // remove the matched repo from the query clone so we can update state to exclude it
    favouriteRepos.splice(repoIndex, 1)

    this.setState({
      favouriteRepos: favouriteRepos,
    })
  }

  // handleSubmit is only being used to process the primary search form
  handleSubmit = (e) => {
    e.preventDefault()
    // get value from the search term it will return the first input, which is always the search, not submit
    const searchTerm = e.target.querySelector('input').value
    this.setState({
      searchTerm,
      // add a callback to make api after state is set
    }, () => {
      this.queryGitHub(this.state.searchTerm)
    })
  }

  // handleChange is only being used on search input
  handleChange = (e) => {
    // if the value of the event target's length is 0, empty the repo query in state
    if(e.target.value.length === 0){
      this.setState({
        repoQuery: [],
      })
    }
    
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>My GitHub Favourites</h1>
          </div>
        </header>
        <div className="row">
          <section className="searchContainer half">
            <div className="wrapper">
              <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
              <RepoList repoList={this.state.repoQuery} addToFavourites={this.addToFavourites}/>
            </div>
          </section>
          <section className="favouritesContainer half">
            <div className="wrapper">
              {
                this.state.favouriteRepos.length > 1
                ?
                  <RepoList repoList={this.state.favouriteRepos} removeFromFavourites={this.removeFromFavourites} />
                :
                null
              }
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
