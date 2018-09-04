import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HomePageContainer from './pages/home/HomePageContainer';
import DealsPageContainer from './pages/deals/DealsPageContainer';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <Route exact path="/deals" component={DealsPageContainer} />
    </Switch>
  </BrowserRouter>
);

export default App;
