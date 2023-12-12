
export function shortAddr(addr) {
  return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}