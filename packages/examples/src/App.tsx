import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExampleVideo from './pages/example-video';
import ExampleCanvas from './pages/example-canvas';
import ExampleTimeline from './pages/example-timeline';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Example Video</Link>
          <Link to="/canvas">Example Canvas</Link>
          <Link to="/timeline">Example Timeline</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ExampleVideo />} />
          <Route path="/canvas" element={<ExampleCanvas />} />
          <Route path="/timeline" element={<ExampleTimeline />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
