/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface Props {
    clientSecret: string;
}

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

const StripeElements = ({clientSecret}: Props) => {
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

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        // create Stripe payment method
        // (error) show error in payment form
        // send payment method to server
        // (error) show error in payment form
        // (3d-secure) call stripe's handleCardAction
        // (3d-secure) (error) show error in payment form
        // (3d-secure) confirm payment intent on the server
        // show success message

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <form
            id="payment-form"
            onSubmit={handleSubmit}
        >
            <CardElement
                id="card-element"
                options={cardStyle}
                onChange={handleChange}
            />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
        <span id="button-text">
          {processing ? (
              <div
                  className="spinner"
                  id="spinner"
              />
          ) : (
              "Pay"
          )}
        </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div
                    className="card-error"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded. Refresh the page to pay again.
            </p>
        </form>
    );
}

export { StripeElements };
