import { Router } from 'express';
import {
  addToBlacklist,
  addToWhitelist,
  disableLockdown,
  enableLockdown,
  getBlacklist,
  getStatus,
  getWhitelist,
  removeFromBlacklist,
  removeFromWhitelist,
  undoAll,
} from '../controllers/state.js';
import { requireAuthToken } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/async-handler.js';

const router = Router();
const withAuth = asyncHandler(requireAuthToken);

router.get('/status', asyncHandler(getStatus));
router.post('/lockdown/on', withAuth, asyncHandler(enableLockdown));
router.post('/lockdown/off', withAuth, asyncHandler(disableLockdown));

router.get('/whitelist', asyncHandler(getWhitelist));
router.post('/whitelist', withAuth, asyncHandler(addToWhitelist));
router.delete('/whitelist/:domain', withAuth, asyncHandler(removeFromWhitelist));

router.get('/blacklist', asyncHandler(getBlacklist));
router.post('/blacklist', withAuth, asyncHandler(addToBlacklist));
router.delete('/blacklist/:domain', withAuth, asyncHandler(removeFromBlacklist));

router.post('/undo-all', withAuth, asyncHandler(undoAll));

export default router;
