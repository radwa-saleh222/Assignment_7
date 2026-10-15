import { db } from "../db.connection.js";

const logsModel = db.collection("logs");

export default logsModel;