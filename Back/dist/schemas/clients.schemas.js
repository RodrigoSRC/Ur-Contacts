"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsSchemaResponse = exports.clientSchemaResponse = exports.clientSchemaRequest = exports.clientSchema = void 0;
const zod_1 = require("zod");
const clientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    telephone: zod_1.z.string(),
    registerAt: zod_1.z.string()
});
exports.clientSchema = clientSchema;
const clientSchemaRequest = clientSchema.omit({
    id: true,
    registerAt: true
});
exports.clientSchemaRequest = clientSchemaRequest;
const clientSchemaResponse = clientSchema.omit({
    password: true
});
exports.clientSchemaResponse = clientSchemaResponse;
const clientsSchemaResponse = zod_1.z.array(clientSchemaResponse);
exports.clientsSchemaResponse = clientsSchemaResponse;
