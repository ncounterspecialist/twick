import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExampleVideo from './pages/example-video';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Example Video</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ExampleVideo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
