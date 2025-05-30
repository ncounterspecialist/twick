import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExampleVideo from './pages/example-video';
import ExampleCanvas from './pages/example-canvas';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Example Video</Link>
          <Link to="/canvas">Example Canvas</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ExampleVideo />} />
          <Route path="/canvas" element={<ExampleCanvas />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
