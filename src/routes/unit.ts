import {Router} from 'express';
import {getAffectedUnit, addAffectedUnit, updateAffectedUnitStatus} from '../controllers/unitController';

import { isAuth } from '../middlewares/is-auth';

const router = Router()




// POST /unit/:unitNo
// router.post('/',  addAffectedUnit);

// PUT /unit/updatestatus/:unitNo
router.put('/updatestatus/:unitnumber', isAuth,  updateAffectedUnitStatus)

// GET /unit/updatestatus/:unitNo
router.get('/:unitnumber', getAffectedUnit);

export default router;