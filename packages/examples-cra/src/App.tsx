import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ExampleVideo from './pages/example-video';
import ExampleDemo from './pages/example-demo';
import ExampleStudio from './pages/example-studio';
import ExampleRender from './pages/example-render';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExampleStudio />,
  },
  {
    path: '/player',
    element: <ExampleVideo />,
  },
  {
    path: '/demo',
    element: <ExampleDemo />,
  },
  {
    path: '/render',
    element: <ExampleRender />,
  }
]);

function App() {
  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
