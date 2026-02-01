var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-LM7nOk/checked-fetch.js
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

// .wrangler/tmp/bundle-LM7nOk/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-StEziY/bundledWorker-0.18390703752329784.mjs
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
var en = Object.defineProperty;
var it = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "it");
var tn = /* @__PURE__ */ __name2((t, e, n) => e in t ? en(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "tn");
var E = /* @__PURE__ */ __name2((t, e, n) => tn(t, typeof e != "symbol" ? e + "" : e, n), "E");
var We = /* @__PURE__ */ __name2((t, e, n) => e.has(t) || it("Cannot " + n), "We");
var u = /* @__PURE__ */ __name2((t, e, n) => (We(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "u");
var C = /* @__PURE__ */ __name2((t, e, n) => e.has(t) ? it("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "C");
var w = /* @__PURE__ */ __name2((t, e, n, r) => (We(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "w");
var k = /* @__PURE__ */ __name2((t, e, n) => (We(t, e, "access private method"), n), "k");
var at = /* @__PURE__ */ __name2((t, e, n, r) => ({ set _(s) {
  w(t, e, s, n);
}, get _() {
  return u(t, e, r);
} }), "at");
var ot = /* @__PURE__ */ __name2((t, e, n) => (r, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let c, l = false, d;
    if (t[o] ? (d = t[o][0][0], r.req.routeIndex = o) : d = o === t.length && s || void 0, d)
      try {
        c = await d(r, () => a(o + 1));
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
}, "ot");
var nn = Symbol();
var rn = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof Rt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? sn(t, { all: n, dot: r }) : {};
}, "rn");
async function sn(t, e) {
  const n = await t.formData();
  return n ? an(n, e) : {};
}
__name(sn, "sn");
__name2(sn, "sn");
function an(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? on(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (cn(n, r, s), delete n[r]);
  }), n;
}
__name(an, "an");
__name2(an, "an");
var on = /* @__PURE__ */ __name2((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "on");
var cn = /* @__PURE__ */ __name2((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "cn");
var Ct = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Ct");
var ln = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: n } = dn(t), r = Ct(n);
  return un(r, e);
}, "ln");
var dn = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "dn");
var un = /* @__PURE__ */ __name2((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "un");
var Le = {};
var hn = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return Le[r] || (n[2] ? Le[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Le[r] = [t, n[1], true]), Le[r];
  }
  return null;
}, "hn");
var rt = /* @__PURE__ */ __name2((t, e) => {
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
}, "rt");
var pn = /* @__PURE__ */ __name2((t) => rt(t, decodeURI), "pn");
var Ot = /* @__PURE__ */ __name2((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return pn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "Ot");
var fn = /* @__PURE__ */ __name2((t) => {
  const e = Ot(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "fn");
var ge = /* @__PURE__ */ __name2((t, e, ...n) => (n.length && (e = ge(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ge");
var Nt = /* @__PURE__ */ __name2((t) => {
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
}, "Nt");
var Qe = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? rt(t, kt) : t) : t, "Qe");
var _t = /* @__PURE__ */ __name2((t, e, n) => {
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
}, "_t");
var mn = _t;
var gn = /* @__PURE__ */ __name2((t, e) => _t(t, e, true), "gn");
var kt = decodeURIComponent;
var ct = /* @__PURE__ */ __name2((t) => rt(t, kt), "ct");
var be;
var G;
var ee;
var Mt;
var $t;
var nt;
var te;
var yt;
var Rt = (yt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", n = [[]]) {
    C(this, ee);
    E(this, "raw");
    C(this, be);
    C(this, G);
    E(this, "routeIndex", 0);
    E(this, "path");
    E(this, "bodyCache", {});
    C(this, te, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, w(this, G, n), w(this, be, {});
  }
  param(t) {
    return t ? k(this, ee, Mt).call(this, t) : k(this, ee, $t).call(this);
  }
  query(t) {
    return mn(this.url, t);
  }
  queries(t) {
    return gn(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await rn(this, t));
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
    u(this, be)[t] = e;
  }
  valid(t) {
    return u(this, be)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [nn]() {
    return u(this, G);
  }
  get matchedRoutes() {
    return u(this, G)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return u(this, G)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "yt"), be = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), Mt = /* @__PURE__ */ __name2(function(t) {
  const e = u(this, G)[0][this.routeIndex][1][t], n = k(this, ee, nt).call(this, e);
  return n && /\%/.test(n) ? ct(n) : n;
}, "Mt"), $t = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(u(this, G)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = k(this, ee, nt).call(this, u(this, G)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? ct(r) : r);
  }
  return t;
}, "$t"), nt = /* @__PURE__ */ __name2(function(t) {
  return u(this, G)[1] ? u(this, G)[1][t] : t;
}, "nt"), te = /* @__PURE__ */ new WeakMap(), yt);
var xn = { Stringify: 1 };
var It = /* @__PURE__ */ __name2(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => It(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "It");
var vn = "text/plain; charset=UTF-8";
var Ze = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Ze");
var Re;
var Me;
var X;
var ye;
var W;
var B;
var $e;
var we;
var Ee;
var le;
var Ie;
var je;
var ne;
var xe;
var wt;
var bn = (wt = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    C(this, ne);
    C(this, Re);
    C(this, Me);
    E(this, "env", {});
    C(this, X);
    E(this, "finalized", false);
    E(this, "error");
    C(this, ye);
    C(this, W);
    C(this, B);
    C(this, $e);
    C(this, we);
    C(this, Ee);
    C(this, le);
    C(this, Ie);
    C(this, je);
    E(this, "render", (...t2) => (u(this, we) ?? w(this, we, (e2) => this.html(e2)), u(this, we).call(this, ...t2)));
    E(this, "setLayout", (t2) => w(this, $e, t2));
    E(this, "getLayout", () => u(this, $e));
    E(this, "setRenderer", (t2) => {
      w(this, we, t2);
    });
    E(this, "header", (t2, e2, n) => {
      this.finalized && w(this, B, new Response(u(this, B).body, u(this, B)));
      const r = u(this, B) ? u(this, B).headers : u(this, le) ?? w(this, le, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    E(this, "status", (t2) => {
      w(this, ye, t2);
    });
    E(this, "set", (t2, e2) => {
      u(this, X) ?? w(this, X, /* @__PURE__ */ new Map()), u(this, X).set(t2, e2);
    });
    E(this, "get", (t2) => u(this, X) ? u(this, X).get(t2) : void 0);
    E(this, "newResponse", (...t2) => k(this, ne, xe).call(this, ...t2));
    E(this, "body", (t2, e2, n) => k(this, ne, xe).call(this, t2, e2, n));
    E(this, "text", (t2, e2, n) => !u(this, le) && !u(this, ye) && !e2 && !n && !this.finalized ? new Response(t2) : k(this, ne, xe).call(this, t2, e2, Ze(vn, n)));
    E(this, "json", (t2, e2, n) => k(this, ne, xe).call(this, JSON.stringify(t2), e2, Ze("application/json", n)));
    E(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name2((s) => k(this, ne, xe).call(this, s, e2, Ze("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? It(t2, xn.Stringify, false, {}).then(r) : r(t2);
    });
    E(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    E(this, "notFound", () => (u(this, Ee) ?? w(this, Ee, () => new Response()), u(this, Ee).call(this, this)));
    w(this, Re, t), e && (w(this, W, e.executionCtx), this.env = e.env, w(this, Ee, e.notFoundHandler), w(this, je, e.path), w(this, Ie, e.matchResult));
  }
  get req() {
    return u(this, Me) ?? w(this, Me, new Rt(u(this, Re), u(this, je), u(this, Ie))), u(this, Me);
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
    return u(this, B) || w(this, B, new Response(null, { headers: u(this, le) ?? w(this, le, new Headers()) }));
  }
  set res(t) {
    if (u(this, B) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of u(this, B).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const r = u(this, B).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of r)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, n);
    }
    w(this, B, t), this.finalized = true;
  }
  get var() {
    return u(this, X) ? Object.fromEntries(u(this, X)) : {};
  }
}, "wt"), Re = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), xe = /* @__PURE__ */ __name2(function(t, e, n) {
  const r = u(this, B) ? new Headers(u(this, B).headers) : u(this, le) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? u(this, ye);
  return new Response(t, { status: s, headers: r });
}, "xe"), wt);
var M = "ALL";
var yn = "all";
var wn = ["get", "post", "put", "delete", "options", "patch"];
var jt = "Can not add a route since the matcher is already built.";
var Pt = /* @__PURE__ */ __name2(class extends Error {
}, "Pt");
var En = "__COMPOSED_HANDLER";
var Sn = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "Sn");
var lt = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "lt");
var F;
var $;
var Dt;
var K;
var oe;
var He;
var qe;
var Se;
var Tn = (Se = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    C(this, $);
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
    C(this, F, "/");
    E(this, "routes", []);
    C(this, K, Sn);
    E(this, "errorHandler", lt);
    E(this, "onError", (e2) => (this.errorHandler = e2, this));
    E(this, "notFound", (e2) => (w(this, K, e2), this));
    E(this, "fetch", (e2, ...n) => k(this, $, qe).call(this, e2, n[1], n[0], e2.method));
    E(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ge("/", e2)}`, n), r2, s2)));
    E(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(k(this, $, qe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...wn, yn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? w(this, F, a) : k(this, $, oe).call(this, i, u(this, F), a), o.forEach((c) => {
        k(this, $, oe).call(this, i, u(this, F), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        w(this, F, c);
        for (const l of [i].flat())
          o.map((d) => {
            k(this, $, oe).call(this, l.toUpperCase(), u(this, F), d);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, F, i) : (w(this, F, "*"), a.unshift(i)), a.forEach((o) => {
      k(this, $, oe).call(this, M, u(this, F), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? Ot : fn;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === lt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, c) => (await ot([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[En] = s.handler), k(a = r, $, oe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = k(this, $, Dt).call(this);
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
      return (d) => {
        const h = new URL(d.url);
        return h.pathname = h.pathname.slice(l) || "/", new Request(h, d);
      };
    })());
    const o = /* @__PURE__ */ __name2(async (c, l) => {
      const d = await n(s(c.req.raw), ...a(c));
      if (d)
        return d;
      await l();
    }, "o");
    return k(this, $, oe).call(this, M, ge(e, "*"), o), this;
  }
}, "Se"), F = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name2(function() {
  const e = new Se({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, w(e, K, u(this, K)), e.routes = this.routes, e;
}, "Dt"), K = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ __name2(function(e, n, r) {
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
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new bn(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: u(this, K) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await u(this, K).call(this, o);
      });
    } catch (d) {
      return k(this, $, He).call(this, d, o);
    }
    return l instanceof Promise ? l.then((d) => d || (o.finalized ? o.res : u(this, K).call(this, o))).catch((d) => k(this, $, He).call(this, d, o)) : l ?? u(this, K).call(this, o);
  }
  const c = ot(a[0], this.errorHandler, u(this, K));
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
var Lt = [];
function An(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name2((s, i) => {
    const a = n[s] || n[M], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Lt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(An, "An");
__name2(An, "An");
var Ke = "[^/]+";
var _e = ".*";
var ke = "(?:|/.*)";
var ve = Symbol();
var Cn = new Set(".\\+*[^]$()");
function On(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === _e || t === ke ? 1 : e === _e || e === ke ? -1 : t === Ke ? 1 : e === Ke ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(On, "On");
__name2(On, "On");
var de;
var ue;
var U;
var fe;
var Nn = (fe = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, de);
    C(this, ue);
    C(this, U, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (u(this, de) !== void 0)
        throw ve;
      if (i)
        return;
      w(this, de, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", _e] : ["", "", Ke] : a === "/*" ? ["", "", ke] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const d = c[1];
      let h = c[2] || Ke;
      if (d && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw ve;
      if (l = u(this, U)[h], !l) {
        if (Object.keys(u(this, U)).some((x) => x !== _e && x !== ke))
          throw ve;
        if (i)
          return;
        l = u(this, U)[h] = new fe(), d !== "" && w(l, ue, s.varIndex++);
      }
      !i && d !== "" && r.push([d, u(l, ue)]);
    } else if (l = u(this, U)[a], !l) {
      if (Object.keys(u(this, U)).some((d) => d.length > 1 && d !== _e && d !== ke))
        throw ve;
      if (i)
        return;
      l = u(this, U)[a] = new fe();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(u(this, U)).sort(On).map((r) => {
      const s = u(this, U)[r];
      return (typeof u(s, ue) == "number" ? `(${r})@${u(s, ue)}` : Cn.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof u(this, de) == "number" && n.unshift(`#${u(this, de)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "fe"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), fe);
var Ue;
var Pe;
var Et;
var _n = (Et = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, Ue, { varIndex: 0 });
    C(this, Pe, new Nn());
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
    return u(this, Pe).insert(i, e, r, u(this, Ue), n), r;
  }
  buildRegExp() {
    let t = u(this, Pe).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "Et"), Ue = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Et);
var kn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var ze = /* @__PURE__ */ Object.create(null);
function Bt(t) {
  return ze[t] ?? (ze[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Bt, "Bt");
__name2(Bt, "Bt");
function Rn() {
  ze = /* @__PURE__ */ Object.create(null);
}
__name(Rn, "Rn");
__name2(Rn, "Rn");
function Mn(t) {
  var l;
  const e = new _n(), n = [];
  if (t.length === 0)
    return kn;
  const r = t.map((d) => [!/\*|\/:/.test(d[0]), ...d]).sort(([d, h], [x, b]) => d ? 1 : x ? -1 : h.length - b.length), s = /* @__PURE__ */ Object.create(null);
  for (let d = 0, h = -1, x = r.length; d < x; d++) {
    const [b, S, O] = r[d];
    b ? s[S] = [O.map(([R]) => [R, /* @__PURE__ */ Object.create(null)]), Lt] : h++;
    let A;
    try {
      A = e.insert(S, h, b);
    } catch (R) {
      throw R === ve ? new Pt(S) : R;
    }
    b || (n[h] = O.map(([R, I]) => {
      const H = /* @__PURE__ */ Object.create(null);
      for (I -= 1; I >= 0; I--) {
        const [z, T] = A[I];
        H[z] = T;
      }
      return [R, H];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let d = 0, h = n.length; d < h; d++)
    for (let x = 0, b = n[d].length; x < b; x++) {
      const S = (l = n[d][x]) == null ? void 0 : l[1];
      if (!S)
        continue;
      const O = Object.keys(S);
      for (let A = 0, R = O.length; A < R; A++)
        S[O[A]] = o[S[O[A]]];
    }
  const c = [];
  for (const d in a)
    c[d] = n[a[d]];
  return [i, c, s];
}
__name(Mn, "Mn");
__name2(Mn, "Mn");
function me(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Bt(n).test(e))
        return [...t[n]];
  }
}
__name(me, "me");
__name2(me, "me");
var re;
var se;
var Je;
var Ht;
var St;
var $n = (St = /* @__PURE__ */ __name2(class {
  constructor() {
    C(this, Je);
    E(this, "name", "RegExpRouter");
    C(this, re);
    C(this, se);
    E(this, "match", An);
    w(this, re, { [M]: /* @__PURE__ */ Object.create(null) }), w(this, se, { [M]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = u(this, re), s = u(this, se);
    if (!r || !s)
      throw new Error(jt);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[M]).forEach((l) => {
        c[t][l] = [...c[M][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Bt(e);
      t === M ? Object.keys(r).forEach((l) => {
        var d;
        (d = r[l])[e] || (d[e] = me(r[l], e) || me(r[M], e) || []);
      }) : (o = r[t])[e] || (o[e] = me(r[t], e) || me(r[M], e) || []), Object.keys(r).forEach((l) => {
        (t === M || t === l) && Object.keys(r[l]).forEach((d) => {
          c.test(d) && r[l][d].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === M || t === l) && Object.keys(s[l]).forEach((d) => c.test(d) && s[l][d].push([n, i]));
      });
      return;
    }
    const a = Nt(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const d = a[c];
      Object.keys(s).forEach((h) => {
        var x;
        (t === M || t === h) && ((x = s[h])[d] || (x[d] = [...me(r[h], d) || me(r[M], d) || []]), s[h][d].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(u(this, se)).concat(Object.keys(u(this, re))).forEach((e) => {
      t[e] || (t[e] = k(this, Je, Ht).call(this, e));
    }), w(this, re, w(this, se, void 0)), Rn(), t;
  }
}, "St"), re = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakSet(), Ht = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let n = t === M;
  return [u(this, re), u(this, se)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== M && e.push(...Object.keys(r[M]).map((i) => [i, r[M][i]]));
  }), n ? Mn(e) : null;
}, "Ht"), St);
var ie;
var Q;
var Tt;
var In = (Tt = /* @__PURE__ */ __name2(class {
  constructor(t) {
    E(this, "name", "SmartRouter");
    C(this, ie, []);
    C(this, Q, []);
    w(this, ie, t.routers);
  }
  add(t, e, n) {
    if (!u(this, Q))
      throw new Error(jt);
    u(this, Q).push([t, e, n]);
  }
  match(t, e) {
    if (!u(this, Q))
      throw new Error("Fatal error");
    const n = u(this, ie), r = u(this, Q), s = n.length;
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
      this.match = o.match.bind(o), w(this, ie, [o]), w(this, Q, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (u(this, Q) || u(this, ie).length !== 1)
      throw new Error("No active router has been determined yet.");
    return u(this, ie)[0];
  }
}, "Tt"), ie = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Tt);
var Oe = /* @__PURE__ */ Object.create(null);
var ae;
var L;
var he;
var Te;
var D;
var Z;
var ce;
var Ae;
var jn = (Ae = /* @__PURE__ */ __name2(class {
  constructor(e, n, r) {
    C(this, Z);
    C(this, ae);
    C(this, L);
    C(this, he);
    C(this, Te, 0);
    C(this, D, Oe);
    if (w(this, L, r || /* @__PURE__ */ Object.create(null)), w(this, ae, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, w(this, ae, [s]);
    }
    w(this, he, []);
  }
  insert(e, n, r) {
    w(this, Te, ++at(this, Te)._);
    let s = this;
    const i = ln(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], d = i[o + 1], h = hn(l, d), x = Array.isArray(h) ? h[0] : l;
      if (x in u(s, L)) {
        s = u(s, L)[x], h && a.push(h[1]);
        continue;
      }
      u(s, L)[x] = new Ae(), h && (u(s, he).push(h), a.push(h[1])), s = u(s, L)[x];
    }
    return u(s, ae).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: u(this, Te) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    w(this, D, Oe);
    let i = [this];
    const a = Ct(n), o = [];
    for (let l = 0, d = a.length; l < d; l++) {
      const h = a[l], x = l === d - 1, b = [];
      for (let S = 0, O = i.length; S < O; S++) {
        const A = i[S], R = u(A, L)[h];
        R && (w(R, D, u(A, D)), x ? (u(R, L)["*"] && r.push(...k(this, Z, ce).call(this, u(R, L)["*"], e, u(A, D))), r.push(...k(this, Z, ce).call(this, R, e, u(A, D)))) : b.push(R));
        for (let I = 0, H = u(A, he).length; I < H; I++) {
          const z = u(A, he)[I], T = u(A, D) === Oe ? {} : { ...u(A, D) };
          if (z === "*") {
            const y = u(A, L)["*"];
            y && (r.push(...k(this, Z, ce).call(this, y, e, u(A, D))), w(y, D, T), b.push(y));
            continue;
          }
          const [_, f, m] = z;
          if (!h && !(m instanceof RegExp))
            continue;
          const g = u(A, L)[_], v = a.slice(l).join("/");
          if (m instanceof RegExp) {
            const y = m.exec(v);
            if (y) {
              if (T[f] = y[0], r.push(...k(this, Z, ce).call(this, g, e, u(A, D), T)), Object.keys(u(g, L)).length) {
                w(g, D, T);
                const p = ((c = y[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(g);
              }
              continue;
            }
          }
          (m === true || m.test(h)) && (T[f] = h, x ? (r.push(...k(this, Z, ce).call(this, g, e, T, u(A, D))), u(g, L)["*"] && r.push(...k(this, Z, ce).call(this, u(g, L)["*"], e, T, u(A, D)))) : (w(g, D, T), b.push(g)));
        }
      }
      i = b.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, d) => l.score - d.score), [r.map(({ handler: l, params: d }) => [l, d])];
  }
}, "Ae"), ae = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), ce = /* @__PURE__ */ __name2(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = u(e, ae).length; a < o; a++) {
    const c = u(e, ae)[a], l = c[n] || c[M], d = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== Oe || s && s !== Oe))
      for (let h = 0, x = l.possibleKeys.length; h < x; h++) {
        const b = l.possibleKeys[h], S = d[l.score];
        l.params[b] = s != null && s[b] && !S ? s[b] : r[b] ?? (s == null ? void 0 : s[b]), d[l.score] = true;
      }
  }
  return i;
}, "ce"), Ae);
var pe;
var At;
var Pn = (At = /* @__PURE__ */ __name2(class {
  constructor() {
    E(this, "name", "TrieRouter");
    C(this, pe);
    w(this, pe, new jn());
  }
  add(t, e, n) {
    const r = Nt(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        u(this, pe).insert(t, r[s], n);
      return;
    }
    u(this, pe).insert(t, e, n);
  }
  match(t, e) {
    return u(this, pe).search(t, e);
  }
}, "At"), pe = /* @__PURE__ */ new WeakMap(), At);
var qt = /* @__PURE__ */ __name2(class extends Tn {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new In({ routers: [new $n(), new Pn()] });
  }
}, "qt");
var Dn = /* @__PURE__ */ __name2((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var d;
    function c(h, x) {
      a.res.headers.set(h, x);
    }
    __name(c, "c");
    __name2(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (d = n.exposeHeaders) != null && d.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let x = n.allowHeaders;
      if (!(x != null && x.length)) {
        const b = a.req.header("Access-Control-Request-Headers");
        b && (x = b.split(/\s*,\s*/));
      }
      return x != null && x.length && (c("Access-Control-Allow-Headers", x.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Dn");
var Ln = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var dt = /* @__PURE__ */ __name2((t, e = Hn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "dt");
var Bn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Hn = Bn;
var qn = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "qn");
var zt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var zn = Object.keys(zt);
var Gn = "index.html";
var Fn = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? qn;
  return async (s, i) => {
    var d, h, x, b;
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
    let o = r(e, !n && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(o) && (o = r(o, Gn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const S = t.mimes && dt(o, t.mimes) || dt(o);
      if (s.header("Content-Type", S || "application/octet-stream"), t.precompressed && (!S || Ln.test(S))) {
        const O = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((A) => A.trim()));
        for (const A of zn) {
          if (!O.has(A))
            continue;
          const R = await c(o + zt[A], s);
          if (R) {
            l = R, s.header("Content-Encoding", A), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((x = t.onFound) == null ? void 0 : x.call(t, o, s)), s.body(l);
    }
    await ((b = t.onNotFound) == null ? void 0 : b.call(t, o, s)), await i();
  };
}, "Fn");
var Kn = /* @__PURE__ */ __name2(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "Kn");
var Un = /* @__PURE__ */ __name2((t) => async function(n, r) {
  return Fn({ ...t, getContent: async (i) => Kn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "Un");
var Jn = /* @__PURE__ */ __name2((t) => Un(t), "Jn");
var J = new qt();
var Ge = /* @__PURE__ */ new Map();
var Vn = 1e3 * 60 * 60 * 24 * 7;
var et = false;
function Gt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function P(t) {
  return t == null ? "" : String(t);
}
__name(P, "P");
__name2(P, "P");
function Fe(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Fe, "Fe");
__name2(Fe, "Fe");
function Yn(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(Yn, "Yn");
__name2(Yn, "Yn");
function st(t) {
  return Yn(t).length;
}
__name(st, "st");
__name2(st, "st");
function Xn(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(Xn, "Xn");
__name2(Xn, "Xn");
function Wn(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/\uFEFF/g, "").replace(/[\u200B-\u200D\u2060]/g, "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " "), e = e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g, `
`), e = e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g, "$1$2"), e = e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g, "$1$2"), e = e.replace(/\n{3,}/g, `

`), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/[「『]/g, '"').replace(/[」』]/g, '"'), e = e.replace(/[〈《]/g, '"').replace(/[〉》]/g, '"'), e = e.replace(/\s+([,.;:!?])/g, "$1").replace(/([,.;:!?])\s+/g, "$1 "), e.trim();
}
__name(Wn, "Wn");
__name2(Wn, "Wn");
function ut(t) {
  const e = (t || "").trim();
  if (!e)
    return [];
  const n = e.split(/\n{2,}/g), r = [];
  for (const s of n) {
    const i = s.replace(/\n/g, " ").replace(/[ \t]{2,}/g, " ").trim();
    if (!i)
      continue;
    const a = i.split(new RegExp("(?<=[\uB2E4\uC694\uC784\uD568]\\.|[\uB2E4\uC694\uC784\uD568]\\?|[\uB2E4\uC694\uC784\uD568]!|[.?!])\\s+", "g"));
    for (let o of a)
      o = o.trim(), o && r.push(o);
  }
  return r;
}
__name(ut, "ut");
__name2(ut, "ut");
function Qn(t) {
  const e = (t || "").trim();
  return !!(!e || e.length < 12 && !(/[.?!]$/.test(e) || /(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e)) || /[-–—]\s*\d{1,4}\s*[-–—]/.test(e) || /^["")\]\}]+$/.test(e) || /^["(\[\{]+$/.test(e) || /^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e) || /(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|전문\s*대비반|특강|홍보)/.test(e) && (/[""]/.test(e) || /!$/.test(e)) || (e.match(/["""'(){}\[\]<>]/g) || []).length >= 10 && e.length < 80);
}
__name(Qn, "Qn");
__name2(Qn, "Qn");
function Zn(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  for (const r of t) {
    const s = r.trim();
    if (Qn(s))
      continue;
    const i = s.replace(/\s+/g, " ");
    n.has(i) || (n.add(i), e.push(i));
  }
  return e;
}
__name(Zn, "Zn");
__name2(Zn, "Zn");
function er(t) {
  const e = Wn(t), n = Zn(ut(e)), r = n.length >= 3 ? n : ut(e);
  return { text: e, sentences: r };
}
__name(er, "er");
__name2(er, "er");
function Ft(t) {
  const e = P(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Ft, "Ft");
__name2(Ft, "Ft");
function Kt(t) {
  const e = P(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Kt, "Kt");
__name2(Kt, "Kt");
function tr(t) {
  const e = P(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(tr, "tr");
__name2(tr, "tr");
function Ut(t) {
  let e = P(t).replace(/\s+/g, " ").trim();
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
    const c = e[o], l = e[o + 1] || "", d = e[o + 2] || "";
    if (c === "(" && i++, c === ")" && (i = Math.max(0, i - 1)), (c === '"' || c === "'") && s === null ? s = c : s && c === s && (s = null), r += c, s === null && i === 0 && /[.!?]/.test(c)) {
      l === " " && (a(), o++);
      continue;
    }
    if (s === null && i === 0 && l === " ") {
      const x = r.trimEnd().slice(-1), b = /[가-힣A-Za-z0-9"'(\[]/.test(d);
      (x === "\uB2E4" || x === "\uC694" || x === "\uC8E0") && b && (a(), o++);
    }
  }
  return a(), n.length ? n : [e];
}
__name(Ut, "Ut");
__name2(Ut, "Ut");
var Ve = { narrative: { brief: 4, standard: 6, detail: 9 }, structured: { brief: 3, standard: 5, detail: 8 }, mindmap: { brief: 4, standard: 6, detail: 10 }, selftest: { brief: 3, standard: 5, detail: 8 } };
function nr(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "brief" || e === "standard" || e === "detail" ? e : e === "simple" ? "brief" : "standard";
}
__name(nr, "nr");
__name2(nr, "nr");
function rr(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" ? "mindmap" : "narrative";
}
__name(rr, "rr");
__name2(rr, "rr");
function sr(t) {
  const e = String(t || "").trim(), n = e.indexOf("{"), r = e.lastIndexOf("}");
  return n >= 0 && r > n ? e.slice(n, r + 1) : e;
}
__name(sr, "sr");
__name2(sr, "sr");
function ht(t) {
  const e = sr(t);
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
__name(ht, "ht");
__name2(ht, "ht");
function ir(t) {
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 '\uD559\uC2B5 \uB2E8\uC704' \uAE30\uC900\uC73C\uB85C \uB0B4\uC6A9\uC744 \uAD6C\uC870\uD654\uD558\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0(\uCD94\uCE21/\uACFC\uC7A5 \uAE08\uC9C0)", "- \uBB38\uC790 \uB2E8\uC21C \uC790\uB974\uAE30 \uAE08\uC9C0, \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uBA38\uB9AC\uB9D0/\uAF2C\uB9AC\uB9D0/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654\uC758 \uBF08\uB300(\uBC18\uB4DC\uC2DC \uD3EC\uD568):", "- anchor: \uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5", "- sections: \uD559\uC2B5 \uB2E8\uC704 \uC870\uBAA9\uD654, \uAC01 section\uC740 keywords/lvl25/explain \uD3EC\uD568", "- glossary: term/def\uB85C \uAD6C\uC131", "- links: anchor(A0) -> section \uC5F0\uACB0", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "anchor": "\uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5",', '  "hierarchy": { "big": "\uB300\uB2E8\uC6D0", "mid": "\uC911\uB2E8\uC6D0", "small": "\uC18C\uB2E8\uC6D0", "subtitles": ["\uC18C\uC81C\uBAA9"] },', '  "sections": [', '    { "id": "S1", "title": "\uC139\uC158 \uC81C\uBAA9", "keywords": ["\uD575\uC2EC\uC5B4"], "lvl25": ["\uC758\uBBF8\uD0A4\uC6CC\uB4DC"], "explain": "1~3\uBB38\uC7A5 \uC124\uBA85" }', "  ],", '  "glossary": [ { "term": "\uC6A9\uC5B4", "def": "\uC815\uC758" } ],', '  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${st(t)}\uC790):`, t].join(`
`);
}
__name(ir, "ir");
__name2(ir, "ir");
function ar(t, e) {
  const n = st(t), r = (e == null ? void 0 : e.anchor) || "", s = ((e == null ? void 0 : e.sections) || []).map((i) => i.title).slice(0, 10);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 \uC2DC\uD5D8/\uC774\uD574/\uAE30\uC5B5\uC744 \uC704\uD55C \uC11C\uC220\uD615 \uC694\uC57D \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", '- \uC544\uB798 "\uAD6C\uC870\uD654 \uBF08\uB300"\uB97C \uBC97\uC5B4\uB098\uC9C0 \uB9D0\uACE0, \uADF8 \uB0B4\uC6A9\uC744 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC5F0\uACB0\uD574 \uC11C\uC220\uD558\uC138\uC694.', "", "\uAD6C\uC870\uD654 \uBF08\uB300:", `- anchor: ${r}`, `- sections: ${JSON.stringify(s)}`, "", "\uC694\uAD6C:", "- summary\uB294 6~10\uBB38\uC7A5(\uC0C1\uC138)", "- keyPoints 4~7\uAC1C, examHints 2~4\uAC1C", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "title": "\uC694\uC57D \uC81C\uBAA9",', '  "summary": "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5 \uC694\uC57D(6~10\uBB38\uC7A5)",', '  "keyPoints": ["\uD575\uC2EC\uD3EC\uC778\uD2B8"],', '  "examHints": ["\uC2DC\uD5D8\uD3EC\uC778\uD2B8"]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${n}\uC790):`, t].join(`
`);
}
__name(ar, "ar");
__name2(ar, "ar");
function or(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 5) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 20);
  return ["\uB2F9\uC2E0\uC740 \uD559\uC2B5\uC6A9 \uB9C8\uC778\uB4DC\uB9F5 JSON\uC744 \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uB178\uB4DC id \uC911\uBCF5/\uB204\uB77D \uAE08\uC9C0, edge \uCC38\uC870 \uC77C\uAD00", "- \uC544\uB798 \uAD6C\uC870\uD654 \uC815\uBCF4\uB97C \uADF8\uB300\uB85C \uBC14\uD0D5\uC73C\uB85C \uAD6C\uC131(\uC0C8 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "center": { "id": "C0", "label": "\uC911\uC2EC \uC8FC\uC81C", "type": "root", "note": "\uC9E7\uC740 \uC124\uBA85" },', '  "nodes": [', '    { "id": "S1", "label": "\uC139\uC158", "type": "section", "note": "\uC124\uBA85" },', '    { "id": "T1", "label": "\uC6A9\uC5B4", "type": "term", "note": "\uC815\uC758" }', "  ],", '  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]', "}"].join(`
`);
}
__name(or, "or");
__name2(or, "or");
function cr(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 6) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 25);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uC6D0\uBB38/\uAD6C\uC870\uD654\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uAE08\uC9C0", "- \uBB38\uD56D id\uB294 q1, q2... \uACE0\uC720", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uC694\uAD6C(\uC0C1\uC138):", "- \uCD1D 8\uBB38\uD56D", "- type\uC740 reorder/blank/multiple_choice \uC11E\uAE30", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "questions": [', '    { "id": "q1", "type": "multiple_choice", "prompt": "\uC9C8\uBB38", "choices": ["a","b","c"], "answer": 1 },', '    { "id": "q2", "type": "blank", "prompt": "\uBE48\uCE78", "answer": "\uC815\uB2F5" },', '    { "id": "q3", "type": "reorder", "prompt": "\uC21C\uC11C", "choices": ["A","B","C"], "answer": [0,2,1] }', "  ]", "}"].join(`
`);
}
__name(cr, "cr");
__name2(cr, "cr");
function pt(t, e) {
  const n = Ve.structured[e], r = (t.sections || []).slice(0, n).map((c) => ({ ...c, keywords: (c.keywords || []).slice(0, e === "brief" ? 4 : 6), lvl25: (c.lvl25 || []).slice(0, e === "brief" ? 2 : 3), explain: String(c.explain || "").trim() })), s = e === "brief" ? 8 : e === "standard" ? 14 : 20, i = (t.glossary || []).slice(0, s), a = new Set(r.map((c) => c.id)), o = (t.links || []).filter((c) => c.from === "A0" && a.has(c.to));
  return { ...t, sections: r, glossary: i, links: o };
}
__name(pt, "pt");
__name2(pt, "pt");
function ft(t, e) {
  const n = Ve.mindmap[e], r = (t.nodes || []).slice(0, Math.max(0, n - 1)), s = /* @__PURE__ */ new Set(["C0", ...r.map((a) => a.id)]), i = (t.edges || []).filter((a) => s.has(a.from) && s.has(a.to));
  return { ...t, nodes: r, edges: i };
}
__name(ft, "ft");
__name2(ft, "ft");
function mt(t, e) {
  const n = Ve.selftest[e];
  return { questions: (t.questions || []).slice(0, n) };
}
__name(mt, "mt");
__name2(mt, "mt");
function gt(t, e) {
  const n = Ve.narrative[e], i = Ut(t.summary || "").slice(0, n).join(" "), a = (t.keyPoints || []).slice(0, e === "brief" ? 3 : 4), o = (t.examHints || []).slice(0, e === "brief" ? 2 : 3);
  return { ...t, summary: i, keyPoints: a, examHints: o };
}
__name(gt, "gt");
__name2(gt, "gt");
async function Be(t, e) {
  const n = /* @__PURE__ */ __name2(async () => {
    const o = await Vt(t, e);
    return String(o || "");
  }, "n"), r = await n(), s = ht(r);
  if (s)
    return s;
  const i = await n(), a = ht(i);
  if (a)
    return a;
  throw new Error("MODEL_JSON_PARSE_FAILED");
}
__name(Be, "Be");
__name2(Be, "Be");
async function lr(t, e) {
  const n = await Be(t, ir(e));
  if (!(n != null && n.anchor) || !Array.isArray(n.sections))
    throw new Error("STRUCTURED_SCHEMA_INVALID");
  n.links = n.links || n.sections.map((d) => ({ from: "A0", to: d.id, rel: "covers" }));
  const r = await Be(t, ar(e, n));
  if (!(r != null && r.summary))
    throw new Error("NARRATIVE_SCHEMA_INVALID");
  const s = await Be(t, or(n));
  if (!(s != null && s.center) || !Array.isArray(s.nodes) || !Array.isArray(s.edges))
    throw new Error("MINDMAP_SCHEMA_INVALID");
  s.center.id || (s.center.id = "C0");
  const i = await Be(t, cr(n));
  if (!Array.isArray(i.questions))
    throw new Error("SELFTEST_SCHEMA_INVALID");
  const a = { detail: n, standard: pt(n, "standard"), brief: pt(n, "brief") }, o = { detail: r, standard: gt(r, "standard"), brief: gt(r, "brief") }, c = { detail: s, standard: ft(s, "standard"), brief: ft(s, "brief") }, l = { detail: i, standard: mt(i, "standard"), brief: mt(i, "brief") };
  return { structured: a, narrative: o, mindmap: c, selftest: l };
}
__name(lr, "lr");
__name2(lr, "lr");
function dr(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/([가-힣])\r?\n([가-힣])/g, "$1$2"), e = e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g, "$1$2"), e = e.replace(/\r/g, ""), e = e.replace(/\n{2,}/g, `
`), e = e.replace(/\n/g, " "), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/\s+([,.;:!?])/g, "$1"), e.trim();
}
__name(dr, "dr");
__name2(dr, "dr");
function ur(t) {
  return (t || []).filter((e) => {
    const n = (e || "").trim();
    return !(!n || n.length < 18 || !(/[.!?]$/.test(n) || /다\.$/.test(n) || /이다\.$/.test(n) || /하였다\.$/.test(n)) && n.length < 45);
  });
}
__name(ur, "ur");
__name2(ur, "ur");
var hr = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
function xt(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !hr.has(e));
}
__name(xt, "xt");
__name2(xt, "xt");
function pr(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t)
    for (const s of xt(r))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((r, s) => {
    const i = xt(r);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = r.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: r, score: a * c };
  });
}
__name(pr, "pr");
__name2(pr, "pr");
function fr(t, e) {
  if (t.length === 0)
    return [];
  const n = pr(t), r = n[0], s = n.slice(1), i = s.slice().sort((o, c) => c.score - o.score).slice(0, Fe(e - 1, 0, Math.max(0, s.length)));
  return [r, ...i].sort((o, c) => o.idx - c.idx).map((o) => o.s);
}
__name(fr, "fr");
__name2(fr, "fr");
function mr(t) {
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
__name(mr, "mr");
__name2(mr, "mr");
function gr(t, e, n) {
  if (!Array.isArray(t) || t.length === 0)
    return { summary: "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", mindmap: { keywords: [], nodes: [], edges: [] }, meta: { ratio: 0, target: { min: 0, max: 0 } } };
  const r = Math.max(1, Number(n) || 1), s = e === "brief" ? { min: 10, max: 15 } : e === "detail" ? { min: 45, max: 55 } : { min: 25, max: 30 }, i = ["\uB610\uD55C", "\uC544\uC6B8\uB7EC", "\uB354\uBD88\uC5B4"], a = ["\uD55C\uD3B8", "\uC774\uC640 \uD568\uAED8", "\uC774\uC640 \uB354\uBD88\uC5B4", "\uB610 \uB2E4\uB978 \uCE21\uBA74\uC5D0\uC11C"], o = /* @__PURE__ */ __name2((T) => {
    const _ = String(T || "").trim().slice(0, 24);
    if (/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(_))
      return null;
    const f = _.match(/^(.{1,20}?(은|는|이|가))\s+/);
    return f ? f[1] : null;
  }, "o"), c = /* @__PURE__ */ __name2((T) => {
    const _ = String(T || "").trim();
    return _ && (/[.!?…]$/.test(_) ? _ : _ + ".");
  }, "c"), l = /* @__PURE__ */ __name2((T) => {
    let _ = String(T || "").trim(), f = "";
    const m = _.match(/([.!?…])$/);
    return m && (f = m[1], _ = _.slice(0, -1).trim()), _ = _.replace(/합니다$/, "\uD55C\uB2E4").replace(/되었습니다$/, "\uB418\uC5C8\uB2E4").replace(/입니다$/, "\uC774\uB2E4").replace(/습니다$/, "\uB2E4"), (_ + (f || ".")).trim();
  }, "l"), d = /* @__PURE__ */ __name2((T) => /^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(T.trim()), "d"), h = /* @__PURE__ */ __name2((T) => T.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/, "").trim(), "h");
  let x = t.map((T, _) => {
    const f = String(T || "").trim();
    if (!f)
      return "";
    if (_ === 0) {
      const p = h(f);
      return l(c(p));
    }
    if (d(f))
      return l(c(f));
    const m = String(t[_ - 1] || "").trim(), g = o(m), v = o(f), y = /* @__PURE__ */ __name2((p) => p[_ % p.length], "y");
    if (v && g && v === g) {
      const p = f.replace(/^(.{1,40}?(은|는|이|가))\s+/, "");
      return l(c(`${y(i)} ${p}`.trim()));
    } else
      return f.length > 15 ? l(c(`${y(a)} ${f}`.trim())) : l(c(f));
  }).filter(Boolean);
  const b = /* @__PURE__ */ __name2((T) => String(T || "").replace(/\s+/g, "").length, "b");
  let S = x.join(" ");
  S = S.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g, " $2 ").replace(/\s{2,}/g, " ").trim();
  let O = b(S) / r * 100;
  for (; O > s.max && x.length > 1; )
    x.pop(), S = x.join(" "), O = b(S) / r * 100;
  O < s.min && console.warn(`[\uC820\uC2A4] \uC694\uC57D\uC728 ${O.toFixed(1)}%\uAC00 \uBAA9\uD45C \uCD5C\uC18C\uCE58 ${s.min}% \uBBF8\uB9CC\uC785\uB2C8\uB2E4.`);
  const R = x.join(" ").replace(/[0-9]/g, " ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ").split(/\s+/).map((T) => T.trim()).filter((T) => T.length >= 2 && T.length <= 6), I = /* @__PURE__ */ new Map();
  for (const T of R)
    I.set(T, (I.get(T) || 0) + 1);
  const H = [...I.entries()].sort((T, _) => _[1] - T[1]).slice(0, 12).map(([T]) => T), z = { keywords: H, nodes: H.map((T, _) => ({ id: `k${_}`, label: T })), edges: [] };
  return { summary: S, mindmap: z, meta: { ratio: O, target: s } };
}
__name(gr, "gr");
__name2(gr, "gr");
function tt(t, e, n) {
  const r = dr(t);
  let s = Ut(r);
  s = ur(s);
  const i = e === "brief" ? Fe(Math.round(s.length * 0.15), 2, 4) : e === "standard" ? Fe(Math.round(s.length * 0.3), 5, 9) : Fe(Math.round(s.length * 0.55), 10, 18);
  let a = fr(s, i);
  if (e === "detail") {
    const l = ["\uC131\uBCC4", "\uD559\uB144", "\uB0A8\uD559\uC0DD", "\uC5EC\uD559\uC0DD", "\uCD08\uB4F1", "\uC911\uD559", "\uACE0\uD559\uB144", "\uC800\uD559\uB144", "\uBCC0\uC778", "\uCC28\uC774", "\uBE44\uAD50"], d = s.filter((h) => l.some((x) => h.includes(x)) && !a.includes(h)).slice(0, 5);
    d.length > 0 && (a = [...a, ...d]);
  }
  const o = st(r);
  if (n === "narrative") {
    let l, d = null, h = null;
    {
      const x = gr(a, e, o);
      l = x.summary, d = x.mindmap, h = x.meta;
    }
    return l = mr(l), { kind: "summary", mode: e, viewType: n, narrative: l, ...d && { mindmapKeywords: d }, ...h && { meta: { ...h, inputNormalized: true, originalLen: o } } };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((l, d) => `- (${d + 1}) ${l}`) } };
  if (n === "mindmap") {
    const l = (a[0] || s[0] || "\uD575\uC2EC").slice(0, 40), d = [{ id: "c", label: l, level: 0 }], h = [];
    return a.slice(1).forEach((x, b) => {
      const S = `n${b + 1}`;
      d.push({ id: S, label: x.slice(0, 60), level: 1 }), h.push({ from: "c", to: S });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: l, nodes: d, edges: h } };
  }
  const c = a.map((l, d) => ({ id: `q${d + 1}`, type: "short", question: `(${d + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${l.slice(0, 70)}"`, answerHint: l }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: c } };
}
__name(tt, "tt");
__name2(tt, "tt");
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
__name2(Jt, "Jt");
function xr(t, e, n, r) {
  const s = Jt(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(xr, "xr");
__name2(xr, "xr");
function vr(t, e, n, r, s) {
  const i = Jt(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(vr, "vr");
__name2(vr, "vr");
async function br(t) {
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
__name(br, "br");
__name2(br, "br");
async function vt(t, e) {
  const n = Date.now(), r = Ge.get(e);
  if (r && n - r.createdAt < Vn)
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
__name(vt, "vt");
__name2(vt, "vt");
async function Ne(t, e, n, r) {
  const s = Date.now();
  Ge.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Gt()).run();
}
__name(Ne, "Ne");
__name2(Ne, "Ne");
function yr(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(yr, "yr");
__name2(yr, "yr");
function wr(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(wr, "wr");
__name2(wr, "wr");
function Er(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(Er, "Er");
__name2(Er, "Er");
async function Sr(t, e) {
  var c, l, d, h, x;
  const n = P(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = P(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const b = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (b.ok) {
      const O = await b.json();
      return { ok: true, text: ((x = (h = (d = (l = (c = O == null ? void 0 : O.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : d.parts) == null ? void 0 : h[0]) == null ? void 0 : x.text) ?? "", raw: O };
    }
    if (b.status === 429 || b.status === 503) {
      await new Promise((O) => setTimeout(O, o)), o *= 2;
      continue;
    }
    const S = await b.text().catch(() => "");
    throw new Error(`Gemini error ${b.status}: ${S.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
async function Tr(t, e, n) {
  var l, d, h, x, b;
  const r = P(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = P(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const S = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (S.ok) {
      const A = await S.json();
      return ((b = (x = (h = (d = (l = A == null ? void 0 : A.candidates) == null ? void 0 : l[0]) == null ? void 0 : d.content) == null ? void 0 : h.parts) == null ? void 0 : x[0]) == null ? void 0 : b.text) ?? "";
    }
    if (S.status === 429 || S.status === 503) {
      await new Promise((A) => setTimeout(A, c)), c *= 2;
      continue;
    }
    const O = await S.text().catch(() => "");
    throw new Error(`Gemini error ${S.status}: ${O.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Tr, "Tr");
__name2(Tr, "Tr");
async function Vt(t, e) {
  const n = await Sr(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
var Ar = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(f) {
    return (f || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(f, m) {
    const v = Math.max(200, i(f || "").length), y = e[m] || e.standard, p = Math.floor(v * y.min), N = Math.ceil(v * y.max);
    return { base: v, min: Math.max(80, p), max: Math.max(120, N) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(f) {
    const m = (f || "").trim();
    return m ? m.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((v) => v.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function c(f) {
    return o(f).map((g, v) => ({ sid: `S${v + 1}`, text: g }));
  }
  __name(c, "c");
  __name2(c, "c");
  function l(f, m, g) {
    const v = f.find((y) => y.sid === m);
    return !v || !g || typeof g != "string" ? false : v.text.includes(g.trim());
  }
  __name(l, "l");
  __name2(l, "l");
  function d() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(d, "d");
  __name2(d, "d");
  function h({ originalText: f, mode: m, format: g }) {
    const v = a(f, m), y = Xn(f), p = g === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : g === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${m} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${g} (${p})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${v.min}\uC790 ~ \uCD5C\uB300 ${v.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", y].join(`
`);
  }
  __name(h, "h");
  __name2(h, "h");
  function x({ summaryText: f, format: m }) {
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
}`, "", "[SUMMARY]", f].join(`
`);
  }
  __name(x, "x");
  __name2(x, "x");
  function b({ mode: f, purpose: m, format: g, summaryText: v, sentTable: y, anchors: p }) {
    const N = n[f] || 10, q = m === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", V = g === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : g === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${f} (\uBB38\uD56D\uC218 ${N})`, `- \uBAA9\uC801: ${m} (${q})`, `- \uC694\uC57D \uD615\uC2DD: ${g} (${V})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
  function S(f, m) {
    const g = m && m.anchors ? m.anchors : [], v = [], y = [];
    for (const p of g) {
      const N = p == null ? void 0 : p.sid, q = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        y.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(f, N, q)) {
        y.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      v.push(p);
    }
    return { ok: v, bad: y };
  }
  __name(S, "S");
  __name2(S, "S");
  function O(f, m) {
    const g = m && Array.isArray(m.items) ? m.items : [], v = [], y = [];
    for (const p of g) {
      const N = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(N != null && N.sid) || !(N != null && N.quote)) {
        y.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(f, N.sid, N.quote)) {
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
  function A({ summaryText: f, sentTable: m, anchors: g, badItems: v, mode: y, purpose: p, format: N }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${v.length}`, `- \uBAA8\uB4DC: ${y}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${N}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(m, null, 2), "", "[ANCHORS]", JSON.stringify(g, null, 2), "", "[BAD ITEMS]", JSON.stringify(v, null, 2), "", "[SUMMARY]", f].join(`
`);
  }
  __name(A, "A");
  __name2(A, "A");
  async function R({ llmCall: f, originalText: m, mode: g, format: v }) {
    if (!f)
      throw new Error("llmCall is required");
    e[g] || (g = "standard"), r.includes(v) || (v = "narrative");
    const y = h({ originalText: m, mode: g, format: v }), p = (await f({ system: d(), user: y, json: false }) || "").trim() || "", N = c(p), q = x({ summaryText: p, format: v });
    let V = await f({ system: d(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(V);
    } catch {
      Y = { anchors: [] };
    }
    const { ok: j } = S(N, Y), De = j.length >= 4 ? j : I(N);
    return { summaryText: p, sentTable: N, anchors: De };
  }
  __name(R, "R");
  __name2(R, "R");
  function I(f) {
    const m = [];
    for (let g = 0; g < Math.min(8, f.length); g++) {
      const v = f[g], y = (v.text || "").slice(0, 18);
      m.push({ id: `A${g + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${g + 1}`, type: "claim", sid: v.sid, quote: y, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return m;
  }
  __name(I, "I");
  __name2(I, "I");
  async function H({ llmCall: f, mode: m, purpose: g, format: v, summaryText: y, sentTable: p, anchors: N }) {
    e[m] || (m = "standard"), s.includes(g) || (g = "preview"), r.includes(v) || (v = "narrative");
    const q = b({ mode: m, purpose: g, format: v, summaryText: y, sentTable: p, anchors: N });
    let V = await f({ system: d(), user: q, json: true }), Y;
    try {
      Y = JSON.parse(V);
    } catch {
      Y = { items: [] };
    }
    let { ok: j, bad: De } = O(p, Y);
    if (De.length > 0) {
      const Ce = A({ summaryText: y, sentTable: p, anchors: N, badItems: De.map((Zt) => Zt.q), mode: m, purpose: g, format: v });
      let Xt = await f({ system: d(), user: Ce, json: true }), Xe;
      try {
        Xe = JSON.parse(Xt);
      } catch {
        Xe = { items: [] };
      }
      const Wt = O(p, Xe);
      j = j.concat(Wt.ok);
      const Qt = n[m] || 10;
      j = j.slice(0, Qt);
    } else {
      const Ce = n[m] || 10;
      j = j.slice(0, Ce);
    }
    const Ye = n[m] || 10;
    if (j.length < Ye) {
      const Ce = z({ sentTable: p, anchors: N, count: Ye - j.length, format: v, purpose: g });
      j = j.concat(Ce).slice(0, Ye);
    }
    return { items: j };
  }
  __name(H, "H");
  __name2(H, "H");
  function z({ sentTable: f, anchors: m, count: g, format: v, purpose: y }) {
    const p = [], N = m.slice(0, Math.max(g, 1));
    for (let q = 0; q < g; q++) {
      const V = N[q % N.length], Y = V.sid, j = V.quote;
      p.push({ id: `QF${q + 1}`, type: "short", question: y === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${j}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${j}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: Y, quote: j }, anchorIds: [V.id] });
    }
    return p;
  }
  __name(z, "z");
  __name2(z, "z");
  class T {
    constructor(m, { passScore: g = 90 } = {}) {
      this.items = Array.isArray(m) ? m : [], this.passScore = g, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(m, g) {
      if (!m)
        return { ok: false, reason: "no item" };
      const v = m.type;
      if (v === "mcq" || v === "blank" || v === "match" || v === "order" || v === "label" || v === "short") {
        if (v === "short")
          return { ok: true, reason: "short-auto-pass" };
        const y = (m.answer || "").trim(), p = (g || "").trim();
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
    submit(m) {
      if (this.state.finished)
        return { done: true, message: "already finished" };
      const g = this.currentItem();
      if (this.gradeAnswer(g, m).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(g.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${g.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${g.evidence.quote}'`, score: this.getScore() };
      {
        const y = g.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: y, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const g = this.items.filter((v) => this.state.wrongIds.has(v.id));
          this.items = g.length > 0 ? g : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(T, "T");
  __name2(T, "T");
  async function _({ llmCall: f, originalText: m, mode: g, format: v, purpose: y }) {
    const p = await R({ llmCall: f, originalText: m, mode: g, format: v }), N = await H({ llmCall: f, mode: g, purpose: y, format: v, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: g, format: v, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: y, passScore: 90, items: N.items } };
  }
  __name(_, "_");
  __name2(_, "_");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: R, generateSelfTest: H, runPipeline: _, MasteryRunner: T };
})();
var Cr = `/* MindStory Engine Bundle (compat) */
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
J.get("/ms-engine-bundle.js", (t) => t.text(Cr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
J.use("/api/*", Dn());
J.get("/favicon.ico", (t) => t.body(null, 204));
J.use("/static/*", Jn({ root: "./public" }));
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
            <div class="meta">\uC544\uC9C1 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC624\uB978\uCABD \uC0C1\uB2E8 \uC0C1\uD0DC\uAC00 &apos;OK&apos;\uC778\uC9C0 \uD655\uC778 \uD6C4 \uC694\uC57D\uC744 \uC2E4\uD589\uD558\uC138\uC694.</div>
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
            out.innerHTML = "<div class='meta'>\uC544\uC9C1 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC624\uB978\uCABD \uC0C1\uB2E8 \uC0C1\uD0DC\uAC00 'OK'\uC778\uC9C0 \uD655\uC778 \uD6C4 \uC694\uC57D\uC744 \uC2E4\uD589\uD558\uC138\uC694.</div>";
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
  const e = !!P(t.env.GEMINI_API_KEY).trim(), n = P(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Gt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
J.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = P((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = Ft((n == null ? void 0 : n.mode) || "standard"), i = Kt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = P((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!P(t.env.GEMINI_API_KEY).trim(), c = P(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name2(async ({ system: d, user: h, json: x }) => {
    if (x) {
      const b = `${d}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Vt(t.env, b);
    } else
      return (await Tr(t.env, d, h) || "").toString();
  }, "l");
  try {
    const d = await Ar.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: d, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (d) {
    return console.error("[GENS Engine Error]", d), t.json({ ok: false, error: { code: "GENS_ERROR", message: d.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: d.stack } }, 500);
  }
});
J.post("/api/engine", async (t) => {
  var _;
  const e = Date.now(), n = t.env.DB;
  await br(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = tr(r == null ? void 0 : r.kind), i = P((r == null ? void 0 : r.text) || ""), a = Ft((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = Kt((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = P(((_ = r == null ? void 0 : r.options) == null ? void 0 : _.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = er(i), d = l.text, h = l.sentences;
  console.log("[Sanitize] Original length:", i.length, "\u2192 Cleaned:", d.length), console.log("[Sanitize] Sentences extracted:", h.length);
  const x = vr(s, a, o, d, c || null), b = await vt(n, x);
  if (b.hit)
    return t.json({ ok: true, data: b.data, meta: { cached: true, cacheStore: b.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const S = xr(s, a, d, c || null), O = await vt(n, S);
  if (O.hit && O.data) {
    let f;
    if (O.data.allSummaries && O.data.allSummaries[a] ? f = O.data.allSummaries[a] : O.data.narrative ? f = O.data.narrative : console.warn("[Cache] Base cache has no narrative, skipping"), f) {
      let m;
      return o === "narrative" ? m = { kind: s, mode: a, viewType: o, narrative: f } : o === "structured" ? m = { kind: s, mode: a, ...yr(f) } : o === "mindmap" ? m = { kind: s, mode: a, ...wr(f) } : m = { kind: s, mode: a, ...Er(f) }, await Ne(n, x, c || "anon", m), t.json({ ok: true, data: m, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
    }
  }
  const A = !!P(t.env.GEMINI_API_KEY).trim(), R = P(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && A && !R)
    try {
      const f = await lr(t.env, d), m = nr(a), g = rr(o);
      let v;
      if (g === "structured")
        v = { kind: s, mode: a, viewType: o, ...f.structured[m] };
      else if (g === "mindmap")
        v = { kind: s, mode: a, viewType: o, ...f.mindmap[m] };
      else if (g === "selftest")
        v = { kind: s, mode: a, viewType: o, ...f.selftest[m] };
      else {
        const N = f.narrative[m];
        v = { kind: s, mode: a, viewType: o, title: N.title, narrative: N.summary, keyPoints: N.keyPoints, examHints: N.examHints };
      }
      const y = f.narrative[m], p = { kind: s, mode: a, viewType: "narrative", narrative: y.summary, allSummaries: { brief: f.narrative.brief.summary, standard: f.narrative.standard.summary, detail: f.narrative.detail.summary }, meta: { engine: "v4", hierarchy: "brief \u2282 standard \u2282 detail (server-downsample)", structuredFirst: true } };
      return await Ne(n, S, c || "anon", p), await Ne(n, x, c || "anon", v), t.json({ ok: true, data: v, meta: { cached: false, engine: "gemini-v4-structured-first", elapsedMs: Date.now() - e, hierarchy: "brief \u2282 standard \u2282 detail (guaranteed)" } }, 200);
    } catch (f) {
      console.error("[Gemini V4 Error]", f);
    }
  const I = tt(d, "brief", o), H = tt(d, "standard", o), z = tt(d, "detail", o), T = a === "brief" ? I : a === "standard" ? H : z;
  if (await Ne(n, x, c || "anon", T), I.narrative && H.narrative && z.narrative) {
    const f = { kind: "summary", mode: a, viewType: "narrative", narrative: T.narrative, allSummaries: { brief: I.narrative, standard: H.narrative, detail: z.narrative } };
    await Ne(n, S, c || "anon", f);
  }
  return t.json({ ok: true, data: T, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
J.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
J.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var bt = new qt();
var Or = Object.assign({ "/src/index.tsx": J });
var Yt = false;
for (const [, t] of Object.entries(Or))
  t && (bt.route("/", t), bt.notFound(t.notFoundHandler), Yt = true);
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
var middleware_insertion_facade_default = bt;
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

// .wrangler/tmp/pages-StEziY/vbks834k03k.js
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

// .wrangler/tmp/bundle-LM7nOk/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-LM7nOk/middleware-loader.entry.ts
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
//# sourceMappingURL=vbks834k03k.js.map
