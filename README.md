<p align="center">
  <a href="https://conce.io">
    <img src="assets/conce.svg" alt="Logo" height="80">
  </a>

  <h3 align="center">💖 Conce Drop-in UI</h3>

  <p align="center">
    Start accepting Stripe & PayPal payments on your website in 30 seconds
    <br />
    <a href="https://conce.io/todo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://conce.io/todo">View Demo</a>
    ·
    <a href="https://github.com/conce-io/conce-ui/issues">Report Bug</a>
    ·
    <a href="https://conce.io/todo">View Playground</a>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
          <ul>
            <li><a href="#script">Using script tag (classic)</a></li>
            <li><a href="#npmyarn">Via NPM or Yarn (modern)</a></li>
          </ul>
      </ul>
    </li>
    <li>
        <a href="#styling">Styling</a>
      <ul>
        <li><a href="#cdn">Using the CDN</a></li>
        <li><a href="#css">Importing into your CSS</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#conce">Conce</a></li>
  </ol>
</details>

## Getting Started

Remember how we said you could get started in 30 seconds? We mean it.

### Prerequisites

In order to use Conce's Drop-in UI, you need to sign up to an account on <a href="https://conce.io/todo">our website.</a>

Once you're through the setup process, you'll be provided with a **Conce public key**. Have this on hand when getting started.

Secondly, be sure to grab your **Stripe public key** and **PayPal public key** as well.

### Installation

When it comes to installing Conce, you've got two choices. Which one you should choose largely depends on your tech-stack.

If you're using NPM or Yarn to manage your dependencies, then proceed with the second step. If you've got no idea what I'm talking about, that's okay too – option one is for you.

#### Using script tag (classic)

1. Place the following code in your HTML at the end of your `<body>` tag or in `<head>`
   ```html
   <script src="https://unpkg.com/conce-ui@latest/conce.min.js"></script>
   ```
2. Mount when you're looking to load the UI. Place the following code **after** the above code snippet.
   ```html
   <script type="application/javascript">
        window.Conce.mount({
            publicKey: 'xxx', // Conce Public Key
            currency: 'USD',
            amount: 1000,
            stripe: {
                publicKey: 'pk_xxx', // Stripe Public Key
            },
            paypal: {
                publicKey: 'xxx', // PayPal Public Key
            },
            successCallback: function () {
                // What would you like to do, on success?
                console.log('success');
            },
            errorCallback: function (error) {
                // What would you like to do, if there's an error?
                console.log('error', error);
            },
        });
   </script>
   ```
   
3. Move onto <a href="#styling">Styling</a>
#### Via NPM or Yarn (modern)
1. Install Conce UI via NPM
   ```shell
   npm install conce-ui
   
   # OR via Yarn (preferred)
   
   yarn add conce-ui
   ```
   
2. Import in your JavaScript/TypeScript file
    ```javascript
    import { mount } from 'conce-ui'; 
    ```

3. Mount when you're looking to load the UI
    ```javascript
    mount({
        publicKey: 'xxx', // Conce Public Key
        currency: 'USD',
        amount: 1000,
        stripe: {
            publicKey: 'pk_xxx', // Stripe Public Key
        },
        paypal: {
            publicKey: 'xxx', // PayPal Public Key
        },
        successCallback: function () {
            // What would you like to do, on success?
            console.log('success');
        },
        errorCallback: function (error) {
            // What would you like to do, if there's an error?
            console.log('error', error);
        },
    });
    ```
4. Move onto <a href="#styling">Styling</a>

### Styling
By default, Conce comes unstyled (it's hella ugly). We know, that some of you will want to have a fully custom checkout experience – and that's okay!

Good news! We've also got a **light theme** (and more coming soon!) ready to be used in just a single line of code. It's carefully crafted, and unopinionated.

#### Using the CDN
1. Place the following code in your HTML in your `<head>` tag
   ```html
   <link rel="stylesheet" href="https://unpkg.com/conce-ui@latest/conce.css">
   ```

#### Importing into your CSS
1. In your CSS file
   ```css
   @import url("https://unpkg.com/conce-ui@latest/conce.css");
   
   /* OR if you're using NPM or Yarn */
   
   @import 'conce-ui/conce';
   ```

#### 🎉 Congrats! You're now using Conce. The no bullsh*t payment gateway.
You're ready to accept PayPal and Stripe payments. Here's a list of things you *won't* need to do from now on. Ever.

❌ Read Stripe's rather nice documentation  
❌ Read PayPal's absolutely horrid documentation *(if you've ever read it, you know what I mean)*  
❌ Attempt to maintain your backend's compatibility with both platforms  
❌ Build UI that works with both platforms  
❌ Setup webhooks on both platforms

Instead...

✅ One documentation  
✅ One platform to manage all your webhooks   
✅ One unified webhook response  
✅ One UI library to maintain

💖 Thank you for using Conce
