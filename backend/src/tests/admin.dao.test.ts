import { AdminsDao } from '../dao/admins.dao'
import { DatabaseServiceInterface } from '../dao/database/databaseServiceInterface'

describe('AdminsDao', () => {
  let dao: AdminsDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
    };
    dao = new AdminsDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all admins', async () => {
    const mockAdmins = [{ id: 1, username: 'Admin 1', password: 'Password 1' }, { id: 2, username: 'Admin 2', password: 'Password 2' }];
    (mockDb.query as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockAdmins);
    });

    const admins = await dao.getAllAdmins();
    expect(admins).toEqual(mockAdmins);
  });

  it('should get admin by id', async () => {
    const mockAdmin = { id: 1, username: 'Admin 1', password: 'Password 1' };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, [mockAdmin]);
    });

    const admin = await dao.getAdminById(1);
    expect(admin).toEqual(mockAdmin);
  });

  it('should create an admin', async () => {
    const mockAdmin = { username: 'Admin 1', password: 'Password 1' };
    const mockResult = { insertId: 1 };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const admin = await dao.createAdmin(mockAdmin);
    expect(admin).toEqual({ id: 1, ...mockAdmin });
  });

  it('should update an admin', async () => {
    const mockAdmin = { username: 'Updated Admin', password: 'Updated Password' };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const admin = await dao.updateAdmin(1, mockAdmin);
    expect(admin).toEqual({ id: 1, ...mockAdmin });
  });

  it('should delete an admin', async () => {
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const response = await dao.deleteAdmin(1);
    expect(response).toEqual({ id: 1 });
  });
});
