import { IIngrediente } from "interfaces";
import styles from "./styles.module.css";

type Props = {
    headers: string[];
    ingredients: IIngrediente[];
}

function IngredientTable({ headers, ingredients }: Props) {
    return (
        <div className={ styles.tableContainer }>
            <div className={ styles.tableHeaderContainer }>
                { headers.map((header, key) => (
                    <span key={key}>{ header }</span>
                ))}
            </div>

            { ingredients.map((ingredient, key) => (
                <div
                    key={key}
                    className={ styles.tableRowContainer }
                >
                    <span>{ ingredient.nome }</span>
                    <span>{ ingredient.quantidade }</span>
                </div>
            ))}
        </div>
    )
};

export { IngredientTable };
