# 📦 tiny-json

**Lightweight JSON compressor** with reversible key/value renaming, built for API response optimization and payload shrinking.

---

## 🚀 Why tiny-json?

Most JSON payloads in APIs repeat the same keys and values over and over. `tiny-json` compresses that structure by:

* Renaming long keys to short ones
* Replacing repeated values with short tokens
* Preserving full reversibility (no schema needed)
* Providing size savings even before GZIP

---

## ⚠️ When NOT to Use

This library is not suitable for:

* Very small JSON (less than 1KB)
* Highly unique or non-repetitive data
* Cases where every byte must be fully human-readable

For those, GZIP alone is better.

---

## ✅ Best Use Cases

* API responses with repeated records or nested lists
* Reversible frontend-backend JSON sync
* Paginated lists with uniform object structures
* Storing JSON in limited-space environments

---

## ✨ Features

* 🔁 Replaces long keys with short tokens
* 🔄 Optional repeated value deduplication
* 📉 `analyze()` gives original vs compressed size
* 🔬 Deep nested JSON support
* 📦 `benchmark.js` for real-world API testing
* 🧩 **Zero external dependencies** – works anywhere, fast and lightweight

---

## ☁️ Cloud Bandwidth Cost Savings with `tiny-json`

### 📦 Assumptions

- You serve **10 million API requests** monthly
- Each raw JSON response is **100 KB**
- Bandwidth usage = **1 TB/month**

| Provider              | Avg Egress Cost / GB | Monthly Cost (1 TB) | With `tiny-json` (50% less) | Savings/Month |
|-----------------------|-----------------------|----------------------|------------------------------|----------------|
| **Cloudflare**        | **$0.00–$0.09**       | ~$0–$90              | ~$0–$45                      | **Up to $45**  |
| **AWS CloudFront**    | $0.085                | ~$85                 | ~$42.5                       | **$42.5**      |
| **Google Cloud CDN**  | $0.08–$0.12           | ~$80–$120            | ~$40–$60                     | **$40–$60**    |
| **Azure CDN**         | $0.087                | ~$87                 | ~$43.5                       | **$43.5**      |

> 💡 These are just for **1 TB/month**. At scale (10 TB+), savings scale to **$400–$1,000+ per month**.

---

### ✅ Summary

- `tiny-json` helps reduce **egress traffic costs** by compressing repetitive JSON structures.
- Also minimizes **CDN cache space** for better hit rates and faster delivery.
- Ideal for high-traffic systems: **mobile APIs, GraphQL, SaaS, IoT**, and **data-intensive dashboards**.


## 📦 Install

```bash
npm i @krishnadaspc/tiny-json
```

---

## 🔧 Usage

```js
import { compress, decompress, analyze } from 'tiny-json';

const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Alice', role: 'admin' },
    { id: 3, name: 'Alice', role: 'admin' }
  ]
};

const compressed = compress(data);
const restored = decompress(compressed);
const stats = analyze(data, 'kb');

console.log(stats);
```

---

## 📊 Output Example

```json
{
  "originalSize": "3.39 KB",
  "compressedSize": "2.50 KB",
  "reductionPercent": 26.34
}
```

---

## 🧪 Benchmarking in Browser

Use `benchmark.js` to test performance in real API scenarios:

```js
// benchmark.js
benchmark('https://jsonplaceholder.typicode.com/posts');
```

---

## 🆚 Compression Comparison

| Method              | Typical Size Reduction | Notes                                   |
|---------------------|-------------------------|----------------------------------------|
| `tiny-json`         | 40–50%                  | Best for repetitive keys/values        |
| GZIP (HTTP)         | 50–75%                  | Standard byte-level compression        |
| `tiny-json` + GZIP  | 65–85%                  | ✅ Best results when combined          |

Example: A 100KB JSON payload may reduce to:

| Stage                 | Final Size  |
|-----------------------|-------------|
| Raw JSON              | 100 KB      |
| With `tiny-json`      | 54–60 KB    |
| With GZIP only        | 30–45 KB    |
| With both             | 15–25 KB    |


---

## 🛠 API

### `compress(data: object): object`

Compresses JSON by renaming keys and repeated values.

### `decompress(compressed: object): object`

Reverses the transformation and restores original data.

### `analyze(data: object, unit?: 'bytes' | 'kb' | 'mb'): object`

Returns compression stats.
