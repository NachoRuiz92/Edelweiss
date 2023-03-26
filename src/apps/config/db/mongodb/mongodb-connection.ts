export interface MongoConnection {
    connectToDb(): Promise<void>
}