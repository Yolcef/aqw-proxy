/**
 * Process events
 * @enum
 */
const PROCESS_EVENTS = {
  SERVER_ADD: 0,
  PLAYER_JOINED: 1,
  PLAYER_LEFT: 2,
  UPDATE_SERVER: 3,
};

/**
 * Event types
 * @enum
 */
const EVENTS = {
  NEW_CONNECTION: 'connection',
  CONNECTION_REMOVED: 'disconnect',
};

/**
 * Connection state
 * @enum
 */
const CONNECTION_STATE = {
  IDLE: 0,
  CONNECTED: 1,
  DISCONNECTED: 2,
};

/**
 * Network protocol type
 * @enum
 */
const PROTOCOL_TYPE = {
  AQW: 'aqw',
  AQ3D: 'aq3d',
  ANY: 'any',
};

/**
 * AdventureQuest 3D packet types
 * @enum
 */
const ADVENTUREQUEST_3D_PACKETS = {
  NULL: 0,
  MOVE: 1,
  NPCMOVE: 2,
  LOGIN: 3,
  CHAT: 4,
  JOIN_MY_CHANNEL: 5,
  CHANNEL: 6,
  AREA: 7,
  CELL: 8,
  COMMAND: 9,
  ITEM: 10,
  TRADE: 11,
  COMBAT: 12,
  NPC_TEMPLATES: 13,
  SPELL_TEMPLATES: 14,
  QUEST: 15,
  LOOT: 16,
  ENTITY: 17,
  NPC: 18,
  MACHINE: 19,
  PVP_FLAG: 20,
  EMOTE: 21,
  DEBUG: 22,
  REPORT: 23,
  SYNC_IGNORE: 24,
  MESSAGE: 25,
  COMBAT_CLASSES: 26,
  MISC: 27,
  MERGE: 28,
  FRIEND: 29,
  DISCONNECT: 30,
  PARTY: 31,
  BANK: 32,
  END_TRANSFER: 33,
};

/**
 * AdventureQuest Worlds packet types
 * @enum
 */
const ADVENTUREQUEST_WORLDS_PACKETS = {
  LOGIN: 'login',
  MESSAGE: 'message',
  MOVE_TO_AREA: 'moveToArea',
  UOTLS: 'uotls',
  EXIT_AREA: 'exitArea',
  LOGIN_RESPONSE: 'loginResponse',
  CHAT: 'chatm',
};

module.exports = { PROCESS_EVENTS, CONNECTION_STATE, PROTOCOL_TYPE, ADVENTUREQUEST_3D_PACKETS,
  ADVENTUREQUEST_WORLDS_PACKETS, EVENTS };
