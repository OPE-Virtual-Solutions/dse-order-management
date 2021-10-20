import { 
    DragDropContext, 
    Droppable, 
    Draggable 
} from "react-beautiful-dnd";

import styles from "./OrderDraggable.module.css";

type Props = {
    id: string;
    title: string;
    onDragEnd: (result: any) => void;
    data: any;
    withoutContext?: boolean;
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
    withoutContext = false
}: Props) {

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
                                        
                                        <span>{ element.products } produtos</span>

                                        <footer>
                                            <div className={ styles.typeBadge }>
                                                <span className={ styles.priceText }>PRA VIAGEM</span>
                                            </div>

                                            <span className={ styles.priceText}>R${ element.price }</span>
                                        </footer>
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