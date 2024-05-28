import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages";
import HomePage from "../pages/home";

import SignUpScreen from "../pages/Signup";
import VerifyNotification from "../pages/verify";
import SignInScreen from "../pages/SignIn";
import ForgotpasswordScreen from "../pages/forgot-password";
import ChangePassword from "../pages/changePassword";
import ProfileScreen from "../pages/profile";
import UpdatePassword from "../pages/updatePassword";
import Dashboard from "../pages/dashboard";

import SignInAsEnterpriseScreen from "../pages/SignInAsEn";
import SignUpAsEnterpriseScreen from "../pages/SignupAsEn";
import ForgotpasswordEnScreen from "../pages/forgot-passord-En";
import ChangePasswordEn from "../pages/changePasswordEn";
import ProfileEnScreen from "../pages/profileEn";
import UpdatePasswordEn from "../pages/updatePasswordEn";
import EnVerifyNotification from "../pages/verifyEn";
const RouterManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/register" element={<SignUpScreen />}></Route>
        <Route path="/login" element={<SignInScreen />}></Route>
        <Route path="/verify" element={<VerifyNotification />}></Route>
        <Route path="/forgot-password" element={<ForgotpasswordScreen />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/update-password" element={<UpdatePassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

        <Route path="/enterprise/register" element={<SignUpAsEnterpriseScreen />}></Route>
        <Route path="/enterprise/login" element={<SignInAsEnterpriseScreen />}></Route>
        <Route path="/enterprise/forgot-password" element={<ForgotpasswordEnScreen />}></Route>
        <Route path="/enterprise/change-password" element={<ChangePasswordEn />}></Route>
        <Route path="/enterprise/profile" element={<ProfileEnScreen />}></Route>
        <Route path="/enterprise/update-password" element={<UpdatePasswordEn />}></Route>
        <Route path="/enterprise/verify" element={<EnVerifyNotification />}></Route>

      </Route>
    </Routes>
  );
};
export default RouterManagement;
