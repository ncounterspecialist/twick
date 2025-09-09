import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExampleVideo from './pages/example-video';
import ExampleDemo from './pages/example-demo';
import ExampleStudio from './pages/example-studio';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <nav className="nav-menu">
          <Link to="/">Studio</Link>
          <Link to="/player">Player</Link>
          <Link to="/demo">Demo</Link>
        </nav> */}
        
        <Routes>
          <Route path="/" element={<ExampleStudio />} />
          <Route path="/player" element={<ExampleVideo />} />
          <Route path="/demo" element={<ExampleDemo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
