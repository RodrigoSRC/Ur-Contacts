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
exports.ClientService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../data-source");
const clients_entity_1 = require("../entities/clients.entity");
const clients_schemas_1 = require("../schemas/clients.schemas");
const AppError_1 = require("../errors/AppError");
class ClientService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password, telephone } = data;
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const findClient = yield clientRepository.findOne({
                where: {
                    email
                }
            });
            if (findClient) {
                throw new AppError_1.AppError("Client already exists", 409);
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            const client = clientRepository.create({
                name,
                email,
                password: hashedPassword,
                telephone
            });
            yield clientRepository.save(client);
            return clients_schemas_1.clientSchemaResponse.parse(client);
        });
    }
    list(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const client = yield clientRepository.findOneBy({ id: clientId });
            if (!client) {
                throw new AppError_1.AppError("User not found", 404);
            }
            return clients_schemas_1.clientSchemaResponse.parse(client);
        });
    }
    update(data, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const oldClient = yield clientRepository.findOneBy({ id: clientId });
            if (!oldClient) {
                throw new AppError_1.AppError("User not found", 404);
            }
            const newClientData = clientRepository.create(Object.assign(Object.assign({}, oldClient), data));
            yield clientRepository.save(newClientData);
            return clients_schemas_1.clientSchemaResponse.parse(newClientData);
        });
    }
    remove(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const client = yield clientRepository.findOneBy({ id: clientId });
            if (!client) {
                throw new AppError_1.AppError("User not found", 404);
            }
            yield clientRepository.remove(client);
        });
    }
}
exports.ClientService = ClientService;
