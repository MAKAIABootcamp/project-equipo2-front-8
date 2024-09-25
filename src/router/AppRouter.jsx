import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Regsiter/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin"
import VerificationCode from "../pages/VerificationCode/VerificationCode"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../redux/auth/authSlice";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Tips from "../pages/Tips/Tips";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((store) => store.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const loggedInUser = {
          id: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber || null,
          photoURL: authUser.photoURL,
          accessToken: authUser.accessToken,
        };
        dispatch(restoreSession(loggedInUser));
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (loading || checking) return <div>... Cargando</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route >
            <Route index element={<Home />} />
            <Route path="tips" element={<Tips />} />
          </Route>
          <Route  >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="phoneLogin" element={<PhoneLogin />} />
            <Route path="verificationCode/:phoneNumber" element={<VerificationCode />} />
          </Route>
          <Route path="*" element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter