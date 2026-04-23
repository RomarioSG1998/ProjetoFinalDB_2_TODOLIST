--
-- PostgreSQL database dump
--

\restrict 1Saitemn1kmZNdKAUbhc7fb45WiewamQ2JSWAS4h1Org5rMGHkpvBThbJbMJEQm

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

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

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, created_at, email, password_hash, username) VALUES (1, '2026-04-23 00:10:58.992289', 'romario@example.com', 'hash_senha_fixa', 'romario');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, color_code, name, user_id) VALUES (1, '#4a90e2', 'Trabalho', 1);
INSERT INTO public.categories (id, color_code, name, user_id) VALUES (2, '#50e3c2', 'Estudos', 1);
INSERT INTO public.categories (id, color_code, name, user_id) VALUES (3, '#f5a623', 'Pessoal', 1);
INSERT INTO public.categories (id, color_code, name, user_id) VALUES (4, '#d0021b', 'Saúde', 1);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (1, 'Preparar os dados do mês de Abril para a reunião.', 'Alta', 'Finalizar Relatório Mensal', 1, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (2, 'Praticar conceitos de PODs e Services.', 'Alta', 'Estudar Kubernetes', 2, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (3, 'Treino de pernas e cardio.', 'Média', 'Academia', 4, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (4, 'Presente de aniversário para Joana.', 'Baixa', 'Comprar Presente', 3, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (5, 'Verificar as alterações da equipe de dev.', 'Média', 'Revisar PRs no GitHub', 1, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (6, 'Limpar e organizar o setup local.', 'Baixa', 'Organizar Mesa', 3, 1);
INSERT INTO public.tasks (id, descricao, importancia, nome, category_id, user_id) VALUES (7, 'Check-up anual.', 'Média', 'Marcar Dentista', 4, 1);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 4, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 1Saitemn1kmZNdKAUbhc7fb45WiewamQ2JSWAS4h1Org5rMGHkpvBThbJbMJEQm

