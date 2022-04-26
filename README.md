[![Netlify Status](https://api.netlify.com/api/v1/badges/58f16a0a-15da-4d0b-a2c4-b1bdf389474a/deploy-status)](https://app.netlify.com/sites/kb-coach/deploys)

# KB-COACHING

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with a [MongoDB](https://www.mongodb.com/) connection.

## IDEA

When I'm not coding or googling I'm a coach in kickboxing. I was using the notes on my iPhone to create and manage every kickboxing workout, which as you can imagine got very tiresome :nauseated_face:. So, rather than using notes I decided to create my own webapp, customized to my liking, whilst also increasing my experience with NextJS & Netlify :smiling_face_with_three_hearts:

## Getting Started

First, change the file `.env.example` to `.env` and change variables to:

```
MONGODB_URI="mongodb+srv://sjoback:Cxkiwn12345@cluster0.ldupk.mongodb.net/test?retryWrites=true&w=majority"
```

```
DB_NAME="kb-coaching"
```

```
DEV_URL="http://localhost:3000"
```

```
PROD_URL="http://localhost:3000"
```

Second, run the development server and enjoy:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser of choiche, preferably [Chrome](https://www.google.com/chrome/), to see the result.
