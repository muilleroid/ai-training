/**
 * E2E test for Fake Store API products endpoint
 * Using Bun's built-in test runner
 */

const TEST_URL = 'https://fakestoreapi.com/products';

describe('Fake Store API Products', () => {
  const invalidProducts = [];
  let products = [];
  let response;

  beforeAll(async () => {
    response = await fetch(TEST_URL);
    products = await response.json();
  });

  test('Response status code should be 200', () => {
    expect(response.status).toBe(200);
  });

  test('Each product should have valid attributes', () => {
    // Process each product for validation
    products.forEach(product => {
      const validationErrors = [];

      // Title validation (not empty)
      if (!product.title || product.title.trim() === '') {
        validationErrors.push('title is empty');
      }

      // Price validation (positive number)
      if (typeof product.price !== 'number' || product.price <= 0) {
        validationErrors.push('price is not a positive number');
      }

      // Rating.rate validation (number, less than 5)
      if (!product.rating ||
          typeof product.rating.rate !== 'number' ||
          product.rating.rate >= 5) {
        validationErrors.push('rating.rate is not a number less than 5');
      }

      // If any validation errors, add to invalid products list
      if (validationErrors.length > 0) {
        invalidProducts.push({
          id: product.id,
          errors: validationErrors
        });
      }
    });

    // Output invalid products if any
    if (invalidProducts.length > 0) {
      console.error('Invalid products found:');
      console.table(invalidProducts);
    }

    // Test should fail if count of invalid products is greater than 0
    expect(invalidProducts.length).toBe(0);
  });
});
