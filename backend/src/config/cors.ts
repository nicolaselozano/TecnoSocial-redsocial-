import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, origin || '*');
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
};
