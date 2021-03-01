import React from "preact/compat";
import App from "./App";

const mount = (publicKey, currency, amount, stripePublicKey, elementId = 'conce-container') => {
    React.render(
        <App
            publicKey={publicKey}
            amount={amount}
            currency={currency}
            stripePublicKey={stripePublicKey}
        />,
        document.getElementById(elementId)
    );
}

if (window) {
    window['Conce'] = {
        mount,
    };
}
