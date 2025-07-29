// json-mini/index.js

export function compress(obj) {
  const keyToShort = {};
  const shortToKey = {};
  const valToShort = {};
  const shortToVal = {};
  let counter = 1;
  let vcount = 1;

  const valueCount = {};

  // First pass to count value occurrences
  function countValues(value) {
    if (Array.isArray(value)) {
      value.forEach(countValues);
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(([_, v]) => countValues(v));
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      valueCount[value] = (valueCount[value] || 0) + 1;
    }
  }

  countValues(obj);

  function getShortKey(key) {
    if (!keyToShort[key]) {
      const shortKey = `k${counter++}`;
      keyToShort[key] = shortKey;
      shortToKey[shortKey] = key;
    }
    return keyToShort[key];
  }

  function getShortVal(val) {
    const isCompressible = typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
    if (!isCompressible) return val;

    if (valueCount[val] > 1) {
      if (!valToShort[val]) {
        const shortVal = `v${vcount++}`;
        valToShort[val] = shortVal;
        shortToVal[shortVal] = val;
      }
      return valToShort[val];
    }

    return val;
  }

  function _compress(value) {
    if (Array.isArray(value)) {
      return value.map(_compress);
    }
    if (value && typeof value === 'object') {
      const newObj = {};
      for (const [key, val] of Object.entries(value)) {
        const shortKey = getShortKey(key);
        newObj[shortKey] = _compress(val);
      }
      return newObj;
    }
    return getShortVal(value);
  }

  const compressed = {
    _map: shortToKey,
    _data: _compress(obj)
  };

  if (Object.keys(shortToVal).length > 0) {
    compressed._valmap = shortToVal;
  }

  return compressed;
}

export function decompress(compressed) {
  const keyMap = compressed._map;
  const valMap = compressed._valmap || {};

  function _decompress(value) {
    if (Array.isArray(value)) {
      return value.map(_decompress);
    }
    if (value && typeof value === 'object') {
      const newObj = {};
      for (const [key, val] of Object.entries(value)) {
        const originalKey = keyMap[key];
        newObj[originalKey] = _decompress(val);
      }
      return newObj;
    }
    return valMap[value] ?? value;
  }

  return _decompress(compressed._data);
}

export function analyze(original, unit = 'kb') {
  const compressed = compress(original);
  const originalSize = Buffer.byteLength(JSON.stringify(original), 'utf8');
  const compressedSize = Buffer.byteLength(JSON.stringify(compressed), 'utf8');
  const reductionPercent = originalSize === 0
    ? 0
    : ((originalSize - compressedSize) / originalSize) * 100;

  function formatSize(size) {
    switch (unit.toLowerCase()) {
      case 'kb': return (size / 1024).toFixed(2) + ' KB';
      case 'mb': return (size / (1024 * 1024)).toFixed(4) + ' MB';
      default: return size + ' bytes';
    }
  }

  return {
    originalSize: formatSize(originalSize),
    compressedSize: formatSize(compressedSize),
    reductionPercent: Math.round(reductionPercent * 100) / 100
  };
}
