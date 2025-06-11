import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExampleVideo from './pages/example-video';
import ExampleCanvas from './pages/example-canvas';
import ExampleTimeline from './pages/example-timeline';
import ExampleEditor from './pages/example-editor';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Player</Link>
          <Link to="/canvas">Canvas</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/editor">Editor</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ExampleVideo />} />
          <Route path="/canvas" element={<ExampleCanvas />} />
          <Route path="/timeline" element={<ExampleTimeline />} />
          <Route path="/editor" element={<ExampleEditor />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
