export class Ingredient {
    id?: number;
    name: string;
    quantity: number;

    constructor(ingrediente: IngredientPT) {
        this.id = ingrediente.id_ingrediente;
        this.name = ingrediente.nome_ingrediente;
        this.quantity = ingrediente.quantidade;
    }
};

export class IngredientPT {
    id_ingrediente?: number;
    nome_ingrediente: string;
    quantidade: number;

    constructor(ingredient: Ingredient) {
        this.id_ingrediente = ingredient.id;
        this.nome_ingrediente = ingredient.name;
        this.quantidade = ingredient.quantity;
    }
};