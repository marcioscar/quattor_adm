// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;
    const { turma, classe, dias, inicio, fim, _id } = req.body;

    console.log(classe, turma, inicio, fim, dias, _id);
    switch (method) {
      case "GET":
        //buscar no mongodb
        const param = req.query;

        //const { db } = await connectToDatabase();
        const data = await db
          .collection("classes")
          .find()
          .sort({ start: 1 })
          .toArray();

        res.status(200).json(data);

        break;

      case "POST":
        const aula = await db.collection("classes").updateOne(
          { _id: ObjectId(_id) },
          [
            {
              $set: {
                start: inicio,
                turma: turma,
                classe: classe,
                finish: fim,
                days: dias.map((e) => +e),
              },
            },
          ],

          { upsert: true }
        );

        res.status(200).json(aula);

        //res.redirect([200], "/");
        // res.redirect();

        break;

      case "DELETE":
        const del = req.body;
        console.log(del);
        const auladel = await db
          .collection("classes")
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
