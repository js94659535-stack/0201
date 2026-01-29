var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-rlbHwW/checked-fetch.js
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

// ../.wrangler/tmp/bundle-rlbHwW/strip-cf-connecting-ip-header.js
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
var Tt = Object.defineProperty;
var We = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "We");
var kt = /* @__PURE__ */ __name((e, t, r) => t in e ? Tt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "kt");
var b = /* @__PURE__ */ __name((e, t, r) => kt(e, typeof t != "symbol" ? t + "" : t, r), "b");
var Be = /* @__PURE__ */ __name((e, t, r) => t.has(e) || We("Cannot " + r), "Be");
var d = /* @__PURE__ */ __name((e, t, r) => (Be(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var w = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? We("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "w");
var m = /* @__PURE__ */ __name((e, t, r, n) => (Be(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "m");
var S = /* @__PURE__ */ __name((e, t, r) => (Be(e, t, "access private method"), r), "S");
var Ye = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  m(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "Ye");
var Xe = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
  let a = -1;
  return i(0);
  async function i(l) {
    if (l <= a)
      throw new Error("next() called multiple times");
    a = l;
    let o, c = false, u;
    if (e[l] ? (u = e[l][0][0], n.req.routeIndex = l) : u = l === e.length && s || void 0, u)
      try {
        o = await u(n, () => i(l + 1));
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, o = await t(h, n), c = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (o = await r(n));
    return o && (n.finalized === false || c) && (n.res = o), n;
  }
  __name(i, "i");
}, "Xe");
var $t = Symbol();
var Rt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, a = (e instanceof pt ? e.raw.headers : e.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? At(e, { all: r, dot: n }) : {};
}, "Rt");
async function At(e, t) {
  const r = await e.formData();
  return r ? Mt(r, t) : {};
}
__name(At, "At");
function Mt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? It(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Nt(r, n, s), delete r[n]);
  }), r;
}
__name(Mt, "Mt");
var It = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "It");
var Nt = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((a, i) => {
    i === s.length - 1 ? n[a] = r : ((!n[a] || typeof n[a] != "object" || Array.isArray(n[a]) || n[a] instanceof File) && (n[a] = /* @__PURE__ */ Object.create(null)), n = n[a]);
  });
}, "Nt");
var lt = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "lt");
var Pt = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = Ht(e), n = lt(r);
  return Dt(n, t);
}, "Pt");
var Ht = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "Ht");
var Dt = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "Dt");
var $e = {};
var Lt = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return $e[n] || (r[2] ? $e[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : $e[n] = [e, r[1], true]), $e[n];
  }
  return null;
}, "Lt");
var Ve = /* @__PURE__ */ __name((e, t) => {
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
}, "Ve");
var Bt = /* @__PURE__ */ __name((e) => Ve(e, decodeURI), "Bt");
var dt = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const a = t.indexOf("?", n), i = t.slice(r, a === -1 ? void 0 : a);
      return Bt(i.includes("%25") ? i.replace(/%25/g, "%2525") : i);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "dt");
var qt = /* @__PURE__ */ __name((e) => {
  const t = dt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "qt");
var ce = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = ce(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "ce");
var ut = /* @__PURE__ */ __name((e) => {
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
        const a = s.replace("?", "");
        n += "/" + a, r.push(n);
      } else
        n += "/" + s;
  }), r.filter((s, a, i) => i.indexOf(s) === a);
}, "ut");
var qe = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Ve(e, ft) : e) : e, "qe");
var ht = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let i = e.indexOf("?", 8);
    if (i === -1)
      return;
    for (e.startsWith(t, i + 1) || (i = e.indexOf(`&${t}`, i + 1)); i !== -1; ) {
      const l = e.charCodeAt(i + t.length + 1);
      if (l === 61) {
        const o = i + t.length + 2, c = e.indexOf("&", o);
        return qe(e.slice(o, c === -1 ? void 0 : c));
      } else if (l == 38 || isNaN(l))
        return "";
      i = e.indexOf(`&${t}`, i + 1);
    }
    if (n = /[%+]/.test(e), !n)
      return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(e));
  let a = e.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = e.indexOf("&", a + 1);
    let l = e.indexOf("=", a);
    l > i && i !== -1 && (l = -1);
    let o = e.slice(a + 1, l === -1 ? i === -1 ? void 0 : i : l);
    if (n && (o = qe(o)), a = i, o === "")
      continue;
    let c;
    l === -1 ? c = "" : (c = e.slice(l + 1, i === -1 ? void 0 : i), n && (c = qe(c))), r ? (s[o] && Array.isArray(s[o]) || (s[o] = []), s[o].push(c)) : s[o] ?? (s[o] = c);
  }
  return t ? s[t] : s;
}, "ht");
var zt = ht;
var Ft = /* @__PURE__ */ __name((e, t) => ht(e, t, true), "Ft");
var ft = decodeURIComponent;
var Qe = /* @__PURE__ */ __name((e) => Ve(e, ft), "Qe");
var he;
var M;
var U;
var gt;
var mt;
var Ue;
var J;
var rt;
var pt = (rt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    w(this, U);
    b(this, "raw");
    w(this, he);
    w(this, M);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    w(this, J, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((a) => (s === "json" && (a = JSON.stringify(a)), new Response(a)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, m(this, M, r), m(this, he, {});
  }
  param(e) {
    return e ? S(this, U, gt).call(this, e) : S(this, U, mt).call(this);
  }
  query(e) {
    return zt(this.url, e);
  }
  queries(e) {
    return Ft(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Rt(this, e));
  }
  json() {
    return d(this, J).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, J).call(this, "text");
  }
  arrayBuffer() {
    return d(this, J).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, J).call(this, "blob");
  }
  formData() {
    return d(this, J).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, he)[e] = t;
  }
  valid(e) {
    return d(this, he)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [$t]() {
    return d(this, M);
  }
  get matchedRoutes() {
    return d(this, M)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, M)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "rt"), he = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), gt = /* @__PURE__ */ __name(function(e) {
  const t = d(this, M)[0][this.routeIndex][1][e], r = S(this, U, Ue).call(this, t);
  return r && /\%/.test(r) ? Qe(r) : r;
}, "gt"), mt = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(d(this, M)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = S(this, U, Ue).call(this, d(this, M)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? Qe(n) : n);
  }
  return e;
}, "mt"), Ue = /* @__PURE__ */ __name(function(e) {
  return d(this, M)[1] ? d(this, M)[1][e] : e;
}, "Ue"), J = /* @__PURE__ */ new WeakMap(), rt);
var Kt = { Stringify: 1 };
var xt = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const a = e.callbacks;
  return a != null && a.length ? (s ? s[0] += e : s = [e], Promise.all(a.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((o) => xt(o, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "xt");
var Ut = "text/plain; charset=UTF-8";
var ze = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "ze");
var Se;
var Oe;
var q;
var fe;
var z;
var R;
var je;
var pe;
var ge;
var te;
var Ce;
var _e;
var V;
var le;
var st;
var Gt = (st = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    w(this, V);
    w(this, Se);
    w(this, Oe);
    b(this, "env", {});
    w(this, q);
    b(this, "finalized", false);
    b(this, "error");
    w(this, fe);
    w(this, z);
    w(this, R);
    w(this, je);
    w(this, pe);
    w(this, ge);
    w(this, te);
    w(this, Ce);
    w(this, _e);
    b(this, "render", (...e2) => (d(this, pe) ?? m(this, pe, (t2) => this.html(t2)), d(this, pe).call(this, ...e2)));
    b(this, "setLayout", (e2) => m(this, je, e2));
    b(this, "getLayout", () => d(this, je));
    b(this, "setRenderer", (e2) => {
      m(this, pe, e2);
    });
    b(this, "header", (e2, t2, r) => {
      this.finalized && m(this, R, new Response(d(this, R).body, d(this, R)));
      const n = d(this, R) ? d(this, R).headers : d(this, te) ?? m(this, te, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    b(this, "status", (e2) => {
      m(this, fe, e2);
    });
    b(this, "set", (e2, t2) => {
      d(this, q) ?? m(this, q, /* @__PURE__ */ new Map()), d(this, q).set(e2, t2);
    });
    b(this, "get", (e2) => d(this, q) ? d(this, q).get(e2) : void 0);
    b(this, "newResponse", (...e2) => S(this, V, le).call(this, ...e2));
    b(this, "body", (e2, t2, r) => S(this, V, le).call(this, e2, t2, r));
    b(this, "text", (e2, t2, r) => !d(this, te) && !d(this, fe) && !t2 && !r && !this.finalized ? new Response(e2) : S(this, V, le).call(this, e2, t2, ze(Ut, r)));
    b(this, "json", (e2, t2, r) => S(this, V, le).call(this, JSON.stringify(e2), t2, ze("application/json", r)));
    b(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => S(this, V, le).call(this, s, t2, ze("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? xt(e2, Kt.Stringify, false, {}).then(n) : n(e2);
    });
    b(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    b(this, "notFound", () => (d(this, ge) ?? m(this, ge, () => new Response()), d(this, ge).call(this, this)));
    m(this, Se, e), t && (m(this, z, t.executionCtx), this.env = t.env, m(this, ge, t.notFoundHandler), m(this, _e, t.path), m(this, Ce, t.matchResult));
  }
  get req() {
    return d(this, Oe) ?? m(this, Oe, new pt(d(this, Se), d(this, _e), d(this, Ce))), d(this, Oe);
  }
  get event() {
    if (d(this, z) && "respondWith" in d(this, z))
      return d(this, z);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, z))
      return d(this, z);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, R) || m(this, R, new Response(null, { headers: d(this, te) ?? m(this, te, new Headers()) }));
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
    m(this, R, e), this.finalized = true;
  }
  get var() {
    return d(this, q) ? Object.fromEntries(d(this, q)) : {};
  }
}, "st"), Se = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakSet(), le = /* @__PURE__ */ __name(function(e, t, r) {
  const n = d(this, R) ? new Headers(d(this, R).headers) : d(this, te) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const a = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [i, l] of a)
      i.toLowerCase() === "set-cookie" ? n.append(i, l) : n.set(i, l);
  }
  if (r)
    for (const [a, i] of Object.entries(r))
      if (typeof i == "string")
        n.set(a, i);
      else {
        n.delete(a);
        for (const l of i)
          n.append(a, l);
      }
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, fe);
  return new Response(e, { status: s, headers: n });
}, "le"), st);
var C = "ALL";
var Jt = "all";
var Vt = ["get", "post", "put", "delete", "options", "patch"];
var bt = "Can not add a route since the matcher is already built.";
var vt = /* @__PURE__ */ __name(class extends Error {
}, "vt");
var Wt = "__COMPOSED_HANDLER";
var Yt = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Yt");
var Ze = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Ze");
var N;
var _;
var wt;
var P;
var Z;
var Re;
var Ae;
var me;
var Xt = (me = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    w(this, _);
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
    w(this, N, "/");
    b(this, "routes", []);
    w(this, P, Yt);
    b(this, "errorHandler", Ze);
    b(this, "onError", (t2) => (this.errorHandler = t2, this));
    b(this, "notFound", (t2) => (m(this, P, t2), this));
    b(this, "fetch", (t2, ...r) => S(this, _, Ae).call(this, t2, r[1], r[0], t2.method));
    b(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${ce("/", t2)}`, r), n2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(S(this, _, Ae).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Vt, Jt].forEach((a) => {
      this[a] = (i, ...l) => (typeof i == "string" ? m(this, N, i) : S(this, _, Z).call(this, a, d(this, N), i), l.forEach((o) => {
        S(this, _, Z).call(this, a, d(this, N), o);
      }), this);
    }), this.on = (a, i, ...l) => {
      for (const o of [i].flat()) {
        m(this, N, o);
        for (const c of [a].flat())
          l.map((u) => {
            S(this, _, Z).call(this, c.toUpperCase(), d(this, N), u);
          });
      }
      return this;
    }, this.use = (a, ...i) => (typeof a == "string" ? m(this, N, a) : (m(this, N, "*"), i.unshift(a)), i.forEach((l) => {
      S(this, _, Z).call(this, C, d(this, N), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? dt : qt;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var i;
      let a;
      r.errorHandler === Ze ? a = s.handler : (a = /* @__PURE__ */ __name(async (l, o) => (await Xe([], r.errorHandler)(l, () => s.handler(l, o))).res, "a"), a[Wt] = s.handler), S(i = n, _, Z).call(i, s.method, s.path, a);
    }), this;
  }
  basePath(t) {
    const r = S(this, _, wt).call(this);
    return r._basePath = ce(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, a;
    n && (typeof n == "function" ? a = n : (a = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((o) => o, "s") : s = n.replaceRequest));
    const i = a ? (o) => {
      const c = a(o);
      return Array.isArray(c) ? c : [c];
    } : (o) => {
      let c;
      try {
        c = o.executionCtx;
      } catch {
      }
      return [o.env, c];
    };
    s || (s = (() => {
      const o = ce(this._basePath, t), c = o === "/" ? 0 : o.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(c) || "/", new Request(h, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (o, c) => {
      const u = await r(s(o.req.raw), ...i(o));
      if (u)
        return u;
      await c();
    }, "l");
    return S(this, _, Z).call(this, C, ce(t, "*"), l), this;
  }
}, "me"), N = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakSet(), wt = /* @__PURE__ */ __name(function() {
  const t = new me({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, m(t, P, d(this, P)), t.routes = this.routes, t;
}, "wt"), P = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = ce(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "Z"), Re = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Re"), Ae = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await S(this, _, Ae).call(this, t, r, n, "GET")))();
  const a = this.getPath(t, { env: n }), i = this.router.match(s, a), l = new Gt(t, { path: a, matchResult: i, env: n, executionCtx: r, notFoundHandler: d(this, P) });
  if (i[0].length === 1) {
    let c;
    try {
      c = i[0][0][0][0](l, async () => {
        l.res = await d(this, P).call(this, l);
      });
    } catch (u) {
      return S(this, _, Re).call(this, u, l);
    }
    return c instanceof Promise ? c.then((u) => u || (l.finalized ? l.res : d(this, P).call(this, l))).catch((u) => S(this, _, Re).call(this, u, l)) : c ?? d(this, P).call(this, l);
  }
  const o = Xe(i[0], this.errorHandler, d(this, P));
  return (async () => {
    try {
      const c = await o(l);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return S(this, _, Re).call(this, c, l);
    }
  })();
}, "Ae"), me);
var yt = [];
function Qt(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, a) => {
    const i = r[s] || r[C], l = i[2][a];
    if (l)
      return l;
    const o = a.match(i[0]);
    if (!o)
      return [[], yt];
    const c = o.indexOf("", 1);
    return [i[1][c], o];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Qt, "Qt");
var Ne = "[^/]+";
var ye = ".*";
var Ee = "(?:|/.*)";
var de = Symbol();
var Zt = new Set(".\\+*[^]$()");
function en(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === ye || e === Ee ? 1 : t === ye || t === Ee ? -1 : e === Ne ? 1 : t === Ne ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(en, "en");
var ne;
var re;
var H;
var ie;
var tn = (ie = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, ne);
    w(this, re);
    w(this, H, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, a) {
    if (t.length === 0) {
      if (d(this, ne) !== void 0)
        throw de;
      if (a)
        return;
      m(this, ne, r);
      return;
    }
    const [i, ...l] = t, o = i === "*" ? l.length === 0 ? ["", "", ye] : ["", "", Ne] : i === "/*" ? ["", "", Ee] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (o) {
      const u = o[1];
      let h = o[2] || Ne;
      if (u && o[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw de;
      if (c = d(this, H)[h], !c) {
        if (Object.keys(d(this, H)).some((f) => f !== ye && f !== Ee))
          throw de;
        if (a)
          return;
        c = d(this, H)[h] = new ie(), u !== "" && m(c, re, s.varIndex++);
      }
      !a && u !== "" && n.push([u, d(c, re)]);
    } else if (c = d(this, H)[i], !c) {
      if (Object.keys(d(this, H)).some((u) => u.length > 1 && u !== ye && u !== Ee))
        throw de;
      if (a)
        return;
      c = d(this, H)[i] = new ie();
    }
    c.insert(l, r, n, s, a);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, H)).sort(en).map((n) => {
      const s = d(this, H)[n];
      return (typeof d(s, re) == "number" ? `(${n})@${d(s, re)}` : Zt.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, ne) == "number" && r.unshift(`#${d(this, ne)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ie"), ne = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ie);
var He;
var Te;
var at;
var nn = (at = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, He, { varIndex: 0 });
    w(this, Te, new tn());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let i = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (o) => {
        const c = `@\\${i}`;
        return s[i] = [c, o], i++, l = true, c;
      }), !l)
        break;
    }
    const a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = s.length - 1; i >= 0; i--) {
      const [l] = s[i];
      for (let o = a.length - 1; o >= 0; o--)
        if (a[o].indexOf(l) !== -1) {
          a[o] = a[o].replace(l, s[i][1]);
          break;
        }
    }
    return d(this, Te).insert(a, t, n, d(this, He), r), n;
  }
  buildRegExp() {
    let e = d(this, Te).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, a, i) => a !== void 0 ? (r[++t] = Number(a), "$()") : (i !== void 0 && (n[Number(i)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "at"), He = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), at);
var rn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Me = /* @__PURE__ */ Object.create(null);
function Et(e) {
  return Me[e] ?? (Me[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Et, "Et");
function sn() {
  Me = /* @__PURE__ */ Object.create(null);
}
__name(sn, "sn");
function an(e) {
  var c;
  const t = new nn(), r = [];
  if (e.length === 0)
    return rn;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [f, x]) => u ? 1 : f ? -1 : h.length - x.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, f = n.length; u < f; u++) {
    const [x, O, g] = n[u];
    x ? s[O] = [g.map(([v]) => [v, /* @__PURE__ */ Object.create(null)]), yt] : h++;
    let p;
    try {
      p = t.insert(O, h, x);
    } catch (v) {
      throw v === de ? new vt(O) : v;
    }
    x || (r[h] = g.map(([v, y]) => {
      const B = /* @__PURE__ */ Object.create(null);
      for (y -= 1; y >= 0; y--) {
        const [$, E] = p[y];
        B[$] = E;
      }
      return [v, B];
    }));
  }
  const [a, i, l] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let f = 0, x = r[u].length; f < x; f++) {
      const O = (c = r[u][f]) == null ? void 0 : c[1];
      if (!O)
        continue;
      const g = Object.keys(O);
      for (let p = 0, v = g.length; p < v; p++)
        O[g[p]] = l[O[g[p]]];
    }
  const o = [];
  for (const u in i)
    o[u] = r[i[u]];
  return [a, o, s];
}
__name(an, "an");
function oe(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Et(r).test(t))
        return [...e[r]];
  }
}
__name(oe, "oe");
var W;
var Y;
var De;
var St;
var it;
var on = (it = /* @__PURE__ */ __name(class {
  constructor() {
    w(this, De);
    b(this, "name", "RegExpRouter");
    w(this, W);
    w(this, Y);
    b(this, "match", Qt);
    m(this, W, { [C]: /* @__PURE__ */ Object.create(null) }), m(this, Y, { [C]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = d(this, W), s = d(this, Y);
    if (!n || !s)
      throw new Error(bt);
    n[e] || [n, s].forEach((o) => {
      o[e] = /* @__PURE__ */ Object.create(null), Object.keys(o[C]).forEach((c) => {
        o[e][c] = [...o[C][c]];
      });
    }), t === "/*" && (t = "*");
    const a = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const o = Et(t);
      e === C ? Object.keys(n).forEach((c) => {
        var u;
        (u = n[c])[t] || (u[t] = oe(n[c], t) || oe(n[C], t) || []);
      }) : (l = n[e])[t] || (l[t] = oe(n[e], t) || oe(n[C], t) || []), Object.keys(n).forEach((c) => {
        (e === C || e === c) && Object.keys(n[c]).forEach((u) => {
          o.test(u) && n[c][u].push([r, a]);
        });
      }), Object.keys(s).forEach((c) => {
        (e === C || e === c) && Object.keys(s[c]).forEach((u) => o.test(u) && s[c][u].push([r, a]));
      });
      return;
    }
    const i = ut(t) || [t];
    for (let o = 0, c = i.length; o < c; o++) {
      const u = i[o];
      Object.keys(s).forEach((h) => {
        var f;
        (e === C || e === h) && ((f = s[h])[u] || (f[u] = [...oe(n[h], u) || oe(n[C], u) || []]), s[h][u].push([r, a - c + o + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, Y)).concat(Object.keys(d(this, W))).forEach((t) => {
      e[t] || (e[t] = S(this, De, St).call(this, t));
    }), m(this, W, m(this, Y, void 0)), sn(), e;
  }
}, "it"), W = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakSet(), St = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === C;
  return [d(this, W), d(this, Y)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((a) => [a, n[e][a]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== C && t.push(...Object.keys(n[C]).map((a) => [a, n[C][a]]));
  }), r ? an(t) : null;
}, "St"), it);
var X;
var F;
var ot;
var cn = (ot = /* @__PURE__ */ __name(class {
  constructor(e) {
    b(this, "name", "SmartRouter");
    w(this, X, []);
    w(this, F, []);
    m(this, X, e.routers);
  }
  add(e, t, r) {
    if (!d(this, F))
      throw new Error(bt);
    d(this, F).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, F))
      throw new Error("Fatal error");
    const r = d(this, X), n = d(this, F), s = r.length;
    let a = 0, i;
    for (; a < s; a++) {
      const l = r[a];
      try {
        for (let o = 0, c = n.length; o < c; o++)
          l.add(...n[o]);
        i = l.match(e, t);
      } catch (o) {
        if (o instanceof vt)
          continue;
        throw o;
      }
      this.match = l.match.bind(l), m(this, X, [l]), m(this, F, void 0);
      break;
    }
    if (a === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i;
  }
  get activeRouter() {
    if (d(this, F) || d(this, X).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, X)[0];
  }
}, "ot"), X = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), ot);
var we = /* @__PURE__ */ Object.create(null);
var Q;
var k;
var se;
var xe;
var T;
var K;
var ee;
var be;
var ln = (be = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    w(this, K);
    w(this, Q);
    w(this, k);
    w(this, se);
    w(this, xe, 0);
    w(this, T, we);
    if (m(this, k, n || /* @__PURE__ */ Object.create(null)), m(this, Q, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, m(this, Q, [s]);
    }
    m(this, se, []);
  }
  insert(t, r, n) {
    m(this, xe, ++Ye(this, xe)._);
    let s = this;
    const a = Pt(r), i = [];
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l], u = a[l + 1], h = Lt(c, u), f = Array.isArray(h) ? h[0] : c;
      if (f in d(s, k)) {
        s = d(s, k)[f], h && i.push(h[1]);
        continue;
      }
      d(s, k)[f] = new be(), h && (d(s, se).push(h), i.push(h[1])), s = d(s, k)[f];
    }
    return d(s, Q).push({ [t]: { handler: n, possibleKeys: i.filter((l, o, c) => c.indexOf(l) === o), score: d(this, xe) } }), s;
  }
  search(t, r) {
    var o;
    const n = [];
    m(this, T, we);
    let a = [this];
    const i = lt(r), l = [];
    for (let c = 0, u = i.length; c < u; c++) {
      const h = i[c], f = c === u - 1, x = [];
      for (let O = 0, g = a.length; O < g; O++) {
        const p = a[O], v = d(p, k)[h];
        v && (m(v, T, d(p, T)), f ? (d(v, k)["*"] && n.push(...S(this, K, ee).call(this, d(v, k)["*"], t, d(p, T))), n.push(...S(this, K, ee).call(this, v, t, d(p, T)))) : x.push(v));
        for (let y = 0, B = d(p, se).length; y < B; y++) {
          const $ = d(p, se)[y], E = d(p, T) === we ? {} : { ...d(p, T) };
          if ($ === "*") {
            const L = d(p, k)["*"];
            L && (n.push(...S(this, K, ee).call(this, L, t, d(p, T))), m(L, T, E), x.push(L));
            continue;
          }
          const [j, ve, A] = $;
          if (!h && !(A instanceof RegExp))
            continue;
          const I = d(p, k)[j], ke = i.slice(c).join("/");
          if (A instanceof RegExp) {
            const L = A.exec(ke);
            if (L) {
              if (E[ve] = L[0], n.push(...S(this, K, ee).call(this, I, t, d(p, T), E)), Object.keys(d(I, k)).length) {
                m(I, T, E);
                const Le = ((o = L[0].match(/\//)) == null ? void 0 : o.length) ?? 0;
                (l[Le] || (l[Le] = [])).push(I);
              }
              continue;
            }
          }
          (A === true || A.test(h)) && (E[ve] = h, f ? (n.push(...S(this, K, ee).call(this, I, t, E, d(p, T))), d(I, k)["*"] && n.push(...S(this, K, ee).call(this, d(I, k)["*"], t, E, d(p, T)))) : (m(I, T, E), x.push(I)));
        }
      }
      a = x.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, u) => c.score - u.score), [n.map(({ handler: c, params: u }) => [c, u])];
  }
}, "be"), Q = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakSet(), ee = /* @__PURE__ */ __name(function(t, r, n, s) {
  const a = [];
  for (let i = 0, l = d(t, Q).length; i < l; i++) {
    const o = d(t, Q)[i], c = o[r] || o[C], u = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), a.push(c), n !== we || s && s !== we))
      for (let h = 0, f = c.possibleKeys.length; h < f; h++) {
        const x = c.possibleKeys[h], O = u[c.score];
        c.params[x] = s != null && s[x] && !O ? s[x] : n[x] ?? (s == null ? void 0 : s[x]), u[c.score] = true;
      }
  }
  return a;
}, "ee"), be);
var ae;
var ct;
var dn = (ct = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    w(this, ae);
    m(this, ae, new ln());
  }
  add(e, t, r) {
    const n = ut(t);
    if (n) {
      for (let s = 0, a = n.length; s < a; s++)
        d(this, ae).insert(e, n[s], r);
      return;
    }
    d(this, ae).insert(e, t, r);
  }
  match(e, t) {
    return d(this, ae).search(e, t);
  }
}, "ct"), ae = /* @__PURE__ */ new WeakMap(), ct);
var Ot = /* @__PURE__ */ __name(class extends Xt {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new cn({ routers: [new on(), new dn()] });
  }
}, "Ot");
var un = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((a) => typeof a == "string" ? a === "*" ? () => a : (i) => a === i ? i : null : typeof a == "function" ? a : (i) => a.includes(i) ? i : null)(r.origin), s = ((a) => typeof a == "function" ? a : Array.isArray(a) ? () => a : () => [])(r.allowMethods);
  return async function(i, l) {
    var u;
    function o(h, f) {
      i.res.headers.set(h, f);
    }
    __name(o, "o");
    const c = await n(i.req.header("origin") || "", i);
    if (c && o("Access-Control-Allow-Origin", c), r.credentials && o("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), i.req.method === "OPTIONS") {
      r.origin !== "*" && o("Vary", "Origin"), r.maxAge != null && o("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(i.req.header("origin") || "", i);
      h.length && o("Access-Control-Allow-Methods", h.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const x = i.req.header("Access-Control-Request-Headers");
        x && (f = x.split(/\s*,\s*/));
      }
      return f != null && f.length && (o("Access-Control-Allow-Headers", f.join(",")), i.res.headers.append("Vary", "Access-Control-Request-Headers")), i.res.headers.delete("Content-Length"), i.res.headers.delete("Content-Type"), new Response(null, { headers: i.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && i.header("Vary", "Origin", { append: true });
  };
}, "un");
var hn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var et = /* @__PURE__ */ __name((e, t = pn) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "et");
var fn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var pn = fn;
var gn = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "gn");
var jt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var mn = Object.keys(jt);
var xn = "index.html";
var bn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? gn;
  return async (s, a) => {
    var u, h, f, x;
    if (s.finalized)
      return a();
    let i;
    if (e.path)
      i = e.path;
    else
      try {
        if (i = decodeURIComponent(s.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))
          throw new Error();
      } catch {
        return await ((u = e.onNotFound) == null ? void 0 : u.call(e, s.req.path, s)), a();
      }
    let l = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(i) : i);
    e.isDir && await e.isDir(l) && (l = n(l, xn));
    const o = e.getContent;
    let c = await o(l, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const O = e.mimes && et(l, e.mimes) || et(l);
      if (s.header("Content-Type", O || "application/octet-stream"), e.precompressed && (!O || hn.test(O))) {
        const g = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((p) => p.trim()));
        for (const p of mn) {
          if (!g.has(p))
            continue;
          const v = await o(l + jt[p], s);
          if (v) {
            c = v, s.header("Content-Encoding", p), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(c);
    }
    await ((x = e.onNotFound) == null ? void 0 : x.call(e, l, s)), await a();
  };
}, "bn");
var vn = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const a = await n.get(s, { type: "stream" });
  return a || null;
}, "vn");
var wn = /* @__PURE__ */ __name((e) => async function(r, n) {
  return bn({ ...e, getContent: async (a) => vn(a, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "wn");
var yn = /* @__PURE__ */ __name((e) => wn(e), "yn");
var G = new Ot();
var Ie = /* @__PURE__ */ new Map();
var En = 1e3 * 60 * 60 * 24 * 7;
var Fe = false;
function Ct() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ct, "Ct");
function D(e) {
  return e == null ? "" : String(e);
}
__name(D, "D");
function ue(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(ue, "ue");
function Sn(e) {
  const t = D(e).trim().toLowerCase();
  return t ? t === "brief" || t === "simple" || t === "short" || t === "lite" ? "brief" : t === "detail" || t === "detailed" || t === "full" ? "detail" : "standard" : "standard";
}
__name(Sn, "Sn");
function On(e) {
  const t = D(e).trim().toLowerCase();
  return t ? t === "narrative" || t === "structured" || t === "mindmap" || t === "selftest" ? t : t === "mind-map" || t === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(On, "On");
function jn(e) {
  const t = D(e).trim().toLowerCase();
  return t === "concept" ? "concept" : t === "exam" ? "exam" : "summary";
}
__name(jn, "jn");
function Ge(e) {
  const t = (e || "").replace(/\s+/g, " ").trim();
  if (!t)
    return [];
  const r = [];
  let n = "", s = false;
  for (let a = 0; a < t.length; a++) {
    const i = t[a], l = t[a + 1];
    (i === '"' || i === '"' || i === '"') && (s = !s), n += i, !s && /[\.\?\!]/.test(i) && l === " " ? i === "." && n.endsWith("...") || (r.push(n.trim()), n = "", a++) : !s && /[다요죠]/.test(i) && l === " " && (r.push(n.trim()), n = "", a++);
  }
  return n.trim() && r.push(n.trim()), r.length ? r : [t];
}
__name(Ge, "Ge");
var Cn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var _n = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function Tn(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e) {
    let n = false;
    for (const s of _n)
      if (s.has(r)) {
        t.add(Array.from(s)[0]), n = true;
        break;
      }
    n || t.add(r);
  }
  return t;
}
__name(Tn, "Tn");
function Pe(e) {
  return (e || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((t) => t.trim()).map((t) => t.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((t) => t.length >= 2 && !Cn.has(t));
}
__name(Pe, "Pe");
function kn(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    for (const s of Pe(n))
      t.set(s, (t.get(s) || 0) + 1);
  return e.map((n, s) => {
    const a = Pe(n);
    let i = 0;
    for (const c of a)
      i += t.get(c) || 0;
    const l = n.length, o = l < 15 ? 0.7 : l > 180 ? 0.85 : 1;
    return { idx: s, s: n, score: i * o };
  });
}
__name(kn, "kn");
function Je(e, t) {
  return kn(e).slice().sort((s, a) => a.score - s.score).slice(0, ue(t, 1, Math.max(1, e.length))).sort((s, a) => s.idx - a.idx).map((s) => s.s);
}
__name(Je, "Je");
function $n(e, t, r) {
  const n = [];
  for (const o of e) {
    const c = /\(([^)]+,?\s*\d{4})\)/g, u = [];
    let h;
    for (; (h = c.exec(o)) !== null; )
      u.push(h[1]);
    let f = o.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (f.length < 10)
      continue;
    const x = Pe(f).slice(0, 8);
    n.push({ original: o, clean: f, keywords: x, citations: u });
  }
  if (n.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const s = /* @__PURE__ */ new Map();
  for (const o of n)
    for (const c of o.keywords)
      s.set(c, (s.get(c) || 0) + 1);
  const a = [];
  for (const o of n) {
    new Set(o.keywords);
    let c = false;
    for (const u of a)
      if (o.keywords.filter((f) => u.keywords.has(f)).length >= 2) {
        u.sentences.push({ clean: o.clean, citations: o.citations }), o.keywords.forEach((f) => u.keywords.add(f)), c = true;
        break;
      }
    c || a.push({ keywords: new Set(o.keywords), sentences: [{ clean: o.clean, citations: o.citations }] });
  }
  const i = a.map((o) => {
    const c = o.sentences[0].clean, u = n.findIndex((h) => h.clean === c);
    return { ...o, originalIdx: u };
  });
  if (r === "brief") {
    const o = i.sort((f, x) => x.sentences.length - f.sentences.length)[0], c = o.sentences[0], u = o.sentences.flatMap((f) => f.citations).filter(Boolean), h = u.length > 0 ? `(${u.join("; ")})` : "";
    return `${c.clean}${h}.`;
  }
  if (r === "standard") {
    const o = i.sort((g, p) => p.sentences.length - g.sentences.length).slice(0, 3).sort((g, p) => g.originalIdx - p.originalIdx);
    if (o.length === 1) {
      const g = o[0].sentences[0], p = o[0].sentences.flatMap((y) => y.citations).filter(Boolean), v = p.length > 0 ? `(${p.join("; ")})` : "";
      return `${g.clean}${v}.`;
    }
    const c = /* @__PURE__ */ new Map();
    for (const g of o)
      for (const p of g.sentences) {
        const v = p.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (v) {
          let [, y, B] = v;
          y = y.replace(/[에게서로부터]$/g, "").trim(), c.has(y) || c.set(y, []);
          let $ = B.trim();
          $ = $.replace(/[\.。\?\!]+$/g, "").trim();
          const E = new Set(Pe($)), j = Tn(E);
          c.get(y).push({ original: $, keywords: j, citations: p.citations });
        }
      }
    const u = [];
    for (const [g, p] of c.entries()) {
      const v = p.flatMap((E) => E.citations).filter(Boolean), y = g.charAt(g.length - 1), $ = /[가-힣]/.test(y) && (y.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (p.length === 1) {
        const E = p[0].original;
        u.push({ text: `${g}${$} ${E}`, citations: v });
      } else {
        const E = [];
        for (const j of p) {
          let ve = false;
          for (const A of E) {
            const I = Array.from(j.keywords).filter((L) => A.keywords.has(L)).length, ke = Math.max(j.keywords.size, A.keywords.size);
            if (ke > 0 && I / ke >= 0.6) {
              j.original.length > A.original.length && (A.original = j.original, A.keywords = j.keywords), A.citations.push(...j.citations), ve = true;
              break;
            }
          }
          ve || E.push({ original: j.original, keywords: j.keywords, citations: [...j.citations] });
        }
        if (E.length === 1)
          u.push({ text: `${g}${$} ${E[0].original}`, citations: E.flatMap((j) => j.citations) });
        else if (E.length === 2)
          u.push({ text: `${g}${$} ${E[0].original}`, citations: E[0].citations }), u.push({ text: `${g}${$} ${E[1].original}`, citations: E[1].citations });
        else
          for (let j = 0; j < E.length; j++)
            u.push({ text: `${g}${$} ${E[j].original}`, citations: E[j].citations });
      }
    }
    if (u.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (u.length === 1) {
      const g = u[0].citations.filter(Boolean), p = g.length > 0 ? `(${g.join("; ")})` : "";
      return `${u[0].text}${p}.`;
    }
    if (u.length === 2) {
      const g = u[0].citations.filter(Boolean), p = u[1].citations.filter(Boolean), v = g.length > 0 ? `(${g.join("; ")})` : "", y = p.length > 0 ? `(${p.join("; ")})` : "";
      return `${u[0].text}${v}. ${u[1].text}${y}.`;
    }
    const h = [], f = u[0], x = f.citations.filter(Boolean), O = x.length > 0 ? `(${x.join("; ")})` : "";
    if (h.push(`${f.text}${O}.`), u.length >= 2) {
      const g = u[1], p = g.citations.filter(Boolean), v = p.length > 0 ? `(${p.join("; ")})` : "";
      h.push(`${g.text}${v}.`);
    }
    if (u.length >= 3) {
      const p = u.slice(2).map((v) => {
        const y = v.citations.filter(Boolean), B = y.length > 0 ? `(${y.join("; ")})` : "";
        return `${v.text}${B}.`;
      });
      h.push(p.join(" "));
    }
    return h.join(`

`);
  }
  const l = i.sort((o, c) => c.sentences.length - o.sentences.length).slice(0, 5).sort((o, c) => o.originalIdx - c.originalIdx);
  return l.map((o, c) => {
    const u = o.sentences[0], h = o.sentences.flatMap((x) => x.citations).filter(Boolean), f = h.length > 0 ? `(${h.join("; ")})` : "";
    return c === 0 ? `${u.clean}${f}.` : c === l.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${u.clean}${f}.` : `\uB610\uD55C ${u.clean}${f}.`;
  }).join(" ");
}
__name($n, "$n");
function tt(e, t, r) {
  const n = Ge(e), s = t === "brief" ? ue(Math.round(n.length * 0.18), 2, 4) : t === "standard" ? ue(Math.round(n.length * 0.28), 4, 8) : ue(Math.round(n.length * 0.4), 7, 14), a = Je(n, s);
  if (r === "narrative") {
    const l = $n(a, e, t);
    return { kind: "summary", mode: t, viewType: r, narrative: l };
  }
  if (r === "structured")
    return { kind: "summary", mode: t, viewType: r, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: a.map((l, o) => `- (${o + 1}) ${l}`) } };
  if (r === "mindmap") {
    const l = (a[0] || n[0] || "\uD575\uC2EC").slice(0, 40), o = [{ id: "c", label: l, level: 0 }], c = [];
    return a.slice(1).forEach((u, h) => {
      const f = `n${h + 1}`;
      o.push({ id: f, label: u.slice(0, 60), level: 1 }), c.push({ from: "c", to: f });
    }), { kind: "summary", mode: t, viewType: r, mindmap: { center: l, nodes: o, edges: c } };
  }
  const i = a.map((l, o) => ({ id: `q${o + 1}`, type: "short", question: `(${o + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${l.slice(0, 70)}"`, answerHint: l }));
  return { kind: "summary", mode: t, viewType: r, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: i } };
}
__name(tt, "tt");
function Rn(e) {
  if (!e)
    return "empty";
  let t = 2166136261, r = 0;
  for (let a = 0; a < e.length; a++) {
    const i = e.charCodeAt(a);
    t ^= i, t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24), r = (r << 5) - r + i, r |= 0;
  }
  const n = (t >>> 0).toString(16), s = (Math.abs(r) >>> 0).toString(16);
  return `${e.length.toString(16)}_${n}_${s}`;
}
__name(Rn, "Rn");
function An(e, t, r, n, s) {
  const a = Rn(n);
  return `${e}::${s || "anon"}::${t}::${r}::${a}`;
}
__name(An, "An");
async function Mn(e) {
  if (!Fe) {
    if (!e) {
      Fe = true;
      return;
    }
    await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), Fe = true;
  }
}
__name(Mn, "Mn");
async function In(e, t) {
  const r = Date.now(), n = Ie.get(t);
  if (n && r - n.createdAt < En)
    return { hit: true, data: n.data, store: "mem" };
  if (n && Ie.delete(t), !e)
    return { hit: false };
  const s = await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();
  if (!(s != null && s.response_json))
    return { hit: false };
  try {
    const a = JSON.parse(s.response_json);
    return Ie.set(t, { data: a, createdAt: r }), { hit: true, data: a, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(In, "In");
async function Ke(e, t, r, n) {
  const s = Date.now();
  Ie.set(t, { data: n, createdAt: s }), e && await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t, r, JSON.stringify(n), Ct()).run();
}
__name(Ke, "Ke");
function Nn(e, t, r) {
  const s = ['\uB2F9\uC2E0\uC740 "\uD559\uC2B5 \uD14D\uC2A4\uD2B8 \uC555\uCD95 \uC694\uC57D" \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', '\uBC18\uB4DC\uC2DC "\uC911\uAC04 \uAE00\uC790 \uC790\uB974\uAE30" \uAC19\uC740 \uBC29\uC2DD\uC740 \uAE08\uC9C0\uD569\uB2C8\uB2E4.', "\uBB38\uC7A5/\uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uC5EC \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uD55C\uAD6D\uC5B4\uB85C \uC694\uC57D\uD558\uC138\uC694.", `\uC555\uCD95\uB960 \uBAA9\uD45C: ${t === "brief" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 \uC57D 15~20% \uC218\uC900" : t === "standard" ? "\uC6D0\uBB38 \uAE38\uC774\uC758 \uC57D 25~35% \uC218\uC900" : "\uC6D0\uBB38 \uAE38\uC774\uC758 \uC57D 40~55% \uC218\uC900"}.`, "\uC911\uBCF5 \uC81C\uAC70, \uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4/\uC6D0\uC778-\uACB0\uACFC/\uC808\uCC28\uAC00 \uB4DC\uB7EC\uB098\uAC8C \uC694\uC57D\uD558\uC138\uC694."].join(`
`);
  return r === "narrative" ? `${s}

[\uCD9C\uB825 \uD615\uC2DD]
- \uD55C\uAD6D\uC5B4 \uC11C\uC220 \uC694\uC57D 1\uAC1C \uBB38\uB2E8

[\uC6D0\uBB38]
${e}` : r === "structured" ? `${s}

[\uCD9C\uB825 \uD615\uC2DD: JSON\uB9CC]
{
  "title": "\uC694\uC57D \uC81C\uBAA9",
  "bullets": ["- ...", "- ..."]
}

[\uC6D0\uBB38]
${e}` : r === "mindmap" ? `${s}

[\uCD9C\uB825 \uD615\uC2DD: JSON\uB9CC]
{
  "center": "\uC911\uC2EC\uAC1C\uB150(\uC9E7\uAC8C)",
  "nodes": [ { "id": "c", "label": "center", "level": 0 }, { "id": "n1", "label": "\uD558\uC704\uAC1C\uB150", "level": 1 } ],
  "edges": [ { "from": "c", "to": "n1" } ]
}
- nodes\uB294 6~12\uAC1C \uC815\uB3C4

[\uC6D0\uBB38]
${e}` : `${s}

[\uCD9C\uB825 \uD615\uC2DD: JSON\uB9CC]
{
  "title": "\uC140\uD504\uD14C\uC2A4\uD2B8",
  "questions": [
    { "id": "q1", "type": "short", "question": "\uC9C8\uBB38", "answerHint": "\uC815\uB2F5 \uD78C\uD2B8" }
  ]
}
- questions\uB294 5~10\uAC1C

[\uC6D0\uBB38]
${e}`;
}
__name(Nn, "Nn");
function Pn(e) {
  const t = (e || "").trim(), r = t.match(/```json\s*([\s\S]*?)\s*```/i), n = r ? r[1].trim() : t, s = n.indexOf("{"), a = n.lastIndexOf("}");
  if (s >= 0 && a > s) {
    const i = n.slice(s, a + 1);
    return JSON.parse(i);
  }
  return JSON.parse(n);
}
__name(Pn, "Pn");
async function Hn(e, t) {
  var o, c, u, h, f;
  const r = D(e.GEMINI_API_KEY).trim();
  if (!r)
    throw new Error("GEMINI_API_KEY is missing");
  const n = D(e.GEMINI_MODEL).trim() || "gemini-1.5-flash", s = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`, a = { contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let i = 0, l = 500;
  for (; i < 3; ) {
    i++;
    const x = await fetch(s, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (x.ok) {
      const g = await x.json();
      return { ok: true, text: ((f = (h = (u = (c = (o = g == null ? void 0 : g.candidates) == null ? void 0 : o[0]) == null ? void 0 : c.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : f.text) ?? "", raw: g };
    }
    if (x.status === 429 || x.status === 503) {
      await new Promise((g) => setTimeout(g, l)), l *= 2;
      continue;
    }
    const O = await x.text().catch(() => "");
    throw new Error(`Gemini error ${x.status}: ${O.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(Hn, "Hn");
var Dn = `/* MindStory Engine Bundle (compat) */
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
G.use("/api/*", un());
G.get("/static/ms-engine-bundle.js", (e) => e.text(Dn, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
G.get("/favicon.ico", (e) => e.body(null, 204));
G.use("/static/*", yn({ root: "./public" }));
G.get("/", (e) => e.html(`<!DOCTYPE html>
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
G.get("/api/health", (e) => {
  const t = !!D(e.env.GEMINI_API_KEY).trim(), r = D(e.env.USE_MOCK).trim().toLowerCase() === "true";
  return e.json({ ok: true, ts: Ct(), hasDB: !!e.env.DB, hasGeminiKey: t, engineMode: t && !r ? "gemini+fallback" : "local-only" });
});
G.post("/api/engine", async (e) => {
  var O;
  const t = Date.now(), r = e.env.DB;
  await Mn(r);
  let n = null;
  try {
    n = await e.req.json();
  } catch {
    return e.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = jn(n == null ? void 0 : n.kind), a = D((n == null ? void 0 : n.text) || ""), i = Sn((n == null ? void 0 : n.mode) || (n == null ? void 0 : n.level)), l = On((n == null ? void 0 : n.viewType) || (n == null ? void 0 : n.displayMode)), o = D(((O = n == null ? void 0 : n.options) == null ? void 0 : O.userId) || (n == null ? void 0 : n.userId) || "anon");
  if (!a.trim() || a.trim().length < 5)
    return e.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const c = An(s, i, l, a, o || null), u = await In(r, c);
  if (u.hit)
    return e.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, engine: "cache", elapsedMs: Date.now() - t } }, 200);
  const h = !!D(e.env.GEMINI_API_KEY).trim(), f = D(e.env.USE_MOCK).trim().toLowerCase() === "true";
  if (s === "summary" && h && !f)
    try {
      const g = Nn(a, i, l), p = await Hn(e.env, g);
      let v;
      if (l === "narrative")
        v = { kind: "summary", mode: i, viewType: l, narrative: (p.text || "").trim() };
      else {
        const y = Pn(p.text || "");
        l === "structured" ? v = { kind: "summary", mode: i, viewType: l, structured: { title: y.title || "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: y.bullets || [] } } : l === "mindmap" ? v = { kind: "summary", mode: i, viewType: l, mindmap: y } : v = { kind: "summary", mode: i, viewType: l, selftest: y };
      }
      return await Ke(r, c, o || "anon", v), e.json({ ok: true, data: v, meta: { cached: false, engine: "gemini", elapsedMs: Date.now() - t } }, 200);
    } catch (g) {
      const p = tt(a, i, l);
      return await Ke(r, c, o || "anon", p), e.json({ ok: true, data: p, meta: { cached: false, engine: "local(fallback)", geminiError: g != null && g.message ? String(g.message).slice(0, 180) : "unknown", elapsedMs: Date.now() - t } }, 200);
    }
  let x;
  if (s === "summary")
    x = tt(a, i, l);
  else if (s === "concept") {
    const g = Ge(a), p = Je(g, ue(Math.round(g.length * 0.25), 6, 10));
    x = { kind: s, mode: i, viewType: l, concepts: p.map((v, y) => ({ term: `\uD575\uC2EC\uAC1C\uB150${y + 1}`, definition: v.slice(0, 120) })) };
  } else {
    const g = Ge(a), p = Je(g, ue(Math.round(g.length * 0.22), 6, 10));
    x = { kind: s, mode: i, viewType: l, items: p.map((v, y) => ({ id: `e${y + 1}`, type: "mcq", question: `(${y + 1}) \uB2E4\uC74C \uC124\uBA85\uC758 \uD575\uC2EC \uC694\uC9C0\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?`, choices: ["\uD575\uC2EC \uC8FC\uC7A5/\uC694\uC9C0", "\uADFC\uAC70/\uC608\uC2DC", "\uBC18\uBC15/\uD55C\uACC4", "\uC8FC\uC81C\uC640 \uBB34\uAD00"], answerIndex: 0, explanation: v })) };
  }
  return await Ke(r, c, o || "anon", x), e.json({ ok: true, data: x, meta: { cached: false, engine: h && !f ? "local(no-gemini-for-kind)" : "local", elapsedMs: Date.now() - t } }, 200);
});
G.notFound((e) => e.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var nt = new Ot();
var Ln = Object.assign({ "/src/index.tsx": G });
var _t = false;
for (const [, e] of Object.entries(Ln))
  e && (nt.route("/", e), nt.notFound(e.notFoundHandler), _t = true);
if (!_t)
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

// ../.wrangler/tmp/bundle-rlbHwW/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = nt;

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

// ../.wrangler/tmp/bundle-rlbHwW/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.257798757463342.mjs.map
