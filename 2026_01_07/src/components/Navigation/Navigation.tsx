import {NavLink} from "react-router";
import styles from "./Navigation.module.scss";

export default function Navigation(){
    return (
        <nav className={styles.Navigation}>
            <NavLink to='/' className={styles.logoLink}>
                <img src="logo.png" alt="logo" />
            </NavLink>
            <div className={styles.wrapper}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/post'>Posts</NavLink>
                <NavLink to='/Categories'>Categories</NavLink>
            </div>
            <nav className={styles.login}>
                <button>Log in</button>
                <button>Sign in</button>
            </nav>
        </nav>
    )
}