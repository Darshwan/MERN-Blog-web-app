import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Projects from "./Projects.jsx";
import Home from "./Home.jsx";
import SignIn from "./Sign-in.jsx";
import SignUp from "./Components/Signup.jsx";
// import Dashboard from "./Dashboard.jsx";
import ThemeProvider from './ThemeProvider.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Posts from "./Components/Posts/Posts.jsx";
import PrivateRoutePost from "./Components/Posts/PrivateRoutePost.jsx";

// import { store } from './app/store
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";


import PostPage from "./Components/Posts/PostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/post/:postSlug",
    element: <PostPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/dashboard",
    element: <PrivateRoute />,
  },
  {
    path: "/posts/create",
    element: <PrivateRoutePost />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
