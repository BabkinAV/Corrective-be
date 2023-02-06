"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /unit/:unitNo
router.get('/:unitNo', (req) => {
    console.log('Requested unit No: ', req.params.unitNo);
});
exports.default = router;
