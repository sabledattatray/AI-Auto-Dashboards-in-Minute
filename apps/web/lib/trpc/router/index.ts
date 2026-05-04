import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';

const t = initTRPC.create();

const isAuthed = t.middleware(async ({ next }) => {
  const { userId } = await auth();
  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      userId,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

import { DemoConnector } from '@/lib/connectors/demo';

const dataRouter = router({
  fetchTileData: protectedProcedure
    .input(z.object({
      tileId: z.string(),
      datasetId: z.string().optional(),
      query: z.any().optional(),
    }))
    .query(async ({ input }) => {
      const connector = new DemoConnector();
      const result = await connector.executeQuery({}, input.query);
      
      // Basic filtering logic for demo
      if (input.query?.filters?.region) {
        result.data = result.data.filter((d: any) => d.region === input.query.filters.region);
        result.rowCount = result.data.length;
      }
      
      return result;
    }),
});

const aiRouter = router({
  generateInsights: protectedProcedure
    .input(z.object({
      tileId: z.string(),
      data: z.any(),
    }))
    .mutation(async ({ input }) => {
      // In a real app, we'd call OpenAI GPT-4o
      // For now, return a high-fidelity mocked insight
      
      const insights = [
        {
          type: 'positive',
          title: 'Steady Revenue Growth',
          content: 'Monthly revenue has increased by 15% over the last quarter, primarily driven by the East region.',
        },
        {
          type: 'neutral',
          title: 'Seasonal Variance',
          content: 'A slight dip in user activity was observed during weekends, consistent with B2B usage patterns.',
        },
        {
          type: 'anomaly',
          title: 'Unexpected Spike',
          content: 'There was a 40% spike in conversions on Tuesday which correlates with the new marketing campaign.',
        }
      ];

      return { insights };
    }),
});

const billingRouter = router({
  createCheckoutSession: protectedProcedure
    .input(z.object({ planSlug: z.string() }))
    .mutation(async ({ input }) => {
      // Mock stripe session creation
      return { url: 'https://checkout.stripe.com/mock' };
    }),
  getSubscriptionStatus: protectedProcedure
    .query(async () => {
      return { 
        plan: 'free', 
        isSubscribed: false, 
        usage: { visuals: 12, limit: 15 } 
      };
    }),
});

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok' };
  }),
  data: dataRouter,
  ai: aiRouter,
  billing: billingRouter,
});

export type AppRouter = typeof appRouter;
