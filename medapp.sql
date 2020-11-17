--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agendamento; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.agendamento (
    id integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    status character varying(30) DEFAULT 'em andamento'::character varying,
    fk_id_paciente integer NOT NULL,
    fk_id_medico integer NOT NULL
);

--
-- Name: agendamento_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.agendamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: agendamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.agendamento_id_seq OWNED BY public.agendamento.id;


--
-- Name: medic; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.medic (
    id integer NOT NULL,
    nome character varying(50) NOT NULL
);


--
-- Name: medic_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.medic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: medic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.medic_id_seq OWNED BY public.medic.id;


--
-- Name: patient; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.patient (
    id integer NOT NULL,
    nome character varying(50) NOT NULL,
    cpf character varying(11) NOT NULL,
    rg character varying(12) NOT NULL,
    naturalidade character varying(20) NOT NULL,
    estado_civil character varying(10) NOT NULL,
    tipo_sanguineo character varying(3),
    celular character varying(15) NOT NULL,
    whatsapp character varying(15),
    convenio character varying(10),
    plano character varying(10),
    sexo character varying(20) DEFAULT 'nao definido'::character varying NOT NULL,
    data_nascimento date DEFAULT now() NOT NULL,
    avatar_uri text DEFAULT ''::text NOT NULL
);

--
-- Name: patient_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.patient_id_seq OWNED BY public.patient.id;


--
-- Name: recepcionista; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.recepcionista (
    id integer NOT NULL,
    nome character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);

--
-- Name: recepcionista_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.recepcionista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: recepcionista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.recepcionista_id_seq OWNED BY public.recepcionista.id;


--
-- Name: agendamento id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.agendamento ALTER COLUMN id SET DEFAULT nextval('public.agendamento_id_seq'::regclass);


--
-- Name: medic id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.medic ALTER COLUMN id SET DEFAULT nextval('public.medic_id_seq'::regclass);


--
-- Name: patient id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.patient ALTER COLUMN id SET DEFAULT nextval('public.patient_id_seq'::regclass);


--
-- Name: recepcionista id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.recepcionista ALTER COLUMN id SET DEFAULT nextval('public.recepcionista_id_seq'::regclass);


--
-- Data for Name: agendamento; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.agendamento (id, datetime, status, fk_id_paciente, fk_id_medico) FROM stdin;
17	2020-11-24 08:45:00	Compareceu	1	2
22	2020-01-17 01:06:34	em andamento	2	3
28	2020-11-20 10:00:11	em andamento	9	1
30	2020-11-25 18:45:21	em andamento	6	3
\.


--
-- Data for Name: medic; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.medic (id, nome) FROM stdin;
1	Anna Sophia Melo de Omena
2	Daniel Pereira Oliveira
3	Wesley Sousa e Sousa
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.patient (id, nome, cpf, rg, naturalidade, estado_civil, tipo_sanguineo, celular, whatsapp, convenio, plano, sexo, data_nascimento, avatar_uri) FROM stdin;
1	José da silva	12345678	87654321	maranhense	solteiro	AB+	98123456	98123456	unimed	gold	masculino	2000-09-12	
2	Igor de almeida	5598762	564721	paulista	casado	O+	955458	955458	hapvida	simple	masculino	1991-10-05	
5	Igor de almeida	45654789	987156247	carioca	viúvo	AB+	459875	459875	\N	\N	masculino	2002-04-15	
6	Daniel Oliveira	06468275377	043497320119	Maranhense	solteiro	AB+	98991526999	98991526999	Unimed	S	homem	1997-12-28	myphoto.jpeg
7	Anna sophia	123456781	618362527	Alagoas	solteiro	B-	9891736722	989927377	Unimed	Gold	mulher	2001-04-20	e35ba1ace754b6181095f44dae8fec38
8	Clistenys Eduardo	1546546188	1232156476	Santa ines	solteiro	O-	40028922	40028922	Unimed	g	homem	2000-11-22	51098253811b0962f86b041709b0feee
9	Wesley Sousa e Sousa	845135474	654977874	Maranhão	casado	A+	989123456	989123456	Unimed	p	nao definido	1999-12-07	1fca8beedd1561dc5fd6411a13e29920
10	Thyago Machado Rodrigues	162819342	183727397	Viana	solteiro	B+	989123472	989152725	Unimed	G	homem	2000-09-06	05e3398d4644264c47cbf58605fd1016
\.


--
-- Data for Name: recepcionista; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.recepcionista (id, nome, email, password) FROM stdin;
1	Daniel Oliveira	dani.edm@outlook.com	12345
5	Daniel Oliveira	dani.edm@outlook.com1	1234
\.


--
-- Name: agendamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.agendamento_id_seq', 31, true);


--
-- Name: medic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.medic_id_seq', 3, true);


--
-- Name: patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.patient_id_seq', 10, true);


--
-- Name: recepcionista_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.recepcionista_id_seq', 5, true);


--
-- Name: agendamento agendamento_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_pkey PRIMARY KEY (id);


--
-- Name: medic medic_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.medic
    ADD CONSTRAINT medic_pkey PRIMARY KEY (id);


--
-- Name: patient patient_cpf_rg_key; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_cpf_rg_key UNIQUE (cpf, rg);


--
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (id);


--
-- Name: recepcionista recepcionista_email_key; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.recepcionista
    ADD CONSTRAINT recepcionista_email_key UNIQUE (email);


--
-- Name: recepcionista recepcionista_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.recepcionista
    ADD CONSTRAINT recepcionista_pkey PRIMARY KEY (id);


--
-- Name: agendamento agendamento_fk_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_fk_id_medico_fkey FOREIGN KEY (fk_id_medico) REFERENCES public.medic(id);


--
-- Name: agendamento agendamento_fk_id_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_fk_id_paciente_fkey FOREIGN KEY (fk_id_paciente) REFERENCES public.patient(id);


--
-- PostgreSQL database dump complete
--

