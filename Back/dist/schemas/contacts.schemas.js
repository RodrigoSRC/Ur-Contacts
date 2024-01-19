"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsSchemaResponse = exports.contactSchemaUpdate = exports.contactSchemaRequest = exports.contactSchema = void 0;
const zod_1 = require("zod");
const contactSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    telephone: zod_1.z.string(),
    registerAt: zod_1.z.date()
});
exports.contactSchema = contactSchema;
const contactSchemaRequest = contactSchema.omit({
    id: true,
    registerAt: true
});
exports.contactSchemaRequest = contactSchemaRequest;
const contactsSchemaResponse = zod_1.z.array(contactSchema);
exports.contactsSchemaResponse = contactsSchemaResponse;
const contactSchemaUpdate = contactSchema.omit({
    id: true
}).partial();
exports.contactSchemaUpdate = contactSchemaUpdate;
