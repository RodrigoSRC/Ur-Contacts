"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ensureAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "invalid token"
        });
    }
    const splitToken = token.split(" ")[1];
    (0, jsonwebtoken_1.verify)(splitToken, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "invalid token"
            });
        }
        res.locals.clientId = decoded.sub;
        return next();
    });
};
exports.ensureAuthMiddleware = ensureAuthMiddleware;
