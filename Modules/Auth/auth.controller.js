import { Router } from "express";
import * as authService from "./auth.service.js";
import { Collection } from "mongodb";

const authController = Router();

authController.post("/collection/books", async (req, res) => {
  try {
    const { title } = req.body;

    const result = await authService.insertTitle({ title });

    res.status(201).json({
      message: "Title inserted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/collection/authors", async (req, res) => {
  try {
    const { name, nationality } = req.body;

    const result = await authService.insertAuthor({ name, nationality });

    res.status(201).json({
      message: "Author inserted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/collection/logs/capped", async (req, res) => {
  try {
    const { name, options } = req.body;

    const result = await authService.createCappedCollection({ name, options });

    res.status(201).json({ ok: 1 });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/collection/books/index", async (req, res) => {
  try {
    const { indexName } = req.body;

    const result = await authService.createIndex({ indexName });

    res.status(201).json(req.body.indexName);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/books", async (req, res) => {
  try {
    const { title, author, year, genres } = req.body;

    const result = await authService.insertOneBook({
      title,
      author,
      year,
      genres,
    });

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/books/batch", async (req, res) => {
  try {
    if (req.body.length < 3) {
      res.status(401).json({ message: "Please enter at least 3 records." });
    } else {
      const result = await authService.insertManyBooks(req.body);

      res.status(201).json({
        result,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/logs", async (req, res) => {
  try {
    const { book_id, action } = req.body;

    const result = await authService.insertLog({
      book_id,
      action,
    });

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.patch("/books/Future", async (req, res) => {
  try {
    const { year } = req.body;

    const result = await authService.updateBook({ year });

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/title", async (req, res) => {
  try {
    const { title } = req.query;

    const result = await authService.findBook(title);

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/year", async (req, res) => {
  try {
    const result = await authService.findBookBetCurrentTime(req.query);

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/genre", async (req, res) => {
  try {
    const result = await authService.findCurrentBook(req.query);

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/skip-limit", async (req, res) => {
  try {
    const result = await authService.limitAndSkip();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/year-integer", async (req, res) => {
  try {
    const result = await authService.findIntYears();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/exclude-genres", async (req, res) => {
  try {
    const result = await authService.findExpectHorrorORScienceFiction();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.delete("/books/before-year", async (req, res) => {
  try {
    const result = await authService.deleteBooksBefore2000(req.query);

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
authController.get("/books/aggregate1", async (req, res) => {
  try {
    const result = await authService.filterThenSort();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/aggregate2", async (req, res) => {
  try {
    const result = await authService.filterThenShow();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/aggregate3", async (req, res) => {
  try {
    const result = await authService.breakArray();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.get("/books/aggregate4", async (req, res) => {
  try {
    const result = await authService.joinCollections();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


export default authController;
