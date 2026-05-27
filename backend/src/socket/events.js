// Socket Event Names

// User events
export const USER_EVENTS = {
  JOINED: 'user:joined',
  LEFT: 'user:left',
  TYPING: 'user:typing',
  TYPING_STOP: 'user:typing-stop',
};

// Task events
export const TASK_EVENTS = {
  CREATED: 'task:created',
  UPDATED: 'task:updated',
  DELETED: 'task:deleted',
  STATUS_CHANGED: 'task:status-changed',
  ASSIGNED: 'task:assigned',
  COMMENT_ADDED: 'task:comment-added',
  JOIN: 'task:join',
  LEAVE: 'task:leave',
};

// Activity events
export const ACTIVITY_EVENTS = {
  LOGGED: 'activity:logged',
};

// System events
export const SYSTEM_EVENTS = {
  ERROR: 'system:error',
  NOTIFICATION: 'system:notification',
};