import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Home from '../components/Home/Home';
import Plans from '../components/Plans/Plans'
import Layout from './Layout';
import PlanDetails from '../components/PlanDetails/PlanDetails';
import PlanForm from '../components/PlanForm/PlanForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "plans/:planId/edit",
        element: <PlanForm />,
      },
      {
        path: "plans/:planId",
        element: <PlanDetails />,
      },
      {
        path: "plans",
        element: <Plans />,
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
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
