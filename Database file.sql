--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-26 09:50:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 16436)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    assigned_to character varying(255),
    created_at timestamp(6) without time zone,
    created_by character varying(255),
    delete boolean NOT NULL,
    description character varying(255),
    expected_end_date_time timestamp(6) without time zone,
    expected_start_date_time timestamp(6) without time zone,
    status character varying(255),
    title character varying(255),
    updated_at timestamp(6) without time zone
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16435)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tasks ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16444)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    active boolean NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    timezone character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16443)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4897 (class 0 OID 16436)
-- Dependencies: 218
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, assigned_to, created_at, created_by, delete, description, expected_end_date_time, expected_start_date_time, status, title, updated_at) FROM stdin;
3	Shivraj	2025-04-25 14:21:14.510925	Sourabh	f	For company test	2025-04-25 03:01:00	2025-04-25 02:01:00	Completed	Making spring boot applicaton	2025-04-25 14:22:50.931009
4	Ashok	2025-04-25 16:40:38.580804	Ashok	f	Prepare itinerary	\N	\N	Pending	Shivneri Fort Visit	2025-04-25 16:40:38.580804
5	Meena	2025-04-25 16:40:38.650276	Ashok	f	Initial draft	2025-04-25 08:31:04.088438	2025-04-25 07:31:04.088438	In Progress	Pune Report Drafting	2025-04-25 16:40:38.650276
6	Bhaskar	2025-04-25 16:40:38.896594	Ashok	f	Call scheduled with client	2025-04-25 14:06:24.917772	2025-04-25 11:06:24.917772	In Progress	Kolhapur Client Call	2025-04-25 16:40:38.896594
7	Vishal	2025-04-25 16:40:39.082692	Savita	f	Organize travel plan	\N	\N	Pending	Visit Ajanta Caves	2025-04-25 16:40:39.082692
1	Ashok	2025-04-25 13:57:21.217931	Ashok	f	Prepare itinerary	2025-04-27 14:23:00	2025-04-25 14:23:00	Completed	Updated Shivneri Plan	2025-04-25 16:40:39.174758
8	Savita	2025-04-25 16:40:39.268688	Vishal	f	Prepare presentation	\N	\N	Completed	Nashik Wine Tour Brief	2025-04-25 16:40:39.268688
2	Meena	2025-04-25 13:57:21.325173	Ashok	t	Initial draft	2025-04-25 08:31:04.088438	2025-04-25 07:31:04.088438	In Progress	Pune Report Drafting	2025-04-25 16:40:39.410763
9	sourabh	2025-04-26 04:12:50.580856	\N	f	for the test	2025-04-25 22:42:00	2025-04-25 22:42:00	Completed	Video making	2025-04-26 04:17:59.134814
\.


--
-- TOC entry 4899 (class 0 OID 16444)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, active, first_name, last_name, timezone) FROM stdin;
2	t	Meena	Deshmukh	Asia/Kolkata
4	t	Kaveri	Jadhav	Asia/Kolkata
5	t	Ashok	Patil	Asia/Kolkata
8	t	Bhaskar	Joshi	Asia/Kolkata
9	t	Vishal	Phadke	Asia/Kolkata
11	t	Savita	Kulkarni	Asia/Kolkata
26	t	khushi	vijayi	Asia/Kolkata
\.


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 217
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 9, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 26, true);


--
-- TOC entry 4748 (class 2606 OID 16442)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 16450)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2025-04-26 09:50:58

--
-- PostgreSQL database dump complete
--

