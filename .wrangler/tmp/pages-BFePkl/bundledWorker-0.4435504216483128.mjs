var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-eNZEaN/checked-fetch.js
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

// ../.wrangler/tmp/bundle-eNZEaN/strip-cf-connecting-ip-header.js
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
var Vt = Object.defineProperty;
var ot = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "ot");
var Wt = /* @__PURE__ */ __name((e, t, r) => t in e ? Vt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Wt");
var b = /* @__PURE__ */ __name((e, t, r) => Wt(e, typeof t != "symbol" ? t + "" : t, r), "b");
var Ze = /* @__PURE__ */ __name((e, t, r) => t.has(e) || ot("Cannot " + r), "Ze");
var d = /* @__PURE__ */ __name((e, t, r) => (Ze(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var E = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? ot("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "E");
var v = /* @__PURE__ */ __name((e, t, r, n) => (Ze(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "v");
var j = /* @__PURE__ */ __name((e, t, r) => (Ze(e, t, "access private method"), r), "j");
var ct = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  v(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "ct");
var lt = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let c, l = false, u;
    if (e[o] ? (u = e[o][0][0], n.req.routeIndex = o) : u = o === e.length && s || void 0, u)
      try {
        c = await u(n, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, c = await t(h, n), l = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || l) && (n.res = c), n;
  }
  __name(a, "a");
}, "lt");
var Yt = Symbol();
var Jt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof Mt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Xt(e, { all: r, dot: n }) : {};
}, "Jt");
async function Xt(e, t) {
  const r = await e.formData();
  return r ? Qt(r, t) : {};
}
__name(Xt, "Xt");
function Qt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Zt(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (en(r, n, s), delete r[n]);
  }), r;
}
__name(Qt, "Qt");
var Zt = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Zt");
var en = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "en");
var Tt = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Tt");
var tn = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = nn(e), n = Tt(r);
  return rn(n, t);
}, "tn");
var nn = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "nn");
var rn = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "rn");
var ze = {};
var sn = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return ze[n] || (r[2] ? ze[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : ze[n] = [e, r[1], true]), ze[n];
  }
  return null;
}, "sn");
var at = /* @__PURE__ */ __name((e, t) => {
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
}, "at");
var an = /* @__PURE__ */ __name((e) => at(e, decodeURI), "an");
var Ot = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return an(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Ot");
var on = /* @__PURE__ */ __name((e) => {
  const t = Ot(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "on");
var ye = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = ye(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "ye");
var Rt = /* @__PURE__ */ __name((e) => {
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
}, "Rt");
var et = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? at(e, _t) : e) : e, "et");
var kt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const o = e.charCodeAt(a + t.length + 1);
      if (o === 61) {
        const c = a + t.length + 2, l = e.indexOf("&", c);
        return et(e.slice(c, l === -1 ? void 0 : l));
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
    let c = e.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (c = et(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = e.slice(o + 1, a === -1 ? void 0 : a), n && (l = et(l))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(l)) : s[c] ?? (s[c] = l);
  }
  return t ? s[t] : s;
}, "kt");
var cn = kt;
var ln = /* @__PURE__ */ __name((e, t) => kt(e, t, true), "ln");
var _t = decodeURIComponent;
var dt = /* @__PURE__ */ __name((e) => at(e, _t), "dt");
var Ce;
var U;
var ne;
var At;
var It;
var rt;
var se;
var yt;
var Mt = (yt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    E(this, ne);
    b(this, "raw");
    E(this, Ce);
    E(this, U);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    E(this, se, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, v(this, U, r), v(this, Ce, {});
  }
  param(e) {
    return e ? j(this, ne, At).call(this, e) : j(this, ne, It).call(this);
  }
  query(e) {
    return cn(this.url, e);
  }
  queries(e) {
    return ln(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Jt(this, e));
  }
  json() {
    return d(this, se).call(this, "text").then((e) => JSON.parse(e));
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
  addValidatedData(e, t) {
    d(this, Ce)[e] = t;
  }
  valid(e) {
    return d(this, Ce)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Yt]() {
    return d(this, U);
  }
  get matchedRoutes() {
    return d(this, U)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, U)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "yt"), Ce = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), At = /* @__PURE__ */ __name(function(e) {
  const t = d(this, U)[0][this.routeIndex][1][e], r = j(this, ne, rt).call(this, t);
  return r && /\%/.test(r) ? dt(r) : r;
}, "At"), It = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(d(this, U)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = j(this, ne, rt).call(this, d(this, U)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? dt(n) : n);
  }
  return e;
}, "It"), rt = /* @__PURE__ */ __name(function(e) {
  return d(this, U)[1] ? d(this, U)[1][e] : e;
}, "rt"), se = /* @__PURE__ */ new WeakMap(), yt);
var dn = { Stringify: 1 };
var Nt = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((o) => o({ phase: t, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Nt(c, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Nt");
var un = "text/plain; charset=UTF-8";
var tt = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "tt");
var Pe;
var He;
var Q;
var je;
var Z;
var K;
var De;
var Te;
var Oe;
var fe;
var Le;
var Be;
var ie;
var Ee;
var Et;
var hn = (Et = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    E(this, ie);
    E(this, Pe);
    E(this, He);
    b(this, "env", {});
    E(this, Q);
    b(this, "finalized", false);
    b(this, "error");
    E(this, je);
    E(this, Z);
    E(this, K);
    E(this, De);
    E(this, Te);
    E(this, Oe);
    E(this, fe);
    E(this, Le);
    E(this, Be);
    b(this, "render", (...e2) => (d(this, Te) ?? v(this, Te, (t2) => this.html(t2)), d(this, Te).call(this, ...e2)));
    b(this, "setLayout", (e2) => v(this, De, e2));
    b(this, "getLayout", () => d(this, De));
    b(this, "setRenderer", (e2) => {
      v(this, Te, e2);
    });
    b(this, "header", (e2, t2, r) => {
      this.finalized && v(this, K, new Response(d(this, K).body, d(this, K)));
      const n = d(this, K) ? d(this, K).headers : d(this, fe) ?? v(this, fe, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    b(this, "status", (e2) => {
      v(this, je, e2);
    });
    b(this, "set", (e2, t2) => {
      d(this, Q) ?? v(this, Q, /* @__PURE__ */ new Map()), d(this, Q).set(e2, t2);
    });
    b(this, "get", (e2) => d(this, Q) ? d(this, Q).get(e2) : void 0);
    b(this, "newResponse", (...e2) => j(this, ie, Ee).call(this, ...e2));
    b(this, "body", (e2, t2, r) => j(this, ie, Ee).call(this, e2, t2, r));
    b(this, "text", (e2, t2, r) => !d(this, fe) && !d(this, je) && !t2 && !r && !this.finalized ? new Response(e2) : j(this, ie, Ee).call(this, e2, t2, tt(un, r)));
    b(this, "json", (e2, t2, r) => j(this, ie, Ee).call(this, JSON.stringify(e2), t2, tt("application/json", r)));
    b(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => j(this, ie, Ee).call(this, s, t2, tt("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Nt(e2, dn.Stringify, false, {}).then(n) : n(e2);
    });
    b(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    b(this, "notFound", () => (d(this, Oe) ?? v(this, Oe, () => new Response()), d(this, Oe).call(this, this)));
    v(this, Pe, e), t && (v(this, Z, t.executionCtx), this.env = t.env, v(this, Oe, t.notFoundHandler), v(this, Be, t.path), v(this, Le, t.matchResult));
  }
  get req() {
    return d(this, He) ?? v(this, He, new Mt(d(this, Pe), d(this, Be), d(this, Le))), d(this, He);
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
    return d(this, K) || v(this, K, new Response(null, { headers: d(this, fe) ?? v(this, fe, new Headers()) }));
  }
  set res(e) {
    if (d(this, K) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, K).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = d(this, K).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    v(this, K, e), this.finalized = true;
  }
  get var() {
    return d(this, Q) ? Object.fromEntries(d(this, Q)) : {};
  }
}, "Et"), Pe = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakSet(), Ee = /* @__PURE__ */ __name(function(e, t, r) {
  const n = d(this, K) ? new Headers(d(this, K).headers) : d(this, fe) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, je);
  return new Response(e, { status: s, headers: n });
}, "Ee"), Et);
var P = "ALL";
var fn = "all";
var pn = ["get", "post", "put", "delete", "options", "patch"];
var Pt = "Can not add a route since the matcher is already built.";
var Ht = /* @__PURE__ */ __name(class extends Error {
}, "Ht");
var gn = "__COMPOSED_HANDLER";
var mn = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "mn");
var ut = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "ut");
var V;
var H;
var Dt;
var W;
var ue;
var Ke;
var Ue;
var Re;
var xn = (Re = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    E(this, H);
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
    E(this, V, "/");
    b(this, "routes", []);
    E(this, W, mn);
    b(this, "errorHandler", ut);
    b(this, "onError", (t2) => (this.errorHandler = t2, this));
    b(this, "notFound", (t2) => (v(this, W, t2), this));
    b(this, "fetch", (t2, ...r) => j(this, H, Ue).call(this, t2, r[1], r[0], t2.method));
    b(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${ye("/", t2)}`, r), n2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(j(this, H, Ue).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...pn, fn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? v(this, V, a) : j(this, H, ue).call(this, i, d(this, V), a), o.forEach((c) => {
        j(this, H, ue).call(this, i, d(this, V), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        v(this, V, c);
        for (const l of [i].flat())
          o.map((u) => {
            j(this, H, ue).call(this, l.toUpperCase(), d(this, V), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? v(this, V, i) : (v(this, V, "*"), a.unshift(i)), a.forEach((o) => {
      j(this, H, ue).call(this, P, d(this, V), o);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Ot : on;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ut ? i = s.handler : (i = /* @__PURE__ */ __name(async (o, c) => (await lt([], r.errorHandler)(o, () => s.handler(o, c))).res, "i"), i[gn] = s.handler), j(a = n, H, ue).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = j(this, H, Dt).call(this);
    return r._basePath = ye(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((c) => c, "s") : s = n.replaceRequest));
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
      const c = ye(this._basePath, t), l = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(l) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (c, l) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return j(this, H, ue).call(this, P, ye(t, "*"), o), this;
  }
}, "Re"), V = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name(function() {
  const t = new Re({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, v(t, W, d(this, W)), t.routes = this.routes, t;
}, "Dt"), W = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = ye(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "ue"), Ke = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Ke"), Ue = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, H, Ue).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), o = new hn(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: d(this, W) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, W).call(this, o);
      });
    } catch (u) {
      return j(this, H, Ke).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, W).call(this, o))).catch((u) => j(this, H, Ke).call(this, u, o)) : l ?? d(this, W).call(this, o);
  }
  const c = lt(a[0], this.errorHandler, d(this, W));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return j(this, H, Ke).call(this, l, o);
    }
  })();
}, "Ue"), Re);
var Lt = [];
function vn(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[P], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], Lt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "n");
  return this.match = n, n(e, t);
}
__name(vn, "vn");
var We = "[^/]+";
var Ie = ".*";
var Ne = "(?:|/.*)";
var Se = Symbol();
var bn = new Set(".\\+*[^]$()");
function wn(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ie || e === Ne ? 1 : t === Ie || t === Ne ? -1 : e === We ? 1 : t === We ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(wn, "wn");
var pe;
var ge;
var Y;
var ve;
var yn = (ve = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, pe);
    E(this, ge);
    E(this, Y, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (d(this, pe) !== void 0)
        throw Se;
      if (i)
        return;
      v(this, pe, r);
      return;
    }
    const [a, ...o] = t, c = a === "*" ? o.length === 0 ? ["", "", Ie] : ["", "", We] : a === "/*" ? ["", "", Ne] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || We;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw Se;
      if (l = d(this, Y)[h], !l) {
        if (Object.keys(d(this, Y)).some((x) => x !== Ie && x !== Ne))
          throw Se;
        if (i)
          return;
        l = d(this, Y)[h] = new ve(), u !== "" && v(l, ge, s.varIndex++);
      }
      !i && u !== "" && n.push([u, d(l, ge)]);
    } else if (l = d(this, Y)[a], !l) {
      if (Object.keys(d(this, Y)).some((u) => u.length > 1 && u !== Ie && u !== Ne))
        throw Se;
      if (i)
        return;
      l = d(this, Y)[a] = new ve();
    }
    l.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, Y)).sort(wn).map((n) => {
      const s = d(this, Y)[n];
      return (typeof d(s, ge) == "number" ? `(${n})@${d(s, ge)}` : bn.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, pe) == "number" && r.unshift(`#${d(this, pe)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ve"), pe = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ve);
var Je;
var Fe;
var St;
var En = (St = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, Je, { varIndex: 0 });
    E(this, Fe, new yn());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (c) => {
        const l = `@\\${a}`;
        return s[a] = [l, c], a++, o = true, l;
      }), !o)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(o) !== -1) {
          i[c] = i[c].replace(o, s[a][1]);
          break;
        }
    }
    return d(this, Fe).insert(i, t, n, d(this, Je), r), n;
  }
  buildRegExp() {
    let e = d(this, Fe).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "St"), Je = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), St);
var Sn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ge = /* @__PURE__ */ Object.create(null);
function Bt(e) {
  return Ge[e] ?? (Ge[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Bt, "Bt");
function $n() {
  Ge = /* @__PURE__ */ Object.create(null);
}
__name($n, "$n");
function Cn(e) {
  var l;
  const t = new En(), r = [];
  if (e.length === 0)
    return Sn;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [x, S]) => u ? 1 : x ? -1 : h.length - S.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, x = n.length; u < x; u++) {
    const [S, k, O] = n[u];
    S ? s[k] = [O.map(([g]) => [g, /* @__PURE__ */ Object.create(null)]), Lt] : h++;
    let $;
    try {
      $ = t.insert(k, h, S);
    } catch (g) {
      throw g === Se ? new Ht(k) : g;
    }
    S || (r[h] = O.map(([g, p]) => {
      const m = /* @__PURE__ */ Object.create(null);
      for (p -= 1; p >= 0; p--) {
        const [C, f] = $[p];
        m[C] = f;
      }
      return [g, m];
    }));
  }
  const [i, a, o] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let x = 0, S = r[u].length; x < S; x++) {
      const k = (l = r[u][x]) == null ? void 0 : l[1];
      if (!k)
        continue;
      const O = Object.keys(k);
      for (let $ = 0, g = O.length; $ < g; $++)
        k[O[$]] = o[k[O[$]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(Cn, "Cn");
function we(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Bt(r).test(t))
        return [...e[r]];
  }
}
__name(we, "we");
var ae;
var oe;
var Xe;
var Ft;
var $t;
var jn = ($t = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, Xe);
    b(this, "name", "RegExpRouter");
    E(this, ae);
    E(this, oe);
    b(this, "match", vn);
    v(this, ae, { [P]: /* @__PURE__ */ Object.create(null) }), v(this, oe, { [P]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var o;
    const n = d(this, ae), s = d(this, oe);
    if (!n || !s)
      throw new Error(Pt);
    n[e] || [n, s].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[P]).forEach((l) => {
        c[e][l] = [...c[P][l]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = Bt(t);
      e === P ? Object.keys(n).forEach((l) => {
        var u;
        (u = n[l])[t] || (u[t] = we(n[l], t) || we(n[P], t) || []);
      }) : (o = n[e])[t] || (o[t] = we(n[e], t) || we(n[P], t) || []), Object.keys(n).forEach((l) => {
        (e === P || e === l) && Object.keys(n[l]).forEach((u) => {
          c.test(u) && n[l][u].push([r, i]);
        });
      }), Object.keys(s).forEach((l) => {
        (e === P || e === l) && Object.keys(s[l]).forEach((u) => c.test(u) && s[l][u].push([r, i]));
      });
      return;
    }
    const a = Rt(t) || [t];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var x;
        (e === P || e === h) && ((x = s[h])[u] || (x[u] = [...we(n[h], u) || we(n[P], u) || []]), s[h][u].push([r, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, oe)).concat(Object.keys(d(this, ae))).forEach((t) => {
      e[t] || (e[t] = j(this, Xe, Ft).call(this, t));
    }), v(this, ae, v(this, oe, void 0)), $n(), e;
  }
}, "$t"), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakSet(), Ft = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === P;
  return [d(this, ae), d(this, oe)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== P && t.push(...Object.keys(n[P]).map((i) => [i, n[P][i]]));
  }), r ? Cn(t) : null;
}, "Ft"), $t);
var ce;
var ee;
var Ct;
var Tn = (Ct = /* @__PURE__ */ __name(class {
  constructor(e) {
    b(this, "name", "SmartRouter");
    E(this, ce, []);
    E(this, ee, []);
    v(this, ce, e.routers);
  }
  add(e, t, r) {
    if (!d(this, ee))
      throw new Error(Pt);
    d(this, ee).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, ee))
      throw new Error("Fatal error");
    const r = d(this, ce), n = d(this, ee), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let c = 0, l = n.length; c < l; c++)
          o.add(...n[c]);
        a = o.match(e, t);
      } catch (c) {
        if (c instanceof Ht)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), v(this, ce, [o]), v(this, ee, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, ee) || d(this, ce).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ce)[0];
  }
}, "Ct"), ce = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), Ct);
var Ae = /* @__PURE__ */ Object.create(null);
var le;
var q;
var me;
var ke;
var F;
var te;
var he;
var _e;
var On = (_e = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    E(this, te);
    E(this, le);
    E(this, q);
    E(this, me);
    E(this, ke, 0);
    E(this, F, Ae);
    if (v(this, q, n || /* @__PURE__ */ Object.create(null)), v(this, le, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, v(this, le, [s]);
    }
    v(this, me, []);
  }
  insert(t, r, n) {
    v(this, ke, ++ct(this, ke)._);
    let s = this;
    const i = tn(r), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = sn(l, u), x = Array.isArray(h) ? h[0] : l;
      if (x in d(s, q)) {
        s = d(s, q)[x], h && a.push(h[1]);
        continue;
      }
      d(s, q)[x] = new _e(), h && (d(s, me).push(h), a.push(h[1])), s = d(s, q)[x];
    }
    return d(s, le).push({ [t]: { handler: n, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, ke) } }), s;
  }
  search(t, r) {
    var c;
    const n = [];
    v(this, F, Ae);
    let i = [this];
    const a = Tt(r), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], x = l === u - 1, S = [];
      for (let k = 0, O = i.length; k < O; k++) {
        const $ = i[k], g = d($, q)[h];
        g && (v(g, F, d($, F)), x ? (d(g, q)["*"] && n.push(...j(this, te, he).call(this, d(g, q)["*"], t, d($, F))), n.push(...j(this, te, he).call(this, g, t, d($, F)))) : S.push(g));
        for (let p = 0, m = d($, me).length; p < m; p++) {
          const C = d($, me)[p], f = d($, F) === Ae ? {} : { ...d($, F) };
          if (C === "*") {
            const A = d($, q)["*"];
            A && (n.push(...j(this, te, he).call(this, A, t, d($, F))), v(A, F, f), S.push(A));
            continue;
          }
          const [R, D, L] = C;
          if (!h && !(L instanceof RegExp))
            continue;
          const T = d($, q)[R], X = a.slice(l).join("/");
          if (L instanceof RegExp) {
            const A = L.exec(X);
            if (A) {
              if (f[D] = A[0], n.push(...j(this, te, he).call(this, T, t, d($, F), f)), Object.keys(d(T, q)).length) {
                v(T, F, f);
                const w = ((c = A[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[w] || (o[w] = [])).push(T);
              }
              continue;
            }
          }
          (L === true || L.test(h)) && (f[D] = h, x ? (n.push(...j(this, te, he).call(this, T, t, f, d($, F))), d(T, q)["*"] && n.push(...j(this, te, he).call(this, d(T, q)["*"], t, f, d($, F)))) : (v(T, F, f), S.push(T)));
        }
      }
      i = S.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((l, u) => l.score - u.score), [n.map(({ handler: l, params: u }) => [l, u])];
  }
}, "_e"), le = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakSet(), he = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, o = d(t, le).length; a < o; a++) {
    const c = d(t, le)[a], l = c[r] || c[P], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), n !== Ae || s && s !== Ae))
      for (let h = 0, x = l.possibleKeys.length; h < x; h++) {
        const S = l.possibleKeys[h], k = u[l.score];
        l.params[S] = s != null && s[S] && !k ? s[S] : n[S] ?? (s == null ? void 0 : s[S]), u[l.score] = true;
      }
  }
  return i;
}, "he"), _e);
var xe;
var jt;
var Rn = (jt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    E(this, xe);
    v(this, xe, new On());
  }
  add(e, t, r) {
    const n = Rt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        d(this, xe).insert(e, n[s], r);
      return;
    }
    d(this, xe).insert(e, t, r);
  }
  match(e, t) {
    return d(this, xe).search(e, t);
  }
}, "jt"), xe = /* @__PURE__ */ new WeakMap(), jt);
var qt = /* @__PURE__ */ __name(class extends xn {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Tn({ routers: [new jn(), new Rn()] });
  }
}, "qt");
var kn = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, x) {
      a.res.headers.set(h, x);
    }
    __name(c, "c");
    const l = await n(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let x = r.allowHeaders;
      if (!(x != null && x.length)) {
        const S = a.req.header("Access-Control-Request-Headers");
        S && (x = S.split(/\s*,\s*/));
      }
      return x != null && x.length && (c("Access-Control-Allow-Headers", x.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "kn");
var _n = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ht = /* @__PURE__ */ __name((e, t = An) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ht");
var Mn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var An = Mn;
var In = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "In");
var zt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Nn = Object.keys(zt);
var Pn = "index.html";
var Hn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? In;
  return async (s, i) => {
    var u, h, x, S;
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
    let o = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(o) && (o = n(o, Pn));
    const c = e.getContent;
    let l = await c(o, s);
    if (l instanceof Response)
      return s.newResponse(l.body, l);
    if (l) {
      const k = e.mimes && ht(o, e.mimes) || ht(o);
      if (s.header("Content-Type", k || "application/octet-stream"), e.precompressed && (!k || _n.test(k))) {
        const O = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map(($) => $.trim()));
        for (const $ of Nn) {
          if (!O.has($))
            continue;
          const g = await c(o + zt[$], s);
          if (g) {
            l = g, s.header("Content-Encoding", $), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((x = e.onFound) == null ? void 0 : x.call(e, o, s)), s.body(l);
    }
    await ((S = e.onNotFound) == null ? void 0 : S.call(e, o, s)), await i();
  };
}, "Hn");
var Dn = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Dn");
var Ln = /* @__PURE__ */ __name((e) => async function(r, n) {
  return Hn({ ...e, getContent: async (i) => Dn(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Ln");
var Bn = /* @__PURE__ */ __name((e) => Ln(e), "Bn");
var re = new qt();
var Ve = /* @__PURE__ */ new Map();
var Fn = 1e3 * 60 * 60 * 24 * 7;
var nt = false;
function Kt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Kt, "Kt");
function J(e) {
  return e == null ? "" : String(e);
}
__name(J, "J");
function $e(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name($e, "$e");
function qn(e) {
  const t = J(e).trim().toLowerCase();
  return t ? t === "brief" || t === "simple" || t === "short" || t === "lite" ? "brief" : t === "detail" || t === "detailed" || t === "full" ? "detail" : "standard" : "standard";
}
__name(qn, "qn");
function zn(e) {
  const t = J(e).trim().toLowerCase();
  return t ? t === "narrative" || t === "structured" || t === "mindmap" || t === "selftest" ? t : t === "mind-map" || t === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(zn, "zn");
function Kn(e) {
  const t = J(e).trim().toLowerCase();
  return t === "concept" ? "concept" : t === "exam" ? "exam" : "summary";
}
__name(Kn, "Kn");
function st(e) {
  const t = (e || "").replace(/\s+/g, " ").trim();
  if (!t)
    return [];
  const r = [];
  let n = "", s = false;
  for (let i = 0; i < t.length; i++) {
    const a = t[i], o = t[i + 1];
    (a === '"' || a === '"' || a === '"') && (s = !s), n += a, !s && /[\.\?\!]/.test(a) && o === " " ? a === "." && n.endsWith("...") || (r.push(n.trim()), n = "", i++) : !s && /[다요죠]/.test(a) && o === " " && (r.push(n.trim()), n = "", i++);
  }
  return n.trim() && r.push(n.trim()), r.length ? r : [t];
}
__name(st, "st");
var Un = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var Gn = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function Vn(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e) {
    let n = false;
    for (const s of Gn)
      if (s.has(r)) {
        t.add(Array.from(s)[0]), n = true;
        break;
      }
    n || t.add(r);
  }
  return t;
}
__name(Vn, "Vn");
function Ye(e) {
  return (e || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((t) => t.trim()).map((t) => t.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((t) => t.length >= 2 && !Un.has(t));
}
__name(Ye, "Ye");
function Wn(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const s of Ye(n))
      t.set(s, (t.get(s) || 0) + 1);
  return e.map((n, s) => {
    const i = Ye(n);
    let a = 0;
    for (const l of i)
      a += t.get(l) || 0;
    const o = n.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: a * c };
  });
}
__name(Wn, "Wn");
function it(e, t) {
  return Wn(e).slice().sort((s, i) => i.score - s.score).slice(0, $e(t, 1, Math.max(1, e.length))).sort((s, i) => s.idx - i.idx).map((s) => s.s);
}
__name(it, "it");
var Yn = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function ft(e) {
  const t = { definition: 0, meaning: 0, activity: 0 };
  for (const [n, s] of Object.entries(Yn))
    for (const i of s)
      e.includes(i) && t[n]++;
  const r = Math.max(t.definition, t.meaning, t.activity);
  return r === 0 ? null : t.definition === r ? "definition" : t.meaning === r ? "meaning" : "activity";
}
__name(ft, "ft");
function Jn(e, t, r) {
  const n = t.length, s = [], i = /* @__PURE__ */ new Set(), a = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = a.exec(t)) !== null; )
    i.add(o[1]);
  for (const g of e) {
    const p = [];
    let m;
    const C = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (m = C.exec(g)) !== null; ) {
      const D = m[1];
      i.has(D) && p.push(D);
    }
    let f = g.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (f.length < 10)
      continue;
    const R = Ye(f).slice(0, 8);
    s.push({ original: g, clean: f, keywords: R, citations: p }), f.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", f.slice(0, 100));
  }
  if (s.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const c = /* @__PURE__ */ new Map();
  for (const g of s)
    for (const p of g.keywords)
      c.set(p, (c.get(p) || 0) + 1);
  const l = [];
  for (const g of s) {
    new Set(g.keywords);
    let p = false;
    for (const m of l)
      if (g.keywords.filter((f) => m.keywords.has(f)).length >= 2) {
        m.sentences.push({ clean: g.clean, citations: g.citations }), g.keywords.forEach((f) => m.keywords.add(f)), p = true;
        break;
      }
    p || l.push({ keywords: new Set(g.keywords), sentences: [{ clean: g.clean, citations: g.citations }] });
  }
  const u = l.map((g) => {
    const p = g.sentences[0].clean, m = s.findIndex((C) => C.clean === p);
    return { ...g, originalIdx: m };
  });
  let h = "";
  if (r === "brief") {
    const g = { definition: [], meaning: [], activity: [] };
    for (const w of u)
      for (const y of w.sentences) {
        const _ = ft(y.clean);
        _ && g[_].push(y);
      }
    const p = g.definition[0], m = g.meaning[0], C = g.activity[0], f = [], R = [];
    if (p && (f.push(p.clean), R.push(...p.citations.filter(Boolean))), m && (f.push(m.clean), R.push(...m.citations.filter(Boolean))), C && (f.push(C.clean), R.push(...C.citations.filter(Boolean))), f.length === 0) {
      const y = u.sort((_, B) => B.sentences.length - _.sentences.length)[0].sentences[0];
      f.push(y.clean), R.push(...y.citations.filter(Boolean));
    }
    const D = Array.from(new Set(R)), L = D.length > 0 ? `(${D.join("; ")})` : "", T = f.map((w) => {
      let y = w;
      for (; y.includes("("); )
        y = y.replace(/\([^)]*\)/g, "");
      return y.trim();
    });
    T.length === 1 ? h = `${T[0]}${L}.` : T.length === 2 ? h = `${T[0]}. ${T[1]}${L}.` : h = `${T[0]}\uD558\uBA70 ${T[1]}. ${T[2]}${L}.`;
    const X = h.length / n * 100;
    if (X > 15) {
      let w = h.slice(0, 60);
      for (; w.includes("("); )
        w = w.replace(/\([^)]*\)/g, "");
      h = w.trim() + (L ? ` ${L}.` : ".");
    }
    const A = [];
    return p && A.push("definition"), m && A.push("meaning"), C && A.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: A, sentenceCount: f.length, compressionRatio: (h.length / n * 100).toFixed(1) + "%", passed: X <= 15 }), h;
  }
  if (r === "standard") {
    const g = u.sort((w, y) => y.sentences.length - w.sentences.length).slice(0, 3).sort((w, y) => w.originalIdx - y.originalIdx);
    if (g.length === 1) {
      const w = g[0].sentences[0], y = g[0].sentences.flatMap((B) => B.citations).filter(Boolean), _ = y.length > 0 ? `(${y.join("; ")})` : "";
      return `${w.clean}${_}.`;
    }
    const p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), C = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const w of g)
      for (const y of w.sentences) {
        const _ = y.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (_) {
          let [, B, qe] = _;
          B = B.replace(/[에게서로부터]$/g, "").trim(), p.has(B) || p.set(B, []);
          let z = qe.trim();
          z = z.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [N, Me] of Object.entries(C))
            if (z.includes(N)) {
              const be = m.get(N) || 0;
              if (m.set(N, be + 1), be >= 1 && Me.length > 0) {
                const Qe = Math.min(be - 1, Me.length - 1);
                z = z.replace(N, Me[Qe]);
              }
            }
          const M = new Set(Ye(z)), I = Vn(M), G = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const N of G)
            I.delete(N);
          p.get(B).push({ original: z, keywords: I, citations: y.citations });
        }
      }
    const f = [];
    for (const [w, y] of p.entries()) {
      const _ = y.flatMap((M) => M.citations).filter(Boolean), B = w.charAt(w.length - 1), z = /[가-힣]/.test(B) && (B.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (y.length === 1) {
        const M = y[0].original, I = (M.match(/,/g) || []).length;
        if (M.length > 80 && I >= 2) {
          const G = M.split(",").map((N) => N.trim()).filter((N) => N.length > 0);
          if (G.length >= 2) {
            f.push({ text: `${w}${z} ${G[0]}`, citations: [] });
            for (let N = 1; N < G.length - 1; N++)
              f.push({ text: `${G[N]}`, citations: [] });
            f.push({ text: `${G[G.length - 1]}`, citations: y[0].citations });
          } else
            f.push({ text: `${w}${z} ${M}`, citations: _ });
        } else
          f.push({ text: `${w}${z} ${M}`, citations: _ });
      } else {
        const M = [];
        for (const I of y) {
          let G = false;
          for (const N of M) {
            const Me = Array.from(I.keywords).filter((Qe) => N.keywords.has(Qe)).length, be = Math.max(I.keywords.size, N.keywords.size);
            if (be > 0 && Me / be >= 0.8) {
              I.original.length > N.original.length && (N.original = I.original, N.keywords = I.keywords), N.citations.push(...I.citations), G = true;
              break;
            }
          }
          G || M.push({ original: I.original, keywords: I.keywords, citations: [...I.citations] });
        }
        if (M.length === 1)
          f.push({ text: `${w}${z} ${M[0].original}`, citations: M.flatMap((I) => I.citations) });
        else if (M.length === 2)
          f.push({ text: `${w}${z} ${M[0].original}`, citations: M[0].citations }), f.push({ text: `${w}${z} ${M[1].original}`, citations: M[1].citations });
        else
          for (let I = 0; I < M.length; I++)
            f.push({ text: `${w}${z} ${M[I].original}`, citations: M[I].citations });
      }
    }
    if (f.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (f.length === 1) {
      const w = f[0].citations.filter(Boolean), y = w.length > 0 ? `(${w.join("; ")})` : "";
      return `${f[0].text}${y}.`;
    }
    if (f.length === 2) {
      const w = f[0].citations.filter(Boolean), y = f[1].citations.filter(Boolean), _ = w.length > 0 ? `(${w.join("; ")})` : "", B = y.length > 0 ? `(${y.join("; ")})` : "";
      return `${f[0].text}${_}. ${f[1].text}${B}.`;
    }
    const R = [], D = f[0], L = D.citations.filter(Boolean), T = L.length > 0 ? `(${L.join("; ")})` : "";
    if (R.push(`${D.text}${T}.`), f.length >= 2) {
      const w = f[1], y = w.citations.filter(Boolean), _ = y.length > 0 ? `(${y.join("; ")})` : "";
      R.push(`${w.text}${_}.`);
    }
    if (f.length >= 3) {
      const y = f.slice(2).map((_) => {
        const B = _.citations.filter(Boolean), qe = B.length > 0 ? `(${B.join("; ")})` : "";
        return `${_.text}${qe}.`;
      });
      R.push(y.join(" "));
    }
    h = R.join(`

`);
    const X = h.length / n * 100;
    X > 30 && (R.length > 3 ? h = R.slice(0, 3).join(`

`) : h = R.join(`

`));
    const A = [];
    for (const w of g)
      for (const y of w.sentences) {
        const _ = ft(y.clean);
        _ && !A.includes(_) && A.push(_);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: A, sentenceCount: f.length, paragraphCount: R.length, compressionRatio: (h.length / n * 100).toFixed(1) + "%", passed: X >= 25 && X <= 30 }), h;
  }
  const x = u.sort((g, p) => p.sentences.length - g.sentences.length).slice(0, 5).sort((g, p) => g.originalIdx - p.originalIdx);
  let S = x.map((g, p) => {
    const m = g.sentences[0], C = g.sentences.flatMap((R) => R.citations).filter(Boolean), f = C.length > 0 ? `(${C.join("; ")})` : "";
    return p === 0 ? `${m.clean}${f}.` : p === x.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${m.clean}${f}.` : `\uB610\uD55C ${m.clean}${f}.`;
  }).join(" ");
  return S.length / n * 100 > (r === "brief" ? 15 : r === "standard" ? 30 : 55) && r === "detail" ? x.slice(0, 3).map((p, m) => {
    const C = p.sentences[0], f = p.sentences.flatMap((D) => D.citations).filter(Boolean), R = f.length > 0 ? `(${f.join("; ")})` : "";
    return m === 0 ? `${C.clean}${R}.` : m === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${C.clean}${R}.` : `\uB610\uD55C ${C.clean}${R}.`;
  }).join(" ") : S;
}
__name(Jn, "Jn");
function pt(e, t, r) {
  const n = st(e), s = t === "brief" ? $e(Math.round(n.length * 0.18), 2, 4) : t === "standard" ? $e(Math.round(n.length * 0.28), 4, 8) : $e(Math.round(n.length * 0.4), 7, 14), i = it(n, s);
  if (r === "narrative") {
    const o = Jn(i, e, t);
    return { kind: "summary", mode: t, viewType: r, narrative: o };
  }
  if (r === "structured")
    return { kind: "summary", mode: t, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: i.map((o, c) => `- (${c + 1}) ${o}`) } };
  if (r === "mindmap") {
    const o = (i[0] || n[0] || "\uD575\uC2EC").slice(0, 40), c = [{ id: "c", label: o, level: 0 }], l = [];
    return i.slice(1).forEach((u, h) => {
      const x = `n${h + 1}`;
      c.push({ id: x, label: u.slice(0, 60), level: 1 }), l.push({ from: "c", to: x });
    }), { kind: "summary", mode: t, viewType: r, mindmap: { center: o, nodes: c, edges: l } };
  }
  const a = i.map((o, c) => ({ id: `q${c + 1}`, type: "short", question: `(${c + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${o.slice(0, 70)}"`, answerHint: o }));
  return { kind: "summary", mode: t, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: a } };
}
__name(pt, "pt");
function Ut(e) {
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
__name(Ut, "Ut");
function Xn(e, t, r, n) {
  const s = Ut(r);
  return `${e}::${n || "anon"}::${t}::base::${s}`;
}
__name(Xn, "Xn");
function Qn(e, t, r, n, s) {
  const i = Ut(n);
  return `${e}::${s || "anon"}::${t}::${r}::${i}`;
}
__name(Qn, "Qn");
async function Zn(e) {
  if (!nt) {
    if (!e) {
      nt = true;
      return;
    }
    await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), nt = true;
  }
}
__name(Zn, "Zn");
async function gt(e, t) {
  const r = Date.now(), n = Ve.get(t);
  if (n && r - n.createdAt < Fn)
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
__name(gt, "gt");
async function de(e, t, r, n) {
  const s = Date.now();
  Ve.set(t, { data: n, createdAt: s }), e && await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t, r, JSON.stringify(n), Kt()).run();
}
__name(de, "de");
function er(e, t) {
  const n = ['\uB2F9\uC2E0\uC740 "\uD559\uC2B5 \uD14D\uC2A4\uD2B8 \uC555\uCD95 \uC694\uC57D" \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', '\uBC18\uB4DC\uC2DC "\uC911\uAC04 \uAE00\uC790 \uC790\uB974\uAE30" \uAC19\uC740 \uBC29\uC2DD\uC740 \uAE08\uC9C0\uD569\uB2C8\uB2E4.', "\uBB38\uC7A5/\uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uD55C\uAD6D\uC5B4\uB85C \uC694\uC57D\uD558\uC138\uC694.", `**\uC555\uCD95\uB960 \uBAA9\uD45C: ${t === "brief" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 10~15%" : t === "standard" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 25~30%" : "\uC6D0\uBB38 \uAE38\uC774\uC758 45~55%"}** (\uD544\uC218)`, "\uC911\uBCF5 \uC81C\uAC70, \uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4/\uC6D0\uC778-\uACB0\uACFC/\uC808\uCC28\uAC00 \uB4DC\uB7EC\uB098\uAC8C \uC694\uC57D\uD558\uC138\uC694.", "\uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC778\uC6A9(\uAD04\uD638 \uC22B\uC790)\uC774\uB098 \uC815\uBCF4\uB294 \uC808\uB300 \uCD94\uAC00\uD558\uC9C0 \uB9C8\uC138\uC694."].join(`
`), s = e.length < 300 ? "1~2\uAC1C \uBB38\uB2E8" : e.length < 600 ? "2~3\uAC1C \uBB38\uB2E8" : "3~4\uAC1C \uBB38\uB2E8";
  return `${n}

[\uCD9C\uB825 \uD615\uC2DD]
- \uD55C\uAD6D\uC5B4 \uC11C\uC220 \uC694\uC57D (${s})
- \uC6D0\uBB38 \uAE38\uC774\uC5D0 \uBE44\uB840\uD558\uC5EC \uB2E8\uB77D \uC218 \uC870\uC815

[\uC6D0\uBB38]
${e}`;
}
__name(er, "er");
function mt(e) {
  const t = e.split(/\n\n+/).filter((n) => n.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: t.length > 1 ? t.map((n, s) => `- (${s + 1}) ${n}`) : e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n, s) => `- (${s + 1}) ${n}.`) } };
}
__name(mt, "mt");
function xt(e) {
  const t = e.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), r = (t[0] || "\uD575\uC2EC").slice(0, 40), n = [{ id: "c", label: r, level: 0 }], s = [];
  return t.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    n.push({ id: o, label: i.slice(0, 60), level: 1 }), s.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: r, nodes: n, edges: s } };
}
__name(xt, "xt");
function vt(e) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: e.split(/[\.。]\s+/).filter((n) => n.trim()).map((n) => n.trim()).map((n, s) => ({ id: `q${s + 1}`, type: "short", question: `(${s + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${n.slice(0, 70)}"`, answerHint: n })) } };
}
__name(vt, "vt");
function tr(e, t, r) {
  const n = e.length, s = t.length, i = n > 0 ? s / n : 0;
  let a = 0, o = 1;
  r === "brief" ? (a = 0.1, o = 0.15) : r === "standard" ? (a = 0.25, o = 0.3) : (a = 0.45, o = 0.55);
  const c = i >= a && i <= o, l = `${(a * 100).toFixed(0)}-${(o * 100).toFixed(0)}%`;
  return { valid: c, ratio: i, expected: l };
}
__name(tr, "tr");
function nr(e, t) {
  const r = [], n = /* @__PURE__ */ new Set(), s = /\(([^)]+)\)/g;
  let i;
  for (; (i = s.exec(e)) !== null; )
    n.add(i[1].trim());
  let a = t;
  return a = a.replace(/\(([^)]+)\)/g, (o, c) => {
    const l = c.trim();
    return n.has(l) ? o : (r.push(`\uC81C\uAC70\uB428: ${o}`), "");
  }), a = a.replace(/\s{2,}/g, " ").trim(), { cleaned: a, warnings: r };
}
__name(nr, "nr");
async function bt(e, t) {
  var c, l, u, h, x;
  const r = J(e.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = J(e.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, i = { contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const S = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (S.ok) {
      const O = await S.json();
      return { ok: true, text: ((x = (h = (u = (l = (c = O == null ? void 0 : O.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : x.text) ?? "", raw: O };
    }
    if (S.status === 429 || S.status === 503) {
      await new Promise((O) => setTimeout(O, o)), o *= 2;
      continue;
    }
    const k = await S.text().catch(() => "");
    throw new Error(`Gemini error ${S.status}: ${k.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(bt, "bt");
var rr = `/* MindStory Engine Bundle (compat) */
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
re.use("/api/*", kn());
re.get("/static/ms-engine-bundle.js", (e) => e.text(rr, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
re.get("/favicon.ico", (e) => e.body(null, 204));
re.use("/static/*", Bn({ root: "./public" }));
re.get("/", (e) => e.html(`<!DOCTYPE html>
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
re.get("/api/health", (e) => {
  const t = !!J(e.env.GEMINI_API_KEY).trim(), r = J(e.env.USE_MOCK).trim().toLowerCase() === "true";
  return e.json({ ok: true, ts: Kt(), hasDB: !!e.env.DB, hasGeminiKey: t, engineMode: t && !r ? "gemini+fallback" : "local-only" });
});
re.post("/api/engine", async (e) => {
  var $, g;
  const t = Date.now(), r = e.env.DB;
  await Zn(r);
  let n = null;
  try {
    n = await e.req.json();
  } catch {
    return e.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = Kn(n == null ? void 0 : n.kind), i = J((n == null ? void 0 : n.text) || ""), a = qn((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), o = zn((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), c = J((($ = n == null ? void 0 : n.options) == null ? void 0 : $.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return e.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = Qn(s, a, o, i, c || null), u = await gt(r, l);
  if (u.hit)
    return e.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - t } }, 200);
  const h = Xn(s, a, i, c || null), x = await gt(r, h);
  if (x.hit && ((g = x.data) != null && g.narrative)) {
    const p = x.data.narrative;
    let m;
    return o === "narrative" ? m = { kind: s, mode: a, viewType: o, narrative: p } : o === "structured" ? m = { kind: s, mode: a, ...mt(p) } : o === "mindmap" ? m = { kind: s, mode: a, ...xt(p) } : m = { kind: s, mode: a, ...vt(p) }, await de(r, l, c || "anon", m), e.json({ ok: true, data: m, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - t } }, 200);
  }
  const S = !!J(e.env.GEMINI_API_KEY).trim(), k = J(e.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && S && !k)
    try {
      const p = er(i, a);
      let m = "", C = false, f = 0;
      for (; f < 2; ) {
        m = ((await bt(e.env, p)).text || "").trim();
        const A = tr(i, m, a);
        if (A.valid) {
          C = true;
          break;
        }
        if (f++, f < 2) {
          const w = `${p}

[\uC911\uC694] \uC774\uC804 \uC2DC\uB3C4\uC758 \uC555\uCD95\uB960\uC774 ${(A.ratio * 100).toFixed(1)}%\uB85C \uBAA9\uD45C \uBC94\uC704(${A.expected})\uB97C \uBC97\uC5B4\uB0AC\uC2B5\uB2C8\uB2E4. \uBC18\uB4DC\uC2DC ${A.expected} \uBC94\uC704\uB85C \uC694\uC57D\uD558\uC138\uC694.`;
          m = ((await bt(e.env, w)).text || "").trim();
        }
      }
      const { cleaned: R, warnings: D } = nr(i, m);
      D.length > 0 && console.warn("[SAFETY] \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC778\uC6A9 \uC81C\uAC70:", D), m = R;
      const L = { kind: "summary", mode: a, viewType: "narrative", narrative: m };
      await de(r, h, c || "anon", L);
      let T;
      return o === "narrative" ? T = L : o === "structured" ? T = { kind: s, mode: a, ...mt(m) } : o === "mindmap" ? T = { kind: s, mode: a, ...xt(m) } : T = { kind: s, mode: a, ...vt(m) }, await de(r, l, c || "anon", T), e.json({ ok: true, data: T, meta: { cached: false, engine: "gemini", compressionValid: C, retryCount: f, citationWarnings: D.length, elapsedMs: Date.now() - t } }, 200);
    } catch (p) {
      const m = pt(i, a, o);
      if (await de(r, l, c || "anon", m), m.narrative) {
        const C = { kind: "summary", mode: a, viewType: "narrative", narrative: m.narrative };
        await de(r, h, c || "anon", C);
      }
      return e.json({ ok: true, data: m, meta: { cached: false, engine: "local(fallback)", geminiError: p != null && p.message ? String(p.message).slice(0, 180) : "unknown", elapsedMs: Date.now() - t } }, 200);
    }
  let O;
  if (s === "summary") {
    if (O = pt(i, a, o), O.narrative) {
      const p = { kind: "summary", mode: a, viewType: "narrative", narrative: O.narrative };
      await de(r, h, c || "anon", p);
    }
  } else if (s === "concept") {
    const p = st(i), m = it(p, $e(Math.round(p.length * 0.25), 6, 10));
    O = { kind: s, mode: a, viewType: o, concepts: m.map((C, f) => ({ term: `\uD575\uC2EC\uAC1C\uB150${f + 1}`, definition: C.slice(0, 120) })) };
  } else {
    const p = st(i), m = it(p, $e(Math.round(p.length * 0.22), 6, 10));
    O = { kind: s, mode: a, viewType: o, items: m.map((C, f) => ({ id: `e${f + 1}`, type: "mcq", question: `(${f + 1}) \uB2E4\uC74C \uC124\uBA85\uC758 \uD575\uC2EC \uC694\uC9C0\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?`, choices: ["\uD575\uC2EC \uC8FC\uC7A5/\uC694\uC9C0", "\uADFC\uAC70/\uC608\uC2DC", "\uBC18\uBC15/\uD55C\uACC4", "\uC8FC\uC81C\uC640 \uBB34\uAD00"], answerIndex: 0, explanation: C })) };
  }
  return await de(r, l, c || "anon", O), e.json({ ok: true, data: O, meta: { cached: false, engine: S && !k ? "local(no-gemini-for-kind)" : "local", elapsedMs: Date.now() - t } }, 200);
});
re.notFound((e) => e.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var wt = new qt();
var sr = Object.assign({ "/src/index.tsx": re });
var Gt = false;
for (const [, e] of Object.entries(sr))
  e && (wt.route("/", e), wt.notFound(e.notFoundHandler), Gt = true);
if (!Gt)
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

// ../.wrangler/tmp/bundle-eNZEaN/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = wt;

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

// ../.wrangler/tmp/bundle-eNZEaN/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.4435504216483128.mjs.map
