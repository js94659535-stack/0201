var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-4E8Sfs/checked-fetch.js
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

// ../.wrangler/tmp/bundle-4E8Sfs/strip-cf-connecting-ip-header.js
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
var Qt = Object.defineProperty;
var st = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "st");
var Zt = /* @__PURE__ */ __name((t, e, r) => e in t ? Qt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Zt");
var E = /* @__PURE__ */ __name((t, e, r) => Zt(t, typeof e != "symbol" ? e + "" : e, r), "E");
var We = /* @__PURE__ */ __name((t, e, r) => e.has(t) || st("Cannot " + r), "We");
var d = /* @__PURE__ */ __name((t, e, r) => (We(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "d");
var _ = /* @__PURE__ */ __name((t, e, r) => e.has(t) ? st("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "_");
var S = /* @__PURE__ */ __name((t, e, r, n) => (We(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "S");
var R = /* @__PURE__ */ __name((t, e, r) => (We(t, e, "access private method"), r), "R");
var it = /* @__PURE__ */ __name((t, e, r, n) => ({ set _(s) {
  S(t, e, s, r);
}, get _() {
  return d(t, e, n);
} }), "it");
var at = /* @__PURE__ */ __name((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let c, l = false, u;
    if (t[o] ? (u = t[o][0][0], n.req.routeIndex = o) : u = o === t.length && s || void 0, u)
      try {
        c = await u(n, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && e)
          n.error = h, c = await e(h, n), l = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || l) && (n.res = c), n;
  }
  __name(a, "a");
}, "at");
var er = Symbol();
var tr = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof Ct ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? rr(t, { all: r, dot: n }) : {};
}, "tr");
async function rr(t, e) {
  const r = await t.formData();
  return r ? nr(r, e) : {};
}
__name(rr, "rr");
function nr(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? sr(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (ir(r, n, s), delete r[n]);
  }), r;
}
__name(nr, "nr");
var sr = /* @__PURE__ */ __name((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "sr");
var ir = /* @__PURE__ */ __name((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "ir");
var At = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "At");
var ar = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: r } = or(t), n = At(r);
  return cr(n, e);
}, "ar");
var or = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "or");
var cr = /* @__PURE__ */ __name((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "cr");
var Le = {};
var lr = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return Le[n] || (r[2] ? Le[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Le[n] = [t, r[1], true]), Le[n];
  }
  return null;
}, "lr");
var rt = /* @__PURE__ */ __name((t, e) => {
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
}, "rt");
var dr = /* @__PURE__ */ __name((t) => rt(t, decodeURI), "dr");
var Ot = /* @__PURE__ */ __name((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return dr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "Ot");
var ur = /* @__PURE__ */ __name((t) => {
  const e = Ot(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "ur");
var ge = /* @__PURE__ */ __name((t, e, ...r) => (r.length && (e = ge(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ge");
var _t = /* @__PURE__ */ __name((t) => {
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
}, "_t");
var Qe = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? rt(t, Nt) : t) : t, "Qe");
var Tt = /* @__PURE__ */ __name((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const c = a + e.length + 2, l = t.indexOf("&", c);
        return Qe(t.slice(c, l === -1 ? void 0 : l));
      } else if (o == 38 || isNaN(o))
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
    let o = t.indexOf("=", i);
    o > a && a !== -1 && (o = -1);
    let c = t.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (c = Qe(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), n && (l = Qe(l))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return e ? s[e] : s;
}, "Tt");
var hr = Tt;
var pr = /* @__PURE__ */ __name((t, e) => Tt(t, e, true), "pr");
var Nt = decodeURIComponent;
var ot = /* @__PURE__ */ __name((t) => rt(t, Nt), "ot");
var we;
var K;
var ee;
var Rt;
var kt;
var tt;
var te;
var bt;
var Ct = (bt = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", r = [[]]) {
    _(this, ee);
    E(this, "raw");
    _(this, we);
    _(this, K);
    E(this, "routeIndex", 0);
    E(this, "path");
    E(this, "bodyCache", {});
    _(this, te, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, S(this, K, r), S(this, we, {});
  }
  param(t) {
    return t ? R(this, ee, Rt).call(this, t) : R(this, ee, kt).call(this);
  }
  query(t) {
    return hr(this.url, t);
  }
  queries(t) {
    return pr(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await tr(this, t));
  }
  json() {
    return d(this, te).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, te).call(this, "text");
  }
  arrayBuffer() {
    return d(this, te).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, te).call(this, "blob");
  }
  formData() {
    return d(this, te).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, we)[t] = e;
  }
  valid(t) {
    return d(this, we)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [er]() {
    return d(this, K);
  }
  get matchedRoutes() {
    return d(this, K)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, K)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "bt"), we = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), Rt = /* @__PURE__ */ __name(function(t) {
  const e = d(this, K)[0][this.routeIndex][1][t], r = R(this, ee, tt).call(this, e);
  return r && /\%/.test(r) ? ot(r) : r;
}, "Rt"), kt = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(d(this, K)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = R(this, ee, tt).call(this, d(this, K)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? ot(n) : n);
  }
  return t;
}, "kt"), tt = /* @__PURE__ */ __name(function(t) {
  return d(this, K)[1] ? d(this, K)[1][t] : t;
}, "tt"), te = /* @__PURE__ */ new WeakMap(), bt);
var fr = { Stringify: 1 };
var jt = /* @__PURE__ */ __name(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((c) => jt(c, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "jt");
var mr = "text/plain; charset=UTF-8";
var Ze = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "Ze");
var ke;
var je;
var X;
var ve;
var W;
var q;
var Me;
var ye;
var Se;
var le;
var Ie;
var $e;
var re;
var xe;
var wt;
var gr = (wt = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    _(this, re);
    _(this, ke);
    _(this, je);
    E(this, "env", {});
    _(this, X);
    E(this, "finalized", false);
    E(this, "error");
    _(this, ve);
    _(this, W);
    _(this, q);
    _(this, Me);
    _(this, ye);
    _(this, Se);
    _(this, le);
    _(this, Ie);
    _(this, $e);
    E(this, "render", (...t2) => (d(this, ye) ?? S(this, ye, (e2) => this.html(e2)), d(this, ye).call(this, ...t2)));
    E(this, "setLayout", (t2) => S(this, Me, t2));
    E(this, "getLayout", () => d(this, Me));
    E(this, "setRenderer", (t2) => {
      S(this, ye, t2);
    });
    E(this, "header", (t2, e2, r) => {
      this.finalized && S(this, q, new Response(d(this, q).body, d(this, q)));
      const n = d(this, q) ? d(this, q).headers : d(this, le) ?? S(this, le, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    E(this, "status", (t2) => {
      S(this, ve, t2);
    });
    E(this, "set", (t2, e2) => {
      d(this, X) ?? S(this, X, /* @__PURE__ */ new Map()), d(this, X).set(t2, e2);
    });
    E(this, "get", (t2) => d(this, X) ? d(this, X).get(t2) : void 0);
    E(this, "newResponse", (...t2) => R(this, re, xe).call(this, ...t2));
    E(this, "body", (t2, e2, r) => R(this, re, xe).call(this, t2, e2, r));
    E(this, "text", (t2, e2, r) => !d(this, le) && !d(this, ve) && !e2 && !r && !this.finalized ? new Response(t2) : R(this, re, xe).call(this, t2, e2, Ze(mr, r)));
    E(this, "json", (t2, e2, r) => R(this, re, xe).call(this, JSON.stringify(t2), e2, Ze("application/json", r)));
    E(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name((s) => R(this, re, xe).call(this, s, e2, Ze("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? jt(t2, fr.Stringify, false, {}).then(n) : n(t2);
    });
    E(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    E(this, "notFound", () => (d(this, Se) ?? S(this, Se, () => new Response()), d(this, Se).call(this, this)));
    S(this, ke, t), e && (S(this, W, e.executionCtx), this.env = e.env, S(this, Se, e.notFoundHandler), S(this, $e, e.path), S(this, Ie, e.matchResult));
  }
  get req() {
    return d(this, je) ?? S(this, je, new Ct(d(this, ke), d(this, $e), d(this, Ie))), d(this, je);
  }
  get event() {
    if (d(this, W) && "respondWith" in d(this, W))
      return d(this, W);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, W))
      return d(this, W);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, q) || S(this, q, new Response(null, { headers: d(this, le) ?? S(this, le, new Headers()) }));
  }
  set res(t) {
    if (d(this, q) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of d(this, q).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = d(this, q).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    S(this, q, t), this.finalized = true;
  }
  get var() {
    return d(this, X) ? Object.fromEntries(d(this, X)) : {};
  }
}, "wt"), ke = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet(), xe = /* @__PURE__ */ __name(function(t, e, r) {
  const n = d(this, q) ? new Headers(d(this, q).headers) : d(this, le) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, o] of i)
      a.toLowerCase() === "set-cookie" ? n.append(a, o) : n.set(a, o);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        n.set(i, a);
      else {
        n.delete(i);
        for (const o of a)
          n.append(i, o);
      }
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, ve);
  return new Response(t, { status: s, headers: n });
}, "xe"), wt);
var I = "ALL";
var xr = "all";
var br = ["get", "post", "put", "delete", "options", "patch"];
var Mt = "Can not add a route since the matcher is already built.";
var It = /* @__PURE__ */ __name(class extends Error {
}, "It");
var wr = "__COMPOSED_HANDLER";
var vr = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "vr");
var ct = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ct");
var z;
var $;
var $t;
var F;
var oe;
var qe;
var Ge;
var Ee;
var yr = (Ee = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    _(this, $);
    E(this, "get");
    E(this, "post");
    E(this, "put");
    E(this, "delete");
    E(this, "options");
    E(this, "patch");
    E(this, "all");
    E(this, "on");
    E(this, "use");
    E(this, "router");
    E(this, "getPath");
    E(this, "_basePath", "/");
    _(this, z, "/");
    E(this, "routes", []);
    _(this, F, vr);
    E(this, "errorHandler", ct);
    E(this, "onError", (e2) => (this.errorHandler = e2, this));
    E(this, "notFound", (e2) => (S(this, F, e2), this));
    E(this, "fetch", (e2, ...r) => R(this, $, Ge).call(this, e2, r[1], r[0], e2.method));
    E(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ge("/", e2)}`, r), n2, s2)));
    E(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(R(this, $, Ge).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...br, xr].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? S(this, z, a) : R(this, $, oe).call(this, i, d(this, z), a), o.forEach((c) => {
        R(this, $, oe).call(this, i, d(this, z), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        S(this, z, c);
        for (const l of [i].flat())
          o.map((u) => {
            R(this, $, oe).call(this, l.toUpperCase(), d(this, z), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? S(this, z, i) : (S(this, z, "*"), a.unshift(i)), a.forEach((o) => {
      R(this, $, oe).call(this, I, d(this, z), o);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? Ot : ur;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ct ? i = s.handler : (i = /* @__PURE__ */ __name(async (o, c) => (await at([], r.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[wr] = s.handler), R(a = n, $, oe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = R(this, $, $t).call(this);
    return r._basePath = ge(this._basePath, e), r;
  }
  mount(e, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((c) => c, "s") : s = n.replaceRequest));
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
      const c = ge(this._basePath, e), l = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(l) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (c, l) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return R(this, $, oe).call(this, I, ge(e, "*"), o), this;
  }
}, "Ee"), z = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), $t = /* @__PURE__ */ __name(function() {
  const e = new Ee({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, S(e, F, d(this, F)), e.routes = this.routes, e;
}, "$t"), F = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ __name(function(e, r, n) {
  e = e.toUpperCase(), r = ge(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "oe"), qe = /* @__PURE__ */ __name(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "qe"), Ge = /* @__PURE__ */ __name(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await R(this, $, Ge).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), o = new gr(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: d(this, F) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, F).call(this, o);
      });
    } catch (u) {
      return R(this, $, qe).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, F).call(this, o))).catch((u) => R(this, $, qe).call(this, u, o)) : l ?? d(this, F).call(this, o);
  }
  const c = at(a[0], this.errorHandler, d(this, F));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return R(this, $, qe).call(this, l, o);
    }
  })();
}, "Ge"), Ee);
var Pt = [];
function Sr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[I], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Pt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "n");
  return this.match = n, n(t, e);
}
__name(Sr, "Sr");
var Fe = "[^/]+";
var Ce = ".*";
var Re = "(?:|/.*)";
var be = Symbol();
var Er = new Set(".\\+*[^]$()");
function Ar(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Ce || t === Re ? 1 : e === Ce || e === Re ? -1 : t === Fe ? 1 : e === Fe ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Ar, "Ar");
var de;
var ue;
var B;
var fe;
var Or = (fe = /* @__PURE__ */ __name(class {
  constructor() {
    _(this, de);
    _(this, ue);
    _(this, B, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (d(this, de) !== void 0)
        throw be;
      if (i)
        return;
      S(this, de, r);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", Ce] : ["", "", Fe] : a === "/*" ? ["", "", Re] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Fe;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw be;
      if (l = d(this, B)[h], !l) {
        if (Object.keys(d(this, B)).some((m) => m !== Ce && m !== Re))
          throw be;
        if (i)
          return;
        l = d(this, B)[h] = new fe(), u !== "" && S(l, ue, s.varIndex++);
      }
      !i && u !== "" && n.push([u, d(l, ue)]);
    } else if (l = d(this, B)[a], !l) {
      if (Object.keys(d(this, B)).some((u) => u.length > 1 && u !== Ce && u !== Re))
        throw be;
      if (i)
        return;
      l = d(this, B)[a] = new fe();
    }
    l.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, B)).sort(Ar).map((n) => {
      const s = d(this, B)[n];
      return (typeof d(s, ue) == "number" ? `(${n})@${d(s, ue)}` : Er.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, de) == "number" && r.unshift(`#${d(this, de)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "fe"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), fe);
var Be;
var Pe;
var vt;
var _r = (vt = /* @__PURE__ */ __name(class {
  constructor() {
    _(this, Be, { varIndex: 0 });
    _(this, Pe, new Or());
  }
  insert(t, e, r) {
    const n = [], s = [];
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
    return d(this, Pe).insert(i, e, n, d(this, Be), r), n;
  }
  buildRegExp() {
    let t = d(this, Pe).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "vt"), Be = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), vt);
var Tr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ue = /* @__PURE__ */ Object.create(null);
function Dt(t) {
  return Ue[t] ?? (Ue[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Dt, "Dt");
function Nr() {
  Ue = /* @__PURE__ */ Object.create(null);
}
__name(Nr, "Nr");
function Cr(t) {
  var l;
  const e = new _r(), r = [];
  if (t.length === 0)
    return Tr;
  const n = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [m, w]) => u ? 1 : m ? -1 : h.length - w.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, m = n.length; u < m; u++) {
    const [w, A, T] = n[u];
    w ? s[A] = [T.map(([j]) => [j, /* @__PURE__ */ Object.create(null)]), Pt] : h++;
    let O;
    try {
      O = e.insert(A, h, w);
    } catch (j) {
      throw j === be ? new It(A) : j;
    }
    w || (r[h] = T.map(([j, N]) => {
      const M = /* @__PURE__ */ Object.create(null);
      for (N -= 1; N >= 0; N--) {
        const [U, y] = O[N];
        M[U] = y;
      }
      return [j, M];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let m = 0, w = r[u].length; m < w; m++) {
      const A = (l = r[u][m]) == null ? void 0 : l[1];
      if (!A)
        continue;
      const T = Object.keys(A);
      for (let O = 0, j = T.length; O < j; O++)
        A[T[O]] = o[A[T[O]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(Cr, "Cr");
function me(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (Dt(r).test(e))
        return [...t[r]];
  }
}
__name(me, "me");
var ne;
var se;
var Je;
var Lt;
var yt;
var Rr = (yt = /* @__PURE__ */ __name(class {
  constructor() {
    _(this, Je);
    E(this, "name", "RegExpRouter");
    _(this, ne);
    _(this, se);
    E(this, "match", Sr);
    S(this, ne, { [I]: /* @__PURE__ */ Object.create(null) }), S(this, se, { [I]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var o;
    const n = d(this, ne), s = d(this, se);
    if (!n || !s)
      throw new Error(Mt);
    n[t] || [n, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[I]).forEach((l) => {
        c[t][l] = [...c[I][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Dt(e);
      t === I ? Object.keys(n).forEach((l) => {
        var u;
        (u = n[l])[e] || (u[e] = me(n[l], e) || me(n[I], e) || []);
      }) : (o = n[t])[e] || (o[e] = me(n[t], e) || me(n[I], e) || []), Object.keys(n).forEach((l) => {
        (t === I || t === l) && Object.keys(n[l]).forEach((u) => {
          c.test(u) && n[l][u].push([r, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === I || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([r, i]));
      });
      return;
    }
    const a = _t(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var m;
        (t === I || t === h) && ((m = s[h])[u] || (m[u] = [...me(n[h], u) || me(n[I], u) || []]), s[h][u].push([r, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, se)).concat(Object.keys(d(this, ne))).forEach((e) => {
      t[e] || (t[e] = R(this, Je, Lt).call(this, e));
    }), S(this, ne, S(this, se, void 0)), Nr(), t;
  }
}, "yt"), ne = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let r = t === I;
  return [d(this, ne), d(this, se)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== I && e.push(...Object.keys(n[I]).map((i) => [i, n[I][i]]));
  }), r ? Cr(e) : null;
}, "Lt"), yt);
var ie;
var Q;
var St;
var kr = (St = /* @__PURE__ */ __name(class {
  constructor(t) {
    E(this, "name", "SmartRouter");
    _(this, ie, []);
    _(this, Q, []);
    S(this, ie, t.routers);
  }
  add(t, e, r) {
    if (!d(this, Q))
      throw new Error(Mt);
    d(this, Q).push([t, e, r]);
  }
  match(t, e) {
    if (!d(this, Q))
      throw new Error("Fatal error");
    const r = d(this, ie), n = d(this, Q), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let c = 0, l = n.length; c < l; c++)
          o.add(...n[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof It)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), S(this, ie, [o]), S(this, Q, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, Q) || d(this, ie).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ie)[0];
  }
}, "St"), ie = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), St);
var Te = /* @__PURE__ */ Object.create(null);
var ae;
var H;
var he;
var Ae;
var L;
var Z;
var ce;
var Oe;
var jr = (Oe = /* @__PURE__ */ __name(class {
  constructor(e, r, n) {
    _(this, Z);
    _(this, ae);
    _(this, H);
    _(this, he);
    _(this, Ae, 0);
    _(this, L, Te);
    if (S(this, H, n || /* @__PURE__ */ Object.create(null)), S(this, ae, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, S(this, ae, [s]);
    }
    S(this, he, []);
  }
  insert(e, r, n) {
    S(this, Ae, ++it(this, Ae)._);
    let s = this;
    const i = ar(r), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = lr(l, u), m = Array.isArray(h) ? h[0] : l;
      if (m in d(s, H)) {
        s = d(s, H)[m], h && a.push(h[1]);
        continue;
      }
      d(s, H)[m] = new Oe(), h && (d(s, he).push(h), a.push(h[1])), s = d(s, H)[m];
    }
    return d(s, ae).push({ [e]: { handler: n, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, Ae) } }), s;
  }
  search(e, r) {
    var c;
    const n = [];
    S(this, L, Te);
    let i = [this];
    const a = At(r), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], m = l === u - 1, w = [];
      for (let A = 0, T = i.length; A < T; A++) {
        const O = i[A], j = d(O, H)[h];
        j && (S(j, L, d(O, L)), m ? (d(j, H)["*"] && n.push(...R(this, Z, ce).call(this, d(j, H)["*"], e, d(O, L))), n.push(...R(this, Z, ce).call(this, j, e, d(O, L)))) : w.push(j));
        for (let N = 0, M = d(O, he).length; N < M; N++) {
          const U = d(O, he)[N], y = d(O, L) === Te ? {} : { ...d(O, L) };
          if (U === "*") {
            const v = d(O, H)["*"];
            v && (n.push(...R(this, Z, ce).call(this, v, e, d(O, L))), S(v, L, y), w.push(v));
            continue;
          }
          const [k, x, g] = U;
          if (!h && !(g instanceof RegExp))
            continue;
          const f = d(O, H)[k], b = a.slice(l).join("/");
          if (g instanceof RegExp) {
            const v = g.exec(b);
            if (v) {
              if (y[x] = v[0], n.push(...R(this, Z, ce).call(this, f, e, d(O, L), y)), Object.keys(d(f, H)).length) {
                S(f, L, y);
                const p = ((c = v[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (g === true || g.test(h)) && (y[x] = h, m ? (n.push(...R(this, Z, ce).call(this, f, e, y, d(O, L))), d(f, H)["*"] && n.push(...R(this, Z, ce).call(this, d(f, H)["*"], e, y, d(O, L)))) : (S(f, L, y), w.push(f)));
        }
      }
      i = w.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((l, u) => l.score - u.score), [n.map(({ handler: l, params: u }) => [l, u])];
  }
}, "Oe"), ae = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), ce = /* @__PURE__ */ __name(function(e, r, n, s) {
  const i = [];
  for (let a = 0, o = d(e, ae).length; a < o; a++) {
    const c = d(e, ae)[a], l = c[r] || c[I], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), n !== Te || s && s !== Te))
      for (let h = 0, m = l.possibleKeys.length; h < m; h++) {
        const w = l.possibleKeys[h], A = u[l.score];
        l.params[w] = s != null && s[w] && !A ? s[w] : n[w] ?? (s == null ? void 0 : s[w]), u[l.score] = true;
      }
  }
  return i;
}, "ce"), Oe);
var pe;
var Et;
var Mr = (Et = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, "name", "TrieRouter");
    _(this, pe);
    S(this, pe, new jr());
  }
  add(t, e, r) {
    const n = _t(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        d(this, pe).insert(t, n[s], r);
      return;
    }
    d(this, pe).insert(t, e, r);
  }
  match(t, e) {
    return d(this, pe).search(t, e);
  }
}, "Et"), pe = /* @__PURE__ */ new WeakMap(), Et);
var Ht = /* @__PURE__ */ __name(class extends yr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new kr({ routers: [new Rr(), new Mr()] });
  }
}, "Ht");
var Ir = /* @__PURE__ */ __name((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, m) {
      a.res.headers.set(h, m);
    }
    __name(c, "c");
    const l = await n(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let m = r.allowHeaders;
      if (!(m != null && m.length)) {
        const w = a.req.header("Access-Control-Request-Headers");
        w && (m = w.split(/\s*,\s*/));
      }
      return m != null && m.length && (c("Access-Control-Allow-Headers", m.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Ir");
var $r = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var lt = /* @__PURE__ */ __name((t, e = Dr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "lt");
var Pr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Dr = Pr;
var Lr = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Lr");
var qt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Hr = Object.keys(qt);
var qr = "index.html";
var Gr = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? Lr;
  return async (s, i) => {
    var u, h, m, w;
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
    let o = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(o) && (o = n(o, qr));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const A = t.mimes && lt(o, t.mimes) || lt(o);
      if (s.header("Content-Type", A || "application/octet-stream"), t.precompressed && (!A || $r.test(A))) {
        const T = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((O) => O.trim()));
        for (const O of Hr) {
          if (!T.has(O))
            continue;
          const j = await c(o + qt[O], s);
          if (j) {
            l = j, s.header("Content-Encoding", O), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((m = t.onFound) == null ? void 0 : m.call(t, o, s)), s.body(l);
    }
    await ((w = t.onNotFound) == null ? void 0 : w.call(t, o, s)), await i();
  };
}, "Gr");
var Ur = /* @__PURE__ */ __name(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Ur");
var Kr = /* @__PURE__ */ __name((t) => async function(r, n) {
  return Gr({ ...t, getContent: async (i) => Ur(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Kr");
var zr = /* @__PURE__ */ __name((t) => Kr(t), "zr");
var J = new Ht();
var Ke = /* @__PURE__ */ new Map();
var Fr = 1e3 * 60 * 60 * 24 * 7;
var et = false;
function Gt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Gt, "Gt");
function D(t) {
  return t == null ? "" : String(t);
}
__name(D, "D");
function ze(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(ze, "ze");
function Br(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(Br, "Br");
function nt(t) {
  return Br(t).length;
}
__name(nt, "nt");
function Jr(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Jr, "Jr");
function Ut(t) {
  const e = D(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Ut, "Ut");
function Kt(t) {
  const e = D(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Kt, "Kt");
function Yr(t) {
  const e = D(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Yr, "Yr");
function zt(t) {
  let e = D(t).replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  e = e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g, '"').replace(/[\u2018\u2019\u2032]/g, "'");
  const r = [];
  let n = "", s = null, i = 0;
  const a = /* @__PURE__ */ __name(() => {
    const o = n.trim();
    o && r.push(o), n = "";
  }, "a");
  for (let o = 0; o < e.length; o++) {
    const c = e[o], l = e[o + 1] || "", u = e[o + 2] || "";
    if (c === "(" && i++, c === ")" && (i = Math.max(0, i - 1)), (c === '"' || c === "'") && s === null ? s = c : s && c === s && (s = null), n += c, s === null && i === 0 && /[.!?]/.test(c)) {
      l === " " && (a(), o++);
      continue;
    }
    if (s === null && i === 0 && l === " ") {
      const m = n.trimEnd().slice(-1), w = /[가-힣A-Za-z0-9"'(\[]/.test(u);
      (m === "\uB2E4" || m === "\uC694" || m === "\uC8E0") && w && (a(), o++);
    }
  }
  return a(), r.length ? r : [e];
}
__name(zt, "zt");
var Ye = { narrative: { brief: 4, standard: 6, detail: 9 }, structured: { brief: 3, standard: 5, detail: 8 }, mindmap: { brief: 4, standard: 6, detail: 10 }, selftest: { brief: 3, standard: 5, detail: 8 } };
function Vr(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "brief" || e === "standard" || e === "detail" ? e : e === "simple" ? "brief" : "standard";
}
__name(Vr, "Vr");
function Xr(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" ? "mindmap" : "narrative";
}
__name(Xr, "Xr");
function Wr(t) {
  const e = String(t || "").trim(), r = e.indexOf("{"), n = e.lastIndexOf("}");
  return r >= 0 && n > r ? e.slice(r, n + 1) : e;
}
__name(Wr, "Wr");
function dt(t) {
  const e = Wr(t);
  try {
    return JSON.parse(e);
  } catch {
  }
  const r = e.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/\u0000/g, "");
  try {
    return JSON.parse(r);
  } catch {
  }
  return null;
}
__name(dt, "dt");
function Qr(t) {
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 '\uD559\uC2B5 \uB2E8\uC704' \uAE30\uC900\uC73C\uB85C \uB0B4\uC6A9\uC744 \uAD6C\uC870\uD654\uD558\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0(\uCD94\uCE21/\uACFC\uC7A5 \uAE08\uC9C0)", "- \uBB38\uC790 \uB2E8\uC21C \uC790\uB974\uAE30 \uAE08\uC9C0, \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uBA38\uB9AC\uB9D0/\uAF2C\uB9AC\uB9D0/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654\uC758 \uBF08\uB300(\uBC18\uB4DC\uC2DC \uD3EC\uD568):", "- anchor: \uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5", "- sections: \uD559\uC2B5 \uB2E8\uC704 \uC870\uBAA9\uD654, \uAC01 section\uC740 keywords/lvl25/explain \uD3EC\uD568", "- glossary: term/def\uB85C \uAD6C\uC131", "- links: anchor(A0) -> section \uC5F0\uACB0", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "anchor": "\uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5",', '  "hierarchy": { "big": "\uB300\uB2E8\uC6D0", "mid": "\uC911\uB2E8\uC6D0", "small": "\uC18C\uB2E8\uC6D0", "subtitles": ["\uC18C\uC81C\uBAA9"] },', '  "sections": [', '    { "id": "S1", "title": "\uC139\uC158 \uC81C\uBAA9", "keywords": ["\uD575\uC2EC\uC5B4"], "lvl25": ["\uC758\uBBF8\uD0A4\uC6CC\uB4DC"], "explain": "1~3\uBB38\uC7A5 \uC124\uBA85" }', "  ],", '  "glossary": [ { "term": "\uC6A9\uC5B4", "def": "\uC815\uC758" } ],', '  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${nt(t)}\uC790):`, t].join(`
`);
}
__name(Qr, "Qr");
function Zr(t, e) {
  const r = nt(t), n = (e == null ? void 0 : e.anchor) || "", s = ((e == null ? void 0 : e.sections) || []).map((i) => i.title).slice(0, 10);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 \uC2DC\uD5D8/\uC774\uD574/\uAE30\uC5B5\uC744 \uC704\uD55C \uC11C\uC220\uD615 \uC694\uC57D \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", '- \uC544\uB798 "\uAD6C\uC870\uD654 \uBF08\uB300"\uB97C \uBC97\uC5B4\uB098\uC9C0 \uB9D0\uACE0, \uADF8 \uB0B4\uC6A9\uC744 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC5F0\uACB0\uD574 \uC11C\uC220\uD558\uC138\uC694.', "", "\uAD6C\uC870\uD654 \uBF08\uB300:", `- anchor: ${n}`, `- sections: ${JSON.stringify(s)}`, "", "\uC694\uAD6C:", "- summary\uB294 6~10\uBB38\uC7A5(\uC0C1\uC138)", "- keyPoints 4~7\uAC1C, examHints 2~4\uAC1C", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "title": "\uC694\uC57D \uC81C\uBAA9",', '  "summary": "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5 \uC694\uC57D(6~10\uBB38\uC7A5)",', '  "keyPoints": ["\uD575\uC2EC\uD3EC\uC778\uD2B8"],', '  "examHints": ["\uC2DC\uD5D8\uD3EC\uC778\uD2B8"]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${r}\uC790):`, t].join(`
`);
}
__name(Zr, "Zr");
function en(t) {
  const e = (t == null ? void 0 : t.anchor) || "", r = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 5) })), n = ((t == null ? void 0 : t.glossary) || []).slice(0, 20);
  return ["\uB2F9\uC2E0\uC740 \uD559\uC2B5\uC6A9 \uB9C8\uC778\uB4DC\uB9F5 JSON\uC744 \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uB178\uB4DC id \uC911\uBCF5/\uB204\uB77D \uAE08\uC9C0, edge \uCC38\uC870 \uC77C\uAD00", "- \uC544\uB798 \uAD6C\uC870\uD654 \uC815\uBCF4\uB97C \uADF8\uB300\uB85C \uBC14\uD0D5\uC73C\uB85C \uAD6C\uC131(\uC0C8 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(r)}`, `glossary: ${JSON.stringify(n)}`, "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "center": { "id": "C0", "label": "\uC911\uC2EC \uC8FC\uC81C", "type": "root", "note": "\uC9E7\uC740 \uC124\uBA85" },', '  "nodes": [', '    { "id": "S1", "label": "\uC139\uC158", "type": "section", "note": "\uC124\uBA85" },', '    { "id": "T1", "label": "\uC6A9\uC5B4", "type": "term", "note": "\uC815\uC758" }', "  ],", '  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]', "}"].join(`
`);
}
__name(en, "en");
function tn(t) {
  const e = (t == null ? void 0 : t.anchor) || "", r = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 6) })), n = ((t == null ? void 0 : t.glossary) || []).slice(0, 25);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uC6D0\uBB38/\uAD6C\uC870\uD654\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uAE08\uC9C0", "- \uBB38\uD56D id\uB294 q1, q2... \uACE0\uC720", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(r)}`, `glossary: ${JSON.stringify(n)}`, "", "\uC694\uAD6C(\uC0C1\uC138):", "- \uCD1D 8\uBB38\uD56D", "- type\uC740 reorder/blank/multiple_choice \uC11E\uAE30", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "questions": [', '    { "id": "q1", "type": "multiple_choice", "prompt": "\uC9C8\uBB38", "choices": ["a","b","c"], "answer": 1 },', '    { "id": "q2", "type": "blank", "prompt": "\uBE48\uCE78", "answer": "\uC815\uB2F5" },', '    { "id": "q3", "type": "reorder", "prompt": "\uC21C\uC11C", "choices": ["A","B","C"], "answer": [0,2,1] }', "  ]", "}"].join(`
`);
}
__name(tn, "tn");
function ut(t, e) {
  const r = Ye.structured[e], n = (t.sections || []).slice(0, r).map((c) => ({ ...c, keywords: (c.keywords || []).slice(0, e === "brief" ? 4 : 6), lvl25: (c.lvl25 || []).slice(0, e === "brief" ? 2 : 3), explain: String(c.explain || "").trim() })), s = e === "brief" ? 8 : e === "standard" ? 14 : 20, i = (t.glossary || []).slice(0, s), a = new Set(n.map((c) => c.id)), o = (t.links || []).filter((c) => c.from === "A0" && a.has(c.to));
  return { ...t, sections: n, glossary: i, links: o };
}
__name(ut, "ut");
function ht(t, e) {
  const r = Ye.mindmap[e], n = (t.nodes || []).slice(0, Math.max(0, r - 1)), s = /* @__PURE__ */ new Set(["C0", ...n.map((a) => a.id)]), i = (t.edges || []).filter((a) => s.has(a.from) && s.has(a.to));
  return { ...t, nodes: n, edges: i };
}
__name(ht, "ht");
function pt(t, e) {
  const r = Ye.selftest[e];
  return { questions: (t.questions || []).slice(0, r) };
}
__name(pt, "pt");
function ft(t, e) {
  const r = Ye.narrative[e], i = zt(t.summary || "").slice(0, r).join(" "), a = (t.keyPoints || []).slice(0, e === "brief" ? 3 : 4), o = (t.examHints || []).slice(0, e === "brief" ? 2 : 3);
  return { ...t, summary: i, keyPoints: a, examHints: o };
}
__name(ft, "ft");
async function He(t, e) {
  const r = /* @__PURE__ */ __name(async () => {
    const o = await Bt(t, e);
    return String(o || "");
  }, "r"), n = await r(), s = dt(n);
  if (s)
    return s;
  const i = await r(), a = dt(i);
  if (a)
    return a;
  throw new Error("MODEL_JSON_PARSE_FAILED");
}
__name(He, "He");
async function rn(t, e) {
  const r = await He(t, Qr(e));
  if (!(r != null && r.anchor) || !Array.isArray(r.sections))
    throw new Error("STRUCTURED_SCHEMA_INVALID");
  r.links = r.links || r.sections.map((u) => ({ from: "A0", to: u.id, rel: "covers" }));
  const n = await He(t, Zr(e, r));
  if (!(n != null && n.summary))
    throw new Error("NARRATIVE_SCHEMA_INVALID");
  const s = await He(t, en(r));
  if (!(s != null && s.center) || !Array.isArray(s.nodes) || !Array.isArray(s.edges))
    throw new Error("MINDMAP_SCHEMA_INVALID");
  s.center.id || (s.center.id = "C0");
  const i = await He(t, tn(r));
  if (!Array.isArray(i.questions))
    throw new Error("SELFTEST_SCHEMA_INVALID");
  const a = { detail: r, standard: ut(r, "standard"), brief: ut(r, "brief") }, o = { detail: n, standard: ft(n, "standard"), brief: ft(n, "brief") }, c = { detail: s, standard: ht(s, "standard"), brief: ht(s, "brief") }, l = { detail: i, standard: pt(i, "standard"), brief: pt(i, "brief") };
  return { structured: a, narrative: o, mindmap: c, selftest: l };
}
__name(rn, "rn");
function nn(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/([가-힣])\r?\n([가-힣])/g, "$1$2"), e = e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g, "$1$2"), e = e.replace(/\r/g, ""), e = e.replace(/\n{2,}/g, `
`), e = e.replace(/\n/g, " "), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/\s+([,.;:!?])/g, "$1"), e.trim();
}
__name(nn, "nn");
function sn(t) {
  return (t || []).filter((e) => {
    const r = (e || "").trim();
    return !(!r || r.length < 18 || !(/[.!?]$/.test(r) || /다\.$/.test(r) || /이다\.$/.test(r) || /하였다\.$/.test(r)) && r.length < 45);
  });
}
__name(sn, "sn");
var an = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
function mt(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !an.has(e));
}
__name(mt, "mt");
function on(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t)
    for (const s of mt(n))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((n, s) => {
    const i = mt(n);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = n.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: a * c };
  });
}
__name(on, "on");
function cn(t, e) {
  return on(t).slice().sort((s, i) => i.score - s.score).slice(0, ze(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(cn, "cn");
function ln(t) {
  let e = (t || "").trim();
  e = e.replace(/모\s+든/g, "\uBAA8\uB4E0"), e = e.replace(/기\s+회/g, "\uAE30\uD68C"), e = e.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), e = e.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), e = e.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), e = e.replace(/특정\s+공간\s+인/g, "\uD2B9\uC815 \uACF5\uAC04\uC778"), e = e.replace(/(\S+)\s+\1/g, "$1"), e = e.replace(/([가-힣])을\b/g, (i, a) => {
    const o = a.charCodeAt(0);
    return o >= 44032 && o <= 55203 ? (o - 44032) % 28 !== 0 ? a + "\uC744" : a + "\uB97C" : i;
  });
  const r = e.split(new RegExp("(?<=\uB2E4\\.)\\s+")), n = /* @__PURE__ */ new Set(), s = [];
  for (const i of r) {
    const a = i.match(/^([^은는]+[은는])\s+(.+)/);
    if (a) {
      const o = a[1];
      if (n.has(o))
        continue;
      n.add(o);
    }
    s.push(i);
  }
  return e = s.join(" "), e = e.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), e = e.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), e = e.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), e = e.replace(/\s*\.\s*/g, ". "), e = e.replace(/\s*,\s*/g, ", "), e = e.replace(/\s*;\s*/g, "; "), e = e.replace(/[ ]{2,}/g, " "), e = e.replace(/\n{3,}/g, `

`), e.trim();
}
__name(ln, "ln");
function dn(t, e, r) {
  if (!Array.isArray(t) || t.length === 0)
    return { summary: "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", mindmap: { keywords: [], nodes: [], edges: [] }, meta: { ratio: 0, target: { min: 0, max: 0 } } };
  const n = Math.max(1, Number(r) || 1), s = e === "brief" ? { min: 10, max: 15 } : e === "detail" ? { min: 45, max: 55 } : { min: 25, max: 30 }, i = ["\uB610\uD55C", "\uC544\uC6B8\uB7EC", "\uB354\uBD88\uC5B4"], a = ["\uD55C\uD3B8", "\uC774\uC640 \uD568\uAED8", "\uC774\uC640 \uB354\uBD88\uC5B4", "\uB610 \uB2E4\uB978 \uCE21\uBA74\uC5D0\uC11C"], o = /* @__PURE__ */ __name((y) => {
    const k = String(y || "").trim().slice(0, 24);
    if (/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(k))
      return null;
    const x = k.match(/^(.{1,20}?(은|는|이|가))\s+/);
    return x ? x[1] : null;
  }, "o"), c = /* @__PURE__ */ __name((y) => {
    const k = String(y || "").trim();
    return k && (/[.!?…]$/.test(k) ? k : k + ".");
  }, "c"), l = /* @__PURE__ */ __name((y) => {
    let k = String(y || "").trim(), x = "";
    const g = k.match(/([.!?…])$/);
    return g && (x = g[1], k = k.slice(0, -1).trim()), k = k.replace(/합니다$/, "\uD55C\uB2E4").replace(/되었습니다$/, "\uB418\uC5C8\uB2E4").replace(/입니다$/, "\uC774\uB2E4").replace(/습니다$/, "\uB2E4"), (k + (x || ".")).trim();
  }, "l"), u = /* @__PURE__ */ __name((y) => /^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(y.trim()), "u"), h = /* @__PURE__ */ __name((y) => y.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/, "").trim(), "h");
  let m = t.map((y, k) => {
    const x = String(y || "").trim();
    if (!x)
      return "";
    if (k === 0) {
      const p = h(x);
      return l(c(p));
    }
    if (u(x))
      return l(c(x));
    const g = String(t[k - 1] || "").trim(), f = o(g), b = o(x), v = /* @__PURE__ */ __name((p) => p[k % p.length], "v");
    if (b && f && b === f) {
      const p = x.replace(/^(.{1,40}?(은|는|이|가))\s+/, "");
      return l(c(`${v(i)} ${p}`.trim()));
    } else
      return x.length > 15 ? l(c(`${v(a)} ${x}`.trim())) : l(c(x));
  }).filter(Boolean);
  const w = /* @__PURE__ */ __name((y) => String(y || "").replace(/\s+/g, "").length, "w");
  let A = m.join(" ");
  A = A.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g, " $2 ").replace(/\s{2,}/g, " ").trim();
  let T = w(A) / n * 100;
  for (; T > s.max && m.length > 1; )
    m.pop(), A = m.join(" "), T = w(A) / n * 100;
  T < s.min && console.warn(`[\uC820\uC2A4] \uC694\uC57D\uC728 ${T.toFixed(1)}%\uAC00 \uBAA9\uD45C \uCD5C\uC18C\uCE58 ${s.min}% \uBBF8\uB9CC\uC785\uB2C8\uB2E4.`);
  const j = m.join(" ").replace(/[0-9]/g, " ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ").split(/\s+/).map((y) => y.trim()).filter((y) => y.length >= 2 && y.length <= 6), N = /* @__PURE__ */ new Map();
  for (const y of j)
    N.set(y, (N.get(y) || 0) + 1);
  const M = [...N.entries()].sort((y, k) => k[1] - y[1]).slice(0, 12).map(([y]) => y), U = { keywords: M, nodes: M.map((y, k) => ({ id: `k${k}`, label: y })), edges: [] };
  return { summary: A, mindmap: U, meta: { ratio: T, target: s } };
}
__name(dn, "dn");
function un(t, e, r) {
  const n = nn(t);
  let s = zt(n);
  s = sn(s);
  const i = e === "brief" ? ze(Math.round(s.length * 0.15), 2, 4) : e === "standard" ? ze(Math.round(s.length * 0.3), 5, 9) : ze(Math.round(s.length * 0.55), 10, 18);
  let a = cn(s, i);
  if (e === "detail") {
    const l = ["\uC131\uBCC4", "\uD559\uB144", "\uB0A8\uD559\uC0DD", "\uC5EC\uD559\uC0DD", "\uCD08\uB4F1", "\uC911\uD559", "\uACE0\uD559\uB144", "\uC800\uD559\uB144", "\uBCC0\uC778", "\uCC28\uC774", "\uBE44\uAD50"], u = s.filter((h) => l.some((m) => h.includes(m)) && !a.includes(h)).slice(0, 5);
    u.length > 0 && (a = [...a, ...u]);
  }
  const o = nt(n);
  if (r === "narrative") {
    let l, u = null, h = null;
    {
      const m = dn(a, e, o);
      l = m.summary, u = m.mindmap, h = m.meta;
    }
    return l = ln(l), { kind: "summary", mode: e, viewType: r, narrative: l, ...u && { mindmapKeywords: u }, ...h && { meta: { ...h, inputNormalized: true, originalLen: o } } };
  }
  if (r === "structured")
    return { kind: "summary", mode: e, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((l, u) => `- (${u + 1}) ${l}`) } };
  if (r === "mindmap") {
    const l = (a[0] || s[0] || "\uD575\uC2EC").slice(0, 40), u = [{ id: "c", label: l, level: 0 }], h = [];
    return a.slice(1).forEach((m, w) => {
      const A = `n${w + 1}`;
      u.push({ id: A, label: m.slice(0, 60), level: 1 }), h.push({ from: "c", to: A });
    }), { kind: "summary", mode: e, viewType: r, mindmap: { center: l, nodes: u, edges: h } };
  }
  const c = a.map((l, u) => ({ id: `q${u + 1}`, type: "short", question: `(${u + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${l.slice(0, 70)}"`, answerHint: l }));
  return { kind: "summary", mode: e, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: c } };
}
__name(un, "un");
function Ft(t) {
  if (!t)
    return "empty";
  let e = 2166136261, r = 0;
  for (let i = 0; i < t.length; i++) {
    const a = t.charCodeAt(i);
    e ^= a, e += (e << 1) + (e << 4) + (e << 7) + (e << 8) + (e << 24), r = (r << 5) - r + a, r |= 0;
  }
  const n = (e >>> 0).toString(16), s = (Math.abs(r) >>> 0).toString(16);
  return `${t.length.toString(16)}_${n}_${s}`;
}
__name(Ft, "Ft");
function hn(t, e, r, n) {
  const s = Ft(r);
  return `${t}::${n || "anon"}::${e}::base::${s}`;
}
__name(hn, "hn");
function pn(t, e, r, n, s) {
  const i = Ft(n);
  return `${t}::${s || "anon"}::${e}::${r}::${i}`;
}
__name(pn, "pn");
async function fn(t) {
  if (!et) {
    if (!t) {
      et = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), et = true;
  }
}
__name(fn, "fn");
async function gt(t, e) {
  const r = Date.now(), n = Ke.get(e);
  if (n && r - n.createdAt < Fr)
    return { hit: true, data: n.data, store: "mem" };
  if (n && Ke.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return Ke.set(e, { data: i, createdAt: r }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(gt, "gt");
async function Ne(t, e, r, n) {
  const s = Date.now();
  Ke.set(e, { data: n, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, r, JSON.stringify(n), Gt()).run();
}
__name(Ne, "Ne");
function mn(t) {
  const e = t.split(/\n\n+/).filter((n) => n.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((n, s) => `- (${s + 1}) ${n}`) : t.split(/[\.。]\s+/).filter((n) => n.trim()).map((n, s) => `- (${s + 1}) ${n}.`) } };
}
__name(mn, "mn");
function gn(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), r = (e[0] || "\uD575\uC2EC").slice(0, 40), n = [{ id: "c", label: r, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    n.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: r, nodes: n, edges: s } };
}
__name(gn, "gn");
function xn(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((n) => n.trim()).map((n) => n.trim()).map((n, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${n.slice(0, 70)}"`, answerHint: n })) } };
}
__name(xn, "xn");
async function bn(t, e) {
  var c, l, u, h, m;
  const r = D(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = D(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const w = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (w.ok) {
      const T = await w.json();
      return { ok: true, text: ((m = (h = (u = (l = (c = T == null ? void 0 : T.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : m.text) ?? "", raw: T };
    }
    if (w.status === 429 || w.status === 503) {
      await new Promise((T) => setTimeout(T, o)), o *= 2;
      continue;
    }
    const A = await w.text().catch(() => "");
    throw new Error(`Gemini error ${w.status}: ${A.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(bn, "bn");
async function wn(t, e, r) {
  var l, u, h, m, w;
  const n = D(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const s = D(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: r }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const A = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (A.ok) {
      const O = await A.json();
      return ((w = (m = (h = (u = (l = O == null ? void 0 : O.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : m[0]) == null ? void 0 : w.text) ?? "";
    }
    if (A.status === 429 || A.status === 503) {
      await new Promise((O) => setTimeout(O, c)), c *= 2;
      continue;
    }
    const T = await A.text().catch(() => "");
    throw new Error(`Gemini error ${A.status}: ${T.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(wn, "wn");
async function Bt(t, e) {
  const r = await bn(t, e);
  return typeof r == "string" ? r : ((r == null ? void 0 : r.text) ?? "").toString();
}
__name(Bt, "Bt");
var vn = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, r = { brief: 6, standard: 10, detail: 14 }, n = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(x) {
    return (x || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  function a(x, g) {
    const b = Math.max(200, i(x || "").length), v = e[g] || e.standard, p = Math.floor(b * v.min), C = Math.ceil(b * v.max);
    return { base: b, min: Math.max(80, p), max: Math.max(120, C) };
  }
  __name(a, "a");
  function o(x) {
    const g = (x || "").trim();
    return g ? g.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((b) => b.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  function c(x) {
    return o(x).map((f, b) => ({ sid: `S${b + 1}`, text: f }));
  }
  __name(c, "c");
  function l(x, g, f) {
    const b = x.find((v) => v.sid === g);
    return !b || !f || typeof f != "string" ? false : b.text.includes(f.trim());
  }
  __name(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  function h({ originalText: x, mode: g, format: f }) {
    const b = a(x, g), v = Jr(x), p = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${g} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${b.min}\uC790 ~ \uCD5C\uB300 ${b.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", v].join(`
`);
  }
  __name(h, "h");
  function m({ summaryText: x, format: g }) {
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
}`, "", "[SUMMARY]", x].join(`
`);
  }
  __name(m, "m");
  function w({ mode: x, purpose: g, format: f, summaryText: b, sentTable: v, anchors: p }) {
    const C = r[x] || 10, G = g === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", Y = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uBB38\uD56D\uC218 ${C})`, `- \uBAA9\uC801: ${g} (${G})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${Y})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(v, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", b].join(`
`);
  }
  __name(w, "w");
  function A(x, g) {
    const f = g && g.anchors ? g.anchors : [], b = [], v = [];
    for (const p of f) {
      const C = p == null ? void 0 : p.sid, G = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        v.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(x, C, G)) {
        v.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      b.push(p);
    }
    return { ok: b, bad: v };
  }
  __name(A, "A");
  function T(x, g) {
    const f = g && Array.isArray(g.items) ? g.items : [], b = [], v = [];
    for (const p of f) {
      const C = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(C != null && C.sid) || !(C != null && C.quote)) {
        v.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(x, C.sid, C.quote)) {
        v.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        v.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      b.push(p);
    }
    return { ok: b, bad: v };
  }
  __name(T, "T");
  function O({ summaryText: x, sentTable: g, anchors: f, badItems: b, mode: v, purpose: p, format: C }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${b.length}`, `- \uBAA8\uB4DC: ${v}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${C}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(g, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(b, null, 2), "", "[SUMMARY]", x].join(`
`);
  }
  __name(O, "O");
  async function j({ llmCall: x, originalText: g, mode: f, format: b }) {
    if (!x)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), n.includes(b) || (b = "narrative");
    const v = h({ originalText: g, mode: f, format: b }), p = (await x({ system: u(), user: v, json: false }) || "").trim() || "", C = c(p), G = m({ summaryText: p, format: b });
    let Y = await x({ system: u(), user: G, json: true }), V;
    try {
      V = JSON.parse(Y);
    } catch {
      V = { anchors: [] };
    }
    const { ok: P } = A(C, V), De = P.length >= 4 ? P : N(C);
    return { summaryText: p, sentTable: C, anchors: De };
  }
  __name(j, "j");
  function N(x) {
    const g = [];
    for (let f = 0; f < Math.min(8, x.length); f++) {
      const b = x[f], v = (b.text || "").slice(0, 18);
      g.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: b.sid, quote: v, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return g;
  }
  __name(N, "N");
  async function M({ llmCall: x, mode: g, purpose: f, format: b, summaryText: v, sentTable: p, anchors: C }) {
    e[g] || (g = "standard"), s.includes(f) || (f = "preview"), n.includes(b) || (b = "narrative");
    const G = w({ mode: g, purpose: f, format: b, summaryText: v, sentTable: p, anchors: C });
    let Y = await x({ system: u(), user: G, json: true }), V;
    try {
      V = JSON.parse(Y);
    } catch {
      V = { items: [] };
    }
    let { ok: P, bad: De } = T(p, V);
    if (De.length > 0) {
      const _e = O({ summaryText: v, sentTable: p, anchors: C, badItems: De.map((Wt) => Wt.q), mode: g, purpose: f, format: b });
      let Yt = await x({ system: u(), user: _e, json: true }), Xe;
      try {
        Xe = JSON.parse(Yt);
      } catch {
        Xe = { items: [] };
      }
      const Vt = T(p, Xe);
      P = P.concat(Vt.ok);
      const Xt = r[g] || 10;
      P = P.slice(0, Xt);
    } else {
      const _e = r[g] || 10;
      P = P.slice(0, _e);
    }
    const Ve = r[g] || 10;
    if (P.length < Ve) {
      const _e = U({ sentTable: p, anchors: C, count: Ve - P.length, format: b, purpose: f });
      P = P.concat(_e).slice(0, Ve);
    }
    return { items: P };
  }
  __name(M, "M");
  function U({ sentTable: x, anchors: g, count: f, format: b, purpose: v }) {
    const p = [], C = g.slice(0, Math.max(f, 1));
    for (let G = 0; G < f; G++) {
      const Y = C[G % C.length], V = Y.sid, P = Y.quote;
      p.push({ id: `QF${G + 1}`, type: "short", question: v === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: V, quote: P }, anchorIds: [Y.id] });
    }
    return p;
  }
  __name(U, "U");
  class y {
    constructor(g, { passScore: f = 90 } = {}) {
      this.items = Array.isArray(g) ? g : [], this.passScore = f, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(g, f) {
      if (!g)
        return { ok: false, reason: "no item" };
      const b = g.type;
      if (b === "mcq" || b === "blank" || b === "match" || b === "order" || b === "label" || b === "short") {
        if (b === "short")
          return { ok: true, reason: "short-auto-pass" };
        const v = (g.answer || "").trim(), p = (f || "").trim();
        return { ok: p === v, reason: p === v ? "match" : "mismatch" };
      }
      return { ok: false, reason: "unknown type" };
    }
    getScore() {
      return this.items.length === 0 ? 0 : Math.round(this.state.correct / this.items.length * 100);
    }
    currentItem() {
      return this.items[this.state.idx] || null;
    }
    submit(g) {
      if (this.state.finished)
        return { done: true, message: "already finished" };
      const f = this.currentItem();
      if (this.gradeAnswer(f, g).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(f.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${f.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${f.evidence.quote}'`, score: this.getScore() };
      {
        const v = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: v, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const f = this.items.filter((b) => this.state.wrongIds.has(b.id));
          this.items = f.length > 0 ? f : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(y, "y");
  async function k({ llmCall: x, originalText: g, mode: f, format: b, purpose: v }) {
    const p = await j({ llmCall: x, originalText: g, mode: f, format: b }), C = await M({ llmCall: x, mode: f, purpose: v, format: b, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: b, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: v, passScore: 90, items: C.items } };
  }
  __name(k, "k");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: j, generateSelfTest: M, runPipeline: k, MasteryRunner: y };
})();
var yn = `/* MindStory Engine Bundle (compat) */
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
J.use("/api/*", Ir());
J.get("/static/ms-engine-bundle.js", (t) => t.text(yn, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
J.get("/favicon.ico", (t) => t.body(null, 204));
J.use("/static/*", zr({ root: "./public" }));
J.get("/", (t) => t.html(`<!DOCTYPE html>
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

  <!-- =======================================================
       MindStory Engine Scripts (ORDER MATTERS)
       \uC704\uCE58: </body> \uC9C1\uC804
  ======================================================= -->

  <!-- 0) \uBC88\uB4E4 (\uC774\uBBF8 \uB77C\uC6B0\uD2B8\uB85C \uC81C\uACF5\uB428 /static/ms-engine-bundle.js) -->
  <script src="/static/ms-engine-bundle.js"><\/script>

  <!-- 1) API \uD638\uCD9C \uB798\uD37C -->
  <script src="/static/engine-api-client.js"><\/script>

  <!-- 2) \uD30C\uC774\uD504\uB77C\uC778(\uCE90\uC2DC/\uC911\uBCF5\uBC29\uC9C0/\uC790\uB3D9 base \uC900\uBE44) -->
  <script src="/static/summary-pipeline.js"><\/script>

  <!-- 3) UI \uD0ED/\uB80C\uB354\uB9C1/\uC774\uBCA4\uD2B8 \uBC14\uC778\uB529 -->
  <script src="/static/result-ui.js"><\/script>

  <!-- 4) Health check (\uB3C5\uB9BD \uC720\uC9C0) -->
  <script>
    (function(){
      const healthDot = document.getElementById('healthDot');
      const healthText = document.getElementById('healthText');
      const healthMeta = document.getElementById('healthMeta');

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
    })();
  <\/script>
</body>
</html>`));
J.get("/api/health", (t) => {
  const e = !!D(t.env.GEMINI_API_KEY).trim(), r = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Gt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !r ? "gemini+fallback" : "local-only" });
});
J.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const n = D((r == null ? void 0 : r.text) || (r == null ? void 0 : r.originalText) || ""), s = Ut((r == null ? void 0 : r.mode) || "standard"), i = Kt((r == null ? void 0 : r.format) || (r == null ? void 0 : r.viewType) || "narrative"), a = D((r == null ? void 0 : r.purpose) || "preview").trim().toLowerCase();
  if (!n)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!D(t.env.GEMINI_API_KEY).trim(), c = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name(async ({ system: u, user: h, json: m }) => {
    if (m) {
      const w = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Bt(t.env, w);
    } else
      return (await wn(t.env, u, h) || "").toString();
  }, "l");
  try {
    const u = await vn.runPipeline({ llmCall: l, originalText: n, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
J.post("/api/engine", async (t) => {
  var O, j;
  const e = Date.now(), r = t.env.DB;
  await fn(r);
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Yr(n == null ? void 0 : n.kind), i = D((n == null ? void 0 : n.text) || ""), a = Ut((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), o = Kt((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), c = D(((O = n == null ? void 0 : n.options) == null ? void 0 : O.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = pn(s, a, o, i, c || null), u = await gt(r, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = hn(s, a, i, c || null), m = await gt(r, h);
  if (m.hit && ((j = m.data) != null && j.narrative)) {
    const N = m.data.narrative;
    let M;
    return o === "narrative" ? M = { kind: s, mode: a, viewType: o, narrative: N } : o === "structured" ? M = { kind: s, mode: a, ...mn(N) } : o === "mindmap" ? M = { kind: s, mode: a, ...gn(N) } : M = { kind: s, mode: a, ...xn(N) }, await Ne(r, l, c || "anon", M), t.json({ ok: true, data: M, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const w = !!D(t.env.GEMINI_API_KEY).trim(), A = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && w && !A)
    try {
      const N = await rn(t.env, i), M = Vr(a), U = Xr(o);
      let y;
      if (U === "structured")
        y = { kind: s, mode: a, viewType: o, ...N.structured[M] };
      else if (U === "mindmap")
        y = { kind: s, mode: a, viewType: o, ...N.mindmap[M] };
      else if (U === "selftest")
        y = { kind: s, mode: a, viewType: o, ...N.selftest[M] };
      else {
        const g = N.narrative[M];
        y = { kind: s, mode: a, viewType: o, title: g.title, narrative: g.summary, keyPoints: g.keyPoints, examHints: g.examHints };
      }
      const k = N.narrative[M], x = { kind: s, mode: a, viewType: "narrative", narrative: k.summary, allSummaries: { brief: N.narrative.brief.summary, standard: N.narrative.standard.summary, detail: N.narrative.detail.summary }, meta: { engine: "v4", hierarchy: "brief \u2282 standard \u2282 detail (server-downsample)", structuredFirst: true } };
      return await Ne(r, h, c || "anon", x), await Ne(r, l, c || "anon", y), t.json({ ok: true, data: y, meta: { cached: false, engine: "gemini-v4-structured-first", elapsedMs: Date.now() - e, hierarchy: "brief \u2282 standard \u2282 detail (guaranteed)" } }, 200);
    } catch (N) {
      console.error("[Gemini V4 Error]", N);
    }
  const T = un(i, a, o);
  if (await Ne(r, l, c || "anon", T), T.narrative) {
    const N = { kind: "summary", mode: a, viewType: "narrative", narrative: T.narrative };
    await Ne(r, h, c || "anon", N);
  }
  return t.json({ ok: true, data: T, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
J.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
J.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var xt = new Ht();
var Sn = Object.assign({ "/src/index.tsx": J });
var Jt = false;
for (const [, t] of Object.entries(Sn))
  t && (xt.route("/", t), xt.notFound(t.notFoundHandler), Jt = true);
if (!Jt)
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

// ../.wrangler/tmp/bundle-4E8Sfs/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = xt;

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

// ../.wrangler/tmp/bundle-4E8Sfs/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.3953302198686439.mjs.map
