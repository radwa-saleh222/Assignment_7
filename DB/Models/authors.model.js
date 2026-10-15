import { db } from "../db.connection.js";

const authorsModel = db.collection("authors");

export default authorsModel;