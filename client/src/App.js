import StartingPage from "./components/StartingPage/StartingPage";
import './styles/variables.css';
import styles from './styles/global.module.css';
import Layout from "./components/Layout/Layout";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <StartingPage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className={styles.appWrapper}>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </div>
  );
}

export default App;
