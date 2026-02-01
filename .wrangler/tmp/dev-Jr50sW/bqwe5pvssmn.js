var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-cRVIHX/checked-fetch.js
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

// .wrangler/tmp/bundle-cRVIHX/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-I3qJfT/bundledWorker-0.29842664426081056.mjs
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
var Qt = Object.defineProperty;
var st = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "st");
var Zt = /* @__PURE__ */ __name2((t, e, n) => e in t ? Qt(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "Zt");
var S = /* @__PURE__ */ __name2((t, e, n) => Zt(t, typeof e != "symbol" ? e + "" : e, n), "S");
var We = /* @__PURE__ */ __name2((t, e, n) => e.has(t) || st("Cannot " + n), "We");
var d = /* @__PURE__ */ __name2((t, e, n) => (We(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var C = /* @__PURE__ */ __name2((t, e, n) => e.has(t) ? st("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "C");
var E = /* @__PURE__ */ __name2((t, e, n, r) => (We(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "E");
var k = /* @__PURE__ */ __name2((t, e, n) => (We(t, e, "access private method"), n), "k");
var it = /* @__PURE__ */ __name2((t, e, n, r) => ({ set _(s) {
  E(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "it");
var at = /* @__PURE__ */ __name2((t, e, n) => (r, s) => {
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
  __name2(a, "a");
}, "at");
var en = Symbol();
var tn = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof _t ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? nn(t, { all: n, dot: r }) : {};
}, "tn");
async function nn(t, e) {
  const n = await t.formData();
  return n ? rn(n, e) : {};
}
__name(nn, "nn");
__name2(nn, "nn");
function rn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? sn(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (an(n, r, s), delete n[r]);
  }), n;
}
__name(rn, "rn");
__name2(rn, "rn");
var sn = /* @__PURE__ */ __name2((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "sn");
var an = /* @__PURE__ */ __name2((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "an");
var Tt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Tt");
var on = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: n } = cn(t), r = Tt(n);
  return ln(r, e);
}, "on");
var cn = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "cn");
var ln = /* @__PURE__ */ __name2((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "ln");
var Le = {};
var dn = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return Le[r] || (n[2] ? Le[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Le[r] = [t, n[1], true]), Le[r];
  }
  return null;
}, "dn");
var nt = /* @__PURE__ */ __name2((t, e) => {
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
}, "nt");
var un = /* @__PURE__ */ __name2((t) => nt(t, decodeURI), "un");
var At = /* @__PURE__ */ __name2((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return un(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "At");
var hn = /* @__PURE__ */ __name2((t) => {
  const e = At(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "hn");
var ge = /* @__PURE__ */ __name2((t, e, ...n) => (n.length && (e = ge(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ge");
var Ct = /* @__PURE__ */ __name2((t) => {
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
}, "Ct");
var Qe = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? nt(t, Nt) : t) : t, "Qe");
var Ot = /* @__PURE__ */ __name2((t, e, n) => {
  let r;
  if (!n && e && !/[%+]/.test(e)) {
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
    if (r && (c = Qe(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), r && (l = Qe(l))), n ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return e ? s[e] : s;
}, "Ot");
var pn = Ot;
var fn = /* @__PURE__ */ __name2((t, e) => Ot(t, e, true), "fn");
var Nt = decodeURIComponent;
var ot = /* @__PURE__ */ __name2((t) => nt(t, Nt), "ot");
var be;
var G;
var ee;
var kt;
var Rt;
var tt;
var te;
var vt;
var _t = (vt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", n = [[]]) {
    C(this, ee);
    S(this, "raw");
    C(this, be);
    C(this, G);
    S(this, "routeIndex", 0);
    S(this, "path");
    S(this, "bodyCache", {});
    C(this, te, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, E(this, G, n), E(this, be, {});
  }
  param(t) {
    return t ? k(this, ee, kt).call(this, t) : k(this, ee, Rt).call(this);
  }
  query(t) {
    return pn(this.url, t);
  }
  queries(t) {
    return fn(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await tn(this, t));
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
    d(this, be)[t] = e;
  }
  valid(t) {
    return d(this, be)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [en]() {
    return d(this, G);
  }
  get matchedRoutes() {
    return d(this, G)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, G)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "vt"), be = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), kt = /* @__PURE__ */ __name2(function(t) {
  const e = d(this, G)[0][this.routeIndex][1][t], n = k(this, ee, tt).call(this, e);
  return n && /\%/.test(n) ? ot(n) : n;
}, "kt"), Rt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(d(this, G)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = k(this, ee, tt).call(this, d(this, G)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? ot(r) : r);
  }
  return t;
}, "Rt"), tt = /* @__PURE__ */ __name2(function(t) {
  return d(this, G)[1] ? d(this, G)[1][t] : t;
}, "tt"), te = /* @__PURE__ */ new WeakMap(), vt);
var mn = { Stringify: 1 };
var Mt = /* @__PURE__ */ __name2(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Mt(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Mt");
var gn = "text/plain; charset=UTF-8";
var Ze = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Ze");
var Re;
var Me;
var X;
var ye;
var W;
var H;
var Ie;
var we;
var Ee;
var le;
var je;
var $e;
var ne;
var xe;
var bt;
var xn = (bt = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    C(this, ne);
    C(this, Re);
    C(this, Me);
    S(this, "env", {});
    C(this, X);
    S(this, "finalized", false);
    S(this, "error");
    C(this, ye);
    C(this, W);
    C(this, H);
    C(this, Ie);
    C(this, we);
    C(this, Ee);
    C(this, le);
    C(this, je);
    C(this, $e);
    S(this, "render", (...t2) => (d(this, we) ?? E(this, we, (e2) => this.html(e2)), d(this, we).call(this, ...t2)));
    S(this, "setLayout", (t2) => E(this, Ie, t2));
    S(this, "getLayout", () => d(this, Ie));
    S(this, "setRenderer", (t2) => {
      E(this, we, t2);
    });
    S(this, "header", (t2, e2, n) => {
      this.finalized && E(this, H, new Response(d(this, H).body, d(this, H)));
      const r = d(this, H) ? d(this, H).headers : d(this, le) ?? E(this, le, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    S(this, "status", (t2) => {
      E(this, ye, t2);
    });
    S(this, "set", (t2, e2) => {
      d(this, X) ?? E(this, X, /* @__PURE__ */ new Map()), d(this, X).set(t2, e2);
    });
    S(this, "get", (t2) => d(this, X) ? d(this, X).get(t2) : void 0);
    S(this, "newResponse", (...t2) => k(this, ne, xe).call(this, ...t2));
    S(this, "body", (t2, e2, n) => k(this, ne, xe).call(this, t2, e2, n));
    S(this, "text", (t2, e2, n) => !d(this, le) && !d(this, ye) && !e2 && !n && !this.finalized ? new Response(t2) : k(this, ne, xe).call(this, t2, e2, Ze(gn, n)));
    S(this, "json", (t2, e2, n) => k(this, ne, xe).call(this, JSON.stringify(t2), e2, Ze("application/json", n)));
    S(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name2((s) => k(this, ne, xe).call(this, s, e2, Ze("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? Mt(t2, mn.Stringify, false, {}).then(r) : r(t2);
    });
    S(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    S(this, "notFound", () => (d(this, Ee) ?? E(this, Ee, () => new Response()), d(this, Ee).call(this, this)));
    E(this, Re, t), e && (E(this, W, e.executionCtx), this.env = e.env, E(this, Ee, e.notFoundHandler), E(this, $e, e.path), E(this, je, e.matchResult));
  }
  get req() {
    return d(this, Me) ?? E(this, Me, new _t(d(this, Re), d(this, $e), d(this, je))), d(this, Me);
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
    return d(this, H) || E(this, H, new Response(null, { headers: d(this, le) ?? E(this, le, new Headers()) }));
  }
  set res(t) {
    if (d(this, H) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of d(this, H).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const r = d(this, H).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of r)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, n);
    }
    E(this, H, t), this.finalized = true;
  }
  get var() {
    return d(this, X) ? Object.fromEntries(d(this, X)) : {};
  }
}, "bt"), Re = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), xe = /* @__PURE__ */ __name2(function(t, e, n) {
  const r = d(this, H) ? new Headers(d(this, H).headers) : d(this, le) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, ye);
  return new Response(t, { status: s, headers: r });
}, "xe"), bt);
var j = "ALL";
var vn = "all";
var bn = ["get", "post", "put", "delete", "options", "patch"];
var It = "Can not add a route since the matcher is already built.";
var jt = /* @__PURE__ */ __name2(class extends Error {
}, "jt");
var yn = "__COMPOSED_HANDLER";
var wn = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "wn");
var ct = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ct");
var U;
var $;
var $t;
var K;
var oe;
var He;
var qe;
var Se;
var En = (Se = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    C(this, $);
    S(this, "get");
    S(this, "post");
    S(this, "put");
    S(this, "delete");
    S(this, "options");
    S(this, "patch");
    S(this, "all");
    S(this, "on");
    S(this, "use");
    S(this, "router");
    S(this, "getPath");
    S(this, "_basePath", "/");
    C(this, U, "/");
    S(this, "routes", []);
    C(this, K, wn);
    S(this, "errorHandler", ct);
    S(this, "onError", (e2) => (this.errorHandler = e2, this));
    S(this, "notFound", (e2) => (E(this, K, e2), this));
    S(this, "fetch", (e2, ...n) => k(this, $, qe).call(this, e2, n[1], n[0], e2.method));
    S(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ge("/", e2)}`, n), r2, s2)));
    S(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(k(this, $, qe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...bn, vn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? E(this, U, a) : k(this, $, oe).call(this, i, d(this, U), a), o.forEach((c) => {
        k(this, $, oe).call(this, i, d(this, U), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        E(this, U, c);
        for (const l of [i].flat())
          o.map((u) => {
            k(this, $, oe).call(this, l.toUpperCase(), d(this, U), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? E(this, U, i) : (E(this, U, "*"), a.unshift(i)), a.forEach((o) => {
      k(this, $, oe).call(this, j, d(this, U), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? At : hn;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === ct ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, c) => (await at([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[yn] = s.handler), k(a = r, $, oe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = k(this, $, $t).call(this);
    return n._basePath = ge(this._basePath, e), n;
  }
  mount(e, n, r) {
    let s, i;
    r && (typeof r == "function" ? i = r : (i = r.optionHandler, r.replaceRequest === false ? s = /* @__PURE__ */ __name2((c) => c, "s") : s = r.replaceRequest));
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
    const o = /* @__PURE__ */ __name2(async (c, l) => {
      const u = await n(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return k(this, $, oe).call(this, j, ge(e, "*"), o), this;
  }
}, "Se"), U = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), $t = /* @__PURE__ */ __name2(function() {
  const e = new Se({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, E(e, K, d(this, K)), e.routes = this.routes, e;
}, "$t"), K = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ __name2(function(e, n, r) {
  e = e.toUpperCase(), n = ge(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "oe"), He = /* @__PURE__ */ __name2(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "He"), qe = /* @__PURE__ */ __name2(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await k(this, $, qe).call(this, e, n, r, "GET")))();
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new xn(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: d(this, K) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, K).call(this, o);
      });
    } catch (u) {
      return k(this, $, He).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, K).call(this, o))).catch((u) => k(this, $, He).call(this, u, o)) : l ?? d(this, K).call(this, o);
  }
  const c = at(a[0], this.errorHandler, d(this, K));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return k(this, $, He).call(this, l, o);
    }
  })();
}, "qe"), Se);
var Pt = [];
function Sn(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name2((s, i) => {
    const a = n[s] || n[j], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Pt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(Sn, "Sn");
__name2(Sn, "Sn");
var Ke = "[^/]+";
var _e = ".*";
var ke = "(?:|/.*)";
var ve = Symbol();
var Tn = new Set(".\\+*[^]$()");
function An(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === _e || t === ke ? 1 : e === _e || e === ke ? -1 : t === Ke ? 1 : e === Ke ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(An, "An");
__name2(An, "An");
var de;
var ue;
var F;
var fe;
var Cn = (fe = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, de);
    C(this, ue);
    C(this, F, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (d(this, de) !== void 0)
        throw ve;
      if (i)
        return;
      E(this, de, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", _e] : ["", "", Ke] : a === "/*" ? ["", "", ke] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Ke;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw ve;
      if (l = d(this, F)[h], !l) {
        if (Object.keys(d(this, F)).some((m) => m !== _e && m !== ke))
          throw ve;
        if (i)
          return;
        l = d(this, F)[h] = new fe(), u !== "" && E(l, ue, s.varIndex++);
      }
      !i && u !== "" && r.push([u, d(l, ue)]);
    } else if (l = d(this, F)[a], !l) {
      if (Object.keys(d(this, F)).some((u) => u.length > 1 && u !== _e && u !== ke))
        throw ve;
      if (i)
        return;
      l = d(this, F)[a] = new fe();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, F)).sort(An).map((r) => {
      const s = d(this, F)[r];
      return (typeof d(s, ue) == "number" ? `(${r})@${d(s, ue)}` : Tn.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, de) == "number" && n.unshift(`#${d(this, de)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "fe"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), fe);
var Fe;
var Pe;
var yt;
var On = (yt = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, Fe, { varIndex: 0 });
    C(this, Pe, new Cn());
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
    return d(this, Pe).insert(i, e, r, d(this, Fe), n), r;
  }
  buildRegExp() {
    let t = d(this, Pe).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "yt"), Fe = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), yt);
var Nn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var ze = /* @__PURE__ */ Object.create(null);
function Dt(t) {
  return ze[t] ?? (ze[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Dt, "Dt");
__name2(Dt, "Dt");
function _n() {
  ze = /* @__PURE__ */ Object.create(null);
}
__name(_n, "_n");
__name2(_n, "_n");
function kn(t) {
  var l;
  const e = new On(), n = [];
  if (t.length === 0)
    return Nn;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [m, b]) => u ? 1 : m ? -1 : h.length - b.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, m = r.length; u < m; u++) {
    const [b, T, O] = r[u];
    b ? s[T] = [O.map(([M]) => [M, /* @__PURE__ */ Object.create(null)]), Pt] : h++;
    let A;
    try {
      A = e.insert(T, h, b);
    } catch (M) {
      throw M === ve ? new jt(T) : M;
    }
    b || (n[h] = O.map(([M, N]) => {
      const I = /* @__PURE__ */ Object.create(null);
      for (N -= 1; N >= 0; N--) {
        const [z, w] = A[N];
        I[z] = w;
      }
      return [M, I];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let m = 0, b = n[u].length; m < b; m++) {
      const T = (l = n[u][m]) == null ? void 0 : l[1];
      if (!T)
        continue;
      const O = Object.keys(T);
      for (let A = 0, M = O.length; A < M; A++)
        T[O[A]] = o[T[O[A]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, s];
}
__name(kn, "kn");
__name2(kn, "kn");
function me(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Dt(n).test(e))
        return [...t[n]];
  }
}
__name(me, "me");
__name2(me, "me");
var re;
var se;
var Je;
var Lt;
var wt;
var Rn = (wt = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, Je);
    S(this, "name", "RegExpRouter");
    C(this, re);
    C(this, se);
    S(this, "match", Sn);
    E(this, re, { [j]: /* @__PURE__ */ Object.create(null) }), E(this, se, { [j]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, re), s = d(this, se);
    if (!r || !s)
      throw new Error(It);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[j]).forEach((l) => {
        c[t][l] = [...c[j][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Dt(e);
      t === j ? Object.keys(r).forEach((l) => {
        var u;
        (u = r[l])[e] || (u[e] = me(r[l], e) || me(r[j], e) || []);
      }) : (o = r[t])[e] || (o[e] = me(r[t], e) || me(r[j], e) || []), Object.keys(r).forEach((l) => {
        (t === j || t === l) && Object.keys(r[l]).forEach((u) => {
          c.test(u) && r[l][u].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === j || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([n, i]));
      });
      return;
    }
    const a = Ct(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var m;
        (t === j || t === h) && ((m = s[h])[u] || (m[u] = [...me(r[h], u) || me(r[j], u) || []]), s[h][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, se)).concat(Object.keys(d(this, re))).forEach((e) => {
      t[e] || (t[e] = k(this, Je, Lt).call(this, e));
    }), E(this, re, E(this, se, void 0)), _n(), t;
  }
}, "wt"), re = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let n = t === j;
  return [d(this, re), d(this, se)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== j && e.push(...Object.keys(r[j]).map((i) => [i, r[j][i]]));
  }), n ? kn(e) : null;
}, "Lt"), wt);
var ie;
var Q;
var Et;
var Mn = (Et = /* @__PURE__ */ __name2(class {
  constructor(t) {
    S(this, "name", "SmartRouter");
    C(this, ie, []);
    C(this, Q, []);
    E(this, ie, t.routers);
  }
  add(t, e, n) {
    if (!d(this, Q))
      throw new Error(It);
    d(this, Q).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, Q))
      throw new Error("Fatal error");
    const n = d(this, ie), r = d(this, Q), s = n.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = r.length; c < l; c++)
          o.add(...r[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof jt)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), E(this, ie, [o]), E(this, Q, void 0);
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
}, "Et"), ie = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Et);
var Oe = /* @__PURE__ */ Object.create(null);
var ae;
var B;
var he;
var Te;
var L;
var Z;
var ce;
var Ae;
var In = (Ae = /* @__PURE__ */ __name2(class {
  constructor(e, n, r) {
    C(this, Z);
    C(this, ae);
    C(this, B);
    C(this, he);
    C(this, Te, 0);
    C(this, L, Oe);
    if (E(this, B, r || /* @__PURE__ */ Object.create(null)), E(this, ae, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, E(this, ae, [s]);
    }
    E(this, he, []);
  }
  insert(e, n, r) {
    E(this, Te, ++it(this, Te)._);
    let s = this;
    const i = on(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = dn(l, u), m = Array.isArray(h) ? h[0] : l;
      if (m in d(s, B)) {
        s = d(s, B)[m], h && a.push(h[1]);
        continue;
      }
      d(s, B)[m] = new Ae(), h && (d(s, he).push(h), a.push(h[1])), s = d(s, B)[m];
    }
    return d(s, ae).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, Te) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    E(this, L, Oe);
    let i = [this];
    const a = Tt(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], m = l === u - 1, b = [];
      for (let T = 0, O = i.length; T < O; T++) {
        const A = i[T], M = d(A, B)[h];
        M && (E(M, L, d(A, L)), m ? (d(M, B)["*"] && r.push(...k(this, Z, ce).call(this, d(M, B)["*"], e, d(A, L))), r.push(...k(this, Z, ce).call(this, M, e, d(A, L)))) : b.push(M));
        for (let N = 0, I = d(A, he).length; N < I; N++) {
          const z = d(A, he)[N], w = d(A, L) === Oe ? {} : { ...d(A, L) };
          if (z === "*") {
            const y = d(A, B)["*"];
            y && (r.push(...k(this, Z, ce).call(this, y, e, d(A, L))), E(y, L, w), b.push(y));
            continue;
          }
          const [R, x, g] = z;
          if (!h && !(g instanceof RegExp))
            continue;
          const f = d(A, B)[R], v = a.slice(l).join("/");
          if (g instanceof RegExp) {
            const y = g.exec(v);
            if (y) {
              if (w[x] = y[0], r.push(...k(this, Z, ce).call(this, f, e, d(A, L), w)), Object.keys(d(f, B)).length) {
                E(f, L, w);
                const p = ((c = y[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (g === true || g.test(h)) && (w[x] = h, m ? (r.push(...k(this, Z, ce).call(this, f, e, w, d(A, L))), d(f, B)["*"] && r.push(...k(this, Z, ce).call(this, d(f, B)["*"], e, w, d(A, L)))) : (E(f, L, w), b.push(f)));
        }
      }
      i = b.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, u) => l.score - u.score), [r.map(({ handler: l, params: u }) => [l, u])];
  }
}, "Ae"), ae = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), ce = /* @__PURE__ */ __name2(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = d(e, ae).length; a < o; a++) {
    const c = d(e, ae)[a], l = c[n] || c[j], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== Oe || s && s !== Oe))
      for (let h = 0, m = l.possibleKeys.length; h < m; h++) {
        const b = l.possibleKeys[h], T = u[l.score];
        l.params[b] = s != null && s[b] && !T ? s[b] : r[b] ?? (s == null ? void 0 : s[b]), u[l.score] = true;
      }
  }
  return i;
}, "ce"), Ae);
var pe;
var St;
var jn = (St = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, "name", "TrieRouter");
    C(this, pe);
    E(this, pe, new In());
  }
  add(t, e, n) {
    const r = Ct(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        d(this, pe).insert(t, r[s], n);
      return;
    }
    d(this, pe).insert(t, e, n);
  }
  match(t, e) {
    return d(this, pe).search(t, e);
  }
}, "St"), pe = /* @__PURE__ */ new WeakMap(), St);
var Bt = /* @__PURE__ */ __name2(class extends En {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Mn({ routers: [new Rn(), new jn()] });
  }
}, "Bt");
var $n = /* @__PURE__ */ __name2((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, m) {
      a.res.headers.set(h, m);
    }
    __name(c, "c");
    __name2(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let m = n.allowHeaders;
      if (!(m != null && m.length)) {
        const b = a.req.header("Access-Control-Request-Headers");
        b && (m = b.split(/\s*,\s*/));
      }
      return m != null && m.length && (c("Access-Control-Allow-Headers", m.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "$n");
var Pn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var lt = /* @__PURE__ */ __name2((t, e = Ln) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "lt");
var Dn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Ln = Dn;
var Bn = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Bn");
var Ht = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Hn = Object.keys(Ht);
var qn = "index.html";
var zn = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Bn;
  return async (s, i) => {
    var u, h, m, b;
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
    t.isDir && await t.isDir(o) && (o = r(o, qn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const T = t.mimes && lt(o, t.mimes) || lt(o);
      if (s.header("Content-Type", T || "application/octet-stream"), t.precompressed && (!T || Pn.test(T))) {
        const O = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((A) => A.trim()));
        for (const A of Hn) {
          if (!O.has(A))
            continue;
          const M = await c(o + Ht[A], s);
          if (M) {
            l = M, s.header("Content-Encoding", A), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((m = t.onFound) == null ? void 0 : m.call(t, o, s)), s.body(l);
    }
    await ((b = t.onNotFound) == null ? void 0 : b.call(t, o, s)), await i();
  };
}, "zn");
var Gn = /* @__PURE__ */ __name2(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "Gn");
var Un = /* @__PURE__ */ __name2((t) => async function(n, r) {
  return zn({ ...t, getContent: async (i) => Gn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "Un");
var Kn = /* @__PURE__ */ __name2((t) => Un(t), "Kn");
var J = new Bt();
var Ge = /* @__PURE__ */ new Map();
var Fn = 1e3 * 60 * 60 * 24 * 7;
var et = false;
function qt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(qt, "qt");
__name2(qt, "qt");
function D(t) {
  return t == null ? "" : String(t);
}
__name(D, "D");
__name2(D, "D");
function Ue(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Ue, "Ue");
__name2(Ue, "Ue");
function Jn(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(Jn, "Jn");
__name2(Jn, "Jn");
function rt(t) {
  return Jn(t).length;
}
__name(rt, "rt");
__name2(rt, "rt");
function Vn(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Vn, "Vn");
__name2(Vn, "Vn");
function zt(t) {
  const e = D(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(zt, "zt");
__name2(zt, "zt");
function Gt(t) {
  const e = D(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function Yn(t) {
  const e = D(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Yn, "Yn");
__name2(Yn, "Yn");
function Ut(t) {
  let e = D(t).replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  e = e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g, '"').replace(/[\u2018\u2019\u2032]/g, "'");
  const n = [];
  let r = "", s = null, i = 0;
  const a = /* @__PURE__ */ __name2(() => {
    const o = r.trim();
    o && n.push(o), r = "";
  }, "a");
  for (let o = 0; o < e.length; o++) {
    const c = e[o], l = e[o + 1] || "", u = e[o + 2] || "";
    if (c === "(" && i++, c === ")" && (i = Math.max(0, i - 1)), (c === '"' || c === "'") && s === null ? s = c : s && c === s && (s = null), r += c, s === null && i === 0 && /[.!?]/.test(c)) {
      l === " " && (a(), o++);
      continue;
    }
    if (s === null && i === 0 && l === " ") {
      const m = r.trimEnd().slice(-1), b = /[가-힣A-Za-z0-9"'(\[]/.test(u);
      (m === "\uB2E4" || m === "\uC694" || m === "\uC8E0") && b && (a(), o++);
    }
  }
  return a(), n.length ? n : [e];
}
__name(Ut, "Ut");
__name2(Ut, "Ut");
var Ve = { narrative: { brief: 4, standard: 6, detail: 9 }, structured: { brief: 3, standard: 5, detail: 8 }, mindmap: { brief: 4, standard: 6, detail: 10 }, selftest: { brief: 3, standard: 5, detail: 8 } };
function Xn(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "brief" || e === "standard" || e === "detail" ? e : e === "simple" ? "brief" : "standard";
}
__name(Xn, "Xn");
__name2(Xn, "Xn");
function Wn(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" ? "mindmap" : "narrative";
}
__name(Wn, "Wn");
__name2(Wn, "Wn");
function Qn(t) {
  const e = String(t || "").trim(), n = e.indexOf("{"), r = e.lastIndexOf("}");
  return n >= 0 && r > n ? e.slice(n, r + 1) : e;
}
__name(Qn, "Qn");
__name2(Qn, "Qn");
function dt(t) {
  const e = Qn(t);
  try {
    return JSON.parse(e);
  } catch {
  }
  const n = e.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/\u0000/g, "");
  try {
    return JSON.parse(n);
  } catch {
  }
  return null;
}
__name(dt, "dt");
__name2(dt, "dt");
function Zn(t) {
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 '\uD559\uC2B5 \uB2E8\uC704' \uAE30\uC900\uC73C\uB85C \uB0B4\uC6A9\uC744 \uAD6C\uC870\uD654\uD558\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0(\uCD94\uCE21/\uACFC\uC7A5 \uAE08\uC9C0)", "- \uBB38\uC790 \uB2E8\uC21C \uC790\uB974\uAE30 \uAE08\uC9C0, \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uBA38\uB9AC\uB9D0/\uAF2C\uB9AC\uB9D0/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654\uC758 \uBF08\uB300(\uBC18\uB4DC\uC2DC \uD3EC\uD568):", "- anchor: \uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5", "- sections: \uD559\uC2B5 \uB2E8\uC704 \uC870\uBAA9\uD654, \uAC01 section\uC740 keywords/lvl25/explain \uD3EC\uD568", "- glossary: term/def\uB85C \uAD6C\uC131", "- links: anchor(A0) -> section \uC5F0\uACB0", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "anchor": "\uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5",', '  "hierarchy": { "big": "\uB300\uB2E8\uC6D0", "mid": "\uC911\uB2E8\uC6D0", "small": "\uC18C\uB2E8\uC6D0", "subtitles": ["\uC18C\uC81C\uBAA9"] },', '  "sections": [', '    { "id": "S1", "title": "\uC139\uC158 \uC81C\uBAA9", "keywords": ["\uD575\uC2EC\uC5B4"], "lvl25": ["\uC758\uBBF8\uD0A4\uC6CC\uB4DC"], "explain": "1~3\uBB38\uC7A5 \uC124\uBA85" }', "  ],", '  "glossary": [ { "term": "\uC6A9\uC5B4", "def": "\uC815\uC758" } ],', '  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${rt(t)}\uC790):`, t].join(`
`);
}
__name(Zn, "Zn");
__name2(Zn, "Zn");
function er(t, e) {
  const n = rt(t), r = (e == null ? void 0 : e.anchor) || "", s = ((e == null ? void 0 : e.sections) || []).map((i) => i.title).slice(0, 10);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 \uC2DC\uD5D8/\uC774\uD574/\uAE30\uC5B5\uC744 \uC704\uD55C \uC11C\uC220\uD615 \uC694\uC57D \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", '- \uC544\uB798 "\uAD6C\uC870\uD654 \uBF08\uB300"\uB97C \uBC97\uC5B4\uB098\uC9C0 \uB9D0\uACE0, \uADF8 \uB0B4\uC6A9\uC744 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC5F0\uACB0\uD574 \uC11C\uC220\uD558\uC138\uC694.', "", "\uAD6C\uC870\uD654 \uBF08\uB300:", `- anchor: ${r}`, `- sections: ${JSON.stringify(s)}`, "", "\uC694\uAD6C:", "- summary\uB294 6~10\uBB38\uC7A5(\uC0C1\uC138)", "- keyPoints 4~7\uAC1C, examHints 2~4\uAC1C", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "title": "\uC694\uC57D \uC81C\uBAA9",', '  "summary": "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5 \uC694\uC57D(6~10\uBB38\uC7A5)",', '  "keyPoints": ["\uD575\uC2EC\uD3EC\uC778\uD2B8"],', '  "examHints": ["\uC2DC\uD5D8\uD3EC\uC778\uD2B8"]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${n}\uC790):`, t].join(`
`);
}
__name(er, "er");
__name2(er, "er");
function tr(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 5) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 20);
  return ["\uB2F9\uC2E0\uC740 \uD559\uC2B5\uC6A9 \uB9C8\uC778\uB4DC\uB9F5 JSON\uC744 \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uB178\uB4DC id \uC911\uBCF5/\uB204\uB77D \uAE08\uC9C0, edge \uCC38\uC870 \uC77C\uAD00", "- \uC544\uB798 \uAD6C\uC870\uD654 \uC815\uBCF4\uB97C \uADF8\uB300\uB85C \uBC14\uD0D5\uC73C\uB85C \uAD6C\uC131(\uC0C8 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "center": { "id": "C0", "label": "\uC911\uC2EC \uC8FC\uC81C", "type": "root", "note": "\uC9E7\uC740 \uC124\uBA85" },', '  "nodes": [', '    { "id": "S1", "label": "\uC139\uC158", "type": "section", "note": "\uC124\uBA85" },', '    { "id": "T1", "label": "\uC6A9\uC5B4", "type": "term", "note": "\uC815\uC758" }', "  ],", '  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]', "}"].join(`
`);
}
__name(tr, "tr");
__name2(tr, "tr");
function nr(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 6) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 25);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uC6D0\uBB38/\uAD6C\uC870\uD654\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uAE08\uC9C0", "- \uBB38\uD56D id\uB294 q1, q2... \uACE0\uC720", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uC694\uAD6C(\uC0C1\uC138):", "- \uCD1D 8\uBB38\uD56D", "- type\uC740 reorder/blank/multiple_choice \uC11E\uAE30", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "questions": [', '    { "id": "q1", "type": "multiple_choice", "prompt": "\uC9C8\uBB38", "choices": ["a","b","c"], "answer": 1 },', '    { "id": "q2", "type": "blank", "prompt": "\uBE48\uCE78", "answer": "\uC815\uB2F5" },', '    { "id": "q3", "type": "reorder", "prompt": "\uC21C\uC11C", "choices": ["A","B","C"], "answer": [0,2,1] }', "  ]", "}"].join(`
`);
}
__name(nr, "nr");
__name2(nr, "nr");
function ut(t, e) {
  const n = Ve.structured[e], r = (t.sections || []).slice(0, n).map((c) => ({ ...c, keywords: (c.keywords || []).slice(0, e === "brief" ? 4 : 6), lvl25: (c.lvl25 || []).slice(0, e === "brief" ? 2 : 3), explain: String(c.explain || "").trim() })), s = e === "brief" ? 8 : e === "standard" ? 14 : 20, i = (t.glossary || []).slice(0, s), a = new Set(r.map((c) => c.id)), o = (t.links || []).filter((c) => c.from === "A0" && a.has(c.to));
  return { ...t, sections: r, glossary: i, links: o };
}
__name(ut, "ut");
__name2(ut, "ut");
function ht(t, e) {
  const n = Ve.mindmap[e], r = (t.nodes || []).slice(0, Math.max(0, n - 1)), s = /* @__PURE__ */ new Set(["C0", ...r.map((a) => a.id)]), i = (t.edges || []).filter((a) => s.has(a.from) && s.has(a.to));
  return { ...t, nodes: r, edges: i };
}
__name(ht, "ht");
__name2(ht, "ht");
function pt(t, e) {
  const n = Ve.selftest[e];
  return { questions: (t.questions || []).slice(0, n) };
}
__name(pt, "pt");
__name2(pt, "pt");
function ft(t, e) {
  const n = Ve.narrative[e], i = Ut(t.summary || "").slice(0, n).join(" "), a = (t.keyPoints || []).slice(0, e === "brief" ? 3 : 4), o = (t.examHints || []).slice(0, e === "brief" ? 2 : 3);
  return { ...t, summary: i, keyPoints: a, examHints: o };
}
__name(ft, "ft");
__name2(ft, "ft");
async function Be(t, e) {
  const n = /* @__PURE__ */ __name2(async () => {
    const o = await Ft(t, e);
    return String(o || "");
  }, "n"), r = await n(), s = dt(r);
  if (s)
    return s;
  const i = await n(), a = dt(i);
  if (a)
    return a;
  throw new Error("MODEL_JSON_PARSE_FAILED");
}
__name(Be, "Be");
__name2(Be, "Be");
async function rr(t, e) {
  const n = await Be(t, Zn(e));
  if (!(n != null && n.anchor) || !Array.isArray(n.sections))
    throw new Error("STRUCTURED_SCHEMA_INVALID");
  n.links = n.links || n.sections.map((u) => ({ from: "A0", to: u.id, rel: "covers" }));
  const r = await Be(t, er(e, n));
  if (!(r != null && r.summary))
    throw new Error("NARRATIVE_SCHEMA_INVALID");
  const s = await Be(t, tr(n));
  if (!(s != null && s.center) || !Array.isArray(s.nodes) || !Array.isArray(s.edges))
    throw new Error("MINDMAP_SCHEMA_INVALID");
  s.center.id || (s.center.id = "C0");
  const i = await Be(t, nr(n));
  if (!Array.isArray(i.questions))
    throw new Error("SELFTEST_SCHEMA_INVALID");
  const a = { detail: n, standard: ut(n, "standard"), brief: ut(n, "brief") }, o = { detail: r, standard: ft(r, "standard"), brief: ft(r, "brief") }, c = { detail: s, standard: ht(s, "standard"), brief: ht(s, "brief") }, l = { detail: i, standard: pt(i, "standard"), brief: pt(i, "brief") };
  return { structured: a, narrative: o, mindmap: c, selftest: l };
}
__name(rr, "rr");
__name2(rr, "rr");
function sr(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/([가-힣])\r?\n([가-힣])/g, "$1$2"), e = e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g, "$1$2"), e = e.replace(/\r/g, ""), e = e.replace(/\n{2,}/g, `
`), e = e.replace(/\n/g, " "), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/\s+([,.;:!?])/g, "$1"), e.trim();
}
__name(sr, "sr");
__name2(sr, "sr");
function ir(t) {
  return (t || []).filter((e) => {
    const n = (e || "").trim();
    return !(!n || n.length < 18 || !(/[.!?]$/.test(n) || /다\.$/.test(n) || /이다\.$/.test(n) || /하였다\.$/.test(n)) && n.length < 45);
  });
}
__name(ir, "ir");
__name2(ir, "ir");
var ar = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
function mt(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !ar.has(e));
}
__name(mt, "mt");
__name2(mt, "mt");
function or(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t)
    for (const s of mt(r))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((r, s) => {
    const i = mt(r);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = r.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: r, score: a * c };
  });
}
__name(or, "or");
__name2(or, "or");
function cr(t, e) {
  return or(t).slice().sort((s, i) => i.score - s.score).slice(0, Ue(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(cr, "cr");
__name2(cr, "cr");
function lr(t) {
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
__name(lr, "lr");
__name2(lr, "lr");
function dr(t, e, n) {
  if (!Array.isArray(t) || t.length === 0)
    return { summary: "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", mindmap: { keywords: [], nodes: [], edges: [] }, meta: { ratio: 0, target: { min: 0, max: 0 } } };
  const r = Math.max(1, Number(n) || 1), s = e === "brief" ? { min: 10, max: 15 } : e === "detail" ? { min: 45, max: 55 } : { min: 25, max: 30 }, i = ["\uB610\uD55C", "\uC544\uC6B8\uB7EC", "\uB354\uBD88\uC5B4"], a = ["\uD55C\uD3B8", "\uC774\uC640 \uD568\uAED8", "\uC774\uC640 \uB354\uBD88\uC5B4", "\uB610 \uB2E4\uB978 \uCE21\uBA74\uC5D0\uC11C"], o = /* @__PURE__ */ __name2((w) => {
    const R = String(w || "").trim().slice(0, 24);
    if (/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(R))
      return null;
    const x = R.match(/^(.{1,20}?(은|는|이|가))\s+/);
    return x ? x[1] : null;
  }, "o"), c = /* @__PURE__ */ __name2((w) => {
    const R = String(w || "").trim();
    return R && (/[.!?…]$/.test(R) ? R : R + ".");
  }, "c"), l = /* @__PURE__ */ __name2((w) => {
    let R = String(w || "").trim(), x = "";
    const g = R.match(/([.!?…])$/);
    return g && (x = g[1], R = R.slice(0, -1).trim()), R = R.replace(/합니다$/, "\uD55C\uB2E4").replace(/되었습니다$/, "\uB418\uC5C8\uB2E4").replace(/입니다$/, "\uC774\uB2E4").replace(/습니다$/, "\uB2E4"), (R + (x || ".")).trim();
  }, "l"), u = /* @__PURE__ */ __name2((w) => /^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(w.trim()), "u"), h = /* @__PURE__ */ __name2((w) => w.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/, "").trim(), "h");
  let m = t.map((w, R) => {
    const x = String(w || "").trim();
    if (!x)
      return "";
    if (R === 0) {
      const p = h(x);
      return l(c(p));
    }
    if (u(x))
      return l(c(x));
    const g = String(t[R - 1] || "").trim(), f = o(g), v = o(x), y = /* @__PURE__ */ __name2((p) => p[R % p.length], "y");
    if (v && f && v === f) {
      const p = x.replace(/^(.{1,40}?(은|는|이|가))\s+/, "");
      return l(c(`${y(i)} ${p}`.trim()));
    } else
      return x.length > 15 ? l(c(`${y(a)} ${x}`.trim())) : l(c(x));
  }).filter(Boolean);
  const b = /* @__PURE__ */ __name2((w) => String(w || "").replace(/\s+/g, "").length, "b");
  let T = m.join(" ");
  T = T.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g, " $2 ").replace(/\s{2,}/g, " ").trim();
  let O = b(T) / r * 100;
  for (; O > s.max && m.length > 1; )
    m.pop(), T = m.join(" "), O = b(T) / r * 100;
  O < s.min && console.warn(`[\uC820\uC2A4] \uC694\uC57D\uC728 ${O.toFixed(1)}%\uAC00 \uBAA9\uD45C \uCD5C\uC18C\uCE58 ${s.min}% \uBBF8\uB9CC\uC785\uB2C8\uB2E4.`);
  const M = m.join(" ").replace(/[0-9]/g, " ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ").split(/\s+/).map((w) => w.trim()).filter((w) => w.length >= 2 && w.length <= 6), N = /* @__PURE__ */ new Map();
  for (const w of M)
    N.set(w, (N.get(w) || 0) + 1);
  const I = [...N.entries()].sort((w, R) => R[1] - w[1]).slice(0, 12).map(([w]) => w), z = { keywords: I, nodes: I.map((w, R) => ({ id: `k${R}`, label: w })), edges: [] };
  return { summary: T, mindmap: z, meta: { ratio: O, target: s } };
}
__name(dr, "dr");
__name2(dr, "dr");
function ur(t, e, n) {
  const r = sr(t);
  let s = Ut(r);
  s = ir(s);
  const i = e === "brief" ? Ue(Math.round(s.length * 0.15), 2, 4) : e === "standard" ? Ue(Math.round(s.length * 0.3), 5, 9) : Ue(Math.round(s.length * 0.55), 10, 18);
  let a = cr(s, i);
  if (e === "detail") {
    const l = ["\uC131\uBCC4", "\uD559\uB144", "\uB0A8\uD559\uC0DD", "\uC5EC\uD559\uC0DD", "\uCD08\uB4F1", "\uC911\uD559", "\uACE0\uD559\uB144", "\uC800\uD559\uB144", "\uBCC0\uC778", "\uCC28\uC774", "\uBE44\uAD50"], u = s.filter((h) => l.some((m) => h.includes(m)) && !a.includes(h)).slice(0, 5);
    u.length > 0 && (a = [...a, ...u]);
  }
  const o = rt(r);
  if (n === "narrative") {
    let l, u = null, h = null;
    {
      const m = dr(a, e, o);
      l = m.summary, u = m.mindmap, h = m.meta;
    }
    return l = lr(l), { kind: "summary", mode: e, viewType: n, narrative: l, ...u && { mindmapKeywords: u }, ...h && { meta: { ...h, inputNormalized: true, originalLen: o } } };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((l, u) => `- (${u + 1}) ${l}`) } };
  if (n === "mindmap") {
    const l = (a[0] || s[0] || "\uD575\uC2EC").slice(0, 40), u = [{ id: "c", label: l, level: 0 }], h = [];
    return a.slice(1).forEach((m, b) => {
      const T = `n${b + 1}`;
      u.push({ id: T, label: m.slice(0, 60), level: 1 }), h.push({ from: "c", to: T });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: l, nodes: u, edges: h } };
  }
  const c = a.map((l, u) => ({ id: `q${u + 1}`, type: "short", question: `(${u + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${l.slice(0, 70)}"`, answerHint: l }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: c } };
}
__name(ur, "ur");
__name2(ur, "ur");
function Kt(t) {
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
__name(Kt, "Kt");
__name2(Kt, "Kt");
function hr(t, e, n, r) {
  const s = Kt(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(hr, "hr");
__name2(hr, "hr");
function pr(t, e, n, r, s) {
  const i = Kt(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(pr, "pr");
__name2(pr, "pr");
async function fr(t) {
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
__name(fr, "fr");
__name2(fr, "fr");
async function gt(t, e) {
  const n = Date.now(), r = Ge.get(e);
  if (r && n - r.createdAt < Fn)
    return { hit: true, data: r.data, store: "mem" };
  if (r && Ge.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return Ge.set(e, { data: i, createdAt: n }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(gt, "gt");
__name2(gt, "gt");
async function Ne(t, e, n, r) {
  const s = Date.now();
  Ge.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), qt()).run();
}
__name(Ne, "Ne");
__name2(Ne, "Ne");
function mr(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(mr, "mr");
__name2(mr, "mr");
function gr(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(gr, "gr");
__name2(gr, "gr");
function xr(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(xr, "xr");
__name2(xr, "xr");
async function vr(t, e) {
  var c, l, u, h, m;
  const n = D(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = D(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const b = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (b.ok) {
      const O = await b.json();
      return { ok: true, text: ((m = (h = (u = (l = (c = O == null ? void 0 : O.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : m.text) ?? "", raw: O };
    }
    if (b.status === 429 || b.status === 503) {
      await new Promise((O) => setTimeout(O, o)), o *= 2;
      continue;
    }
    const T = await b.text().catch(() => "");
    throw new Error(`Gemini error ${b.status}: ${T.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(vr, "vr");
__name2(vr, "vr");
async function br(t, e, n) {
  var l, u, h, m, b;
  const r = D(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = D(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const T = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (T.ok) {
      const A = await T.json();
      return ((b = (m = (h = (u = (l = A == null ? void 0 : A.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : m[0]) == null ? void 0 : b.text) ?? "";
    }
    if (T.status === 429 || T.status === 503) {
      await new Promise((A) => setTimeout(A, c)), c *= 2;
      continue;
    }
    const O = await T.text().catch(() => "");
    throw new Error(`Gemini error ${T.status}: ${O.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(br, "br");
__name2(br, "br");
async function Ft(t, e) {
  const n = await vr(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(Ft, "Ft");
__name2(Ft, "Ft");
var yr = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(x) {
    return (x || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(x, g) {
    const v = Math.max(200, i(x || "").length), y = e[g] || e.standard, p = Math.floor(v * y.min), _ = Math.ceil(v * y.max);
    return { base: v, min: Math.max(80, p), max: Math.max(120, _) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(x) {
    const g = (x || "").trim();
    return g ? g.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((v) => v.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function c(x) {
    return o(x).map((f, v) => ({ sid: `S${v + 1}`, text: f }));
  }
  __name(c, "c");
  __name2(c, "c");
  function l(x, g, f) {
    const v = x.find((y) => y.sid === g);
    return !v || !f || typeof f != "string" ? false : v.text.includes(f.trim());
  }
  __name(l, "l");
  __name2(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  __name2(u, "u");
  function h({ originalText: x, mode: g, format: f }) {
    const v = a(x, g), y = Vn(x), p = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${g} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${v.min}\uC790 ~ \uCD5C\uB300 ${v.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", y].join(`
`);
  }
  __name(h, "h");
  __name2(h, "h");
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
  __name2(m, "m");
  function b({ mode: x, purpose: g, format: f, summaryText: v, sentTable: y, anchors: p }) {
    const _ = n[x] || 10, q = g === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", V = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uBB38\uD56D\uC218 ${_})`, `- \uBAA9\uC801: ${g} (${q})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${V})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(y, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", v].join(`
`);
  }
  __name(b, "b");
  __name2(b, "b");
  function T(x, g) {
    const f = g && g.anchors ? g.anchors : [], v = [], y = [];
    for (const p of f) {
      const _ = p == null ? void 0 : p.sid, q = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        y.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(x, _, q)) {
        y.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      v.push(p);
    }
    return { ok: v, bad: y };
  }
  __name(T, "T");
  __name2(T, "T");
  function O(x, g) {
    const f = g && Array.isArray(g.items) ? g.items : [], v = [], y = [];
    for (const p of f) {
      const _ = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(_ != null && _.sid) || !(_ != null && _.quote)) {
        y.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(x, _.sid, _.quote)) {
        y.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        y.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      v.push(p);
    }
    return { ok: v, bad: y };
  }
  __name(O, "O");
  __name2(O, "O");
  function A({ summaryText: x, sentTable: g, anchors: f, badItems: v, mode: y, purpose: p, format: _ }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${v.length}`, `- \uBAA8\uB4DC: ${y}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${_}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(g, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(v, null, 2), "", "[SUMMARY]", x].join(`
`);
  }
  __name(A, "A");
  __name2(A, "A");
  async function M({ llmCall: x, originalText: g, mode: f, format: v }) {
    if (!x)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), r.includes(v) || (v = "narrative");
    const y = h({ originalText: g, mode: f, format: v }), p = (await x({ system: u(), user: y, json: false }) || "").trim() || "", _ = c(p), q = m({ summaryText: p, format: v });
    let V = await x({ system: u(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(V);
    } catch {
      Y = { anchors: [] };
    }
    const { ok: P } = T(_, Y), De = P.length >= 4 ? P : N(_);
    return { summaryText: p, sentTable: _, anchors: De };
  }
  __name(M, "M");
  __name2(M, "M");
  function N(x) {
    const g = [];
    for (let f = 0; f < Math.min(8, x.length); f++) {
      const v = x[f], y = (v.text || "").slice(0, 18);
      g.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: v.sid, quote: y, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return g;
  }
  __name(N, "N");
  __name2(N, "N");
  async function I({ llmCall: x, mode: g, purpose: f, format: v, summaryText: y, sentTable: p, anchors: _ }) {
    e[g] || (g = "standard"), s.includes(f) || (f = "preview"), r.includes(v) || (v = "narrative");
    const q = b({ mode: g, purpose: f, format: v, summaryText: y, sentTable: p, anchors: _ });
    let V = await x({ system: u(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(V);
    } catch {
      Y = { items: [] };
    }
    let { ok: P, bad: De } = O(p, Y);
    if (De.length > 0) {
      const Ce = A({ summaryText: y, sentTable: p, anchors: _, badItems: De.map((Wt) => Wt.q), mode: g, purpose: f, format: v });
      let Vt = await x({ system: u(), user: Ce, json: true }), Xe;
      try {
        Xe = JSON.parse(Vt);
      } catch {
        Xe = { items: [] };
      }
      const Yt = O(p, Xe);
      P = P.concat(Yt.ok);
      const Xt = n[g] || 10;
      P = P.slice(0, Xt);
    } else {
      const Ce = n[g] || 10;
      P = P.slice(0, Ce);
    }
    const Ye = n[g] || 10;
    if (P.length < Ye) {
      const Ce = z({ sentTable: p, anchors: _, count: Ye - P.length, format: v, purpose: f });
      P = P.concat(Ce).slice(0, Ye);
    }
    return { items: P };
  }
  __name(I, "I");
  __name2(I, "I");
  function z({ sentTable: x, anchors: g, count: f, format: v, purpose: y }) {
    const p = [], _ = g.slice(0, Math.max(f, 1));
    for (let q = 0; q < f; q++) {
      const V = _[q % _.length], Y = V.sid, P = V.quote;
      p.push({ id: `QF${q + 1}`, type: "short", question: y === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: Y, quote: P }, anchorIds: [V.id] });
    }
    return p;
  }
  __name(z, "z");
  __name2(z, "z");
  class w {
    constructor(g, { passScore: f = 90 } = {}) {
      this.items = Array.isArray(g) ? g : [], this.passScore = f, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(g, f) {
      if (!g)
        return { ok: false, reason: "no item" };
      const v = g.type;
      if (v === "mcq" || v === "blank" || v === "match" || v === "order" || v === "label" || v === "short") {
        if (v === "short")
          return { ok: true, reason: "short-auto-pass" };
        const y = (g.answer || "").trim(), p = (f || "").trim();
        return { ok: p === y, reason: p === y ? "match" : "mismatch" };
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
        const y = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: y, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const f = this.items.filter((v) => this.state.wrongIds.has(v.id));
          this.items = f.length > 0 ? f : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(w, "w");
  __name2(w, "w");
  async function R({ llmCall: x, originalText: g, mode: f, format: v, purpose: y }) {
    const p = await M({ llmCall: x, originalText: g, mode: f, format: v }), _ = await I({ llmCall: x, mode: f, purpose: y, format: v, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: v, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: y, passScore: 90, items: _.items } };
  }
  __name(R, "R");
  __name2(R, "R");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: M, generateSelfTest: I, runPipeline: R, MasteryRunner: w };
})();
var wr = `/* MindStory Engine Bundle (compat) */
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
J.get("/ms-engine-bundle.js", (t) => t.text(wr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
J.use("/api/*", $n());
J.get("/favicon.ico", (t) => t.body(null, 204));
J.use("/static/*", Kn({ root: "./public" }));
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

  <!-- 5) \uC785\uB825/\uBC84\uD2BC \uC5F0\uACB0 \uBC0F \uC2E4\uD589 \uB85C\uC9C1 -->
  <script>
    (function(){
      const inputText = document.getElementById('inputText');
      const summarizeBtn = document.getElementById('summarizeBtn');
      const clearBtn = document.getElementById('clearBtn');
      const copyBtn = document.getElementById('copyBtn');
      const charCount = document.getElementById('charCount');
      const modeSeg = document.getElementById('modeSeg');
      const viewSeg = document.getElementById('viewSeg');
      const out = document.getElementById('out');
      const errBox = document.getElementById('errBox');
      const runBadge = document.getElementById('runBadge');
      const runText = document.getElementById('runText');
      const spin = document.getElementById('spin');
      const resultMeta = document.getElementById('resultMeta');

      let currentMode = 'standard';
      let currentView = 'narrative';

      // \uC785\uB825 \uD14D\uC2A4\uD2B8 \uCE74\uC6B4\uD2B8 \uC5C5\uB370\uC774\uD2B8
      if (inputText && charCount) {
        inputText.addEventListener('input', () => {
          const len = inputText.value.length;
          charCount.textContent = len;
          if (summarizeBtn) {
            summarizeBtn.disabled = len < 5;
          }
        });
      }

      // \uBAA8\uB4DC \uD0ED \uD074\uB9AD
      if (modeSeg) {
        modeSeg.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-mode]');
          if (!btn) return;
          currentMode = btn.dataset.mode;
          modeSeg.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      }

      // \uBDF0 \uD0C0\uC785 \uD0ED \uD074\uB9AD
      if (viewSeg) {
        viewSeg.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-view]');
          if (!btn) return;
          currentView = btn.dataset.view;
          viewSeg.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      }

      // \uC694\uC57D\uD558\uAE30 \uBC84\uD2BC \uD074\uB9AD
      if (summarizeBtn) {
        summarizeBtn.addEventListener('click', async () => {
          const text = inputText.value.trim();
          if (text.length < 5) {
            if (errBox) {
              errBox.style.display = 'block';
              errBox.textContent = '\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uB108\uBB34 \uC9E7\uC2B5\uB2C8\uB2E4. (\uCD5C\uC18C 5\uC790)';
            }
            return;
          }

          // \uC5D0\uB7EC \uC228\uAE30\uAE30
          if (errBox) errBox.style.display = 'none';

          // \uB85C\uB529 \uD45C\uC2DC
          if (spin) spin.style.display = 'inline-block';
          if (runText) runText.textContent = '\uCC98\uB9AC \uC911...';
          if (summarizeBtn) summarizeBtn.disabled = true;

          try {
            // API \uD638\uCD9C
            const response = await window.SummaryPipeline.run({
              text,
              mode: currentMode,
              viewType: currentView,
              userId: 'web_user'
            });

            if (!response.ok) {
              throw new Error(response.error?.message || '\uC694\uC57D \uC2E4\uD328');
            }

            // \uACB0\uACFC \uB80C\uB354\uB9C1
            renderResult(response.data, response.meta);
            
            // \uC131\uACF5 \uD45C\uC2DC
            if (runText) runText.textContent = '\uC644\uB8CC';
            if (resultMeta) {
              resultMeta.textContent = \`\uC5D4\uC9C4: \${response.meta?.engine || 'unknown'} \xB7 \uC18C\uC694: \${response.meta?.elapsedMs || 0}ms\`;
            }

          } catch (err) {
            console.error('[main] Request failed:', err);
            if (errBox) {
              errBox.style.display = 'block';
              errBox.textContent = err.message || '\uC694\uC57D \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.';
            }
            if (out) {
              out.innerHTML = '<div class="meta" style="color: var(--danger);">\uC624\uB958: ' + (err.message || '\uC54C \uC218 \uC5C6\uB294 \uC624\uB958') + '</div>';
            }
            if (runText) runText.textContent = '\uC2E4\uD328';
          } finally {
            if (spin) spin.style.display = 'none';
            if (summarizeBtn) summarizeBtn.disabled = false;
          }
        });
      }

      // \uC9C0\uC6B0\uAE30 \uBC84\uD2BC
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (inputText) {
            inputText.value = '';
            if (charCount) charCount.textContent = '0';
            if (summarizeBtn) summarizeBtn.disabled = true;
          }
          if (out) {
            out.innerHTML = '<div class="meta">\uC544\uC9C1 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC624\uB978\uCABD \uC0C1\uB2E8 \uC0C1\uD0DC\uAC00 'OK'\uC778\uC9C0 \uD655\uC778 \uD6C4 \uC694\uC57D\uC744 \uC2E4\uD589\uD558\uC138\uC694.</div>';
          }
          if (errBox) errBox.style.display = 'none';
          if (resultMeta) resultMeta.textContent = '\u2014';
          if (runText) runText.textContent = '\uB300\uAE30';
        });
      }

      // \uBCF5\uC0AC \uBC84\uD2BC
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (!out) return;
          const text = out.innerText;
          navigator.clipboard.writeText(text).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = '\u2705 \uBCF5\uC0AC\uB428!';
            setTimeout(() => {
              copyBtn.textContent = original;
            }, 2000);
          }).catch(err => {
            console.error('\uBCF5\uC0AC \uC2E4\uD328:', err);
          });
        });
      }

      // \uACB0\uACFC \uB80C\uB354\uB9C1 \uD568\uC218
      function renderResult(data, meta) {
        if (!out) return;
        out.innerHTML = '';

        if (!data) {
          out.innerHTML = '<div class="meta">\uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
          return;
        }

        // narrative (\uC11C\uC220\uD615)
        if (currentView === 'narrative' && data.narrative) {
          const pre = document.createElement('pre');
          pre.style.whiteSpace = 'pre-wrap';
          pre.style.lineHeight = '1.6';
          pre.style.margin = '0';
          pre.textContent = data.narrative;
          out.appendChild(pre);
          return;
        }

        // structured (\uAD6C\uC870\uD654)
        if (currentView === 'structured' && data.structured) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '\uAD6C\uC870\uD654 \uC694\uC57D';
          out.appendChild(title);

          if (data.structured.anchor) {
            const anchorDiv = document.createElement('div');
            anchorDiv.style.cssText = 'background: rgba(139,92,246,.12); border: 1px solid rgba(139,92,246,.25); padding: 10px; border-radius: 8px; margin-bottom: 12px;';
            anchorDiv.innerHTML = '<strong>\u{1F3AF} \uD575\uC2EC:</strong> ' + data.structured.anchor;
            out.appendChild(anchorDiv);
          }

          if (data.structured.sections && data.structured.sections.length > 0) {
            const sectionsDiv = document.createElement('div');
            data.structured.sections.forEach(section => {
              const sectionDiv = document.createElement('div');
              sectionDiv.style.marginBottom = '10px';
              sectionDiv.innerHTML = '<strong>' + (section.title || '') + '</strong><br>' + (section.content || '');
              sectionsDiv.appendChild(sectionDiv);
            });
            out.appendChild(sectionsDiv);
          }
          return;
        }

        // mindmap (\uB9C8\uC778\uB4DC\uB9F5)
        if (currentView === 'mindmap' && data.mindmap) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '\uB9C8\uC778\uB4DC\uB9F5';
          out.appendChild(title);

          if (data.mindmap.center || data.mindmap.anchorNodeId) {
            const centerDiv = document.createElement('div');
            centerDiv.className = 'badge';
            centerDiv.style.marginBottom = '12px';
            centerDiv.textContent = '\u{1F31F} ' + (data.mindmap.center || '\uD575\uC2EC');
            out.appendChild(centerDiv);
          }

          if (data.mindmap.nodes && data.mindmap.nodes.length > 0) {
            const ul = document.createElement('ul');
            ul.style.marginTop = '10px';
            data.mindmap.nodes
              .filter(n => n.id !== 'c' && n.id !== data.mindmap.anchorNodeId)
              .forEach(node => {
                const li = document.createElement('li');
                li.textContent = node.label || '';
                ul.appendChild(li);
              });
            out.appendChild(ul);
          }
          return;
        }

        // selftest (\uC790\uAC00\uD14C\uC2A4\uD2B8)
        if (currentView === 'selftest' && data.selftest) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '\uC790\uAC00\uD14C\uC2A4\uD2B8';
          out.appendChild(title);

          const questions = data.selftest.questions || [];
          if (questions.length === 0) {
            out.innerHTML += '<div class="meta">\uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
            return;
          }

          questions.forEach((q, i) => {
            const qBox = document.createElement('div');
            qBox.style.cssText = 'background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 12px; padding: 12px; margin-bottom: 12px;';

            const qText = document.createElement('div');
            qText.style.cssText = 'font-weight:700; margin-bottom:6px;';
            qText.textContent = \`Q\${i + 1}. \${q.prompt || q.question || ''}\`;
            qBox.appendChild(qText);

            if (q.choices && q.choices.length > 0) {
              const choicesDiv = document.createElement('div');
              choicesDiv.style.marginTop = '8px';
              q.choices.forEach((choice, idx) => {
                const choiceDiv = document.createElement('div');
                choiceDiv.style.margin = '4px 0';
                choiceDiv.textContent = \`\${idx + 1}) \${choice}\`;
                choicesDiv.appendChild(choiceDiv);
              });
              qBox.appendChild(choicesDiv);
            }

            if (q.answer || q.answerHint) {
              const hint = document.createElement('div');
              hint.className = 'meta';
              hint.style.marginTop = '8px';
              hint.textContent = '\uC815\uB2F5: ' + (q.answer || q.answerHint || '');
              qBox.appendChild(hint);
            }

            out.appendChild(qBox);
          });
          return;
        }

        // \uD3F4\uBC31
        out.innerHTML = '<div class="meta">\uC120\uD0DD\uD55C \uBCF4\uAE30 \uD615\uC2DD\uC5D0 \uD574\uB2F9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
      }

    })();
  <\/script>
</body>
</html>`));
J.get("/api/health", (t) => {
  const e = !!D(t.env.GEMINI_API_KEY).trim(), n = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: qt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
J.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = D((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = zt((n == null ? void 0 : n.mode) || "standard"), i = Gt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = D((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!D(t.env.GEMINI_API_KEY).trim(), c = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name2(async ({ system: u, user: h, json: m }) => {
    if (m) {
      const b = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Ft(t.env, b);
    } else
      return (await br(t.env, u, h) || "").toString();
  }, "l");
  try {
    const u = await yr.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
J.post("/api/engine", async (t) => {
  var A, M;
  const e = Date.now(), n = t.env.DB;
  await fr(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Yn(r == null ? void 0 : r.kind), i = D((r == null ? void 0 : r.text) || ""), a = zt((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = Gt((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = D(((A = r == null ? void 0 : r.options) == null ? void 0 : A.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = pr(s, a, o, i, c || null), u = await gt(n, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = hr(s, a, i, c || null), m = await gt(n, h);
  if (m.hit && ((M = m.data) != null && M.narrative)) {
    const N = m.data.narrative;
    let I;
    return o === "narrative" ? I = { kind: s, mode: a, viewType: o, narrative: N } : o === "structured" ? I = { kind: s, mode: a, ...mr(N) } : o === "mindmap" ? I = { kind: s, mode: a, ...gr(N) } : I = { kind: s, mode: a, ...xr(N) }, await Ne(n, l, c || "anon", I), t.json({ ok: true, data: I, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const b = !!D(t.env.GEMINI_API_KEY).trim(), T = D(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && b && !T)
    try {
      const N = await rr(t.env, i), I = Xn(a), z = Wn(o);
      let w;
      if (z === "structured")
        w = { kind: s, mode: a, viewType: o, ...N.structured[I] };
      else if (z === "mindmap")
        w = { kind: s, mode: a, viewType: o, ...N.mindmap[I] };
      else if (z === "selftest")
        w = { kind: s, mode: a, viewType: o, ...N.selftest[I] };
      else {
        const g = N.narrative[I];
        w = { kind: s, mode: a, viewType: o, title: g.title, narrative: g.summary, keyPoints: g.keyPoints, examHints: g.examHints };
      }
      const R = N.narrative[I], x = { kind: s, mode: a, viewType: "narrative", narrative: R.summary, allSummaries: { brief: N.narrative.brief.summary, standard: N.narrative.standard.summary, detail: N.narrative.detail.summary }, meta: { engine: "v4", hierarchy: "brief \u2282 standard \u2282 detail (server-downsample)", structuredFirst: true } };
      return await Ne(n, h, c || "anon", x), await Ne(n, l, c || "anon", w), t.json({ ok: true, data: w, meta: { cached: false, engine: "gemini-v4-structured-first", elapsedMs: Date.now() - e, hierarchy: "brief \u2282 standard \u2282 detail (guaranteed)" } }, 200);
    } catch (N) {
      console.error("[Gemini V4 Error]", N);
    }
  const O = ur(i, a, o);
  if (await Ne(n, l, c || "anon", O), O.narrative) {
    const N = { kind: "summary", mode: a, viewType: "narrative", narrative: O.narrative };
    await Ne(n, h, c || "anon", N);
  }
  return t.json({ ok: true, data: O, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
J.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
J.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var xt = new Bt();
var Er = Object.assign({ "/src/index.tsx": J });
var Jt = false;
for (const [, t] of Object.entries(Er))
  t && (xt.route("/", t), xt.notFound(t.notFoundHandler), Jt = true);
if (!Jt)
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
var middleware_insertion_facade_default = xt;
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

// .wrangler/tmp/pages-I3qJfT/bqwe5pvssmn.js
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

// .wrangler/tmp/bundle-cRVIHX/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-cRVIHX/middleware-loader.entry.ts
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
//# sourceMappingURL=bqwe5pvssmn.js.map
