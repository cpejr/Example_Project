import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { SendFiles } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<SendFiles />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
