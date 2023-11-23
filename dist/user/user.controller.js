"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_service_1 = require("./jwt-auth/jwt-auth.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const bcrypt = __importStar(require("bcrypt"));
let UserController = class UserController {
    constructor(userService, jwtAuthService) {
        this.userService = userService;
        this.jwtAuthService = jwtAuthService;
    }
    async signUp(createUserDto) {
        const { name, email, password } = createUserDto;
        const existingUser = await this.userService.findByEmail(email.toLocaleLowerCase());
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.create({
            name,
            email: email.toLocaleLowerCase(),
            password: hashedPassword,
        });
        const token = await this.jwtAuthService.signPayload({
            email: newUser.email.toLocaleLowerCase(),
        });
        return { token };
    }
    async signIn(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.userService.findByEmail(email.toLocaleLowerCase());
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.jwtAuthService.signPayload({
                email: email.toLocaleLowerCase(),
            });
            return { token };
        }
        else {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_auth_service_1.JwtAuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map