import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage';
import EditAccountPage from './pages/EditAccountPage/EditAccountPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route path="/dashboard" render={(props) => <DashboardPage {...props}/>}/>
        <Route path='/create-account'>
          <CreateAccountPage />
        </Route>
        <Route path="/edit-account" render={(props) => <EditAccountPage {...props}/>}/>
      </Router>
    </div>
  );
}

export default App;
