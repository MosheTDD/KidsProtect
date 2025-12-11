import app from './app.js';
import { getPort } from './config/env.js';

const PORT = getPort();

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});
