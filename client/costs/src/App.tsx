import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';
import { Header } from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage type="login" />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/registration" element={<AuthPage type="registration" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
