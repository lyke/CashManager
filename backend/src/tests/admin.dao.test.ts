import { AdminsDao } from '../dao/admins.dao';
import { DatabaseServiceInterface, DatabaseError } from '../dao/database/databaseServiceInterface';

describe('AdminsDao', () => {
  let dao: AdminsDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      queryCallback: jest.fn(),
      queryCallbackValues: jest.fn(),
    };
    dao = new AdminsDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all admins', async () => {
    const mockAdmins = [
      { id: 1, username: 'Admin 1', password: 'Password 1' },
      { id: 2, username: 'Admin 2', password: 'Password 2' },
    ];

    (mockDb.queryCallback as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockAdmins);
    });

    const admins = await dao.getAllAdmins();
    expect(admins).toEqual(mockAdmins);
  });

  it('should get admin by id', async () => {
    const adminId = 1;
    const mockAdmin = { id: adminId, username: 'Admin 1', password: 'Password 1' };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null, mockAdmin);
    });

    const result = await dao.getAdminById(adminId);
    expect(result).toEqual(mockAdmin);
  });


  it('should update an admin', async () => {
    const adminId = 1;
    const mockUpdatedAdminData = { username: 'Updated Admin', password: 'Updated Password' };
    const mockUpdatedAdmin = { id: adminId, ...mockUpdatedAdminData };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null);
    });

    const result = await dao.updateAdmin(adminId, mockUpdatedAdminData);
    expect(result).toEqual(mockUpdatedAdmin);
  });

  it('should delete an admin', async () => {
    const adminId = 1;
    const mockDeleteResponse = { id: adminId };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null);
    });

    const result = await dao.deleteAdmin(adminId);
    expect(result).toEqual(mockDeleteResponse);
  });

  // it('should create an admin', async () => {
  //   const mockAdmin = { username: 'Admin 1', password: 'Password 1' };
  //   const mockResult = { insertId: 1 };
  //   (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
  //     callback(null, mockResult);
  //   });

  //   const admin = await dao.createAdmin(mockAdmin);
  //   expect(admin).toEqual({ id: 1, ...mockAdmin });
  // });
});
