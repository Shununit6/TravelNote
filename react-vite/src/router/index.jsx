import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Home from '../components/Home/Home';
import Plans from '../components/Plans/Plans'
import Layout from './Layout';
import PlanDetails from '../components/PlanDetails/PlanDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "plans/:planId",
        element: <PlanDetails />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
    ],
  },
]);
