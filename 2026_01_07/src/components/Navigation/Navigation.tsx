import {NavLink} from "react-router";
import styles from "./Navigation.module.scss";

export default function Navigation(){
    return (
        <nav className={styles.Navigation}>
            <div className={styles.wrapper}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/post'>Posts</NavLink>
                <NavLink to='/Categories'>Categories</NavLink>
            </div>
        </nav>
    )
}