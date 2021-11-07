import { ICategoria } from "./ICategoria";
import { IProduto } from "./IProduto";
import { IIngrediente } from "./IIngrediente";
import { IItemPedido } from "./ItemPedido";
import { IPedido } from "./Pedido";

import { CartProduct, CartProductPT } from "./CartProduct";
import { Category, CategoryPT } from "./Category";
import { Order, OrderPT, OrderPostPT } from "./Order";
import { Product, ProductPost, ProductPostPT, ProductPT, EmptyProduct } from "./Product";
import { Ingredient, IngredientPT } from "./Ingredient";

export type { 
    ICategoria,
    IProduto,
    IIngrediente,
    IItemPedido,
    IPedido,
    OrderPostPT,

    Category,
    CategoryPT,

    ProductPost,
    ProductPostPT,
    Ingredient,
    IngredientPT,
};

export {
    Order,
    OrderPT,
    CartProduct,
    CartProductPT,
    EmptyProduct,
    ProductPT,
    Product,
}