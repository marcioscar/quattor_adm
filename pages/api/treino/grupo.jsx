// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;
    const { grupo, semanagrupo } = req.body;
    const id = Math.random().toString(36).substr(2, 7);
    switch (method) {
      case "POST":
        const aula = await db.collection("treinos").updateOne(
          { grupo: grupo },
          [
            {
              $set: {
                grupo: grupo,
                semana: parseInt(semanagrupo),
                // exercicios: [
                //   { nome: "", Repeticoes: "", carga: "", obs: "", id: id },
                // ],
              },
            },
          ],
          { upsert: true }
        );

        res.status(200).json(aula);

        break;

      case "DELETE":
        const del = req.body;
        console.log(del);
        const auladel = await db
          .collection("treinos")
          .deleteOne({ _id: ObjectId(del) });

        res.status(200).json(auladel);

        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
