import app from './app.js';
import { getHost, getPort } from './config/env.js';
import { getAuthToken } from './services/auth-token.js';

const PORT = getPort();
const HOST = getHost();
const hostForLog = HOST === '::1' ? '[::1]' : HOST;

await getAuthToken().catch((error) => {
  console.error('[backend] Failed to initialize auth token', error);
});

app.listen(PORT, HOST, () => {
  console.log(`[backend] listening on http://${hostForLog}:${PORT}`);
});
