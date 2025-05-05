import { FastifyInstance } from 'fastify';
import { db } from '../database';
import { z } from 'zod';
import crypto from 'crypto';
import { checkSessionIdExist } from '../middleware/check-session-id-exist';

export async function transationsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: checkSessionIdExist }, async (request, replay) => {
    const { sessionId } = request.cookies;

    const transactions = await db('transations')
      .where('session_id', sessionId)
      .select('*');

    return { transactions };
  });

  app.get('/:id', { preHandler: checkSessionIdExist }, async (request) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    });
    const { sessionId } = request.cookies;
    const { id } = getTransactionParams.parse(request.params);

    const transaction = await db('transations')
      .where({
        id,
        session_id: sessionId,
      })
      .first();

    return { transaction };
  });

  app.get('/summary', { preHandler: checkSessionIdExist }, async (request) => {
    const { sessionId } = request.cookies;
    const summary = await db('transations')
      .where('session_id', sessionId)
      .sum('value', { as: 'amount' })
      .first();

    return { summary };
  });

  app.post('/', async (request, reply) => {
    const createTransactionBody = z.object({
      tittle: z.string(),
      value: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { tittle, value, type } = createTransactionBody.parse(request.body);

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = crypto.randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true,
      });
    }

    await db('transations').insert({
      id: crypto.randomUUID(),
      tittle,
      value: type === 'credit' ? value : value * -1,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
