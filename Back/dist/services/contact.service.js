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
exports.ContactsService = void 0;
const data_source_1 = require("../data-source");
const contacts_entity_1 = require("../entities/contacts.entity");
const clients_entity_1 = require("../entities/clients.entity");
const AppError_1 = require("../errors/AppError");
const contacts_schemas_1 = require("../schemas/contacts.schemas");
class ContactsService {
    create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const client = yield clientRepository.findOne({
                where: {
                    id: userId
                }
            });
            if (!client) {
                throw new AppError_1.AppError("User not found", 404);
            }
            const contact = contactRepository.create(Object.assign(Object.assign({}, data), { client }));
            yield contactRepository.save(contact);
            return contacts_schemas_1.contactSchema.parse(contact);
        });
    }
    list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const client = yield clientRepository.findOne({
                where: {
                    id: userId
                },
                relations: {
                    Contacts: true
                }
            });
            if (!client) {
                throw new AppError_1.AppError("User not found", 404);
            }
            console.log(client.Contacts);
            return contacts_schemas_1.contactsSchemaResponse.parse(client.Contacts);
        });
    }
    update(data, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const oldContact = yield contactRepository.findOneBy({ id: contactId });
            if (!oldContact) {
                throw new AppError_1.AppError("Contact not found", 404);
            }
            const newContactData = contactRepository.create(Object.assign(Object.assign({}, oldContact), data));
            yield contactRepository.save(newContactData);
            return contacts_schemas_1.contactSchema.parse(newContactData);
        });
    }
    remove(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const contact = yield contactRepository.findOneBy({ id: contactId });
            if (!contact) {
                throw new AppError_1.AppError("Contact not found", 404);
            }
            yield contactRepository.remove(contact);
        });
    }
}
exports.ContactsService = ContactsService;
