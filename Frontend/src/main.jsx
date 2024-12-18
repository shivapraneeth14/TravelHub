import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './Components/Home.jsx';
import AI from './Components/AI.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Stays from './Components/Stays.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Group from './Components/Group.jsx';
import Social from './Components/Social.jsx';
import { Provider } from 'react-redux';
import { store } from './Components/Store.js';
import Profile from './Components/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />
  },
  {
    path: "/user/:username",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "Ai",
        element: <AI />
      },
      {
        path: "Stays",
        element: <Stays />
      },
      {
        path: "Group",
        element: <Group />
      },
      {
        path: "Social",
        element: <Social />
      },
      {
        path:"Profile",
        element:<Profile/>
      }

    ]
  },
  {
    path: "/Signup",
    element: <Signup />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
