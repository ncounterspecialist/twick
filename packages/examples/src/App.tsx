import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExampleVideo from './pages/example-video';
import ExampleEditor from './pages/example-editor';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Player</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/demo">Demo</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ExampleVideo />} />
          <Route path="/editor" element={<ExampleEditor />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
