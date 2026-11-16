/* Tresalba — one script drives both versions.
   promo.html sets window.SHOP_ENABLED = false (brand site only).
   index.html sets window.SHOP_ENABLED = true (prices, cart, checkout). */
(function () {
  "use strict";
  var D = window.TRESALBA;
  var SHOP = !!window.SHOP_ENABLED;
  var app = document.getElementById("app");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
  var money = function (n) { return new Intl.NumberFormat("en-IE", { style: "currency", currency: D.currency }).format(n); };
  var product = function (id) { return D.products.filter(function (p) { return p.id === id; })[0]; };
  var cocktail = function (id) { return D.cocktails.filter(function (c) { return c.id === id; })[0]; };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  var cart = store.get("tresalba-cart", {});

  /* ---------- images: fall back gracefully if a photo is missing ---------- */
  var FALLBACK = "assets/img/bottle-solera.jpg";
  var TINT = {
    "blanco-seco": "grayscale(1) brightness(1.3) contrast(1.05)",
    "dorado-5": "hue-rotate(14deg) saturate(1.35) brightness(1.3)",
    "especiado": "hue-rotate(-16deg) saturate(1.25)",
    "gran-reserva-23": "saturate(0.75) brightness(0.8) contrast(1.2)"
  };
  window.imgFail = function (el) {
    var tint = el.getAttribute("data-tint");
    if (tint && !el.getAttribute("data-tried")) {
      el.setAttribute("data-tried", "1"); el.style.filter = tint; el.src = FALLBACK;
    } else { el.remove(); }
  };
  function img(src, alt, id) {
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" onerror="imgFail(this)"' +
      (id && TINT[id] ? ' data-tint="' + TINT[id] + '"' : "") + ">";
  }

  /* ---------- shared pieces ---------- */
  function card(p) {
    return '<article class="card">' +
      '<a href="#rum-' + p.id + '" class="ph" data-cursor>' +
        '<span class="label card-no">No. ' + p.no + "</span>" +
        (p.limited ? '<span class="badge">Limited</span>' : "") +
        img(p.img, "Bottle of Tresalba " + p.name, p.id) +
      "</a>" +
      '<div class="card-body"><div><h3><a href="#rum-' + p.id + '">' + p.name + "</a></h3>" +
        "<p>" + p.style + " · " + p.abv + "% · " + p.size + "</p></div>" +
        (SHOP ? '<span class="price">' + money(p.price) + "</span>" : "") +
      "</div>" +
      '<div class="card-actions">' +
        (SHOP ? '<button class="btn small solid" data-act="add" data-id="' + p.id + '">Add to cart</button>' : "") +
        '<a class="btn small" href="#rum-' + p.id + '">' + (SHOP ? "Details" : "Discover") + "</a>" +
      "</div></article>";
  }

  /* ---------- views ---------- */
  function viewHome() {
    var hero = product("solera-12");
    var marquee = ["Solera aged", "Bourbon & sherry oak", "Small batch", "Sierra Nevada, Colombia", "Est. 1921"];
    var mq = marquee.concat(marquee).map(function (t) { return "<span>" + t + "</span><span><i>✦</i></span>"; }).join("");
    var storyWords = "Three generations. Three tiers of oak. One rum that has never left the cellar empty since 1921."
      .split(" ").map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");

    return '' +
    '<section class="hero" id="top">' +
      '<div class="hero-media ph">' + img(hero.img, "A bottle of Tresalba Solera 12 on wet black stone") + "</div>" +
      '<div class="hero-top"><span class="label">Ron de solera<br>Sierra Nevada, Colombia</span><span class="label" style="text-align:right">Casa fundada<br>1921</span></div>' +
      '<div class="hero-body">' +
        '<div class="wordmark-clip"><h1 class="wordmark"><span>Tresalba</span></h1></div>' +
        '<div class="hero-foot">' +
          "<p>Solera rum, aged slowly in bourbon and sherry oak at the foot of the Sierra Nevada.</p>" +
          '<div class="hero-cta">' +
            (SHOP ? '<a class="btn solid" href="#shop">Shop the rums</a>' : '<button class="btn solid" data-act="go" data-to="collection">Discover the rums</button>') +
            '<button class="btn" data-act="go" data-to="story">Our story</button>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    '<div class="marquee" aria-hidden="true"><div class="marquee-track">' + mq + mq + "</div></div>" +

    '<section class="wrap" id="story">' +
      '<span class="label gold">01 — The house</span>' +
      '<p class="story-text" style="margin-top:28px" data-words>' + storyWords + "</p>" +
      '<div class="story-grid">' +
        '<div class="ph rv">' + img("assets/img/cellar.jpg", "Rows of oak barrels in the Tresalba solera cellar") + "</div>" +
        '<div class="rv"><p class="lede">Tresalba means three dawns: the three mornings the founder, Aurelio Montaña, is said to have waited for his first cask to be ready. We still work the way he did. Column and pot still rum, married young, then left to move down through a solera of American bourbon barrels and Spanish sherry butts.</p>' +
          '<div class="stats"><div><b>1921</b><span>Solera first laid down</span></div><div><b>3</b><span>Tiers of oak</span></div><div><b>23</b><span>Years in the oldest row</span></div></div>' +
        "</div>" +
      "</div>" +
    "</section>" +

    '<section class="hscroll" id="collection"><div class="hscroll-pin">' +
      '<div class="hscroll-head"><div><span class="label gold">02 — The collection</span><h2 class="serif h-lg" style="margin-top:14px">Five rums, <em>one cellar</em></h2></div>' +
        (SHOP ? '<a class="link" href="#shop">View shop</a>' : '<span class="label">Scroll</span>') + "</div>" +
      '<div class="hscroll-track">' + D.products.map(card).join("") + "</div>" +
      '<div class="progress"><i></i></div>' +
    "</div></section>" +

    '<section class="wrap" id="craft">' +
      '<div class="sec-head"><span class="label gold">03 — How rum is made</span><h2 class="serif h-lg">From cane <em>to cask</em></h2></div>' +
      '<div class="craft">' +
        '<div class="craft-media ph">' + D.craft.map(function (s, i) { return '<img src="' + s.img + '" alt="' + s.title + '" class="' + (i === 0 ? "on" : "") + '" onerror="this.remove()">'; }).join("") +
          '<span class="count">01</span></div>' +
        '<div class="steps">' + D.craft.map(function (s) {
          return '<div class="step" data-step><span class="label">Step ' + s.no + "</span><h3>" + s.title + "</h3><p>" + s.body + "</p>" +
            '<div class="fact"><b>' + s.fact + '</b><span class="label">' + s.factLabel + "</span></div></div>";
        }).join("") + "</div>" +
      "</div>" +
    "</section>" +

    '<section class="wrap" id="styles" style="background:var(--bg-2)">' +
      '<div class="sec-head"><span class="label gold">04 — Styles & regions</span><div><h2 class="serif h-lg">A field guide <em>to rum</em></h2><p class="lede" style="margin-top:22px">Rum has no single rulebook. What is in the glass depends on the raw material, the still, the climate and the colonial tradition the island or country inherited.</p></div></div>' +
      '<div class="styles-list">' + D.styles.map(function (s, i) {
        return '<div class="style-row' + (i === 3 ? " open" : "") + '"><button data-act="style" aria-expanded="' + (i === 3) + '"><span class="label">0' + (i + 1) + "</span><h3>" + s.name + '</h3><span class="region">' + s.region + '</span><span class="plus">+</span></button>' +
          '<div class="style-more"><div><div class="inner"><div class="best"><span class="label">' + s.alt + "</span><span>" + s.best + "</span></div><p>" + s.body + "</p></div></div></div></div>";
      }).join("") + "</div>" +
    "</section>" +

    '<section class="wrap" id="cocktails">' +
      '<div class="sec-head"><span class="label gold">05 — Serves</span><h2 class="serif h-lg">Four drinks, <em>made properly</em></h2></div>' +
      '<div class="cocktails">' + D.cocktails.map(function (c) {
        return '<button class="ct rv" data-act="cocktail" data-id="' + c.id + '" data-cursor><div class="ph">' + img(c.img, c.name) + "</div><h3>" + c.name + "</h3><p>" + product(c.rum).name + " · " + c.glass + " · " + c.time + "</p></button>";
      }).join("") + "</div>" +
    "</section>" +

    '<section class="band"><span class="label gold">' + (SHOP ? "Delivered across the EU" : "The collection") + '</span><h2 class="serif h-xl">Pour slowly.</h2>' +
      (SHOP ? '<a class="btn solid" href="#shop">Shop the collection</a>' : '<button class="btn solid" data-act="go" data-to="collection">See the collection</button>') +
    "</section>";
  }

  function viewProduct(id) {
    var p = product(id);
    if (!p) return viewMissing();
    var c = cocktail(p.cocktail);
    return '<div class="page"><div class="crumb label"><a href="#home">Home</a><span>/</span>' +
      (SHOP ? '<a href="#shop">Shop</a>' : '<button class="label" data-act="go" data-to="collection">Collection</button>') + "<span>/</span><span style=\"color:var(--ink)\">" + p.name + "</span></div>" +
      '<div class="pdp">' +
        '<div class="ph">' + (p.limited ? '<span class="badge">Limited</span>' : "") + img(p.img, "Bottle of Tresalba " + p.name, p.id) + "</div>" +
        "<div>" +
          '<span class="label gold">No. ' + p.no + " — " + p.style + "</span>" +
          '<h1 class="serif h-xl">' + p.name + "</h1>" +
          '<p class="serif h-md" style="color:var(--muted)">' + p.tagline + "</p>" +
          (SHOP ? '<div class="buy"><span class="price">' + money(p.price) + '</span>' +
            '<div class="qty"><button data-act="pq" data-d="-1" aria-label="Decrease quantity">−</button><span id="pq">1</span><button data-act="pq" data-d="1" aria-label="Increase quantity">+</button></div>' +
            '<button class="btn solid" data-act="add" data-id="' + p.id + '" data-pq>Add to cart</button></div>' +
            '<p class="fine">Free EU delivery over ' + money(D.shipping.freeFrom) + ". Adult signature required on delivery.</p>" : "") +
          '<div class="specs"><div><span class="label">Age</span><b>' + p.age.replace("Solera, ", "") .replace(", charcoal filtered", "").replace("Aged rum base, ", "") + '</b></div><div><span class="label">Strength</span><b>' + p.abv + '%</b></div><div><span class="label">Size</span><b>' + p.size + '</b></div><div><span class="label">Origin</span><b>Colombia</b></div></div>' +
          '<p class="lede" style="max-width:56ch;color:var(--ink);opacity:.88">' + p.desc + "</p>" +
          '<ul class="notes" style="margin-top:30px">' +
            '<li><span class="label">Nose</span><span>' + p.notes.nose + "</span></li>" +
            '<li><span class="label">Palate</span><span>' + p.notes.palate + "</span></li>" +
            '<li><span class="label">Finish</span><span>' + p.notes.finish + "</span></li>" +
            '<li><span class="label">Serve</span><span>' + p.serve + "</span></li>" +
          "</ul>" +
          '<button class="pair" data-act="cocktail" data-id="' + c.id + '"><div class="ph">' + img(c.img, c.name) + '</div><div><span class="label gold">Signature serve</span><h3 class="serif h-md" style="margin:6px 0">' + c.name + '</h3><span class="fine">' + c.blurb + " View recipe →</span></div></button>" +
        "</div>" +
      "</div>" +
      '<div style="margin-top:clamp(70px,12vh,140px)"><span class="label gold">More from the cellar</span><div class="grid" style="margin-top:28px">' +
        D.products.filter(function (x) { return x.id !== p.id; }).slice(0, 3).map(card).join("") + "</div></div></div>";
  }

  var shopFilter = "all";
  function viewShop() {
    var chips = [["all", "All rums"], ["sipping", "For sipping"], ["mixing", "For cocktails"], ["limited", "Limited"]];
    var list = D.products.filter(function (p) { return shopFilter === "all" || p.tags.indexOf(shopFilter) > -1; });
    return '<div class="page"><span class="label gold">The shop</span><h1 class="serif h-xl" style="margin:14px 0 36px">All <em>rums</em></h1>' +
      '<div class="filters">' + chips.map(function (c) { return '<button class="chip' + (c[0] === shopFilter ? " on" : "") + '" data-act="filter" data-f="' + c[0] + '">' + c[1] + "</button>"; }).join("") + "</div>" +
      '<div class="grid">' + list.map(card).join("") + "</div></div>";
  }

  /* ---------- cart ---------- */
  function cartLines() { return Object.keys(cart).map(function (id) { return { p: product(id), q: cart[id] }; }).filter(function (l) { return l.p && l.q > 0; }); }
  function cartCount() { return cartLines().reduce(function (n, l) { return n + l.q; }, 0); }
  function totals(method) {
    var sub = cartLines().reduce(function (n, l) { return n + l.q * l.p.price; }, 0);
    var ship = !sub ? 0 : method === "express" ? D.shipping.express : sub >= D.shipping.freeFrom ? 0 : D.shipping.standard;
    return { sub: sub, ship: ship, total: sub + ship };
  }
  function saveCart() {
    store.set("tresalba-cart", cart);
    var n = cartCount();
    $$("[data-count]").forEach(function (e) { e.textContent = n; });
    renderDrawer();
  }
  function addToCart(id, q) { cart[id] = clamp((cart[id] || 0) + q, 0, 24); if (!cart[id]) delete cart[id]; saveCart(); }

  function renderDrawer() {
    var body = $("#drawer-body"), foot = $("#drawer-foot");
    if (!body) return;
    var lines = cartLines(), t = totals("standard");
    if (!lines.length) {
      body.innerHTML = '<div class="empty"><p class="serif">Your cart is empty</p><p>The cellar is open.</p></div>';
      foot.innerHTML = '<a class="btn block" href="#shop" data-act="close">Browse the rums</a>';
      return;
    }
    body.innerHTML = lines.map(function (l) {
      return '<div class="line"><div class="ph">' + img(l.p.img, l.p.name, l.p.id) + "</div><div><h4>" + l.p.name + '</h4><span class="fine">' + l.p.size + " · " + l.p.abv + '%</span><button class="rm" data-act="rm" data-id="' + l.p.id + '">Remove</button></div>' +
        '<div style="text-align:right"><div class="qty"><button data-act="qty" data-id="' + l.p.id + '" data-d="-1" aria-label="Decrease">−</button><span>' + l.q + '</span><button data-act="qty" data-id="' + l.p.id + '" data-d="1" aria-label="Increase">+</button></div><div style="margin-top:8px">' + money(l.q * l.p.price) + "</div></div></div>";
    }).join("");
    var left = D.shipping.freeFrom - t.sub;
    foot.innerHTML = '<span class="fine">' + (left > 0 ? money(left) + " away from free delivery" : "You have free standard delivery") + '</span><div class="ship-bar"><i style="width:' + clamp(t.sub / D.shipping.freeFrom * 100, 0, 100) + '%"></i></div>' +
      '<div class="sum"><span>Subtotal</span><span>' + money(t.sub) + '</span></div><div class="sum"><span>Delivery</span><span>' + (t.ship ? money(t.ship) : "Free") + "</span></div>" +
      '<div class="sum total"><span>Total</span><span>' + money(t.total) + '</span></div><a class="btn solid block" href="#checkout" data-act="close">Checkout</a>';
  }

  /* ---------- checkout ---------- */
  var shipMethod = "standard";
  function summaryHTML() {
    var t = totals(shipMethod);
    return '<span class="label gold">Your order</span>' + cartLines().map(function (l) {
      return '<div class="sum" style="color:var(--ink);padding:10px 0;border-bottom:1px solid var(--line)"><span>' + l.q + " × " + l.p.name + "</span><span>" + money(l.q * l.p.price) + "</span></div>";
    }).join("") + '<div class="sum" style="margin-top:12px"><span>Subtotal</span><span>' + money(t.sub) + '</span></div><div class="sum"><span>Delivery</span><span>' + (t.ship ? money(t.ship) : "Free") + '</span></div><div class="sum total"><span>Total</span><span>' + money(t.total) + '</span></div><span class="fine">Prices include VAT and excise duty.</span>';
  }
  function viewCheckout() {
    if (!cartLines().length) return '<div class="page"><div class="empty"><p class="serif">Nothing to check out yet</p><p style="margin-bottom:24px">Add a bottle first.</p><a class="btn solid" href="#shop">Go to the shop</a></div></div>';
    var f = function (name, label, type, cls, extra) { return '<div class="field ' + (cls || "") + '"><label for="f-' + name + '">' + label + '</label><input id="f-' + name + '" name="' + name + '" type="' + (type || "text") + '" ' + (extra || "") + "><small></small></div>"; };
    var countries = ["Austria", "Belgium", "Czechia", "Denmark", "France", "Germany", "Ireland", "Italy", "Netherlands", "Poland", "Portugal", "Spain", "Sweden"];
    return '<div class="page"><div class="crumb label"><a href="#shop">Shop</a><span>/</span><span style="color:var(--ink)">Checkout</span></div><h1 class="serif h-lg" style="margin-bottom:44px">Checkout</h1>' +
      '<div class="checkout"><form id="checkout" novalidate>' +
        "<fieldset><legend>Contact</legend><div class=\"fields\">" + f("email", "Email", "email", "full", 'autocomplete="email"') + "</div></fieldset>" +
        "<fieldset><legend>Delivery address</legend><div class=\"fields\">" + f("first", "First name", "text", "", 'autocomplete="given-name"') + f("last", "Last name", "text", "", 'autocomplete="family-name"') + f("address", "Street and number", "text", "full", 'autocomplete="street-address"') + f("zip", "Postcode", "text", "", 'autocomplete="postal-code"') + f("city", "City", "text", "", 'autocomplete="address-level2"') +
          '<div class="field full"><label for="f-country">Country</label><select id="f-country" name="country">' + countries.map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</select><small></small></div></div></fieldset>" +
        "<fieldset><legend>Delivery</legend>" +
          '<label class="opt"><input type="radio" name="ship" value="standard" checked><span>Standard, 3–5 working days<small>Free over ' + money(D.shipping.freeFrom) + '</small></span><b id="std-price"></b></label>' +
          '<label class="opt"><input type="radio" name="ship" value="express"><span>Express, next working day<small>Order before 14:00</small></span><b>' + money(D.shipping.express) + "</b></label></fieldset>" +
        "<fieldset><legend>Payment</legend><div class=\"demo-note\">Demo checkout. No payment details are collected and no money is taken. Connect a payment provider to go live.</div>" +
          '<label class="opt"><input type="radio" name="pay" value="Card" checked><span>Card<small>Visa, Mastercard, Amex</small></span></label>' +
          '<label class="opt"><input type="radio" name="pay" value="PayPal"><span>PayPal</span></label>' +
          '<label class="opt"><input type="radio" name="pay" value="Bank transfer"><span>Bank transfer</span></label></fieldset>' +
        '<label class="check" id="age-check"><input type="checkbox" name="age"><span>I confirm I am of legal drinking age in my country and that an adult will sign for the delivery.</span></label>' +
        '<button class="btn solid block" type="submit">Place demo order</button>' +
      '</form><aside id="summary">' + summaryHTML() + "</aside></div></div>";
  }
  function submitCheckout(form) {
    var ok = true, v = {};
    var rules = { email: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Enter a valid email address"], first: [/\S/, "Enter your first name"], last: [/\S/, "Enter your last name"], address: [/\S.{3,}/, "Enter your street and number"], zip: [/^[A-Za-z0-9 -]{3,10}$/, "Enter a valid postcode"], city: [/\S/, "Enter your city"] };
    Object.keys(rules).forEach(function (k) {
      var el = form.elements[k], good = rules[k][0].test(el.value.trim());
      el.parentNode.classList.toggle("bad", !good); $("small", el.parentNode).textContent = good ? "" : rules[k][1];
      v[k] = el.value.trim(); if (!good && ok) { el.focus(); } ok = ok && good;
    });
    var age = form.elements.age.checked; $("#age-check").classList.toggle("bad", !age); ok = ok && age;
    if (!ok) { toast("Please check the highlighted fields"); return; }
    var t = totals(shipMethod);
    store.set("tresalba-order", {
      no: "TA-" + String(Date.now()).slice(-6), email: v.email, name: v.first + " " + v.last,
      address: v.address + ", " + v.zip + " " + v.city + ", " + form.elements.country.value,
      ship: shipMethod, pay: form.elements.pay.value, totals: t,
      lines: cartLines().map(function (l) { return { name: l.p.name, q: l.q, sum: l.q * l.p.price }; })
    });
    cart = {}; saveCart(); location.hash = "#order";
  }
  function viewOrder() {
    var o = store.get("tresalba-order", null);
    if (!o) return viewMissing();
    return '<div class="page"><div class="confirm"><span class="label gold">Order ' + o.no + '</span><h1 class="serif h-lg">Gracias, <em>' + o.name.split(" ")[0].replace(/[<>&"]/g, "") + '</em>.</h1><p class="lede" style="margin:0 auto">This was a demo order, so nothing has been charged or shipped. On a live shop a confirmation would now go to your email.</p>' +
      '<div class="box">' + o.lines.map(function (l) { return '<div class="sum" style="color:var(--ink)"><span>' + l.q + " × " + l.name + "</span><span>" + money(l.sum) + "</span></div>"; }).join("") +
      '<div class="sum"><span>Delivery (' + o.ship + ")</span><span>" + (o.totals.ship ? money(o.totals.ship) : "Free") + '</span></div><div class="sum total"><span>Total</span><span>' + money(o.totals.total) + '</span></div><span class="fine">Payment method: ' + o.pay + " (demo)</span></div>" +
      '<a class="btn" href="#home">Back to the house</a></div></div>';
  }
  function viewMissing() { return '<div class="page"><div class="empty"><p class="serif">This page has evaporated</p><p style="margin-bottom:24px">The angels took their share.</p><a class="btn" href="#home">Back home</a></div></div>'; }

  /* ---------- chrome: nav, footer, overlays ---------- */
  function chrome() {
    var links = [["story", "Story"], ["collection", "Collection"], ["craft", "Craft"], ["styles", "Styles"], ["cocktails", "Serves"]];
    var nav = document.createElement("header");
    nav.className = "nav"; nav.id = "nav";
    nav.innerHTML = '<a class="brand" href="#home" aria-label="Tresalba home">TRESALBA<sup>RON</sup></a>' +
      '<nav class="nav-links" id="nav-links">' + links.map(function (l) { return '<button data-act="go" data-to="' + l[0] + '">' + l[1] + "</button>"; }).join("") + (SHOP ? '<a href="#shop" data-act="menu-close">Shop</a>' : "") + "</nav>" +
      '<div class="nav-right">' + (SHOP ? '<button class="cart-btn" data-act="cart" aria-label="Open cart">Cart <b data-count>0</b></button>' : "") + '<button class="menu-btn" data-act="menu">Menu</button></div>';
    document.body.insertBefore(nav, app);

    var foot = document.createElement("footer");
    foot.innerHTML = '<div class="foot-grid"><div><p class="serif h-md" style="max-width:14ch">Aged where the mountains meet the sea.</p></div>' +
      "<div><h4>Explore</h4><ul>" + links.map(function (l) { return '<li><button data-act="go" data-to="' + l[0] + '">' + l[1] + "</button></li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + (SHOP ? "Shop" : "The rums") + "</h4><ul>" + D.products.map(function (p) { return '<li><a href="#rum-' + p.id + '">' + p.name + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>Casa Tresalba</h4><ul><li>Hacienda Las Albas</li><li>Sierra Nevada, Colombia</li><li>hola@tresalba.example</li></ul></div></div>" +
      '<div class="foot-mark" aria-hidden="true">TRESALBA</div>' +
      '<div class="legal"><span>© 2026 Casa Tresalba. A fictional brand created for this concept.</span><span>Enjoy responsibly. Not for sale to anyone under the legal drinking age.</span></div>';
    document.body.appendChild(foot);

    var extra = document.createElement("div");
    extra.innerHTML = '<div class="scrim" id="scrim" data-act="close"></div>' +
      (SHOP ? '<aside class="drawer" id="drawer" aria-label="Cart"><div class="drawer-head"><h2>Your cart</h2><button class="x" data-act="close">Close</button></div><div class="drawer-body" id="drawer-body"></div><div class="drawer-foot" id="drawer-foot"></div></aside>' : "") +
      '<div class="modal" id="modal" role="dialog" aria-modal="true"><div class="modal-card" id="modal-card"></div></div>' +
      '<div class="toast" id="toast" role="status"></div><div class="cursor" id="cursor"></div>';
    document.body.appendChild(extra);

    var ok = false; try { ok = sessionStorage.getItem("tresalba-age") === "yes"; } catch (e) { /* ignore */ }
    if (!ok) {
      var gate = document.createElement("div");
      gate.className = "gate"; gate.id = "gate";
      gate.innerHTML = '<div><span class="brand">TRESALBA<sup>RON</sup></span><h2 class="serif">Are you of legal<br><em>drinking age?</em></h2><p>You must be old enough to buy alcohol in your country to enter this site.</p><div class="row"><button class="btn solid" data-act="gate-yes">Yes, enter</button><button class="btn" data-act="gate-no">No</button></div></div>';
      document.body.appendChild(gate); document.body.classList.add("lock");
    }
  }

  var toastTimer;
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("on"); }, 2400); }
  function closeAll() { ["#scrim", "#drawer", "#modal"].forEach(function (s) { var e = $(s); if (e) e.classList.remove("on"); }); if (!$("#gate") || $("#gate").classList.contains("off")) document.body.classList.remove("lock"); }
  function openCart() { renderDrawer(); $("#scrim").classList.add("on"); $("#drawer").classList.add("on"); document.body.classList.add("lock"); }
  function openCocktail(id) {
    var c = cocktail(id), p = product(c.rum);
    $("#modal-card").innerHTML = '<div class="ph">' + img(c.img, c.name) + '</div><div class="modal-text"><div style="display:flex;justify-content:space-between;gap:12px"><span class="label gold">' + c.glass + " · " + c.time + '</span><button class="x" data-act="close">Close</button></div><h3>' + c.name + "</h3><p>" + c.blurb + "</p><ul>" + c.ingredients.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul><p>" + c.method + "</p>" +
      (SHOP ? '<button class="btn solid" data-act="add" data-id="' + p.id + '">Add ' + p.name + " · " + money(p.price) + "</button>" : '<a class="btn" href="#rum-' + p.id + '" data-act="close">Discover ' + p.name + "</a>") + "</div>";
    $("#scrim").classList.add("on"); $("#modal").classList.add("on"); document.body.classList.add("lock");
  }

  /* ---------- router ---------- */
  var pendingScroll = null, io;
  function route() {
    var h = location.hash.replace(/^#\/?/, ""); if (h === "home") h = ""; var parts = h.indexOf("rum-") === 0 ? ["rum", h.slice(4)] : [h];
    $("#nav-links").classList.remove("open"); var mb = $(".menu-btn"); if (mb) mb.textContent = "Menu";
    document.body.classList.remove("lock"); closeAll();
    var html;
    if (!h) html = viewHome();
    else if (parts[0] === "rum") html = viewProduct(parts[1]);
    else if (SHOP && parts[0] === "shop") html = viewShop();
    else if (SHOP && parts[0] === "checkout") html = viewCheckout();
    else if (SHOP && parts[0] === "order") html = viewOrder();
    else html = viewMissing();
    app.innerHTML = html;
    document.body.setAttribute("data-view", h ? parts[0] : "home");
    if (pendingScroll && !h) { var t = pendingScroll; pendingScroll = null; requestAnimationFrame(function () { scrollToId(t, true); }); }
    else window.scrollTo(0, 0);
    afterRender();
  }
  function scrollToId(id, instant) { var el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (id === "collection" ? 0 : 40), behavior: instant ? "auto" : "smooth" }); }
  function afterRender() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    $$(".rv").forEach(function (e) { io.observe(e); });
    var std = $("#std-price"); if (std) { var t = totals("standard"); std.textContent = t.ship ? money(t.ship) : "Free"; }
    measure(); onScroll();
  }

  /* ---------- scroll choreography ---------- */
  var travel = 0, lastY = 0, ticking = false;
  var narrow = function () { return window.matchMedia("(max-width: 860px), (max-height: 620px)").matches; };
  function measure() {
    var sec = $(".hscroll"), track = $(".hscroll-track");
    if (!sec || !track) return;
    if (narrow()) { track.style.transform = ""; return; }
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    sec.style.setProperty("--travel", travel + "px");
  }
  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight, nav = $("#nav");
    nav.classList.toggle("solid", y > 40);
    nav.classList.toggle("hide", y > lastY && y > vh * 0.6 && !$("#nav-links").classList.contains("open"));
    lastY = y;

    var heroImg = $(".hero-media img");
    if (heroImg && y < vh * 1.2) heroImg.style.transform = "scale(" + (1.08 + y / vh * 0.12) + ") translateY(" + y * 0.12 + "px)";

    var words = $("[data-words]");
    if (words) {
      var r = words.getBoundingClientRect(), ws = $$(".w", words);
      var prog = clamp((vh * 0.85 - r.top) / (vh * 0.55 + r.height), 0, 1), n = Math.round(prog * ws.length);
      ws.forEach(function (w, i) { w.classList.toggle("lit", i < n); });
    }

    var sec = $(".hscroll"), track = $(".hscroll-track");
    if (sec && track && !narrow()) {
      var p = clamp(-sec.getBoundingClientRect().top / (travel || 1), 0, 1);
      track.style.transform = "translate3d(" + -p * travel + "px,0,0)";
      $(".progress i").style.transform = "scaleX(" + p + ")";
    }

    var steps = $$("[data-step]");
    if (steps.length) {
      var best = 0, bestD = Infinity;
      steps.forEach(function (s, i) { var b = s.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - vh / 2); if (d < bestD) { bestD = d; best = i; } });
      steps.forEach(function (s, i) { s.classList.toggle("on", i === best); });
      $$(".craft-media img").forEach(function (im) { im.classList.toggle("on", im.getAttribute("alt") === D.craft[best].title); });
      var cnt = $(".craft-media .count"); if (cnt) cnt.textContent = D.craft[best].no;
    }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", function () { measure(); onScroll(); });
  window.addEventListener("load", function () { measure(); onScroll(); });

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]"); if (!el) return;
    var act = el.getAttribute("data-act"), id = el.getAttribute("data-id");
    if (act === "go") {
      var to = el.getAttribute("data-to"); $("#nav-links").classList.remove("open"); document.body.classList.remove("lock"); var mb = $(".menu-btn"); if (mb) mb.textContent = "Menu";
      if (document.body.getAttribute("data-view") === "home") scrollToId(to); else { pendingScroll = to; location.hash = "#home"; }
    } else if (act === "add") {
      var q = el.hasAttribute("data-pq") ? parseInt($("#pq").textContent, 10) : 1;
      addToCart(id, q); closeAll(); toast(product(id).name + " added to cart"); openCart();
    } else if (act === "cart") openCart();
    else if (act === "close") closeAll();
    else if (act === "qty") addToCart(id, parseInt(el.getAttribute("data-d"), 10));
    else if (act === "rm") { delete cart[id]; saveCart(); }
    else if (act === "pq") { var s = $("#pq"); s.textContent = clamp(parseInt(s.textContent, 10) + parseInt(el.getAttribute("data-d"), 10), 1, 12); }
    else if (act === "cocktail") openCocktail(id);
    else if (act === "style") { var row = el.parentNode, open = row.classList.toggle("open"); el.setAttribute("aria-expanded", open); }
    else if (act === "filter") { shopFilter = el.getAttribute("data-f"); app.innerHTML = viewShop(); afterRender(); }
    else if (act === "menu") { var open2 = $("#nav-links").classList.toggle("open"); el.textContent = open2 ? "Close" : "Menu"; $("#nav").classList.remove("hide"); document.body.classList.toggle("lock", open2); }
    else if (act === "menu-close") $("#nav-links").classList.remove("open");
    else if (act === "gate-yes") { try { sessionStorage.setItem("tresalba-age", "yes"); } catch (err) { /* ignore */ } $("#gate").classList.add("off"); document.body.classList.remove("lock"); }
    else if (act === "gate-no") { $("#gate p").textContent = "Sorry, you need to be of legal drinking age to visit. Come back when you are."; }
  });
  document.addEventListener("submit", function (e) { if (e.target.id === "checkout") { e.preventDefault(); submitCheckout(e.target); } });
  document.addEventListener("change", function (e) { if (e.target.name === "ship") { shipMethod = e.target.value; $("#summary").innerHTML = summaryHTML(); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  /* cursor */
  var cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener("mousemove", function (e) {
    tx = e.clientX; ty = e.clientY; var c = $("#cursor"); if (!c) return;
    c.classList.add("on"); c.classList.toggle("big", !!e.target.closest("[data-cursor]"));
  });
  (function loop() { var c = $("#cursor"); cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; if (c) c.style.transform = "translate3d(" + cx + "px," + cy + "px,0)"; requestAnimationFrame(loop); })();

  /* ---------- go ---------- */
  chrome();
  window.addEventListener("hashchange", route);
  route();
  if (SHOP) saveCart();
})();
