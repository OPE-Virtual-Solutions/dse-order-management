import { ReactNode } from "react";

import { 
    FaShoppingBag, 
    FaPepperHot,
    FaHamburger,
    FaThList
} from "react-icons/fa";

type NavRoute = {
    id: number;
    title: string;
    path: string;
    role: string;
    icon: ReactNode;
}

const iconSize = 20;

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
        title: "Histórico de Pedidos",
        path: "/order-history",
        role: "",
        icon: <FaThList size={iconSize} />
    },
    {
        id: 3,
        title: "Gerenciamento de Produtos",
        path: "/products",
        role: "",
        icon: <FaHamburger size={iconSize} />
    },
    {
        id: 4,
        title: "Gerenciamento de Ingredientes",
        path: "/ingredients",
        role: "",
        icon: <FaPepperHot size={iconSize} />
    }
];

export { navlinkRoutes };