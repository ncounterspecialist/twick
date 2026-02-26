import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ExampleVideo from './pages/example-video';
import ExampleDemo from './pages/example-demo';
import ExampleStudio from './pages/example-studio';
import ExampleRender  from './pages/example-render';
import StarterEdu from './pages/starter-edu';
import StarterDemo from './pages/starter-demo';
import StarterSocial from './pages/starter-social';

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
  },
  {
    path: '/starter/edu',
    element: <StarterEdu />,
  },
  {
    path: '/starter/demo',
    element: <StarterDemo />,
  },
  {
    path: '/starter/social',
    element: <StarterSocial />,
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
