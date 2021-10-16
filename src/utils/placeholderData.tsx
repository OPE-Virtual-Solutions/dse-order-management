import {  
    IIngrediente,
    IProduto,
    ICategoria,
    Ingredient,
    Category
} from "interfaces";

export const newCategories: Category[] = [
    {
        id: 1,
        name: "Lanches",
        active: true,
    },
    {
        id: 2,
        name: "Bebidas",
        active: true,
    },
    {
        id: 3,
        name: "Porções",
        active: true,
    }
]

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
    }
];

const ingredients: Ingredient[] = [
    {
        id: 1,
        name: "Salsicha",
        quantity: 12
    },
    {
        id: 2,
        name: "Hamburguer",
        quantity: 24
    },
    {
        id: 3,
        name: "Pão",
        quantity: 35
    },
    {
        id: 4,
        name: "Cebola",
        quantity: 56
    }
]

const oldIngredients: IIngrediente[] = [
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
            oldIngredients[0],
            oldIngredients[1]
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
            oldIngredients[0],
            oldIngredients[1]
        ],
        ativo: true,
    },
    {
        id: 3,
        nome: "Coca-Cola",
        descricao: "Latinha de 250ml",
        preco: 5.00,
        categoria: categories[1],
        quantidade: 51,
        ingredientes: [],
        ativo: true,
    },
    {
        id: 4,
        nome: "Guaraná Antártica",
        descricao: "Latinha de 400ml",
        preco: 5.00,
        categoria: categories[1],
        quantidade: 65,
        ingredientes: [],
        ativo: true
    },
    {
        id: 5,
        nome: "X-Bacon",
        descricao: "Um delicioso sanduiche de bacon",
        preco: 19.99,
        categoria: categories[0],
        quantidade: 43,
        ingredientes: [
            oldIngredients[0],
            oldIngredients[1],
            oldIngredients[2],
            oldIngredients[3]
        ],
        ativo: true
    },
    {
        id: 6,
        nome: "Batata-frita",
        descricao: "Uma porção deliciosa de batata-frita",
        preco: 6.99,
        categoria: categories[2],
        quantidade: 78,
        ingredientes: [],
        ativo: true,
    }
];

export { categories, products, ingredients };