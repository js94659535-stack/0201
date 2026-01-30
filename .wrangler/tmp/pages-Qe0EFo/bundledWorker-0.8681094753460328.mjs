var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-BEUcCD/checked-fetch.js
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

// ../.wrangler/tmp/bundle-BEUcCD/strip-cf-connecting-ip-header.js
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
var Xt = Object.defineProperty;
var ct = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "ct");
var Qt = /* @__PURE__ */ __name((t, e, n) => e in t ? Xt(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "Qt");
var b = /* @__PURE__ */ __name((t, e, n) => Qt(t, typeof e != "symbol" ? e + "" : e, n), "b");
var Ze = /* @__PURE__ */ __name((t, e, n) => e.has(t) || ct("Cannot " + n), "Ze");
var d = /* @__PURE__ */ __name((t, e, n) => (Ze(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var S = /* @__PURE__ */ __name((t, e, n) => e.has(t) ? ct("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "S");
var x = /* @__PURE__ */ __name((t, e, n, r) => (Ze(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), "x");
var O = /* @__PURE__ */ __name((t, e, n) => (Ze(t, e, "access private method"), n), "O");
var lt = /* @__PURE__ */ __name((t, e, n, r) => ({ set _(s) {
  x(t, e, s, n);
}, get _() {
  return d(t, e, r);
} }), "lt");
var dt = /* @__PURE__ */ __name((t, e, n) => (r, s) => {
  let a = -1;
  return i(0);
  async function i(o) {
    if (o <= a)
      throw new Error("next() called multiple times");
    a = o;
    let l, c = false, u;
    if (t[o] ? (u = t[o][0][0], r.req.routeIndex = o) : u = o === t.length && s || void 0, u)
      try {
        l = await u(r, () => i(o + 1));
      } catch (h) {
        if (h instanceof Error && e)
          r.error = h, l = await e(h, r), c = true;
        else
          throw h;
      }
    else
      r.finalized === false && n && (l = await n(r));
    return l && (r.finalized === false || c) && (r.res = l), r;
  }
  __name(i, "i");
}, "dt");
var Zt = Symbol();
var en = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: r = false } = e, a = (t instanceof Nt ? t.raw.headers : t.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? tn(t, { all: n, dot: r }) : {};
}, "en");
async function tn(t, e) {
  const n = await t.formData();
  return n ? nn(n, e) : {};
}
__name(tn, "tn");
function nn(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((r, s) => {
    e.all || s.endsWith("[]") ? rn(n, s, r) : n[s] = r;
  }), e.dot && Object.entries(n).forEach(([r, s]) => {
    r.includes(".") && (sn(n, r, s), delete n[r]);
  }), n;
}
__name(nn, "nn");
var rn = /* @__PURE__ */ __name((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "rn");
var sn = /* @__PURE__ */ __name((t, e, n) => {
  let r = t;
  const s = e.split(".");
  s.forEach((a, i) => {
    i === s.length - 1 ? r[a] = n : ((!r[a] || typeof r[a] != "object" || Array.isArray(r[a]) || r[a] instanceof File) && (r[a] = /* @__PURE__ */ Object.create(null)), r = r[a]);
  });
}, "sn");
var _t = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "_t");
var an = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: n } = on(t), r = _t(n);
  return cn(r, e);
}, "an");
var on = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, r) => {
    const s = `@${r}`;
    return e.push([s, n]), s;
  }), { groups: e, path: t };
}, "on");
var cn = /* @__PURE__ */ __name((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [r] = e[n];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(r)) {
        t[s] = t[s].replace(r, e[n][1]);
        break;
      }
  }
  return t;
}, "cn");
var Ke = {};
var ln = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const r = `${t}#${e}`;
    return Ke[r] || (n[2] ? Ke[r] = e && e[0] !== ":" && e[0] !== "*" ? [r, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Ke[r] = [t, n[1], true]), Ke[r];
  }
  return null;
}, "ln");
var ot = /* @__PURE__ */ __name((t, e) => {
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
}, "ot");
var dn = /* @__PURE__ */ __name((t) => ot(t, decodeURI), "dn");
var kt = /* @__PURE__ */ __name((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let r = n;
  for (; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s === 37) {
      const a = e.indexOf("?", r), i = e.slice(n, a === -1 ? void 0 : a);
      return dn(i.includes("%25") ? i.replace(/%25/g, "%2525") : i);
    } else if (s === 63)
      break;
  }
  return e.slice(n, r);
}, "kt");
var un = /* @__PURE__ */ __name((t) => {
  const e = kt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "un");
var we = /* @__PURE__ */ __name((t, e, ...n) => (n.length && (e = we(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "we");
var Mt = /* @__PURE__ */ __name((t) => {
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
        const a = s.replace("?", "");
        r += "/" + a, n.push(r);
      } else
        r += "/" + s;
  }), n.filter((s, a, i) => i.indexOf(s) === a);
}, "Mt");
var et = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? ot(t, It) : t) : t, "et");
var At = /* @__PURE__ */ __name((t, e, n) => {
  let r;
  if (!n && e && !/[%+]/.test(e)) {
    let i = t.indexOf("?", 8);
    if (i === -1)
      return;
    for (t.startsWith(e, i + 1) || (i = t.indexOf(`&${e}`, i + 1)); i !== -1; ) {
      const o = t.charCodeAt(i + e.length + 1);
      if (o === 61) {
        const l = i + e.length + 2, c = t.indexOf("&", l);
        return et(t.slice(l, c === -1 ? void 0 : c));
      } else if (o == 38 || isNaN(o))
        return "";
      i = t.indexOf(`&${e}`, i + 1);
    }
    if (r = /[%+]/.test(t), !r)
      return;
  }
  const s = {};
  r ?? (r = /[%+]/.test(t));
  let a = t.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = t.indexOf("&", a + 1);
    let o = t.indexOf("=", a);
    o > i && i !== -1 && (o = -1);
    let l = t.slice(a + 1, o === -1 ? i === -1 ? void 0 : i : o);
    if (r && (l = et(l)), a = i, l === "")
      continue;
    let c;
    o === -1 ? c = "" : (c = t.slice(o + 1, i === -1 ? void 0 : i), r && (c = et(c))), n ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(c)) : s[l] ?? (s[l] = c);
  }
  return e ? s[e] : s;
}, "At");
var hn = At;
var fn = /* @__PURE__ */ __name((t, e) => At(t, e, true), "fn");
var It = decodeURIComponent;
var ut = /* @__PURE__ */ __name((t) => ot(t, It), "ut");
var Se;
var U;
var ne;
var Pt;
var Ht;
var rt;
var se;
var $t;
var Nt = ($t = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", n = [[]]) {
    S(this, ne);
    b(this, "raw");
    S(this, Se);
    S(this, U);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    S(this, se, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, r = e2[t2];
      if (r)
        return r;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((a) => (s === "json" && (a = JSON.stringify(a)), new Response(a)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, x(this, U, n), x(this, Se, {});
  }
  param(t) {
    return t ? O(this, ne, Pt).call(this, t) : O(this, ne, Ht).call(this);
  }
  query(t) {
    return hn(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await en(this, t));
  }
  json() {
    return d(this, se).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, se).call(this, "text");
  }
  arrayBuffer() {
    return d(this, se).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, se).call(this, "blob");
  }
  formData() {
    return d(this, se).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, Se)[t] = e;
  }
  valid(t) {
    return d(this, Se)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Zt]() {
    return d(this, U);
  }
  get matchedRoutes() {
    return d(this, U)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, U)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "$t"), Se = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), Pt = /* @__PURE__ */ __name(function(t) {
  const e = d(this, U)[0][this.routeIndex][1][t], n = O(this, ne, rt).call(this, e);
  return n && /\%/.test(n) ? ut(n) : n;
}, "Pt"), Ht = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(d(this, U)[0][this.routeIndex][1]);
  for (const n of e) {
    const r = O(this, ne, rt).call(this, d(this, U)[0][this.routeIndex][1][n]);
    r !== void 0 && (t[n] = /\%/.test(r) ? ut(r) : r);
  }
  return t;
}, "Ht"), rt = /* @__PURE__ */ __name(function(t) {
  return d(this, U)[1] ? d(this, U)[1][t] : t;
}, "rt"), se = /* @__PURE__ */ new WeakMap(), $t);
var pn = { Stringify: 1 };
var Dt = /* @__PURE__ */ __name(async (t, e, n, r, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const a = t.callbacks;
  return a != null && a.length ? (s ? s[0] += t : s = [t], Promise.all(a.map((o) => o({ phase: e, buffer: s, context: r }))).then((o) => Promise.all(o.filter(Boolean).map((l) => Dt(l, e, false, r, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Dt");
var gn = "text/plain; charset=UTF-8";
var tt = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "tt");
var Ne;
var Pe;
var Q;
var $e;
var Z;
var K;
var He;
var Ce;
var je;
var he;
var De;
var Le;
var ae;
var ye;
var Ct;
var mn = (Ct = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    S(this, ae);
    S(this, Ne);
    S(this, Pe);
    b(this, "env", {});
    S(this, Q);
    b(this, "finalized", false);
    b(this, "error");
    S(this, $e);
    S(this, Z);
    S(this, K);
    S(this, He);
    S(this, Ce);
    S(this, je);
    S(this, he);
    S(this, De);
    S(this, Le);
    b(this, "render", (...t2) => (d(this, Ce) ?? x(this, Ce, (e2) => this.html(e2)), d(this, Ce).call(this, ...t2)));
    b(this, "setLayout", (t2) => x(this, He, t2));
    b(this, "getLayout", () => d(this, He));
    b(this, "setRenderer", (t2) => {
      x(this, Ce, t2);
    });
    b(this, "header", (t2, e2, n) => {
      this.finalized && x(this, K, new Response(d(this, K).body, d(this, K)));
      const r = d(this, K) ? d(this, K).headers : d(this, he) ?? x(this, he, new Headers());
      e2 === void 0 ? r.delete(t2) : n != null && n.append ? r.append(t2, e2) : r.set(t2, e2);
    });
    b(this, "status", (t2) => {
      x(this, $e, t2);
    });
    b(this, "set", (t2, e2) => {
      d(this, Q) ?? x(this, Q, /* @__PURE__ */ new Map()), d(this, Q).set(t2, e2);
    });
    b(this, "get", (t2) => d(this, Q) ? d(this, Q).get(t2) : void 0);
    b(this, "newResponse", (...t2) => O(this, ae, ye).call(this, ...t2));
    b(this, "body", (t2, e2, n) => O(this, ae, ye).call(this, t2, e2, n));
    b(this, "text", (t2, e2, n) => !d(this, he) && !d(this, $e) && !e2 && !n && !this.finalized ? new Response(t2) : O(this, ae, ye).call(this, t2, e2, tt(gn, n)));
    b(this, "json", (t2, e2, n) => O(this, ae, ye).call(this, JSON.stringify(t2), e2, tt("application/json", n)));
    b(this, "html", (t2, e2, n) => {
      const r = /* @__PURE__ */ __name((s) => O(this, ae, ye).call(this, s, e2, tt("text/html; charset=UTF-8", n)), "r");
      return typeof t2 == "object" ? Dt(t2, pn.Stringify, false, {}).then(r) : r(t2);
    });
    b(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    b(this, "notFound", () => (d(this, je) ?? x(this, je, () => new Response()), d(this, je).call(this, this)));
    x(this, Ne, t), e && (x(this, Z, e.executionCtx), this.env = e.env, x(this, je, e.notFoundHandler), x(this, Le, e.path), x(this, De, e.matchResult));
  }
  get req() {
    return d(this, Pe) ?? x(this, Pe, new Nt(d(this, Ne), d(this, Le), d(this, De))), d(this, Pe);
  }
  get event() {
    if (d(this, Z) && "respondWith" in d(this, Z))
      return d(this, Z);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, Z))
      return d(this, Z);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, K) || x(this, K, new Response(null, { headers: d(this, he) ?? x(this, he, new Headers()) }));
  }
  set res(t) {
    if (d(this, K) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of d(this, K).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const r = d(this, K).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of r)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, n);
    }
    x(this, K, t), this.finalized = true;
  }
  get var() {
    return d(this, Q) ? Object.fromEntries(d(this, Q)) : {};
  }
}, "Ct"), Ne = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), ye = /* @__PURE__ */ __name(function(t, e, n) {
  const r = d(this, K) ? new Headers(d(this, K).headers) : d(this, he) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const a = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [i, o] of a)
      i.toLowerCase() === "set-cookie" ? r.append(i, o) : r.set(i, o);
  }
  if (n)
    for (const [a, i] of Object.entries(n))
      if (typeof i == "string")
        r.set(a, i);
      else {
        r.delete(a);
        for (const o of i)
          r.append(a, o);
      }
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, $e);
  return new Response(t, { status: s, headers: r });
}, "ye"), Ct);
var N = "ALL";
var xn = "all";
var vn = ["get", "post", "put", "delete", "options", "patch"];
var Lt = "Can not add a route since the matcher is already built.";
var Bt = /* @__PURE__ */ __name(class extends Error {
}, "Bt");
var bn = "__COMPOSED_HANDLER";
var wn = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "wn");
var ht = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "ht");
var V;
var P;
var Ft;
var W;
var de;
var ze;
var qe;
var Oe;
var yn = (Oe = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    S(this, P);
    b(this, "get");
    b(this, "post");
    b(this, "put");
    b(this, "delete");
    b(this, "options");
    b(this, "patch");
    b(this, "all");
    b(this, "on");
    b(this, "use");
    b(this, "router");
    b(this, "getPath");
    b(this, "_basePath", "/");
    S(this, V, "/");
    b(this, "routes", []);
    S(this, W, wn);
    b(this, "errorHandler", ht);
    b(this, "onError", (e2) => (this.errorHandler = e2, this));
    b(this, "notFound", (e2) => (x(this, W, e2), this));
    b(this, "fetch", (e2, ...n) => O(this, P, qe).call(this, e2, n[1], n[0], e2.method));
    b(this, "request", (e2, n, r2, s2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, r2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${we("/", e2)}`, n), r2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(O(this, P, qe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...vn, xn].forEach((a) => {
      this[a] = (i, ...o) => (typeof i == "string" ? x(this, V, i) : O(this, P, de).call(this, a, d(this, V), i), o.forEach((l) => {
        O(this, P, de).call(this, a, d(this, V), l);
      }), this);
    }), this.on = (a, i, ...o) => {
      for (const l of [i].flat()) {
        x(this, V, l);
        for (const c of [a].flat())
          o.map((u) => {
            O(this, P, de).call(this, c.toUpperCase(), d(this, V), u);
          });
      }
      return this;
    }, this.use = (a, ...i) => (typeof a == "string" ? x(this, V, a) : (x(this, V, "*"), i.unshift(a)), i.forEach((o) => {
      O(this, P, de).call(this, N, d(this, V), o);
    }), this);
    const { strict: r, ...s } = e;
    Object.assign(this, s), this.getPath = r ?? true ? e.getPath ?? kt : un;
  }
  route(e, n) {
    const r = this.basePath(e);
    return n.routes.map((s) => {
      var i;
      let a;
      n.errorHandler === ht ? a = s.handler : (a = /* @__PURE__ */ __name(async (o, l) => (await dt([], n.errorHandler)(o, () => s.handler(o, l))).res, "a"), a[bn] = s.handler), O(i = r, P, de).call(i, s.method, s.path, a);
    }), this;
  }
  basePath(e) {
    const n = O(this, P, Ft).call(this);
    return n._basePath = we(this._basePath, e), n;
  }
  mount(e, n, r) {
    let s, a;
    r && (typeof r == "function" ? a = r : (a = r.optionHandler, r.replaceRequest === false ? s = /* @__PURE__ */ __name((l) => l, "s") : s = r.replaceRequest));
    const i = a ? (l) => {
      const c = a(l);
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
      const l = we(this._basePath, e), c = l === "/" ? 0 : l.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(c) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (l, c) => {
      const u = await n(s(l.req.raw), ...i(l));
      if (u)
        return u;
      await c();
    }, "o");
    return O(this, P, de).call(this, N, we(e, "*"), o), this;
  }
}, "Oe"), V = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakSet(), Ft = /* @__PURE__ */ __name(function() {
  const e = new Oe({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, x(e, W, d(this, W)), e.routes = this.routes, e;
}, "Ft"), W = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ __name(function(e, n, r) {
  e = e.toUpperCase(), n = we(this._basePath, n);
  const s = { basePath: this._basePath, path: n, method: e, handler: r };
  this.router.add(e, n, [r, s]), this.routes.push(s);
}, "de"), ze = /* @__PURE__ */ __name(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "ze"), qe = /* @__PURE__ */ __name(function(e, n, r, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await O(this, P, qe).call(this, e, n, r, "GET")))();
  const a = this.getPath(e, { env: r }), i = this.router.match(s, a), o = new mn(e, { path: a, matchResult: i, env: r, executionCtx: n, notFoundHandler: d(this, W) });
  if (i[0].length === 1) {
    let c;
    try {
      c = i[0][0][0][0](o, async () => {
        o.res = await d(this, W).call(this, o);
      });
    } catch (u) {
      return O(this, P, ze).call(this, u, o);
    }
    return c instanceof Promise ? c.then((u) => u || (o.finalized ? o.res : d(this, W).call(this, o))).catch((u) => O(this, P, ze).call(this, u, o)) : c ?? d(this, W).call(this, o);
  }
  const l = dt(i[0], this.errorHandler, d(this, W));
  return (async () => {
    try {
      const c = await l(o);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return O(this, P, ze).call(this, c, o);
    }
  })();
}, "qe"), Oe);
var Kt = [];
function En(t, e) {
  const n = this.buildAllMatchers(), r = /* @__PURE__ */ __name((s, a) => {
    const i = n[s] || n[N], o = i[2][a];
    if (o)
      return o;
    const l = a.match(i[0]);
    if (!l)
      return [[], Kt];
    const c = l.indexOf("", 1);
    return [i[1][c], l];
  }, "r");
  return this.match = r, r(t, e);
}
__name(En, "En");
var We = "[^/]+";
var Ae = ".*";
var Ie = "(?:|/.*)";
var Ee = Symbol();
var Sn = new Set(".\\+*[^]$()");
function $n(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Ae || t === Ie ? 1 : e === Ae || e === Ie ? -1 : t === We ? 1 : e === We ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name($n, "$n");
var fe;
var pe;
var Y;
var xe;
var Cn = (xe = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, fe);
    S(this, pe);
    S(this, Y, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, r, s, a) {
    if (e.length === 0) {
      if (d(this, fe) !== void 0)
        throw Ee;
      if (a)
        return;
      x(this, fe, n);
      return;
    }
    const [i, ...o] = e, l = i === "*" ? o.length === 0 ? ["", "", Ae] : ["", "", We] : i === "/*" ? ["", "", Ie] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (l) {
      const u = l[1];
      let h = l[2] || We;
      if (u && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw Ee;
      if (c = d(this, Y)[h], !c) {
        if (Object.keys(d(this, Y)).some((m) => m !== Ae && m !== Ie))
          throw Ee;
        if (a)
          return;
        c = d(this, Y)[h] = new xe(), u !== "" && x(c, pe, s.varIndex++);
      }
      !a && u !== "" && r.push([u, d(c, pe)]);
    } else if (c = d(this, Y)[i], !c) {
      if (Object.keys(d(this, Y)).some((u) => u.length > 1 && u !== Ae && u !== Ie))
        throw Ee;
      if (a)
        return;
      c = d(this, Y)[i] = new xe();
    }
    c.insert(o, n, r, s, a);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, Y)).sort($n).map((r) => {
      const s = d(this, Y)[r];
      return (typeof d(s, pe) == "number" ? `(${r})@${d(s, pe)}` : Sn.has(r) ? `\\${r}` : r) + s.buildRegExpStr();
    });
    return typeof d(this, fe) == "number" && n.unshift(`#${d(this, fe)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "xe"), fe = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), xe);
var Je;
var Be;
var jt;
var jn = (jt = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, Je, { varIndex: 0 });
    S(this, Be, new Cn());
  }
  insert(t, e, n) {
    const r = [], s = [];
    for (let i = 0; ; ) {
      let o = false;
      if (t = t.replace(/\{[^}]+\}/g, (l) => {
        const c = `@\\${i}`;
        return s[i] = [c, l], i++, o = true, c;
      }), !o)
        break;
    }
    const a = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = s.length - 1; i >= 0; i--) {
      const [o] = s[i];
      for (let l = a.length - 1; l >= 0; l--)
        if (a[l].indexOf(o) !== -1) {
          a[l] = a[l].replace(o, s[i][1]);
          break;
        }
    }
    return d(this, Be).insert(a, e, r, d(this, Je), n), r;
  }
  buildRegExp() {
    let t = d(this, Be).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], r = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, a, i) => a !== void 0 ? (n[++e] = Number(a), "$()") : (i !== void 0 && (r[Number(i)] = ++e), "")), [new RegExp(`^${t}`), n, r];
  }
}, "jt"), Je = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), jt);
var On = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ue = /* @__PURE__ */ Object.create(null);
function zt(t) {
  return Ue[t] ?? (Ue[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(zt, "zt");
function Rn() {
  Ue = /* @__PURE__ */ Object.create(null);
}
__name(Rn, "Rn");
function Tn(t) {
  var c;
  const e = new jn(), n = [];
  if (t.length === 0)
    return On;
  const r = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [m, $]) => u ? 1 : m ? -1 : h.length - $.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, m = r.length; u < m; u++) {
    const [$, j, A] = r[u];
    $ ? s[j] = [A.map(([f]) => [f, /* @__PURE__ */ Object.create(null)]), Kt] : h++;
    let v;
    try {
      v = e.insert(j, h, $);
    } catch (f) {
      throw f === Ee ? new Bt(j) : f;
    }
    $ || (n[h] = A.map(([f, g]) => {
      const y = /* @__PURE__ */ Object.create(null);
      for (g -= 1; g >= 0; g--) {
        const [C, p] = v[g];
        y[C] = p;
      }
      return [f, y];
    }));
  }
  const [a, i, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let m = 0, $ = n[u].length; m < $; m++) {
      const j = (c = n[u][m]) == null ? void 0 : c[1];
      if (!j)
        continue;
      const A = Object.keys(j);
      for (let v = 0, f = A.length; v < f; v++)
        j[A[v]] = o[j[A[v]]];
    }
  const l = [];
  for (const u in i)
    l[u] = n[i[u]];
  return [a, l, s];
}
__name(Tn, "Tn");
function be(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((r, s) => s.length - r.length))
      if (zt(n).test(e))
        return [...t[n]];
  }
}
__name(be, "be");
var ie;
var oe;
var Xe;
var qt;
var Ot;
var _n = (Ot = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, Xe);
    b(this, "name", "RegExpRouter");
    S(this, ie);
    S(this, oe);
    b(this, "match", En);
    x(this, ie, { [N]: /* @__PURE__ */ Object.create(null) }), x(this, oe, { [N]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const r = d(this, ie), s = d(this, oe);
    if (!r || !s)
      throw new Error(Lt);
    r[t] || [r, s].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[N]).forEach((c) => {
        l[t][c] = [...l[N][c]];
      });
    }), e === "/*" && (e = "*");
    const a = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = zt(e);
      t === N ? Object.keys(r).forEach((c) => {
        var u;
        (u = r[c])[e] || (u[e] = be(r[c], e) || be(r[N], e) || []);
      }) : (o = r[t])[e] || (o[e] = be(r[t], e) || be(r[N], e) || []), Object.keys(r).forEach((c) => {
        (t === N || t === c) && Object.keys(r[c]).forEach((u) => {
          l.test(u) && r[c][u].push([n, a]);
        });
      }), Object.keys(s).forEach((c) => {
        (t === N || t === c) && Object.keys(s[c]).forEach((u) => l.test(u) && s[c][u].push([n, a]));
      });
      return;
    }
    const i = Mt(e) || [e];
    for (let l = 0, c = i.length; l < c; l++) {
      const u = i[l];
      Object.keys(s).forEach((h) => {
        var m;
        (t === N || t === h) && ((m = s[h])[u] || (m[u] = [...be(r[h], u) || be(r[N], u) || []]), s[h][u].push([n, a - c + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, oe)).concat(Object.keys(d(this, ie))).forEach((e) => {
      t[e] || (t[e] = O(this, Xe, qt).call(this, e));
    }), x(this, ie, x(this, oe, void 0)), Rn(), t;
  }
}, "Ot"), ie = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakSet(), qt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let n = t === N;
  return [d(this, ie), d(this, oe)].forEach((r) => {
    const s = r[t] ? Object.keys(r[t]).map((a) => [a, r[t][a]]) : [];
    s.length !== 0 ? (n || (n = true), e.push(...s)) : t !== N && e.push(...Object.keys(r[N]).map((a) => [a, r[N][a]]));
  }), n ? Tn(e) : null;
}, "qt"), Ot);
var ce;
var ee;
var Rt;
var kn = (Rt = /* @__PURE__ */ __name(class {
  constructor(t) {
    b(this, "name", "SmartRouter");
    S(this, ce, []);
    S(this, ee, []);
    x(this, ce, t.routers);
  }
  add(t, e, n) {
    if (!d(this, ee))
      throw new Error(Lt);
    d(this, ee).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, ee))
      throw new Error("Fatal error");
    const n = d(this, ce), r = d(this, ee), s = n.length;
    let a = 0, i;
    for (; a < s; a++) {
      const o = n[a];
      try {
        for (let l = 0, c = r.length; l < c; l++)
          o.add(...r[l]);
        i = o.match(t, e);
      } catch (l) {
        if (l instanceof Bt)
          continue;
        throw l;
      }
      this.match = o.match.bind(o), x(this, ce, [o]), x(this, ee, void 0);
      break;
    }
    if (a === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i;
  }
  get activeRouter() {
    if (d(this, ee) || d(this, ce).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ce)[0];
  }
}, "Rt"), ce = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), Rt);
var ke = /* @__PURE__ */ Object.create(null);
var le;
var B;
var ge;
var Re;
var L;
var te;
var ue;
var Te;
var Mn = (Te = /* @__PURE__ */ __name(class {
  constructor(e, n, r) {
    S(this, te);
    S(this, le);
    S(this, B);
    S(this, ge);
    S(this, Re, 0);
    S(this, L, ke);
    if (x(this, B, r || /* @__PURE__ */ Object.create(null)), x(this, le, []), e && n) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: n, possibleKeys: [], score: 0 }, x(this, le, [s]);
    }
    x(this, ge, []);
  }
  insert(e, n, r) {
    x(this, Re, ++lt(this, Re)._);
    let s = this;
    const a = an(n), i = [];
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o], u = a[o + 1], h = ln(c, u), m = Array.isArray(h) ? h[0] : c;
      if (m in d(s, B)) {
        s = d(s, B)[m], h && i.push(h[1]);
        continue;
      }
      d(s, B)[m] = new Te(), h && (d(s, ge).push(h), i.push(h[1])), s = d(s, B)[m];
    }
    return d(s, le).push({ [e]: { handler: r, possibleKeys: i.filter((o, l, c) => c.indexOf(o) === l), score: d(this, Re) } }), s;
  }
  search(e, n) {
    var l;
    const r = [];
    x(this, L, ke);
    let a = [this];
    const i = _t(n), o = [];
    for (let c = 0, u = i.length; c < u; c++) {
      const h = i[c], m = c === u - 1, $ = [];
      for (let j = 0, A = a.length; j < A; j++) {
        const v = a[j], f = d(v, B)[h];
        f && (x(f, L, d(v, L)), m ? (d(f, B)["*"] && r.push(...O(this, te, ue).call(this, d(f, B)["*"], e, d(v, L))), r.push(...O(this, te, ue).call(this, f, e, d(v, L)))) : $.push(f));
        for (let g = 0, y = d(v, ge).length; g < y; g++) {
          const C = d(v, ge)[g], p = d(v, L) === ke ? {} : { ...d(v, L) };
          if (C === "*") {
            const H = d(v, B)["*"];
            H && (r.push(...O(this, te, ue).call(this, H, e, d(v, L))), x(H, L, p), $.push(H));
            continue;
          }
          const [R, q, z] = C;
          if (!h && !(z instanceof RegExp))
            continue;
          const I = d(v, B)[R], re = i.slice(c).join("/");
          if (z instanceof RegExp) {
            const H = z.exec(re);
            if (H) {
              if (p[q] = H[0], r.push(...O(this, te, ue).call(this, I, e, d(v, L), p)), Object.keys(d(I, B)).length) {
                x(I, L, p);
                const w = ((l = H[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (o[w] || (o[w] = [])).push(I);
              }
              continue;
            }
          }
          (z === true || z.test(h)) && (p[q] = h, m ? (r.push(...O(this, te, ue).call(this, I, e, p, d(v, L))), d(I, B)["*"] && r.push(...O(this, te, ue).call(this, d(I, B)["*"], e, p, d(v, L)))) : (x(I, L, p), $.push(I)));
        }
      }
      a = $.concat(o.shift() ?? []);
    }
    return r.length > 1 && r.sort((c, u) => c.score - u.score), [r.map(({ handler: c, params: u }) => [c, u])];
  }
}, "Te"), le = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakSet(), ue = /* @__PURE__ */ __name(function(e, n, r, s) {
  const a = [];
  for (let i = 0, o = d(e, le).length; i < o; i++) {
    const l = d(e, le)[i], c = l[n] || l[N], u = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), a.push(c), r !== ke || s && s !== ke))
      for (let h = 0, m = c.possibleKeys.length; h < m; h++) {
        const $ = c.possibleKeys[h], j = u[c.score];
        c.params[$] = s != null && s[$] && !j ? s[$] : r[$] ?? (s == null ? void 0 : s[$]), u[c.score] = true;
      }
  }
  return a;
}, "ue"), Te);
var me;
var Tt;
var An = (Tt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    S(this, me);
    x(this, me, new Mn());
  }
  add(t, e, n) {
    const r = Mt(e);
    if (r) {
      for (let s = 0, a = r.length; s < a; s++)
        d(this, me).insert(t, r[s], n);
      return;
    }
    d(this, me).insert(t, e, n);
  }
  match(t, e) {
    return d(this, me).search(t, e);
  }
}, "Tt"), me = /* @__PURE__ */ new WeakMap(), Tt);
var Ut = /* @__PURE__ */ __name(class extends yn {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new kn({ routers: [new _n(), new An()] });
  }
}, "Ut");
var In = /* @__PURE__ */ __name((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, r = ((a) => typeof a == "string" ? a === "*" ? () => a : (i) => a === i ? i : null : typeof a == "function" ? a : (i) => a.includes(i) ? i : null)(n.origin), s = ((a) => typeof a == "function" ? a : Array.isArray(a) ? () => a : () => [])(n.allowMethods);
  return async function(i, o) {
    var u;
    function l(h, m) {
      i.res.headers.set(h, m);
    }
    __name(l, "l");
    const c = await r(i.req.header("origin") || "", i);
    if (c && l("Access-Control-Allow-Origin", c), n.credentials && l("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), i.req.method === "OPTIONS") {
      n.origin !== "*" && l("Vary", "Origin"), n.maxAge != null && l("Access-Control-Max-Age", n.maxAge.toString());
      const h = await s(i.req.header("origin") || "", i);
      h.length && l("Access-Control-Allow-Methods", h.join(","));
      let m = n.allowHeaders;
      if (!(m != null && m.length)) {
        const $ = i.req.header("Access-Control-Request-Headers");
        $ && (m = $.split(/\s*,\s*/));
      }
      return m != null && m.length && (l("Access-Control-Allow-Headers", m.join(",")), i.res.headers.append("Vary", "Access-Control-Request-Headers")), i.res.headers.delete("Content-Length"), i.res.headers.delete("Content-Type"), new Response(null, { headers: i.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && i.header("Vary", "Origin", { append: true });
  };
}, "In");
var Nn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ft = /* @__PURE__ */ __name((t, e = Hn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, r = t.match(n);
  if (!r)
    return;
  let s = e[r[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ft");
var Pn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Hn = Pn;
var Dn = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), r = [];
  for (const s of n)
    s === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : s !== "." && r.push(s);
  return r.join("/") || ".";
}, "Dn");
var Gt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Ln = Object.keys(Gt);
var Bn = "index.html";
var Fn = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", n = t.path, r = t.join ?? Dn;
  return async (s, a) => {
    var u, h, m, $;
    if (s.finalized)
      return a();
    let i;
    if (t.path)
      i = t.path;
    else
      try {
        if (i = decodeURIComponent(s.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))
          throw new Error();
      } catch {
        return await ((u = t.onNotFound) == null ? void 0 : u.call(t, s.req.path, s)), a();
      }
    let o = r(e, !n && t.rewriteRequestPath ? t.rewriteRequestPath(i) : i);
    t.isDir && await t.isDir(o) && (o = r(o, Bn));
    const l = t.getContent;
    let c = await l(o, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const j = t.mimes && ft(o, t.mimes) || ft(o);
      if (s.header("Content-Type", j || "application/octet-stream"), t.precompressed && (!j || Nn.test(j))) {
        const A = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((v) => v.trim()));
        for (const v of Ln) {
          if (!A.has(v))
            continue;
          const f = await l(o + Gt[v], s);
          if (f) {
            c = f, s.header("Content-Encoding", v), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((m = t.onFound) == null ? void 0 : m.call(t, o, s)), s.body(c);
    }
    await (($ = t.onNotFound) == null ? void 0 : $.call(t, o, s)), await a();
  };
}, "Fn");
var Kn = /* @__PURE__ */ __name(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let r;
  e && e.namespace ? r = e.namespace : r = __STATIC_CONTENT;
  const s = n[t];
  if (!s)
    return null;
  const a = await r.get(s, { type: "stream" });
  return a || null;
}, "Kn");
var zn = /* @__PURE__ */ __name((t) => async function(n, r) {
  return Fn({ ...t, getContent: async (a) => Kn(a, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, r);
}, "zn");
var qn = /* @__PURE__ */ __name((t) => zn(t), "qn");
var X = new Ut();
var Ge = /* @__PURE__ */ new Map();
var Un = 1e3 * 60 * 60 * 24 * 7;
var nt = false;
function Vt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Vt, "Vt");
function J(t) {
  return t == null ? "" : String(t);
}
__name(J, "J");
function Ve(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Ve, "Ve");
function st(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(st, "st");
function at(t) {
  return st(t).length;
}
__name(at, "at");
function Gn(t) {
  const e = J(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Gn, "Gn");
function Vn(t) {
  const e = J(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Vn, "Vn");
function Wn(t) {
  const e = J(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Wn, "Wn");
function Yn(t) {
  const e = (t || "").replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  const n = [];
  let r = "", s = false;
  for (let a = 0; a < e.length; a++) {
    const i = e[a], o = e[a + 1];
    (i === '"' || i === '"' || i === '"') && (s = !s), r += i, !s && /[\.\?\!]/.test(i) && o === " " ? i === "." && r.endsWith("...") || (n.push(r.trim()), r = "", a++) : !s && /[다요죠]/.test(i) && o === " " && (n.push(r.trim()), r = "", a++);
  }
  return r.trim() && n.push(r.trim()), n.length ? n : [e];
}
__name(Yn, "Yn");
var Jn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var Xn = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function Qn(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    let r = false;
    for (const s of Xn)
      if (s.has(n)) {
        e.add(Array.from(s)[0]), r = true;
        break;
      }
    r || e.add(n);
  }
  return e;
}
__name(Qn, "Qn");
function Ye(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !Jn.has(e));
}
__name(Ye, "Ye");
function Zn(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t)
    for (const s of Ye(r))
      e.set(s, (e.get(s) || 0) + 1);
  return t.map((r, s) => {
    const a = Ye(r);
    let i = 0;
    for (const c of a)
      i += e.get(c) || 0;
    const o = r.length, l = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: r, score: i * l };
  });
}
__name(Zn, "Zn");
function er(t, e) {
  return Zn(t).slice().sort((s, a) => a.score - s.score).slice(0, Ve(e, 1, Math.max(1, t.length))).sort((s, a) => s.idx - a.idx).map((s) => s.s);
}
__name(er, "er");
function Wt(t) {
  return t === "brief" ? { min: 0.1, max: 0.15 } : t === "standard" ? { min: 0.25, max: 0.3 } : { min: 0.45, max: 0.55 };
}
__name(Wt, "Wt");
function tr(t, e) {
  const n = Math.max(50, at(t)), { min: r, max: s } = Wt(e);
  return { min: Math.floor(n * r), max: Math.ceil(n * s), base: n };
}
__name(tr, "tr");
function pt(t, e, n = 24) {
  const r = st(t), s = st(e);
  if (r.length < n || s.length < n)
    return false;
  const a = /* @__PURE__ */ new Set();
  for (let i = 0; i <= r.length - n; i += 2)
    a.add(r.slice(i, i + n));
  for (let i = 0; i <= s.length - n; i += 2)
    if (a.has(s.slice(i, i + n)))
      return true;
  return false;
}
__name(pt, "pt");
function gt(t, e) {
  const n = /(숲|산림|삼림).*(정의|의미|집합체|생태학)/.test(e), r = /(치유|안정|여유|안식|힐링|교육|가치|발달)/.test(e), s = /(숲\s*체험|체험\s*활동|오감|놀이\s*중심)/.test(e);
  return n && r && s;
}
__name(gt, "gt");
function it(t) {
  let e = (t || "").trim();
  return e = e.replace(/모\s+든/g, "\uBAA8\uB4E0"), e = e.replace(/기\s+회/g, "\uAE30\uD68C"), e = e.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), e = e.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), e = e.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), e = e.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), e = e.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), e = e.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), e = e.replace(/\s*\.\s*/g, ". "), e = e.replace(/\s*,\s*/g, ", "), e = e.replace(/\s*;\s*/g, "; "), e = e.replace(/[ ]{2,}/g, " "), e = e.replace(/\n{3,}/g, `

`), e.trim();
}
__name(it, "it");
function nr() {
  return `
\uB108\uB294 \uD55C\uAD6D\uC5B4 \uD559\uC220 \uD14D\uC2A4\uD2B8 \uC694\uC57D \uC5D4\uC9C4\uC774\uB2E4.
\uC808\uB300 \uADDC\uCE59:
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4/\uC8FC\uC7A5/\uC778\uACFC/\uC218\uCE58/\uC5F0\uAD6C\uACB0\uACFC\uB97C \uCD94\uAC00\uD558\uC9C0 \uB9C8\uB77C.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uCC38\uACE0\uBB38\uD5CC(\uC800\uC790, \uC5F0\uB3C4)\uC744 \uC0C8\uB85C \uB9CC\uB4E4\uC9C0 \uB9C8\uB77C.
- \uC694\uC57D\uC740 "\uCD94\uCD9C\uD615 \uBCF5\uBD99"\uC774 \uC544\uB2C8\uB77C, \uC758\uBBF8\uB97C \uC720\uC9C0\uD55C "\uC11C\uC220\uD615 \uC7AC\uAD6C\uC131"\uC774\uC5B4\uC57C \uD55C\uB2E4.
- \uB3D9\uC77C\uD55C \uD45C\uD604\uC744 \uAE38\uAC8C \uBCF5\uC0AC\uD558\uC9C0 \uB9C8\uB77C(\uC5F0\uC18D \uBB38\uAD6C \uBCF5\uC0AC \uAE08\uC9C0).
- \uBB38\uC7A5\uC740 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uC5F0\uACB0\uC5B4\uB85C \uB9E4\uB044\uB7FD\uAC8C \uC774\uC5B4\uB77C.
- \uACFC\uC7A5 \uD45C\uD604/\uB2E8\uC815(\uBC18\uB4DC\uC2DC/\uD56D\uC0C1/\uC644\uBCBD\uD788)\uC744 \uD53C\uD558\uB77C.
\uCD9C\uB825\uC740 \uC624\uC9C1 \uC694\uC57D \uBCF8\uBB38\uB9CC. \uC81C\uBAA9/\uBA38\uB9AC\uB9D0/\uBAA9\uB85D \uAE30\uD638/\uBA54\uD0C0\uC124\uBA85 \uAE08\uC9C0.
`.trim();
}
__name(nr, "nr");
function mt(t, e) {
  const n = Wt(e), r = e === "brief" ? "\uAC04\uB2E8 \uC11C\uC220 \uC694\uC57D: \uC815\uC758(\uC232\uC774 \uBB34\uC5C7\uC778\uC9C0) + \uC758\uBBF8/\uAE30\uB2A5(\uCE58\uC720\xB7\uAD50\uC721 \uAC00\uCE58) + \uC232 \uCCB4\uD5D8 \uD65C\uB3D9 \uAC1C\uB150(\uBB34\uC5C7\uC778\uC9C0)\uC744 \uBAA8\uB450 1\uBB38\uB2E8\uC73C\uB85C \uD3EC\uD568\uD558\uB77C." : e === "standard" ? "\uD45C\uC900 \uC11C\uC220 \uC694\uC57D: \uC815\uC758/\uC758\uBBF8/\uC232 \uCCB4\uD5D8 \uD65C\uB3D9 \uAC1C\uB150/\uBC1C\uB2EC \uC601\uD5A5/\uAD50\uC721\uC801 \uAC00\uCE58\uC758 \uADE0\uD615\uC744 \uAC16\uCD94\uC5B4 2~4\uBB38\uB2E8\uC73C\uB85C \uC11C\uC220\uD558\uB77C." : "\uC0C1\uC138 \uC11C\uC220 \uC694\uC57D: \uC6D0\uBB38\uC758 \uD750\uB984\uC744 \uC720\uC9C0\uD558\uB418 \uC911\uBCF5\uC744 \uC904\uC774\uACE0 \uC5F0\uACB0\uC5B4\uB97C \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uD558\uC5EC 4~7\uBB38\uB2E8\uC73C\uB85C \uC11C\uC220\uD558\uB77C.";
  return `
[\uC694\uC57D \uBAA8\uB4DC] ${e}
[\uC694\uC57D\uC728] \uC6D0\uBB38(\uACF5\uBC31 \uC81C\uC678) \uB300\uBE44 ${(n.min * 100).toFixed(0)}~${(n.max * 100).toFixed(0)}% \uBC94\uC704

[\uC791\uC131 \uC9C0\uCE68]
- ${r}
- \uC6D0\uBB38\uC5D0 \uC788\uB294 \uAC1C\uB150/\uC815\uC758/\uD6A8\uACFC\uB9CC \uC0AC\uC6A9\uD558\uACE0, \uD45C\uD604\uC740 \uC0C8\uB86D\uAC8C \uC7AC\uAD6C\uC131\uD558\uB77C.
- \uC778\uC6A9(\uC800\uC790, \uC5F0\uB3C4)\uC740 \uC6D0\uBB38\uC5D0 \uC788\uB294 \uAC83\uB9CC \uC720\uC9C0\uD558\uB418, \uD544\uC694 \uC5C6\uB294 \uACFC\uB2E4 \uC778\uC6A9\uC740 \uC904\uC5ECra.

[\uC6D0\uBB38]
${t}
`.trim();
}
__name(mt, "mt");
var rr = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function xt(t) {
  const e = { definition: 0, meaning: 0, activity: 0 };
  for (const [r, s] of Object.entries(rr))
    for (const a of s)
      t.includes(a) && e[r]++;
  const n = Math.max(e.definition, e.meaning, e.activity);
  return n === 0 ? null : e.definition === n ? "definition" : e.meaning === n ? "meaning" : "activity";
}
__name(xt, "xt");
function sr(t, e, n) {
  const r = e.length, s = [], a = /* @__PURE__ */ new Set(), i = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = i.exec(e)) !== null; )
    a.add(o[1]);
  for (const f of t) {
    const g = [];
    let y;
    const C = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (y = C.exec(f)) !== null; ) {
      const q = y[1];
      a.has(q) && g.push(q);
    }
    let p = f.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (p.length < 10)
      continue;
    const R = Ye(p).slice(0, 8);
    s.push({ original: f, clean: p, keywords: R, citations: g }), p.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", p.slice(0, 100));
  }
  if (s.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const l = /* @__PURE__ */ new Map();
  for (const f of s)
    for (const g of f.keywords)
      l.set(g, (l.get(g) || 0) + 1);
  const c = [];
  for (const f of s) {
    new Set(f.keywords);
    let g = false;
    for (const y of c)
      if (f.keywords.filter((p) => y.keywords.has(p)).length >= 2) {
        y.sentences.push({ clean: f.clean, citations: f.citations }), f.keywords.forEach((p) => y.keywords.add(p)), g = true;
        break;
      }
    g || c.push({ keywords: new Set(f.keywords), sentences: [{ clean: f.clean, citations: f.citations }] });
  }
  const u = c.map((f) => {
    const g = f.sentences[0].clean, y = s.findIndex((C) => C.clean === g);
    return { ...f, originalIdx: y };
  });
  let h = "";
  if (n === "brief") {
    const f = { definition: [], meaning: [], activity: [] };
    for (const w of u)
      for (const E of w.sentences) {
        const T = xt(E.clean);
        T && f[T].push(E);
      }
    const g = f.definition[0], y = f.meaning[0], C = f.activity[0], p = [], R = [];
    if (g && (p.push(g.clean), R.push(...g.citations.filter(Boolean))), y && (p.push(y.clean), R.push(...y.citations.filter(Boolean))), C && (p.push(C.clean), R.push(...C.citations.filter(Boolean))), p.length === 0) {
      const E = u.sort((T, D) => D.sentences.length - T.sentences.length)[0].sentences[0];
      p.push(E.clean), R.push(...E.citations.filter(Boolean));
    }
    const q = Array.from(new Set(R)), z = q.length > 0 ? `(${q.join("; ")})` : "", I = p.map((w) => {
      let E = w;
      for (; E.includes("("); )
        E = E.replace(/\([^)]*\)/g, "");
      return E.trim();
    });
    I.length === 1 ? h = `${I[0]}${z}.` : I.length === 2 ? h = `${I[0]}. ${I[1]}${z}.` : h = `${I[0]}\uD558\uBA70 ${I[1]}. ${I[2]}${z}.`;
    const re = h.length / r * 100;
    if (re > 15) {
      let w = h.slice(0, 60);
      for (; w.includes("("); )
        w = w.replace(/\([^)]*\)/g, "");
      h = w.trim() + (z ? ` ${z}.` : ".");
    }
    const H = [];
    return g && H.push("definition"), y && H.push("meaning"), C && H.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: H, sentenceCount: p.length, compressionRatio: (h.length / r * 100).toFixed(1) + "%", passed: re <= 15 }), h;
  }
  if (n === "standard") {
    const f = u.sort((w, E) => E.sentences.length - w.sentences.length).slice(0, 3).sort((w, E) => w.originalIdx - E.originalIdx);
    if (f.length === 1) {
      const w = f[0].sentences[0], E = f[0].sentences.flatMap((D) => D.citations).filter(Boolean), T = E.length > 0 ? `(${E.join("; ")})` : "";
      return `${w.clean}${T}.`;
    }
    const g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), C = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const w of f)
      for (const E of w.sentences) {
        const T = E.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (T) {
          let [, D, Fe] = T;
          D = D.replace(/[에게서로부터]$/g, "").trim(), g.has(D) || g.set(D, []);
          let F = Fe.trim();
          F = F.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [M, _e] of Object.entries(C))
            if (F.includes(M)) {
              const ve = y.get(M) || 0;
              if (y.set(M, ve + 1), ve >= 1 && _e.length > 0) {
                const Qe = Math.min(ve - 1, _e.length - 1);
                F = F.replace(M, _e[Qe]);
              }
            }
          const _ = new Set(Ye(F)), k = Qn(_), G = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const M of G)
            k.delete(M);
          g.get(D).push({ original: F, keywords: k, citations: E.citations });
        }
      }
    const p = [];
    for (const [w, E] of g.entries()) {
      const T = E.flatMap((_) => _.citations).filter(Boolean), D = w.charAt(w.length - 1), F = /[가-힣]/.test(D) && (D.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (E.length === 1) {
        const _ = E[0].original, k = (_.match(/,/g) || []).length;
        if (_.length > 80 && k >= 2) {
          const G = _.split(",").map((M) => M.trim()).filter((M) => M.length > 0);
          if (G.length >= 2) {
            p.push({ text: `${w}${F} ${G[0]}`, citations: [] });
            for (let M = 1; M < G.length - 1; M++)
              p.push({ text: `${G[M]}`, citations: [] });
            p.push({ text: `${G[G.length - 1]}`, citations: E[0].citations });
          } else
            p.push({ text: `${w}${F} ${_}`, citations: T });
        } else
          p.push({ text: `${w}${F} ${_}`, citations: T });
      } else {
        const _ = [];
        for (const k of E) {
          let G = false;
          for (const M of _) {
            const _e = Array.from(k.keywords).filter((Qe) => M.keywords.has(Qe)).length, ve = Math.max(k.keywords.size, M.keywords.size);
            if (ve > 0 && _e / ve >= 0.8) {
              k.original.length > M.original.length && (M.original = k.original, M.keywords = k.keywords), M.citations.push(...k.citations), G = true;
              break;
            }
          }
          G || _.push({ original: k.original, keywords: k.keywords, citations: [...k.citations] });
        }
        if (_.length === 1)
          p.push({ text: `${w}${F} ${_[0].original}`, citations: _.flatMap((k) => k.citations) });
        else if (_.length === 2)
          p.push({ text: `${w}${F} ${_[0].original}`, citations: _[0].citations }), p.push({ text: `${w}${F} ${_[1].original}`, citations: _[1].citations });
        else
          for (let k = 0; k < _.length; k++)
            p.push({ text: `${w}${F} ${_[k].original}`, citations: _[k].citations });
      }
    }
    if (p.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (p.length === 1) {
      const w = p[0].citations.filter(Boolean), E = w.length > 0 ? `(${w.join("; ")})` : "";
      return `${p[0].text}${E}.`;
    }
    if (p.length === 2) {
      const w = p[0].citations.filter(Boolean), E = p[1].citations.filter(Boolean), T = w.length > 0 ? `(${w.join("; ")})` : "", D = E.length > 0 ? `(${E.join("; ")})` : "";
      return `${p[0].text}${T}. ${p[1].text}${D}.`;
    }
    const R = [], q = p[0], z = q.citations.filter(Boolean), I = z.length > 0 ? `(${z.join("; ")})` : "";
    if (R.push(`${q.text}${I}.`), p.length >= 2) {
      const w = p[1], E = w.citations.filter(Boolean), T = E.length > 0 ? `(${E.join("; ")})` : "";
      R.push(`${w.text}${T}.`);
    }
    if (p.length >= 3) {
      const E = p.slice(2).map((T) => {
        const D = T.citations.filter(Boolean), Fe = D.length > 0 ? `(${D.join("; ")})` : "";
        return `${T.text}${Fe}.`;
      });
      R.push(E.join(" "));
    }
    h = R.join(`

`);
    const re = h.length / r * 100;
    re > 30 && (R.length > 3 ? h = R.slice(0, 3).join(`

`) : h = R.join(`

`));
    const H = [];
    for (const w of f)
      for (const E of w.sentences) {
        const T = xt(E.clean);
        T && !H.includes(T) && H.push(T);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: H, sentenceCount: p.length, paragraphCount: R.length, compressionRatio: (h.length / r * 100).toFixed(1) + "%", passed: re >= 25 && re <= 30 }), h;
  }
  const m = u.sort((f, g) => g.sentences.length - f.sentences.length).slice(0, 5).sort((f, g) => f.originalIdx - g.originalIdx);
  let $ = m.map((f, g) => {
    const y = f.sentences[0], C = f.sentences.flatMap((R) => R.citations).filter(Boolean), p = C.length > 0 ? `(${C.join("; ")})` : "";
    return g === 0 ? `${y.clean}${p}.` : g === m.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${y.clean}${p}.` : `\uB610\uD55C ${y.clean}${p}.`;
  }).join(" ");
  return $.length / r * 100 > (n === "brief" ? 15 : n === "standard" ? 30 : 55) && n === "detail" ? m.slice(0, 3).map((g, y) => {
    const C = g.sentences[0], p = g.sentences.flatMap((q) => q.citations).filter(Boolean), R = p.length > 0 ? `(${p.join("; ")})` : "";
    return y === 0 ? `${C.clean}${R}.` : y === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${C.clean}${R}.` : `\uB610\uD55C ${C.clean}${R}.`;
  }).join(" ") : $;
}
__name(sr, "sr");
function ar(t, e, n) {
  const r = Yn(t), s = e === "brief" ? Ve(Math.round(r.length * 0.18), 2, 4) : e === "standard" ? Ve(Math.round(r.length * 0.28), 4, 8) : Ve(Math.round(r.length * 0.4), 7, 14), a = er(r, s);
  if (n === "narrative") {
    let o = sr(a, t, e);
    return o = it(o), { kind: "summary", mode: e, viewType: n, narrative: o };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((o, l) => `- (${l + 1}) ${o}`) } };
  if (n === "mindmap") {
    const o = (a[0] || r[0] || "\uD575\uC2EC").slice(0, 40), l = [{ id: "c", label: o, level: 0 }], c = [];
    return a.slice(1).forEach((u, h) => {
      const m = `n${h + 1}`;
      l.push({ id: m, label: u.slice(0, 60), level: 1 }), c.push({ from: "c", to: m });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: o, nodes: l, edges: c } };
  }
  const i = a.map((o, l) => ({ id: `q${l + 1}`, type: "short", question: `(${l + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${o.slice(0, 70)}"`, answerHint: o }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: i } };
}
__name(ar, "ar");
function Yt(t) {
  if (!t)
    return "empty";
  let e = 2166136261, n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t.charCodeAt(a);
    e ^= i, e += (e << 1) + (e << 4) + (e << 7) + (e << 8) + (e << 24), n = (n << 5) - n + i, n |= 0;
  }
  const r = (e >>> 0).toString(16), s = (Math.abs(n) >>> 0).toString(16);
  return `${t.length.toString(16)}_${r}_${s}`;
}
__name(Yt, "Yt");
function ir(t, e, n, r) {
  const s = Yt(n);
  return `${t}::${r || "anon"}::${e}::base::${s}`;
}
__name(ir, "ir");
function or(t, e, n, r, s) {
  const a = Yt(r);
  return `${t}::${s || "anon"}::${e}::${n}::${a}`;
}
__name(or, "or");
async function cr(t) {
  if (!nt) {
    if (!t) {
      nt = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), nt = true;
  }
}
__name(cr, "cr");
async function vt(t, e) {
  const n = Date.now(), r = Ge.get(e);
  if (r && n - r.createdAt < Un)
    return { hit: true, data: r.data, store: "mem" };
  if (r && Ge.delete(e), !t)
    return { hit: false };
  const s = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const a = JSON.parse(s.response_json);
    return Ge.set(e, { data: a, createdAt: n }), { hit: true, data: a, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(vt, "vt");
async function Me(t, e, n, r) {
  const s = Date.now();
  Ge.set(e, { data: r, createdAt: s }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(r), Vt()).run();
}
__name(Me, "Me");
function bt(t) {
  const e = t.split(/\n\n+/).filter((r) => r.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((r, s) => `- (${s + 1}) ${r}`) : t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r, s) => `- (${s + 1}) ${r}.`) } };
}
__name(bt, "bt");
function wt(t) {
  const e = t.split(/[\.。]\s+/).filter((a) => a.trim()).map((a) => a.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), r = [{ id: "c", label: n, level: 0 }], s = [];
  return e.slice(1).forEach((a, i) => {
    const o = `n${i + 1}`;
    r.push({ id: o, label: a.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: r, edges: s } };
}
__name(wt, "wt");
function yt(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((r) => r.trim()).map((r) => r.trim()).map((r, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${r.slice(0, 70)}"`, answerHint: r })) } };
}
__name(yt, "yt");
async function Et(t, e, n) {
  var c, u, h, m, $;
  const r = J(t.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const s = J(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", a = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`, i = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, l = 500;
  for (; o < 3; ) {
    o++;
    const j = await fetch(a, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (j.ok) {
      const v = await j.json();
      return (($ = (m = (h = (u = (c = v == null ? void 0 : v.candidates) == null ? void 0 : c[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : m[0]) == null ? void 0 : $.text) ?? "";
    }
    if (j.status === 429 || j.status === 503) {
      await new Promise((v) => setTimeout(v, l)), l *= 2;
      continue;
    }
    const A = await j.text().catch(() => "");
    throw new Error(`Gemini error ${j.status}: ${A.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Et, "Et");
async function lr(t, e, n) {
  const { min: r, max: s } = tr(e, n), a = nr();
  let i = "";
  for (let o = 1; o <= 3; o++) {
    const l = mt(e, n);
    let c = await Et(t, a, l);
    c = it(c);
    const u = at(c), h = u >= r && u <= s, m = pt(e, c, 24), $ = n === "detail" ? true : gt(e, c);
    if (h && !m && $)
      return console.log(`[Enforced Summary] mode=${n}, len=${u}, attempt=${o}, \u2705 PASS`), c;
    const j = [h ? "" : u < r ? `\uAE38\uC774\uAC00 \uB108\uBB34 \uC9E7\uB2E4. \uACF5\uBC31 \uC81C\uC678 \uAE00\uC790 \uC218\uB97C ${r}~${s}\uC790\uB85C \uB298\uB824\uB77C.` : `\uAE38\uC774\uAC00 \uB108\uBB34 \uAE38\uB2E4. \uACF5\uBC31 \uC81C\uC678 \uAE00\uC790 \uC218\uB97C ${r}~${s}\uC790\uB85C \uC904\uC5EC\uB77C.`, m ? "\uC6D0\uBB38 \uD45C\uD604\uC744 \uAE38\uAC8C \uBCF5\uC0AC\uD588\uB2E4. \uAC19\uC740 \uD45C\uD604\uC744 \uD53C\uD558\uACE0 \uC11C\uC220\uD615\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C." : "", $ ? "" : "\uC815\uC758/\uC758\uBBF8/\uCCB4\uD5D8\uD65C\uB3D9 \uAC1C\uB150 3\uC694\uC18C\uB97C \uBAA8\uB450 \uD3EC\uD568\uD558\uB77C."].filter(Boolean).join(" ");
    i = c, console.log(`[Enforced Summary] mode=${n}, len=${u}, attempt=${o}, \u274C RETRY: ${j}`);
    const A = `
${mt(e, n)}

[\uCD94\uAC00 \uC218\uC815 \uC9C0\uC2DC]
${j}
- \uACB0\uACFC\uB294 \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uD55C\uAD6D\uC5B4 \uBB38\uC7A5\uC73C\uB85C\uB9CC \uCD9C\uB825\uD558\uB77C.
`.trim();
    let v = await Et(t, a, A);
    v = it(v);
    const f = at(v), g = f >= r && f <= s, y = pt(e, v, 24), C = n === "detail" ? true : gt(e, v);
    if (g && !y && C)
      return console.log(`[Enforced Summary] mode=${n}, len=${f}, attempt=${o}.retry, \u2705 PASS`), v;
    i = v;
  }
  return console.warn(`[Enforced Summary] mode=${n}, \u26A0\uFE0F 3\uD68C \uC2E4\uD328, \uB9C8\uC9C0\uB9C9 \uACB0\uACFC \uBC18\uD658`), i || "";
}
__name(lr, "lr");
var dr = `/* MindStory Engine Bundle (compat) */
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
X.use("/api/*", In());
X.get("/static/ms-engine-bundle.js", (t) => t.text(dr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
X.get("/favicon.ico", (t) => t.body(null, 204));
X.use("/static/*", qn({ root: "./public" }));
X.get("/", (t) => t.html(`<!DOCTYPE html>
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
X.get("/api/health", (t) => {
  const e = !!J(t.env.GEMINI_API_KEY).trim(), n = J(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Vt(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
X.post("/api/engine", async (t) => {
  var v, f;
  const e = Date.now(), n = t.env.DB;
  await cr(n);
  let r = null;
  try {
    r = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Wn(r == null ? void 0 : r.kind), a = J((r == null ? void 0 : r.text) || ""), i = Gn((r == null ? void 0 : r.mode) || (r == null ? void 0 : r.level)), o = Vn((r == null ? void 0 : r.viewType) || (r == null ? void 0 : r.displayMode)), l = J(((v = r == null ? void 0 : r.options) == null ? void 0 : v.userId) || (r == null ? void 0 : r.userId) || "anon");
  if (!a.trim() || a.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const c = or(s, i, o, a, l || null), u = await vt(n, c);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = ir(s, i, a, l || null), m = await vt(n, h);
  if (m.hit && ((f = m.data) != null && f.narrative)) {
    const g = m.data.narrative;
    let y;
    return o === "narrative" ? y = { kind: s, mode: i, viewType: o, narrative: g } : o === "structured" ? y = { kind: s, mode: i, ...bt(g) } : o === "mindmap" ? y = { kind: s, mode: i, ...wt(g) } : y = { kind: s, mode: i, ...yt(g) }, await Me(n, c, l || "anon", y), t.json({ ok: true, data: y, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const $ = !!J(t.env.GEMINI_API_KEY).trim(), j = J(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && $ && !j)
    try {
      const g = await lr(t.env, a, i), y = { kind: s, mode: i, viewType: "narrative", narrative: g };
      await Me(n, h, l || "anon", y);
      let C;
      return o === "narrative" ? C = y : o === "structured" ? C = { kind: s, mode: i, ...bt(g) } : o === "mindmap" ? C = { kind: s, mode: i, ...wt(g) } : C = { kind: s, mode: i, ...yt(g) }, await Me(n, c, l || "anon", C), t.json({ ok: true, data: C, meta: { cached: false, engine: "gemini-enforced", elapsedMs: Date.now() - e } }, 200);
    } catch (g) {
      console.error("[Gemini Enforced Error]", g);
    }
  const A = ar(a, i, o);
  if (await Me(n, c, l || "anon", A), A.narrative) {
    const g = { kind: "summary", mode: i, viewType: "narrative", narrative: A.narrative };
    await Me(n, h, l || "anon", g);
  }
  return t.json({ ok: true, data: A, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
X.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
X.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var St = new Ut();
var ur = Object.assign({ "/src/index.tsx": X });
var Jt = false;
for (const [, t] of Object.entries(ur))
  t && (St.route("/", t), St.notFound(t.notFoundHandler), Jt = true);
if (!Jt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");

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

// ../.wrangler/tmp/bundle-BEUcCD/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = St;

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

// ../.wrangler/tmp/bundle-BEUcCD/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.8681094753460328.mjs.map
