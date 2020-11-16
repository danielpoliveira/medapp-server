import { Request, Response } from "express";
import { WhereOptions, Op } from "sequelize";

import moment from 'moment';

import Agendamento from "../models/Agendamento";
import Medic from "../models/Medic";
import Patient from "../models/Patient";

moment.locale('pt-br');

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
      ],
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

    console.log(id);


    if (!id) {
      return res.status(400).send({ errors: 'id empty' });
    }

    await Agendamento.destroy({
      where: {
        id,
      }
    });

    return res.json({ status: 'ok' });
  },

  //GET pacientes -> all pacientes
  //GET paciente  -> filtered nome and id
  async getPatients(req: Request, res: Response) {
    const { id, nome } = req.query;
    const where: WhereOptions = {};

    if (id) {
      where.id = id;
    }

    if (nome) {
      where.nome = {
        [Op.iLike]: '%' + nome + '%',
      }
    }

    const pacientes = await Patient.findAll({
      where,
    });

    return res.json(pacientes);
  },

  //POST paciente  -> [nome, cpf, rg, naturalidade, estado_civil, celular] required
  async addPatient(req: Request, res: Response) {
    const {
      nome,
      sexo,
      cpf,
      data_nascimento,
      rg,
      naturalidade,
      estado_civil,
      tipo_sanguineo,
      celular,
      whatsapp,
      convenio,
      plano,
    } = req.body;

    const avatar_uri = req.file.filename ?? '';

    console.log('body: -------> ', req.body);
    console.log('file: -------> ', avatar_uri);
    
  
    if (!nome || !sexo || !cpf || !rg || !naturalidade || !estado_civil || !celular) {
      return res.status(400).send({
        errors: 'there is one or more empty fields',
      });
    }

    const checkPatient = await Patient.findOne({
      where: {
        [Op.or]: [{ rg }, { cpf }]
      }
    });

    if (checkPatient) {
      return res.status(400).send({
        errors: 'CPF ou RG já cadastrado',
      });
    }

    const patient = await Patient.create({
      nome,
      sexo,
      avatar_uri,
      data_nascimento,
      cpf,
      rg,
      naturalidade,
      estado_civil,
      tipo_sanguineo,
      celular,
      whatsapp,
      convenio,
      plano,
    })

    return res.json(patient);

    return res.send({ status: 'ok'});
  },

  async getMedics(req: Request, res: Response) {
    const { id, nome } = req.query;

    const where: WhereOptions = {};

    if (id) {
      where.id = id;
    }

    if (nome) {
      where.nome = {
        [Op.iLike]: '%' + nome + '%',
      }
    }

    const medics = await Medic.findAll({
      where,
    });

    return res.json(medics);
  }
}

