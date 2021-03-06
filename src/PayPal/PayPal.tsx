/** @jsx h */
import { Fragment, h } from 'preact';
import { PayPalButton } from "react-paypal-button-v2";

interface Props {
    publicKey: string;
    paypalPublicKey: string;
    orderId: string;
    currency: string;
    onSuccess: () => void;
    onError: (error) => void;
}

const PayPal = (
    {
        publicKey,
        paypalPublicKey,
        orderId,
        currency,
        onSuccess,
        onError,
    }: Props
) => {
    const createOrder = (): Promise<string> => {
        return new Promise((resolve) => {
            resolve(orderId);
        });
    }

    const approveOrder = async (data): Promise<void> => {
        const capturePayment = await fetch('https://conce.test/api/paypal/capture', {
            headers: {
                publicKey,
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                orderId: data.orderID,
            }),
        });

        const capturePaymentResult = await capturePayment.json();

        if (capturePaymentResult.error) {
            // todo: how does paypal handle errors?
            onError(capturePaymentResult.error);
        }

        if (capturePayment.ok) {
            onSuccess();
        }
    }

    return (
        <Fragment>
            <PayPalButton
                options={{
                    'clientId': paypalPublicKey,
                    currency,
                }}
                createOrder={() => createOrder()}
                onApprove={(data) => approveOrder(data)}
                style={{
                    layout: 'horizontal',
                }}
            />
        </Fragment>
    )
}

export { PayPal };
