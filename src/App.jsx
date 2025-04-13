import "./App.css";
import ToDoApp from "./pages/ToDoApp";
import ChatApp from "./pages/ChatApp";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/sections/NavBar";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChatApp />} />
          <Route path="todo" element={<ToDoApp />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
