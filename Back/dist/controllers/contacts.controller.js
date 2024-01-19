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
exports.ContactsController = void 0;
class ContactsController {
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = res.locals.clientId;
            const newContact = yield this.contactsService.create(req.body, clientId);
            return res.status(201).json(newContact);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = res.locals.clientId;
            const contacts = yield this.contactsService.list(clientId);
            return res.json(contacts);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedValues = req.body;
            const contactId = req.params.id;
            const updateTask = yield this.contactsService.update(updatedValues, contactId);
            return res.json(updateTask);
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactId = req.params.id;
            yield this.contactsService.remove(contactId);
            res.status(204).send();
        });
    }
}
exports.ContactsController = ContactsController;
