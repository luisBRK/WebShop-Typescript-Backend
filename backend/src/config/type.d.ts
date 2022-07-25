export type DB = {
  URI: string;
};

export interface MONGO_OPTIONS_INTERFACE {
  DB: DB;
  OPTIONS: ConnectOptions;
}
