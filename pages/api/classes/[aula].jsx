// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
const currentDate = new Date();

const handler = async (req, res) => {
  const {
    query: { aula },
  } = req;
  try {
    const { method } = req;
    const { db } = await connectToDatabase();
    console.log(aula);
    switch (method) {
      case "GET":
        const param = req.query;
        const data = await db
          .collection("classes")
          .find({ _id: ObjectId(aula) })
          //   .find({ aluno: parseInt(param.aluno) })
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
