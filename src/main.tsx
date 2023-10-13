import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage.tsx';
import CharityDetail from './components/CharityDetail.tsx';
import FavouriteCharities from './components/FavouriteCharities.tsx';
import CharityList from './components/CharityList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CharityList />
      },
      {
        path: "/charity/:id",
        element: <CharityDetail />,
      },
      {
        path: "/favourite",
        element: <FavouriteCharities/>
      }
    ]
  },
  {
    path: "/error",
    element: <ErrorPage />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)

