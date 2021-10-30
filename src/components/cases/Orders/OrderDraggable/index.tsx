import { 
    DragDropContext, 
    Droppable, 
    Draggable 
} from "react-beautiful-dnd";

import styles from "./OrderDraggable.module.css";

import { OrderDragCard } from "../OrderDragCard";

type Props = {
    id: string;
    title: string;
    onDragEnd: (result: any) => void;
    data: any;
    withoutContext?: boolean;
    showFinishButton?: boolean;
    onOrderFinish?: (selectedItem: any) => void;
}

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
                                    <OrderDragCard 
                                        key={index}
                                        order={element}
                                        provided={provided}
                                        onOrderFinish={onOrderFinish}
                                        showFinishButton={showFinishButton}
                                    />
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