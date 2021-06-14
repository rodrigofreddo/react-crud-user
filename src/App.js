import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CreateAccountPage from './pages/CreateAccountPage';
import EditAccountPage from './pages/EditAccountPage';

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
        <Route path="edit-account/:id">
          <EditAccountPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
