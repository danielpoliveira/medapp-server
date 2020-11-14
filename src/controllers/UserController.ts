import { Request, Response } from "express";
import { Op } from "sequelize";
import { WhereOptions } from "sequelize";
import Agendamento from "../models/Agendamento";
import Medic from "../models/Medic";
import Patient from "../models/Patient";

export default {
  async index(req: Request, res: Response) {
    const { data, id } = req.query;

    const where: WhereOptions = {};

    if (data) {
      const startDate = new Date(`${data}`);
      const endDate   = new Date(startDate.getTime() + 86400000);

      where.datetime = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      }
    }

    if(id) 
      where.id = id;

    const agendamento = await Agendamento.findAll({
      where,
      include: [Medic, Patient],
      order: [
        ['datetime', 'DESC'],
      ]
    });

    console.log(agendamento)

    return res.json(agendamento);
  }
}