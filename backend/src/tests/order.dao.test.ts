import { OrdersDao } from '../dao/orders.dao';
import { DatabaseServiceInterface, DatabaseError } from '../dao/database/databaseServiceInterface';

describe('OrdersDao', () => {
  let dao: OrdersDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      queryCallback: jest.fn(),
      queryCallbackValues: jest.fn(),
    };
    dao = new OrdersDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all orders', async () => {
    const mockOrders = [
      { id: 1, desc: 'Order 1' },
      { id: 2, desc: 'Order 2' },
    ];

    (mockDb.queryCallback as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockOrders);
    });

    const orders = await dao.getAllOrders();
    expect(orders).toEqual(mockOrders);
  });

  it('should get order by id', async () => {
    const orderId = 1;
    const mockOrder = { id: orderId, desc: 'Order 1' };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null, mockOrder);
    });

    const result = await dao.getOrderById(orderId);
    expect(result).toEqual(mockOrder);
  });

  it('should update an order', async () => {
    const orderId = 1;
    const mockUpdatedOrderData = { desc: 'Updated Order' };
    const mockUpdatedOrder = { id: orderId, ...mockUpdatedOrderData };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null);
    });

    const result = await dao.updateOrder(orderId, mockUpdatedOrderData);
    expect(result).toEqual(mockUpdatedOrder);
  });

  it('should delete an order', async () => {
    const orderId = 1;
    const mockDeleteResponse = { id: orderId };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null);
    });

    const result = await dao.deleteOrder(orderId);
    expect(result).toEqual(mockDeleteResponse);
  });

  // it('should create an order', async () => {
  //   const mockOrder = { desc: 'Order 1' };
  //   const mockResult = { insertId: 1 };

  //   (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
  //     callback(null, mockResult);
  //   });

  //   const order = await dao.createOrder(mockOrder);
  //   expect(order).toEqual({ id: 1, ...mockOrder });
  // });
});
