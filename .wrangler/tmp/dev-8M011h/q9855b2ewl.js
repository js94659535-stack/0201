var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-eal12M/checked-fetch.js
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

// .wrangler/tmp/bundle-eal12M/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-adNGS2/bundledWorker-0.6113187771098503.mjs
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
var Zt = Object.defineProperty;
var st = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "st");
var er = /* @__PURE__ */ __name2((t, e, r) => e in t ? Zt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "er");
var y = /* @__PURE__ */ __name2((t, e, r) => er(t, typeof e != "symbol" ? e + "" : e, r), "y");
var We = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || st("Cannot " + r), "We");
var u = /* @__PURE__ */ __name2((t, e, r) => (We(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "u");
var T = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? st("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "T");
var b = /* @__PURE__ */ __name2((t, e, r, n) => (We(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "b");
var M = /* @__PURE__ */ __name2((t, e, r) => (We(t, e, "access private method"), r), "M");
var at = /* @__PURE__ */ __name2((t, e, r, n) => ({ set _(s) {
  b(t, e, s, r);
}, get _() {
  return u(t, e, n);
} }), "at");
var it = /* @__PURE__ */ __name2((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let l, c = false, d;
    if (t[o] ? (d = t[o][0][0], n.req.routeIndex = o) : d = o === t.length && s || void 0, d)
      try {
        l = await d(n, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && e)
          n.error = h, l = await e(h, n), c = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || c) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "it");
var tr = Symbol();
var rr = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof Nt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? nr(t, { all: r, dot: n }) : {};
}, "rr");
async function nr(t, e) {
  const r = await t.formData();
  return r ? sr(r, e) : {};
}
__name(nr, "nr");
__name2(nr, "nr");
function sr(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? ar(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (ir(r, n, s), delete r[n]);
  }), r;
}
__name(sr, "sr");
__name2(sr, "sr");
var ar = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "ar");
var ir = /* @__PURE__ */ __name2((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "ir");
var Ot = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Ot");
var or = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = cr(t), n = Ot(r);
  return lr(n, e);
}, "or");
var cr = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "cr");
var lr = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "lr");
var Be = {};
var dr = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return Be[n] || (r[2] ? Be[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Be[n] = [t, r[1], true]), Be[n];
  }
  return null;
}, "dr");
var nt = /* @__PURE__ */ __name2((t, e) => {
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
}, "nt");
var ur = /* @__PURE__ */ __name2((t) => nt(t, decodeURI), "ur");
var Tt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return ur(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "Tt");
var hr = /* @__PURE__ */ __name2((t) => {
  const e = Tt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "hr");
var xe = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = xe(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "xe");
var At = /* @__PURE__ */ __name2((t) => {
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
}, "At");
var Xe = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? nt(t, Ct) : t) : t, "Xe");
var _t = /* @__PURE__ */ __name2((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const l = a + e.length + 2, c = t.indexOf("&", l);
        return Xe(t.slice(l, c === -1 ? void 0 : c));
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
    let l = t.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (l = Xe(l)), i = a, l === "")
      continue;
    let c;
    o === -1 ? c = "" : (c = t.slice(o + 1, a === -1 ? void 0 : a), n && (c = Xe(c))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(c)) : s[l] ?? (s[l] = c);
  }
  return e ? s[e] : s;
}, "_t");
var pr = _t;
var fr = /* @__PURE__ */ __name2((t, e) => _t(t, e, true), "fr");
var Ct = decodeURIComponent;
var ot = /* @__PURE__ */ __name2((t) => nt(t, Ct), "ot");
var ye;
var G;
var Z;
var Rt;
var Mt;
var rt;
var te;
var vt;
var Nt = (vt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    T(this, Z);
    y(this, "raw");
    T(this, ye);
    T(this, G);
    y(this, "routeIndex", 0);
    y(this, "path");
    y(this, "bodyCache", {});
    T(this, te, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, b(this, G, r), b(this, ye, {});
  }
  param(t) {
    return t ? M(this, Z, Rt).call(this, t) : M(this, Z, Mt).call(this);
  }
  query(t) {
    return pr(this.url, t);
  }
  queries(t) {
    return fr(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await rr(this, t));
  }
  json() {
    return u(this, te).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return u(this, te).call(this, "text");
  }
  arrayBuffer() {
    return u(this, te).call(this, "arrayBuffer");
  }
  blob() {
    return u(this, te).call(this, "blob");
  }
  formData() {
    return u(this, te).call(this, "formData");
  }
  addValidatedData(t, e) {
    u(this, ye)[t] = e;
  }
  valid(t) {
    return u(this, ye)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [tr]() {
    return u(this, G);
  }
  get matchedRoutes() {
    return u(this, G)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return u(this, G)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "vt"), ye = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), Rt = /* @__PURE__ */ __name2(function(t) {
  const e = u(this, G)[0][this.routeIndex][1][t], r = M(this, Z, rt).call(this, e);
  return r && /\%/.test(r) ? ot(r) : r;
}, "Rt"), Mt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(u(this, G)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = M(this, Z, rt).call(this, u(this, G)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? ot(n) : n);
  }
  return t;
}, "Mt"), rt = /* @__PURE__ */ __name2(function(t) {
  return u(this, G)[1] ? u(this, G)[1][t] : t;
}, "rt"), te = /* @__PURE__ */ new WeakMap(), vt);
var mr = { Stringify: 1 };
var jt = /* @__PURE__ */ __name2(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((l) => jt(l, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "jt");
var gr = "text/plain; charset=UTF-8";
var Qe = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Qe");
var Ie;
var ke;
var V;
var Ee;
var W;
var B;
var $e;
var Se;
var Oe;
var le;
var Pe;
var Le;
var re;
var ve;
var bt;
var xr = (bt = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    T(this, re);
    T(this, Ie);
    T(this, ke);
    y(this, "env", {});
    T(this, V);
    y(this, "finalized", false);
    y(this, "error");
    T(this, Ee);
    T(this, W);
    T(this, B);
    T(this, $e);
    T(this, Se);
    T(this, Oe);
    T(this, le);
    T(this, Pe);
    T(this, Le);
    y(this, "render", (...t2) => (u(this, Se) ?? b(this, Se, (e2) => this.html(e2)), u(this, Se).call(this, ...t2)));
    y(this, "setLayout", (t2) => b(this, $e, t2));
    y(this, "getLayout", () => u(this, $e));
    y(this, "setRenderer", (t2) => {
      b(this, Se, t2);
    });
    y(this, "header", (t2, e2, r) => {
      this.finalized && b(this, B, new Response(u(this, B).body, u(this, B)));
      const n = u(this, B) ? u(this, B).headers : u(this, le) ?? b(this, le, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    y(this, "status", (t2) => {
      b(this, Ee, t2);
    });
    y(this, "set", (t2, e2) => {
      u(this, V) ?? b(this, V, /* @__PURE__ */ new Map()), u(this, V).set(t2, e2);
    });
    y(this, "get", (t2) => u(this, V) ? u(this, V).get(t2) : void 0);
    y(this, "newResponse", (...t2) => M(this, re, ve).call(this, ...t2));
    y(this, "body", (t2, e2, r) => M(this, re, ve).call(this, t2, e2, r));
    y(this, "text", (t2, e2, r) => !u(this, le) && !u(this, Ee) && !e2 && !r && !this.finalized ? new Response(t2) : M(this, re, ve).call(this, t2, e2, Qe(gr, r)));
    y(this, "json", (t2, e2, r) => M(this, re, ve).call(this, JSON.stringify(t2), e2, Qe("application/json", r)));
    y(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name2((s) => M(this, re, ve).call(this, s, e2, Qe("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? jt(t2, mr.Stringify, false, {}).then(n) : n(t2);
    });
    y(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    y(this, "notFound", () => (u(this, Oe) ?? b(this, Oe, () => new Response()), u(this, Oe).call(this, this)));
    b(this, Ie, t), e && (b(this, W, e.executionCtx), this.env = e.env, b(this, Oe, e.notFoundHandler), b(this, Le, e.path), b(this, Pe, e.matchResult));
  }
  get req() {
    return u(this, ke) ?? b(this, ke, new Nt(u(this, Ie), u(this, Le), u(this, Pe))), u(this, ke);
  }
  get event() {
    if (u(this, W) && "respondWith" in u(this, W))
      return u(this, W);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (u(this, W))
      return u(this, W);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return u(this, B) || b(this, B, new Response(null, { headers: u(this, le) ?? b(this, le, new Headers()) }));
  }
  set res(t) {
    if (u(this, B) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of u(this, B).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = u(this, B).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    b(this, B, t), this.finalized = true;
  }
  get var() {
    return u(this, V) ? Object.fromEntries(u(this, V)) : {};
  }
}, "bt"), Ie = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet(), ve = /* @__PURE__ */ __name2(function(t, e, r) {
  const n = u(this, B) ? new Headers(u(this, B).headers) : u(this, le) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? u(this, Ee);
  return new Response(t, { status: s, headers: n });
}, "ve"), bt);
var k = "ALL";
var vr = "all";
var br = ["get", "post", "put", "delete", "options", "patch"];
var It = "Can not add a route since the matcher is already built.";
var kt = /* @__PURE__ */ __name2(class extends Error {
}, "kt");
var wr = "__COMPOSED_HANDLER";
var yr = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "yr");
var ct = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ct");
var F;
var $;
var $t;
var K;
var oe;
var qe;
var Ge;
var Te;
var Er = (Te = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    T(this, $);
    y(this, "get");
    y(this, "post");
    y(this, "put");
    y(this, "delete");
    y(this, "options");
    y(this, "patch");
    y(this, "all");
    y(this, "on");
    y(this, "use");
    y(this, "router");
    y(this, "getPath");
    y(this, "_basePath", "/");
    T(this, F, "/");
    y(this, "routes", []);
    T(this, K, yr);
    y(this, "errorHandler", ct);
    y(this, "onError", (e2) => (this.errorHandler = e2, this));
    y(this, "notFound", (e2) => (b(this, K, e2), this));
    y(this, "fetch", (e2, ...r) => M(this, $, Ge).call(this, e2, r[1], r[0], e2.method));
    y(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${xe("/", e2)}`, r), n2, s2)));
    y(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(M(this, $, Ge).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...br, vr].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? b(this, F, a) : M(this, $, oe).call(this, i, u(this, F), a), o.forEach((l) => {
        M(this, $, oe).call(this, i, u(this, F), l);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const l of [a].flat()) {
        b(this, F, l);
        for (const c of [i].flat())
          o.map((d) => {
            M(this, $, oe).call(this, c.toUpperCase(), u(this, F), d);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? b(this, F, i) : (b(this, F, "*"), a.unshift(i)), a.forEach((o) => {
      M(this, $, oe).call(this, k, u(this, F), o);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? Tt : hr;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ct ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, l) => (await it([], r.errorHandler)(o, () => s.handler(o, l))).res, "i"), i[wr] = s.handler), M(a = n, $, oe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = M(this, $, $t).call(this);
    return r._basePath = xe(this._basePath, e), r;
  }
  mount(e, r, n) {
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
      const l = xe(this._basePath, e), c = l === "/" ? 0 : l.length;
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
    return M(this, $, oe).call(this, k, xe(e, "*"), o), this;
  }
}, "Te"), F = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), $t = /* @__PURE__ */ __name2(function() {
  const e = new Te({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, b(e, K, u(this, K)), e.routes = this.routes, e;
}, "$t"), K = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ __name2(function(e, r, n) {
  e = e.toUpperCase(), r = xe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "oe"), qe = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "qe"), Ge = /* @__PURE__ */ __name2(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await M(this, $, Ge).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), o = new xr(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: u(this, K) });
  if (a[0].length === 1) {
    let c;
    try {
      c = a[0][0][0][0](o, async () => {
        o.res = await u(this, K).call(this, o);
      });
    } catch (d) {
      return M(this, $, qe).call(this, d, o);
    }
    return c instanceof Promise ? c.then((d) => d || (o.finalized ? o.res : u(this, K).call(this, o))).catch((d) => M(this, $, qe).call(this, d, o)) : c ?? u(this, K).call(this, o);
  }
  const l = it(a[0], this.errorHandler, u(this, K));
  return (async () => {
    try {
      const c = await l(o);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return M(this, $, qe).call(this, c, o);
    }
  })();
}, "Ge"), Te);
var Pt = [];
function Sr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[k], o = a[2][i];
    if (o)
      return o;
    const l = i.match(a[0]);
    if (!l)
      return [[], Pt];
    const c = l.indexOf("", 1);
    return [a[1][c], l];
  }, "n");
  return this.match = n, n(t, e);
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
var ze = "[^/]+";
var Me = ".*";
var je = "(?:|/.*)";
var be = Symbol();
var Or = new Set(".\\+*[^]$()");
function Tr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Me || t === je ? 1 : e === Me || e === je ? -1 : t === ze ? 1 : e === ze ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Tr, "Tr");
__name2(Tr, "Tr");
var de;
var ue;
var z;
var me;
var Ar = (me = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, de);
    T(this, ue);
    T(this, z, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (u(this, de) !== void 0)
        throw be;
      if (i)
        return;
      b(this, de, r);
      return;
    }
    const [a, ...o] = e, l = a === "*" ? o.length === 0 ? ["", "", Me] : ["", "", ze] : a === "/*" ? ["", "", je] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (l) {
      const d = l[1];
      let h = l[2] || ze;
      if (d && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw be;
      if (c = u(this, z)[h], !c) {
        if (Object.keys(u(this, z)).some((m) => m !== Me && m !== je))
          throw be;
        if (i)
          return;
        c = u(this, z)[h] = new me(), d !== "" && b(c, ue, s.varIndex++);
      }
      !i && d !== "" && n.push([d, u(c, ue)]);
    } else if (c = u(this, z)[a], !c) {
      if (Object.keys(u(this, z)).some((d) => d.length > 1 && d !== Me && d !== je))
        throw be;
      if (i)
        return;
      c = u(this, z)[a] = new me();
    }
    c.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(u(this, z)).sort(Tr).map((n) => {
      const s = u(this, z)[n];
      return (typeof u(s, ue) == "number" ? `(${n})@${u(s, ue)}` : Or.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof u(this, de) == "number" && r.unshift(`#${u(this, de)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "me"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), me);
var Ue;
var He;
var wt;
var _r = (wt = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, Ue, { varIndex: 0 });
    T(this, He, new Ar());
  }
  insert(t, e, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (t = t.replace(/\{[^}]+\}/g, (l) => {
        const c = `@\\${a}`;
        return s[a] = [c, l], a++, o = true, c;
      }), !o)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(o) !== -1) {
          i[l] = i[l].replace(o, s[a][1]);
          break;
        }
    }
    return u(this, He).insert(i, e, n, u(this, Ue), r), n;
  }
  buildRegExp() {
    let t = u(this, He).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "wt"), Ue = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), wt);
var Cr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Fe = /* @__PURE__ */ Object.create(null);
function Lt(t) {
  return Fe[t] ?? (Fe[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Lt, "Lt");
__name2(Lt, "Lt");
function Nr() {
  Fe = /* @__PURE__ */ Object.create(null);
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
function Rr(t) {
  var c;
  const e = new _r(), r = [];
  if (t.length === 0)
    return Cr;
  const n = t.map((d) => [!/\*|\/:/.test(d[0]), ...d]).sort(([d, h], [m, v]) => d ? 1 : m ? -1 : h.length - v.length), s = /* @__PURE__ */ Object.create(null);
  for (let d = 0, h = -1, m = n.length; d < m; d++) {
    const [v, A, j] = n[d];
    v ? s[A] = [j.map(([I]) => [I, /* @__PURE__ */ Object.create(null)]), Pt] : h++;
    let S;
    try {
      S = e.insert(A, h, v);
    } catch (I) {
      throw I === be ? new kt(A) : I;
    }
    v || (r[h] = j.map(([I, C]) => {
      const w = /* @__PURE__ */ Object.create(null);
      for (C -= 1; C >= 0; C--) {
        const [_, N] = S[C];
        w[_] = N;
      }
      return [I, w];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let d = 0, h = r.length; d < h; d++)
    for (let m = 0, v = r[d].length; m < v; m++) {
      const A = (c = r[d][m]) == null ? void 0 : c[1];
      if (!A)
        continue;
      const j = Object.keys(A);
      for (let S = 0, I = j.length; S < I; S++)
        A[j[S]] = o[A[j[S]]];
    }
  const l = [];
  for (const d in a)
    l[d] = r[a[d]];
  return [i, l, s];
}
__name(Rr, "Rr");
__name2(Rr, "Rr");
function ge(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (Lt(r).test(e))
        return [...t[r]];
  }
}
__name(ge, "ge");
__name2(ge, "ge");
var ne;
var se;
var Je;
var Ht;
var yt;
var Mr = (yt = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, Je);
    y(this, "name", "RegExpRouter");
    T(this, ne);
    T(this, se);
    y(this, "match", Sr);
    b(this, ne, { [k]: /* @__PURE__ */ Object.create(null) }), b(this, se, { [k]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var o;
    const n = u(this, ne), s = u(this, se);
    if (!n || !s)
      throw new Error(It);
    n[t] || [n, s].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[k]).forEach((c) => {
        l[t][c] = [...l[k][c]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = Lt(e);
      t === k ? Object.keys(n).forEach((c) => {
        var d;
        (d = n[c])[e] || (d[e] = ge(n[c], e) || ge(n[k], e) || []);
      }) : (o = n[t])[e] || (o[e] = ge(n[t], e) || ge(n[k], e) || []), Object.keys(n).forEach((c) => {
        (t === k || t === c) && Object.keys(n[c]).forEach((d) => {
          l.test(d) && n[c][d].push([r, i]);
        });
      }), Object.keys(s).forEach((c) => {
        (t === k || t === c) && Object.keys(s[c]).forEach((d) => l.test(d) && s[c][d].push([r, i]));
      });
      return;
    }
    const a = At(e) || [e];
    for (let l = 0, c = a.length; l < c; l++) {
      const d = a[l];
      Object.keys(s).forEach((h) => {
        var m;
        (t === k || t === h) && ((m = s[h])[d] || (m[d] = [...ge(n[h], d) || ge(n[k], d) || []]), s[h][d].push([r, i - c + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(u(this, se)).concat(Object.keys(u(this, ne))).forEach((e) => {
      t[e] || (t[e] = M(this, Je, Ht).call(this, e));
    }), b(this, ne, b(this, se, void 0)), Nr(), t;
  }
}, "yt"), ne = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakSet(), Ht = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === k;
  return [u(this, ne), u(this, se)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== k && e.push(...Object.keys(n[k]).map((i) => [i, n[k][i]]));
  }), r ? Rr(e) : null;
}, "Ht"), yt);
var ae;
var X;
var Et;
var jr = (Et = /* @__PURE__ */ __name2(class {
  constructor(t) {
    y(this, "name", "SmartRouter");
    T(this, ae, []);
    T(this, X, []);
    b(this, ae, t.routers);
  }
  add(t, e, r) {
    if (!u(this, X))
      throw new Error(It);
    u(this, X).push([t, e, r]);
  }
  match(t, e) {
    if (!u(this, X))
      throw new Error("Fatal error");
    const r = u(this, ae), n = u(this, X), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let l = 0, c = n.length; l < c; l++)
          o.add(...n[l]);
        a = o.match(t, e);
      } catch (l) {
        if (l instanceof kt)
          continue;
        throw l;
      }
      this.match = o.match.bind(o), b(this, ae, [o]), b(this, X, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (u(this, X) || u(this, ae).length !== 1)
      throw new Error("No active router has been determined yet.");
    return u(this, ae)[0];
  }
}, "Et"), ae = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Et);
var Ne = /* @__PURE__ */ Object.create(null);
var ie;
var D;
var he;
var Ae;
var L;
var Q;
var ce;
var _e;
var Ir = (_e = /* @__PURE__ */ __name2(class {
  constructor(e, r, n) {
    T(this, Q);
    T(this, ie);
    T(this, D);
    T(this, he);
    T(this, Ae, 0);
    T(this, L, Ne);
    if (b(this, D, n || /* @__PURE__ */ Object.create(null)), b(this, ie, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, b(this, ie, [s]);
    }
    b(this, he, []);
  }
  insert(e, r, n) {
    b(this, Ae, ++at(this, Ae)._);
    let s = this;
    const i = or(r), a = [];
    for (let o = 0, l = i.length; o < l; o++) {
      const c = i[o], d = i[o + 1], h = dr(c, d), m = Array.isArray(h) ? h[0] : c;
      if (m in u(s, D)) {
        s = u(s, D)[m], h && a.push(h[1]);
        continue;
      }
      u(s, D)[m] = new _e(), h && (u(s, he).push(h), a.push(h[1])), s = u(s, D)[m];
    }
    return u(s, ie).push({ [e]: { handler: n, possibleKeys: a.filter((o, l, c) => c.indexOf(o) === l), score: u(this, Ae) } }), s;
  }
  search(e, r) {
    var l;
    const n = [];
    b(this, L, Ne);
    let i = [this];
    const a = Ot(r), o = [];
    for (let c = 0, d = a.length; c < d; c++) {
      const h = a[c], m = c === d - 1, v = [];
      for (let A = 0, j = i.length; A < j; A++) {
        const S = i[A], I = u(S, D)[h];
        I && (b(I, L, u(S, L)), m ? (u(I, D)["*"] && n.push(...M(this, Q, ce).call(this, u(I, D)["*"], e, u(S, L))), n.push(...M(this, Q, ce).call(this, I, e, u(S, L)))) : v.push(I));
        for (let C = 0, w = u(S, he).length; C < w; C++) {
          const _ = u(S, he)[C], N = u(S, L) === Ne ? {} : { ...u(S, L) };
          if (_ === "*") {
            const E = u(S, D)["*"];
            E && (n.push(...M(this, Q, ce).call(this, E, e, u(S, L))), b(E, L, N), v.push(E));
            continue;
          }
          const [ee, O, x] = _;
          if (!h && !(x instanceof RegExp))
            continue;
          const p = u(S, D)[ee], g = a.slice(c).join("/");
          if (x instanceof RegExp) {
            const E = x.exec(g);
            if (E) {
              if (N[O] = E[0], n.push(...M(this, Q, ce).call(this, p, e, u(S, L), N)), Object.keys(u(p, D)).length) {
                b(p, L, N);
                const f = ((l = E[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (o[f] || (o[f] = [])).push(p);
              }
              continue;
            }
          }
          (x === true || x.test(h)) && (N[O] = h, m ? (n.push(...M(this, Q, ce).call(this, p, e, N, u(S, L))), u(p, D)["*"] && n.push(...M(this, Q, ce).call(this, u(p, D)["*"], e, N, u(S, L)))) : (b(p, L, N), v.push(p)));
        }
      }
      i = v.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, d) => c.score - d.score), [n.map(({ handler: c, params: d }) => [c, d])];
  }
}, "_e"), ie = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakSet(), ce = /* @__PURE__ */ __name2(function(e, r, n, s) {
  const i = [];
  for (let a = 0, o = u(e, ie).length; a < o; a++) {
    const l = u(e, ie)[a], c = l[r] || l[k], d = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), i.push(c), n !== Ne || s && s !== Ne))
      for (let h = 0, m = c.possibleKeys.length; h < m; h++) {
        const v = c.possibleKeys[h], A = d[c.score];
        c.params[v] = s != null && s[v] && !A ? s[v] : n[v] ?? (s == null ? void 0 : s[v]), d[c.score] = true;
      }
  }
  return i;
}, "ce"), _e);
var pe;
var St;
var kr = (St = /* @__PURE__ */ __name2(class {
  constructor() {
    y(this, "name", "TrieRouter");
    T(this, pe);
    b(this, pe, new Ir());
  }
  add(t, e, r) {
    const n = At(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        u(this, pe).insert(t, n[s], r);
      return;
    }
    u(this, pe).insert(t, e, r);
  }
  match(t, e) {
    return u(this, pe).search(t, e);
  }
}, "St"), pe = /* @__PURE__ */ new WeakMap(), St);
var Dt = /* @__PURE__ */ __name2(class extends Er {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new jr({ routers: [new Mr(), new kr()] });
  }
}, "Dt");
var $r = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, o) {
    var d;
    function l(h, m) {
      a.res.headers.set(h, m);
    }
    __name(l, "l");
    __name2(l, "l");
    const c = await n(a.req.header("origin") || "", a);
    if (c && l("Access-Control-Allow-Origin", c), r.credentials && l("Access-Control-Allow-Credentials", "true"), (d = r.exposeHeaders) != null && d.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && l("Access-Control-Allow-Methods", h.join(","));
      let m = r.allowHeaders;
      if (!(m != null && m.length)) {
        const v = a.req.header("Access-Control-Request-Headers");
        v && (m = v.split(/\s*,\s*/));
      }
      return m != null && m.length && (l("Access-Control-Allow-Headers", m.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "$r");
var Pr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var lt = /* @__PURE__ */ __name2((t, e = Hr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "lt");
var Lr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Hr = Lr;
var Dr = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Dr");
var Bt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Br = Object.keys(Bt);
var qr = "index.html";
var Gr = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? Dr;
  return async (s, i) => {
    var d, h, m, v;
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
        return await ((d = t.onNotFound) == null ? void 0 : d.call(t, s.req.path, s)), i();
      }
    let o = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(o) && (o = n(o, qr));
    const l = t.getContent;
    let c = await l(o, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const A = t.mimes && lt(o, t.mimes) || lt(o);
      if (s.header("Content-Type", A || "application/octet-stream"), t.precompressed && (!A || Pr.test(A))) {
        const j = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((S) => S.trim()));
        for (const S of Br) {
          if (!j.has(S))
            continue;
          const I = await l(o + Bt[S], s);
          if (I) {
            c = I, s.header("Content-Encoding", S), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((m = t.onFound) == null ? void 0 : m.call(t, o, s)), s.body(c);
    }
    await ((v = t.onNotFound) == null ? void 0 : v.call(t, o, s)), await i();
  };
}, "Gr");
var Fr = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Fr");
var Kr = /* @__PURE__ */ __name2((t) => async function(r, n) {
  return Gr({ ...t, getContent: async (i) => Fr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Kr");
var zr = /* @__PURE__ */ __name2((t) => Kr(t), "zr");
var U = new Dt();
var Ke = /* @__PURE__ */ new Map();
var Ur = 1e3 * 60 * 60 * 24 * 7;
var Ze = false;
function qt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(qt, "qt");
__name2(qt, "qt");
function H(t) {
  return t == null ? "" : String(t);
}
__name(H, "H");
__name2(H, "H");
function fe(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(fe, "fe");
__name2(fe, "fe");
function Jr(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function we(t) {
  return Jr(t).length;
}
__name(we, "we");
__name2(we, "we");
var dt = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } };
var ut = { brief: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBC29\uBC95", "\uD575\uC2EC \uACB0\uB860"], standard: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uBC29\uBC95", "\uC8FC\uC694 \uACB0\uACFC", "\uACB0\uB860"], detail: ["\uC5F0\uAD6C \uBAA9\uC801", "\uC5F0\uAD6C \uBB38\uC81C", "\uC5F0\uAD6C \uB300\uC0C1", "\uC5F0\uAD6C \uC808\uCC28", "\uACB0\uACFC", "\uD574\uC11D", "\uAD50\uC721\uC801 \uC758\uC758"] };
function Gt(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
var Yr = ["DLPFC", "VLPFC", "OFC", "ACC", "PFC", "vmPFC", "dmPFC", "\uC804\uB450\uC5FD", "\uCE21\uB450\uC5FD", "\uB450\uC815\uC5FD", "\uD6C4\uB450\uC5FD", "\uD3B8\uB3C4\uCCB4", "\uD574\uB9C8"];
function et(t, e) {
  if (e === "brief") {
    for (const s of Yr)
      if (t.includes(s))
        return { valid: false, error: `\uAC04\uB2E8\uC694\uC57D\uC5D0 \uC138\uBD80 \uB1CC\uC601\uC5ED(${s}) \uB2E8\uB3C5 \uB4F1\uC7A5 \uAE08\uC9C0. \uC77C\uBC18\uC801 \uC124\uBA85\uB9CC \uD3EC\uD568\uD558\uC138\uC694.` };
  }
  const r = ut[e] || ut.standard, n = [];
  for (const s of r)
    s.split(" ").some((o) => t.includes(o)) || n.push(s);
  return n.length > 0 ? { valid: false, error: `\uD544\uC218 \uC694\uC18C \uB204\uB77D: ${n.join(", ")}. \uC774 \uD56D\uBAA9\uB4E4\uC744 \uBC18\uB4DC\uC2DC \uD3EC\uD568\uD558\uC138\uC694.` } : { valid: true };
}
__name(et, "et");
__name2(et, "et");
function Vr(t) {
  return dt[t] || dt.standard;
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function tt(t, e) {
  const r = Math.max(50, we(t)), { min: n, max: s } = Vr(e);
  return { base: r, min: Math.floor(r * n), max: Math.ceil(r * s) };
}
__name(tt, "tt");
__name2(tt, "tt");
function Ft(t) {
  const e = H(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Ft, "Ft");
__name2(Ft, "Ft");
function Kt(t) {
  const e = H(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Kt, "Kt");
__name2(Kt, "Kt");
function Wr(t) {
  const e = H(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Wr, "Wr");
__name2(Wr, "Wr");
function Xr(t) {
  const e = (t || "").replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  const r = [];
  let n = "", s = false;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], o = e[i + 1];
    (a === '"' || a === '"' || a === '"') && (s = !s), n += a, !s && /[\.\?\!]/.test(a) && o === " " ? a === "." && n.endsWith("...") || (r.push(n.trim()), n = "", i++) : !s && /[다요죠]/.test(a) && o === " " && (r.push(n.trim()), n = "", i++);
  }
  return n.trim() && r.push(n.trim()), r.length ? r : [e];
}
__name(Xr, "Xr");
__name2(Xr, "Xr");
function Qr(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/([가-힣])\r?\n([가-힣])/g, "$1$2"), e = e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g, "$1$2"), e = e.replace(/\r/g, ""), e = e.replace(/\n{2,}/g, `
`), e = e.replace(/\n/g, " "), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/\s+([,.;:!?])/g, "$1"), e.trim();
}
__name(Qr, "Qr");
__name2(Qr, "Qr");
function Zr(t) {
  return (t || []).filter((e) => {
    const r = (e || "").trim();
    return !(!r || r.length < 18 || !(/[.!?]$/.test(r) || /다\.$/.test(r) || /이다\.$/.test(r) || /하였다\.$/.test(r)) && r.length < 45);
  });
}
__name(Zr, "Zr");
__name2(Zr, "Zr");
var en = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
function ht(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !en.has(e));
}
__name(ht, "ht");
__name2(ht, "ht");
function tn(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t)
    for (const s of ht(n))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((n, s) => {
    const i = ht(n);
    let a = 0;
    for (const c of i)
      a += e.get(c) || 0;
    const o = n.length, l = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: a * l };
  });
}
__name(tn, "tn");
__name2(tn, "tn");
function rn(t, e) {
  return tn(t).slice().sort((s, i) => i.score - s.score).slice(0, fe(e, 1, Math.max(1, t.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(rn, "rn");
__name2(rn, "rn");
function nn(t) {
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
__name(nn, "nn");
__name2(nn, "nn");
function zt(t) {
  const e = Math.max(200, we(t)), r = tt(t, "brief"), n = tt(t, "standard"), s = tt(t, "detail"), i = fe(r.min + Math.round((r.max - r.min) * 0.5), r.min, r.max), a = fe(Math.max(n.min, i + 40), n.min, n.max), o = fe(Math.max(s.min, a + 120), s.min, s.max);
  return { base: e, brief: i, standard: a, detail: o };
}
__name(zt, "zt");
__name2(zt, "zt");
function sn(t) {
  const e = zt(t);
  return `
\uB2F9\uC2E0\uC740 \uD559\uC220 \uB17C\uBB38\uC744 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C "\uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization)" \uBC29\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB294 \uC804\uBB38 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.

[\uC785\uB825 \uC6D0\uBB38 - \uD559\uC220 \uB17C\uBB38]
"""${Gt(t)}"""

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
__name(sn, "sn");
__name2(sn, "sn");
function an(t, e, r) {
  if (!Array.isArray(t) || t.length === 0)
    return { summary: "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", mindmap: { keywords: [], nodes: [], edges: [] }, meta: { ratio: 0, target: { min: 0, max: 0 } } };
  const n = Math.max(1, Number(r) || 1), s = e === "brief" ? { min: 10, max: 15 } : e === "detail" ? { min: 45, max: 55 } : { min: 25, max: 30 }, i = ["\uB610\uD55C", "\uC544\uC6B8\uB7EC", "\uB354\uBD88\uC5B4"], a = ["\uD55C\uD3B8", "\uC774\uC640 \uD568\uAED8", "\uC774\uC640 \uB354\uBD88\uC5B4", "\uB610 \uB2E4\uB978 \uCE21\uBA74\uC5D0\uC11C"], o = /* @__PURE__ */ __name2((w) => {
    const _ = String(w || "").trim().slice(0, 24);
    if (/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(_))
      return null;
    const N = _.match(/^(.{1,20}?(은|는|이|가))\s+/);
    return N ? N[1] : null;
  }, "o"), l = /* @__PURE__ */ __name2((w) => {
    const _ = String(w || "").trim();
    return _ && (/[.!?…]$/.test(_) ? _ : _ + ".");
  }, "l"), c = /* @__PURE__ */ __name2((w) => {
    let _ = String(w || "").trim(), N = "";
    const ee = _.match(/([.!?…])$/);
    return ee && (N = ee[1], _ = _.slice(0, -1).trim()), _ = _.replace(/합니다$/, "\uD55C\uB2E4").replace(/되었습니다$/, "\uB418\uC5C8\uB2E4").replace(/입니다$/, "\uC774\uB2E4").replace(/습니다$/, "\uB2E4"), (_ + (N || ".")).trim();
  }, "c");
  let d = t.map((w, _) => {
    const N = String(w || "").trim();
    if (!N)
      return "";
    if (_ === 0)
      return c(l(N));
    const ee = String(t[_ - 1] || "").trim(), O = o(ee), x = o(N), p = /* @__PURE__ */ __name2((g) => g[_ % g.length], "p");
    if (x && O && x === O) {
      const g = N.replace(/^(.{1,40}?(은|는|이|가))\s+/, "");
      return c(l(`${p(i)} ${g}`.trim()));
    } else
      return c(l(`${p(a)} ${N}`.trim()));
  }).filter(Boolean);
  const h = /* @__PURE__ */ __name2((w) => String(w || "").replace(/\s+/g, "").length, "h");
  let m = d.join(" "), v = h(m) / n * 100;
  for (; v > s.max && d.length > 1; )
    d.pop(), m = d.join(" "), v = h(m) / n * 100;
  v < s.min && console.warn(`[\uC820\uC2A4] \uC694\uC57D\uC728 ${v.toFixed(1)}%\uAC00 \uBAA9\uD45C \uCD5C\uC18C\uCE58 ${s.min}% \uBBF8\uB9CC\uC785\uB2C8\uB2E4.`);
  const j = d.join(" ").replace(/[0-9]/g, " ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ").split(/\s+/).map((w) => w.trim()).filter((w) => w.length >= 2 && w.length <= 6), S = /* @__PURE__ */ new Map();
  for (const w of j)
    S.set(w, (S.get(w) || 0) + 1);
  const I = [...S.entries()].sort((w, _) => _[1] - w[1]).slice(0, 12).map(([w]) => w), C = { keywords: I, nodes: I.map((w, _) => ({ id: `k${_}`, label: w })), edges: [] };
  return { summary: m, mindmap: C, meta: { ratio: v, target: s } };
}
__name(an, "an");
__name2(an, "an");
function on(t, e, r) {
  const n = Qr(t);
  let s = Xr(n);
  s = Zr(s);
  const i = e === "brief" ? fe(Math.round(s.length * 0.15), 2, 4) : e === "standard" ? fe(Math.round(s.length * 0.3), 5, 9) : fe(Math.round(s.length * 0.55), 10, 18);
  let a = rn(s, i);
  if (e === "detail") {
    const c = ["\uC131\uBCC4", "\uD559\uB144", "\uB0A8\uD559\uC0DD", "\uC5EC\uD559\uC0DD", "\uCD08\uB4F1", "\uC911\uD559", "\uACE0\uD559\uB144", "\uC800\uD559\uB144", "\uBCC0\uC778", "\uCC28\uC774", "\uBE44\uAD50"], d = s.filter((h) => c.some((m) => h.includes(m)) && !a.includes(h)).slice(0, 5);
    d.length > 0 && (a = [...a, ...d]);
  }
  const o = we(n);
  if (r === "narrative") {
    let c, d = null, h = null;
    {
      const m = an(a, e, o);
      c = m.summary, d = m.mindmap, h = m.meta;
    }
    return c = nn(c), { kind: "summary", mode: e, viewType: r, narrative: c, ...d && { mindmapKeywords: d }, ...h && { meta: { ...h, inputNormalized: true, originalLen: o } } };
  }
  if (r === "structured")
    return { kind: "summary", mode: e, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((c, d) => `- (${d + 1}) ${c}`) } };
  if (r === "mindmap") {
    const c = (a[0] || s[0] || "\uD575\uC2EC").slice(0, 40), d = [{ id: "c", label: c, level: 0 }], h = [];
    return a.slice(1).forEach((m, v) => {
      const A = `n${v + 1}`;
      d.push({ id: A, label: m.slice(0, 60), level: 1 }), h.push({ from: "c", to: A });
    }), { kind: "summary", mode: e, viewType: r, mindmap: { center: c, nodes: d, edges: h } };
  }
  const l = a.map((c, d) => ({ id: `q${d + 1}`, type: "short", question: `(${d + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${c.slice(0, 70)}"`, answerHint: c }));
  return { kind: "summary", mode: e, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: l } };
}
__name(on, "on");
__name2(on, "on");
function Ut(t) {
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
__name(Ut, "Ut");
__name2(Ut, "Ut");
function cn(t, e, r, n) {
  const s = Ut(r);
  return `${t}::${n || "anon"}::${e}::base::${s}`;
}
__name(cn, "cn");
__name2(cn, "cn");
function ln(t, e, r, n, s) {
  const i = Ut(n);
  return `${t}::${s || "anon"}::${e}::${r}::${i}`;
}
__name(ln, "ln");
__name2(ln, "ln");
async function dn(t) {
  if (!Ze) {
    if (!t) {
      Ze = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), Ze = true;
  }
}
__name(dn, "dn");
__name2(dn, "dn");
async function pt(t, e) {
  const r = Date.now(), n = Ke.get(e);
  if (n && r - n.createdAt < Ur)
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
__name(pt, "pt");
__name2(pt, "pt");
async function Re(t, e, r, n) {
  const s = Date.now();
  Ke.set(e, { data: n, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, r, JSON.stringify(n), qt()).run();
}
__name(Re, "Re");
__name2(Re, "Re");
function ft(t) {
  const e = t.split(/\n\n+/).filter((n) => n.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((n, s) => `- (${s + 1}) ${n}`) : t.split(/[\.。]\s+/).filter((n) => n.trim()).map((n, s) => `- (${s + 1}) ${n}.`) } };
}
__name(ft, "ft");
__name2(ft, "ft");
function mt(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), r = (e[0] || "\uD575\uC2EC").slice(0, 40), n = [{ id: "c", label: r, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    n.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: r, nodes: n, edges: s } };
}
__name(mt, "mt");
__name2(mt, "mt");
function gt(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((n) => n.trim()).map((n) => n.trim()).map((n, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${n.slice(0, 70)}"`, answerHint: n })) } };
}
__name(gt, "gt");
__name2(gt, "gt");
async function un(t, e) {
  var l, c, d, h, m;
  const r = H(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = H(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const v = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (v.ok) {
      const j = await v.json();
      return { ok: true, text: ((m = (h = (d = (c = (l = j == null ? void 0 : j.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : d.parts) == null ? void 0 : h[0]) == null ? void 0 : m.text) ?? "", raw: j };
    }
    if (v.status === 429 || v.status === 503) {
      await new Promise((j) => setTimeout(j, o)), o *= 2;
      continue;
    }
    const A = await v.text().catch(() => "");
    throw new Error(`Gemini error ${v.status}: ${A.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(un, "un");
__name2(un, "un");
async function hn(t, e, r) {
  var c, d, h, m, v;
  const n = H(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const s = H(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: r }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, l = 500;
  for (; o < 3; ) {
    o++;
    const A = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (A.ok) {
      const S = await A.json();
      return ((v = (m = (h = (d = (c = S == null ? void 0 : S.candidates) == null ? void 0 : c[0]) == null ? void 0 : d.content) == null ? void 0 : h.parts) == null ? void 0 : m[0]) == null ? void 0 : v.text) ?? "";
    }
    if (A.status === 429 || A.status === 503) {
      await new Promise((S) => setTimeout(S, l)), l *= 2;
      continue;
    }
    const j = await A.text().catch(() => "");
    throw new Error(`Gemini error ${A.status}: ${j.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(hn, "hn");
__name2(hn, "hn");
async function Jt(t, e) {
  const r = await un(t, e);
  return typeof r == "string" ? r : ((r == null ? void 0 : r.text) ?? "").toString();
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
async function pn(t, e) {
  const r = sn(e);
  for (let n = 1; n <= 2; n++)
    try {
      let i = (await Jt(t, r) || "").trim();
      i.startsWith("```") && (i = i.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
      const a = JSON.parse(i);
      if (!(a != null && a.brief) || !(a != null && a.standard) || !(a != null && a.detail))
        throw new Error("Missing required fields");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing detail fields");
      const o = we(a.brief), l = we(a.standard), c = we(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      (o >= l || l >= c) && console.warn("[SummaryJSON] monotonic violated", { bLen: o, sLen: l, dLen: c, attempt: n });
      const d = et(a.brief, "brief"), h = et(a.standard, "standard"), m = a.detail.\uAC1C\uB150 + " " + a.detail.\uC601\uD5A5 + " " + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"], v = et(m, "detail");
      if (!d.valid && (console.warn("[SummaryJSON] brief validation failed:", d.error), n === 1))
        throw new Error(`Brief validation: ${d.error}`);
      if (!h.valid && (console.warn("[SummaryJSON] standard validation failed:", h.error), n === 1))
        throw new Error(`Standard validation: ${h.error}`);
      if (!v.valid && (console.warn("[SummaryJSON] detail validation failed:", v.error), n === 1))
        throw new Error(`Detail validation: ${v.error}`);
      return a;
    } catch (s) {
      if (console.error("[SummaryJSON] attempt failed", n, s == null ? void 0 : s.message), n === 2) {
        const i = zt(e);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", standard: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", detail: { \uAC1C\uB150: "[\uC2E4\uD328]", \uC601\uD5A5: "[\uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uC2E4\uD328]" } };
      }
    }
  throw new Error("summarizeWithJSON failed");
}
__name(pn, "pn");
__name2(pn, "pn");
var fn = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, r = { brief: 6, standard: 10, detail: 14 }, n = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(O) {
    return (O || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(O, x) {
    const g = Math.max(200, i(O || "").length), E = e[x] || e.standard, f = Math.floor(g * E.min), R = Math.ceil(g * E.max);
    return { base: g, min: Math.max(80, f), max: Math.max(120, R) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(O) {
    const x = (O || "").trim();
    return x ? x.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((g) => g.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function l(O) {
    return o(O).map((p, g) => ({ sid: `S${g + 1}`, text: p }));
  }
  __name(l, "l");
  __name2(l, "l");
  function c(O, x, p) {
    const g = O.find((E) => E.sid === x);
    return !g || !p || typeof p != "string" ? false : g.text.includes(p.trim());
  }
  __name(c, "c");
  __name2(c, "c");
  function d() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(d, "d");
  __name2(d, "d");
  function h({ originalText: O, mode: x, format: p }) {
    const g = a(O, x), E = Gt(O), f = p === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : p === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${p} (${f})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${g.min}\uC790 ~ \uCD5C\uB300 ${g.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", E].join(`
`);
  }
  __name(h, "h");
  __name2(h, "h");
  function m({ summaryText: O, format: x }) {
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
  __name(m, "m");
  __name2(m, "m");
  function v({ mode: O, purpose: x, format: p, summaryText: g, sentTable: E, anchors: f }) {
    const R = r[O] || 10, q = x === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", J = p === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : p === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${O} (\uBB38\uD56D\uC218 ${R})`, `- \uBAA9\uC801: ${x} (${q})`, `- \uC694\uC57D \uD615\uC2DD: ${p} (${J})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(E, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[SUMMARY]", g].join(`
`);
  }
  __name(v, "v");
  __name2(v, "v");
  function A(O, x) {
    const p = x && x.anchors ? x.anchors : [], g = [], E = [];
    for (const f of p) {
      const R = f == null ? void 0 : f.sid, q = f == null ? void 0 : f.quote;
      if (typeof (f == null ? void 0 : f.label) != "string" || !f.label.trim()) {
        E.push({ a: f, reason: "label missing" });
        continue;
      }
      if (!c(O, R, q)) {
        E.push({ a: f, reason: "evidence not in sentence" });
        continue;
      }
      g.push(f);
    }
    return { ok: g, bad: E };
  }
  __name(A, "A");
  __name2(A, "A");
  function j(O, x) {
    const p = x && Array.isArray(x.items) ? x.items : [], g = [], E = [];
    for (const f of p) {
      const R = f == null ? void 0 : f.evidence;
      if (!(f != null && f.id) || !(f != null && f.question) || !(f != null && f.answer) || !(R != null && R.sid) || !(R != null && R.quote)) {
        E.push({ q: f, reason: "missing fields" });
        continue;
      }
      if (!c(O, R.sid, R.quote)) {
        E.push({ q: f, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(f.choices) && f.choices.length > 0 && !f.choices.includes(f.answer)) {
        E.push({ q: f, reason: "answer not in choices" });
        continue;
      }
      g.push(f);
    }
    return { ok: g, bad: E };
  }
  __name(j, "j");
  __name2(j, "j");
  function S({ summaryText: O, sentTable: x, anchors: p, badItems: g, mode: E, purpose: f, format: R }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${g.length}`, `- \uBAA8\uB4DC: ${E}, \uBAA9\uC801: ${f}, \uD615\uC2DD: ${R}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(x, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[BAD ITEMS]", JSON.stringify(g, null, 2), "", "[SUMMARY]", O].join(`
`);
  }
  __name(S, "S");
  __name2(S, "S");
  async function I({ llmCall: O, originalText: x, mode: p, format: g }) {
    if (!O)
      throw new Error("llmCall is required");
    e[p] || (p = "standard"), n.includes(g) || (g = "narrative");
    const E = h({ originalText: x, mode: p, format: g }), f = (await O({ system: d(), user: E, json: false }) || "").trim() || "", R = l(f), q = m({ summaryText: f, format: g });
    let J = await O({ system: d(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(J);
    } catch {
      Y = { anchors: [] };
    }
    const { ok: P } = A(R, Y), De = P.length >= 4 ? P : C(R);
    return { summaryText: f, sentTable: R, anchors: De };
  }
  __name(I, "I");
  __name2(I, "I");
  function C(O) {
    const x = [];
    for (let p = 0; p < Math.min(8, O.length); p++) {
      const g = O[p], E = (g.text || "").slice(0, 18);
      x.push({ id: `A${p + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${p + 1}`, type: "claim", sid: g.sid, quote: E, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return x;
  }
  __name(C, "C");
  __name2(C, "C");
  async function w({ llmCall: O, mode: x, purpose: p, format: g, summaryText: E, sentTable: f, anchors: R }) {
    e[x] || (x = "standard"), s.includes(p) || (p = "preview"), n.includes(g) || (g = "narrative");
    const q = v({ mode: x, purpose: p, format: g, summaryText: E, sentTable: f, anchors: R });
    let J = await O({ system: d(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(J);
    } catch {
      Y = { items: [] };
    }
    let { ok: P, bad: De } = j(f, Y);
    if (De.length > 0) {
      const Ce = S({ summaryText: E, sentTable: f, anchors: R, badItems: De.map((Qt) => Qt.q), mode: x, purpose: p, format: g });
      let Vt = await O({ system: d(), user: Ce, json: true }), Ve;
      try {
        Ve = JSON.parse(Vt);
      } catch {
        Ve = { items: [] };
      }
      const Wt = j(f, Ve);
      P = P.concat(Wt.ok);
      const Xt = r[x] || 10;
      P = P.slice(0, Xt);
    } else {
      const Ce = r[x] || 10;
      P = P.slice(0, Ce);
    }
    const Ye = r[x] || 10;
    if (P.length < Ye) {
      const Ce = _({ sentTable: f, anchors: R, count: Ye - P.length, format: g, purpose: p });
      P = P.concat(Ce).slice(0, Ye);
    }
    return { items: P };
  }
  __name(w, "w");
  __name2(w, "w");
  function _({ sentTable: O, anchors: x, count: p, format: g, purpose: E }) {
    const f = [], R = x.slice(0, Math.max(p, 1));
    for (let q = 0; q < p; q++) {
      const J = R[q % R.length], Y = J.sid, P = J.quote;
      f.push({ id: `QF${q + 1}`, type: "short", question: E === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${P}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: Y, quote: P }, anchorIds: [J.id] });
    }
    return f;
  }
  __name(_, "_");
  __name2(_, "_");
  class N {
    constructor(x, { passScore: p = 90 } = {}) {
      this.items = Array.isArray(x) ? x : [], this.passScore = p, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(x, p) {
      if (!x)
        return { ok: false, reason: "no item" };
      const g = x.type;
      if (g === "mcq" || g === "blank" || g === "match" || g === "order" || g === "label" || g === "short") {
        if (g === "short")
          return { ok: true, reason: "short-auto-pass" };
        const E = (x.answer || "").trim(), f = (p || "").trim();
        return { ok: f === E, reason: f === E ? "match" : "mismatch" };
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
      const p = this.currentItem();
      if (this.gradeAnswer(p, x).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(p.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${p.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${p.evidence.quote}'`, score: this.getScore() };
      {
        const E = p.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: E, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const p = this.items.filter((g) => this.state.wrongIds.has(g.id));
          this.items = p.length > 0 ? p : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(N, "N");
  __name2(N, "N");
  async function ee({ llmCall: O, originalText: x, mode: p, format: g, purpose: E }) {
    const f = await I({ llmCall: O, originalText: x, mode: p, format: g }), R = await w({ llmCall: O, mode: p, purpose: E, format: g, summaryText: f.summaryText, sentTable: f.sentTable, anchors: f.anchors });
    return { summary: { mode: p, format: g, text: f.summaryText, sentences: f.sentTable, anchors: f.anchors }, selfTest: { purpose: E, passScore: 90, items: R.items } };
  }
  __name(ee, "ee");
  __name2(ee, "ee");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: l, generateBundle: I, generateSelfTest: w, runPipeline: ee, MasteryRunner: N };
})();
var mn = `/* MindStory Engine Bundle (compat) */
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
U.use("/api/*", $r());
U.get("/static/ms-engine-bundle.js", (t) => t.text(mn, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
U.get("/favicon.ico", (t) => t.body(null, 204));
U.use("/static/*", zr({ root: "./public" }));
U.get("/", (t) => t.html(`<!DOCTYPE html>
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
U.get("/api/health", (t) => {
  const e = !!H(t.env.GEMINI_API_KEY).trim(), r = H(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: qt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !r ? "gemini+fallback" : "local-only" });
});
U.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const n = H((r == null ? void 0 : r.text) || (r == null ? void 0 : r.originalText) || ""), s = Ft((r == null ? void 0 : r.mode) || "standard"), i = Kt((r == null ? void 0 : r.format) || (r == null ? void 0 : r.viewType) || "narrative"), a = H((r == null ? void 0 : r.purpose) || "preview").trim().toLowerCase();
  if (!n)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!H(t.env.GEMINI_API_KEY).trim(), l = H(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || l)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const c = /* @__PURE__ */ __name2(async ({ system: d, user: h, json: m }) => {
    if (m) {
      const v = `${d}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Jt(t.env, v);
    } else
      return (await hn(t.env, d, h) || "").toString();
  }, "c");
  try {
    const d = await fn.runPipeline({ llmCall: c, originalText: n, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: d, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (d) {
    return console.error("[GENS Engine Error]", d), t.json({ ok: false, error: { code: "GENS_ERROR", message: d.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: d.stack } }, 500);
  }
});
U.post("/api/engine", async (t) => {
  var S, I;
  const e = Date.now(), r = t.env.DB;
  await dn(r);
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Wr(n == null ? void 0 : n.kind), i = H((n == null ? void 0 : n.text) || ""), a = Ft((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), o = Kt((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), l = H(((S = n == null ? void 0 : n.options) == null ? void 0 : S.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const c = ln(s, a, o, i, l || null), d = await pt(r, c);
  if (d.hit)
    return t.json({ ok: true, data: d.data, meta: { cached: true, cacheStore: d.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = cn(s, a, i, l || null), m = await pt(r, h);
  if (m.hit && ((I = m.data) != null && I.narrative)) {
    const C = m.data.narrative;
    let w;
    return o === "narrative" ? w = { kind: s, mode: a, viewType: o, narrative: C } : o === "structured" ? w = { kind: s, mode: a, ...ft(C) } : o === "mindmap" ? w = { kind: s, mode: a, ...mt(C) } : w = { kind: s, mode: a, ...gt(C) }, await Re(r, c, l || "anon", w), t.json({ ok: true, data: w, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const v = !!H(t.env.GEMINI_API_KEY).trim(), A = H(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && v && !A)
    try {
      const C = await pn(t.env, i);
      let w;
      a === "brief" ? w = C.brief : a === "standard" ? w = C.standard : w = `**\uAC1C\uB150**
${C.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${C.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${C.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`;
      const _ = { kind: s, mode: a, viewType: "narrative", narrative: w, allSummaries: { brief: C.brief, standard: C.standard, detail: C.detail }, meta: C.meta };
      await Re(r, h, l || "anon", _);
      let N;
      return o === "narrative" ? N = _ : o === "structured" ? N = { kind: s, mode: a, ...ft(w) } : o === "mindmap" ? N = { kind: s, mode: a, ...mt(w) } : N = { kind: s, mode: a, ...gt(w) }, await Re(r, c, l || "anon", N), t.json({ ok: true, data: N, meta: { cached: false, engine: "gemini-json-v3", elapsedMs: Date.now() - e } }, 200);
    } catch (C) {
      console.error("[Gemini JSON Error]", C);
    }
  const j = on(i, a, o);
  if (await Re(r, c, l || "anon", j), j.narrative) {
    const C = { kind: "summary", mode: a, viewType: "narrative", narrative: j.narrative };
    await Re(r, h, l || "anon", C);
  }
  return t.json({ ok: true, data: j, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
U.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
U.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var xt = new Dt();
var gn = Object.assign({ "/src/index.tsx": U });
var Yt = false;
for (const [, t] of Object.entries(gn))
  t && (xt.route("/", t), xt.notFound(t.notFoundHandler), Yt = true);
if (!Yt)
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

// .wrangler/tmp/pages-adNGS2/q9855b2ewl.js
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

// .wrangler/tmp/bundle-eal12M/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-eal12M/middleware-loader.entry.ts
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
//# sourceMappingURL=q9855b2ewl.js.map
