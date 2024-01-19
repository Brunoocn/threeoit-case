// import { Test, TestingModule } from '@nestjs/testing';

// import { PrismaService } from '../../../../../prisma.service';
// import { UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { LoginService } from './login.service';

// const mockUser = {
//   email: 'user@example.com',
//   password: 'hashedpassword',
//   name: 'Test User',
// };

// jest.mock('bcrypt', () => ({
//   hashSync: jest.fn().mockReturnValue('hashedpassword'),
// }));

// describe('UsersService', () => {
//   let service: LoginService;
//   let prismaService: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         LoginService,
//         {
//           provide: PrismaService,
//           useValue: {
//             user: {
//               findUnique: jest.fn(),
//             },
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<LoginService>(LoginService);
//     prismaService = module.get<PrismaService>(PrismaService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('login', () => {
//     it('should return a user if the password is valid', async () => {
//       prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(mockUser);
//       const result = await service.execute({
//         email: mockUser.email,
//         password: 'password',
//       });

//       expect(prismaService.user.findUnique).toHaveBeenCalledWith({
//         where: { email: mockUser.email },
//       });
//       expect(bcrypt.compareSync).toHaveBeenCalledWith(
//         'password',
//         mockUser.password,
//       );
//       expect(result).toEqual(mockUser);
//     });

//     it('should throw an UnauthorizedException if the password is invalid', async () => {
//       prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(mockUser);
//       bcrypt.compareSync = jest.fn().mockReturnValue(false);

//       await expect(
//         service.execute({ email: mockUser.email, password: 'wrongpassword' }),
//       ).rejects.toThrow(UnauthorizedException);
//     });

//     it('should throw an UnauthorizedException if the user does not exist', async () => {
//       prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(null);

//       await expect(
//         service.execute({ email: mockUser.email, password: 'password' }),
//       ).rejects.toThrow(UnauthorizedException);
//     });
//   });
// });
