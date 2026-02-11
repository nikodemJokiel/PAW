import {NavLink} from "react-router";
import styles from "./NavBar.module.scss";

export default function NavBar(){
    return (
        <nav className={styles.NavBar}>
            <NavLink to='/' className={styles.logoLink}>
                <img src="logo.png" alt="logo" />
            </NavLink>
            <ul className={styles.NavBarList}>
                <li><NavLink to='/' className={styles.NavbarListLink}>Home</NavLink></li>
                <li><NavLink to='/Categories' className={styles.NavbarListLink}>Categories</NavLink></li>
                <li><NavLink to='/post' className={styles.NavbarListLink}>Posts</NavLink></li>
            </ul>
            <nav className={styles.login}>
                <button>Log in</button>
                <button>Sign in</button>
            </nav>
        </nav>
    )
}