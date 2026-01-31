var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-yva9PX/checked-fetch.js
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

// .wrangler/tmp/bundle-yva9PX/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-ig1RWv/bundledWorker-0.30519355243254287.mjs
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
var ar = Object.defineProperty;
var pt = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "pt");
var or = /* @__PURE__ */ __name2((e, t, r) => t in e ? ar(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "or");
var _ = /* @__PURE__ */ __name2((e, t, r) => or(e, typeof t != "symbol" ? t + "" : t, r), "_");
var rt = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || pt("Cannot " + r), "rt");
var u = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "u");
var R = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? pt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "R");
var N = /* @__PURE__ */ __name2((e, t, r, n) => (rt(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "N");
var P = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "access private method"), r), "P");
var mt = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  N(e, t, s, r);
}, get _() {
  return u(e, t, n);
} }), "mt");
var gt = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let l, c = false, d;
    if (e[o] ? (d = e[o][0][0], n.req.routeIndex = o) : d = o === e.length && s || void 0, d)
      try {
        l = await d(n, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, l = await t(h, n), c = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || c) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "gt");
var cr = Symbol();
var lr = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof kt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? dr(e, { all: r, dot: n }) : {};
}, "lr");
async function dr(e, t) {
  const r = await e.formData();
  return r ? ur(r, t) : {};
}
__name(dr, "dr");
__name2(dr, "dr");
function ur(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? hr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (fr(r, n, s), delete r[n]);
  }), r;
}
__name(ur, "ur");
__name2(ur, "ur");
var hr = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "hr");
var fr = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "fr");
var jt = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "jt");
var pr = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = mr(e), n = jt(r);
  return gr(n, t);
}, "pr");
var mr = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "mr");
var gr = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "gr");
var Ge = {};
var br = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return Ge[n] || (r[2] ? Ge[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Ge[n] = [e, r[1], true]), Ge[n];
  }
  return null;
}, "br");
var ft = /* @__PURE__ */ __name2((e, t) => {
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
}, "ft");
var xr = /* @__PURE__ */ __name2((e) => ft(e, decodeURI), "xr");
var Mt = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return xr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Mt");
var vr = /* @__PURE__ */ __name2((e) => {
  const t = Mt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "vr");
var we = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = we(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "we");
var $t = /* @__PURE__ */ __name2((e) => {
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
        const i = s.replace("?", "");
        n += "/" + i, r.push(n);
      } else
        n += "/" + s;
  }), r.filter((s, i, a) => a.indexOf(s) === i);
}, "$t");
var nt = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? ft(e, Pt) : e) : e, "nt");
var It = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const o = e.charCodeAt(a + t.length + 1);
      if (o === 61) {
        const l = a + t.length + 2, c = e.indexOf("&", l);
        return nt(e.slice(l, c === -1 ? void 0 : c));
      } else if (o == 38 || isNaN(o))
        return "";
      a = e.indexOf(`&${t}`, a + 1);
    }
    if (n = /[%+]/.test(e), !n)
      return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = e.indexOf("&", i + 1);
    let o = e.indexOf("=", i);
    o > a && a !== -1 && (o = -1);
    let l = e.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (l = nt(l)), i = a, l === "")
      continue;
    let c;
    o === -1 ? c = "" : (c = e.slice(o + 1, a === -1 ? void 0 : a), n && (c = nt(c))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(c)) : s[l] ?? (s[l] = c);
  }
  return t ? s[t] : s;
}, "It");
var wr = It;
var yr = /* @__PURE__ */ __name2((e, t) => It(e, t, true), "yr");
var Pt = decodeURIComponent;
var bt = /* @__PURE__ */ __name2((e) => ft(e, Pt), "bt");
var Oe;
var J;
var te;
var Dt;
var Lt;
var ht;
var re;
var At;
var kt = (At = /* @__PURE__ */ __name2(class {
  constructor(e, t = "/", r = [[]]) {
    R(this, te);
    _(this, "raw");
    R(this, Oe);
    R(this, J);
    _(this, "routeIndex", 0);
    _(this, "path");
    _(this, "bodyCache", {});
    R(this, re, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, N(this, J, r), N(this, Oe, {});
  }
  param(e) {
    return e ? P(this, te, Dt).call(this, e) : P(this, te, Lt).call(this);
  }
  query(e) {
    return wr(this.url, e);
  }
  queries(e) {
    return yr(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await lr(this, e));
  }
  json() {
    return u(this, re).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return u(this, re).call(this, "text");
  }
  arrayBuffer() {
    return u(this, re).call(this, "arrayBuffer");
  }
  blob() {
    return u(this, re).call(this, "blob");
  }
  formData() {
    return u(this, re).call(this, "formData");
  }
  addValidatedData(e, t) {
    u(this, Oe)[e] = t;
  }
  valid(e) {
    return u(this, Oe)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [cr]() {
    return u(this, J);
  }
  get matchedRoutes() {
    return u(this, J)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return u(this, J)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "At"), Oe = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name2(function(e) {
  const t = u(this, J)[0][this.routeIndex][1][e], r = P(this, te, ht).call(this, t);
  return r && /\%/.test(r) ? bt(r) : r;
}, "Dt"), Lt = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(u(this, J)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = P(this, te, ht).call(this, u(this, J)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? bt(n) : n);
  }
  return e;
}, "Lt"), ht = /* @__PURE__ */ __name2(function(e) {
  return u(this, J)[1] ? u(this, J)[1][e] : e;
}, "ht"), re = /* @__PURE__ */ new WeakMap(), At);
var Sr = { Stringify: 1 };
var Ht = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((o) => o({ phase: t, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((l) => Ht(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Ht");
var Er = "text/plain; charset=UTF-8";
var st = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "st");
var ke;
var De;
var X;
var Ae;
var Q;
var U;
var Le;
var Ne;
var _e;
var de;
var He;
var Be;
var ne;
var ye;
var Nt;
var Or = (Nt = /* @__PURE__ */ __name2(class {
  constructor(e, t) {
    R(this, ne);
    R(this, ke);
    R(this, De);
    _(this, "env", {});
    R(this, X);
    _(this, "finalized", false);
    _(this, "error");
    R(this, Ae);
    R(this, Q);
    R(this, U);
    R(this, Le);
    R(this, Ne);
    R(this, _e);
    R(this, de);
    R(this, He);
    R(this, Be);
    _(this, "render", (...e2) => (u(this, Ne) ?? N(this, Ne, (t2) => this.html(t2)), u(this, Ne).call(this, ...e2)));
    _(this, "setLayout", (e2) => N(this, Le, e2));
    _(this, "getLayout", () => u(this, Le));
    _(this, "setRenderer", (e2) => {
      N(this, Ne, e2);
    });
    _(this, "header", (e2, t2, r) => {
      this.finalized && N(this, U, new Response(u(this, U).body, u(this, U)));
      const n = u(this, U) ? u(this, U).headers : u(this, de) ?? N(this, de, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    _(this, "status", (e2) => {
      N(this, Ae, e2);
    });
    _(this, "set", (e2, t2) => {
      u(this, X) ?? N(this, X, /* @__PURE__ */ new Map()), u(this, X).set(e2, t2);
    });
    _(this, "get", (e2) => u(this, X) ? u(this, X).get(e2) : void 0);
    _(this, "newResponse", (...e2) => P(this, ne, ye).call(this, ...e2));
    _(this, "body", (e2, t2, r) => P(this, ne, ye).call(this, e2, t2, r));
    _(this, "text", (e2, t2, r) => !u(this, de) && !u(this, Ae) && !t2 && !r && !this.finalized ? new Response(e2) : P(this, ne, ye).call(this, e2, t2, st(Er, r)));
    _(this, "json", (e2, t2, r) => P(this, ne, ye).call(this, JSON.stringify(e2), t2, st("application/json", r)));
    _(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => P(this, ne, ye).call(this, s, t2, st("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Ht(e2, Sr.Stringify, false, {}).then(n) : n(e2);
    });
    _(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    _(this, "notFound", () => (u(this, _e) ?? N(this, _e, () => new Response()), u(this, _e).call(this, this)));
    N(this, ke, e), t && (N(this, Q, t.executionCtx), this.env = t.env, N(this, _e, t.notFoundHandler), N(this, Be, t.path), N(this, He, t.matchResult));
  }
  get req() {
    return u(this, De) ?? N(this, De, new kt(u(this, ke), u(this, Be), u(this, He))), u(this, De);
  }
  get event() {
    if (u(this, Q) && "respondWith" in u(this, Q))
      return u(this, Q);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (u(this, Q))
      return u(this, Q);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return u(this, U) || N(this, U, new Response(null, { headers: u(this, de) ?? N(this, de, new Headers()) }));
  }
  set res(e) {
    if (u(this, U) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of u(this, U).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = u(this, U).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    N(this, U, e), this.finalized = true;
  }
  get var() {
    return u(this, X) ? Object.fromEntries(u(this, X)) : {};
  }
}, "Nt"), ke = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), ye = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = u(this, U) ? new Headers(u(this, U).headers) : u(this, de) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? u(this, Ae);
  return new Response(e, { status: s, headers: n });
}, "ye"), Nt);
var L = "ALL";
var Ar = "all";
var Nr = ["get", "post", "put", "delete", "options", "patch"];
var Bt = "Can not add a route since the matcher is already built.";
var Ft = /* @__PURE__ */ __name2(class extends Error {
}, "Ft");
var _r = "__COMPOSED_HANDLER";
var Tr = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "Tr");
var xt = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "xt");
var q;
var H;
var Gt;
var Y;
var ce;
var Je;
var qe;
var Te;
var Rr = (Te = /* @__PURE__ */ __name2(class {
  constructor(t = {}) {
    R(this, H);
    _(this, "get");
    _(this, "post");
    _(this, "put");
    _(this, "delete");
    _(this, "options");
    _(this, "patch");
    _(this, "all");
    _(this, "on");
    _(this, "use");
    _(this, "router");
    _(this, "getPath");
    _(this, "_basePath", "/");
    R(this, q, "/");
    _(this, "routes", []);
    R(this, Y, Tr);
    _(this, "errorHandler", xt);
    _(this, "onError", (t2) => (this.errorHandler = t2, this));
    _(this, "notFound", (t2) => (N(this, Y, t2), this));
    _(this, "fetch", (t2, ...r) => P(this, H, qe).call(this, t2, r[1], r[0], t2.method));
    _(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${we("/", t2)}`, r), n2, s2)));
    _(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(P(this, H, qe).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Nr, Ar].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? N(this, q, a) : P(this, H, ce).call(this, i, u(this, q), a), o.forEach((l) => {
        P(this, H, ce).call(this, i, u(this, q), l);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const l of [a].flat()) {
        N(this, q, l);
        for (const c of [i].flat())
          o.map((d) => {
            P(this, H, ce).call(this, c.toUpperCase(), u(this, q), d);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? N(this, q, i) : (N(this, q, "*"), a.unshift(i)), a.forEach((o) => {
      P(this, H, ce).call(this, L, u(this, q), o);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Mt : vr;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === xt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, l) => (await gt([], r.errorHandler)(o, () => s.handler(o, l))).res, "i"), i[_r] = s.handler), P(a = n, H, ce).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = P(this, H, Gt).call(this);
    return r._basePath = we(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((l) => l, "s") : s = n.replaceRequest));
    const a = i ? (l) => {
      const c = i(l);
      return Array.isArray(c) ? c : [c];
    } : (l) => {
      let c;
      try {
        c = l.executionCtx;
      } catch {
      }
      return [l.env, c];
    };
    s || (s = (() => {
      const l = we(this._basePath, t), c = l === "/" ? 0 : l.length;
      return (d) => {
        const h = new URL(d.url);
        return h.pathname = h.pathname.slice(c) || "/", new Request(h, d);
      };
    })());
    const o = /* @__PURE__ */ __name2(async (l, c) => {
      const d = await r(s(l.req.raw), ...a(l));
      if (d)
        return d;
      await c();
    }, "o");
    return P(this, H, ce).call(this, L, we(t, "*"), o), this;
  }
}, "Te"), q = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), Gt = /* @__PURE__ */ __name2(function() {
  const t = new Te({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, N(t, Y, u(this, Y)), t.routes = this.routes, t;
}, "Gt"), Y = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = we(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "ce"), Je = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Je"), qe = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await P(this, H, qe).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), o = new Or(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: u(this, Y) });
  if (a[0].length === 1) {
    let c;
    try {
      c = a[0][0][0][0](o, async () => {
        o.res = await u(this, Y).call(this, o);
      });
    } catch (d) {
      return P(this, H, Je).call(this, d, o);
    }
    return c instanceof Promise ? c.then((d) => d || (o.finalized ? o.res : u(this, Y).call(this, o))).catch((d) => P(this, H, Je).call(this, d, o)) : c ?? u(this, Y).call(this, o);
  }
  const l = gt(a[0], this.errorHandler, u(this, Y));
  return (async () => {
    try {
      const c = await l(o);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return P(this, H, Je).call(this, c, o);
    }
  })();
}, "qe"), Te);
var Kt = [];
function Cr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[L], o = a[2][i];
    if (o)
      return o;
    const l = i.match(a[0]);
    if (!l)
      return [[], Kt];
    const c = l.indexOf("", 1);
    return [a[1][c], l];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Cr, "Cr");
__name2(Cr, "Cr");
var We = "[^/]+";
var Ie = ".*";
var Pe = "(?:|/.*)";
var Se = Symbol();
var jr = new Set(".\\+*[^]$()");
function Mr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ie || e === Pe ? 1 : t === Ie || t === Pe ? -1 : e === We ? 1 : t === We ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Mr, "Mr");
__name2(Mr, "Mr");
var ue;
var he;
var V;
var be;
var $r = (be = /* @__PURE__ */ __name2(class {
  constructor() {
    R(this, ue);
    R(this, he);
    R(this, V, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (u(this, ue) !== void 0)
        throw Se;
      if (i)
        return;
      N(this, ue, r);
      return;
    }
    const [a, ...o] = t, l = a === "*" ? o.length === 0 ? ["", "", Ie] : ["", "", We] : a === "/*" ? ["", "", Pe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (l) {
      const d = l[1];
      let h = l[2] || We;
      if (d && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw Se;
      if (c = u(this, V)[h], !c) {
        if (Object.keys(u(this, V)).some((f) => f !== Ie && f !== Pe))
          throw Se;
        if (i)
          return;
        c = u(this, V)[h] = new be(), d !== "" && N(c, he, s.varIndex++);
      }
      !i && d !== "" && n.push([d, u(c, he)]);
    } else if (c = u(this, V)[a], !c) {
      if (Object.keys(u(this, V)).some((d) => d.length > 1 && d !== Ie && d !== Pe))
        throw Se;
      if (i)
        return;
      c = u(this, V)[a] = new be();
    }
    c.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(u(this, V)).sort(Mr).map((n) => {
      const s = u(this, V)[n];
      return (typeof u(s, he) == "number" ? `(${n})@${u(s, he)}` : jr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof u(this, ue) == "number" && r.unshift(`#${u(this, ue)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "be"), ue = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), be);
var Qe;
var Fe;
var _t;
var Ir = (_t = /* @__PURE__ */ __name2(class {
  constructor() {
    R(this, Qe, { varIndex: 0 });
    R(this, Fe, new $r());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (l) => {
        const c = `@\\${a}`;
        return s[a] = [c, l], a++, o = true, c;
      }), !o)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(o) !== -1) {
          i[l] = i[l].replace(o, s[a][1]);
          break;
        }
    }
    return u(this, Fe).insert(i, t, n, u(this, Qe), r), n;
  }
  buildRegExp() {
    let e = u(this, Fe).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "_t"), Qe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), _t);
var Pr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ye = /* @__PURE__ */ Object.create(null);
function zt(e) {
  return Ye[e] ?? (Ye[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(zt, "zt");
__name2(zt, "zt");
function kr() {
  Ye = /* @__PURE__ */ Object.create(null);
}
__name(kr, "kr");
__name2(kr, "kr");
function Dr(e) {
  var c;
  const t = new Ir(), r = [];
  if (e.length === 0)
    return Pr;
  const n = e.map((d) => [!/\*|\/:/.test(d[0]), ...d]).sort(([d, h], [f, b]) => d ? 1 : f ? -1 : h.length - b.length), s = /* @__PURE__ */ Object.create(null);
  for (let d = 0, h = -1, f = n.length; d < f; d++) {
    const [b, w, T] = n[d];
    b ? s[w] = [T.map(([A]) => [A, /* @__PURE__ */ Object.create(null)]), Kt] : h++;
    let S;
    try {
      S = t.insert(w, h, b);
    } catch (A) {
      throw A === Se ? new Ft(w) : A;
    }
    b || (r[h] = T.map(([A, E]) => {
      const C = /* @__PURE__ */ Object.create(null);
      for (E -= 1; E >= 0; E--) {
        const [k, O] = S[E];
        C[k] = O;
      }
      return [A, C];
    }));
  }
  const [i, a, o] = t.buildRegExp();
  for (let d = 0, h = r.length; d < h; d++)
    for (let f = 0, b = r[d].length; f < b; f++) {
      const w = (c = r[d][f]) == null ? void 0 : c[1];
      if (!w)
        continue;
      const T = Object.keys(w);
      for (let S = 0, A = T.length; S < A; S++)
        w[T[S]] = o[w[T[S]]];
    }
  const l = [];
  for (const d in a)
    l[d] = r[a[d]];
  return [i, l, s];
}
__name(Dr, "Dr");
__name2(Dr, "Dr");
function ve(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (zt(r).test(t))
        return [...e[r]];
  }
}
__name(ve, "ve");
__name2(ve, "ve");
var se;
var ie;
var Ze;
var Ut;
var Tt;
var Lr = (Tt = /* @__PURE__ */ __name2(class {
  constructor() {
    R(this, Ze);
    _(this, "name", "RegExpRouter");
    R(this, se);
    R(this, ie);
    _(this, "match", Cr);
    N(this, se, { [L]: /* @__PURE__ */ Object.create(null) }), N(this, ie, { [L]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var o;
    const n = u(this, se), s = u(this, ie);
    if (!n || !s)
      throw new Error(Bt);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[L]).forEach((c) => {
        l[e][c] = [...l[L][c]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = zt(t);
      e === L ? Object.keys(n).forEach((c) => {
        var d;
        (d = n[c])[t] || (d[t] = ve(n[c], t) || ve(n[L], t) || []);
      }) : (o = n[e])[t] || (o[t] = ve(n[e], t) || ve(n[L], t) || []), Object.keys(n).forEach((c) => {
        (e === L || e === c) && Object.keys(n[c]).forEach((d) => {
          l.test(d) && n[c][d].push([r, i]);
        });
      }), Object.keys(s).forEach((c) => {
        (e === L || e === c) && Object.keys(s[c]).forEach((d) => l.test(d) && s[c][d].push([r, i]));
      });
      return;
    }
    const a = $t(t) || [t];
    for (let l = 0, c = a.length; l < c; l++) {
      const d = a[l];
      Object.keys(s).forEach((h) => {
        var f;
        (e === L || e === h) && ((f = s[h])[d] || (f[d] = [...ve(n[h], d) || ve(n[L], d) || []]), s[h][d].push([r, i - c + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(u(this, ie)).concat(Object.keys(u(this, se))).forEach((t) => {
      e[t] || (e[t] = P(this, Ze, Ut).call(this, t));
    }), N(this, se, N(this, ie, void 0)), kr(), e;
  }
}, "Tt"), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakSet(), Ut = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === L;
  return [u(this, se), u(this, ie)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== L && t.push(...Object.keys(n[L]).map((i) => [i, n[L][i]]));
  }), r ? Dr(t) : null;
}, "Ut"), Tt);
var ae;
var Z;
var Rt;
var Hr = (Rt = /* @__PURE__ */ __name2(class {
  constructor(e) {
    _(this, "name", "SmartRouter");
    R(this, ae, []);
    R(this, Z, []);
    N(this, ae, e.routers);
  }
  add(e, t, r) {
    if (!u(this, Z))
      throw new Error(Bt);
    u(this, Z).push([e, t, r]);
  }
  match(e, t) {
    if (!u(this, Z))
      throw new Error("Fatal error");
    const r = u(this, ae), n = u(this, Z), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let l = 0, c = n.length; l < c; l++)
          o.add(...n[l]);
        a = o.match(e, t);
      } catch (l) {
        if (l instanceof Ft)
          continue;
        throw l;
      }
      this.match = o.match.bind(o), N(this, ae, [o]), N(this, Z, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (u(this, Z) || u(this, ae).length !== 1)
      throw new Error("No active router has been determined yet.");
    return u(this, ae)[0];
  }
}, "Rt"), ae = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Rt);
var Me = /* @__PURE__ */ Object.create(null);
var oe;
var z;
var fe;
var Re;
var G;
var ee;
var le;
var Ce;
var Br = (Ce = /* @__PURE__ */ __name2(class {
  constructor(t, r, n) {
    R(this, ee);
    R(this, oe);
    R(this, z);
    R(this, fe);
    R(this, Re, 0);
    R(this, G, Me);
    if (N(this, z, n || /* @__PURE__ */ Object.create(null)), N(this, oe, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, N(this, oe, [s]);
    }
    N(this, fe, []);
  }
  insert(t, r, n) {
    N(this, Re, ++mt(this, Re)._);
    let s = this;
    const i = pr(r), a = [];
    for (let o = 0, l = i.length; o < l; o++) {
      const c = i[o], d = i[o + 1], h = br(c, d), f = Array.isArray(h) ? h[0] : c;
      if (f in u(s, z)) {
        s = u(s, z)[f], h && a.push(h[1]);
        continue;
      }
      u(s, z)[f] = new Ce(), h && (u(s, fe).push(h), a.push(h[1])), s = u(s, z)[f];
    }
    return u(s, oe).push({ [t]: { handler: n, possibleKeys: a.filter((o, l, c) => c.indexOf(o) === l), score: u(this, Re) } }), s;
  }
  search(t, r) {
    var l;
    const n = [];
    N(this, G, Me);
    let i = [this];
    const a = jt(r), o = [];
    for (let c = 0, d = a.length; c < d; c++) {
      const h = a[c], f = c === d - 1, b = [];
      for (let w = 0, T = i.length; w < T; w++) {
        const S = i[w], A = u(S, z)[h];
        A && (N(A, G, u(S, G)), f ? (u(A, z)["*"] && n.push(...P(this, ee, le).call(this, u(A, z)["*"], t, u(S, G))), n.push(...P(this, ee, le).call(this, A, t, u(S, G)))) : b.push(A));
        for (let E = 0, C = u(S, fe).length; E < C; E++) {
          const k = u(S, fe)[E], O = u(S, G) === Me ? {} : { ...u(S, G) };
          if (k === "*") {
            const y = u(S, z)["*"];
            y && (n.push(...P(this, ee, le).call(this, y, t, u(S, G))), N(y, G, O), b.push(y));
            continue;
          }
          const [$, v, g] = k;
          if (!h && !(g instanceof RegExp))
            continue;
          const m = u(S, z)[$], x = a.slice(c).join("/");
          if (g instanceof RegExp) {
            const y = g.exec(x);
            if (y) {
              if (O[v] = y[0], n.push(...P(this, ee, le).call(this, m, t, u(S, G), O)), Object.keys(u(m, z)).length) {
                N(m, G, O);
                const p = ((l = y[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (o[p] || (o[p] = [])).push(m);
              }
              continue;
            }
          }
          (g === true || g.test(h)) && (O[v] = h, f ? (n.push(...P(this, ee, le).call(this, m, t, O, u(S, G))), u(m, z)["*"] && n.push(...P(this, ee, le).call(this, u(m, z)["*"], t, O, u(S, G)))) : (N(m, G, O), b.push(m)));
        }
      }
      i = b.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, d) => c.score - d.score), [n.map(({ handler: c, params: d }) => [c, d])];
  }
}, "Ce"), oe = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), le = /* @__PURE__ */ __name2(function(t, r, n, s) {
  const i = [];
  for (let a = 0, o = u(t, oe).length; a < o; a++) {
    const l = u(t, oe)[a], c = l[r] || l[L], d = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), i.push(c), n !== Me || s && s !== Me))
      for (let h = 0, f = c.possibleKeys.length; h < f; h++) {
        const b = c.possibleKeys[h], w = d[c.score];
        c.params[b] = s != null && s[b] && !w ? s[b] : n[b] ?? (s == null ? void 0 : s[b]), d[c.score] = true;
      }
  }
  return i;
}, "le"), Ce);
var pe;
var Ct;
var Fr = (Ct = /* @__PURE__ */ __name2(class {
  constructor() {
    _(this, "name", "TrieRouter");
    R(this, pe);
    N(this, pe, new Br());
  }
  add(e, t, r) {
    const n = $t(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        u(this, pe).insert(e, n[s], r);
      return;
    }
    u(this, pe).insert(e, t, r);
  }
  match(e, t) {
    return u(this, pe).search(e, t);
  }
}, "Ct"), pe = /* @__PURE__ */ new WeakMap(), Ct);
var Jt = /* @__PURE__ */ __name2(class extends Rr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Hr({ routers: [new Lr(), new Fr()] });
  }
}, "Jt");
var Gr = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, o) {
    var d;
    function l(h, f) {
      a.res.headers.set(h, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const c = await n(a.req.header("origin") || "", a);
    if (c && l("Access-Control-Allow-Origin", c), r.credentials && l("Access-Control-Allow-Credentials", "true"), (d = r.exposeHeaders) != null && d.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && l("Access-Control-Allow-Methods", h.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const b = a.req.header("Access-Control-Request-Headers");
        b && (f = b.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Gr");
var Kr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var vt = /* @__PURE__ */ __name2((e, t = Ur) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "vt");
var zr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Ur = zr;
var Jr = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Jr");
var qt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var qr = Object.keys(qt);
var Yr = "index.html";
var Vr = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? Jr;
  return async (s, i) => {
    var d, h, f, b;
    if (s.finalized)
      return i();
    let a;
    if (e.path)
      a = e.path;
    else
      try {
        if (a = decodeURIComponent(s.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))
          throw new Error();
      } catch {
        return await ((d = e.onNotFound) == null ? void 0 : d.call(e, s.req.path, s)), i();
      }
    let o = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(o) && (o = n(o, Yr));
    const l = e.getContent;
    let c = await l(o, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const w = e.mimes && vt(o, e.mimes) || vt(o);
      if (s.header("Content-Type", w || "application/octet-stream"), e.precompressed && (!w || Kr.test(w))) {
        const T = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((S) => S.trim()));
        for (const S of qr) {
          if (!T.has(S))
            continue;
          const A = await l(o + qt[S], s);
          if (A) {
            c = A, s.header("Content-Encoding", S), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, o, s)), s.body(c);
    }
    await ((b = e.onNotFound) == null ? void 0 : b.call(e, o, s)), await i();
  };
}, "Vr");
var Wr = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Wr");
var Xr = /* @__PURE__ */ __name2((e) => async function(r, n) {
  return Vr({ ...e, getContent: async (i) => Wr(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Xr");
var Qr = /* @__PURE__ */ __name2((e) => Xr(e), "Qr");
var W = new Jt();
var Ve = /* @__PURE__ */ new Map();
var Zr = 1e3 * 60 * 60 * 24 * 7;
var it = false;
function Yt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Yt, "Yt");
__name2(Yt, "Yt");
function j(e) {
  return e == null ? "" : String(e);
}
__name(j, "j");
__name2(j, "j");
function me(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(me, "me");
__name2(me, "me");
function en(e) {
  return (e || "").replace(/\s+/g, "");
}
__name(en, "en");
__name2(en, "en");
function Ee(e) {
  return en(e).length;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
var wt = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } };
var yt = { brief: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBC29\uBC95", "\uD575\uC2EC \uACB0\uB860"], standard: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uBC29\uBC95", "\uC8FC\uC694 \uACB0\uACFC", "\uACB0\uB860"], detail: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uB300\uC0C1", "\uC5F0\uAD6C \uC808\uCC28", "\uACB0\uACFC", "\uD574\uC11D", "\uAD50\uC721\uC801 \uC758\uC758"] };
function Vt(e) {
  return (e || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
var tn = ["DLPFC", "VLPFC", "OFC", "ACC", "PFC", "vmPFC", "dmPFC", "\uC804\uB450\uC5FD", "\uCE21\uB450\uC5FD", "\uB450\uC815\uC5FD", "\uD6C4\uB450\uC5FD", "\uD3B8\uB3C4\uCCB4", "\uD574\uB9C8"];
function at(e, t) {
  if (t === "brief") {
    for (const s of tn)
      if (e.includes(s))
        return { valid: false, error: `\uAC04\uB2E8\uC694\uC57D\uC5D0 \uC138\uBD80 \uB1CC\uC601\uC5ED(${s}) \uB2E8\uB3C5 \uB4F1\uC7A5 \uAE08\uC9C0. \uC77C\uBC18\uC801 \uC124\uBA85\uB9CC \uD3EC\uD568\uD558\uC138\uC694.` };
  }
  const r = yt[t] || yt.standard, n = [];
  for (const s of r)
    s.split(" ").some((o) => e.includes(o)) || n.push(s);
  return n.length > 0 ? { valid: false, error: `\uD544\uC218 \uC694\uC18C \uB204\uB77D: ${n.join(", ")}. \uC774 \uD56D\uBAA9\uB4E4\uC744 \uBC18\uB4DC\uC2DC \uD3EC\uD568\uD558\uC138\uC694.` } : { valid: true };
}
__name(at, "at");
__name2(at, "at");
function rn(e) {
  return wt[e] || wt.standard;
}
__name(rn, "rn");
__name2(rn, "rn");
function ot(e, t) {
  const r = Math.max(50, Ee(e)), { min: n, max: s } = rn(t);
  return { base: r, min: Math.floor(r * n), max: Math.ceil(r * s) };
}
__name(ot, "ot");
__name2(ot, "ot");
function Wt(e) {
  const t = j(e).trim().toLowerCase();
  return t ? t === "brief" || t === "simple" || t === "short" || t === "lite" ? "brief" : t === "detail" || t === "detailed" || t === "full" ? "detail" : "standard" : "standard";
}
__name(Wt, "Wt");
__name2(Wt, "Wt");
function Xt(e) {
  const t = j(e).trim().toLowerCase();
  return t ? t === "narrative" || t === "structured" || t === "mindmap" || t === "selftest" ? t : t === "mind-map" || t === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Xt, "Xt");
__name2(Xt, "Xt");
function nn(e) {
  const t = j(e).trim().toLowerCase();
  return t === "concept" ? "concept" : t === "exam" ? "exam" : "summary";
}
__name(nn, "nn");
__name2(nn, "nn");
function B(e) {
  const t = /* @__PURE__ */ new Set(), r = [];
  for (const n of e || []) {
    const s = typeof n == "string" ? n : JSON.stringify(n);
    t.has(s) || (t.add(s), r.push(n));
  }
  return r;
}
__name(B, "B");
__name2(B, "B");
function ge(e) {
  return Array.isArray(e) ? e : e == null ? [] : [e];
}
__name(ge, "ge");
__name2(ge, "ge");
function Xe(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
__name(Xe, "Xe");
__name2(Xe, "Xe");
function sn(e) {
  let t = j(e).replace(/\s+/g, " ").trim();
  if (!t)
    return [];
  t = t.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g, '"').replace(/[\u2018\u2019\u2032]/g, "'");
  const r = [];
  let n = "", s = null, i = 0;
  const a = /* @__PURE__ */ __name2(() => {
    const o = n.trim();
    o && r.push(o), n = "";
  }, "a");
  for (let o = 0; o < t.length; o++) {
    const l = t[o], c = t[o + 1] || "", d = t[o + 2] || "";
    if (l === "(" && i++, l === ")" && (i = Math.max(0, i - 1)), (l === '"' || l === "'") && s === null ? s = l : s && l === s && (s = null), n += l, s === null && i === 0 && /[.!?]/.test(l)) {
      c === " " && (a(), o++);
      continue;
    }
    if (s === null && i === 0 && c === " ") {
      const f = n.trimEnd().slice(-1), b = /[가-힣A-Za-z0-9"'(\[]/.test(d);
      (f === "\uB2E4" || f === "\uC694" || f === "\uC8E0") && b && (a(), o++);
    }
  }
  return a(), r.length ? r : [t];
}
__name(sn, "sn");
__name2(sn, "sn");
function ct(e) {
  if (!Xe(e))
    return { anchor: j(e).trim() || "", outline: {} };
  const t = j(e.anchor).trim(), r = e.outline, n = {};
  if (Xe(r))
    for (const s of Object.keys(r))
      n[s] = B(ge(r[s]).map((i) => j(i).trim()).filter(Boolean));
  return { anchor: t, outline: n };
}
__name(ct, "ct");
__name2(ct, "ct");
function an(e, t, r) {
  var l, c, d;
  const n = ct(e), s = ct(t), i = ct(r), a = n.anchor || s.anchor || i.anchor || "";
  n.anchor = a, s.anchor = a, i.anchor = a;
  const o = B([...Object.keys(n.outline || {}), ...Object.keys(s.outline || {}), ...Object.keys(i.outline || {})]);
  for (const h of o) {
    const f = B(ge((l = n.outline) == null ? void 0 : l[h]).map((A) => j(A).trim()).filter(Boolean)), b = B(ge((c = s.outline) == null ? void 0 : c[h]).map((A) => j(A).trim()).filter(Boolean)), w = B(ge((d = i.outline) == null ? void 0 : d[h]).map((A) => j(A).trim()).filter(Boolean)), T = B([...f, ...b]), S = B([...T, ...w]);
    n.outline || (n.outline = {}), s.outline || (s.outline = {}), i.outline || (i.outline = {}), n.outline[h] = f, s.outline[h] = T, i.outline[h] = S;
  }
  return { brief: n, standard: s, detail: i };
}
__name(an, "an");
__name2(an, "an");
function lt(e) {
  if (!Xe(e))
    return { anchorNodeId: "n0", nodes: [], edges: [] };
  const t = j(e.anchorNodeId || "n0").trim() || "n0", r = B(ge(e.nodes).map((s) => {
    const i = j(s == null ? void 0 : s.id).trim(), a = j(s == null ? void 0 : s.label).trim();
    return i && a ? { id: i, label: a } : null;
  }).filter(Boolean)), n = B(ge(e.edges).map((s) => {
    const i = j(s == null ? void 0 : s.from).trim(), a = j(s == null ? void 0 : s.to).trim(), o = j(s == null ? void 0 : s.label).trim();
    return i && a ? o ? { from: i, to: a, label: o } : { from: i, to: a } : null;
  }).filter(Boolean));
  return { anchorNodeId: t, nodes: r, edges: n };
}
__name(lt, "lt");
__name2(lt, "lt");
function dt(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e || [])
    t.set(r.id, r);
  return t;
}
__name(dt, "dt");
__name2(dt, "dt");
function on(e) {
  return `${e.from}\u2192${e.to}::${j(e.label)}`;
}
__name(on, "on");
__name2(on, "on");
function cn(e, t, r) {
  const n = lt(e), s = lt(t), i = lt(r), a = n.anchorNodeId || s.anchorNodeId || i.anchorNodeId || "n0";
  n.anchorNodeId = a, s.anchorNodeId = a, i.anchorNodeId = a, dt(n.nodes || []), dt(s.nodes || []), dt(i.nodes || []);
  const o = B([...n.nodes || [], ...s.nodes || []]), l = B([...o || [], ...i.nodes || []]), c = /* @__PURE__ */ __name2((E) => (E.some((C) => C.id === a) || E.unshift({ id: a, label: "\uD575\uC2EC \uAC1C\uB150" }), B(E)), "c");
  n.nodes = c(n.nodes || []), s.nodes = c(o), i.nodes = c(l);
  const d = new Set((n.nodes || []).map((E) => E.id)), h = new Set((s.nodes || []).map((E) => E.id)), f = new Set((i.nodes || []).map((E) => E.id)), b = /* @__PURE__ */ __name2((E, C) => B((E || []).filter((k) => C.has(k.from) && C.has(k.to))), "b"), w = b(n.edges || [], d), T = B([...w, ...b(s.edges || [], h)]), S = B([...T, ...b(i.edges || [], f)]), A = /* @__PURE__ */ __name2((E) => {
    const C = /* @__PURE__ */ new Set(), k = [];
    for (const O of E || []) {
      const $ = on(O);
      C.has($) || (C.add($), k.push(O));
    }
    return k;
  }, "A");
  return n.edges = A(w), s.edges = A(T), i.edges = A(S), { brief: n, standard: s, detail: i };
}
__name(cn, "cn");
__name2(cn, "cn");
function ut(e) {
  return Xe(e) ? { questions: B(ge(e.questions).map((r) => {
    const n = j(r == null ? void 0 : r.id).trim(), s = j(r == null ? void 0 : r.type).trim(), i = j(r == null ? void 0 : r.prompt).trim();
    if (!n || !s || !i)
      return null;
    const a = r == null ? void 0 : r.choices, o = r == null ? void 0 : r.answer, l = { id: n, type: s, prompt: i };
    return a != null && (l.choices = a), o != null && (l.answer = o), l;
  }).filter(Boolean)), gate: { passRatio: 0.8 } } : { questions: [], gate: { passRatio: 0.8 } };
}
__name(ut, "ut");
__name2(ut, "ut");
function ln(e, t, r) {
  const n = ut(e), s = ut(t), i = ut(r), a = n.questions || [], o = s.questions || [], l = i.questions || [], c = B([...a, ...o]), d = B([...c, ...l]), h = /* @__PURE__ */ __name2((f, b) => f.slice(0, Math.max(0, b)), "h");
  return n.questions = h(a, 3), s.questions = h(c, 5), i.questions = h(d, 8), n.gate = { passRatio: 0.8 }, s.gate = { passRatio: 0.8 }, i.gate = { passRatio: 0.8 }, { brief: n, standard: s, detail: i };
}
__name(ln, "ln");
__name2(ln, "ln");
function dn(e) {
  var l, c, d, h, f, b, w, T, S;
  let t;
  const r = (l = e == null ? void 0 : e.structured) == null ? void 0 : l.brief, n = (c = e == null ? void 0 : e.structured) == null ? void 0 : c.standard, s = (d = e == null ? void 0 : e.structured) == null ? void 0 : d.detail, i = /* @__PURE__ */ __name2((A) => {
    var E, C;
    return ((E = A == null ? void 0 : A.anchor) == null ? void 0 : E.id) && Array.isArray(A == null ? void 0 : A.sections) && ((C = A == null ? void 0 : A.sections[0]) == null ? void 0 : C.id);
  }, "i");
  i(r) && i(n) && i(s) ? t = un({ brief: r, standard: n, detail: s }) : t = an(r, n, s);
  const a = cn((h = e == null ? void 0 : e.mindmap) == null ? void 0 : h.brief, (f = e == null ? void 0 : e.mindmap) == null ? void 0 : f.standard, (b = e == null ? void 0 : e.mindmap) == null ? void 0 : b.detail), o = ln((w = e == null ? void 0 : e.selftest) == null ? void 0 : w.brief, (T = e == null ? void 0 : e.selftest) == null ? void 0 : T.standard, (S = e == null ? void 0 : e.selftest) == null ? void 0 : S.detail);
  return { structured: t, mindmap: a, selftest: o };
}
__name(dn, "dn");
__name2(dn, "dn");
function un(e) {
  const t = /* @__PURE__ */ __name2((r, n) => {
    const s = new Map(r.map((i) => [i.id, i]));
    return n.forEach((i) => {
      s.has(i.id) || s.set(i.id, i);
    }), Array.from(s.values());
  }, "t");
  return e.standard.anchor.text = e.brief.anchor.text, e.detail.anchor.text = e.brief.anchor.text, e.standard.sections = t(e.brief.sections, e.standard.sections), e.detail.sections = t(e.standard.sections, e.detail.sections), e.standard.glossary = t(e.brief.glossary, e.standard.glossary), e.detail.glossary = t(e.standard.glossary, e.detail.glossary), e.standard.links = t(e.brief.links, e.standard.links), e.detail.links = t(e.standard.links, e.detail.links), e;
}
__name(un, "un");
__name2(un, "un");
function hn(e) {
  if (!e)
    return "";
  let t = String(e);
  return t = t.replace(/([가-힣])\r?\n([가-힣])/g, "$1$2"), t = t.replace(/([A-Za-z])-\r?\n([A-Za-z])/g, "$1$2"), t = t.replace(/\r/g, ""), t = t.replace(/\n{2,}/g, `
`), t = t.replace(/\n/g, " "), t = t.replace(/[ \t]{2,}/g, " "), t = t.replace(/\s+([,.;:!?])/g, "$1"), t.trim();
}
__name(hn, "hn");
__name2(hn, "hn");
function fn(e) {
  return (e || []).filter((t) => {
    const r = (t || "").trim();
    return !(!r || r.length < 18 || !(/[.!?]$/.test(r) || /다\.$/.test(r) || /이다\.$/.test(r) || /하였다\.$/.test(r)) && r.length < 45);
  });
}
__name(fn, "fn");
__name2(fn, "fn");
var pn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
function St(e) {
  return (e || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((t) => t.trim()).map((t) => t.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((t) => t.length >= 2 && !pn.has(t));
}
__name(St, "St");
__name2(St, "St");
function mn(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const s of St(n))
      t.set(s, (t.get(s) || 0) + 1);
  return e.map((n, s) => {
    const i = St(n);
    let a = 0;
    for (const c of i)
      a += t.get(c) || 0;
    const o = n.length, l = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: a * l };
  });
}
__name(mn, "mn");
__name2(mn, "mn");
function gn(e, t) {
  return mn(e).slice().sort((s, i) => i.score - s.score).slice(0, me(t, 1, Math.max(1, e.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(gn, "gn");
__name2(gn, "gn");
function bn(e) {
  let t = (e || "").trim();
  t = t.replace(/모\s+든/g, "\uBAA8\uB4E0"), t = t.replace(/기\s+회/g, "\uAE30\uD68C"), t = t.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), t = t.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), t = t.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), t = t.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), t = t.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), t = t.replace(/특정\s+공간\s+인/g, "\uD2B9\uC815 \uACF5\uAC04\uC778"), t = t.replace(/(\S+)\s+\1/g, "$1"), t = t.replace(/([가-힣])을\b/g, (i, a) => {
    const o = a.charCodeAt(0);
    return o >= 44032 && o <= 55203 ? (o - 44032) % 28 !== 0 ? a + "\uC744" : a + "\uB97C" : i;
  });
  const r = t.split(new RegExp("(?<=\uB2E4\\.)\\s+")), n = /* @__PURE__ */ new Set(), s = [];
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
  return t = s.join(" "), t = t.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), t = t.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), t = t.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), t = t.replace(/\s*\.\s*/g, ". "), t = t.replace(/\s*,\s*/g, ", "), t = t.replace(/\s*;\s*/g, "; "), t = t.replace(/[ ]{2,}/g, " "), t = t.replace(/\n{3,}/g, `

`), t.trim();
}
__name(bn, "bn");
__name2(bn, "bn");
function Qt(e) {
  const t = Math.max(200, Ee(e)), r = ot(e, "brief"), n = ot(e, "standard"), s = ot(e, "detail"), i = me(r.min + Math.round((r.max - r.min) * 0.5), r.min, r.max), a = me(Math.max(n.min, i + 40), n.min, n.max), o = me(Math.max(s.min, a + 120), s.min, s.max);
  return { base: t, brief: i, standard: a, detail: o };
}
__name(Qt, "Qt");
__name2(Qt, "Qt");
function xn(e) {
  const t = Qt(e);
  return `
\uB2F9\uC2E0\uC740 \uD559\uC220 \uB17C\uBB38\uC744 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C "\uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization)" \uBC29\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB294 \uC804\uBB38 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.

[\uC785\uB825 \uC6D0\uBB38 - \uD559\uC220 \uB17C\uBB38]
"""${Vt(e)}"""

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
- \uAC04\uB2E8: ${t.brief}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 10~15%, \uD575\uC2EC\uB9CC \uAC04\uACB0\uD558\uAC8C)
- \uD45C\uC900: ${t.standard}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 25~30%, \uC8FC\uC694 \uB17C\uAC70 \uD3EC\uD568)
- \uC0C1\uC138: ${t.detail}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 45~55%, \uD559\uC220\uC801 \uB17C\uAC70+\uC138\uBD80 \uC9C0\uD45C+\uC778\uACFC\uAD00\uACC4 \uBA85\uC2DC, \uC544\uB798 \uC18C\uC81C\uBAA9 3\uAC1C)

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
    "base_chars_no_space": ${t.base},
    "target": { "brief": ${t.brief}, "standard": ${t.standard}, "detail": ${t.detail} }
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
__name(xn, "xn");
__name2(xn, "xn");
function vn(e, t, r) {
  if (!Array.isArray(e) || e.length === 0)
    return { summary: "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", mindmap: { keywords: [], nodes: [], edges: [] }, meta: { ratio: 0, target: { min: 0, max: 0 } } };
  const n = Math.max(1, Number(r) || 1), s = t === "brief" ? { min: 10, max: 15 } : t === "detail" ? { min: 45, max: 55 } : { min: 25, max: 30 }, i = ["\uB610\uD55C", "\uC544\uC6B8\uB7EC", "\uB354\uBD88\uC5B4"], a = ["\uD55C\uD3B8", "\uC774\uC640 \uD568\uAED8", "\uC774\uC640 \uB354\uBD88\uC5B4", "\uB610 \uB2E4\uB978 \uCE21\uBA74\uC5D0\uC11C"], o = /* @__PURE__ */ __name2((O) => {
    const $ = String(O || "").trim().slice(0, 24);
    if (/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test($))
      return null;
    const v = $.match(/^(.{1,20}?(은|는|이|가))\s+/);
    return v ? v[1] : null;
  }, "o"), l = /* @__PURE__ */ __name2((O) => {
    const $ = String(O || "").trim();
    return $ && (/[.!?…]$/.test($) ? $ : $ + ".");
  }, "l"), c = /* @__PURE__ */ __name2((O) => {
    let $ = String(O || "").trim(), v = "";
    const g = $.match(/([.!?…])$/);
    return g && (v = g[1], $ = $.slice(0, -1).trim()), $ = $.replace(/합니다$/, "\uD55C\uB2E4").replace(/되었습니다$/, "\uB418\uC5C8\uB2E4").replace(/입니다$/, "\uC774\uB2E4").replace(/습니다$/, "\uB2E4"), ($ + (v || ".")).trim();
  }, "c"), d = /* @__PURE__ */ __name2((O) => /^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(O.trim()), "d"), h = /* @__PURE__ */ __name2((O) => O.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/, "").trim(), "h");
  let f = e.map((O, $) => {
    const v = String(O || "").trim();
    if (!v)
      return "";
    if ($ === 0) {
      const p = h(v);
      return c(l(p));
    }
    if (d(v))
      return c(l(v));
    const g = String(e[$ - 1] || "").trim(), m = o(g), x = o(v), y = /* @__PURE__ */ __name2((p) => p[$ % p.length], "y");
    if (x && m && x === m) {
      const p = v.replace(/^(.{1,40}?(은|는|이|가))\s+/, "");
      return c(l(`${y(i)} ${p}`.trim()));
    } else
      return v.length > 15 ? c(l(`${y(a)} ${v}`.trim())) : c(l(v));
  }).filter(Boolean);
  const b = /* @__PURE__ */ __name2((O) => String(O || "").replace(/\s+/g, "").length, "b");
  let w = f.join(" ");
  w = w.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g, " $2 ").replace(/\s{2,}/g, " ").trim();
  let T = b(w) / n * 100;
  for (; T > s.max && f.length > 1; )
    f.pop(), w = f.join(" "), T = b(w) / n * 100;
  T < s.min && console.warn(`[\uC820\uC2A4] \uC694\uC57D\uC728 ${T.toFixed(1)}%\uAC00 \uBAA9\uD45C \uCD5C\uC18C\uCE58 ${s.min}% \uBBF8\uB9CC\uC785\uB2C8\uB2E4.`);
  const A = f.join(" ").replace(/[0-9]/g, " ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ").split(/\s+/).map((O) => O.trim()).filter((O) => O.length >= 2 && O.length <= 6), E = /* @__PURE__ */ new Map();
  for (const O of A)
    E.set(O, (E.get(O) || 0) + 1);
  const C = [...E.entries()].sort((O, $) => $[1] - O[1]).slice(0, 12).map(([O]) => O), k = { keywords: C, nodes: C.map((O, $) => ({ id: `k${$}`, label: O })), edges: [] };
  return { summary: w, mindmap: k, meta: { ratio: T, target: s } };
}
__name(vn, "vn");
__name2(vn, "vn");
function wn(e, t, r) {
  const n = hn(e);
  let s = sn(n);
  s = fn(s);
  const i = t === "brief" ? me(Math.round(s.length * 0.15), 2, 4) : t === "standard" ? me(Math.round(s.length * 0.3), 5, 9) : me(Math.round(s.length * 0.55), 10, 18);
  let a = gn(s, i);
  if (t === "detail") {
    const c = ["\uC131\uBCC4", "\uD559\uB144", "\uB0A8\uD559\uC0DD", "\uC5EC\uD559\uC0DD", "\uCD08\uB4F1", "\uC911\uD559", "\uACE0\uD559\uB144", "\uC800\uD559\uB144", "\uBCC0\uC778", "\uCC28\uC774", "\uBE44\uAD50"], d = s.filter((h) => c.some((f) => h.includes(f)) && !a.includes(h)).slice(0, 5);
    d.length > 0 && (a = [...a, ...d]);
  }
  const o = Ee(n);
  if (r === "narrative") {
    let c, d = null, h = null;
    {
      const f = vn(a, t, o);
      c = f.summary, d = f.mindmap, h = f.meta;
    }
    return c = bn(c), { kind: "summary", mode: t, viewType: r, narrative: c, ...d && { mindmapKeywords: d }, ...h && { meta: { ...h, inputNormalized: true, originalLen: o } } };
  }
  if (r === "structured")
    return { kind: "summary", mode: t, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((c, d) => `- (${d + 1}) ${c}`) } };
  if (r === "mindmap") {
    const c = (a[0] || s[0] || "\uD575\uC2EC").slice(0, 40), d = [{ id: "c", label: c, level: 0 }], h = [];
    return a.slice(1).forEach((f, b) => {
      const w = `n${b + 1}`;
      d.push({ id: w, label: f.slice(0, 60), level: 1 }), h.push({ from: "c", to: w });
    }), { kind: "summary", mode: t, viewType: r, mindmap: { center: c, nodes: d, edges: h } };
  }
  const l = a.map((c, d) => ({ id: `q${d + 1}`, type: "short", question: `(${d + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${c.slice(0, 70)}"`, answerHint: c }));
  return { kind: "summary", mode: t, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: l } };
}
__name(wn, "wn");
__name2(wn, "wn");
function Zt(e) {
  if (!e)
    return "empty";
  let t = 2166136261, r = 0;
  for (let i = 0; i < e.length; i++) {
    const a = e.charCodeAt(i);
    t ^= a, t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24), r = (r << 5) - r + a, r |= 0;
  }
  const n = (t >>> 0).toString(16), s = (Math.abs(r) >>> 0).toString(16);
  return `${e.length.toString(16)}_${n}_${s}`;
}
__name(Zt, "Zt");
__name2(Zt, "Zt");
function yn(e, t, r, n) {
  const s = Zt(r);
  return `${e}::${n || "anon"}::${t}::base::${s}`;
}
__name(yn, "yn");
__name2(yn, "yn");
function Sn(e, t, r, n, s) {
  const i = Zt(n);
  return `${e}::${s || "anon"}::${t}::${r}::${i}`;
}
__name(Sn, "Sn");
__name2(Sn, "Sn");
async function En(e) {
  if (!it) {
    if (!e) {
      it = true;
      return;
    }
    await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), it = true;
  }
}
__name(En, "En");
__name2(En, "En");
async function Et(e, t) {
  const r = Date.now(), n = Ve.get(t);
  if (n && r - n.createdAt < Zr)
    return { hit: true, data: n.data, store: "mem" };
  if (n && Ve.delete(t), !e)
    return { hit: false };
  const s = await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return Ve.set(t, { data: i, createdAt: r }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(Et, "Et");
__name2(Et, "Et");
async function $e(e, t, r, n) {
  const s = Date.now();
  Ve.set(t, { data: n, createdAt: s }), e && await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t, r, JSON.stringify(n), Yt()).run();
}
__name($e, "$e");
__name2($e, "$e");
function Ke(e) {
  const t = e.split(/\n\n+/).filter((n) => n.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: t.length > 1 ? t.map((n, s) => `- (${s + 1}) ${n}`) : e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n, s) => `- (${s + 1}) ${n}.`) } };
}
__name(Ke, "Ke");
__name2(Ke, "Ke");
function ze(e) {
  const t = e.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), r = (t[0] || "\uD575\uC2EC").slice(0, 40), n = [{ id: "c", label: r, level: 0 }], s = [];
  return t.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    n.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: r, nodes: n, edges: s } };
}
__name(ze, "ze");
__name2(ze, "ze");
function Ue(e) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n) => n.trim()).map((n, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${n.slice(0, 70)}"`, answerHint: n })) } };
}
__name(Ue, "Ue");
__name2(Ue, "Ue");
async function On(e, t) {
  var l, c, d, h, f;
  const r = j(e.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = j(e.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, i = { contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const b = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (b.ok) {
      const T = await b.json();
      return { ok: true, text: ((f = (h = (d = (c = (l = T == null ? void 0 : T.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : d.parts) == null ? void 0 : h[0]) == null ? void 0 : f.text) ?? "", raw: T };
    }
    if (b.status === 429 || b.status === 503) {
      await new Promise((T) => setTimeout(T, o)), o *= 2;
      continue;
    }
    const w = await b.text().catch(() => "");
    throw new Error(`Gemini error ${b.status}: ${w.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(On, "On");
__name2(On, "On");
async function An(e, t, r) {
  var c, d, h, f, b;
  const n = j(e.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const s = j(e.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`, a = { system_instruction: { parts: [{ text: t }] }, contents: [{ role: "user", parts: [{ text: r }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, l = 500;
  for (; o < 3; ) {
    o++;
    const w = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (w.ok) {
      const S = await w.json();
      return ((b = (f = (h = (d = (c = S == null ? void 0 : S.candidates) == null ? void 0 : c[0]) == null ? void 0 : d.content) == null ? void 0 : h.parts) == null ? void 0 : f[0]) == null ? void 0 : b.text) ?? "";
    }
    if (w.status === 429 || w.status === 503) {
      await new Promise((S) => setTimeout(S, l)), l *= 2;
      continue;
    }
    const T = await w.text().catch(() => "");
    throw new Error(`Gemini error ${w.status}: ${T.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(An, "An");
__name2(An, "An");
async function er(e, t) {
  const r = await On(e, t);
  return typeof r == "string" ? r : ((r == null ? void 0 : r.text) ?? "").toString();
}
__name(er, "er");
__name2(er, "er");
async function Nn(e, t) {
  const r = xn(t);
  for (let n = 1; n <= 2; n++)
    try {
      let i = (await er(e, r) || "").trim();
      i.startsWith("```") && (i = i.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
      const a = JSON.parse(i);
      if (!(a != null && a.brief) || !(a != null && a.standard) || !(a != null && a.detail))
        throw new Error("Missing required fields");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing detail fields");
      const o = Ee(a.brief), l = Ee(a.standard), c = Ee(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      (o >= l || l >= c) && console.warn("[SummaryJSON] monotonic violated", { bLen: o, sLen: l, dLen: c, attempt: n });
      const d = at(a.brief, "brief"), h = at(a.standard, "standard"), f = a.detail.\uAC1C\uB150 + " " + a.detail.\uC601\uD5A5 + " " + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"], b = at(f, "detail");
      if (!d.valid && (console.warn("[SummaryJSON] brief validation failed:", d.error), n === 1))
        throw new Error(`Brief validation: ${d.error}`);
      if (!h.valid && (console.warn("[SummaryJSON] standard validation failed:", h.error), n === 1))
        throw new Error(`Standard validation: ${h.error}`);
      if (!b.valid && (console.warn("[SummaryJSON] detail validation failed:", b.error), n === 1))
        throw new Error(`Detail validation: ${b.error}`);
      return a;
    } catch (s) {
      if (console.error("[SummaryJSON] attempt failed", n, s == null ? void 0 : s.message), n === 2) {
        const i = Qt(t);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", standard: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", detail: { \uAC1C\uB150: "[\uC2E4\uD328]", \uC601\uD5A5: "[\uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uC2E4\uD328]" } };
      }
    }
  throw new Error("summarizeWithJSON failed");
}
__name(Nn, "Nn");
__name2(Nn, "Nn");
var _n = (() => {
  const t = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, r = { brief: 6, standard: 10, detail: 14 }, n = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(v) {
    return (v || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(v, g) {
    const x = Math.max(200, i(v || "").length), y = t[g] || t.standard, p = Math.floor(x * y.min), I = Math.ceil(x * y.max);
    return { base: x, min: Math.max(80, p), max: Math.max(120, I) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(v) {
    const g = (v || "").trim();
    return g ? g.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((x) => x.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function l(v) {
    return o(v).map((m, x) => ({ sid: `S${x + 1}`, text: m }));
  }
  __name(l, "l");
  __name2(l, "l");
  function c(v, g, m) {
    const x = v.find((y) => y.sid === g);
    return !x || !m || typeof m != "string" ? false : x.text.includes(m.trim());
  }
  __name(c, "c");
  __name2(c, "c");
  function d() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(d, "d");
  __name2(d, "d");
  function h({ originalText: v, mode: g, format: m }) {
    const x = a(v, g), y = Vt(v), p = m === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : m === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${g} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${m} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${x.min}\uC790 ~ \uCD5C\uB300 ${x.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", y].join(`
`);
  }
  __name(h, "h");
  __name2(h, "h");
  function f({ summaryText: v, format: g }) {
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
}`, "", "[SUMMARY]", v].join(`
`);
  }
  __name(f, "f");
  __name2(f, "f");
  function b({ mode: v, purpose: g, format: m, summaryText: x, sentTable: y, anchors: p }) {
    const I = r[v] || 10, K = g === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", D = m === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : m === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${v} (\uBB38\uD56D\uC218 ${I})`, `- \uBAA9\uC801: ${g} (${K})`, `- \uC694\uC57D \uD615\uC2DD: ${m} (${D})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(y, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", x].join(`
`);
  }
  __name(b, "b");
  __name2(b, "b");
  function w(v, g) {
    const m = g && g.anchors ? g.anchors : [], x = [], y = [];
    for (const p of m) {
      const I = p == null ? void 0 : p.sid, K = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        y.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!c(v, I, K)) {
        y.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      x.push(p);
    }
    return { ok: x, bad: y };
  }
  __name(w, "w");
  __name2(w, "w");
  function T(v, g) {
    const m = g && Array.isArray(g.items) ? g.items : [], x = [], y = [];
    for (const p of m) {
      const I = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(I != null && I.sid) || !(I != null && I.quote)) {
        y.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!c(v, I.sid, I.quote)) {
        y.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        y.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      x.push(p);
    }
    return { ok: x, bad: y };
  }
  __name(T, "T");
  __name2(T, "T");
  function S({ summaryText: v, sentTable: g, anchors: m, badItems: x, mode: y, purpose: p, format: I }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${x.length}`, `- \uBAA8\uB4DC: ${y}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${I}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(g, null, 2), "", "[ANCHORS]", JSON.stringify(m, null, 2), "", "[BAD ITEMS]", JSON.stringify(x, null, 2), "", "[SUMMARY]", v].join(`
`);
  }
  __name(S, "S");
  __name2(S, "S");
  async function A({ llmCall: v, originalText: g, mode: m, format: x }) {
    if (!v)
      throw new Error("llmCall is required");
    t[m] || (m = "standard"), n.includes(x) || (x = "narrative");
    const y = h({ originalText: g, mode: m, format: x }), p = (await v({ system: d(), user: y, json: false }) || "").trim() || "", I = l(p), K = f({ summaryText: p, format: x });
    let D = await v({ system: d(), user: K, json: true }), F;
    try {
      F = JSON.parse(D);
    } catch {
      F = { anchors: [] };
    }
    const { ok: M } = w(I, F), xe = M.length >= 4 ? M : E(I);
    return { summaryText: p, sentTable: I, anchors: xe };
  }
  __name(A, "A");
  __name2(A, "A");
  function E(v) {
    const g = [];
    for (let m = 0; m < Math.min(8, v.length); m++) {
      const x = v[m], y = (x.text || "").slice(0, 18);
      g.push({ id: `A${m + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${m + 1}`, type: "claim", sid: x.sid, quote: y, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return g;
  }
  __name(E, "E");
  __name2(E, "E");
  async function C({ llmCall: v, mode: g, purpose: m, format: x, summaryText: y, sentTable: p, anchors: I }) {
    t[g] || (g = "standard"), s.includes(m) || (m = "preview"), n.includes(x) || (x = "narrative");
    const K = b({ mode: g, purpose: m, format: x, summaryText: y, sentTable: p, anchors: I });
    let D = await v({ system: d(), user: K, json: true }), F;
    try {
      F = JSON.parse(D);
    } catch {
      F = { items: [] };
    }
    let { ok: M, bad: xe } = T(p, F);
    if (xe.length > 0) {
      const je = S({ summaryText: y, sentTable: p, anchors: I, badItems: xe.map((ir) => ir.q), mode: g, purpose: m, format: x });
      let rr = await v({ system: d(), user: je, json: true }), tt;
      try {
        tt = JSON.parse(rr);
      } catch {
        tt = { items: [] };
      }
      const nr = T(p, tt);
      M = M.concat(nr.ok);
      const sr = r[g] || 10;
      M = M.slice(0, sr);
    } else {
      const je = r[g] || 10;
      M = M.slice(0, je);
    }
    const et = r[g] || 10;
    if (M.length < et) {
      const je = k({ sentTable: p, anchors: I, count: et - M.length, format: x, purpose: m });
      M = M.concat(je).slice(0, et);
    }
    return { items: M };
  }
  __name(C, "C");
  __name2(C, "C");
  function k({ sentTable: v, anchors: g, count: m, format: x, purpose: y }) {
    const p = [], I = g.slice(0, Math.max(m, 1));
    for (let K = 0; K < m; K++) {
      const D = I[K % I.length], F = D.sid, M = D.quote;
      p.push({ id: `QF${K + 1}`, type: "short", question: y === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${M}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${M}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: F, quote: M }, anchorIds: [D.id] });
    }
    return p;
  }
  __name(k, "k");
  __name2(k, "k");
  class O {
    constructor(g, { passScore: m = 90 } = {}) {
      this.items = Array.isArray(g) ? g : [], this.passScore = m, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(g, m) {
      if (!g)
        return { ok: false, reason: "no item" };
      const x = g.type;
      if (x === "mcq" || x === "blank" || x === "match" || x === "order" || x === "label" || x === "short") {
        if (x === "short")
          return { ok: true, reason: "short-auto-pass" };
        const y = (g.answer || "").trim(), p = (m || "").trim();
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
      const m = this.currentItem();
      if (this.gradeAnswer(m, g).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(m.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${m.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${m.evidence.quote}'`, score: this.getScore() };
      {
        const y = m.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: y, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const m = this.items.filter((x) => this.state.wrongIds.has(x.id));
          this.items = m.length > 0 ? m : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(O, "O");
  __name2(O, "O");
  async function $({ llmCall: v, originalText: g, mode: m, format: x, purpose: y }) {
    const p = await A({ llmCall: v, originalText: g, mode: m, format: x }), I = await C({ llmCall: v, mode: m, purpose: y, format: x, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: m, format: x, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: y, passScore: 90, items: I.items } };
  }
  __name($, "$");
  __name2($, "$");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: l, generateBundle: A, generateSelfTest: C, runPipeline: $, MasteryRunner: O };
})();
var Tn = `/* MindStory Engine Bundle (compat) */
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
W.use("/api/*", Gr());
W.get("/static/ms-engine-bundle.js", (e) => e.text(Tn, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
W.get("/favicon.ico", (e) => e.body(null, 204));
W.use("/static/*", Qr({ root: "./public" }));
W.get("/", (e) => e.html(`<!DOCTYPE html>
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
W.get("/api/health", (e) => {
  const t = !!j(e.env.GEMINI_API_KEY).trim(), r = j(e.env.USE_MOCK).trim().toLowerCase() === "true";
  return e.json({ ok: true, ts: Yt(), hasDB: !!e.env.DB, hasGeminiKey: t, engineMode: t && !r ? "gemini+fallback" : "local-only" });
});
W.post("/api/gens/run", async (e) => {
  const t = Date.now();
  let r = null;
  try {
    r = await e.req.json();
  } catch {
    return e.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const n = j((r == null ? void 0 : r.text) || (r == null ? void 0 : r.originalText) || ""), s = Wt((r == null ? void 0 : r.mode) || "standard"), i = Xt((r == null ? void 0 : r.format) || (r == null ? void 0 : r.viewType) || "narrative"), a = j((r == null ? void 0 : r.purpose) || "preview").trim().toLowerCase();
  if (!n)
    return e.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!j(e.env.GEMINI_API_KEY).trim(), l = j(e.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || l)
    return e.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const c = /* @__PURE__ */ __name2(async ({ system: d, user: h, json: f }) => {
    if (f) {
      const b = `${d}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await er(e.env, b);
    } else
      return (await An(e.env, d, h) || "").toString();
  }, "c");
  try {
    const d = await _n.runPipeline({ llmCall: c, originalText: n, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return e.json({ ok: true, data: d, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - t } }, 200);
  } catch (d) {
    return console.error("[GENS Engine Error]", d), e.json({ ok: false, error: { code: "GENS_ERROR", message: d.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: d.stack } }, 500);
  }
});
W.post("/api/engine", async (e) => {
  var S, A;
  const t = Date.now(), r = e.env.DB;
  await En(r);
  let n = null;
  try {
    n = await e.req.json();
  } catch {
    return e.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = nn(n == null ? void 0 : n.kind), i = j((n == null ? void 0 : n.text) || ""), a = Wt((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), o = Xt((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), l = j(((S = n == null ? void 0 : n.options) == null ? void 0 : S.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return e.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const c = Sn(s, a, o, i, l || null), d = await Et(r, c);
  if (d.hit)
    return e.json({ ok: true, data: d.data, meta: { cached: true, cacheStore: d.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - t } }, 200);
  const h = yn(s, a, i, l || null), f = await Et(r, h);
  if (f.hit && ((A = f.data) != null && A.narrative)) {
    const E = f.data.narrative;
    let C;
    return o === "narrative" ? C = { kind: s, mode: a, viewType: o, narrative: E } : o === "structured" ? C = { kind: s, mode: a, ...Ke(E) } : o === "mindmap" ? C = { kind: s, mode: a, ...ze(E) } : C = { kind: s, mode: a, ...Ue(E) }, await $e(r, c, l || "anon", C), e.json({ ok: true, data: C, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - t } }, 200);
  }
  const b = !!j(e.env.GEMINI_API_KEY).trim(), w = j(e.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && b && !w)
    try {
      const E = await Nn(e.env, i), C = E.brief, k = E.standard, O = `**\uAC1C\uB150**
${E.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${E.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${E.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`, $ = Ke(C), v = Ke(k), g = Ke(O), m = ze(C), x = ze(k), y = ze(O), p = Ue(C), I = Ue(k), K = Ue(O), D = dn({ structured: { brief: $, standard: v, detail: g }, mindmap: { brief: m, standard: x, detail: y }, selftest: { brief: p, standard: I, detail: K } });
      let F, M;
      a === "brief" ? (F = C, o === "structured" ? M = { kind: s, mode: a, viewType: o, ...D.structured.brief } : o === "mindmap" ? M = { kind: s, mode: a, viewType: o, ...D.mindmap.brief } : o === "selftest" ? M = { kind: s, mode: a, viewType: o, ...D.selftest.brief } : M = { kind: s, mode: a, viewType: o, narrative: F }) : a === "standard" ? (F = k, o === "structured" ? M = { kind: s, mode: a, viewType: o, ...D.structured.standard } : o === "mindmap" ? M = { kind: s, mode: a, viewType: o, ...D.mindmap.standard } : o === "selftest" ? M = { kind: s, mode: a, viewType: o, ...D.selftest.standard } : M = { kind: s, mode: a, viewType: o, narrative: F }) : (F = O, o === "structured" ? M = { kind: s, mode: a, viewType: o, ...D.structured.detail } : o === "mindmap" ? M = { kind: s, mode: a, viewType: o, ...D.mindmap.detail } : o === "selftest" ? M = { kind: s, mode: a, viewType: o, ...D.selftest.detail } : M = { kind: s, mode: a, viewType: o, narrative: F });
      const xe = { kind: s, mode: a, viewType: "narrative", narrative: F, allSummaries: { brief: C, standard: k, detail: E.detail }, meta: E.meta };
      return await $e(r, h, l || "anon", xe), await $e(r, c, l || "anon", M), e.json({ ok: true, data: M, meta: { cached: false, engine: "gemini-json-v3-enforced", elapsedMs: Date.now() - t, enforced: ["structured", "mindmap", "selftest"] } }, 200);
    } catch (E) {
      console.error("[Gemini JSON Error]", E);
    }
  const T = wn(i, a, o);
  if (await $e(r, c, l || "anon", T), T.narrative) {
    const E = { kind: "summary", mode: a, viewType: "narrative", narrative: T.narrative };
    await $e(r, h, l || "anon", E);
  }
  return e.json({ ok: true, data: T, meta: { cached: false, engine: "local", elapsedMs: Date.now() - t } }, 200);
});
W.get("/health", (e) => e.json({ ok: true, service: "MindStory v2 Revised" }));
W.notFound((e) => e.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var Ot = new Jt();
var Rn = Object.assign({ "/src/index.tsx": W });
var tr = false;
for (const [, e] of Object.entries(Rn))
  e && (Ot.route("/", e), Ot.notFound(e.notFoundHandler), tr = true);
if (!tr)
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
var middleware_insertion_facade_default = Ot;
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

// .wrangler/tmp/pages-ig1RWv/0g1a4fe6q2un.js
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

// .wrangler/tmp/bundle-yva9PX/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-yva9PX/middleware-loader.entry.ts
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
//# sourceMappingURL=0g1a4fe6q2un.js.map
