import booksModel from "../../DB/Models/books.model.js";
import authorsModel from "../../DB/Models/authors.model.js";
import logsModel from "../../DB/Models/logs.model.js";
import { db } from "../../DB/db.connection.js";

export const insertTitle = async (body) => {
  const { title } = body;

  return booksModel.insertOne({ title });
};

export const insertAuthor = async (body) => {
  const { name, nationality } = body;

  return authorsModel.insertOne({ name, nationality });
};

export const createCappedCollection = async (body) => {
  const isCap = body.options.capped;
  const collSize = body.options.size * 1024 * 1024;

  return db.createCollection(body.name, { capped: isCap, size: collSize });
};

export const createIndex = async (body) => {
  return db.createIndex("books", { title: 1 }, { name: body.indexName });
};

export const insertOneBook = async (body) => {
  const { title, author, year, genres } = body;

  return booksModel.insertOne({ title, author, year, genres });
};

export const insertManyBooks = async (body) => {
  return booksModel.insertMany(body);
};

export const insertLog = async (body) => {
  const { book_id, action } = body;

  return logsModel.insertOne({ book_id, action });
};

export const updateBook = async (body) => {
  const { year } = body;

  return booksModel.updateOne({ title: "Future" }, { $set: { year: year } });
};

export const findBook = async (title) => {
  return booksModel.findOne({ title });
};

export const findBookBetCurrentTime = async (query) => {
  return booksModel
    .find({ year: { $gt: +query.from, $lt: +query.to } })
    .toArray();
};

export const findCurrentBook = async (query) => {
  return booksModel.find({ genres: { $in: [query.genre] } }).toArray();
};

export const limitAndSkip = async () => {
  return booksModel.find().skip(2).limit(3).sort({ $natural: -1 }).toArray();
};

export const findIntYears = async () => {
  return booksModel.find({ year: { $type: "int" } }).toArray();
};

export const findExpectHorrorORScienceFiction = async () => {
  return booksModel
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();
};

export const deleteBooksBefore2000 = async (query) => {
  return booksModel.deleteMany({ year: { $lt: +query.year } });
};

export const filterThenSort = async () => {
  return booksModel
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { totalPrices: -1 } },
    ])
    .toArray();
};

export const filterThenShow = async () => {
  return booksModel
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();
};

export const breakArray = async () => {
  return booksModel
    .aggregate([
      {
        $unwind: "$genres",
      },
      {
        $project: {
          _id: 0,
          title: 1,
          genres: 1,
        },
      },
    ])
    .toArray();
};

export const joinCollections = async () => {
  return logsModel
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          book_details: {
            title: 1,
            author: 1,
            year: 1,
          },
        },
      },
    ])
    .toArray();
};
