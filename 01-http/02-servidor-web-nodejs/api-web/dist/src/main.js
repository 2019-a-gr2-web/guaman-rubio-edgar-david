"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.use(session({
            name: 'server-session-id',
            secret: 'Secreto para cookie-session',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            },
            store: new FileStore()
        }));
        app.setViewEngine('ejs');
        app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
        app.use(express.static('publico'));
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map