const ICON = {
  utensils:
    '<path d="M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3Zm0 0v7"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  receipt:
    '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9-6.2-3.3-6.2 3.3L7 14.2 2 9.3l6.9-1Z"/>',
  burger:
    '<path d="M4 11a8 6 0 0 1 16 0Z"/><path d="M3 14.5h18"/><path d="M3 17.5c2 1 4-1 6 0s4 1 6 0 4-1 6 0"/><path d="M4.5 20.5h15"/>',
  fries:
    '<path d="M6 10h12l-1.5 11h-9Z"/><path d="M8.5 10V4M11.5 10V3M14.5 10V4.5M17 10V6"/>',
  cup: '<path d="m6 8 1.75 12.3a2 2 0 0 0 2 1.7h4.5a2 2 0 0 0 2-1.7L18 8M5 8h14M7 15a6.5 6.5 0 0 1 5 0 6.5 6.5 0 0 0 5 0M12 8l1-6h2"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.500-4.800 10-10 10Z"/><path d="M2 21c0-3 1.850-5.400 5.100-6C9.500 14.500 12 13 13 12"/>',
  drumstick:
    '<circle cx="15" cy="9" r="6"/><path d="m11 13-6.500 6.500M3.500 17.500l3 3"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  ring: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.500"/>',
};
const ic = (n, s) =>
  `<svg class="ic" viewBox="0 0 24 24" width="${s || 30}" height="${s || 30}" aria-hidden="true">${ICON[n] || ICON.utensils}</svg>`;
const $ = (id) => document.getElementById(id),
  brl = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const C = JSON.parse(JSON.stringify(CONFIG));
const ALL = Object.fromEntries(
  C.menu.flatMap((c) => c.itens).map((i) => [i.id, i]),
);
const KEY = "app-cart";
let cart = {},
  view = "menu";
try {
  const s = JSON.parse(localStorage.getItem(KEY) || "{}");
  for (const k in s) if (ALL[k] && s[k] > 0) cart[k] = s[k];
} catch (e) {}
const count = () => Object.values(cart).reduce((a, b) => a + b, 0),
  sub = () => Object.entries(cart).reduce((a, [k, q]) => a + ALL[k].p * q, 0);
const slug = (s) =>
  "s-" +
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
function lum(h) {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.substr(i, 2), 16) / 255)
    .map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const on = (h) => (lum(h) > 0.4 ? "#111" : "#fff");
function theme() {
  const t = C.tema,
    r = document.documentElement.style;
  const dark =
    t.modo === "escuro" ||
    (t.modo === "auto" && matchMedia("(prefers-color-scheme:dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const ac = dark && lum(t.primaria) < 0.12 ? t.destaque : t.primaria;
  r.setProperty("--ac", ac);
  r.setProperty("--acx", on(ac));
  r.setProperty("--hl", t.destaque);
  r.setProperty("--hlx", on(t.destaque));
  document.querySelector("meta[name=theme-color]").content = ac;
}
function brand() {
  document.title = C.nome + " — Pedidos";
  $("nome").textContent = C.nome;
  $("logo").replaceChildren();
  $("nb").replaceChildren();
  for (const id of ["logo", "nb"]) {
    if (C.logoImagem) {
      const img = document.createElement("img");
      img.src = C.logoImagem;
      img.alt = "";
      img.className = "brand-image";
      $(id).append(img);
    } else {
      $(id).innerHTML = ic(C.logo, id === "logo" ? 42 : 24);
    }
  }
  {
    const s = document.createElement("span");
    s.textContent = C.nome;
    $("nb").append(s);
  }
  $("tipo").textContent = C.tipo || "";
  const ab = $("aberto");
  ab.textContent = C.aberto ? "Aberta" : "Fechada";
  ab.classList.toggle("ok", !!C.aberto);
  $("minimo").textContent = "Pedido mínimo: " + brl(C.pedidoMinimo || 0);
  const cp = $("capa");
  cp.onerror = () => {
    cp.hidden = true;
  };
  if (C.capa) {
    cp.src = C.capa;
    cp.hidden = false;
  }
}
function ctl(id) {
  const q = cart[id] || 0;
  return q
    ? `<button class="step" data-m="${id}" aria-label="Remover um">−</button><span class="qty">${q}</span><button class="step" data-a="${id}" aria-label="Adicionar mais um">+</button>`
    : `<button class="add" data-a="${id}" aria-label="Adicionar ${ALL[id].n}">+</button>`;
}
const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const rowc = (i, w) =>
  `<div class="ir${w ? " w" : ""}"><div class="it"><h3>${i.n}</h3><p>${i.d}</p><div class="pf"><span class="price">${brl(i.p)}</span><div class="ctl">${ctl(i.id)}</div></div></div><div class="ip">${i.top ? '<span class="tag">Mais pedido</span>' : ""}${ic(i.ic, 36)}${i.foto ? `<img src="${i.foto}" alt="${i.n}" loading="lazy" onerror="this.remove()">` : ""}</div></div>`;
function renderTop() {
  $("vant").innerHTML =
    C.vantagens && C.vantagens.length
      ? `<p class="vt">Suas vantagens</p><div class="hs">` +
        C.vantagens
          .map(
            (v) =>
              `<div class="vc"><span class="vi">${ic(v.i, 18)}</span><span>${v.t}</span></div>`,
          )
          .join("") +
        `</div>`
      : "";
  $("chips").innerHTML =
    `<button class="chip on" data-cat="todos">Todos</button>` +
    C.menu
      .map(
        (c) =>
          `<button class="chip" data-cat="${slug(c.cat)}">${c.cat}</button>`,
      )
      .join("");
  const bs = C.banners || [];
  $("ban").innerHTML = bs.length
    ? `<div class="bt hs" id="bt">` +
      bs
        .map(
          (b, i) =>
            `<div class="bn">${b.foto ? `<img src="${b.foto}" alt="" onerror="this.remove()">` : ""}<div class="bx"><h3>${b.t}</h3><p>${b.d}</p></div>${bs.length > 1 ? `<button class="go" data-banner="${i === bs.length - 1 ? i - 1 : i + 1}" aria-label="${i === bs.length - 1 ? "Banner anterior" : "Próximo banner"}">${i === bs.length - 1 ? "‹" : "›"}</button>` : ""}</div>`,
        )
        .join("") +
      `</div><div class="dots">` +
      bs.map((_, i) => `<i${i ? "" : ' class="on"'}></i>`).join("") +
      `</div>`
    : "";
  const bt = $("bt");
  if (bt)
    bt.onscroll = () => {
      const n = Math.round(bt.scrollLeft / (bt.firstChild.offsetWidth + 12));
      document
        .querySelectorAll(".dots i")
        .forEach((d, i) => d.classList.toggle("on", i === n));
    };
}
let catSel = "todos";
function renderMenu() {
  const all = catSel === "todos",
    tops = Object.values(ALL).filter((i) => i.top);
  $("ban").hidden = !all;
  $("menu").innerHTML =
    (all && tops.length
      ? `<h2 class="mh">Mais pedidos</h2><div class="hs">` +
        tops.map((i) => rowc(i, 1)).join("") +
        `</div>`
      : "") +
    C.menu
      .filter((c) => all || slug(c.cat) === catSel)
      .map(
        (c) =>
          `<h2 class="mh" id="${slug(c.cat)}">${c.cat}</h2>` +
          c.itens.map((i) => rowc(i)).join(""),
      )
      .join("");
}
function renderSearch() {
  const q = norm($("q").value.trim());
  const r = Object.values(ALL).filter((i) => norm(i.n + " " + i.d).includes(q));
  $("sres").innerHTML = r.length
    ? r.map((i) => rowc(i)).join("")
    : `<div class="empty">Nada encontrado.</div>`;
}
function renderCart() {
  const ids = Object.keys(cart),
    ent =
      (
        document.querySelector("input[name=tipo]:checked") || {
          value: "Entrega",
        }
      ).value === "Entrega";
  if (!ids.length) {
    $("v-cart").innerHTML =
      `<div class="empty">Seu pedido está vazio.<br>Escolha algo no cardápio.</div>`;
    return;
  }
  const keep = {
    nome: $("nome2") ? $("nome2").value : "",
    end: $("end") ? $("end").value : "",
    obs: $("obs") ? $("obs").value : "",
    pag: $("pag") ? $("pag").value : "",
    tr: $("troco") ? $("troco").value : "",
  };
  const total = sub() + (ent ? C.taxa : 0);
  $("v-cart").innerHTML =
    `<h2>Seu pedido</h2>` +
    ids
      .map(
        (k) =>
          `<div class="card"><div class="tile" style="width:48px;height:48px;font-size:1.5rem">${ic(ALL[k].ic, 24)}${ALL[k].foto ? `<img src="${ALL[k].foto}" alt="" onerror="this.remove()">` : ""}</div><div class="info"><h3>${ALL[k].n}</h3><span class="price">${brl(ALL[k].p * cart[k])}</span></div><div class="ctl">${ctl(k)}</div></div>`,
      )
      .join("") +
    `<div class="tot"><div class="line"><span>Subtotal</span><span>${brl(sub())}</span></div>${ent ? `<div class="line"><span>Taxa de entrega</span><span>${brl(C.taxa)}</span></div>` : ""}<div class="line"><span>Total</span><span>${brl(total)}</span></div></div>
<label class="l" for="nome2">Seu nome</label><input type="text" id="nome2" autocomplete="name">
<label class="l">Como receber?</label><div class="seg"><label><input type="radio" name="tipo" value="Entrega"${ent ? " checked" : ""}>Entrega</label><label><input type="radio" name="tipo" value="Retirada"${ent ? "" : " checked"}>Retirada</label></div>
${ent ? `<label class="l" for="end">Endereço completo</label><input type="text" id="end" autocomplete="street-address" placeholder="Rua, número, bairro">` : ""}
<label class="l" for="pag">Pagamento</label><select id="pag">${C.pagamentos.map((p) => `<option>${p}</option>`).join("")}</select>
<div id="trBox" hidden><label class="l" for="troco">Troco para quanto?</label><input type="text" id="troco" inputmode="decimal" placeholder="Ex.: 100"></div>
<label class="l" for="obs">Observações</label><textarea id="obs" rows="2" placeholder="Ex.: sem cebola"></textarea>
<p class="err" id="err" role="alert"></p><div class="fin"><button class="main" id="send">Finalizar pedido · ${brl(total)}</button><p class="hint">Você será levado ao WhatsApp para enviar o pedido.</p></div>`;
  $("nome2").value = keep.nome;
  if ($("end")) $("end").value = keep.end;
  $("obs").value = keep.obs;
  if (keep.pag) $("pag").value = keep.pag;
  $("troco").value = keep.tr;
  trToggle();
  document
    .querySelectorAll("input[name=tipo]")
    .forEach((r) => (r.onchange = renderCart));
  $("pag").onchange = trToggle;
  $("send").onclick = send;
}
function trToggle() {
  $("trBox").hidden = !/dinheiro/i.test($("pag").value);
}
function openDelivery() {
  $("delivery-time").textContent = C.tempo || "—";
  $("delivery-fee").textContent = brl(C.taxa);
  $("delivery").showModal();
}
$("delivery-close").onclick = () => $("delivery").close();
$("delivery").addEventListener("click", (e) => {
  if (e.target !== $("delivery")) return;
  const r = e.currentTarget.getBoundingClientRect();
  if (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  )
    e.currentTarget.close();
});
function bar() {
  const n = count();
  $("badge").hidden = !n;
  $("badge").textContent = n;
  $("mini").classList.toggle(
    "on",
    !!n && (view === "menu" || view === "search"),
  );
  $("mn").textContent = `Finalizar pedido · ${n} ${n === 1 ? "item" : "itens"}`;
  $("mt").textContent = brl(sub());
}
const DESK = matchMedia("(min-width:980px)");
function go(v) {
  if (DESK.matches && v === "cart") v = "menu";
  view = v;
  document
    .querySelectorAll(".view")
    .forEach((e) => e.classList.toggle("on", e.id === "v-" + v));
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.toggle("on", t.dataset.v === v));
  if (v === "cart" || DESK.matches) renderCart();
  if (v === "search") renderSearch();
  bar();
}
function upd() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch (e) {}
  renderMenu();
  if (view === "search") renderSearch();
  bar();
  if (view === "cart" || DESK.matches) renderCart();
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-a]"),
    m = e.target.closest("[data-m]"),
    g = e.target.closest(".chip"),
    nx = e.target.closest("[data-banner]"),
    t = e.target.closest(".tab");
  if (a) {
    cart[a.dataset.a] = (cart[a.dataset.a] || 0) + 1;
    upd();
  }
  if (m) {
    const k = m.dataset.m;
    cart[k] = (cart[k] || 1) - 1;
    if (cart[k] <= 0) delete cart[k];
    upd();
  }
  if (g) {
    catSel = g.dataset.cat;
    document
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.toggle("on", c === g));
    renderMenu();
    $("menu").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (nx) {
    const bt = $("bt");
    const target = bt.children[Number(nx.dataset.banner)];
    if (target)
      bt.scrollTo({
        left: target.offsetLeft - bt.firstElementChild.offsetLeft,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }
  if (t) go(t.dataset.v);
});
$("mini").onclick = () => go("cart");
function send() {
  const ent =
      document.querySelector("input[name=tipo]:checked").value === "Entrega",
    nome = $("nome2").value.trim(),
    end = $("end") ? $("end").value.trim() : "";
  if (!nome) {
    $("err").textContent = "Informe seu nome.";
    $("nome2").focus();
    return;
  }
  if (ent && !end) {
    $("err").textContent = "Informe o endereço para a entrega.";
    $("end").focus();
    return;
  }
  if (sub() < (C.pedidoMinimo || 0)) {
    $("err").textContent = "O pedido mínimo é " + brl(C.pedidoMinimo) + ".";
    return;
  }
  const total = sub() + (ent ? C.taxa : 0);
  const lines = [
    `\u{1F354} *NOVO PEDIDO • ${C.nome}*`,
    `Olá! Sou ${nome} e gostaria de fazer este pedido. \u{1F60A}`,
    "",
    "\u{1F6CD}\u{FE0F} *MEU PEDIDO*",
    ...Object.keys(cart).map(
      (k) => `• ${cart[k]}x ${ALL[k].n} — ${brl(ALL[k].p * cart[k])}`,
    ),
    "",
    ent ? "\u{1F6F5} *ENTREGA*" : "\u{1F3EA} *RETIRADA NO LOCAL*",
    `*Nome:* ${nome}`,
    ...(ent ? [`*Endereço:* ${end}`] : []),
    "",
    "\u{1F4B3} *PAGAMENTO*",
    $("pag").value,
    ...(/dinheiro/i.test($("pag").value) && $("troco").value.trim()
      ? [`*Troco para:* R$ ${$("troco").value.trim()}`]
      : []),
    ...($("obs").value.trim()
      ? ["", "\u{1F4DD} *OBSERVAÇÕES*", $("obs").value.trim()]
      : []),
    "",
    "\u{1F9FE} *RESUMO*",
    `Subtotal: ${brl(sub())}`,
    ent ? `Taxa de entrega: ${brl(C.taxa)}` : "Retirada: sem taxa de entrega",
    `*TOTAL: ${brl(total)}*`,
    "",
    "Podem confirmar o pedido e o tempo estimado, por favor? Obrigado! \u{1F64C}",
  ];
  const msg = lines.join("\n");
  lastUrl = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(lastUrl, "_blank", "noopener");
  showDone();
}
let lastUrl = "";
function showDone() {
  $("v-cart").innerHTML =
    `<div class="done">${ic("check", 64)}<h2>Pedido pronto!</h2><p>Abrimos o WhatsApp com o seu pedido. Falta só tocar em enviar por lá.</p><button class="main" id="again">Abrir WhatsApp de novo</button><button class="ghost" id="newo">Fazer novo pedido</button></div>`;
  $("again").onclick = () => window.open(lastUrl, "_blank", "noopener");
  $("newo").onclick = () => {
    cart = {};
    upd();
    go("menu");
  };
}
matchMedia("(prefers-color-scheme:dark)").addEventListener("change", theme);
theme();
brand();
document
  .querySelectorAll("[data-ic]")
  .forEach(
    (e) => (e.innerHTML = ic(e.dataset.ic, e.closest(".tab") ? 24 : 18)),
  );
renderTop();
renderMenu();
bar();
$("q").oninput = renderSearch;
if (DESK.matches) renderCart();
DESK.addEventListener("change", () => go(view));
$("info").onclick = openDelivery;
