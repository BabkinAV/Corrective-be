"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const body_parser_1 = require("body-parser");
const unit_1 = __importDefault(require("./routes/unit"));
const instruction_1 = __importDefault(require("./routes/instruction"));
class StatusError extends Error {
}
exports.StatusError = StatusError;
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, db_1.connectDB)();
app.use((0, body_parser_1.json)());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server 1');
});
app.use('/unit', unit_1.default);
app.use('/instruction', instruction_1.default);
// serve via http://url/static/
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
console.log('localhost');
const errorHandler = (error, req, res, next) => {
    var _a;
    console.log(error);
    const status = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
};
app.use(errorHandler);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
