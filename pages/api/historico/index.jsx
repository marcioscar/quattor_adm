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
      case "POST":
        const data = await db.collection("historico").updateOne(
          { aluno: aluno },
          {
            $push: {
              treinos: {
                $each: [{ treino: ultimo, data: currentDate }],
                $sort: { data: 1 },
              },
            },
          },
          { upsert: true }
        );

        res.status(200).json(data);

        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
