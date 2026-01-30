var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-2nN4eX/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// ../.wrangler/tmp/bundle-2nN4eX/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// _worker.js
var sn = Object.defineProperty;
var ut = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "ut");
var an = /* @__PURE__ */ __name((t, e, n) => e in t ? sn(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "an");
var A = /* @__PURE__ */ __name((t, e, n) => an(t, typeof e != "symbol" ? e + "" : e, n), "A");
var nt = /* @__PURE__ */ __name((t, e, n) => e.has(t) || ut("Cannot " + n), "nt");
var d = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var R = /* @__PURE__ */ __name((t, e, n) => e.has(t) ? ut("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "R");
var $ = /* @__PURE__ */ __name((t, e, n, r) => (nt(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "$");
var j = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "access private method"), n), "j");
var ht = /* @__PURE__ */ __name((t, e, n, r) => ({ set _(s) {
  $(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "ht");
var ft = /* @__PURE__ */ __name((t, e, n) => (r, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let c, l = false, u;
    if (t[o] ? (u = t[o][0][0], r.req.routeIndex = o) : u = o === t.length && s || void 0, u)
      try {
        c = await u(r, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && e)
          r.error = h, c = await e(h, r), l = true;
        else
          throw h;
      }
    else
      r.finalized === false && n && (c = await n(r));
    return c && (r.finalized === false || l) && (r.res = c), r;
  }
  __name(a, "a");
}, "ft");
var on = Symbol();
var cn = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof Pt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? ln(t, { all: n, dot: r }) : {};
}, "cn");
async function ln(t, e) {
  const n = await t.formData();
  return n ? dn(n, e) : {};
}
__name(ln, "ln");
function dn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? un(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (hn(n, r, s), delete n[r]);
  }), n;
}
__name(dn, "dn");
var un = /* @__PURE__ */ __name((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "un");
var hn = /* @__PURE__ */ __name((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "hn");
var Nt = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Nt");
var fn = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: n } = pn(t), r = Nt(n);
  return mn(r, e);
}, "fn");
var pn = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "pn");
var mn = /* @__PURE__ */ __name((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "mn");
var ze = {};
var gn = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return ze[r] || (n[2] ? ze[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : ze[r] = [t, n[1], true]), ze[r];
  }
  return null;
}, "gn");
var dt = /* @__PURE__ */ __name((t, e) => {
  try {
    return e(t);
  } catch {
    return t.replace(/(?:%[0-9A-Fa-f]{2})+/g, (n) => {
      try {
        return e(n);
      } catch {
        return n;
      }
    });
  }
}, "dt");
var xn = /* @__PURE__ */ __name((t) => dt(t, decodeURI), "xn");
var Mt = /* @__PURE__ */ __name((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return xn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "Mt");
var vn = /* @__PURE__ */ __name((t) => {
  const e = Mt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "vn");
var Ce = /* @__PURE__ */ __name((t, e, ...n) => (n.length && (e = Ce(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "Ce");
var jt = /* @__PURE__ */ __name((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), n = [];
  let r = "";
  return e.forEach((s) => {
    if (s !== "" && !/\:/.test(s))
      r += "/" + s;
    else if (/\:/.test(s))
      if (/\?/.test(s)) {
        n.length === 0 && r === "" ? n.push("/") : n.push(r);
        const i = s.replace("?", "");
        r += "/" + i, n.push(r);
      } else
        r += "/" + s;
  }), n.filter((s, i, a) => a.indexOf(s) === i);
}, "jt");
var rt = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? dt(t, It) : t) : t, "rt");
var kt = /* @__PURE__ */ __name((t, e, n) => {
  let r;
  if (!n && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const c = a + e.length + 2, l = t.indexOf("&", c);
        return rt(t.slice(c, l === -1 ? void 0 : l));
      } else if (o == 38 || isNaN(o))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (r = /[%+]/.test(t), !r)
      return;
  }
  const s = {};
  r ?? (r = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let o = t.indexOf("=", i);
    o > a && a !== -1 && (o = -1);
    let c = t.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (r && (c = rt(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), r && (l = rt(l))), n ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return e ? s[e] : s;
}, "kt");
var bn = kt;
var wn = /* @__PURE__ */ __name((t, e) => kt(t, e, true), "wn");
var It = decodeURIComponent;
var pt = /* @__PURE__ */ __name((t) => dt(t, It), "pt");
var Ae;
var W;
var ae;
var Lt;
var Ht;
var ct;
var ce;
var Ct;
var Pt = (Ct = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", n = [[]]) {
    R(this, ae);
    A(this, "raw");
    R(this, Ae);
    R(this, W);
    A(this, "routeIndex", 0);
    A(this, "path");
    A(this, "bodyCache", {});
    R(this, ce, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, $(this, W, n), $(this, Ae, {});
  }
  param(t) {
    return t ? j(this, ae, Lt).call(this, t) : j(this, ae, Ht).call(this);
  }
  query(t) {
    return bn(this.url, t);
  }
  queries(t) {
    return wn(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((n, r) => {
      e[r] = n;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await cn(this, t));
  }
  json() {
    return d(this, ce).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, ce).call(this, "text");
  }
  arrayBuffer() {
    return d(this, ce).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, ce).call(this, "blob");
  }
  formData() {
    return d(this, ce).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, Ae)[t] = e;
  }
  valid(t) {
    return d(this, Ae)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [on]() {
    return d(this, W);
  }
  get matchedRoutes() {
    return d(this, W)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, W)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "Ct"), Ae = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function(t) {
  const e = d(this, W)[0][this.routeIndex][1][t], n = j(this, ae, ct).call(this, e);
  return n && /\%/.test(n) ? pt(n) : n;
}, "Lt"), Ht = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(d(this, W)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = j(this, ae, ct).call(this, d(this, W)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? pt(r) : r);
  }
  return t;
}, "Ht"), ct = /* @__PURE__ */ __name(function(t) {
  return d(this, W)[1] ? d(this, W)[1][t] : t;
}, "ct"), ce = /* @__PURE__ */ new WeakMap(), Ct);
var yn = { Stringify: 1 };
var Dt = /* @__PURE__ */ __name(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Dt(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Dt");
var Sn = "text/plain; charset=UTF-8";
var st = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "st");
var Be;
var qe;
var ne;
var _e;
var re;
var Y;
var Fe;
var Re;
var Ne;
var xe;
var Ge;
var Ke;
var le;
var $e;
var $t;
var En = ($t = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    R(this, le);
    R(this, Be);
    R(this, qe);
    A(this, "env", {});
    R(this, ne);
    A(this, "finalized", false);
    A(this, "error");
    R(this, _e);
    R(this, re);
    R(this, Y);
    R(this, Fe);
    R(this, Re);
    R(this, Ne);
    R(this, xe);
    R(this, Ge);
    R(this, Ke);
    A(this, "render", (...t2) => (d(this, Re) ?? $(this, Re, (e2) => this.html(e2)), d(this, Re).call(this, ...t2)));
    A(this, "setLayout", (t2) => $(this, Fe, t2));
    A(this, "getLayout", () => d(this, Fe));
    A(this, "setRenderer", (t2) => {
      $(this, Re, t2);
    });
    A(this, "header", (t2, e2, n) => {
      this.finalized && $(this, Y, new Response(d(this, Y).body, d(this, Y)));
      const r = d(this, Y) ? d(this, Y).headers : d(this, xe) ?? $(this, xe, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    A(this, "status", (t2) => {
      $(this, _e, t2);
    });
    A(this, "set", (t2, e2) => {
      d(this, ne) ?? $(this, ne, /* @__PURE__ */ new Map()), d(this, ne).set(t2, e2);
    });
    A(this, "get", (t2) => d(this, ne) ? d(this, ne).get(t2) : void 0);
    A(this, "newResponse", (...t2) => j(this, le, $e).call(this, ...t2));
    A(this, "body", (t2, e2, n) => j(this, le, $e).call(this, t2, e2, n));
    A(this, "text", (t2, e2, n) => !d(this, xe) && !d(this, _e) && !e2 && !n && !this.finalized ? new Response(t2) : j(this, le, $e).call(this, t2, e2, st(Sn, n)));
    A(this, "json", (t2, e2, n) => j(this, le, $e).call(this, JSON.stringify(t2), e2, st("application/json", n)));
    A(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name((s) => j(this, le, $e).call(this, s, e2, st("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? Dt(t2, yn.Stringify, false, {}).then(r) : r(t2);
    });
    A(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    A(this, "notFound", () => (d(this, Ne) ?? $(this, Ne, () => new Response()), d(this, Ne).call(this, this)));
    $(this, Be, t), e && ($(this, re, e.executionCtx), this.env = e.env, $(this, Ne, e.notFoundHandler), $(this, Ke, e.path), $(this, Ge, e.matchResult));
  }
  get req() {
    return d(this, qe) ?? $(this, qe, new Pt(d(this, Be), d(this, Ke), d(this, Ge))), d(this, qe);
  }
  get event() {
    if (d(this, re) && "respondWith" in d(this, re))
      return d(this, re);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, re))
      return d(this, re);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, Y) || $(this, Y, new Response(null, { headers: d(this, xe) ?? $(this, xe, new Headers()) }));
  }
  set res(t) {
    if (d(this, Y) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of d(this, Y).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const r = d(this, Y).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of r)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, n);
    }
    $(this, Y, t), this.finalized = true;
  }
  get var() {
    return d(this, ne) ? Object.fromEntries(d(this, ne)) : {};
  }
}, "$t"), Be = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakSet(), $e = /* @__PURE__ */ __name(function(t, e, n) {
  const r = d(this, Y) ? new Headers(d(this, Y).headers) : d(this, xe) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, o] of i)
      a.toLowerCase() === "set-cookie" ? r.append(a, o) : r.set(a, o);
  }
  if (n)
    for (const [i, a] of Object.entries(n))
      if (typeof a == "string")
        r.set(i, a);
      else {
        r.delete(i);
        for (const o of a)
          r.append(i, o);
      }
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, _e);
  return new Response(t, { status: s, headers: r });
}, "$e"), $t);
var G = "ALL";
var On = "all";
var Cn = ["get", "post", "put", "delete", "options", "patch"];
var Bt = "Can not add a route since the matcher is already built.";
var qt = /* @__PURE__ */ __name(class extends Error {
}, "qt");
var $n = "__COMPOSED_HANDLER";
var Tn = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "Tn");
var mt = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "mt");
var X;
var K;
var Ft;
var Q;
var me;
var Je;
var Ye;
var Me;
var An = (Me = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    R(this, K);
    A(this, "get");
    A(this, "post");
    A(this, "put");
    A(this, "delete");
    A(this, "options");
    A(this, "patch");
    A(this, "all");
    A(this, "on");
    A(this, "use");
    A(this, "router");
    A(this, "getPath");
    A(this, "_basePath", "/");
    R(this, X, "/");
    A(this, "routes", []);
    R(this, Q, Tn);
    A(this, "errorHandler", mt);
    A(this, "onError", (e2) => (this.errorHandler = e2, this));
    A(this, "notFound", (e2) => ($(this, Q, e2), this));
    A(this, "fetch", (e2, ...n) => j(this, K, Ye).call(this, e2, n[1], n[0], e2.method));
    A(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${Ce("/", e2)}`, n), r2, s2)));
    A(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(j(this, K, Ye).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...Cn, On].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? $(this, X, a) : j(this, K, me).call(this, i, d(this, X), a), o.forEach((c) => {
        j(this, K, me).call(this, i, d(this, X), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        $(this, X, c);
        for (const l of [i].flat())
          o.map((u) => {
            j(this, K, me).call(this, l.toUpperCase(), d(this, X), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? $(this, X, i) : ($(this, X, "*"), a.unshift(i)), a.forEach((o) => {
      j(this, K, me).call(this, G, d(this, X), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? Mt : vn;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === mt ? i = s.handler : (i = /* @__PURE__ */ __name(async (o, c) => (await ft([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[$n] = s.handler), j(a = r, K, me).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = j(this, K, Ft).call(this);
    return n._basePath = Ce(this._basePath, e), n;
  }
  mount(e, n, r) {
    let s, i;
    r && (typeof r == "function" ? i = r : (i = r.optionHandler, r.replaceRequest === false ? s = /* @__PURE__ */ __name((c) => c, "s") : s = r.replaceRequest));
    const a = i ? (c) => {
      const l = i(c);
      return Array.isArray(l) ? l : [l];
    } : (c) => {
      let l;
      try {
        l = c.executionCtx;
      } catch {
      }
      return [c.env, l];
    };
    s || (s = (() => {
      const c = Ce(this._basePath, e), l = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(l) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (c, l) => {
      const u = await n(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return j(this, K, me).call(this, G, Ce(e, "*"), o), this;
  }
}, "Me"), X = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakSet(), Ft = /* @__PURE__ */ __name(function() {
  const e = new Me({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, $(e, Q, d(this, Q)), e.routes = this.routes, e;
}, "Ft"), Q = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ __name(function(e, n, r) {
  e = e.toUpperCase(), n = Ce(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "me"), Je = /* @__PURE__ */ __name(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "Je"), Ye = /* @__PURE__ */ __name(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, K, Ye).call(this, e, n, r, "GET")))();
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new En(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: d(this, Q) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, Q).call(this, o);
      });
    } catch (u) {
      return j(this, K, Je).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, Q).call(this, o))).catch((u) => j(this, K, Je).call(this, u, o)) : l ?? d(this, Q).call(this, o);
  }
  const c = ft(a[0], this.errorHandler, d(this, Q));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return j(this, K, Je).call(this, l, o);
    }
  })();
}, "Ye"), Me);
var Gt = [];
function _n(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name((s, i) => {
    const a = n[s] || n[G], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Gt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(_n, "_n");
var Qe = "[^/]+";
var He = ".*";
var De = "(?:|/.*)";
var Te = Symbol();
var Rn = new Set(".\\+*[^]$()");
function Nn(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === He || t === De ? 1 : e === He || e === De ? -1 : t === Qe ? 1 : e === Qe ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Nn, "Nn");
var ve;
var be;
var Z;
var Ee;
var Mn = (Ee = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, ve);
    R(this, be);
    R(this, Z, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (d(this, ve) !== void 0)
        throw Te;
      if (i)
        return;
      $(this, ve, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", He] : ["", "", Qe] : a === "/*" ? ["", "", De] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Qe;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw Te;
      if (l = d(this, Z)[h], !l) {
        if (Object.keys(d(this, Z)).some((b) => b !== He && b !== De))
          throw Te;
        if (i)
          return;
        l = d(this, Z)[h] = new Ee(), u !== "" && $(l, be, s.varIndex++);
      }
      !i && u !== "" && r.push([u, d(l, be)]);
    } else if (l = d(this, Z)[a], !l) {
      if (Object.keys(d(this, Z)).some((u) => u.length > 1 && u !== He && u !== De))
        throw Te;
      if (i)
        return;
      l = d(this, Z)[a] = new Ee();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, Z)).sort(Nn).map((r) => {
      const s = d(this, Z)[r];
      return (typeof d(s, be) == "number" ? `(${r})@${d(s, be)}` : Rn.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, ve) == "number" && n.unshift(`#${d(this, ve)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "Ee"), ve = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Ee);
var et;
var Ue;
var Tt;
var jn = (Tt = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, et, { varIndex: 0 });
    R(this, Ue, new Mn());
  }
  insert(t, e, n) {
    const r = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const l = `@\\${a}`;
        return s[a] = [l, c], a++, o = true, l;
      }), !o)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(o) !== -1) {
          i[c] = i[c].replace(o, s[a][1]);
          break;
        }
    }
    return d(this, Ue).insert(i, e, r, d(this, et), n), r;
  }
  buildRegExp() {
    let t = d(this, Ue).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "Tt"), et = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Tt);
var kn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ve = /* @__PURE__ */ Object.create(null);
function Kt(t) {
  return Ve[t] ?? (Ve[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Kt, "Kt");
function In() {
  Ve = /* @__PURE__ */ Object.create(null);
}
__name(In, "In");
function Pn(t) {
  var l;
  const e = new jn(), n = [];
  if (t.length === 0)
    return kn;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [b, C]) => u ? 1 : b ? -1 : h.length - C.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, b = r.length; u < b; u++) {
    const [C, N, k] = r[u];
    C ? s[N] = [k.map(([v]) => [v, /* @__PURE__ */ Object.create(null)]), Gt] : h++;
    let _;
    try {
      _ = e.insert(N, h, C);
    } catch (v) {
      throw v === Te ? new qt(N) : v;
    }
    C || (n[h] = k.map(([v, w]) => {
      const T = /* @__PURE__ */ Object.create(null);
      for (w -= 1; w >= 0; w--) {
        const [I, m] = _[w];
        T[I] = m;
      }
      return [v, T];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let b = 0, C = n[u].length; b < C; b++) {
      const N = (l = n[u][b]) == null ? void 0 : l[1];
      if (!N)
        continue;
      const k = Object.keys(N);
      for (let _ = 0, v = k.length; _ < v; _++)
        N[k[_]] = o[N[k[_]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, s];
}
__name(Pn, "Pn");
function Oe(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Kt(n).test(e))
        return [...t[n]];
  }
}
__name(Oe, "Oe");
var de;
var ue;
var tt;
var Ut;
var At;
var Ln = (At = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, tt);
    A(this, "name", "RegExpRouter");
    R(this, de);
    R(this, ue);
    A(this, "match", _n);
    $(this, de, { [G]: /* @__PURE__ */ Object.create(null) }), $(this, ue, { [G]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, de), s = d(this, ue);
    if (!r || !s)
      throw new Error(Bt);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[G]).forEach((l) => {
        c[t][l] = [...c[G][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Kt(e);
      t === G ? Object.keys(r).forEach((l) => {
        var u;
        (u = r[l])[e] || (u[e] = Oe(r[l], e) || Oe(r[G], e) || []);
      }) : (o = r[t])[e] || (o[e] = Oe(r[t], e) || Oe(r[G], e) || []), Object.keys(r).forEach((l) => {
        (t === G || t === l) && Object.keys(r[l]).forEach((u) => {
          c.test(u) && r[l][u].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === G || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([n, i]));
      });
      return;
    }
    const a = jt(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var b;
        (t === G || t === h) && ((b = s[h])[u] || (b[u] = [...Oe(r[h], u) || Oe(r[G], u) || []]), s[h][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, ue)).concat(Object.keys(d(this, de))).forEach((e) => {
      t[e] || (t[e] = j(this, tt, Ut).call(this, e));
    }), $(this, de, $(this, ue, void 0)), In(), t;
  }
}, "At"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakSet(), Ut = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let n = t === G;
  return [d(this, de), d(this, ue)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== G && e.push(...Object.keys(r[G]).map((i) => [i, r[G][i]]));
  }), n ? Pn(e) : null;
}, "Ut"), At);
var he;
var se;
var _t;
var Hn = (_t = /* @__PURE__ */ __name(class {
  constructor(t) {
    A(this, "name", "SmartRouter");
    R(this, he, []);
    R(this, se, []);
    $(this, he, t.routers);
  }
  add(t, e, n) {
    if (!d(this, se))
      throw new Error(Bt);
    d(this, se).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, se))
      throw new Error("Fatal error");
    const n = d(this, he), r = d(this, se), s = n.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = r.length; c < l; c++)
          o.add(...r[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof qt)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), $(this, he, [o]), $(this, se, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, se) || d(this, he).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, he)[0];
  }
}, "_t"), he = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), _t);
var Pe = /* @__PURE__ */ Object.create(null);
var fe;
var J;
var we;
var je;
var U;
var ie;
var ge;
var ke;
var Dn = (ke = /* @__PURE__ */ __name(class {
  constructor(e, n, r) {
    R(this, ie);
    R(this, fe);
    R(this, J);
    R(this, we);
    R(this, je, 0);
    R(this, U, Pe);
    if ($(this, J, r || /* @__PURE__ */ Object.create(null)), $(this, fe, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, $(this, fe, [s]);
    }
    $(this, we, []);
  }
  insert(e, n, r) {
    $(this, je, ++ht(this, je)._);
    let s = this;
    const i = fn(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = gn(l, u), b = Array.isArray(h) ? h[0] : l;
      if (b in d(s, J)) {
        s = d(s, J)[b], h && a.push(h[1]);
        continue;
      }
      d(s, J)[b] = new ke(), h && (d(s, we).push(h), a.push(h[1])), s = d(s, J)[b];
    }
    return d(s, fe).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, je) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    $(this, U, Pe);
    let i = [this];
    const a = Nt(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], b = l === u - 1, C = [];
      for (let N = 0, k = i.length; N < k; N++) {
        const _ = i[N], v = d(_, J)[h];
        v && ($(v, U, d(_, U)), b ? (d(v, J)["*"] && r.push(...j(this, ie, ge).call(this, d(v, J)["*"], e, d(_, U))), r.push(...j(this, ie, ge).call(this, v, e, d(_, U)))) : C.push(v));
        for (let w = 0, T = d(_, we).length; w < T; w++) {
          const I = d(_, we)[w], m = d(_, U) === Pe ? {} : { ...d(_, U) };
          if (I === "*") {
            const S = d(_, J)["*"];
            S && (r.push(...j(this, ie, ge).call(this, S, e, d(_, U))), $(S, U, m), C.push(S));
            continue;
          }
          const [D, O, x] = I;
          if (!h && !(x instanceof RegExp))
            continue;
          const f = d(_, J)[D], y = a.slice(l).join("/");
          if (x instanceof RegExp) {
            const S = x.exec(y);
            if (S) {
              if (m[O] = S[0], r.push(...j(this, ie, ge).call(this, f, e, d(_, U), m)), Object.keys(d(f, J)).length) {
                $(f, U, m);
                const p = ((c = S[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (x === true || x.test(h)) && (m[O] = h, b ? (r.push(...j(this, ie, ge).call(this, f, e, m, d(_, U))), d(f, J)["*"] && r.push(...j(this, ie, ge).call(this, d(f, J)["*"], e, m, d(_, U)))) : ($(f, U, m), C.push(f)));
        }
      }
      i = C.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, u) => l.score - u.score), [r.map(({ handler: l, params: u }) => [l, u])];
  }
}, "ke"), fe = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakSet(), ge = /* @__PURE__ */ __name(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = d(e, fe).length; a < o; a++) {
    const c = d(e, fe)[a], l = c[n] || c[G], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== Pe || s && s !== Pe))
      for (let h = 0, b = l.possibleKeys.length; h < b; h++) {
        const C = l.possibleKeys[h], N = u[l.score];
        l.params[C] = s != null && s[C] && !N ? s[C] : r[C] ?? (s == null ? void 0 : s[C]), u[l.score] = true;
      }
  }
  return i;
}, "ge"), ke);
var ye;
var Rt;
var Bn = (Rt = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, "name", "TrieRouter");
    R(this, ye);
    $(this, ye, new Dn());
  }
  add(t, e, n) {
    const r = jt(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        d(this, ye).insert(t, r[s], n);
      return;
    }
    d(this, ye).insert(t, e, n);
  }
  match(t, e) {
    return d(this, ye).search(t, e);
  }
}, "Rt"), ye = /* @__PURE__ */ new WeakMap(), Rt);
var zt = /* @__PURE__ */ __name(class extends An {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Hn({ routers: [new Ln(), new Bn()] });
  }
}, "zt");
var qn = /* @__PURE__ */ __name((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, b) {
      a.res.headers.set(h, b);
    }
    __name(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let b = n.allowHeaders;
      if (!(b != null && b.length)) {
        const C = a.req.header("Access-Control-Request-Headers");
        C && (b = C.split(/\s*,\s*/));
      }
      return b != null && b.length && (c("Access-Control-Allow-Headers", b.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "qn");
var Fn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var gt = /* @__PURE__ */ __name((t, e = Kn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "gt");
var Gn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Kn = Gn;
var Un = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Un");
var Jt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var zn = Object.keys(Jt);
var Jn = "index.html";
var Yn = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Un;
  return async (s, i) => {
    var u, h, b, C;
    if (s.finalized)
      return i();
    let a;
    if (t.path)
      a = t.path;
    else
      try {
        if (a = decodeURIComponent(s.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))
          throw new Error();
      } catch {
        return await ((u = t.onNotFound) == null ? void 0 : u.call(t, s.req.path, s)), i();
      }
    let o = r(e, !n && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(o) && (o = r(o, Jn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const N = t.mimes && gt(o, t.mimes) || gt(o);
      if (s.header("Content-Type", N || "application/octet-stream"), t.precompressed && (!N || Fn.test(N))) {
        const k = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((_) => _.trim()));
        for (const _ of zn) {
          if (!k.has(_))
            continue;
          const v = await c(o + Jt[_], s);
          if (v) {
            l = v, s.header("Content-Encoding", _), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((b = t.onFound) == null ? void 0 : b.call(t, o, s)), s.body(l);
    }
    await ((C = t.onNotFound) == null ? void 0 : C.call(t, o, s)), await i();
  };
}, "Yn");
var Vn = /* @__PURE__ */ __name(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "Vn");
var Wn = /* @__PURE__ */ __name((t) => async function(n, r) {
  return Yn({ ...t, getContent: async (i) => Vn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "Wn");
var Xn = /* @__PURE__ */ __name((t) => Wn(t), "Xn");
var te = new zt();
var We = /* @__PURE__ */ new Map();
var Qn = 1e3 * 60 * 60 * 24 * 7;
var it = false;
function Yt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Yt, "Yt");
function z(t) {
  return t == null ? "" : String(t);
}
__name(z, "z");
function Se(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Se, "Se");
function lt(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(lt, "lt");
function ee(t) {
  return lt(t).length;
}
__name(ee, "ee");
var xt = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } };
var vt = { brief: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBC29\uBC95", "\uD575\uC2EC \uACB0\uB860"], standard: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uBC29\uBC95", "\uC8FC\uC694 \uACB0\uACFC", "\uACB0\uB860"], detail: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uB300\uC0C1", "\uC5F0\uAD6C \uC808\uCC28", "\uACB0\uACFC", "\uD574\uC11D", "\uAD50\uC721\uC801 \uC758\uC758"] };
function Vt(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Vt, "Vt");
var Zn = ["DLPFC", "VLPFC", "OFC", "ACC", "PFC", "vmPFC", "dmPFC", "\uC804\uB450\uC5FD", "\uCE21\uB450\uC5FD", "\uB450\uC815\uC5FD", "\uD6C4\uB450\uC5FD", "\uD3B8\uB3C4\uCCB4", "\uD574\uB9C8"];
function at(t, e) {
  if (e === "brief") {
    for (const s of Zn)
      if (t.includes(s))
        return { valid: false, error: `\uAC04\uB2E8\uC694\uC57D\uC5D0 \uC138\uBD80 \uB1CC\uC601\uC5ED(${s}) \uB2E8\uB3C5 \uB4F1\uC7A5 \uAE08\uC9C0. \uC77C\uBC18\uC801 \uC124\uBA85\uB9CC \uD3EC\uD568\uD558\uC138\uC694.` };
  }
  const n = vt[e] || vt.standard, r = [];
  for (const s of n)
    s.split(" ").some((o) => t.includes(o)) || r.push(s);
  return r.length > 0 ? { valid: false, error: `\uD544\uC218 \uC694\uC18C \uB204\uB77D: ${r.join(", ")}. \uC774 \uD56D\uBAA9\uB4E4\uC744 \uBC18\uB4DC\uC2DC \uD3EC\uD568\uD558\uC138\uC694.` } : { valid: true };
}
__name(at, "at");
function er(t) {
  return xt[t] || xt.standard;
}
__name(er, "er");
function Xe(t, e) {
  const n = Math.max(50, ee(t)), { min: r, max: s } = er(e);
  return { base: n, min: Math.floor(n * r), max: Math.ceil(n * s) };
}
__name(Xe, "Xe");
function Wt(t) {
  const e = z(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Wt, "Wt");
function Xt(t) {
  const e = z(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Xt, "Xt");
function tr(t) {
  const e = z(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(tr, "tr");
function Qt(t) {
  const e = (t || "").replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  const n = [];
  let r = "", s = false;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], o = e[i + 1];
    (a === '"' || a === '"' || a === '"') && (s = !s), r += a, !s && /[\.\?\!]/.test(a) && o === " " ? a === "." && r.endsWith("...") || (n.push(r.trim()), r = "", i++) : !s && /[다요죠]/.test(a) && o === " " && (n.push(r.trim()), r = "", i++);
  }
  return r.trim() && n.push(r.trim()), n.length ? n : [e];
}
__name(Qt, "Qt");
var nr = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var rr = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function sr(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    let r = false;
    for (const s of rr)
      if (s.has(n)) {
        e.add(Array.from(s)[0]), r = true;
        break;
      }
    r || e.add(n);
  }
  return e;
}
__name(sr, "sr");
function Ze(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !nr.has(e));
}
__name(Ze, "Ze");
function ir(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t)
    for (const s of Ze(r))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((r, s) => {
    const i = Ze(r);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = r.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: r, score: a * c };
  });
}
__name(ir, "ir");
function ar(t, e) {
  return ir(t).slice().sort((s, i) => i.score - s.score).slice(0, Se(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(ar, "ar");
function Zt(t) {
  let e = (t || "").trim();
  e = e.replace(/모\s+든/g, "\uBAA8\uB4E0"), e = e.replace(/기\s+회/g, "\uAE30\uD68C"), e = e.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), e = e.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), e = e.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), e = e.replace(/특정\s+공간\s+인/g, "\uD2B9\uC815 \uACF5\uAC04\uC778"), e = e.replace(/(\S+)\s+\1/g, "$1"), e = e.replace(/([가-힣])을\b/g, (i, a) => {
    const o = a.charCodeAt(0);
    return o >= 44032 && o <= 55203 ? (o - 44032) % 28 !== 0 ? a + "\uC744" : a + "\uB97C" : i;
  });
  const n = e.split(new RegExp("(?<=\uB2E4\\.)\\s+")), r = /* @__PURE__ */ new Set(), s = [];
  for (const i of n) {
    const a = i.match(/^([^은는]+[은는])\s+(.+)/);
    if (a) {
      const o = a[1];
      if (r.has(o))
        continue;
      r.add(o);
    }
    s.push(i);
  }
  return e = s.join(" "), e = e.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), e = e.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), e = e.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), e = e.replace(/\s*\.\s*/g, ". "), e = e.replace(/\s*,\s*/g, ", "), e = e.replace(/\s*;\s*/g, "; "), e = e.replace(/[ ]{2,}/g, " "), e = e.replace(/\n{3,}/g, `

`), e.trim();
}
__name(Zt, "Zt");
function en(t) {
  const e = Math.max(200, ee(t)), n = Xe(t, "brief"), r = Xe(t, "standard"), s = Xe(t, "detail"), i = Se(n.min + Math.round((n.max - n.min) * 0.5), n.min, n.max), a = Se(Math.max(r.min, i + 40), r.min, r.max), o = Se(Math.max(s.min, a + 120), s.min, s.max);
  return { base: e, brief: i, standard: a, detail: o };
}
__name(en, "en");
function or(t) {
  const e = en(t);
  return `
\uB2F9\uC2E0\uC740 \uD559\uC220 \uB17C\uBB38\uC744 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C "\uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization)" \uBC29\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB294 \uC804\uBB38 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.

[\uC785\uB825 \uC6D0\uBB38 - \uD559\uC220 \uB17C\uBB38]
"""${Vt(t)}"""

[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]
\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.
\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:

1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)
2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)
3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)
4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)
5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)

\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.

[\uC694\uC57D \uBAA8\uB4DC\uBCC4 \uD544\uC218 \uD3EC\uD568 \uC694\uC18C]
- \uAC04\uB2E8 \uC694\uC57D: \uC5F0\uAD6C \uBAA9\uC801, \uC5F0\uAD6C \uBC29\uBC95, \uD575\uC2EC \uACB0\uB860 (\uC138\uBD80 \uB1CC \uC601\uC5ED \uAE08\uC9C0)
- \uD45C\uC900 \uC694\uC57D: \uC5F0\uAD6C \uBAA9\uC801, \uC5F0\uAD6C \uBB38\uC81C, \uC5F0\uAD6C \uBC29\uBC95, \uC8FC\uC694 \uACB0\uACFC, \uACB0\uB860
- \uC0C1\uC138 \uC694\uC57D: \uC5F0\uAD6C \uBAA9\uC801, \uC5F0\uAD6C \uBB38\uC81C, \uC5F0\uAD6C \uB300\uC0C1, \uC5F0\uAD6C \uC808\uCC28, \uACB0\uACFC, \uD574\uC11D, \uAD50\uC721\uC801 \uC758\uC758

[\uC694\uC57D \uC791\uC5C5 \uC804 \uC138\uD305 \uADDC\uCE59]
1. \uBE44\uC728 \uC900\uC218: \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% (\uACF5\uBC31 \uC81C\uC678 \uAE00\uC790\uC218 \uAE30\uC900 \uC5C4\uC218)
2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC \uBC88\uD638, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC7AC\uAD6C\uC131
3. \uC815\uBCF4 \uACC4\uCE35\uD654: \uC0C1\uC138\uB85C \uAC08\uC218\uB85D '\uD559\uC220\uC801 \uB17C\uAC70'\uC640 '\uC138\uBD80 \uC9C0\uD45C'\uC758 \uAE4A\uC774\uB97C \uB354\uD560 \uAC83
4. \uD034\uC988 \uCD5C\uC801\uD654: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58

[\uC694\uC57D \uC6D0\uCE59]
1) "\uAC04\uB2E8 < \uD45C\uC900 < \uC0C1\uC138" \uAE00\uC790\uC218 \uB2E8\uC870 \uC99D\uAC00\uB294 \uC808\uB300\uC801 \uAE30\uC900. \uC5ED\uC804 \uAE08\uC9C0.
2) \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38\uC744 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131
3) \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uCD94\uAC00 \uAE08\uC9C0 (\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0)
4) \uC138 \uC694\uC57D\uC740 \uB0B4\uC6A9\uACFC \uD45C\uD604\uC774 "\uAC70\uC758 \uB3D9\uC77C"\uD558\uBA74 \uC2E4\uD328 (\uC911\uBCF5 \uAE08\uC9C0)
5) \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0:
   - \uAC04\uB2E8 \uC694\uC57D: DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0 (\uC77C\uBC18\uC801 \uC124\uBA85\uB9CC)
   - \uD45C\uC900/\uC0C1\uC138 \uC694\uC57D: \uC138\uBD80 \uB1CC \uC601\uC5ED \uD5C8\uC6A9 (\uB2E8, \uB9E5\uB77D\uACFC \uD568\uAED8 \uC124\uBA85)
6) \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1:
   - \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569
   - \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0
   - \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC \uC791\uC131

[\uAE38\uC774 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678 \uAE00\uC790\uC218)]
- \uAC04\uB2E8: ${e.brief}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 10~15%, \uD575\uC2EC\uB9CC \uAC04\uACB0\uD558\uAC8C)
- \uD45C\uC900: ${e.standard}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 25~30%, \uC8FC\uC694 \uB17C\uAC70 \uD3EC\uD568)
- \uC0C1\uC138: ${e.detail}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 45~55%, \uD559\uC220\uC801 \uB17C\uAC70+\uC138\uBD80 \uC9C0\uD45C+\uC778\uACFC\uAD00\uACC4 \uBA85\uC2DC, \uC544\uB798 \uC18C\uC81C\uBAA9 3\uAC1C)

[\uC0C1\uC138 \uC694\uC57D \uC18C\uC81C\uBAA9(\uBC18\uB4DC\uC2DC \uADF8\uB300\uB85C \uC0AC\uC6A9)]
- \uAC1C\uB150
- \uC601\uD5A5
- \uAD50\uC721\uC801 \uAC00\uCE58

[\uD034\uC988 \uC5F0\uB3D9 \uAC15\uC870]
\uBAA8\uB4E0 \uC694\uC57D\uBB38\uC740 \uD5A5\uD6C4 \uD034\uC988 \uC0DD\uC131\uC758 \uADFC\uAC70\uC785\uB2C8\uB2E4. \uD2B9\uD788 \uC0C1\uC138 \uC694\uC57D\uC5D0\uC11C\uB294:
- \uC804\uBB38 \uC6A9\uC5B4(DLPFC, OFC \uB4F1)\uC640 \uAC1C\uB150 \uAC04\uC758 **\uC778\uACFC\uAD00\uACC4**\uB97C \uC0DD\uB7B5\uD558\uC9C0 \uB9D0 \uAC83
- \uD559\uC2B5 \uC720\uD615, \uB1CC \uC601\uC5ED, \uBC1C\uB2EC \uB2E8\uACC4 \uB4F1\uC758 **\uC9C0\uC2DD \uC575\uCEE4(Anchors)**\uB97C \uBA85\uD655\uD788 \uD655\uBCF4
- \uD034\uC988 \uBB38\uD56D\uC73C\uB85C \uBCC0\uD658 \uAC00\uB2A5\uD55C \uAD6C\uCCB4\uC801 \uC0AC\uC2E4\uACFC \uAD00\uACC4\uB97C \uBC30\uCE58

[\uCD9C\uB825 \uD615\uC2DD - JSON\uB9CC \uCD9C\uB825]
{
  "meta": {
    "base_chars_no_space": ${e.base},
    "target": { "brief": ${e.brief}, "standard": ${e.standard}, "detail": ${e.detail} }
  },
  "brief": "\u2026",
  "standard": "\u2026",
  "detail": {
    "\uAC1C\uB150": "\u2026",
    "\uC601\uD5A5": "\u2026",
    "\uAD50\uC721\uC801 \uAC00\uCE58": "\u2026"
  }
}

\u203B JSON \uC678 \uC5B4\uB5A4 \uBB38\uC7A5\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uB77C.
\u203B \uBAA8\uB4E0 \uC694\uC57D\uC740 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uD55C\uAD6D\uC5B4 \uD559\uC220 \uBB38\uC5B4\uCCB4\uB85C \uC791\uC131\uD558\uB77C.
`.trim();
}
__name(or, "or");
var cr = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function bt(t) {
  const e = { definition: 0, meaning: 0, activity: 0 };
  for (const [r, s] of Object.entries(cr))
    for (const i of s)
      t.includes(i) && e[r]++;
  const n = Math.max(e.definition, e.meaning, e.activity);
  return n === 0 ? null : e.definition === n ? "definition" : e.meaning === n ? "meaning" : "activity";
}
__name(bt, "bt");
function lr(t, e, n) {
  const r = ee(e), s = [], i = /* @__PURE__ */ new Set(), a = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = a.exec(e)) !== null; )
    i.add(o[1]);
  for (const v of t) {
    const w = [];
    let T;
    const I = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (T = I.exec(v)) !== null; ) {
      const O = T[1];
      i.has(O) && w.push(O);
    }
    let m = v.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (m.length < 10)
      continue;
    const D = Ze(m).slice(0, 8);
    s.push({ original: v, clean: m, keywords: D, citations: w }), m.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", m.slice(0, 100));
  }
  if (s.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const c = /* @__PURE__ */ new Map();
  for (const v of s)
    for (const w of v.keywords)
      c.set(w, (c.get(w) || 0) + 1);
  const l = [];
  for (const v of s) {
    new Set(v.keywords);
    let w = false;
    for (const T of l)
      if (v.keywords.filter((m) => T.keywords.has(m)).length >= 2) {
        T.sentences.push({ clean: v.clean, citations: v.citations }), v.keywords.forEach((m) => T.keywords.add(m)), w = true;
        break;
      }
    w || l.push({ keywords: new Set(v.keywords), sentences: [{ clean: v.clean, citations: v.citations }] });
  }
  const u = l.map((v) => {
    const w = v.sentences[0].clean, T = s.findIndex((I) => I.clean === w);
    return { ...v, originalIdx: T };
  });
  let h = "";
  if (n === "brief") {
    const v = { definition: [], meaning: [], activity: [] };
    for (const g of u)
      for (const E of g.sentences) {
        const M = bt(E.clean);
        M && v[M].push(E);
      }
    const w = v.definition[0], T = v.meaning[0], I = v.activity[0], m = [], D = [];
    if (w && (m.push(w.clean), D.push(...w.citations.filter(Boolean))), T && (m.push(T.clean), D.push(...T.citations.filter(Boolean))), I && (m.push(I.clean), D.push(...I.citations.filter(Boolean))), m.length === 0) {
      const E = u.sort((M, P) => P.sentences.length - M.sentences.length)[0].sentences[0];
      m.push(E.clean), D.push(...E.citations.filter(Boolean));
    }
    const O = Array.from(new Set(D)), x = O.length > 0 ? `(${O.join("; ")})` : "", f = m.map((g) => {
      let E = g;
      for (; E.includes("("); )
        E = E.replace(/\([^)]*\)/g, "");
      return E.trim();
    });
    f.length === 1 ? h = `${f[0]}${x}.` : f.length === 2 ? h = `${f[0]}. ${f[1]}${x}.` : h = `${f[0]}\uD558\uBA70 ${f[1]}. ${f[2]}${x}.`;
    const S = ee(h) / r * 100;
    if (S > 15) {
      let g = h.slice(0, 60);
      g = g.replace(/\([^)]*\)/g, "").trim(), h = g + (x ? ` ${x}.` : ".");
    }
    const p = [];
    return w && p.push("definition"), T && p.push("meaning"), I && p.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: p, sentenceCount: m.length, compressionRatio: S.toFixed(1) + "%", passed: S <= 15 }), h = ot(e, h, "brief", t), h;
  }
  if (n === "standard") {
    const v = u.sort((g, E) => E.sentences.length - g.sentences.length).slice(0, 3).sort((g, E) => g.originalIdx - E.originalIdx);
    if (v.length === 1) {
      const g = v[0].sentences[0], E = v[0].sentences.flatMap((P) => P.citations).filter(Boolean), M = E.length > 0 ? `(${E.join("; ")})` : "";
      return `${g.clean}${M}.`;
    }
    const w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), I = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const g of v)
      for (const E of g.sentences) {
        const M = E.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (M) {
          let [, P, q] = M;
          P = P.replace(/[에게서로부터]$/g, "").trim(), w.has(P) || w.set(P, []);
          let F = q.trim();
          F = F.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [B, pe] of Object.entries(I))
            if (F.includes(B)) {
              const oe = T.get(B) || 0;
              if (T.set(B, oe + 1), oe >= 1 && pe.length > 0) {
                const Ie = Math.min(oe - 1, pe.length - 1);
                F = F.replace(B, pe[Ie]);
              }
            }
          const L = new Set(Ze(F)), H = sr(L), V = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const B of V)
            H.delete(B);
          w.get(P).push({ original: F, keywords: H, citations: E.citations });
        }
      }
    const m = [];
    for (const [g, E] of w.entries()) {
      const M = E.flatMap((L) => L.citations).filter(Boolean), P = g.charAt(g.length - 1), F = /[가-힣]/.test(P) && (P.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (E.length === 1) {
        const L = E[0].original, H = (L.match(/,/g) || []).length;
        if (L.length > 80 && H >= 2) {
          const V = L.split(",").map((B) => B.trim()).filter((B) => B.length > 0);
          if (V.length >= 2) {
            m.push({ text: `${g}${F} ${V[0]}`, citations: [] });
            for (let B = 1; B < V.length - 1; B++)
              m.push({ text: `${V[B]}`, citations: [] });
            m.push({ text: `${V[V.length - 1]}`, citations: E[0].citations });
          } else
            m.push({ text: `${g}${F} ${L}`, citations: M });
        } else
          m.push({ text: `${g}${F} ${L}`, citations: M });
      } else {
        const L = [];
        for (const H of E) {
          let V = false;
          for (const B of L) {
            const pe = Array.from(H.keywords).filter((Ie) => B.keywords.has(Ie)).length, oe = Math.max(H.keywords.size, B.keywords.size);
            if (oe > 0 && pe / oe >= 0.8) {
              H.original.length > B.original.length && (B.original = H.original, B.keywords = H.keywords), B.citations.push(...H.citations), V = true;
              break;
            }
          }
          V || L.push({ original: H.original, keywords: H.keywords, citations: [...H.citations] });
        }
        if (L.length === 1)
          m.push({ text: `${g}${F} ${L[0].original}`, citations: L.flatMap((H) => H.citations) });
        else if (L.length === 2)
          m.push({ text: `${g}${F} ${L[0].original}`, citations: L[0].citations }), m.push({ text: `${g}${F} ${L[1].original}`, citations: L[1].citations });
        else
          for (let H = 0; H < L.length; H++)
            m.push({ text: `${g}${F} ${L[H].original}`, citations: L[H].citations });
      }
    }
    if (m.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (m.length === 1) {
      const g = m[0].citations.filter(Boolean), E = g.length > 0 ? `(${g.join("; ")})` : "";
      return `${m[0].text}${E}.`;
    }
    if (m.length === 2) {
      const g = m[0].citations.filter(Boolean), E = m[1].citations.filter(Boolean), M = g.length > 0 ? `(${g.join("; ")})` : "", P = E.length > 0 ? `(${E.join("; ")})` : "";
      return `${m[0].text}${M}. ${m[1].text}${P}.`;
    }
    const D = [], O = m[0], x = O.citations.filter(Boolean), f = x.length > 0 ? `(${x.join("; ")})` : "";
    if (D.push(`${O.text}${f}.`), m.length >= 2) {
      const g = m[1], E = g.citations.filter(Boolean), M = E.length > 0 ? `(${E.join("; ")})` : "";
      D.push(`${g.text}${M}.`);
    }
    if (m.length >= 3) {
      const E = m.slice(2).map((M) => {
        const P = M.citations.filter(Boolean), q = P.length > 0 ? `(${P.join("; ")})` : "";
        return `${M.text}${q}.`;
      });
      D.push(E.join(" "));
    }
    h = D.join(`

`);
    const S = ee(h) / r * 100;
    S > 30 && (D.length > 3 ? h = D.slice(0, 3).join(`

`) : h = D.join(`

`));
    const p = [];
    for (const g of v)
      for (const E of g.sentences) {
        const M = bt(E.clean);
        M && !p.includes(M) && p.push(M);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: p, sentenceCount: m.length, paragraphCount: D.length, compressionRatio: S.toFixed(1) + "%", passed: S >= 25 && S <= 30 }), h = ot(e, h, "standard", t), h;
  }
  const b = u.sort((v, w) => w.sentences.length - v.sentences.length).slice(0, 5).sort((v, w) => v.originalIdx - w.originalIdx);
  let C = b.map((v, w) => {
    const T = v.sentences[0], I = v.sentences.flatMap((D) => D.citations).filter(Boolean), m = I.length > 0 ? `(${I.join("; ")})` : "";
    return w === 0 ? `${T.clean}${m}.` : w === b.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${T.clean}${m}.` : `\uB610\uD55C ${T.clean}${m}.`;
  }).join(" ");
  return ee(C) / r * 100 > (n === "brief" ? 15 : n === "standard" ? 30 : 55) && n === "detail" ? b.slice(0, 3).map((w, T) => {
    const I = w.sentences[0], m = w.sentences.flatMap((O) => O.citations).filter(Boolean), D = m.length > 0 ? `(${m.join("; ")})` : "";
    return T === 0 ? `${I.clean}${D}.` : T === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${I.clean}${D}.` : `\uB610\uD55C ${I.clean}${D}.`;
  }).join(" ") : (C = ot(e, C, "detail", t), C);
}
__name(lr, "lr");
function dr(t, e, n) {
  const r = Qt(t), s = e === "brief" ? Se(Math.round(r.length * 0.18), 2, 4) : e === "standard" ? Se(Math.round(r.length * 0.28), 4, 8) : Se(Math.round(r.length * 0.4), 7, 14), i = ar(r, s);
  if (n === "narrative") {
    let o = lr(i, t, e);
    return o = Zt(o), { kind: "summary", mode: e, viewType: n, narrative: o };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: i.map((o, c) => `- (${c + 1}) ${o}`) } };
  if (n === "mindmap") {
    const o = (i[0] || r[0] || "\uD575\uC2EC").slice(0, 40), c = [{ id: "c", label: o, level: 0 }], l = [];
    return i.slice(1).forEach((u, h) => {
      const b = `n${h + 1}`;
      c.push({ id: b, label: u.slice(0, 60), level: 1 }), l.push({ from: "c", to: b });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: o, nodes: c, edges: l } };
  }
  const a = i.map((o, c) => ({ id: `q${c + 1}`, type: "short", question: `(${c + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${o.slice(0, 70)}"`, answerHint: o }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: a } };
}
__name(dr, "dr");
function tn(t) {
  if (!t)
    return "empty";
  let e = 2166136261, n = 0;
  for (let i = 0; i < t.length; i++) {
    const a = t.charCodeAt(i);
    e ^= a, e += (e << 1) + (e << 4) + (e << 7) + (e << 8) + (e << 24), n = (n << 5) - n + a, n |= 0;
  }
  const r = (e >>> 0).toString(16), s = (Math.abs(n) >>> 0).toString(16);
  return `${t.length.toString(16)}_${r}_${s}`;
}
__name(tn, "tn");
function ur(t, e, n, r) {
  const s = tn(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(ur, "ur");
function hr(t, e, n, r, s) {
  const i = tn(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(hr, "hr");
async function fr(t) {
  if (!it) {
    if (!t) {
      it = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), it = true;
  }
}
__name(fr, "fr");
async function wt(t, e) {
  const n = Date.now(), r = We.get(e);
  if (r && n - r.createdAt < Qn)
    return { hit: true, data: r.data, store: "mem" };
  if (r && We.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return We.set(e, { data: i, createdAt: n }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(wt, "wt");
async function Le(t, e, n, r) {
  const s = Date.now();
  We.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Yt()).run();
}
__name(Le, "Le");
function yt(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(yt, "yt");
function St(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(St, "St");
function Et(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(Et, "Et");
async function pr(t, e) {
  var c, l, u, h, b;
  const n = z(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = z(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const C = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (C.ok) {
      const k = await C.json();
      return { ok: true, text: ((b = (h = (u = (l = (c = k == null ? void 0 : k.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : b.text) ?? "", raw: k };
    }
    if (C.status === 429 || C.status === 503) {
      await new Promise((k) => setTimeout(k, o)), o *= 2;
      continue;
    }
    const N = await C.text().catch(() => "");
    throw new Error(`Gemini error ${C.status}: ${N.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(pr, "pr");
async function mr(t, e, n) {
  var l, u, h, b, C;
  const r = z(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = z(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const N = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (N.ok) {
      const _ = await N.json();
      return ((C = (b = (h = (u = (l = _ == null ? void 0 : _.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : b[0]) == null ? void 0 : C.text) ?? "";
    }
    if (N.status === 429 || N.status === 503) {
      await new Promise((_) => setTimeout(_, c)), c *= 2;
      continue;
    }
    const k = await N.text().catch(() => "");
    throw new Error(`Gemini error ${N.status}: ${k.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(mr, "mr");
async function nn(t, e) {
  const n = await pr(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(nn, "nn");
async function gr(t, e) {
  const n = or(e);
  for (let r = 1; r <= 2; r++)
    try {
      let i = (await nn(t, n) || "").trim();
      i.startsWith("```") && (i = i.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
      const a = JSON.parse(i);
      if (!(a != null && a.brief) || !(a != null && a.standard) || !(a != null && a.detail))
        throw new Error("Missing required fields");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing detail fields");
      const o = ee(a.brief), c = ee(a.standard), l = ee(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      (o >= c || c >= l) && console.warn("[SummaryJSON] monotonic violated", { bLen: o, sLen: c, dLen: l, attempt: r });
      const u = at(a.brief, "brief"), h = at(a.standard, "standard"), b = a.detail.\uAC1C\uB150 + " " + a.detail.\uC601\uD5A5 + " " + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"], C = at(b, "detail");
      if (!u.valid && (console.warn("[SummaryJSON] brief validation failed:", u.error), r === 1))
        throw new Error(`Brief validation: ${u.error}`);
      if (!h.valid && (console.warn("[SummaryJSON] standard validation failed:", h.error), r === 1))
        throw new Error(`Standard validation: ${h.error}`);
      if (!C.valid && (console.warn("[SummaryJSON] detail validation failed:", C.error), r === 1))
        throw new Error(`Detail validation: ${C.error}`);
      return a;
    } catch (s) {
      if (console.error("[SummaryJSON] attempt failed", r, s == null ? void 0 : s.message), r === 2) {
        const i = en(e);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", standard: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", detail: { \uAC1C\uB150: "[\uC2E4\uD328]", \uC601\uD5A5: "[\uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uC2E4\uD328]" } };
      }
    }
  throw new Error("summarizeWithJSON failed");
}
__name(gr, "gr");
function ot(t, e, n, r) {
  const { min: s, max: i } = Xe(t, n);
  let a = (e || "").trim();
  const o = /* @__PURE__ */ __name(() => ee(a), "o"), c = /* @__PURE__ */ __name(() => {
    a = Zt(a), a = a.replace(/\s{2,}/g, " ").trim();
  }, "c");
  if (c(), o() > i) {
    const l = Qt(a);
    for (; l.length > 1 && ee(l.join(" ")) > i; )
      l.pop();
    a = l.join(" "), c();
  }
  if (o() < s) {
    const l = (r || []).map((u) => u.trim()).filter(Boolean);
    for (const u of l) {
      if (o() >= s)
        break;
      const h = lt(u).slice(0, 24);
      if (!(h && lt(a).includes(h)) && (a = (a ? a + " " : "") + u.replace(/[\.。\?\!]+$/g, "") + ".", c(), o() > i))
        break;
    }
  }
  return a;
}
__name(ot, "ot");
var xr = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(O) {
    return (O || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  function a(O, x) {
    const y = Math.max(200, i(O || "").length), S = e[x] || e.standard, p = Math.floor(y * S.min), g = Math.ceil(y * S.max);
    return { base: y, min: Math.max(80, p), max: Math.max(120, g) };
  }
  __name(a, "a");
  function o(O) {
    const x = (O || "").trim();
    return x ? x.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((y) => y.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  function c(O) {
    return o(O).map((f, y) => ({ sid: `S${y + 1}`, text: f }));
  }
  __name(c, "c");
  function l(O, x, f) {
    const y = O.find((S) => S.sid === x);
    return !y || !f || typeof f != "string" ? false : y.text.includes(f.trim());
  }
  __name(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  function h({ originalText: O, mode: x, format: f }) {
    const y = a(O, x), S = Vt(O), p = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${y.min}\uC790 ~ \uCD5C\uB300 ${y.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", S].join(`
`);
  }
  __name(h, "h");
  function b({ summaryText: O, format: x }) {
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uC5D0\uC11C \uD559\uC2B5 \uC575\uCEE4(\uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4)\uB97C \uCD94\uCD9C\uD558\uB77C.", "- \uCD9C\uB825\uC740 JSON\uB9CC. \uD55C\uAD6D\uC5B4\uB85C.", "- \uC575\uCEE4 \uC218: 6~14\uAC1C \uBC94\uC704(\uC694\uC57D \uAE38\uC774\uC5D0 \uB9DE\uCDB0 \uC801\uC808\uD788).", "- \uAC01 \uC575\uCEE4\uB294 \uC694\uC57D\uBB38\uC5D0 \uC2E4\uC81C\uB85C \uB4F1\uC7A5\uD558\uB294 \uD45C\uD604\uC744 \uADFC\uAC70(quote)\uB85C \uAC00\uC838\uC640\uC57C \uD55C\uB2E4.", "- quote\uB294 \uC694\uC57D\uBB38 \uC77C\uBD80\uB97C \uADF8\uB300\uB85C \uBCF5\uC0AC(\uC9E7\uAC8C 8~25\uC790).", "", "[OUTPUT JSON SCHEMA]", `{
  "anchors":[
    {
      "id":"A1",
      "label":"\uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4 \uC774\uB984",
      "type":"concept|relation|claim",
      "sid":"S1",
      "quote":"\uC694\uC57D\uBB38\uC5D0\uC11C \uADF8\uB300\uB85C \uC778\uC6A9\uD55C \uC9E7\uC740 \uAD6C\uC808",
      "note":"\uD559\uC2B5 \uD3EC\uC778\uD2B8(1\uBB38\uC7A5)"
    }
  ]
}`, "", "[SUMMARY]", O].join(`
`);
  }
  __name(b, "b");
  function C({ mode: O, purpose: x, format: f, summaryText: y, sentTable: S, anchors: p }) {
    const g = n[O] || 10, E = x === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", M = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${O} (\uBB38\uD56D\uC218 ${g})`, `- \uBAA9\uC801: ${x} (${E})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${M})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
  "items":[
    {
      "id":"Q1",
      "type":"blank|match|order|label|short|mcq",
      "question":"\uBB38\uD56D",
      "choices":["\uBCF4\uAE301","\uBCF4\uAE302","\uBCF4\uAE303","\uBCF4\uAE304"], 
      "answer":"\uC815\uB2F5(choices \uAE30\uBC18\uC774\uBA74 \uBCF4\uAE30 \uD14D\uC2A4\uD2B8 \uADF8\uB300\uB85C)",
      "explanation":"\uD574\uC124(1~2\uBB38\uC7A5)",
      "evidence": { "sid":"S1", "quote":"\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80" },
      "anchorIds":["A1","A3"]
    }
  ]
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(S, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", y].join(`
`);
  }
  __name(C, "C");
  function N(O, x) {
    const f = x && x.anchors ? x.anchors : [], y = [], S = [];
    for (const p of f) {
      const g = p == null ? void 0 : p.sid, E = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        S.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(O, g, E)) {
        S.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: S };
  }
  __name(N, "N");
  function k(O, x) {
    const f = x && Array.isArray(x.items) ? x.items : [], y = [], S = [];
    for (const p of f) {
      const g = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(g != null && g.sid) || !(g != null && g.quote)) {
        S.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(O, g.sid, g.quote)) {
        S.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        S.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: S };
  }
  __name(k, "k");
  function _({ summaryText: O, sentTable: x, anchors: f, badItems: y, mode: S, purpose: p, format: g }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${y.length}`, `- \uBAA8\uB4DC: ${S}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${g}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(x, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(y, null, 2), "", "[SUMMARY]", O].join(`
`);
  }
  __name(_, "_");
  async function v({ llmCall: O, originalText: x, mode: f, format: y }) {
    if (!O)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), r.includes(y) || (y = "narrative");
    const S = h({ originalText: x, mode: f, format: y }), p = (await O({ system: u(), user: S, json: false }) || "").trim() || "", g = c(p), E = b({ summaryText: p, format: y });
    let M = await O({ system: u(), user: E, json: true }), P;
    try {
      P = JSON.parse(M);
    } catch {
      P = { anchors: [] };
    }
    const { ok: q } = N(g, P), F = q.length >= 4 ? q : w(g);
    return { summaryText: p, sentTable: g, anchors: F };
  }
  __name(v, "v");
  function w(O) {
    const x = [];
    for (let f = 0; f < Math.min(8, O.length); f++) {
      const y = O[f], S = (y.text || "").slice(0, 18);
      x.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: y.sid, quote: S, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return x;
  }
  __name(w, "w");
  async function T({ llmCall: O, mode: x, purpose: f, format: y, summaryText: S, sentTable: p, anchors: g }) {
    e[x] || (x = "standard"), s.includes(f) || (f = "preview"), r.includes(y) || (y = "narrative");
    const E = C({ mode: x, purpose: f, format: y, summaryText: S, sentTable: p, anchors: g });
    let M = await O({ system: u(), user: E, json: true }), P;
    try {
      P = JSON.parse(M);
    } catch {
      P = { items: [] };
    }
    let { ok: q, bad: F } = k(p, P);
    if (F.length > 0) {
      const H = _({ summaryText: S, sentTable: p, anchors: g, badItems: F.map((Ie) => Ie.q), mode: x, purpose: f, format: y });
      let V = await O({ system: u(), user: H, json: true }), B;
      try {
        B = JSON.parse(V);
      } catch {
        B = { items: [] };
      }
      const pe = k(p, B);
      q = q.concat(pe.ok);
      const oe = n[x] || 10;
      q = q.slice(0, oe);
    } else {
      const H = n[x] || 10;
      q = q.slice(0, H);
    }
    const L = n[x] || 10;
    if (q.length < L) {
      const H = I({ sentTable: p, anchors: g, count: L - q.length, format: y, purpose: f });
      q = q.concat(H).slice(0, L);
    }
    return { items: q };
  }
  __name(T, "T");
  function I({ sentTable: O, anchors: x, count: f, format: y, purpose: S }) {
    const p = [], g = x.slice(0, Math.max(f, 1));
    for (let E = 0; E < f; E++) {
      const M = g[E % g.length], P = M.sid, q = M.quote;
      p.push({ id: `QF${E + 1}`, type: "short", question: S === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: P, quote: q }, anchorIds: [M.id] });
    }
    return p;
  }
  __name(I, "I");
  class m {
    constructor(x, { passScore: f = 90 } = {}) {
      this.items = Array.isArray(x) ? x : [], this.passScore = f, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(x, f) {
      if (!x)
        return { ok: false, reason: "no item" };
      const y = x.type;
      if (y === "mcq" || y === "blank" || y === "match" || y === "order" || y === "label" || y === "short") {
        if (y === "short")
          return { ok: true, reason: "short-auto-pass" };
        const S = (x.answer || "").trim(), p = (f || "").trim();
        return { ok: p === S, reason: p === S ? "match" : "mismatch" };
      }
      return { ok: false, reason: "unknown type" };
    }
    getScore() {
      return this.items.length === 0 ? 0 : Math.round(this.state.correct / this.items.length * 100);
    }
    currentItem() {
      return this.items[this.state.idx] || null;
    }
    submit(x) {
      if (this.state.finished)
        return { done: true, message: "already finished" };
      const f = this.currentItem();
      if (this.gradeAnswer(f, x).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(f.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${f.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${f.evidence.quote}'`, score: this.getScore() };
      {
        const S = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: S, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const f = this.items.filter((y) => this.state.wrongIds.has(y.id));
          this.items = f.length > 0 ? f : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(m, "m");
  async function D({ llmCall: O, originalText: x, mode: f, format: y, purpose: S }) {
    const p = await v({ llmCall: O, originalText: x, mode: f, format: y }), g = await T({ llmCall: O, mode: f, purpose: S, format: y, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: y, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: S, passScore: 90, items: g.items } };
  }
  __name(D, "D");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: v, generateSelfTest: T, runPipeline: D, MasteryRunner: m };
})();
var vr = `/* MindStory Engine Bundle (compat) */
(function(){
  if(window.__MS_ENGINE_BUNDLE__) return;
  window.__MS_ENGINE_BUNDLE__=true;
  window.callEngineAPI = async function(kind, text, options){
    const res = await fetch('/api/engine', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        kind,
        text,
        mode: options?.mode || options?.level || 'standard',
        viewType: options?.viewType || options?.displayMode || 'narrative',
        options: { userId: options?.userId || options?.options?.userId || 'web_user' }
      })
    });
    const data = await res.json().catch(()=>({ok:false,error:{message:'bad json'}}));
    return data;
  }
})();`;
te.use("/api/*", qn());
te.get("/static/ms-engine-bundle.js", (t) => t.text(vr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
te.get("/favicon.ico", (t) => t.body(null, 204));
te.use("/static/*", Xn({ root: "./public" }));
te.get("/", (t) => t.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MindStory - \uD559\uC2B5 \uC694\uC57D \uB3C4\uC6B0\uBBF8</title>
  <style>
    :root{
      --bg0:#070A12;
      --bg1:#0B1020;
      --card: rgba(255,255,255,.06);
      --card2: rgba(255,255,255,.10);
      --stroke: rgba(255,255,255,.14);
      --txt: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.65);
      --muted2: rgba(255,255,255,.45);
      --brand:#8B5CF6;
      --brand2:#22D3EE;
      --danger:#FB7185;
      --ok:#34D399;
      --shadow: 0 18px 60px rgba(0,0,0,.55);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(1200px 800px at 20% 10%, rgba(139,92,246,.25), transparent 60%),
        radial-gradient(900px 700px at 80% 30%, rgba(34,211,238,.18), transparent 60%),
        radial-gradient(1100px 800px at 50% 110%, rgba(16,185,129,.12), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    .wrap{min-height:100%; display:flex; align-items:center; justify-content:center; padding:28px;}
    .card{
      width:min(1040px, 100%);
      background: linear-gradient(180deg, var(--card), rgba(255,255,255,.04));
      border:1px solid var(--stroke);
      border-radius:22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      overflow:hidden;
      position:relative;
    }
    .card::before{
      content:"";
      position:absolute; inset:-2px;
      background: radial-gradient(700px 320px at 30% 0%, rgba(139,92,246,.22), transparent 60%),
                  radial-gradient(520px 260px at 90% 20%, rgba(34,211,238,.18), transparent 60%);
      pointer-events:none;
    }
    .inner{position:relative; padding:22px;}
    .top{
      display:flex; gap:14px; align-items:center; justify-content:space-between;
      padding:18px 22px;
      border-bottom: 1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    }
    .brand{
      display:flex; align-items:center; gap:12px;
    }
    .logo{
      width:44px; height:44px; border-radius:14px;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.16), rgba(255,255,255,.04)),
                  linear-gradient(135deg, rgba(139,92,246,.9), rgba(34,211,238,.75));
      border:1px solid rgba(255,255,255,.18);
      box-shadow: 0 10px 30px rgba(139,92,246,.22);
      display:flex; align-items:center; justify-content:center;
      font-weight:800;
    }
    .title h1{margin:0; font-size:22px; letter-spacing:.2px}
    .title p{margin:2px 0 0; color:var(--muted); font-size:13px}
    .status{
      display:flex; flex-direction:column; align-items:flex-end; gap:6px;
      color:var(--muted);
      font-size:12px;
    }
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.18);
      border:1px solid rgba(255,255,255,.12);
    }
    .dot{width:8px; height:8px; border-radius:50%;}
    .dot.ok{background:var(--ok)}
    .dot.bad{background:var(--danger)}
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap:18px;
      padding:18px 22px 22px;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns: 1fr;}
      .status{align-items:flex-start}
      .top{flex-direction:column; align-items:flex-start}
    }
    .panel{
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:18px;
      padding:16px;
      backdrop-filter: blur(10px);
    }
    .label{color:var(--muted); font-size:13px; margin-bottom:10px; display:flex; gap:8px; align-items:center}
    .textarea{
      width:100%;
      min-height:220px;
      resize:vertical;
      padding:14px 14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.20);
      color:var(--txt);
      outline:none;
      line-height:1.55;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    }
    .textarea:focus{
      border-color: rgba(139,92,246,.55);
      box-shadow: 0 0 0 4px rgba(139,92,246,.18);
    }
    .row{display:flex; align-items:center; justify-content:space-between; margin-top:10px}
    .count{color:var(--muted2); font-size:12px}
    .segTitle{color:var(--muted); font-size:12px; margin:14px 0 8px}
    .seg{
      display:flex; flex-wrap:wrap; gap:10px;
    }
    .btn{
      appearance:none; border:none; cursor:pointer;
      border-radius:12px;
      padding:10px 12px;
      color:var(--txt);
      background: rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.12);
      transition: transform .08s ease, background .15s ease, border-color .15s ease;
      font-size:13px;
      display:inline-flex; align-items:center; gap:8px;
      user-select:none;
    }
    .btn:hover{background: rgba(255,255,255,.10)}
    .btn:active{transform: translateY(1px)}
    .btn.active{
      background: linear-gradient(135deg, rgba(139,92,246,.45), rgba(34,211,238,.18));
      border-color: rgba(139,92,246,.55);
    }
    .btn.primary{
      background: linear-gradient(135deg, rgba(139,92,246,.95), rgba(34,211,238,.55));
      border-color: rgba(255,255,255,.18);
      box-shadow: 0 18px 40px rgba(139,92,246,.18);
      font-weight:700;
    }
    .btn.primary:disabled{
      opacity:.45; cursor:not-allowed; box-shadow:none;
    }
    .btn.ghost{
      background: rgba(0,0,0,.18);
    }
    .actions{display:flex; gap:10px; margin-top:14px}
    .result{
      min-height:220px;
      display:flex; flex-direction:column; gap:10px;
    }
    .resultHead{
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding-bottom:10px; border-bottom: 1px solid rgba(255,255,255,.10);
    }
    .resultHead h2{margin:0; font-size:16px}
    .meta{color:var(--muted2); font-size:12px}
    .out{
      background: rgba(0,0,0,.22);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:14px;
      padding:14px;
      line-height:1.6;
      overflow:auto;
    }
    .out h3{margin:0 0 10px; font-size:14px}
    .out ul{margin:8px 0 0; padding-left:18px}
    .out li{margin:6px 0}
    .badge{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.20);
      border:1px solid rgba(255,255,255,.12);
      font-size:12px; color:var(--muted);
    }
    .spin{
      width:14px; height:14px;
      border-radius:50%;
      border:2px solid rgba(255,255,255,.22);
      border-top-color: rgba(255,255,255,.75);
      animation: spin 1s linear infinite;
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .err{
      color: rgba(255,255,255,.92);
      background: rgba(251,113,133,.12);
      border:1px solid rgba(251,113,133,.25);
      padding:10px 12px; border-radius:12px;
      display:none;
    }
    .hint{color:var(--muted2); font-size:12px; margin-top:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <div class="brand">
          <div class="logo">MS</div>
          <div class="title">
            <h1>MindStory</h1>
            <p>\uD559\uC2B5 \uC694\uC57D \uB3C4\uC6B0\uBBF8 \xB7 \uC555\uCD95 \uC694\uC57D \uC5D4\uC9C4 (AI + \uB85C\uCEEC \uD3F4\uBC31)</p>
          </div>
        </div>
        <div class="status">
          <div class="pill" id="healthPill">
            <span class="dot bad" id="healthDot"></span>
            <span id="healthText">\uC5D4\uC9C4 \uC5F0\uACB0 \uD655\uC778 \uC911\u2026</span>
          </div>
          <div class="meta" id="healthMeta">\u2014</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="label">\uC785\uB825 \uD14D\uC2A4\uD2B8</div>
          <textarea id="inputText" class="textarea" placeholder="\uC5EC\uAE30\uC5D0 \uC694\uC57D\uD560 \uD14D\uC2A4\uD2B8\uB97C \uBD99\uC5EC\uB123\uAC70\uB098 \uC785\uB825\uD558\uC138\uC694. (\uD14D\uC2A4\uD2B8 \uC190\uC2E4 \uC5C6\uC774 \uB3D9\uC791)"></textarea>
          <div class="row">
            <div class="hint">\uC694\uC57D\uC740 \uBB38\uC7A5\uC744 "\uC790\uB974\uC9C0 \uC54A\uACE0" \uC758\uBBF8 \uB2E8\uC704\uB85C \uC555\uCD95\uD569\uB2C8\uB2E4.</div>
            <div class="count"><span id="charCount">0</span> \uC790</div>
          </div>

          <div class="segTitle">\uC694\uC57D \uBAA8\uB4DC</div>
          <div class="seg" id="modeSeg">
            <button class="btn" data-mode="brief">\u26A1 \uAC04\uB2E8</button>
            <button class="btn active" data-mode="standard">\u2696\uFE0F \uD45C\uC900</button>
            <button class="btn" data-mode="detail">\u{1F52C} \uC0C1\uC138</button>
          </div>

          <div class="segTitle">\uBCF4\uAE30 \uD615\uC2DD</div>
          <div class="seg" id="viewSeg">
            <button class="btn active" data-view="narrative">\u{1F4D8} \uC11C\uC220\uD615</button>
            <button class="btn" data-view="structured">\u{1F9F1} \uAD6C\uC870\uD654</button>
            <button class="btn" data-view="mindmap">\u{1F9E0} \uB9C8\uC778\uB4DC\uB9F5</button>
            <button class="btn" data-view="selftest">\u2705 \uC790\uAC00\uD14C\uC2A4\uD2B8</button>
          </div>

          <div class="actions">
            <button id="summarizeBtn" class="btn primary" disabled>\u2728 \uC694\uC57D\uD558\uAE30</button>
            <button id="clearBtn" class="btn ghost">\u{1F9F9} \uC9C0\uC6B0\uAE30</button>
          </div>
          <div class="err" id="errBox"></div>
        </div>

        <div class="panel result">
          <div class="resultHead">
            <h2>\uACB0\uACFC</h2>
            <div style="display:flex; gap:10px; align-items:center;">
              <span class="badge" id="runBadge"><span class="spin" id="spin" style="display:none"></span><span id="runText">\uB300\uAE30</span></span>
              <button id="copyBtn" class="btn">\u{1F4CB} \uBCF5\uC0AC</button>
            </div>
          </div>
          <div class="out" id="out">
            <div class="meta">\uC544\uC9C1 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC624\uB978\uCABD \uC0C1\uB2E8 \uC0C1\uD0DC\uAC00 'OK'\uC778\uC9C0 \uD655\uC778 \uD6C4 \uC694\uC57D\uC744 \uC2E4\uD589\uD558\uC138\uC694.</div>
          </div>
          <div class="meta" id="resultMeta">\u2014</div>
        </div>
      </div>
    </div>
  </div>

  <script src="/static/ms-engine-bundle.js"><\/script>
  <script>
    let currentMode = 'standard';
    let currentView = 'narrative';

    const elInput = document.getElementById('inputText');
    const elChar = document.getElementById('charCount');
    const elSumm = document.getElementById('summarizeBtn');
    const elClear = document.getElementById('clearBtn');
    const elOut = document.getElementById('out');
    const elErr = document.getElementById('errBox');
    const elMeta = document.getElementById('resultMeta');
    const elCopy = document.getElementById('copyBtn');
    const elRunBadge = document.getElementById('runBadge');
    const elRunText = document.getElementById('runText');
    const elSpin = document.getElementById('spin');

    const healthDot = document.getElementById('healthDot');
    const healthText = document.getElementById('healthText');
    const healthMeta = document.getElementById('healthMeta');

    function setErr(msg){
      if(!msg){ elErr.style.display='none'; elErr.textContent=''; return; }
      elErr.style.display='block';
      elErr.textContent = msg;
    }
    function setRunning(r){
      elSpin.style.display = r ? 'inline-block' : 'none';
      elRunText.textContent = r ? '\uC2E4\uD589 \uC911' : '\uB300\uAE30';
    }

    function pickActive(seg, key, value){
      seg.querySelectorAll('.btn').forEach(b=>{
        const v = b.dataset[key];
        if(v === value) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    document.getElementById('modeSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentMode = btn.dataset.mode;
      pickActive(document.getElementById('modeSeg'), 'mode', currentMode);
    });

    document.getElementById('viewSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentView = btn.dataset.view;
      pickActive(document.getElementById('viewSeg'), 'view', currentView);
    });

    elInput.addEventListener('input', ()=>{
      const n = elInput.value.length;
      elChar.textContent = n;
      elSumm.disabled = n < 5;
      setErr('');
    });

    elClear.addEventListener('click', ()=>{
      elInput.value = '';
      elChar.textContent = '0';
      elSumm.disabled = true;
      setErr('');
      elOut.innerHTML = '<div class="meta">\uCD08\uAE30\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</div>';
      elMeta.textContent = '\u2014';
    });

    elCopy.addEventListener('click', async ()=>{
      const text = elOut.innerText || '';
      try{
        await navigator.clipboard.writeText(text);
        elCopy.textContent = '\u2705 \uBCF5\uC0AC\uB428';
        setTimeout(()=> elCopy.textContent='\u{1F4CB} \uBCF5\uC0AC', 1200);
      }catch{
        alert('\uBCF5\uC0AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
      }
    });

    function render(data){
      // data: { kind, mode, viewType, narrative|structured|mindmap|selftest }
      const v = currentView;
      if(v === 'narrative' && data.narrative){
        elOut.innerHTML = '<h3>\uC11C\uC220\uD615 \uC694\uC57D</h3><div>' + escapeHtml(data.narrative) + '</div>';
        return;
      }
      if(v === 'structured' && data.structured){
        const bullets = data.structured.bullets || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.structured.title || '\uAD6C\uC870\uD654 \uC694\uC57D') + '</h3><ul>' +
          bullets.map(b=>'<li>' + escapeHtml(String(b).replace(/^[-\u2022]\\s*/,'')) + '</li>').join('') +
        '</ul>';
        return;
      }
      if(v === 'mindmap' && data.mindmap){
        const center = data.mindmap.center || '\uD575\uC2EC';
        const nodes = (data.mindmap.nodes || []).filter(n=>n.id !== 'c');
        elOut.innerHTML =
          '<h3>\uB9C8\uC778\uB4DC\uB9F5(\uAC04\uC774)</h3>' +
          '<div style="display:flex; flex-direction:column; gap:10px;">' +
            '<div class="badge">\u{1F31F} ' + escapeHtml(center) + '</div>' +
            '<ul>' + nodes.map(n=>'<li>' + escapeHtml(n.label || '') + '</li>').join('') + '</ul>' +
          '</div>';
        return;
      }
      if(v === 'selftest' && data.selftest){
        const qs = data.selftest.questions || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.selftest.title || '\uC140\uD504\uD14C\uC2A4\uD2B8') + '</h3>' +
          qs.map((q,i)=>(
            '<div style="padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;">' +
              '<div style="font-weight:700; margin-bottom:6px;">Q' + (i+1) + '. ' + escapeHtml(q.question || '') + '</div>' +
              '<div class="meta">\uD78C\uD2B8: ' + escapeHtml(q.answerHint || '') + '</div>' +
            '</div>'
          )).join('');
        return;
      }
      elOut.innerHTML = '<div class="meta">\uC120\uD0DD\uD55C \uBCF4\uAE30 \uD615\uC2DD\uC5D0 \uD574\uB2F9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
    }

    async function health(){
      try{
        const r = await fetch('/api/health');
        const j = await r.json();
        if(j.ok){
          healthDot.className = 'dot ok';
          healthText.textContent = '\uC5D4\uC9C4 OK \xB7 ' + (j.engineMode || 'unknown');
          healthMeta.textContent = 'db:' + (j.hasDB ? 'on' : 'off') + ' \xB7 ' + (j.ts || '');
        }else{
          healthDot.className = 'dot bad';
          healthText.textContent = '\uC5D4\uC9C4 \uC751\uB2F5 \uBE44\uC815\uC0C1';
          healthMeta.textContent = '';
        }
      }catch{
        healthDot.className = 'dot bad';
        healthText.textContent = '\uC5D4\uC9C4 \uC5F0\uACB0 \uC2E4\uD328';
        healthMeta.textContent = '';
      }
    }
    health();
    setInterval(health, 8000);

    elSumm.addEventListener('click', async ()=>{
      const text = (elInput.value || '').trim();
      if(text.length < 5) return;

      setErr('');
      setRunning(true);
      elMeta.textContent = '\u2014';

      try{
        const res = await fetch('/api/engine', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({
            kind: 'summary',
            text,
            mode: currentMode,
            viewType: currentView,
            options: { userId: 'web_user' }
          })
        });
        const j = await res.json();
        if(!j.ok){
          throw new Error(j.error?.message || '\uC694\uC57D \uC2E4\uD328');
        }
        render(j.data);
        const m = j.meta || {};
        elMeta.textContent =
          'engine: ' + (m.engine || 'unknown') +
          ' \xB7 cached: ' + (m.cached ? 'true' : 'false') +
          (m.cacheStore ? ('(' + m.cacheStore + ')') : '') +
          ' \xB7 ' + (m.elapsedMs != null ? (m.elapsedMs + 'ms') : '');
      }catch(e){
        setErr(e && e.message ? e.message : '\uC694\uC57D \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.');
      }finally{
        setRunning(false);
      }
    });
  <\/script>
</body>
</html>`));
te.get("/api/health", (t) => {
  const e = !!z(t.env.GEMINI_API_KEY).trim(), n = z(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Yt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
te.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = z((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = Wt((n == null ? void 0 : n.mode) || "standard"), i = Xt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = z((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!z(t.env.GEMINI_API_KEY).trim(), c = z(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name(async ({ system: u, user: h, json: b }) => {
    if (b) {
      const C = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await nn(t.env, C);
    } else
      return (await mr(t.env, u, h) || "").toString();
  }, "l");
  try {
    const u = await xr.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
te.post("/api/engine", async (t) => {
  var _, v;
  const e = Date.now(), n = t.env.DB;
  await fr(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = tr(r == null ? void 0 : r.kind), i = z((r == null ? void 0 : r.text) || ""), a = Wt((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = Xt((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = z(((_ = r == null ? void 0 : r.options) == null ? void 0 : _.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = hr(s, a, o, i, c || null), u = await wt(n, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = ur(s, a, i, c || null), b = await wt(n, h);
  if (b.hit && ((v = b.data) != null && v.narrative)) {
    const w = b.data.narrative;
    let T;
    return o === "narrative" ? T = { kind: s, mode: a, viewType: o, narrative: w } : o === "structured" ? T = { kind: s, mode: a, ...yt(w) } : o === "mindmap" ? T = { kind: s, mode: a, ...St(w) } : T = { kind: s, mode: a, ...Et(w) }, await Le(n, l, c || "anon", T), t.json({ ok: true, data: T, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const C = !!z(t.env.GEMINI_API_KEY).trim(), N = z(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && C && !N)
    try {
      const w = await gr(t.env, i);
      let T;
      a === "brief" ? T = w.brief : a === "standard" ? T = w.standard : T = `**\uAC1C\uB150**
${w.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${w.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${w.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`;
      const I = { kind: s, mode: a, viewType: "narrative", narrative: T, allSummaries: { brief: w.brief, standard: w.standard, detail: w.detail }, meta: w.meta };
      await Le(n, h, c || "anon", I);
      let m;
      return o === "narrative" ? m = I : o === "structured" ? m = { kind: s, mode: a, ...yt(T) } : o === "mindmap" ? m = { kind: s, mode: a, ...St(T) } : m = { kind: s, mode: a, ...Et(T) }, await Le(n, l, c || "anon", m), t.json({ ok: true, data: m, meta: { cached: false, engine: "gemini-json-v3", elapsedMs: Date.now() - e } }, 200);
    } catch (w) {
      console.error("[Gemini JSON Error]", w);
    }
  const k = dr(i, a, o);
  if (await Le(n, l, c || "anon", k), k.narrative) {
    const w = { kind: "summary", mode: a, viewType: "narrative", narrative: k.narrative };
    await Le(n, h, c || "anon", w);
  }
  return t.json({ ok: true, data: k, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
te.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
te.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var Ot = new zt();
var br = Object.assign({ "/src/index.tsx": te });
var rn = false;
for (const [, t] of Object.entries(br))
  t && (Ot.route("/", t), Ot.notFound(t.notFoundHandler), rn = true);
if (!rn)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-2nN4eX/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Ot;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-2nN4eX/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.5603173940307564.mjs.map
