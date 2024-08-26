import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Authentication from "./components/Authentication/Authentication/Authentication";
import "./index.css";
import UseChat from "./components/chat/Chat";
import { AuthProvider } from "./components/Authentication/Authentication/hooksAuthentication/useAuthContext";

type RootProps = {
  children: React.ReactNode;
};

const Root = ({ children }: RootProps) => {
  return <div>{children}</div>;
};

const router = createBrowserRouter([
  {
    path: "/homepage",
    element: (
      <Root>
        <Homepage />
      </Root>
    ),
  },
  {
    path: "/",
    element: (
      <Root>
        <AuthProvider>
          <Authentication />
        </AuthProvider>
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
    <RouterProvider router={router} />
  </StrictMode>
);
