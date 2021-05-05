import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";

const OrderModal = props => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Summary
            </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '300px', margin: ' 20px auto', textAlign: 'center' }}>
                <Cart cart={props.cart}>
                    <Link to="/review"><button onClick={props.onHide} className="cardBtn">Review Order</button></Link>
                </Cart>
            </Modal.Body>
        </Modal>
    );
}

export default OrderModal
