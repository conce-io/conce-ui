/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { loadStripe, Stripe as StripeType } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElements } from "../StripeElements";

interface Props {
    publicKey: string;
    intent: {
        client_secret: string;
    };
}

const Stripe = ({ publicKey, intent }: Props) => {
    const [promise, setPromise] = useState<null | Promise<StripeType>>(null);

    useEffect(() => {
        setPromise(loadStripe(publicKey));
    }, []);

    return (
        <Elements stripe={promise}>
            <StripeElements clientSecret={intent.client_secret}/>
        </Elements>
    )
}

export type { Props };
export { Stripe };
