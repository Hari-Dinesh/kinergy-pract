export interface IDbClient {
    connect(connectionString: string, dbName: string, runSeeder: boolean, model_path?: string): any;
    getModel(tableName: string): any;
}
