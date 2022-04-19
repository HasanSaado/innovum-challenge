// Libraries                                                                                                                                                                                                                     
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LibraryPage } from './pages/LibraryPage';

// Style
import 'bootstrap/dist/css/bootstrap.min.css';

// Route
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';

function App() {

  /**
   * 
   */
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<LoginPage/>}
        />
        <Route
          path="/register"
          element={<RegisterPage/>}
        />
        <Route
          path="/library"
          exact
          element={<PrivateRoute redirectTo={"/"}>
            <LibraryPage/>
          </PrivateRoute>}
        />
        {/* <PrivateRoute
          path="/library"
          element={<LibraryPage/>}
          redirectPath="/"
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
