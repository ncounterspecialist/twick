import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JsonPlayer from './pages/JsonPlayer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">JSON Player</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<JsonPlayer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
