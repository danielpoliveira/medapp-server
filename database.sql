CREATE DATABASE medapp;

CREATE TABLE medic (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE patient (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,

  cpf VARCHAR(11) NOT NULL,
  rg VARCHAR(12) NOT NULL,
  
  naturalidade VARCHAR(20) NOT NULL,
  estado_civil VARCHAR(10) NOT NULL,
  tipo_sanguineo VARCHAR(3),

  celular VARCHAR(15) NOT NULL,
  whatsapp VARCHAR(15),
  convenio VARCHAR(10),
  plano VARCHAR(10),

  UNIQUE(cpf, rg)
);

CREATE TABLE recepcionista (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  
  UNIQUE(email)
);

CREATE TABLE agendamento (
  id SERIAL PRIMARY KEY,
  datetime timestamp NOT NULL,
  
  fk_id_paciente INTEGER NOT NULL REFERENCES patient,
  fk_id_medico INTEGER NOT NULL REFERENCES medic
);

/* INSERINDO DADOS NA TABLE MEDIC */
INSERT INTO medic(nome)
values('Anna Sophia Melo de Omena');

INSERT INTO medic(nome)
values('Daniel Pereira Oliveira');

INSERT INTO medic(nome)
values('Wesley Sousa e Sousa');

INSERT INTO recepcionista
(nome, email, password)
values
('Daniel Oliveira', 'dani.edm@outlook.com', '12345');

INSERT INTO patient
(nome, cpf, rg, naturalidade, estado_civil, tipo_sanguineo, celular, whatsapp, convenio,plano)
values
('José da silva', '12345678', '87654321', 'maranhense', 'solteiro', 'AB+', '98123456', '98123456', 'unimed', 'gold');

INSERT INTO patient
(nome, cpf, rg, naturalidade, estado_civil, tipo_sanguineo, celular, whatsapp, convenio,plano)
values
('Igor de almeida', '5598762', '564721', 'paulista', 'casado', 'O+', '955458', '955458', 'hapvida', 'simple');

INSERT INTO agendamento
  (fk_id_paciente, fk_id_medico, datetime)
values
  (1, 2, '2020-11-22 14:30');

INSERT INTO agendamento
  (fk_id_paciente, fk_id_medico, datetime)
values
  (2, 3, '2020-11-27 09:40');

SELECT 
  patient.id as id_paciente,
  patient.nome as nome_paciente,
  
  medic.id as id_medico,
  medic.nome as nome_medico,

  datetime AS data
FROM 
  agendamento
INNER JOIN
  patient
ON
  patient.id = fk_id_paciente
INNER JOIN
  medic
ON medic.id = fk_id_medico;


SELECT 
  agendamento.id as id_agendamento,
  patient.id as id_paciente,
  patient.nome as nome_paciente,
  
  medic.id as id_medico,
  medic.nome as nome_medico,

  datetime AS data
FROM 
  agendamento
INNER JOIN
  patient
ON
  patient.id = fk_id_paciente
INNER JOIN
  medic
ON medic.id = fk_id_medico
WHERE 
  datetime >= '2020-11-22' 
and
  datetime < '2020-11-23';