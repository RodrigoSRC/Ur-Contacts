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
exports.EnsureIsOwnerMiddleware = void 0;
const data_source_1 = require("../data-source");
const contacts_entity_1 = require("../entities/contacts.entity");
const AppError_1 = require("../errors/AppError");
const EnsureIsOwnerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
    const contactId = req.params.id;
    const clientId = res.locals.clientId;
    const contact = yield contactRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            client: true
        }
    });
    if (!contact) {
        throw new AppError_1.AppError("contact not found", 404);
    }
    if (contact.client.id !== clientId) {
        throw new AppError_1.AppError("You don`t have permission", 403);
    }
    return next();
});
exports.EnsureIsOwnerMiddleware = EnsureIsOwnerMiddleware;
