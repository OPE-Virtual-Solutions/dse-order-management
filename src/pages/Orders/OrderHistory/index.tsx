import { useState } from "react";

import { Dashboard } from "templates/Dashboard";
import styles from "./styles.module.css";

import { DragDropContext } from "react-beautiful-dnd";
import { OrderDraggable } from "components/cases/Orders/OrderDraggable";

type IPlaceholderOrder = {
    id: number;
    products: number;
    type: "toGo" | "toEat";
    price: number;
}

const waitingList: IPlaceholderOrder[] = [
    {
        id: 1334,
        products: 5,
        type: "toGo",
        price: 59.99
    },
    {
        id: 1335,
        products: 1,
        type: "toGo",
        price: 39.99
    },
]

const onGoingList: IPlaceholderOrder[] = [
    {
        id: 1331,
        products: 3,
        type: "toGo",
        price: 29.99
    },
    {
        id: 1322,
        products: 2,
        type: "toGo",
        price: 9.99
    },
    {
        id: 1332,
        products: 2,
        type: "toGo",
        price: 9.99
    },
    {
        id: 1352,
        products: 2,
        type: "toGo",
        price: 9.99
    },
]

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

function OrderHistory() {
    const [waitingOrders, setWaitingOrders] = useState<any[]>(waitingList);
    const [onGoingOrders, setOnGoingOrders] = useState<any[]>(onGoingList);
    const [doneOrders, setDoneOrders] = useState<any[]>([]);

    const stateLists: any = {
        dragWaiting: {
            list: waitingOrders,
            set: setWaitingOrders
        },
        dragOnGoing: {
            list: onGoingOrders,
            set: setOnGoingOrders
        },
        dragDone:  {
            list: doneOrders,
            set: setDoneOrders
        }
    }

    const getList = (id: any) => stateLists[id];

    function onDragEnd(result: any) {
        const { source, destination } = result;
        const state = getList(source.droppableId);

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                state.list,
                source.index,
                destination.index
            );

            state.set(items);
        } else {
            const result = move(
                state.list,
                getList(destination.droppableId).list,
                source,
                destination
            );

            console.log(result);

            if (result.dragWaiting) setWaitingOrders(result.dragWaiting);
            if (result.dragOnGoing) setOnGoingOrders(result.dragOnGoing);
            if (result.dragDone) setDoneOrders(result.dragDone);
        };
    };


    return (
        <Dashboard>
            <div className={ styles.orderHistoryContainer }>

                <div className={ styles.orderDragContainer }>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <OrderDraggable 
                            id="dragWaiting"
                            title="Em espera"
                            data={waitingOrders}
                            onDragEnd={onDragEnd}
                            withoutContext
                        />
                        <OrderDraggable 
                            id="dragOnGoing"
                            title="Em andamento"
                            data={onGoingOrders}
                            onDragEnd={onDragEnd}
                            withoutContext
                        />
                        <OrderDraggable 
                            id="dragDone"
                            title="Prontos para despacho"
                            data={doneOrders}
                            onDragEnd={onDragEnd}
                            withoutContext
                        />
                    </DragDropContext>
                </div>

            </div>
        </Dashboard>
    )
};

export { OrderHistory };