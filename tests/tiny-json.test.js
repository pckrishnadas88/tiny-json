// test-tiny-json.js
import assert from 'assert';
import { compress, decompress, analyze } from '../index.js';

const bigData = {
  currentPage: 1,
  totalPages: 5,
  pageSize: 20,
  totalCount: 100,
  records: Array.from({ length: 436 }, (_, i) => ({
    userId: i,
    userName: "john_doe",
    userEmail: "john@example.com",
    userRole: "admin",
    userStatus: "active",
    address: {
      city: "New York",
      zip: "10001",
      country: "USA"
    },
    contact: {
      phone: "+1-555-1234567",
      alternate: "+1-555-0000000"
    }
  }))
};

// Test: compress should not throw
const compressedForTest = compress(bigData);
assert.ok(compressedForTest._map, 'Compressed output should contain a _map');

// Test: decompress should return original data
const restoredForTest = decompress(compressedForTest);
assert.deepStrictEqual(restoredForTest, bigData, 'Decompressed data should match original');

// Test: analyze should return size stats
const statsForTest = analyze(bigData, 'kb');
assert.ok(statsForTest.originalSize.includes('KB'), 'Should include size unit');
assert.ok(statsForTest.reductionPercent >= 0, 'Reduction percent should be a number');

console.log('✅ All tiny-json tests passed!');

