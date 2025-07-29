// benchmark.js
import { compress, decompress, analyze } from "../index.js";

async function benchmark(url) {
  const original = await fetch(url).then(r => r.json());

  const t0 = performance.now();
  const compressed = compress(original);
  const compressedJSON = JSON.stringify(compressed);
  const t1 = performance.now();

  const parsedCompressed = JSON.parse(compressedJSON);
  const decompressed = decompress(parsedCompressed);
  const t2 = performance.now();

  console.log("\n📦 Compression Benchmark:");
  console.log("Original size (KB):", (JSON.stringify(original).length / 1024).toFixed(2));
  console.log("Compressed size (KB):", (compressedJSON.length / 1024).toFixed(2));
  console.log("⏱️ Compress + stringify time:", (t1 - t0).toFixed(2), "ms");
  console.log("⏱️ Parse + decompress time:", (t2 - t1).toFixed(2), "ms");
}

// Example usage with large public dataset
benchmark('https://dummyjson.com/products?limit=100');
