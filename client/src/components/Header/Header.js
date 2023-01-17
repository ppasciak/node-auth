import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Login",
        path: "/login",
    },
    {
        name: "Logout",
        path: "/logout",
    },
];

const Header = () => {
    return (
        <nav className={styles.root}>
            <div className={styles.navListWrapper}>
                <div className={styles.navList}>
                    {links.map((link, index) => (
                        <NavLink
                            to={link.path}
                            key={index}
                            className={(state) =>
                                state.isActive
                                    ? styles.navListItemActive
                                    : styles.navListItem
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Header;
