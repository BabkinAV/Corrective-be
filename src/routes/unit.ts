import {Router} from 'express';
import {getAffectedUnit, addAffectedUnit} from '../controllers/unitController'

const router = Router()


// GET /unit/:unitNo




router.post('/', addAffectedUnit);

router.get('/:unitnumber', getAffectedUnit);

export default router;