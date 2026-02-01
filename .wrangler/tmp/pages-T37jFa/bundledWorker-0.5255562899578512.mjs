var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-V6rhbh/checked-fetch.js
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

// ../.wrangler/tmp/bundle-V6rhbh/strip-cf-connecting-ip-header.js
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
var Bt = Object.defineProperty;
var at = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "at");
var Gt = /* @__PURE__ */ __name((e, t, r) => t in e ? Bt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Gt");
var w = /* @__PURE__ */ __name((e, t, r) => Gt(e, typeof t != "symbol" ? t + "" : t, r), "w");
var Ue = /* @__PURE__ */ __name((e, t, r) => t.has(e) || at("Cannot " + r), "Ue");
var d = /* @__PURE__ */ __name((e, t, r) => (Ue(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var b = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? at("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "b");
var v = /* @__PURE__ */ __name((e, t, r, n) => (Ue(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "v");
var j = /* @__PURE__ */ __name((e, t, r) => (Ue(e, t, "access private method"), r), "j");
var ot = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  v(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "ot");
var ct = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let c, o = false, u;
    if (e[l] ? (u = e[l][0][0], n.req.routeIndex = l) : u = l === e.length && s || void 0, u)
      try {
        c = await u(n, () => a(l + 1));
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, c = await t(h, n), o = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || o) && (n.res = c), n;
  }
  __name(a, "a");
}, "ct");
var zt = Symbol();
var Ut = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof Ct ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Wt(e, { all: r, dot: n }) : {};
}, "Ut");
async function Wt(e, t) {
  const r = await e.formData();
  return r ? Yt(r, t) : {};
}
__name(Wt, "Wt");
function Yt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Xt(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Qt(r, n, s), delete r[n]);
  }), r;
}
__name(Yt, "Yt");
var Xt = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Xt");
var Qt = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Qt");
var At = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "At");
var Zt = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = er(e), n = At(r);
  return tr(n, t);
}, "Zt");
var er = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "er");
var tr = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "tr");
var qe = {};
var rr = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return qe[n] || (r[2] ? qe[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : qe[n] = [e, r[1], true]), qe[n];
  }
  return null;
}, "rr");
var tt = /* @__PURE__ */ __name((e, t) => {
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
}, "tt");
var nr = /* @__PURE__ */ __name((e) => tt(e, decodeURI), "nr");
var Ot = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return nr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Ot");
var sr = /* @__PURE__ */ __name((e) => {
  const t = Ot(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "sr");
var pe = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = pe(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "pe");
var $t = /* @__PURE__ */ __name((e) => {
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
var We = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? tt(e, Tt) : e) : e, "We");
var kt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const c = a + t.length + 2, o = e.indexOf("&", c);
        return We(e.slice(c, o === -1 ? void 0 : o));
      } else if (l == 38 || isNaN(l))
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
    let l = e.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let c = e.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (n && (c = We(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = e.slice(l + 1, a === -1 ? void 0 : a), n && (o = We(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return t ? s[t] : s;
}, "kt");
var ir = kt;
var ar = /* @__PURE__ */ __name((e, t) => kt(e, t, true), "ar");
var Tt = decodeURIComponent;
var lt = /* @__PURE__ */ __name((e) => tt(e, Tt), "lt");
var ve;
var D;
var G;
var It;
var Mt;
var Ze;
var Y;
var vt;
var Ct = (vt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    b(this, G);
    w(this, "raw");
    b(this, ve);
    b(this, D);
    w(this, "routeIndex", 0);
    w(this, "path");
    w(this, "bodyCache", {});
    b(this, Y, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, v(this, D, r), v(this, ve, {});
  }
  param(e) {
    return e ? j(this, G, It).call(this, e) : j(this, G, Mt).call(this);
  }
  query(e) {
    return ir(this.url, e);
  }
  queries(e) {
    return ar(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Ut(this, e));
  }
  json() {
    return d(this, Y).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, Y).call(this, "text");
  }
  arrayBuffer() {
    return d(this, Y).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, Y).call(this, "blob");
  }
  formData() {
    return d(this, Y).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, ve)[e] = t;
  }
  valid(e) {
    return d(this, ve)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [zt]() {
    return d(this, D);
  }
  get matchedRoutes() {
    return d(this, D)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, D)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "vt"), ve = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), It = /* @__PURE__ */ __name(function(e) {
  const t = d(this, D)[0][this.routeIndex][1][e], r = j(this, G, Ze).call(this, t);
  return r && /\%/.test(r) ? lt(r) : r;
}, "It"), Mt = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(d(this, D)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = j(this, G, Ze).call(this, d(this, D)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? lt(n) : n);
  }
  return e;
}, "Mt"), Ze = /* @__PURE__ */ __name(function(e) {
  return d(this, D)[1] ? d(this, D)[1][e] : e;
}, "Ze"), Y = /* @__PURE__ */ new WeakMap(), vt);
var or = { Stringify: 1 };
var Rt = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => Rt(c, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Rt");
var cr = "text/plain; charset=UTF-8";
var Ye = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Ye");
var Re;
var Pe;
var K;
var we;
var J;
var P;
var _e;
var Se;
var be;
var ie;
var Ne;
var De;
var X;
var me;
var wt;
var lr = (wt = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    b(this, X);
    b(this, Re);
    b(this, Pe);
    w(this, "env", {});
    b(this, K);
    w(this, "finalized", false);
    w(this, "error");
    b(this, we);
    b(this, J);
    b(this, P);
    b(this, _e);
    b(this, Se);
    b(this, be);
    b(this, ie);
    b(this, Ne);
    b(this, De);
    w(this, "render", (...e2) => (d(this, Se) ?? v(this, Se, (t2) => this.html(t2)), d(this, Se).call(this, ...e2)));
    w(this, "setLayout", (e2) => v(this, _e, e2));
    w(this, "getLayout", () => d(this, _e));
    w(this, "setRenderer", (e2) => {
      v(this, Se, e2);
    });
    w(this, "header", (e2, t2, r) => {
      this.finalized && v(this, P, new Response(d(this, P).body, d(this, P)));
      const n = d(this, P) ? d(this, P).headers : d(this, ie) ?? v(this, ie, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    w(this, "status", (e2) => {
      v(this, we, e2);
    });
    w(this, "set", (e2, t2) => {
      d(this, K) ?? v(this, K, /* @__PURE__ */ new Map()), d(this, K).set(e2, t2);
    });
    w(this, "get", (e2) => d(this, K) ? d(this, K).get(e2) : void 0);
    w(this, "newResponse", (...e2) => j(this, X, me).call(this, ...e2));
    w(this, "body", (e2, t2, r) => j(this, X, me).call(this, e2, t2, r));
    w(this, "text", (e2, t2, r) => !d(this, ie) && !d(this, we) && !t2 && !r && !this.finalized ? new Response(e2) : j(this, X, me).call(this, e2, t2, Ye(cr, r)));
    w(this, "json", (e2, t2, r) => j(this, X, me).call(this, JSON.stringify(e2), t2, Ye("application/json", r)));
    w(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => j(this, X, me).call(this, s, t2, Ye("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Rt(e2, or.Stringify, false, {}).then(n) : n(e2);
    });
    w(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    w(this, "notFound", () => (d(this, be) ?? v(this, be, () => new Response()), d(this, be).call(this, this)));
    v(this, Re, e), t && (v(this, J, t.executionCtx), this.env = t.env, v(this, be, t.notFoundHandler), v(this, De, t.path), v(this, Ne, t.matchResult));
  }
  get req() {
    return d(this, Pe) ?? v(this, Pe, new Ct(d(this, Re), d(this, De), d(this, Ne))), d(this, Pe);
  }
  get event() {
    if (d(this, J) && "respondWith" in d(this, J))
      return d(this, J);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, J))
      return d(this, J);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, P) || v(this, P, new Response(null, { headers: d(this, ie) ?? v(this, ie, new Headers()) }));
  }
  set res(e) {
    if (d(this, P) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, P).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = d(this, P).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    v(this, P, e), this.finalized = true;
  }
  get var() {
    return d(this, K) ? Object.fromEntries(d(this, K)) : {};
  }
}, "wt"), Re = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), me = /* @__PURE__ */ __name(function(e, t, r) {
  const n = d(this, P) ? new Headers(d(this, P).headers) : d(this, ie) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [a, l] of i)
      a.toLowerCase() === "set-cookie" ? n.append(a, l) : n.set(a, l);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        n.set(i, a);
      else {
        n.delete(i);
        for (const l of a)
          n.append(i, l);
      }
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, we);
  return new Response(e, { status: s, headers: n });
}, "me"), wt);
var k = "ALL";
var ur = "all";
var hr = ["get", "post", "put", "delete", "options", "patch"];
var Pt = "Can not add a route since the matcher is already built.";
var _t = /* @__PURE__ */ __name(class extends Error {
}, "_t");
var dr = "__COMPOSED_HANDLER";
var fr = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "fr");
var ut = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "ut");
var H;
var T;
var Nt;
var L;
var ne;
var Fe;
var Ke;
var Ee;
var pr = (Ee = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    b(this, T);
    w(this, "get");
    w(this, "post");
    w(this, "put");
    w(this, "delete");
    w(this, "options");
    w(this, "patch");
    w(this, "all");
    w(this, "on");
    w(this, "use");
    w(this, "router");
    w(this, "getPath");
    w(this, "_basePath", "/");
    b(this, H, "/");
    w(this, "routes", []);
    b(this, L, fr);
    w(this, "errorHandler", ut);
    w(this, "onError", (t2) => (this.errorHandler = t2, this));
    w(this, "notFound", (t2) => (v(this, L, t2), this));
    w(this, "fetch", (t2, ...r) => j(this, T, Ke).call(this, t2, r[1], r[0], t2.method));
    w(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${pe("/", t2)}`, r), n2, s2)));
    w(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(j(this, T, Ke).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...hr, ur].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? v(this, H, a) : j(this, T, ne).call(this, i, d(this, H), a), l.forEach((c) => {
        j(this, T, ne).call(this, i, d(this, H), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        v(this, H, c);
        for (const o of [i].flat())
          l.map((u) => {
            j(this, T, ne).call(this, o.toUpperCase(), d(this, H), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? v(this, H, i) : (v(this, H, "*"), a.unshift(i)), a.forEach((l) => {
      j(this, T, ne).call(this, k, d(this, H), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Ot : sr;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === ut ? i = s.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await ct([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[dr] = s.handler), j(a = n, T, ne).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = j(this, T, Nt).call(this);
    return r._basePath = pe(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((c) => c, "s") : s = n.replaceRequest));
    const a = i ? (c) => {
      const o = i(c);
      return Array.isArray(o) ? o : [o];
    } : (c) => {
      let o;
      try {
        o = c.executionCtx;
      } catch {
      }
      return [c.env, o];
    };
    s || (s = (() => {
      const c = pe(this._basePath, t), o = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(o) || "/", new Request(h, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (c, o) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await o();
    }, "l");
    return j(this, T, ne).call(this, k, pe(t, "*"), l), this;
  }
}, "Ee"), H = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), Nt = /* @__PURE__ */ __name(function() {
  const t = new Ee({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, v(t, L, d(this, L)), t.routes = this.routes, t;
}, "Nt"), L = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = pe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "ne"), Fe = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Fe"), Ke = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, T, Ke).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), l = new lr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: d(this, L) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await d(this, L).call(this, l);
      });
    } catch (u) {
      return j(this, T, Fe).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : d(this, L).call(this, l))).catch((u) => j(this, T, Fe).call(this, u, l)) : o ?? d(this, L).call(this, l);
  }
  const c = ct(a[0], this.errorHandler, d(this, L));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return j(this, T, Fe).call(this, o, l);
    }
  })();
}, "Ke"), Ee);
var Dt = [];
function mr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[k], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], Dt];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(e, t);
}
__name(mr, "mr");
var Ve = "[^/]+";
var ke = ".*";
var Te = "(?:|/.*)";
var ge = Symbol();
var gr = new Set(".\\+*[^]$()");
function xr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === ke || e === Te ? 1 : t === ke || t === Te ? -1 : e === Ve ? 1 : t === Ve ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(xr, "xr");
var ae;
var oe;
var q;
var ue;
var yr = (ue = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, ae);
    b(this, oe);
    b(this, q, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (d(this, ae) !== void 0)
        throw ge;
      if (i)
        return;
      v(this, ae, r);
      return;
    }
    const [a, ...l] = t, c = a === "*" ? l.length === 0 ? ["", "", ke] : ["", "", Ve] : a === "/*" ? ["", "", Te] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let h = c[2] || Ve;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw ge;
      if (o = d(this, q)[h], !o) {
        if (Object.keys(d(this, q)).some((f) => f !== ke && f !== Te))
          throw ge;
        if (i)
          return;
        o = d(this, q)[h] = new ue(), u !== "" && v(o, oe, s.varIndex++);
      }
      !i && u !== "" && n.push([u, d(o, oe)]);
    } else if (o = d(this, q)[a], !o) {
      if (Object.keys(d(this, q)).some((u) => u.length > 1 && u !== ke && u !== Te))
        throw ge;
      if (i)
        return;
      o = d(this, q)[a] = new ue();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, q)).sort(xr).map((n) => {
      const s = d(this, q)[n];
      return (typeof d(s, oe) == "number" ? `(${n})@${d(s, oe)}` : gr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, ae) == "number" && r.unshift(`#${d(this, ae)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ue"), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), ue);
var Be;
var He;
var St;
var vr = (St = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, Be, { varIndex: 0 });
    b(this, He, new yr());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (c) => {
        const o = `@\\${a}`;
        return s[a] = [o, c], a++, l = true, o;
      }), !l)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [l] = s[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(l) !== -1) {
          i[c] = i[c].replace(l, s[a][1]);
          break;
        }
    }
    return d(this, He).insert(i, t, n, d(this, Be), r), n;
  }
  buildRegExp() {
    let e = d(this, He).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "St"), Be = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), St);
var wr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Je = /* @__PURE__ */ Object.create(null);
function Ht(e) {
  return Je[e] ?? (Je[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Ht, "Ht");
function Sr() {
  Je = /* @__PURE__ */ Object.create(null);
}
__name(Sr, "Sr");
function br(e) {
  var o;
  const t = new vr(), r = [];
  if (e.length === 0)
    return wr;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [f, p]) => u ? 1 : f ? -1 : h.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, f = n.length; u < f; u++) {
    const [p, m, S] = n[u];
    p ? s[m] = [S.map(([y]) => [y, /* @__PURE__ */ Object.create(null)]), Dt] : h++;
    let g;
    try {
      g = t.insert(m, h, p);
    } catch (y) {
      throw y === ge ? new _t(m) : y;
    }
    p || (r[h] = S.map(([y, x]) => {
      const C = /* @__PURE__ */ Object.create(null);
      for (x -= 1; x >= 0; x--) {
        const [N, O] = g[x];
        C[N] = O;
      }
      return [y, C];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const m = (o = r[u][f]) == null ? void 0 : o[1];
      if (!m)
        continue;
      const S = Object.keys(m);
      for (let g = 0, y = S.length; g < y; g++)
        m[S[g]] = l[m[S[g]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(br, "br");
function fe(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Ht(r).test(t))
        return [...e[r]];
  }
}
__name(fe, "fe");
var Q;
var Z;
var Ge;
var Lt;
var bt;
var Er = (bt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, Ge);
    w(this, "name", "RegExpRouter");
    b(this, Q);
    b(this, Z);
    w(this, "match", mr);
    v(this, Q, { [k]: /* @__PURE__ */ Object.create(null) }), v(this, Z, { [k]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = d(this, Q), s = d(this, Z);
    if (!n || !s)
      throw new Error(Pt);
    n[e] || [n, s].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[k]).forEach((o) => {
        c[e][o] = [...c[k][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = Ht(t);
      e === k ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = fe(n[o], t) || fe(n[k], t) || []);
      }) : (l = n[e])[t] || (l[t] = fe(n[e], t) || fe(n[k], t) || []), Object.keys(n).forEach((o) => {
        (e === k || e === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === k || e === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = $t(t) || [t];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((h) => {
        var f;
        (e === k || e === h) && ((f = s[h])[u] || (f[u] = [...fe(n[h], u) || fe(n[k], u) || []]), s[h][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, Z)).concat(Object.keys(d(this, Q))).forEach((t) => {
      e[t] || (e[t] = j(this, Ge, Lt).call(this, t));
    }), v(this, Q, v(this, Z, void 0)), Sr(), e;
  }
}, "bt"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === k;
  return [d(this, Q), d(this, Z)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== k && t.push(...Object.keys(n[k]).map((i) => [i, n[k][i]]));
  }), r ? br(t) : null;
}, "Lt"), bt);
var ee;
var V;
var Et;
var jr = (Et = /* @__PURE__ */ __name(class {
  constructor(e) {
    w(this, "name", "SmartRouter");
    b(this, ee, []);
    b(this, V, []);
    v(this, ee, e.routers);
  }
  add(e, t, r) {
    if (!d(this, V))
      throw new Error(Pt);
    d(this, V).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, V))
      throw new Error("Fatal error");
    const r = d(this, ee), n = d(this, V), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(e, t);
      } catch (c) {
        if (c instanceof _t)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), v(this, ee, [l]), v(this, V, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, V) || d(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, ee)[0];
  }
}, "Et"), ee = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Et);
var Oe = /* @__PURE__ */ Object.create(null);
var te;
var R;
var ce;
var je;
var M;
var B;
var se;
var Ae;
var Ar = (Ae = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    b(this, B);
    b(this, te);
    b(this, R);
    b(this, ce);
    b(this, je, 0);
    b(this, M, Oe);
    if (v(this, R, n || /* @__PURE__ */ Object.create(null)), v(this, te, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, v(this, te, [s]);
    }
    v(this, ce, []);
  }
  insert(t, r, n) {
    v(this, je, ++ot(this, je)._);
    let s = this;
    const i = Zt(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], h = rr(o, u), f = Array.isArray(h) ? h[0] : o;
      if (f in d(s, R)) {
        s = d(s, R)[f], h && a.push(h[1]);
        continue;
      }
      d(s, R)[f] = new Ae(), h && (d(s, ce).push(h), a.push(h[1])), s = d(s, R)[f];
    }
    return d(s, te).push({ [t]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: d(this, je) } }), s;
  }
  search(t, r) {
    var c;
    const n = [];
    v(this, M, Oe);
    let i = [this];
    const a = At(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const h = a[o], f = o === u - 1, p = [];
      for (let m = 0, S = i.length; m < S; m++) {
        const g = i[m], y = d(g, R)[h];
        y && (v(y, M, d(g, M)), f ? (d(y, R)["*"] && n.push(...j(this, B, se).call(this, d(y, R)["*"], t, d(g, M))), n.push(...j(this, B, se).call(this, y, t, d(g, M)))) : p.push(y));
        for (let x = 0, C = d(g, ce).length; x < C; x++) {
          const N = d(g, ce)[x], O = d(g, M) === Oe ? {} : { ...d(g, M) };
          if (N === "*") {
            const E = d(g, R)["*"];
            E && (n.push(...j(this, B, se).call(this, E, t, d(g, M))), v(E, M, O), p.push(E));
            continue;
          }
          const [Le, z, U] = N;
          if (!h && !(U instanceof RegExp))
            continue;
          const _ = d(g, R)[Le], W = a.slice(o).join("/");
          if (U instanceof RegExp) {
            const E = U.exec(W);
            if (E) {
              if (O[z] = E[0], n.push(...j(this, B, se).call(this, _, t, d(g, M), O)), Object.keys(d(_, R)).length) {
                v(_, M, O);
                const A = ((c = E[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[A] || (l[A] = [])).push(_);
              }
              continue;
            }
          }
          (U === true || U.test(h)) && (O[z] = h, f ? (n.push(...j(this, B, se).call(this, _, t, O, d(g, M))), d(_, R)["*"] && n.push(...j(this, B, se).call(this, d(_, R)["*"], t, O, d(g, M)))) : (v(_, M, O), p.push(_)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Ae"), te = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, l = d(t, te).length; a < l; a++) {
    const c = d(t, te)[a], o = c[r] || c[k], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Oe || s && s !== Oe))
      for (let h = 0, f = o.possibleKeys.length; h < f; h++) {
        const p = o.possibleKeys[h], m = u[o.score];
        o.params[p] = s != null && s[p] && !m ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "se"), Ae);
var le;
var jt;
var Or = (jt = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, "name", "TrieRouter");
    b(this, le);
    v(this, le, new Ar());
  }
  add(e, t, r) {
    const n = $t(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        d(this, le).insert(e, n[s], r);
      return;
    }
    d(this, le).insert(e, t, r);
  }
  match(e, t) {
    return d(this, le).search(e, t);
  }
}, "jt"), le = /* @__PURE__ */ new WeakMap(), jt);
var qt = /* @__PURE__ */ __name(class extends pr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new jr({ routers: [new Er(), new Or()] });
  }
}, "qt");
var $r = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function c(h, f) {
      a.res.headers.set(h, f);
    }
    __name(c, "c");
    const o = await n(a.req.header("origin") || "", a);
    if (o && c("Access-Control-Allow-Origin", o), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (c("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "$r");
var kr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ht = /* @__PURE__ */ __name((e, t = Cr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ht");
var Tr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Cr = Tr;
var Ir = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Ir");
var Ft = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Mr = Object.keys(Ft);
var Rr = "index.html";
var Pr = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? Ir;
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
    let l = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(l) && (l = n(l, Rr));
    const c = e.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const m = e.mimes && ht(l, e.mimes) || ht(l);
      if (s.header("Content-Type", m || "application/octet-stream"), e.precompressed && (!m || kr.test(m))) {
        const S = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((g) => g.trim()));
        for (const g of Mr) {
          if (!S.has(g))
            continue;
          const y = await c(l + Ft[g], s);
          if (y) {
            o = y, s.header("Content-Encoding", g), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, l, s)), await i();
  };
}, "Pr");
var _r = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "_r");
var Nr = /* @__PURE__ */ __name((e) => async function(r, n) {
  return Pr({ ...e, getContent: async (i) => _r(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Nr");
var Dr = /* @__PURE__ */ __name((e) => Nr(e), "Dr");
var Hr = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function $e(e) {
  return e.replace(/\s+/g, "").length;
}
__name($e, "$e");
function rt(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.")).map((t) => t.trim()).filter(Boolean);
}
__name(rt, "rt");
function Lr(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(Lr, "Lr");
function nt(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(nt, "nt");
function qr(e, t) {
  const r = rt(e), n = Lr(e), s = nt(e), i = $e(e), { min: a, max: l } = Hr[t], c = Math.floor(i * a), o = Math.floor(i * l), u = r[0] ? `${r[0].split("\uBA70")[0]}\uBA70, \uC774\uB294 \uD575\uC2EC \uD2B9\uC9D5\uC774\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", h = [];
  for (n.length >= 2 && (h.push(`\uC8FC\uC694 \uC9C0\uD45C\uB294 ${n[0]}\uC640 ${n[1]}\uC774\uB2E4`), n.length >= 4 && h.push(`\uBE44\uAD50 \uC218\uCE58\uB294 ${n[2]}\uC640 ${n[3]}\uB85C \uB300\uC870\uB97C \uC774\uB8EC\uB2E4`)), s.length >= 3 && h.push(`${s[0]}\uC640 ${s[1]}\uC758 ${s[2]} \uCE21\uBA74\uC5D0\uC11C \uCC28\uC774\uAC00 \uC788\uB2E4`); h.length < 3; )
    h.push(`${h.length + 1}\uCC28 \uADFC\uAC70: \uAD00\uB828 \uB9E5\uB77D\uC744 \uBD84\uC11D\uD55C \uACB0\uACFC`);
  const f = n.length >= 4 ? `${n[0]}\uC640 ${n[2]}\uC758 \uCC28\uC774\uB294 ${n.length}\uBC30 \uC218\uC900\uC774\uB2E4` : "\uBE44\uAD50 \uB300\uC0C1 \uAC04 \uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uD655\uC778\uB41C\uB2E4", p = s.includes("\uAD50\uC721") && s.includes("\uBD80\uB2F4") ? "\uC774\uB294 \uAD50\uC721 \uC7AC\uC815 \uAD6C\uC870\uC758 \uBCF8\uC9C8\uC801 \uCC28\uC774\uB97C \uC2DC\uC0AC\uD55C\uB2E4" : "\uAD6D\uAC00\uBCC4 \uC815\uCC45\uC758 \uCC28\uC774\uB97C \uBC18\uC601\uD55C \uACB0\uACFC\uB85C \uD574\uC11D\uB41C\uB2E4";
  let m = "";
  {
    const g = `${u}. ${h.slice(0, 2).join(". ")}.`, y = `${f}. ${h[2]}.`, x = `${p}.`;
    m = [g, y, x].join(`

`);
  }
  const S = $e(m);
  if (S > o) {
    const g = m.split(`

`);
    let y = g[0];
    for (let x = 1; x < g.length; x++) {
      const C = y + `

` + g[x];
      if ($e(C) <= o)
        y = C;
      else
        break;
    }
    m = y;
  } else
    S < c && t !== "brief" && (m += ` \uC6D0\uBB38\uC758 \uC8FC\uC694 \uB17C\uC810\uC740 ${s.slice(0, 3).join(", ")} \uB4F1\uC774\uB2E4.`);
  return { type: "narrative", level: t, text: m, chars: $e(m), ratio: $e(m) / i, target: { min: c, max: o }, coreClaim: u, grounds: h, comparisons: [f], implications: [p] };
}
__name(qr, "qr");
function Fr(e, t) {
  const r = rt(e), n = nt(e), s = 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...n];
  for (let c = 0; c < s && c < a.length; c++)
    i.push({ term: a[c], def: `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${a[c]}"\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uC124\uBA85\uD558\uB294 \uC6A9\uC5B4\uC774\uB2E4` });
  const l = [{ title: "1. \uAC1C\uC694", keywords: n.slice(0, 3), bullets: r.slice(0, 5), children: [] }];
  return { type: "structured", level: t, toc: [{ title: "\uAC1C\uC694", anchor: "sec-1" }], hierarchy: l, glossary: i };
}
__name(Fr, "Fr");
function Kr(e, t) {
  const r = rt(e), n = nt(e);
  return { type: "mindmap", level: t, title: "\uD575\uC2EC \uAD6C\uC870", children: [{ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: r.slice(0, 6).map((i, a) => ({ title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, children: [] })) }] };
}
__name(Kr, "Kr");
function Jr(e, t, r = "preview") {
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(Jr, "Jr");
function Kt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Kt, "Kt");
function $(e, t) {
  const r = String(e || "").replace(/\s+/g, " ").trim();
  if (r.length <= t)
    return r;
  const n = r.slice(0, t), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(t * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name($, "$");
function dt(e) {
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
__name(dt, "dt");
function Vr(e) {
  const t = qr(e, "detail"), r = Fr(e, "detail"), n = Kr(e, "detail"), s = Jr(t.text, "detail", "exam"), i = e.length, a = Kt(e), l = t.coreClaim, c = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let h = t.text;
  if (!h.includes(`

`)) {
    const y = h.split(". ").filter(Boolean), x = Math.ceil(y.length / 2);
    h = y.slice(0, x).join(". ") + `.

` + y.slice(x).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, m = r.glossary, S = { title: n.title, children: n.children.map((y) => ({ title: y.title, children: (y.children || []).map((x) => ({ title: x.title, pack: Array.isArray(x.pack) && x.pack.length >= 2 ? x.pack : [x.title, `${x.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: x.explain && x.explain.length >= 30 ? x.explain : `${x.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (S.children[0] || S.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); S.children[0].children.length < 3; ) {
    const y = S.children[0].children.length + 1;
    S.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${y}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${y}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const g = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: h }, structured: { toc: f, hierarchy: p, glossary: m }, mindmap: S, selftest: g };
}
__name(Vr, "Vr");
function ft(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(ft, "ft");
function Xe(e, t) {
  var W;
  const r = t === "brief", n = t === "standard", s = e.narrative.coreClaim || "", i = e.narrative.grounds || [], a = e.narrative.comparisons || [], l = e.narrative.implications || [], c = ((W = e.source) == null ? void 0 : W.charCount) || 1e3;
  let o = "", u = s, h = [], f = [], p = [];
  if (t === "detail")
    o = String(e.narrative.summaryDetail || "").trim(), u = s, h = i, f = a, p = l;
  else if (t === "brief") {
    const E = Math.floor(c * 0.18);
    u = $(s, 60);
    const A = a[0] ? $(a[0], 80) : "";
    if (h = [], f = A ? [A] : [], p = [], A)
      o = `${u}. ${A}.`;
    else {
      const I = i[0] ? $(i[0], 60) : "";
      o = I ? `${u}. ${I}.` : `${u}.`;
    }
    o.length > E && (o = o.slice(0, E - 3) + "...");
  } else {
    const E = Math.floor(c * 0.25), A = Math.floor(c * 0.38);
    u = $(s, 80), h = i.slice(0, 2).map((re) => $(re, 70));
    const I = a[0] ? $(a[0], 90) : "";
    f = I ? [I] : [], p = [];
    const de = [u];
    if (h.length > 0 && de.push(h.join(". ")), I && de.push(`\uBC18\uBA74 ${I}`), o = de.join(". ") + ".", o.length > A)
      o = o.slice(0, A - 3) + "...";
    else if (o.length < E && l.length > 0) {
      const re = $(l[0], 60);
      o += ` ${re}.`;
    }
  }
  const m = e.structured.toc || [], S = r ? 2 : n ? 4 : 10, g = (e.structured.glossary || []).slice(0, S).map((E) => ({ term: $(E.term, 20), def: $(E.def, r ? 70 : 120) })), y = r ? 2 : n ? 3 : 5, x = /* @__PURE__ */ __name((E) => (E || []).map((A) => ({ title: $(A.title, 60), keywords: (A.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((I) => $(I, 16)), bullets: (A.bullets || []).slice(0, y).map((I) => $(I, r ? 90 : 140)), children: A.children ? x(A.children) : void 0 })), "x"), C = x(e.structured.hierarchy || []), N = Br({ toc: m, hierarchy: C, glossary: g }), O = JSON.parse(JSON.stringify(e.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), Le = r ? 70 : n ? 110 : 160, z = r ? 2 : 3;
  for (const E of O.children || [])
    for (const A of E.children || [])
      Array.isArray(A.pack) && (A.pack = A.pack.slice(0, z).map((I) => $(I, 20))), typeof A.explain == "string" && (A.explain = $(A.explain, Le)), Array.isArray(A.children) || (A.children = []);
  const U = r || n ? 2 : 4, _ = (e.selftest.items || []).slice(0, U).map((E) => {
    var A, I, de;
    return { id: E.id, type: E.type, question: $(E.question, r ? 140 : 220), hint: E.hint ? $(E.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((A = E.rubric) == null ? void 0 : A.mustInclude) || []).slice(0, r ? 2 : 4).map((re) => $(re, 20)), mustNotInclude: (((I = E.rubric) == null ? void 0 : I.mustNotInclude) || []).slice(0, 2).map((re) => $(re, 20)), maxChars: ((de = E.rubric) == null ? void 0 : de.maxChars) ?? (r ? 140 : 220) }, answerKey: E.answerKey ? $(E.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: h, comparisons: f, implications: p }, structured: { renderText: N, toc: m, hierarchy: C, glossary: g }, mindmap: { tree: O }, selftest: { passScorePct: 90, items: _ } };
}
__name(Xe, "Xe");
function Br(e) {
  var n, s;
  const t = [];
  t.push("\u2160. \uBAA9\uCC28"), (n = e.toc) != null && n.length ? e.toc.forEach((i, a) => t.push(`  ${a + 1}. ${i.title}`)) : t.push("  1. \uBCF8\uBB38"), t.push(""), t.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name((i, a) => {
    var l, c;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      t.push(`${u}- ${o.title}`), (l = o.keywords) != null && l.length && t.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((h) => t.push(`${u}  \xB7 ${h}`)), (c = o.children) != null && c.length && r(o.children, a + 1);
    }
  }, "r");
  return r(e.hierarchy || [], 1), t.push(""), t.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = e.glossary) != null && s.length ? e.glossary.forEach((i) => t.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : t.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), t.join(`
`);
}
__name(Br, "Br");
function Gr(e) {
  var i, a, l, c, o, u, h, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((l = e == null ? void 0 : e.narrative) != null && l.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const m of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(m.pack) && m.pack.length && n++, typeof m.explain == "string" && m.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((h = e == null ? void 0 : e.selftest) != null && h.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Gr, "Gr");
function zr(e) {
  var o, u, h, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((o = e.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((h = e.detail.structured.glossary) == null ? void 0 : h.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((p) => {
    let m = 0;
    for (const S of (p == null ? void 0 : p.children) || [])
      m += ((S == null ? void 0 : S.children) || []).length;
    return m;
  }, "i"), a = i(e.brief.mindmap.tree), l = i(e.standard.mindmap.tree), c = i(e.detail.mindmap.tree);
  return a === l && l === c || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), t;
}
__name(zr, "zr");
async function pt(e, t) {
  var l, c, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((h) => h.text).join("")) || "";
}
__name(pt, "pt");
function Ur(e) {
  e.post("/api/matrix", async (t) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await t.req.json(), i = String(s.text || "").trim();
      if (!i)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Kt(i), l = t.env.USE_MOCK === "true" || !t.env.GEMINI_API_KEY;
      let c = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), c = Vr(i);
      else {
        const S = ft(i);
        let g = await pt(t, S);
        if (c = dt(g), !c) {
          const y = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", ft(i)].join(`
`);
          g = await pt(t, y), c = dt(g);
        }
        if (!c)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Gr(c);
      if (o.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const u = Xe(c, "brief"), h = Xe(c, "standard"), f = Xe(c, "detail"), p = zr({ brief: u, standard: h, detail: f });
      if (p.length && l === false)
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: p.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const m = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: u, standard: h, detail: f }, views: { narrative: { brief: u.narrative, standard: h.narrative, detail: f.narrative }, structured: { brief: u.structured, standard: h.structured, detail: f.structured }, mindmap: { brief: u.mindmap, standard: h.mindmap, detail: f.mindmap }, selftest: { brief: u.selftest, standard: h.selftest, detail: f.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return t.json(m, 200);
    } catch (s) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => fn), n = await t.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return t.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return t.json(a, 200);
    } catch (r) {
      return t.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  });
}
__name(Ur, "Ur");
var F = new qt();
F.use("/api/*", $r());
F.use("/static/*", Dr({ root: "./public" }));
Ur(F);
function Ce() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ce, "Ce");
function st(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(st, "st");
function Wr(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Wr, "Wr");
function Yr(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Yr, "Yr");
function Xr(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(Xr, "Xr");
function Qr(e, t) {
  const r = Math.max(60, ye(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(Qr, "Qr");
function Zr(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = Xr((e == null ? void 0 : e.viewType) || "narrative"), n = Yr(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: l } = Qr(t), c = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), h = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${c}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", t].join(`
`), f = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
`.trim(), m = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: mindmap]
{
  "level": "detail",
  "viewType": "mindmap",
  "meta": { "grade": "${c}", "subject": "${o}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
`.trim(), S = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: selftest]
{
  "level": "detail",
  "viewType": "selftest",
  "meta": { "grade": "${c}", "subject": "${o}", "passScore": 90, "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  let g = f;
  return r === "structured" ? g = p : r === "mindmap" ? g = m : r === "selftest" && (g = S), `${h}

${g}`;
}
__name(Zr, "Zr");
function he(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(he, "he");
function ze(e) {
  const t = he(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(ze, "ze");
function en(e) {
  const t = he(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(en, "en");
function it(e) {
  const t = he(e).split(`
`), r = en(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: he(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : t.length, o = i.title, u = t.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(it, "it");
function tn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(tn, "tn");
function xe(e, t) {
  const n = ze(e).map((i, a) => ({ s: i, i: a, score: tn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Wr(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(xe, "xe");
function ye(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(ye, "ye");
var et = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function mt(e, t, r) {
  const n = Math.max(60, ye(e)), s = ye(t), i = Math.floor(n * et[r].min), a = Math.ceil(n * et[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(mt, "mt");
function Ie(e, t, r) {
  const n = Math.max(60, ye(e)), s = Math.ceil(n * et[r].max);
  let i = String(t || "").trim();
  if (ye(i) <= s)
    return i;
  const a = ze(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (ye(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ie, "Ie");
function Qe(e, t) {
  return `${e}_${t}`;
}
__name(Qe, "Qe");
function rn(e) {
  const t = it(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = Qe("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = xe(s.body, 6), o = [];
    for (const x of c)
      (x.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((N) => {
        const O = N.replace(/[()]/g, "").trim();
        O.length >= 2 && O.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(O) && o.push(O);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((x) => u.set(x, (u.get(x) || 0) + 1));
    const h = Array.from(u.entries()).sort((x, C) => C[1] - x[1]).map((x) => x[0]).filter((x) => x.length <= 10).slice(0, 3), f = xe(s.body, 3).join(" "), p = xe(s.body, 2).join(" "), m = xe(s.body, 1).join(" "), S = { id: Qe(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: h, explain: f, explainStandard: p, explainBrief: m, children: [] };
    h.forEach((x) => {
      n.has(x) || n.set(x, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${x}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${xe(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const y = ze(s.body).filter((x) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(x)).slice(0, 2);
    y.length && S.children.push({ id: Qe(a + "_adv", 1), title: y.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(S), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(rn, "rn");
function Jt(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Jt, "Jt");
function nn(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (Jt(t, n).children || []).map((u) => {
    const h = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(h == null ? void 0 : h.pack) ? h.pack : typeof (h == null ? void 0 : h.pack) == "string" ? [h.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (h == null ? void 0 : h.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: Ie(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, h) => o.push(`  ${h + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, h) => {
    var f;
    o.push(`  ${h + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ie(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(nn, "nn");
function sn(e, t) {
  const r = it(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...xe(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return Ie(e, i, t);
}
__name(sn, "sn");
function an(e, t) {
  it(e);
  const r = ze(e), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(an, "an");
function on(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const l = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((m) => m.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let h = 0;
    u.forEach((m) => {
      l.includes(m) && h++;
    });
    const f = h >= 2 || l.length >= 30, p = f ? 1 : h === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: h });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(on, "on");
function gt(e) {
  const t = he(e), { tree: r, glossary: n } = rn(t), s = { originalMeta: { textHash: st(t), chars: t.length, ts: Ce() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = sn(t, i), l = nn(t, r, n, i), c = Jt(r, i), o = an(t), h = mt(t, a, i).ok ? a : Ie(t, a, i), f = l.renderText || "", p = mt(t, f, i);
    l.renderText = p.ok ? f : Ie(t, f, i), s.modes[i] = { narrative: h, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(gt, "gt");
F.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Ce(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
F.post("/api/engine", async (e) => {
  var p, m, S, g, y, x, C;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), l = (t == null ? void 0 : t.useGemini) === true, c = he(r);
  if (c.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && e.env.GEMINI_API_KEY)
    try {
      const N = Zr({ text: c, viewType: s, level: "detail", grade: i, subject: a }), O = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", z = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${O}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: N }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), _ = (((y = (g = (S = (m = (p = z == null ? void 0 : z.candidates) == null ? void 0 : p[0]) == null ? void 0 : m.content) == null ? void 0 : S.parts) == null ? void 0 : g[0]) == null ? void 0 : y.text) || "").match(/\{[\s\S]*\}/);
      if (_) {
        const W = JSON.parse(_[0]);
        u = { originalMeta: { textHash: st(c), chars: c.length, ts: Ce() }, modes: { detail: { [s]: W }, standard: { [s]: W }, brief: { [s]: W } } }, o = "gemini-" + O;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (N) {
      console.error("[Gemini Error]", N), u = gt(c), o = "v5-local-fallback";
    }
  else
    u = gt(c);
  const h = (C = (x = u.modes) == null ? void 0 : x[n]) == null ? void 0 : C[s], f = { engine: o, mode: n, viewType: s, ts: Ce(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: h, allSummaries: u.modes, meta: f });
});
F.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = on(r, n);
  return e.json({ ok: true, result: s });
});
F.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = he(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Ce(), c = st(s), o = JSON.stringify(i);
  return await t.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, l, l, c, s, o).run(), e.json({ ok: true, id: a, textHash: c, ts: l });
});
F.get("/api/loadSummary", async (e) => {
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
F.get("/", (e) => e.redirect("/static/v5.html"));
var xt = new qt();
var cn = Object.assign({ "/src/index.tsx": F });
var Vt = false;
for (const [, e] of Object.entries(cn))
  e && (xt.route("/", e), xt.notFound(e.notFoundHandler), Vt = true);
if (!Vt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Me(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Me, "Me");
function yt(e, t) {
  const r = Me(e);
  return t.some((n) => r.includes(Me(n)));
}
__name(yt, "yt");
function ln(e, t) {
  const r = Me(e);
  return t.every((n) => r.includes(Me(n)));
}
__name(ln, "ln");
function un(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(un, "un");
function hn(e, t, r) {
  var m, S, g, y;
  const n = Me(t), s = 100;
  if (!n) {
    const x = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, C = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: x, explanationToShow: C };
  }
  const i = ((m = e.rubric) == null ? void 0 : m.mustIncludeAny) || [], a = ((S = e.rubric) == null ? void 0 : S.mustIncludeAll) || [], l = ((g = e.rubric) == null ? void 0 : g.forbid) || [], c = (y = e.rubric) == null ? void 0 : y.maxChars;
  let o = 100, u = [];
  c && n.length > c && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${c}`)), l.length && yt(n, l) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !ln(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !yt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = un(o, 0, 100);
  const h = o >= 90, f = !h && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !h && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !h && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: h, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: h ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(hn, "hn");
function dn(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((c) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[c.id]) ?? "";
    return hn(c, o, r);
  }), s = Math.round(n.reduce((c, o) => c + o.score, 0) / Math.max(1, n.length)), i = n.filter((c) => !c.correct).map((c) => c.id), a = s >= e.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(dn, "dn");
var fn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: dn }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-V6rhbh/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = xt;

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

// ../.wrangler/tmp/bundle-V6rhbh/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.5255562899578512.mjs.map
