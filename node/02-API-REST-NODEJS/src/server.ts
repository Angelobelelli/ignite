import fastify from 'fastify';
import { env } from './env';
import { transationsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie)

app.register(transationsRoutes, {
  prefix: 'transactions',
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server listening on http://localhost:3333`);
  });
