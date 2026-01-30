var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-D9JWiZ/checked-fetch.js
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

// .wrangler/tmp/bundle-D9JWiZ/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-QrEH0P/bundledWorker-0.6080551816079391.mjs
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
var dn = Object.defineProperty;
var ft = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "ft");
var un = /* @__PURE__ */ __name2((t, e, n) => e in t ? dn(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "un");
var C = /* @__PURE__ */ __name2((t, e, n) => un(t, typeof e != "symbol" ? e + "" : e, n), "C");
var st = /* @__PURE__ */ __name2((t, e, n) => e.has(t) || ft("Cannot " + n), "st");
var d = /* @__PURE__ */ __name2((t, e, n) => (st(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var N = /* @__PURE__ */ __name2((t, e, n) => e.has(t) ? ft("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "N");
var $ = /* @__PURE__ */ __name2((t, e, n, r) => (st(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "$");
var I = /* @__PURE__ */ __name2((t, e, n) => (st(t, e, "access private method"), n), "I");
var pt = /* @__PURE__ */ __name2((t, e, n, r) => ({ set _(s) {
  $(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "pt");
var mt = /* @__PURE__ */ __name2((t, e, n) => (r, s) => {
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
}, "mt");
var hn = Symbol();
var fn = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof qt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? pn(t, { all: n, dot: r }) : {};
}, "fn");
async function pn(t, e) {
  const n = await t.formData();
  return n ? mn(n, e) : {};
}
__name(pn, "pn");
__name2(pn, "pn");
function mn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? gn(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (xn(n, r, s), delete n[r]);
  }), n;
}
__name(mn, "mn");
__name2(mn, "mn");
var gn = /* @__PURE__ */ __name2((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "gn");
var xn = /* @__PURE__ */ __name2((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "xn");
var Pt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Pt");
var vn = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: n } = bn(t), r = Pt(n);
  return wn(r, e);
}, "vn");
var bn = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "bn");
var wn = /* @__PURE__ */ __name2((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "wn");
var Je = {};
var yn = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return Je[r] || (n[2] ? Je[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Je[r] = [t, n[1], true]), Je[r];
  }
  return null;
}, "yn");
var ht = /* @__PURE__ */ __name2((t, e) => {
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
}, "ht");
var Sn = /* @__PURE__ */ __name2((t) => ht(t, decodeURI), "Sn");
var Lt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return Sn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "Lt");
var En = /* @__PURE__ */ __name2((t) => {
  const e = Lt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "En");
var Te = /* @__PURE__ */ __name2((t, e, ...n) => (n.length && (e = Te(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "Te");
var Ht = /* @__PURE__ */ __name2((t) => {
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
}, "Ht");
var it = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? ht(t, Bt) : t) : t, "it");
var Dt = /* @__PURE__ */ __name2((t, e, n) => {
  let r;
  if (!n && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const c = a + e.length + 2, l = t.indexOf("&", c);
        return it(t.slice(c, l === -1 ? void 0 : l));
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
    if (r && (c = it(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), r && (l = it(l))), n ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return e ? s[e] : s;
}, "Dt");
var On = Dt;
var $n = /* @__PURE__ */ __name2((t, e) => Dt(t, e, true), "$n");
var Bt = decodeURIComponent;
var gt = /* @__PURE__ */ __name2((t) => ht(t, Bt), "gt");
var Re;
var X;
var oe;
var Ft;
var Gt;
var dt;
var le;
var Rt;
var qt = (Rt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", n = [[]]) {
    N(this, oe);
    C(this, "raw");
    N(this, Re);
    N(this, X);
    C(this, "routeIndex", 0);
    C(this, "path");
    C(this, "bodyCache", {});
    N(this, le, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, $(this, X, n), $(this, Re, {});
  }
  param(t) {
    return t ? I(this, oe, Ft).call(this, t) : I(this, oe, Gt).call(this);
  }
  query(t) {
    return On(this.url, t);
  }
  queries(t) {
    return $n(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await fn(this, t));
  }
  json() {
    return d(this, le).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, le).call(this, "text");
  }
  arrayBuffer() {
    return d(this, le).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, le).call(this, "blob");
  }
  formData() {
    return d(this, le).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, Re)[t] = e;
  }
  valid(t) {
    return d(this, Re)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [hn]() {
    return d(this, X);
  }
  get matchedRoutes() {
    return d(this, X)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, X)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "Rt"), Re = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakSet(), Ft = /* @__PURE__ */ __name2(function(t) {
  const e = d(this, X)[0][this.routeIndex][1][t], n = I(this, oe, dt).call(this, e);
  return n && /\%/.test(n) ? gt(n) : n;
}, "Ft"), Gt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(d(this, X)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = I(this, oe, dt).call(this, d(this, X)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? gt(r) : r);
  }
  return t;
}, "Gt"), dt = /* @__PURE__ */ __name2(function(t) {
  return d(this, X)[1] ? d(this, X)[1][t] : t;
}, "dt"), le = /* @__PURE__ */ new WeakMap(), Rt);
var Cn = { Stringify: 1 };
var Kt = /* @__PURE__ */ __name2(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Kt(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Kt");
var Tn = "text/plain; charset=UTF-8";
var at = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "at");
var qe;
var Fe;
var re;
var je;
var se;
var V;
var Ge;
var Ne;
var Me;
var ve;
var Ke;
var Ue;
var de;
var Ae;
var jt;
var An = (jt = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    N(this, de);
    N(this, qe);
    N(this, Fe);
    C(this, "env", {});
    N(this, re);
    C(this, "finalized", false);
    C(this, "error");
    N(this, je);
    N(this, se);
    N(this, V);
    N(this, Ge);
    N(this, Ne);
    N(this, Me);
    N(this, ve);
    N(this, Ke);
    N(this, Ue);
    C(this, "render", (...t2) => (d(this, Ne) ?? $(this, Ne, (e2) => this.html(e2)), d(this, Ne).call(this, ...t2)));
    C(this, "setLayout", (t2) => $(this, Ge, t2));
    C(this, "getLayout", () => d(this, Ge));
    C(this, "setRenderer", (t2) => {
      $(this, Ne, t2);
    });
    C(this, "header", (t2, e2, n) => {
      this.finalized && $(this, V, new Response(d(this, V).body, d(this, V)));
      const r = d(this, V) ? d(this, V).headers : d(this, ve) ?? $(this, ve, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    C(this, "status", (t2) => {
      $(this, je, t2);
    });
    C(this, "set", (t2, e2) => {
      d(this, re) ?? $(this, re, /* @__PURE__ */ new Map()), d(this, re).set(t2, e2);
    });
    C(this, "get", (t2) => d(this, re) ? d(this, re).get(t2) : void 0);
    C(this, "newResponse", (...t2) => I(this, de, Ae).call(this, ...t2));
    C(this, "body", (t2, e2, n) => I(this, de, Ae).call(this, t2, e2, n));
    C(this, "text", (t2, e2, n) => !d(this, ve) && !d(this, je) && !e2 && !n && !this.finalized ? new Response(t2) : I(this, de, Ae).call(this, t2, e2, at(Tn, n)));
    C(this, "json", (t2, e2, n) => I(this, de, Ae).call(this, JSON.stringify(t2), e2, at("application/json", n)));
    C(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name2((s) => I(this, de, Ae).call(this, s, e2, at("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? Kt(t2, Cn.Stringify, false, {}).then(r) : r(t2);
    });
    C(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    C(this, "notFound", () => (d(this, Me) ?? $(this, Me, () => new Response()), d(this, Me).call(this, this)));
    $(this, qe, t), e && ($(this, se, e.executionCtx), this.env = e.env, $(this, Me, e.notFoundHandler), $(this, Ue, e.path), $(this, Ke, e.matchResult));
  }
  get req() {
    return d(this, Fe) ?? $(this, Fe, new qt(d(this, qe), d(this, Ue), d(this, Ke))), d(this, Fe);
  }
  get event() {
    if (d(this, se) && "respondWith" in d(this, se))
      return d(this, se);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, se))
      return d(this, se);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, V) || $(this, V, new Response(null, { headers: d(this, ve) ?? $(this, ve, new Headers()) }));
  }
  set res(t) {
    if (d(this, V) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of d(this, V).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const r = d(this, V).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of r)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, n);
    }
    $(this, V, t), this.finalized = true;
  }
  get var() {
    return d(this, re) ? Object.fromEntries(d(this, re)) : {};
  }
}, "jt"), qe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakSet(), Ae = /* @__PURE__ */ __name2(function(t, e, n) {
  const r = d(this, V) ? new Headers(d(this, V).headers) : d(this, ve) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, je);
  return new Response(t, { status: s, headers: r });
}, "Ae"), jt);
var K = "ALL";
var _n = "all";
var Rn = ["get", "post", "put", "delete", "options", "patch"];
var Ut = "Can not add a route since the matcher is already built.";
var zt = /* @__PURE__ */ __name2(class extends Error {
}, "zt");
var jn = "__COMPOSED_HANDLER";
var Nn = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "Nn");
var xt = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "xt");
var Q;
var U;
var Jt;
var Z;
var ge;
var Ye;
var Ve;
var ke;
var Mn = (ke = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    N(this, U);
    C(this, "get");
    C(this, "post");
    C(this, "put");
    C(this, "delete");
    C(this, "options");
    C(this, "patch");
    C(this, "all");
    C(this, "on");
    C(this, "use");
    C(this, "router");
    C(this, "getPath");
    C(this, "_basePath", "/");
    N(this, Q, "/");
    C(this, "routes", []);
    N(this, Z, Nn);
    C(this, "errorHandler", xt);
    C(this, "onError", (e2) => (this.errorHandler = e2, this));
    C(this, "notFound", (e2) => ($(this, Z, e2), this));
    C(this, "fetch", (e2, ...n) => I(this, U, Ve).call(this, e2, n[1], n[0], e2.method));
    C(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${Te("/", e2)}`, n), r2, s2)));
    C(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(I(this, U, Ve).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...Rn, _n].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? $(this, Q, a) : I(this, U, ge).call(this, i, d(this, Q), a), o.forEach((c) => {
        I(this, U, ge).call(this, i, d(this, Q), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        $(this, Q, c);
        for (const l of [i].flat())
          o.map((u) => {
            I(this, U, ge).call(this, l.toUpperCase(), d(this, Q), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? $(this, Q, i) : ($(this, Q, "*"), a.unshift(i)), a.forEach((o) => {
      I(this, U, ge).call(this, K, d(this, Q), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? Lt : En;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === xt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, c) => (await mt([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[jn] = s.handler), I(a = r, U, ge).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = I(this, U, Jt).call(this);
    return n._basePath = Te(this._basePath, e), n;
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
      const c = Te(this._basePath, e), l = c === "/" ? 0 : c.length;
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
    return I(this, U, ge).call(this, K, Te(e, "*"), o), this;
  }
}, "ke"), Q = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), Jt = /* @__PURE__ */ __name2(function() {
  const e = new ke({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, $(e, Z, d(this, Z)), e.routes = this.routes, e;
}, "Jt"), Z = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ __name2(function(e, n, r) {
  e = e.toUpperCase(), n = Te(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "ge"), Ye = /* @__PURE__ */ __name2(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "Ye"), Ve = /* @__PURE__ */ __name2(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await I(this, U, Ve).call(this, e, n, r, "GET")))();
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new An(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: d(this, Z) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, Z).call(this, o);
      });
    } catch (u) {
      return I(this, U, Ye).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, Z).call(this, o))).catch((u) => I(this, U, Ye).call(this, u, o)) : l ?? d(this, Z).call(this, o);
  }
  const c = mt(a[0], this.errorHandler, d(this, Z));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return I(this, U, Ye).call(this, l, o);
    }
  })();
}, "Ve"), ke);
var Yt = [];
function kn(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name2((s, i) => {
    const a = n[s] || n[K], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Yt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(kn, "kn");
__name2(kn, "kn");
var Ze = "[^/]+";
var De = ".*";
var Be = "(?:|/.*)";
var _e = Symbol();
var In = new Set(".\\+*[^]$()");
function Pn(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === De || t === Be ? 1 : e === De || e === Be ? -1 : t === Ze ? 1 : e === Ze ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Pn, "Pn");
__name2(Pn, "Pn");
var be;
var we;
var ee;
var Oe;
var Ln = (Oe = /* @__PURE__ */ __name2(class {
  constructor() {
    N(this, be);
    N(this, we);
    N(this, ee, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (d(this, be) !== void 0)
        throw _e;
      if (i)
        return;
      $(this, be, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", De] : ["", "", Ze] : a === "/*" ? ["", "", Be] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Ze;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw _e;
      if (l = d(this, ee)[h], !l) {
        if (Object.keys(d(this, ee)).some((b) => b !== De && b !== Be))
          throw _e;
        if (i)
          return;
        l = d(this, ee)[h] = new Oe(), u !== "" && $(l, we, s.varIndex++);
      }
      !i && u !== "" && r.push([u, d(l, we)]);
    } else if (l = d(this, ee)[a], !l) {
      if (Object.keys(d(this, ee)).some((u) => u.length > 1 && u !== De && u !== Be))
        throw _e;
      if (i)
        return;
      l = d(this, ee)[a] = new Oe();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, ee)).sort(Pn).map((r) => {
      const s = d(this, ee)[r];
      return (typeof d(s, we) == "number" ? `(${r})@${d(s, we)}` : In.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, be) == "number" && n.unshift(`#${d(this, be)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "Oe"), be = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), Oe);
var tt;
var ze;
var Nt;
var Hn = (Nt = /* @__PURE__ */ __name2(class {
  constructor() {
    N(this, tt, { varIndex: 0 });
    N(this, ze, new Ln());
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
    return d(this, ze).insert(i, e, r, d(this, tt), n), r;
  }
  buildRegExp() {
    let t = d(this, ze).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "Nt"), tt = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Nt);
var Dn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var We = /* @__PURE__ */ Object.create(null);
function Vt(t) {
  return We[t] ?? (We[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
function Bn() {
  We = /* @__PURE__ */ Object.create(null);
}
__name(Bn, "Bn");
__name2(Bn, "Bn");
function qn(t) {
  var l;
  const e = new Hn(), n = [];
  if (t.length === 0)
    return Dn;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [b, w]) => u ? 1 : b ? -1 : h.length - w.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, b = r.length; u < b; u++) {
    const [w, M, P] = r[u];
    w ? s[M] = [P.map(([H]) => [H, /* @__PURE__ */ Object.create(null)]), Yt] : h++;
    let A;
    try {
      A = e.insert(M, h, w);
    } catch (H) {
      throw H === _e ? new zt(M) : H;
    }
    w || (n[h] = P.map(([H, m]) => {
      const y = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [k, j] = A[m];
        y[k] = j;
      }
      return [H, y];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let b = 0, w = n[u].length; b < w; b++) {
      const M = (l = n[u][b]) == null ? void 0 : l[1];
      if (!M)
        continue;
      const P = Object.keys(M);
      for (let A = 0, H = P.length; A < H; A++)
        M[P[A]] = o[M[P[A]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, s];
}
__name(qn, "qn");
__name2(qn, "qn");
function Ce(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Vt(n).test(e))
        return [...t[n]];
  }
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
var ue;
var he;
var nt;
var Wt;
var Mt;
var Fn = (Mt = /* @__PURE__ */ __name2(class {
  constructor() {
    N(this, nt);
    C(this, "name", "RegExpRouter");
    N(this, ue);
    N(this, he);
    C(this, "match", kn);
    $(this, ue, { [K]: /* @__PURE__ */ Object.create(null) }), $(this, he, { [K]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, ue), s = d(this, he);
    if (!r || !s)
      throw new Error(Ut);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[K]).forEach((l) => {
        c[t][l] = [...c[K][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Vt(e);
      t === K ? Object.keys(r).forEach((l) => {
        var u;
        (u = r[l])[e] || (u[e] = Ce(r[l], e) || Ce(r[K], e) || []);
      }) : (o = r[t])[e] || (o[e] = Ce(r[t], e) || Ce(r[K], e) || []), Object.keys(r).forEach((l) => {
        (t === K || t === l) && Object.keys(r[l]).forEach((u) => {
          c.test(u) && r[l][u].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === K || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([n, i]));
      });
      return;
    }
    const a = Ht(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var b;
        (t === K || t === h) && ((b = s[h])[u] || (b[u] = [...Ce(r[h], u) || Ce(r[K], u) || []]), s[h][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, he)).concat(Object.keys(d(this, ue))).forEach((e) => {
      t[e] || (t[e] = I(this, nt, Wt).call(this, e));
    }), $(this, ue, $(this, he, void 0)), Bn(), t;
  }
}, "Mt"), ue = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakSet(), Wt = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let n = t === K;
  return [d(this, ue), d(this, he)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== K && e.push(...Object.keys(r[K]).map((i) => [i, r[K][i]]));
  }), n ? qn(e) : null;
}, "Wt"), Mt);
var fe;
var ie;
var kt;
var Gn = (kt = /* @__PURE__ */ __name2(class {
  constructor(t) {
    C(this, "name", "SmartRouter");
    N(this, fe, []);
    N(this, ie, []);
    $(this, fe, t.routers);
  }
  add(t, e, n) {
    if (!d(this, ie))
      throw new Error(Ut);
    d(this, ie).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, ie))
      throw new Error("Fatal error");
    const n = d(this, fe), r = d(this, ie), s = n.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = r.length; c < l; c++)
          o.add(...r[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof zt)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), $(this, fe, [o]), $(this, ie, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, ie) || d(this, fe).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, fe)[0];
  }
}, "kt"), fe = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), kt);
var Le = /* @__PURE__ */ Object.create(null);
var pe;
var Y;
var ye;
var Ie;
var z;
var ae;
var xe;
var Pe;
var Kn = (Pe = /* @__PURE__ */ __name2(class {
  constructor(e, n, r) {
    N(this, ae);
    N(this, pe);
    N(this, Y);
    N(this, ye);
    N(this, Ie, 0);
    N(this, z, Le);
    if ($(this, Y, r || /* @__PURE__ */ Object.create(null)), $(this, pe, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, $(this, pe, [s]);
    }
    $(this, ye, []);
  }
  insert(e, n, r) {
    $(this, Ie, ++pt(this, Ie)._);
    let s = this;
    const i = vn(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = yn(l, u), b = Array.isArray(h) ? h[0] : l;
      if (b in d(s, Y)) {
        s = d(s, Y)[b], h && a.push(h[1]);
        continue;
      }
      d(s, Y)[b] = new Pe(), h && (d(s, ye).push(h), a.push(h[1])), s = d(s, Y)[b];
    }
    return d(s, pe).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, Ie) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    $(this, z, Le);
    let i = [this];
    const a = Pt(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], b = l === u - 1, w = [];
      for (let M = 0, P = i.length; M < P; M++) {
        const A = i[M], H = d(A, Y)[h];
        H && ($(H, z, d(A, z)), b ? (d(H, Y)["*"] && r.push(...I(this, ae, xe).call(this, d(H, Y)["*"], e, d(A, z))), r.push(...I(this, ae, xe).call(this, H, e, d(A, z)))) : w.push(H));
        for (let m = 0, y = d(A, ye).length; m < y; m++) {
          const k = d(A, ye)[m], j = d(A, z) === Le ? {} : { ...d(A, z) };
          if (k === "*") {
            const O = d(A, Y)["*"];
            O && (r.push(...I(this, ae, xe).call(this, O, e, d(A, z))), $(O, z, j), w.push(O));
            continue;
          }
          const [S, v, g] = k;
          if (!h && !(g instanceof RegExp))
            continue;
          const f = d(A, Y)[S], x = a.slice(l).join("/");
          if (g instanceof RegExp) {
            const O = g.exec(x);
            if (O) {
              if (j[v] = O[0], r.push(...I(this, ae, xe).call(this, f, e, d(A, z), j)), Object.keys(d(f, Y)).length) {
                $(f, z, j);
                const p = ((c = O[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (g === true || g.test(h)) && (j[v] = h, b ? (r.push(...I(this, ae, xe).call(this, f, e, j, d(A, z))), d(f, Y)["*"] && r.push(...I(this, ae, xe).call(this, d(f, Y)["*"], e, j, d(A, z)))) : ($(f, z, j), w.push(f)));
        }
      }
      i = w.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, u) => l.score - u.score), [r.map(({ handler: l, params: u }) => [l, u])];
  }
}, "Pe"), pe = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), xe = /* @__PURE__ */ __name2(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = d(e, pe).length; a < o; a++) {
    const c = d(e, pe)[a], l = c[n] || c[K], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== Le || s && s !== Le))
      for (let h = 0, b = l.possibleKeys.length; h < b; h++) {
        const w = l.possibleKeys[h], M = u[l.score];
        l.params[w] = s != null && s[w] && !M ? s[w] : r[w] ?? (s == null ? void 0 : s[w]), u[l.score] = true;
      }
  }
  return i;
}, "xe"), Pe);
var Se;
var It;
var Un = (It = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, "name", "TrieRouter");
    N(this, Se);
    $(this, Se, new Kn());
  }
  add(t, e, n) {
    const r = Ht(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        d(this, Se).insert(t, r[s], n);
      return;
    }
    d(this, Se).insert(t, e, n);
  }
  match(t, e) {
    return d(this, Se).search(t, e);
  }
}, "It"), Se = /* @__PURE__ */ new WeakMap(), It);
var Xt = /* @__PURE__ */ __name2(class extends Mn {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Gn({ routers: [new Fn(), new Un()] });
  }
}, "Xt");
var zn = /* @__PURE__ */ __name2((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, b) {
      a.res.headers.set(h, b);
    }
    __name(c, "c");
    __name2(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let b = n.allowHeaders;
      if (!(b != null && b.length)) {
        const w = a.req.header("Access-Control-Request-Headers");
        w && (b = w.split(/\s*,\s*/));
      }
      return b != null && b.length && (c("Access-Control-Allow-Headers", b.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "zn");
var Jn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var vt = /* @__PURE__ */ __name2((t, e = Vn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "vt");
var Yn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Vn = Yn;
var Wn = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Wn");
var Qt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Xn = Object.keys(Qt);
var Qn = "index.html";
var Zn = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Wn;
  return async (s, i) => {
    var u, h, b, w;
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
    t.isDir && await t.isDir(o) && (o = r(o, Qn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const M = t.mimes && vt(o, t.mimes) || vt(o);
      if (s.header("Content-Type", M || "application/octet-stream"), t.precompressed && (!M || Jn.test(M))) {
        const P = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((A) => A.trim()));
        for (const A of Xn) {
          if (!P.has(A))
            continue;
          const H = await c(o + Qt[A], s);
          if (H) {
            l = H, s.header("Content-Encoding", A), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((b = t.onFound) == null ? void 0 : b.call(t, o, s)), s.body(l);
    }
    await ((w = t.onNotFound) == null ? void 0 : w.call(t, o, s)), await i();
  };
}, "Zn");
var er = /* @__PURE__ */ __name2(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "er");
var tr = /* @__PURE__ */ __name2((t) => async function(n, r) {
  return Zn({ ...t, getContent: async (i) => er(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "tr");
var nr = /* @__PURE__ */ __name2((t) => tr(t), "nr");
var ne = new Xt();
var Xe = /* @__PURE__ */ new Map();
var rr = 1e3 * 60 * 60 * 24 * 7;
var ot = false;
function Zt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Zt, "Zt");
__name2(Zt, "Zt");
function J(t) {
  return t == null ? "" : String(t);
}
__name(J, "J");
__name2(J, "J");
function Ee(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function ut(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(ut, "ut");
__name2(ut, "ut");
function te(t) {
  return ut(t).length;
}
__name(te, "te");
__name2(te, "te");
var bt = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } };
var wt = { brief: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBC29\uBC95", "\uD575\uC2EC \uACB0\uB860"], standard: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uBC29\uBC95", "\uC8FC\uC694 \uACB0\uACFC", "\uACB0\uB860"], detail: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uB300\uC0C1", "\uC5F0\uAD6C \uC808\uCC28", "\uACB0\uACFC", "\uD574\uC11D", "\uAD50\uC721\uC801 \uC758\uC758"] };
function en(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(en, "en");
__name2(en, "en");
var sr = ["DLPFC", "VLPFC", "OFC", "ACC", "PFC", "vmPFC", "dmPFC", "\uC804\uB450\uC5FD", "\uCE21\uB450\uC5FD", "\uB450\uC815\uC5FD", "\uD6C4\uB450\uC5FD", "\uD3B8\uB3C4\uCCB4", "\uD574\uB9C8"];
function ct(t, e) {
  if (e === "brief") {
    for (const s of sr)
      if (t.includes(s))
        return { valid: false, error: `\uAC04\uB2E8\uC694\uC57D\uC5D0 \uC138\uBD80 \uB1CC\uC601\uC5ED(${s}) \uB2E8\uB3C5 \uB4F1\uC7A5 \uAE08\uC9C0. \uC77C\uBC18\uC801 \uC124\uBA85\uB9CC \uD3EC\uD568\uD558\uC138\uC694.` };
  }
  const n = wt[e] || wt.standard, r = [];
  for (const s of n)
    s.split(" ").some((o) => t.includes(o)) || r.push(s);
  return r.length > 0 ? { valid: false, error: `\uD544\uC218 \uC694\uC18C \uB204\uB77D: ${r.join(", ")}. \uC774 \uD56D\uBAA9\uB4E4\uC744 \uBC18\uB4DC\uC2DC \uD3EC\uD568\uD558\uC138\uC694.` } : { valid: true };
}
__name(ct, "ct");
__name2(ct, "ct");
function ir(t) {
  return bt[t] || bt.standard;
}
__name(ir, "ir");
__name2(ir, "ir");
function Qe(t, e) {
  const n = Math.max(50, te(t)), { min: r, max: s } = ir(e);
  return { base: n, min: Math.floor(n * r), max: Math.ceil(n * s) };
}
__name(Qe, "Qe");
__name2(Qe, "Qe");
function tn(t) {
  const e = J(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(tn, "tn");
__name2(tn, "tn");
function nn(t) {
  const e = J(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(nn, "nn");
__name2(nn, "nn");
function ar(t) {
  const e = J(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(ar, "ar");
__name2(ar, "ar");
function rn(t) {
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
__name(rn, "rn");
__name2(rn, "rn");
var or = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var cr = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function lr(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    let r = false;
    for (const s of cr)
      if (s.has(n)) {
        e.add(Array.from(s)[0]), r = true;
        break;
      }
    r || e.add(n);
  }
  return e;
}
__name(lr, "lr");
__name2(lr, "lr");
function et(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !or.has(e));
}
__name(et, "et");
__name2(et, "et");
function dr(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t)
    for (const s of et(r))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((r, s) => {
    const i = et(r);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = r.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: r, score: a * c };
  });
}
__name(dr, "dr");
__name2(dr, "dr");
function ur(t, e) {
  return dr(t).slice().sort((s, i) => i.score - s.score).slice(0, Ee(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(ur, "ur");
__name2(ur, "ur");
function sn(t) {
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
__name(sn, "sn");
__name2(sn, "sn");
function an(t) {
  const e = Math.max(200, te(t)), n = Qe(t, "brief"), r = Qe(t, "standard"), s = Qe(t, "detail"), i = Ee(n.min + Math.round((n.max - n.min) * 0.5), n.min, n.max), a = Ee(Math.max(r.min, i + 40), r.min, r.max), o = Ee(Math.max(s.min, a + 120), s.min, s.max);
  return { base: e, brief: i, standard: a, detail: o };
}
__name(an, "an");
__name2(an, "an");
function hr(t) {
  const e = an(t);
  return `
\uB2F9\uC2E0\uC740 \uD559\uC220 \uB17C\uBB38\uC744 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C "\uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization)" \uBC29\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB294 \uC804\uBB38 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.

[\uC785\uB825 \uC6D0\uBB38 - \uD559\uC220 \uB17C\uBB38]
"""${en(t)}"""

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
__name(hr, "hr");
__name2(hr, "hr");
var fr = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function yt(t) {
  const e = { definition: 0, meaning: 0, activity: 0 };
  for (const [r, s] of Object.entries(fr))
    for (const i of s)
      t.includes(i) && e[r]++;
  const n = Math.max(e.definition, e.meaning, e.activity);
  return n === 0 ? null : e.definition === n ? "definition" : e.meaning === n ? "meaning" : "activity";
}
__name(yt, "yt");
__name2(yt, "yt");
function St(t) {
  const e = t.match(/^([가-힣\s]+?)(은|는|이|가|을|를|에|의|도|만|부터|까지|와|과|으로|로)\s/);
  return e ? e[1].trim() : "";
}
__name(St, "St");
__name2(St, "St");
function pr(t, e) {
  const n = St(t), r = St(e);
  return !n || !r ? false : n === r ? true : n.length >= 3 && r.length >= 3 ? n.includes(r) || r.includes(n) : false;
}
__name(pr, "pr");
__name2(pr, "pr");
function mr(t) {
  return t.replace(/^([가-힣\s]+?)(은|는|이|가)\s+/, "").trim();
}
__name(mr, "mr");
__name2(mr, "mr");
function Et(t) {
  let e = t;
  return e = e.replace(/하였다/g, "\uD55C\uB2E4"), e = e.replace(/되었다/g, "\uB41C\uB2E4"), e = e.replace(/이었다/g, "\uC774\uB2E4"), e = e.replace(/\s*것입니다\./g, " \uAC83\uC774\uB2E4."), e = e.replace(/\s*것이었다\./g, " \uAC83\uC774\uB2E4."), e;
}
__name(Et, "Et");
__name2(Et, "Et");
function Ot(t) {
  if (t.length === 0)
    return "";
  if (t.length === 1)
    return t[0];
  const e = [];
  e.push(t[0]);
  for (let n = 1; n < t.length; n++) {
    const r = t[n - 1], s = t[n];
    if (pr(r, s)) {
      const i = mr(s);
      e.push(`\uB610\uD55C ${i}`);
    } else
      e.push(s);
  }
  return e.join(" ");
}
__name(Ot, "Ot");
__name2(Ot, "Ot");
function gr(t, e, n) {
  const r = te(e), s = [], i = /* @__PURE__ */ new Set(), a = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = a.exec(e)) !== null; )
    i.add(o[1]);
  for (const m of t) {
    const y = [];
    let k;
    const j = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (k = j.exec(m)) !== null; ) {
      const g = k[1];
      i.has(g) && y.push(g);
    }
    let S = m.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (S.length < 10)
      continue;
    const v = et(S).slice(0, 8);
    s.push({ original: m, clean: S, keywords: v, citations: y }), S.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", S.slice(0, 100));
  }
  if (s.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const c = /* @__PURE__ */ new Map();
  for (const m of s)
    for (const y of m.keywords)
      c.set(y, (c.get(y) || 0) + 1);
  const l = [];
  for (const m of s) {
    new Set(m.keywords);
    let y = false;
    for (const k of l)
      if (m.keywords.filter((S) => k.keywords.has(S)).length >= 2) {
        k.sentences.push({ clean: m.clean, citations: m.citations }), m.keywords.forEach((S) => k.keywords.add(S)), y = true;
        break;
      }
    y || l.push({ keywords: new Set(m.keywords), sentences: [{ clean: m.clean, citations: m.citations }] });
  }
  const u = l.map((m) => {
    const y = m.sentences[0].clean, k = s.findIndex((j) => j.clean === y);
    return { ...m, originalIdx: k };
  });
  let h = "";
  if (n === "brief") {
    const m = { definition: [], meaning: [], activity: [] };
    for (const L of u)
      for (const E of L.sentences) {
        const T = yt(E.clean);
        T && m[T].push(E);
      }
    const y = m.definition[0], k = m.meaning[0], j = m.activity[0], S = [], v = [];
    if (y && (S.push(y.clean), v.push(...y.citations.filter(Boolean))), k && (S.push(k.clean), v.push(...k.citations.filter(Boolean))), j && (S.push(j.clean), v.push(...j.citations.filter(Boolean))), S.length === 0) {
      const E = u.sort((T, R) => R.sentences.length - T.sentences.length)[0].sentences[0];
      S.push(E.clean), v.push(...E.citations.filter(Boolean));
    }
    const g = Array.from(new Set(v)), f = g.length > 0 ? `(${g.join("; ")})` : "", x = S.map((L) => {
      let E = L;
      for (; E.includes("("); )
        E = E.replace(/\([^)]*\)/g, "");
      return E.trim();
    });
    x.length === 1 ? h = `${x[0]}${f}.` : x.length === 2 ? h = `${x[0]}. ${x[1]}${f}.` : h = `${x[0]}\uD558\uBA70 ${x[1]}. ${x[2]}${f}.`;
    const p = te(h) / r * 100;
    if (p > 15) {
      let L = h.slice(0, 60);
      L = L.replace(/\([^)]*\)/g, "").trim(), h = L + (f ? ` ${f}.` : ".");
    }
    const _ = [];
    return y && _.push("definition"), k && _.push("meaning"), j && _.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: _, sentenceCount: S.length, compressionRatio: p.toFixed(1) + "%", passed: p <= 15 }), h = lt(e, h, "brief", t), h;
  }
  if (n === "standard") {
    const m = u.sort((E, T) => T.sentences.length - E.sentences.length).slice(0, 3).sort((E, T) => E.originalIdx - T.originalIdx);
    if (m.length === 1) {
      const E = m[0].sentences[0], T = m[0].sentences.flatMap((G) => G.citations).filter(Boolean), R = T.length > 0 ? `(${T.join("; ")})` : "";
      return `${E.clean}${R}.`;
    }
    const y = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), j = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const E of m)
      for (const T of E.sentences) {
        const R = T.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (R) {
          let [, G, ce] = R;
          G = G.replace(/[에게서로부터]$/g, "").trim(), y.has(G) || y.set(G, []);
          let F = ce.trim();
          F = F.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [q, me] of Object.entries(j))
            if (F.includes(q)) {
              const $e = k.get(q) || 0;
              if (k.set(q, $e + 1), $e >= 1 && me.length > 0) {
                const rt = Math.min($e - 1, me.length - 1);
                F = F.replace(q, me[rt]);
              }
            }
          const D = new Set(et(F)), B = lr(D), W = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const q of W)
            B.delete(q);
          y.get(G).push({ original: F, keywords: B, citations: T.citations });
        }
      }
    const S = [];
    for (const [E, T] of y.entries()) {
      const R = T.flatMap((D) => D.citations).filter(Boolean), G = E.charAt(E.length - 1), F = /[가-힣]/.test(G) && (G.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (T.length === 1) {
        const D = T[0].original, B = (D.match(/,/g) || []).length;
        if (D.length > 80 && B >= 2) {
          const W = D.split(",").map((q) => q.trim()).filter((q) => q.length > 0);
          if (W.length >= 2) {
            S.push({ text: `${E}${F} ${W[0]}`, citations: [] });
            for (let q = 1; q < W.length - 1; q++)
              S.push({ text: `${W[q]}`, citations: [] });
            S.push({ text: `${W[W.length - 1]}`, citations: T[0].citations });
          } else
            S.push({ text: `${E}${F} ${D}`, citations: R });
        } else
          S.push({ text: `${E}${F} ${D}`, citations: R });
      } else {
        const D = [];
        for (const B of T) {
          let W = false;
          for (const q of D) {
            const me = Array.from(B.keywords).filter((rt) => q.keywords.has(rt)).length, $e = Math.max(B.keywords.size, q.keywords.size);
            if ($e > 0 && me / $e >= 0.8) {
              B.original.length > q.original.length && (q.original = B.original, q.keywords = B.keywords), q.citations.push(...B.citations), W = true;
              break;
            }
          }
          W || D.push({ original: B.original, keywords: B.keywords, citations: [...B.citations] });
        }
        if (D.length === 1)
          S.push({ text: `${E}${F} ${D[0].original}`, citations: D.flatMap((B) => B.citations) });
        else if (D.length === 2)
          S.push({ text: `${E}${F} ${D[0].original}`, citations: D[0].citations }), S.push({ text: `${E}${F} ${D[1].original}`, citations: D[1].citations });
        else
          for (let B = 0; B < D.length; B++)
            S.push({ text: `${E}${F} ${D[B].original}`, citations: D[B].citations });
      }
    }
    if (S.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (S.length === 1) {
      const E = S[0].citations.filter(Boolean), T = E.length > 0 ? `(${E.join("; ")})` : "";
      return `${S[0].text}${T}.`;
    }
    if (S.length === 2) {
      const E = S[0].citations.filter(Boolean), T = S[1].citations.filter(Boolean), R = E.length > 0 ? `(${E.join("; ")})` : "", G = T.length > 0 ? `(${T.join("; ")})` : "";
      return `${S[0].text}${R}. ${S[1].text}${G}.`;
    }
    const v = [], g = S[0], f = g.citations.filter(Boolean), x = f.length > 0 ? `(${f.join("; ")})` : "";
    if (v.push(`${g.text}${x}.`), S.length >= 2) {
      const E = S[1], T = E.citations.filter(Boolean), R = T.length > 0 ? `(${T.join("; ")})` : "";
      v.push(`${E.text}${R}.`);
    }
    if (S.length >= 3) {
      const T = S.slice(2).map((R) => {
        const G = R.citations.filter(Boolean), ce = G.length > 0 ? `(${G.join("; ")})` : "";
        return `${R.text}${ce}.`;
      });
      v.push(T.join(" "));
    }
    h = v.join(`

`);
    const O = h.split(new RegExp("(?<=\uB2E4\\.)\\s+")).filter((E) => E.trim().length > 0);
    h = Ot(O), h = Et(h);
    const _ = te(h) / r * 100;
    _ > 30 && (v.length > 3 ? h = v.slice(0, 3).join(`

`) : h = v.join(`

`));
    const L = [];
    for (const E of m)
      for (const T of E.sentences) {
        const R = yt(T.clean);
        R && !L.includes(R) && L.push(R);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: L, sentenceCount: S.length, paragraphCount: v.length, compressionRatio: _.toFixed(1) + "%", passed: _ >= 25 && _ <= 30 }), h = lt(e, h, "standard", t), h;
  }
  const b = u.sort((m, y) => y.sentences.length - m.sentences.length).slice(0, 5).sort((m, y) => m.originalIdx - y.originalIdx);
  let w = b.map((m, y) => {
    const k = m.sentences[0], j = m.sentences.flatMap((v) => v.citations).filter(Boolean), S = j.length > 0 ? `(${j.join("; ")})` : "";
    return y === 0 ? `${k.clean}${S}.` : y === b.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${k.clean}${S}.` : `\uB610\uD55C ${k.clean}${S}.`;
  }).join(" ");
  const M = w.split(new RegExp("(?<=\uB2E4\\.)\\s+")).filter((m) => m.trim().length > 0);
  return w = Ot(M), w = Et(w), te(w) / r * 100 > (n === "brief" ? 15 : n === "standard" ? 30 : 55) && n === "detail" ? b.slice(0, 3).map((y, k) => {
    const j = y.sentences[0], S = y.sentences.flatMap((g) => g.citations).filter(Boolean), v = S.length > 0 ? `(${S.join("; ")})` : "";
    return k === 0 ? `${j.clean}${v}.` : k === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${j.clean}${v}.` : `\uB610\uD55C ${j.clean}${v}.`;
  }).join(" ") : (w = lt(e, w, "detail", t), w);
}
__name(gr, "gr");
__name2(gr, "gr");
function xr(t, e, n) {
  const r = rn(t), s = e === "brief" ? Ee(Math.round(r.length * 0.18), 2, 4) : e === "standard" ? Ee(Math.round(r.length * 0.28), 4, 8) : Ee(Math.round(r.length * 0.4), 7, 14), i = ur(r, s);
  if (n === "narrative") {
    let o = gr(i, t, e);
    return o = sn(o), { kind: "summary", mode: e, viewType: n, narrative: o };
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
__name(xr, "xr");
__name2(xr, "xr");
function on(t) {
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
__name(on, "on");
__name2(on, "on");
function vr(t, e, n, r) {
  const s = on(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(vr, "vr");
__name2(vr, "vr");
function br(t, e, n, r, s) {
  const i = on(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(br, "br");
__name2(br, "br");
async function wr(t) {
  if (!ot) {
    if (!t) {
      ot = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), ot = true;
  }
}
__name(wr, "wr");
__name2(wr, "wr");
async function $t(t, e) {
  const n = Date.now(), r = Xe.get(e);
  if (r && n - r.createdAt < rr)
    return { hit: true, data: r.data, store: "mem" };
  if (r && Xe.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return Xe.set(e, { data: i, createdAt: n }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name($t, "$t");
__name2($t, "$t");
async function He(t, e, n, r) {
  const s = Date.now();
  Xe.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Zt()).run();
}
__name(He, "He");
__name2(He, "He");
function Ct(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(Ct, "Ct");
__name2(Ct, "Ct");
function Tt(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(Tt, "Tt");
__name2(Tt, "Tt");
function At(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(At, "At");
__name2(At, "At");
async function yr(t, e) {
  var c, l, u, h, b;
  const n = J(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = J(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const w = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (w.ok) {
      const P = await w.json();
      return { ok: true, text: ((b = (h = (u = (l = (c = P == null ? void 0 : P.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : b.text) ?? "", raw: P };
    }
    if (w.status === 429 || w.status === 503) {
      await new Promise((P) => setTimeout(P, o)), o *= 2;
      continue;
    }
    const M = await w.text().catch(() => "");
    throw new Error(`Gemini error ${w.status}: ${M.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(yr, "yr");
__name2(yr, "yr");
async function Sr(t, e, n) {
  var l, u, h, b, w;
  const r = J(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = J(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const M = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (M.ok) {
      const A = await M.json();
      return ((w = (b = (h = (u = (l = A == null ? void 0 : A.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : b[0]) == null ? void 0 : w.text) ?? "";
    }
    if (M.status === 429 || M.status === 503) {
      await new Promise((A) => setTimeout(A, c)), c *= 2;
      continue;
    }
    const P = await M.text().catch(() => "");
    throw new Error(`Gemini error ${M.status}: ${P.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
async function cn(t, e) {
  const n = await yr(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(cn, "cn");
__name2(cn, "cn");
async function Er(t, e) {
  const n = hr(e);
  for (let r = 1; r <= 2; r++)
    try {
      let i = (await cn(t, n) || "").trim();
      i.startsWith("```") && (i = i.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
      const a = JSON.parse(i);
      if (!(a != null && a.brief) || !(a != null && a.standard) || !(a != null && a.detail))
        throw new Error("Missing required fields");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing detail fields");
      const o = te(a.brief), c = te(a.standard), l = te(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      (o >= c || c >= l) && console.warn("[SummaryJSON] monotonic violated", { bLen: o, sLen: c, dLen: l, attempt: r });
      const u = ct(a.brief, "brief"), h = ct(a.standard, "standard"), b = a.detail.\uAC1C\uB150 + " " + a.detail.\uC601\uD5A5 + " " + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"], w = ct(b, "detail");
      if (!u.valid && (console.warn("[SummaryJSON] brief validation failed:", u.error), r === 1))
        throw new Error(`Brief validation: ${u.error}`);
      if (!h.valid && (console.warn("[SummaryJSON] standard validation failed:", h.error), r === 1))
        throw new Error(`Standard validation: ${h.error}`);
      if (!w.valid && (console.warn("[SummaryJSON] detail validation failed:", w.error), r === 1))
        throw new Error(`Detail validation: ${w.error}`);
      return a;
    } catch (s) {
      if (console.error("[SummaryJSON] attempt failed", r, s == null ? void 0 : s.message), r === 2) {
        const i = an(e);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", standard: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", detail: { \uAC1C\uB150: "[\uC2E4\uD328]", \uC601\uD5A5: "[\uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uC2E4\uD328]" } };
      }
    }
  throw new Error("summarizeWithJSON failed");
}
__name(Er, "Er");
__name2(Er, "Er");
function lt(t, e, n, r) {
  const { min: s, max: i } = Qe(t, n);
  let a = (e || "").trim();
  const o = /* @__PURE__ */ __name2(() => te(a), "o"), c = /* @__PURE__ */ __name2(() => {
    a = sn(a), a = a.replace(/\s{2,}/g, " ").trim();
  }, "c");
  if (c(), o() > i) {
    const l = rn(a);
    for (; l.length > 1 && te(l.join(" ")) > i; )
      l.pop();
    a = l.join(" "), c();
  }
  if (o() < s) {
    const l = (r || []).map((u) => u.trim()).filter(Boolean);
    for (const u of l) {
      if (o() >= s)
        break;
      const h = ut(u).slice(0, 24);
      if (!(h && ut(a).includes(h)) && (a = (a ? a + " " : "") + u.replace(/[\.。\?\!]+$/g, "") + ".", c(), o() > i))
        break;
    }
  }
  return a;
}
__name(lt, "lt");
__name2(lt, "lt");
var Or = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(v) {
    return (v || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(v, g) {
    const x = Math.max(200, i(v || "").length), O = e[g] || e.standard, p = Math.floor(x * O.min), _ = Math.ceil(x * O.max);
    return { base: x, min: Math.max(80, p), max: Math.max(120, _) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(v) {
    const g = (v || "").trim();
    return g ? g.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((x) => x.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function c(v) {
    return o(v).map((f, x) => ({ sid: `S${x + 1}`, text: f }));
  }
  __name(c, "c");
  __name2(c, "c");
  function l(v, g, f) {
    const x = v.find((O) => O.sid === g);
    return !x || !f || typeof f != "string" ? false : x.text.includes(f.trim());
  }
  __name(l, "l");
  __name2(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  __name2(u, "u");
  function h({ originalText: v, mode: g, format: f }) {
    const x = a(v, g), O = en(v), p = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${g} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${x.min}\uC790 ~ \uCD5C\uB300 ${x.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", O].join(`
`);
  }
  __name(h, "h");
  __name2(h, "h");
  function b({ summaryText: v, format: g }) {
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
  __name(b, "b");
  __name2(b, "b");
  function w({ mode: v, purpose: g, format: f, summaryText: x, sentTable: O, anchors: p }) {
    const _ = n[v] || 10, L = g === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", E = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${v} (\uBB38\uD56D\uC218 ${_})`, `- \uBAA9\uC801: ${g} (${L})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${E})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(O, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", x].join(`
`);
  }
  __name(w, "w");
  __name2(w, "w");
  function M(v, g) {
    const f = g && g.anchors ? g.anchors : [], x = [], O = [];
    for (const p of f) {
      const _ = p == null ? void 0 : p.sid, L = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        O.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(v, _, L)) {
        O.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      x.push(p);
    }
    return { ok: x, bad: O };
  }
  __name(M, "M");
  __name2(M, "M");
  function P(v, g) {
    const f = g && Array.isArray(g.items) ? g.items : [], x = [], O = [];
    for (const p of f) {
      const _ = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(_ != null && _.sid) || !(_ != null && _.quote)) {
        O.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(v, _.sid, _.quote)) {
        O.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        O.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      x.push(p);
    }
    return { ok: x, bad: O };
  }
  __name(P, "P");
  __name2(P, "P");
  function A({ summaryText: v, sentTable: g, anchors: f, badItems: x, mode: O, purpose: p, format: _ }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${x.length}`, `- \uBAA8\uB4DC: ${O}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${_}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(g, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(x, null, 2), "", "[SUMMARY]", v].join(`
`);
  }
  __name(A, "A");
  __name2(A, "A");
  async function H({ llmCall: v, originalText: g, mode: f, format: x }) {
    if (!v)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), r.includes(x) || (x = "narrative");
    const O = h({ originalText: g, mode: f, format: x }), p = (await v({ system: u(), user: O, json: false }) || "").trim() || "", _ = c(p), L = b({ summaryText: p, format: x });
    let E = await v({ system: u(), user: L, json: true }), T;
    try {
      T = JSON.parse(E);
    } catch {
      T = { anchors: [] };
    }
    const { ok: R } = M(_, T), G = R.length >= 4 ? R : m(_);
    return { summaryText: p, sentTable: _, anchors: G };
  }
  __name(H, "H");
  __name2(H, "H");
  function m(v) {
    const g = [];
    for (let f = 0; f < Math.min(8, v.length); f++) {
      const x = v[f], O = (x.text || "").slice(0, 18);
      g.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: x.sid, quote: O, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return g;
  }
  __name(m, "m");
  __name2(m, "m");
  async function y({ llmCall: v, mode: g, purpose: f, format: x, summaryText: O, sentTable: p, anchors: _ }) {
    e[g] || (g = "standard"), s.includes(f) || (f = "preview"), r.includes(x) || (x = "narrative");
    const L = w({ mode: g, purpose: f, format: x, summaryText: O, sentTable: p, anchors: _ });
    let E = await v({ system: u(), user: L, json: true }), T;
    try {
      T = JSON.parse(E);
    } catch {
      T = { items: [] };
    }
    let { ok: R, bad: G } = P(p, T);
    if (G.length > 0) {
      const F = A({ summaryText: O, sentTable: p, anchors: _, badItems: G.map((me) => me.q), mode: g, purpose: f, format: x });
      let D = await v({ system: u(), user: F, json: true }), B;
      try {
        B = JSON.parse(D);
      } catch {
        B = { items: [] };
      }
      const W = P(p, B);
      R = R.concat(W.ok);
      const q = n[g] || 10;
      R = R.slice(0, q);
    } else {
      const F = n[g] || 10;
      R = R.slice(0, F);
    }
    const ce = n[g] || 10;
    if (R.length < ce) {
      const F = k({ sentTable: p, anchors: _, count: ce - R.length, format: x, purpose: f });
      R = R.concat(F).slice(0, ce);
    }
    return { items: R };
  }
  __name(y, "y");
  __name2(y, "y");
  function k({ sentTable: v, anchors: g, count: f, format: x, purpose: O }) {
    const p = [], _ = g.slice(0, Math.max(f, 1));
    for (let L = 0; L < f; L++) {
      const E = _[L % _.length], T = E.sid, R = E.quote;
      p.push({ id: `QF${L + 1}`, type: "short", question: O === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${R}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${R}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: T, quote: R }, anchorIds: [E.id] });
    }
    return p;
  }
  __name(k, "k");
  __name2(k, "k");
  class j {
    constructor(g, { passScore: f = 90 } = {}) {
      this.items = Array.isArray(g) ? g : [], this.passScore = f, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(g, f) {
      if (!g)
        return { ok: false, reason: "no item" };
      const x = g.type;
      if (x === "mcq" || x === "blank" || x === "match" || x === "order" || x === "label" || x === "short") {
        if (x === "short")
          return { ok: true, reason: "short-auto-pass" };
        const O = (g.answer || "").trim(), p = (f || "").trim();
        return { ok: p === O, reason: p === O ? "match" : "mismatch" };
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
        const O = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: O, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const f = this.items.filter((x) => this.state.wrongIds.has(x.id));
          this.items = f.length > 0 ? f : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(j, "j");
  __name2(j, "j");
  async function S({ llmCall: v, originalText: g, mode: f, format: x, purpose: O }) {
    const p = await H({ llmCall: v, originalText: g, mode: f, format: x }), _ = await y({ llmCall: v, mode: f, purpose: O, format: x, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: x, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: O, passScore: 90, items: _.items } };
  }
  __name(S, "S");
  __name2(S, "S");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: H, generateSelfTest: y, runPipeline: S, MasteryRunner: j };
})();
var $r = `/* MindStory Engine Bundle (compat) */
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
ne.use("/api/*", zn());
ne.get("/static/ms-engine-bundle.js", (t) => t.text($r, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
ne.get("/favicon.ico", (t) => t.body(null, 204));
ne.use("/static/*", nr({ root: "./public" }));
ne.get("/", (t) => t.html(`<!DOCTYPE html>
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
ne.get("/api/health", (t) => {
  const e = !!J(t.env.GEMINI_API_KEY).trim(), n = J(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Zt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
ne.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = J((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = tn((n == null ? void 0 : n.mode) || "standard"), i = nn((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = J((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!J(t.env.GEMINI_API_KEY).trim(), c = J(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name2(async ({ system: u, user: h, json: b }) => {
    if (b) {
      const w = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await cn(t.env, w);
    } else
      return (await Sr(t.env, u, h) || "").toString();
  }, "l");
  try {
    const u = await Or.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
ne.post("/api/engine", async (t) => {
  var A, H;
  const e = Date.now(), n = t.env.DB;
  await wr(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = ar(r == null ? void 0 : r.kind), i = J((r == null ? void 0 : r.text) || ""), a = tn((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = nn((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = J(((A = r == null ? void 0 : r.options) == null ? void 0 : A.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = br(s, a, o, i, c || null), u = await $t(n, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = vr(s, a, i, c || null), b = await $t(n, h);
  if (b.hit && ((H = b.data) != null && H.narrative)) {
    const m = b.data.narrative;
    let y;
    return o === "narrative" ? y = { kind: s, mode: a, viewType: o, narrative: m } : o === "structured" ? y = { kind: s, mode: a, ...Ct(m) } : o === "mindmap" ? y = { kind: s, mode: a, ...Tt(m) } : y = { kind: s, mode: a, ...At(m) }, await He(n, l, c || "anon", y), t.json({ ok: true, data: y, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const w = !!J(t.env.GEMINI_API_KEY).trim(), M = J(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && w && !M)
    try {
      const m = await Er(t.env, i);
      let y;
      a === "brief" ? y = m.brief : a === "standard" ? y = m.standard : y = `**\uAC1C\uB150**
${m.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${m.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${m.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`;
      const k = { kind: s, mode: a, viewType: "narrative", narrative: y, allSummaries: { brief: m.brief, standard: m.standard, detail: m.detail }, meta: m.meta };
      await He(n, h, c || "anon", k);
      let j;
      return o === "narrative" ? j = k : o === "structured" ? j = { kind: s, mode: a, ...Ct(y) } : o === "mindmap" ? j = { kind: s, mode: a, ...Tt(y) } : j = { kind: s, mode: a, ...At(y) }, await He(n, l, c || "anon", j), t.json({ ok: true, data: j, meta: { cached: false, engine: "gemini-json-v3", elapsedMs: Date.now() - e } }, 200);
    } catch (m) {
      console.error("[Gemini JSON Error]", m);
    }
  const P = xr(i, a, o);
  if (await He(n, l, c || "anon", P), P.narrative) {
    const m = { kind: "summary", mode: a, viewType: "narrative", narrative: P.narrative };
    await He(n, h, c || "anon", m);
  }
  return t.json({ ok: true, data: P, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
ne.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
ne.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var _t = new Xt();
var Cr = Object.assign({ "/src/index.tsx": ne });
var ln = false;
for (const [, t] of Object.entries(Cr))
  t && (_t.route("/", t), _t.notFound(t.notFoundHandler), ln = true);
if (!ln)
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
var middleware_insertion_facade_default = _t;
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

// .wrangler/tmp/pages-QrEH0P/ntvdfblqv2.js
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

// .wrangler/tmp/bundle-D9JWiZ/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-D9JWiZ/middleware-loader.entry.ts
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
//# sourceMappingURL=ntvdfblqv2.js.map
