import { useState } from "react";

import styles from "./OrderDragCard.module.css";

import { formatRelative, parseISO } from "date-fns";
import pt from 'date-fns/locale/pt-BR';

import { DraggableProvided } from "react-beautiful-dnd";

import { Dialog } from "@material-ui/core";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { OrderIngredientModal } from "components/cases/Orders/OrderIngredientModal";
import { FaBarcode, FaCreditCard, FaMoneyBill, FaStoreAlt, FaTrashAlt } from "react-icons/fa";

import { CartProduct, EmptyProduct, Order, ProductPT } from "interfaces";

import Alert from 'sweetalert2';
import { OrderService } from "services/order.service";

type Props = {
    provided: DraggableProvided;
    order: Order;
    showFinishButton?: boolean;
    onOrderFinish?: (selectedItem: any) => void;
}

type CartProductProps = {
    cartProduct: CartProduct;
}

const CartProductInstance = new CartProduct({
    usuario: 0,
    pedido: undefined,
    preco: 0,
    produto: new ProductPT(EmptyProduct),
    quantidade: 1,
})

function OrderDragCard({ 
    provided,
    order,
    showFinishButton = false,
    onOrderFinish = () => {}
}: Props) {

    const [openIngredientModal, setOpenIngredientModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<CartProduct>(CartProductInstance);
    
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

    function OrderProductCard({ cartProduct }: CartProductProps) {
        return (
            <div className={ styles.orderProductCartContainer }>
                <p>
                    { cartProduct.product.name } ● <span>Qtd.</span> { cartProduct.quantity } 
                </p>

                <div>
                    { cartProduct.product.ingredients.length !== 0 && (
                        <span onClick={() => { handleIngredientSelection(cartProduct)}}>Ver ingredientes</span>
                    )}
                </div>
            </div>
        )
    };

    function handleOrderCancel() {
        Alert.fire({
            title: 'Alerta',
            text: `Você está prestes a cancelar o pedido #${order.id}. Se prosseguir, o pedido não será mais rastreado e será dado como finalizado sem sucesso (cancelado). Deseja continuar?`,
            icon: 'error',
            input: 'textarea',
            inputLabel: 'Se precisar, insire o motivo do cancelamento:',
            inputPlaceholder: 'Motivo do cancelamento (opcional)',
            inputAttributes: {
                maxlength: "280"
            },
            customClass: {
                popup: styles.sweetAlertText
            },
            showCancelButton: true,
            confirmButtonText: "<span style='color: #1b1b1b'>Efetuar cancelamento</span>",
            confirmButtonColor: "#FFBF00",
            cancelButtonText: "<span style='color: #1b1b1b'>Desistir</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                order.status = "cancelado";

                await OrderService.update(order.id || 0, order).then(() => {
                    window.location.reload();
                });
            };
        });
    }

    function handleObservation() {
        Alert.fire({
            title: 'Adicionar observação',
            input: 'textarea',
            inputPlaceholder: 'Até 280 caracteres...',
            inputAttributes: {
                maxlength: "280"
            },
            customClass: {
                popup: styles.sweetAlertText
            },
            showCancelButton: true,
            confirmButtonText: "<span style='color: #1b1b1b'>Salvar</span>",
            confirmButtonColor: "#FFBF00",
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) console.log("~ confirmed")
        });
    }

    function handleIngredientSelection(cartProduct: CartProduct) {
        setSelectedProduct(cartProduct);
        setOpenIngredientModal(true);
    }
    
    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}

            style={ provided.draggableProps.style }

            className={ styles.orderCard }
        >
            <header>
                <div>
                    <h6>Pedido <span>#{ order.id }</span></h6>

                    { order.created_at && (
                        <p>registrado { formatRelative( parseISO(order.created_at.toString()), new Date(), { locale: pt }) }</p>
                    )}
                </div>
                
                <Tooltip
                    title={`Cancelar pedido #${ order.id }`}
                    placement="left"
                >
                    <Button 
                        onClick={() => handleOrderCancel() }
                        icon={<FaTrashAlt />}
                        transparent 
                    />
                </Tooltip>
            </header>

            <main>
                <div className={ styles.productsContainer }>
                    { order.products?.map((product: CartProduct, index) => (
                        <OrderProductCard key={index} cartProduct={product} />
                    ))}
                </div>

                <div className={ styles.badgeContainer }>
                    <div>
                        <div className={ styles.typeBadge }>
                            <span className={ styles.priceText }>
                                { order.order_type === "pra_viagem" && "Pra viagem" }
                                { order.order_type === "pra_consumir" && "Pra consumo"}
                            </span>
                        </div>

                        {order.is_local_order && (
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
                            title={`Pagamento em ${getCurrentPaymentMethod(order.payment_method || "")}`}
                            placement="right"
                        >
                            <div className={ styles.badge }>
                                {order.payment_method === "money" && <FaMoneyBill size={11} />}
                                {order.payment_method === "credit" && <FaCreditCard size={11} />}
                                {order.payment_method === "debit" && <FaBarcode size={11} />}
                            
                            </div>
                        </Tooltip>
                    </div>

                    <span className={ styles.priceText}>R${ order.total_price }</span>
                </div>
            </main>

            <footer>
                { showFinishButton && (
                    <div className="me-2">
                        <Button 
                            onClick={() => { onOrderFinish(order) }}
                            className="w-100 m-0 mt-2 justify-content-center"
                            text="Efetuar retirada"
                            transparent
                        />
                    </div>
                )}

                <div>
                    <Button 
                        onClick={() => { handleObservation() }}
                        className="w-100 m-0 mt-2 justify-content-center"
                        text="Adicionar Observação"
                        transparent
                    />
                </div>
            </footer>
            
            <Dialog 
                open={openIngredientModal}
                onClose={() => { setOpenIngredientModal(false) }}
            >
                <OrderIngredientModal cartProduct={selectedProduct} />
            </Dialog>
        </div>
    )
};

export { OrderDragCard };