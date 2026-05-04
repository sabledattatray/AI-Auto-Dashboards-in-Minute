export type DataSourceType = 'POSTGRESQL' | 'MYSQL' | 'CSV_FILE' | 'SUPABASE' | 'DEMO';

export interface ConnectorConfig {
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  url?: string;
  fileUrl?: string;
}

export interface DataColumn {
  name: string;
  type: 'STRING' | 'NUMBER' | 'DATE' | 'BOOLEAN';
}

export interface QueryResult {
  data: any[];
  columns: DataColumn[];
  rowCount: number;
}

export abstract class DataConnector {
  abstract type: DataSourceType;
  abstract testConnection(config: ConnectorConfig): Promise<boolean>;
  abstract getSchema(config: ConnectorConfig): Promise<DataColumn[]>;
  abstract executeQuery(config: ConnectorConfig, query: any): Promise<QueryResult>;
}
