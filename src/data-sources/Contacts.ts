import { MongoClient } from 'mongodb';

export default class ContactsDataSource {
    dbConnection: MongoClient;

    constructor(dbConnection: MongoClient) {
        this.dbConnection = dbConnection;
    }

    async getContactByName(name: string) {
        return await this.dbConnection.db('graphql_demo').collection('contacts').findOne({ name });
    }

    async getContactByNumber(number: string) {
        return await this.dbConnection.db('graphql_demo').collection('contacts').findOne({ number });
    }

    async getContacts() {
        return await this.dbConnection.db('graphql_demo').collection('contacts').find({}).toArray();
    }

    async getContactsByName(name: string) {
        return await this.dbConnection.db('graphql_demo').collection('contacts').find({ name: { $regex: name, $options: "i" } }).toArray();
    }

    async getContactsByNumber(number: string) {
        return await this.dbConnection.db('graphql_demo').collection('contacts').find({ number: { $regex: number, $options: "i" } }).toArray();
    }

    async createContact({ name, number }: { name: string, number: string }) {
        await this.dbConnection.db('graphql_demo').collection('contacts').insertOne({ name, number })
        return await this.dbConnection.db('graphql_demo').collection('contacts').findOne({ name, number });
    }

    async deleteContact({ name, number }: { name?: string, number?: string }) {
        if (name) {
            return (await this.dbConnection.db('graphql_demo').collection('contacts').deleteOne({ name })).acknowledged
        } else if (number) {
            return (await this.dbConnection.db('graphql_demo').collection('contacts').deleteOne({ number })).acknowledged
        }
    }

}