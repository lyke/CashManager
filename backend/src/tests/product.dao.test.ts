import { ProductsDao } from '../dao/products.dao'
import { DatabaseServiceInterface } from '../dao/database/databaseServiceInterface'

describe('ProductsDao', () => {
  let dao: ProductsDao;
  let mockDb: Partial<DatabaseServiceInterface>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
    };
    dao = new ProductsDao();
    (dao as any).db = mockDb as DatabaseServiceInterface;
  });

  it('should get all products', async () => {
    const mockProducts = [{
      id: 1,
      name: 'Product 1',
      price: 100,
      category: 'Category 1',
      image: 'Image URL',
      description: 'Product Description'
    }, {
      id: 2,
      name: 'Product 2',
      price: 100,
      category: 'Category 2',
      image: 'Image URL',
      description: 'Product Description'
    }];

    (mockDb.query as jest.Mock).mockImplementation((query, callback) => {
      callback(null, mockProducts);
    });

    const products = await dao.getAllProducts();
    expect(products).toEqual(mockProducts);
  });

  it('should get product by id', async () => {
    const mockProduct = {
      id: 3,
      name: 'Product 3',
      price: 100,
      category: 'Category 3',
      image: 'Image URL',
      description: 'Product Description'
    };

    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, [mockProduct]);
    });

    const product = await dao.getProductById(1);
    expect(product).toEqual(mockProduct);
  });

  it('should create a product', async () => {
    const mockProduct = {
      id: 4,
      name: 'Product 4',
      price: 100,
      category: 'Category 4',
      image: 'Image URL',
      description: 'Product Description'
    };
    const mockResult = { insertId: 1 };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const product = await dao.createProduct(mockProduct);
    expect(product).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const mockProduct = {
      id: 5,
      name: 'Updated Product',
      price: 100,
      category: 'Category 5',
      image: 'Image URL',
      description: 'Product Description'
    };
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const product = await dao.updateProduct(1, mockProduct);
    expect(product).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    (mockDb.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const response = await dao.deleteProduct(1);
    expect(response).toEqual({ id: 1 });
  });

});
