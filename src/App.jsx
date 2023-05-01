import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Bookmarks from './pages/Boolmarks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
import Notfound from './pages/Notfound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Route>
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
