import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

const clientOptions = {
  browser: {
    write: {
      // eslint-disable-next-line no-console
      info: o => console.info(o.msg),
      // eslint-disable-next-line no-console
      warn: o => console.warn(o.msg),
      // eslint-disable-next-line no-console
      error: o => console.error(o.msg),
    },
  },
};

const logger = pino({
  name: 'granatum-2-frontend',
  level: isProd ? 'info' : 'debug',
  prettyPrint: !isProd ? { colorize: true } : false,
  ...clientOptions,
});

export default logger;
