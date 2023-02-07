import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { PrivateRoute } from './components/features';
import PersistLogin from './components/features/PersistLogin/PersistLogin';
import { ShareFiles, Connect, Register, Login } from './pages';
import Home from './pages/Home/Home';
import Missing from './pages/Missing/Missing';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import ROLES_LIST from './utils/rolesList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<h1>Welcomee</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<PersistLogin />}>
        <Route element={<PrivateRoute allowedRoles={[ROLES_LIST.ADMIN]} />}>
          <Route path="/connect" element={<Connect />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
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
