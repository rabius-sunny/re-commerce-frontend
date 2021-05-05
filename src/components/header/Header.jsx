import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import OrderModal from '../shop/OrderModal'
import classes from './header.module.css'
import { CartContext } from '../../App'

function Header() {
    const [cart, setCart] = useContext(CartContext)
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: '#07b0e6' }}>
                <div className={`container-fluid ${classes.myNav}`}>
                    <Link to="/" className="navbar-brand" style={{ fontSize: '25px' }}>The Ocean Mart</Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className={`nav-item ms-3 ${classes.navLink}`}>
                                <Link to="/shop">
                                    <span>Hello, Sign in</span>
                                    <br /> <span><b>Your Account</b></span>
                                </Link>
                            </li>
                            <li className={`nav-item ms-3 ${classes.navLink}`}>
                                <button onClick={() => setModalShow(true)}>
                                    <span>Returns</span>
                                    <br /> <span><b>& Orders</b></span>
                                </button>
                                <OrderModal
                                    cart={cart}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </li>
                            <li className={`nav-item ms-3 ${classes.navLink}`}>
                                <Link to="/inventory">Inventory</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
