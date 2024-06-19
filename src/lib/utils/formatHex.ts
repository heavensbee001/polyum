export function formatHex(hexString: string) {
  // Check if the string starts with "0x", if not, add it.
  if (!hexString.startsWith("0x")) {
    hexString = "0x" + hexString;
  }

  // Parse the hexadecimal string to a number
  const number = parseInt(hexString, 16);

  return number;
}
