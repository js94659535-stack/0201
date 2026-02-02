var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-jvDVIZ/checked-fetch.js
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

// .wrangler/tmp/bundle-jvDVIZ/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-R5OKmp/bundledWorker-0.9847330780476595.mjs
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
var Wt = Object.defineProperty;
var ct = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "ct");
var Yt = /* @__PURE__ */ __name2((e, t, r) => t in e ? Wt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Yt");
var v = /* @__PURE__ */ __name2((e, t, r) => Yt(e, typeof t != "symbol" ? t + "" : t, r), "v");
var Ye = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || ct("Cannot " + r), "Ye");
var d = /* @__PURE__ */ __name2((e, t, r) => (Ye(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var S = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? ct("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "S");
var y = /* @__PURE__ */ __name2((e, t, r, n) => (Ye(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "y");
var E = /* @__PURE__ */ __name2((e, t, r) => (Ye(e, t, "access private method"), r), "E");
var lt = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  y(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "lt");
var ut = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let l, o = false, u;
    if (e[c] ? (u = e[c][0][0], n.req.routeIndex = c) : u = c === e.length && s || void 0, u)
      try {
        l = await u(n, () => a(c + 1));
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, l = await t(h, n), o = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || o) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "ut");
var Xt = Symbol();
var Qt = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof Mt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Zt(e, { all: r, dot: n }) : {};
}, "Qt");
async function Zt(e, t) {
  const r = await e.formData();
  return r ? er(r, t) : {};
}
__name(Zt, "Zt");
__name2(Zt, "Zt");
function er(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? tr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (rr(r, n, s), delete r[n]);
  }), r;
}
__name(er, "er");
__name2(er, "er");
var tr = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "tr");
var rr = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "rr");
var $t = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "$t");
var nr = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = sr(e), n = $t(r);
  return ir(n, t);
}, "nr");
var sr = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "sr");
var ir = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "ir");
var He = {};
var ar = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return He[n] || (r[2] ? He[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : He[n] = [e, r[1], true]), He[n];
  }
  return null;
}, "ar");
var st = /* @__PURE__ */ __name2((e, t) => {
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
}, "st");
var or = /* @__PURE__ */ __name2((e) => st(e, decodeURI), "or");
var Ot = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return or(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Ot");
var cr = /* @__PURE__ */ __name2((e) => {
  const t = Ot(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "cr");
var de = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = de(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "de");
var Tt = /* @__PURE__ */ __name2((e) => {
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
}, "Tt");
var Xe = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? st(e, Rt) : e) : e, "Xe");
var Ct = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const c = e.charCodeAt(a + t.length + 1);
      if (c === 61) {
        const l = a + t.length + 2, o = e.indexOf("&", l);
        return Xe(e.slice(l, o === -1 ? void 0 : o));
      } else if (c == 38 || isNaN(c))
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
    let c = e.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let l = e.slice(i + 1, c === -1 ? a === -1 ? void 0 : a : c);
    if (n && (l = Xe(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = e.slice(c + 1, a === -1 ? void 0 : a), n && (o = Xe(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return t ? s[t] : s;
}, "Ct");
var lr = Ct;
var ur = /* @__PURE__ */ __name2((e, t) => Ct(e, t, true), "ur");
var Rt = decodeURIComponent;
var dt = /* @__PURE__ */ __name2((e) => st(e, Rt), "dt");
var ge;
var P;
var G;
var It;
var _t;
var tt;
var U;
var bt;
var Mt = (bt = /* @__PURE__ */ __name2(class {
  constructor(e, t = "/", r = [[]]) {
    S(this, G);
    v(this, "raw");
    S(this, ge);
    S(this, P);
    v(this, "routeIndex", 0);
    v(this, "path");
    v(this, "bodyCache", {});
    S(this, U, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, y(this, P, r), y(this, ge, {});
  }
  param(e) {
    return e ? E(this, G, It).call(this, e) : E(this, G, _t).call(this);
  }
  query(e) {
    return lr(this.url, e);
  }
  queries(e) {
    return ur(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Qt(this, e));
  }
  json() {
    return d(this, U).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, U).call(this, "text");
  }
  arrayBuffer() {
    return d(this, U).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, U).call(this, "blob");
  }
  formData() {
    return d(this, U).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, ge)[e] = t;
  }
  valid(e) {
    return d(this, ge)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Xt]() {
    return d(this, P);
  }
  get matchedRoutes() {
    return d(this, P)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, P)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "bt"), ge = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), It = /* @__PURE__ */ __name2(function(e) {
  const t = d(this, P)[0][this.routeIndex][1][e], r = E(this, G, tt).call(this, t);
  return r && /\%/.test(r) ? dt(r) : r;
}, "It"), _t = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(d(this, P)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = E(this, G, tt).call(this, d(this, P)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? dt(n) : n);
  }
  return e;
}, "_t"), tt = /* @__PURE__ */ __name2(function(e) {
  return d(this, P)[1] ? d(this, P)[1][e] : e;
}, "tt"), U = /* @__PURE__ */ new WeakMap(), bt);
var dr = { Stringify: 1 };
var Pt = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((c) => c({ phase: t, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => Pt(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Pt");
var hr = "text/plain; charset=UTF-8";
var Qe = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "Qe");
var Me;
var Ie;
var K;
var xe;
var V;
var R;
var _e;
var ye;
var ve;
var ne;
var Pe;
var Ne;
var z;
var he;
var St;
var fr = (St = /* @__PURE__ */ __name2(class {
  constructor(e, t) {
    S(this, z);
    S(this, Me);
    S(this, Ie);
    v(this, "env", {});
    S(this, K);
    v(this, "finalized", false);
    v(this, "error");
    S(this, xe);
    S(this, V);
    S(this, R);
    S(this, _e);
    S(this, ye);
    S(this, ve);
    S(this, ne);
    S(this, Pe);
    S(this, Ne);
    v(this, "render", (...e2) => (d(this, ye) ?? y(this, ye, (t2) => this.html(t2)), d(this, ye).call(this, ...e2)));
    v(this, "setLayout", (e2) => y(this, _e, e2));
    v(this, "getLayout", () => d(this, _e));
    v(this, "setRenderer", (e2) => {
      y(this, ye, e2);
    });
    v(this, "header", (e2, t2, r) => {
      this.finalized && y(this, R, new Response(d(this, R).body, d(this, R)));
      const n = d(this, R) ? d(this, R).headers : d(this, ne) ?? y(this, ne, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    v(this, "status", (e2) => {
      y(this, xe, e2);
    });
    v(this, "set", (e2, t2) => {
      d(this, K) ?? y(this, K, /* @__PURE__ */ new Map()), d(this, K).set(e2, t2);
    });
    v(this, "get", (e2) => d(this, K) ? d(this, K).get(e2) : void 0);
    v(this, "newResponse", (...e2) => E(this, z, he).call(this, ...e2));
    v(this, "body", (e2, t2, r) => E(this, z, he).call(this, e2, t2, r));
    v(this, "text", (e2, t2, r) => !d(this, ne) && !d(this, xe) && !t2 && !r && !this.finalized ? new Response(e2) : E(this, z, he).call(this, e2, t2, Qe(hr, r)));
    v(this, "json", (e2, t2, r) => E(this, z, he).call(this, JSON.stringify(e2), t2, Qe("application/json", r)));
    v(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => E(this, z, he).call(this, s, t2, Qe("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Pt(e2, dr.Stringify, false, {}).then(n) : n(e2);
    });
    v(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    v(this, "notFound", () => (d(this, ve) ?? y(this, ve, () => new Response()), d(this, ve).call(this, this)));
    y(this, Me, e), t && (y(this, V, t.executionCtx), this.env = t.env, y(this, ve, t.notFoundHandler), y(this, Ne, t.path), y(this, Pe, t.matchResult));
  }
  get req() {
    return d(this, Ie) ?? y(this, Ie, new Mt(d(this, Me), d(this, Ne), d(this, Pe))), d(this, Ie);
  }
  get event() {
    if (d(this, V) && "respondWith" in d(this, V))
      return d(this, V);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, V))
      return d(this, V);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, R) || y(this, R, new Response(null, { headers: d(this, ne) ?? y(this, ne, new Headers()) }));
  }
  set res(e) {
    if (d(this, R) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, R).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = d(this, R).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    y(this, R, e), this.finalized = true;
  }
  get var() {
    return d(this, K) ? Object.fromEntries(d(this, K)) : {};
  }
}, "St"), Me = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), he = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = d(this, R) ? new Headers(d(this, R).headers) : d(this, ne) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, xe);
  return new Response(e, { status: s, headers: n });
}, "he"), St);
var A = "ALL";
var pr = "all";
var mr = ["get", "post", "put", "delete", "options", "patch"];
var Nt = "Can not add a route since the matcher is already built.";
var Dt = /* @__PURE__ */ __name2(class extends Error {
}, "Dt");
var gr = "__COMPOSED_HANDLER";
var xr = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "xr");
var ht = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "ht");
var N;
var $;
var Ht;
var D;
var te;
var Le;
var qe;
var we;
var yr = (we = /* @__PURE__ */ __name2(class {
  constructor(t = {}) {
    S(this, $);
    v(this, "get");
    v(this, "post");
    v(this, "put");
    v(this, "delete");
    v(this, "options");
    v(this, "patch");
    v(this, "all");
    v(this, "on");
    v(this, "use");
    v(this, "router");
    v(this, "getPath");
    v(this, "_basePath", "/");
    S(this, N, "/");
    v(this, "routes", []);
    S(this, D, xr);
    v(this, "errorHandler", ht);
    v(this, "onError", (t2) => (this.errorHandler = t2, this));
    v(this, "notFound", (t2) => (y(this, D, t2), this));
    v(this, "fetch", (t2, ...r) => E(this, $, qe).call(this, t2, r[1], r[0], t2.method));
    v(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${de("/", t2)}`, r), n2, s2)));
    v(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(E(this, $, qe).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...mr, pr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? y(this, N, a) : E(this, $, te).call(this, i, d(this, N), a), c.forEach((l) => {
        E(this, $, te).call(this, i, d(this, N), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        y(this, N, l);
        for (const o of [i].flat())
          c.map((u) => {
            E(this, $, te).call(this, o.toUpperCase(), d(this, N), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, N, i) : (y(this, N, "*"), a.unshift(i)), a.forEach((c) => {
      E(this, $, te).call(this, A, d(this, N), c);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Ot : cr;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ht ? i = s.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await ut([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[gr] = s.handler), E(a = n, $, te).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = E(this, $, Ht).call(this);
    return r._basePath = de(this._basePath, t), r;
  }
  mount(t, r, n) {
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
      const l = de(this._basePath, t), o = l === "/" ? 0 : l.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(o) || "/", new Request(h, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return E(this, $, te).call(this, A, de(t, "*"), c), this;
  }
}, "we"), N = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), Ht = /* @__PURE__ */ __name2(function() {
  const t = new we({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, y(t, D, d(this, D)), t.routes = this.routes, t;
}, "Ht"), D = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = de(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "te"), Le = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Le"), qe = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await E(this, $, qe).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), c = new fr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: d(this, D) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await d(this, D).call(this, c);
      });
    } catch (u) {
      return E(this, $, Le).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : d(this, D).call(this, c))).catch((u) => E(this, $, Le).call(this, u, c)) : o ?? d(this, D).call(this, c);
  }
  const l = ut(a[0], this.errorHandler, d(this, D));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return E(this, $, Le).call(this, o, c);
    }
  })();
}, "qe"), we);
var Lt = [];
function vr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[A], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], Lt];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(e, t);
}
__name(vr, "vr");
__name2(vr, "vr");
var Ge = "[^/]+";
var $e = ".*";
var Oe = "(?:|/.*)";
var fe = Symbol();
var wr = new Set(".\\+*[^]$()");
function br(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === $e || e === Oe ? 1 : t === $e || t === Oe ? -1 : e === Ge ? 1 : t === Ge ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(br, "br");
__name2(br, "br");
var se;
var ie;
var H;
var ce;
var Sr = (ce = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, se);
    S(this, ie);
    S(this, H, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (d(this, se) !== void 0)
        throw fe;
      if (i)
        return;
      y(this, se, r);
      return;
    }
    const [a, ...c] = t, l = a === "*" ? c.length === 0 ? ["", "", $e] : ["", "", Ge] : a === "/*" ? ["", "", Oe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let h = l[2] || Ge;
      if (u && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw fe;
      if (o = d(this, H)[h], !o) {
        if (Object.keys(d(this, H)).some((f) => f !== $e && f !== Oe))
          throw fe;
        if (i)
          return;
        o = d(this, H)[h] = new ce(), u !== "" && y(o, ie, s.varIndex++);
      }
      !i && u !== "" && n.push([u, d(o, ie)]);
    } else if (o = d(this, H)[a], !o) {
      if (Object.keys(d(this, H)).some((u) => u.length > 1 && u !== $e && u !== Oe))
        throw fe;
      if (i)
        return;
      o = d(this, H)[a] = new ce();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, H)).sort(br).map((n) => {
      const s = d(this, H)[n];
      return (typeof d(s, ie) == "number" ? `(${n})@${d(s, ie)}` : wr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, se) == "number" && r.unshift(`#${d(this, se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ce"), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ce);
var Ue;
var De;
var Et;
var Er = (Et = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, Ue, { varIndex: 0 });
    S(this, De, new Sr());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let c = false;
      if (e = e.replace(/\{[^}]+\}/g, (l) => {
        const o = `@\\${a}`;
        return s[a] = [o, l], a++, c = true, o;
      }), !c)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [c] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(c) !== -1) {
          i[l] = i[l].replace(c, s[a][1]);
          break;
        }
    }
    return d(this, De).insert(i, t, n, d(this, Ue), r), n;
  }
  buildRegExp() {
    let e = d(this, De).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Et"), Ue = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Et);
var jr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Fe = /* @__PURE__ */ Object.create(null);
function qt(e) {
  return Fe[e] ?? (Fe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(qt, "qt");
__name2(qt, "qt");
function kr() {
  Fe = /* @__PURE__ */ Object.create(null);
}
__name(kr, "kr");
__name2(kr, "kr");
function Ar(e) {
  var o;
  const t = new Er(), r = [];
  if (e.length === 0)
    return jr;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [f, p]) => u ? 1 : f ? -1 : h.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, f = n.length; u < f; u++) {
    const [p, g, b] = n[u];
    p ? s[g] = [b.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), Lt] : h++;
    let x;
    try {
      x = t.insert(g, h, p);
    } catch (w) {
      throw w === fe ? new Dt(g) : w;
    }
    p || (r[h] = b.map(([w, m]) => {
      const k = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [M, j] = x[m];
        k[M] = j;
      }
      return [w, k];
    }));
  }
  const [i, a, c] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const g = (o = r[u][f]) == null ? void 0 : o[1];
      if (!g)
        continue;
      const b = Object.keys(g);
      for (let x = 0, w = b.length; x < w; x++)
        g[b[x]] = c[g[b[x]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(Ar, "Ar");
__name2(Ar, "Ar");
function ue(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (qt(r).test(t))
        return [...e[r]];
  }
}
__name(ue, "ue");
__name2(ue, "ue");
var W;
var Y;
var ze;
var Ft;
var jt;
var $r = (jt = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, ze);
    v(this, "name", "RegExpRouter");
    S(this, W);
    S(this, Y);
    v(this, "match", vr);
    y(this, W, { [A]: /* @__PURE__ */ Object.create(null) }), y(this, Y, { [A]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var c;
    const n = d(this, W), s = d(this, Y);
    if (!n || !s)
      throw new Error(Nt);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[A]).forEach((o) => {
        l[e][o] = [...l[A][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = qt(t);
      e === A ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = ue(n[o], t) || ue(n[A], t) || []);
      }) : (c = n[e])[t] || (c[t] = ue(n[e], t) || ue(n[A], t) || []), Object.keys(n).forEach((o) => {
        (e === A || e === o) && Object.keys(n[o]).forEach((u) => {
          l.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === A || e === o) && Object.keys(s[o]).forEach((u) => l.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Tt(t) || [t];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(s).forEach((h) => {
        var f;
        (e === A || e === h) && ((f = s[h])[u] || (f[u] = [...ue(n[h], u) || ue(n[A], u) || []]), s[h][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, Y)).concat(Object.keys(d(this, W))).forEach((t) => {
      e[t] || (e[t] = E(this, ze, Ft).call(this, t));
    }), y(this, W, y(this, Y, void 0)), kr(), e;
  }
}, "jt"), W = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakSet(), Ft = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === A;
  return [d(this, W), d(this, Y)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== A && t.push(...Object.keys(n[A]).map((i) => [i, n[A][i]]));
  }), r ? Ar(t) : null;
}, "Ft"), jt);
var X;
var B;
var kt;
var Or = (kt = /* @__PURE__ */ __name2(class {
  constructor(e) {
    v(this, "name", "SmartRouter");
    S(this, X, []);
    S(this, B, []);
    y(this, X, e.routers);
  }
  add(e, t, r) {
    if (!d(this, B))
      throw new Error(Nt);
    d(this, B).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, B))
      throw new Error("Fatal error");
    const r = d(this, X), n = d(this, B), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(e, t);
      } catch (l) {
        if (l instanceof Dt)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), y(this, X, [c]), y(this, B, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, B) || d(this, X).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, X)[0];
  }
}, "kt"), X = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), kt);
var ke = /* @__PURE__ */ Object.create(null);
var Q;
var T;
var ae;
var be;
var O;
var J;
var re;
var Se;
var Tr = (Se = /* @__PURE__ */ __name2(class {
  constructor(t, r, n) {
    S(this, J);
    S(this, Q);
    S(this, T);
    S(this, ae);
    S(this, be, 0);
    S(this, O, ke);
    if (y(this, T, n || /* @__PURE__ */ Object.create(null)), y(this, Q, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, y(this, Q, [s]);
    }
    y(this, ae, []);
  }
  insert(t, r, n) {
    y(this, be, ++lt(this, be)._);
    let s = this;
    const i = nr(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], h = ar(o, u), f = Array.isArray(h) ? h[0] : o;
      if (f in d(s, T)) {
        s = d(s, T)[f], h && a.push(h[1]);
        continue;
      }
      d(s, T)[f] = new Se(), h && (d(s, ae).push(h), a.push(h[1])), s = d(s, T)[f];
    }
    return d(s, Q).push({ [t]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: d(this, be) } }), s;
  }
  search(t, r) {
    var l;
    const n = [];
    y(this, O, ke);
    let i = [this];
    const a = $t(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const h = a[o], f = o === u - 1, p = [];
      for (let g = 0, b = i.length; g < b; g++) {
        const x = i[g], w = d(x, T)[h];
        w && (y(w, O, d(x, O)), f ? (d(w, T)["*"] && n.push(...E(this, J, re).call(this, d(w, T)["*"], t, d(x, O))), n.push(...E(this, J, re).call(this, w, t, d(x, O)))) : p.push(w));
        for (let m = 0, k = d(x, ae).length; m < k; m++) {
          const M = d(x, ae)[m], j = d(x, O) === ke ? {} : { ...d(x, O) };
          if (M === "*") {
            const L = d(x, T)["*"];
            L && (n.push(...E(this, J, re).call(this, L, t, d(x, O))), y(L, O, j), p.push(L));
            continue;
          }
          const [F, I, _] = M;
          if (!h && !(_ instanceof RegExp))
            continue;
          const C = d(x, T)[F], Z = a.slice(o).join("/");
          if (_ instanceof RegExp) {
            const L = _.exec(Z);
            if (L) {
              if (j[I] = L[0], n.push(...E(this, J, re).call(this, C, t, d(x, O), j)), Object.keys(d(C, T)).length) {
                y(C, O, j);
                const ee = ((l = L[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[ee] || (c[ee] = [])).push(C);
              }
              continue;
            }
          }
          (_ === true || _.test(h)) && (j[I] = h, f ? (n.push(...E(this, J, re).call(this, C, t, j, d(x, O))), d(C, T)["*"] && n.push(...E(this, J, re).call(this, d(C, T)["*"], t, j, d(x, O)))) : (y(C, O, j), p.push(C)));
        }
      }
      i = p.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Se"), Q = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name2(function(t, r, n, s) {
  const i = [];
  for (let a = 0, c = d(t, Q).length; a < c; a++) {
    const l = d(t, Q)[a], o = l[r] || l[A], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== ke || s && s !== ke))
      for (let h = 0, f = o.possibleKeys.length; h < f; h++) {
        const p = o.possibleKeys[h], g = u[o.score];
        o.params[p] = s != null && s[p] && !g ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "re"), Se);
var oe;
var At;
var Cr = (At = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, "name", "TrieRouter");
    S(this, oe);
    y(this, oe, new Tr());
  }
  add(e, t, r) {
    const n = Tt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        d(this, oe).insert(e, n[s], r);
      return;
    }
    d(this, oe).insert(e, t, r);
  }
  match(e, t) {
    return d(this, oe).search(e, t);
  }
}, "At"), oe = /* @__PURE__ */ new WeakMap(), At);
var Kt = /* @__PURE__ */ __name2(class extends yr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Or({ routers: [new $r(), new Cr()] });
  }
}, "Kt");
var Rr = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(h, f) {
      a.res.headers.set(h, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && l("Access-Control-Allow-Methods", h.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Rr");
var Mr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ft = /* @__PURE__ */ __name2((e, t = _r) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ft");
var Ir = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var _r = Ir;
var Pr = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Pr");
var Vt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Nr = Object.keys(Vt);
var Dr = "index.html";
var Hr = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? Pr;
  return async (s, i) => {
    var u, h, f, p;
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
        return await ((u = e.onNotFound) == null ? void 0 : u.call(e, s.req.path, s)), i();
      }
    let c = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(c) && (c = n(c, Dr));
    const l = e.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const g = e.mimes && ft(c, e.mimes) || ft(c);
      if (s.header("Content-Type", g || "application/octet-stream"), e.precompressed && (!g || Mr.test(g))) {
        const b = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((x) => x.trim()));
        for (const x of Nr) {
          if (!b.has(x))
            continue;
          const w = await l(c + Vt[x], s);
          if (w) {
            o = w, s.header("Content-Encoding", x), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, c, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, c, s)), await i();
  };
}, "Hr");
var Lr = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Lr");
var qr = /* @__PURE__ */ __name2((e) => async function(r, n) {
  return Hr({ ...e, getContent: async (i) => Lr(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "qr");
var Fr = /* @__PURE__ */ __name2((e) => qr(e), "Fr");
var Bt = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function rt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(rt, "rt");
__name2(rt, "rt");
function Ae(e) {
  return e.replace(/\s+/g, "").length;
}
__name(Ae, "Ae");
__name2(Ae, "Ae");
function je(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.")).map((t) => t.trim()).filter(Boolean);
}
__name(je, "je");
__name2(je, "je");
function Jt(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
function Ee(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function Ze(e, t, r) {
  const n = rt(e), i = rt(t) / Math.max(n, 1), a = Bt[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(Ze, "Ze");
__name2(Ze, "Ze");
function Kr(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD6D\uAC00\uC758 \uACF5\uAD50\uC721 \uCC45\uC784 \uC218\uC900\uC774 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uD2B9\uD788 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC758 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870 \uCC28\uC774\uAC00 \uD575\uC2EC \uBE44\uAD50 \uC9C0\uC810\uC73C\uB85C \uC81C\uC2DC\uB41C\uB2E4", "\uAE00\uC740 \uAD50\uC721 \uC81C\uB3C4\uC640 \uC785\uC2DC \uBE44\uC911\uC5D0 \uB300\uD55C \uC778\uC2DD \uCC28\uC774\uAC00 \uD559\uC2B5 \uBB38\uD654\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uBCF8\uB2E4"] : ["\uC774\uB7EC\uD55C \uBE44\uAD50\uB294 \uACF5\uAD50\uC721 \uC9C0\uC6D0 \uBC29\uC2DD\uC774 \uD559\uC2B5 \uBB38\uD654 \uC804\uBC18\uC5D0 \uBBF8\uCE58\uB294 \uC601\uD5A5\uC744 \uC774\uD574\uD558\uB294 \uB370 \uB3C4\uC6C0\uC744 \uC900\uB2E4", "\uAE00\uC740 \uAD6D\uAC00\uBCC4 \uC81C\uB3C4\uC640 \uC0AC\uD68C\uC801 \uC778\uC2DD\uC774 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uACB0\uC815\uD55C\uB2E4\uACE0 \uC885\uD569\uD55C\uB2E4"];
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function Vr(e, t, r) {
  let s = je(t).slice();
  const i = Ze(e, s.join(". ") + ".", r);
  let a = i, c = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), c = true, a = Ze(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const l = Kr(r);
    for (const o of l)
      if (s.push(o), c = true, a = Ze(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: c, originalRatio: i.ratio };
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function Ke(e, t) {
  const r = je(e), n = Jt(e), s = Ee(e), i = Ae(e), a = Bt[t], c = Math.floor(i * a.min), l = Math.floor(i * a.max), o = r[0] ? `${r[0].split("\uBA70")[0]}\uBA70, \uC774\uB294 \uD575\uC2EC \uD2B9\uC9D5\uC774\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", u = [];
  for (n.length >= 2 && u.push(`\uC8FC\uC694 \uC218\uCE58\uB85C ${n[0]}\uC640 ${n[1]}\uC774 \uC911\uC694\uD55C \uAE30\uC900\uC810\uC774 \uB41C\uB2E4`), n.length >= 3 && u.push(`\uB610\uD55C ${n[2]}\uB3C4 \uD568\uAED8 \uACE0\uB824\uD574\uC57C \uD558\uBA70, \uC774\uB294 \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uD544\uC218\uC801\uC774\uB2E4`), r.length >= 2 && u.length < 2 && u.push(r[1].slice(0, 80) + "\uB294 \uC810\uC5D0\uC11C \uC911\uC694\uD55C \uADFC\uAC70\uAC00 \uB41C\uB2E4"); u.length < 3; )
    u.push(`${u.length + 1}\uCC28 \uBD84\uC11D\uC73C\uB85C \uAD00\uB828 \uB9E5\uB77D\uACFC \uBC30\uACBD\uC744 \uC885\uD569\uD558\uBA74 \uCD94\uAC00 \uADFC\uAC70\uAC00 \uD655\uC778\uB41C\uB2E4`);
  const h = n.length >= 4 ? `\uAD6C\uCCB4\uC801\uC73C\uB85C ${n[0]}\uC640 ${n[2]}\uB97C \uBE44\uAD50\uD558\uBA74 \uC57D ${Math.abs(parseFloat(n[0]) - parseFloat(n[2])).toFixed(1)}\uBC30 \uC218\uC900\uC774 \uCC28\uC774\uAC00 \uB098\uD0C0\uB098\uBA70, \uC774\uB294 \uB450 \uB300\uC0C1 \uAC04 \uAD6C\uC870\uC801 \uACA9\uCC28\uB97C \uBCF4\uC5EC\uC900\uB2E4` : "\uBE44\uAD50 \uB300\uC0C1 \uAC04 \uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uD655\uC778\uB418\uBA70, \uD2B9\uD788 \uC811\uADFC \uBC29\uC2DD\uACFC \uC2E4\uD589 \uC804\uB7B5\uC5D0\uC11C \uB300\uC870\uB97C \uC774\uB8EC\uB2E4", f = s.some((m) => m.includes("\uAD50\uC721")) && s.some((m) => m.includes("\uBD80\uB2F4")) ? "\uC774\uB7EC\uD55C \uBD84\uC11D \uACB0\uACFC\uB294 \uAD50\uC721 \uC7AC\uC815 \uAD6C\uC870\uC640 \uC815\uCC45 \uBC29\uD5A5\uC774 \uBCF8\uC9C8\uC801 \uCC28\uC774\uB97C \uC2DC\uC0AC\uD558\uBA70, \uD5A5\uD6C4 \uAC1C\uC120 \uBC29\uD5A5\uC744 \uBAA8\uC0C9\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC2DC\uC0AC\uC810\uC744 \uC81C\uACF5\uD55C\uB2E4" : "\uC774\uC0C1 \uB0B4\uC6A9\uC744 \uC885\uD569\uD558\uBA74 \uAD6D\uAC00\uBCC4 \uC815\uCC45\uACFC \uC81C\uB3C4\uAC00 \uCC28\uC774\uB97C \uACB0\uACFC\uC5D0 \uBC18\uC601\uB41C \uAC83\uC73C\uB85C \uD574\uC11D\uB418\uBA70, \uC774\uB294 \uD5A5\uD6C4 \uC815\uCC45 \uC218\uB9BD \uC2DC \uCC38\uACE0\uD560 \uB9CC\uD55C \uC911\uC694\uD55C \uC0AC\uB840\uAC00 \uB41C\uB2E4";
  let p = "";
  t === "brief" ? p = `${o}. ${h}.` : t === "standard" ? p = `${o}. ${u[0] || ""}. ${h}.` : p = `${o}. ${u.join(". ")}. ${h}. ${f}.`;
  let g = Ae(p);
  if (g > l) {
    const m = p.split(/\n\n/).filter(Boolean);
    let k = "";
    for (const M of m) {
      const j = k + (k ? `

` : "") + M;
      if (Ae(j) <= l)
        k = j;
      else
        break;
    }
    p = k || p.slice(0, l) + "...", g = Ae(p);
  }
  if (g < c && t !== "brief") {
    const m = `\uC6D0\uBB38\uC5D0\uC11C\uB294 ${s.slice(0, 3).join(", ")} \uAC19\uC740 \uC8FC\uC694 \uAC1C\uB150\uC744 \uB2E4\uB8E8\uACE0 \uC788\uB2E4.`;
    p += " " + m, g = Ae(p);
  }
  const b = Vr(e, p, t), x = b.text, w = rt(x);
  return { type: "narrative", level: t, text: x, charCount: w, ratio: b.ratio, targetRange: { min: a.min, max: a.max, minChars: c, maxChars: l }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C", ratioEnforcement: { wasAdjusted: b.adjusted, originalRatio: b.originalRatio, finalRatio: b.ratio, targetRatio: a.target }, coreClaim: o, grounds: u, comparisons: [h], implications: [f] };
}
__name(Ke, "Ke");
__name2(Ke, "Ke");
function Ve(e, t) {
  const r = je(e), n = Ee(e), s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, s).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Ve, "Ve");
__name2(Ve, "Ve");
function Be(e, t, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = t === "brief" || t === "standard" ? 2 : 4;
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(Be, "Be");
__name2(Be, "Be");
function Br(e) {
  const t = je(e), r = Ee(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(Br, "Br");
__name2(Br, "Br");
function Jr(e, t) {
  const r = je(e), n = t === "brief" ? 2 : t === "standard" ? 3 : 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const c = a * i, l = r.slice(c, c + i);
    if (l.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${l[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: l });
  }
  return s;
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function Gr(e, t) {
  const r = Ee(e);
  Jt(e);
  const n = je(e), s = t === "brief" ? 3 : t === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let c = 0; c < s && c < a.length; c++) {
    const l = a[c], o = Ur(l), u = n.find((h) => h.includes(l)) || `${l}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: l, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function Ur(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(Ur, "Ur");
__name2(Ur, "Ur");
function Je(e, t) {
  const r = Br(e), n = Jr(e, t), s = Gr(e, t), i = Ee(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: Ee(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], c = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), l = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: l, hierarchy: a, glossary: c, coreTerms: s };
}
__name(Je, "Je");
__name2(Je, "Je");
function Gt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function pt(e) {
  const t = (e || "").trim();
  if (!t)
    return null;
  try {
    return JSON.parse(t);
  } catch {
  }
  const r = t.indexOf("{"), n = t.lastIndexOf("}");
  if (r >= 0 && n > r) {
    const s = t.slice(r, n + 1);
    try {
      return JSON.parse(s);
    } catch {
    }
  }
  return null;
}
__name(pt, "pt");
__name2(pt, "pt");
function zr(e) {
  const t = Ke(e, "detail"), r = Je(e, "detail"), n = Ve(e, "detail"), s = Be(t.text, "detail", "exam"), i = e.length, a = Gt(e), c = t.coreClaim, l = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let h = t.text;
  if (!h.includes(`

`)) {
    const w = h.split(". ").filter(Boolean), m = Math.ceil(w.length / 2);
    h = w.slice(0, m).join(". ") + `.

` + w.slice(m).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, g = r.glossary, b = { title: n.title, children: n.children.map((w) => ({ title: w.title, children: (w.children || []).map((m) => ({ title: m.title, pack: Array.isArray(m.pack) && m.pack.length >= 2 ? m.pack : [m.title, `${m.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: m.explain && m.explain.length >= 30 ? m.explain : `${m.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (b.children[0] || b.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); b.children[0].children.length < 3; ) {
    const w = b.children[0].children.length + 1;
    b.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${w}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${w}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const x = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: c, grounds: l, comparisons: o, implications: u, summaryDetail: h }, structured: { toc: f, hierarchy: p, glossary: g }, mindmap: b, selftest: x };
}
__name(zr, "zr");
__name2(zr, "zr");
function mt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(mt, "mt");
__name2(mt, "mt");
function Wr(e) {
  var i, a, c, l, o, u, h, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((c = e == null ? void 0 : e.narrative) != null && c.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = e == null ? void 0 : e.structured) == null ? void 0 : l.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const g of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(g.pack) && g.pack.length && n++, typeof g.explain == "string" && g.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((h = e == null ? void 0 : e.selftest) != null && h.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Wr, "Wr");
__name2(Wr, "Wr");
function Yr(e) {
  var o, u, h, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((o = e.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((h = e.detail.structured.glossary) == null ? void 0 : h.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let g = 0;
    for (const b of (p == null ? void 0 : p.children) || [])
      g += ((b == null ? void 0 : b.children) || []).length;
    return g;
  }, "i"), a = i(e.brief.mindmap.tree), c = i(e.standard.mindmap.tree), l = i(e.detail.mindmap.tree);
  return a === c && c === l || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${c}, detail:${l})`), t;
}
__name(Yr, "Yr");
__name2(Yr, "Yr");
async function gt(e, t) {
  var c, l, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((h) => h.text).join("")) || "";
}
__name(gt, "gt");
__name2(gt, "gt");
function Xr(e) {
  e.post("/api/matrix", async (t) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await t.req.json(), i = String(s.text || "").trim();
      if (!i)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Gt(i), c = t.env.USE_MOCK === "true" || !t.env.GEMINI_API_KEY;
      let l = null;
      if (c)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), l = zr(i);
      else {
        const L = mt(i);
        let ee = await gt(t, L);
        if (l = pt(ee), !l) {
          const ot = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", mt(i)].join(`
`);
          ee = await gt(t, ot), l = pt(ee);
        }
        if (!l)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Wr(l);
      if (o.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const u = Ke(i, "brief"), h = Ke(i, "standard"), f = Ke(i, "detail"), p = Je(i, "brief"), g = Je(i, "standard"), b = Je(i, "detail"), x = Ve(i, "brief"), w = Ve(i, "standard"), m = Ve(i, "detail"), k = Be(i, "brief", "preview"), M = Be(i, "standard", "preview"), j = Be(i, "detail", "preview"), F = { narrative: { text: u.text, coreClaim: u.coreClaim, grounds: u.grounds, comparisons: u.comparisons, implications: u.implications, ratio: u.ratio, ratioEnforcement: u.ratioEnforcement, targetRange: u.targetRange }, structured: p, mindmap: x, selftest: k }, I = { narrative: { text: h.text, coreClaim: h.coreClaim, grounds: h.grounds, comparisons: h.comparisons, implications: h.implications, ratio: h.ratio, ratioEnforcement: h.ratioEnforcement, targetRange: h.targetRange }, structured: g, mindmap: w, selftest: M }, _ = { narrative: { text: f.text, coreClaim: f.coreClaim, grounds: f.grounds, comparisons: f.comparisons, implications: f.implications, ratio: f.ratio, ratioEnforcement: f.ratioEnforcement, targetRange: f.targetRange }, structured: b, mindmap: m, selftest: j }, C = Yr({ brief: F, standard: I, detail: _ });
      if (C.length && c === false)
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: C.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const Z = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: F, standard: I, detail: _ }, views: { narrative: { brief: F.narrative, standard: I.narrative, detail: _.narrative }, structured: { brief: F.structured, standard: I.structured, detail: _.structured }, mindmap: { brief: F.mindmap, standard: I.mindmap, detail: _.mindmap }, selftest: { brief: F.selftest, standard: I.selftest, detail: _.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return t.json(Z, 200);
    } catch (s) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => gn), n = await t.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return t.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return t.json(a, 200);
    } catch (r) {
      return t.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  });
}
__name(Xr, "Xr");
__name2(Xr, "Xr");
var q = new Kt();
q.use("/api/*", Rr());
q.use("/static/*", Fr({ root: "./public" }));
Xr(q);
function Te() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Te, "Te");
__name2(Te, "Te");
function it(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(it, "it");
__name2(it, "it");
function Qr(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Qr, "Qr");
__name2(Qr, "Qr");
function Zr(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Zr, "Zr");
__name2(Zr, "Zr");
function en(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(en, "en");
__name2(en, "en");
function tn(e, t) {
  const r = Math.max(60, me(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(tn, "tn");
__name2(tn, "tn");
function rn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = en((e == null ? void 0 : e.viewType) || "narrative"), n = Zr(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: c } = tn(t), l = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), h = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${l}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", t].join(`
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
`.trim(), g = `
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
`.trim(), b = `
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
  let x = f;
  return r === "structured" ? x = p : r === "mindmap" ? x = g : r === "selftest" && (x = b), `${h}

${x}`;
}
__name(rn, "rn");
__name2(rn, "rn");
function le(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(le, "le");
__name2(le, "le");
function We(e) {
  const t = le(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(We, "We");
__name2(We, "We");
function nn(e) {
  const t = le(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(nn, "nn");
__name2(nn, "nn");
function at(e) {
  const t = le(e).split(`
`), r = nn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: le(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : t.length, o = i.title, u = t.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(at, "at");
__name2(at, "at");
function sn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(sn, "sn");
__name2(sn, "sn");
function pe(e, t) {
  const n = We(e).map((i, a) => ({ s: i, i: a, score: sn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Qr(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(pe, "pe");
__name2(pe, "pe");
function me(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(me, "me");
__name2(me, "me");
var nt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function xt(e, t, r) {
  const n = Math.max(60, me(e)), s = me(t), i = Math.floor(n * nt[r].min), a = Math.ceil(n * nt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(xt, "xt");
__name2(xt, "xt");
function Ce(e, t, r) {
  const n = Math.max(60, me(e)), s = Math.ceil(n * nt[r].max);
  let i = String(t || "").trim();
  if (me(i) <= s)
    return i;
  const a = We(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (me(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
function et(e, t) {
  return `${e}_${t}`;
}
__name(et, "et");
__name2(et, "et");
function an(e) {
  const t = at(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = et("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = pe(s.body, 6), o = [];
    for (const m of l)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((M) => {
        const j = M.replace(/[()]/g, "").trim();
        j.length >= 2 && j.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(j) && o.push(j);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const h = Array.from(u.entries()).sort((m, k) => k[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = pe(s.body, 3).join(" "), p = pe(s.body, 2).join(" "), g = pe(s.body, 1).join(" "), b = { id: et(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: h, explain: f, explainStandard: p, explainBrief: g, children: [] };
    h.forEach((m) => {
      n.has(m) || n.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${pe(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = We(s.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    w.length && b.children.push({ id: et(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(b), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(an, "an");
__name2(an, "an");
function Ut(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Ut, "Ut");
__name2(Ut, "Ut");
function on(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (Ut(t, n).children || []).map((u) => {
    const h = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(h == null ? void 0 : h.pack) ? h.pack : typeof (h == null ? void 0 : h.pack) == "string" ? [h.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (h == null ? void 0 : h.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: Ce(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, h) => o.push(`  ${h + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, h) => {
    var f;
    o.push(`  ${h + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ce(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(on, "on");
__name2(on, "on");
function cn(e, t) {
  const r = at(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...pe(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return Ce(e, i, t);
}
__name(cn, "cn");
__name2(cn, "cn");
function ln(e, t) {
  at(e);
  const r = We(e), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(ln, "ln");
__name2(ln, "ln");
function un(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const c = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((g) => g.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let h = 0;
    u.forEach((g) => {
      c.includes(g) && h++;
    });
    const f = h >= 2 || c.length >= 30, p = f ? 1 : h === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: h });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(un, "un");
__name2(un, "un");
function yt(e) {
  const t = le(e), { tree: r, glossary: n } = an(t), s = { originalMeta: { textHash: it(t), chars: t.length, ts: Te() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = cn(t, i), c = on(t, r, n, i), l = Ut(r, i), o = ln(t), h = xt(t, a, i).ok ? a : Ce(t, a, i), f = c.renderText || "", p = xt(t, f, i);
    c.renderText = p.ok ? f : Ce(t, f, i), s.modes[i] = { narrative: h, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(yt, "yt");
__name2(yt, "yt");
q.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Te(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
q.post("/api/engine", async (e) => {
  var p, g, b, x, w, m, k;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), c = (t == null ? void 0 : t.useGemini) === true, l = le(r);
  if (l.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && e.env.GEMINI_API_KEY)
    try {
      const M = rn({ text: l, viewType: s, level: "detail", grade: i, subject: a }), j = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", I = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${j}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: M }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), C = (((w = (x = (b = (g = (p = I == null ? void 0 : I.candidates) == null ? void 0 : p[0]) == null ? void 0 : g.content) == null ? void 0 : b.parts) == null ? void 0 : x[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if (C) {
        const Z = JSON.parse(C[0]);
        u = { originalMeta: { textHash: it(l), chars: l.length, ts: Te() }, modes: { detail: { [s]: Z }, standard: { [s]: Z }, brief: { [s]: Z } } }, o = "gemini-" + j;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (M) {
      console.error("[Gemini Error]", M), u = yt(l), o = "v5-local-fallback";
    }
  else
    u = yt(l);
  const h = (k = (m = u.modes) == null ? void 0 : m[n]) == null ? void 0 : k[s], f = { engine: o, mode: n, viewType: s, ts: Te(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: h, allSummaries: u.modes, meta: f });
});
q.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = un(r, n);
  return e.json({ ok: true, result: s });
});
q.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = le(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = Te(), l = it(s), o = JSON.stringify(i);
  return await t.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, c, c, l, s, o).run(), e.json({ ok: true, id: a, textHash: l, ts: c });
});
q.get("/api/loadSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = String(e.req.query("userId") || "anon"), n = String(e.req.query("id") || "");
  if (!n)
    return e.json({ ok: false, error: "missing_id" }, 400);
  const s = await t.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(n, r).first();
  if (!s)
    return e.json({ ok: false, error: "not_found" }, 404);
  let i = null;
  try {
    i = JSON.parse(s.allSummariesJson);
  } catch {
    i = null;
  }
  return e.json({ ok: true, doc: { id: s.id, userId: s.userId, createdAt: s.createdAt, updatedAt: s.updatedAt, textHash: s.textHash, originalText: s.originalText, allSummaries: i } });
});
q.get("/", (e) => e.redirect("/static/v5.html"));
var vt = new Kt();
var dn = Object.assign({ "/src/index.tsx": q });
var zt = false;
for (const [, e] of Object.entries(dn))
  e && (vt.route("/", e), vt.notFound(e.notFoundHandler), zt = true);
if (!zt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Re(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Re, "Re");
__name2(Re, "Re");
function wt(e, t) {
  const r = Re(e);
  return t.some((n) => r.includes(Re(n)));
}
__name(wt, "wt");
__name2(wt, "wt");
function hn(e, t) {
  const r = Re(e);
  return t.every((n) => r.includes(Re(n)));
}
__name(hn, "hn");
__name2(hn, "hn");
function fn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(fn, "fn");
__name2(fn, "fn");
function pn(e, t, r) {
  var g, b, x, w;
  const n = Re(t), s = 100;
  if (!n) {
    const m = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, k = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: m, explanationToShow: k };
  }
  const i = ((g = e.rubric) == null ? void 0 : g.mustIncludeAny) || [], a = ((b = e.rubric) == null ? void 0 : b.mustIncludeAll) || [], c = ((x = e.rubric) == null ? void 0 : x.forbid) || [], l = (w = e.rubric) == null ? void 0 : w.maxChars;
  let o = 100, u = [];
  l && n.length > l && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${l}`)), c.length && wt(n, c) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !hn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !wt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = fn(o, 0, 100);
  const h = o >= 90, f = !h && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !h && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !h && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: h, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: h ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(pn, "pn");
__name2(pn, "pn");
function mn(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((l) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[l.id]) ?? "";
    return pn(l, o, r);
  }), s = Math.round(n.reduce((l, o) => l + o.score, 0) / Math.max(1, n.length)), i = n.filter((l) => !l.correct).map((l) => l.id), a = s >= e.masteryScore;
  let c = "";
  return a ? c = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? c = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? c = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : c = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: c } };
}
__name(mn, "mn");
__name2(mn, "mn");
var gn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: mn }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = vt;
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

// .wrangler/tmp/pages-R5OKmp/9kdyk6vpx4v.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/app.html", "/favicon.ico", "/index.html", "/static/*", "/v5.html"] };
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

// .wrangler/tmp/bundle-jvDVIZ/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-jvDVIZ/middleware-loader.entry.ts
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
//# sourceMappingURL=9kdyk6vpx4v.js.map
