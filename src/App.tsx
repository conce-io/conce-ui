/** @jsx h */
import "preact/debug";
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { RadioOption } from "./RadioOption";
import { PayPal } from "./PayPal";
import { Stripe } from "./Stripe";
// @ts-ignore
import PayPalLogo from '../assets/paypal-logo.svg';
import './App.scss';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe as StripeType } from "@stripe/stripe-js";

enum Gateway {
    Stripe = 'STRIPE',
    PayPal = 'PAYPAL',
}

interface AppProps {
    publicKey: string;
    currency: string;
    amount: number;
    stripePublicKey: string;
}

interface PaypalState {
    publicKey: string;
    order: string;
}

const App = ({publicKey, currency, amount, stripePublicKey}: AppProps) => {
    const [stripePromise, setStripePromise] = useState<null | Promise<StripeType>>(null);
    const [gateway, setGateway] = useState(Gateway.Stripe);
    const [paypal, setPaypal] = useState<PaypalState>(null);
    const [isPaypalLoading, setIsPaypalLoading] = useState<boolean>(false);

    useEffect(() => {
        setStripePromise(loadStripe(stripePublicKey));
    }, []);

    const fetchPaypal = () => {
        setIsPaypalLoading(true);

        const urlParams = new URLSearchParams({
            currency,
            amount: amount.toString(),
        });

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
            <fieldset className='conce'>
                <div className='conce__title'>
                    Choose a way to pay
                </div>

                <div className="conce__radio-options">
                    <RadioOption
                        title='Credit or debit card'
                        selected={gateway === Gateway.Stripe}
                        onClick={() => setGateway(Gateway.Stripe)}
                        optionKey={Gateway.Stripe}
                    >
                        <Elements stripe={stripePromise}>
                            <Stripe
                                publicKey={publicKey}
                                amount={amount}
                                currency={currency}
                            />
                        </Elements>
                    </RadioOption>

                    <RadioOption
                        title={
                            <img
                                alt='PayPal logo'
                                src={PayPalLogo}
                                width='60'
                                height='19'
                            />
                        }
                        selected={gateway === Gateway.PayPal}
                        onClick={() => setGateway(Gateway.PayPal)}
                        optionKey={Gateway.PayPal}
                    >
                        {PayPalOption()}
                    </RadioOption>
                </div>
            </fieldset>
        </div>
    )
}

export { AppProps };
export default App;
