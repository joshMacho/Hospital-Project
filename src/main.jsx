import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import AdminPage from './components/AdminPage.jsx';
import Login from './components/Login.jsx';
import PreviousRecord from './components/PreviousRecord.jsx';
import  Consultations  from './components/Doctor/Consultations.jsx';
import ConsultationsDetails from './components/ConsultationDetails.jsx';



//you can add your pages here for navigation
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/previous",
    element: <PreviousRecord />
  },
  {
    path: "/consultations",
    element: <Consultations />
  },
  {
    path: "/consultationdetails/:patientID",
    element: <ConsultationsDetails />
  },


]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
