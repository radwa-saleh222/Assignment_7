import {MongoClient} from 'mongodb';
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const url = 'mongodb+srv://radwasaleh2023_db_user:A6OR3IbhzpghDs0U@cluster0.rb0dwd5.mongodb.net/';
const client = new MongoClient(url);
export const db = client.db('Assignment_7');

export const database_connect = async () =>{ 
    try {
        await client.connect();
        console.log('Database connected');
    } catch (error) {
        console.log('DB connection error', error);    
    }
}