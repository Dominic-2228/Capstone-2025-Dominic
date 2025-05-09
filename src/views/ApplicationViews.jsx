import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { HomePage } from "../components/Home/homePage.jsx";

export const ApplicationViews = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
