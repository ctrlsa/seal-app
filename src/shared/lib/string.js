
/** Return wallet short address (display only!) */
export function shortAddr(addr) {
  return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}

/**
 * Capitalize first letter
 *
 * @param string
 * @returns String
 */
export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

/**
 * Trim character
 *
 * @param str
 * @param ch
 * @returns {Promise<String>}
 */
export function trimChar(str, ch) {
  let start = 0,
    end = str.length;

  while(start < end && str[start] === ch)
    ++start;

  while(end > start && str[end - 1] === ch)
    --end;

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}