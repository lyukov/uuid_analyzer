// uuid-local.js
// Генерация UUID v1, v4, v7 без библиотек

// Генерация v4 (random)
export function uuidv4() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const arr = crypto.getRandomValues(new Uint8Array(16));
    arr[6] = (arr[6] & 0x0f) | 0x40;
    arr[8] = (arr[8] & 0x3f) | 0x80;
    return [...arr].map(b => b.toString(16).padStart(2,'0'))
      .join('')
      .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }
  
  // Генерация v1 (timestamp + random node)
  export function uuidv1() {
    const now = BigInt(Date.now());
    const UUID_EPOCH = 12219292800000n;
    const timestamp = (now + UUID_EPOCH) * 10000n;
  
    const timeLow = Number(timestamp & 0xffffffffn).toString(16).padStart(8,'0');
    const timeMid = Number((timestamp >> 32n) & 0xffffn).toString(16).padStart(4,'0');
    let timeHi = Number((timestamp >> 48n) & 0x0fffn).toString(16).padStart(4,'0');
    timeHi = (parseInt(timeHi,16) | 0x1000).toString(16).padStart(4,'0');
  
    const clockSeq = crypto.getRandomValues(new Uint16Array(1))[0] & 0x3fff;
    const clockSeqHi = ((clockSeq >> 8) | 0x80).toString(16).padStart(2,'0');
    const clockSeqLow = (clockSeq & 0xff).toString(16).padStart(2,'0');
  
    const nodeArr = crypto.getRandomValues(new Uint8Array(6));
    const node = [...nodeArr].map(b=>b.toString(16).padStart(2,'0')).join('');
  
    return `${timeLow}-${timeMid}-${timeHi}-${clockSeqHi}${clockSeqLow}-${node}`;
  }
  
  // Генерация v7 (timestamp + random bits)
  export function uuidv7() {
    const ms = Date.now();
    const msHex = ms.toString(16).padStart(12,'0');
    const rand = crypto.getRandomValues(new Uint8Array(10));
    const randHex = [...rand].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,20);
    return `${msHex.substring(0,8)}-${msHex.substring(8,12)}-7${randHex.substring(0,3)}-a${randHex.substring(3,6)}-${randHex.substring(6)}`;
  }
  