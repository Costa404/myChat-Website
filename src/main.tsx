import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Authentication from "./components/Authentication/Authentication";
import "./index.css";
import UseChat from "./components/chat/Chat";
import { AuthProvider } from "./components/Authentication/hooksAuthentication/useAuthContext";
import { ErrorProvider } from "./components/errorContext/useError";
import ErrorDisplay from "./components/errorContext/ErrorDisplay";
import { UserProvider } from "./components/Users/userContext";

type RootProps = {
  children: React.ReactNode;
};

const Root = ({ children }: RootProps) => {
  return <div>{children}</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Root>
        <Authentication />
      </Root>
    ),
  },
  {
    path: "/homepage",
    element: (
      <Root>
        <Homepage />
      </Root>
    ),
  },
  {
    path: "/chat",
    element: (
      <Root>
        <UseChat />
      </Root>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorProvider>
      <UserProvider>
        <AuthProvider>
          <ErrorDisplay />
          <RouterProvider router={router} />
        </AuthProvider>
      </UserProvider>
    </ErrorProvider>
  </StrictMode>
);
