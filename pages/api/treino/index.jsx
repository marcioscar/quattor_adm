// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;
    const { nome, Repeticoes, carga, obs, _id, id } = req.body;

    switch (method) {
      case "POST":
        const aula = await db.collection("treinos").updateOne(
          { _id: ObjectId(_id), "exercicios.id": id },
          {
            $set: {
              "exercicios.$.nome": nome,
              "exercicios.$.Repeticoes": Repeticoes,
              "exercicios.$.carga": carga,
              "exercicios.$.obs": obs,
            },
          }
        );

        res.status(200).json(aula);

        break;

      case "DELETE":
        const { delid, del_id } = req.body;

        const auladel = await db
          .collection("treinos")
          .updateOne(
            { _id: ObjectId(del_id) },
            { $pull: { exercicios: { id: delid } } },
            false,
            true
          );

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
