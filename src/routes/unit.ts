import {Router} from 'express';
import {getAffectedUnit, addAffectedUnit, updateAffectedUnitStatus} from '../controllers/unitController'

const router = Router()


// GET /unit/:unitNo



router.post('/', addAffectedUnit);

router.put('/updatestatus/:unitnumber', updateAffectedUnitStatus)

router.get('/:unitnumber', getAffectedUnit);

export default router;