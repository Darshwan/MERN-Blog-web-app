/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "./OAuth";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Making a constant and pass it to as prop for succesfull signup message
  const [signupMsg, setsignupMsg] = useState(false)
  // Handle changes in form inputs
  const handleChangeInForm = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log( e.target.value);
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMsg("Please fill out all fields");
    }

    try {
      setLoading(true);

      // Log the formData being sent to the server
      console.log("Sending data:", formData);

      // Send a POST request to the server
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check for response status
      console.log("Response status:", res.status);

      // Parse the JSON response
      const data = await res.json();
      console.log("Response data:", data);

      // Handle error responses from the server
      if (data.success === false) {
        setLoading(false);
        return setErrorMsg(data.message);
      }

      setLoading(false);

      // Navigate to the sign-in page if the request is successful
      if (res.ok) {
        navigate("/login");
        setsignupMsg(true)
      }
    } catch (error) {
      // Handle any errors during the fetch process
      console.error("Fetch error:", error);
      setErrorMsg("Failed to fetch");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[100vh] flex flex-col">
        <section className="w-full py-4 md:py-24 lg:py-12 bg-gray-100 dark:bg-slate-950">
          <div className="container flex flex-col sm:flex-row items-center justify-center gap-6 px-4 md:px-6 ">
            <div className="space-y-4 ">
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
                Join our blogging community
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sign up today and unlock exclusive content, community features,
                and powerful publishing tools.
              </p>
            </div>
            <div
              className="rounded-lg border dark:border-slate-800 dark:shadow-stone-700 bg-card text-card-foreground shadow-lg bg-white dark:bg-black w-full max-w-md"
              data-v0-t="card"
            >
              <div className="flex flex-col px-6 py-4 space-y-1">
                <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">
                  Create an account
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
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 bg-gray-100"
                      id="email"
                      placeholder="m@example.com"
                      // required="true"
                      onChange={handleChangeInForm}
                      type="email"
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
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-slate-950 bg-gray-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      onChange={handleChangeInForm}
                      id="password"
                      type="password"
                    // required="true"
                    />
                  </div>
                </div>
                <div className="px-6">
                  Already signed up ? <Link to='/login' className='text-blue underline' >login</Link>
                </div>
                <div className="flex flex-col gap-2 items-center p-6">
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
                      "Sign up"
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 px-4 md:px-6 ">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Exclusive content and community
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                As a member, you will gain access to our exclusive blog content,
                engage with our vibrant community, and utilize our powerful
                publishing tools to{" "}
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Exclusive Content</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Unlock access to our premium blog posts, tutorials, and
                  behind-the-scenes content.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Community Features</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage with fellow bloggers, share ideas, and collaborate on
                  projects.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Publishing Tools</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Utilize our powerful writing and publishing tools to create
                  and share your content{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignUp;
