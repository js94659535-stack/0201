var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-3t6a8o/checked-fetch.js
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

// ../.wrangler/tmp/bundle-3t6a8o/strip-cf-connecting-ip-header.js
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
var Or = Object.defineProperty;
var Nt = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Nt");
var _r = /* @__PURE__ */ __name((e, t, r) => t in e ? Or(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "_r");
var b = /* @__PURE__ */ __name((e, t, r) => _r(e, typeof t != "symbol" ? t + "" : t, r), "b");
var ht = /* @__PURE__ */ __name((e, t, r) => t.has(e) || Nt("Cannot " + r), "ht");
var h = /* @__PURE__ */ __name((e, t, r) => (ht(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var A = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? Nt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "A");
var w = /* @__PURE__ */ __name((e, t, r, n) => (ht(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "w");
var M = /* @__PURE__ */ __name((e, t, r) => (ht(e, t, "access private method"), r), "M");
var It = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  w(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "It");
var Pt = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
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
      } catch (d) {
        if (d instanceof Error && t)
          n.error = d, l = await t(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || o) && (n.res = l), n;
  }
  __name(a, "a");
}, "Pt");
var Mr = Symbol();
var Cr = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof sr ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Rr(e, { all: r, dot: n }) : {};
}, "Cr");
async function Rr(e, t) {
  const r = await e.formData();
  return r ? Nr(r, t) : {};
}
__name(Rr, "Rr");
function Nr(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Ir(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Pr(r, n, s), delete r[n]);
  }), r;
}
__name(Nr, "Nr");
var Ir = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Ir");
var Pr = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Pr");
var Zt = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Zt");
var Dr = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = Lr(e), n = Zt(r);
  return Hr(n, t);
}, "Dr");
var Lr = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "Lr");
var Hr = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "Hr");
var rt = {};
var qr = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return rt[n] || (r[2] ? rt[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : rt[n] = [e, r[1], true]), rt[n];
  }
  return null;
}, "qr");
var Tt = /* @__PURE__ */ __name((e, t) => {
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
}, "Tt");
var Fr = /* @__PURE__ */ __name((e) => Tt(e, decodeURI), "Fr");
var er = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return Fr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "er");
var Br = /* @__PURE__ */ __name((e) => {
  const t = er(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Br");
var Me = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = Me(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "Me");
var tr = /* @__PURE__ */ __name((e) => {
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
}, "tr");
var ft = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Tt(e, nr) : e) : e, "ft");
var rr = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const c = e.charCodeAt(a + t.length + 1);
      if (c === 61) {
        const l = a + t.length + 2, o = e.indexOf("&", l);
        return ft(e.slice(l, o === -1 ? void 0 : o));
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
    if (n && (l = ft(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = e.slice(c + 1, a === -1 ? void 0 : a), n && (o = ft(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return t ? s[t] : s;
}, "rr");
var Vr = rr;
var Kr = /* @__PURE__ */ __name((e, t) => rr(e, t, true), "Kr");
var nr = decodeURIComponent;
var Dt = /* @__PURE__ */ __name((e) => Tt(e, nr), "Dt");
var Pe;
var Q;
var le;
var ir;
var ar;
var St;
var de;
var Jt;
var sr = (Jt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    A(this, le);
    b(this, "raw");
    A(this, Pe);
    A(this, Q);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    A(this, de, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, w(this, Q, r), w(this, Pe, {});
  }
  param(e) {
    return e ? M(this, le, ir).call(this, e) : M(this, le, ar).call(this);
  }
  query(e) {
    return Vr(this.url, e);
  }
  queries(e) {
    return Kr(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Cr(this, e));
  }
  json() {
    return h(this, de).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return h(this, de).call(this, "text");
  }
  arrayBuffer() {
    return h(this, de).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, de).call(this, "blob");
  }
  formData() {
    return h(this, de).call(this, "formData");
  }
  addValidatedData(e, t) {
    h(this, Pe)[e] = t;
  }
  valid(e) {
    return h(this, Pe)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Mr]() {
    return h(this, Q);
  }
  get matchedRoutes() {
    return h(this, Q)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, Q)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Jt"), Pe = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakSet(), ir = /* @__PURE__ */ __name(function(e) {
  const t = h(this, Q)[0][this.routeIndex][1][e], r = M(this, le, St).call(this, t);
  return r && /\%/.test(r) ? Dt(r) : r;
}, "ir"), ar = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(h(this, Q)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = M(this, le, St).call(this, h(this, Q)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? Dt(n) : n);
  }
  return e;
}, "ar"), St = /* @__PURE__ */ __name(function(e) {
  return h(this, Q)[1] ? h(this, Q)[1][e] : e;
}, "St"), de = /* @__PURE__ */ new WeakMap(), Jt);
var Gr = { Stringify: 1 };
var or = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((c) => c({ phase: t, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => or(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "or");
var Ur = "text/plain; charset=UTF-8";
var pt = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "pt");
var Xe;
var Ye;
var ie;
var De;
var ae;
var J;
var Qe;
var Le;
var He;
var be;
var Ze;
var et;
var he;
var Ce;
var zt;
var Jr = (zt = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    A(this, he);
    A(this, Xe);
    A(this, Ye);
    b(this, "env", {});
    A(this, ie);
    b(this, "finalized", false);
    b(this, "error");
    A(this, De);
    A(this, ae);
    A(this, J);
    A(this, Qe);
    A(this, Le);
    A(this, He);
    A(this, be);
    A(this, Ze);
    A(this, et);
    b(this, "render", (...e2) => (h(this, Le) ?? w(this, Le, (t2) => this.html(t2)), h(this, Le).call(this, ...e2)));
    b(this, "setLayout", (e2) => w(this, Qe, e2));
    b(this, "getLayout", () => h(this, Qe));
    b(this, "setRenderer", (e2) => {
      w(this, Le, e2);
    });
    b(this, "header", (e2, t2, r) => {
      this.finalized && w(this, J, new Response(h(this, J).body, h(this, J)));
      const n = h(this, J) ? h(this, J).headers : h(this, be) ?? w(this, be, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    b(this, "status", (e2) => {
      w(this, De, e2);
    });
    b(this, "set", (e2, t2) => {
      h(this, ie) ?? w(this, ie, /* @__PURE__ */ new Map()), h(this, ie).set(e2, t2);
    });
    b(this, "get", (e2) => h(this, ie) ? h(this, ie).get(e2) : void 0);
    b(this, "newResponse", (...e2) => M(this, he, Ce).call(this, ...e2));
    b(this, "body", (e2, t2, r) => M(this, he, Ce).call(this, e2, t2, r));
    b(this, "text", (e2, t2, r) => !h(this, be) && !h(this, De) && !t2 && !r && !this.finalized ? new Response(e2) : M(this, he, Ce).call(this, e2, t2, pt(Ur, r)));
    b(this, "json", (e2, t2, r) => M(this, he, Ce).call(this, JSON.stringify(e2), t2, pt("application/json", r)));
    b(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => M(this, he, Ce).call(this, s, t2, pt("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? or(e2, Gr.Stringify, false, {}).then(n) : n(e2);
    });
    b(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    b(this, "notFound", () => (h(this, He) ?? w(this, He, () => new Response()), h(this, He).call(this, this)));
    w(this, Xe, e), t && (w(this, ae, t.executionCtx), this.env = t.env, w(this, He, t.notFoundHandler), w(this, et, t.path), w(this, Ze, t.matchResult));
  }
  get req() {
    return h(this, Ye) ?? w(this, Ye, new sr(h(this, Xe), h(this, et), h(this, Ze))), h(this, Ye);
  }
  get event() {
    if (h(this, ae) && "respondWith" in h(this, ae))
      return h(this, ae);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, ae))
      return h(this, ae);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, J) || w(this, J, new Response(null, { headers: h(this, be) ?? w(this, be, new Headers()) }));
  }
  set res(e) {
    if (h(this, J) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, J).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, J).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    w(this, J, e), this.finalized = true;
  }
  get var() {
    return h(this, ie) ? Object.fromEntries(h(this, ie)) : {};
  }
}, "zt"), Xe = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakSet(), Ce = /* @__PURE__ */ __name(function(e, t, r) {
  const n = h(this, J) ? new Headers(h(this, J).headers) : h(this, be) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, De);
  return new Response(e, { status: s, headers: n });
}, "Ce"), zt);
var L = "ALL";
var zr = "all";
var Wr = ["get", "post", "put", "delete", "options", "patch"];
var cr = "Can not add a route since the matcher is already built.";
var lr = /* @__PURE__ */ __name(class extends Error {
}, "lr");
var Xr = "__COMPOSED_HANDLER";
var Yr = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Yr");
var Lt = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Lt");
var ee;
var H;
var ur;
var te;
var Se;
var nt;
var st;
var qe;
var Qr = (qe = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    A(this, H);
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
    A(this, ee, "/");
    b(this, "routes", []);
    A(this, te, Yr);
    b(this, "errorHandler", Lt);
    b(this, "onError", (t2) => (this.errorHandler = t2, this));
    b(this, "notFound", (t2) => (w(this, te, t2), this));
    b(this, "fetch", (t2, ...r) => M(this, H, st).call(this, t2, r[1], r[0], t2.method));
    b(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${Me("/", t2)}`, r), n2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(M(this, H, st).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Wr, zr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? w(this, ee, a) : M(this, H, Se).call(this, i, h(this, ee), a), c.forEach((l) => {
        M(this, H, Se).call(this, i, h(this, ee), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        w(this, ee, l);
        for (const o of [i].flat())
          c.map((u) => {
            M(this, H, Se).call(this, o.toUpperCase(), h(this, ee), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, ee, i) : (w(this, ee, "*"), a.unshift(i)), a.forEach((c) => {
      M(this, H, Se).call(this, L, h(this, ee), c);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? er : Br;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === Lt ? i = s.handler : (i = /* @__PURE__ */ __name(async (c, l) => (await Pt([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[Xr] = s.handler), M(a = n, H, Se).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = M(this, H, ur).call(this);
    return r._basePath = Me(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((l) => l, "s") : s = n.replaceRequest));
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
      const l = Me(this._basePath, t), o = l === "/" ? 0 : l.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const c = /* @__PURE__ */ __name(async (l, o) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return M(this, H, Se).call(this, L, Me(t, "*"), c), this;
  }
}, "qe"), ee = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), ur = /* @__PURE__ */ __name(function() {
  const t = new qe({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, w(t, te, h(this, te)), t.routes = this.routes, t;
}, "ur"), te = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = Me(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "Se"), nt = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "nt"), st = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await M(this, H, st).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), c = new Jr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, te) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await h(this, te).call(this, c);
      });
    } catch (u) {
      return M(this, H, nt).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : h(this, te).call(this, c))).catch((u) => M(this, H, nt).call(this, u, c)) : o ?? h(this, te).call(this, c);
  }
  const l = Pt(a[0], this.errorHandler, h(this, te));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return M(this, H, nt).call(this, o, c);
    }
  })();
}, "st"), qe);
var dr = [];
function Zr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[L], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], dr];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Zr, "Zr");
var ot = "[^/]+";
var Ge = ".*";
var Ue = "(?:|/.*)";
var Re = Symbol();
var en = new Set(".\\+*[^]$()");
function tn(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ge || e === Ue ? 1 : t === Ge || t === Ue ? -1 : e === ot ? 1 : t === ot ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(tn, "tn");
var Ee;
var ke;
var re;
var Ae;
var rn = (Ae = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, Ee);
    A(this, ke);
    A(this, re, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, Ee) !== void 0)
        throw Re;
      if (i)
        return;
      w(this, Ee, r);
      return;
    }
    const [a, ...c] = t, l = a === "*" ? c.length === 0 ? ["", "", Ge] : ["", "", ot] : a === "/*" ? ["", "", Ue] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let d = l[2] || ot;
      if (u && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw Re;
      if (o = h(this, re)[d], !o) {
        if (Object.keys(h(this, re)).some((f) => f !== Ge && f !== Ue))
          throw Re;
        if (i)
          return;
        o = h(this, re)[d] = new Ae(), u !== "" && w(o, ke, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, ke)]);
    } else if (o = h(this, re)[a], !o) {
      if (Object.keys(h(this, re)).some((u) => u.length > 1 && u !== Ge && u !== Ue))
        throw Re;
      if (i)
        return;
      o = h(this, re)[a] = new Ae();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, re)).sort(tn).map((n) => {
      const s = h(this, re)[n];
      return (typeof h(s, ke) == "number" ? `(${n})@${h(s, ke)}` : en.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, Ee) == "number" && r.unshift(`#${h(this, Ee)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "Ae"), Ee = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), Ae);
var ct;
var tt;
var Wt;
var nn = (Wt = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, ct, { varIndex: 0 });
    A(this, tt, new rn());
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
    return h(this, tt).insert(i, t, n, h(this, ct), r), n;
  }
  buildRegExp() {
    let e = h(this, tt).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Wt"), ct = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), Wt);
var sn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var it = /* @__PURE__ */ Object.create(null);
function hr(e) {
  return it[e] ?? (it[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(hr, "hr");
function an() {
  it = /* @__PURE__ */ Object.create(null);
}
__name(an, "an");
function on(e) {
  var o;
  const t = new nn(), r = [];
  if (e.length === 0)
    return sn;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, g]) => u ? 1 : f ? -1 : d.length - g.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [g, v, y] = n[u];
    g ? s[v] = [y.map(([x]) => [x, /* @__PURE__ */ Object.create(null)]), dr] : d++;
    let S;
    try {
      S = t.insert(v, d, g);
    } catch (x) {
      throw x === Re ? new lr(v) : x;
    }
    g || (r[d] = y.map(([x, m]) => {
      const $ = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [E, T] = S[m];
        $[E] = T;
      }
      return [x, $];
    }));
  }
  const [i, a, c] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, g = r[u].length; f < g; f++) {
      const v = (o = r[u][f]) == null ? void 0 : o[1];
      if (!v)
        continue;
      const y = Object.keys(v);
      for (let S = 0, x = y.length; S < x; S++)
        v[y[S]] = c[v[y[S]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(on, "on");
function _e(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (hr(r).test(t))
        return [...e[r]];
  }
}
__name(_e, "_e");
var fe;
var pe;
var lt;
var fr;
var Xt;
var cn = (Xt = /* @__PURE__ */ __name(class {
  constructor() {
    A(this, lt);
    b(this, "name", "RegExpRouter");
    A(this, fe);
    A(this, pe);
    b(this, "match", Zr);
    w(this, fe, { [L]: /* @__PURE__ */ Object.create(null) }), w(this, pe, { [L]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var c;
    const n = h(this, fe), s = h(this, pe);
    if (!n || !s)
      throw new Error(cr);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[L]).forEach((o) => {
        l[e][o] = [...l[L][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = hr(t);
      e === L ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = _e(n[o], t) || _e(n[L], t) || []);
      }) : (c = n[e])[t] || (c[t] = _e(n[e], t) || _e(n[L], t) || []), Object.keys(n).forEach((o) => {
        (e === L || e === o) && Object.keys(n[o]).forEach((u) => {
          l.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === L || e === o) && Object.keys(s[o]).forEach((u) => l.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = tr(t) || [t];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(s).forEach((d) => {
        var f;
        (e === L || e === d) && ((f = s[d])[u] || (f[u] = [..._e(n[d], u) || _e(n[L], u) || []]), s[d][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, pe)).concat(Object.keys(h(this, fe))).forEach((t) => {
      e[t] || (e[t] = M(this, lt, fr).call(this, t));
    }), w(this, fe, w(this, pe, void 0)), an(), e;
  }
}, "Xt"), fe = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakSet(), fr = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === L;
  return [h(this, fe), h(this, pe)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== L && t.push(...Object.keys(n[L]).map((i) => [i, n[L][i]]));
  }), r ? on(t) : null;
}, "fr"), Xt);
var me;
var oe;
var Yt;
var ln = (Yt = /* @__PURE__ */ __name(class {
  constructor(e) {
    b(this, "name", "SmartRouter");
    A(this, me, []);
    A(this, oe, []);
    w(this, me, e.routers);
  }
  add(e, t, r) {
    if (!h(this, oe))
      throw new Error(cr);
    h(this, oe).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, oe))
      throw new Error("Fatal error");
    const r = h(this, me), n = h(this, oe), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(e, t);
      } catch (l) {
        if (l instanceof lr)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), w(this, me, [c]), w(this, oe, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, oe) || h(this, me).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, me)[0];
  }
}, "Yt"), me = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), Yt);
var Ke = /* @__PURE__ */ Object.create(null);
var ge;
var V;
var Te;
var Fe;
var F;
var ce;
var we;
var Be;
var un = (Be = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    A(this, ce);
    A(this, ge);
    A(this, V);
    A(this, Te);
    A(this, Fe, 0);
    A(this, F, Ke);
    if (w(this, V, n || /* @__PURE__ */ Object.create(null)), w(this, ge, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, w(this, ge, [s]);
    }
    w(this, Te, []);
  }
  insert(t, r, n) {
    w(this, Fe, ++It(this, Fe)._);
    let s = this;
    const i = Dr(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], d = qr(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, V)) {
        s = h(s, V)[f], d && a.push(d[1]);
        continue;
      }
      h(s, V)[f] = new Be(), d && (h(s, Te).push(d), a.push(d[1])), s = h(s, V)[f];
    }
    return h(s, ge).push({ [t]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: h(this, Fe) } }), s;
  }
  search(t, r) {
    var l;
    const n = [];
    w(this, F, Ke);
    let i = [this];
    const a = Zt(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, g = [];
      for (let v = 0, y = i.length; v < y; v++) {
        const S = i[v], x = h(S, V)[d];
        x && (w(x, F, h(S, F)), f ? (h(x, V)["*"] && n.push(...M(this, ce, we).call(this, h(x, V)["*"], t, h(S, F))), n.push(...M(this, ce, we).call(this, x, t, h(S, F)))) : g.push(x));
        for (let m = 0, $ = h(S, Te).length; m < $; m++) {
          const E = h(S, Te)[m], T = h(S, F) === Ke ? {} : { ...h(S, F) };
          if (E === "*") {
            const k = h(S, V)["*"];
            k && (n.push(...M(this, ce, we).call(this, k, t, h(S, F))), w(k, F, T), g.push(k));
            continue;
          }
          const [C, z, O] = E;
          if (!d && !(O instanceof RegExp))
            continue;
          const I = h(S, V)[C], P = a.slice(o).join("/");
          if (O instanceof RegExp) {
            const k = O.exec(P);
            if (k) {
              if (T[z] = k[0], n.push(...M(this, ce, we).call(this, I, t, h(S, F), T)), Object.keys(h(I, V)).length) {
                w(I, F, T);
                const p = ((l = k[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[p] || (c[p] = [])).push(I);
              }
              continue;
            }
          }
          (O === true || O.test(d)) && (T[z] = d, f ? (n.push(...M(this, ce, we).call(this, I, t, T, h(S, F))), h(I, V)["*"] && n.push(...M(this, ce, we).call(this, h(I, V)["*"], t, T, h(S, F)))) : (w(I, F, T), g.push(I)));
        }
      }
      i = g.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Be"), ge = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakSet(), we = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, c = h(t, ge).length; a < c; a++) {
    const l = h(t, ge)[a], o = l[r] || l[L], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ke || s && s !== Ke))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const g = o.possibleKeys[d], v = u[o.score];
        o.params[g] = s != null && s[g] && !v ? s[g] : n[g] ?? (s == null ? void 0 : s[g]), u[o.score] = true;
      }
  }
  return i;
}, "we"), Be);
var $e;
var Qt;
var dn = (Qt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    A(this, $e);
    w(this, $e, new un());
  }
  add(e, t, r) {
    const n = tr(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, $e).insert(e, n[s], r);
      return;
    }
    h(this, $e).insert(e, t, r);
  }
  match(e, t) {
    return h(this, $e).search(e, t);
  }
}, "Qt"), $e = /* @__PURE__ */ new WeakMap(), Qt);
var pr = /* @__PURE__ */ __name(class extends Qr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new ln({ routers: [new cn(), new dn()] });
  }
}, "pr");
var hn = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && l("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const g = a.req.header("Access-Control-Request-Headers");
        g && (f = g.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "hn");
var fn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var Ht = /* @__PURE__ */ __name((e, t = mn) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "Ht");
var pn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var mn = pn;
var gn = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "gn");
var mr = { br: ".br", zstd: ".zst", gzip: ".gz" };
var xn = Object.keys(mr);
var vn = "index.html";
var yn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? gn;
  return async (s, i) => {
    var u, d, f, g;
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
    e.isDir && await e.isDir(c) && (c = n(c, vn));
    const l = e.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const v = e.mimes && Ht(c, e.mimes) || Ht(c);
      if (s.header("Content-Type", v || "application/octet-stream"), e.precompressed && (!v || fn.test(v))) {
        const y = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((S) => S.trim()));
        for (const S of xn) {
          if (!y.has(S))
            continue;
          const x = await l(c + mr[S], s);
          if (x) {
            o = x, s.header("Content-Encoding", S), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, c, s)), s.body(o);
    }
    await ((g = e.onNotFound) == null ? void 0 : g.call(e, c, s)), await i();
  };
}, "yn");
var Sn = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Sn");
var wn = /* @__PURE__ */ __name((e) => async function(r, n) {
  return yn({ ...e, getContent: async (i) => Sn(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "wn");
var bn = /* @__PURE__ */ __name((e) => wn(e), "bn");
var gr = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function wt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(wt, "wt");
function En(e) {
  return e.replace(/\s+/g, "").length;
}
__name(En, "En");
function xe(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(xe, "xe");
function kn(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(kn, "kn");
function Ve(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(Ve, "Ve");
function mt(e, t, r) {
  const n = wt(e), i = wt(t) / Math.max(n, 1), a = gr[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(mt, "mt");
function Tn(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD00\uB828 \uAC1C\uB150\uC758 \uC815\uC758\uC640 \uC8FC\uC694 \uD2B9\uC9D5\uC744 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uC120\uD589\uC5F0\uAD6C\uC5D0\uC11C\uB294 \uC774\uB7EC\uD55C \uAC1C\uB150\uC744 \uB2E4\uC591\uD55C \uAD00\uC810\uC5D0\uC11C \uADDC\uC815\uD574 \uC654\uB2E4", "\uBCF8 \uC5F0\uAD6C\uB294 \uC774\uB97C \uC885\uD569\uD558\uC5EC \uC791\uC5C5 \uC815\uC758\uB97C \uC81C\uC2DC\uD55C\uB2E4"] : ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(Tn, "Tn");
function xr(e, t, r) {
  let s = xe(t).slice();
  const i = mt(e, s.join(". ") + ".", r);
  let a = i, c = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), c = true, a = mt(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const l = Tn(r);
    for (const o of l)
      if (s.push(o), c = true, a = mt(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: c, originalRatio: i.ratio };
}
__name(xr, "xr");
function $n(e, t) {
  const r = ["\uCC28\uC774", "\uBE44\uAD50", "\uB300\uC870", "\uBC18\uBA74", "\uC774\uC5D0 \uBC18\uD574", "\uD55C\uD3B8", "\uB2EC\uB9AC"];
  return t.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name($n, "$n");
function An(e, t) {
  const r = ["\uB530\uB77C\uC11C", "\uADF8\uB7EC\uBBC0\uB85C", "\uACB0\uB860", "\uC758\uBBF8", "\uC2DC\uC0AC", "\uC911\uC694", "\uD6A8\uACFC"];
  return t.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name(An, "An");
function jn(e, t) {
  const r = xe(e);
  Ve(e);
  const n = En(e), s = gr[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), c = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", u = r.map((p, j) => {
    let N = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(p) && (N += 5), /(특징|특성|요인|측면|경향|양상)/.test(p) && (N += 4), /(연구|학자|선행|본|분석|종합)/.test(p) && (N += 3), /(차이|비교|대조|반면|이에 반해)/.test(p) && (N += 2), j === 0 && (N += 3), p.length < 20 && (N -= 2), p.length > 200 && (N -= 1), { sentence: p, score: N, index: j };
  }).sort((p, j) => j.score - p.score || p.index - j.index).slice(0, 5).sort((p, j) => p.index - j.index).map((p) => p.sentence);
  let d = "";
  d = u.join(" "), d = xe(d).filter((p) => {
    const j = p.match(/[A-Z][a-z]+|(?:[一-龥]+)|(?:[가-힣]{2,}(?:국|시|도|군|구))/g) || [];
    for (const N of j)
      if (N.length >= 2 && !e.includes(N))
        return false;
    return true;
  }).join(" "), d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const v = xr(e, d, t), y = v.text, S = wt(y), x = xe(y), m = x[0] || c, $ = x.slice(1, 4), E = [], T = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const p of T)
    y.includes(p) && E.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${p}"`);
  const C = { brief: 2, standard: 4, detail: 6 };
  x.length < C[t] && E.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${x.length}\uBB38\uC7A5 (\uCD5C\uC18C ${C[t]}\uBB38\uC7A5)`), ![/([가-힣]{2,4})(은|는|와|과)\s*([가-힣]{2,4})(의|을|를)/, /(차이|비교|대조|반면)/].some((p) => p.test(y)) && e.match(/(비교|대조|차이)/) && E.push("\uBE44\uAD50 \uC694\uC18C \uB204\uB77D");
  const I = e.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], P = y.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], k = { brief: Math.min(1, I.length), standard: Math.min(2, I.length), detail: Math.min(3, I.length) };
  return P.length < k[t] && I.length > 0 && E.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${P.length}\uAC1C (\uCD5C\uC18C ${k[t]}\uAC1C)`), { type: "narrative", level: t, text: y, charCount: S, ratio: v.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: v.adjusted, originalRatio: v.originalRatio, finalRatio: v.ratio, targetRatio: s.target }, coreClaim: m, grounds: $.slice(0, 5), comparisons: $n(e, x), implications: An(e, x), warnings: E };
}
__name(jn, "jn");
function On(e, t) {
  const r = xe(e), n = Ve(e);
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, 6).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(On, "On");
function _n(e, t, r = "preview") {
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(_n, "_n");
function Mn(e) {
  const t = xe(e), r = Ve(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(Mn, "Mn");
function Cn(e, t) {
  const r = xe(e), n = 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const c = a * i, l = r.slice(c, c + i);
    if (l.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${l[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: l });
  }
  return s;
}
__name(Cn, "Cn");
function Rn(e, t) {
  const r = Ve(e);
  kn(e);
  const n = xe(e), s = 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let c = 0; c < s && c < a.length; c++) {
    const l = a[c], o = Nn(l), u = n.find((d) => d.includes(l)) || `${l}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: l, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(Rn, "Rn");
function Nn(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(Nn, "Nn");
function In(e, t) {
  const r = Mn(e), n = Cn(e), s = Rn(e), i = Ve(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: Ve(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], c = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), l = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: l, hierarchy: a, glossary: c, coreTerms: s };
}
__name(In, "In");
var X = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var vr = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4", "\uC81C\uC2DC\uB41C\uB2E4", "\uC81C\uC2DC\uD558\uACE0 \uC788\uB2E4", "\uBCF4\uC778\uB2E4", "\uB098\uD0C0\uB0B8\uB2E4", "\uB4DC\uB7EC\uB0B8\uB2E4", "\uC0B4\uD3B4\uBCF8\uB2E4", "\uB17C\uC758\uD55C\uB2E4", "\uBD84\uC11D\uD55C\uB2E4", "\uAC80\uD1A0\uD55C\uB2E4", "\uACE0\uCC30\uD55C\uB2E4"];
var Pn = [{ pattern: /([가-힣]{2,10})(이|가|은|는|을|를)?\s*없다.{1,50}\1(이|가|은|는|을|를)?\s*(필요|중요)/, desc: "\uC5C6\uB2E4 + \uD544\uC694/\uC911\uC694 \uBAA8\uC21C" }, { pattern: /([가-힣]{2,10})(이|가|은|는|을|를)?\s*부족.{1,50}\1(이|가|은|는|을|를)?\s*풍부/, desc: "\uBD80\uC871 + \uD48D\uBD80 \uBAA8\uC21C" }, { pattern: /([가-힣]{2,10})(이|가|은|는|을|를)?\s*낮다.{1,50}\1(이|가|은|는|을|를)?\s*높다/, desc: "\uB0AE\uB2E4 + \uB192\uB2E4 \uBAA8\uC21C" }, { pattern: /([가-힣]{2,10})(이|가|은|는|을|를)?\s*높다.{1,50}\1(이|가|은|는|을|를)?\s*낮다/, desc: "\uB192\uB2E4 + \uB0AE\uB2E4 \uBAA8\uC21C" }];
var $t = ["7.6%", "2.8%", "6.5%", "0.2%"];
var yr = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function je(e) {
  return e == null ? "" : String(e);
}
__name(je, "je");
function bt(e) {
  return je(e).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(bt, "bt");
function Dn(e) {
  return je(e).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(Dn, "Dn");
function Sr(e, t, r) {
  const n = bt(e), i = bt(t) / Math.max(n, 1), a = X[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a };
}
__name(Sr, "Sr");
function at(e, t) {
  const r = je(e);
  return t.filter((n) => r.includes(n)).length;
}
__name(at, "at");
var wr = [];
async function At(e) {
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
__name(At, "At");
function Ln(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Ln, "Ln");
async function Et(e, t) {
  const r = { ...t, sample_hash: t.sample_hash || Ln((t.errors || []).join("|")) };
  wr.push(r), e && (await At(e), await e.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Et, "Et");
async function Hn(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await At(e);
    const l = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((l == null ? void 0 : l.results) || []).map((o) => ({ ts: o.ts, model: o.model, level: o.level, stage: o.stage, errors: JSON.parse(o.errors || "[]"), ratio: o.ratio, sample_hash: o.sample_hash }));
  } else
    s = wr.filter((l) => l.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const l of s) {
    i[l.stage] = (i[l.stage] || 0) + 1;
    for (const o of l.errors || [])
      a[o] = (a[o] || 0) + 1;
  }
  const c = Object.entries(a).sort((l, o) => o[1] - l[1]).slice(0, 10).map(([l, o]) => ({ error: l, count: o }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: c, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(Hn, "Hn");
function br(e, t) {
  const r = [], n = yr[t], s = je(e);
  for (const l of vr)
    s.includes(l) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${l}"`);
  for (const { pattern: l, desc: o } of Pn)
    l.test(s) && r.push(`\uCE58\uBA85\uC801 \uC758\uBBF8 \uBAA8\uC21C: ${o}`);
  const i = Dn(s), a = new Set(i.map((l) => l.trim().toLowerCase()));
  a.size < i.length && r.push(`\uBB38\uC7A5 \uC911\uBCF5 \uBC1C\uACAC: ${i.length}\uAC1C \uC911 ${a.size}\uAC1C\uB9CC \uACE0\uC720`), i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const c = at(s, $t);
  return c < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${c}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(br, "br");
function gt(e, t) {
  const r = t || ["\uBBFC\uAC04 \uBD80\uB2F4", "\uACF5\uAD50\uC721 \uCC45\uC784", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC"], n = je(e);
  let s = 0;
  for (const a of r)
    n.includes(a) && s++;
  const i = t ? Math.min(2, t.length) : 3;
  return { score: s, need: i };
}
__name(gt, "gt");
function qn(e) {
  const t = [], r = /* @__PURE__ */ __name((n) => {
    if (!n)
      return;
    typeof n.label == "string" && t.push(n.label);
    const s = Array.isArray(n.children) ? n.children : [];
    for (const i of s)
      r(i);
  }, "r");
  return r(e), t;
}
__name(qn, "qn");
function jt(e) {
  var y, S;
  const t = [], r = JSON.stringify(e.structured || {}), n = qn((y = e.mindmap) == null ? void 0 : y.root).join(" | "), s = [e.narrative.brief, e.narrative.standard, e.narrative.detail].join(" ");
  let i = [];
  if (e.detailSlots) {
    const { coreClaim: x, grounds: m, comparisons: $, implications: E } = e.detailSlots, C = [x || "", ...m || [], ...$ || [], ...E || []].join(" ").match(/[\uAC00-\uD7AF]{2,5}/g) || [], z = {};
    for (const O of C)
      z[O] = (z[O] || 0) + 1;
    i = Object.entries(z).sort((O, I) => I[1] - O[1]).slice(0, 5).map(([O]) => O);
  }
  const a = gt(s, i.length > 0 ? i : void 0), c = gt(r, i.length > 0 ? i : void 0), l = gt(n, i.length > 0 ? i : void 0);
  if (a.score < a.need && (i.length > 0 && a.score >= 1 || t.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4(\uD575\uC2EC \uAC1C\uB150\uAD70) \uC57D\uD568")), c.score < c.need && (i.length > 0 && c.score >= 1 || t.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4(\uD575\uC2EC \uAC1C\uB150\uAD70) \uC57D\uD568")), l.score < l.need && (i.length > 0 && l.score >= 1 || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4(\uD575\uC2EC \uAC1C\uB150\uAD70) \uC57D\uD568")), i.length > 0) {
    const m = (((S = e.detailSlots) == null ? void 0 : S.comparisons) || []).join(" ").match(/[가-힣]{2,4}/g) || [], $ = Array.from(new Set(m));
    if ($.length < 2)
      t.push("\uC11C\uC220\uC694\uC57D: \uBE44\uAD50 \uC694\uC18C \uBD80\uC871 (\uCD5C\uC18C 2\uAC1C \uD544\uC694)");
    else {
      const E = $[0], T = $[1];
      s.includes(E) && s.includes(T) || t.push(`\uC11C\uC220\uC694\uC57D: ${E}/${T} \uBE44\uAD50 \uB204\uB77D`), r.includes(E) && r.includes(T) || t.push(`\uAD6C\uC870\uD654: ${E}/${T} \uBE44\uAD50 \uB204\uB77D`), n.includes(E) && n.includes(T) || t.push(`\uB9C8\uC778\uB4DC\uB9F5: ${E}/${T} \uBE44\uAD50 \uB204\uB77D`);
    }
  } else
    s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || t.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || t.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const o = /* @__PURE__ */ __name((x) => {
    const m = [/\d+\.?\d*%/g, /\d+억/g, /\d+만/g, /\d{4}년/g, /\d+(?:배|회|개|명|건)/g], $ = /* @__PURE__ */ new Set();
    for (const E of m) {
      const T = x.match(E);
      T && T.forEach((C) => $.add(C));
    }
    return Array.from($);
  }, "o");
  let u = $t;
  if (e.detailSlots) {
    const x = [e.detailSlots.coreClaim || "", ...e.detailSlots.grounds || [], ...e.detailSlots.comparisons || [], ...e.detailSlots.implications || []].join(" "), m = o(x);
    m.length >= 2 && (u = m);
  }
  const d = at(s, u), f = at(r, u), g = at(n, u), v = e.detailSlots && u.length >= 2 ? 1 : 2;
  return d < v && t.push(`\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871 (${d}/${v})`), f < v && t.push(`\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871 (${f}/${v})`), g < v && t.push(`\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871 (${g}/${v})`), { ok: t.length === 0, errors: t };
}
__name(jt, "jt");
function Er(e, t, r, n) {
  const s = yr[r].minNumbers, i = X[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 '\uAD50\uC815'\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418, \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${vr.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${$t.join(", ")}
   - \uC22B\uC790\uB294 \uBC18\uB4DC\uC2DC \uB77C\uBCA8\uC744 \uBD99\uC5EC\uB77C(\uC608: "\uD55C\uAD6D \uBBFC\uAC04 \uBD80\uB2F4\uB960 2.8%").
\u2463 \uBB38\uC7A5\uC740 \uC9E7\uAC8C, \uD55C \uBB38\uC7A5 \uD55C \uC8FC\uC7A5.
\u2464 \uC5F0\uAD6C \uB17C\uBB38 \uB9D0\uD22C \uAE08\uC9C0, \uAD50\uACFC \uB3C5\uD574 \uB9D0\uD22C\uB85C \uC791\uC131.

\uC6D0\uBB38:
"""${e}"""

\uC2E4\uD328\uD55C \uC694\uC57D:
"""${t}"""

\uCD9C\uB825:
${r} \uB2E8\uACC4 \uC11C\uC220\uC694\uC57D \uBB38\uB2E8\uB9CC \uCD9C\uB825\uD558\uB77C.
`.trim();
}
__name(Er, "Er");
async function kr(e) {
  const { originalText: t, model: r, callLLM: n, db: s } = e, i = ["brief", "standard", "detail"];
  for (const c of i) {
    const l = je(e.narrative[c]), o = br(l, c), u = Sr(t, l, c);
    if (!o.ok || !u.ok) {
      const d = [...o.ok ? [] : o.errors, ...u.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(u.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(u.rule.min * 100)}~${Math.round(u.rule.max * 100)}%)`]];
      await Et(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: c, stage: "narrative", errors: d, ratio: u.ratio });
      const f = Er(t, l, c, d), g = await Promise.resolve(n(f));
      e.narrative[c] = je(g).trim();
    }
  }
  const a = jt({ narrative: e.narrative, structured: e.structured, mindmap: e.mindmap });
  return a.ok || await Et(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: a.errors }), { narrative: e.narrative, structured: e.structured, mindmap: e.mindmap, cross_ok: a.ok, cross_errors: a.errors };
}
__name(kr, "kr");
var qt = Object.freeze(Object.defineProperty({ __proto__: null, SUMMARY_RATIO_TABLE: X, buildFailReport: Hn, buildRewritePrompt: Er, checkSummaryRatio: Sr, countReadableChars: bt, ensureFailLogTable: At, logFail: Et, qualityGateAll: kr, validateCrossConsistency: jt, validateNarrativeSummary: br }, Symbol.toStringTag, { value: "Module" }));
function Tr(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Tr, "Tr");
function D(e, t) {
  const r = String(e || "").replace(/\s+/g, " ").trim();
  if (r.length <= t)
    return r;
  const n = r.slice(0, t), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(t * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name(D, "D");
function Ft(e) {
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
__name(Ft, "Ft");
function Fn(e) {
  const t = jn(e, "detail"), r = In(e, "detail"), n = On(e, "detail"), s = _n(t.text, "detail", "exam"), i = e.length, a = Tr(e), c = t.coreClaim, l = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const x = d.split(". ").filter(Boolean), m = Math.ceil(x.length / 2);
    d = x.slice(0, m).join(". ") + `.

` + x.slice(m).join(". ") + ".";
  }
  const f = r.toc, g = r.hierarchy, v = r.glossary, y = { title: n.title, children: n.children.map((x) => ({ title: x.title, children: (x.children || []).map((m) => ({ title: m.title, pack: Array.isArray(m.pack) && m.pack.length >= 2 ? m.pack : [m.title, `${m.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: m.explain && m.explain.length >= 30 ? m.explain : `${m.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (y.children[0] || y.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); y.children[0].children.length < 3; ) {
    const x = y.children[0].children.length + 1;
    y.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${x}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${x}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  {
    const m = o.join(" ").match(/[가-힣]{2,4}(?=은|는|의|과|와)/g) || [], $ = e.match(/\d+\.?\d*%|\d+억|\d+만/g) || [];
    if (y.children[0] && y.children[0].children.length > 0) {
      const E = y.children[0].children;
      m.length >= 2 && E[0] && (E[0].pack.some((T) => m.some((C) => T.includes(C))) || E[0].pack.push(...m.slice(0, 2)), (!E[0].explain.includes(m[0]) || !E[0].explain.includes(m[1])) && (E[0].explain += ` ${m[0]}\uACFC ${m[1]}\uC758 \uBE44\uAD50\uB97C \uD1B5\uD574 \uCC28\uC774\uB97C \uBA85\uD655\uD788 \uC774\uD574\uD560 \uC218 \uC788\uB2E4.`)), $.length >= 2 && E[1] && (E[1].pack.some((T) => $.some((C) => T.includes(C))) || E[1].pack.push(...$.slice(0, 2)), $.some((T) => E[1].explain.includes(T)) || (E[1].explain += ` \uC8FC\uC694 \uC218\uCE58\uB294 ${$.slice(0, 2).join(", ")}\uC774\uB2E4.`));
    }
  }
  const S = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: c, grounds: l, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: g, glossary: v }, mindmap: y, selftest: S };
}
__name(Fn, "Fn");
function Bt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(Bt, "Bt");
function xt(e, t) {
  var P;
  const r = t === "brief", n = t === "standard", s = e.narrative.coreClaim || "", i = e.narrative.grounds || [], a = e.narrative.comparisons || [], c = e.narrative.implications || [], l = ((P = e.source) == null ? void 0 : P.charCount) || 1e3;
  let o = "", u = s, d = [], f = [], g = [];
  if (t === "detail")
    o = String(e.narrative.summaryDetail || "").trim(), u = s, d = i, f = a, g = c;
  else if (t === "brief") {
    const k = Math.floor(l * 0.18);
    u = D(s, 60);
    const p = a[0] ? D(a[0], 80) : "", j = c[0] ? D(c[0], 60) : "";
    d = [], f = p ? [p] : [], g = j ? [j] : [];
    const N = [u];
    if (p && N.push(p), j && u.length + p.length + j.length <= k && N.push(j), o = N.join(". ") + ".", o.length > k) {
      const q = o.split(". ").filter(Boolean);
      for (; q.length > 1 && q.join(". ").length > k; )
        q.pop();
      o = q.join(". ") + ".";
    }
  } else {
    const k = Math.floor(l * 0.22), p = Math.floor(l * 0.3);
    u = D(s, 80), d = i.slice(0, 2).map((ue) => D(ue, 70));
    const j = a[0] ? D(a[0], 90) : "";
    f = j ? [j] : [];
    const N = c[0] ? D(c[0], 70) : "";
    g = N ? [N] : [];
    const q = [u];
    if (d.length > 0 && q.push(d.join(". ")), j && q.push(`\uBC18\uBA74 ${j}`), o = q.join(". ") + ".", o.length > p)
      o = o.slice(0, p - 3) + "...";
    else if (o.length < k && c.length > 0) {
      const ue = D(c[0], 60);
      o += ` ${ue}.`;
    }
  }
  const v = e.structured.toc || [], y = r ? 2 : n ? 4 : 10, S = (e.structured.glossary || []).slice(0, y).map((k) => ({ term: D(k.term, 20), def: D(k.def, r ? 70 : 120) })), x = r ? 2 : n ? 3 : 5, m = /* @__PURE__ */ __name((k) => (k || []).map((p) => ({ title: D(p.title, 60), keywords: (p.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((j) => D(j, 16)), bullets: (p.bullets || []).slice(0, x).map((j) => D(j, r ? 90 : 140)), children: p.children ? m(p.children) : void 0 })), "m"), $ = m(e.structured.hierarchy || []), E = Bn({ toc: v, hierarchy: $, glossary: S }), T = JSON.parse(JSON.stringify(e.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), C = r ? 70 : n ? 110 : 160, z = r ? 2 : 3;
  for (const k of T.children || [])
    for (const p of k.children || [])
      Array.isArray(p.pack) && (p.pack = p.pack.slice(0, z).map((j) => D(j, 20))), typeof p.explain == "string" && (p.explain = D(p.explain, C)), Array.isArray(p.children) || (p.children = []);
  const O = r || n ? 2 : 4, I = (e.selftest.items || []).slice(0, O).map((k) => {
    var p, j, N;
    return { id: k.id, type: k.type, question: D(k.question, r ? 140 : 220), hint: k.hint ? D(k.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((p = k.rubric) == null ? void 0 : p.mustInclude) || []).slice(0, r ? 2 : 4).map((q) => D(q, 20)), mustNotInclude: (((j = k.rubric) == null ? void 0 : j.mustNotInclude) || []).slice(0, 2).map((q) => D(q, 20)), maxChars: ((N = k.rubric) == null ? void 0 : N.maxChars) ?? (r ? 140 : 220) }, answerKey: k.answerKey ? D(k.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: d, comparisons: f, implications: g }, structured: { text: E, toc: v, hierarchy: $, glossary: S }, mindmap: { tree: T }, selftest: { passScorePct: 90, items: I } };
}
__name(xt, "xt");
function Bn(e) {
  var n, s;
  const t = [];
  t.push("\u2160. \uBAA9\uCC28"), (n = e.toc) != null && n.length ? e.toc.forEach((i, a) => t.push(`  ${a + 1}. ${i.title}`)) : t.push("  1. \uBCF8\uBB38"), t.push(""), t.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name((i, a) => {
    var c, l;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      t.push(`${u}- ${o.title}`), (c = o.keywords) != null && c.length && t.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => t.push(`${u}  \xB7 ${d}`)), (l = o.children) != null && l.length && r(o.children, a + 1);
    }
  }, "r");
  return r(e.hierarchy || [], 1), t.push(""), t.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = e.glossary) != null && s.length ? e.glossary.forEach((i) => t.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : t.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), t.join(`
`);
}
__name(Bn, "Bn");
function Vn(e) {
  var i, a, c, l, o, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((c = e == null ? void 0 : e.narrative) != null && c.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = e == null ? void 0 : e.structured) == null ? void 0 : l.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const g of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const v of (g == null ? void 0 : g.children) || [])
      r++, Array.isArray(v.pack) && v.pack.length && n++, typeof v.explain == "string" && v.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Vn, "Vn");
function Kn(e) {
  var g, v, y, S;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative");
  const i = /* @__PURE__ */ __name((x) => x.split(new RegExp("(?<=[.!?])\\s+")).filter(Boolean).length, "i"), a = i(e.brief.narrative.text), c = i(e.standard.narrative.text), l = i(e.detail.narrative.text);
  c < a + 2 && t.push(`standard/brief \uBB38\uC7A5 \uC218 \uCC28\uC774 \uBD80\uC871: ${c} vs ${a} (\uCD5C\uC18C +2 \uD544\uC694)`), l < c + 2 && t.push(`detail/standard \uBB38\uC7A5 \uC218 \uCC28\uC774 \uBD80\uC871: ${l} vs ${c} (\uCD5C\uC18C +2 \uD544\uC694)`), (((g = e.standard.structured.glossary) == null ? void 0 : g.length) || 0) < (((v = e.brief.structured.glossary) == null ? void 0 : v.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((y = e.detail.structured.glossary) == null ? void 0 : y.length) || 0) < (((S = e.standard.structured.glossary) == null ? void 0 : S.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const o = /* @__PURE__ */ __name((x) => {
    let m = 0;
    for (const $ of (x == null ? void 0 : x.children) || [])
      m += (($ == null ? void 0 : $.children) || []).length;
    return m;
  }, "o"), u = o(e.brief.mindmap.tree), d = o(e.standard.mindmap.tree), f = o(e.detail.mindmap.tree);
  return u === d && d === f || t.push(`mindmap L2 count mismatch (brief:${u}, standard:${d}, detail:${f})`), t;
}
__name(Kn, "Kn");
async function vt(e, t) {
  var c, l, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(vt, "vt");
function Gn(e) {
  e.post("/api/matrix", async (t) => {
    var o, u, d, f, g, v;
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, s = !!((o = t.env) != null && o.GEMINI_API_KEY && String(t.env.GEMINI_API_KEY).trim().length > 10), i = String(((u = t.env) == null ? void 0 : u.USE_MOCK) || "").toLowerCase() === "true", a = s && !i ? "phase2" : "phase1";
    let c = null;
    function l(y) {
      return { cross_ok: false, cross_errors: [y], ratios: { brief: { ratio: 0, ok: false }, standard: { ratio: 0, ok: false }, detail: { ratio: 0, ok: false } } };
    }
    __name(l, "l");
    try {
      let y = /* @__PURE__ */ __name(function(R) {
        return String(R || "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").replace(/\.\.+/g, ".").replace(/공교\s*육/g, "\uACF5\uAD50\uC721").replace(/사\s*교\s*육/g, "\uC0AC\uAD50\uC721").replace(/입\s*시/g, "\uC785\uC2DC").replace(/결\s*론/g, "\uACB0\uB860").replace(/국가에\s*서는/g, "\uAD6D\uAC00\uC5D0\uC11C\uB294").trim();
      }, "y"), S = /* @__PURE__ */ __name(function(R) {
        const _ = y(R);
        if (!_)
          return _;
        const W = _.split(new RegExp("(?<=[.!?])\\s+")).map((Y) => Y.trim()).filter(Boolean), Z = [/비교한다/, /분석한다/, /설명한다/, /이 글은/, /선행연구/, /다양한 관점/, /다면적/, /체계적으로/, /종합하면/, /이상의 내용을 종합/, /이해가 가능/, /체계적으로 분석/, /결론이다\.\./];
        return W.filter((Y) => !Z.some((ve) => ve.test(Y))).join(" ").trim();
      }, "S"), x = /* @__PURE__ */ __name(function(R) {
        let _ = y(R);
        _ = _.replace(/필요\.\s*/g, "\uD544\uC694\uD558\uB2E4\uB294 \uC758\uBBF8\uB2E4. ").replace(/필요\s*$/g, "\uD544\uC694\uD558\uB2E4\uB294 \uC758\uBBF8\uB2E4.").replace(/이는\s*$/g, "\uC774\uB294 \uC911\uC694\uD55C \uCC28\uC774\uB97C \uBCF4\uC5EC\uC900\uB2E4.").replace(/이는\.\s*/g, "\uC774\uB294 \uC911\uC694\uD55C \uCC28\uC774\uB97C \uBCF4\uC5EC\uC900\uB2E4. "), _ && !/[.!?]$/.test(_) && (_ += ".");
        const Z = _.split(new RegExp("(?<=[.!?])\\s+")).map((B) => B.trim()).filter(Boolean).filter((B) => B.replace(/[.!?]/g, "").trim().split(/\s+/).length >= 3);
        return (Z.length ? Z.join(" ") : _).trim();
      }, "x"), m = /* @__PURE__ */ __name(function(R) {
        return y(R).split(new RegExp("(?<=[.!?])\\s+")).map((_) => _.trim()).filter(Boolean).length;
      }, "m"), $ = /* @__PURE__ */ __name(function(R, _, W, Z, B) {
        let Y = R;
        const ve = [..._.grounds || [], ..._.comparisons || [], ..._.implications || []].map((dt) => x(S(y(dt)))).filter(Boolean), ye = Math.floor(Z * X[B].max);
        let Ct = 0;
        for (; m(Y) < W && Ct < ve.length; ) {
          const dt = ve[Ct++], Rt = y(Y + " " + dt);
          if (Rt.length <= ye)
            Y = Rt;
          else
            break;
        }
        return Y;
      }, "$"), E = /* @__PURE__ */ __name(function(R, _, W, Z) {
        let B = x(S(y(W)));
        return B = $(B, Z, R === "brief" ? 2 : R === "standard" ? 4 : 6, _.length, R), xr(_, B, R);
      }, "E");
      const T = await t.req.json(), C = String(T.text || "").trim();
      if (!C || C.length < 20) {
        const R = l(C ? "TEXT_TOO_SHORT" : "EMPTY_TEXT");
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uB108\uBB34 \uC9E7\uC2B5\uB2C8\uB2E4(\uCD5C\uC18C 20\uC790 \uAD8C\uC7A5)" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: R }, result: { qa: R } }, 400);
      }
      const z = Tr(C);
      let O = null;
      if (a === "phase1")
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), O = Fn(C);
      else {
        const R = Bt(C);
        let _ = await vt(t, R);
        if (O = Ft(_), !O) {
          const W = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", Bt(C)].join(`
`);
          _ = await vt(t, W), O = Ft(_);
        }
        if (!O)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 502);
      }
      const I = Vn(O);
      if (I.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: I.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 422);
      const P = xt(O, "brief"), k = xt(O, "standard"), p = xt(O, "detail"), j = { grounds: O.narrative.grounds || [], comparisons: O.narrative.comparisons || [], implications: O.narrative.implications || [] }, N = E("brief", C, P.narrative.text, j), q = E("standard", C, k.narrative.text, j), ue = E("detail", C, p.narrative.text, j);
      P.narrative.text = N.text, k.narrative.text = q.text, p.narrative.text = ue.text, P.narrative.ratio = N.ratio, k.narrative.ratio = q.ratio, p.narrative.ratio = ue.ratio, console.log("[Matrix V4] V4-downsample + narrative-quality:", { brief_ratio: N.ratio, standard_ratio: q.ratio, detail_ratio: ue.ratio, brief_len: N.text.length, standard_len: q.text.length, detail_len: ue.text.length });
      const K = { narrative: { ...P.narrative, ratio: P.narrative.ratio, warnings: [] }, structured: P.structured, mindmap: P.mindmap, selftest: P.selftest }, G = { narrative: { ...k.narrative, ratio: k.narrative.ratio, warnings: [] }, structured: k.structured, mindmap: k.mindmap, selftest: k.selftest };
      p.narrative.warnings = [];
      const Mt = Kn({ brief: K, standard: G, detail: p });
      if (Mt.length && a === "phase2")
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: Mt.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 422);
      let se = { brief: K.narrative.text, standard: G.narrative.text, detail: p.narrative.text }, U = null;
      if (a === "phase2")
        try {
          const R = /* @__PURE__ */ __name(async (W) => await vt(t, W), "R"), _ = await kr({ originalText: C, model: t.env.GEMINI_MODEL || "gemini", callLLM: R, db: t.env.DB, narrative: se, structured: { brief: K.structured, standard: G.structured, detail: p.structured }, mindmap: { brief: K.mindmap, standard: G.mindmap, detail: p.mindmap } });
          se = _.narrative, U = _.qa, K.narrative.text = se.brief, G.narrative.text = se.standard, p.narrative.text = se.detail, console.log("[Matrix V4] Phase 2 Quality Gate \uC644\uB8CC:", { cross_ok: U.cross_ok, ratios: U.ratios });
        } catch (R) {
          console.error("[Matrix V4] Phase 2 \uC624\uB958:", R.message), U = null;
        }
      if (a === "phase1" || !U) {
        const { validateNarrativeSummary: R } = await Promise.resolve().then(() => qt), _ = R(se.brief, "brief"), W = R(se.standard, "standard"), Z = R(se.detail, "detail"), B = [];
        _.ok || B.push(..._.errors.map((ye) => `Brief: ${ye}`)), W.ok || B.push(...W.errors.map((ye) => `Standard: ${ye}`)), Z.ok || B.push(...Z.errors.map((ye) => `Detail: ${ye}`));
        const Y = jt({ narrative: se, structured: { brief: K.structured, standard: G.structured, detail: p.structured }, mindmap: { brief: K.mindmap, standard: G.mindmap, detail: p.mindmap }, detailSlots: { coreClaim: (d = O.narrative) == null ? void 0 : d.coreClaim, grounds: (f = O.narrative) == null ? void 0 : f.grounds, comparisons: (g = O.narrative) == null ? void 0 : g.comparisons, implications: (v = O.narrative) == null ? void 0 : v.implications } }), ve = [...B, ...Y.errors];
        U = { cross_ok: Y.ok && B.length === 0, cross_errors: ve, ratios: { brief: { ratio: K.narrative.ratio, rule: X.brief, ok: K.narrative.ratio >= X.brief.min && K.narrative.ratio <= X.brief.max }, standard: { ratio: G.narrative.ratio, rule: X.standard, ok: G.narrative.ratio >= X.standard.min && G.narrative.ratio <= X.standard.max }, detail: { ratio: p.narrative.ratio, rule: X.detail, ok: p.narrative.ratio >= X.detail.min && p.narrative.ratio <= X.detail.max } } }, console.log("[Matrix V4] Phase 1 \uC9C4\uB2E8 \uC644\uB8CC (V4-downsample):", { cross_ok: U.cross_ok, ratios_ok: [U.ratios.brief.ok, U.ratios.standard.ok, U.ratios.detail.ok] });
      }
      const jr = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: K, standard: G, detail: p }, views: { narrative: { brief: K.narrative, standard: G.narrative, detail: p.narrative }, structured: { brief: K.structured, standard: G.structured, detail: p.structured }, mindmap: { brief: K.mindmap, standard: G.mindmap, detail: p.mindmap }, selftest: { brief: K.selftest, standard: G.selftest, detail: p.selftest } } }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U }, result: { qa: U } };
      return t.json(jr, 200);
    } catch (y) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (y == null ? void 0 : y.message) || String(y) }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => ls), n = await t.req.json(), { sheet: s, attempt: i } = n;
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
      const { buildFailReport: n } = await Promise.resolve().then(() => qt), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Gn, "Gn");
var ne = new pr();
ne.use("/api/*", hn());
ne.use("/static/*", bn({ root: "./public" }));
Gn(ne);
function Je() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Je, "Je");
function Ot(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(Ot, "Ot");
function Un(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Un, "Un");
function Jn(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Jn, "Jn");
function zn(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(zn, "zn");
function Wn(e, t) {
  const r = Math.max(60, Ie(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(Wn, "Wn");
function Xn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = zn((e == null ? void 0 : e.viewType) || "narrative"), n = Jn(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: c } = Wn(t), l = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), g = `
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
`.trim(), v = `
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
`.trim(), y = `
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
  let S = f;
  return r === "structured" ? S = g : r === "mindmap" ? S = v : r === "selftest" && (S = y), `${d}

${S}`;
}
__name(Xn, "Xn");
function Oe(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(Oe, "Oe");
function ut(e) {
  const t = Oe(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(ut, "ut");
function Yn(e) {
  const t = Oe(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Yn, "Yn");
function _t(e) {
  const t = Oe(e).split(`
`), r = Yn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: Oe(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : t.length, o = i.title, u = t.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(_t, "_t");
function Qn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(Qn, "Qn");
function Ne(e, t) {
  const n = ut(e).map((i, a) => ({ s: i, i: a, score: Qn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Un(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(Ne, "Ne");
function Ie(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(Ie, "Ie");
var kt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Vt(e, t, r) {
  const n = Math.max(60, Ie(e)), s = Ie(t), i = Math.floor(n * kt[r].min), a = Math.ceil(n * kt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(Vt, "Vt");
function ze(e, t, r) {
  const n = Math.max(60, Ie(e)), s = Math.ceil(n * kt[r].max);
  let i = String(t || "").trim();
  if (Ie(i) <= s)
    return i;
  const a = ut(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (Ie(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(ze, "ze");
function yt(e, t) {
  return `${e}_${t}`;
}
__name(yt, "yt");
function Zn(e) {
  const t = _t(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = yt("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = Ne(s.body, 6), o = [];
    for (const m of l)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((E) => {
        const T = E.replace(/[()]/g, "").trim();
        T.length >= 2 && T.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(T) && o.push(T);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const d = Array.from(u.entries()).sort((m, $) => $[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = Ne(s.body, 3).join(" "), g = Ne(s.body, 2).join(" "), v = Ne(s.body, 1).join(" "), y = { id: yt(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: g, explainBrief: v, children: [] };
    d.forEach((m) => {
      n.has(m) || n.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${Ne(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const x = ut(s.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    x.length && y.children.push({ id: yt(a + "_adv", 1), title: x.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(y), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Zn, "Zn");
function $r(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name($r, "$r");
function es(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = ($r(t, n).children || []).map((u) => {
    const d = (u.children || []).find((g) => g.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: ze(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${ze(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(es, "es");
function ts(e, t) {
  const r = _t(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...Ne(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return ze(e, i, t);
}
__name(ts, "ts");
function rs(e, t) {
  _t(e);
  const r = ut(e), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(rs, "rs");
function ns(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const c = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((v) => v.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((v) => {
      c.includes(v) && d++;
    });
    const f = d >= 2 || c.length >= 30, g = f ? 1 : d === 1 ? 0.5 : 0;
    n += g, s.push({ id: a.id, ok: f, score: g, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(ns, "ns");
function Kt(e) {
  const t = Oe(e), { tree: r, glossary: n } = Zn(t), s = { originalMeta: { textHash: Ot(t), chars: t.length, ts: Je() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = ts(t, i), c = es(t, r, n, i), l = $r(r, i), o = rs(t), d = Vt(t, a, i).ok ? a : ze(t, a, i), f = c.renderText || "", g = Vt(t, f, i);
    c.renderText = g.ok ? f : ze(t, f, i), s.modes[i] = { narrative: d, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(Kt, "Kt");
ne.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Je(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
ne.post("/api/engine", async (e) => {
  var g, v, y, S, x, m, $;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), c = (t == null ? void 0 : t.useGemini) === true, l = Oe(r);
  if (l.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && e.env.GEMINI_API_KEY)
    try {
      const E = Xn({ text: l, viewType: s, level: "detail", grade: i, subject: a }), T = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", z = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${T}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: E }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), I = (((x = (S = (y = (v = (g = z == null ? void 0 : z.candidates) == null ? void 0 : g[0]) == null ? void 0 : v.content) == null ? void 0 : y.parts) == null ? void 0 : S[0]) == null ? void 0 : x.text) || "").match(/\{[\s\S]*\}/);
      if (I) {
        const P = JSON.parse(I[0]);
        u = { originalMeta: { textHash: Ot(l), chars: l.length, ts: Je() }, modes: { detail: { [s]: P }, standard: { [s]: P }, brief: { [s]: P } } }, o = "gemini-" + T;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (E) {
      console.error("[Gemini Error]", E), u = Kt(l), o = "v5-local-fallback";
    }
  else
    u = Kt(l);
  const d = ($ = (m = u.modes) == null ? void 0 : m[n]) == null ? void 0 : $[s], f = { engine: o, mode: n, viewType: s, ts: Je(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
ne.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = ns(r, n);
  return e.json({ ok: true, result: s });
});
ne.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = Oe(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = Je(), l = Ot(s), o = JSON.stringify(i);
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
ne.get("/api/loadSummary", async (e) => {
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
ne.get("/", (e) => e.redirect("/static/v5.html"));
var Gt = new pr();
var ss = Object.assign({ "/src/index.tsx": ne });
var Ar = false;
for (const [, e] of Object.entries(ss))
  e && (Gt.route("/", e), Gt.notFound(e.notFoundHandler), Ar = true);
if (!Ar)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function We(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(We, "We");
function Ut(e, t) {
  const r = We(e);
  return t.some((n) => r.includes(We(n)));
}
__name(Ut, "Ut");
function is(e, t) {
  const r = We(e);
  return t.every((n) => r.includes(We(n)));
}
__name(is, "is");
function as(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(as, "as");
function os(e, t, r) {
  var v, y, S, x;
  const n = We(t), s = 100;
  if (!n) {
    const m = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, $ = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: m, explanationToShow: $ };
  }
  const i = ((v = e.rubric) == null ? void 0 : v.mustIncludeAny) || [], a = ((y = e.rubric) == null ? void 0 : y.mustIncludeAll) || [], c = ((S = e.rubric) == null ? void 0 : S.forbid) || [], l = (x = e.rubric) == null ? void 0 : x.maxChars;
  let o = 100, u = [];
  l && n.length > l && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${l}`)), c.length && Ut(n, c) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !is(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !Ut(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = as(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, g = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: g };
}
__name(os, "os");
function cs(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((l) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[l.id]) ?? "";
    return os(l, o, r);
  }), s = Math.round(n.reduce((l, o) => l + o.score, 0) / Math.max(1, n.length)), i = n.filter((l) => !l.correct).map((l) => l.id), a = s >= e.masteryScore;
  let c = "";
  return a ? c = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? c = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? c = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : c = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: c } };
}
__name(cs, "cs");
var ls = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: cs }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-3t6a8o/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Gt;

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

// ../.wrangler/tmp/bundle-3t6a8o/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.8235026477024312.mjs.map
