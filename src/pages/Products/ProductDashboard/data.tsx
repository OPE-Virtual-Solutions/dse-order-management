type Category = {
    id: number;
    name: string;
}

type Product = {
    id: number;
    nome: string; 
    preco: number;
    categoria: number;
    quantidade: number;
}

const categories: Category[] = [
    {
        id: 1,
        name: "Lanches"
    },
    {
        id: 2,
        name: "Bebidas"
    },
    {
        id: 3,
        name: "Porções"
    }
];

const products: Product[] = [
    {
        id: 1,
        nome: "X-Burger",
        preco: 9.99,
        categoria: 1,
        quantidade: 10
    },
    {
        id: 2,
        nome: "X-Salada",
        preco: 10.00,
        categoria: 1,
        quantidade: 10,
    }
]

export { categories, products };