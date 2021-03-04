/** @jsx h */
import { h } from 'preact';
import App from './App';

export default {
    title: 'App',
    component: App,
};

const Template = (args) => {
    let adjustedArgs = {
        ...args,
        stripe: {
          publicKey: args.stripePublicKey,
        },
    }

    return (
        <App {...adjustedArgs} />
    )
};

export const LightTheme = Template.bind({});
LightTheme.args = {
    publicKey: 'yourConcePublicKeyHere',
    stripePublicKey: 'yourStripePublicKeyHere',
    currency: 'GBP',
    amount: 1000,
};
