import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile as updateProfileFirebase,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      return signOut(auth).then(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      });
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (displayName, photoURL) => {
    setLoading(true);
    try {
      await updateProfileFirebase(auth.currentUser, { displayName, photoURL });
      setUser((prevUser) => ({
        ...prevUser,
        displayName,
        photoURL,
      }));
    } catch (error) {
      throw new Error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (error) {
          console.error("Failed to fetch token:", error);
        }
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    signUp,
    signIn,
    googleSignin,
    logOut,
    updateProfile,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
