import { logger } from '../logger';

logger.info({
  message: 'User created',
  user: {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
});
