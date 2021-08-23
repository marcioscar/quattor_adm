// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
const currentDate = new Date();
const handler = async (req, res) => {
  try {
    const { method } = req;
    const { db } = await connectToDatabase();
    const { aluno, ultimo } = req.body;
    switch (method) {
      case "GET":
        const param = req.query;
        const datah = await db
          .collection("historico")
          .find({ aluno: parseInt(param.aluno) })
          .toArray();

        res.status(200).json(datah);
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
