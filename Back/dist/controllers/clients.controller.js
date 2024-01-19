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
exports.ClientsController = void 0;
class ClientsController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, telephone } = req.body;
            const newClient = yield this.clientService.create({ name, email, password, telephone });
            return res.status(201).json(newClient);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.params.id;
            const clients = yield this.clientService.list(clientId);
            return res.json(clients);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedValues = req.body;
            const clientId = req.params.id;
            const updateClient = yield this.clientService.update(updatedValues, clientId);
            return res.json(updateClient);
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.params.id;
            yield this.clientService.remove(clientId);
            res.status(204).send();
        });
    }
}
exports.ClientsController = ClientsController;
