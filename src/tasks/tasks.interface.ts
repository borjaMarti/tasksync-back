// Borja: We are creating this enum here because SQLite doesn't support enums, so we couldn't add it to the schema. Otherwise, it would be a part of that.
export enum Priority {
  Completed = 'completed',
  Backlog = 'backlog',
  Important = 'important',
}
