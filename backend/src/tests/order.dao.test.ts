import { OrdersDao } from '../dao/orders.dao';
import { DatabaseServiceInterface } from '../dao/database/databaseServiceInterface';
describe('OrdersDao', () => {
  let dao: OrdersDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
    };
    dao = new OrdersDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all orders', async () => {
    const mockOrders = [{ id: 1, desc: 'Order 1' }, { id: 2, desc: 'Order 2' }];
    (mockDb.query as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockOrders);
    });

    const orders = await dao.getAllOrders();
    expect(orders).toEqual(mockOrders);
  });

  it('should get order by id', async () => {
    const mockOrder = { id: 1, desc: 'Order 1' };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, [mockOrder]);
    });

    const order = await dao.getOrderById(1);
    expect(order).toEqual(mockOrder);
  });

  it('should create an order', async () => {
    const mockOrder = { desc: 'Order 1' };
    const mockResult = { insertId: 1 };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const order = await dao.createOrder(mockOrder);
    expect(order).toEqual({ id: 1, ...mockOrder });
  });

  it('should update an order', async () => {
    const mockOrder = { desc: 'Updated Order' };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const order = await dao.updateOrder(1, mockOrder);
    expect(order).toEqual({ id: 1, ...mockOrder });
  });

  it('should delete an order', async () => {
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const response = await dao.deleteOrder(1);
    expect(response).toEqual({ id: 1 });
  });
});
