import express from "express";

const router = express.Router();

router
  .route("/:userId")
  .get(async (req, res) => {
    res.send(req.params.userId);
  })
  .delete(async (req, res) => {
    res.send(req.params.userId);
  });

router
  .route("/")
  .post(async (req, res) => {
    res.json(req.body);
  })
  .patch(async (req, res) => {
    res.json(req.body);
  })
  .delete(async (req, res) => {
    res.json(req.body);
  });

export default router;
