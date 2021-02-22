/** @jsx h */
import { Fragment, h } from 'preact';
import { PayPalButton } from "react-paypal-button-v2";

interface Props {
    publicKey: string;
    orderId: string;
    currency: string;
}

const PayPal = ({publicKey, orderId, currency}: Props) => {
    const createOrder = (): Promise<string> => {
        return new Promise((resolve) => {
            resolve(orderId);
        });
    }

    const approveOrder = async (data): Promise<void> => {
        await fetch('http://conce.test/api/paypal/capture', {
            headers: {
                publicKey: 'test',
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                orderId: data.orderID,
            }),
        });
    }

    return (
        <Fragment>
            <PayPalButton
                options={{
                    'clientId': publicKey,
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
