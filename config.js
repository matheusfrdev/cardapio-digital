/* ==========================================================
   CONFIGURAÇÃO DO CLIENTE — é só este arquivo que você edita.
   1) Identidade ..... nome, slogan, logo (emoji), foto de capa
   2) Contato ........ whatsapp (55 + DDD + número), horário, endereço
   3) Tema ........... tema.primaria / tema.destaque (cores hex) e modo
   4) Cardápio ....... categorias e itens (id, nome, descrição, preço)
   Fotos: salve em /imagens com o MESMO nome do id do item
   (ex.: imagens/h1.png). Sem foto, aparece o ícone "ic" do item.
   Ícones: burger, fries, cup, leaf, drumstick, ring, utensils, gift, star, bike.
   (logo e vantagens também usam esses nomes)
   "top:true" mostra a etiqueta "Mais pedido" e põe o item em "Mais pedidos".
   vantagens e banners ficam logo abaixo da capa, no topo do arquivo.
   ========================================================== */
window.CONFIG={
 nome:"Fraga Burguers", slogan:"Hambúrguer artesanal e porções", logo:"burger", logoImagem:"imagens/fraga-mascote.png",
 capa:"imagens/fraga-banner.png", // foto de capa (opcional)
 tipo:"Hamburgueria", aberto:true, pedidoMinimo:20, tempo:"40 a 60 min",
 vantagens:[ // faixa "Suas vantagens" (i = emoji, t = texto)
  {i:"gift",t:"Primeiro pedido? Cadastre-se e ganhe um brinde!"},
  {i:"star",t:"Peça 5 vezes e ganhe um milkshake grátis"}],
 banners:[ // carrossel (a seta passa para o próximo banner; foto: imagens/c2.png...)
  {t:"Conheça o Combo X-Bacon",d:"Burger, batata e refri por um preço só",foto:"imagens/c2.png"},
  {t:"Milkshake gelado",d:"Chocolate, morango ou ovomaltine",foto:"imagens/b3.png"}],
 whatsapp:"5500000000000", taxa:6,
 horario:"Todos os dias, das 18h às 23h30", endereco:"Rua Nove, 99 — Centro",
 pagamentos:["Pix","Cartão (maquininha)","Dinheiro"],
 tema:{primaria:"#1f3fd1",destaque:"#ffc233",modo:"auto"},
 menu:[
 {cat:"Hambúrgueres",itens:[
  {id:"h1",foto:"imagens/h1.png",ic:"burger",n:"Clássico da Nove",d:"Burger 150 g, queijo prato, alface, tomate e maionese da casa.",p:26},
  {id:"h2",top:true,foto:"imagens/h2.png",ic:"burger",n:"X-Bacon Crocante",d:"Burger 150 g, bacon, cheddar cremoso e cebola caramelizada.",p:32},
  {id:"h3",top:true,foto:"imagens/h3.png",ic:"burger",n:"Duplo Cheddar",d:"Dois burgers de 120 g, dobro de cheddar e picles.",p:38},
  {id:"h4",foto:"imagens/h4.png",ic:"drumstick",n:"Frango Crocante",d:"Filé empanado, queijo, alface e molho de mostarda e mel.",p:28},
  {id:"h5",foto:"imagens/h5.png",ic:"leaf",n:"Veggie de Grão-de-bico",d:"Burger vegetal, rúcula, tomate seco e maionese de ervas.",p:29}]},
 {cat:"Combos",itens:[
  {id:"c1",foto:"imagens/c1.png",ic:"burger",n:"Combo Clássico",d:"Clássico da Nove, batata média e refrigerante lata.",p:39},
  {id:"c2",top:true,foto:"imagens/c2.png",ic:"burger",n:"Combo X-Bacon",d:"X-Bacon Crocante, batata média e refrigerante lata.",p:45}]},
 {cat:"Porções",itens:[
  {id:"p1",foto:"imagens/p1.png",ic:"fries",n:"Batata Frita",d:"Porção para dividir, com sal e orégano.",p:18},
  {id:"p2",foto:"imagens/p2.png",ic:"fries",n:"Batata com Cheddar e Bacon",d:"Batata coberta com cheddar cremoso e bacon.",p:26},
  {id:"p3",foto:"imagens/p3.png",ic:"ring",n:"Anéis de Cebola",d:"Empanados e crocantes, com molho barbecue.",p:20}]},
 {cat:"Bebidas",itens:[
  {id:"b1",foto:"imagens/b1.png",ic:"cup",n:"Refrigerante lata",d:"350 ml. Cola, guaraná ou laranja.",p:6},
  {id:"b2",foto:"imagens/b2.png",ic:"cup",n:"Suco natural",d:"300 ml. Laranja ou limão.",p:9},
  {id:"b3",foto:"imagens/b3.png",ic:"cup",n:"Milkshake",d:"400 ml. Chocolate, morango ou ovomaltine.",p:19}]}]
};
