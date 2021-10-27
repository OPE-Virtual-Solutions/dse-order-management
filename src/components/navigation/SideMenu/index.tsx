import { useContext } from "react";
import { UserContext } from "contexts/UserContext/UserContext";

import styles from "./styles.module.css";

import { 
    FaPowerOff
} from "react-icons/fa";

import { navlinkRoutes } from "./navroutes";

import { NavLink } from "../NavLink";


function SideMenu() {
    const {
        logout 
    } = useContext(UserContext);

    function handleLogout() {
        logout();
    }

    return (
        <nav className={ styles.sidenavContainer }>
            <header>
                <img src="assets/vs-logo-sm.png" alt="Logo da Virtual Solutions" />
            </header>

            <div className={ styles.sidenavLinks }>
                { navlinkRoutes.map((link) => (
                    <NavLink key={link.id} title={link.title} path={link.path}>
                        { link.icon }
                    </NavLink>
                ))}
            </div>

            <footer>
                <button onClick={() => handleLogout()} className="navLink">
                    <FaPowerOff size={16} />
                </button>
            </footer>
        </nav>
    )
};

export { SideMenu };
