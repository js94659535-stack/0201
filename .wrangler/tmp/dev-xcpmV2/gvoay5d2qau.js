var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-dJXt20/checked-fetch.js
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

// .wrangler/tmp/bundle-dJXt20/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-U6CKl5/bundledWorker-0.1189187733024637.mjs
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
var Ht = Object.defineProperty;
var et = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "et");
var Lt = /* @__PURE__ */ __name2((t, e, r) => e in t ? Ht(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Lt");
var g = /* @__PURE__ */ __name2((t, e, r) => Lt(t, typeof e != "symbol" ? e + "" : e, r), "g");
var Be = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || et("Cannot " + r), "Be");
var h = /* @__PURE__ */ __name2((t, e, r) => (Be(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var y = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? et("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "y");
var m = /* @__PURE__ */ __name2((t, e, r, n) => (Be(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "m");
var E = /* @__PURE__ */ __name2((t, e, r) => (Be(t, e, "access private method"), r), "E");
var tt = /* @__PURE__ */ __name2((t, e, r, n) => ({ set _(s) {
  m(t, e, s, r);
}, get _() {
  return h(t, e, n);
} }), "tt");
var rt = /* @__PURE__ */ __name2((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let l, o = false, u;
    if (t[c] ? (u = t[c][0][0], n.req.routeIndex = c) : u = c === t.length && s || void 0, u)
      try {
        l = await u(n, () => a(c + 1));
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
}, "rt");
var qt = Symbol();
var Ft = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof Et ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Jt(t, { all: r, dot: n }) : {};
}, "Ft");
async function Jt(t, e) {
  const r = await t.formData();
  return r ? Bt(r, e) : {};
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
function Bt(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? Kt(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Vt(r, n, s), delete r[n]);
  }), r;
}
__name(Bt, "Bt");
__name2(Bt, "Bt");
var Kt = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Kt");
var Vt = /* @__PURE__ */ __name2((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Vt");
var vt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "vt");
var Gt = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = zt(t), n = vt(r);
  return Ut(n, e);
}, "Gt");
var zt = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "zt");
var Ut = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "Ut");
var Ne = {};
var Wt = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return Ne[n] || (r[2] ? Ne[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Ne[n] = [t, r[1], true]), Ne[n];
  }
  return null;
}, "Wt");
var Xe = /* @__PURE__ */ __name2((t, e) => {
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
}, "Xe");
var Xt = /* @__PURE__ */ __name2((t) => Xe(t, decodeURI), "Xt");
var yt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return Xt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "yt");
var Yt = /* @__PURE__ */ __name2((t) => {
  const e = yt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "Yt");
var he = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = he(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "he");
var wt = /* @__PURE__ */ __name2((t) => {
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
}, "wt");
var Ke = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Xe(t, bt) : t) : t, "Ke");
var St = /* @__PURE__ */ __name2((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const c = t.charCodeAt(a + e.length + 1);
      if (c === 61) {
        const l = a + e.length + 2, o = t.indexOf("&", l);
        return Ke(t.slice(l, o === -1 ? void 0 : o));
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
    if (n && (l = Ke(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = t.slice(c + 1, a === -1 ? void 0 : a), n && (o = Ke(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return e ? s[e] : s;
}, "St");
var Qt = St;
var Zt = /* @__PURE__ */ __name2((t, e) => St(t, e, true), "Zt");
var bt = decodeURIComponent;
var nt = /* @__PURE__ */ __name2((t) => Xe(t, bt), "nt");
var ge;
var D;
var z;
var jt;
var Ot;
var Ue;
var W;
var dt;
var Et = (dt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    y(this, z);
    g(this, "raw");
    y(this, ge);
    y(this, D);
    g(this, "routeIndex", 0);
    g(this, "path");
    g(this, "bodyCache", {});
    y(this, W, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, m(this, D, r), m(this, ge, {});
  }
  param(t) {
    return t ? E(this, z, jt).call(this, t) : E(this, z, Ot).call(this);
  }
  query(t) {
    return Qt(this.url, t);
  }
  queries(t) {
    return Zt(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Ft(this, t));
  }
  json() {
    return h(this, W).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return h(this, W).call(this, "text");
  }
  arrayBuffer() {
    return h(this, W).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, W).call(this, "blob");
  }
  formData() {
    return h(this, W).call(this, "formData");
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
  get [qt]() {
    return h(this, D);
  }
  get matchedRoutes() {
    return h(this, D)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, D)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "dt"), ge = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), jt = /* @__PURE__ */ __name2(function(t) {
  const e = h(this, D)[0][this.routeIndex][1][t], r = E(this, z, Ue).call(this, e);
  return r && /\%/.test(r) ? nt(r) : r;
}, "jt"), Ot = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(h(this, D)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = E(this, z, Ue).call(this, h(this, D)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? nt(n) : n);
  }
  return t;
}, "Ot"), Ue = /* @__PURE__ */ __name2(function(t) {
  return h(this, D)[1] ? h(this, D)[1][t] : t;
}, "Ue"), W = /* @__PURE__ */ new WeakMap(), dt);
var er = { Stringify: 1 };
var Tt = /* @__PURE__ */ __name2(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((c) => c({ phase: e, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => Tt(l, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Tt");
var tr = "text/plain; charset=UTF-8";
var Ve = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Ve");
var ke;
var $e;
var B;
var xe;
var K;
var M;
var Re;
var ve;
var ye;
var ne;
var Ie;
var Ce;
var X;
var de;
var ft;
var rr = (ft = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    y(this, X);
    y(this, ke);
    y(this, $e);
    g(this, "env", {});
    y(this, B);
    g(this, "finalized", false);
    g(this, "error");
    y(this, xe);
    y(this, K);
    y(this, M);
    y(this, Re);
    y(this, ve);
    y(this, ye);
    y(this, ne);
    y(this, Ie);
    y(this, Ce);
    g(this, "render", (...t2) => (h(this, ve) ?? m(this, ve, (e2) => this.html(e2)), h(this, ve).call(this, ...t2)));
    g(this, "setLayout", (t2) => m(this, Re, t2));
    g(this, "getLayout", () => h(this, Re));
    g(this, "setRenderer", (t2) => {
      m(this, ve, t2);
    });
    g(this, "header", (t2, e2, r) => {
      this.finalized && m(this, M, new Response(h(this, M).body, h(this, M)));
      const n = h(this, M) ? h(this, M).headers : h(this, ne) ?? m(this, ne, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    g(this, "status", (t2) => {
      m(this, xe, t2);
    });
    g(this, "set", (t2, e2) => {
      h(this, B) ?? m(this, B, /* @__PURE__ */ new Map()), h(this, B).set(t2, e2);
    });
    g(this, "get", (t2) => h(this, B) ? h(this, B).get(t2) : void 0);
    g(this, "newResponse", (...t2) => E(this, X, de).call(this, ...t2));
    g(this, "body", (t2, e2, r) => E(this, X, de).call(this, t2, e2, r));
    g(this, "text", (t2, e2, r) => !h(this, ne) && !h(this, xe) && !e2 && !r && !this.finalized ? new Response(t2) : E(this, X, de).call(this, t2, e2, Ve(tr, r)));
    g(this, "json", (t2, e2, r) => E(this, X, de).call(this, JSON.stringify(t2), e2, Ve("application/json", r)));
    g(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name2((s) => E(this, X, de).call(this, s, e2, Ve("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? Tt(t2, er.Stringify, false, {}).then(n) : n(t2);
    });
    g(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    g(this, "notFound", () => (h(this, ye) ?? m(this, ye, () => new Response()), h(this, ye).call(this, this)));
    m(this, ke, t), e && (m(this, K, e.executionCtx), this.env = e.env, m(this, ye, e.notFoundHandler), m(this, Ce, e.path), m(this, Ie, e.matchResult));
  }
  get req() {
    return h(this, $e) ?? m(this, $e, new Et(h(this, ke), h(this, Ce), h(this, Ie))), h(this, $e);
  }
  get event() {
    if (h(this, K) && "respondWith" in h(this, K))
      return h(this, K);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, K))
      return h(this, K);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, M) || m(this, M, new Response(null, { headers: h(this, ne) ?? m(this, ne, new Headers()) }));
  }
  set res(t) {
    if (h(this, M) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of h(this, M).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = h(this, M).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    m(this, M, t), this.finalized = true;
  }
  get var() {
    return h(this, B) ? Object.fromEntries(h(this, B)) : {};
  }
}, "ft"), ke = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), de = /* @__PURE__ */ __name2(function(t, e, r) {
  const n = h(this, M) ? new Headers(h(this, M).headers) : h(this, ne) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, xe);
  return new Response(t, { status: s, headers: n });
}, "de"), ft);
var A = "ALL";
var nr = "all";
var sr = ["get", "post", "put", "delete", "options", "patch"];
var At = "Can not add a route since the matcher is already built.";
var kt = /* @__PURE__ */ __name2(class extends Error {
}, "kt");
var ir = "__COMPOSED_HANDLER";
var ar = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "ar");
var st = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "st");
var H;
var k;
var $t;
var L;
var te;
var Pe;
var De;
var we;
var or = (we = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    y(this, k);
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
    y(this, H, "/");
    g(this, "routes", []);
    y(this, L, ar);
    g(this, "errorHandler", st);
    g(this, "onError", (e2) => (this.errorHandler = e2, this));
    g(this, "notFound", (e2) => (m(this, L, e2), this));
    g(this, "fetch", (e2, ...r) => E(this, k, De).call(this, e2, r[1], r[0], e2.method));
    g(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${he("/", e2)}`, r), n2, s2)));
    g(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(E(this, k, De).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...sr, nr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? m(this, H, a) : E(this, k, te).call(this, i, h(this, H), a), c.forEach((l) => {
        E(this, k, te).call(this, i, h(this, H), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        m(this, H, l);
        for (const o of [i].flat())
          c.map((u) => {
            E(this, k, te).call(this, o.toUpperCase(), h(this, H), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? m(this, H, i) : (m(this, H, "*"), a.unshift(i)), a.forEach((c) => {
      E(this, k, te).call(this, A, h(this, H), c);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? yt : Yt;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === st ? i = s.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await rt([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[ir] = s.handler), E(a = n, k, te).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = E(this, k, $t).call(this);
    return r._basePath = he(this._basePath, e), r;
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
      const l = he(this._basePath, e), o = l === "/" ? 0 : l.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return E(this, k, te).call(this, A, he(e, "*"), c), this;
  }
}, "we"), H = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakSet(), $t = /* @__PURE__ */ __name2(function() {
  const e = new we({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, m(e, L, h(this, L)), e.routes = this.routes, e;
}, "$t"), L = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ __name2(function(e, r, n) {
  e = e.toUpperCase(), r = he(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "te"), Pe = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Pe"), De = /* @__PURE__ */ __name2(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await E(this, k, De).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), c = new rr(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, L) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await h(this, L).call(this, c);
      });
    } catch (u) {
      return E(this, k, Pe).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : h(this, L).call(this, c))).catch((u) => E(this, k, Pe).call(this, u, c)) : o ?? h(this, L).call(this, c);
  }
  const l = rt(a[0], this.errorHandler, h(this, L));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return E(this, k, Pe).call(this, o, c);
    }
  })();
}, "De"), we);
var Rt = [];
function cr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[A], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], Rt];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(t, e);
}
__name(cr, "cr");
__name2(cr, "cr");
var Le = "[^/]+";
var je = ".*";
var Oe = "(?:|/.*)";
var fe = Symbol();
var lr = new Set(".\\+*[^]$()");
function ur(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === je || t === Oe ? 1 : e === je || e === Oe ? -1 : t === Le ? 1 : e === Le ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(ur, "ur");
__name2(ur, "ur");
var se;
var ie;
var q;
var ce;
var hr = (ce = /* @__PURE__ */ __name2(class {
  constructor() {
    y(this, se);
    y(this, ie);
    y(this, q, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (h(this, se) !== void 0)
        throw fe;
      if (i)
        return;
      m(this, se, r);
      return;
    }
    const [a, ...c] = e, l = a === "*" ? c.length === 0 ? ["", "", je] : ["", "", Le] : a === "/*" ? ["", "", Oe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let d = l[2] || Le;
      if (u && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw fe;
      if (o = h(this, q)[d], !o) {
        if (Object.keys(h(this, q)).some((f) => f !== je && f !== Oe))
          throw fe;
        if (i)
          return;
        o = h(this, q)[d] = new ce(), u !== "" && m(o, ie, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, ie)]);
    } else if (o = h(this, q)[a], !o) {
      if (Object.keys(h(this, q)).some((u) => u.length > 1 && u !== je && u !== Oe))
        throw fe;
      if (i)
        return;
      o = h(this, q)[a] = new ce();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, q)).sort(ur).map((n) => {
      const s = h(this, q)[n];
      return (typeof h(s, ie) == "number" ? `(${n})@${h(s, ie)}` : lr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, se) == "number" && r.unshift(`#${h(this, se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ce"), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), ce);
var qe;
var Me;
var pt;
var dr = (pt = /* @__PURE__ */ __name2(class {
  constructor() {
    y(this, qe, { varIndex: 0 });
    y(this, Me, new hr());
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
    return h(this, Me).insert(i, e, n, h(this, qe), r), n;
  }
  buildRegExp() {
    let t = h(this, Me).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "pt"), qe = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), pt);
var fr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var He = /* @__PURE__ */ Object.create(null);
function It(t) {
  return He[t] ?? (He[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(It, "It");
__name2(It, "It");
function pr() {
  He = /* @__PURE__ */ Object.create(null);
}
__name(pr, "pr");
__name2(pr, "pr");
function mr(t) {
  var o;
  const e = new dr(), r = [];
  if (t.length === 0)
    return fr;
  const n = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, x, O] = n[u];
    p ? s[x] = [O.map(([j]) => [j, /* @__PURE__ */ Object.create(null)]), Rt] : d++;
    let v;
    try {
      v = e.insert(x, d, p);
    } catch (j) {
      throw j === fe ? new kt(x) : j;
    }
    p || (r[d] = O.map(([j, b]) => {
      const _ = /* @__PURE__ */ Object.create(null);
      for (b -= 1; b >= 0; b--) {
        const [P, T] = v[b];
        _[P] = T;
      }
      return [j, _];
    }));
  }
  const [i, a, c] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const x = (o = r[u][f]) == null ? void 0 : o[1];
      if (!x)
        continue;
      const O = Object.keys(x);
      for (let v = 0, j = O.length; v < j; v++)
        x[O[v]] = c[x[O[v]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(mr, "mr");
__name2(mr, "mr");
function ue(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (It(r).test(e))
        return [...t[r]];
  }
}
__name(ue, "ue");
__name2(ue, "ue");
var Y;
var Q;
var Fe;
var Ct;
var mt;
var gr = (mt = /* @__PURE__ */ __name2(class {
  constructor() {
    y(this, Fe);
    g(this, "name", "RegExpRouter");
    y(this, Y);
    y(this, Q);
    g(this, "match", cr);
    m(this, Y, { [A]: /* @__PURE__ */ Object.create(null) }), m(this, Q, { [A]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var c;
    const n = h(this, Y), s = h(this, Q);
    if (!n || !s)
      throw new Error(At);
    n[t] || [n, s].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[A]).forEach((o) => {
        l[t][o] = [...l[A][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = It(e);
      t === A ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[e] || (u[e] = ue(n[o], e) || ue(n[A], e) || []);
      }) : (c = n[t])[e] || (c[e] = ue(n[t], e) || ue(n[A], e) || []), Object.keys(n).forEach((o) => {
        (t === A || t === o) && Object.keys(n[o]).forEach((u) => {
          l.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (t === A || t === o) && Object.keys(s[o]).forEach((u) => l.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = wt(e) || [e];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(s).forEach((d) => {
        var f;
        (t === A || t === d) && ((f = s[d])[u] || (f[u] = [...ue(n[d], u) || ue(n[A], u) || []]), s[d][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Q)).concat(Object.keys(h(this, Y))).forEach((e) => {
      t[e] || (t[e] = E(this, Fe, Ct).call(this, e));
    }), m(this, Y, m(this, Q, void 0)), pr(), t;
  }
}, "mt"), Y = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakSet(), Ct = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === A;
  return [h(this, Y), h(this, Q)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== A && e.push(...Object.keys(n[A]).map((i) => [i, n[A][i]]));
  }), r ? mr(e) : null;
}, "Ct"), mt);
var Z;
var V;
var gt;
var xr = (gt = /* @__PURE__ */ __name2(class {
  constructor(t) {
    g(this, "name", "SmartRouter");
    y(this, Z, []);
    y(this, V, []);
    m(this, Z, t.routers);
  }
  add(t, e, r) {
    if (!h(this, V))
      throw new Error(At);
    h(this, V).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, V))
      throw new Error("Fatal error");
    const r = h(this, Z), n = h(this, V), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(t, e);
      } catch (l) {
        if (l instanceof kt)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), m(this, Z, [c]), m(this, V, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, V) || h(this, Z).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, Z)[0];
  }
}, "gt"), Z = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), gt);
var Ee = /* @__PURE__ */ Object.create(null);
var ee;
var C;
var ae;
var Se;
var $;
var G;
var re;
var be;
var vr = (be = /* @__PURE__ */ __name2(class {
  constructor(e, r, n) {
    y(this, G);
    y(this, ee);
    y(this, C);
    y(this, ae);
    y(this, Se, 0);
    y(this, $, Ee);
    if (m(this, C, n || /* @__PURE__ */ Object.create(null)), m(this, ee, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, m(this, ee, [s]);
    }
    m(this, ae, []);
  }
  insert(e, r, n) {
    m(this, Se, ++tt(this, Se)._);
    let s = this;
    const i = Gt(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], d = Wt(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, C)) {
        s = h(s, C)[f], d && a.push(d[1]);
        continue;
      }
      h(s, C)[f] = new be(), d && (h(s, ae).push(d), a.push(d[1])), s = h(s, C)[f];
    }
    return h(s, ee).push({ [e]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: h(this, Se) } }), s;
  }
  search(e, r) {
    var l;
    const n = [];
    m(this, $, Ee);
    let i = [this];
    const a = vt(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let x = 0, O = i.length; x < O; x++) {
        const v = i[x], j = h(v, C)[d];
        j && (m(j, $, h(v, $)), f ? (h(j, C)["*"] && n.push(...E(this, G, re).call(this, h(j, C)["*"], e, h(v, $))), n.push(...E(this, G, re).call(this, j, e, h(v, $)))) : p.push(j));
        for (let b = 0, _ = h(v, ae).length; b < _; b++) {
          const P = h(v, ae)[b], T = h(v, $) === Ee ? {} : { ...h(v, $) };
          if (P === "*") {
            const N = h(v, C)["*"];
            N && (n.push(...E(this, G, re).call(this, N, e, h(v, $))), m(N, $, T), p.push(N));
            continue;
          }
          const [_e, U, w] = P;
          if (!d && !(w instanceof RegExp))
            continue;
          const S = h(v, C)[_e], R = a.slice(o).join("/");
          if (w instanceof RegExp) {
            const N = w.exec(R);
            if (N) {
              if (T[U] = N[0], n.push(...E(this, G, re).call(this, S, e, h(v, $), T)), Object.keys(h(S, C)).length) {
                m(S, $, T);
                const F = ((l = N[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[F] || (c[F] = [])).push(S);
              }
              continue;
            }
          }
          (w === true || w.test(d)) && (T[U] = d, f ? (n.push(...E(this, G, re).call(this, S, e, T, h(v, $))), h(S, C)["*"] && n.push(...E(this, G, re).call(this, h(S, C)["*"], e, T, h(v, $)))) : (m(S, $, T), p.push(S)));
        }
      }
      i = p.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "be"), ee = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name2(function(e, r, n, s) {
  const i = [];
  for (let a = 0, c = h(e, ee).length; a < c; a++) {
    const l = h(e, ee)[a], o = l[r] || l[A], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ee || s && s !== Ee))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], x = u[o.score];
        o.params[p] = s != null && s[p] && !x ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "re"), be);
var oe;
var xt;
var yr = (xt = /* @__PURE__ */ __name2(class {
  constructor() {
    g(this, "name", "TrieRouter");
    y(this, oe);
    m(this, oe, new vr());
  }
  add(t, e, r) {
    const n = wt(e);
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
}, "xt"), oe = /* @__PURE__ */ new WeakMap(), xt);
var Mt = /* @__PURE__ */ __name2(class extends or {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new xr({ routers: [new gr(), new yr()] });
  }
}, "Mt");
var wr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && l("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "wr");
var Sr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var it = /* @__PURE__ */ __name2((t, e = Er) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "it");
var br = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Er = br;
var jr = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "jr");
var _t = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Or = Object.keys(_t);
var Tr = "index.html";
var Ar = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? jr;
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
    let c = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(c) && (c = n(c, Tr));
    const l = t.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const x = t.mimes && it(c, t.mimes) || it(c);
      if (s.header("Content-Type", x || "application/octet-stream"), t.precompressed && (!x || Sr.test(x))) {
        const O = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((v) => v.trim()));
        for (const v of Or) {
          if (!O.has(v))
            continue;
          const j = await l(c + _t[v], s);
          if (j) {
            o = j, s.header("Content-Encoding", v), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, c, s)), s.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, c, s)), await i();
  };
}, "Ar");
var kr = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "kr");
var $r = /* @__PURE__ */ __name2((t) => async function(r, n) {
  return Ar({ ...t, getContent: async (i) => kr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "$r");
var Rr = /* @__PURE__ */ __name2((t) => $r(t), "Rr");
function Ir(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(Ir, "Ir");
__name2(Ir, "Ir");
function I(t, e) {
  const r = String(t || "").replace(/\s+/g, " ").trim();
  if (r.length <= e)
    return r;
  const n = r.slice(0, e), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(e * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name(I, "I");
__name2(I, "I");
function at(t) {
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
__name(at, "at");
__name2(at, "at");
function ot(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(ot, "ot");
__name2(ot, "ot");
function Ge(t, e) {
  const r = e === "brief", n = e === "standard", s = I(t.narrative.coreClaim, r ? 60 : 90), i = r ? 2 : n ? 3 : 5, a = (t.narrative.grounds || []).slice(0, i).map((w) => I(w, r ? 70 : 110)), c = r ? 0 : n ? 1 : 3, l = (t.narrative.comparisons || []).slice(0, c).map((w) => I(w, n ? 120 : 160)), o = r || n ? 1 : 3, u = (t.narrative.implications || []).slice(0, o).map((w) => I(w, r ? 80 : 130));
  let d = "";
  if (e === "detail")
    d = String(t.narrative.summaryDetail || "").trim();
  else {
    const w = `\uD575\uC2EC \uC8FC\uC7A5: ${s}`, S = a.length ? `\uADFC\uAC70: ${a.map((Ze, Dt) => `${Dt + 1}) ${Ze}`).join(" ")}` : "", R = l.length ? `\uBE44\uAD50/\uB300\uC870: ${l.join(" / ")}` : "", N = u.length ? `\uC758\uBBF8/\uC2DC\uC0AC: ${u.join(" / ")}` : "", F = [w, S, R, N].filter(Boolean);
    d = r ? F.slice(0, 2).join(`

`) : F.slice(0, 3).join(`

`);
  }
  const f = t.structured.toc || [], p = r ? 2 : n ? 4 : 10, x = (t.structured.glossary || []).slice(0, p).map((w) => ({ term: I(w.term, 20), def: I(w.def, r ? 70 : 120) })), O = r ? 2 : n ? 3 : 5, v = /* @__PURE__ */ __name2((w) => (w || []).map((S) => ({ title: I(S.title, 60), keywords: (S.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((R) => I(R, 16)), bullets: (S.bullets || []).slice(0, O).map((R) => I(R, r ? 90 : 140)), children: S.children ? v(S.children) : void 0 })), "v"), j = v(t.structured.hierarchy || []), b = Cr({ toc: f, hierarchy: j, glossary: x }), _ = JSON.parse(JSON.stringify(t.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), P = r ? 70 : n ? 110 : 160, T = r ? 2 : 3;
  for (const w of _.children || [])
    for (const S of w.children || [])
      Array.isArray(S.pack) && (S.pack = S.pack.slice(0, T).map((R) => I(R, 20))), typeof S.explain == "string" && (S.explain = I(S.explain, P)), Array.isArray(S.children) || (S.children = []);
  const _e = r || n ? 2 : 4, U = (t.selftest.items || []).slice(0, _e).map((w) => {
    var S, R, N;
    return { id: w.id, type: w.type, question: I(w.question, r ? 140 : 220), hint: w.hint ? I(w.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((S = w.rubric) == null ? void 0 : S.mustInclude) || []).slice(0, r ? 2 : 4).map((F) => I(F, 20)), mustNotInclude: (((R = w.rubric) == null ? void 0 : R.mustNotInclude) || []).slice(0, 2).map((F) => I(F, 20)), maxChars: ((N = w.rubric) == null ? void 0 : N.maxChars) ?? (r ? 140 : 220) }, answerKey: w.answerKey ? I(w.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: d, coreClaim: s, grounds: a, comparisons: l, implications: u }, structured: { text: b, toc: f, hierarchy: j, glossary: x }, mindmap: { tree: _ }, selftest: { passScorePct: 90, items: U } };
}
__name(Ge, "Ge");
__name2(Ge, "Ge");
function Cr(t) {
  var n, s;
  const e = [];
  e.push("\u2160. \uBAA9\uCC28"), (n = t.toc) != null && n.length ? t.toc.forEach((i, a) => e.push(`  ${a + 1}. ${i.title}`)) : e.push("  1. \uBCF8\uBB38"), e.push(""), e.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name2((i, a) => {
    var c, l;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      e.push(`${u}- ${o.title}`), (c = o.keywords) != null && c.length && e.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => e.push(`${u}  \xB7 ${d}`)), (l = o.children) != null && l.length && r(o.children, a + 1);
    }
  }, "r");
  return r(t.hierarchy || [], 1), e.push(""), e.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = t.glossary) != null && s.length ? t.glossary.forEach((i) => e.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : e.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), e.join(`
`);
}
__name(Cr, "Cr");
__name2(Cr, "Cr");
function Mr(t) {
  var i, a, c, l, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 3) && e.push("narrative.grounds must be >= 3"), (!((c = t == null ? void 0 : t.narrative) != null && c.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = t == null ? void 0 : t.structured) == null ? void 0 : l.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 3) && e.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const x of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(x.pack) && x.pack.length && n++, typeof x.explain == "string" && x.explain.trim().length > 30 && s++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(Mr, "Mr");
__name2(Mr, "Mr");
function _r(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), n = (t.standard.narrative.text || "").replace(/\s+/g, ""), s = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), n.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === n && e.push("brief narrative equals standard narrative"), n === s && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let x = 0;
    for (const O of (p == null ? void 0 : p.children) || [])
      x += ((O == null ? void 0 : O.children) || []).length;
    return x;
  }, "i"), a = i(t.brief.mindmap.tree), c = i(t.standard.mindmap.tree), l = i(t.detail.mindmap.tree);
  return a === c && c === l || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${c}, detail:${l})`), e;
}
__name(_r, "_r");
__name2(_r, "_r");
async function ct(t, e) {
  var c, l, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ct, "ct");
__name2(ct, "ct");
function Nr(t) {
  t.post("/api/matrix", async (e) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await e.req.json(), i = String(s.text || "").trim();
      if (!i)
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Ir(i), c = ot(i);
      let l = await ct(e, c), o = at(l);
      if (!o) {
        const v = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", ot(i)].join(`
`);
        l = await ct(e, v), o = at(l);
      }
      if (!o)
        return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      o.source = { charCount: i.length, checksum: a };
      const u = Mr(o);
      if (u.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: u.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const d = Ge(o, "brief"), f = Ge(o, "standard"), p = Ge(o, "detail"), x = _r({ brief: d, standard: f, detail: p });
      if (x.length)
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: x.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const O = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: d, standard: f, detail: p }, views: { narrative: { brief: d.narrative, standard: f.narrative, detail: p.narrative }, structured: { brief: d.structured, standard: f.structured, detail: p.structured }, mindmap: { brief: d.mindmap, standard: f.mindmap, detail: p.mindmap }, selftest: { brief: d.selftest, standard: f.selftest, detail: p.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return e.json(O, 200);
    } catch (s) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  });
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
var J = new Mt();
J.use("/api/*", wr());
J.use("/static/*", Rr({ root: "./public" }));
Nr(J);
function Te() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Te, "Te");
__name2(Te, "Te");
function Ye(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let n = 0; n < e.length; n++)
    r ^= e.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(Ye, "Ye");
__name2(Ye, "Ye");
function Pr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
function Dr(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Dr, "Dr");
__name2(Dr, "Dr");
function Hr(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Hr, "Hr");
__name2(Hr, "Hr");
function Lr(t, e) {
  const r = Math.max(60, me(t)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(Lr, "Lr");
__name2(Lr, "Lr");
function qr(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Hr((t == null ? void 0 : t.viewType) || "narrative"), n = Dr(t == null ? void 0 : t.level), s = "detail", { base: i, min: a, max: c } = Lr(e), l = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), p = `
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
`.trim(), x = `
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
`.trim(), O = `
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
  return r === "structured" ? v = p : r === "mindmap" ? v = x : r === "selftest" && (v = O), `${d}

${v}`;
}
__name(qr, "qr");
__name2(qr, "qr");
function le(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(le, "le");
__name2(le, "le");
function Je(t) {
  const e = le(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(Je, "Je");
__name2(Je, "Je");
function Fr(t) {
  const e = le(t).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Fr, "Fr");
__name2(Fr, "Fr");
function Qe(t) {
  const e = le(t).split(`
`), r = Fr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: le(t) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : e.length, o = i.title, u = e.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(Qe, "Qe");
__name2(Qe, "Qe");
function Jr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function pe(t, e) {
  const n = Je(t).map((i, a) => ({ s: i, i: a, score: Jr(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Pr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(pe, "pe");
__name2(pe, "pe");
function me(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(me, "me");
__name2(me, "me");
var We = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function lt(t, e, r) {
  const n = Math.max(60, me(t)), s = me(e), i = Math.floor(n * We[r].min), a = Math.ceil(n * We[r].max);
  return s < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(lt, "lt");
__name2(lt, "lt");
function Ae(t, e, r) {
  const n = Math.max(60, me(t)), s = Math.ceil(n * We[r].max);
  let i = String(e || "").trim();
  if (me(i) <= s)
    return i;
  const a = Je(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (me(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ae, "Ae");
__name2(Ae, "Ae");
function ze(t, e) {
  return `${t}_${e}`;
}
__name(ze, "ze");
__name2(ze, "ze");
function Br(t) {
  const e = Qe(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    const a = ze("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = pe(s.body, 6), o = [];
    for (const b of l)
      (b.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((P) => {
        const T = P.replace(/[()]/g, "").trim();
        T.length >= 2 && T.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(T) && o.push(T);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((b) => u.set(b, (u.get(b) || 0) + 1));
    const d = Array.from(u.entries()).sort((b, _) => _[1] - b[1]).map((b) => b[0]).filter((b) => b.length <= 10).slice(0, 3), f = pe(s.body, 3).join(" "), p = pe(s.body, 2).join(" "), x = pe(s.body, 1).join(" "), O = { id: ze(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: x, children: [] };
    d.forEach((b) => {
      n.has(b) || n.set(b, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${b}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${pe(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const j = Je(s.body).filter((b) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(b)).slice(0, 2);
    j.length && O.children.push({ id: ze(a + "_adv", 1), title: j.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(O), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Br, "Br");
__name2(Br, "Br");
function Nt(t, e) {
  const r = JSON.parse(JSON.stringify(t)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (e === "brief" && (s.explain = s.explainBrief || s.explain), e === "standard" && (s.explain = s.explainStandard || s.explain), e === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = e !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Nt, "Nt");
__name2(Nt, "Nt");
function Kr(t, e, r, n) {
  const s = (e.children || []).map((u) => u.title), a = (Nt(e, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: Ae(t, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ae(t, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function Vr(t, e) {
  const r = Qe(t), n = e === "brief" ? 2 : e === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = e === "brief" || e === "standard" ? 1 : 2;
    s.push(...pe(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return Ae(t, i, e);
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function Gr(t, e) {
  Qe(t);
  const r = Je(t), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function zr(t, e) {
  let r = t.length, n = 0;
  const s = [];
  for (const a of t) {
    const c = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((x) => x.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((x) => {
      c.includes(x) && d++;
    });
    const f = d >= 2 || c.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(zr, "zr");
__name2(zr, "zr");
function ut(t) {
  const e = le(t), { tree: r, glossary: n } = Br(e), s = { originalMeta: { textHash: Ye(e), chars: e.length, ts: Te() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Vr(e, i), c = Kr(e, r, n, i), l = Nt(r, i), o = Gr(e), d = lt(e, a, i).ok ? a : Ae(e, a, i), f = c.renderText || "", p = lt(e, f, i);
    c.renderText = p.ok ? f : Ae(e, f, i), s.modes[i] = { narrative: d, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(ut, "ut");
__name2(ut, "ut");
J.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: Te(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
J.post("/api/engine", async (t) => {
  var p, x, O, v, j, b, _;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), n = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", s = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), c = (e == null ? void 0 : e.useGemini) === true, l = le(r);
  if (l.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && t.env.GEMINI_API_KEY)
    try {
      const P = qr({ text: l, viewType: s, level: "detail", grade: i, subject: a }), T = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", U = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${T}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: P }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), S = (((j = (v = (O = (x = (p = U == null ? void 0 : U.candidates) == null ? void 0 : p[0]) == null ? void 0 : x.content) == null ? void 0 : O.parts) == null ? void 0 : v[0]) == null ? void 0 : j.text) || "").match(/\{[\s\S]*\}/);
      if (S) {
        const R = JSON.parse(S[0]);
        u = { originalMeta: { textHash: Ye(l), chars: l.length, ts: Te() }, modes: { detail: { [s]: R }, standard: { [s]: R }, brief: { [s]: R } } }, o = "gemini-" + T;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (P) {
      console.error("[Gemini Error]", P), u = ut(l), o = "v5-local-fallback";
    }
  else
    u = ut(l);
  const d = (_ = (b = u.modes) == null ? void 0 : b[n]) == null ? void 0 : _[s], f = { engine: o, mode: n, viewType: s, ts: Te(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
J.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], n = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, s = zr(r, n);
  return t.json({ ok: true, result: s });
});
J.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = le(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = Te(), l = Ye(s), o = JSON.stringify(i);
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
J.get("/api/loadSummary", async (t) => {
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
J.get("/", (t) => t.redirect("/static/v5.html"));
var ht = new Mt();
var Ur = Object.assign({ "/src/index.tsx": J });
var Pt = false;
for (const [, t] of Object.entries(Ur))
  t && (ht.route("/", t), ht.notFound(t.notFoundHandler), Pt = true);
if (!Pt)
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
var middleware_insertion_facade_default = ht;
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

// .wrangler/tmp/pages-U6CKl5/gvoay5d2qau.js
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

// .wrangler/tmp/bundle-dJXt20/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-dJXt20/middleware-loader.entry.ts
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
//# sourceMappingURL=gvoay5d2qau.js.map
