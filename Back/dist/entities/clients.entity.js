"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const contacts_entity_1 = require("./contacts.entity");
let Client = class Client {
    hashPassword() {
        const hasRounds = (0, bcryptjs_1.getRounds)(this.password);
        if (!hasRounds) {
            this.password = (0, bcryptjs_1.hashSync)(this.password, 10);
        }
    }
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: false }),
    __metadata("design:type", String)
], Client.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", String)
], Client.prototype, "registerAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contacts_entity_1.Contact, contact => contact.client),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Client.prototype, "Contacts", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Client.prototype, "hashPassword", null);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
