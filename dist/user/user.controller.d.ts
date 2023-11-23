import { UserService } from './user.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly jwtAuthService;
    constructor(userService: UserService, jwtAuthService: JwtAuthService);
    signUp(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    signIn(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
}
