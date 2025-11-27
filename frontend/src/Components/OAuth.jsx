/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
} from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (resultsFromGoogle) => {
        if (resultsFromGoogle?.user) {
          const res = await fetch("http://localhost:3000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleUserName: resultsFromGoogle.user.displayName,
              imageUrl: resultsFromGoogle.user.photoURL,
              email: resultsFromGoogle.user.email,
              uid: resultsFromGoogle.user.uid,
            }),
            credentials: "include"
          });
          const data = await res.json();
          if (res.ok) {
            dispatch(signInSuccess(data.user));
            console.log(`Navigating to /dashboard`);
            navigate("/dashboard/?tab=profile");
          }
        }
      })
      .catch((err) => console.log(err));
  }, [auth, dispatch, navigate]);

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-slate-900 h-10 py-2 w-full"
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="w-6 h-5 mr-2" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
