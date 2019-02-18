/**
 * Encodes and decodes incoming packets
 * @param {Buffer|string} packet Packet to encode/decode
 * @returns {string}
 */
module.exports = packet => {
  if (typeof packet === 'string') packet = Buffer.from(packet, 'binary');
  const array = Buffer.from([250, 158, 179]);

  for (let i = 0; i < packet.length; i++) {
    if (packet[i] !== array[i % array.length]) {
      packet[i] ^= array[i % array.length];
    }
  }
  return packet;
};
