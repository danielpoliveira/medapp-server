import { Request, Response } from "express";
import { WhereOptions, Op } from "sequelize";

import moment from 'moment';
moment.locale('pt-br');

import Agendamento from "../models/Agendamento";
import Medic from "../models/Medic";
import Patient from "../models/Patient";

export default {

  //GET agendamentos -> all dates
  //GET agendamento  -> filtered date and id
  async index(req: Request, res: Response) {
    const { data, id } = req.query;
    const where: WhereOptions = {};

    if (data) {
      const startDate = new Date(`${data}`);
      const endDate = new Date(startDate.getTime() + 86400000);

      where.datetime = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      }
    }

    if (id)
      where.id = id;

    const agendamento = await Agendamento.findAll({
      where,
      include: [Medic, Patient],
      order: [
        ['datetime', 'DESC'],
      ]
    });

    return res.json(agendamento);
  },

  //POST agendamento -> [datetime, paciente, medico] required
  async create(req: Request, res: Response) {
    const { datetime, paciente, medico } = req.body;

    if (!datetime || !paciente || !medico) {
      return res.status(400).send({
        errors: 'data, status, id_paciente ou id_medico Empty',
      });
    }

    const startDate = new Date(moment(datetime).format('YYYY-MM-DD'));
    const endDate = new Date(startDate.getTime() + 86400000);

    const checkAgendamento = await Agendamento.findOne({
      where: {
        datetime: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },

        fk_id_paciente: paciente,
      }
    });

    if (checkAgendamento) {
      return res.status(400).send({
        errors: 'Você já possui um agendamento nessa data informada',
      });
    }

    const agendamento = await Agendamento.create({
      datetime,
      fk_id_paciente: paciente,
      fk_id_medico: medico,
    });

    return res.json(agendamento);
  },

  //PUT agendamento -> [id] required
  async update(req: Request, res: Response) {
    const { id, datetime, status, medic } = req.body;

    if (!id) {
      return res.status(400).send({ errors: 'id empty' });
    }

    const options: any = {};

    if (datetime) {
      options.datetime = datetime;
    }

    if (status) {
      options.status = status;
    }

    if (medic) {
      options.fk_id_medico = medic;
    }

    const agendamento = await Agendamento.update(options, { where: { id } });

    return res.json(agendamento);
  },

  //DELETE agendamento -> [id] required
  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ errors: 'id empty' });
    }

    await Agendamento.destroy({
      where: {
        id,
      }
    });

    return res.json({ status: 'ok' });
  }
}