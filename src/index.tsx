import React from "preact/compat";
import App from "./App";

interface MountArgs {
    publicKey: string;
    currency: string;
    amount: number;
    stripe: {
        publicKey: string;
    },
    elementId: string;
    successCallback?: () => void,
    errorCallback?: (error) => void,
}

const mount = (
    {
        publicKey,
        currency,
        amount,
        stripe,
        elementId = 'conce-container',
        successCallback,
        errorCallback,
    }: MountArgs
) => {
    if (!successCallback) {
        successCallback = () => {};
    }

    if (!errorCallback) {
        errorCallback = () => {};
    }

    React.render(
        <App
            publicKey={publicKey}
            amount={amount}
            currency={currency}
            stripe={stripe}
            successCallback={successCallback}
            errorCallback={errorCallback}
        />,
        document.getElementById(elementId)
    );
}

if (window) {
    window['Conce'] = {
        mount,
    };
}
