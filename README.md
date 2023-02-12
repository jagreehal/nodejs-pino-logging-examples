# Examples of logging with Pino in Node.js

## Structured Logging

Structured logging is important because it provides context and makes logs easier to search, filter, and analyze. With structured logging, logs are not just a string of text but are composed of key-value pairs that provide additional information about an event or transaction.

Pino supports structured logging out of the box using the JSON format. To log structured messages with Pino, you simply pass an object to the logger's methods, such as **`logger.info()`** or **`logger.error()`**, instead of a string message.

In the example below, we are logging a message to indicate that a user was created. The log message includes an object with key-value pairs that provide additional context about the event, such as the user's ID, name, and email.

```ts
logger.info({
  message: 'User created',
  user: {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
});
```

or

```ts
logger.info(
  {
    user: {
      id: 123,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  'User created'
);
```

## Contextual Logging

Contextual logging is important because it provides additional context about an event or transaction. For example, you may want to log the user ID or session ID for each log message so that you can easily filter logs by user or session.

Pino supports contextual logging using the **`logger.child()`** method. To log contextual messages with Pino, you simply call **`logger.child()`** to create a child logger with the context you want to include in the log message. Then, you can use the child logger to log messages with the context included.

```ts
app.use((req: express.Request, res, next) => {
  const childLogger = logger.child({ req_id: req.id || ulid() });
  req.logger = childLogger;
  next();
});
```
