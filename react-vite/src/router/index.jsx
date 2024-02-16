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
import EditPlaceForm from '../components/EditPlaceForm';
import CreatePlaceForm from '../components/CreatePlaceForm';
import PlaceDetails from '../components/PlaceDetails';
import ManagePlaces from '../components/ManagePlaces/ManagePlaces';
import Stories from '../components/Stories';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "plans/new",
        element: <CreatePlanForm />,
      },
      {
        path: "places/new",
        element: <CreatePlaceForm />,
      },
      {
        path: "plans/current",
        element: <ManagePlans />,
      },
      {
        path: "places/current",
        element: <ManagePlaces />,
      },
      {
        path: "plans/:planId/edit",
        element: <EditPlanForm />,
      },
      {
        path: "places/:placeId/edit",
        element: <EditPlaceForm />,
      },
      {
        path: "plans/:planId",
        element: <PlanDetails />,
      },
      {
        path: "places/:placeId",
        element: <PlaceDetails />,
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
        path: "stories",
        element: <Stories />,
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
