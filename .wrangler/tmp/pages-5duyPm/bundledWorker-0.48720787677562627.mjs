var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-GSg92E/checked-fetch.js
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

// ../.wrangler/tmp/bundle-GSg92E/strip-cf-connecting-ip-header.js
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
var Bt = Object.defineProperty;
var at = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "at");
var Gt = /* @__PURE__ */ __name((t, e, r) => e in t ? Bt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Gt");
var w = /* @__PURE__ */ __name((t, e, r) => Gt(t, typeof e != "symbol" ? e + "" : e, r), "w");
var Ue = /* @__PURE__ */ __name((t, e, r) => e.has(t) || at("Cannot " + r), "Ue");
var h = /* @__PURE__ */ __name((t, e, r) => (Ue(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var S = /* @__PURE__ */ __name((t, e, r) => e.has(t) ? at("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "S");
var v = /* @__PURE__ */ __name((t, e, r, n) => (Ue(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "v");
var E = /* @__PURE__ */ __name((t, e, r) => (Ue(t, e, "access private method"), r), "E");
var ot = /* @__PURE__ */ __name((t, e, r, n) => ({ set _(s) {
  v(t, e, s, r);
}, get _() {
  return h(t, e, n);
} }), "ot");
var ct = /* @__PURE__ */ __name((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let c, o = false, u;
    if (t[l] ? (u = t[l][0][0], n.req.routeIndex = l) : u = l === t.length && s || void 0, u)
      try {
        c = await u(n, () => a(l + 1));
      } catch (d) {
        if (d instanceof Error && e)
          n.error = d, c = await e(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || o) && (n.res = c), n;
  }
  __name(a, "a");
}, "ct");
var zt = Symbol();
var Ut = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof Ct ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Wt(t, { all: r, dot: n }) : {};
}, "Ut");
async function Wt(t, e) {
  const r = await t.formData();
  return r ? Yt(r, e) : {};
}
__name(Wt, "Wt");
function Yt(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? Xt(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Qt(r, n, s), delete r[n]);
  }), r;
}
__name(Yt, "Yt");
var Xt = /* @__PURE__ */ __name((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Xt");
var Qt = /* @__PURE__ */ __name((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Qt");
var At = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "At");
var Zt = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: r } = er(t), n = At(r);
  return tr(n, e);
}, "Zt");
var er = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "er");
var tr = /* @__PURE__ */ __name((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "tr");
var Ne = {};
var rr = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return Ne[n] || (r[2] ? Ne[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Ne[n] = [t, r[1], true]), Ne[n];
  }
  return null;
}, "rr");
var et = /* @__PURE__ */ __name((t, e) => {
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
}, "et");
var nr = /* @__PURE__ */ __name((t) => et(t, decodeURI), "nr");
var $t = /* @__PURE__ */ __name((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return nr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "$t");
var sr = /* @__PURE__ */ __name((t) => {
  const e = $t(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "sr");
var he = /* @__PURE__ */ __name((t, e, ...r) => (r.length && (e = he(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "he");
var Ot = /* @__PURE__ */ __name((t) => {
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
}, "Ot");
var We = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? et(t, kt) : t) : t, "We");
var Tt = /* @__PURE__ */ __name((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const l = t.charCodeAt(a + e.length + 1);
      if (l === 61) {
        const c = a + e.length + 2, o = t.indexOf("&", c);
        return We(t.slice(c, o === -1 ? void 0 : o));
      } else if (l == 38 || isNaN(l))
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
    let l = t.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let c = t.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (n && (c = We(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = t.slice(l + 1, a === -1 ? void 0 : a), n && (o = We(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return e ? s[e] : s;
}, "Tt");
var ir = Tt;
var ar = /* @__PURE__ */ __name((t, e) => Tt(t, e, true), "ar");
var kt = decodeURIComponent;
var lt = /* @__PURE__ */ __name((t) => et(t, kt), "lt");
var ge;
var P;
var G;
var Rt;
var It;
var Qe;
var z;
var vt;
var Ct = (vt = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", r = [[]]) {
    S(this, G);
    w(this, "raw");
    S(this, ge);
    S(this, P);
    w(this, "routeIndex", 0);
    w(this, "path");
    w(this, "bodyCache", {});
    S(this, z, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, v(this, P, r), v(this, ge, {});
  }
  param(t) {
    return t ? E(this, G, Rt).call(this, t) : E(this, G, It).call(this);
  }
  query(t) {
    return ir(this.url, t);
  }
  queries(t) {
    return ar(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Ut(this, t));
  }
  json() {
    return h(this, z).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return h(this, z).call(this, "text");
  }
  arrayBuffer() {
    return h(this, z).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, z).call(this, "blob");
  }
  formData() {
    return h(this, z).call(this, "formData");
  }
  addValidatedData(t, e) {
    h(this, ge)[t] = e;
  }
  valid(t) {
    return h(this, ge)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [zt]() {
    return h(this, P);
  }
  get matchedRoutes() {
    return h(this, P)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, P)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "vt"), ge = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), Rt = /* @__PURE__ */ __name(function(t) {
  const e = h(this, P)[0][this.routeIndex][1][t], r = E(this, G, Qe).call(this, e);
  return r && /\%/.test(r) ? lt(r) : r;
}, "Rt"), It = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(h(this, P)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = E(this, G, Qe).call(this, h(this, P)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? lt(n) : n);
  }
  return t;
}, "It"), Qe = /* @__PURE__ */ __name(function(t) {
  return h(this, P)[1] ? h(this, P)[1][t] : t;
}, "Qe"), z = /* @__PURE__ */ new WeakMap(), vt);
var or = { Stringify: 1 };
var Mt = /* @__PURE__ */ __name(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((l) => l({ phase: e, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => Mt(c, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Mt");
var cr = "text/plain; charset=UTF-8";
var Ye = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "Ye");
var Ce;
var Re;
var K;
var xe;
var J;
var I;
var Ie;
var ye;
var ve;
var ne;
var Me;
var _e;
var U;
var de;
var wt;
var lr = (wt = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    S(this, U);
    S(this, Ce);
    S(this, Re);
    w(this, "env", {});
    S(this, K);
    w(this, "finalized", false);
    w(this, "error");
    S(this, xe);
    S(this, J);
    S(this, I);
    S(this, Ie);
    S(this, ye);
    S(this, ve);
    S(this, ne);
    S(this, Me);
    S(this, _e);
    w(this, "render", (...t2) => (h(this, ye) ?? v(this, ye, (e2) => this.html(e2)), h(this, ye).call(this, ...t2)));
    w(this, "setLayout", (t2) => v(this, Ie, t2));
    w(this, "getLayout", () => h(this, Ie));
    w(this, "setRenderer", (t2) => {
      v(this, ye, t2);
    });
    w(this, "header", (t2, e2, r) => {
      this.finalized && v(this, I, new Response(h(this, I).body, h(this, I)));
      const n = h(this, I) ? h(this, I).headers : h(this, ne) ?? v(this, ne, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    w(this, "status", (t2) => {
      v(this, xe, t2);
    });
    w(this, "set", (t2, e2) => {
      h(this, K) ?? v(this, K, /* @__PURE__ */ new Map()), h(this, K).set(t2, e2);
    });
    w(this, "get", (t2) => h(this, K) ? h(this, K).get(t2) : void 0);
    w(this, "newResponse", (...t2) => E(this, U, de).call(this, ...t2));
    w(this, "body", (t2, e2, r) => E(this, U, de).call(this, t2, e2, r));
    w(this, "text", (t2, e2, r) => !h(this, ne) && !h(this, xe) && !e2 && !r && !this.finalized ? new Response(t2) : E(this, U, de).call(this, t2, e2, Ye(cr, r)));
    w(this, "json", (t2, e2, r) => E(this, U, de).call(this, JSON.stringify(t2), e2, Ye("application/json", r)));
    w(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name((s) => E(this, U, de).call(this, s, e2, Ye("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? Mt(t2, or.Stringify, false, {}).then(n) : n(t2);
    });
    w(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    w(this, "notFound", () => (h(this, ve) ?? v(this, ve, () => new Response()), h(this, ve).call(this, this)));
    v(this, Ce, t), e && (v(this, J, e.executionCtx), this.env = e.env, v(this, ve, e.notFoundHandler), v(this, _e, e.path), v(this, Me, e.matchResult));
  }
  get req() {
    return h(this, Re) ?? v(this, Re, new Ct(h(this, Ce), h(this, _e), h(this, Me))), h(this, Re);
  }
  get event() {
    if (h(this, J) && "respondWith" in h(this, J))
      return h(this, J);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, J))
      return h(this, J);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, I) || v(this, I, new Response(null, { headers: h(this, ne) ?? v(this, ne, new Headers()) }));
  }
  set res(t) {
    if (h(this, I) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of h(this, I).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = h(this, I).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    v(this, I, t), this.finalized = true;
  }
  get var() {
    return h(this, K) ? Object.fromEntries(h(this, K)) : {};
  }
}, "wt"), Ce = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), de = /* @__PURE__ */ __name(function(t, e, r) {
  const n = h(this, I) ? new Headers(h(this, I).headers) : h(this, ne) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, l] of i)
      a.toLowerCase() === "set-cookie" ? n.append(a, l) : n.set(a, l);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        n.set(i, a);
      else {
        n.delete(i);
        for (const l of a)
          n.append(i, l);
      }
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, xe);
  return new Response(t, { status: s, headers: n });
}, "de"), wt);
var $ = "ALL";
var ur = "all";
var hr = ["get", "post", "put", "delete", "options", "patch"];
var _t = "Can not add a route since the matcher is already built.";
var Pt = /* @__PURE__ */ __name(class extends Error {
}, "Pt");
var dr = "__COMPOSED_HANDLER";
var fr = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "fr");
var ut = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ut");
var N;
var O;
var Nt;
var D;
var te;
var De;
var He;
var we;
var pr = (we = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    S(this, O);
    w(this, "get");
    w(this, "post");
    w(this, "put");
    w(this, "delete");
    w(this, "options");
    w(this, "patch");
    w(this, "all");
    w(this, "on");
    w(this, "use");
    w(this, "router");
    w(this, "getPath");
    w(this, "_basePath", "/");
    S(this, N, "/");
    w(this, "routes", []);
    S(this, D, fr);
    w(this, "errorHandler", ut);
    w(this, "onError", (e2) => (this.errorHandler = e2, this));
    w(this, "notFound", (e2) => (v(this, D, e2), this));
    w(this, "fetch", (e2, ...r) => E(this, O, He).call(this, e2, r[1], r[0], e2.method));
    w(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${he("/", e2)}`, r), n2, s2)));
    w(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(E(this, O, He).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...hr, ur].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? v(this, N, a) : E(this, O, te).call(this, i, h(this, N), a), l.forEach((c) => {
        E(this, O, te).call(this, i, h(this, N), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        v(this, N, c);
        for (const o of [i].flat())
          l.map((u) => {
            E(this, O, te).call(this, o.toUpperCase(), h(this, N), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? v(this, N, i) : (v(this, N, "*"), a.unshift(i)), a.forEach((l) => {
      E(this, O, te).call(this, $, h(this, N), l);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? $t : sr;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ut ? i = s.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await ct([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[dr] = s.handler), E(a = n, O, te).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = E(this, O, Nt).call(this);
    return r._basePath = he(this._basePath, e), r;
  }
  mount(e, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((c) => c, "s") : s = n.replaceRequest));
    const a = i ? (c) => {
      const o = i(c);
      return Array.isArray(o) ? o : [o];
    } : (c) => {
      let o;
      try {
        o = c.executionCtx;
      } catch {
      }
      return [c.env, o];
    };
    s || (s = (() => {
      const c = he(this._basePath, e), o = c === "/" ? 0 : c.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (c, o) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await o();
    }, "l");
    return E(this, O, te).call(this, $, he(e, "*"), l), this;
  }
}, "we"), N = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakSet(), Nt = /* @__PURE__ */ __name(function() {
  const e = new we({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, v(e, D, h(this, D)), e.routes = this.routes, e;
}, "Nt"), D = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ __name(function(e, r, n) {
  e = e.toUpperCase(), r = he(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "te"), De = /* @__PURE__ */ __name(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "De"), He = /* @__PURE__ */ __name(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await E(this, O, He).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), l = new lr(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, D) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, D).call(this, l);
      });
    } catch (u) {
      return E(this, O, De).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, D).call(this, l))).catch((u) => E(this, O, De).call(this, u, l)) : o ?? h(this, D).call(this, l);
  }
  const c = ct(a[0], this.errorHandler, h(this, D));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return E(this, O, De).call(this, o, l);
    }
  })();
}, "He"), we);
var Dt = [];
function mr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[$], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], Dt];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(t, e);
}
__name(mr, "mr");
var Ve = "[^/]+";
var Ae = ".*";
var $e = "(?:|/.*)";
var fe = Symbol();
var gr = new Set(".\\+*[^]$()");
function xr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Ae || t === $e ? 1 : e === Ae || e === $e ? -1 : t === Ve ? 1 : e === Ve ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(xr, "xr");
var se;
var ie;
var H;
var ce;
var yr = (ce = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, se);
    S(this, ie);
    S(this, H, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (h(this, se) !== void 0)
        throw fe;
      if (i)
        return;
      v(this, se, r);
      return;
    }
    const [a, ...l] = e, c = a === "*" ? l.length === 0 ? ["", "", Ae] : ["", "", Ve] : a === "/*" ? ["", "", $e] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || Ve;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw fe;
      if (o = h(this, H)[d], !o) {
        if (Object.keys(h(this, H)).some((f) => f !== Ae && f !== $e))
          throw fe;
        if (i)
          return;
        o = h(this, H)[d] = new ce(), u !== "" && v(o, ie, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, ie)]);
    } else if (o = h(this, H)[a], !o) {
      if (Object.keys(h(this, H)).some((u) => u.length > 1 && u !== Ae && u !== $e))
        throw fe;
      if (i)
        return;
      o = h(this, H)[a] = new ce();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, H)).sort(xr).map((n) => {
      const s = h(this, H)[n];
      return (typeof h(s, ie) == "number" ? `(${n})@${h(s, ie)}` : gr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, se) == "number" && r.unshift(`#${h(this, se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ce"), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ce);
var Be;
var Pe;
var bt;
var vr = (bt = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, Be, { varIndex: 0 });
    S(this, Pe, new yr());
  }
  insert(t, e, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let l = false;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const o = `@\\${a}`;
        return s[a] = [o, c], a++, l = true, o;
      }), !l)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [l] = s[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(l) !== -1) {
          i[c] = i[c].replace(l, s[a][1]);
          break;
        }
    }
    return h(this, Pe).insert(i, e, n, h(this, Be), r), n;
  }
  buildRegExp() {
    let t = h(this, Pe).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "bt"), Be = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), bt);
var wr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Le = /* @__PURE__ */ Object.create(null);
function Ht(t) {
  return Le[t] ?? (Le[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Ht, "Ht");
function br() {
  Le = /* @__PURE__ */ Object.create(null);
}
__name(br, "br");
function Sr(t) {
  var o;
  const e = new vr(), r = [];
  if (t.length === 0)
    return wr;
  const n = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, x, b] = n[u];
    p ? s[x] = [b.map(([g]) => [g, /* @__PURE__ */ Object.create(null)]), Dt] : d++;
    let y;
    try {
      y = e.insert(x, d, p);
    } catch (g) {
      throw g === fe ? new Pt(x) : g;
    }
    p || (r[d] = b.map(([g, m]) => {
      const j = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [C, A] = y[m];
        j[C] = A;
      }
      return [g, j];
    }));
  }
  const [i, a, l] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const x = (o = r[u][f]) == null ? void 0 : o[1];
      if (!x)
        continue;
      const b = Object.keys(x);
      for (let y = 0, g = b.length; y < g; y++)
        x[b[y]] = l[x[b[y]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(Sr, "Sr");
function ue(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (Ht(r).test(e))
        return [...t[r]];
  }
}
__name(ue, "ue");
var W;
var Y;
var Ge;
var Lt;
var St;
var Er = (St = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, Ge);
    w(this, "name", "RegExpRouter");
    S(this, W);
    S(this, Y);
    w(this, "match", mr);
    v(this, W, { [$]: /* @__PURE__ */ Object.create(null) }), v(this, Y, { [$]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var l;
    const n = h(this, W), s = h(this, Y);
    if (!n || !s)
      throw new Error(_t);
    n[t] || [n, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[$]).forEach((o) => {
        c[t][o] = [...c[$][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Ht(e);
      t === $ ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[e] || (u[e] = ue(n[o], e) || ue(n[$], e) || []);
      }) : (l = n[t])[e] || (l[e] = ue(n[t], e) || ue(n[$], e) || []), Object.keys(n).forEach((o) => {
        (t === $ || t === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (t === $ || t === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Ot(e) || [e];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((d) => {
        var f;
        (t === $ || t === d) && ((f = s[d])[u] || (f[u] = [...ue(n[d], u) || ue(n[$], u) || []]), s[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Y)).concat(Object.keys(h(this, W))).forEach((e) => {
      t[e] || (t[e] = E(this, Ge, Lt).call(this, e));
    }), v(this, W, v(this, Y, void 0)), br(), t;
  }
}, "St"), W = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let r = t === $;
  return [h(this, W), h(this, Y)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== $ && e.push(...Object.keys(n[$]).map((i) => [i, n[$][i]]));
  }), r ? Sr(e) : null;
}, "Lt"), St);
var X;
var V;
var Et;
var jr = (Et = /* @__PURE__ */ __name(class {
  constructor(t) {
    w(this, "name", "SmartRouter");
    S(this, X, []);
    S(this, V, []);
    v(this, X, t.routers);
  }
  add(t, e, r) {
    if (!h(this, V))
      throw new Error(_t);
    h(this, V).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, V))
      throw new Error("Fatal error");
    const r = h(this, X), n = h(this, V), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(t, e);
      } catch (c) {
        if (c instanceof Pt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), v(this, X, [l]), v(this, V, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, V) || h(this, X).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, X)[0];
  }
}, "Et"), X = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Et);
var Ee = /* @__PURE__ */ Object.create(null);
var Q;
var k;
var ae;
var be;
var T;
var B;
var re;
var Se;
var Ar = (Se = /* @__PURE__ */ __name(class {
  constructor(e, r, n) {
    S(this, B);
    S(this, Q);
    S(this, k);
    S(this, ae);
    S(this, be, 0);
    S(this, T, Ee);
    if (v(this, k, n || /* @__PURE__ */ Object.create(null)), v(this, Q, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, v(this, Q, [s]);
    }
    v(this, ae, []);
  }
  insert(e, r, n) {
    v(this, be, ++ot(this, be)._);
    let s = this;
    const i = Zt(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = rr(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, k)) {
        s = h(s, k)[f], d && a.push(d[1]);
        continue;
      }
      h(s, k)[f] = new Se(), d && (h(s, ae).push(d), a.push(d[1])), s = h(s, k)[f];
    }
    return h(s, Q).push({ [e]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, be) } }), s;
  }
  search(e, r) {
    var c;
    const n = [];
    v(this, T, Ee);
    let i = [this];
    const a = At(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let x = 0, b = i.length; x < b; x++) {
        const y = i[x], g = h(y, k)[d];
        g && (v(g, T, h(y, T)), f ? (h(g, k)["*"] && n.push(...E(this, B, re).call(this, h(g, k)["*"], e, h(y, T))), n.push(...E(this, B, re).call(this, g, e, h(y, T)))) : p.push(g));
        for (let m = 0, j = h(y, ae).length; m < j; m++) {
          const C = h(y, ae)[m], A = h(y, T) === Ee ? {} : { ...h(y, T) };
          if (C === "*") {
            const L = h(y, k)["*"];
            L && (n.push(...E(this, B, re).call(this, L, e, h(y, T))), v(L, T, A), p.push(L));
            continue;
          }
          const [F, M, _] = C;
          if (!d && !(_ instanceof RegExp))
            continue;
          const R = h(y, k)[F], Z = a.slice(o).join("/");
          if (_ instanceof RegExp) {
            const L = _.exec(Z);
            if (L) {
              if (A[M] = L[0], n.push(...E(this, B, re).call(this, R, e, h(y, T), A)), Object.keys(h(R, k)).length) {
                v(R, T, A);
                const ee = ((c = L[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[ee] || (l[ee] = [])).push(R);
              }
              continue;
            }
          }
          (_ === true || _.test(d)) && (A[M] = d, f ? (n.push(...E(this, B, re).call(this, R, e, A, h(y, T))), h(R, k)["*"] && n.push(...E(this, B, re).call(this, h(R, k)["*"], e, A, h(y, T)))) : (v(R, T, A), p.push(R)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Se"), Q = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name(function(e, r, n, s) {
  const i = [];
  for (let a = 0, l = h(e, Q).length; a < l; a++) {
    const c = h(e, Q)[a], o = c[r] || c[$], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ee || s && s !== Ee))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], x = u[o.score];
        o.params[p] = s != null && s[p] && !x ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "re"), Se);
var oe;
var jt;
var $r = (jt = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, "name", "TrieRouter");
    S(this, oe);
    v(this, oe, new Ar());
  }
  add(t, e, r) {
    const n = Ot(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, oe).insert(t, n[s], r);
      return;
    }
    h(this, oe).insert(t, e, r);
  }
  match(t, e) {
    return h(this, oe).search(t, e);
  }
}, "jt"), oe = /* @__PURE__ */ new WeakMap(), jt);
var qt = /* @__PURE__ */ __name(class extends pr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new jr({ routers: [new Er(), new $r()] });
  }
}, "qt");
var Or = /* @__PURE__ */ __name((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function c(d, f) {
      a.res.headers.set(d, f);
    }
    __name(c, "c");
    const o = await n(a.req.header("origin") || "", a);
    if (o && c("Access-Control-Allow-Origin", o), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && c("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (c("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Or");
var Tr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ht = /* @__PURE__ */ __name((t, e = Cr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ht");
var kr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Cr = kr;
var Rr = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Rr");
var Ft = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Ir = Object.keys(Ft);
var Mr = "index.html";
var _r = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? Rr;
  return async (s, i) => {
    var u, d, f, p;
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
    let l = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(l) && (l = n(l, Mr));
    const c = t.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const x = t.mimes && ht(l, t.mimes) || ht(l);
      if (s.header("Content-Type", x || "application/octet-stream"), t.precompressed && (!x || Tr.test(x))) {
        const b = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((y) => y.trim()));
        for (const y of Ir) {
          if (!b.has(y))
            continue;
          const g = await c(l + Ft[y], s);
          if (g) {
            o = g, s.header("Content-Encoding", y), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, l, s)), s.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, l, s)), await i();
  };
}, "_r");
var Pr = /* @__PURE__ */ __name(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Pr");
var Nr = /* @__PURE__ */ __name((t) => async function(r, n) {
  return _r({ ...t, getContent: async (i) => Pr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Nr");
var Dr = /* @__PURE__ */ __name((t) => Nr(t), "Dr");
var Hr = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function je(t) {
  return t.replace(/\s+/g, "").length;
}
__name(je, "je");
function tt(t) {
  return t.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.")).map((e) => e.trim()).filter(Boolean);
}
__name(tt, "tt");
function Lr(t) {
  return t.match(/\d+\.?\d*%?/g) || [];
}
__name(Lr, "Lr");
function rt(t) {
  return Array.from(new Set(t.split(/\s+/).filter((e) => e.length >= 2 && !/^\d+$/.test(e)).slice(0, 10)));
}
__name(rt, "rt");
function qe(t, e) {
  const r = tt(t), n = Lr(t), s = rt(t), i = je(t), { min: a, max: l } = Hr[e], c = Math.floor(i * a), o = Math.floor(i * l), u = r[0] || "", d = u ? `${u.split("\uBA70")[0]}\uBA70, \uC774\uB294 \uC6D0\uBB38\uC758 \uD575\uC2EC \uD2B9\uC9D5\uC774\uC790 \uC8FC\uC694 \uC8FC\uC7A5\uC73C\uB85C \uBCFC \uC218 \uC788\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", f = [];
  if (n.length >= 2 && (f.push(`\uC8FC\uC694 \uC218\uCE58 \uC9C0\uD45C\uB97C \uC0B4\uD3B4\uBCF4\uBA74 ${n[0]}\uC640 ${n[1]}\uC774 \uC911\uC694\uD55C \uAE30\uC900\uC810\uC774 \uB41C\uB2E4`), n.length >= 3 && f.push(`\uB610\uD55C ${n[2]}\uB77C\uB294 \uC218\uCE58\uB3C4 \uD568\uAED8 \uACE0\uB824\uD574\uC57C \uD558\uBA70, \uC774\uB294 \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uD544\uC218\uC801\uC774\uB2E4`), n.length >= 4 && f.push(`\uBE44\uAD50 \uBD84\uC11D \uACB0\uACFC ${n[2]}\uC640 ${n[3]}\uC758 \uB300\uC870\uB97C \uD1B5\uD574 \uAD6C\uC870\uC801 \uCC28\uC774\uB97C \uD655\uC778\uD560 \uC218 \uC788\uB2E4`)), s.length >= 3 && f.length < 3 && f.push(`${s[0]}\uC640 ${s[1]}\uC758 ${s[2]} \uCE21\uBA74\uC5D0\uC11C \uBA85\uD655\uD55C \uCC28\uC774\uAC00 \uC874\uC7AC\uD558\uBA70, \uC774\uB294 \uADFC\uBCF8\uC801\uC778 \uC811\uADFC \uBC29\uC2DD\uC758 \uCC28\uC774\uB97C \uBC18\uC601\uD55C\uB2E4`), r.length >= 2 && f.length < 3) {
    const g = r[1].slice(0, 80);
    f.push(`${g}\uB294 \uC810\uC5D0\uC11C \uC911\uC694\uD55C \uADFC\uAC70\uAC00 \uB41C\uB2E4`);
  }
  for (; f.length < 3; )
    f.push(`${f.length + 1}\uCC28 \uBD84\uC11D: \uAD00\uB828 \uB9E5\uB77D\uACFC \uBC30\uACBD\uC744 \uC885\uD569\uC801\uC73C\uB85C \uAC80\uD1A0\uD55C \uACB0\uACFC \uCD94\uAC00\uC801\uC778 \uADFC\uAC70\uAC00 \uD655\uC778\uB41C\uB2E4`);
  const p = n.length >= 4 ? `\uAD6C\uCCB4\uC801\uC73C\uB85C ${n[0]}\uC640 ${n[2]}\uB97C \uBE44\uAD50\uD558\uBA74 \uC57D ${Math.abs(parseFloat(n[0]) - parseFloat(n[2])).toFixed(1)}\uBC30 \uC218\uC900\uC758 \uCC28\uC774\uAC00 \uB098\uD0C0\uB098\uBA70, \uC774\uB294 \uB450 \uB300\uC0C1 \uAC04\uC758 \uAD6C\uC870\uC801 \uACA9\uCC28\uB97C \uBA85\uD655\uD788 \uBCF4\uC5EC\uC900\uB2E4` : "\uBE44\uAD50 \uB300\uC0C1 \uAC04 \uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uD655\uC778\uB418\uBA70, \uD2B9\uD788 \uC811\uADFC \uBC29\uC2DD\uACFC \uC2E4\uD589 \uC804\uB7B5\uC5D0\uC11C \uB69C\uB837\uD55C \uB300\uC870\uB97C \uC774\uB8EC\uB2E4", x = s.some((g) => g.includes("\uAD50\uC721")) && s.some((g) => g.includes("\uBD80\uB2F4")) ? "\uC774\uB7EC\uD55C \uBD84\uC11D \uACB0\uACFC\uB294 \uAD50\uC721 \uC7AC\uC815 \uAD6C\uC870\uC640 \uC815\uCC45 \uBC29\uD5A5\uC758 \uBCF8\uC9C8\uC801 \uCC28\uC774\uB97C \uC2DC\uC0AC\uD558\uBA70, \uD5A5\uD6C4 \uAC1C\uC120 \uBC29\uD5A5\uC744 \uBAA8\uC0C9\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC2DC\uC0AC\uC810\uC744 \uC81C\uACF5\uD55C\uB2E4" : "\uC774\uC0C1\uC758 \uB0B4\uC6A9\uC744 \uC885\uD569\uD558\uBA74 \uAD6D\uAC00\uBCC4 \uC815\uCC45\uACFC \uC81C\uB3C4\uC758 \uCC28\uC774\uAC00 \uACB0\uACFC\uC5D0 \uBC18\uC601\uB41C \uAC83\uC73C\uB85C \uD574\uC11D\uB418\uBA70, \uC774\uB294 \uD5A5\uD6C4 \uC815\uCC45 \uC218\uB9BD \uC2DC \uCC38\uACE0\uD560 \uB9CC\uD55C \uC911\uC694\uD55C \uC0AC\uB840\uAC00 \uB41C\uB2E4";
  let b = "";
  if (e === "brief") {
    const g = u ? `${u.split("\uBA70")[0]}\uBA70 \uD575\uC2EC \uD2B9\uC9D5\uC774\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5", m = n.length >= 2 ? `${n[0]}\uC640 ${n[1]}\uC758 \uCC28\uC774\uAC00 \uC911\uC694\uD558\uB2E4` : "\uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uD655\uC778\uB41C\uB2E4";
    b = `${g}. ${m}.`;
  } else if (e === "standard")
    b = `${d}. ${f[0]}. \uBC18\uBA74 ${p}.`;
  else {
    const g = `${d}. ${f[0]}. ${f[1]}.`, m = `${p}. ${f[2]}.`, j = `${x}. \uC6D0\uBB38\uC758 \uD575\uC2EC \uB17C\uC810\uC740 ${s.slice(0, 3).join(", ")} \uB4F1\uC73C\uB85C \uC694\uC57D\uD560 \uC218 \uC788\uB2E4.`;
    b = [g, m, j].join(`

`);
  }
  const y = je(b);
  if (y > o) {
    const g = b.split(`

`);
    let m = g[0];
    for (let j = 1; j < g.length; j++) {
      const C = m + `

` + g[j];
      if (je(C) <= o)
        m = C;
      else
        break;
    }
    b = m;
  } else
    y < c && e !== "brief" && (b += ` \uC6D0\uBB38\uC758 \uC8FC\uC694 \uB17C\uC810\uC740 ${s.slice(0, 3).join(", ")} \uB4F1\uC774\uB2E4.`);
  return { type: "narrative", level: e, text: b, chars: je(b), ratio: je(b) / i, target: { min: c, max: o }, coreClaim: d, grounds: f, comparisons: [p], implications: [x] };
}
__name(qe, "qe");
function Fe(t, e) {
  const r = tt(t), n = rt(t), s = e === "brief" ? 3 : e === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...n];
  for (let c = 0; c < s && c < a.length; c++)
    i.push({ term: a[c], def: `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${a[c]}"\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uC124\uBA85\uD558\uB294 \uC6A9\uC5B4\uC774\uB2E4` });
  const l = [{ title: "1. \uAC1C\uC694", keywords: n.slice(0, 3), bullets: r.slice(0, e === "brief" ? 2 : e === "standard" ? 3 : 5), children: [] }];
  return { type: "structured", level: e, toc: [{ title: "\uAC1C\uC694", anchor: "sec-1" }], hierarchy: l, glossary: i };
}
__name(Fe, "Fe");
function Ke(t, e) {
  const r = tt(t), n = rt(t), s = e === "brief" ? 2 : e === "standard" ? 4 : 6;
  return { type: "mindmap", level: e, title: "\uD575\uC2EC \uAD6C\uC870", children: [{ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: r.slice(0, s).map((i, a) => ({ title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, children: [] })) }] };
}
__name(Ke, "Ke");
function Je(t, e, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = e === "brief" || e === "standard" ? 2 : 4;
  return { type: "selftest", level: e, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: t.split(".")[0] + "." })) };
}
__name(Je, "Je");
function Kt(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(Kt, "Kt");
function dt(t) {
  const e = (t || "").trim();
  if (!e)
    return null;
  try {
    return JSON.parse(e);
  } catch {
  }
  const r = e.indexOf("{"), n = e.lastIndexOf("}");
  if (r >= 0 && n > r) {
    const s = e.slice(r, n + 1);
    try {
      return JSON.parse(s);
    } catch {
    }
  }
  return null;
}
__name(dt, "dt");
function qr(t) {
  const e = qe(t, "detail"), r = Fe(t, "detail"), n = Ke(t, "detail"), s = Je(e.text, "detail", "exam"), i = t.length, a = Kt(t), l = e.coreClaim, c = e.grounds, o = e.comparisons || [], u = e.implications || [];
  let d = e.text;
  if (!d.includes(`

`)) {
    const g = d.split(". ").filter(Boolean), m = Math.ceil(g.length / 2);
    d = g.slice(0, m).join(". ") + `.

` + g.slice(m).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, x = r.glossary, b = { title: n.title, children: n.children.map((g) => ({ title: g.title, children: (g.children || []).map((m) => ({ title: m.title, pack: Array.isArray(m.pack) && m.pack.length >= 2 ? m.pack : [m.title, `${m.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: m.explain && m.explain.length >= 30 ? m.explain : `${m.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (b.children[0] || b.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); b.children[0].children.length < 3; ) {
    const g = b.children[0].children.length + 1;
    b.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${g}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${g}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const y = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: x }, mindmap: b, selftest: y };
}
__name(qr, "qr");
function ft(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(ft, "ft");
function Fr(t) {
  var i, a, l, c, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 3) && e.push("narrative.grounds must be >= 3"), (!((l = t == null ? void 0 : t.narrative) != null && l.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = t == null ? void 0 : t.structured) == null ? void 0 : c.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 3) && e.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const x of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(x.pack) && x.pack.length && n++, typeof x.explain == "string" && x.explain.trim().length > 30 && s++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(Fr, "Fr");
function Kr(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), n = (t.standard.narrative.text || "").replace(/\s+/g, ""), s = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), n.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === n && e.push("brief narrative equals standard narrative"), n === s && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((p) => {
    let x = 0;
    for (const b of (p == null ? void 0 : p.children) || [])
      x += ((b == null ? void 0 : b.children) || []).length;
    return x;
  }, "i"), a = i(t.brief.mindmap.tree), l = i(t.standard.mindmap.tree), c = i(t.detail.mindmap.tree);
  return a === l && l === c || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), e;
}
__name(Kr, "Kr");
async function pt(t, e) {
  var l, c, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(pt, "pt");
function Jr(t) {
  t.post("/api/matrix", async (e) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await e.req.json(), i = String(s.text || "").trim();
      if (!i)
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Kt(i), l = e.env.USE_MOCK === "true" || !e.env.GEMINI_API_KEY;
      let c = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), c = qr(i);
      else {
        const L = ft(i);
        let ee = await pt(e, L);
        if (c = dt(ee), !c) {
          const it = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", ft(i)].join(`
`);
          ee = await pt(e, it), c = dt(ee);
        }
        if (!c)
          return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Fr(c);
      if (o.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const u = qe(i, "brief"), d = qe(i, "standard"), f = qe(i, "detail"), p = Fe(i, "brief"), x = Fe(i, "standard"), b = Fe(i, "detail"), y = Ke(i, "brief"), g = Ke(i, "standard"), m = Ke(i, "detail"), j = Je(i, "brief", "preview"), C = Je(i, "standard", "preview"), A = Je(i, "detail", "preview"), F = { narrative: { text: u.text, coreClaim: u.coreClaim, grounds: u.grounds, comparisons: u.comparisons, implications: u.implications }, structured: p, mindmap: y, selftest: j }, M = { narrative: { text: d.text, coreClaim: d.coreClaim, grounds: d.grounds, comparisons: d.comparisons, implications: d.implications }, structured: x, mindmap: g, selftest: C }, _ = { narrative: { text: f.text, coreClaim: f.coreClaim, grounds: f.grounds, comparisons: f.comparisons, implications: f.implications }, structured: b, mindmap: m, selftest: A }, R = Kr({ brief: F, standard: M, detail: _ });
      if (R.length && l === false)
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: R.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const Z = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: F, standard: M, detail: _ }, views: { narrative: { brief: F.narrative, standard: M.narrative, detail: _.narrative }, structured: { brief: F.structured, standard: M.structured, detail: _.structured }, mindmap: { brief: F.mindmap, standard: M.mindmap, detail: _.mindmap }, selftest: { brief: F.selftest, standard: M.selftest, detail: _.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return e.json(Z, 200);
    } catch (s) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), t.post("/api/selftest/grade", async (e) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => cn), n = await e.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return e.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return e.json(a, 200);
    } catch (r) {
      return e.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  });
}
__name(Jr, "Jr");
var q = new qt();
q.use("/api/*", Or());
q.use("/static/*", Dr({ root: "./public" }));
Jr(q);
function Oe() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Oe, "Oe");
function nt(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let n = 0; n < e.length; n++)
    r ^= e.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(nt, "nt");
function Vr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Vr, "Vr");
function Br(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Br, "Br");
function Gr(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Gr, "Gr");
function zr(t, e) {
  const r = Math.max(60, me(t)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(zr, "zr");
function Ur(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Gr((t == null ? void 0 : t.viewType) || "narrative"), n = Br(t == null ? void 0 : t.level), s = "detail", { base: i, min: a, max: l } = zr(e), c = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${c}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
`), f = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
`.trim(), p = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: structured]
{
  "level": "detail",
  "viewType": "structured",
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
`.trim(), x = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: mindmap]
{
  "level": "detail",
  "viewType": "mindmap",
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
`.trim(), b = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: selftest]
{
  "level": "detail",
  "viewType": "selftest",
  "meta": { "grade": "${c}", "subject": "${o}", "passScore": 90, "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  let y = f;
  return r === "structured" ? y = p : r === "mindmap" ? y = x : r === "selftest" && (y = b), `${d}

${y}`;
}
__name(Ur, "Ur");
function le(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(le, "le");
function ze(t) {
  const e = le(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(ze, "ze");
function Wr(t) {
  const e = le(t).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Wr, "Wr");
function st(t) {
  const e = le(t).split(`
`), r = Wr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: le(t) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : e.length, o = i.title, u = e.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(st, "st");
function Yr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Yr, "Yr");
function pe(t, e) {
  const n = ze(t).map((i, a) => ({ s: i, i: a, score: Yr(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Vr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(pe, "pe");
function me(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(me, "me");
var Ze = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function mt(t, e, r) {
  const n = Math.max(60, me(t)), s = me(e), i = Math.floor(n * Ze[r].min), a = Math.ceil(n * Ze[r].max);
  return s < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(mt, "mt");
function Te(t, e, r) {
  const n = Math.max(60, me(t)), s = Math.ceil(n * Ze[r].max);
  let i = String(e || "").trim();
  if (me(i) <= s)
    return i;
  const a = ze(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (me(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Te, "Te");
function Xe(t, e) {
  return `${t}_${e}`;
}
__name(Xe, "Xe");
function Xr(t) {
  const e = st(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    const a = Xe("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = pe(s.body, 6), o = [];
    for (const m of c)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((C) => {
        const A = C.replace(/[()]/g, "").trim();
        A.length >= 2 && A.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(A) && o.push(A);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const d = Array.from(u.entries()).sort((m, j) => j[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = pe(s.body, 3).join(" "), p = pe(s.body, 2).join(" "), x = pe(s.body, 1).join(" "), b = { id: Xe(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: x, children: [] };
    d.forEach((m) => {
      n.has(m) || n.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${pe(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const g = ze(s.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    g.length && b.children.push({ id: Xe(a + "_adv", 1), title: g.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(b), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Xr, "Xr");
function Jt(t, e) {
  const r = JSON.parse(JSON.stringify(t)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (e === "brief" && (s.explain = s.explainBrief || s.explain), e === "standard" && (s.explain = s.explainStandard || s.explain), e === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = e !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Jt, "Jt");
function Qr(t, e, r, n) {
  const s = (e.children || []).map((u) => u.title), a = (Jt(e, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: Te(t, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Te(t, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(Qr, "Qr");
function Zr(t, e) {
  const r = st(t), n = e === "brief" ? 2 : e === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = e === "brief" || e === "standard" ? 1 : 2;
    s.push(...pe(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return Te(t, i, e);
}
__name(Zr, "Zr");
function en(t, e) {
  st(t);
  const r = ze(t), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(en, "en");
function tn(t, e) {
  let r = t.length, n = 0;
  const s = [];
  for (const a of t) {
    const l = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((x) => x.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((x) => {
      l.includes(x) && d++;
    });
    const f = d >= 2 || l.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(tn, "tn");
function gt(t) {
  const e = le(t), { tree: r, glossary: n } = Xr(e), s = { originalMeta: { textHash: nt(e), chars: e.length, ts: Oe() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Zr(e, i), l = Qr(e, r, n, i), c = Jt(r, i), o = en(e), d = mt(e, a, i).ok ? a : Te(e, a, i), f = l.renderText || "", p = mt(e, f, i);
    l.renderText = p.ok ? f : Te(e, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(gt, "gt");
q.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: Oe(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
q.post("/api/engine", async (t) => {
  var p, x, b, y, g, m, j;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), n = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", s = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), l = (e == null ? void 0 : e.useGemini) === true, c = le(r);
  if (c.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && t.env.GEMINI_API_KEY)
    try {
      const C = Ur({ text: c, viewType: s, level: "detail", grade: i, subject: a }), A = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", M = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${A}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: C }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), R = (((g = (y = (b = (x = (p = M == null ? void 0 : M.candidates) == null ? void 0 : p[0]) == null ? void 0 : x.content) == null ? void 0 : b.parts) == null ? void 0 : y[0]) == null ? void 0 : g.text) || "").match(/\{[\s\S]*\}/);
      if (R) {
        const Z = JSON.parse(R[0]);
        u = { originalMeta: { textHash: nt(c), chars: c.length, ts: Oe() }, modes: { detail: { [s]: Z }, standard: { [s]: Z }, brief: { [s]: Z } } }, o = "gemini-" + A;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (C) {
      console.error("[Gemini Error]", C), u = gt(c), o = "v5-local-fallback";
    }
  else
    u = gt(c);
  const d = (j = (m = u.modes) == null ? void 0 : m[n]) == null ? void 0 : j[s], f = { engine: o, mode: n, viewType: s, ts: Oe(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
q.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], n = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, s = tn(r, n);
  return t.json({ ok: true, result: s });
});
q.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = le(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Oe(), c = nt(s), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, l, l, c, s, o).run(), t.json({ ok: true, id: a, textHash: c, ts: l });
});
q.get("/api/loadSummary", async (t) => {
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
q.get("/", (t) => t.redirect("/static/v5.html"));
var xt = new qt();
var rn = Object.assign({ "/src/index.tsx": q });
var Vt = false;
for (const [, t] of Object.entries(rn))
  t && (xt.route("/", t), xt.notFound(t.notFoundHandler), Vt = true);
if (!Vt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function ke(t) {
  return (t || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(ke, "ke");
function yt(t, e) {
  const r = ke(t);
  return e.some((n) => r.includes(ke(n)));
}
__name(yt, "yt");
function nn(t, e) {
  const r = ke(t);
  return e.every((n) => r.includes(ke(n)));
}
__name(nn, "nn");
function sn(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(sn, "sn");
function an(t, e, r) {
  var x, b, y, g;
  const n = ke(e), s = 100;
  if (!n) {
    const m = r === 1 ? t.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? t.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, j = r >= 3 ? t.explanation || t.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: t.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: m, explanationToShow: j };
  }
  const i = ((x = t.rubric) == null ? void 0 : x.mustIncludeAny) || [], a = ((b = t.rubric) == null ? void 0 : b.mustIncludeAll) || [], l = ((y = t.rubric) == null ? void 0 : y.forbid) || [], c = (g = t.rubric) == null ? void 0 : g.maxChars;
  let o = 100, u = [];
  c && n.length > c && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${c}`)), l.length && yt(n, l) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !nn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !yt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = sn(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? t.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? t.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !d && r >= 3 ? t.explanation || t.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: t.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(an, "an");
function on(t, e) {
  const r = Math.max(1, Math.floor(e.attemptNo || 1)), n = t.questions.map((c) => {
    var u;
    const o = ((u = e.userAnswers) == null ? void 0 : u[c.id]) ?? "";
    return an(c, o, r);
  }), s = Math.round(n.reduce((c, o) => c + o.score, 0) / Math.max(1, n.length)), i = n.filter((c) => !c.correct).map((c) => c.id), a = s >= t.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(on, "on");
var cn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: on }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-GSg92E/middleware-insertion-facade.js
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

// ../.wrangler/tmp/bundle-GSg92E/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.48720787677562627.mjs.map
