import Navigation from "../components/Navigation"
import {Outlet} from "react-router";

export default function NavigationLayout(){
    return (
        <>
            <Navigation/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}