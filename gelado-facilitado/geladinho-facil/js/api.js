/* ==========================================================
   api.js - "API" simulada: lê o catálogo de um arquivo JSON
   Na UC11 (back-end) esta função passa a chamar um servidor real.
   ========================================================== */

async function buscarCatalogo() {
  // Versão empacotada (um arquivo só) traz o catálogo embutido
  if (window.CATALOGO_EMBUTIDO) return JSON.parse(JSON.stringify(window.CATALOGO_EMBUTIDO));
  const resposta = await fetch('data/catalogo.json', { cache: 'no-store' });
  if (!resposta.ok) {
    throw new Error('Não foi possível carregar o cardápio.');
  }
  return resposta.json();
}
