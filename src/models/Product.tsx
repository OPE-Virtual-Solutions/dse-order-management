import { IIngredient } from "./Ingredient";

export interface IProduct {
    id: number;
    nome: string; 
    preco: number;
    categoria: number;
    quantidade: number;
    ingredientes: IIngredient[];
}