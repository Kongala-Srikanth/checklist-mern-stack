import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import ApplyApplication from './components/ApplyApplication';
import ApplicationLists from './components/ApplicationLists';
import ApplicationDetails from './components/ApplicationDetails'
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/application' component={ApplyApplication} />
      <Route exact path='/applications/list' component={ApplicationLists} />
      <Route exact path='/application/:id' component={ApplicationDetails} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
