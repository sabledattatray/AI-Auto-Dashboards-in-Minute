import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2024-04-10',
  typescript: true,
});

export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    quota: 3,
    pages: 1,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    pages: 10,
    price: {
      amount: 29,
      priceIds: {
        test: 'price_pro_test_id',
        production: 'price_pro_prod_id',
      },
    },
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    quota: 1000,
    pages: 100,
    price: {
      amount: 99,
      priceIds: {
        test: 'price_ent_test_id',
        production: 'price_ent_prod_id',
      },
    },
  },
];
