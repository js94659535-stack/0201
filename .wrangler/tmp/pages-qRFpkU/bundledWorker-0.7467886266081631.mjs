var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-fA7ilk/checked-fetch.js
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

// ../.wrangler/tmp/bundle-fA7ilk/strip-cf-connecting-ip-header.js
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
var Nt = Object.defineProperty;
var Je = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Je");
var Pt = /* @__PURE__ */ __name((e, t, r) => t in e ? Nt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Pt");
var x = /* @__PURE__ */ __name((e, t, r) => Pt(e, typeof t != "symbol" ? t + "" : t, r), "x");
var ze = /* @__PURE__ */ __name((e, t, r) => t.has(e) || Je("Cannot " + r), "ze");
var d = /* @__PURE__ */ __name((e, t, r) => (ze(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var w = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? Je("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "w");
var m = /* @__PURE__ */ __name((e, t, r, n) => (ze(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "m");
var C = /* @__PURE__ */ __name((e, t, r) => (ze(e, t, "access private method"), r), "C");
var Xe = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  m(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "Xe");
var Qe = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
  let a = -1;
  return i(0);
  async function i(l) {
    if (l <= a)
      throw new Error("next() called multiple times");
    a = l;
    let o, c = false, u;
    if (e[l] ? (u = e[l][0][0], n.req.routeIndex = l) : u = l === e.length && s || void 0, u)
      try {
        o = await u(n, () => i(l + 1));
      } catch (p) {
        if (p instanceof Error && t)
          n.error = p, o = await t(p, n), c = true;
        else
          throw p;
      }
    else
      n.finalized === false && r && (o = await r(n));
    return o && (n.finalized === false || c) && (n.res = o), n;
  }
  __name(i, "i");
}, "Qe");
var Ht = Symbol();
var Dt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, a = (e instanceof wt ? e.raw.headers : e.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? Lt(e, { all: r, dot: n }) : {};
}, "Dt");
async function Lt(e, t) {
  const r = await e.formData();
  return r ? Bt(r, t) : {};
}
__name(Lt, "Lt");
function Bt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Ft(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (zt(r, n, s), delete r[n]);
  }), r;
}
__name(Bt, "Bt");
var Ft = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Ft");
var zt = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((a, i) => {
    i === s.length - 1 ? n[a] = r : ((!n[a] || typeof n[a] != "object" || Array.isArray(n[a]) || n[a] instanceof File) && (n[a] = /* @__PURE__ */ Object.create(null)), n = n[a]);
  });
}, "zt");
var gt = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "gt");
var qt = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = Kt(e), n = gt(r);
  return Ut(n, t);
}, "qt");
var Kt = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "Kt");
var Ut = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "Ut");
var Me = {};
var Gt = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return Me[n] || (r[2] ? Me[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Me[n] = [e, r[1], true]), Me[n];
  }
  return null;
}, "Gt");
var Ye = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "Ye");
var Vt = /* @__PURE__ */ __name((e) => Ye(e, decodeURI), "Vt");
var mt = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const a = t.indexOf("?", n), i = t.slice(r, a === -1 ? void 0 : a);
      return Vt(i.includes("%25") ? i.replace(/%25/g, "%2525") : i);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "mt");
var Wt = /* @__PURE__ */ __name((e) => {
  const t = mt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Wt");
var he = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = he(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "he");
var xt = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":"))
    return null;
  const t = e.split("/"), r = [];
  let n = "";
  return t.forEach((s) => {
    if (s !== "" && !/\:/.test(s))
      n += "/" + s;
    else if (/\:/.test(s))
      if (/\?/.test(s)) {
        r.length === 0 && n === "" ? r.push("/") : r.push(n);
        const a = s.replace("?", "");
        n += "/" + a, r.push(n);
      } else
        n += "/" + s;
  }), r.filter((s, a, i) => i.indexOf(s) === a);
}, "xt");
var qe = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Ye(e, bt) : e) : e, "qe");
var vt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let i = e.indexOf("?", 8);
    if (i === -1)
      return;
    for (e.startsWith(t, i + 1) || (i = e.indexOf(`&${t}`, i + 1)); i !== -1; ) {
      const l = e.charCodeAt(i + t.length + 1);
      if (l === 61) {
        const o = i + t.length + 2, c = e.indexOf("&", o);
        return qe(e.slice(o, c === -1 ? void 0 : c));
      } else if (l == 38 || isNaN(l))
        return "";
      i = e.indexOf(`&${t}`, i + 1);
    }
    if (n = /[%+]/.test(e), !n)
      return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(e));
  let a = e.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = e.indexOf("&", a + 1);
    let l = e.indexOf("=", a);
    l > i && i !== -1 && (l = -1);
    let o = e.slice(a + 1, l === -1 ? i === -1 ? void 0 : i : l);
    if (n && (o = qe(o)), a = i, o === "")
      continue;
    let c;
    l === -1 ? c = "" : (c = e.slice(l + 1, i === -1 ? void 0 : i), n && (c = qe(c))), r ? (s[o] && Array.isArray(s[o]) || (s[o] = []), s[o].push(c)) : s[o] ?? (s[o] = c);
  }
  return t ? s[t] : s;
}, "vt");
var Yt = vt;
var Jt = /* @__PURE__ */ __name((e, t) => vt(e, t, true), "Jt");
var bt = decodeURIComponent;
var Ze = /* @__PURE__ */ __name((e) => Ye(e, bt), "Ze");
var me;
var L;
var W;
var yt;
var Et;
var Ge;
var J;
var lt;
var wt = (lt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    w(this, W);
    x(this, "raw");
    w(this, me);
    w(this, L);
    x(this, "routeIndex", 0);
    x(this, "path");
    x(this, "bodyCache", {});
    w(this, J, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((a) => (s === "json" && (a = JSON.stringify(a)), new Response(a)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, m(this, L, r), m(this, me, {});
  }
  param(e) {
    return e ? C(this, W, yt).call(this, e) : C(this, W, Et).call(this);
  }
  query(e) {
    return Yt(this.url, e);
  }
  queries(e) {
    return Jt(this.url, e);
  }
  header(e) {
    if (e)
      return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, n) => {
      t[n] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Dt(this, e));
  }
  json() {
    return d(this, J).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, J).call(this, "text");
  }
  arrayBuffer() {
    return d(this, J).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, J).call(this, "blob");
  }
  formData() {
    return d(this, J).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, me)[e] = t;
  }
  valid(e) {
    return d(this, me)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Ht]() {
    return d(this, L);
  }
  get matchedRoutes() {
    return d(this, L)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, L)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "lt"), me = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakSet(), yt = /* @__PURE__ */ __name(function(e) {
  const t = d(this, L)[0][this.routeIndex][1][e], r = C(this, W, Ge).call(this, t);
  return r && /\%/.test(r) ? Ze(r) : r;
}, "yt"), Et = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(d(this, L)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = C(this, W, Ge).call(this, d(this, L)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? Ze(n) : n);
  }
  return e;
}, "Et"), Ge = /* @__PURE__ */ __name(function(e) {
  return d(this, L)[1] ? d(this, L)[1][e] : e;
}, "Ge"), J = /* @__PURE__ */ new WeakMap(), lt);
var Xt = { Stringify: 1 };
var St = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const a = e.callbacks;
  return a != null && a.length ? (s ? s[0] += e : s = [e], Promise.all(a.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((o) => St(o, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "St");
var Qt = "text/plain; charset=UTF-8";
var Ke = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Ke");
var je;
var Oe;
var K;
var xe;
var U;
var H;
var ke;
var ve;
var be;
var ae;
var _e;
var Re;
var X;
var pe;
var dt;
var Zt = (dt = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    w(this, X);
    w(this, je);
    w(this, Oe);
    x(this, "env", {});
    w(this, K);
    x(this, "finalized", false);
    x(this, "error");
    w(this, xe);
    w(this, U);
    w(this, H);
    w(this, ke);
    w(this, ve);
    w(this, be);
    w(this, ae);
    w(this, _e);
    w(this, Re);
    x(this, "render", (...e2) => (d(this, ve) ?? m(this, ve, (t2) => this.html(t2)), d(this, ve).call(this, ...e2)));
    x(this, "setLayout", (e2) => m(this, ke, e2));
    x(this, "getLayout", () => d(this, ke));
    x(this, "setRenderer", (e2) => {
      m(this, ve, e2);
    });
    x(this, "header", (e2, t2, r) => {
      this.finalized && m(this, H, new Response(d(this, H).body, d(this, H)));
      const n = d(this, H) ? d(this, H).headers : d(this, ae) ?? m(this, ae, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    x(this, "status", (e2) => {
      m(this, xe, e2);
    });
    x(this, "set", (e2, t2) => {
      d(this, K) ?? m(this, K, /* @__PURE__ */ new Map()), d(this, K).set(e2, t2);
    });
    x(this, "get", (e2) => d(this, K) ? d(this, K).get(e2) : void 0);
    x(this, "newResponse", (...e2) => C(this, X, pe).call(this, ...e2));
    x(this, "body", (e2, t2, r) => C(this, X, pe).call(this, e2, t2, r));
    x(this, "text", (e2, t2, r) => !d(this, ae) && !d(this, xe) && !t2 && !r && !this.finalized ? new Response(e2) : C(this, X, pe).call(this, e2, t2, Ke(Qt, r)));
    x(this, "json", (e2, t2, r) => C(this, X, pe).call(this, JSON.stringify(e2), t2, Ke("application/json", r)));
    x(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => C(this, X, pe).call(this, s, t2, Ke("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? St(e2, Xt.Stringify, false, {}).then(n) : n(e2);
    });
    x(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    x(this, "notFound", () => (d(this, be) ?? m(this, be, () => new Response()), d(this, be).call(this, this)));
    m(this, je, e), t && (m(this, U, t.executionCtx), this.env = t.env, m(this, be, t.notFoundHandler), m(this, Re, t.path), m(this, _e, t.matchResult));
  }
  get req() {
    return d(this, Oe) ?? m(this, Oe, new wt(d(this, je), d(this, Re), d(this, _e))), d(this, Oe);
  }
  get event() {
    if (d(this, U) && "respondWith" in d(this, U))
      return d(this, U);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, U))
      return d(this, U);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, H) || m(this, H, new Response(null, { headers: d(this, ae) ?? m(this, ae, new Headers()) }));
  }
  set res(e) {
    if (d(this, H) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, H).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = d(this, H).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    m(this, H, e), this.finalized = true;
  }
  get var() {
    return d(this, K) ? Object.fromEntries(d(this, K)) : {};
  }
}, "dt"), je = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), pe = /* @__PURE__ */ __name(function(e, t, r) {
  const n = d(this, H) ? new Headers(d(this, H).headers) : d(this, ae) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const a = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [i, l] of a)
      i.toLowerCase() === "set-cookie" ? n.append(i, l) : n.set(i, l);
  }
  if (r)
    for (const [a, i] of Object.entries(r))
      if (typeof i == "string")
        n.set(a, i);
      else {
        n.delete(a);
        for (const l of i)
          n.append(a, l);
      }
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, xe);
  return new Response(e, { status: s, headers: n });
}, "pe"), dt);
var M = "ALL";
var en = "all";
var tn = ["get", "post", "put", "delete", "options", "patch"];
var Ct = "Can not add a route since the matcher is already built.";
var $t = /* @__PURE__ */ __name(class extends Error {
}, "$t");
var nn = "__COMPOSED_HANDLER";
var rn = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "rn");
var et = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "et");
var B;
var I;
var Tt;
var F;
var re;
var Ie;
var Ne;
var we;
var sn = (we = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    w(this, I);
    x(this, "get");
    x(this, "post");
    x(this, "put");
    x(this, "delete");
    x(this, "options");
    x(this, "patch");
    x(this, "all");
    x(this, "on");
    x(this, "use");
    x(this, "router");
    x(this, "getPath");
    x(this, "_basePath", "/");
    w(this, B, "/");
    x(this, "routes", []);
    w(this, F, rn);
    x(this, "errorHandler", et);
    x(this, "onError", (t2) => (this.errorHandler = t2, this));
    x(this, "notFound", (t2) => (m(this, F, t2), this));
    x(this, "fetch", (t2, ...r) => C(this, I, Ne).call(this, t2, r[1], r[0], t2.method));
    x(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${he("/", t2)}`, r), n2, s2)));
    x(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(C(this, I, Ne).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...tn, en].forEach((a) => {
      this[a] = (i, ...l) => (typeof i == "string" ? m(this, B, i) : C(this, I, re).call(this, a, d(this, B), i), l.forEach((o) => {
        C(this, I, re).call(this, a, d(this, B), o);
      }), this);
    }), this.on = (a, i, ...l) => {
      for (const o of [i].flat()) {
        m(this, B, o);
        for (const c of [a].flat())
          l.map((u) => {
            C(this, I, re).call(this, c.toUpperCase(), d(this, B), u);
          });
      }
      return this;
    }, this.use = (a, ...i) => (typeof a == "string" ? m(this, B, a) : (m(this, B, "*"), i.unshift(a)), i.forEach((l) => {
      C(this, I, re).call(this, M, d(this, B), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? mt : Wt;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var i;
      let a;
      r.errorHandler === et ? a = s.handler : (a = /* @__PURE__ */ __name(async (l, o) => (await Qe([], r.errorHandler)(l, () => s.handler(l, o))).res, "a"), a[nn] = s.handler), C(i = n, I, re).call(i, s.method, s.path, a);
    }), this;
  }
  basePath(t) {
    const r = C(this, I, Tt).call(this);
    return r._basePath = he(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, a;
    n && (typeof n == "function" ? a = n : (a = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((o) => o, "s") : s = n.replaceRequest));
    const i = a ? (o) => {
      const c = a(o);
      return Array.isArray(c) ? c : [c];
    } : (o) => {
      let c;
      try {
        c = o.executionCtx;
      } catch {
      }
      return [o.env, c];
    };
    s || (s = (() => {
      const o = he(this._basePath, t), c = o === "/" ? 0 : o.length;
      return (u) => {
        const p = new URL(u.url);
        return p.pathname = p.pathname.slice(c) || "/", new Request(p, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (o, c) => {
      const u = await r(s(o.req.raw), ...i(o));
      if (u)
        return u;
      await c();
    }, "l");
    return C(this, I, re).call(this, M, he(t, "*"), l), this;
  }
}, "we"), B = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakSet(), Tt = /* @__PURE__ */ __name(function() {
  const t = new we({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, m(t, F, d(this, F)), t.routes = this.routes, t;
}, "Tt"), F = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = he(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "re"), Ie = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Ie"), Ne = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await C(this, I, Ne).call(this, t, r, n, "GET")))();
  const a = this.getPath(t, { env: n }), i = this.router.match(s, a), l = new Zt(t, { path: a, matchResult: i, env: n, executionCtx: r, notFoundHandler: d(this, F) });
  if (i[0].length === 1) {
    let c;
    try {
      c = i[0][0][0][0](l, async () => {
        l.res = await d(this, F).call(this, l);
      });
    } catch (u) {
      return C(this, I, Ie).call(this, u, l);
    }
    return c instanceof Promise ? c.then((u) => u || (l.finalized ? l.res : d(this, F).call(this, l))).catch((u) => C(this, I, Ie).call(this, u, l)) : c ?? d(this, F).call(this, l);
  }
  const o = Qe(i[0], this.errorHandler, d(this, F));
  return (async () => {
    try {
      const c = await o(l);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return C(this, I, Ie).call(this, c, l);
    }
  })();
}, "Ne"), we);
var jt = [];
function an(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, a) => {
    const i = r[s] || r[M], l = i[2][a];
    if (l)
      return l;
    const o = a.match(i[0]);
    if (!o)
      return [[], jt];
    const c = o.indexOf("", 1);
    return [i[1][c], o];
  }, "n");
  return this.match = n, n(e, t);
}
__name(an, "an");
var De = "[^/]+";
var $e = ".*";
var Te = "(?:|/.*)";
var fe = Symbol();
var on = new Set(".\\+*[^]$()");
function cn(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === $e || e === Te ? 1 : t === $e || t === Te ? -1 : e === De ? 1 : t === De ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(cn, "cn");
var ie;
var oe;
var z;
var de;
var ln = (de = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, ie);
    w(this, oe);
    w(this, z, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, a) {
    if (t.length === 0) {
      if (d(this, ie) !== void 0)
        throw fe;
      if (a)
        return;
      m(this, ie, r);
      return;
    }
    const [i, ...l] = t, o = i === "*" ? l.length === 0 ? ["", "", $e] : ["", "", De] : i === "/*" ? ["", "", Te] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (o) {
      const u = o[1];
      let p = o[2] || De;
      if (u && o[2] && (p === ".*" || (p = p.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(p))))
        throw fe;
      if (c = d(this, z)[p], !c) {
        if (Object.keys(d(this, z)).some((h) => h !== $e && h !== Te))
          throw fe;
        if (a)
          return;
        c = d(this, z)[p] = new de(), u !== "" && m(c, oe, s.varIndex++);
      }
      !a && u !== "" && n.push([u, d(c, oe)]);
    } else if (c = d(this, z)[i], !c) {
      if (Object.keys(d(this, z)).some((u) => u.length > 1 && u !== $e && u !== Te))
        throw fe;
      if (a)
        return;
      c = d(this, z)[i] = new de();
    }
    c.insert(l, r, n, s, a);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, z)).sort(cn).map((n) => {
      const s = d(this, z)[n];
      return (typeof d(s, oe) == "number" ? `(${n})@${d(s, oe)}` : on.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, ie) == "number" && r.unshift(`#${d(this, ie)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "de"), ie = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), de);
var Be;
var Ae;
var ut;
var dn = (ut = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, Be, { varIndex: 0 });
    w(this, Ae, new ln());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let i = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (o) => {
        const c = `@\\${i}`;
        return s[i] = [c, o], i++, l = true, c;
      }), !l)
        break;
    }
    const a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = s.length - 1; i >= 0; i--) {
      const [l] = s[i];
      for (let o = a.length - 1; o >= 0; o--)
        if (a[o].indexOf(l) !== -1) {
          a[o] = a[o].replace(l, s[i][1]);
          break;
        }
    }
    return d(this, Ae).insert(a, t, n, d(this, Be), r), n;
  }
  buildRegExp() {
    let e = d(this, Ae).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, a, i) => a !== void 0 ? (r[++t] = Number(a), "$()") : (i !== void 0 && (n[Number(i)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "ut"), Be = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), ut);
var un = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Pe = /* @__PURE__ */ Object.create(null);
function Ot(e) {
  return Pe[e] ?? (Pe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Ot, "Ot");
function hn() {
  Pe = /* @__PURE__ */ Object.create(null);
}
__name(hn, "hn");
function pn(e) {
  var c;
  const t = new dn(), r = [];
  if (e.length === 0)
    return un;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, p], [h, v]) => u ? 1 : h ? -1 : p.length - v.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, p = -1, h = n.length; u < h; u++) {
    const [v, O, T] = n[u];
    v ? s[O] = [T.map(([g]) => [g, /* @__PURE__ */ Object.create(null)]), jt] : p++;
    let y;
    try {
      y = t.insert(O, p, v);
    } catch (g) {
      throw g === fe ? new $t(O) : g;
    }
    v || (r[p] = T.map(([g, f]) => {
      const b = /* @__PURE__ */ Object.create(null);
      for (f -= 1; f >= 0; f--) {
        const [$, k] = y[f];
        b[$] = k;
      }
      return [g, b];
    }));
  }
  const [a, i, l] = t.buildRegExp();
  for (let u = 0, p = r.length; u < p; u++)
    for (let h = 0, v = r[u].length; h < v; h++) {
      const O = (c = r[u][h]) == null ? void 0 : c[1];
      if (!O)
        continue;
      const T = Object.keys(O);
      for (let y = 0, g = T.length; y < g; y++)
        O[T[y]] = l[O[T[y]]];
    }
  const o = [];
  for (const u in i)
    o[u] = r[i[u]];
  return [a, o, s];
}
__name(pn, "pn");
function ue(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Ot(r).test(t))
        return [...e[r]];
  }
}
__name(ue, "ue");
var Q;
var Z;
var Fe;
var kt;
var ht;
var fn = (ht = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, Fe);
    x(this, "name", "RegExpRouter");
    w(this, Q);
    w(this, Z);
    x(this, "match", an);
    m(this, Q, { [M]: /* @__PURE__ */ Object.create(null) }), m(this, Z, { [M]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = d(this, Q), s = d(this, Z);
    if (!n || !s)
      throw new Error(Ct);
    n[e] || [n, s].forEach((o) => {
      o[e] = /* @__PURE__ */ Object.create(null), Object.keys(o[M]).forEach((c) => {
        o[e][c] = [...o[M][c]];
      });
    }), t === "/*" && (t = "*");
    const a = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const o = Ot(t);
      e === M ? Object.keys(n).forEach((c) => {
        var u;
        (u = n[c])[t] || (u[t] = ue(n[c], t) || ue(n[M], t) || []);
      }) : (l = n[e])[t] || (l[t] = ue(n[e], t) || ue(n[M], t) || []), Object.keys(n).forEach((c) => {
        (e === M || e === c) && Object.keys(n[c]).forEach((u) => {
          o.test(u) && n[c][u].push([r, a]);
        });
      }), Object.keys(s).forEach((c) => {
        (e === M || e === c) && Object.keys(s[c]).forEach((u) => o.test(u) && s[c][u].push([r, a]));
      });
      return;
    }
    const i = xt(t) || [t];
    for (let o = 0, c = i.length; o < c; o++) {
      const u = i[o];
      Object.keys(s).forEach((p) => {
        var h;
        (e === M || e === p) && ((h = s[p])[u] || (h[u] = [...ue(n[p], u) || ue(n[M], u) || []]), s[p][u].push([r, a - c + o + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, Z)).concat(Object.keys(d(this, Q))).forEach((t) => {
      e[t] || (e[t] = C(this, Fe, kt).call(this, t));
    }), m(this, Q, m(this, Z, void 0)), hn(), e;
  }
}, "ht"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakSet(), kt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === M;
  return [d(this, Q), d(this, Z)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((a) => [a, n[e][a]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== M && t.push(...Object.keys(n[M]).map((a) => [a, n[M][a]]));
  }), r ? pn(t) : null;
}, "kt"), ht);
var ee;
var G;
var pt;
var gn = (pt = /* @__PURE__ */ __name(class {
  constructor(e) {
    x(this, "name", "SmartRouter");
    w(this, ee, []);
    w(this, G, []);
    m(this, ee, e.routers);
  }
  add(e, t, r) {
    if (!d(this, G))
      throw new Error(Ct);
    d(this, G).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, G))
      throw new Error("Fatal error");
    const r = d(this, ee), n = d(this, G), s = r.length;
    let a = 0, i;
    for (; a < s; a++) {
      const l = r[a];
      try {
        for (let o = 0, c = n.length; o < c; o++)
          l.add(...n[o]);
        i = l.match(e, t);
      } catch (o) {
        if (o instanceof $t)
          continue;
        throw o;
      }
      this.match = l.match.bind(l), m(this, ee, [l]), m(this, G, void 0);
      break;
    }
    if (a === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i;
  }
  get activeRouter() {
    if (d(this, G) || d(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ee)[0];
  }
}, "pt"), ee = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), pt);
var Ce = /* @__PURE__ */ Object.create(null);
var te;
var P;
var ce;
var ye;
var N;
var V;
var se;
var Ee;
var mn = (Ee = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    w(this, V);
    w(this, te);
    w(this, P);
    w(this, ce);
    w(this, ye, 0);
    w(this, N, Ce);
    if (m(this, P, n || /* @__PURE__ */ Object.create(null)), m(this, te, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, m(this, te, [s]);
    }
    m(this, ce, []);
  }
  insert(t, r, n) {
    m(this, ye, ++Xe(this, ye)._);
    let s = this;
    const a = qt(r), i = [];
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l], u = a[l + 1], p = Gt(c, u), h = Array.isArray(p) ? p[0] : c;
      if (h in d(s, P)) {
        s = d(s, P)[h], p && i.push(p[1]);
        continue;
      }
      d(s, P)[h] = new Ee(), p && (d(s, ce).push(p), i.push(p[1])), s = d(s, P)[h];
    }
    return d(s, te).push({ [t]: { handler: n, possibleKeys: i.filter((l, o, c) => c.indexOf(l) === o), score: d(this, ye) } }), s;
  }
  search(t, r) {
    var o;
    const n = [];
    m(this, N, Ce);
    let a = [this];
    const i = gt(r), l = [];
    for (let c = 0, u = i.length; c < u; c++) {
      const p = i[c], h = c === u - 1, v = [];
      for (let O = 0, T = a.length; O < T; O++) {
        const y = a[O], g = d(y, P)[p];
        g && (m(g, N, d(y, N)), h ? (d(g, P)["*"] && n.push(...C(this, V, se).call(this, d(g, P)["*"], t, d(y, N))), n.push(...C(this, V, se).call(this, g, t, d(y, N)))) : v.push(g));
        for (let f = 0, b = d(y, ce).length; f < b; f++) {
          const $ = d(y, ce)[f], k = d(y, N) === Ce ? {} : { ...d(y, N) };
          if ($ === "*") {
            const A = d(y, P)["*"];
            A && (n.push(...C(this, V, se).call(this, A, t, d(y, N))), m(A, N, k), v.push(A));
            continue;
          }
          const [R, E, S] = $;
          if (!p && !(S instanceof RegExp))
            continue;
          const j = d(y, P)[R], _ = i.slice(c).join("/");
          if (S instanceof RegExp) {
            const A = S.exec(_);
            if (A) {
              if (k[E] = A[0], n.push(...C(this, V, se).call(this, j, t, d(y, N), k)), Object.keys(d(j, P)).length) {
                m(j, N, k);
                const D = ((o = A[0].match(/\//)) == null ? void 0 : o.length) ?? 0;
                (l[D] || (l[D] = [])).push(j);
              }
              continue;
            }
          }
          (S === true || S.test(p)) && (k[E] = p, h ? (n.push(...C(this, V, se).call(this, j, t, k, d(y, N))), d(j, P)["*"] && n.push(...C(this, V, se).call(this, d(j, P)["*"], t, k, d(y, N)))) : (m(j, N, k), v.push(j)));
        }
      }
      a = v.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, u) => c.score - u.score), [n.map(({ handler: c, params: u }) => [c, u])];
  }
}, "Ee"), te = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name(function(t, r, n, s) {
  const a = [];
  for (let i = 0, l = d(t, te).length; i < l; i++) {
    const o = d(t, te)[i], c = o[r] || o[M], u = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), a.push(c), n !== Ce || s && s !== Ce))
      for (let p = 0, h = c.possibleKeys.length; p < h; p++) {
        const v = c.possibleKeys[p], O = u[c.score];
        c.params[v] = s != null && s[v] && !O ? s[v] : n[v] ?? (s == null ? void 0 : s[v]), u[c.score] = true;
      }
  }
  return a;
}, "se"), Ee);
var le;
var ft;
var xn = (ft = /* @__PURE__ */ __name(class {
  constructor() {
    x(this, "name", "TrieRouter");
    w(this, le);
    m(this, le, new mn());
  }
  add(e, t, r) {
    const n = xt(t);
    if (n) {
      for (let s = 0, a = n.length; s < a; s++)
        d(this, le).insert(e, n[s], r);
      return;
    }
    d(this, le).insert(e, t, r);
  }
  match(e, t) {
    return d(this, le).search(e, t);
  }
}, "ft"), le = /* @__PURE__ */ new WeakMap(), ft);
var _t = /* @__PURE__ */ __name(class extends sn {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new gn({ routers: [new fn(), new xn()] });
  }
}, "_t");
var vn = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((a) => typeof a == "string" ? a === "*" ? () => a : (i) => a === i ? i : null : typeof a == "function" ? a : (i) => a.includes(i) ? i : null)(r.origin), s = ((a) => typeof a == "function" ? a : Array.isArray(a) ? () => a : () => [])(r.allowMethods);
  return async function(i, l) {
    var u;
    function o(p, h) {
      i.res.headers.set(p, h);
    }
    __name(o, "o");
    const c = await n(i.req.header("origin") || "", i);
    if (c && o("Access-Control-Allow-Origin", c), r.credentials && o("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), i.req.method === "OPTIONS") {
      r.origin !== "*" && o("Vary", "Origin"), r.maxAge != null && o("Access-Control-Max-Age", r.maxAge.toString());
      const p = await s(i.req.header("origin") || "", i);
      p.length && o("Access-Control-Allow-Methods", p.join(","));
      let h = r.allowHeaders;
      if (!(h != null && h.length)) {
        const v = i.req.header("Access-Control-Request-Headers");
        v && (h = v.split(/\s*,\s*/));
      }
      return h != null && h.length && (o("Access-Control-Allow-Headers", h.join(",")), i.res.headers.append("Vary", "Access-Control-Request-Headers")), i.res.headers.delete("Content-Length"), i.res.headers.delete("Content-Type"), new Response(null, { headers: i.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && i.header("Vary", "Origin", { append: true });
  };
}, "vn");
var bn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var tt = /* @__PURE__ */ __name((e, t = yn) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "tt");
var wn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var yn = wn;
var En = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "En");
var Rt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Sn = Object.keys(Rt);
var Cn = "index.html";
var $n = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? En;
  return async (s, a) => {
    var u, p, h, v;
    if (s.finalized)
      return a();
    let i;
    if (e.path)
      i = e.path;
    else
      try {
        if (i = decodeURIComponent(s.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))
          throw new Error();
      } catch {
        return await ((u = e.onNotFound) == null ? void 0 : u.call(e, s.req.path, s)), a();
      }
    let l = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(i) : i);
    e.isDir && await e.isDir(l) && (l = n(l, Cn));
    const o = e.getContent;
    let c = await o(l, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const O = e.mimes && tt(l, e.mimes) || tt(l);
      if (s.header("Content-Type", O || "application/octet-stream"), e.precompressed && (!O || bn.test(O))) {
        const T = new Set((p = s.req.header("Accept-Encoding")) == null ? void 0 : p.split(",").map((y) => y.trim()));
        for (const y of Sn) {
          if (!T.has(y))
            continue;
          const g = await o(l + Rt[y], s);
          if (g) {
            c = g, s.header("Content-Encoding", y), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((h = e.onFound) == null ? void 0 : h.call(e, l, s)), s.body(c);
    }
    await ((v = e.onNotFound) == null ? void 0 : v.call(e, l, s)), await a();
  };
}, "$n");
var Tn = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const a = await n.get(s, { type: "stream" });
  return a || null;
}, "Tn");
var jn = /* @__PURE__ */ __name((e) => async function(r, n) {
  return $n({ ...e, getContent: async (a) => Tn(a, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "jn");
var On = /* @__PURE__ */ __name((e) => jn(e), "On");
var Y = new _t();
var He = /* @__PURE__ */ new Map();
var kn = 1e3 * 60 * 60 * 24 * 7;
var Ue = false;
function At() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(At, "At");
function q(e) {
  return e == null ? "" : String(e);
}
__name(q, "q");
function ge(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(ge, "ge");
function _n(e) {
  const t = q(e).trim().toLowerCase();
  return t ? t === "brief" || t === "simple" || t === "short" || t === "lite" ? "brief" : t === "detail" || t === "detailed" || t === "full" ? "detail" : "standard" : "standard";
}
__name(_n, "_n");
function Rn(e) {
  const t = q(e).trim().toLowerCase();
  return t ? t === "narrative" || t === "structured" || t === "mindmap" || t === "selftest" ? t : t === "mind-map" || t === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Rn, "Rn");
function An(e) {
  const t = q(e).trim().toLowerCase();
  return t === "concept" ? "concept" : t === "exam" ? "exam" : "summary";
}
__name(An, "An");
function Ve(e) {
  const t = (e || "").replace(/\s+/g, " ").trim();
  if (!t)
    return [];
  const r = [];
  let n = "", s = false;
  for (let a = 0; a < t.length; a++) {
    const i = t[a], l = t[a + 1];
    (i === '"' || i === '"' || i === '"') && (s = !s), n += i, !s && /[\.\?\!]/.test(i) && l === " " ? i === "." && n.endsWith("...") || (r.push(n.trim()), n = "", a++) : !s && /[다요죠]/.test(i) && l === " " && (r.push(n.trim()), n = "", a++);
  }
  return n.trim() && r.push(n.trim()), r.length ? r : [t];
}
__name(Ve, "Ve");
var Mn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var In = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function Nn(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e) {
    let n = false;
    for (const s of In)
      if (s.has(r)) {
        t.add(Array.from(s)[0]), n = true;
        break;
      }
    n || t.add(r);
  }
  return t;
}
__name(Nn, "Nn");
function Le(e) {
  return (e || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((t) => t.trim()).map((t) => t.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((t) => t.length >= 2 && !Mn.has(t));
}
__name(Le, "Le");
function Pn(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const s of Le(n))
      t.set(s, (t.get(s) || 0) + 1);
  return e.map((n, s) => {
    const a = Le(n);
    let i = 0;
    for (const c of a)
      i += t.get(c) || 0;
    const l = n.length, o = l < 15 ? 0.7 : l > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: i * o };
  });
}
__name(Pn, "Pn");
function We(e, t) {
  return Pn(e).slice().sort((s, a) => a.score - s.score).slice(0, ge(t, 1, Math.max(1, e.length))).sort((s, a) => s.idx - a.idx).map((s) => s.s);
}
__name(We, "We");
function Hn(e, t, r) {
  const n = [];
  for (const o of e) {
    const c = /\(([^)]+,?\s*\d{4})\)/g, u = [];
    let p;
    for (; (p = c.exec(o)) !== null; )
      u.push(p[1]);
    let h = o.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (h.length < 10)
      continue;
    const v = Le(h).slice(0, 8);
    n.push({ original: o, clean: h, keywords: v, citations: u });
  }
  if (n.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const s = /* @__PURE__ */ new Map();
  for (const o of n)
    for (const c of o.keywords)
      s.set(c, (s.get(c) || 0) + 1);
  const a = [];
  for (const o of n) {
    new Set(o.keywords);
    let c = false;
    for (const u of a)
      if (o.keywords.filter((h) => u.keywords.has(h)).length >= 2) {
        u.sentences.push({ clean: o.clean, citations: o.citations }), o.keywords.forEach((h) => u.keywords.add(h)), c = true;
        break;
      }
    c || a.push({ keywords: new Set(o.keywords), sentences: [{ clean: o.clean, citations: o.citations }] });
  }
  const i = a.map((o) => {
    const c = o.sentences[0].clean, u = n.findIndex((p) => p.clean === c);
    return { ...o, originalIdx: u };
  });
  if (r === "brief") {
    const o = i.sort((h, v) => v.sentences.length - h.sentences.length)[0], c = o.sentences[0], u = o.sentences.flatMap((h) => h.citations).filter(Boolean), p = u.length > 0 ? `(${u.join("; ")})` : "";
    return `${c.clean}${p}.`;
  }
  if (r === "standard") {
    const o = i.sort((g, f) => f.sentences.length - g.sentences.length).slice(0, 3).sort((g, f) => g.originalIdx - f.originalIdx);
    if (o.length === 1) {
      const g = o[0].sentences[0], f = o[0].sentences.flatMap(($) => $.citations).filter(Boolean), b = f.length > 0 ? `(${f.join("; ")})` : "";
      return `${g.clean}${b}.`;
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), p = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const g of o)
      for (const f of g.sentences) {
        const b = f.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (b) {
          let [, $, k] = b;
          $ = $.replace(/[에게서로부터]$/g, "").trim(), c.has($) || c.set($, []);
          let R = k.trim();
          R = R.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [_, A] of Object.entries(p))
            if (R.includes(_)) {
              const D = u.get(_) || 0;
              if (u.set(_, D + 1), D >= 1 && A.length > 0) {
                const Se = Math.min(D - 1, A.length - 1);
                R = R.replace(_, A[Se]);
              }
            }
          const E = new Set(Le(R)), S = Nn(E), j = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const _ of j)
            S.delete(_);
          c.get($).push({ original: R, keywords: S, citations: f.citations });
        }
      }
    const h = [];
    for (const [g, f] of c.entries()) {
      const b = f.flatMap((E) => E.citations).filter(Boolean), $ = g.charAt(g.length - 1), R = /[가-힣]/.test($) && ($.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (f.length === 1) {
        const E = f[0].original, S = (E.match(/,/g) || []).length;
        if (E.length > 80 && S >= 2) {
          const j = E.split(",").map((_) => _.trim()).filter((_) => _.length > 0);
          if (j.length >= 2) {
            h.push({ text: `${g}${R} ${j[0]}\uC785\uB2C8\uB2E4`, citations: [] });
            for (let _ = 1; _ < j.length - 1; _++)
              h.push({ text: `\uC774\uB294 ${j[_]}\uC785\uB2C8\uB2E4`, citations: [] });
            h.push({ text: `\uB610\uD55C ${j[j.length - 1]}`, citations: f[0].citations });
          } else
            h.push({ text: `${g}${R} ${E}`, citations: b });
        } else
          h.push({ text: `${g}${R} ${E}`, citations: b });
      } else {
        const E = [];
        for (const S of f) {
          let j = false;
          for (const _ of E) {
            const A = Array.from(S.keywords).filter((Se) => _.keywords.has(Se)).length, D = Math.max(S.keywords.size, _.keywords.size);
            if (D > 0 && A / D >= 0.8) {
              S.original.length > _.original.length && (_.original = S.original, _.keywords = S.keywords), _.citations.push(...S.citations), j = true;
              break;
            }
          }
          j || E.push({ original: S.original, keywords: S.keywords, citations: [...S.citations] });
        }
        if (E.length === 1)
          h.push({ text: `${g}${R} ${E[0].original}`, citations: E.flatMap((S) => S.citations) });
        else if (E.length === 2)
          h.push({ text: `${g}${R} ${E[0].original}`, citations: E[0].citations }), h.push({ text: `${g}${R} ${E[1].original}`, citations: E[1].citations });
        else
          for (let S = 0; S < E.length; S++)
            h.push({ text: `${g}${R} ${E[S].original}`, citations: E[S].citations });
      }
    }
    if (h.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (h.length === 1) {
      const g = h[0].citations.filter(Boolean), f = g.length > 0 ? `(${g.join("; ")})` : "";
      return `${h[0].text}${f}.`;
    }
    if (h.length === 2) {
      const g = h[0].citations.filter(Boolean), f = h[1].citations.filter(Boolean), b = g.length > 0 ? `(${g.join("; ")})` : "", $ = f.length > 0 ? `(${f.join("; ")})` : "";
      return `${h[0].text}${b}. ${h[1].text}${$}.`;
    }
    const v = [], O = h[0], T = O.citations.filter(Boolean), y = T.length > 0 ? `(${T.join("; ")})` : "";
    if (v.push(`${O.text}${y}.`), h.length >= 2) {
      const g = h[1], f = g.citations.filter(Boolean), b = f.length > 0 ? `(${f.join("; ")})` : "";
      v.push(`${g.text}${b}.`);
    }
    if (h.length >= 3) {
      const f = h.slice(2).map((b) => {
        const $ = b.citations.filter(Boolean), k = $.length > 0 ? `(${$.join("; ")})` : "";
        return `${b.text}${k}.`;
      });
      v.push(f.join(" "));
    }
    return v.join(`

`);
  }
  const l = i.sort((o, c) => c.sentences.length - o.sentences.length).slice(0, 5).sort((o, c) => o.originalIdx - c.originalIdx);
  return l.map((o, c) => {
    const u = o.sentences[0], p = o.sentences.flatMap((v) => v.citations).filter(Boolean), h = p.length > 0 ? `(${p.join("; ")})` : "";
    return c === 0 ? `${u.clean}${h}.` : c === l.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${u.clean}${h}.` : `\uB610\uD55C ${u.clean}${h}.`;
  }).join(" ");
}
__name(Hn, "Hn");
function nt(e, t, r) {
  const n = Ve(e), s = t === "brief" ? ge(Math.round(n.length * 0.18), 2, 4) : t === "standard" ? ge(Math.round(n.length * 0.28), 4, 8) : ge(Math.round(n.length * 0.4), 7, 14), a = We(n, s);
  if (r === "narrative") {
    const l = Hn(a, e, t);
    return { kind: "summary", mode: t, viewType: r, narrative: l };
  }
  if (r === "structured")
    return { kind: "summary", mode: t, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((l, o) => `- (${o + 1}) ${l}`) } };
  if (r === "mindmap") {
    const l = (a[0] || n[0] || "\uD575\uC2EC").slice(0, 40), o = [{ id: "c", label: l, level: 0 }], c = [];
    return a.slice(1).forEach((u, p) => {
      const h = `n${p + 1}`;
      o.push({ id: h, label: u.slice(0, 60), level: 1 }), c.push({ from: "c", to: h });
    }), { kind: "summary", mode: t, viewType: r, mindmap: { center: l, nodes: o, edges: c } };
  }
  const i = a.map((l, o) => ({ id: `q${o + 1}`, type: "short", question: `(${o + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${l.slice(0, 70)}"`, answerHint: l }));
  return { kind: "summary", mode: t, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: i } };
}
__name(nt, "nt");
function Mt(e) {
  if (!e)
    return "empty";
  let t = 2166136261, r = 0;
  for (let a = 0; a < e.length; a++) {
    const i = e.charCodeAt(a);
    t ^= i, t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24), r = (r << 5) - r + i, r |= 0;
  }
  const n = (t >>> 0).toString(16), s = (Math.abs(r) >>> 0).toString(16);
  return `${e.length.toString(16)}_${n}_${s}`;
}
__name(Mt, "Mt");
function Dn(e, t, r, n) {
  const s = Mt(r);
  return `${e}::${n || "anon"}::${t}::base::${s}`;
}
__name(Dn, "Dn");
function Ln(e, t, r, n, s) {
  const a = Mt(n);
  return `${e}::${s || "anon"}::${t}::${r}::${a}`;
}
__name(Ln, "Ln");
async function Bn(e) {
  if (!Ue) {
    if (!e) {
      Ue = true;
      return;
    }
    await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), Ue = true;
  }
}
__name(Bn, "Bn");
async function rt(e, t) {
  const r = Date.now(), n = He.get(t);
  if (n && r - n.createdAt < kn)
    return { hit: true, data: n.data, store: "mem" };
  if (n && He.delete(t), !e)
    return { hit: false };
  const s = await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const a = JSON.parse(s.response_json);
    return He.set(t, { data: a, createdAt: r }), { hit: true, data: a, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(rt, "rt");
async function ne(e, t, r, n) {
  const s = Date.now();
  He.set(t, { data: n, createdAt: s }), e && await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t, r, JSON.stringify(n), At()).run();
}
__name(ne, "ne");
function Fn(e, t) {
  const n = ['\uB2F9\uC2E0\uC740 "\uD559\uC2B5 \uD14D\uC2A4\uD2B8 \uC555\uCD95 \uC694\uC57D" \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', '\uBC18\uB4DC\uC2DC "\uC911\uAC04 \uAE00\uC790 \uC790\uB974\uAE30" \uAC19\uC740 \uBC29\uC2DD\uC740 \uAE08\uC9C0\uD569\uB2C8\uB2E4.', "\uBB38\uC7A5/\uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uD55C\uAD6D\uC5B4\uB85C \uC694\uC57D\uD558\uC138\uC694.", `**\uC555\uCD95\uB960 \uBAA9\uD45C: ${t === "brief" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 10~15%" : t === "standard" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 25~30%" : "\uC6D0\uBB38 \uAE38\uC774\uC758 45~55%"}** (\uD544\uC218)`, "\uC911\uBCF5 \uC81C\uAC70, \uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4/\uC6D0\uC778-\uACB0\uACFC/\uC808\uCC28\uAC00 \uB4DC\uB7EC\uB098\uAC8C \uC694\uC57D\uD558\uC138\uC694.", "\uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC778\uC6A9(\uAD04\uD638 \uC22B\uC790)\uC774\uB098 \uC815\uBCF4\uB294 \uC808\uB300 \uCD94\uAC00\uD558\uC9C0 \uB9C8\uC138\uC694."].join(`
`), s = e.length < 300 ? "1~2\uAC1C \uBB38\uB2E8" : e.length < 600 ? "2~3\uAC1C \uBB38\uB2E8" : "3~4\uAC1C \uBB38\uB2E8";
  return `${n}

[\uCD9C\uB825 \uD615\uC2DD]
- \uD55C\uAD6D\uC5B4 \uC11C\uC220 \uC694\uC57D (${s})
- \uC6D0\uBB38 \uAE38\uC774\uC5D0 \uBE44\uB840\uD558\uC5EC \uB2E8\uB77D \uC218 \uC870\uC815

[\uC6D0\uBB38]
${e}`;
}
__name(Fn, "Fn");
function st(e) {
  const t = e.split(/\n\n+/).filter((n) => n.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: t.length > 1 ? t.map((n, s) => `- (${s + 1}) ${n}`) : e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n, s) => `- (${s + 1}) ${n}.`) } };
}
__name(st, "st");
function at(e) {
  const t = e.split(/[\.。]\s+/).filter((a) => a.trim()).map((a) => a.trim()), r = (t[0] || "\uD575\uC2EC").slice(0, 40), n = [{ id: "c", label: r, level: 0 }], s = [];
  return t.slice(1).forEach((a, i) => {
    const l = `n${i + 1}`;
    n.push({ id: l, label: a.slice(0, 60), level: 1 }), s.push({ from: "c", to: l });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: r, nodes: n, edges: s } };
}
__name(at, "at");
function it(e) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n) => n.trim()).map((n, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${n.slice(0, 70)}"`, answerHint: n })) } };
}
__name(it, "it");
function zn(e, t, r) {
  const n = e.length, s = t.length, a = n > 0 ? s / n : 0;
  let i = 0, l = 1;
  r === "brief" ? (i = 0.1, l = 0.15) : r === "standard" ? (i = 0.25, l = 0.3) : (i = 0.45, l = 0.55);
  const o = a >= i && a <= l, c = `${(i * 100).toFixed(0)}-${(l * 100).toFixed(0)}%`;
  return { valid: o, ratio: a, expected: c };
}
__name(zn, "zn");
function qn(e, t) {
  const r = [], n = /* @__PURE__ */ new Set(), s = /\(([^)]+)\)/g;
  let a;
  for (; (a = s.exec(e)) !== null; )
    n.add(a[1].trim());
  let i = t;
  return i = i.replace(/\(([^)]+)\)/g, (l, o) => {
    const c = o.trim();
    return n.has(c) ? l : (r.push(`\uC81C\uAC70\uB428: ${l}`), "");
  }), i = i.replace(/\s{2,}/g, " ").trim(), { cleaned: i, warnings: r };
}
__name(qn, "qn");
async function ot(e, t) {
  var o, c, u, p, h;
  const r = q(e.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = q(e.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, a = { contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let i = 0, l = 500;
  for (; i < 3; ) {
    i++;
    const v = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (v.ok) {
      const T = await v.json();
      return { ok: true, text: ((h = (p = (u = (c = (o = T == null ? void 0 : T.candidates) == null ? void 0 : o[0]) == null ? void 0 : c.content) == null ? void 0 : u.parts) == null ? void 0 : p[0]) == null ? void 0 : h.text) ?? "", raw: T };
    }
    if (v.status === 429 || v.status === 503) {
      await new Promise((T) => setTimeout(T, l)), l *= 2;
      continue;
    }
    const O = await v.text().catch(() => "");
    throw new Error(`Gemini error ${v.status}: ${O.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(ot, "ot");
var Kn = `/* MindStory Engine Bundle (compat) */
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
Y.use("/api/*", vn());
Y.get("/static/ms-engine-bundle.js", (e) => e.text(Kn, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
Y.get("/favicon.ico", (e) => e.body(null, 204));
Y.use("/static/*", On({ root: "./public" }));
Y.get("/", (e) => e.html(`<!DOCTYPE html>
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
Y.get("/api/health", (e) => {
  const t = !!q(e.env.GEMINI_API_KEY).trim(), r = q(e.env.USE_MOCK).trim().toLowerCase() === "true";
  return e.json({ ok: true, ts: At(), hasDB: !!e.env.DB, hasGeminiKey: t, engineMode: t && !r ? "gemini+fallback" : "local-only" });
});
Y.post("/api/engine", async (e) => {
  var y, g;
  const t = Date.now(), r = e.env.DB;
  await Bn(r);
  let n = null;
  try {
    n = await e.req.json();
  } catch {
    return e.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = An(n == null ? void 0 : n.kind), a = q((n == null ? void 0 : n.text) || ""), i = _n((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), l = Rn((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), o = q(((y = n == null ? void 0 : n.options) == null ? void 0 : y.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!a.trim() || a.trim().length < 5)
    return e.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const c = Ln(s, i, l, a, o || null), u = await rt(r, c);
  if (u.hit)
    return e.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - t } }, 200);
  const p = Dn(s, i, a, o || null), h = await rt(r, p);
  if (h.hit && ((g = h.data) != null && g.narrative)) {
    const f = h.data.narrative;
    let b;
    return l === "narrative" ? b = { kind: s, mode: i, viewType: l, narrative: f } : l === "structured" ? b = { kind: s, mode: i, ...st(f) } : l === "mindmap" ? b = { kind: s, mode: i, ...at(f) } : b = { kind: s, mode: i, ...it(f) }, await ne(r, c, o || "anon", b), e.json({ ok: true, data: b, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - t } }, 200);
  }
  const v = !!q(e.env.GEMINI_API_KEY).trim(), O = q(e.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && v && !O)
    try {
      const f = Fn(a, i);
      let b = "", $ = false, k = 0;
      for (; k < 2; ) {
        b = ((await ot(e.env, f)).text || "").trim();
        const A = zn(a, b, i);
        if (A.valid) {
          $ = true;
          break;
        }
        if (k++, k < 2) {
          const D = `${f}

[\uC911\uC694] \uC774\uC804 \uC2DC\uB3C4\uC758 \uC555\uCD95\uB960\uC774 ${(A.ratio * 100).toFixed(1)}%\uB85C \uBAA9\uD45C \uBC94\uC704(${A.expected})\uB97C \uBC97\uC5B4\uB0AC\uC2B5\uB2C8\uB2E4. \uBC18\uB4DC\uC2DC ${A.expected} \uBC94\uC704\uB85C \uC694\uC57D\uD558\uC138\uC694.`;
          b = ((await ot(e.env, D)).text || "").trim();
        }
      }
      const { cleaned: R, warnings: E } = qn(a, b);
      E.length > 0 && console.warn("[SAFETY] \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC778\uC6A9 \uC81C\uAC70:", E), b = R;
      const S = { kind: "summary", mode: i, viewType: "narrative", narrative: b };
      await ne(r, p, o || "anon", S);
      let j;
      return l === "narrative" ? j = S : l === "structured" ? j = { kind: s, mode: i, ...st(b) } : l === "mindmap" ? j = { kind: s, mode: i, ...at(b) } : j = { kind: s, mode: i, ...it(b) }, await ne(r, c, o || "anon", j), e.json({ ok: true, data: j, meta: { cached: false, engine: "gemini", compressionValid: $, retryCount: k, citationWarnings: E.length, elapsedMs: Date.now() - t } }, 200);
    } catch (f) {
      const b = nt(a, i, l);
      if (await ne(r, c, o || "anon", b), b.narrative) {
        const $ = { kind: "summary", mode: i, viewType: "narrative", narrative: b.narrative };
        await ne(r, p, o || "anon", $);
      }
      return e.json({ ok: true, data: b, meta: { cached: false, engine: "local(fallback)", geminiError: f != null && f.message ? String(f.message).slice(0, 180) : "unknown", elapsedMs: Date.now() - t } }, 200);
    }
  let T;
  if (s === "summary") {
    if (T = nt(a, i, l), T.narrative) {
      const f = { kind: "summary", mode: i, viewType: "narrative", narrative: T.narrative };
      await ne(r, p, o || "anon", f);
    }
  } else if (s === "concept") {
    const f = Ve(a), b = We(f, ge(Math.round(f.length * 0.25), 6, 10));
    T = { kind: s, mode: i, viewType: l, concepts: b.map(($, k) => ({ term: `\uD575\uC2EC\uAC1C\uB150${k + 1}`, definition: $.slice(0, 120) })) };
  } else {
    const f = Ve(a), b = We(f, ge(Math.round(f.length * 0.22), 6, 10));
    T = { kind: s, mode: i, viewType: l, items: b.map(($, k) => ({ id: `e${k + 1}`, type: "mcq", question: `(${k + 1}) \uB2E4\uC74C \uC124\uBA85\uC758 \uD575\uC2EC \uC694\uC9C0\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?`, choices: ["\uD575\uC2EC \uC8FC\uC7A5/\uC694\uC9C0", "\uADFC\uAC70/\uC608\uC2DC", "\uBC18\uBC15/\uD55C\uACC4", "\uC8FC\uC81C\uC640 \uBB34\uAD00"], answerIndex: 0, explanation: $ })) };
  }
  return await ne(r, c, o || "anon", T), e.json({ ok: true, data: T, meta: { cached: false, engine: v && !O ? "local(no-gemini-for-kind)" : "local", elapsedMs: Date.now() - t } }, 200);
});
Y.notFound((e) => e.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var ct = new _t();
var Un = Object.assign({ "/src/index.tsx": Y });
var It = false;
for (const [, e] of Object.entries(Un))
  e && (ct.route("/", e), ct.notFound(e.notFoundHandler), It = true);
if (!It)
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

// ../.wrangler/tmp/bundle-fA7ilk/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = ct;

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

// ../.wrangler/tmp/bundle-fA7ilk/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.7467886266081631.mjs.map
