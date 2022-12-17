import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {RouterProvider} from 'react-router-dom'
import router from './router'
import 'antd/dist/reset.css';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
