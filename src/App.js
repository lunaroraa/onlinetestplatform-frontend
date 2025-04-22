import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import theme from './components/theme'; // Import your custom theme
import React, { useEffect, useState } from "react";
// Import Pages
import HomePage from "./components/home";
import WebcamProctoring from "./components/face";
import Proctoring from "./components/proctoring";
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/logout';
import ContactPage from './components/contact';
import TestWritePage from './components/testwrite';
import DashboardPage from './components/user-dashboard';
import UserDashboard from './components/admin-dashboard';
import CreateNewTest from './components/testcreation';
import InstructionPage from './components/instruction';
import AnnouncementsPage from './components/announcement';
import ManageTestsPage from './components/manage-tests';
import SettingsCustomizationPage from './components/usersetting';
import AdminSettingsPage from './components/adminsettings.js';
import AboutUsPage from './components/aboutus';
import TestHistory from './components/performancehistory';
import AttemptedTest from './components/attempted-tests';
import EditTestPage from './components/edit-test';
import QuestionCreator from './components/questioncreation';
import ProfileUser from './components/userprofile';
import ForgotPasswordPage from './components/forgotpassword';
import ChangePasswordPage from './components/changepassword';
import CoverPage from "./components/cover";
import ProctoringExitPage from "./components/exit";

import PreTestForm from "./components/testform";
import AdminProfile from "./components/admin-profile";


const App = () => {
  
    const [tests, setTests] = useState([]);

    // Fetch test data from Django backend
    useEffect(() => {
      const userToken = localStorage.getItem("user_token"); // Retrieve the user token from local storage
  
      fetch("https://onlineplatform.onrender.com/api/tests/", {
          method: "GET",
          headers: {
              "Authorization": `Token ${userToken}`, // Include the token in the Authorization header
              "Content-Type": "application/json" // Set the content type
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => setTests(data))
      .catch(error => console.error("Error fetching tests:", error));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/userprofile" element={<ProfileUser/>} />
          <Route path="/smartbridge/online-test-assessment/:uuid" element={<PreTestForm/>} />
          <Route path="/Proctoring" element={<WebcamProctoring/>} />
          <Route path="/image-capture" element={<Proctoring/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/smartbridge/online-test-assessment/:uuid/cover" element={<CoverPage />} />
          <Route path="/smartbridge/online-test-assessment/:uuid/write" element={<TestWritePage />} />
          <Route path="/questioncreation" element={<QuestionCreator />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/smartbridge/online-test-assessment/:uuid/exit" element={<ProctoringExitPage />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/edit-test/:testId" element={<EditTestPage />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/user-dashboard" element={<DashboardPage />} />
          <Route path="/admin-dashboard" element={<UserDashboard />} />
          <Route path="/testcreation" element={<CreateNewTest />} />
          <Route path="/performancehistory" element={<TestHistory />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/manage-tests" element={<ManageTestsPage />} />
          <Route path="/usersetting" element={<SettingsCustomizationPage />} />
          <Route path="/adminSettings" element={<AdminSettingsPage />} />
          <Route path="/announcement" element={<AnnouncementsPage />} />
          <Route path="/attempted-tests" element={<AttemptedTest />} />
          
          <Route path="/smartbridge/online-test-assessment/:uuid/instructions" element={<InstructionPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;