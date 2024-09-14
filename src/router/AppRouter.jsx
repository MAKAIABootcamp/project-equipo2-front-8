import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Regsiter/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin"
import VerificationCode from "../pages/VerificationCode/VerificationCode"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="phoneLogin" element={<PhoneLogin />} />
          <Route path="verificationCode/:phoneNumber" element={<VerificationCode />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter