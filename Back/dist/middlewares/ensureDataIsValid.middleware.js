"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDataIsValidMiddleware = void 0;
const ensureDataIsValidMiddleware = (schema) => (req, res, next) => {
    const validatedBody = schema.parse(req.body);
    req.body = validatedBody;
    return next();
};
exports.ensureDataIsValidMiddleware = ensureDataIsValidMiddleware;
