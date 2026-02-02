var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-8oKvWF/checked-fetch.js
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

// ../.wrangler/tmp/bundle-8oKvWF/strip-cf-connecting-ip-header.js
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
var zt = Object.defineProperty;
var ot = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "ot");
var Wt = /* @__PURE__ */ __name((e, t, r) => t in e ? zt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Wt");
var w = /* @__PURE__ */ __name((e, t, r) => Wt(e, typeof t != "symbol" ? t + "" : t, r), "w");
var Xe = /* @__PURE__ */ __name((e, t, r) => t.has(e) || ot("Cannot " + r), "Xe");
var h = /* @__PURE__ */ __name((e, t, r) => (Xe(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var S = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? ot("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "S");
var y = /* @__PURE__ */ __name((e, t, r, n) => (Xe(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "y");
var T = /* @__PURE__ */ __name((e, t, r) => (Xe(e, t, "access private method"), r), "T");
var ct = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  y(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "ct");
var lt = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
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
      } catch (d) {
        if (d instanceof Error && t)
          n.error = d, c = await t(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || o) && (n.res = c), n;
  }
  __name(a, "a");
}, "lt");
var Xt = Symbol();
var Yt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof $t ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Qt(e, { all: r, dot: n }) : {};
}, "Yt");
async function Qt(e, t) {
  const r = await e.formData();
  return r ? Zt(r, t) : {};
}
__name(Qt, "Qt");
function Zt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? er(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (tr(r, n, s), delete r[n]);
  }), r;
}
__name(Zt, "Zt");
var er = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "er");
var tr = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "tr");
var At = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "At");
var rr = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = nr(e), n = At(r);
  return sr(n, t);
}, "rr");
var nr = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "nr");
var sr = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "sr");
var He = {};
var ir = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return He[n] || (r[2] ? He[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : He[n] = [e, r[1], true]), He[n];
  }
  return null;
}, "ir");
var st = /* @__PURE__ */ __name((e, t) => {
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
var ar = /* @__PURE__ */ __name((e) => st(e, decodeURI), "ar");
var Ot = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return ar(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Ot");
var or = /* @__PURE__ */ __name((e) => {
  const t = Ot(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "or");
var fe = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = fe(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "fe");
var kt = /* @__PURE__ */ __name((e) => {
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
}, "kt");
var Ye = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? st(e, Ct) : e) : e, "Ye");
var Rt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const c = a + t.length + 2, o = e.indexOf("&", c);
        return Ye(e.slice(c, o === -1 ? void 0 : o));
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
    if (n && (c = Ye(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = e.slice(l + 1, a === -1 ? void 0 : a), n && (o = Ye(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return t ? s[t] : s;
}, "Rt");
var cr = Rt;
var lr = /* @__PURE__ */ __name((e, t) => Rt(e, t, true), "lr");
var Ct = decodeURIComponent;
var ut = /* @__PURE__ */ __name((e) => st(e, Ct), "ut");
var ye;
var H;
var W;
var Mt;
var _t;
var tt;
var X;
var vt;
var $t = (vt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    S(this, W);
    w(this, "raw");
    S(this, ye);
    S(this, H);
    w(this, "routeIndex", 0);
    w(this, "path");
    w(this, "bodyCache", {});
    S(this, X, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, y(this, H, r), y(this, ye, {});
  }
  param(e) {
    return e ? T(this, W, Mt).call(this, e) : T(this, W, _t).call(this);
  }
  query(e) {
    return cr(this.url, e);
  }
  queries(e) {
    return lr(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Yt(this, e));
  }
  json() {
    return h(this, X).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return h(this, X).call(this, "text");
  }
  arrayBuffer() {
    return h(this, X).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, X).call(this, "blob");
  }
  formData() {
    return h(this, X).call(this, "formData");
  }
  addValidatedData(e, t) {
    h(this, ye)[e] = t;
  }
  valid(e) {
    return h(this, ye)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Xt]() {
    return h(this, H);
  }
  get matchedRoutes() {
    return h(this, H)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, H)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "vt"), ye = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakSet(), Mt = /* @__PURE__ */ __name(function(e) {
  const t = h(this, H)[0][this.routeIndex][1][e], r = T(this, W, tt).call(this, t);
  return r && /\%/.test(r) ? ut(r) : r;
}, "Mt"), _t = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(h(this, H)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = T(this, W, tt).call(this, h(this, H)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? ut(n) : n);
  }
  return e;
}, "_t"), tt = /* @__PURE__ */ __name(function(e) {
  return h(this, H)[1] ? h(this, H)[1][e] : e;
}, "tt"), X = /* @__PURE__ */ new WeakMap(), vt);
var ur = { Stringify: 1 };
var It = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => It(c, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "It");
var dr = "text/plain; charset=UTF-8";
var Qe = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Qe");
var Me;
var _e;
var G;
var we;
var K;
var N;
var Ie;
var ve;
var Se;
var ie;
var Ne;
var Pe;
var Y;
var pe;
var St;
var hr = (St = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    S(this, Y);
    S(this, Me);
    S(this, _e);
    w(this, "env", {});
    S(this, G);
    w(this, "finalized", false);
    w(this, "error");
    S(this, we);
    S(this, K);
    S(this, N);
    S(this, Ie);
    S(this, ve);
    S(this, Se);
    S(this, ie);
    S(this, Ne);
    S(this, Pe);
    w(this, "render", (...e2) => (h(this, ve) ?? y(this, ve, (t2) => this.html(t2)), h(this, ve).call(this, ...e2)));
    w(this, "setLayout", (e2) => y(this, Ie, e2));
    w(this, "getLayout", () => h(this, Ie));
    w(this, "setRenderer", (e2) => {
      y(this, ve, e2);
    });
    w(this, "header", (e2, t2, r) => {
      this.finalized && y(this, N, new Response(h(this, N).body, h(this, N)));
      const n = h(this, N) ? h(this, N).headers : h(this, ie) ?? y(this, ie, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    w(this, "status", (e2) => {
      y(this, we, e2);
    });
    w(this, "set", (e2, t2) => {
      h(this, G) ?? y(this, G, /* @__PURE__ */ new Map()), h(this, G).set(e2, t2);
    });
    w(this, "get", (e2) => h(this, G) ? h(this, G).get(e2) : void 0);
    w(this, "newResponse", (...e2) => T(this, Y, pe).call(this, ...e2));
    w(this, "body", (e2, t2, r) => T(this, Y, pe).call(this, e2, t2, r));
    w(this, "text", (e2, t2, r) => !h(this, ie) && !h(this, we) && !t2 && !r && !this.finalized ? new Response(e2) : T(this, Y, pe).call(this, e2, t2, Qe(dr, r)));
    w(this, "json", (e2, t2, r) => T(this, Y, pe).call(this, JSON.stringify(e2), t2, Qe("application/json", r)));
    w(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => T(this, Y, pe).call(this, s, t2, Qe("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? It(e2, ur.Stringify, false, {}).then(n) : n(e2);
    });
    w(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    w(this, "notFound", () => (h(this, Se) ?? y(this, Se, () => new Response()), h(this, Se).call(this, this)));
    y(this, Me, e), t && (y(this, K, t.executionCtx), this.env = t.env, y(this, Se, t.notFoundHandler), y(this, Pe, t.path), y(this, Ne, t.matchResult));
  }
  get req() {
    return h(this, _e) ?? y(this, _e, new $t(h(this, Me), h(this, Pe), h(this, Ne))), h(this, _e);
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
    return h(this, N) || y(this, N, new Response(null, { headers: h(this, ie) ?? y(this, ie, new Headers()) }));
  }
  set res(e) {
    if (h(this, N) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, N).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, N).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    y(this, N, e), this.finalized = true;
  }
  get var() {
    return h(this, G) ? Object.fromEntries(h(this, G)) : {};
  }
}, "St"), Me = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakSet(), pe = /* @__PURE__ */ __name(function(e, t, r) {
  const n = h(this, N) ? new Headers(h(this, N).headers) : h(this, ie) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, we);
  return new Response(e, { status: s, headers: n });
}, "pe"), St);
var O = "ALL";
var fr = "all";
var pr = ["get", "post", "put", "delete", "options", "patch"];
var Nt = "Can not add a route since the matcher is already built.";
var Pt = /* @__PURE__ */ __name(class extends Error {
}, "Pt");
var mr = "__COMPOSED_HANDLER";
var gr = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "gr");
var dt = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "dt");
var q;
var k;
var Dt;
var F;
var ne;
var Le;
var qe;
var be;
var xr = (be = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    S(this, k);
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
    S(this, q, "/");
    w(this, "routes", []);
    S(this, F, gr);
    w(this, "errorHandler", dt);
    w(this, "onError", (t2) => (this.errorHandler = t2, this));
    w(this, "notFound", (t2) => (y(this, F, t2), this));
    w(this, "fetch", (t2, ...r) => T(this, k, qe).call(this, t2, r[1], r[0], t2.method));
    w(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${fe("/", t2)}`, r), n2, s2)));
    w(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(T(this, k, qe).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...pr, fr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? y(this, q, a) : T(this, k, ne).call(this, i, h(this, q), a), l.forEach((c) => {
        T(this, k, ne).call(this, i, h(this, q), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        y(this, q, c);
        for (const o of [i].flat())
          l.map((u) => {
            T(this, k, ne).call(this, o.toUpperCase(), h(this, q), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, q, i) : (y(this, q, "*"), a.unshift(i)), a.forEach((l) => {
      T(this, k, ne).call(this, O, h(this, q), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Ot : or;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === dt ? i = s.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await lt([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[mr] = s.handler), T(a = n, k, ne).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = T(this, k, Dt).call(this);
    return r._basePath = fe(this._basePath, t), r;
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
      const c = fe(this._basePath, t), o = c === "/" ? 0 : c.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (c, o) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await o();
    }, "l");
    return T(this, k, ne).call(this, O, fe(t, "*"), l), this;
  }
}, "be"), q = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name(function() {
  const t = new be({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, y(t, F, h(this, F)), t.routes = this.routes, t;
}, "Dt"), F = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = fe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "ne"), Le = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Le"), qe = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await T(this, k, qe).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), l = new hr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, F) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, F).call(this, l);
      });
    } catch (u) {
      return T(this, k, Le).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, F).call(this, l))).catch((u) => T(this, k, Le).call(this, u, l)) : o ?? h(this, F).call(this, l);
  }
  const c = lt(a[0], this.errorHandler, h(this, F));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return T(this, k, Le).call(this, o, l);
    }
  })();
}, "qe"), be);
var Ht = [];
function yr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[O], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], Ht];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(e, t);
}
__name(yr, "yr");
var Ke = "[^/]+";
var Oe = ".*";
var ke = "(?:|/.*)";
var me = Symbol();
var wr = new Set(".\\+*[^]$()");
function vr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Oe || e === ke ? 1 : t === Oe || t === ke ? -1 : e === Ke ? 1 : t === Ke ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(vr, "vr");
var ae;
var oe;
var B;
var ue;
var Sr = (ue = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, ae);
    S(this, oe);
    S(this, B, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, ae) !== void 0)
        throw me;
      if (i)
        return;
      y(this, ae, r);
      return;
    }
    const [a, ...l] = t, c = a === "*" ? l.length === 0 ? ["", "", Oe] : ["", "", Ke] : a === "/*" ? ["", "", ke] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || Ke;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw me;
      if (o = h(this, B)[d], !o) {
        if (Object.keys(h(this, B)).some((f) => f !== Oe && f !== ke))
          throw me;
        if (i)
          return;
        o = h(this, B)[d] = new ue(), u !== "" && y(o, oe, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, oe)]);
    } else if (o = h(this, B)[a], !o) {
      if (Object.keys(h(this, B)).some((u) => u.length > 1 && u !== Oe && u !== ke))
        throw me;
      if (i)
        return;
      o = h(this, B)[a] = new ue();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, B)).sort(vr).map((n) => {
      const s = h(this, B)[n];
      return (typeof h(s, oe) == "number" ? `(${n})@${h(s, oe)}` : wr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, ae) == "number" && r.unshift(`#${h(this, ae)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ue"), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), ue);
var Je;
var De;
var bt;
var br = (bt = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, Je, { varIndex: 0 });
    S(this, De, new Sr());
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
    return h(this, De).insert(i, t, n, h(this, Je), r), n;
  }
  buildRegExp() {
    let e = h(this, De).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "bt"), Je = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), bt);
var Er = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Fe = /* @__PURE__ */ Object.create(null);
function Lt(e) {
  return Fe[e] ?? (Fe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Lt, "Lt");
function Tr() {
  Fe = /* @__PURE__ */ Object.create(null);
}
__name(Tr, "Tr");
function jr(e) {
  var o;
  const t = new br(), r = [];
  if (e.length === 0)
    return Er;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, m, b] = n[u];
    p ? s[m] = [b.map(([v]) => [v, /* @__PURE__ */ Object.create(null)]), Ht] : d++;
    let x;
    try {
      x = t.insert(m, d, p);
    } catch (v) {
      throw v === me ? new Pt(m) : v;
    }
    p || (r[d] = b.map(([v, g]) => {
      const A = /* @__PURE__ */ Object.create(null);
      for (g -= 1; g >= 0; g--) {
        const [P, j] = x[g];
        A[P] = j;
      }
      return [v, A];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const m = (o = r[u][f]) == null ? void 0 : o[1];
      if (!m)
        continue;
      const b = Object.keys(m);
      for (let x = 0, v = b.length; x < v; x++)
        m[b[x]] = l[m[b[x]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(jr, "jr");
function he(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Lt(r).test(t))
        return [...e[r]];
  }
}
__name(he, "he");
var Q;
var Z;
var ze;
var qt;
var Et;
var Ar = (Et = /* @__PURE__ */ __name(class {
  constructor() {
    S(this, ze);
    w(this, "name", "RegExpRouter");
    S(this, Q);
    S(this, Z);
    w(this, "match", yr);
    y(this, Q, { [O]: /* @__PURE__ */ Object.create(null) }), y(this, Z, { [O]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = h(this, Q), s = h(this, Z);
    if (!n || !s)
      throw new Error(Nt);
    n[e] || [n, s].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[O]).forEach((o) => {
        c[e][o] = [...c[O][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = Lt(t);
      e === O ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = he(n[o], t) || he(n[O], t) || []);
      }) : (l = n[e])[t] || (l[t] = he(n[e], t) || he(n[O], t) || []), Object.keys(n).forEach((o) => {
        (e === O || e === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === O || e === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = kt(t) || [t];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((d) => {
        var f;
        (e === O || e === d) && ((f = s[d])[u] || (f[u] = [...he(n[d], u) || he(n[O], u) || []]), s[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Z)).concat(Object.keys(h(this, Q))).forEach((t) => {
      e[t] || (e[t] = T(this, ze, qt).call(this, t));
    }), y(this, Q, y(this, Z, void 0)), Tr(), e;
  }
}, "Et"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakSet(), qt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === O;
  return [h(this, Q), h(this, Z)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== O && t.push(...Object.keys(n[O]).map((i) => [i, n[O][i]]));
  }), r ? jr(t) : null;
}, "qt"), Et);
var ee;
var J;
var Tt;
var Or = (Tt = /* @__PURE__ */ __name(class {
  constructor(e) {
    w(this, "name", "SmartRouter");
    S(this, ee, []);
    S(this, J, []);
    y(this, ee, e.routers);
  }
  add(e, t, r) {
    if (!h(this, J))
      throw new Error(Nt);
    h(this, J).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, J))
      throw new Error("Fatal error");
    const r = h(this, ee), n = h(this, J), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(e, t);
      } catch (c) {
        if (c instanceof Pt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), y(this, ee, [l]), y(this, J, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, J) || h(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ee)[0];
  }
}, "Tt"), ee = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), Tt);
var Ae = /* @__PURE__ */ Object.create(null);
var te;
var M;
var ce;
var Ee;
var C;
var z;
var se;
var Te;
var kr = (Te = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    S(this, z);
    S(this, te);
    S(this, M);
    S(this, ce);
    S(this, Ee, 0);
    S(this, C, Ae);
    if (y(this, M, n || /* @__PURE__ */ Object.create(null)), y(this, te, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, y(this, te, [s]);
    }
    y(this, ce, []);
  }
  insert(t, r, n) {
    y(this, Ee, ++ct(this, Ee)._);
    let s = this;
    const i = rr(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = ir(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, M)) {
        s = h(s, M)[f], d && a.push(d[1]);
        continue;
      }
      h(s, M)[f] = new Te(), d && (h(s, ce).push(d), a.push(d[1])), s = h(s, M)[f];
    }
    return h(s, te).push({ [t]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, Ee) } }), s;
  }
  search(t, r) {
    var c;
    const n = [];
    y(this, C, Ae);
    let i = [this];
    const a = At(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let m = 0, b = i.length; m < b; m++) {
        const x = i[m], v = h(x, M)[d];
        v && (y(v, C, h(x, C)), f ? (h(v, M)["*"] && n.push(...T(this, z, se).call(this, h(v, M)["*"], t, h(x, C))), n.push(...T(this, z, se).call(this, v, t, h(x, C)))) : p.push(v));
        for (let g = 0, A = h(x, ce).length; g < A; g++) {
          const P = h(x, ce)[g], j = h(x, C) === Ae ? {} : { ...h(x, C) };
          if (P === "*") {
            const E = h(x, M)["*"];
            E && (n.push(...T(this, z, se).call(this, E, t, h(x, C))), y(E, C, j), p.push(E));
            continue;
          }
          const [L, _, I] = P;
          if (!d && !(I instanceof RegExp))
            continue;
          const R = h(x, M)[L], U = a.slice(o).join("/");
          if (I instanceof RegExp) {
            const E = I.exec(U);
            if (E) {
              if (j[_] = E[0], n.push(...T(this, z, se).call(this, R, t, h(x, C), j)), Object.keys(h(R, M)).length) {
                y(R, C, j);
                const $ = ((c = E[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[$] || (l[$] = [])).push(R);
              }
              continue;
            }
          }
          (I === true || I.test(d)) && (j[_] = d, f ? (n.push(...T(this, z, se).call(this, R, t, j, h(x, C))), h(R, M)["*"] && n.push(...T(this, z, se).call(this, h(R, M)["*"], t, j, h(x, C)))) : (y(R, C, j), p.push(R)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Te"), te = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, l = h(t, te).length; a < l; a++) {
    const c = h(t, te)[a], o = c[r] || c[O], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ae || s && s !== Ae))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], m = u[o.score];
        o.params[p] = s != null && s[p] && !m ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "se"), Te);
var le;
var jt;
var Rr = (jt = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, "name", "TrieRouter");
    S(this, le);
    y(this, le, new kr());
  }
  add(e, t, r) {
    const n = kt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, le).insert(e, n[s], r);
      return;
    }
    h(this, le).insert(e, t, r);
  }
  match(e, t) {
    return h(this, le).search(e, t);
  }
}, "jt"), le = /* @__PURE__ */ new WeakMap(), jt);
var Ft = /* @__PURE__ */ __name(class extends xr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Or({ routers: [new Ar(), new Rr()] });
  }
}, "Ft");
var Cr = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function c(d, f) {
      a.res.headers.set(d, f);
    }
    __name(c, "c");
    const o = await n(a.req.header("origin") || "", a);
    if (o && c("Access-Control-Allow-Origin", o), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && c("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (c("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Cr");
var $r = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ht = /* @__PURE__ */ __name((e, t = _r) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ht");
var Mr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var _r = Mr;
var Ir = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Ir");
var Bt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Nr = Object.keys(Bt);
var Pr = "index.html";
var Dr = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? Ir;
  return async (s, i) => {
    var u, d, f, p;
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
    e.isDir && await e.isDir(l) && (l = n(l, Pr));
    const c = e.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const m = e.mimes && ht(l, e.mimes) || ht(l);
      if (s.header("Content-Type", m || "application/octet-stream"), e.precompressed && (!m || $r.test(m))) {
        const b = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((x) => x.trim()));
        for (const x of Nr) {
          if (!b.has(x))
            continue;
          const v = await c(l + Bt[x], s);
          if (v) {
            o = v, s.header("Content-Encoding", x), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, l, s)), await i();
  };
}, "Dr");
var Hr = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Hr");
var Lr = /* @__PURE__ */ __name((e) => async function(r, n) {
  return Dr({ ...e, getContent: async (i) => Hr(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Lr");
var qr = /* @__PURE__ */ __name((e) => Lr(e), "qr");
var Ut = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function rt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(rt, "rt");
function Fr(e) {
  return e.replace(/\s+/g, "").length;
}
__name(Fr, "Fr");
function re(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(re, "re");
function Br(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(Br, "Br");
function je(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(je, "je");
function Ze(e, t, r) {
  const n = rt(e), i = rt(t) / Math.max(n, 1), a = Ut[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(Ze, "Ze");
function Ur(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD00\uB828 \uAC1C\uB150\uC758 \uC815\uC758\uC640 \uC8FC\uC694 \uD2B9\uC9D5\uC744 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uC120\uD589\uC5F0\uAD6C\uC5D0\uC11C\uB294 \uC774\uB7EC\uD55C \uAC1C\uB150\uC744 \uB2E4\uC591\uD55C \uAD00\uC810\uC5D0\uC11C \uADDC\uC815\uD574 \uC654\uB2E4", "\uBCF8 \uC5F0\uAD6C\uB294 \uC774\uB97C \uC885\uD569\uD558\uC5EC \uC791\uC5C5 \uC815\uC758\uB97C \uC81C\uC2DC\uD55C\uB2E4"] : ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(Ur, "Ur");
function Vr(e, t, r) {
  let s = re(t).slice();
  const i = Ze(e, s.join(". ") + ".", r);
  let a = i, l = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), l = true, a = Ze(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const c = Ur(r);
    for (const o of c)
      if (s.push(o), l = true, a = Ze(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: l, originalRatio: i.ratio };
}
__name(Vr, "Vr");
function Be(e, t) {
  const r = re(e);
  je(e);
  const n = Fr(e), s = Ut[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), l = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", c = r.map((E, $) => {
    let D = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(E) && (D += 5), /(특징|특성|요인|측면|경향|양상)/.test(E) && (D += 4), /(연구|학자|선행|본|분석|종합)/.test(E) && (D += 3), /(차이|비교|대조|반면|이에 반해)/.test(E) && (D += 2), $ === 0 && (D += 3), E.length < 20 && (D -= 2), E.length > 200 && (D -= 1), { sentence: E, score: D, index: $ };
  }), o = t === "brief" ? 2 : t === "standard" ? 3 : 5, u = c.sort((E, $) => $.score - E.score || E.index - $.index).slice(0, o).sort((E, $) => E.index - $.index).map((E) => E.sentence);
  let d = "";
  t === "brief" ? d = u.slice(0, 3).join(" ") : t === "standard" ? d = u.slice(0, 5).join(" ") : d = u.join(" ");
  const f = ["\uC2A4\uC6E8\uB374", "\uD55C\uAD6D", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "OECD", "GDP"];
  for (const E of f)
    !e.includes(E) && d.includes(E) && (d = re(d).filter((D) => !D.includes(E)).join(" "));
  d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const p = Vr(e, d, t), m = p.text, b = rt(m), x = re(m), v = x[0] || l, g = x.slice(1);
  for (; g.length < 3; )
    g.push("\uC6D0\uBB38\uC758 \uCD94\uAC00 \uADFC\uAC70\uB97C \uD3EC\uD568\uD55C\uB2E4");
  const A = [], P = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const E of P)
    m.includes(E) && A.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${E}"`);
  const j = { brief: 2, standard: 4, detail: 6 };
  x.length < j[t] && A.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${x.length}\uBB38\uC7A5 (\uCD5C\uC18C ${j[t]}\uBB38\uC7A5)`);
  const L = m.includes("\uD55C\uAD6D"), _ = m.includes("\uC2A4\uC6E8\uB374");
  L && _ || A.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const I = ["7.6%", "2.8%", "6.5%", "0.2%"], R = { brief: 1, standard: 2, detail: 3 }, U = I.filter((E) => m.includes(E));
  return U.length < R[t] && A.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${U.length}\uAC1C (\uCD5C\uC18C ${R[t]}\uAC1C)`), { type: "narrative", level: t, text: m, charCount: b, ratio: p.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: p.adjusted, originalRatio: p.originalRatio, finalRatio: p.ratio, targetRatio: s.target }, coreClaim: v, grounds: g.slice(0, 5), comparisons: [], implications: [], warnings: A };
}
__name(Be, "Be");
function Ue(e, t) {
  const r = re(e), n = je(e), s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, s).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Ue, "Ue");
function Ve(e, t, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = t === "brief" || t === "standard" ? 2 : 4;
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(Ve, "Ve");
function Gr(e) {
  const t = re(e), r = je(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(Gr, "Gr");
function Kr(e, t) {
  const r = re(e), n = t === "brief" ? 2 : t === "standard" ? 3 : 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const l = a * i, c = r.slice(l, l + i);
    if (c.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${c[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: c });
  }
  return s;
}
__name(Kr, "Kr");
function Jr(e, t) {
  const r = je(e);
  Br(e);
  const n = re(e), s = t === "brief" ? 3 : t === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let l = 0; l < s && l < a.length; l++) {
    const c = a[l], o = zr(c), u = n.find((d) => d.includes(c)) || `${c}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: c, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(Jr, "Jr");
function zr(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(zr, "zr");
function Ge(e, t) {
  const r = Gr(e), n = Kr(e, t), s = Jr(e, t), i = je(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: je(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], l = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), c = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: c, hierarchy: a, glossary: l, coreTerms: s };
}
__name(Ge, "Ge");
function Vt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Vt, "Vt");
function ft(e) {
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
__name(ft, "ft");
function Wr(e) {
  const t = Be(e, "detail"), r = Ge(e, "detail"), n = Ue(e, "detail"), s = Ve(t.text, "detail", "exam"), i = e.length, a = Vt(e), l = t.coreClaim, c = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const v = d.split(". ").filter(Boolean), g = Math.ceil(v.length / 2);
    d = v.slice(0, g).join(". ") + `.

` + v.slice(g).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, m = r.glossary, b = { title: n.title, children: n.children.map((v) => ({ title: v.title, children: (v.children || []).map((g) => ({ title: g.title, pack: Array.isArray(g.pack) && g.pack.length >= 2 ? g.pack : [g.title, `${g.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: g.explain && g.explain.length >= 30 ? g.explain : `${g.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (b.children[0] || b.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); b.children[0].children.length < 3; ) {
    const v = b.children[0].children.length + 1;
    b.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${v}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${v}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const x = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: m }, mindmap: b, selftest: x };
}
__name(Wr, "Wr");
function pt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(pt, "pt");
function Xr(e) {
  var i, a, l, c, o, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((l = e == null ? void 0 : e.narrative) != null && l.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const m of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(m.pack) && m.pack.length && n++, typeof m.explain == "string" && m.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Xr, "Xr");
function Yr(e) {
  var o, u, d, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((o = e.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((d = e.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((p) => {
    let m = 0;
    for (const b of (p == null ? void 0 : p.children) || [])
      m += ((b == null ? void 0 : b.children) || []).length;
    return m;
  }, "i"), a = i(e.brief.mindmap.tree), l = i(e.standard.mindmap.tree), c = i(e.detail.mindmap.tree);
  return a === l && l === c || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), t;
}
__name(Yr, "Yr");
async function mt(e, t) {
  var l, c, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(mt, "mt");
function Qr(e) {
  e.post("/api/matrix", async (t) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await t.req.json(), i = String(s.text || "").trim();
      if (!i)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Vt(i), l = t.env.USE_MOCK === "true" || !t.env.GEMINI_API_KEY;
      let c = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), c = Wr(i);
      else {
        const E = pt(i);
        let $ = await mt(t, E);
        if (c = ft($), !c) {
          const D = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", pt(i)].join(`
`);
          $ = await mt(t, D), c = ft($);
        }
        if (!c)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Xr(c);
      if (o.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      let u = Be(i, "brief"), d = Be(i, "standard"), f = Be(i, "detail");
      const p = Ge(i, "brief"), m = Ge(i, "standard"), b = Ge(i, "detail"), x = Ue(i, "brief"), v = Ue(i, "standard"), g = Ue(i, "detail"), A = Ve(i, "brief", "preview"), P = Ve(i, "standard", "preview"), j = Ve(i, "detail", "preview");
      u.warnings && u.warnings.length > 0 && console.log("[Matrix V4] Brief \uAC80\uC99D \uC2E4\uD328:", u.warnings), d.warnings && d.warnings.length > 0 && console.log("[Matrix V4] Standard \uAC80\uC99D \uC2E4\uD328:", d.warnings), f.warnings && f.warnings.length > 0 && console.log("[Matrix V4] Detail \uAC80\uC99D \uC2E4\uD328:", f.warnings);
      const L = { narrative: { text: u.text, coreClaim: u.coreClaim, grounds: u.grounds, comparisons: u.comparisons, implications: u.implications, ratio: u.ratio, ratioEnforcement: u.ratioEnforcement, targetRange: u.targetRange, warnings: u.warnings || [] }, structured: p, mindmap: x, selftest: A }, _ = { narrative: { text: d.text, coreClaim: d.coreClaim, grounds: d.grounds, comparisons: d.comparisons, implications: d.implications, ratio: d.ratio, ratioEnforcement: d.ratioEnforcement, targetRange: d.targetRange, warnings: d.warnings || [] }, structured: m, mindmap: v, selftest: P }, I = { narrative: { text: f.text, coreClaim: f.coreClaim, grounds: f.grounds, comparisons: f.comparisons, implications: f.implications, ratio: f.ratio, ratioEnforcement: f.ratioEnforcement, targetRange: f.targetRange, warnings: f.warnings || [] }, structured: b, mindmap: g, selftest: j }, R = Yr({ brief: L, standard: _, detail: I });
      if (R.length && l === false)
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: R.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const U = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: L, standard: _, detail: I }, views: { narrative: { brief: L.narrative, standard: _.narrative, detail: I.narrative }, structured: { brief: L.structured, standard: _.structured, detail: I.structured }, mindmap: { brief: L.mindmap, standard: _.mindmap, detail: I.mindmap }, selftest: { brief: L.selftest, standard: _.selftest, detail: I.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return t.json(U, 200);
    } catch (s) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => xn), n = await t.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return t.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return t.json(a, 200);
    } catch (r) {
      return t.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  }), e.get("/api/fail-report", async (t) => {
    var r;
    try {
      const { buildFailReport: n } = await Promise.resolve().then(() => vn), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Qr, "Qr");
var V = new Ft();
V.use("/api/*", Cr());
V.use("/static/*", qr({ root: "./public" }));
Qr(V);
function Re() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Re, "Re");
function it(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(it, "it");
function Zr(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Zr, "Zr");
function en(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(en, "en");
function tn(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(tn, "tn");
function rn(e, t) {
  const r = Math.max(60, xe(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(rn, "rn");
function nn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = tn((e == null ? void 0 : e.viewType) || "narrative"), n = en(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: l } = rn(t), c = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), b = `
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
  let x = f;
  return r === "structured" ? x = p : r === "mindmap" ? x = m : r === "selftest" && (x = b), `${d}

${x}`;
}
__name(nn, "nn");
function de(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(de, "de");
function We(e) {
  const t = de(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(We, "We");
function sn(e) {
  const t = de(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(sn, "sn");
function at(e) {
  const t = de(e).split(`
`), r = sn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: de(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : t.length, o = i.title, u = t.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(at, "at");
function an(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(an, "an");
function ge(e, t) {
  const n = We(e).map((i, a) => ({ s: i, i: a, score: an(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Zr(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(ge, "ge");
function xe(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(xe, "xe");
var nt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function gt(e, t, r) {
  const n = Math.max(60, xe(e)), s = xe(t), i = Math.floor(n * nt[r].min), a = Math.ceil(n * nt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(gt, "gt");
function Ce(e, t, r) {
  const n = Math.max(60, xe(e)), s = Math.ceil(n * nt[r].max);
  let i = String(t || "").trim();
  if (xe(i) <= s)
    return i;
  const a = We(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (xe(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ce, "Ce");
function et(e, t) {
  return `${e}_${t}`;
}
__name(et, "et");
function on(e) {
  const t = at(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = et("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = ge(s.body, 6), o = [];
    for (const g of c)
      (g.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((P) => {
        const j = P.replace(/[()]/g, "").trim();
        j.length >= 2 && j.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(j) && o.push(j);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((g) => u.set(g, (u.get(g) || 0) + 1));
    const d = Array.from(u.entries()).sort((g, A) => A[1] - g[1]).map((g) => g[0]).filter((g) => g.length <= 10).slice(0, 3), f = ge(s.body, 3).join(" "), p = ge(s.body, 2).join(" "), m = ge(s.body, 1).join(" "), b = { id: et(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: m, children: [] };
    d.forEach((g) => {
      n.has(g) || n.set(g, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${g}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${ge(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const v = We(s.body).filter((g) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(g)).slice(0, 2);
    v.length && b.children.push({ id: et(a + "_adv", 1), title: v.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(b), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(on, "on");
function Gt(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Gt, "Gt");
function cn(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (Gt(t, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: Ce(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ce(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(cn, "cn");
function ln(e, t) {
  const r = at(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...ge(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return Ce(e, i, t);
}
__name(ln, "ln");
function un(e, t) {
  at(e);
  const r = We(e), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(un, "un");
function dn(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const l = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((m) => m.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((m) => {
      l.includes(m) && d++;
    });
    const f = d >= 2 || l.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(dn, "dn");
function xt(e) {
  const t = de(e), { tree: r, glossary: n } = on(t), s = { originalMeta: { textHash: it(t), chars: t.length, ts: Re() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = ln(t, i), l = cn(t, r, n, i), c = Gt(r, i), o = un(t), d = gt(t, a, i).ok ? a : Ce(t, a, i), f = l.renderText || "", p = gt(t, f, i);
    l.renderText = p.ok ? f : Ce(t, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(xt, "xt");
V.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Re(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
V.post("/api/engine", async (e) => {
  var p, m, b, x, v, g, A;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), l = (t == null ? void 0 : t.useGemini) === true, c = de(r);
  if (c.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && e.env.GEMINI_API_KEY)
    try {
      const P = nn({ text: c, viewType: s, level: "detail", grade: i, subject: a }), j = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", _ = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${j}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: P }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), R = (((v = (x = (b = (m = (p = _ == null ? void 0 : _.candidates) == null ? void 0 : p[0]) == null ? void 0 : m.content) == null ? void 0 : b.parts) == null ? void 0 : x[0]) == null ? void 0 : v.text) || "").match(/\{[\s\S]*\}/);
      if (R) {
        const U = JSON.parse(R[0]);
        u = { originalMeta: { textHash: it(c), chars: c.length, ts: Re() }, modes: { detail: { [s]: U }, standard: { [s]: U }, brief: { [s]: U } } }, o = "gemini-" + j;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (P) {
      console.error("[Gemini Error]", P), u = xt(c), o = "v5-local-fallback";
    }
  else
    u = xt(c);
  const d = (A = (g = u.modes) == null ? void 0 : g[n]) == null ? void 0 : A[s], f = { engine: o, mode: n, viewType: s, ts: Re(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
V.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = dn(r, n);
  return e.json({ ok: true, result: s });
});
V.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = de(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Re(), c = it(s), o = JSON.stringify(i);
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
V.get("/api/loadSummary", async (e) => {
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
V.get("/", (e) => e.redirect("/static/v5.html"));
var yt = new Ft();
var hn = Object.assign({ "/src/index.tsx": V });
var Kt = false;
for (const [, e] of Object.entries(hn))
  e && (yt.route("/", e), yt.notFound(e.notFoundHandler), Kt = true);
if (!Kt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function $e(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name($e, "$e");
function wt(e, t) {
  const r = $e(e);
  return t.some((n) => r.includes($e(n)));
}
__name(wt, "wt");
function fn(e, t) {
  const r = $e(e);
  return t.every((n) => r.includes($e(n)));
}
__name(fn, "fn");
function pn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(pn, "pn");
function mn(e, t, r) {
  var m, b, x, v;
  const n = $e(t), s = 100;
  if (!n) {
    const g = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, A = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: g, explanationToShow: A };
  }
  const i = ((m = e.rubric) == null ? void 0 : m.mustIncludeAny) || [], a = ((b = e.rubric) == null ? void 0 : b.mustIncludeAll) || [], l = ((x = e.rubric) == null ? void 0 : x.forbid) || [], c = (v = e.rubric) == null ? void 0 : v.maxChars;
  let o = 100, u = [];
  c && n.length > c && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${c}`)), l.length && wt(n, l) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !fn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !wt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = pn(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(mn, "mn");
function gn(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((c) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[c.id]) ?? "";
    return mn(c, o, r);
  }), s = Math.round(n.reduce((c, o) => c + o.score, 0) / Math.max(1, n.length)), i = n.filter((c) => !c.correct).map((c) => c.id), a = s >= e.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(gn, "gn");
var xn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: gn }, Symbol.toStringTag, { value: "Module" }));
var yn = [];
async function Jt(e) {
  e && await e.prepare(`
    CREATE TABLE IF NOT EXISTS ms_fail_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT NOT NULL,
      model TEXT,
      level TEXT,
      stage TEXT NOT NULL,
      errors TEXT NOT NULL,
      ratio REAL,
      sample_hash TEXT
    )
  `).run();
}
__name(Jt, "Jt");
async function wn(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await Jt(e);
    const c = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((c == null ? void 0 : c.results) || []).map((o) => ({ ts: o.ts, model: o.model, level: o.level, stage: o.stage, errors: JSON.parse(o.errors || "[]"), ratio: o.ratio, sample_hash: o.sample_hash }));
  } else
    s = yn.filter((c) => c.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const c of s) {
    i[c.stage] = (i[c.stage] || 0) + 1;
    for (const o of c.errors || [])
      a[o] = (a[o] || 0) + 1;
  }
  const l = Object.entries(a).sort((c, o) => o[1] - c[1]).slice(0, 10).map(([c, o]) => ({ error: c, count: o }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: l, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(wn, "wn");
var vn = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: wn, ensureFailLogTable: Jt }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-8oKvWF/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = yt;

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

// ../.wrangler/tmp/bundle-8oKvWF/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.7636995094044328.mjs.map
