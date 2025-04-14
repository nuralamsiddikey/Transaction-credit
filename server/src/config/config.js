import 'dotenv/config';

const {
  NODE_ENV,
  PROD_PORT,
  DEV_PORT,
  LOCAL_PORT,
  MONGO_URL,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} = process.env;

const validEnvironments = ['dev', 'prod', 'local'];

if (!validEnvironments.includes(process.env.NODE_ENV)) {
  throw new Error(
    `Invalid NODE_ENV value: ${
      process.env.NODE_ENV
    }. Must be one of ${validEnvironments.join(', ')}.`
  );
}

const config = {
  nodeEnv: NODE_ENV,
 
  prod: {
    port: PROD_PORT,
    mongo_url: MONGO_URL,
    jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
    jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
  },
  dev: {
    port: DEV_PORT,
    mongo_url: MONGO_URL,
    jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
    jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
  },
  local: {
    port: LOCAL_PORT,
    mongo_url: MONGO_URL,
    jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
    jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
  },
};

export default config[NODE_ENV];
