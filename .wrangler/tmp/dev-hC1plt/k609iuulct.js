var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-7r8C3I/checked-fetch.js
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

// .wrangler/tmp/bundle-7r8C3I/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-yCtF0e/bundledWorker-0.22148233312384025.mjs
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
var _t = Object.defineProperty;
var Ge = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "Ge");
var Pt = /* @__PURE__ */ __name2((t, e, r) => e in t ? _t(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Pt");
var g = /* @__PURE__ */ __name2((t, e, r) => Pt(t, typeof e != "symbol" ? e + "" : e, r), "g");
var qe = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || Ge("Cannot " + r), "qe");
var l = /* @__PURE__ */ __name2((t, e, r) => (qe(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "l");
var m = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? Ge("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "m");
var p = /* @__PURE__ */ __name2((t, e, r, s) => (qe(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), "p");
var v = /* @__PURE__ */ __name2((t, e, r) => (qe(t, e, "access private method"), r), "v");
var Ve = /* @__PURE__ */ __name2((t, e, r, s) => ({ set _(n) {
  p(t, e, n, r);
}, get _() {
  return l(t, e, s);
} }), "Ve");
var Xe = /* @__PURE__ */ __name2((t, e, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let h, o = false, u;
    if (t[c] ? (u = t[c][0][0], s.req.routeIndex = c) : u = c === t.length && n || void 0, u)
      try {
        h = await u(s, () => a(c + 1));
      } catch (f) {
        if (f instanceof Error && e)
          s.error = f, h = await e(f, s), o = true;
        else
          throw f;
      }
    else
      s.finalized === false && r && (h = await r(s));
    return h && (s.finalized === false || o) && (s.res = h), s;
  }
  __name(a, "a");
  __name2(a, "a");
}, "Xe");
var Ht = Symbol();
var kt = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = e, i = (t instanceof dt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Nt(t, { all: r, dot: s }) : {};
}, "kt");
async function Nt(t, e) {
  const r = await t.formData();
  return r ? It(r, e) : {};
}
__name(Nt, "Nt");
__name2(Nt, "Nt");
function It(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((s, n) => {
    e.all || n.endsWith("[]") ? $t(r, n, s) : r[n] = s;
  }), e.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (Dt(r, s, n), delete r[s]);
  }), r;
}
__name(It, "It");
__name2(It, "It");
var $t = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "$t");
var Dt = /* @__PURE__ */ __name2((t, e, r) => {
  let s = t;
  const n = e.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "Dt");
var ct = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "ct");
var Mt = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = qt(t), s = ct(r);
  return Ft(s, e);
}, "Mt");
var qt = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return e.push([n, r]), n;
  }), { groups: e, path: t };
}, "qt");
var Ft = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [s] = e[r];
    for (let n = t.length - 1; n >= 0; n--)
      if (t[n].includes(s)) {
        t[n] = t[n].replace(s, e[r][1]);
        break;
      }
  }
  return t;
}, "Ft");
var Ce = {};
var Lt = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${t}#${e}`;
    return Ce[s] || (r[2] ? Ce[s] = e && e[0] !== ":" && e[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Ce[s] = [t, r[1], true]), Ce[s];
  }
  return null;
}, "Lt");
var Ke = /* @__PURE__ */ __name2((t, e) => {
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
}, "Ke");
var Bt = /* @__PURE__ */ __name2((t) => Ke(t, decodeURI), "Bt");
var lt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let s = r;
  for (; s < e.length; s++) {
    const n = e.charCodeAt(s);
    if (n === 37) {
      const i = e.indexOf("?", s), a = e.slice(r, i === -1 ? void 0 : i);
      return Bt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63)
      break;
  }
  return e.slice(r, s);
}, "lt");
var zt = /* @__PURE__ */ __name2((t) => {
  const e = lt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "zt");
var ae = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = ae(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ae");
var ht = /* @__PURE__ */ __name2((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), r = [];
  let s = "";
  return e.forEach((n) => {
    if (n !== "" && !/\:/.test(n))
      s += "/" + n;
    else if (/\:/.test(n))
      if (/\?/.test(n)) {
        r.length === 0 && s === "" ? r.push("/") : r.push(s);
        const i = n.replace("?", "");
        s += "/" + i, r.push(s);
      } else
        s += "/" + n;
  }), r.filter((n, i, a) => a.indexOf(n) === i);
}, "ht");
var Fe = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Ke(t, ft) : t) : t, "Fe");
var ut = /* @__PURE__ */ __name2((t, e, r) => {
  let s;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const c = t.charCodeAt(a + e.length + 1);
      if (c === 61) {
        const h = a + e.length + 2, o = t.indexOf("&", h);
        return Fe(t.slice(h, o === -1 ? void 0 : o));
      } else if (c == 38 || isNaN(c))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (s = /[%+]/.test(t), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let c = t.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let h = t.slice(i + 1, c === -1 ? a === -1 ? void 0 : a : c);
    if (s && (h = Fe(h)), i = a, h === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = t.slice(c + 1, a === -1 ? void 0 : a), s && (o = Fe(o))), r ? (n[h] && Array.isArray(n[h]) || (n[h] = []), n[h].push(o)) : n[h] ?? (n[h] = o);
  }
  return e ? n[e] : n;
}, "ut");
var Ut = ut;
var Kt = /* @__PURE__ */ __name2((t, e) => ut(t, e, true), "Kt");
var ft = decodeURIComponent;
var Ye = /* @__PURE__ */ __name2((t) => Ke(t, ft), "Ye");
var he;
var _;
var q;
var pt;
var gt;
var ze;
var B;
var rt;
var dt = (rt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    m(this, q);
    g(this, "raw");
    m(this, he);
    m(this, _);
    g(this, "routeIndex", 0);
    g(this, "path");
    g(this, "bodyCache", {});
    m(this, B, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, s = e2[t2];
      if (s)
        return s;
      const n = Object.keys(e2)[0];
      return n ? e2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, p(this, _, r), p(this, he, {});
  }
  param(t) {
    return t ? v(this, q, pt).call(this, t) : v(this, q, gt).call(this);
  }
  query(t) {
    return Ut(this.url, t);
  }
  queries(t) {
    return Kt(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, s) => {
      e[s] = r;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await kt(this, t));
  }
  json() {
    return l(this, B).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return l(this, B).call(this, "text");
  }
  arrayBuffer() {
    return l(this, B).call(this, "arrayBuffer");
  }
  blob() {
    return l(this, B).call(this, "blob");
  }
  formData() {
    return l(this, B).call(this, "formData");
  }
  addValidatedData(t, e) {
    l(this, he)[t] = e;
  }
  valid(t) {
    return l(this, he)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Ht]() {
    return l(this, _);
  }
  get matchedRoutes() {
    return l(this, _)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return l(this, _)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "rt"), he = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakSet(), pt = /* @__PURE__ */ __name2(function(t) {
  const e = l(this, _)[0][this.routeIndex][1][t], r = v(this, q, ze).call(this, e);
  return r && /\%/.test(r) ? Ye(r) : r;
}, "pt"), gt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(l(this, _)[0][this.routeIndex][1]);
  for (const r of e) {
    const s = v(this, q, ze).call(this, l(this, _)[0][this.routeIndex][1][r]);
    s !== void 0 && (t[r] = /\%/.test(s) ? Ye(s) : s);
  }
  return t;
}, "gt"), ze = /* @__PURE__ */ __name2(function(t) {
  return l(this, _)[1] ? l(this, _)[1][t] : t;
}, "ze"), B = /* @__PURE__ */ new WeakMap(), rt);
var Jt = { Stringify: 1 };
var mt = /* @__PURE__ */ __name2(async (t, e, r, s, n) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (n ? n[0] += t : n = [t], Promise.all(i.map((c) => c({ phase: e, buffer: n, context: s }))).then((c) => Promise.all(c.filter(Boolean).map((h) => mt(h, e, false, s, n))).then(() => n[0]))) : Promise.resolve(t);
}, "mt");
var Wt = "text/plain; charset=UTF-8";
var Le = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Le");
var be;
var je;
var I;
var ue;
var $;
var O;
var Re;
var fe;
var de;
var Y;
var Ae;
var Te;
var z;
var oe;
var st;
var Gt = (st = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    m(this, z);
    m(this, be);
    m(this, je);
    g(this, "env", {});
    m(this, I);
    g(this, "finalized", false);
    g(this, "error");
    m(this, ue);
    m(this, $);
    m(this, O);
    m(this, Re);
    m(this, fe);
    m(this, de);
    m(this, Y);
    m(this, Ae);
    m(this, Te);
    g(this, "render", (...t2) => (l(this, fe) ?? p(this, fe, (e2) => this.html(e2)), l(this, fe).call(this, ...t2)));
    g(this, "setLayout", (t2) => p(this, Re, t2));
    g(this, "getLayout", () => l(this, Re));
    g(this, "setRenderer", (t2) => {
      p(this, fe, t2);
    });
    g(this, "header", (t2, e2, r) => {
      this.finalized && p(this, O, new Response(l(this, O).body, l(this, O)));
      const s = l(this, O) ? l(this, O).headers : l(this, Y) ?? p(this, Y, new Headers());
      e2 === void 0 ? s.delete(t2) : r != null && r.append ? s.append(t2, e2) : s.set(t2, e2);
    });
    g(this, "status", (t2) => {
      p(this, ue, t2);
    });
    g(this, "set", (t2, e2) => {
      l(this, I) ?? p(this, I, /* @__PURE__ */ new Map()), l(this, I).set(t2, e2);
    });
    g(this, "get", (t2) => l(this, I) ? l(this, I).get(t2) : void 0);
    g(this, "newResponse", (...t2) => v(this, z, oe).call(this, ...t2));
    g(this, "body", (t2, e2, r) => v(this, z, oe).call(this, t2, e2, r));
    g(this, "text", (t2, e2, r) => !l(this, Y) && !l(this, ue) && !e2 && !r && !this.finalized ? new Response(t2) : v(this, z, oe).call(this, t2, e2, Le(Wt, r)));
    g(this, "json", (t2, e2, r) => v(this, z, oe).call(this, JSON.stringify(t2), e2, Le("application/json", r)));
    g(this, "html", (t2, e2, r) => {
      const s = /* @__PURE__ */ __name2((n) => v(this, z, oe).call(this, n, e2, Le("text/html; charset=UTF-8", r)), "s");
      return typeof t2 == "object" ? mt(t2, Jt.Stringify, false, {}).then(s) : s(t2);
    });
    g(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    g(this, "notFound", () => (l(this, de) ?? p(this, de, () => new Response()), l(this, de).call(this, this)));
    p(this, be, t), e && (p(this, $, e.executionCtx), this.env = e.env, p(this, de, e.notFoundHandler), p(this, Te, e.path), p(this, Ae, e.matchResult));
  }
  get req() {
    return l(this, je) ?? p(this, je, new dt(l(this, be), l(this, Te), l(this, Ae))), l(this, je);
  }
  get event() {
    if (l(this, $) && "respondWith" in l(this, $))
      return l(this, $);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (l(this, $))
      return l(this, $);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return l(this, O) || p(this, O, new Response(null, { headers: l(this, Y) ?? p(this, Y, new Headers()) }));
  }
  set res(t) {
    if (l(this, O) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of l(this, O).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const s = l(this, O).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const n of s)
              t.headers.append("set-cookie", n);
          } else
            t.headers.set(e, r);
    }
    p(this, O, t), this.finalized = true;
  }
  get var() {
    return l(this, I) ? Object.fromEntries(l(this, I)) : {};
  }
}, "st"), be = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), oe = /* @__PURE__ */ __name2(function(t, e, r) {
  const s = l(this, O) ? new Headers(l(this, O).headers) : l(this, Y) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, c] of i)
      a.toLowerCase() === "set-cookie" ? s.append(a, c) : s.set(a, c);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        s.set(i, a);
      else {
        s.delete(i);
        for (const c of a)
          s.append(i, c);
      }
  const n = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? l(this, ue);
  return new Response(t, { status: n, headers: s });
}, "oe"), st);
var b = "ALL";
var Vt = "all";
var Xt = ["get", "post", "put", "delete", "options", "patch"];
var xt = "Can not add a route since the matcher is already built.";
var vt = /* @__PURE__ */ __name2(class extends Error {
}, "vt");
var Yt = "__COMPOSED_HANDLER";
var Zt = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "Zt");
var Ze = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "Ze");
var P;
var j;
var wt;
var H;
var V;
var _e;
var Pe;
var pe;
var Qt = (pe = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    m(this, j);
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
    m(this, P, "/");
    g(this, "routes", []);
    m(this, H, Zt);
    g(this, "errorHandler", Ze);
    g(this, "onError", (e2) => (this.errorHandler = e2, this));
    g(this, "notFound", (e2) => (p(this, H, e2), this));
    g(this, "fetch", (e2, ...r) => v(this, j, Pe).call(this, e2, r[1], r[0], e2.method));
    g(this, "request", (e2, r, s2, n2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, s2, n2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ae("/", e2)}`, r), s2, n2)));
    g(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(v(this, j, Pe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...Xt, Vt].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? p(this, P, a) : v(this, j, V).call(this, i, l(this, P), a), c.forEach((h) => {
        v(this, j, V).call(this, i, l(this, P), h);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const h of [a].flat()) {
        p(this, P, h);
        for (const o of [i].flat())
          c.map((u) => {
            v(this, j, V).call(this, o.toUpperCase(), l(this, P), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? p(this, P, i) : (p(this, P, "*"), a.unshift(i)), a.forEach((c) => {
      v(this, j, V).call(this, b, l(this, P), c);
    }), this);
    const { strict: s, ...n } = e;
    Object.assign(this, n), this.getPath = s ?? true ? e.getPath ?? lt : zt;
  }
  route(e, r) {
    const s = this.basePath(e);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === Ze ? i = n.handler : (i = /* @__PURE__ */ __name2(async (c, h) => (await Xe([], r.errorHandler)(c, () => n.handler(c, h))).res, "i"), i[Yt] = n.handler), v(a = s, j, V).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(e) {
    const r = v(this, j, wt).call(this);
    return r._basePath = ae(this._basePath, e), r;
  }
  mount(e, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name2((h) => h, "n") : n = s.replaceRequest));
    const a = i ? (h) => {
      const o = i(h);
      return Array.isArray(o) ? o : [o];
    } : (h) => {
      let o;
      try {
        o = h.executionCtx;
      } catch {
      }
      return [h.env, o];
    };
    n || (n = (() => {
      const h = ae(this._basePath, e), o = h === "/" ? 0 : h.length;
      return (u) => {
        const f = new URL(u.url);
        return f.pathname = f.pathname.slice(o) || "/", new Request(f, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (h, o) => {
      const u = await r(n(h.req.raw), ...a(h));
      if (u)
        return u;
      await o();
    }, "c");
    return v(this, j, V).call(this, b, ae(e, "*"), c), this;
  }
}, "pe"), P = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), wt = /* @__PURE__ */ __name2(function() {
  const e = new pe({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, p(e, H, l(this, H)), e.routes = this.routes, e;
}, "wt"), H = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ __name2(function(e, r, s) {
  e = e.toUpperCase(), r = ae(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: e, handler: s };
  this.router.add(e, r, [s, n]), this.routes.push(n);
}, "V"), _e = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "_e"), Pe = /* @__PURE__ */ __name2(function(e, r, s, n) {
  if (n === "HEAD")
    return (async () => new Response(null, await v(this, j, Pe).call(this, e, r, s, "GET")))();
  const i = this.getPath(e, { env: s }), a = this.router.match(n, i), c = new Gt(e, { path: i, matchResult: a, env: s, executionCtx: r, notFoundHandler: l(this, H) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await l(this, H).call(this, c);
      });
    } catch (u) {
      return v(this, j, _e).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : l(this, H).call(this, c))).catch((u) => v(this, j, _e).call(this, u, c)) : o ?? l(this, H).call(this, c);
  }
  const h = Xe(a[0], this.errorHandler, l(this, H));
  return (async () => {
    try {
      const o = await h(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return v(this, j, _e).call(this, o, c);
    }
  })();
}, "Pe"), pe);
var yt = [];
function er(t, e) {
  const r = this.buildAllMatchers(), s = /* @__PURE__ */ __name2((n, i) => {
    const a = r[n] || r[b], c = a[2][i];
    if (c)
      return c;
    const h = i.match(a[0]);
    if (!h)
      return [[], yt];
    const o = h.indexOf("", 1);
    return [a[1][o], h];
  }, "s");
  return this.match = s, s(t, e);
}
__name(er, "er");
__name2(er, "er");
var ke = "[^/]+";
var we = ".*";
var ye = "(?:|/.*)";
var ce = Symbol();
var tr = new Set(".\\+*[^]$()");
function rr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === we || t === ye ? 1 : e === we || e === ye ? -1 : t === ke ? 1 : e === ke ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(rr, "rr");
__name2(rr, "rr");
var Z;
var Q;
var k;
var re;
var sr = (re = /* @__PURE__ */ __name2(class {
  constructor() {
    m(this, Z);
    m(this, Q);
    m(this, k, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, s, n, i) {
    if (e.length === 0) {
      if (l(this, Z) !== void 0)
        throw ce;
      if (i)
        return;
      p(this, Z, r);
      return;
    }
    const [a, ...c] = e, h = a === "*" ? c.length === 0 ? ["", "", we] : ["", "", ke] : a === "/*" ? ["", "", ye] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (h) {
      const u = h[1];
      let f = h[2] || ke;
      if (u && h[2] && (f === ".*" || (f = f.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(f))))
        throw ce;
      if (o = l(this, k)[f], !o) {
        if (Object.keys(l(this, k)).some((d) => d !== we && d !== ye))
          throw ce;
        if (i)
          return;
        o = l(this, k)[f] = new re(), u !== "" && p(o, Q, n.varIndex++);
      }
      !i && u !== "" && s.push([u, l(o, Q)]);
    } else if (o = l(this, k)[a], !o) {
      if (Object.keys(l(this, k)).some((u) => u.length > 1 && u !== we && u !== ye))
        throw ce;
      if (i)
        return;
      o = l(this, k)[a] = new re();
    }
    o.insert(c, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(l(this, k)).sort(rr).map((s) => {
      const n = l(this, k)[s];
      return (typeof l(n, Q) == "number" ? `(${s})@${l(n, Q)}` : tr.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof l(this, Z) == "number" && r.unshift(`#${l(this, Z)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "re"), Z = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), re);
var Ne;
var Oe;
var nt;
var nr = (nt = /* @__PURE__ */ __name2(class {
  constructor() {
    m(this, Ne, { varIndex: 0 });
    m(this, Oe, new sr());
  }
  insert(t, e, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let c = false;
      if (t = t.replace(/\{[^}]+\}/g, (h) => {
        const o = `@\\${a}`;
        return n[a] = [o, h], a++, c = true, o;
      }), !c)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [c] = n[a];
      for (let h = i.length - 1; h >= 0; h--)
        if (i[h].indexOf(c) !== -1) {
          i[h] = i[h].replace(c, n[a][1]);
          break;
        }
    }
    return l(this, Oe).insert(i, e, s, l(this, Ne), r), s;
  }
  buildRegExp() {
    let t = l(this, Oe).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, s];
  }
}, "nt"), Ne = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), nt);
var ir = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var He = /* @__PURE__ */ Object.create(null);
function Et(t) {
  return He[t] ?? (He[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Et, "Et");
__name2(Et, "Et");
function ar() {
  He = /* @__PURE__ */ Object.create(null);
}
__name(ar, "ar");
__name2(ar, "ar");
function or(t) {
  var o;
  const e = new nr(), r = [];
  if (t.length === 0)
    return ir;
  const s = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, f], [d, x]) => u ? 1 : d ? -1 : f.length - x.length), n = /* @__PURE__ */ Object.create(null);
  for (let u = 0, f = -1, d = s.length; u < d; u++) {
    const [x, E, C] = s[u];
    x ? n[E] = [C.map(([S]) => [S, /* @__PURE__ */ Object.create(null)]), yt] : f++;
    let w;
    try {
      w = e.insert(E, f, x);
    } catch (S) {
      throw S === ce ? new vt(E) : S;
    }
    x || (r[f] = C.map(([S, y]) => {
      const G = /* @__PURE__ */ Object.create(null);
      for (y -= 1; y >= 0; y--) {
        const [ne, T] = w[y];
        G[ne] = T;
      }
      return [S, G];
    }));
  }
  const [i, a, c] = e.buildRegExp();
  for (let u = 0, f = r.length; u < f; u++)
    for (let d = 0, x = r[u].length; d < x; d++) {
      const E = (o = r[u][d]) == null ? void 0 : o[1];
      if (!E)
        continue;
      const C = Object.keys(E);
      for (let w = 0, S = C.length; w < S; w++)
        E[C[w]] = c[E[C[w]]];
    }
  const h = [];
  for (const u in a)
    h[u] = r[a[u]];
  return [i, h, n];
}
__name(or, "or");
__name2(or, "or");
function ie(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((s, n) => n.length - s.length))
      if (Et(r).test(e))
        return [...t[r]];
  }
}
__name(ie, "ie");
__name2(ie, "ie");
var U;
var K;
var Ie;
var St;
var it;
var cr = (it = /* @__PURE__ */ __name2(class {
  constructor() {
    m(this, Ie);
    g(this, "name", "RegExpRouter");
    m(this, U);
    m(this, K);
    g(this, "match", er);
    p(this, U, { [b]: /* @__PURE__ */ Object.create(null) }), p(this, K, { [b]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var c;
    const s = l(this, U), n = l(this, K);
    if (!s || !n)
      throw new Error(xt);
    s[t] || [s, n].forEach((h) => {
      h[t] = /* @__PURE__ */ Object.create(null), Object.keys(h[b]).forEach((o) => {
        h[t][o] = [...h[b][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const h = Et(e);
      t === b ? Object.keys(s).forEach((o) => {
        var u;
        (u = s[o])[e] || (u[e] = ie(s[o], e) || ie(s[b], e) || []);
      }) : (c = s[t])[e] || (c[e] = ie(s[t], e) || ie(s[b], e) || []), Object.keys(s).forEach((o) => {
        (t === b || t === o) && Object.keys(s[o]).forEach((u) => {
          h.test(u) && s[o][u].push([r, i]);
        });
      }), Object.keys(n).forEach((o) => {
        (t === b || t === o) && Object.keys(n[o]).forEach((u) => h.test(u) && n[o][u].push([r, i]));
      });
      return;
    }
    const a = ht(e) || [e];
    for (let h = 0, o = a.length; h < o; h++) {
      const u = a[h];
      Object.keys(n).forEach((f) => {
        var d;
        (t === b || t === f) && ((d = n[f])[u] || (d[u] = [...ie(s[f], u) || ie(s[b], u) || []]), n[f][u].push([r, i - o + h + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(l(this, K)).concat(Object.keys(l(this, U))).forEach((e) => {
      t[e] || (t[e] = v(this, Ie, St).call(this, e));
    }), p(this, U, p(this, K, void 0)), ar(), t;
  }
}, "it"), U = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakSet(), St = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === b;
  return [l(this, U), l(this, K)].forEach((s) => {
    const n = s[t] ? Object.keys(s[t]).map((i) => [i, s[t][i]]) : [];
    n.length !== 0 ? (r || (r = true), e.push(...n)) : t !== b && e.push(...Object.keys(s[b]).map((i) => [i, s[b][i]]));
  }), r ? or(e) : null;
}, "St"), it);
var J;
var D;
var at;
var lr = (at = /* @__PURE__ */ __name2(class {
  constructor(t) {
    g(this, "name", "SmartRouter");
    m(this, J, []);
    m(this, D, []);
    p(this, J, t.routers);
  }
  add(t, e, r) {
    if (!l(this, D))
      throw new Error(xt);
    l(this, D).push([t, e, r]);
  }
  match(t, e) {
    if (!l(this, D))
      throw new Error("Fatal error");
    const r = l(this, J), s = l(this, D), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const c = r[i];
      try {
        for (let h = 0, o = s.length; h < o; h++)
          c.add(...s[h]);
        a = c.match(t, e);
      } catch (h) {
        if (h instanceof vt)
          continue;
        throw h;
      }
      this.match = c.match.bind(c), p(this, J, [c]), p(this, D, void 0);
      break;
    }
    if (i === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (l(this, D) || l(this, J).length !== 1)
      throw new Error("No active router has been determined yet.");
    return l(this, J)[0];
  }
}, "at"), J = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), at);
var ve = /* @__PURE__ */ Object.create(null);
var W;
var A;
var ee;
var ge;
var R;
var M;
var X;
var me;
var hr = (me = /* @__PURE__ */ __name2(class {
  constructor(e, r, s) {
    m(this, M);
    m(this, W);
    m(this, A);
    m(this, ee);
    m(this, ge, 0);
    m(this, R, ve);
    if (p(this, A, s || /* @__PURE__ */ Object.create(null)), p(this, W, []), e && r) {
      const n = /* @__PURE__ */ Object.create(null);
      n[e] = { handler: r, possibleKeys: [], score: 0 }, p(this, W, [n]);
    }
    p(this, ee, []);
  }
  insert(e, r, s) {
    p(this, ge, ++Ve(this, ge)._);
    let n = this;
    const i = Mt(r), a = [];
    for (let c = 0, h = i.length; c < h; c++) {
      const o = i[c], u = i[c + 1], f = Lt(o, u), d = Array.isArray(f) ? f[0] : o;
      if (d in l(n, A)) {
        n = l(n, A)[d], f && a.push(f[1]);
        continue;
      }
      l(n, A)[d] = new me(), f && (l(n, ee).push(f), a.push(f[1])), n = l(n, A)[d];
    }
    return l(n, W).push({ [e]: { handler: s, possibleKeys: a.filter((c, h, o) => o.indexOf(c) === h), score: l(this, ge) } }), n;
  }
  search(e, r) {
    var h;
    const s = [];
    p(this, R, ve);
    let i = [this];
    const a = ct(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const f = a[o], d = o === u - 1, x = [];
      for (let E = 0, C = i.length; E < C; E++) {
        const w = i[E], S = l(w, A)[f];
        S && (p(S, R, l(w, R)), d ? (l(S, A)["*"] && s.push(...v(this, M, X).call(this, l(S, A)["*"], e, l(w, R))), s.push(...v(this, M, X).call(this, S, e, l(w, R)))) : x.push(S));
        for (let y = 0, G = l(w, ee).length; y < G; y++) {
          const ne = l(w, ee)[y], T = l(w, R) === ve ? {} : { ...l(w, R) };
          if (ne === "*") {
            const L = l(w, A)["*"];
            L && (s.push(...v(this, M, X).call(this, L, e, l(w, R))), p(L, R, T), x.push(L));
            continue;
          }
          const [Ot, We, xe] = ne;
          if (!f && !(xe instanceof RegExp))
            continue;
          const N = l(w, A)[Ot], Ct = a.slice(o).join("/");
          if (xe instanceof RegExp) {
            const L = xe.exec(Ct);
            if (L) {
              if (T[We] = L[0], s.push(...v(this, M, X).call(this, N, e, l(w, R), T)), Object.keys(l(N, A)).length) {
                p(N, R, T);
                const Me = ((h = L[0].match(/\//)) == null ? void 0 : h.length) ?? 0;
                (c[Me] || (c[Me] = [])).push(N);
              }
              continue;
            }
          }
          (xe === true || xe.test(f)) && (T[We] = f, d ? (s.push(...v(this, M, X).call(this, N, e, T, l(w, R))), l(N, A)["*"] && s.push(...v(this, M, X).call(this, l(N, A)["*"], e, T, l(w, R)))) : (p(N, R, T), x.push(N)));
        }
      }
      i = x.concat(c.shift() ?? []);
    }
    return s.length > 1 && s.sort((o, u) => o.score - u.score), [s.map(({ handler: o, params: u }) => [o, u])];
  }
}, "me"), W = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), X = /* @__PURE__ */ __name2(function(e, r, s, n) {
  const i = [];
  for (let a = 0, c = l(e, W).length; a < c; a++) {
    const h = l(e, W)[a], o = h[r] || h[b], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), s !== ve || n && n !== ve))
      for (let f = 0, d = o.possibleKeys.length; f < d; f++) {
        const x = o.possibleKeys[f], E = u[o.score];
        o.params[x] = n != null && n[x] && !E ? n[x] : s[x] ?? (n == null ? void 0 : n[x]), u[o.score] = true;
      }
  }
  return i;
}, "X"), me);
var te;
var ot;
var ur = (ot = /* @__PURE__ */ __name2(class {
  constructor() {
    g(this, "name", "TrieRouter");
    m(this, te);
    p(this, te, new hr());
  }
  add(t, e, r) {
    const s = ht(e);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++)
        l(this, te).insert(t, s[n], r);
      return;
    }
    l(this, te).insert(t, e, r);
  }
  match(t, e) {
    return l(this, te).search(t, e);
  }
}, "ot"), te = /* @__PURE__ */ new WeakMap(), ot);
var bt = /* @__PURE__ */ __name2(class extends Qt {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new lr({ routers: [new cr(), new ur()] });
  }
}, "bt");
var fr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, s = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function h(f, d) {
      a.res.headers.set(f, d);
    }
    __name(h, "h");
    __name2(h, "h");
    const o = await s(a.req.header("origin") || "", a);
    if (o && h("Access-Control-Allow-Origin", o), r.credentials && h("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && h("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && h("Vary", "Origin"), r.maxAge != null && h("Access-Control-Max-Age", r.maxAge.toString());
      const f = await n(a.req.header("origin") || "", a);
      f.length && h("Access-Control-Allow-Methods", f.join(","));
      let d = r.allowHeaders;
      if (!(d != null && d.length)) {
        const x = a.req.header("Access-Control-Request-Headers");
        x && (d = x.split(/\s*,\s*/));
      }
      return d != null && d.length && (h("Access-Control-Allow-Headers", d.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "fr");
var dr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var Qe = /* @__PURE__ */ __name2((t, e = gr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = t.match(r);
  if (!s)
    return;
  let n = e[s[1]];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, "Qe");
var pr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var gr = pr;
var mr = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((n) => n !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), s = [];
  for (const n of r)
    n === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : n !== "." && s.push(n);
  return s.join("/") || ".";
}, "mr");
var jt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var xr = Object.keys(jt);
var vr = "index.html";
var wr = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, s = t.join ?? mr;
  return async (n, i) => {
    var u, f, d, x;
    if (n.finalized)
      return i();
    let a;
    if (t.path)
      a = t.path;
    else
      try {
        if (a = decodeURIComponent(n.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))
          throw new Error();
      } catch {
        return await ((u = t.onNotFound) == null ? void 0 : u.call(t, n.req.path, n)), i();
      }
    let c = s(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(c) && (c = s(c, vr));
    const h = t.getContent;
    let o = await h(c, n);
    if (o instanceof Response)
      return n.newResponse(o.body, o);
    if (o) {
      const E = t.mimes && Qe(c, t.mimes) || Qe(c);
      if (n.header("Content-Type", E || "application/octet-stream"), t.precompressed && (!E || dr.test(E))) {
        const C = new Set((f = n.req.header("Accept-Encoding")) == null ? void 0 : f.split(",").map((w) => w.trim()));
        for (const w of xr) {
          if (!C.has(w))
            continue;
          const S = await h(c + jt[w], n);
          if (S) {
            o = S, n.header("Content-Encoding", w), n.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((d = t.onFound) == null ? void 0 : d.call(t, c, n)), n.body(o);
    }
    await ((x = t.onNotFound) == null ? void 0 : x.call(t, c, n)), await i();
  };
}, "wr");
var yr = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const n = r[t];
  if (!n)
    return null;
  const i = await s.get(n, { type: "stream" });
  return i || null;
}, "yr");
var Er = /* @__PURE__ */ __name2((t) => async function(r, s) {
  return wr({ ...t, getContent: async (i) => yr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, s);
}, "Er");
var Sr = /* @__PURE__ */ __name2((t) => Er(t), "Sr");
var F = new bt();
F.use("/api/*", fr());
F.use("/static/*", Sr({ root: "./public" }));
function $e() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name($e, "$e");
__name2($e, "$e");
function Rt(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let s = 0; s < e.length; s++)
    r ^= e.charCodeAt(s), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(Rt, "Rt");
__name2(Rt, "Rt");
function br(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(br, "br");
__name2(br, "br");
function se(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(se, "se");
__name2(se, "se");
function De(t) {
  const e = se(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((s) => s.trim()).filter(Boolean) : [];
}
__name(De, "De");
__name2(De, "De");
function jr(t) {
  const e = se(t).split(`
`).map((s) => s.trim()), r = [];
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    (/^\d+(\.\d+)+\.\s*/.test(n) || /^\d+\.\s*/.test(n)) && r.push({ title: n, startIdx: s });
  }
  return r;
}
__name(jr, "jr");
__name2(jr, "jr");
function Je(t) {
  const e = se(t).split(`
`), r = jr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: se(t) }];
  const s = [];
  for (let n = 0; n < r.length; n++) {
    const i = r[n], a = r[n + 1], c = i.startIdx, h = a ? a.startIdx : e.length, o = i.title, u = e.slice(c + 1, h).join(`
`).trim();
    s.push({ title: o, body: u });
  }
  return s.filter((n) => n.body.length > 0);
}
__name(Je, "Je");
__name2(Je, "Je");
function Rr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Rr, "Rr");
__name2(Rr, "Rr");
function le(t, e) {
  const s = De(t).map((i, a) => ({ s: i, i: a, score: Rr(i) }));
  return s.sort((i, a) => a.score - i.score || i.i - a.i), s.slice(0, br(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(le, "le");
__name2(le, "le");
function Ee(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
var Ue = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function et(t, e, r) {
  const s = Math.max(60, Ee(t)), n = Ee(e), i = Math.floor(s * Ue[r].min), a = Math.ceil(s * Ue[r].max);
  return n < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: n } : n > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: n } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: n };
}
__name(et, "et");
__name2(et, "et");
function Se(t, e, r) {
  const s = Math.max(60, Ee(t)), n = Math.ceil(s * Ue[r].max);
  let i = String(e || "").trim();
  if (Ee(i) <= n)
    return i;
  const a = De(i);
  let c = "";
  for (const h of a) {
    const o = (c ? c + " " : "") + h;
    if (Ee(o) > n)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Se, "Se");
__name2(Se, "Se");
function Be(t, e) {
  return `${t}_${e}`;
}
__name(Be, "Be");
__name2(Be, "Be");
function Ar(t) {
  const e = Je(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, s = /* @__PURE__ */ new Map();
  return e.forEach((n, i) => {
    const a = Be("sec", i + 1), c = { id: a, title: n.title, type: "section", collapsed: false, children: [] }, h = le(n.body, 6), o = [];
    for (const y of h)
      (y.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((ne) => {
        const T = ne.replace(/[()]/g, "").trim();
        T.length >= 2 && T.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(T) && o.push(T);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((y) => u.set(y, (u.get(y) || 0) + 1));
    const f = Array.from(u.entries()).sort((y, G) => G[1] - y[1]).map((y) => y[0]).filter((y) => y.length <= 10).slice(0, 3), d = le(n.body, 3).join(" "), x = le(n.body, 2).join(" "), E = le(n.body, 1).join(" "), C = { id: Be(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: f, explain: d, explainStandard: x, explainBrief: E, children: [] };
    f.forEach((y) => {
      s.has(y) || s.set(y, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${y}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${le(n.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const S = De(n.body).filter((y) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(y)).slice(0, 2);
    S.length && C.children.push({ id: Be(a + "_adv", 1), title: S.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(C), r.children.push(c);
  }), { tree: r, glossary: Array.from(s.entries()).map(([n, i]) => ({ term: n, def: i })) };
}
__name(Ar, "Ar");
__name2(Ar, "Ar");
function At(t, e) {
  const r = JSON.parse(JSON.stringify(t)), s = /* @__PURE__ */ __name2((n) => {
    n.type === "keyword" && (e === "brief" && (n.explain = n.explainBrief || n.explain), e === "standard" && (n.explain = n.explainStandard || n.explain), e === "detail" && (n.explain = n.explain || n.explainStandard || n.explainBrief)), n.type === "advanced" && (n.collapsed = e !== "detail"), (n.children || []).forEach(s);
  }, "s");
  return s(r), r;
}
__name(At, "At");
__name2(At, "At");
function Tr(t, e, r, s) {
  const n = (e.children || []).map((u) => u.title), a = (At(e, s).children || []).map((u) => {
    const f = (u.children || []).find((x) => x.type === "keyword"), d = Array.isArray(f == null ? void 0 : f.pack) ? f.pack : typeof (f == null ? void 0 : f.pack) == "string" ? [f.pack] : [];
    return { title: u.title, key: d.slice(0, 3), summary: (f == null ? void 0 : f.explain) || "" };
  }), c = s === "brief" ? 4 : s === "standard" ? 6 : 10, h = r.slice(0, c).map((u) => ({ term: u.term, def: Se(t, u.def, s) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), n.forEach((u, f) => o.push(`  ${f + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, f) => {
    var d;
    o.push(`  ${f + 1}. ${u.title}`), (d = u.key) != null && d.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Se(t, u.summary, s)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), h.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: n, sections: a, glossary: h, renderText: o.join(`
`) };
}
__name(Tr, "Tr");
__name2(Tr, "Tr");
function Or(t, e) {
  const r = Je(t), s = e === "brief" ? 2 : e === "standard" ? 4 : 7, n = [];
  r.forEach((a) => {
    const c = e === "brief" || e === "standard" ? 1 : 2;
    n.push(...le(a.body, c));
  });
  const i = n.slice(0, s).join(" ");
  return Se(t, i, e);
}
__name(Or, "Or");
__name2(Or, "Or");
function Cr(t, e) {
  Je(t);
  const r = De(t), s = [], n = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  n && s.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: n, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: n });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && s.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && s.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), s.slice(0, 4);
}
__name(Cr, "Cr");
__name2(Cr, "Cr");
function _r(t, e) {
  let r = t.length, s = 0;
  const n = [];
  for (const a of t) {
    const c = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!c) {
      n.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((E) => E.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let f = 0;
    u.forEach((E) => {
      c.includes(E) && f++;
    });
    const d = f >= 2 || c.length >= 30, x = d ? 1 : f === 1 ? 0.5 : 0;
    s += x, n.push({ id: a.id, ok: d, score: x, hit: f });
  }
  const i = r ? Math.round(s / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: n };
}
__name(_r, "_r");
__name2(_r, "_r");
function Pr(t) {
  const e = se(t), { tree: r, glossary: s } = Ar(e), n = { originalMeta: { textHash: Rt(e), chars: e.length, ts: $e() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Or(e, i), c = Tr(e, r, s, i), h = At(r, i), o = Cr(e), f = et(e, a, i).ok ? a : Se(e, a, i), d = c.renderText || "", x = et(e, d, i);
    c.renderText = x.ok ? d : Se(e, d, i), n.modes[i] = { narrative: f, structured: c, mindmap: { tree: h }, selftest: o };
  }), n;
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
F.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: $e(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
F.post("/api/engine", async (t) => {
  var o, u;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), s = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", n = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = se(r);
  if (i.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  const a = Pr(i), c = (u = (o = a.modes) == null ? void 0 : o[s]) == null ? void 0 : u[n], h = { engine: "v5-local", mode: s, viewType: n, ts: $e(), textHash: a.originalMeta.textHash };
  return t.json({ ok: true, data: c, allSummaries: a.modes, meta: h });
});
F.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], s = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, n = _r(r, s);
  return t.json({ ok: true, result: n });
});
F.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), s = String((r == null ? void 0 : r.userId) || "anon"), n = se(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!n || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = $e(), h = Rt(n), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, s, c, c, h, n, o).run(), t.json({ ok: true, id: a, textHash: h, ts: c });
});
F.get("/api/loadSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = String(t.req.query("userId") || "anon"), s = String(t.req.query("id") || "");
  if (!s)
    return t.json({ ok: false, error: "missing_id" }, 400);
  const n = await e.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(s, r).first();
  if (!n)
    return t.json({ ok: false, error: "not_found" }, 404);
  let i = null;
  try {
    i = JSON.parse(n.allSummariesJson);
  } catch {
    i = null;
  }
  return t.json({ ok: true, doc: { id: n.id, userId: n.userId, createdAt: n.createdAt, updatedAt: n.updatedAt, textHash: n.textHash, originalText: n.originalText, allSummaries: i } });
});
F.get("/", (t) => t.redirect("/static/v5.html"));
var tt = new bt();
var Hr = Object.assign({ "/src/index.tsx": F });
var Tt = false;
for (const [, t] of Object.entries(Hr))
  t && (tt.route("/", t), tt.notFound(t.notFoundHandler), Tt = true);
if (!Tt)
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
var middleware_insertion_facade_default = tt;
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

// .wrangler/tmp/pages-yCtF0e/k609iuulct.js
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

// .wrangler/tmp/bundle-7r8C3I/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-7r8C3I/middleware-loader.entry.ts
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
//# sourceMappingURL=k609iuulct.js.map
