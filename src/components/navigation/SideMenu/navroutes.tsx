import { ReactNode } from "react";

import { 
    FaShoppingBag, 
    FaPepperHot,
    FaHamburger,
    FaTrello,
    FaUser,
    FaWpforms
} from "react-icons/fa";

type NavRoute = {
    id: number;
    title: string;
    path: string;
    role: string;
    icon: ReactNode;
}

const iconSize = 16;

const navlinkRoutes: NavRoute[] = [
    {
        id: 1,
        title: "Atendimento",
        path: "/order-dashboard",
        role: "",
        icon: <FaShoppingBag size={iconSize} />
    },
    {
        id: 2,
        title: "Quadro de Pedidos",
        path: "/order-board",
        role: "",
        icon: <FaTrello size={iconSize} />
    },
    {
        id: 3,
        title: "Histórico de Pedidos",
        path: "/order-history",
        role: "",
        icon: <FaWpforms size={iconSize} />
    },
    {
        id: 4,
        title: "Gerenciamento de Produtos",
        path: "/products",
        role: "",
        icon: <FaHamburger size={iconSize} />
    },
    {
        id: 5,
        title: "Gerenciamento de Ingredientes",
        path: "/ingredients",
        role: "",
        icon: <FaPepperHot size={iconSize} />
    },
    {
        id: 6,
        title: "Gerenciamento de Usuários",
        path: "/users",
        role: "",
        icon: <FaUser size={iconSize} />
    },
];

export { navlinkRoutes };