import { ReactNode } from "react";

import { 
    FaShoppingBag, 
    FaPepperHot,
    FaHamburger,
    FaTrello,
    FaUsers,
    FaWpforms,
    FaUserAlt,
    FaHome
} from "react-icons/fa";

type NavRoute = {
    id: number;
    title: string;
    path: string;
    roles: string[];
    icon: ReactNode;
}

const iconSize = 16;

const navlinkRoutes: NavRoute[] = [
    {
        id: 1,
        title: "Página Inicial",
        path: "/home",
        roles: ["admin", "atendente", "estoquista"],
        icon: <FaHome size={iconSize} />
    },
    {
        id: 2,
        title: "Atendimento",
        path: "/order-dashboard",
        roles: ["admin", "atendente"],
        icon: <FaShoppingBag size={iconSize} />
    },
    {
        id: 3,
        title: "Quadro de Pedidos",
        path: "/order-board",
        roles: ["admin", "atendente"],
        icon: <FaTrello size={iconSize} />
    },
    {
        id: 4,
        title: "Histórico de Pedidos",
        path: "/order-history",
        roles: ["admin", "atendente"],
        icon: <FaWpforms size={iconSize} />
    },
    {
        id: 5,
        title: "Gerenciamento de Produtos",
        path: "/products",
        roles: ["admin", "estoquista"],
        icon: <FaHamburger size={iconSize} />
    },
    {
        id: 6,
        title: "Gerenciamento de Ingredientes",
        path: "/ingredients",
        roles: ["admin", "estoquista"],
        icon: <FaPepperHot size={iconSize} />
    },
    {
        id: 7,
        title: "Gerenciamento de Usuários",
        path: "/users",
        roles: ["admin"],
        icon: <FaUsers size={iconSize} />
    },
];

export { navlinkRoutes };