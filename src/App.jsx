import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import {Login} from "./pages/Login";
import Connection from "./components/Connection";
import ViewProfile from "./pages/ViewProfile";
import Request from "./components/Request";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connection />} />
          <Route path="/request"element={<Request />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
