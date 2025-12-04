import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Login } from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
