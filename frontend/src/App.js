import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HomePageContainer from './pages/home/HomePageContainer';
import DealsPageContainer from './pages/deals/DealsPageContainer';
import DashboardPage from './pages/dashboard/DashboardPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <Route exact path="/deals" component={DealsPageContainer} />
      <Route exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
