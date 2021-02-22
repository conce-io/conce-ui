import React from "preact/compat";
import App from "./App";

const mount = (publicKey, currency, amount, elementId = 'conce-container') => {
    React.render(
        <App
            publicKey={publicKey}
            amount={amount}
            currency={currency}
        />,
        document.getElementById(elementId)
    );
}

if (window) {
    window['Conce'] = {
        mount,
    };
}
