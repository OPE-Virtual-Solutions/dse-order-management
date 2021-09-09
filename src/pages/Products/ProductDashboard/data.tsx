import {  
    IIngrediente,
    IProduto,
    ICategoria
} from "interfaces";

const categories: ICategoria[] = [
    {
        id: 1,
        nome: "Lanches",
        ativo: true,
    },
    {
        id: 2,
        nome: "Bebidas",
        ativo: true,
    },
    {
        id: 3,
        nome: "Porções",
        ativo: true,
    },
    {
        id: 4,
        nome: "Desabilitado",
        ativo: false,
    }
];

const ingredients: IIngrediente[] = [
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

const products: IProduto[] = [
    {
        id: 1,
        nome: "X-Burger",
        descricao: "Um belo hamburguer de pão",
        preco: 9.99,
        categoria: categories[0],
        quantidade: 10,
        ingredientes: [
            ingredients[0],
            ingredients[1]
        ],
        ativo: true,
    },
    {
        id: 2,
        nome: "X-Salada",
        descricao: "Um belo hamburguer com saladinha",
        preco: 10.00,
        categoria: categories[0],
        quantidade: 10,
        ingredientes: [
            ingredients[0],
            ingredients[1],
            ingredients[2]
        ],
        ativo: true,
    },
];

export { categories, products, ingredients };