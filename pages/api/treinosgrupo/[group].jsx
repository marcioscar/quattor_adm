// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";

function getNumberOfWeek() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const handler = async (req, res) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        //buscar no mongodb
        const param = req.query;

        const { db } = await connectToDatabase();
        const data = await db
          .collection("treinos")
          .find({
            //$and: [{ grupo: param.group }, { semana: getNumberOfWeek() }],
            $and: [{ grupo: param.group }, { semana: parseInt(param.semana) }],
          })
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
