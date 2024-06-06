import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';
import { Header } from './components/Header';
import { $auth } from './context/auth';
import { $alert } from './context/alert';
import { Alert } from './components/Alert/Alert';

const App = () => {
  const isLoggedIn = useUnit($auth);
  const alert = useUnit($alert);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/costs" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/costs" /> : <AuthPage type="login" />}
          />
          <Route
            path="/registration"
            element={isLoggedIn ? <Navigate to="/costs" /> : <AuthPage type="registration" />}
          />
          <Route path="/costs" element={isLoggedIn ? <h1>COSTS</h1> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
