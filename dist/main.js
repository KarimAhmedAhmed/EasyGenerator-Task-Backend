"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
async function bootstrap() {
    (0, dotenv_1.config)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cors_1.default)({
        origin: '*',
        methods: 'GET,POST',
        optionsSuccessStatus: 201,
    }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map