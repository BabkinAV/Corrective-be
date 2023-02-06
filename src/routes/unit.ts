import {Router} from 'express';
import { Request } from 'express';

const router = Router()


// GET /unit/:unitNo


router.get('/:unitNo', (req: Request<{unitNo: string}>) => {
	
	console.log('Requested unit No: ', req.params.unitNo);
})

export default router;