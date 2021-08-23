// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";

const handler = async (req, res) => {
  const {
    query: { id },
  } = req;
  const param = req.query;
  try {
    const { method } = req;
    const nome = "Supino Reto";
    const { db } = await connectToDatabase();

    console.log(nome);

    switch (method) {
      case "GET":
        const data = await db
          .collection("treinos")
          .find({ _id: ObjectId(id) })
          //   .find({ "exercicios.nome": "Supino Reto" })
          .toArray();

        res.status(200).json(data);
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
