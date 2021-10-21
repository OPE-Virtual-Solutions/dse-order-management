import { 
    DragDropContext, 
    Droppable, 
    Draggable 
} from "react-beautiful-dnd";

import styles from "./OrderDraggable.module.css";

import { 
    FaStoreAlt, 
    FaMoneyBill, 
    FaBarcode,
    FaCreditCard
} from "react-icons/fa";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";

type Props = {
    id: string;
    title: string;
    onDragEnd: (result: any) => void;
    data: any;
    withoutContext?: boolean;
    showFinishButton?: boolean;
    onOrderFinish?: (selectedItem: any) => void;
}

const getCardStyle = (draggableStyle: any) => ({
    background: "white",
    
    padding: 15,

    borderColor: "var(--divider)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,

    margin: 5,

    // configurações essenciais para o Draggable funcionar
    ...draggableStyle
});

const getListContainerStyle = () => ({
    flex: 1,
    
    background: "white",
    padding: 8,
    borderColor: "var(--divider)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    margin: 10,

    overflow: "auto"
});

function OrderDraggable({
    id,
    title,
    onDragEnd,
    data,
    withoutContext = false,
    showFinishButton = false,
    onOrderFinish = () => {}
}: Props) {

    function getCurrentPaymentMethod(paymentMethod: string) {
        switch (paymentMethod) {
            case "money":
                return "dinheiro"
            case "credit":
                return "cartão de crédito"
            case "debit":
                return "cartão de débito"
            default:
                return "dinheiro"
        }
    }

    function renderDroppable() {
        return (
            <Droppable
                droppableId={id}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListContainerStyle()}
                        className={ styles.orderListContainer }
                    >
                        <header>
                            <span>{ title }</span>

                            <div className={styles.countBadge}>
                                <span>{ data.length }</span>
                            </div>
                        </header>
                        {data.map((element: any, index: any) => (
                            <Draggable
                                key={element.id}
                                draggableId={element.id.toString()}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getCardStyle(
                                            provided.draggableProps.style
                                        )}

                                        className={ styles.orderCard }
                                    >
                                        <h6>
                                            Pedido <span>#{ element.id }</span>
                                        </h6>
                                        
                                        <footer>
                                            <div>
                                                <div className={ styles.typeBadge }>
                                                    <span className={ styles.priceText }>
                                                        { element.order_type === "pra_viagem" && "Pra viagem" }
                                                        { element.order_type === "pra_consumir" && "Pra consumo"}
                                                    </span>
                                                </div>

                                                {element.is_local_order && (
                                                    <Tooltip 
                                                        title="Pedido efetuado presencialmente"
                                                        placement="right"
                                                    >
                                                        <div className={ styles.badge }>
                                                            <FaStoreAlt size={11} />
                                                        </div>
                                                    </Tooltip>
                                                )}

                                                <Tooltip 
                                                    title={`Pagamento em ${getCurrentPaymentMethod(element.payment_method)}`}
                                                    placement="right"
                                                >
                                                    <div className={ styles.badge }>
                                                        {element.payment_method === "money" && <FaMoneyBill size={11} />}
                                                        {element.payment_method === "credit" && <FaCreditCard size={11} />}
                                                        {element.payment_method === "debit" && <FaBarcode size={11} />}
                                                    
                                                    </div>
                                                </Tooltip>
                                            </div>

                                            <span className={ styles.priceText}>R${ element.total_price }</span>
                                        </footer>
                                        
                                        { showFinishButton && (
                                            <div className="d-flex align-stretch">
                                                <Button 
                                                    onClick={() => { onOrderFinish(element) }}
                                                    className="w-100 m-0 mt-2 justify-content-center"
                                                    text="Despachar"
                                                    transparent
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        )
    }

    if (withoutContext) {
        return renderDroppable();
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            { renderDroppable() }
        </DragDropContext>
    )
};

export { OrderDraggable };