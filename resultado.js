// Proxy do arquivo oficial do TSE (2º turno 2026, Presidente).
// Evita problemas de CORS e deixa a Vercel guardar o resultado em cache por 15 s,
// assim milhares de visitantes geram poucas requisições ao TSE (limite: 100 req/s por IP).
const URL_TSE =
  "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json";

module.exports = async (req, res) => {
  try {
    const r = await fetch(URL_TSE, { headers: { "user-agent": "Mozilla/5.0 apuracao-painel" } });
    if (!r.ok) throw new Error("TSE respondeu HTTP " + r.status);
    const dados = await r.json();
    res.setHeader("Cache-Control", "public, s-maxage=15, stale-while-revalidate=30");
    res.status(200).json(dados);
  } catch (e) {
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ erro: String(e.message || e) });
  }
};
