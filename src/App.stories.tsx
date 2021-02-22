/** @jsx h */
import { h } from 'preact';
import App from './App';

export default {
    title: 'App',
    component: App,
};

export const GBP = () => (
    <App
        currency='GBP'
        amount={750}
        publicKey='test'
    />
);

export const HUF = () => (
    <App
        currency='HUF'
        amount={2500}
        publicKey='test'
    />
);
