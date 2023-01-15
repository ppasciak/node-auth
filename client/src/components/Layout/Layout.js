import React from "react";
import Header from "../Header/Header";
import classes from "./layout.module.css";
import {Outlet} from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Layout;
