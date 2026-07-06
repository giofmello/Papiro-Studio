import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { supabase } from "./supabase";
const emptyClient = { nome: "", whatsapp: "", instagram: "", cidade: "", aniversario: "", obs: "" };
const emptyStock = { produto: "", categoria: "", qtd: "", custo: "", venda: "" };

const planejamento = {
  Julho: [
    ["15/07", "Quarta", "Recomeço & Planejamento", ["IG Feed — Post de Dica", "IG Stories — Bastidores da produção", "TikTok — Vídeo de dica rápida"]],
    ["16/07", "Quinta", "Recomeço & Planejamento", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Dica rápida em vídeo", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Trend adaptada"]],
    ["17/07", "Sexta", "Recomeço & Planejamento", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Unboxing"]],
    ["18/07", "Sábado", "Recomeço & Planejamento", ["IG Stories — Making of do fim de semana", "IG Reels — Transformação/Antes e depois", "TikTok — Storytime da marca", "TikTok Live — 20h"]],
    ["19/07", "Domingo", "Recomeço & Planejamento", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Resposta a comentário"]],
    ["20/07", "Segunda", "Recomeço & Planejamento", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
    ["21/07", "Terça", "Recomeço & Planejamento", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Trend de áudio + produto", "TikTok — Processo de produção"]],
    ["22/07", "Quarta", "Organização que Inspira", ["IG Feed — Lançamento de Produto", "IG Stories — Bastidores da produção", "TikTok — Comparativo de produtos"]],
    ["23/07", "Quinta", "Organização que Inspira", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Unboxing rápido", "TikTok — Bastidores divertidos"]],
    ["24/07", "Sexta", "Organização que Inspira", ["IG Feed — Comparativo", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — GRWM com produtos"]],
    ["25/07", "Sábado", "Organização que Inspira", ["IG Stories — Making of do fim de semana", "IG Reels — Bastidores em time-lapse", "TikTok — Vídeo de dica rápida", "TikTok Live — 20h"]],
    ["26/07", "Domingo", "Dia dos Avós", ["IG Feed — Avaliação de Cliente", "IG Stories — Repost da semana + prévia de segunda", "TikTok — Trend adaptada"]],
    ["27/07", "Segunda", "Organização que Inspira", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
    ["28/07", "Terça", "Organização que Inspira", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Tutorial de uso", "TikTok — Unboxing"]],
    ["29/07", "Quarta", "Atualização de Estoque & Mini-Lançamento", ["IG Feed — Promoção/Oferta", "IG Stories — Bastidores da produção", "TikTok — Storytime da marca"]],
    ["30/07", "Quinta", "Atualização de Estoque & Mini-Lançamento", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — POV cliente feliz", "IG Live — 19h", "TikTok — Resposta a comentário"]],
    ["31/07", "Sexta", "Atualização de Estoque & Mini-Lançamento", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Processo de produção"]],
  ],
  Agosto: [
  ["01/08", "Sábado", "Atualização de Estoque & Mini-Lançamento", ["IG Stories — Making of do fim de semana", "IG Reels — Dica rápida em vídeo", "TikTok — Comparativo de produtos", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["02/08", "Domingo", "Atualização de Estoque & Mini-Lançamento", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Bastidores divertidos"]],
  ["03/08", "Segunda", "Atualização de Estoque & Mini-Lançamento", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["04/08", "Terça", "Atualização de Estoque & Mini-Lançamento", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Transformação/Antes e depois", "TikTok — GRWM com produtos"]],
  ["05/08", "Quarta", "Semana do Dia dos Pais", ["IG Feed — Post de Dica", "IG Stories — Bastidores da produção", "TikTok — Vídeo de dica rápida"]],
  ["06/08", "Quinta", "Semana do Dia dos Pais", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Trend de áudio + produto", "TikTok — Trend do momento adaptado"]],
  ["07/08", "Sexta", "Semana do Dia dos Pais", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Unboxing"]],
  ["08/08", "Sábado", "Semana do Dia dos Pais", ["IG Stories — Making of do fim de semana", "IG Reels — Unboxing rápido", "TikTok — Storytime da marca", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["09/08", "Domingo", "✦ Dia dos Pais", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Resposta a comentário/dúvida"]],
  ["10/08", "Segunda", "Semana do Dia dos Pais", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["11/08", "Terça", "✦ Dia do Estudante", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Bastidores em time-lapse", "TikTok — Mostrando processo de produção"]],
  ["12/08", "Quarta", "Dia do Estudante & Volta às Aulas", ["IG Feed — Lançamento de Produto", "IG Stories — Bastidores da produção", "TikTok — Comparativo de produtos"]],
  ["13/08", "Quinta", "Dia do Estudante & Volta às Aulas", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Tutorial de uso", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Bastidores divertidos"]],
  ["14/08", "Sexta", "Dia do Estudante & Volta às Aulas", ["IG Feed — Comparativo", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — GRWM com produtos"]],
  ["15/08", "Sábado", "Dia do Estudante & Volta às Aulas", ["IG Stories — Making of do fim de semana", "IG Reels — POV cliente feliz", "TikTok — Vídeo de dica rápida", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["16/08", "Domingo", "Dia do Estudante & Volta às Aulas", ["IG Feed — Avaliação de Cliente", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Trend do momento adaptado"]],
  ["17/08", "Segunda", "Dia do Estudante & Volta às Aulas", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["18/08", "Terça", "Dia do Estudante & Volta às Aulas", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Dica rápida em vídeo", "TikTok — Unboxing"]],
  ["19/08", "Quarta", "Criatividade em Foco", ["IG Feed — Promoção/Oferta", "IG Stories — Bastidores da produção", "TikTok — Storytime da marca"]],
  ["20/08", "Quinta", "Criatividade em Foco", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Transformação/Antes e depois", "TikTok — Resposta a comentário/dúvida"]],
  ["21/08", "Sexta", "Criatividade em Foco", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Mostrando processo de produção"]],
  ["22/08", "Sábado", "Criatividade em Foco", ["IG Stories — Making of do fim de semana", "IG Reels — Trend de áudio + produto", "TikTok — Comparativo de produtos", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["23/08", "Domingo", "Criatividade em Foco", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Bastidores divertidos"]],
  ["24/08", "Segunda", "Criatividade em Foco", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["25/08", "Terça", "Criatividade em Foco", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Unboxing rápido", "TikTok — GRWM com produtos"]],
  ["26/08", "Quarta", "Bastidores & Comunidade Papiro", ["IG Feed — Post de Dica", "IG Stories — Bastidores da produção", "TikTok — Vídeo de dica rápida"]],
  ["27/08", "Quinta", "Bastidores & Comunidade Papiro", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Bastidores em time-lapse", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Trend do momento adaptado"]],
  ["28/08", "Sexta", "Bastidores & Comunidade Papiro", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Unboxing"]],
  ["29/08", "Sábado", "Bastidores & Comunidade Papiro", ["IG Stories — Making of do fim de semana", "IG Reels — Tutorial de uso", "TikTok — Storytime da marca", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["30/08", "Domingo", "Bastidores & Comunidade Papiro", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Resposta a comentário/dúvida"]],
  ["31/08", "Segunda", "Bastidores & Comunidade Papiro", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
],
  Setembro: [
  ["01/09", "Terça", "Brasilidade & Independência", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — POV cliente feliz", "TikTok — Mostrando processo de produção"]],
  ["02/09", "Quarta", "Brasilidade & Independência", ["IG Feed — Lançamento de Produto", "IG Stories — Bastidores da produção", "TikTok — Comparativo de produtos"]],
  ["03/09", "Quinta", "Brasilidade & Independência", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Dica rápida em vídeo", "TikTok — Bastidores divertidos"]],
  ["04/09", "Sexta", "Brasilidade & Independência", ["IG Feed — Comparativo", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — GRWM com produtos"]],
  ["05/09", "Sábado", "Brasilidade & Independência", ["IG Stories — Making of do fim de semana", "IG Reels — Transformação/Antes e depois", "TikTok — Vídeo de dica rápida", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["06/09", "Domingo", "Brasilidade & Independência", ["IG Feed — Avaliação de Cliente", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Trend do momento adaptado"]],
  ["07/09", "Segunda", "✦ Independência do Brasil", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["08/09", "Terça", "Brasilidade & Independência", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Trend de áudio + produto", "TikTok — Unboxing"]],
  ["09/09", "Quarta", "Setembro Amarelo — Organização Emocional", ["IG Feed — Promoção/Oferta", "IG Stories — Bastidores da produção", "TikTok — Storytime da marca"]],
  ["10/09", "Quinta", "Setembro Amarelo — Organização Emocional", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Unboxing rápido", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Resposta a comentário/dúvida"]],
  ["11/09", "Sexta", "Setembro Amarelo — Organização Emocional", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Mostrando processo de produção"]],
  ["12/09", "Sábado", "Setembro Amarelo — Organização Emocional", ["IG Stories — Making of do fim de semana", "IG Reels — Bastidores em time-lapse", "TikTok — Comparativo de produtos", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["13/09", "Domingo", "Setembro Amarelo — Organização Emocional", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Bastidores divertidos"]],
  ["14/09", "Segunda", "Setembro Amarelo — Organização Emocional", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["15/09", "Terça", "✦ Dia do Cliente", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Tutorial de uso", "TikTok — GRWM com produtos"]],
  ["16/09", "Quarta", "Semana do Dia do Cliente", ["IG Feed — Post de Dica", "IG Stories — Bastidores da produção", "TikTok — Vídeo de dica rápida"]],
  ["17/09", "Quinta", "Semana do Dia do Cliente", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — POV cliente feliz", "TikTok — Trend do momento adaptado"]],
  ["18/09", "Sexta", "Semana do Dia do Cliente", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Unboxing"]],
  ["19/09", "Sábado", "Semana do Dia do Cliente", ["IG Stories — Making of do fim de semana", "IG Reels — Dica rápida em vídeo", "TikTok — Storytime da marca", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["20/09", "Domingo", "Semana do Dia do Cliente", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Resposta a comentário/dúvida"]],
  ["21/09", "Segunda", "Semana do Dia do Cliente", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["22/09", "Terça", "✦ Início da Primavera", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Transformação/Antes e depois", "TikTok — Mostrando processo de produção"]],
  ["23/09", "Quarta", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Feed — Lançamento de Produto", "IG Stories — Bastidores da produção", "TikTok — Comparativo de produtos"]],
  ["24/09", "Quinta", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Trend de áudio + produto", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Bastidores divertidos"]],
  ["25/09", "Sexta", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Feed — Comparativo", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — GRWM com produtos"]],
  ["26/09", "Sábado", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Stories — Making of do fim de semana", "IG Reels — Unboxing rápido", "TikTok — Vídeo de dica rápida", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["27/09", "Domingo", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Feed — Avaliação de Cliente", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Trend do momento adaptado"]],
  ["28/09", "Segunda", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["29/09", "Terça", "Boas-vindas à Primavera — Lançamento Coleção Primavera", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Bastidores em time-lapse", "TikTok — Unboxing"]],
  ["30/09", "Quarta", "Coleção Primavera em Uso & Avaliações", ["IG Feed — Promoção/Oferta", "IG Stories — Bastidores da produção", "TikTok — Storytime da marca"]],
],
  Outubro: [
  ["01/10", "Quinta", "Coleção Primavera em Uso & Avaliações", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Tutorial de uso", "TikTok — Resposta a comentário/dúvida"]],
  ["02/10", "Sexta", "Coleção Primavera em Uso & Avaliações", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Mostrando processo de produção"]],
  ["03/10", "Sábado", "Coleção Primavera em Uso & Avaliações", ["IG Stories — Making of do fim de semana", "IG Reels — POV cliente feliz", "TikTok — Comparativo de produtos", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["04/10", "Domingo", "Coleção Primavera em Uso & Avaliações", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Bastidores divertidos"]],
  ["05/10", "Segunda", "Coleção Primavera em Uso & Avaliações", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["06/10", "Terça", "Coleção Primavera em Uso & Avaliações", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Dica rápida em vídeo", "TikTok — GRWM com produtos"]],
  ["07/10", "Quarta", "Contagem Regressiva — Dia das Crianças", ["IG Feed — Post de Dica", "IG Stories — Bastidores da produção", "TikTok — Vídeo de dica rápida"]],
  ["08/10", "Quinta", "Contagem Regressiva — Dia das Crianças", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Transformação/Antes e depois", "IG Live — Bastidores & Perguntas — 19h", "TikTok — Trend do momento adaptado"]],
  ["09/10", "Sexta", "Contagem Regressiva — Dia das Crianças", ["IG Feed — Novidade", "IG Stories — Sexta de novidade + repost de cliente", "TikTok — Unboxing"]],
  ["10/10", "Sábado", "Contagem Regressiva — Dia das Crianças", ["IG Stories — Making of do fim de semana", "IG Reels — Trend de áudio + produto", "TikTok — Storytime da marca", "TikTok Live — Papo aberto & dicas — 20h"]],
  ["11/10", "Domingo", "Contagem Regressiva — Dia das Crianças", ["IG Feed — Post de Dica", "IG Stories — Bom dia + repost da semana + prévia de segunda", "TikTok — Resposta a comentário/dúvida"]],
  ["12/10", "Segunda", "✦ Dia das Crianças / Nossa Senhora Aparecida", ["IG Feed — Frase Inspiradora", "IG Stories — Bom dia ✿ + enquete do dia"]],
  ["13/10", "Terça", "Semana do Dia das Crianças", ["IG Stories — Dica rápida + caixa de perguntas", "IG Reels — Unboxing rápido", "TikTok — Mostrando processo de produção"]],
  ["14/10", "Quarta", "Semana do Dia das Crianças", ["IG Feed — Lançamento de Produto", "IG Stories — Bastidores da produção", "TikTok — Comparativo de produtos"]],
     ["15/10", "Quinta", "✦ Dia dos Professores", ["IG Stories — Caixa de perguntas + contagem regressiva", "IG Reels — Bastidores em time-lapse", "TikTok — Bastidores divertidos"]],
  ],
};
const templates = [
  { categoria: "Feed", nome: "Post de Produto — Variação A", canva: "https://canva.link/a2z1eo3argkesum", preview: "/previews/post-de-produto-a.png" },
  { categoria: "Feed", nome: "Post de Produto — Variação B", canva: "https://canva.link/anntffulvf13w8r", preview: "/previews/pos-de-produto-b.png" },
  { categoria: "Feed", nome: "Post de Dica — Variação A", canva: "https://canva.link/q7has0qid08siva", preview: "/previews/post-de-dica-a.png" },
  { categoria: "Feed", nome: "Post de Dica — Variação B", canva: "https://canva.link/tdnnqrj3upvqppw", preview: "/previews/post-de-dica-b.png" },
  { categoria: "Feed", nome: "Novidade — Variação A", canva: "https://canva.link/xh17q8uyyd01d0u", preview: "/previews/novidade-a.png" },
  { categoria: "Feed", nome: "Novidade — Variação B", canva: "https://canva.link/5lvuf17ws0oiv3c", preview: "/previews/novidade-b.png" },
  { categoria: "Feed", nome: "Lançamento de Produto — Variação A", canva: "https://canva.link/mkp8ut9n9ikmx7o", preview: "/previews/lancamento-a.png" },
  { categoria: "Feed", nome: "Lançamento de Produto — Variação B", canva: "https://canva.link/4hdagheulrhqkxg",preview: "/previews/lancamento-b.png" },
  { categoria: "Feed", nome: "Promoção/Oferta — Variação A", canva: "https://canva.link/8kp5cy44htgkbji", preview: "/previews/promocao-a.png" },
  { categoria: "Feed", nome: "Promoção/Oferta — Variação B", canva: "https://canva.link/bm3srvbxzslhgqt", preview: "/previews/promocao-b.png" },
  { categoria: "Feed", nome: "Bastidores — Variação A", canva: "https://canva.link/44g4pipsyth4kvq",preview: "/previews/bastidores-a.png" },
  { categoria: "Feed", nome: "Bastidores — Variação B", canva: "https://canva.link/cjitkvc6mlb9kwe",preview: "/previews/bastidores-b.png" },
  { categoria: "Feed", nome: "Avaliação de Cliente — Variação A", canva: "https://canva.link/5m8pmk0ygh040iv", preview: "/previews/avaliacao-a.png" },
  { categoria: "Feed", nome: "Avaliação de Cliente — Variação B", canva: "https://canva.link/udtlhnb1f439b0p", preview: "/previews/avaliacao-b.png" },
  { categoria: "Feed", nome: "Comparativo — Variação A", canva: "https://canva.link/5c2zxv7da7wy291", preview: "/previews/comparacao-a.png" },
  { categoria: "Feed", nome: "Comparativo — Variação B", canva: "https://canva.link/2qjyv15knskqc78", preview: "/previews/comparacao-b.png" },
  { categoria: "Feed", nome: "Frase Inspiradora — Variação A", canva: "https://canva.link/lmz4p97u4u4uigo", preview: "/previews/frase-a.png" },
  { categoria: "Feed", nome: "Frase Inspiradora — Variação B", canva: "https://canva.link/etep8s323gojkvx", preview: "/previews/frase-b.png" },
  { categoria: "Feed", nome: "Capa de Reels — Variação A", canva: "https://canva.link/yyz6kc53tjt46oa", preview: "/previews/capa-de-reels-a.png" },
  { categoria: "Feed", nome: "Capa de Reels — Variação B", canva: "https://canva.link/w4sehp0zwaolw1p", preview: "/previews/capa-de-reels-b.png" },
  { categoria: "Feed", nome: "Carrossel Educativo — Variação A", canva: "https://canva.link/qjwssuvwrxb3k5y", preview: "/previews/carrossel-educativo.png" },
  { categoria: "Feed", nome: "Carrossel Produto — Variação B", canva: "https://canva.link/g9zjkmp7j8gj4s1", preview: "/previews/carrossel-produto.png" },

  { categoria: "Stories", nome: "Bom dia — Variação A", canva: "https://canva.link/wp493r4jb888wwn", preview: "/previews/story-bom-dia-a.png" },
  { categoria: "Stories", nome: "Bom dia — Variação B", canva: "https://canva.link/zi9dv8agmms10od", preview: "/previews/story-bom-dia-b.png" },
  { categoria: "Stories", nome: "Bastidores — Variação A", canva: "https://canva.link/w1631auwmyb9sdw", preview: "/previews/story-bastidores-a.png" },
  { categoria: "Stories", nome: "Bastidores — Variação B", canva: "https://canva.link/4s5tf5075mzp8f4", preview: "/previews/story-bastidores-b.png" },
  { categoria: "Stories", nome: "Caixa de Perguntas — Variação A", canva: "https://canva.link/d3cgfe1y8cbhhqt", preview: "/previews/story-caixa-de-perguntas-a.png" },
  { categoria: "Stories", nome: "Caixa de Perguntas — Variação B", canva: "https://canva.link/47qzb0372cgj04e", preview: "/previews/story-caixa-de-perguntas-b.png" },
  { categoria: "Stories", nome: "Enquete — Variação A", canva: "https://canva.link/6e8jggl4pwp8tnp", preview: "/previews/story-enquete-a.png" },
  { categoria: "Stories", nome: "Enquete — Variação B", canva: "https://canva.link/1n0vtbolmq1cuzo", preview: "/previews/story-enquete-b.png" },
  { categoria: "Stories", nome: "Contagem Regressiva — Variação A", canva: "https://canva.link/sv2zcgq89a6cgij", preview: "/previews/story-contagem-regressiva-a.png" },
  { categoria: "Stories", nome: "Contagem Regressiva — Variação B", canva: "https://canva.link/swzwbl1otm0anmd", preview: "/previews/story-contagem-regressiva-b.png" },
  { categoria: "Stories", nome: "Oferta — Variação A", canva: "https://canva.link/m52ltjmjq57ww1f", preview: "/previews/story-oferta-a.png" },
  { categoria: "Stories", nome: "Oferta — Variação B", canva: "https://canva.link/q9zgifkq876cdk8", preview: "/previews/story-oferta-b.png" },
  { categoria: "Stories", nome: "Repost de Cliente — Variação A", canva: "https://canva.link/xvgcxv9btt03vn3", preview: "/previews/story-repost-a.png" },
  { categoria: "Stories", nome: "Repost de Cliente — Variação B", canva: "https://canva.link/w8g2mttz8htuhto", preview: "/previews/story-repost-b.png" },
  { categoria: "Stories", nome: "Making Of — Variação A", canva: "https://canva.link/5unm7bju5d1bhr3", preview: "/previews/story-making-of-a.png" },
  { categoria: "Stories", nome: "Making Of — Variação B", canva: "https://canva.link/3ov0l7scu9krldt", preview: "/previews/story-making-of-b.png" },
  { categoria: "Stories", nome: "Story Simples — Variação A", canva: "https://canva.link/5ob4c4a45ga5z00", preview: "/previews/story simples-a.png" },
  { categoria: "Stories", nome: "Story Simples — Variação B", canva: "https://canva.link/ud2ryvggudo8brh", preview: "/previews/story-simples-b.png" },
  { categoria: "Stories", nome: "Vitrine — Variação A", canva: "https://canva.link/gkwxitleijz4zbp", preview: "/previews/story-vitrine-a.png" },
  { categoria: "Stories", nome: "Vitrine — Variação B", canva: "https://canva.link/kktk1q9fmjqcv7v", preview: "/previews/story-vitrine-b.png" },
  { categoria: "Stories", nome: "Story em Vídeo — Variação A", canva: "https://canva.link/wjkk8m4nd4pu7y8", preview: "/previews/story-em-video-a.png" },
  { categoria: "Stories", nome: "Story em Vídeo — Variação B", canva: "https://canva.link/whlqsalcosfgzig", preview: "/previews/story-em-video-b.png"},
];
const usuariosSistema = [
  { id: "giovanna", nome: "Giovanna" },
  { id: "matheus", nome: "Matheus" },
  { id: "victor", nome: "Victor" },
  { id: "vitoria", nome: "Vitória" },
];
const roteirosAtendimento = [
  {
    categoria: "Atendimento",
    titulo: "Saudação inicial",
    texto: `Olá! ✏️

Seja muito bem-vindo(a) à Papiro Store!

Como posso te ajudar hoje?`,
  },
  {
    categoria: "Pagamento",
    titulo: "Formas de pagamento",
    texto: `Aceitamos:

💳 Cartão
💚 Pix com 10% de desconto
💵 Dinheiro`,
  },
  {
    categoria: "Estoque",
    titulo: "Verificar disponibilidade",
    texto: `Vou verificar a disponibilidade e já retorno para você.🤎 `,
  },
  {
    categoria: "Entrega",
    titulo: "Entrega e retirada",
    texto: `🚚 Entrega e Retirada

Enviamos para todo o Brasil pelos Correios.

Também realizamos entregas em Pindamonhangaba. Consulte a taxa conforme o bairro.

Se preferir, você também pode retirar seu pedido conosco. 💖`,
  },
  {
    categoria: "Pós-venda",
    titulo: "Agradecimento",
    texto: `Agradecemos pela preferência!

Qualquer dúvida, estaremos sempre à disposição.

Esperamos você novamente! 🤎`,
  },
  {
    categoria: "Pós-venda",
    titulo: "Pedido de avaliação",
    texto: `Se você gostou da sua experiência conosco, ficaremos muito felizes se puder avaliar nosso atendimento. 🥰`,
  },
  {
    categoria: "Pedido",
    titulo: "Pedido em produção",
    texto: `Seu pedido já está em produção!

Assim que finalizar, enviaremos fotos e as próximas informações. 🤎`,
  },
  {
    categoria: "Pedido",
    titulo: "Pedido enviado",
    texto: `Seu pedido foi enviado!

Assim que houver atualização, você poderá acompanhar pelo rastreio. ✨`,
  },
  {
    categoria: "Estoque",
    titulo: "Produto indisponível",
    texto: `Infelizmente este produto está indisponível no momento.

Posso te mostrar algumas opções parecidas? ✨`,
  },
];
function getStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [nomeUsuario, setNomeUsuario] = useState(
  localStorage.getItem("papiro_usuario_nome") || ""
);
const [loginUser, setLoginUser] = useState("");
const [loginSenha, setLoginSenha] = useState("");
const [loginErro, setLoginErro] = useState("");
const [nome, setNome] = useState("");
  const [page, setPage] = useState("inicio");
  const [mes, setMes] = useState("Julho");
  const [clientes, setClientes] = useState(() => getStorage("papiro_clientes", []));
  const [estoque, setEstoque] = useState(() => getStorage("papiro_estoque", []));
  const [clientForm, setClientForm] = useState(emptyClient);
  const [stockForm, setStockForm] = useState(emptyStock);
const [buscaTemplate, setBuscaTemplate] = useState("");
const [categoriaTemplate, setCategoriaTemplate] = useState("Todos");
const [iaTipo, setIaTipo] = useState("Legenda");
const [iaTema, setIaTema] = useState("");
const [iaTom, setIaTom] = useState("fofo, acolhedor e comercial");
const [iaDetalhes, setIaDetalhes] = useState("");

useEffect(() => localStorage.setItem("papiro_clientes", JSON.stringify(clientes)), [clientes]);
  useEffect(() => localStorage.setItem("papiro_estoque", JSON.stringify(estoque)), [estoque]);
  useEffect(() => {
  async function testarSupabase() {
    const { data, error } = await supabase.from("clientes").select("*").limit(1);

    if (error) {
      console.log("Erro Supabase:", error.message);
    } else {
      console.log("Supabase conectado:", data);
    }
  }

  testarSupabase();
}, []);

  const estoqueBaixo = estoque.filter((i) => Number(i.qtd) <= 3);
  const diasDoMes = planejamento[mes];
const templatesFiltrados = templates.filter((template) => {
  const categoriaOk =
    categoriaTemplate === "Todos" ||
    template.categoria === categoriaTemplate;

  const buscaOk = template.nome
    .toLowerCase()
    .includes(buscaTemplate.toLowerCase());

  return categoriaOk && buscaOk;
});
 function entrar(e) {
  e.preventDefault();

  const usuario = usuariosSistema.find((u) => u.id === loginUser);

  if (!usuario) {
    setLoginErro("Usuário inválido.");
    return;
  }

  if (!loginSenha.trim()) {
    setLoginErro("Digite uma senha.");
    return;
  }

  const chaveSenha = `papiro_senha_${usuario.id}`;
  const senhaSalva = localStorage.getItem(chaveSenha);

  if (!senhaSalva) {
    localStorage.setItem(chaveSenha, loginSenha.trim());
    localStorage.setItem("papiro_usuario_id", usuario.id);
    localStorage.setItem("papiro_usuario_nome", usuario.nome);
    setNomeUsuario(usuario.nome);
    setLoginErro("");
    return;
  }

  if (senhaSalva !== loginSenha.trim()) {
    setLoginErro("Senha incorreta.");
    return;
  }

  localStorage.setItem("papiro_usuario_id", usuario.id);
  localStorage.setItem("papiro_usuario_nome", usuario.nome);
  setNomeUsuario(usuario.nome);
  setLoginErro("");
}

 if (!nomeUsuario) {
  return (
    <main className="welcome">
      <section className="welcome-card">
        <div className="papiro-icon">
          <img src="/favicon.png" alt="Papiro" />
        </div>

        <h1>Papiro Studio</h1>
        <p>Entre com seu usuário e senha.</p>

        <form onSubmit={entrar}>
          <select
  value={loginUser}
  onChange={(e) => setLoginUser(e.target.value)}
>
  <option value="" disabled>
    Selecione seu usuário
  </option>

  {usuariosSistema.map((usuario) => (
    <option key={usuario.id} value={usuario.id}>
      {usuario.nome}
    </option>
  ))}
</select>

          <input
            type="password"
            value={loginSenha}
            onChange={(e) => setLoginSenha(e.target.value)}
            placeholder="Senha"
          />

          {loginErro && <p className="login-error">{loginErro}</p>}

          <button>Entrar</button>
        </form>

        <small>
          Primeiro acesso: digite uma senha para cadastrar.
        </small>
      </section>
    </main>
  );
}

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="papiro-icon small">
  <img src="/favicon.png" alt="Papiro" />
</div>
          <div>
            <h1>Papiro Studio</h1>
            <p>Centro criativo da Papiro</p>
          </div>
        </div>

        <div className="user">
          <strong>Olá, {nomeUsuario} 🌸</strong>
          <span>Equipe Papiro</span>
        </div>

        <nav>
          {[
            ["inicio", "Início"],
            ["planejamento", "Planejamento"],
            ["templates", "Templates"],
            ["clientes", "Clientes"],
            ["estoque", "Estoque"],
            ["atendimento", "Atendimento"],
            ["ia", "IA Criativa"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)} className={page === id ? "active" : ""}>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {page === "inicio" && (
          <>
            <Header title={`Olá, ${nomeUsuario} 📜`} text="Hoje é um ótimo dia para criar algo bonito." />
            <div className="metrics">
              <Metric label="Clientes" value={clientes.length} />
              <Metric label="Produtos" value={estoque.length} />
              <Metric label="Estoque baixo" value={estoqueBaixo.length} />
              <Metric label="Dias planejados" value={Object.values(planejamento).flat().length} />
            </div>
            <div className="grid">
              <Card title="✨ Ideia do dia" text="Mostre um detalhe bonito da produção ou embalagem." />
              <Card title="📅 Planejamento" text="Confira os posts do mês e organize a semana." />
              <Card title="💬 Relacionamento" text="Faça uma enquete ou responda comentários antigos." />
            </div>
          </>
        )}

        {page === "planejamento" && (
          <>
            <Header title="Planejamento Editorial" text="Calendário de postagens da Papiro." />
            <div className="tabs">
              {Object.keys(planejamento).map((m) => (
                <button key={m} onClick={() => setMes(m)} className={mes === m ? "active" : ""}>{m}</button>
              ))}
            </div>
            <div className="planning-grid">
              {diasDoMes.map(([data, dia, tema, tarefas]) => (
                <article className="planning-card" key={data}>
                  <span>{data} • {dia}</span>
                  <h3>{tema}</h3>
                  <div>
                    {tarefas.map((t) => {
                      const [canal, conteudo] = t.split(" — ");
                      return (
                        <p key={t}>
                          <strong>{canal}</strong>
                          <em>{conteudo}</em>
                        </p>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {page === "clientes" && (
          <>
            <Header title="Clientes" text="Cadastre contatos, Instagram e observações." />
            <form className="form" onSubmit={(e) => {
              e.preventDefault();
              if (!clientForm.nome.trim()) return;
              setClientes([...clientes, { ...clientForm, id: Date.now() }]);
              setClientForm(emptyClient);
            }}>
              <input placeholder="Nome" value={clientForm.nome} onChange={(e) => setClientForm({ ...clientForm, nome: e.target.value })} />
              <input placeholder="WhatsApp" value={clientForm.whatsapp} onChange={(e) => setClientForm({ ...clientForm, whatsapp: e.target.value })} />
              <input placeholder="Instagram" value={clientForm.instagram} onChange={(e) => setClientForm({ ...clientForm, instagram: e.target.value })} />
              <input placeholder="Cidade" value={clientForm.cidade} onChange={(e) => setClientForm({ ...clientForm, cidade: e.target.value })} />
              <input type="date" value={clientForm.aniversario} onChange={(e) => setClientForm({ ...clientForm, aniversario: e.target.value })} />
              <textarea placeholder="Observações" value={clientForm.obs} onChange={(e) => setClientForm({ ...clientForm, obs: e.target.value })} />
              <button>Adicionar cliente</button>
            </form>
            <div className="grid">
              {clientes.map((c) => (
                <Card key={c.id} title={c.nome} text={`WhatsApp: ${c.whatsapp || "—"} | Instagram: ${c.instagram || "—"} | Cidade: ${c.cidade || "—"}`}>
                  <p>{c.obs}</p>
                  <button onClick={() => setClientes(clientes.filter((x) => x.id !== c.id))}>Remover</button>
                </Card>
              ))}
            </div>
          </>
        )}

{page === "estoque" && (
  <>
    <Header title="Estoque" text="Gerencie todos os produtos da Papiro." />

    <div className="stock-actions">
      <button
        onClick={() =>
          setEstoque([
            ...estoque,
            {
              id: Date.now(),
              codigo: "",
              produto: "",
              categoria: "",
              qtd: "",
              minimo: "3",
              custo: "",
              venda: "",
            },
          ])
        }
      >
        + Novo Produto
      </button>
    </div>

    <div className="stock-sheet">
      <div className="stock-sheet-head">
        <span>Código</span>
        <span>Produto</span>
        <span>Categoria</span>
        <span>Qtd</span>
        <span>Mín.</span>
        <span>Custo</span>
        <span>Venda</span>
<span>Pix (-10%)</span>
<span>Lucro</span>
        <span>Status</span>
        <span></span>
      </div>

      {estoque.map((item) => {
        const baixo = Number(item.qtd || 0) <= Number(item.minimo || 0);
const lucro = Number(item.venda || 0) - Number(item.custo || 0);
const valorPix = Number(item.venda || 0) * 0.9;

        const editar = (campo, valor) => {
          setEstoque(
            estoque.map((x) =>
              x.id === item.id ? { ...x, [campo]: valor } : x
            )
          );
        };

        return (
          <div className="stock-sheet-row" key={item.id}>
            <input value={item.codigo || ""} onChange={(e) => editar("codigo", e.target.value)} />
            <input value={item.produto || ""} onChange={(e) => editar("produto", e.target.value)} />
            <input value={item.categoria || ""} onChange={(e) => editar("categoria", e.target.value)} />
            <input type="number" value={item.qtd || ""} onChange={(e) => editar("qtd", e.target.value)} />
            <input type="number" value={item.minimo || ""} onChange={(e) => editar("minimo", e.target.value)} />
            <input type="number" value={item.custo || ""} onChange={(e) => editar("custo", e.target.value)} />
            <input
  type="number"
  value={item.venda || ""}
  onChange={(e) => editar("venda", e.target.value)}
/>

<strong>
  R$ {valorPix.toFixed(2)}
</strong>

<strong>
  R$ {lucro.toFixed(2)}
</strong>

            <span className={`stock-status ${baixo ? "danger" : "success"}`}>
              {baixo ? "🔴 Baixo" : "🟢 OK"}
            </span>

            <button onClick={() => setEstoque(estoque.filter((x) => x.id !== item.id))}>
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  </>
)}

{page === "templates" && (
  <>
    <Header
      title="Templates"
      text="Biblioteca oficial de templates da Papiro."
    />

    <div className="template-toolbar">
      <input
        type="text"
        placeholder="🔍 Procurar template..."
        value={buscaTemplate}
        onChange={(e) => setBuscaTemplate(e.target.value)}
      />

      <select
        value={categoriaTemplate}
        onChange={(e) => setCategoriaTemplate(e.target.value)}
      >
        <option>Todos</option>
        <option>Feed</option>
        <option>Stories</option>
      </select>
    </div>

    <div className="metrics">
      <Metric
        label="Feed"
        value={templates.filter((t) => t.categoria === "Feed").length}
      />

      <Metric
        label="Stories"
        value={templates.filter((t) => t.categoria === "Stories").length}
      />

      <Metric
        label="Total"
        value={templates.length}
      />

      <Metric
        label="Com link"
        value={templates.filter((t) => t.canva).length}
      />
    </div>

    <div className="grid">
      {templatesFiltrados.map((template) => (
        <article
          className="template"
          key={template.categoria + template.nome}
        >
         <div className="template-preview">
  {template.preview ? (
    <img
      src={template.preview}
      alt={`Prévia de ${template.nome}`}
    />
  ) : (
    <span>{template.categoria}</span>
  )}
</div>

          <span className="template-tag">
            {template.categoria}
          </span>

          <h3>{template.nome}</h3>

          <p>
            {template.canva
              ? "Modelo do Canva cadastrado."
              : "Link do Canva ainda não cadastrado."}
          </p>

          <button
            onClick={() => {
              if (template.canva) {
                window.open(template.canva, "_blank");
              } else {
                alert("Link do Canva ainda não cadastrado.");
              }
            }}
          >
            🎨 Abrir Canva
          </button>
        </article>
      ))}
    </div>
  </>
)}
{page === "atendimento" && (
  <>
    <Header
      title="Atendimento"
      text="Roteiros prontos para copiar e usar no WhatsApp."
    />

    <div className="grid">
      {roteirosAtendimento.map((roteiro) => (
        <article className="card" key={roteiro.titulo}>
          <span className="template-tag">{roteiro.categoria}</span>
          <h3>{roteiro.titulo}</h3>

          <pre className="script-box">{roteiro.texto}</pre>

          <button
            onClick={() => {
              navigator.clipboard.writeText(roteiro.texto);
              alert("Mensagem copiada!");
            }}
          >
            📋 Copiar mensagem
          </button>
        </article>
      ))}
    </div>
  </>
)}

  {page === "ia" && (
  <>
    <Header
      title="IA Criativa"
      text="Gere prompts prontos para criar conteúdos da Papiro."
    />

    <div className="ia-panel">
      <label>O que você quer criar?</label>
      <select value={iaTipo} onChange={(e) => setIaTipo(e.target.value)}>
        <option>Legenda</option>
        <option>Roteiro para Reels</option>
        <option>Roteiro para TikTok</option>
        <option>Ideias de Stories</option>
        <option>Campanha promocional</option>
        <option>Descrição de produto</option>
        <option>Resposta para cliente</option>
      </select>

      <label>Produto ou tema</label>
      <input
        value={iaTema}
        onChange={(e) => setIaTema(e.target.value)}
        placeholder="Ex: planner floral, volta às aulas, Dia dos Professores..."
      />

      <label>Tom de voz</label>
      <input
        value={iaTom}
        onChange={(e) => setIaTom(e.target.value)}
      />

      <label>Detalhes importantes</label>
      <textarea
        value={iaDetalhes}
        onChange={(e) => setIaDetalhes(e.target.value)}
        placeholder="Ex: destacar Pix com 10% de desconto, entrega em Pindamonhangaba, produto limitado..."
      />

      <div className="prompt-box">
        <strong>Prompt pronto:</strong>

        <pre>{`Crie uma ${iaTipo} para a Papiro Store.

Tema/produto: ${iaTema || "[preencher tema]"}

Tom de voz: ${iaTom}

Detalhes importantes:
${iaDetalhes || "[preencher detalhes]"}

A Papiro Store é uma papelaria fofa, delicada, organizada, criativa e acolhedora. Use linguagem natural, encantadora e comercial, sem exageros. Inclua CTA quando fizer sentido.`}</pre>
      </div>

      <button
        onClick={() =>
          navigator.clipboard.writeText(`Crie uma ${iaTipo} para a Papiro Store.

Tema/produto: ${iaTema || "[preencher tema]"}

Tom de voz: ${iaTom}

Detalhes importantes:
${iaDetalhes || "[preencher detalhes]"}

A Papiro Store é uma papelaria fofa, delicada, organizada, criativa e acolhedora. Use linguagem natural, encantadora e comercial, sem exageros. Inclua CTA quando fizer sentido.`)
        }
      >
        📋 Copiar prompt
      </button>
    </div>
  </>
)}
      </main>
    </div>
  );
}

function Header({ title, text }) {
  return <section className="hero"><span>Papiro Studio</span><h2>{title}</h2><p>{text}</p></section>;
}

function Metric({ label, value }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong></article>;
}

function Card({ title, text, children }) {
  return <article className="card"><h3>{title}</h3><p>{text}</p>{children}</article>;
}