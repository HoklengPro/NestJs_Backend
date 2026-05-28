import { Controller, Post, Req, Res, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * Forwards GraphQL to Hasura Cloud with the admin secret from server env only.
 * Use from the Vue app as VITE_HASURA_HTTP=http://localhost:<PORT>/hasura/v1/graphql
 * (optional dev path when anonymous access is not configured on Hasura).
 */
@Controller('hasura')
export class HasuraProxyController {
  private readonly logger = new Logger(HasuraProxyController.name);

  @Post('v1/graphql')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const url = process.env.HASURA_GRAPHQL_HTTP?.trim();
    const secret = process.env.HASURA_ADMIN_SECRET?.trim();

    if (!url || !secret) {
      res.status(503).json({
        errors: [
          {
            message:
              'Hasura proxy not configured: set HASURA_GRAPHQL_HTTP and HASURA_ADMIN_SECRET in server .env',
          },
        ],
      });
      return;
    }

    try {
      const upstream = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': secret,
        },
        body: JSON.stringify(req.body ?? {}),
      });
      const text = await upstream.text();
      res.status(upstream.status);
      res.setHeader('Content-Type', 'application/json');
      res.send(text);
    } catch (e) {
      this.logger.error('Hasura proxy fetch failed', e);
      res.status(502).json({
        errors: [{ message: 'Hasura proxy could not reach upstream' }],
      });
    }
  }
}
