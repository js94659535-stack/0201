var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-tHPjpj/checked-fetch.js
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

// .wrangler/tmp/bundle-tHPjpj/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-zGyUE9/bundledWorker-0.7350826559532924.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var urls2 = /* @__PURE__ */ new Set();
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL2, "checkURL");
__name2(checkURL2, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL2(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});
function stripCfConnectingIPHeader2(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
__name2(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader2.apply(null, argArray)
    ]);
  }
});
var kt = Object.defineProperty;
var Ye = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "Ye");
var _t = /* @__PURE__ */ __name2((t, e, r) => e in t ? kt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "_t");
var g = /* @__PURE__ */ __name2((t, e, r) => _t(t, typeof e != "symbol" ? e + "" : e, r), "g");
var Fe = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || Ye("Cannot " + r), "Fe");
var u = /* @__PURE__ */ __name2((t, e, r) => (Fe(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "u");
var x = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? Ye("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "x");
var p = /* @__PURE__ */ __name2((t, e, r, n) => (Fe(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "p");
var w = /* @__PURE__ */ __name2((t, e, r) => (Fe(t, e, "access private method"), r), "w");
var Qe = /* @__PURE__ */ __name2((t, e, r, n) => ({ set _(s) {
  p(t, e, s, r);
}, get _() {
  return u(t, e, n);
} }), "Qe");
var Ze = /* @__PURE__ */ __name2((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let l, o = false, h;
    if (t[c] ? (h = t[c][0][0], n.req.routeIndex = c) : h = c === t.length && s || void 0, h)
      try {
        l = await h(n, () => a(c + 1));
      } catch (d) {
        if (d instanceof Error && e)
          n.error = d, l = await e(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || o) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "Ze");
var Pt = Symbol();
var It = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof xt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Nt(t, { all: r, dot: n }) : {};
}, "It");
async function Nt(t, e) {
  const r = await t.formData();
  return r ? Ht(r, e) : {};
}
__name(Nt, "Nt");
__name2(Nt, "Nt");
function Ht(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? Mt(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Dt(r, n, s), delete r[n]);
  }), r;
}
__name(Ht, "Ht");
__name2(Ht, "Ht");
var Mt = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Mt");
var Dt = /* @__PURE__ */ __name2((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Dt");
var dt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "dt");
var qt = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = Lt(t), n = dt(r);
  return Ft(n, e);
}, "qt");
var Lt = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "Lt");
var Ft = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "Ft");
var _e = {};
var zt = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return _e[n] || (r[2] ? _e[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : _e[n] = [t, r[1], true]), _e[n];
  }
  return null;
}, "zt");
var Je = /* @__PURE__ */ __name2((t, e) => {
  try {
    return e(t);
  } catch {
    return t.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return e(r);
      } catch {
        return r;
      }
    });
  }
}, "Je");
var Bt = /* @__PURE__ */ __name2((t) => Je(t, decodeURI), "Bt");
var ft = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return Bt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "ft");
var Ut = /* @__PURE__ */ __name2((t) => {
  const e = ft(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "Ut");
var ce = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = ce(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ce");
var pt = /* @__PURE__ */ __name2((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), r = [];
  let n = "";
  return e.forEach((s) => {
    if (s !== "" && !/\:/.test(s))
      n += "/" + s;
    else if (/\:/.test(s))
      if (/\?/.test(s)) {
        r.length === 0 && n === "" ? r.push("/") : r.push(n);
        const i = s.replace("?", "");
        n += "/" + i, r.push(n);
      } else
        n += "/" + s;
  }), r.filter((s, i, a) => a.indexOf(s) === i);
}, "pt");
var ze = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Je(t, mt) : t) : t, "ze");
var gt = /* @__PURE__ */ __name2((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const c = t.charCodeAt(a + e.length + 1);
      if (c === 61) {
        const l = a + e.length + 2, o = t.indexOf("&", l);
        return ze(t.slice(l, o === -1 ? void 0 : o));
      } else if (c == 38 || isNaN(c))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (n = /[%+]/.test(t), !n)
      return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let c = t.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let l = t.slice(i + 1, c === -1 ? a === -1 ? void 0 : a : c);
    if (n && (l = ze(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = t.slice(c + 1, a === -1 ? void 0 : a), n && (o = ze(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return e ? s[e] : s;
}, "gt");
var Gt = gt;
var Kt = /* @__PURE__ */ __name2((t, e) => gt(t, e, true), "Kt");
var mt = decodeURIComponent;
var et = /* @__PURE__ */ __name2((t) => Je(t, mt), "et");
var fe;
var k;
var F;
var vt;
var wt;
var Ge;
var U;
var at;
var xt = (at = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    x(this, F);
    g(this, "raw");
    x(this, fe);
    x(this, k);
    g(this, "routeIndex", 0);
    g(this, "path");
    g(this, "bodyCache", {});
    x(this, U, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, p(this, k, r), p(this, fe, {});
  }
  param(t) {
    return t ? w(this, F, vt).call(this, t) : w(this, F, wt).call(this);
  }
  query(t) {
    return Gt(this.url, t);
  }
  queries(t) {
    return Kt(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, n) => {
      e[n] = r;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await It(this, t));
  }
  json() {
    return u(this, U).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return u(this, U).call(this, "text");
  }
  arrayBuffer() {
    return u(this, U).call(this, "arrayBuffer");
  }
  blob() {
    return u(this, U).call(this, "blob");
  }
  formData() {
    return u(this, U).call(this, "formData");
  }
  addValidatedData(t, e) {
    u(this, fe)[t] = e;
  }
  valid(t) {
    return u(this, fe)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Pt]() {
    return u(this, k);
  }
  get matchedRoutes() {
    return u(this, k)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return u(this, k)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "at"), fe = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet(), vt = /* @__PURE__ */ __name2(function(t) {
  const e = u(this, k)[0][this.routeIndex][1][t], r = w(this, F, Ge).call(this, e);
  return r && /\%/.test(r) ? et(r) : r;
}, "vt"), wt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(u(this, k)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = w(this, F, Ge).call(this, u(this, k)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? et(n) : n);
  }
  return t;
}, "wt"), Ge = /* @__PURE__ */ __name2(function(t) {
  return u(this, k)[1] ? u(this, k)[1][t] : t;
}, "Ge"), U = /* @__PURE__ */ new WeakMap(), at);
var Jt = { Stringify: 1 };
var yt = /* @__PURE__ */ __name2(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((c) => c({ phase: e, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => yt(l, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "yt");
var Vt = "text/plain; charset=UTF-8";
var Be = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Be");
var Oe;
var Re;
var M;
var pe;
var D;
var $;
var Ae;
var ge;
var me;
var Q;
var $e;
var Ce;
var G;
var le;
var ot;
var Wt = (ot = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    x(this, G);
    x(this, Oe);
    x(this, Re);
    g(this, "env", {});
    x(this, M);
    g(this, "finalized", false);
    g(this, "error");
    x(this, pe);
    x(this, D);
    x(this, $);
    x(this, Ae);
    x(this, ge);
    x(this, me);
    x(this, Q);
    x(this, $e);
    x(this, Ce);
    g(this, "render", (...t2) => (u(this, ge) ?? p(this, ge, (e2) => this.html(e2)), u(this, ge).call(this, ...t2)));
    g(this, "setLayout", (t2) => p(this, Ae, t2));
    g(this, "getLayout", () => u(this, Ae));
    g(this, "setRenderer", (t2) => {
      p(this, ge, t2);
    });
    g(this, "header", (t2, e2, r) => {
      this.finalized && p(this, $, new Response(u(this, $).body, u(this, $)));
      const n = u(this, $) ? u(this, $).headers : u(this, Q) ?? p(this, Q, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    g(this, "status", (t2) => {
      p(this, pe, t2);
    });
    g(this, "set", (t2, e2) => {
      u(this, M) ?? p(this, M, /* @__PURE__ */ new Map()), u(this, M).set(t2, e2);
    });
    g(this, "get", (t2) => u(this, M) ? u(this, M).get(t2) : void 0);
    g(this, "newResponse", (...t2) => w(this, G, le).call(this, ...t2));
    g(this, "body", (t2, e2, r) => w(this, G, le).call(this, t2, e2, r));
    g(this, "text", (t2, e2, r) => !u(this, Q) && !u(this, pe) && !e2 && !r && !this.finalized ? new Response(t2) : w(this, G, le).call(this, t2, e2, Be(Vt, r)));
    g(this, "json", (t2, e2, r) => w(this, G, le).call(this, JSON.stringify(t2), e2, Be("application/json", r)));
    g(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name2((s) => w(this, G, le).call(this, s, e2, Be("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? yt(t2, Jt.Stringify, false, {}).then(n) : n(t2);
    });
    g(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    g(this, "notFound", () => (u(this, me) ?? p(this, me, () => new Response()), u(this, me).call(this, this)));
    p(this, Oe, t), e && (p(this, D, e.executionCtx), this.env = e.env, p(this, me, e.notFoundHandler), p(this, Ce, e.path), p(this, $e, e.matchResult));
  }
  get req() {
    return u(this, Re) ?? p(this, Re, new xt(u(this, Oe), u(this, Ce), u(this, $e))), u(this, Re);
  }
  get event() {
    if (u(this, D) && "respondWith" in u(this, D))
      return u(this, D);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (u(this, D))
      return u(this, D);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return u(this, $) || p(this, $, new Response(null, { headers: u(this, Q) ?? p(this, Q, new Headers()) }));
  }
  set res(t) {
    if (u(this, $) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of u(this, $).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = u(this, $).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    p(this, $, t), this.finalized = true;
  }
  get var() {
    return u(this, M) ? Object.fromEntries(u(this, M)) : {};
  }
}, "ot"), Oe = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), le = /* @__PURE__ */ __name2(function(t, e, r) {
  const n = u(this, $) ? new Headers(u(this, $).headers) : u(this, Q) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, c] of i)
      a.toLowerCase() === "set-cookie" ? n.append(a, c) : n.set(a, c);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        n.set(i, a);
      else {
        n.delete(i);
        for (const c of a)
          n.append(i, c);
      }
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? u(this, pe);
  return new Response(t, { status: s, headers: n });
}, "le"), ot);
var b = "ALL";
var Xt = "all";
var Yt = ["get", "post", "put", "delete", "options", "patch"];
var Et = "Can not add a route since the matcher is already built.";
var St = /* @__PURE__ */ __name2(class extends Error {
}, "St");
var Qt = "__COMPOSED_HANDLER";
var Zt = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "Zt");
var tt = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "tt");
var _;
var j;
var bt;
var P;
var X;
var Pe;
var Ie;
var xe;
var er = (xe = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    x(this, j);
    g(this, "get");
    g(this, "post");
    g(this, "put");
    g(this, "delete");
    g(this, "options");
    g(this, "patch");
    g(this, "all");
    g(this, "on");
    g(this, "use");
    g(this, "router");
    g(this, "getPath");
    g(this, "_basePath", "/");
    x(this, _, "/");
    g(this, "routes", []);
    x(this, P, Zt);
    g(this, "errorHandler", tt);
    g(this, "onError", (e2) => (this.errorHandler = e2, this));
    g(this, "notFound", (e2) => (p(this, P, e2), this));
    g(this, "fetch", (e2, ...r) => w(this, j, Ie).call(this, e2, r[1], r[0], e2.method));
    g(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ce("/", e2)}`, r), n2, s2)));
    g(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(w(this, j, Ie).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...Yt, Xt].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? p(this, _, a) : w(this, j, X).call(this, i, u(this, _), a), c.forEach((l) => {
        w(this, j, X).call(this, i, u(this, _), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        p(this, _, l);
        for (const o of [i].flat())
          c.map((h) => {
            w(this, j, X).call(this, o.toUpperCase(), u(this, _), h);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? p(this, _, i) : (p(this, _, "*"), a.unshift(i)), a.forEach((c) => {
      w(this, j, X).call(this, b, u(this, _), c);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? ft : Ut;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === tt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await Ze([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[Qt] = s.handler), w(a = n, j, X).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = w(this, j, bt).call(this);
    return r._basePath = ce(this._basePath, e), r;
  }
  mount(e, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((l) => l, "s") : s = n.replaceRequest));
    const a = i ? (l) => {
      const o = i(l);
      return Array.isArray(o) ? o : [o];
    } : (l) => {
      let o;
      try {
        o = l.executionCtx;
      } catch {
      }
      return [l.env, o];
    };
    s || (s = (() => {
      const l = ce(this._basePath, e), o = l === "/" ? 0 : l.length;
      return (h) => {
        const d = new URL(h.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, h);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const h = await r(s(l.req.raw), ...a(l));
      if (h)
        return h;
      await o();
    }, "c");
    return w(this, j, X).call(this, b, ce(e, "*"), c), this;
  }
}, "xe"), _ = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), bt = /* @__PURE__ */ __name2(function() {
  const e = new xe({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, p(e, P, u(this, P)), e.routes = this.routes, e;
}, "bt"), P = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ __name2(function(e, r, n) {
  e = e.toUpperCase(), r = ce(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "X"), Pe = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Pe"), Ie = /* @__PURE__ */ __name2(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await w(this, j, Ie).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), c = new Wt(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: u(this, P) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await u(this, P).call(this, c);
      });
    } catch (h) {
      return w(this, j, Pe).call(this, h, c);
    }
    return o instanceof Promise ? o.then((h) => h || (c.finalized ? c.res : u(this, P).call(this, c))).catch((h) => w(this, j, Pe).call(this, h, c)) : o ?? u(this, P).call(this, c);
  }
  const l = Ze(a[0], this.errorHandler, u(this, P));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return w(this, j, Pe).call(this, o, c);
    }
  })();
}, "Ie"), xe);
var jt = [];
function tr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[b], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], jt];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(t, e);
}
__name(tr, "tr");
__name2(tr, "tr");
var He = "[^/]+";
var Se = ".*";
var be = "(?:|/.*)";
var ue = Symbol();
var rr = new Set(".\\+*[^]$()");
function nr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Se || t === be ? 1 : e === Se || e === be ? -1 : t === He ? 1 : e === He ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(nr, "nr");
__name2(nr, "nr");
var Z;
var ee;
var I;
var ne;
var sr = (ne = /* @__PURE__ */ __name2(class {
  constructor() {
    x(this, Z);
    x(this, ee);
    x(this, I, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (u(this, Z) !== void 0)
        throw ue;
      if (i)
        return;
      p(this, Z, r);
      return;
    }
    const [a, ...c] = e, l = a === "*" ? c.length === 0 ? ["", "", Se] : ["", "", He] : a === "/*" ? ["", "", be] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const h = l[1];
      let d = l[2] || He;
      if (h && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw ue;
      if (o = u(this, I)[d], !o) {
        if (Object.keys(u(this, I)).some((f) => f !== Se && f !== be))
          throw ue;
        if (i)
          return;
        o = u(this, I)[d] = new ne(), h !== "" && p(o, ee, s.varIndex++);
      }
      !i && h !== "" && n.push([h, u(o, ee)]);
    } else if (o = u(this, I)[a], !o) {
      if (Object.keys(u(this, I)).some((h) => h.length > 1 && h !== Se && h !== be))
        throw ue;
      if (i)
        return;
      o = u(this, I)[a] = new ne();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(u(this, I)).sort(nr).map((n) => {
      const s = u(this, I)[n];
      return (typeof u(s, ee) == "number" ? `(${n})@${u(s, ee)}` : rr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof u(this, Z) == "number" && r.unshift(`#${u(this, Z)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ne"), Z = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ne);
var Me;
var ke;
var ct;
var ir = (ct = /* @__PURE__ */ __name2(class {
  constructor() {
    x(this, Me, { varIndex: 0 });
    x(this, ke, new sr());
  }
  insert(t, e, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let c = false;
      if (t = t.replace(/\{[^}]+\}/g, (l) => {
        const o = `@\\${a}`;
        return s[a] = [o, l], a++, c = true, o;
      }), !c)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [c] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(c) !== -1) {
          i[l] = i[l].replace(c, s[a][1]);
          break;
        }
    }
    return u(this, ke).insert(i, e, n, u(this, Me), r), n;
  }
  buildRegExp() {
    let t = u(this, ke).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "ct"), Me = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), ct);
var ar = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ne = /* @__PURE__ */ Object.create(null);
function Tt(t) {
  return Ne[t] ?? (Ne[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Tt, "Tt");
__name2(Tt, "Tt");
function or() {
  Ne = /* @__PURE__ */ Object.create(null);
}
__name(or, "or");
__name2(or, "or");
function cr(t) {
  var o;
  const e = new ir(), r = [];
  if (t.length === 0)
    return ar;
  const n = t.map((h) => [!/\*|\/:/.test(h[0]), ...h]).sort(([h, d], [f, m]) => h ? 1 : f ? -1 : d.length - m.length), s = /* @__PURE__ */ Object.create(null);
  for (let h = 0, d = -1, f = n.length; h < f; h++) {
    const [m, y, T] = n[h];
    m ? s[y] = [T.map(([S]) => [S, /* @__PURE__ */ Object.create(null)]), jt] : d++;
    let v;
    try {
      v = e.insert(y, d, m);
    } catch (S) {
      throw S === ue ? new St(y) : S;
    }
    m || (r[d] = T.map(([S, E]) => {
      const N = /* @__PURE__ */ Object.create(null);
      for (E -= 1; E >= 0; E--) {
        const [H, O] = v[E];
        N[H] = O;
      }
      return [S, N];
    }));
  }
  const [i, a, c] = e.buildRegExp();
  for (let h = 0, d = r.length; h < d; h++)
    for (let f = 0, m = r[h].length; f < m; f++) {
      const y = (o = r[h][f]) == null ? void 0 : o[1];
      if (!y)
        continue;
      const T = Object.keys(y);
      for (let v = 0, S = T.length; v < S; v++)
        y[T[v]] = c[y[T[v]]];
    }
  const l = [];
  for (const h in a)
    l[h] = r[a[h]];
  return [i, l, s];
}
__name(cr, "cr");
__name2(cr, "cr");
function oe(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (Tt(r).test(e))
        return [...t[r]];
  }
}
__name(oe, "oe");
__name2(oe, "oe");
var K;
var J;
var De;
var Ot;
var lt;
var lr = (lt = /* @__PURE__ */ __name2(class {
  constructor() {
    x(this, De);
    g(this, "name", "RegExpRouter");
    x(this, K);
    x(this, J);
    g(this, "match", tr);
    p(this, K, { [b]: /* @__PURE__ */ Object.create(null) }), p(this, J, { [b]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var c;
    const n = u(this, K), s = u(this, J);
    if (!n || !s)
      throw new Error(Et);
    n[t] || [n, s].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[b]).forEach((o) => {
        l[t][o] = [...l[b][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = Tt(e);
      t === b ? Object.keys(n).forEach((o) => {
        var h;
        (h = n[o])[e] || (h[e] = oe(n[o], e) || oe(n[b], e) || []);
      }) : (c = n[t])[e] || (c[e] = oe(n[t], e) || oe(n[b], e) || []), Object.keys(n).forEach((o) => {
        (t === b || t === o) && Object.keys(n[o]).forEach((h) => {
          l.test(h) && n[o][h].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (t === b || t === o) && Object.keys(s[o]).forEach((h) => l.test(h) && s[o][h].push([r, i]));
      });
      return;
    }
    const a = pt(e) || [e];
    for (let l = 0, o = a.length; l < o; l++) {
      const h = a[l];
      Object.keys(s).forEach((d) => {
        var f;
        (t === b || t === d) && ((f = s[d])[h] || (f[h] = [...oe(n[d], h) || oe(n[b], h) || []]), s[d][h].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(u(this, J)).concat(Object.keys(u(this, K))).forEach((e) => {
      t[e] || (t[e] = w(this, De, Ot).call(this, e));
    }), p(this, K, p(this, J, void 0)), or(), t;
  }
}, "lt"), K = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakSet(), Ot = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === b;
  return [u(this, K), u(this, J)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== b && e.push(...Object.keys(n[b]).map((i) => [i, n[b][i]]));
  }), r ? cr(e) : null;
}, "Ot"), lt);
var V;
var q;
var ut;
var ur = (ut = /* @__PURE__ */ __name2(class {
  constructor(t) {
    g(this, "name", "SmartRouter");
    x(this, V, []);
    x(this, q, []);
    p(this, V, t.routers);
  }
  add(t, e, r) {
    if (!u(this, q))
      throw new Error(Et);
    u(this, q).push([t, e, r]);
  }
  match(t, e) {
    if (!u(this, q))
      throw new Error("Fatal error");
    const r = u(this, V), n = u(this, q), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(t, e);
      } catch (l) {
        if (l instanceof St)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), p(this, V, [c]), p(this, q, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (u(this, q) || u(this, V).length !== 1)
      throw new Error("No active router has been determined yet.");
    return u(this, V)[0];
  }
}, "ut"), V = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), ut);
var Ee = /* @__PURE__ */ Object.create(null);
var W;
var A;
var te;
var ve;
var R;
var L;
var Y;
var we;
var hr = (we = /* @__PURE__ */ __name2(class {
  constructor(e, r, n) {
    x(this, L);
    x(this, W);
    x(this, A);
    x(this, te);
    x(this, ve, 0);
    x(this, R, Ee);
    if (p(this, A, n || /* @__PURE__ */ Object.create(null)), p(this, W, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, p(this, W, [s]);
    }
    p(this, te, []);
  }
  insert(e, r, n) {
    p(this, ve, ++Qe(this, ve)._);
    let s = this;
    const i = qt(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], h = i[c + 1], d = zt(o, h), f = Array.isArray(d) ? d[0] : o;
      if (f in u(s, A)) {
        s = u(s, A)[f], d && a.push(d[1]);
        continue;
      }
      u(s, A)[f] = new we(), d && (u(s, te).push(d), a.push(d[1])), s = u(s, A)[f];
    }
    return u(s, W).push({ [e]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: u(this, ve) } }), s;
  }
  search(e, r) {
    var l;
    const n = [];
    p(this, R, Ee);
    let i = [this];
    const a = dt(r), c = [];
    for (let o = 0, h = a.length; o < h; o++) {
      const d = a[o], f = o === h - 1, m = [];
      for (let y = 0, T = i.length; y < T; y++) {
        const v = i[y], S = u(v, A)[d];
        S && (p(S, R, u(v, R)), f ? (u(S, A)["*"] && n.push(...w(this, L, Y).call(this, u(S, A)["*"], e, u(v, R))), n.push(...w(this, L, Y).call(this, S, e, u(v, R)))) : m.push(S));
        for (let E = 0, N = u(v, te).length; E < N; E++) {
          const H = u(v, te)[E], O = u(v, R) === Ee ? {} : { ...u(v, R) };
          if (H === "*") {
            const B = u(v, A)["*"];
            B && (n.push(...w(this, L, Y).call(this, B, e, u(v, R))), p(B, R, O), m.push(B));
            continue;
          }
          const [Xe, ie, ae] = H;
          if (!d && !(ae instanceof RegExp))
            continue;
          const C = u(v, A)[Xe], ye = a.slice(o).join("/");
          if (ae instanceof RegExp) {
            const B = ae.exec(ye);
            if (B) {
              if (O[ie] = B[0], n.push(...w(this, L, Y).call(this, C, e, u(v, R), O)), Object.keys(u(C, A)).length) {
                p(C, R, O);
                const Le = ((l = B[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[Le] || (c[Le] = [])).push(C);
              }
              continue;
            }
          }
          (ae === true || ae.test(d)) && (O[ie] = d, f ? (n.push(...w(this, L, Y).call(this, C, e, O, u(v, R))), u(C, A)["*"] && n.push(...w(this, L, Y).call(this, u(C, A)["*"], e, O, u(v, R)))) : (p(C, R, O), m.push(C)));
        }
      }
      i = m.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, h) => o.score - h.score), [n.map(({ handler: o, params: h }) => [o, h])];
  }
}, "we"), W = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakSet(), Y = /* @__PURE__ */ __name2(function(e, r, n, s) {
  const i = [];
  for (let a = 0, c = u(e, W).length; a < c; a++) {
    const l = u(e, W)[a], o = l[r] || l[b], h = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ee || s && s !== Ee))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const m = o.possibleKeys[d], y = h[o.score];
        o.params[m] = s != null && s[m] && !y ? s[m] : n[m] ?? (s == null ? void 0 : s[m]), h[o.score] = true;
      }
  }
  return i;
}, "Y"), we);
var re;
var ht;
var dr = (ht = /* @__PURE__ */ __name2(class {
  constructor() {
    g(this, "name", "TrieRouter");
    x(this, re);
    p(this, re, new hr());
  }
  add(t, e, r) {
    const n = pt(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        u(this, re).insert(t, n[s], r);
      return;
    }
    u(this, re).insert(t, e, r);
  }
  match(t, e) {
    return u(this, re).search(t, e);
  }
}, "ht"), re = /* @__PURE__ */ new WeakMap(), ht);
var Rt = /* @__PURE__ */ __name2(class extends er {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new ur({ routers: [new lr(), new dr()] });
  }
}, "Rt");
var fr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var h;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (h = r.exposeHeaders) != null && h.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && l("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const m = a.req.header("Access-Control-Request-Headers");
        m && (f = m.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "fr");
var pr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var rt = /* @__PURE__ */ __name2((t, e = mr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "rt");
var gr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var mr = gr;
var xr = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "xr");
var At = { br: ".br", zstd: ".zst", gzip: ".gz" };
var vr = Object.keys(At);
var wr = "index.html";
var yr = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? xr;
  return async (s, i) => {
    var h, d, f, m;
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
        return await ((h = t.onNotFound) == null ? void 0 : h.call(t, s.req.path, s)), i();
      }
    let c = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(c) && (c = n(c, wr));
    const l = t.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const y = t.mimes && rt(c, t.mimes) || rt(c);
      if (s.header("Content-Type", y || "application/octet-stream"), t.precompressed && (!y || pr.test(y))) {
        const T = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((v) => v.trim()));
        for (const v of vr) {
          if (!T.has(v))
            continue;
          const S = await l(c + At[v], s);
          if (S) {
            o = S, s.header("Content-Encoding", v), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, c, s)), s.body(o);
    }
    await ((m = t.onNotFound) == null ? void 0 : m.call(t, c, s)), await i();
  };
}, "yr");
var Er = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Er");
var Sr = /* @__PURE__ */ __name2((t) => async function(r, n) {
  return yr({ ...t, getContent: async (i) => Er(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Sr");
var br = /* @__PURE__ */ __name2((t) => Sr(t), "br");
var z = new Rt();
z.use("/api/*", fr());
z.use("/static/*", br({ root: "./public" }));
function je() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(je, "je");
__name2(je, "je");
function Ve(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let n = 0; n < e.length; n++)
    r ^= e.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(Ve, "Ve");
__name2(Ve, "Ve");
function jr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(jr, "jr");
__name2(jr, "jr");
function Tr(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Tr, "Tr");
__name2(Tr, "Tr");
function Or(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Or, "Or");
__name2(Or, "Or");
function Rr(t, e) {
  const r = Math.max(60, de(t)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(Rr, "Rr");
__name2(Rr, "Rr");
function Ar(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Or((t == null ? void 0 : t.viewType) || "narrative"), n = Tr(t == null ? void 0 : t.level), s = "detail", { base: i, min: a, max: c } = Rr(e), l = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
[\uAD6C\uC870\uD654 \uD575\uC2EC \uC9C0\uCE68(\uAC15\uC81C)]
- \uD559\uC2B5 \uB2E8\uC704(Learning Unit):
  \xB7 \uCD08\uB4F1(elem): \uC911\uB2E8\uC6D0+\uC18C\uB2E8\uC6D0\uC744 \uD558\uB098\uC758 \uB2E8\uC704\uB85C \uBB36\uC5B4 \uAD6C\uC870\uD654(\uBB36\uAE30)
  \xB7 \uC911/\uACE0(mid/high): \uC18C\uB2E8\uC6D0 \uB2E8\uC704\uB85C \uCABC\uAC1C\uC5B4 \uAD6C\uC870\uD654(\uCABC\uAC1C\uAE30)
- \uACFC\uBAA9\uBCC4 \uD2B9\uD654:
  \xB7 \uC218\uD559(math): \uAC1C\uB150\uBA85 \uC911\uC2EC. \uACF5\uC2DD\uC740 LaTeX($...$). \uC131\uB9BD\uC870\uAC74+\uC801\uC6A9\uC720\uD615 \uD3EC\uD568
  \xB7 \uAD6D\uC5B4(korean): \uD14D\uC2A4\uD2B8 \uD750\uB984 \uC911\uC2EC. \uC18C\uC81C\uBAA9\uBCC4 \uD575\uC2EC\uC758\uBBF8+\uD0A4\uC6CC\uB4DC(1~3)
  \xB7 \uC0AC\uD68C/\uACFC\uD559(soc/sci): \uC6D0\uC778-\uACFC\uC815-\uACB0\uACFC \uC911\uC2EC. \uC6A9\uC5B4\uC815\uC758\uB294 "OO: ~~~" \uD3EC\uB9F7
- \uC808\uB300 \uAE08\uC9C0:
  \xB7 \uC6D0\uBB38\uC744 \uAE00\uC790\uC218 \uB9DE\uCDB0 \uC911\uAC04 \uC790\uB974\uAE30 \uAE08\uC9C0(\uC694\uC57D\uC740 \uC7AC\uAD6C\uC131)
  \xB7 \uC911\uBCF5 \uBB38\uC7A5/\uC911\uBCF5 \uC815\uBCF4 \uBC18\uBCF5 \uAE08\uC9C0
- \uC815\uB7C9 \uADDC\uCE59:
  \xB7 explain(\uC124\uBA85\uBB38)\uC740 60~110\uC790 1\uBB38\uC7A5(\uCD5C\uB300 2\uBB38\uC7A5)
  \xB7 pack(\uD0A4\uC6CC\uB4DC)\uC740 1~3\uAC1C, ' \xB7 '\uB85C \uC5F0\uACB0
- \uD2B8\uB9AC \uAD6C\uC870:
  \xB7 root -> question(1\uB808\uBCA8) -> keyword(2\uB808\uBCA8) \uD56D\uC0C1 \uC720\uC9C0
  \xB7 \uC2EC\uD654(advanced)\uB294 children\uC73C\uB85C \uB123\uB418 \uAE30\uBCF8 collapsed
  \xB7 brief/standard/detail\uC740 downsample\uC774 \uB9CC\uB4E4\uBBC0\uB85C \uC9C0\uAE08\uC740 detail\uB9CC \uC0DD\uC131
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${l}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
`), f = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${l}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${c}, "base": ${i} } },
  "narrative": {
    "title": "\uD55C \uC904 \uC81C\uBAA9(10~18\uC790)",
    "paragraphs": [
      { "heading": "\uC18C\uC81C\uBAA9(6~14\uC790)", "sentences": ["\uBB38\uC7A51", "\uBB38\uC7A52", "\uBB38\uC7A53"] }
    ],
    "keywords": ["\uD0A4\uC6CC\uB4DC1","\uD0A4\uC6CC\uB4DC2","\uD0A4\uC6CC\uB4DC3"]
  }
}
[\uADDC\uCE59]
- paragraphs\uB294 3~6\uAC1C. \uAC01 \uBB38\uB2E8\uC740 2~4\uBB38\uC7A5
- \uBB38\uC7A5\uC740 \uB9DE\uCDA4\uBC95/\uB744\uC5B4\uC4F0\uAE30/\uBB38\uBC95\uC774 \uC790\uC5F0\uC2A4\uB7FD\uAC8C
- \uC5F0\uACB0\uC5B4(\uD558\uC9C0\uB9CC/\uB530\uB77C\uC11C/\uD55C\uD3B8/\uB610\uD55C) \uACFC\uB3C4\uD558\uAC8C \uBC18\uBCF5 \uAE08\uC9C0
`.trim(), m = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: structured]
{
  "level": "detail",
  "viewType": "structured",
  "meta": { "grade": "${l}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${c}, "base": ${i} } },
  "structured": {
    "outline": [
      { "h": "\uB300\uC8FC\uC81C(\u2160/\u2161/\u2162 \uB290\uB08C\uC758 \uC81C\uBAA9)", "points": [ { "k": "\uD575\uC2EC \uB17C\uC810(1\uBB38\uC7A5)", "sub": ["\uADFC\uAC701", "\uADFC\uAC702"] } ] }
    ],
    "glossary": [ { "term": "OO", "def": "OO: ~~~ \uD615\uD0DC\uB85C 1~2\uBB38\uC7A5 \uC815\uC758" } ]
  }
}
[\uADDC\uCE59]
- outline\uC740 3~7\uAC1C \uB300\uC8FC\uC81C
- points\uB294 \uAC01 \uB300\uC8FC\uC81C\uB9C8\uB2E4 2~5\uAC1C
- glossary\uB294 5~12\uAC1C. \uC0AC\uD68C/\uACFC\uD559\uC774\uBA74 \uC6D0\uC778-\uACFC\uC815-\uACB0\uACFC \uD750\uB984\uC744 def\uC5D0 \uBC18\uC601
- def \uBB38\uC7A5 \uCCAB\uBA38\uB9AC\uB294 "\uC6A9\uC5B4: " \uD615\uD0DC\uB85C \uC2DC\uC791(\uC608: "\uC120\uD589\uD559\uC2B5: ...")
`.trim(), y = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: mindmap]
{
  "level": "detail",
  "viewType": "mindmap",
  "meta": { "grade": "${l}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${c}, "base": ${i} } },
  "mindmap": {
    "title": "\uD559\uC2B5 \uB2E8\uC704(\uC911\uB2E8\uC6D0/\uC18C\uB2E8\uC6D0\uBA85 \uB610\uB294 \uD575\uC2EC \uC8FC\uC81C)",
    "children": [
      {
        "title": "\uC65C?/\uBB34\uC5C7?/\uC5B4\uB5BB\uAC8C?/\uBE44\uAD50/\uC7C1\uC810 \uC911 \uC801\uC808\uD55C 1\uB808\uBCA8 \uC9C8\uBB38",
        "children": [
          {
            "title": "2\uB808\uBCA8 \uD0A4\uC6CC\uB4DC(\uBA85\uC0AC\uAD6C 2~6\uC790)",
            "pack": ["\uD575\uC2EC\uC5B41","\uD575\uC2EC\uC5B42","\uD575\uC2EC\uC5B43"],
            "explain": "\uC124\uBA85\uBB38(60~110\uC790, 1\uBB38\uC7A5 \uC6B0\uC120)",
            "children": [ { "title": "\uC2EC\uD654/\uADFC\uAC70/\uC0AC\uB840(\uC120\uD0DD)", "children": [] } ]
          }
        ]
      }
    ]
  }
}
[\uADDC\uCE59]
- root 1\uAC1C, 1\uB808\uBCA8 question 4~7\uAC1C, \uAC01 question \uC544\uB798 keyword 2~5\uAC1C
- keyword.title\uC740 \uC9E7\uC740 \uD0A4\uC6CC\uB4DC(\uBB38\uC7A5 \uAE08\uC9C0)
- pack\uC740 1~3\uAC1C, explain\uC740 60~110\uC790
- pack/explain \uB178\uB4DC\uB294 children\uC73C\uB85C \uB9CC\uB4E4\uC9C0 \uB9D0\uACE0 \uD544\uB4DC\uB85C\uB9CC \uC81C\uACF5
  (\uB80C\uB354\uB7EC\uC5D0\uC11C autoEnrich:true\uAC00 pack/explain\uC744 2.5/3\uC73C\uB85C \uC790\uB3D9 \uC0DD\uC131)
`.trim(), T = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: selftest]
{
  "level": "detail",
  "viewType": "selftest",
  "meta": { "grade": "${l}", "subject": "${o}", "passScore": 90, "charTarget": { "min": ${a}, "max": ${c}, "base": ${i} } },
  "selftest": {
    "items": [
      {
        "id": "Q1",
        "type": "mcq|tf|blank|short",
        "q": "\uC9C8\uBB38",
        "choices": ["\uBCF4\uAE301","\uBCF4\uAE302","\uBCF4\uAE303","\uBCF4\uAE304"],
        "answer": "\uC815\uB2F5(\uC120\uC9C0 \uB610\uB294 O/X \uB610\uB294 \uBE48\uCE78\uC815\uB2F5)",
        "rationale": "\uD574\uC124(1~2\uBB38\uC7A5)"
      }
    ]
  }
}
[\uADDC\uCE59]
- items\uB294 8~12\uAC1C
- type \uAD6C\uC131: mcq 5~7\uAC1C + tf 2~3\uAC1C + blank/short 1~2\uAC1C
- \uC9C8\uBB38\uC740 \uC6D0\uBB38/\uC694\uC57D \uB0B4\uC6A9 \uD655\uC778 \uC911\uC2EC(\uC751\uC6A9\xB7\uC2EC\uD654\uB294 \uD3C9\uAC00 \uC5D4\uC9C4\uC5D0\uC11C \uCC98\uB9AC)
- rationale\uC740 \uAC04\uACB0\uD558\uC9C0\uB9CC \uADFC\uAC70\uAC00 \uBA85\uD655\uD574\uC57C \uD568
`.trim();
  let v = f;
  return r === "structured" ? v = m : r === "mindmap" ? v = y : r === "selftest" && (v = T), `${d}

${v}`;
}
__name(Ar, "Ar");
__name2(Ar, "Ar");
function se(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(se, "se");
__name2(se, "se");
function qe(t) {
  const e = se(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(qe, "qe");
__name2(qe, "qe");
function $r(t) {
  const e = se(t).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name($r, "$r");
__name2($r, "$r");
function We(t) {
  const e = se(t).split(`
`), r = $r(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: se(t) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : e.length, o = i.title, h = e.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: h });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(We, "We");
__name2(We, "We");
function Cr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Cr, "Cr");
__name2(Cr, "Cr");
function he(t, e) {
  const n = qe(t).map((i, a) => ({ s: i, i: a, score: Cr(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, jr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(he, "he");
__name2(he, "he");
function de(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(de, "de");
__name2(de, "de");
var Ke = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function nt(t, e, r) {
  const n = Math.max(60, de(t)), s = de(e), i = Math.floor(n * Ke[r].min), a = Math.ceil(n * Ke[r].max);
  return s < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(nt, "nt");
__name2(nt, "nt");
function Te(t, e, r) {
  const n = Math.max(60, de(t)), s = Math.ceil(n * Ke[r].max);
  let i = String(e || "").trim();
  if (de(i) <= s)
    return i;
  const a = qe(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (de(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Te, "Te");
__name2(Te, "Te");
function Ue(t, e) {
  return `${t}_${e}`;
}
__name(Ue, "Ue");
__name2(Ue, "Ue");
function kr(t) {
  const e = We(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    const a = Ue("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = he(s.body, 6), o = [];
    for (const E of l)
      (E.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((H) => {
        const O = H.replace(/[()]/g, "").trim();
        O.length >= 2 && O.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(O) && o.push(O);
      });
    const h = /* @__PURE__ */ new Map();
    o.forEach((E) => h.set(E, (h.get(E) || 0) + 1));
    const d = Array.from(h.entries()).sort((E, N) => N[1] - E[1]).map((E) => E[0]).filter((E) => E.length <= 10).slice(0, 3), f = he(s.body, 3).join(" "), m = he(s.body, 2).join(" "), y = he(s.body, 1).join(" "), T = { id: Ue(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: m, explainBrief: y, children: [] };
    d.forEach((E) => {
      n.has(E) || n.set(E, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${E}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${he(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const S = qe(s.body).filter((E) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(E)).slice(0, 2);
    S.length && T.children.push({ id: Ue(a + "_adv", 1), title: S.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(T), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(kr, "kr");
__name2(kr, "kr");
function $t(t, e) {
  const r = JSON.parse(JSON.stringify(t)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (e === "brief" && (s.explain = s.explainBrief || s.explain), e === "standard" && (s.explain = s.explainStandard || s.explain), e === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = e !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name($t, "$t");
__name2($t, "$t");
function _r(t, e, r, n) {
  const s = (e.children || []).map((h) => h.title), a = ($t(e, n).children || []).map((h) => {
    const d = (h.children || []).find((m) => m.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: h.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((h) => ({ term: h.term, def: Te(t, h.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((h, d) => o.push(`  ${d + 1}. ${h}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((h, d) => {
    var f;
    o.push(`  ${d + 1}. ${h.title}`), (f = h.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${h.key.join(" \xB7 ")}`), h.summary && o.push(`     - \uC694\uC9C0: ${Te(t, h.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((h) => {
    o.push(`  - ${h.term}: ${h.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(_r, "_r");
__name2(_r, "_r");
function Pr(t, e) {
  const r = We(t), n = e === "brief" ? 2 : e === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = e === "brief" || e === "standard" ? 1 : 2;
    s.push(...he(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return Te(t, i, e);
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
function Ir(t, e) {
  We(t);
  const r = qe(t), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Ir, "Ir");
__name2(Ir, "Ir");
function Nr(t, e) {
  let r = t.length, n = 0;
  const s = [];
  for (const a of t) {
    const c = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((y) => y.replace(/[()]/g, "")).filter(Boolean), h = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    h.forEach((y) => {
      c.includes(y) && d++;
    });
    const f = d >= 2 || c.length >= 30, m = f ? 1 : d === 1 ? 0.5 : 0;
    n += m, s.push({ id: a.id, ok: f, score: m, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
function st(t) {
  const e = se(t), { tree: r, glossary: n } = kr(e), s = { originalMeta: { textHash: Ve(e), chars: e.length, ts: je() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Pr(e, i), c = _r(e, r, n, i), l = $t(r, i), o = Ir(e), d = nt(e, a, i).ok ? a : Te(e, a, i), f = c.renderText || "", m = nt(e, f, i);
    c.renderText = m.ok ? f : Te(e, f, i), s.modes[i] = { narrative: d, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(st, "st");
__name2(st, "st");
z.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: je(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
z.post("/api/engine", async (t) => {
  var m, y, T, v, S, E, N;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), n = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", s = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), c = (e == null ? void 0 : e.useGemini) === true, l = se(r);
  if (l.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", h;
  if (c && t.env.GEMINI_API_KEY)
    try {
      const H = Ar({ text: l, viewType: s, level: "detail", grade: i, subject: a }), O = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", ie = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${O}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: H }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), C = (((S = (v = (T = (y = (m = ie == null ? void 0 : ie.candidates) == null ? void 0 : m[0]) == null ? void 0 : y.content) == null ? void 0 : T.parts) == null ? void 0 : v[0]) == null ? void 0 : S.text) || "").match(/\{[\s\S]*\}/);
      if (C) {
        const ye = JSON.parse(C[0]);
        h = { originalMeta: { textHash: Ve(l), chars: l.length, ts: je() }, modes: { detail: { [s]: ye }, standard: { [s]: ye }, brief: { [s]: ye } } }, o = "gemini-" + O;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (H) {
      console.error("[Gemini Error]", H), h = st(l), o = "v5-local-fallback";
    }
  else
    h = st(l);
  const d = (N = (E = h.modes) == null ? void 0 : E[n]) == null ? void 0 : N[s], f = { engine: o, mode: n, viewType: s, ts: je(), textHash: h.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: h.modes, meta: f });
});
z.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], n = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, s = Nr(r, n);
  return t.json({ ok: true, result: s });
});
z.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = se(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = je(), l = Ve(s), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, c, c, l, s, o).run(), t.json({ ok: true, id: a, textHash: l, ts: c });
});
z.get("/api/loadSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = String(t.req.query("userId") || "anon"), n = String(t.req.query("id") || "");
  if (!n)
    return t.json({ ok: false, error: "missing_id" }, 400);
  const s = await e.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(n, r).first();
  if (!s)
    return t.json({ ok: false, error: "not_found" }, 404);
  let i = null;
  try {
    i = JSON.parse(s.allSummariesJson);
  } catch {
    i = null;
  }
  return t.json({ ok: true, doc: { id: s.id, userId: s.userId, createdAt: s.createdAt, updatedAt: s.updatedAt, textHash: s.textHash, originalText: s.originalText, allSummaries: i } });
});
z.get("/", (t) => t.redirect("/static/v5.html"));
var it = new Rt();
var Hr = Object.assign({ "/src/index.tsx": z });
var Ct = false;
for (const [, t] of Object.entries(Hr))
  t && (it.route("/", t), it.notFound(t.notFoundHandler), Ct = true);
if (!Ct)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
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
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
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
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = it;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
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
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = /* @__PURE__ */ __name(class {
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
}, "__Facade_ScheduledController__");
__name2(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
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
__name2(wrapExportedHandler, "wrapExportedHandler");
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
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-zGyUE9/ynrszgij2w7.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/index.html", "/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = middleware_loader_entry_default;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
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
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-tHPjpj/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-tHPjpj/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__2, "__Facade_ScheduledController__");
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
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
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
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
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=ynrszgij2w7.js.map
