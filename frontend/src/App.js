import React, { useState } from 'react';
import {BrowserRouter as Router,
   Route, 
   Redirect, 
   Switch} from 'react-router-dom';

import Home from './pages/Home'
import Results from './pages/Results'
import SingleView from './pages/SingleView';
import MainNavigation from './components/MainNavigation'
import Signup from './pages/Signup'
import AddReview from './components/AddReview'
import { SearchContext} from './context/search'


function App() {
  const [animeData, setAnimeData] = useState([])
  const [singleData, setSingleData] = useState({})

  const setData = (data) =>{
    setAnimeData(data)
  }
  const setSingle = (data) => {
    setSingleData(data)
  }
  const search = (searchTerm) => {
    return fetch(
      `https://api.aniapi.com/v1/anime?title=${searchTerm}`
    ).then((response)=>response.json())
  }
  return (
    <SearchContext.Provider
    value={{ search, animeData, setData, singleData, setSingle }}
  >
  <Router>
    <MainNavigation/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/signup" exact>
          <Signup/>
        </Route>
        <Route path="/results" exact>
          <Results/>
        </Route>
        <Route path="/single-view" exact>
          <SingleView/>
        </Route>
        <Route path="/addreview" exact>
          <AddReview/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </main>
  </Router>
  </SearchContext.Provider>
  )}

export default App;
