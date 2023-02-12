const PORT = process.env.PORT || 5000;
import { app } from './app';
app.listen({ port: PORT }, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
