import { createApp } from './server.js';
import { createPool, runMigrations } from './db.js';
import { createStore } from './store/postgresStore.js';

const pool = createPool();
await runMigrations(pool);
const store = createStore(pool);
const app = createApp(store);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`primeconnect-backend listening on ${port}`);
});
