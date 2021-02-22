/** @jsx h */
import "preact/debug";
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { RadioOption } from "./RadioOption";
import { PayPal } from "./PayPal";
import { Stripe } from "./Stripe";

enum Gateway {
    Stripe = 'STRIPE',
    PayPal = 'PAYPAL',
}

interface AppProps {
    publicKey: string;
    currency: string;
    amount: number;
}

interface StripeState {
    publicKey: string;
    intent: {
        client_secret: string;
    },
}

interface PaypalState {
    publicKey: string;
    order: string;
}

const App = ({ publicKey, currency, amount }: AppProps) => {
    const [gateway, setGateway] = useState(Gateway.Stripe);
    const [stripe, setStripe] = useState<StripeState>(null);
    const [paypal, setPaypal] = useState<PaypalState>(null);
    const [isPaypalLoading, setIsPaypalLoading] = useState<boolean>(false);
    const urlParams = new URLSearchParams({
        currency,
        amount: amount.toString(),
    });

    const fetchStripe = () => {
        fetch(`http://conce.test/api/stripe/create?${urlParams}`, {
            headers: {
                publicKey,
            }
        })
            .then(response => response.json())
            .then(response => setStripe(response));
    }

    const fetchPaypal = () => {
        setIsPaypalLoading(true);

        fetch(`http://conce.test/api/paypal/create?${urlParams}`, {
            headers: {
                publicKey,
            }
        })
            .then(response => response.json())
            .then(response => {
                setIsPaypalLoading(false);
                setPaypal(response);
            });
    }

    useEffect(() => {
        fetchStripe();
    }, []);

    useEffect(() => {
        if (gateway === Gateway.PayPal && !paypal) {
            fetchPaypal();
        }
    }, [gateway]);

    const PayPalOption = () => {
        if (paypal) {
            return (
                <PayPal
                    publicKey={paypal.publicKey}
                    orderId={paypal.order}
                    currency={currency}
                />
            )
        }

        if (isPaypalLoading) {
            return (
                <span>Loading...</span>
            )
        }

        return null;
    }

    return (
        <div>
            <fieldset>
                <legend className="sr-only">
                    Pay Now
                </legend>

                <div className="bg-white rounded-md -space-y-px">
                    <RadioOption
                        title='Credit or debit card'
                        selected={gateway === Gateway.Stripe}
                        onClick={() => setGateway(Gateway.Stripe)}
                        optionKey={Gateway.Stripe}
                    >
                        { stripe ? (
                            <Stripe
                                publicKey={stripe.publicKey}
                                intent={stripe.intent}
                            />
                            ) : (
                                <span>Loading...</span>
                            )
                        }
                    </RadioOption>

                    <RadioOption
                        title={
                            <img
                                alt='PayPal logo'
                                src={'/images/paypal-logo.svg'}
                                width='60'
                                height='19'
                            />
                        }
                        selected={gateway === Gateway.PayPal}
                        onClick={() => setGateway(Gateway.PayPal)}
                        optionKey={Gateway.PayPal}
                    >
                        { PayPalOption() }
                    </RadioOption>
                </div>
            </fieldset>
        </div>
    )
}

export { AppProps };
export default App;
