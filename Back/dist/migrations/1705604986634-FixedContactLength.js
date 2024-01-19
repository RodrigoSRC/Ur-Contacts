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
exports.FixedContactLength1705604986634 = void 0;
class FixedContactLength1705604986634 {
    constructor() {
        this.name = 'FixedContactLength1705604986634';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "telephone"`);
            yield queryRunner.query(`ALTER TABLE "clients" ADD "telephone" character varying(15) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "telephone"`);
            yield queryRunner.query(`ALTER TABLE "clients" ADD "telephone" character varying(11) NOT NULL`);
        });
    }
}
exports.FixedContactLength1705604986634 = FixedContactLength1705604986634;
