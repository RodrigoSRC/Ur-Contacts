"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const sessionRouter = (0, express_1.Router)();
exports.sessionRouter = sessionRouter;
sessionRouter.post("", (req, res) => controllers_1.sessionController.login(req, res));
