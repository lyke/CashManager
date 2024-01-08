import { ProductsDao } from '../dao/products.dao';
import { DatabaseServiceInterface, DatabaseError } from '../dao/database/databaseServiceInterface';

describe('ProductsDao', () => {
  let dao: ProductsDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      queryCallback: jest.fn(),
      queryCallbackValues: jest.fn(),
    };
    dao = new ProductsDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 20.99, category: 'Category 1', image: 'image1.jpg', description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 30.99, category: 'Category 2', image: 'image2.jpg', description: 'Description 2' },
    ];

    (mockDb.queryCallback as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockProducts);
    });

    const products = await dao.getAllProducts();
    expect(products).toEqual(mockProducts);
  });

  it('should get product by id', async () => {
    const productId = 1;
    const mockProduct = { id: productId, name: 'Product 1', price: 20.99, category: 'Category 1', image: 'image1.jpg', description: 'Description 1' };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null, mockProduct);
    });

    const result = await dao.getProductById(productId);
    expect(result).toEqual(mockProduct);
  });

  // it('should update a product', async () => {
  //   const productId = 1;
  //   const mockUpdatedProductData = { name: 'Updated Product', price: 25.99, category: 'Updated Category' };
  //   const mockUpdatedProduct = { id: productId, ...mockUpdatedProductData };

  //   (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
  //     callback(null);
  //   });

  //   const result = await dao.updateProduct(productId, mockUpdatedProductData);
  //   expect(result).toEqual(mockUpdatedProduct);
  // });

  it('should delete a product', async () => {
    const productId = 1;
    const mockDeleteResponse = { id: productId };

    (mockDb.queryCallbackValues as jest.Mock).mockImplementation((query, values, callback) => {
      callback(null);
    });

    const result = await dao.deleteProduct(productId);
    expect(result).toEqual(mockDeleteResponse);
  });

  // it('should create a product', async () => {
  //   const mockProduct = { name: 'Product 1', price: 20.99, category: 'Category 1', image: 'image1.jpg', description: 'Description 1' };
  //   const mockResult = { insertId: 1 };

  //   (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
  //     callback(null, mockResult);
  //   });

  //   const product = await dao.createProduct(mockProduct);
  //   expect(product).toEqual({ id: 1, ...mockProduct });
  // });
});
