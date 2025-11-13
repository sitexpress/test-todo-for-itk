import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppPage } from './pages/Todo-page/Todo.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
