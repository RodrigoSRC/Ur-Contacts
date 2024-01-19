"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../data-source");
const clients_entity_1 = require("../entities/clients.entity");
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
class SessionService {
    create({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const findClient = yield clientRepository.findOne({
                where: {
                    email
                },
                relations: {
                    Contacts: true
                }
            });
            if (!findClient) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, findClient.password);
            if (!passwordMatch) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            const token = (0, jsonwebtoken_1.sign)({ userName: findClient.name }, process.env.SECRET_KEY, { expiresIn: "1h", subject: findClient.id });
            return { "token": token, "user": findClient };
        });
    }
}
exports.SessionService = SessionService;
