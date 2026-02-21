import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Root component – sets up routing.
 *   /login    → public
 *   /register → public
 *   /tasks    → protected (requires JWT)
 *   /         → redirects to /tasks
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* Catch-all → redirect to tasks (guard will bounce to login if needed) */}
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
