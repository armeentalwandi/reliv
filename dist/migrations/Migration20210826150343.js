"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210826150343 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210826150343 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null, "email" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
}
exports.Migration20210826150343 = Migration20210826150343;
//# sourceMappingURL=Migration20210826150343.js.map