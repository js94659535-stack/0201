var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-8nxqEk/checked-fetch.js
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

// ../.wrangler/tmp/bundle-8nxqEk/strip-cf-connecting-ip-header.js
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
var Vt = Object.defineProperty;
var ct = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "ct");
var Xt = /* @__PURE__ */ __name((t, e, n) => e in t ? Vt(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "Xt");
var M = /* @__PURE__ */ __name((t, e, n) => Xt(t, typeof e != "symbol" ? e + "" : e, n), "M");
var nt = /* @__PURE__ */ __name((t, e, n) => e.has(t) || ct("Cannot " + n), "nt");
var d = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var A = /* @__PURE__ */ __name((t, e, n) => e.has(t) ? ct("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "A");
var T = /* @__PURE__ */ __name((t, e, n, r) => (nt(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "T");
var k = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "access private method"), n), "k");
var lt = /* @__PURE__ */ __name((t, e, n, r) => ({ set _(s) {
  T(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "lt");
var dt = /* @__PURE__ */ __name((t, e, n) => (r, s) => {
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
}, "dt");
var Qt = Symbol();
var Zt = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof Nt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? en(t, { all: n, dot: r }) : {};
}, "Zt");
async function en(t, e) {
  const n = await t.formData();
  return n ? tn(n, e) : {};
}
__name(en, "en");
function tn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? nn(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (rn(n, r, s), delete n[r]);
  }), n;
}
__name(tn, "tn");
var nn = /* @__PURE__ */ __name((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "nn");
var rn = /* @__PURE__ */ __name((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "rn");
var Tt = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Tt");
var sn = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: n } = an(t), r = Tt(n);
  return on(r, e);
}, "sn");
var an = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "an");
var on = /* @__PURE__ */ __name((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "on");
var Ue = {};
var cn = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return Ue[r] || (n[2] ? Ue[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Ue[r] = [t, n[1], true]), Ue[r];
  }
  return null;
}, "cn");
var ot = /* @__PURE__ */ __name((t, e) => {
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
}, "ot");
var ln = /* @__PURE__ */ __name((t) => ot(t, decodeURI), "ln");
var _t = /* @__PURE__ */ __name((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return ln(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "_t");
var dn = /* @__PURE__ */ __name((t) => {
  const e = _t(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "dn");
var Se = /* @__PURE__ */ __name((t, e, ...n) => (n.length && (e = Se(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "Se");
var Mt = /* @__PURE__ */ __name((t) => {
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
}, "Mt");
var rt = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? ot(t, At) : t) : t, "rt");
var Ct = /* @__PURE__ */ __name((t, e, n) => {
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
}, "Ct");
var un = Ct;
var hn = /* @__PURE__ */ __name((t, e) => Ct(t, e, true), "hn");
var At = decodeURIComponent;
var ut = /* @__PURE__ */ __name((t) => ot(t, At), "ut");
var Te;
var V;
var ie;
var Rt;
var jt;
var at;
var oe;
var wt;
var Nt = (wt = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", n = [[]]) {
    A(this, ie);
    M(this, "raw");
    A(this, Te);
    A(this, V);
    M(this, "routeIndex", 0);
    M(this, "path");
    M(this, "bodyCache", {});
    A(this, oe, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, T(this, V, n), T(this, Te, {});
  }
  param(t) {
    return t ? k(this, ie, Rt).call(this, t) : k(this, ie, jt).call(this);
  }
  query(t) {
    return un(this.url, t);
  }
  queries(t) {
    return hn(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Zt(this, t));
  }
  json() {
    return d(this, oe).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, oe).call(this, "text");
  }
  arrayBuffer() {
    return d(this, oe).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, oe).call(this, "blob");
  }
  formData() {
    return d(this, oe).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, Te)[t] = e;
  }
  valid(t) {
    return d(this, Te)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Qt]() {
    return d(this, V);
  }
  get matchedRoutes() {
    return d(this, V)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, V)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "wt"), Te = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakSet(), Rt = /* @__PURE__ */ __name(function(t) {
  const e = d(this, V)[0][this.routeIndex][1][t], n = k(this, ie, at).call(this, e);
  return n && /\%/.test(n) ? ut(n) : n;
}, "Rt"), jt = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(d(this, V)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = k(this, ie, at).call(this, d(this, V)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? ut(r) : r);
  }
  return t;
}, "jt"), at = /* @__PURE__ */ __name(function(t) {
  return d(this, V)[1] ? d(this, V)[1][t] : t;
}, "at"), oe = /* @__PURE__ */ new WeakMap(), wt);
var fn = { Stringify: 1 };
var kt = /* @__PURE__ */ __name(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => kt(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "kt");
var pn = "text/plain; charset=UTF-8";
var st = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "st");
var He;
var De;
var te;
var _e;
var ne;
var Y;
var Be;
var Me;
var Ce;
var me;
var qe;
var Ge;
var ce;
var Oe;
var yt;
var gn = (yt = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    A(this, ce);
    A(this, He);
    A(this, De);
    M(this, "env", {});
    A(this, te);
    M(this, "finalized", false);
    M(this, "error");
    A(this, _e);
    A(this, ne);
    A(this, Y);
    A(this, Be);
    A(this, Me);
    A(this, Ce);
    A(this, me);
    A(this, qe);
    A(this, Ge);
    M(this, "render", (...t2) => (d(this, Me) ?? T(this, Me, (e2) => this.html(e2)), d(this, Me).call(this, ...t2)));
    M(this, "setLayout", (t2) => T(this, Be, t2));
    M(this, "getLayout", () => d(this, Be));
    M(this, "setRenderer", (t2) => {
      T(this, Me, t2);
    });
    M(this, "header", (t2, e2, n) => {
      this.finalized && T(this, Y, new Response(d(this, Y).body, d(this, Y)));
      const r = d(this, Y) ? d(this, Y).headers : d(this, me) ?? T(this, me, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    M(this, "status", (t2) => {
      T(this, _e, t2);
    });
    M(this, "set", (t2, e2) => {
      d(this, te) ?? T(this, te, /* @__PURE__ */ new Map()), d(this, te).set(t2, e2);
    });
    M(this, "get", (t2) => d(this, te) ? d(this, te).get(t2) : void 0);
    M(this, "newResponse", (...t2) => k(this, ce, Oe).call(this, ...t2));
    M(this, "body", (t2, e2, n) => k(this, ce, Oe).call(this, t2, e2, n));
    M(this, "text", (t2, e2, n) => !d(this, me) && !d(this, _e) && !e2 && !n && !this.finalized ? new Response(t2) : k(this, ce, Oe).call(this, t2, e2, st(pn, n)));
    M(this, "json", (t2, e2, n) => k(this, ce, Oe).call(this, JSON.stringify(t2), e2, st("application/json", n)));
    M(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name((s) => k(this, ce, Oe).call(this, s, e2, st("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? kt(t2, fn.Stringify, false, {}).then(r) : r(t2);
    });
    M(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    M(this, "notFound", () => (d(this, Ce) ?? T(this, Ce, () => new Response()), d(this, Ce).call(this, this)));
    T(this, He, t), e && (T(this, ne, e.executionCtx), this.env = e.env, T(this, Ce, e.notFoundHandler), T(this, Ge, e.path), T(this, qe, e.matchResult));
  }
  get req() {
    return d(this, De) ?? T(this, De, new Nt(d(this, He), d(this, Ge), d(this, qe))), d(this, De);
  }
  get event() {
    if (d(this, ne) && "respondWith" in d(this, ne))
      return d(this, ne);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, ne))
      return d(this, ne);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, Y) || T(this, Y, new Response(null, { headers: d(this, me) ?? T(this, me, new Headers()) }));
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
    T(this, Y, t), this.finalized = true;
  }
  get var() {
    return d(this, te) ? Object.fromEntries(d(this, te)) : {};
  }
}, "yt"), He = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakSet(), Oe = /* @__PURE__ */ __name(function(t, e, n) {
  const r = d(this, Y) ? new Headers(d(this, Y).headers) : d(this, me) ?? new Headers();
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
}, "Oe"), yt);
var K = "ALL";
var mn = "all";
var xn = ["get", "post", "put", "delete", "options", "patch"];
var It = "Can not add a route since the matcher is already built.";
var Pt = /* @__PURE__ */ __name(class extends Error {
}, "Pt");
var bn = "__COMPOSED_HANDLER";
var vn = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "vn");
var ht = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ht");
var X;
var U;
var Lt;
var Q;
var pe;
var Fe;
var Je;
var Ae;
var wn = (Ae = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    A(this, U);
    M(this, "get");
    M(this, "post");
    M(this, "put");
    M(this, "delete");
    M(this, "options");
    M(this, "patch");
    M(this, "all");
    M(this, "on");
    M(this, "use");
    M(this, "router");
    M(this, "getPath");
    M(this, "_basePath", "/");
    A(this, X, "/");
    M(this, "routes", []);
    A(this, Q, vn);
    M(this, "errorHandler", ht);
    M(this, "onError", (e2) => (this.errorHandler = e2, this));
    M(this, "notFound", (e2) => (T(this, Q, e2), this));
    M(this, "fetch", (e2, ...n) => k(this, U, Je).call(this, e2, n[1], n[0], e2.method));
    M(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${Se("/", e2)}`, n), r2, s2)));
    M(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(k(this, U, Je).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...xn, mn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? T(this, X, a) : k(this, U, pe).call(this, i, d(this, X), a), o.forEach((c) => {
        k(this, U, pe).call(this, i, d(this, X), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        T(this, X, c);
        for (const l of [i].flat())
          o.map((u) => {
            k(this, U, pe).call(this, l.toUpperCase(), d(this, X), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? T(this, X, i) : (T(this, X, "*"), a.unshift(i)), a.forEach((o) => {
      k(this, U, pe).call(this, K, d(this, X), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? _t : dn;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === ht ? i = s.handler : (i = /* @__PURE__ */ __name(async (o, c) => (await dt([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[bn] = s.handler), k(a = r, U, pe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = k(this, U, Lt).call(this);
    return n._basePath = Se(this._basePath, e), n;
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
      const c = Se(this._basePath, e), l = c === "/" ? 0 : c.length;
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
    return k(this, U, pe).call(this, K, Se(e, "*"), o), this;
  }
}, "Ae"), X = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function() {
  const e = new Ae({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, T(e, Q, d(this, Q)), e.routes = this.routes, e;
}, "Lt"), Q = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ __name(function(e, n, r) {
  e = e.toUpperCase(), n = Se(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "pe"), Fe = /* @__PURE__ */ __name(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "Fe"), Je = /* @__PURE__ */ __name(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await k(this, U, Je).call(this, e, n, r, "GET")))();
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new gn(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: d(this, Q) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, Q).call(this, o);
      });
    } catch (u) {
      return k(this, U, Fe).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, Q).call(this, o))).catch((u) => k(this, U, Fe).call(this, u, o)) : l ?? d(this, Q).call(this, o);
  }
  const c = dt(a[0], this.errorHandler, d(this, Q));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return k(this, U, Fe).call(this, l, o);
    }
  })();
}, "Je"), Ae);
var Ht = [];
function yn(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name((s, i) => {
    const a = n[s] || n[K], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Ht];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(yn, "yn");
var Qe = "[^/]+";
var Pe = ".*";
var Le = "(?:|/.*)";
var $e = Symbol();
var En = new Set(".\\+*[^]$()");
function Sn(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Pe || t === Le ? 1 : e === Pe || e === Le ? -1 : t === Qe ? 1 : e === Qe ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Sn, "Sn");
var xe;
var be;
var Z;
var ye;
var On = (ye = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, xe);
    A(this, be);
    A(this, Z, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (d(this, xe) !== void 0)
        throw $e;
      if (i)
        return;
      T(this, xe, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", Pe] : ["", "", Qe] : a === "/*" ? ["", "", Le] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Qe;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw $e;
      if (l = d(this, Z)[h], !l) {
        if (Object.keys(d(this, Z)).some((v) => v !== Pe && v !== Le))
          throw $e;
        if (i)
          return;
        l = d(this, Z)[h] = new ye(), u !== "" && T(l, be, s.varIndex++);
      }
      !i && u !== "" && r.push([u, d(l, be)]);
    } else if (l = d(this, Z)[a], !l) {
      if (Object.keys(d(this, Z)).some((u) => u.length > 1 && u !== Pe && u !== Le))
        throw $e;
      if (i)
        return;
      l = d(this, Z)[a] = new ye();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, Z)).sort(Sn).map((r) => {
      const s = d(this, Z)[r];
      return (typeof d(s, be) == "number" ? `(${r})@${d(s, be)}` : En.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, xe) == "number" && n.unshift(`#${d(this, xe)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "ye"), xe = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), ye);
var et;
var Ke;
var Et;
var $n = (Et = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, et, { varIndex: 0 });
    A(this, Ke, new On());
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
    return d(this, Ke).insert(i, e, r, d(this, et), n), r;
  }
  buildRegExp() {
    let t = d(this, Ke).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "Et"), et = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), Et);
var Tn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ye = /* @__PURE__ */ Object.create(null);
function Dt(t) {
  return Ye[t] ?? (Ye[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Dt, "Dt");
function _n() {
  Ye = /* @__PURE__ */ Object.create(null);
}
__name(_n, "_n");
function Mn(t) {
  var l;
  const e = new $n(), n = [];
  if (t.length === 0)
    return Tn;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [v, $]) => u ? 1 : v ? -1 : h.length - $.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, v = r.length; u < v; u++) {
    const [$, N, j] = r[u];
    $ ? s[N] = [j.map(([b]) => [b, /* @__PURE__ */ Object.create(null)]), Ht] : h++;
    let C;
    try {
      C = e.insert(N, h, $);
    } catch (b) {
      throw b === $e ? new Pt(N) : b;
    }
    $ || (n[h] = j.map(([b, w]) => {
      const _ = /* @__PURE__ */ Object.create(null);
      for (w -= 1; w >= 0; w--) {
        const [I, g] = C[w];
        _[I] = g;
      }
      return [b, _];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let v = 0, $ = n[u].length; v < $; v++) {
      const N = (l = n[u][v]) == null ? void 0 : l[1];
      if (!N)
        continue;
      const j = Object.keys(N);
      for (let C = 0, b = j.length; C < b; C++)
        N[j[C]] = o[N[j[C]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, s];
}
__name(Mn, "Mn");
function Ee(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Dt(n).test(e))
        return [...t[n]];
  }
}
__name(Ee, "Ee");
var le;
var de;
var tt;
var Bt;
var St;
var Cn = (St = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, tt);
    M(this, "name", "RegExpRouter");
    A(this, le);
    A(this, de);
    M(this, "match", yn);
    T(this, le, { [K]: /* @__PURE__ */ Object.create(null) }), T(this, de, { [K]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, le), s = d(this, de);
    if (!r || !s)
      throw new Error(It);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[K]).forEach((l) => {
        c[t][l] = [...c[K][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Dt(e);
      t === K ? Object.keys(r).forEach((l) => {
        var u;
        (u = r[l])[e] || (u[e] = Ee(r[l], e) || Ee(r[K], e) || []);
      }) : (o = r[t])[e] || (o[e] = Ee(r[t], e) || Ee(r[K], e) || []), Object.keys(r).forEach((l) => {
        (t === K || t === l) && Object.keys(r[l]).forEach((u) => {
          c.test(u) && r[l][u].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === K || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([n, i]));
      });
      return;
    }
    const a = Mt(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var v;
        (t === K || t === h) && ((v = s[h])[u] || (v[u] = [...Ee(r[h], u) || Ee(r[K], u) || []]), s[h][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, de)).concat(Object.keys(d(this, le))).forEach((e) => {
      t[e] || (t[e] = k(this, tt, Bt).call(this, e));
    }), T(this, le, T(this, de, void 0)), _n(), t;
  }
}, "St"), le = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakSet(), Bt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let n = t === K;
  return [d(this, le), d(this, de)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== K && e.push(...Object.keys(r[K]).map((i) => [i, r[K][i]]));
  }), n ? Mn(e) : null;
}, "Bt"), St);
var ue;
var re;
var Ot;
var An = (Ot = /* @__PURE__ */ __name(class {
  constructor(t) {
    M(this, "name", "SmartRouter");
    A(this, ue, []);
    A(this, re, []);
    T(this, ue, t.routers);
  }
  add(t, e, n) {
    if (!d(this, re))
      throw new Error(It);
    d(this, re).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, re))
      throw new Error("Fatal error");
    const n = d(this, ue), r = d(this, re), s = n.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = r.length; c < l; c++)
          o.add(...r[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof Pt)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), T(this, ue, [o]), T(this, re, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, re) || d(this, ue).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ue)[0];
  }
}, "Ot"), ue = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), Ot);
var ke = /* @__PURE__ */ Object.create(null);
var he;
var J;
var ve;
var Ne;
var z;
var se;
var ge;
var Re;
var Nn = (Re = /* @__PURE__ */ __name(class {
  constructor(e, n, r) {
    A(this, se);
    A(this, he);
    A(this, J);
    A(this, ve);
    A(this, Ne, 0);
    A(this, z, ke);
    if (T(this, J, r || /* @__PURE__ */ Object.create(null)), T(this, he, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, T(this, he, [s]);
    }
    T(this, ve, []);
  }
  insert(e, n, r) {
    T(this, Ne, ++lt(this, Ne)._);
    let s = this;
    const i = sn(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = cn(l, u), v = Array.isArray(h) ? h[0] : l;
      if (v in d(s, J)) {
        s = d(s, J)[v], h && a.push(h[1]);
        continue;
      }
      d(s, J)[v] = new Re(), h && (d(s, ve).push(h), a.push(h[1])), s = d(s, J)[v];
    }
    return d(s, he).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, Ne) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    T(this, z, ke);
    let i = [this];
    const a = Tt(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], v = l === u - 1, $ = [];
      for (let N = 0, j = i.length; N < j; N++) {
        const C = i[N], b = d(C, J)[h];
        b && (T(b, z, d(C, z)), v ? (d(b, J)["*"] && r.push(...k(this, se, ge).call(this, d(b, J)["*"], e, d(C, z))), r.push(...k(this, se, ge).call(this, b, e, d(C, z)))) : $.push(b));
        for (let w = 0, _ = d(C, ve).length; w < _; w++) {
          const I = d(C, ve)[w], g = d(C, z) === ke ? {} : { ...d(C, z) };
          if (I === "*") {
            const E = d(C, J)["*"];
            E && (r.push(...k(this, se, ge).call(this, E, e, d(C, z))), T(E, z, g), $.push(E));
            continue;
          }
          const [D, O, x] = I;
          if (!h && !(x instanceof RegExp))
            continue;
          const f = d(C, J)[D], y = a.slice(l).join("/");
          if (x instanceof RegExp) {
            const E = x.exec(y);
            if (E) {
              if (g[O] = E[0], r.push(...k(this, se, ge).call(this, f, e, d(C, z), g)), Object.keys(d(f, J)).length) {
                T(f, z, g);
                const p = ((c = E[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (x === true || x.test(h)) && (g[O] = h, v ? (r.push(...k(this, se, ge).call(this, f, e, g, d(C, z))), d(f, J)["*"] && r.push(...k(this, se, ge).call(this, d(f, J)["*"], e, g, d(C, z)))) : (T(f, z, g), $.push(f)));
        }
      }
      i = $.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, u) => l.score - u.score), [r.map(({ handler: l, params: u }) => [l, u])];
  }
}, "Re"), he = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakSet(), ge = /* @__PURE__ */ __name(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = d(e, he).length; a < o; a++) {
    const c = d(e, he)[a], l = c[n] || c[K], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== ke || s && s !== ke))
      for (let h = 0, v = l.possibleKeys.length; h < v; h++) {
        const $ = l.possibleKeys[h], N = u[l.score];
        l.params[$] = s != null && s[$] && !N ? s[$] : r[$] ?? (s == null ? void 0 : s[$]), u[l.score] = true;
      }
  }
  return i;
}, "ge"), Re);
var we;
var $t;
var Rn = ($t = /* @__PURE__ */ __name(class {
  constructor() {
    M(this, "name", "TrieRouter");
    A(this, we);
    T(this, we, new Nn());
  }
  add(t, e, n) {
    const r = Mt(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        d(this, we).insert(t, r[s], n);
      return;
    }
    d(this, we).insert(t, e, n);
  }
  match(t, e) {
    return d(this, we).search(t, e);
  }
}, "$t"), we = /* @__PURE__ */ new WeakMap(), $t);
var qt = /* @__PURE__ */ __name(class extends wn {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new An({ routers: [new Cn(), new Rn()] });
  }
}, "qt");
var jn = /* @__PURE__ */ __name((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, v) {
      a.res.headers.set(h, v);
    }
    __name(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let v = n.allowHeaders;
      if (!(v != null && v.length)) {
        const $ = a.req.header("Access-Control-Request-Headers");
        $ && (v = $.split(/\s*,\s*/));
      }
      return v != null && v.length && (c("Access-Control-Allow-Headers", v.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "jn");
var kn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ft = /* @__PURE__ */ __name((t, e = Pn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ft");
var In = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Pn = In;
var Ln = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Ln");
var Gt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Hn = Object.keys(Gt);
var Dn = "index.html";
var Bn = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Ln;
  return async (s, i) => {
    var u, h, v, $;
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
    t.isDir && await t.isDir(o) && (o = r(o, Dn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const N = t.mimes && ft(o, t.mimes) || ft(o);
      if (s.header("Content-Type", N || "application/octet-stream"), t.precompressed && (!N || kn.test(N))) {
        const j = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((C) => C.trim()));
        for (const C of Hn) {
          if (!j.has(C))
            continue;
          const b = await c(o + Gt[C], s);
          if (b) {
            l = b, s.header("Content-Encoding", C), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((v = t.onFound) == null ? void 0 : v.call(t, o, s)), s.body(l);
    }
    await (($ = t.onNotFound) == null ? void 0 : $.call(t, o, s)), await i();
  };
}, "Bn");
var qn = /* @__PURE__ */ __name(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "qn");
var Gn = /* @__PURE__ */ __name((t) => async function(n, r) {
  return Bn({ ...t, getContent: async (i) => qn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "Gn");
var Kn = /* @__PURE__ */ __name((t) => Gn(t), "Kn");
var ee = new qt();
var We = /* @__PURE__ */ new Map();
var Un = 1e3 * 60 * 60 * 24 * 7;
var it = false;
function Kt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Kt, "Kt");
function F(t) {
  return t == null ? "" : String(t);
}
__name(F, "F");
function Ve(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Ve, "Ve");
function zn(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(zn, "zn");
function ze(t) {
  return zn(t).length;
}
__name(ze, "ze");
function Ut(t) {
  const e = F(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Ut, "Ut");
function zt(t) {
  const e = F(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(zt, "zt");
function Fn(t) {
  const e = F(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Fn, "Fn");
function Jn(t) {
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
__name(Jn, "Jn");
var Yn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var Wn = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function Vn(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    let r = false;
    for (const s of Wn)
      if (s.has(n)) {
        e.add(Array.from(s)[0]), r = true;
        break;
      }
    r || e.add(n);
  }
  return e;
}
__name(Vn, "Vn");
function Ze(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !Yn.has(e));
}
__name(Ze, "Ze");
function Xn(t) {
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
__name(Xn, "Xn");
function Qn(t, e) {
  return Xn(t).slice().sort((s, i) => i.score - s.score).slice(0, Ve(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(Qn, "Qn");
function Zn(t) {
  let e = (t || "").trim();
  return e = e.replace(/모\s+든/g, "\uBAA8\uB4E0"), e = e.replace(/기\s+회/g, "\uAE30\uD68C"), e = e.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), e = e.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), e = e.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), e = e.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), e = e.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), e = e.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), e = e.replace(/\s*\.\s*/g, ". "), e = e.replace(/\s*,\s*/g, ", "), e = e.replace(/\s*;\s*/g, "; "), e = e.replace(/[ ]{2,}/g, " "), e = e.replace(/\n{3,}/g, `

`), e.trim();
}
__name(Zn, "Zn");
function Xe(t) {
  return (t || "").replace(/\s+/g, "").length;
}
__name(Xe, "Xe");
function Ft(t) {
  const e = Math.max(400, Xe(t)), n = /* @__PURE__ */ __name((j, C, b) => Math.max(C, Math.min(b, j)), "n"), r = 120, s = 220, i = 350, a = 700, o = 900, c = 1600, l = n(Math.round(e * 0.05), r, s), u = n(Math.round(e * 0.14), i, a), h = n(Math.round(e * 0.32), o, c), v = Math.min(l, u - 40), $ = Math.max(u, v + 80), N = Math.max(h, $ + 200);
  return { base: e, brief: v, standard: $, detail: N };
}
__name(Ft, "Ft");
function er(t) {
  const e = Ft(t);
  return `
\uB2F9\uC2E0\uC740 \uAD50\uC721/\uC720\uC544\uAD50\uC721 \uC5F0\uAD6C \uD14D\uC2A4\uD2B8\uB97C '\uC694\uC57D \uC6D0\uCE59'\uC5D0 \uB530\uB77C 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C \uC694\uC57D\uD558\uB294 \uC5D4\uC9C4\uC774\uB2E4.

[\uC785\uB825 \uC6D0\uBB38]
"""${t}"""

[\uC694\uC57D \uC6D0\uCE59 - \uBC18\uB4DC\uC2DC \uC900\uC218]
1) "\uAC04\uB2E8 < \uD45C\uC900 < \uC0C1\uC138" \uAE00\uC790\uC218 \uB2E8\uC870 \uC99D\uAC00\uB97C \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C. (\uC5ED\uC804 \uAE08\uC9C0)
2) \uC138 \uC694\uC57D \uBAA8\uB450 \uC544\uB798 3\uC601\uC5ED\uC744 \uBC18\uB4DC\uC2DC \uD3EC\uD568\uD558\uB77C:
   - \uAC1C\uB150(\uC232\uCCB4\uD5D8 \uD65C\uB3D9\uC774 \uBB34\uC5C7\uC778\uC9C0)
   - \uC601\uD5A5(\uC720\uC544 \uBC1C\uB2EC\uC5D0 \uC5B4\uB5A4 \uC601\uD5A5\uC778\uC9C0)
   - \uAD50\uC721\uC801 \uAC00\uCE58(\uAD50\uC721\uC801\uC73C\uB85C \uC5B4\uB5A4 \uAC00\uCE58\uC778\uC9C0)
3) \uBC1C\uCDCC/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uAE38\uAC8C \uAC00\uC838\uC624\uC9C0 \uB9D0\uACE0 \uC758\uBBF8\uB97C \uC7AC\uAD6C\uC131\uD558\uB77C.
4) \uC778\uC6A9(\uC800\uC790, \uC5F0\uB3C4)\uC740 \uC694\uC57D\uC744 \uBC29\uD574\uD558\uBA74 \uC81C\uAC70\uD558\uB77C. \uAF2D \uD544\uC694\uD558\uBA74 \uCD5C\uB300 1\uD68C\uB9CC.
5) \uBB38\uC7A5\uBD80\uD638\uB294 \uD55C\uAD6D\uC5B4 \uAE30\uC900\uC73C\uB85C \uC815\uB9AC\uD558\uACE0, \uC9C0\uB098\uCE58\uAC8C \uAE34 \uD55C \uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC9C0 \uB9D0\uB77C.
6) \uC138 \uC694\uC57D\uC740 \uC11C\uB85C \uBB38\uC7A5/\uAD6C\uC131\uC774 '\uAC70\uC758 \uB3D9\uC77C'\uD558\uBA74 \uC2E4\uD328\uB85C \uAC04\uC8FC\uD55C\uB2E4(\uC911\uBCF5 \uAE08\uC9C0).

[\uAE38\uC774 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678 \uAE00\uC790\uC218)]
- \uAC04\uB2E8: \uC57D ${e.brief}\uC790 (2\uBB38\uC7A5 \uC774\uB0B4)
- \uD45C\uC900: \uC57D ${e.standard}\uC790 (6~8\uBB38\uC7A5)
- \uC0C1\uC138: \uC57D ${e.detail}\uC790 (\uC544\uB798 \uC18C\uC81C\uBAA9 3\uAC1C \uD3EC\uD568)

[\uC0C1\uC138 \uC694\uC57D \uC18C\uC81C\uBAA9(\uBC18\uB4DC\uC2DC \uADF8\uB300\uB85C \uC0AC\uC6A9)]
- \uAC1C\uB150
- \uC601\uD5A5
- \uAD50\uC721\uC801 \uAC00\uCE58

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

\u203B JSON \uC678\uC758 \uC5B4\uB5A4 \uBB38\uC7A5\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uB77C.
`.trim();
}
__name(er, "er");
var tr = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function pt(t) {
  const e = { definition: 0, meaning: 0, activity: 0 };
  for (const [r, s] of Object.entries(tr))
    for (const i of s)
      t.includes(i) && e[r]++;
  const n = Math.max(e.definition, e.meaning, e.activity);
  return n === 0 ? null : e.definition === n ? "definition" : e.meaning === n ? "meaning" : "activity";
}
__name(pt, "pt");
function nr(t, e, n) {
  const r = ze(e), s = [], i = /* @__PURE__ */ new Set(), a = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = a.exec(e)) !== null; )
    i.add(o[1]);
  for (const b of t) {
    const w = [];
    let _;
    const I = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (_ = I.exec(b)) !== null; ) {
      const O = _[1];
      i.has(O) && w.push(O);
    }
    let g = b.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (g.length < 10)
      continue;
    const D = Ze(g).slice(0, 8);
    s.push({ original: b, clean: g, keywords: D, citations: w }), g.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", g.slice(0, 100));
  }
  if (s.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const c = /* @__PURE__ */ new Map();
  for (const b of s)
    for (const w of b.keywords)
      c.set(w, (c.get(w) || 0) + 1);
  const l = [];
  for (const b of s) {
    new Set(b.keywords);
    let w = false;
    for (const _ of l)
      if (b.keywords.filter((g) => _.keywords.has(g)).length >= 2) {
        _.sentences.push({ clean: b.clean, citations: b.citations }), b.keywords.forEach((g) => _.keywords.add(g)), w = true;
        break;
      }
    w || l.push({ keywords: new Set(b.keywords), sentences: [{ clean: b.clean, citations: b.citations }] });
  }
  const u = l.map((b) => {
    const w = b.sentences[0].clean, _ = s.findIndex((I) => I.clean === w);
    return { ...b, originalIdx: _ };
  });
  let h = "";
  if (n === "brief") {
    const b = { definition: [], meaning: [], activity: [] };
    for (const m of u)
      for (const S of m.sentences) {
        const R = pt(S.clean);
        R && b[R].push(S);
      }
    const w = b.definition[0], _ = b.meaning[0], I = b.activity[0], g = [], D = [];
    if (w && (g.push(w.clean), D.push(...w.citations.filter(Boolean))), _ && (g.push(_.clean), D.push(..._.citations.filter(Boolean))), I && (g.push(I.clean), D.push(...I.citations.filter(Boolean))), g.length === 0) {
      const S = u.sort((R, P) => P.sentences.length - R.sentences.length)[0].sentences[0];
      g.push(S.clean), D.push(...S.citations.filter(Boolean));
    }
    const O = Array.from(new Set(D)), x = O.length > 0 ? `(${O.join("; ")})` : "", f = g.map((m) => {
      let S = m;
      for (; S.includes("("); )
        S = S.replace(/\([^)]*\)/g, "");
      return S.trim();
    });
    f.length === 1 ? h = `${f[0]}${x}.` : f.length === 2 ? h = `${f[0]}. ${f[1]}${x}.` : h = `${f[0]}\uD558\uBA70 ${f[1]}. ${f[2]}${x}.`;
    const E = ze(h) / r * 100;
    if (E > 15) {
      let m = h.slice(0, 60);
      m = m.replace(/\([^)]*\)/g, "").trim(), h = m + (x ? ` ${x}.` : ".");
    }
    const p = [];
    return w && p.push("definition"), _ && p.push("meaning"), I && p.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: p, sentenceCount: g.length, compressionRatio: E.toFixed(1) + "%", passed: E <= 15 }), h;
  }
  if (n === "standard") {
    const b = u.sort((m, S) => S.sentences.length - m.sentences.length).slice(0, 3).sort((m, S) => m.originalIdx - S.originalIdx);
    if (b.length === 1) {
      const m = b[0].sentences[0], S = b[0].sentences.flatMap((P) => P.citations).filter(Boolean), R = S.length > 0 ? `(${S.join("; ")})` : "";
      return `${m.clean}${R}.`;
    }
    const w = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), I = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const m of b)
      for (const S of m.sentences) {
        const R = S.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (R) {
          let [, P, q] = R;
          P = P.replace(/[에게서로부터]$/g, "").trim(), w.has(P) || w.set(P, []);
          let G = q.trim();
          G = G.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [B, fe] of Object.entries(I))
            if (G.includes(B)) {
              const ae = _.get(B) || 0;
              if (_.set(B, ae + 1), ae >= 1 && fe.length > 0) {
                const je = Math.min(ae - 1, fe.length - 1);
                G = G.replace(B, fe[je]);
              }
            }
          const L = new Set(Ze(G)), H = Vn(L), W = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const B of W)
            H.delete(B);
          w.get(P).push({ original: G, keywords: H, citations: S.citations });
        }
      }
    const g = [];
    for (const [m, S] of w.entries()) {
      const R = S.flatMap((L) => L.citations).filter(Boolean), P = m.charAt(m.length - 1), G = /[가-힣]/.test(P) && (P.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (S.length === 1) {
        const L = S[0].original, H = (L.match(/,/g) || []).length;
        if (L.length > 80 && H >= 2) {
          const W = L.split(",").map((B) => B.trim()).filter((B) => B.length > 0);
          if (W.length >= 2) {
            g.push({ text: `${m}${G} ${W[0]}`, citations: [] });
            for (let B = 1; B < W.length - 1; B++)
              g.push({ text: `${W[B]}`, citations: [] });
            g.push({ text: `${W[W.length - 1]}`, citations: S[0].citations });
          } else
            g.push({ text: `${m}${G} ${L}`, citations: R });
        } else
          g.push({ text: `${m}${G} ${L}`, citations: R });
      } else {
        const L = [];
        for (const H of S) {
          let W = false;
          for (const B of L) {
            const fe = Array.from(H.keywords).filter((je) => B.keywords.has(je)).length, ae = Math.max(H.keywords.size, B.keywords.size);
            if (ae > 0 && fe / ae >= 0.8) {
              H.original.length > B.original.length && (B.original = H.original, B.keywords = H.keywords), B.citations.push(...H.citations), W = true;
              break;
            }
          }
          W || L.push({ original: H.original, keywords: H.keywords, citations: [...H.citations] });
        }
        if (L.length === 1)
          g.push({ text: `${m}${G} ${L[0].original}`, citations: L.flatMap((H) => H.citations) });
        else if (L.length === 2)
          g.push({ text: `${m}${G} ${L[0].original}`, citations: L[0].citations }), g.push({ text: `${m}${G} ${L[1].original}`, citations: L[1].citations });
        else
          for (let H = 0; H < L.length; H++)
            g.push({ text: `${m}${G} ${L[H].original}`, citations: L[H].citations });
      }
    }
    if (g.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (g.length === 1) {
      const m = g[0].citations.filter(Boolean), S = m.length > 0 ? `(${m.join("; ")})` : "";
      return `${g[0].text}${S}.`;
    }
    if (g.length === 2) {
      const m = g[0].citations.filter(Boolean), S = g[1].citations.filter(Boolean), R = m.length > 0 ? `(${m.join("; ")})` : "", P = S.length > 0 ? `(${S.join("; ")})` : "";
      return `${g[0].text}${R}. ${g[1].text}${P}.`;
    }
    const D = [], O = g[0], x = O.citations.filter(Boolean), f = x.length > 0 ? `(${x.join("; ")})` : "";
    if (D.push(`${O.text}${f}.`), g.length >= 2) {
      const m = g[1], S = m.citations.filter(Boolean), R = S.length > 0 ? `(${S.join("; ")})` : "";
      D.push(`${m.text}${R}.`);
    }
    if (g.length >= 3) {
      const S = g.slice(2).map((R) => {
        const P = R.citations.filter(Boolean), q = P.length > 0 ? `(${P.join("; ")})` : "";
        return `${R.text}${q}.`;
      });
      D.push(S.join(" "));
    }
    h = D.join(`

`);
    const E = ze(h) / r * 100;
    E > 30 && (D.length > 3 ? h = D.slice(0, 3).join(`

`) : h = D.join(`

`));
    const p = [];
    for (const m of b)
      for (const S of m.sentences) {
        const R = pt(S.clean);
        R && !p.includes(R) && p.push(R);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: p, sentenceCount: g.length, paragraphCount: D.length, compressionRatio: E.toFixed(1) + "%", passed: E >= 25 && E <= 30 }), h;
  }
  const v = u.sort((b, w) => w.sentences.length - b.sentences.length).slice(0, 5).sort((b, w) => b.originalIdx - w.originalIdx);
  let $ = v.map((b, w) => {
    const _ = b.sentences[0], I = b.sentences.flatMap((D) => D.citations).filter(Boolean), g = I.length > 0 ? `(${I.join("; ")})` : "";
    return w === 0 ? `${_.clean}${g}.` : w === v.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${_.clean}${g}.` : `\uB610\uD55C ${_.clean}${g}.`;
  }).join(" ");
  return ze($) / r * 100 > (n === "brief" ? 15 : n === "standard" ? 30 : 55) && n === "detail" ? v.slice(0, 3).map((w, _) => {
    const I = w.sentences[0], g = w.sentences.flatMap((O) => O.citations).filter(Boolean), D = g.length > 0 ? `(${g.join("; ")})` : "";
    return _ === 0 ? `${I.clean}${D}.` : _ === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${I.clean}${D}.` : `\uB610\uD55C ${I.clean}${D}.`;
  }).join(" ") : $;
}
__name(nr, "nr");
function rr(t, e, n) {
  const r = Jn(t), s = e === "brief" ? Ve(Math.round(r.length * 0.18), 2, 4) : e === "standard" ? Ve(Math.round(r.length * 0.28), 4, 8) : Ve(Math.round(r.length * 0.4), 7, 14), i = Qn(r, s);
  if (n === "narrative") {
    let o = nr(i, t, e);
    return o = Zn(o), { kind: "summary", mode: e, viewType: n, narrative: o };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: i.map((o, c) => `- (${c + 1}) ${o}`) } };
  if (n === "mindmap") {
    const o = (i[0] || r[0] || "\uD575\uC2EC").slice(0, 40), c = [{ id: "c", label: o, level: 0 }], l = [];
    return i.slice(1).forEach((u, h) => {
      const v = `n${h + 1}`;
      c.push({ id: v, label: u.slice(0, 60), level: 1 }), l.push({ from: "c", to: v });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: o, nodes: c, edges: l } };
  }
  const a = i.map((o, c) => ({ id: `q${c + 1}`, type: "short", question: `(${c + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${o.slice(0, 70)}"`, answerHint: o }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: a } };
}
__name(rr, "rr");
function Jt(t) {
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
__name(Jt, "Jt");
function sr(t, e, n, r) {
  const s = Jt(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(sr, "sr");
function ir(t, e, n, r, s) {
  const i = Jt(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(ir, "ir");
async function ar(t) {
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
__name(ar, "ar");
async function gt(t, e) {
  const n = Date.now(), r = We.get(e);
  if (r && n - r.createdAt < Un)
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
__name(gt, "gt");
async function Ie(t, e, n, r) {
  const s = Date.now();
  We.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Kt()).run();
}
__name(Ie, "Ie");
function mt(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(mt, "mt");
function xt(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(xt, "xt");
function bt(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(bt, "bt");
async function Yt(t, e) {
  var c, l, u, h, v;
  const n = F(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = F(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const $ = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if ($.ok) {
      const j = await $.json();
      return { ok: true, text: ((v = (h = (u = (l = (c = j == null ? void 0 : j.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : v.text) ?? "", raw: j };
    }
    if ($.status === 429 || $.status === 503) {
      await new Promise((j) => setTimeout(j, o)), o *= 2;
      continue;
    }
    const N = await $.text().catch(() => "");
    throw new Error(`Gemini error ${$.status}: ${N.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Yt, "Yt");
async function or(t, e, n) {
  var l, u, h, v, $;
  const r = F(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = F(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const N = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (N.ok) {
      const C = await N.json();
      return (($ = (v = (h = (u = (l = C == null ? void 0 : C.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : v[0]) == null ? void 0 : $.text) ?? "";
    }
    if (N.status === 429 || N.status === 503) {
      await new Promise((C) => setTimeout(C, c)), c *= 2;
      continue;
    }
    const j = await N.text().catch(() => "");
    throw new Error(`Gemini error ${N.status}: ${j.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(or, "or");
async function cr(t, e) {
  const n = er(e);
  for (let r = 1; r <= 2; r++)
    try {
      let i = (await Yt(t, n)).trim();
      i.startsWith("```json") ? i = i.replace(/^```json\s*/i, "").replace(/```\s*$/, "") : i.startsWith("```") && (i = i.replace(/^```\s*/, "").replace(/```\s*$/, ""));
      const a = JSON.parse(i);
      if (!a.brief || !a.standard || !a.detail)
        throw new Error("Missing required fields: brief/standard/detail");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing required detail fields: \uAC1C\uB150/\uC601\uD5A5/\uAD50\uC721\uC801 \uAC00\uCE58");
      const o = Xe(a.brief), c = Xe(a.standard), l = Xe(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      if (o >= c || c >= l)
        if (console.warn(`[Summary JSON] \uB2E8\uC870\uC99D\uAC00 \uC704\uBC18: brief=${o}, standard=${c}, detail=${l}, attempt=${r}`), r === 2)
          console.warn("[Summary JSON] \u26A0\uFE0F \uB2E8\uC870\uC99D\uAC00 \uC704\uBC18\uC774\uC9C0\uB9CC \uBC18\uD658");
        else
          throw new Error("Monotonic increase violation");
      return console.log(`[Summary JSON] \u2705 PASS - brief=${o}, standard=${c}, detail=${l}`), a;
    } catch (s) {
      if (console.error(`[Summary JSON] attempt=${r}, error:`, s.message), r === 2) {
        const i = Ft(e);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uD30C\uC2F1 \uC2E4\uD328] \uC6D0\uBB38 \uC694\uC57D\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", standard: "[JSON \uD30C\uC2F1 \uC2E4\uD328] \uC6D0\uBB38 \uC694\uC57D\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", detail: { \uAC1C\uB150: "[\uD30C\uC2F1 \uC2E4\uD328]", \uC601\uD5A5: "[\uD30C\uC2F1 \uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uD30C\uC2F1 \uC2E4\uD328]" } };
      }
    }
  throw new Error("Unexpected: summarizeWithJSON failed");
}
__name(cr, "cr");
var lr = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(O) {
    return (O || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  function a(O, x) {
    const y = Math.max(200, i(O || "").length), E = e[x] || e.standard, p = Math.floor(y * E.min), m = Math.ceil(y * E.max);
    return { base: y, min: Math.max(80, p), max: Math.max(120, m) };
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
    const y = O.find((E) => E.sid === x);
    return !y || !f || typeof f != "string" ? false : y.text.includes(f.trim());
  }
  __name(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  function h({ originalText: O, mode: x, format: f }) {
    const y = a(O, x), E = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uC6D0\uBB38\uC744 \uC9C0\uC815\uB41C \uD615\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${E})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${y.min}\uC790 ~ \uCD5C\uB300 ${y.max}\uC790`, "- \uC8FC\uC758: \uC22B\uC790 \uB9DE\uCD94\uAE30 \uC704\uD574 \uC911\uAC04\uC744 \uC790\uB974\uB294 \uD589\uC704 \uAE08\uC9C0. \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC7AC\uC791\uC131.", "- \uC8FC\uC758: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC \uCD94\uAC00 \uAE08\uC9C0.", "", "[ORIGINAL]", O].join(`
`);
  }
  __name(h, "h");
  function v({ summaryText: O, format: x }) {
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
  __name(v, "v");
  function $({ mode: O, purpose: x, format: f, summaryText: y, sentTable: E, anchors: p }) {
    const m = n[O] || 10, S = x === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", R = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${O} (\uBB38\uD56D\uC218 ${m})`, `- \uBAA9\uC801: ${x} (${S})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${R})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(E, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", y].join(`
`);
  }
  __name($, "$");
  function N(O, x) {
    const f = x && x.anchors ? x.anchors : [], y = [], E = [];
    for (const p of f) {
      const m = p == null ? void 0 : p.sid, S = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        E.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(O, m, S)) {
        E.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: E };
  }
  __name(N, "N");
  function j(O, x) {
    const f = x && Array.isArray(x.items) ? x.items : [], y = [], E = [];
    for (const p of f) {
      const m = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(m != null && m.sid) || !(m != null && m.quote)) {
        E.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(O, m.sid, m.quote)) {
        E.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        E.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: E };
  }
  __name(j, "j");
  function C({ summaryText: O, sentTable: x, anchors: f, badItems: y, mode: E, purpose: p, format: m }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${y.length}`, `- \uBAA8\uB4DC: ${E}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${m}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(x, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(y, null, 2), "", "[SUMMARY]", O].join(`
`);
  }
  __name(C, "C");
  async function b({ llmCall: O, originalText: x, mode: f, format: y }) {
    if (!O)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), r.includes(y) || (y = "narrative");
    const E = h({ originalText: x, mode: f, format: y }), p = (await O({ system: u(), user: E, json: false }) || "").trim() || "", m = c(p), S = v({ summaryText: p, format: y });
    let R = await O({ system: u(), user: S, json: true }), P;
    try {
      P = JSON.parse(R);
    } catch {
      P = { anchors: [] };
    }
    const { ok: q } = N(m, P), G = q.length >= 4 ? q : w(m);
    return { summaryText: p, sentTable: m, anchors: G };
  }
  __name(b, "b");
  function w(O) {
    const x = [];
    for (let f = 0; f < Math.min(8, O.length); f++) {
      const y = O[f], E = (y.text || "").slice(0, 18);
      x.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: y.sid, quote: E, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return x;
  }
  __name(w, "w");
  async function _({ llmCall: O, mode: x, purpose: f, format: y, summaryText: E, sentTable: p, anchors: m }) {
    e[x] || (x = "standard"), s.includes(f) || (f = "preview"), r.includes(y) || (y = "narrative");
    const S = $({ mode: x, purpose: f, format: y, summaryText: E, sentTable: p, anchors: m });
    let R = await O({ system: u(), user: S, json: true }), P;
    try {
      P = JSON.parse(R);
    } catch {
      P = { items: [] };
    }
    let { ok: q, bad: G } = j(p, P);
    if (G.length > 0) {
      const H = C({ summaryText: E, sentTable: p, anchors: m, badItems: G.map((je) => je.q), mode: x, purpose: f, format: y });
      let W = await O({ system: u(), user: H, json: true }), B;
      try {
        B = JSON.parse(W);
      } catch {
        B = { items: [] };
      }
      const fe = j(p, B);
      q = q.concat(fe.ok);
      const ae = n[x] || 10;
      q = q.slice(0, ae);
    } else {
      const H = n[x] || 10;
      q = q.slice(0, H);
    }
    const L = n[x] || 10;
    if (q.length < L) {
      const H = I({ sentTable: p, anchors: m, count: L - q.length, format: y, purpose: f });
      q = q.concat(H).slice(0, L);
    }
    return { items: q };
  }
  __name(_, "_");
  function I({ sentTable: O, anchors: x, count: f, format: y, purpose: E }) {
    const p = [], m = x.slice(0, Math.max(f, 1));
    for (let S = 0; S < f; S++) {
      const R = m[S % m.length], P = R.sid, q = R.quote;
      p.push({ id: `QF${S + 1}`, type: "short", question: E === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: P, quote: q }, anchorIds: [R.id] });
    }
    return p;
  }
  __name(I, "I");
  class g {
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
        const E = (x.answer || "").trim(), p = (f || "").trim();
        return { ok: p === E, reason: p === E ? "match" : "mismatch" };
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
        const E = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: E, score: this.getScore() };
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
  __name(g, "g");
  async function D({ llmCall: O, originalText: x, mode: f, format: y, purpose: E }) {
    const p = await b({ llmCall: O, originalText: x, mode: f, format: y }), m = await _({ llmCall: O, mode: f, purpose: E, format: y, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: y, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: E, passScore: 90, items: m.items } };
  }
  __name(D, "D");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: b, generateSelfTest: _, runPipeline: D, MasteryRunner: g };
})();
var dr = `/* MindStory Engine Bundle (compat) */
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
ee.use("/api/*", jn());
ee.get("/static/ms-engine-bundle.js", (t) => t.text(dr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
ee.get("/favicon.ico", (t) => t.body(null, 204));
ee.use("/static/*", Kn({ root: "./public" }));
ee.get("/", (t) => t.html(`<!DOCTYPE html>
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
ee.get("/api/health", (t) => {
  const e = !!F(t.env.GEMINI_API_KEY).trim(), n = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Kt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
ee.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = F((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = Ut((n == null ? void 0 : n.mode) || "standard"), i = zt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = F((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!F(t.env.GEMINI_API_KEY).trim(), c = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name(async ({ system: u, user: h, json: v }) => {
    if (v) {
      const $ = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Yt(t.env, $);
    } else
      return await or(t.env, u, h);
  }, "l");
  try {
    const u = await lr.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
ee.post("/api/engine", async (t) => {
  var C, b;
  const e = Date.now(), n = t.env.DB;
  await ar(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Fn(r == null ? void 0 : r.kind), i = F((r == null ? void 0 : r.text) || ""), a = Ut((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = zt((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = F(((C = r == null ? void 0 : r.options) == null ? void 0 : C.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = ir(s, a, o, i, c || null), u = await gt(n, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = sr(s, a, i, c || null), v = await gt(n, h);
  if (v.hit && ((b = v.data) != null && b.narrative)) {
    const w = v.data.narrative;
    let _;
    return o === "narrative" ? _ = { kind: s, mode: a, viewType: o, narrative: w } : o === "structured" ? _ = { kind: s, mode: a, ...mt(w) } : o === "mindmap" ? _ = { kind: s, mode: a, ...xt(w) } : _ = { kind: s, mode: a, ...bt(w) }, await Ie(n, l, c || "anon", _), t.json({ ok: true, data: _, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const $ = !!F(t.env.GEMINI_API_KEY).trim(), N = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && $ && !N)
    try {
      const w = await cr(t.env, i);
      let _;
      a === "brief" ? _ = w.brief : a === "standard" ? _ = w.standard : _ = `**\uAC1C\uB150**
${w.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${w.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${w.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`;
      const I = { kind: s, mode: a, viewType: "narrative", narrative: _, allSummaries: { brief: w.brief, standard: w.standard, detail: w.detail }, meta: w.meta };
      await Ie(n, h, c || "anon", I);
      let g;
      return o === "narrative" ? g = I : o === "structured" ? g = { kind: s, mode: a, ...mt(_) } : o === "mindmap" ? g = { kind: s, mode: a, ...xt(_) } : g = { kind: s, mode: a, ...bt(_) }, await Ie(n, l, c || "anon", g), t.json({ ok: true, data: g, meta: { cached: false, engine: "gemini-json-v3", elapsedMs: Date.now() - e } }, 200);
    } catch (w) {
      console.error("[Gemini JSON Error]", w);
    }
  const j = rr(i, a, o);
  if (await Ie(n, l, c || "anon", j), j.narrative) {
    const w = { kind: "summary", mode: a, viewType: "narrative", narrative: j.narrative };
    await Ie(n, h, c || "anon", w);
  }
  return t.json({ ok: true, data: j, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
ee.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
ee.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var vt = new qt();
var ur = Object.assign({ "/src/index.tsx": ee });
var Wt = false;
for (const [, t] of Object.entries(ur))
  t && (vt.route("/", t), vt.notFound(t.notFoundHandler), Wt = true);
if (!Wt)
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

// ../.wrangler/tmp/bundle-8nxqEk/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = vt;

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

// ../.wrangler/tmp/bundle-8nxqEk/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.8656569824171503.mjs.map
