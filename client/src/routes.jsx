import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { PrivateRoute } from './components/features';
import PersistLogin from './components/features/PersistLogin/PersistLogin';
import { ShareFiles, Connect, Register, Login, Links } from './pages';
import Home from './pages/Home/Home';
import Missing from './pages/Missing/Missing';
import Unauthorized from './pages/Unauthorized/Unauthorized';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<PersistLogin />}>
        <Route element={<PrivateRoute />}>
          <Route path="links" element={<Links />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/share-files" element={<ShareFiles />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Missing />} />
    </Route>
  )
);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
