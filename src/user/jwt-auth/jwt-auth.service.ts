import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.schema';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: { email: string }): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateUser(user: User): Promise<{ email: string }> {
    return { email: user.email };
  }
}
