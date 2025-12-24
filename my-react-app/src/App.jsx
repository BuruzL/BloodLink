import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Landing from "./pages/Landing.jsx";
import AuthLogin from "./pages/AuthLogin.jsx";
import AuthRegister from "./pages/AuthRegister.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import RequestBlood from "./pages/RequestBlood.jsx";
import SearchDonors from "./pages/SearchDonors.jsx";
import RequestDetail from "./pages/RequestDetail.jsx";
import Profile from "./pages/Profile.jsx";
import DonorSettings from "./pages/DonorSettings.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="appShell">
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />

          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor"
            element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <RequestBlood />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchDonors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/request/:id"
            element={
              <ProtectedRoute>
                <RequestDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor-settings"
            element={
              <ProtectedRoute>
                <DonorSettings />
              </ProtectedRoute>
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
