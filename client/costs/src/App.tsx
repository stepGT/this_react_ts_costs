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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
