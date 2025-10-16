import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppPage } from './App.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
