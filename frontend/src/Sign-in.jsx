/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Components/Header";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import {
  SignInStart,
  signInSuccess,
  signInFailure,
} from "./redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "./Components/OAuth";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMsg } = useSelector((state) => state.user);
  // Making a constant and pass it to as prop for succesfull signup message
  const [signupMsg, setsignupMsg] = useState(false);
  // Handle changes in form inputs
  const handleChangeInForm = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("please fill out all the fields"));
    }

    try {
      dispatch(SignInStart());

      // Send a POST request to the server
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      // Parse the JSON response
      const data = await res.json();

      // Handle error responses from the server
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard/?tab=profile");

        setsignupMsg(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      dispatch(signInFailure(error.message));
      // setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[100vh]  flex flex-col ">
        <section className="w-full h-full py-4 md:py-24 lg:py-12 bg-gray-100 dark:bg-slate-950">
          <div className="container flex flex-col sm:flex-row items-center justify-center gap-6 px-4 md:px-6 ">
            <div className="space-y-4">
              <Link
                to="/"
                className="self-center hidden lg:inline whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
              >
                <span className="text-center px-2 mx-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                  Blog{" "}
                </span>
                App
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Login to access you content
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                login and unlock your exclusive content, community features, and
                powerful publishing tools.
              </p>
            </div>
            <div
              className="rounded-lg border dark:border-slate-800 dark:shadow-stone-700 bg-card text-card-foreground shadow-lg bg-white dark:bg-black w-full max-w-md"
              data-v0-t="card"
            >
              <div className="flex flex-col px-6 py-4 space-y-1">
                <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
                  login into an account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your details to get started.
                </p>
              </div>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="p-6 grid gap-2">
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 bg-gray-100"
                      id="username"
                      placeholder="John Doe"
                      type="text"
                      onChange={handleChangeInForm}
                      required=""
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100 dark:bg-slate-950"
                      onChange={handleChangeInForm}
                      id="password"
                      type="password"
                    // required="true"
                    />
                  </div>
                </div>
                <div className="px-6">
                  Not signed in yet ?{" "}
                  <Link to="/signup" className="text-blue underline">
                    Signup
                  </Link>
                </div>
                <div className="flex flex-row gap-2 items-center p-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2  disabled:opacity-50 bg-black text-white  hover:bg-slate-900 h-10 px-4 py-2 w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3"> Loading....</span>
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <OAuth />
                </div>
                {errorMsg && (
                  <Alert className="mt-1" color="red">
                    {errorMsg}
                  </Alert>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignIn;
