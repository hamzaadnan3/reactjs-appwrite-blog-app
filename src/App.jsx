import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const disptach = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          disptach(login(userData));
        } else {
          disptach(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      TODO:  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  );
}

export default App;
