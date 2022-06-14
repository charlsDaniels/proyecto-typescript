import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/initialize";
import Loader from "../UI/Loader";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!authed) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
