import { DataConnector, DataSourceType, ConnectorConfig, QueryResult, DataColumn } from './base';

export class DemoConnector extends DataConnector {
  type: DataSourceType = 'DEMO';

  async testConnection(config: ConnectorConfig): Promise<boolean> {
    return true;
  }

  async getSchema(config: ConnectorConfig): Promise<DataColumn[]> {
    return [
      { name: 'date', type: 'DATE' },
      { name: 'revenue', type: 'NUMBER' },
      { name: 'users', type: 'NUMBER' },
      { name: 'region', type: 'STRING' },
    ];
  }

  async executeQuery(config: ConnectorConfig, query: any): Promise<QueryResult> {
    // Generate mock data based on query
    const data = [
      { date: '2024-01-01', revenue: 1200, users: 450, region: 'North' },
      { date: '2024-01-02', revenue: 1500, users: 480, region: 'North' },
      { date: '2024-01-03', revenue: 1100, users: 420, region: 'South' },
      { date: '2024-01-04', revenue: 1800, users: 510, region: 'East' },
      { date: '2024-01-05', revenue: 2100, users: 600, region: 'West' },
    ];

    return {
      data,
      columns: await this.getSchema(config),
      rowCount: data.length,
    };
  }
}
