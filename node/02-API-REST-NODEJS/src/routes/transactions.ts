import { FastifyInstance } from 'fastify';
import { db } from '../database';
import { z } from 'zod';
import crypto from 'crypto';

export async function transationsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await db('transations').select('*');

    return { transactions };
  });



  app.get('/:id', async (request) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParams.parse(request.params);

    const transaction = await db('transations').where('id' , id).first();

    

    return { transaction };
  });


  
  app.post('/', async (request, replay) => {
    const createTransactionBody = z.object({
      tittle: z.string(),
      value: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { tittle, value, type } = createTransactionBody.parse(request.body);

    await db('transations').insert({
      id: crypto.randomUUID(),
      tittle,
      value: type === 'credit' ? value : value * -1,
    });

    return replay.status(201).send();
  });
}
