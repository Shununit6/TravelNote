import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Home from '../components/Home';
import Plans from '../components/Plans';
import Layout from './Layout';
import PlanDetails from '../components/PlanDetails';
import EditPlanForm from '../components/EditPlanForm';
import CreatePlanForm from '../components/CreatePlanForm';
import ManagePlans from '../components/ManagePlans/ManagePlans';
import Places from '../components/Places/Places';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "plans/new",
        element: <CreatePlanForm />,
      },
      {
        path: "plans/current",
        element: <ManagePlans />,
      },
      {
        path: "plans/:planId/edit",
        element: <EditPlanForm />,
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
        path: "places",
        element: <Places />,
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
