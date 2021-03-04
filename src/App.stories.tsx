/** @jsx h */
import { h } from 'preact';
import App from './App';

export default {
    title: 'App',
    component: App,
};

const Template = (args) => <App {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    publicKey: 'yourConcePublicKeyHere',
    stripePublicKey: 'yourStripePublicKeyHere',
    currency: 'GBP',
    amount: 1000,
};
