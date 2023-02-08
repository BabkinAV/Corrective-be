import {Router} from 'express';
import {getAffectedUnit, addAffectedUnit} from '../controllers/unitController'

const router = Router()


// GET /unit/:unitNo




router.post('/:unit', addAffectedUnit);

router.get('/:unit', getAffectedUnit);

export default router;