import { useEffect, useState } from "react";

import { Dashboard } from "templates/Dashboard";
import styles from "./styles.module.css";

import { DragDropContext } from "react-beautiful-dnd";
import { OrderDraggable } from "components/cases/Orders/OrderDraggable";
import { OrderService } from "services/order.service";
import { Order } from "interfaces";

import Alert from 'sweetalert2';

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

function OrderBoard() {
    const [waitingOrders, setWaitingOrders] = useState<any[]>([]);
    const [onGoingOrders, setOnGoingOrders] = useState<any[]>([]);
    const [doneOrders, setDoneOrders] = useState<any[]>([]);

    const stateLists: any = {
        dragWaiting: {
            list: waitingOrders,
            set: setWaitingOrders,
            code: "aguardando"
        },
        dragOnGoing: {
            list: onGoingOrders,
            set: setOnGoingOrders,
            code: "em_andamento"
        },
        dragDone:  {
            list: doneOrders,
            set: setDoneOrders,
            code: "pronto"
        }
    }

    const getList = (id: any) => stateLists[id];

    function onOrderFinish(selectedItem: Order) {
        Alert.fire({
            title: 'Aviso',
            text: 'Você está prestes a finalizar um pedido. Se continuar, o pedido não será mais exibido no quadro de pedidos e será dado como finalizado e entregue. Deseja continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "<span style='color: #1b1b1b'>Sim</span>",
            confirmButtonColor: "#FFBF00",
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                selectedItem.status = "finalizado";

                selectedItem.finishedAt = new Date();

                await OrderService.update(selectedItem.id || 0, selectedItem).then((response) => {
                    if (response.status === 200) window.location.reload();
                });
            } 
        });
    };

    async function updateOrderStatus(destinationId: any, selectedItem: any) {
        const state = getList(destinationId);

        const order: Order = {
            id: selectedItem.id,
            isLocalOrder: selectedItem.isLocalOrder,
            status: state.code,
            totalPrice: selectedItem.totalPrice,
            address: selectedItem.address,
            costumer: selectedItem.costumer,
            createdAt: selectedItem.createdAt,
            employee: selectedItem.employee,
            finishedAt: selectedItem.finishedAt,
            orderCode: selectedItem.orderCode,
            type: selectedItem.type,
            paymentMethod: selectedItem.payment_method,
        };

        await OrderService.update(order.id || 0, order).then((response) => {
            if (response.status === 200) {
                state.set((list: any) => {
                    return list.map((_order: Order) => {
                        if (_order.id === order.id) {
                            _order.status = state.code
                        };

                        return _order;
                    })
                })
            }
        });
    }

    function onDragEnd(result: any) {
        const { source, destination } = result;

        const state = getList(source.droppableId);
        const selectedItem = state.list[source.index];

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

            updateOrderStatus(destination.droppableId, selectedItem);

            if (result.dragWaiting) setWaitingOrders(result.dragWaiting);
            if (result.dragOnGoing) setOnGoingOrders(result.dragOnGoing);
            if (result.dragDone) setDoneOrders(result.dragDone);
        };

        console.log("~ selected order:", selectedItem);
    };

    async function retrieveData() {
        await OrderService.list().then((response) => {
            const _waiting = response.filter((order) => order.status === "aguardando");
            const _onGoing = response.filter((order) => order.status === "em_andamento");
            const _done = response.filter((order) => order.status === "pronto");

            setWaitingOrders(_waiting);
            setOnGoingOrders(_onGoing);
            setDoneOrders(_done);
        });
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <Dashboard>
            <div className={ styles.orderHistoryContainer }>

                <div className={ styles.orderDragContainer }>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <OrderDraggable 
                            id="dragWaiting"
                            title="Aguardando inicio do preparo"
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
                            title="Prontos para retirar"
                            data={doneOrders}
                            onDragEnd={onDragEnd}
                            withoutContext
                            showFinishButton
                            onOrderFinish={onOrderFinish}
                        />
                    </DragDropContext>
                </div>

            </div>
        </Dashboard>
    )
};

export { OrderBoard };