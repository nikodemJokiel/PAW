import {NavLink} from "react-router";

export default function Navigation(){
    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/settings'>Settings</NavLink>
        </nav>
    )
}