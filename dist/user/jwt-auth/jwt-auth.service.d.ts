import { JwtService } from '@nestjs/jwt';
import { User } from '../user.schema';
export declare class JwtAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signPayload(payload: {
        email: string;
    }): Promise<string>;
    validateUser(user: User): Promise<{
        email: string;
    }>;
}
