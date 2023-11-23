import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    const { name, email, password } = createUserDto;

    // Check if the user with the given email already exists
    const existingUser = await this.userService.findByEmail(
      email.toLocaleLowerCase(),
    );
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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

  @Post('signin')
  async signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    const { email, password } = createUserDto;

    const user = await this.userService.findByEmail(email.toLocaleLowerCase());

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.jwtAuthService.signPayload({
        email: email.toLocaleLowerCase(),
      });
      return { token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
