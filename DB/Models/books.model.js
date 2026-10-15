import { db } from "../db.connection.js";

await db.createCollection("books", {
  validator: {
    $expr: {
      $and: [
        { $eq: [{ $type: "$title" }, "string"] },
        { $ne: [{ $strLenCP: "$title" }, 0] }
      ]
    }
  }
});

const booksModel = db.collection("books");

export default booksModel;