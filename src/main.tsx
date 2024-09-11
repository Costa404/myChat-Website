import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Pages/Homepage/Homepage";
import Authentication from "./components/Authentication/Authentication";
import "./index.css";

import { AuthProvider } from "./components/Authentication/hooksAuthentication/useAuthContext";
import { ErrorProvider } from "./components/errorContext/useError";
import ErrorDisplay from "./components/errorContext/ErrorDisplay";
import { UserProvider } from "./components/Users/userContext";
import Chat from "./components/chat/Chat";
import CustomErrorPage from "./components/errorContext/ErrorRoute";

type RootProps = {
  children: React.ReactNode;
};

const Root = ({ children }: RootProps) => {
  return <>{children}</>; // Use fragment ao invés de div
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
    errorElement: <CustomErrorPage />,
  },
  {
    path: "/chat/:chatId",
    element: (
      <Root>
        <Chat />
      </Root>
    ),
    errorElement: <CustomErrorPage />,
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
