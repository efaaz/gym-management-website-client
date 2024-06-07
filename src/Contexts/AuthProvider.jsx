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
  const provider = new GoogleAuthProvider();
  const GitHubProvider = new GithubAuthProvider();

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth).then(() => {
      localStorage.removeItem('access-token');
      setUser(null);
      setLoading(false);
    });
  };

  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  const gitHubSignin = () => {
    return signInWithPopup(auth, GitHubProvider);
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
      // console.log("Auth state changed. Current user:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post('/jwt', userInfo);
          if (res.data.token) {
            // console.log("Token received:", res.data.token);
            localStorage.setItem('access-token', res.data.token);
          }
        } catch (error) {
          console.error("Failed to fetch token:", error);
        }
      } else {
        localStorage.removeItem('access-token');
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
    gitHubSignin,
    logOut,
    updateProfile,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
