import { compress, decompress, analyze } from "../index.js";

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
}



const compressed = compress(bigData)
const restored = decompress(compressed)
const stats = analyze(bigData)

console.log('📦 Compressed JSON:')
console.log(JSON.stringify(compressed, null, 2))

console.log('\n🔄 Decompressed (restored) JSON:')
console.log(JSON.stringify(restored, null, 2))

console.log('\n📊 Compression Stats:')
console.log(stats)
