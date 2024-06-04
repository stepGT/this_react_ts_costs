import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';
import { Header } from './components/Header';
import { $auth } from './context/auth';

const App = () => {
  const isLoggedIn = useUnit($auth);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/costs" /> : <Navigate to="login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/costs" /> : <AuthPage type="login" />}
          />
          <Route
            path="/registration"
            element={isLoggedIn ? <Navigate to="/costs" /> : <Navigate to="login" />}
          />
          <Route path="/costs" element={isLoggedIn ? <h1>COSTS</h1> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
