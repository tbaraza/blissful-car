import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HomePageContainer from './pages/home/HomePageContainer';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
    </Switch>
  </BrowserRouter>
);

export default App;
