[![Netlify Status](https://api.netlify.com/api/v1/badges/58f16a0a-15da-4d0b-a2c4-b1bdf389474a/deploy-status)](https://app.netlify.com/sites/kb-coach/deploys)

# KB-COACHING

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with a [MongoDB](https://www.mongodb.com/) connection.

## IDEA

When I'm not coding or googling I'm coaching in kickboxing. I was using the notes on my iPhone to create and manage every kickboxing workout, which as you can imagine got very tiresome. So, rather than using notes I decided to create my own webapp, customized to my liking, whilst also increasing my experience with NextJS.

## Getting Started

First, change `.env.example` to `.env`.
Then edit the file as follows:

```
MONGODB_URI="mongodb+srv://sjoback:Cxkiwn12345@cluster0.ldupk.mongodb.net/test?retryWrites=true&w=majority"
DB_NAME="kb-coaching"
DEV_URL="http://localhost:3000"
PROD_URL="https://kb-coach.netlify.app"
```

After

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/workouts](http://localhost:3000/api/workouts)..
