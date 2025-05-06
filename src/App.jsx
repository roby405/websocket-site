/* eslint-disable react/prop-types */
import "./App.css";
import ToDoApp from "./pages/ToDoApp";
import ChatApp from "./pages/ChatApp";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/sections/NavBar";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthProvider, useAuth } from "./components/sections/AuthContext.jsx";
import { useEffect } from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<ChatApp />} />
              <Route path="todo" element={<ToDoApp />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-row">
      <NavBar />
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate]);
  return isAuthenticated ? <Outlet /> : null;
}

export default App;
