import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ShareFiles, Connect } from './pages';

function ProtectedRoute() {
  const roomName = localStorage.getItem('roomName');
  return roomName ? <Outlet /> : <Navigate to="/" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Connect />} />
      <Route path="/share-files" element={<ProtectedRoute />}>
        <Route index element={<ShareFiles />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
