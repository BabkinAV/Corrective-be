import {Router} from 'express';
import {getAffectedUnit, addAffectedUnit, updateAffectedUnitStatus} from '../controllers/unitController'

const router = Router()




// POST /unit/:unitNo
router.post('/', addAffectedUnit);

// PUT /unit/updatestatus/:unitNo
router.put('/updatestatus/:unitnumber', updateAffectedUnitStatus)

// GET /unit/updatestatus/:unitNo
router.get('/:unitnumber', getAffectedUnit);

export default router;