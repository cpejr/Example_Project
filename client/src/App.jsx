import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ShareFiles, Connect } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Connect />} />
      <Route path="/share-files" element={<ShareFiles />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
