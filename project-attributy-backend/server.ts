import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();

const prisma = new PrismaClient();
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/comments", async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.send(comments);
});

app.post("/comments", async (req, res) => {
  try{
  const { missionId, message, name } = req.body;
  const newComment = await prisma.comment.create({
    data: {
        name,
      message,
      missionId: Number(missionId),
    },
  });
  res.send(newComment);
} catch (error) {
  //@ts-ignore
  res.status(400).send({ error: error.message })
}
});

app.delete("/comments/:id", async (req, res) => {
  const id = Number(req.params.id);
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  res.send(comment);
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
