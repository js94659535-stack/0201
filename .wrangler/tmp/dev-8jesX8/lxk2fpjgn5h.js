var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-In1c3c/checked-fetch.js
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

// .wrangler/tmp/bundle-In1c3c/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-7YmSIs/bundledWorker-0.6240136008244961.mjs
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
var cn = Object.defineProperty;
var at = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "at");
var ln = /* @__PURE__ */ __name2((t, e, n) => e in t ? cn(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "ln");
var S = /* @__PURE__ */ __name2((t, e, n) => ln(t, typeof e != "symbol" ? e + "" : e, n), "S");
var Qe = /* @__PURE__ */ __name2((t, e, n) => e.has(t) || at("Cannot " + n), "Qe");
var d = /* @__PURE__ */ __name2((t, e, n) => (Qe(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var A = /* @__PURE__ */ __name2((t, e, n) => e.has(t) ? at("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "A");
var w = /* @__PURE__ */ __name2((t, e, n, r) => (Qe(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "w");
var N = /* @__PURE__ */ __name2((t, e, n) => (Qe(t, e, "access private method"), n), "N");
var ot = /* @__PURE__ */ __name2((t, e, n, r) => ({ set _(s) {
  w(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "ot");
var ct = /* @__PURE__ */ __name2((t, e, n) => (r, s) => {
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
      } catch (m) {
        if (m instanceof Error && e)
          r.error = m, c = await e(m, r), l = true;
        else
          throw m;
      }
    else
      r.finalized === false && n && (c = await n(r));
    return c && (r.finalized === false || l) && (r.res = c), r;
  }
  __name(a, "a");
  __name2(a, "a");
}, "ct");
var dn = Symbol();
var un = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, i = (t instanceof jt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? hn(t, { all: n, dot: r }) : {};
}, "un");
async function hn(t, e) {
  const n = await t.formData();
  return n ? pn(n, e) : {};
}
__name(hn, "hn");
__name2(hn, "hn");
function pn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? fn(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (mn(n, r, s), delete n[r]);
  }), n;
}
__name(pn, "pn");
__name2(pn, "pn");
var fn = /* @__PURE__ */ __name2((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "fn");
var mn = /* @__PURE__ */ __name2((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? r[i] = n : ((!r[i] || typeof r[i] != "object" || Array.isArray(r[i]) || r[i] instanceof File) && (r[i] = /* @__PURE__ */ Object.create(null)), r = r[i]);
  });
}, "mn");
var kt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "kt");
var gn = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: n } = xn(t), r = kt(n);
  return vn(r, e);
}, "gn");
var xn = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "xn");
var vn = /* @__PURE__ */ __name2((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "vn");
var He = {};
var yn = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return He[r] || (n[2] ? He[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : He[r] = [t, n[1], true]), He[r];
  }
  return null;
}, "yn");
var st = /* @__PURE__ */ __name2((t, e) => {
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
}, "st");
var bn = /* @__PURE__ */ __name2((t) => st(t, decodeURI), "bn");
var Rt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const i = e.indexOf("?", r), a = e.slice(n, i === -1 ? void 0 : i);
      return bn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "Rt");
var wn = /* @__PURE__ */ __name2((t) => {
  const e = Rt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "wn");
var ve = /* @__PURE__ */ __name2((t, e, ...n) => (n.length && (e = ve(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "ve");
var Mt = /* @__PURE__ */ __name2((t) => {
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
}, "Mt");
var Ze = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? st(t, $t) : t) : t, "Ze");
var It = /* @__PURE__ */ __name2((t, e, n) => {
  let r;
  if (!n && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const c = a + e.length + 2, l = t.indexOf("&", c);
        return Ze(t.slice(c, l === -1 ? void 0 : l));
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
    if (r && (c = Ze(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), r && (l = Ze(l))), n ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return e ? s[e] : s;
}, "It");
var En = It;
var Sn = /* @__PURE__ */ __name2((t, e) => It(t, e, true), "Sn");
var $t = decodeURIComponent;
var lt = /* @__PURE__ */ __name2((t) => st(t, $t), "lt");
var we;
var F;
var Z;
var Pt;
var Dt;
var rt;
var ne;
var Tt;
var jt = (Tt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", n = [[]]) {
    A(this, Z);
    S(this, "raw");
    A(this, we);
    A(this, F);
    S(this, "routeIndex", 0);
    S(this, "path");
    S(this, "bodyCache", {});
    A(this, ne, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, w(this, F, n), w(this, we, {});
  }
  param(t) {
    return t ? N(this, Z, Pt).call(this, t) : N(this, Z, Dt).call(this);
  }
  query(t) {
    return En(this.url, t);
  }
  queries(t) {
    return Sn(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await un(this, t));
  }
  json() {
    return d(this, ne).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, ne).call(this, "text");
  }
  arrayBuffer() {
    return d(this, ne).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, ne).call(this, "blob");
  }
  formData() {
    return d(this, ne).call(this, "formData");
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
  get [dn]() {
    return d(this, F);
  }
  get matchedRoutes() {
    return d(this, F)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, F)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "Tt"), we = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), Pt = /* @__PURE__ */ __name2(function(t) {
  const e = d(this, F)[0][this.routeIndex][1][t], n = N(this, Z, rt).call(this, e);
  return n && /\%/.test(n) ? lt(n) : n;
}, "Pt"), Dt = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(d(this, F)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = N(this, Z, rt).call(this, d(this, F)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? lt(r) : r);
  }
  return t;
}, "Dt"), rt = /* @__PURE__ */ __name2(function(t) {
  return d(this, F)[1] ? d(this, F)[1][t] : t;
}, "rt"), ne = /* @__PURE__ */ new WeakMap(), Tt);
var Tn = { Stringify: 1 };
var Bt = /* @__PURE__ */ __name2(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Bt(c, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Bt");
var An = "text/plain; charset=UTF-8";
var et = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "et");
var Ie;
var $e;
var Y;
var Ee;
var X;
var H;
var je;
var Se;
var Te;
var ue;
var Pe;
var De;
var re;
var ye;
var At;
var Cn = (At = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    A(this, re);
    A(this, Ie);
    A(this, $e);
    S(this, "env", {});
    A(this, Y);
    S(this, "finalized", false);
    S(this, "error");
    A(this, Ee);
    A(this, X);
    A(this, H);
    A(this, je);
    A(this, Se);
    A(this, Te);
    A(this, ue);
    A(this, Pe);
    A(this, De);
    S(this, "render", (...t2) => (d(this, Se) ?? w(this, Se, (e2) => this.html(e2)), d(this, Se).call(this, ...t2)));
    S(this, "setLayout", (t2) => w(this, je, t2));
    S(this, "getLayout", () => d(this, je));
    S(this, "setRenderer", (t2) => {
      w(this, Se, t2);
    });
    S(this, "header", (t2, e2, n) => {
      this.finalized && w(this, H, new Response(d(this, H).body, d(this, H)));
      const r = d(this, H) ? d(this, H).headers : d(this, ue) ?? w(this, ue, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    S(this, "status", (t2) => {
      w(this, Ee, t2);
    });
    S(this, "set", (t2, e2) => {
      d(this, Y) ?? w(this, Y, /* @__PURE__ */ new Map()), d(this, Y).set(t2, e2);
    });
    S(this, "get", (t2) => d(this, Y) ? d(this, Y).get(t2) : void 0);
    S(this, "newResponse", (...t2) => N(this, re, ye).call(this, ...t2));
    S(this, "body", (t2, e2, n) => N(this, re, ye).call(this, t2, e2, n));
    S(this, "text", (t2, e2, n) => !d(this, ue) && !d(this, Ee) && !e2 && !n && !this.finalized ? new Response(t2) : N(this, re, ye).call(this, t2, e2, et(An, n)));
    S(this, "json", (t2, e2, n) => N(this, re, ye).call(this, JSON.stringify(t2), e2, et("application/json", n)));
    S(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name2((s) => N(this, re, ye).call(this, s, e2, et("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? Bt(t2, Tn.Stringify, false, {}).then(r) : r(t2);
    });
    S(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    S(this, "notFound", () => (d(this, Te) ?? w(this, Te, () => new Response()), d(this, Te).call(this, this)));
    w(this, Ie, t), e && (w(this, X, e.executionCtx), this.env = e.env, w(this, Te, e.notFoundHandler), w(this, De, e.path), w(this, Pe, e.matchResult));
  }
  get req() {
    return d(this, $e) ?? w(this, $e, new jt(d(this, Ie), d(this, De), d(this, Pe))), d(this, $e);
  }
  get event() {
    if (d(this, X) && "respondWith" in d(this, X))
      return d(this, X);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, X))
      return d(this, X);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, H) || w(this, H, new Response(null, { headers: d(this, ue) ?? w(this, ue, new Headers()) }));
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
    w(this, H, t), this.finalized = true;
  }
  get var() {
    return d(this, Y) ? Object.fromEntries(d(this, Y)) : {};
  }
}, "At"), Ie = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet(), ye = /* @__PURE__ */ __name2(function(t, e, n) {
  const r = d(this, H) ? new Headers(d(this, H).headers) : d(this, ue) ?? new Headers();
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, Ee);
  return new Response(t, { status: s, headers: r });
}, "ye"), At);
var I = "ALL";
var On = "all";
var _n = ["get", "post", "put", "delete", "options", "patch"];
var Lt = "Can not add a route since the matcher is already built.";
var Ht = /* @__PURE__ */ __name2(class extends Error {
}, "Ht");
var Nn = "__COMPOSED_HANDLER";
var kn = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "kn");
var dt = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "dt");
var G;
var $;
var qt;
var U;
var le;
var ze;
var Fe;
var Ae;
var Rn = (Ae = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    A(this, $);
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
    A(this, G, "/");
    S(this, "routes", []);
    A(this, U, kn);
    S(this, "errorHandler", dt);
    S(this, "onError", (e2) => (this.errorHandler = e2, this));
    S(this, "notFound", (e2) => (w(this, U, e2), this));
    S(this, "fetch", (e2, ...n) => N(this, $, Fe).call(this, e2, n[1], n[0], e2.method));
    S(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${ve("/", e2)}`, n), r2, s2)));
    S(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(N(this, $, Fe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [..._n, On].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? w(this, G, a) : N(this, $, le).call(this, i, d(this, G), a), o.forEach((c) => {
        N(this, $, le).call(this, i, d(this, G), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        w(this, G, c);
        for (const l of [i].flat())
          o.map((u) => {
            N(this, $, le).call(this, l.toUpperCase(), d(this, G), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, G, i) : (w(this, G, "*"), a.unshift(i)), a.forEach((o) => {
      N(this, $, le).call(this, I, d(this, G), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? Rt : wn;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var a;
      let i;
      n.errorHandler === dt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, c) => (await ct([], n.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[Nn] = s.handler), N(a = r, $, le).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const n = N(this, $, qt).call(this);
    return n._basePath = ve(this._basePath, e), n;
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
      const c = ve(this._basePath, e), l = c === "/" ? 0 : c.length;
      return (u) => {
        const m = new URL(u.url);
        return m.pathname = m.pathname.slice(l) || "/", new Request(m, u);
      };
    })());
    const o = /* @__PURE__ */ __name2(async (c, l) => {
      const u = await n(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return N(this, $, le).call(this, I, ve(e, "*"), o), this;
  }
}, "Ae"), G = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), qt = /* @__PURE__ */ __name2(function() {
  const e = new Ae({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, w(e, U, d(this, U)), e.routes = this.routes, e;
}, "qt"), U = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ __name2(function(e, n, r) {
  e = e.toUpperCase(), n = ve(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "le"), ze = /* @__PURE__ */ __name2(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "ze"), Fe = /* @__PURE__ */ __name2(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await N(this, $, Fe).call(this, e, n, r, "GET")))();
  const i = this.getPath(e, { env: r }), a = this.router.match(s, i), o = new Cn(e, { path: i, matchResult: a, env: r, executionCtx: n, notFoundHandler: d(this, U) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, U).call(this, o);
      });
    } catch (u) {
      return N(this, $, ze).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, U).call(this, o))).catch((u) => N(this, $, ze).call(this, u, o)) : l ?? d(this, U).call(this, o);
  }
  const c = ct(a[0], this.errorHandler, d(this, U));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return N(this, $, ze).call(this, l, o);
    }
  })();
}, "Fe"), Ae);
var zt = [];
function Mn(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name2((s, i) => {
    const a = n[s] || n[I], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], zt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "r");
  return this.match = r, r(t, e);
}
__name(Mn, "Mn");
__name2(Mn, "Mn");
var Ke = "[^/]+";
var Re = ".*";
var Me = "(?:|/.*)";
var be = Symbol();
var In = new Set(".\\+*[^]$()");
function $n(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Re || t === Me ? 1 : e === Re || e === Me ? -1 : t === Ke ? 1 : e === Ke ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name($n, "$n");
__name2($n, "$n");
var he;
var pe;
var K;
var ge;
var jn = (ge = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, he);
    A(this, pe);
    A(this, K, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, i) {
    if (e.length === 0) {
      if (d(this, he) !== void 0)
        throw be;
      if (i)
        return;
      w(this, he, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", Re] : ["", "", Ke] : a === "/*" ? ["", "", Me] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let m = c[2] || Ke;
      if (u && c[2] && (m === ".*" || (m = m.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(m))))
        throw be;
      if (l = d(this, K)[m], !l) {
        if (Object.keys(d(this, K)).some((x) => x !== Re && x !== Me))
          throw be;
        if (i)
          return;
        l = d(this, K)[m] = new ge(), u !== "" && w(l, pe, s.varIndex++);
      }
      !i && u !== "" && r.push([u, d(l, pe)]);
    } else if (l = d(this, K)[a], !l) {
      if (Object.keys(d(this, K)).some((u) => u.length > 1 && u !== Re && u !== Me))
        throw be;
      if (i)
        return;
      l = d(this, K)[a] = new ge();
    }
    l.insert(o, n, r, s, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, K)).sort($n).map((r) => {
      const s = d(this, K)[r];
      return (typeof d(s, pe) == "number" ? `(${r})@${d(s, pe)}` : In.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, he) == "number" && n.unshift(`#${d(this, he)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "ge"), he = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ge);
var Je;
var Be;
var Ct;
var Pn = (Ct = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, Je, { varIndex: 0 });
    A(this, Be, new jn());
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
    return d(this, Be).insert(i, e, r, d(this, Je), n), r;
  }
  buildRegExp() {
    let t = d(this, Be).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (r[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "Ct"), Je = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), Ct);
var Dn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ge = /* @__PURE__ */ Object.create(null);
function Ft(t) {
  return Ge[t] ?? (Ge[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Ft, "Ft");
__name2(Ft, "Ft");
function Bn() {
  Ge = /* @__PURE__ */ Object.create(null);
}
__name(Bn, "Bn");
__name2(Bn, "Bn");
function Ln(t) {
  var l;
  const e = new Pn(), n = [];
  if (t.length === 0)
    return Dn;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, m], [x, y]) => u ? 1 : x ? -1 : m.length - y.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, m = -1, x = r.length; u < x; u++) {
    const [y, C, _] = r[u];
    y ? s[C] = [_.map(([k]) => [k, /* @__PURE__ */ Object.create(null)]), zt] : m++;
    let T;
    try {
      T = e.insert(C, m, y);
    } catch (k) {
      throw k === be ? new Ht(C) : k;
    }
    y || (n[m] = _.map(([k, q]) => {
      const B = /* @__PURE__ */ Object.create(null);
      for (q -= 1; q >= 0; q--) {
        const [z, M] = T[q];
        B[z] = M;
      }
      return [k, B];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, m = n.length; u < m; u++)
    for (let x = 0, y = n[u].length; x < y; x++) {
      const C = (l = n[u][x]) == null ? void 0 : l[1];
      if (!C)
        continue;
      const _ = Object.keys(C);
      for (let T = 0, k = _.length; T < k; T++)
        C[_[T]] = o[C[_[T]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, s];
}
__name(Ln, "Ln");
__name2(Ln, "Ln");
function xe(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (Ft(n).test(e))
        return [...t[n]];
  }
}
__name(xe, "xe");
__name2(xe, "xe");
var se;
var ie;
var Ve;
var Gt;
var Ot;
var Hn = (Ot = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, Ve);
    S(this, "name", "RegExpRouter");
    A(this, se);
    A(this, ie);
    S(this, "match", Mn);
    w(this, se, { [I]: /* @__PURE__ */ Object.create(null) }), w(this, ie, { [I]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, se), s = d(this, ie);
    if (!r || !s)
      throw new Error(Lt);
    r[t] || [r, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[I]).forEach((l) => {
        c[t][l] = [...c[I][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Ft(e);
      t === I ? Object.keys(r).forEach((l) => {
        var u;
        (u = r[l])[e] || (u[e] = xe(r[l], e) || xe(r[I], e) || []);
      }) : (o = r[t])[e] || (o[e] = xe(r[t], e) || xe(r[I], e) || []), Object.keys(r).forEach((l) => {
        (t === I || t === l) && Object.keys(r[l]).forEach((u) => {
          c.test(u) && r[l][u].push([n, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (t === I || t === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([n, i]));
      });
      return;
    }
    const a = Mt(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((m) => {
        var x;
        (t === I || t === m) && ((x = s[m])[u] || (x[u] = [...xe(r[m], u) || xe(r[I], u) || []]), s[m][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, ie)).concat(Object.keys(d(this, se))).forEach((e) => {
      t[e] || (t[e] = N(this, Ve, Gt).call(this, e));
    }), w(this, se, w(this, ie, void 0)), Bn(), t;
  }
}, "Ot"), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakSet(), Gt = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let n = t === I;
  return [d(this, se), d(this, ie)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((i) => [i, r[t][i]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== I && e.push(...Object.keys(r[I]).map((i) => [i, r[I][i]]));
  }), n ? Ln(e) : null;
}, "Gt"), Ot);
var ae;
var W;
var _t;
var qn = (_t = /* @__PURE__ */ __name2(class {
  constructor(t) {
    S(this, "name", "SmartRouter");
    A(this, ae, []);
    A(this, W, []);
    w(this, ae, t.routers);
  }
  add(t, e, n) {
    if (!d(this, W))
      throw new Error(Lt);
    d(this, W).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, W))
      throw new Error("Fatal error");
    const n = d(this, ae), r = d(this, W), s = n.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = r.length; c < l; c++)
          o.add(...r[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof Ht)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), w(this, ae, [o]), w(this, W, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, W) || d(this, ae).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ae)[0];
  }
}, "_t"), ae = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), _t);
var Ne = /* @__PURE__ */ Object.create(null);
var oe;
var L;
var fe;
var Ce;
var D;
var Q;
var de;
var Oe;
var zn = (Oe = /* @__PURE__ */ __name2(class {
  constructor(e, n, r) {
    A(this, Q);
    A(this, oe);
    A(this, L);
    A(this, fe);
    A(this, Ce, 0);
    A(this, D, Ne);
    if (w(this, L, r || /* @__PURE__ */ Object.create(null)), w(this, oe, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, w(this, oe, [s]);
    }
    w(this, fe, []);
  }
  insert(e, n, r) {
    w(this, Ce, ++ot(this, Ce)._);
    let s = this;
    const i = gn(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], m = yn(l, u), x = Array.isArray(m) ? m[0] : l;
      if (x in d(s, L)) {
        s = d(s, L)[x], m && a.push(m[1]);
        continue;
      }
      d(s, L)[x] = new Oe(), m && (d(s, fe).push(m), a.push(m[1])), s = d(s, L)[x];
    }
    return d(s, oe).push({ [e]: { handler: r, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, Ce) } }), s;
  }
  search(e, n) {
    var c;
    const r = [];
    w(this, D, Ne);
    let i = [this];
    const a = kt(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const m = a[l], x = l === u - 1, y = [];
      for (let C = 0, _ = i.length; C < _; C++) {
        const T = i[C], k = d(T, L)[m];
        k && (w(k, D, d(T, D)), x ? (d(k, L)["*"] && r.push(...N(this, Q, de).call(this, d(k, L)["*"], e, d(T, D))), r.push(...N(this, Q, de).call(this, k, e, d(T, D)))) : y.push(k));
        for (let q = 0, B = d(T, fe).length; q < B; q++) {
          const z = d(T, fe)[q], M = d(T, D) === Ne ? {} : { ...d(T, D) };
          if (z === "*") {
            const v = d(T, L)["*"];
            v && (r.push(...N(this, Q, de).call(this, v, e, d(T, D))), w(v, D, M), y.push(v));
            continue;
          }
          const [ee, b, p] = z;
          if (!m && !(p instanceof RegExp))
            continue;
          const h = d(T, L)[ee], g = a.slice(l).join("/");
          if (p instanceof RegExp) {
            const v = p.exec(g);
            if (v) {
              if (M[b] = v[0], r.push(...N(this, Q, de).call(this, h, e, d(T, D), M)), Object.keys(d(h, L)).length) {
                w(h, D, M);
                const f = ((c = v[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[f] || (o[f] = [])).push(h);
              }
              continue;
            }
          }
          (p === true || p.test(m)) && (M[b] = m, x ? (r.push(...N(this, Q, de).call(this, h, e, M, d(T, D))), d(h, L)["*"] && r.push(...N(this, Q, de).call(this, d(h, L)["*"], e, M, d(T, D)))) : (w(h, D, M), y.push(h)));
        }
      }
      i = y.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, u) => l.score - u.score), [r.map(({ handler: l, params: u }) => [l, u])];
  }
}, "Oe"), oe = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakSet(), de = /* @__PURE__ */ __name2(function(e, n, r, s) {
  const i = [];
  for (let a = 0, o = d(e, oe).length; a < o; a++) {
    const c = d(e, oe)[a], l = c[n] || c[I], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), r !== Ne || s && s !== Ne))
      for (let m = 0, x = l.possibleKeys.length; m < x; m++) {
        const y = l.possibleKeys[m], C = u[l.score];
        l.params[y] = s != null && s[y] && !C ? s[y] : r[y] ?? (s == null ? void 0 : s[y]), u[l.score] = true;
      }
  }
  return i;
}, "de"), Oe);
var me;
var Nt;
var Fn = (Nt = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, "name", "TrieRouter");
    A(this, me);
    w(this, me, new zn());
  }
  add(t, e, n) {
    const r = Mt(e);
    if (r) {
      for (let s = 0, i = r.length; s < i; s++)
        d(this, me).insert(t, r[s], n);
      return;
    }
    d(this, me).insert(t, e, n);
  }
  match(t, e) {
    return d(this, me).search(t, e);
  }
}, "Nt"), me = /* @__PURE__ */ new WeakMap(), Nt);
var Ut = /* @__PURE__ */ __name2(class extends Rn {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new qn({ routers: [new Hn(), new Fn()] });
  }
}, "Ut");
var Gn = /* @__PURE__ */ __name2((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(m, x) {
      a.res.headers.set(m, x);
    }
    __name(c, "c");
    __name2(c, "c");
    const l = await r(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const m = await s(a.req.header("origin") || "", a);
      m.length && c("Access-Control-Allow-Methods", m.join(","));
      let x = n.allowHeaders;
      if (!(x != null && x.length)) {
        const y = a.req.header("Access-Control-Request-Headers");
        y && (x = y.split(/\s*,\s*/));
      }
      return x != null && x.length && (c("Access-Control-Allow-Headers", x.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Gn");
var Un = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ut = /* @__PURE__ */ __name2((t, e = Jn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ut");
var Kn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Jn = Kn;
var Vn = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Vn");
var Kt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Yn = Object.keys(Kt);
var Xn = "index.html";
var Wn = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Vn;
  return async (s, i) => {
    var u, m, x, y;
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
    t.isDir && await t.isDir(o) && (o = r(o, Xn));
    const c = t.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const C = t.mimes && ut(o, t.mimes) || ut(o);
      if (s.header("Content-Type", C || "application/octet-stream"), t.precompressed && (!C || Un.test(C))) {
        const _ = new Set((m = s.req.header("Accept-Encoding")) == null ? void 0 : m.split(",").map((T) => T.trim()));
        for (const T of Yn) {
          if (!_.has(T))
            continue;
          const k = await c(o + Kt[T], s);
          if (k) {
            l = k, s.header("Content-Encoding", T), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((x = t.onFound) == null ? void 0 : x.call(t, o, s)), s.body(l);
    }
    await ((y = t.onNotFound) == null ? void 0 : y.call(t, o, s)), await i();
  };
}, "Wn");
var Qn = /* @__PURE__ */ __name2(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const i = await r.get(s, { type: "stream" });
  return i || null;
}, "Qn");
var Zn = /* @__PURE__ */ __name2((t) => async function(n, r) {
  return Wn({ ...t, getContent: async (i) => Qn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "Zn");
var er = /* @__PURE__ */ __name2((t) => Zn(t), "er");
var J = new Ut();
var Ue = /* @__PURE__ */ new Map();
var tr = 1e3 * 60 * 60 * 24 * 7;
var tt = false;
function Jt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
function P(t) {
  return t == null ? "" : String(t);
}
__name(P, "P");
__name2(P, "P");
function nr(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(nr, "nr");
__name2(nr, "nr");
function Vt(t) {
  return nr(t).length;
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
function rr(t) {
  return (t || "").replace(/-\s*[ivxIVX]+-\s*/gi, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[p\.\s*\d+\]/gi, "").replace(/p\.\s*\d+/gi, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(rr, "rr");
__name2(rr, "rr");
function sr(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/\uFEFF/g, "").replace(/[\u200B-\u200D\u2060]/g, "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " "), e = e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g, `
`), e = e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g, "$1$2"), e = e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g, "$1$2"), e = e.replace(/\n{3,}/g, `

`), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/[「『]/g, '"').replace(/[」』]/g, '"'), e = e.replace(/[〈《]/g, '"').replace(/[〉》]/g, '"'), e = e.replace(/\s+([,.;:!?])/g, "$1").replace(/([,.;:!?])\s+/g, "$1 "), e.trim();
}
__name(sr, "sr");
__name2(sr, "sr");
function ht(t) {
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
__name(ht, "ht");
__name2(ht, "ht");
function ir(t) {
  const e = (t || "").trim();
  return !!(!e || e.length < 12 && !(/[.?!]$/.test(e) || /(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e)) || /[-–—]\s*\d{1,4}\s*[-–—]/.test(e) || /^["")\]\}]+$/.test(e) || /^["(\[\{]+$/.test(e) || /^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e) || /(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|전문\s*대비반|특강|홍보)/.test(e) && (/[""]/.test(e) || /!$/.test(e)) || (e.match(/["""'(){}\[\]<>]/g) || []).length >= 10 && e.length < 80);
}
__name(ir, "ir");
__name2(ir, "ir");
function ar(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  for (const r of t) {
    const s = r.trim();
    if (ir(s))
      continue;
    const i = s.replace(/\s+/g, " ");
    n.has(i) || (n.add(i), e.push(i));
  }
  return e;
}
__name(ar, "ar");
__name2(ar, "ar");
function or(t) {
  const e = sr(t), n = ar(ht(e)), r = n.length >= 3 ? n : ht(e);
  return { text: e, sentences: r };
}
__name(or, "or");
__name2(or, "or");
function Yt(t) {
  const e = P(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Yt, "Yt");
__name2(Yt, "Yt");
function Xt(t) {
  const e = P(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Xt, "Xt");
__name2(Xt, "Xt");
function cr(t) {
  const e = P(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(cr, "cr");
__name2(cr, "cr");
function lr(t) {
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
    const c = e[o], l = e[o + 1] || "", u = e[o + 2] || "";
    if (c === "(" && i++, c === ")" && (i = Math.max(0, i - 1)), (c === '"' || c === "'") && s === null ? s = c : s && c === s && (s = null), r += c, s === null && i === 0 && /[.!?]/.test(c)) {
      l === " " && (a(), o++);
      continue;
    }
    if (s === null && i === 0 && l === " ") {
      const x = r.trimEnd().slice(-1), y = /[가-힣A-Za-z0-9"'(\[]/.test(u);
      (x === "\uB2E4" || x === "\uC694" || x === "\uC8E0") && y && (a(), o++);
    }
  }
  return a(), n.length ? n : [e];
}
__name(lr, "lr");
__name2(lr, "lr");
var Ye = { narrative: { brief: 4, standard: 6, detail: 9 }, structured: { brief: 3, standard: 5, detail: 8 }, mindmap: { brief: 4, standard: 6, detail: 10 }, selftest: { brief: 3, standard: 5, detail: 8 } };
function dr(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "brief" || e === "standard" || e === "detail" ? e : e === "simple" ? "brief" : "standard";
}
__name(dr, "dr");
__name2(dr, "dr");
function ur(t) {
  const e = String(t || "").trim().toLowerCase();
  return e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" ? "mindmap" : "narrative";
}
__name(ur, "ur");
__name2(ur, "ur");
function hr(t) {
  const e = String(t || "").trim(), n = e.indexOf("{"), r = e.lastIndexOf("}");
  return n >= 0 && r > n ? e.slice(n, r + 1) : e;
}
__name(hr, "hr");
__name2(hr, "hr");
function pt(t) {
  const e = hr(t);
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
__name(pt, "pt");
__name2(pt, "pt");
function pr(t) {
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 '\uD559\uC2B5 \uB2E8\uC704' \uAE30\uC900\uC73C\uB85C \uB0B4\uC6A9\uC744 \uAD6C\uC870\uD654\uD558\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0(\uCD94\uCE21/\uACFC\uC7A5 \uAE08\uC9C0)", "- \uBB38\uC790 \uB2E8\uC21C \uC790\uB974\uAE30 \uAE08\uC9C0, \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uBA38\uB9AC\uB9D0/\uAF2C\uB9AC\uB9D0/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654\uC758 \uBF08\uB300(\uBC18\uB4DC\uC2DC \uD3EC\uD568):", "- anchor: \uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5", "- sections: \uD559\uC2B5 \uB2E8\uC704 \uC870\uBAA9\uD654, \uAC01 section\uC740 keywords/lvl25/explain \uD3EC\uD568", "- glossary: term/def\uB85C \uAD6C\uC131", "- links: anchor(A0) -> section \uC5F0\uACB0", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "anchor": "\uD575\uC2EC \uC8FC\uC7A5 1\uBB38\uC7A5",', '  "hierarchy": { "big": "\uB300\uB2E8\uC6D0", "mid": "\uC911\uB2E8\uC6D0", "small": "\uC18C\uB2E8\uC6D0", "subtitles": ["\uC18C\uC81C\uBAA9"] },', '  "sections": [', '    { "id": "S1", "title": "\uC139\uC158 \uC81C\uBAA9", "keywords": ["\uD575\uC2EC\uC5B4"], "lvl25": ["\uC758\uBBF8\uD0A4\uC6CC\uB4DC"], "explain": "1~3\uBB38\uC7A5 \uC124\uBA85" }', "  ],", '  "glossary": [ { "term": "\uC6A9\uC5B4", "def": "\uC815\uC758" } ],', '  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${Vt(t)}\uC790):`, t].join(`
`);
}
__name(pr, "pr");
__name2(pr, "pr");
function fr(t, e) {
  const n = Vt(t), r = (e == null ? void 0 : e.anchor) || "", s = ((e == null ? void 0 : e.sections) || []).map((i) => i.title).slice(0, 10);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC758 \uC2DC\uD5D8/\uC774\uD574/\uAE30\uC5B5\uC744 \uC704\uD55C \uC11C\uC220\uD615 \uC694\uC57D \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825(\uC124\uBA85\uBB38/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", '- \uC544\uB798 "\uAD6C\uC870\uD654 \uBF08\uB300"\uB97C \uBC97\uC5B4\uB098\uC9C0 \uB9D0\uACE0, \uADF8 \uB0B4\uC6A9\uC744 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC5F0\uACB0\uD574 \uC11C\uC220\uD558\uC138\uC694.', "", "\uAD6C\uC870\uD654 \uBF08\uB300:", `- anchor: ${r}`, `- sections: ${JSON.stringify(s)}`, "", "\uC694\uAD6C:", "- summary\uB294 6~10\uBB38\uC7A5(\uC0C1\uC138)", "- keyPoints 4~7\uAC1C, examHints 2~4\uAC1C", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "title": "\uC694\uC57D \uC81C\uBAA9",', '  "summary": "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5 \uC694\uC57D(6~10\uBB38\uC7A5)",', '  "keyPoints": ["\uD575\uC2EC\uD3EC\uC778\uD2B8"],', '  "examHints": ["\uC2DC\uD5D8\uD3EC\uC778\uD2B8"]', "}", "", `\uC6D0\uBB38(\uACF5\uBC31\uC81C\uC678 ${n}\uC790):`, t].join(`
`);
}
__name(fr, "fr");
__name2(fr, "fr");
function mr(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 5) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 20);
  return ["\uB2F9\uC2E0\uC740 \uD559\uC2B5\uC6A9 \uB9C8\uC778\uB4DC\uB9F5 JSON\uC744 \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uB178\uB4DC id \uC911\uBCF5/\uB204\uB77D \uAE08\uC9C0, edge \uCC38\uC870 \uC77C\uAD00", "- \uC544\uB798 \uAD6C\uC870\uD654 \uC815\uBCF4\uB97C \uADF8\uB300\uB85C \uBC14\uD0D5\uC73C\uB85C \uAD6C\uC131(\uC0C8 \uB0B4\uC6A9 \uC0DD\uC131 \uAE08\uC9C0)", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "center": { "id": "C0", "label": "\uC911\uC2EC \uC8FC\uC81C", "type": "root", "note": "\uC9E7\uC740 \uC124\uBA85" },', '  "nodes": [', '    { "id": "S1", "label": "\uC139\uC158", "type": "section", "note": "\uC124\uBA85" },', '    { "id": "T1", "label": "\uC6A9\uC5B4", "type": "term", "note": "\uC815\uC758" }', "  ],", '  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]', "}"].join(`
`);
}
__name(mr, "mr");
__name2(mr, "mr");
function gr(t) {
  const e = (t == null ? void 0 : t.anchor) || "", n = ((t == null ? void 0 : t.sections) || []).map((s) => ({ id: s.id, title: s.title, keywords: s.keywords.slice(0, 6) })), r = ((t == null ? void 0 : t.glossary) || []).slice(0, 25);
  return ["\uB2F9\uC2E0\uC740 \uCD08\xB7\uC911\xB7\uACE0 \uD559\uC0DD\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.", "\uC808\uB300 \uADDC\uCE59:", "- \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825", "- \uC6D0\uBB38/\uAD6C\uC870\uD654\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9 \uAE08\uC9C0", "- \uBB38\uD56D id\uB294 q1, q2... \uACE0\uC720", "", "\uAD6C\uC870\uD654 \uC785\uB825:", `anchor: ${e}`, `sections: ${JSON.stringify(n)}`, `glossary: ${JSON.stringify(r)}`, "", "\uC694\uAD6C(\uC0C1\uC138):", "- \uCD1D 8\uBB38\uD56D", "- type\uC740 reorder/blank/multiple_choice \uC11E\uAE30", "", "\uCD9C\uB825 \uC2A4\uD0A4\uB9C8:", "{", '  "questions": [', '    { "id": "q1", "type": "multiple_choice", "prompt": "\uC9C8\uBB38", "choices": ["a","b","c"], "answer": 1 },', '    { "id": "q2", "type": "blank", "prompt": "\uBE48\uCE78", "answer": "\uC815\uB2F5" },', '    { "id": "q3", "type": "reorder", "prompt": "\uC21C\uC11C", "choices": ["A","B","C"], "answer": [0,2,1] }', "  ]", "}"].join(`
`);
}
__name(gr, "gr");
__name2(gr, "gr");
function ft(t, e) {
  const n = Ye.structured[e], r = (t.sections || []).slice(0, n).map((c) => ({ ...c, keywords: (c.keywords || []).slice(0, e === "brief" ? 4 : 6), lvl25: (c.lvl25 || []).slice(0, e === "brief" ? 2 : 3), explain: String(c.explain || "").trim() })), s = e === "brief" ? 8 : e === "standard" ? 14 : 20, i = (t.glossary || []).slice(0, s), a = new Set(r.map((c) => c.id)), o = (t.links || []).filter((c) => c.from === "A0" && a.has(c.to));
  return { ...t, sections: r, glossary: i, links: o };
}
__name(ft, "ft");
__name2(ft, "ft");
function mt(t, e) {
  const n = Ye.mindmap[e], r = (t.nodes || []).slice(0, Math.max(0, n - 1)), s = /* @__PURE__ */ new Set(["C0", ...r.map((a) => a.id)]), i = (t.edges || []).filter((a) => s.has(a.from) && s.has(a.to));
  return { ...t, nodes: r, edges: i };
}
__name(mt, "mt");
__name2(mt, "mt");
function gt(t, e) {
  const n = Ye.selftest[e];
  return { questions: (t.questions || []).slice(0, n) };
}
__name(gt, "gt");
__name2(gt, "gt");
function xt(t, e) {
  const n = Ye.narrative[e], i = lr(t.summary || "").slice(0, n).join(" "), a = (t.keyPoints || []).slice(0, e === "brief" ? 3 : 4), o = (t.examHints || []).slice(0, e === "brief" ? 2 : 3);
  return { ...t, summary: i, keyPoints: a, examHints: o };
}
__name(xt, "xt");
__name2(xt, "xt");
async function qe(t, e) {
  const n = /* @__PURE__ */ __name2(async () => {
    const o = await Qt(t, e);
    return String(o || "");
  }, "n"), r = await n(), s = pt(r);
  if (s)
    return s;
  const i = await n(), a = pt(i);
  if (a)
    return a;
  throw new Error("MODEL_JSON_PARSE_FAILED");
}
__name(qe, "qe");
__name2(qe, "qe");
async function xr(t, e) {
  const n = await qe(t, pr(e));
  if (!(n != null && n.anchor) || !Array.isArray(n.sections))
    throw new Error("STRUCTURED_SCHEMA_INVALID");
  n.links = n.links || n.sections.map((u) => ({ from: "A0", to: u.id, rel: "covers" }));
  const r = await qe(t, fr(e, n));
  if (!(r != null && r.summary))
    throw new Error("NARRATIVE_SCHEMA_INVALID");
  const s = await qe(t, mr(n));
  if (!(s != null && s.center) || !Array.isArray(s.nodes) || !Array.isArray(s.edges))
    throw new Error("MINDMAP_SCHEMA_INVALID");
  s.center.id || (s.center.id = "C0");
  const i = await qe(t, gr(n));
  if (!Array.isArray(i.questions))
    throw new Error("SELFTEST_SCHEMA_INVALID");
  const a = { detail: n, standard: ft(n, "standard"), brief: ft(n, "brief") }, o = { detail: r, standard: xt(r, "standard"), brief: xt(r, "brief") }, c = { detail: s, standard: mt(s, "standard"), brief: mt(s, "brief") }, l = { detail: i, standard: gt(i, "standard"), brief: gt(i, "brief") };
  return { structured: a, narrative: o, mindmap: c, selftest: l };
}
__name(xr, "xr");
__name2(xr, "xr");
function Wt(t) {
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
__name(Wt, "Wt");
__name2(Wt, "Wt");
function vr(t, e, n, r) {
  const s = Wt(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(vr, "vr");
__name2(vr, "vr");
function yr(t, e, n, r, s) {
  const i = Wt(r);
  return `${t}::${s || "anon"}::${e}::${n}::${i}`;
}
__name(yr, "yr");
__name2(yr, "yr");
async function br(t) {
  if (!tt) {
    if (!t) {
      tt = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), tt = true;
  }
}
__name(br, "br");
__name2(br, "br");
async function vt(t, e) {
  const n = Date.now(), r = Ue.get(e);
  if (r && n - r.createdAt < tr)
    return { hit: true, data: r.data, store: "mem" };
  if (r && Ue.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(s.response_json);
    return Ue.set(e, { data: i, createdAt: n }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(vt, "vt");
__name2(vt, "vt");
async function ke(t, e, n, r) {
  const s = Date.now();
  Ue.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Jt()).run();
}
__name(ke, "ke");
__name2(ke, "ke");
function wr(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(wr, "wr");
__name2(wr, "wr");
function Er(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    r.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(Er, "Er");
__name2(Er, "Er");
function Sr(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
async function Tr(t, e) {
  var c, l, u, m, x;
  const n = P(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const r = P(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const y = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (y.ok) {
      const _ = await y.json();
      return { ok: true, text: ((x = (m = (u = (l = (c = _ == null ? void 0 : _.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : m[0]) == null ? void 0 : x.text) ?? "", raw: _ };
    }
    if (y.status === 429 || y.status === 503) {
      await new Promise((_) => setTimeout(_, o)), o *= 2;
      continue;
    }
    const C = await y.text().catch(() => "");
    throw new Error(`Gemini error ${y.status}: ${C.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Tr, "Tr");
__name2(Tr, "Tr");
async function Ar(t, e, n) {
  var l, u, m, x, y;
  const r = P(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = P(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const C = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (C.ok) {
      const T = await C.json();
      return ((y = (x = (m = (u = (l = T == null ? void 0 : T.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : m.parts) == null ? void 0 : x[0]) == null ? void 0 : y.text) ?? "";
    }
    if (C.status === 429 || C.status === 503) {
      await new Promise((T) => setTimeout(T, c)), c *= 2;
      continue;
    }
    const _ = await C.text().catch(() => "");
    throw new Error(`Gemini error ${C.status}: ${_.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Ar, "Ar");
__name2(Ar, "Ar");
async function Qt(t, e) {
  const n = await Tr(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(Qt, "Qt");
__name2(Qt, "Qt");
var Cr = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, r = ["narrative", "structured", "mindmap"], s = ["preview", "exam"];
  function i(b) {
    return (b || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  __name2(i, "i");
  function a(b, p) {
    const g = Math.max(200, i(b || "").length), v = e[p] || e.standard, f = Math.floor(g * v.min), O = Math.ceil(g * v.max);
    return { base: g, min: Math.max(80, f), max: Math.max(120, O) };
  }
  __name(a, "a");
  __name2(a, "a");
  function o(b) {
    const p = (b || "").trim();
    return p ? p.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((g) => g.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  __name2(o, "o");
  function c(b) {
    return o(b).map((h, g) => ({ sid: `S${g + 1}`, text: h }));
  }
  __name(c, "c");
  __name2(c, "c");
  function l(b, p, h) {
    const g = b.find((v) => v.sid === p);
    return !g || !h || typeof h != "string" ? false : g.text.includes(h.trim());
  }
  __name(l, "l");
  __name2(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  __name2(u, "u");
  function m({ originalText: b, mode: p, format: h }) {
    const g = a(b, p), v = rr(b), f = h === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : h === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uD559\uC220 \uB17C\uBB38\uC744 \uC0DD\uC131\uC801 \uC694\uC57D(Abstractive Summarization) \uBC29\uC2DD\uC73C\uB85C \uC9C0\uC815\uB41C \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${p} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${h} (${f})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${g.min}\uC790 ~ \uCD5C\uB300 ${g.max}\uC790`, "", "[\u{1F539} C. \uB17C\uBB38\uD615 \uD14D\uC2A4\uD2B8 \uC804\uC6A9 \uC694\uC57D \uAD6C\uC870 - \uBC18\uB4DC\uC2DC \uC900\uC218]", "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uD559\uC220 \uB17C\uBB38\uC785\uB2C8\uB2E4.", "\uC694\uC57D \uC2DC \uBC18\uB4DC\uC2DC \uB2E4\uC74C \uC21C\uC11C\uB97C \uC720\uC9C0\uD558\uC138\uC694:", "1. \uC5F0\uAD6C \uBAA9\uC801 (\uBB34\uC5C7\uC744 \uC5F0\uAD6C\uD588\uB294\uAC00?)", "2. \uC5F0\uAD6C \uC124\uACC4 \uBC0F \uBC29\uBC95 (\uC5B4\uB5BB\uAC8C \uC5F0\uAD6C\uD588\uB294\uAC00?)", "3. \uD575\uC2EC \uACB0\uACFC (\uBB34\uC5C7\uC744 \uBC1C\uACAC\uD588\uB294\uAC00?)", "4. \uACB0\uACFC \uD574\uC11D (\uACB0\uACFC\uAC00 \uC758\uBBF8\uD558\uB294 \uBC14\uB294?)", "5. \uAD50\uC721\uC801 \uC758\uC758 (\uC2E4\uBB34/\uAD50\uC721\uC5D0 \uC5B4\uB5A4 \uC2DC\uC0AC\uC810\uC744 \uC8FC\uB294\uAC00?)", "\uAC01 \uB2E8\uACC4\uB294 1\uBB38\uB2E8 \uC774\uC0C1\uC744 \uB118\uC9C0 \uB9C8\uC138\uC694.", "", "[\uC694\uC57D \uD488\uC9C8 \uADDC\uCE59]", "1. \uB2E8\uC21C \uCD94\uCD9C/\uBCF5\uBD99 \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uADF8\uB300\uB85C \uB098\uC5F4\uD558\uC9C0 \uB9D0\uACE0 \uC0DD\uC131\uC801\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uB9E4\uB044\uB7EC\uC6B4 \uAE00 \uC791\uC131", "2. \uD14D\uC2A4\uD2B8 \uC815\uC81C: \uD398\uC774\uC9C0 \uBC88\uD638(p.XX), \uAC01\uC8FC, \uD2B9\uC218\uAE30\uD638, \uC9C8\uBB38\uD615 \uBB38\uC7A5 \uC81C\uAC70 \u2192 \uD559\uC220\uC801 \uD3C9\uC11C\uBB38\uC73C\uB85C \uC804\uD658", "3. \uC2A4\uB9C8\uD2B8 \uD3B8\uC9D1: \uC911\uBCF5 \uD45C\uD604 \uD1B5\uD569, \uC804\uBB38 \uC6A9\uC5B4 \uC77C\uAD00\uC131 \uC720\uC9C0, \uD55C \uBB38\uC7A5 2\uC904 \uC774\uB0B4\uB85C \uB2E8\uBB38 \uC704\uC8FC", "4. \uD034\uC988 \uC5F0\uB3D9: \uD575\uC2EC \uD0A4\uC6CC\uB4DC\uC640 \uC778\uACFC\uAD00\uACC4\uB97C \uBB38\uC7A5 \uB0B4\uC5D0 \uC804\uB7B5\uC801\uC73C\uB85C \uBC30\uCE58 (\uD034\uC988 \uC575\uCEE4 \uD655\uBCF4)", "5. \uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC/\uC218\uCE58 \uCD94\uAC00 \uC808\uB300 \uAE08\uC9C0", "6. \u{1F539} B. \uACB0\uACFC \uB2E8\uB3C5 \uBC1C\uCDCC \uAE08\uC9C0: \uAC04\uB2E8 \uBAA8\uB4DC\uC5D0\uC11C\uB294 DLPFC, VLPFC, OFC \uB4F1 \uC138\uBD80 \uB1CC \uC601\uC5ED \uBA85\uCE6D \uC0AC\uC6A9 \uAE08\uC9C0", "", "[\uBE44\uC728 \uC5C4\uC218]", "- \uAC04\uB2E8 10~15%, \uD45C\uC900 25~30%, \uC0C1\uC138 45~55% \uAE00\uC790\uC218 \uBE44\uC728\uC740 \uC808\uB300\uC801 \uAE30\uC900", "- \uC0C1\uC138 \uC694\uC57D\uC774 \uD45C\uC900\uBCF4\uB2E4 \uC9E7\uC544\uC9C0\uB294 \uC5ED\uC804 \uD604\uC0C1 \uAE08\uC9C0", "- \uAC01 \uB2E8\uACC4\uB9C8\uB2E4 \uC815\uBCF4\uC758 \uAE4A\uC774\uC640 \uC591\uC744 \uACC4\uCE35\uC801\uC73C\uB85C \uBA85\uD655\uD788 \uCC28\uBCC4\uD654", "", "[ORIGINAL]", v].join(`
`);
  }
  __name(m, "m");
  __name2(m, "m");
  function x({ summaryText: b, format: p }) {
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
}`, "", "[SUMMARY]", b].join(`
`);
  }
  __name(x, "x");
  __name2(x, "x");
  function y({ mode: b, purpose: p, format: h, summaryText: g, sentTable: v, anchors: f }) {
    const O = n[b] || 10, E = p === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", R = h === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : h === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${b} (\uBB38\uD56D\uC218 ${O})`, `- \uBAA9\uC801: ${p} (${E})`, `- \uC694\uC57D \uD615\uC2DD: ${h} (${R})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
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
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(v, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[SUMMARY]", g].join(`
`);
  }
  __name(y, "y");
  __name2(y, "y");
  function C(b, p) {
    const h = p && p.anchors ? p.anchors : [], g = [], v = [];
    for (const f of h) {
      const O = f == null ? void 0 : f.sid, E = f == null ? void 0 : f.quote;
      if (typeof (f == null ? void 0 : f.label) != "string" || !f.label.trim()) {
        v.push({ a: f, reason: "label missing" });
        continue;
      }
      if (!l(b, O, E)) {
        v.push({ a: f, reason: "evidence not in sentence" });
        continue;
      }
      g.push(f);
    }
    return { ok: g, bad: v };
  }
  __name(C, "C");
  __name2(C, "C");
  function _(b, p) {
    const h = p && Array.isArray(p.items) ? p.items : [], g = [], v = [];
    for (const f of h) {
      const O = f == null ? void 0 : f.evidence;
      if (!(f != null && f.id) || !(f != null && f.question) || !(f != null && f.answer) || !(O != null && O.sid) || !(O != null && O.quote)) {
        v.push({ q: f, reason: "missing fields" });
        continue;
      }
      if (!l(b, O.sid, O.quote)) {
        v.push({ q: f, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(f.choices) && f.choices.length > 0 && !f.choices.includes(f.answer)) {
        v.push({ q: f, reason: "answer not in choices" });
        continue;
      }
      g.push(f);
    }
    return { ok: g, bad: v };
  }
  __name(_, "_");
  __name2(_, "_");
  function T({ summaryText: b, sentTable: p, anchors: h, badItems: g, mode: v, purpose: f, format: O }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${g.length}`, `- \uBAA8\uB4DC: ${v}, \uBAA9\uC801: ${f}, \uD615\uC2DD: ${O}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(p, null, 2), "", "[ANCHORS]", JSON.stringify(h, null, 2), "", "[BAD ITEMS]", JSON.stringify(g, null, 2), "", "[SUMMARY]", b].join(`
`);
  }
  __name(T, "T");
  __name2(T, "T");
  async function k({ llmCall: b, originalText: p, mode: h, format: g }) {
    if (!b)
      throw new Error("llmCall is required");
    e[h] || (h = "standard"), r.includes(g) || (g = "narrative");
    const v = m({ originalText: p, mode: h, format: g }), f = (await b({ system: u(), user: v, json: false }) || "").trim() || "", O = c(f), E = x({ summaryText: f, format: g });
    let R = await b({ system: u(), user: E, json: true }), V;
    try {
      V = JSON.parse(R);
    } catch {
      V = { anchors: [] };
    }
    const { ok: j } = C(O, V), Le = j.length >= 4 ? j : q(O);
    return { summaryText: f, sentTable: O, anchors: Le };
  }
  __name(k, "k");
  __name2(k, "k");
  function q(b) {
    const p = [];
    for (let h = 0; h < Math.min(8, b.length); h++) {
      const g = b[h], v = (g.text || "").slice(0, 18);
      p.push({ id: `A${h + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${h + 1}`, type: "claim", sid: g.sid, quote: v, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return p;
  }
  __name(q, "q");
  __name2(q, "q");
  async function B({ llmCall: b, mode: p, purpose: h, format: g, summaryText: v, sentTable: f, anchors: O }) {
    e[p] || (p = "standard"), s.includes(h) || (h = "preview"), r.includes(g) || (g = "narrative");
    const E = y({ mode: p, purpose: h, format: g, summaryText: v, sentTable: f, anchors: O });
    let R = await b({ system: u(), user: E, json: true }), V;
    try {
      V = JSON.parse(R);
    } catch {
      V = { items: [] };
    }
    let { ok: j, bad: Le } = _(f, V);
    if (Le.length > 0) {
      const _e = T({ summaryText: v, sentTable: f, anchors: O, badItems: Le.map((on) => on.q), mode: p, purpose: h, format: g });
      let rn = await b({ system: u(), user: _e, json: true }), We;
      try {
        We = JSON.parse(rn);
      } catch {
        We = { items: [] };
      }
      const sn = _(f, We);
      j = j.concat(sn.ok);
      const an = n[p] || 10;
      j = j.slice(0, an);
    } else {
      const _e = n[p] || 10;
      j = j.slice(0, _e);
    }
    const Xe = n[p] || 10;
    if (j.length < Xe) {
      const _e = z({ sentTable: f, anchors: O, count: Xe - j.length, format: g, purpose: h });
      j = j.concat(_e).slice(0, Xe);
    }
    return { items: j };
  }
  __name(B, "B");
  __name2(B, "B");
  function z({ sentTable: b, anchors: p, count: h, format: g, purpose: v }) {
    const f = [], O = p.slice(0, Math.max(h, 1));
    for (let E = 0; E < h; E++) {
      const R = O[E % O.length], V = R.sid, j = R.quote;
      f.push({ id: `QF${E + 1}`, type: "short", question: v === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${j}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${j}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: V, quote: j }, anchorIds: [R.id] });
    }
    return f;
  }
  __name(z, "z");
  __name2(z, "z");
  class M {
    constructor(p, { passScore: h = 90 } = {}) {
      this.items = Array.isArray(p) ? p : [], this.passScore = h, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(p, h) {
      if (!p)
        return { ok: false, reason: "no item" };
      const g = p.type;
      if (g === "mcq" || g === "blank" || g === "match" || g === "order" || g === "label" || g === "short") {
        if (g === "short")
          return { ok: true, reason: "short-auto-pass" };
        const v = (p.answer || "").trim(), f = (h || "").trim();
        return { ok: f === v, reason: f === v ? "match" : "mismatch" };
      }
      return { ok: false, reason: "unknown type" };
    }
    getScore() {
      return this.items.length === 0 ? 0 : Math.round(this.state.correct / this.items.length * 100);
    }
    currentItem() {
      return this.items[this.state.idx] || null;
    }
    submit(p) {
      if (this.state.finished)
        return { done: true, message: "already finished" };
      const h = this.currentItem();
      if (this.gradeAnswer(h, p).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(h.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${h.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${h.evidence.quote}'`, score: this.getScore() };
      {
        const v = h.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: v, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const h = this.items.filter((g) => this.state.wrongIds.has(g.id));
          this.items = h.length > 0 ? h : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(M, "M");
  __name2(M, "M");
  async function ee({ llmCall: b, originalText: p, mode: h, format: g, purpose: v }) {
    const f = await k({ llmCall: b, originalText: p, mode: h, format: g }), O = await B({ llmCall: b, mode: h, purpose: v, format: g, summaryText: f.summaryText, sentTable: f.sentTable, anchors: f.anchors });
    return { summary: { mode: h, format: g, text: f.summaryText, sentences: f.sentTable, anchors: f.anchors }, selfTest: { purpose: v, passScore: 90, items: O.items } };
  }
  __name(ee, "ee");
  __name2(ee, "ee");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: k, generateSelfTest: B, runPipeline: ee, MasteryRunner: M };
})();
var Or = `/* MindStory Engine Bundle (compat) */
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
J.get("/ms-engine-bundle.js", (t) => t.text(Or, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
J.use("/api/*", Gn());
J.get("/favicon.ico", (t) => t.body(null, 204));
J.use("/static/*", er({ root: "./public" }));
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
  return t.json({ ok: true, ts: Jt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
J.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = P((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), s = Yt((n == null ? void 0 : n.mode) || "standard"), i = Xt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = P((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!r)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!P(t.env.GEMINI_API_KEY).trim(), c = P(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name2(async ({ system: u, user: m, json: x }) => {
    if (x) {
      const y = `${u}

${m}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Qt(t.env, y);
    } else
      return (await Ar(t.env, u, m) || "").toString();
  }, "l");
  try {
    const u = await Cr.runPipeline({ llmCall: l, originalText: r, mode: s, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: s, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
J.post("/api/engine", async (t) => {
  var b;
  const e = Date.now(), n = t.env.DB;
  await br(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = cr(r == null ? void 0 : r.kind), i = P((r == null ? void 0 : r.text) || ""), a = Yt((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = Xt((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), c = P(((b = r == null ? void 0 : r.options) == null ? void 0 : b.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = or(i), u = l.text, m = l.sentences;
  console.log("[Sanitize] Original length:", i.length, "\u2192 Cleaned:", u.length), console.log("[Sanitize] Sentences extracted:", m.length);
  const x = yr(s, a, o, u, c || null), y = await vt(n, x);
  if (y.hit)
    return t.json({ ok: true, data: y.data, meta: { cached: true, cacheStore: y.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const C = vr(s, a, u, c || null), _ = await vt(n, C);
  if (_.hit && _.data) {
    let p;
    if (_.data.allSummaries && _.data.allSummaries[a] ? p = _.data.allSummaries[a] : _.data.narrative ? p = _.data.narrative : console.warn("[Cache] Base cache has no narrative, skipping"), p) {
      let h;
      return o === "narrative" ? h = { kind: s, mode: a, viewType: o, narrative: p } : o === "structured" ? h = { kind: s, mode: a, ...wr(p) } : o === "mindmap" ? h = { kind: s, mode: a, ...Er(p) } : h = { kind: s, mode: a, ...Sr(p) }, await ke(n, x, c || "anon", h), t.json({ ok: true, data: h, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
    }
  }
  const T = !!P(t.env.GEMINI_API_KEY).trim(), k = P(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && T && !k)
    try {
      const p = await xr(t.env, u), h = dr(a), g = ur(o);
      let v;
      if (g === "structured")
        v = { kind: s, mode: a, viewType: o, ...p.structured[h] };
      else if (g === "mindmap")
        v = { kind: s, mode: a, viewType: o, ...p.mindmap[h] };
      else if (g === "selftest")
        v = { kind: s, mode: a, viewType: o, ...p.selftest[h] };
      else {
        const E = p.narrative[h];
        v = { kind: s, mode: a, viewType: o, title: E.title, narrative: E.summary, keyPoints: E.keyPoints, examHints: E.examHints };
      }
      const f = p.narrative[h], O = { kind: s, mode: a, viewType: "narrative", narrative: f.summary, allSummaries: { brief: p.narrative.brief.summary, standard: p.narrative.standard.summary, detail: p.narrative.detail.summary }, meta: { engine: "v4", hierarchy: "brief \u2282 standard \u2282 detail (server-downsample)", structuredFirst: true } };
      return await ke(n, C, c || "anon", O), await ke(n, x, c || "anon", v), t.json({ ok: true, data: v, meta: { cached: false, engine: "gemini-v4-structured-first", elapsedMs: Date.now() - e, hierarchy: "brief \u2282 standard \u2282 detail (guaranteed)" } }, 200);
    } catch (p) {
      console.error("[Gemini V4 Error]", p);
    }
  const { buildAllSummariesV4_Quality: q } = await Promise.resolve().then(() => Lr), B = q(u), z = B[a] || B.standard;
  let M;
  o === "narrative" ? M = { kind: s, mode: a, viewType: o, narrative: z.narrative } : o === "structured" ? M = { kind: s, mode: a, viewType: o, structured: z.structured } : o === "mindmap" ? M = { kind: s, mode: a, viewType: o, mindmap: z.mindmap } : o === "selftest" && (M = { kind: s, mode: a, viewType: o, selftest: z.selftest }), await ke(n, x, c || "anon", M);
  const ee = { kind: "summary", mode: a, viewType: "narrative", narrative: z.narrative, allSummaries: { brief: B.brief.narrative, standard: B.standard.narrative, detail: B.detail.narrative } };
  return await ke(n, C, c || "anon", ee), t.json({ ok: true, data: M, meta: { cached: false, engine: "quality-v4.2", elapsedMs: Date.now() - e, features: ["\uC555\uCD95\uB960 \uAC15\uC81C (\uC911\uAC04 \uC808\uB2E8 \uAE08\uC9C0)", "\uAD6C\uC870\uD654: \uB17C\uC9C0/\uB300\uB9BD/\uD604\uD669/\uAD34\uB9AC/\uBCC0\uCC9C/\uC2DC\uC0AC\uC810", "\uB9C8\uC778\uB4DC\uB9F5: \uB178\uB4DC \uB2E8\uC704 \uCD95\uC57D", "brief \u2282 standard \u2282 detail \uAC15\uC81C"] } }, 200);
});
J.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
J.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var yt = new Ut();
var _r = Object.assign({ "/src/index.tsx": J });
var Zt = false;
for (const [, t] of Object.entries(_r))
  t && (yt.route("/", t), yt.notFound(t.notFoundHandler), Zt = true);
if (!Zt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function bt(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(bt, "bt");
__name2(bt, "bt");
function it(t) {
  return (t || "").replace(/\s+/g, "").length;
}
__name(it, "it");
__name2(it, "it");
function ce(t) {
  return (t || "").replace(/[ \t]{2,}/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
}
__name(ce, "ce");
__name2(ce, "ce");
function Nr(t, e) {
  return `${t}_${e.toString(36)}`;
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
function en(t) {
  if (!t)
    return "";
  let e = String(t);
  return e = e.replace(/\uFEFF/g, "").replace(/[\u200B-\u200D\u2060]/g, "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " "), e = e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g, `
`), e = e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g, "$1$2"), e = e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g, "$1$2"), e = e.replace(/[「『〈《]/g, '"').replace(/[」』〉》]/g, '"'), e = e.replace(/\n{3,}/g, `

`), e = e.replace(/[ \t]{2,}/g, " "), e.trim();
}
__name(en, "en");
__name2(en, "en");
function wt(t) {
  const e = (t || "").trim();
  if (!e)
    return [];
  const n = e.split(/\n{2,}/g), r = [];
  for (const s of n) {
    const i = s.replace(/\n/g, " ").replace(/[ \t]{2,}/g, " ").trim();
    if (!i)
      continue;
    const a = i.split(new RegExp("(?<=[.?!])\\s+|(?<=(?:\uC774\uB2E4|\uB41C\uB2E4|\uD55C\uB2E4|\uC788\uB2E4|\uC5C6\uB2E4|\uB9D0\uD55C\uB2E4|\uC8FC\uC7A5\uD55C\uB2E4)\\.)\\s+", "g"));
    for (const o of a) {
      const c = ce(o);
      c && r.push(c);
    }
  }
  return r;
}
__name(wt, "wt");
__name2(wt, "wt");
function kr(t) {
  const e = (t || "").trim();
  return !!(!e || e.length < 12 && !(/[.?!]$/.test(e) || /(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e)) || /^["")\]\}]+$/.test(e) || /^["(\[\{]+$/.test(e) || /^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e) || /(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|특강|전문\s*대비)/.test(e) && (/[""]/.test(e) || /!$/.test(e)));
}
__name(kr, "kr");
__name2(kr, "kr");
function Et(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  for (const r of t) {
    const s = ce(r);
    if (!s || kr(s))
      continue;
    const i = s.replace(/\s+/g, " ");
    n.has(i) || (n.add(i), e.push(i));
  }
  return e;
}
__name(Et, "Et");
__name2(Et, "Et");
function Rr(t) {
  const e = /(^|\n)\s*(\d+\.\d+)\.\s*([^\n]+)\n?/g, n = [];
  let r;
  for (; (r = e.exec(t)) !== null; )
    n.push({ idx: r.index, key: r[2], title: ce(r[3]) });
  if (n.length === 0)
    return [{ key: "all", title: "\uBCF8\uBB38", text: t }];
  const s = [];
  for (let i = 0; i < n.length; i++) {
    const a = n[i], o = n[i + 1], c = a.idx, l = o ? o.idx : t.length;
    s.push({ key: a.key, title: a.title, text: t.slice(c, l).trim() });
  }
  return s;
}
__name(Rr, "Rr");
__name2(Rr, "Rr");
function Mr(t) {
  let e = 1;
  /(교육부|공교육|정상화|사교육|입시|내신|대입|고입)/.test(t) && (e += 2), /(방해|요인|우려|격차|부정적|증폭|현실)/.test(t) && (e += 1.5), /(반해|반면|하지만|그러나|이에\s*반해)/.test(t) && (e += 1.5), /(목표|역점|능력|국제|문화|듣기|말하기)/.test(t) && (e += 1.2), /(현황|방법|프로그램|평가|설명회|학원|교육비|기숙)/.test(t) && (e += 1), /(변천|과정|비율|가산점|전형|선발\s*시험)/.test(t) && (e += 1.6);
  const n = it(t);
  return n > 180 && (e -= 0.6), n > 260 && (e -= 1), e;
}
__name(Mr, "Mr");
__name2(Mr, "Mr");
function tn(t) {
  let e = ce(t);
  return e = e.replace(/\([^)]*\d{4}[^)]*\)/g, "").trim(), e = e.replace(/"([^"]{60,})"/g, '"(\uC778\uC6A9\uBB38 \uC694\uC9C0)"'), e = e.replace(/본수업/g, "\uBCF8 \uC218\uC5C5"), e = e.replace(/국력신장/g, "\uAD6D\uB825 \uC2E0\uC7A5"), e = e.replace(/내신대비/g, "\uB0B4\uC2E0 \uB300\uBE44"), e = e.replace(/지원현황/g, "\uC9C0\uC6D0 \uD604\uD669"), e = e.replace(/또한출판/g, "\uB610\uD55C \uCD9C\uD310"), e = e.replace(/그리고입과/g, "\uADF8\uB9AC\uACE0 \uACE0\uC785\uACFC"), e = e.replace(/통한대비/g, "\uD1B5\uD55C \uB300\uBE44"), /[.?!]$/.test(e) || (e += "."), ce(e);
}
__name(tn, "tn");
__name2(tn, "tn");
function te(t, e, n) {
  return t.map((s, i) => ({ id: Nr(n, i), text: s, score: Mr(s) })).sort((s, i) => i.score - s.score).slice(0, e).map((s) => ({ id: s.id, text: tn(s.text), score: s.score }));
}
__name(te, "te");
__name2(te, "te");
function Ir(t) {
  var ee, b, p, h, g, v, f, O;
  const e = Rr(t), n = {};
  for (const E of e)
    n[E.key] = Et(wt(E.text));
  const r = Et(wt(t)), s = (ee = e[0]) != null && ee.title ? ce(e[0].title) : "\uC120\uD589\uD559\uC2B5 \uAD6C\uC870\uD654", i = r.filter((E) => /(정의|개념|선행학습|학습활동|교육과정)/.test(E)), a = r.filter((E) => /(쟁점|관점|차이|주장|해석|입장)/.test(E)), o = te(i.length ? i : r, 2, "def"), c = te(a.length ? a : r, 2, "issue"), l = r.filter((E) => /(교육부|공교육|정상화|우려|부정적|방해|격차|참여도|태도|창의|인성|전인교육)/.test(E)), u = te(l.length ? l : r, 4, "min"), m = r.filter((E) => /(사교육|학원|예습|효율|성과|긍정|흥미|자신감|구분|조력|대비)/.test(E)), x = te(m.length ? m : r, 3, "pri"), y = (b = n["2.2"]) != null && b.length ? n["2.2"] : r.filter((E) => /(목표|역점|듣기|말하기|일상|국제|이해|능력)/.test(E)), C = r.filter((E) => /(현실|성취|성적|고입|대입|전환)/.test(E)), _ = te(y.length ? y : r, 2, "goal"), T = te(C.length ? C : r, 2, "rgoal"), k = ((p = n["2.3"]) != null && p.length ? n["2.3"] : r).filter((E) => /(현황|방법|설명회|프로그램|평가|교육비|특강|기숙|방학|시험대비|내신|인증시험|운영|비용|강도)/.test(E)), q = te(k.length ? k : r, 4, "rea"), B = (h = n["2.4"]) != null && h.length ? n["2.4"] : r.filter((E) => /(변천|과정|비율|가산점|내신|추세|반영|영어|비중|확대)/.test(E)), z = te(B.length ? B : r, 2, "pol"), M = { title: s, children: [{ title: "\uC815\uC758\xB7\uC7C1\uC810", type: "question", collapsed: false, children: [{ title: "\uC120\uD589\uD559\uC2B5 \uC815\uC758", type: "keyword", pack: ["\uC815\uADDC\uACFC\uC815 \uC774\uC804", "\uBBF8\uB9AC \uD559\uC2B5", "\uD559\uC2B5\uACFC\uC815"], explain: ((g = o[0]) == null ? void 0 : g.text) || "\uAD50\uC721\uBD80 \uAE30\uC900 \uC120\uD589\uD559\uC2B5\uC740 \uC815\uADDC \uAD50\uC721\uACFC\uC815\uBCF4\uB2E4 \uC55E\uC11C \uBBF8\uB9AC \uD559\uC2B5\uD558\uB294 \uBAA8\uB4E0 \uD559\uC2B5\uD65C\uB3D9\uC744 \uB73B\uD55C\uB2E4.", collapsed: false, children: [] }, { title: "\uC7C1\uC810(\uAD00\uC810 \uCC28\uC774)", type: "keyword", pack: ["\uAD6D\uAC00", "\uD559\uC0DD\xB7\uD559\uBD80\uBAA8", "\uC0AC\uAD50\uC721"], explain: ((v = c[0]) == null ? void 0 : v.text) || "\uC120\uD589\uD559\uC2B5\uC758 \uC131\uACA9\uACFC \uC601\uD5A5\uC5D0 \uB300\uD574 \uAD6D\uAC00\xB7\uD559\uC0DD/\uD559\uBD80\uBAA8\xB7\uC0AC\uAD50\uC721\uC774 \uC11C\uB85C \uB2E4\uB978 \uC8FC\uC7A5\uACFC \uD574\uC11D\uC744 \uC81C\uC2DC\uD55C\uB2E4.", collapsed: false, children: [] }] }, { title: "\uAD50\uC721\uBD80 \uAD00\uC810", type: "question", collapsed: false, children: u.slice(0, 4).map((E, R) => ({ title: ["\uACF5\uAD50\uC721 \uC815\uC0C1\uD654 \uC800\uD574", "\uC804\uC778\uAD50\uC721 \uC800\uD574\xB7\uC0AC\uAD50\uC721 \uC99D\uD3ED", "\uC601\uC5B4 \uD0DC\uB3C4 \uC870\uAE30 \uACE0\uCC29 \uC6B0\uB824", "\uD559\uC2B5\uACA9\uCC28\xB7\uC218\uC5C5\uCC38\uC5EC \uC545\uC601\uD5A5"][R] || `\uAD00\uC810 ${R + 1}`, type: "keyword", pack: [["\uACF5\uAD50\uC721 \uBC29\uD574", "\uC815\uC0C1\uD654 \uC800\uD574", "\uD575\uC2EC \uC694\uC778"], ["\uCC3D\uC758\xB7\uC778\uC131", "\uC804\uC778\uAD50\uC721", "\uC0AC\uAD50\uC721 \uAD00\uD589"], ["\uD638\uC624 \uC870\uAE30\uACB0\uC815", "\uC790\uC2E0\uAC10 \uACFC\uC789", "\uBB34\uB825\uAC10"], ["\uC218\uC900 \uACA9\uCC28", "\uD0DC\uB3C4", "\uCC38\uC5EC\uB3C4"]][R] || [], explain: E.text, collapsed: false, children: [] })) }, { title: "\uC0AC\uAD50\uC721 \uAD00\uC810", type: "question", collapsed: false, children: x.slice(0, 3).map((E, R) => ({ title: ["\uC608\uC2B5\uACFC \uC120\uD589\uD559\uC2B5 \uAD6C\uBD84 \uC8FC\uC7A5", "\uC608\uC2B5\uC758 \uD6A8\uACFC \uAC15\uC870", "\uD604\uC7A5\uC758 \uC120\uD589\uD559\uC2B5 \uC2E4\uD0DC(\uBAA8\uC21C)"][R] || `\uAD00\uC810 ${R + 1}`, type: "keyword", pack: [["\uC608\uC2B5\u2260\uC120\uD589", "\uB300\uBE44", "\uC870\uB825"], ["\uC218\uC5C5 \uC131\uACFC", "\uD6A8\uC728", "\uD765\uBBF8\xB7\uC790\uC2E0\uAC10"], ["\uACE0\uD559\uB144 \uAD50\uC7AC", "\uBC29\uD559\xB7\uD2B9\uAC15", "\uC2E4\uC9C8 \uC120\uD589"]][R] || [], explain: E.text, collapsed: false, children: [] })) }, { title: "\uBAA9\uD45C(\uAD50\uC721\uBD80 vs \uD604\uC2E4)", type: "question", collapsed: false, children: [{ title: "1998 \uC601\uC5B4\uAD50\uC721 \uBAA9\uD45C", type: "keyword", pack: ["\uB4E3\uAE30\xB7\uB9D0\uD558\uAE30", "\uC77C\uC0C1\uC601\uC5B4", "\uAD6D\uC81C\uC774\uD574"], explain: ((f = _[0]) == null ? void 0 : f.text) || "\uAD50\uC721\uBD80(1998)\uB294 \uC74C\uC131\uC5B8\uC5B4 \uC911\uC2EC(\uB4E3\uAE30\xB7\uB9D0\uD558\uAE30)\uACFC \uC77C\uC0C1\uC0DD\uD65C \uC601\uC5B4 \uC0AC\uC6A9 \uB2A5\uB825, \uAD6D\uC81C\uC0AC\uD68C\xB7\uC678\uAD6D\uBB38\uD654 \uC774\uD574 \uBC0F \uAD6D\uAC00 \uBC1C\uC804 \uAE30\uC5EC\uB97C \uBAA9\uD45C\uB85C \uC81C\uC2DC\uD588\uB2E4.", collapsed: false, children: [] }, { title: "\uD604\uC2E4 \uBAA9\uD45C\uC758 \uC804\uD658", type: "keyword", pack: ["\uC131\uCDE8\xB7\uC131\uC801", "\uACE0\uC785", "\uB300\uC785"], explain: ((O = T[0]) == null ? void 0 : O.text) || "\uD604\uC7A5\uC5D0\uC11C\uB294 \uAD50\uC721 \uBAA9\uD45C\uC640 \uB2EC\uB9AC \uD559\uC5C5 \uC131\uCDE8\xB7\uC131\uC801 \uD5A5\uC0C1, \uACE0\uC785\xB7\uB300\uC785 \uB300\uBE44\uAC00 \uD559\uC2B5\uC758 \uC911\uC2EC \uBAA9\uD45C\uB85C \uC791\uB3D9\uD558\uB294 \uACBD\uD5A5\uC774 \uC788\uB2E4.", collapsed: false, children: [] }] }, { title: "\uBC29\uBC95\xB7\uD604\uD669(\uC0AC\uB840)", type: "question", collapsed: false, children: q.slice(0, 4).map((E, R) => ({ title: ["\uC2DC\uD5D8\uB300\uBE44 \uD504\uB85C\uADF8\uB7A8(\uCD08\uB4F1 A\uD559\uC6D0)", "\uB0B4\uC2E0\xB7\uC778\uC99D\uC2DC\uD5D8 \uC9D1\uC911(\uC5B4\uD559 B\xB7C\uD559\uC6D0)", "\uC6B4\uC601\xB7\uBE44\uC6A9\xB7\uAC15\uB3C4", "\uAE30\uC219\uD615 \uC120\uD589\uD559\uC2B5(\uBC29\uD559 30\uC77C \uB0B4\uC678)"][R] || `\uBC29\uBC95 ${R + 1}`, type: "keyword", pack: [["\uB2E8\uC6D0\uD3C9\uAC00", "\uC11C\uC220\uD615 \uD2B9\uAC15", "\uC131\uCDE8\uB3C4 \uD3C9\uAC00"], ["\uC911\uB4F1 \uB0B4\uC2E0", "\uC778\uC99D\uC2DC\uD5D8", "L/S/R/W"], ["\uC8FC5\uD68C", "\uC8FC\uB9D0 \uD2B9\uAC15", "\uC790\uC2B5 \uC6B4\uC601"], ["\uAD50\uC721\uCCAD \uC5F0\uACC4", "\uAE30\uC219", "\uC2A4\uD30C\uB974\uD0C0\uC2DD"]][R] || [], explain: E.text, collapsed: false, children: [] })) }, { title: "\uBCC0\uCC9C(\uC785\uC2DC \uBC18\uC601 \uAD6C\uC870)", type: "question", collapsed: false, children: z.slice(0, 2).map((E, R) => ({ title: ["\uB0B4\uC2E0 \uBC18\uC601 \uBE44\uC728\uC774 \uC88C\uC6B0", "\uC601\uC5B4 \uBE44\uC911 \uD655\uB300 \uCD94\uC138"][R] || `\uBCC0\uCC9C ${R + 1}`, type: "keyword", pack: [["\uACE0\uC785", "\uB300\uC785", "\uB0B4\uC2E0 \uBE44\uC911"], ["\uD544\uC218\uACFC\uBAA9", "\uAC00\uC0B0\uC810", "\uBE44\uC911 \uC99D\uAC00"]][R] || [], explain: E.text, collapsed: false, children: [] })) }] };
  return { title: s, tree: M };
}
__name(Ir, "Ir");
__name2(Ir, "Ir");
function nn(t, e, n) {
  if (e >= n)
    return { ...t, children: [] };
  const r = { 0: 6, 1: 4, 2: 3 }[e] || 2;
  return { ...t, children: t.children.slice(0, r).map((s) => nn(s, e + 1, n)) };
}
__name(nn, "nn");
__name2(nn, "nn");
function St(t, e) {
  const n = e === "brief" ? 2 : e === "standard" ? 3 : 4;
  return { title: t.title, tree: nn(t.tree, 0, n) };
}
__name(St, "St");
__name2(St, "St");
function $r(t, e) {
  const n = Math.max(120, it(t)), r = e === "brief" ? 0.13 : e === "standard" ? 0.3 : 0.55, s = Math.floor(n * (r - 0.03)), i = Math.ceil(n * (r + 0.05));
  return { min: bt(s, 80, 999999), max: bt(i, 110, 999999) };
}
__name($r, "$r");
__name2($r, "$r");
function nt(t, e, n) {
  const { min: r, max: s } = $r(n, e), i = [], a = /* @__PURE__ */ __name2((l) => {
    l.explain && i.push(l.explain), l.children && l.children.forEach(a);
  }, "a");
  a(t.tree);
  const o = [];
  let c = 0;
  for (const l of i) {
    const u = it(l);
    if (!(c + u > s && o.length >= 2) && (o.push(l), c += u, c >= r && o.length >= (e === "brief" ? 2 : e === "standard" ? 4 : 6)))
      break;
  }
  return ce(o.join(" "));
}
__name(nt, "nt");
__name2(nt, "nt");
function jr(t) {
  const e = tn(t), n = e.split(/,\s+/g);
  return n.length >= 3 ? ce(n.slice(0, 2).join(", ") + ".") : e;
}
__name(jr, "jr");
__name2(jr, "jr");
function Pr(t) {
  const e = t.title || "\uD575\uC2EC", n = /* @__PURE__ */ __name2((s, i) => {
    const a = `${i}_${Math.random().toString(36).substring(7)}`;
    return { id: a, label: jr(s.title), children: s.children.map((o, c) => n(o, `${a}_${c}`)) };
  }, "n"), r = t.tree.children.map((s, i) => n(s, `n${i}`));
  return { center: e, nodes: r };
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
function Dr(t, e) {
  const n = [], r = [], s = /* @__PURE__ */ __name2((i) => {
    i.explain && r.push(i.explain), i.children && i.children.forEach(s);
  }, "s");
  return s(t.tree), n.push({ q: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC744 \uC65C \uBB38\uC81C\uB85C \uBCF4\uB294\uAC00?", a: r.find((i) => /(교육부|공교육|정상화|우려)/.test(i)) || "\uACF5\uAD50\uC721 \uC815\uC0C1\uD654 \uC800\uD574 \uBC0F \uACA9\uCC28/\uD0DC\uB3C4 \uC545\uD654 \uC6B0\uB824.", hint: "\uACF5\uAD50\uC721\xB7\uACA9\uCC28\xB7\uCC38\uC5EC\uB3C4" }), n.push({ q: "\uC0AC\uAD50\uC721\uC774 \uB9D0\uD558\uB294 \uC608\uC2B5\uACFC \uC120\uD589\uD559\uC2B5\uC758 \uCC28\uC774\uB294 \uBB34\uC5C7\uC778\uAC00?", a: r.find((i) => /(사교육|학원|예습|효율)/.test(i)) || "\uC608\uC2B5\uC740 \uC218\uC5C5 \uB300\uBE44, \uC120\uD589\uC740 \uB2E4\uC74C \uD559\uB144 \uACFC\uC815\uC758 \uC120\uD559\uC2B5.", hint: "\uC218\uC5C5 \uB300\uBE44 vs \uB2E4\uC74C \uD559\uB144" }), e !== "brief" && n.push({ q: "\uC120\uD589\uD559\uC2B5\uC774 \uAC15\uD654\uB418\uB294 \uC81C\uB3C4\uC801 \uBC30\uACBD\uC740 \uBB34\uC5C7\uC778\uAC00?", a: r.find((i) => /(변천|과정|비율|가산점|내신)/.test(i)) || "\uB0B4\uC2E0 \uBC18\uC601\uBE44\uC728/\uC804\uD615/\uAC00\uC0B0\uC810 \uB4F1 \uAD6C\uC870 \uBCC0\uD654\uAC00 \uC601\uD5A5\uC744 \uC900\uB2E4.", hint: "\uB0B4\uC2E0\xB7\uC804\uD615\xB7\uBE44\uC728" }), e === "detail" && n.push({ q: "\uC120\uD589\uD559\uC2B5\uC758 \uD604\uD669(\uBC29\uBC95)\uC5D0\uC11C \uD575\uC2EC \uD2B9\uC9D5 1\uAC00\uC9C0\uB294?", a: r.find((i) => /(현황|방법|프로그램|평가)/.test(i)) || "\uC2DC\uD5D8 \uB300\uBE44 \uC911\uC2EC \uD504\uB85C\uADF8\uB7A8\uACFC \uD2B9\uAC15/\uD3C9\uAC00 \uCCB4\uACC4\uAC00 \uC6B4\uC601\uB41C\uB2E4.", hint: "\uD504\uB85C\uADF8\uB7A8\xB7\uD2B9\uAC15\xB7\uD3C9\uAC00" }), n;
}
__name(Dr, "Dr");
__name2(Dr, "Dr");
function Br(t) {
  const e = en(t), n = Ir(e), r = St(n, "standard"), s = St(n, "brief"), i = nt(n, "detail", e), a = nt(r, "standard", e), o = nt(s, "brief", e), c = /* @__PURE__ */ __name2((l, u, m) => ({ mode: l, narrative: m, structured: u, mindmap: Pr(u), selftest: Dr(u, l) }), "c");
  return { brief: c("brief", s, o), standard: c("standard", r, a), detail: c("detail", n, i) };
}
__name(Br, "Br");
__name2(Br, "Br");
var Lr = Object.freeze(Object.defineProperty({ __proto__: null, buildAllSummariesV4_Quality: Br, sanitizeKoreanAcademicText: en }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = yt;
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

// .wrangler/tmp/pages-7YmSIs/lxk2fpjgn5h.js
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

// .wrangler/tmp/bundle-In1c3c/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-In1c3c/middleware-loader.entry.ts
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
//# sourceMappingURL=lxk2fpjgn5h.js.map
