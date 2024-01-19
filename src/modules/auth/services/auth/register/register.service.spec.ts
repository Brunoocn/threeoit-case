import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';


// const mockUser = {
//   email: 'user@example.com',
//   password: 'hashedpassword',
//   name: 'Test User',
// };

// jest.mock('bcrypt', () => ({
//   hashSync: jest.fn().mockReturnValue('hashedpassword'),
// }));

// describe('UsersService', () => {
//   let service: RegisterService;
//   let prismaService: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         RegisterService,
//         {
//           provide: PrismaService,
//           useValue: {
//             user: {
//               create: jest.fn(),
//             },
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<RegisterService>(RegisterService);
//     prismaService = module.get<PrismaService>(PrismaService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('register', () => {
//     it('should return a user if the password is valid', async () => {
//       prismaService.user.create = jest.fn().mockResolvedValueOnce(mockUser);
//       const result = await service.execute({
//         email: mockUser.email,
//         password: 'password',
//         name: mockUser.name,
//       });

//       expect(prismaService.user.create).toHaveBeenCalledWith({
//         data: {
//           email: mockUser.email,
//           password: mockUser.password,
//           name: mockUser.name,
//         },
//       });
//       expect(result).toEqual(mockUser);
//     });
//   });
// });

