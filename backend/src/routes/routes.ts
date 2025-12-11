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
import { asyncHandler } from '../middlewares/async-handler.js';

const router = Router();

router.get('/status', asyncHandler(getStatus));
router.post('/lockdown/on', asyncHandler(enableLockdown));
router.post('/lockdown/off', asyncHandler(disableLockdown));

router.get('/whitelist', asyncHandler(getWhitelist));
router.post('/whitelist', asyncHandler(addToWhitelist));
router.delete('/whitelist/:domain', asyncHandler(removeFromWhitelist));

router.get('/blacklist', asyncHandler(getBlacklist));
router.post('/blacklist', asyncHandler(addToBlacklist));
router.delete('/blacklist/:domain', asyncHandler(removeFromBlacklist));

router.post('/undo-all', asyncHandler(undoAll));

export default router;
