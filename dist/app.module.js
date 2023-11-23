"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const jwt_auth_service_1 = require("./user/jwt-auth/jwt-auth.service");
const user_schema_1 = require("./user/user.schema");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const logging_interceptor_1 = require("./logger/logging.interceptor");
const db_url = process.env.DB_URL
    ? process.env.DB_URL
    : 'mongodb+srv://karim:karim@eg-task-db.cpmuygl.mongodb.net/?retryWrites=true&w=majority';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'your-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            mongoose_1.MongooseModule.forRoot(db_url),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            jwt_auth_service_1.JwtAuthService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map