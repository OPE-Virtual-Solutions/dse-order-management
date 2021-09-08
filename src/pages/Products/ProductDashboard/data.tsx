import { 
    ICategory, 
    IIngredient, 
    IProduct 
} from "models";

const categories: ICategory[] = [
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

const products: IProduct[] = [
    {
        id: 1,
        nome: "X-Burger",
        preco: 9.99,
        categoria: 1,
        quantidade: 10,
        ingredientes: [
            {
                id: 2,
                nome: "Hamburguer",
                quantidade: 24
            }
        ]
    },
    {
        id: 2,
        nome: "X-Salada",
        preco: 10.00,
        categoria: 1,
        quantidade: 10,
        ingredientes: [
            {
                id: 3,
                nome: "Pão",
                quantidade: 35
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
            {
                id: 4,
                nome: "Cebola",
                quantidade: 56
            },
        ]
    },
];

const ingredients: IIngredient[] = [
    {
        id: 1,
        nome: "Salsicha",
        quantidade: 12
    },
    {
        id: 2,
        nome: "Hamburguer",
        quantidade: 24
    },
    {
        id: 3,
        nome: "Pão",
        quantidade: 35
    },
    {
        id: 4,
        nome: "Cebola",
        quantidade: 56
    }
]

export { categories, products, ingredients };