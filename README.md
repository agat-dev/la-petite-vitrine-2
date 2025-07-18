# Anima Project

Welcome! This project has been automatically generated by [Anima](https://animaapp.com/) and enhanced with Stripe payment integration.

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, configure your Stripe keys in the `.env` file:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

Then, you'll be able to run a development version of the project with:

```
npm run dev:full
```

This will start both the frontend (port 5173) and the backend server (port 3001).

## Stripe Integration

This project includes a complete Stripe payment system with:

- **Pack Selection**: Users can select one of three website creation packs
- **Maintenance Options**: Optional monthly maintenance subscriptions
- **Secure Checkout**: Stripe Checkout integration for secure payments
- **Success/Cancel Pages**: Proper handling of payment outcomes

### Features

- ✅ Single pack selection with visual feedback
- ✅ Optional maintenance subscription selection
- ✅ Real-time cart summary with pricing
- ✅ Secure Stripe Checkout integration
- ✅ Success and cancellation page handling
- ✅ Responsive design for all devices

### Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Update the `STRIPE_PRICES` object in `server/index.js` with your actual price IDs
4. Configure your `.env` file with the correct keys

If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```
