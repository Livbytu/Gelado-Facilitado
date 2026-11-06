/* ==========================================================
   app.js - junta tela inicial, cardápio e painel em um único HTML
   sem endereço ou #inicio-sistema  -> tela inicial com os módulos
   #painel e #painel-<módulo>        -> painel da produtora
   qualquer outro (#cardapio...)     -> cardápio do cliente
   ========================================================== */

const DESCRICAO_MODULOS = {
  inicio: 'Resumo do dia e do mês',
  pedidos: 'Registrar, acompanhar e avisar pelo WhatsApp',
  fidelidade: 'Cartão de estrelas e brindes',
  producao: 'Receitas da semana e lista de compras',
  precificacao: 'Custo de cada sabor e preço sugerido',
  financeiro: 'Despesas e DRE do mês',
  relatorios: 'Planilhas para o Power BI e backup',
  configuracoes: 'WhatsApp, regra do brinde e dados do negócio'
};

function areaAtual() {
  const hash = location.hash.slice(1);
  if (hash === '' || hash === 'inicio-sistema') return 'inicio';
  if (hash === 'painel' || hash.startsWith('painel-')) return 'painel';
  return 'vitrine';
}

function montarAtalhos() {
  document.querySelector('#atalhos-modulos').innerHTML = MODULOS.map(m => `
    <a class="modulo" href="#painel-${m.id}">
      ${icone(m.id)}
      <span>${m.titulo}</span>
      <small>${DESCRICAO_MODULOS[m.id] || ''}</small>
    </a>`).join('');
}

function rotear() {
  const area = areaAtual();
  document.querySelector('#modo-inicio').hidden = area !== 'inicio';
  document.querySelector('#modo-vitrine').hidden = area !== 'vitrine';
  document.querySelector('#modo-painel').hidden = area !== 'painel';
  document.body.className = { inicio: 'tela-inicial', vitrine: 'vitrine', painel: 'painel' }[area];

  if (area === 'painel') {
    if (CATALOGO) navegar();
  } else {
    document.title = area === 'inicio' ? 'Geladinho Fácil' : 'Geladinho Fácil | Cardápio';
    if (location.hash !== '#seu-pedido' && location.hash !== '#catalogo') window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', rotear);
montarAtalhos();
rotear();
iniciarPainel().then(rotear);
