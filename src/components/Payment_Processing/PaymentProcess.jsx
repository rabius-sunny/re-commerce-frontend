import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51HZNkQBEspuFA8V0SJHuv7yto9ESLRDjC4nh8hJyPhFQJMFjG7zCwnadzx0GcsYnY0BJHetUlxz3e7EspZuIkuvQ00uENxpGaP');

const PaymentProcess = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm handlePayment={handlePayment} />
        </Elements>
    );
};

export default PaymentProcess;