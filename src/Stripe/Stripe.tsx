/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './Stripe.scss';
import { LockIcon } from "../Icons/LockIcon";

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

interface StripeProps {
    publicKey: string;
    currency: string;
    amount: number;
    onSuccess: () => void;
    onError: (error) => void;
}

const Stripe: React.FC<StripeProps> = ({ currency, amount, publicKey, onSuccess, onError }) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleError = (error) => {
        setError(error.message);
        setProcessing(false);
        onError({
            message: error.message,
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);

        // create Stripe payment method
        const paymentMethodResult = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        // (error) show error in payment form
        if (paymentMethodResult.error) {
            handleError(paymentMethodResult.error);
            return;
        }

        // send payment method to server
        const createIntent = await fetch('https://conce.test/api/stripe/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                publicKey,
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethodResult.paymentMethod.id,
                currency,
                amount: amount.toString(),
            }),
        })

        const createIntentResult = await createIntent.json();

        // (error) show error in payment form
        if (createIntentResult.error) {
            handleError({
                message: createIntentResult.error,
            });
            return;
        }

        // (3d-secure) call stripe's handleCardAction
        if (createIntentResult.status === 'requires_action') {
            const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
                createIntentResult.client_secret
            );

            // (3d-secure) (error) show error in payment form
            if (errorAction) {
                handleError(errorAction);
                return;
            }

            // (3d-secure) confirm payment intent on the server
            const confirmIntent = await fetch('https://conce.test/api/stripe/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    publicKey,
                },
                body: JSON.stringify({ paymentIntentId: paymentIntent.id })
            });

            const confirmIntentResult = await confirmIntent.json();

            if (confirmIntentResult.error) {
                handleError({
                    message: confirmIntentResult.error,
                });
                return;
            }
        }

        setError(null);
        setProcessing(false);
        setSucceeded(true);
        onSuccess();
    };

    return (
        <form
            className='conce__stripe'
            onSubmit={handleSubmit}
        >
            <CardElement
                className='conce__stripe-element'
                options={cardStyle}
                onChange={handleChange}
            />

            <button
                className='conce__stripe__button'
                disabled={processing || disabled || succeeded}
            >
                <span id="button-text">
                  {processing ? (
                      <div className="conce__stripe__spinner"/>
                  ) : (
                      <Fragment>Pay Now <LockIcon /></Fragment>
                  )}
                </span>
            </button>

            {error && (
                <div
                    className="conce__stripe--error"
                    role="alert"
                >
                    {error}
                </div>
            )}
        </form>
    );
}

export { Stripe };
