export class Category {
    id?: number;
    name: string;
    active: boolean;

    constructor(categoria: CategoryPT) {
        this.id = categoria.id_categoria;
        this.name = categoria.nome_categoria;
        this.active = categoria.ativo;
    }
};

export class CategoryPT {
    id_categoria?: number;
    nome_categoria: string;
    ativo: boolean;

    constructor(category: Category) {
        this.id_categoria = category.id;
        this.nome_categoria = category.name;
        this.ativo = category.active;
    }
};