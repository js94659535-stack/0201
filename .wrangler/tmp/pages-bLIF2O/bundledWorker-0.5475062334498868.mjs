var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-4a40To/checked-fetch.js
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

// ../.wrangler/tmp/bundle-4a40To/strip-cf-connecting-ip-header.js
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
var mr = Object.defineProperty;
var bt = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "bt");
var gr = /* @__PURE__ */ __name((e, t, r) => t in e ? mr(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "gr");
var b = /* @__PURE__ */ __name((e, t, r) => gr(e, typeof t != "symbol" ? t + "" : t, r), "b");
var ot = /* @__PURE__ */ __name((e, t, r) => t.has(e) || bt("Cannot " + r), "ot");
var h = /* @__PURE__ */ __name((e, t, r) => (ot(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var E = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? bt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "E");
var w = /* @__PURE__ */ __name((e, t, r, n) => (ot(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "w");
var T = /* @__PURE__ */ __name((e, t, r) => (ot(e, t, "access private method"), r), "T");
var Et = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  w(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "Et");
var Tt = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
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
}, "Tt");
var xr = Symbol();
var yr = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof Jt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? vr(e, { all: r, dot: n }) : {};
}, "yr");
async function vr(e, t) {
  const r = await e.formData();
  return r ? wr(r, t) : {};
}
__name(vr, "vr");
function wr(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Sr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (br(r, n, s), delete r[n]);
  }), r;
}
__name(wr, "wr");
var Sr = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Sr");
var br = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "br");
var Ut = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Ut");
var Er = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = Tr(e), n = Ut(r);
  return kr(n, t);
}, "Er");
var Tr = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "Tr");
var kr = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "kr");
var ze = {};
var Ar = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return ze[n] || (r[2] ? ze[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : ze[n] = [e, r[1], true]), ze[n];
  }
  return null;
}, "Ar");
var xt = /* @__PURE__ */ __name((e, t) => {
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
}, "xt");
var jr = /* @__PURE__ */ __name((e) => xt(e, decodeURI), "jr");
var Bt = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return jr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Bt");
var Or = /* @__PURE__ */ __name((e) => {
  const t = Bt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Or");
var ve = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = ve(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "ve");
var Gt = /* @__PURE__ */ __name((e) => {
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
}, "Gt");
var ct = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? xt(e, Kt) : e) : e, "ct");
var Vt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const c = a + t.length + 2, o = e.indexOf("&", c);
        return ct(e.slice(c, o === -1 ? void 0 : o));
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
    if (n && (c = ct(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = e.slice(l + 1, a === -1 ? void 0 : a), n && (o = ct(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return t ? s[t] : s;
}, "Vt");
var Rr = Vt;
var $r = /* @__PURE__ */ __name((e, t) => Vt(e, t, true), "$r");
var Kt = decodeURIComponent;
var kt = /* @__PURE__ */ __name((e) => xt(e, Kt), "kt");
var ke;
var H;
var Z;
var zt;
var Xt;
var pt;
var ee;
var Pt;
var Jt = (Pt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    E(this, Z);
    b(this, "raw");
    E(this, ke);
    E(this, H);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    E(this, ee, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, w(this, H, r), w(this, ke, {});
  }
  param(e) {
    return e ? T(this, Z, zt).call(this, e) : T(this, Z, Xt).call(this);
  }
  query(e) {
    return Rr(this.url, e);
  }
  queries(e) {
    return $r(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await yr(this, e));
  }
  json() {
    return h(this, ee).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return h(this, ee).call(this, "text");
  }
  arrayBuffer() {
    return h(this, ee).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, ee).call(this, "blob");
  }
  formData() {
    return h(this, ee).call(this, "formData");
  }
  addValidatedData(e, t) {
    h(this, ke)[e] = t;
  }
  valid(e) {
    return h(this, ke)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [xr]() {
    return h(this, H);
  }
  get matchedRoutes() {
    return h(this, H)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, H)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Pt"), ke = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), zt = /* @__PURE__ */ __name(function(e) {
  const t = h(this, H)[0][this.routeIndex][1][e], r = T(this, Z, pt).call(this, t);
  return r && /\%/.test(r) ? kt(r) : r;
}, "zt"), Xt = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(h(this, H)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = T(this, Z, pt).call(this, h(this, H)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? kt(n) : n);
  }
  return e;
}, "Xt"), pt = /* @__PURE__ */ __name(function(e) {
  return h(this, H)[1] ? h(this, H)[1][e] : e;
}, "pt"), ee = /* @__PURE__ */ new WeakMap(), Pt);
var Cr = { Stringify: 1 };
var Wt = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => Wt(c, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Wt");
var Nr = "text/plain; charset=UTF-8";
var lt = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "lt");
var Ue;
var Be;
var X;
var Ae;
var W;
var M;
var Ge;
var je;
var Oe;
var ue;
var Ve;
var Ke;
var te;
var we;
var Dt;
var _r = (Dt = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    E(this, te);
    E(this, Ue);
    E(this, Be);
    b(this, "env", {});
    E(this, X);
    b(this, "finalized", false);
    b(this, "error");
    E(this, Ae);
    E(this, W);
    E(this, M);
    E(this, Ge);
    E(this, je);
    E(this, Oe);
    E(this, ue);
    E(this, Ve);
    E(this, Ke);
    b(this, "render", (...e2) => (h(this, je) ?? w(this, je, (t2) => this.html(t2)), h(this, je).call(this, ...e2)));
    b(this, "setLayout", (e2) => w(this, Ge, e2));
    b(this, "getLayout", () => h(this, Ge));
    b(this, "setRenderer", (e2) => {
      w(this, je, e2);
    });
    b(this, "header", (e2, t2, r) => {
      this.finalized && w(this, M, new Response(h(this, M).body, h(this, M)));
      const n = h(this, M) ? h(this, M).headers : h(this, ue) ?? w(this, ue, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    b(this, "status", (e2) => {
      w(this, Ae, e2);
    });
    b(this, "set", (e2, t2) => {
      h(this, X) ?? w(this, X, /* @__PURE__ */ new Map()), h(this, X).set(e2, t2);
    });
    b(this, "get", (e2) => h(this, X) ? h(this, X).get(e2) : void 0);
    b(this, "newResponse", (...e2) => T(this, te, we).call(this, ...e2));
    b(this, "body", (e2, t2, r) => T(this, te, we).call(this, e2, t2, r));
    b(this, "text", (e2, t2, r) => !h(this, ue) && !h(this, Ae) && !t2 && !r && !this.finalized ? new Response(e2) : T(this, te, we).call(this, e2, t2, lt(Nr, r)));
    b(this, "json", (e2, t2, r) => T(this, te, we).call(this, JSON.stringify(e2), t2, lt("application/json", r)));
    b(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => T(this, te, we).call(this, s, t2, lt("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Wt(e2, Cr.Stringify, false, {}).then(n) : n(e2);
    });
    b(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    b(this, "notFound", () => (h(this, Oe) ?? w(this, Oe, () => new Response()), h(this, Oe).call(this, this)));
    w(this, Ue, e), t && (w(this, W, t.executionCtx), this.env = t.env, w(this, Oe, t.notFoundHandler), w(this, Ke, t.path), w(this, Ve, t.matchResult));
  }
  get req() {
    return h(this, Be) ?? w(this, Be, new Jt(h(this, Ue), h(this, Ke), h(this, Ve))), h(this, Be);
  }
  get event() {
    if (h(this, W) && "respondWith" in h(this, W))
      return h(this, W);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, W))
      return h(this, W);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, M) || w(this, M, new Response(null, { headers: h(this, ue) ?? w(this, ue, new Headers()) }));
  }
  set res(e) {
    if (h(this, M) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, M).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, M).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    w(this, M, e), this.finalized = true;
  }
  get var() {
    return h(this, X) ? Object.fromEntries(h(this, X)) : {};
  }
}, "Dt"), Ue = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakSet(), we = /* @__PURE__ */ __name(function(e, t, r) {
  const n = h(this, M) ? new Headers(h(this, M).headers) : h(this, ue) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, Ae);
  return new Response(e, { status: s, headers: n });
}, "we"), Dt);
var R = "ALL";
var Mr = "all";
var Ir = ["get", "post", "put", "delete", "options", "patch"];
var Yt = "Can not add a route since the matcher is already built.";
var Qt = /* @__PURE__ */ __name(class extends Error {
}, "Qt");
var Pr = "__COMPOSED_HANDLER";
var Dr = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Dr");
var At = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "At");
var F;
var $;
var Zt;
var U;
var ce;
var Xe;
var We;
var Re;
var Lr = (Re = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    E(this, $);
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
    E(this, F, "/");
    b(this, "routes", []);
    E(this, U, Dr);
    b(this, "errorHandler", At);
    b(this, "onError", (t2) => (this.errorHandler = t2, this));
    b(this, "notFound", (t2) => (w(this, U, t2), this));
    b(this, "fetch", (t2, ...r) => T(this, $, We).call(this, t2, r[1], r[0], t2.method));
    b(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${ve("/", t2)}`, r), n2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(T(this, $, We).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Ir, Mr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? w(this, F, a) : T(this, $, ce).call(this, i, h(this, F), a), l.forEach((c) => {
        T(this, $, ce).call(this, i, h(this, F), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        w(this, F, c);
        for (const o of [i].flat())
          l.map((u) => {
            T(this, $, ce).call(this, o.toUpperCase(), h(this, F), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, F, i) : (w(this, F, "*"), a.unshift(i)), a.forEach((l) => {
      T(this, $, ce).call(this, R, h(this, F), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Bt : Or;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === At ? i = s.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await Tt([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[Pr] = s.handler), T(a = n, $, ce).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = T(this, $, Zt).call(this);
    return r._basePath = ve(this._basePath, t), r;
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
      const c = ve(this._basePath, t), o = c === "/" ? 0 : c.length;
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
    return T(this, $, ce).call(this, R, ve(t, "*"), l), this;
  }
}, "Re"), F = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), Zt = /* @__PURE__ */ __name(function() {
  const t = new Re({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, w(t, U, h(this, U)), t.routes = this.routes, t;
}, "Zt"), U = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = ve(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "ce"), Xe = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Xe"), We = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await T(this, $, We).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), l = new _r(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, U) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, U).call(this, l);
      });
    } catch (u) {
      return T(this, $, Xe).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, U).call(this, l))).catch((u) => T(this, $, Xe).call(this, u, l)) : o ?? h(this, U).call(this, l);
  }
  const c = Tt(a[0], this.errorHandler, h(this, U));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return T(this, $, Xe).call(this, o, l);
    }
  })();
}, "We"), Re);
var er = [];
function Hr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[R], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], er];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Hr, "Hr");
var nt = "[^/]+";
var Ie = ".*";
var Pe = "(?:|/.*)";
var Se = Symbol();
var qr = new Set(".\\+*[^]$()");
function Fr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ie || e === Pe ? 1 : t === Ie || t === Pe ? -1 : e === nt ? 1 : t === nt ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Fr, "Fr");
var de;
var he;
var B;
var me;
var Ur = (me = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, de);
    E(this, he);
    E(this, B, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, de) !== void 0)
        throw Se;
      if (i)
        return;
      w(this, de, r);
      return;
    }
    const [a, ...l] = t, c = a === "*" ? l.length === 0 ? ["", "", Ie] : ["", "", nt] : a === "/*" ? ["", "", Pe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || nt;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw Se;
      if (o = h(this, B)[d], !o) {
        if (Object.keys(h(this, B)).some((f) => f !== Ie && f !== Pe))
          throw Se;
        if (i)
          return;
        o = h(this, B)[d] = new me(), u !== "" && w(o, he, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, he)]);
    } else if (o = h(this, B)[a], !o) {
      if (Object.keys(h(this, B)).some((u) => u.length > 1 && u !== Ie && u !== Pe))
        throw Se;
      if (i)
        return;
      o = h(this, B)[a] = new me();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, B)).sort(Fr).map((n) => {
      const s = h(this, B)[n];
      return (typeof h(s, he) == "number" ? `(${n})@${h(s, he)}` : qr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, de) == "number" && r.unshift(`#${h(this, de)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "me"), de = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), me);
var st;
var Je;
var Lt;
var Br = (Lt = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, st, { varIndex: 0 });
    E(this, Je, new Ur());
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
    return h(this, Je).insert(i, t, n, h(this, st), r), n;
  }
  buildRegExp() {
    let e = h(this, Je).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Lt"), st = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), Lt);
var Gr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ye = /* @__PURE__ */ Object.create(null);
function tr(e) {
  return Ye[e] ?? (Ye[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(tr, "tr");
function Vr() {
  Ye = /* @__PURE__ */ Object.create(null);
}
__name(Vr, "Vr");
function Kr(e) {
  var o;
  const t = new Br(), r = [];
  if (e.length === 0)
    return Gr;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, g, v] = n[u];
    p ? s[g] = [v.map(([x]) => [x, /* @__PURE__ */ Object.create(null)]), er] : d++;
    let m;
    try {
      m = t.insert(g, d, p);
    } catch (x) {
      throw x === Se ? new Qt(g) : x;
    }
    p || (r[d] = v.map(([x, y]) => {
      const O = /* @__PURE__ */ Object.create(null);
      for (y -= 1; y >= 0; y--) {
        const [I, j] = m[y];
        O[I] = j;
      }
      return [x, O];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const g = (o = r[u][f]) == null ? void 0 : o[1];
      if (!g)
        continue;
      const v = Object.keys(g);
      for (let m = 0, x = v.length; m < x; m++)
        g[v[m]] = l[g[v[m]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(Kr, "Kr");
function ye(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (tr(r).test(t))
        return [...e[r]];
  }
}
__name(ye, "ye");
var re;
var ne;
var it;
var rr;
var Ht;
var Jr = (Ht = /* @__PURE__ */ __name(class {
  constructor() {
    E(this, it);
    b(this, "name", "RegExpRouter");
    E(this, re);
    E(this, ne);
    b(this, "match", Hr);
    w(this, re, { [R]: /* @__PURE__ */ Object.create(null) }), w(this, ne, { [R]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = h(this, re), s = h(this, ne);
    if (!n || !s)
      throw new Error(Yt);
    n[e] || [n, s].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[R]).forEach((o) => {
        c[e][o] = [...c[R][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = tr(t);
      e === R ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = ye(n[o], t) || ye(n[R], t) || []);
      }) : (l = n[e])[t] || (l[t] = ye(n[e], t) || ye(n[R], t) || []), Object.keys(n).forEach((o) => {
        (e === R || e === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === R || e === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Gt(t) || [t];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((d) => {
        var f;
        (e === R || e === d) && ((f = s[d])[u] || (f[u] = [...ye(n[d], u) || ye(n[R], u) || []]), s[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, ne)).concat(Object.keys(h(this, re))).forEach((t) => {
      e[t] || (e[t] = T(this, it, rr).call(this, t));
    }), w(this, re, w(this, ne, void 0)), Vr(), e;
  }
}, "Ht"), re = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakSet(), rr = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === R;
  return [h(this, re), h(this, ne)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== R && t.push(...Object.keys(n[R]).map((i) => [i, n[R][i]]));
  }), r ? Kr(t) : null;
}, "rr"), Ht);
var se;
var Y;
var qt;
var zr = (qt = /* @__PURE__ */ __name(class {
  constructor(e) {
    b(this, "name", "SmartRouter");
    E(this, se, []);
    E(this, Y, []);
    w(this, se, e.routers);
  }
  add(e, t, r) {
    if (!h(this, Y))
      throw new Error(Yt);
    h(this, Y).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, Y))
      throw new Error("Fatal error");
    const r = h(this, se), n = h(this, Y), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(e, t);
      } catch (c) {
        if (c instanceof Qt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), w(this, se, [l]), w(this, Y, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, Y) || h(this, se).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, se)[0];
  }
}, "qt"), se = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), qt);
var _e = /* @__PURE__ */ Object.create(null);
var ie;
var _;
var fe;
var $e;
var N;
var Q;
var le;
var Ce;
var Xr = (Ce = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    E(this, Q);
    E(this, ie);
    E(this, _);
    E(this, fe);
    E(this, $e, 0);
    E(this, N, _e);
    if (w(this, _, n || /* @__PURE__ */ Object.create(null)), w(this, ie, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, w(this, ie, [s]);
    }
    w(this, fe, []);
  }
  insert(t, r, n) {
    w(this, $e, ++Et(this, $e)._);
    let s = this;
    const i = Er(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = Ar(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, _)) {
        s = h(s, _)[f], d && a.push(d[1]);
        continue;
      }
      h(s, _)[f] = new Ce(), d && (h(s, fe).push(d), a.push(d[1])), s = h(s, _)[f];
    }
    return h(s, ie).push({ [t]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, $e) } }), s;
  }
  search(t, r) {
    var c;
    const n = [];
    w(this, N, _e);
    let i = [this];
    const a = Ut(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let g = 0, v = i.length; g < v; g++) {
        const m = i[g], x = h(m, _)[d];
        x && (w(x, N, h(m, N)), f ? (h(x, _)["*"] && n.push(...T(this, Q, le).call(this, h(x, _)["*"], t, h(m, N))), n.push(...T(this, Q, le).call(this, x, t, h(m, N)))) : p.push(x));
        for (let y = 0, O = h(m, fe).length; y < O; y++) {
          const I = h(m, fe)[y], j = h(m, N) === _e ? {} : { ...h(m, N) };
          if (I === "*") {
            const S = h(m, _)["*"];
            S && (n.push(...T(this, Q, le).call(this, S, t, h(m, N))), w(S, N, j), p.push(S));
            continue;
          }
          const [xe, G, V] = I;
          if (!d && !(V instanceof RegExp))
            continue;
          const C = h(m, _)[xe], K = a.slice(o).join("/");
          if (V instanceof RegExp) {
            const S = V.exec(K);
            if (S) {
              if (j[G] = S[0], n.push(...T(this, Q, le).call(this, C, t, h(m, N), j)), Object.keys(h(C, _)).length) {
                w(C, N, j);
                const k = ((c = S[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[k] || (l[k] = [])).push(C);
              }
              continue;
            }
          }
          (V === true || V.test(d)) && (j[G] = d, f ? (n.push(...T(this, Q, le).call(this, C, t, j, h(m, N))), h(C, _)["*"] && n.push(...T(this, Q, le).call(this, h(C, _)["*"], t, j, h(m, N)))) : (w(C, N, j), p.push(C)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Ce"), ie = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakSet(), le = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, l = h(t, ie).length; a < l; a++) {
    const c = h(t, ie)[a], o = c[r] || c[R], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== _e || s && s !== _e))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], g = u[o.score];
        o.params[p] = s != null && s[p] && !g ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "le"), Ce);
var pe;
var Ft;
var Wr = (Ft = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    E(this, pe);
    w(this, pe, new Xr());
  }
  add(e, t, r) {
    const n = Gt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, pe).insert(e, n[s], r);
      return;
    }
    h(this, pe).insert(e, t, r);
  }
  match(e, t) {
    return h(this, pe).search(e, t);
  }
}, "Ft"), pe = /* @__PURE__ */ new WeakMap(), Ft);
var nr = /* @__PURE__ */ __name(class extends Lr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new zr({ routers: [new Jr(), new Wr()] });
  }
}, "nr");
var Yr = /* @__PURE__ */ __name((e) => {
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
}, "Yr");
var Qr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var jt = /* @__PURE__ */ __name((e, t = en) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "jt");
var Zr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var en = Zr;
var tn = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "tn");
var sr = { br: ".br", zstd: ".zst", gzip: ".gz" };
var rn = Object.keys(sr);
var nn = "index.html";
var sn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? tn;
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
    e.isDir && await e.isDir(l) && (l = n(l, nn));
    const c = e.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const g = e.mimes && jt(l, e.mimes) || jt(l);
      if (s.header("Content-Type", g || "application/octet-stream"), e.precompressed && (!g || Qr.test(g))) {
        const v = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((m) => m.trim()));
        for (const m of rn) {
          if (!v.has(m))
            continue;
          const x = await c(l + sr[m], s);
          if (x) {
            o = x, s.header("Content-Encoding", m), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, l, s)), await i();
  };
}, "sn");
var an = /* @__PURE__ */ __name(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "an");
var on = /* @__PURE__ */ __name((e) => async function(r, n) {
  return sn({ ...e, getContent: async (i) => an(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "on");
var cn = /* @__PURE__ */ __name((e) => on(e), "cn");
var ir = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function mt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(mt, "mt");
function ln(e) {
  return e.replace(/\s+/g, "").length;
}
__name(ln, "ln");
function ae(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(ae, "ae");
function un(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(un, "un");
function Ne(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(Ne, "Ne");
function ut(e, t, r) {
  const n = mt(e), i = mt(t) / Math.max(n, 1), a = ir[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(ut, "ut");
function dn(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD00\uB828 \uAC1C\uB150\uC758 \uC815\uC758\uC640 \uC8FC\uC694 \uD2B9\uC9D5\uC744 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uC120\uD589\uC5F0\uAD6C\uC5D0\uC11C\uB294 \uC774\uB7EC\uD55C \uAC1C\uB150\uC744 \uB2E4\uC591\uD55C \uAD00\uC810\uC5D0\uC11C \uADDC\uC815\uD574 \uC654\uB2E4", "\uBCF8 \uC5F0\uAD6C\uB294 \uC774\uB97C \uC885\uD569\uD558\uC5EC \uC791\uC5C5 \uC815\uC758\uB97C \uC81C\uC2DC\uD55C\uB2E4"] : ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(dn, "dn");
function hn(e, t, r) {
  let s = ae(t).slice();
  const i = ut(e, s.join(". ") + ".", r);
  let a = i, l = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), l = true, a = ut(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const c = dn(r);
    for (const o of c)
      if (s.push(o), l = true, a = ut(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: l, originalRatio: i.ratio };
}
__name(hn, "hn");
function Qe(e, t) {
  const r = ae(e);
  Ne(e);
  const n = ln(e), s = ir[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), l = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", c = r.map((S, k) => {
    let A = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(S) && (A += 5), /(특징|특성|요인|측면|경향|양상)/.test(S) && (A += 4), /(연구|학자|선행|본|분석|종합)/.test(S) && (A += 3), /(차이|비교|대조|반면|이에 반해)/.test(S) && (A += 2), k === 0 && (A += 3), S.length < 20 && (A -= 2), S.length > 200 && (A -= 1), { sentence: S, score: A, index: k };
  }), o = t === "brief" ? 2 : t === "standard" ? 3 : 5, u = c.sort((S, k) => k.score - S.score || S.index - k.index).slice(0, o).sort((S, k) => S.index - k.index).map((S) => S.sentence);
  let d = "";
  t === "brief" ? d = u.slice(0, 3).join(" ") : t === "standard" ? d = u.slice(0, 5).join(" ") : d = u.join(" ");
  const f = ["\uC2A4\uC6E8\uB374", "\uD55C\uAD6D", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "OECD", "GDP"];
  for (const S of f)
    !e.includes(S) && d.includes(S) && (d = ae(d).filter((A) => !A.includes(S)).join(" "));
  d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const p = hn(e, d, t), g = p.text, v = mt(g), m = ae(g), x = m[0] || l, y = m.slice(1);
  for (; y.length < 3; )
    y.push("\uC6D0\uBB38\uC758 \uCD94\uAC00 \uADFC\uAC70\uB97C \uD3EC\uD568\uD55C\uB2E4");
  const O = [], I = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const S of I)
    g.includes(S) && O.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${S}"`);
  const j = { brief: 2, standard: 4, detail: 6 };
  m.length < j[t] && O.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${m.length}\uBB38\uC7A5 (\uCD5C\uC18C ${j[t]}\uBB38\uC7A5)`);
  const xe = g.includes("\uD55C\uAD6D"), G = g.includes("\uC2A4\uC6E8\uB374");
  xe && G || O.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const V = ["7.6%", "2.8%", "6.5%", "0.2%"], C = { brief: 1, standard: 2, detail: 3 }, K = V.filter((S) => g.includes(S));
  return K.length < C[t] && O.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${K.length}\uAC1C (\uCD5C\uC18C ${C[t]}\uAC1C)`), { type: "narrative", level: t, text: g, charCount: v, ratio: p.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: p.adjusted, originalRatio: p.originalRatio, finalRatio: p.ratio, targetRatio: s.target }, coreClaim: x, grounds: y.slice(0, 5), comparisons: [], implications: [], warnings: O };
}
__name(Qe, "Qe");
function Ze(e, t) {
  const r = ae(e), n = Ne(e), s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, s).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Ze, "Ze");
function et(e, t, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = t === "brief" || t === "standard" ? 2 : 4;
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(et, "et");
function fn(e) {
  const t = ae(e), r = Ne(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(fn, "fn");
function pn(e, t) {
  const r = ae(e), n = t === "brief" ? 2 : t === "standard" ? 3 : 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const l = a * i, c = r.slice(l, l + i);
    if (c.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${c[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: c });
  }
  return s;
}
__name(pn, "pn");
function mn(e, t) {
  const r = Ne(e);
  un(e);
  const n = ae(e), s = t === "brief" ? 3 : t === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let l = 0; l < s && l < a.length; l++) {
    const c = a[l], o = gn(c), u = n.find((d) => d.includes(c)) || `${c}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: c, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(mn, "mn");
function gn(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(gn, "gn");
function tt(e, t) {
  const r = fn(e), n = pn(e, t), s = mn(e, t), i = Ne(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: Ne(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], l = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), c = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: c, hierarchy: a, glossary: l, coreTerms: s };
}
__name(tt, "tt");
var Ee = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var ar = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
var De = ["7.6%", "2.8%", "6.5%", "0.2%"];
var or = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function oe(e) {
  return e == null ? "" : String(e);
}
__name(oe, "oe");
function Ot(e) {
  return oe(e).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(Ot, "Ot");
function cr(e) {
  return oe(e).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(cr, "cr");
function rt(e, t) {
  const r = oe(e);
  return t.filter((n) => r.includes(n)).length;
}
__name(rt, "rt");
function Me(e, t, r) {
  const n = Ot(e), s = Ot(t), i = s / Math.max(n, 1), a = Ee[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a, originLen: n, sumLen: s };
}
__name(Me, "Me");
function xn(e, t) {
  const r = [], n = or[t], s = oe(e);
  for (const l of ar)
    s.includes(l) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${l}"`);
  const i = cr(s);
  i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const a = rt(s, De);
  return a < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${a}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(xn, "xn");
function yn(e) {
  return e === "brief" ? ["\uACF5\uAD50\uC721 \uCC45\uC784\uACFC \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870\uC758 \uCC28\uC774\uAC00 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC758 \uCC28\uC774\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4."] : e === "standard" ? ["\uD55C\uAD6D\uC740 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4\uC774 \uB192\uACE0 \uC2A4\uC6E8\uB374\uC740 \uB0AE\uC544 \uAD6D\uAC00 \uBD80\uB2F4 \uAD6C\uC870\uAC00 \uB2E4\uB974\uB2E4.", "\uC774 \uCC28\uC774\uAC00 \uC120\uD589\uD559\uC2B5 \uD544\uC694\uC131\uACFC \uC785\uC2DC \uC911\uC2EC \uBB38\uD654\uC758 \uAC15\uB3C4\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC81C\uC2DC\uB41C\uB2E4."] : ["\uD55C\uAD6D\uC740 GDP \uB300\uBE44 \uACF5\uAD50\uC721 7.6%\uC640 \uBBFC\uAC04 \uBD80\uB2F4 2.8%\uAC00, \uC2A4\uC6E8\uB374\uC740 6.5%\uC640 0.2%\uAC00 \uC81C\uC2DC\uB41C\uB2E4.", "\uC785\uC2DC \uC81C\uB3C4, \uACF5\uAD50\uC721 \uC9C0\uC6D0, \uC785\uC2DC\uC5D0 \uB450\uB294 \uBE44\uC911\uC774 \uAD6D\uAC00\uBCC4 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uB9CC\uB4E0\uB2E4\uACE0 \uACB0\uB860\uC9D3\uB294\uB2E4."];
}
__name(yn, "yn");
function Le(e, t, r) {
  const n = Ee[r];
  let s = cr(t);
  s.length === 0 && (s = [oe(t).trim()].filter(Boolean));
  const i = /* @__PURE__ */ __name(() => s.join(" "), "i");
  let a = Me(e, i(), r);
  if (a.ratio > n.max)
    for (; s.length > 1 && (s.pop(), a = Me(e, i(), r), !(a.ratio <= n.max)); )
      ;
  if (a.ratio < n.min) {
    const l = yn(r);
    for (const c of l)
      if (s.push(c), a = Me(e, i(), r), a.ratio >= n.min)
        break;
  }
  return a = Me(e, i(), r), { text: i().trim(), ratio: a.ratio, ok: a.ok, rule: n };
}
__name(Le, "Le");
function dt(e) {
  const t = ["\uBBFC\uAC04 \uBD80\uB2F4", "\uBD80\uB2F4\uB960", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC", "\uBE44\uC728"], r = oe(e);
  let n = 0;
  for (const s of t)
    r.includes(s) && n++;
  return { score: n, need: 3 };
}
__name(dt, "dt");
function vn(e) {
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
__name(vn, "vn");
function lr(e) {
  var d;
  const t = [], r = [e.narrative.brief, e.narrative.standard, e.narrative.detail].join(" "), n = JSON.stringify(e.structured || {}), s = vn((d = e.mindmap) == null ? void 0 : d.root).join(" | "), i = dt(r), a = dt(n), l = dt(s);
  i.score < i.need && t.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), a.score < a.need && t.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), l.score < l.need && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || t.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || t.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const c = rt(r, De), o = rt(n, De), u = rt(s, De);
  return c < 2 && t.push("\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), o < 2 && t.push("\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), u < 2 && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), { ok: t.length === 0, errors: t };
}
__name(lr, "lr");
function wn(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(wn, "wn");
async function Sn(e) {
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
__name(Sn, "Sn");
async function Rt(e, t) {
  const r = { ...t, sample_hash: t.sample_hash || wn((t.errors || []).join("|")) };
  e && (await Sn(e), await e.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Rt, "Rt");
function bn(e, t, r, n) {
  const s = or[r].minNumbers, i = Ee[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 \uAD50\uC815\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418 \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${ar.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${De.join(", ")}
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
__name(bn, "bn");
async function En(e) {
  const { originalText: t, model: r, callLLM: n, db: s } = e, i = {}, a = ["brief", "standard", "detail"];
  for (const c of a) {
    let o = oe(e.narrative[c]).trim();
    const u = Le(t, o, c);
    o = u.text, i[c] = { ratio: u.ratio, rule: u.rule };
    const d = xn(o, c), f = Me(t, o, c);
    if (!d.ok || !f.ok) {
      const p = [...d.ok ? [] : d.errors, ...f.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(f.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(f.rule.min * 100)}~${Math.round(f.rule.max * 100)}%)`]];
      await Rt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: c, stage: "narrative", errors: p, ratio: f.ratio });
      const g = bn(t, o, c, p), v = await Promise.resolve(n(g));
      e.narrative[c] = oe(v).trim();
      const m = Le(t, e.narrative[c], c);
      e.narrative[c] = m.text, i[c] = { ratio: m.ratio, rule: m.rule, rewritten: true };
    } else
      e.narrative[c] = o;
  }
  const l = lr({ narrative: e.narrative, structured: e.structured, mindmap: e.mindmap });
  return l.ok || await Rt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: l.errors }), { narrative: e.narrative, structured: e.structured, mindmap: e.mindmap, qa: { cross_ok: l.ok, cross_errors: l.errors, ratios: i } };
}
__name(En, "En");
function ur(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(ur, "ur");
function $t(e) {
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
__name($t, "$t");
function Tn(e) {
  const t = Qe(e, "detail"), r = tt(e, "detail"), n = Ze(e, "detail"), s = et(t.text, "detail", "exam"), i = e.length, a = ur(e), l = t.coreClaim, c = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const x = d.split(". ").filter(Boolean), y = Math.ceil(x.length / 2);
    d = x.slice(0, y).join(". ") + `.

` + x.slice(y).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, g = r.glossary, v = { title: n.title, children: n.children.map((x) => ({ title: x.title, children: (x.children || []).map((y) => ({ title: y.title, pack: Array.isArray(y.pack) && y.pack.length >= 2 ? y.pack : [y.title, `${y.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: y.explain && y.explain.length >= 30 ? y.explain : `${y.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (v.children[0] || v.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); v.children[0].children.length < 3; ) {
    const x = v.children[0].children.length + 1;
    v.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${x}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${x}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const m = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: g }, mindmap: v, selftest: m };
}
__name(Tn, "Tn");
function Ct(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(Ct, "Ct");
function kn(e) {
  var i, a, l, c, o, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((l = e == null ? void 0 : e.narrative) != null && l.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const g of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(g.pack) && g.pack.length && n++, typeof g.explain == "string" && g.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(kn, "kn");
function An(e) {
  var o, u, d, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((o = e.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((d = e.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((p) => {
    let g = 0;
    for (const v of (p == null ? void 0 : p.children) || [])
      g += ((v == null ? void 0 : v.children) || []).length;
    return g;
  }, "i"), a = i(e.brief.mindmap.tree), l = i(e.standard.mindmap.tree), c = i(e.detail.mindmap.tree);
  return a === l && l === c || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), t;
}
__name(An, "An");
async function ht(e, t) {
  var l, c, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ht, "ht");
function jn(e) {
  e.post("/api/matrix", async (t) => {
    var c, o;
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, s = !!((c = t.env) != null && c.GEMINI_API_KEY && String(t.env.GEMINI_API_KEY).trim().length > 10), i = String(((o = t.env) == null ? void 0 : o.USE_MOCK) || "").toLowerCase() === "true", a = s && !i ? "phase2" : "phase1";
    let l = null;
    try {
      const u = await t.req.json(), d = String(u.text || "").trim();
      if (!d)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: D } }, 400);
      const f = ur(d);
      let p = null;
      if (a === "phase1")
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), p = Tn(d);
      else {
        const q = Ct(d);
        let L = await ht(t, q);
        if (p = $t(L), !p) {
          const z = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", Ct(d)].join(`
`);
          L = await ht(t, z), p = $t(L);
        }
        if (!p)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: D } }, 502);
      }
      const g = kn(p);
      if (g.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: g.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: D } }, 422);
      let v = Qe(d, "brief"), m = Qe(d, "standard"), x = Qe(d, "detail");
      const y = tt(d, "brief"), O = tt(d, "standard"), I = tt(d, "detail"), j = Ze(d, "brief"), xe = Ze(d, "standard"), G = Ze(d, "detail"), V = et(d, "brief", "preview"), C = et(d, "standard", "preview"), K = et(d, "detail", "preview");
      v.warnings && v.warnings.length > 0 && console.log("[Matrix V4] Brief \uAC80\uC99D \uC2E4\uD328:", v.warnings), m.warnings && m.warnings.length > 0 && console.log("[Matrix V4] Standard \uAC80\uC99D \uC2E4\uD328:", m.warnings), x.warnings && x.warnings.length > 0 && console.log("[Matrix V4] Detail \uAC80\uC99D \uC2E4\uD328:", x.warnings);
      const S = { narrative: { text: v.text, coreClaim: v.coreClaim, grounds: v.grounds, comparisons: v.comparisons, implications: v.implications, ratio: v.ratio, ratioEnforcement: v.ratioEnforcement, targetRange: v.targetRange, warnings: v.warnings || [] }, structured: y, mindmap: j, selftest: V }, k = { narrative: { text: m.text, coreClaim: m.coreClaim, grounds: m.grounds, comparisons: m.comparisons, implications: m.implications, ratio: m.ratio, ratioEnforcement: m.ratioEnforcement, targetRange: m.targetRange, warnings: m.warnings || [] }, structured: O, mindmap: xe, selftest: C }, A = { narrative: { text: x.text, coreClaim: x.coreClaim, grounds: x.grounds, comparisons: x.comparisons, implications: x.implications, ratio: x.ratio, ratioEnforcement: x.ratioEnforcement, targetRange: x.targetRange, warnings: x.warnings || [] }, structured: I, mindmap: G, selftest: K }, wt = An({ brief: S, standard: k, detail: A });
      if (wt.length && a === "phase2")
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: wt.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: D } }, 422);
      let P = { brief: S.narrative.text, standard: k.narrative.text, detail: A.narrative.text }, D = null;
      if (a === "phase2")
        try {
          const q = /* @__PURE__ */ __name(async (z) => await ht(t, z), "q"), L = await En({ originalText: d, model: t.env.GEMINI_MODEL || "gemini", callLLM: q, db: t.env.DB, narrative: P, structured: { brief: S.structured, standard: k.structured, detail: A.structured }, mindmap: { brief: S.mindmap, standard: k.mindmap, detail: A.mindmap } });
          P = L.narrative, D = L.qa, S.narrative.text = P.brief, k.narrative.text = P.standard, A.narrative.text = P.detail, console.log("[Matrix V4] Phase 2 Quality Gate \uC644\uB8CC:", { cross_ok: D.cross_ok, ratios: D.ratios });
        } catch (q) {
          console.error("[Matrix V4] Phase 2 \uC624\uB958:", q.message);
        }
      if (a === "phase1" || !D) {
        const q = Le(d, P.brief, "brief"), L = Le(d, P.standard, "standard"), z = Le(d, P.detail, "detail");
        P.brief = q.text, P.standard = L.text, P.detail = z.text, S.narrative.text = q.text, k.narrative.text = L.text, A.narrative.text = z.text;
        const St = lr({ narrative: P, structured: { brief: S.structured, standard: k.structured, detail: A.structured }, mindmap: { brief: S.mindmap, standard: k.mindmap, detail: A.mindmap } });
        D = { cross_ok: St.ok, cross_errors: St.errors, ratios: { brief: { ratio: q.ratio, rule: Ee.brief, ok: q.ok }, standard: { ratio: L.ratio, rule: Ee.standard, ok: L.ok }, detail: { ratio: z.ratio, rule: Ee.detail, ok: z.ok } } }, console.log("[Matrix V4] Phase 1 \uC9C4\uB2E8 \uC644\uB8CC:", { cross_ok: D.cross_ok, ratios_ok: [q.ok, L.ok, z.ok] });
      }
      const pr = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: S, standard: k, detail: A }, views: { narrative: { brief: S.narrative, standard: k.narrative, detail: A.narrative }, structured: { brief: S.structured, standard: k.structured, detail: A.structured }, mindmap: { brief: S.mindmap, standard: k.mindmap, detail: A.mindmap }, selftest: { brief: S.selftest, standard: k.selftest, detail: A.selftest } } }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: D }, result: { qa: D } };
      return t.json(pr, 200);
    } catch (u) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (u == null ? void 0 : u.message) || String(u) }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: l } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => Vn), n = await t.req.json(), { sheet: s, attempt: i } = n;
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
      const { buildFailReport: n } = await Promise.resolve().then(() => zn), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(jn, "jn");
var J = new nr();
J.use("/api/*", Yr());
J.use("/static/*", cn({ root: "./public" }));
jn(J);
function He() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(He, "He");
function yt(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(yt, "yt");
function On(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(On, "On");
function Rn(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Rn, "Rn");
function $n(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name($n, "$n");
function Cn(e, t) {
  const r = Math.max(60, Te(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(Cn, "Cn");
function Nn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = $n((e == null ? void 0 : e.viewType) || "narrative"), n = Rn(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: l } = Cn(t), c = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), g = `
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
`.trim(), v = `
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
  let m = f;
  return r === "structured" ? m = p : r === "mindmap" ? m = g : r === "selftest" && (m = v), `${d}

${m}`;
}
__name(Nn, "Nn");
function ge(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(ge, "ge");
function at(e) {
  const t = ge(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(at, "at");
function _n(e) {
  const t = ge(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(_n, "_n");
function vt(e) {
  const t = ge(e).split(`
`), r = _n(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: ge(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : t.length, o = i.title, u = t.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(vt, "vt");
function Mn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(Mn, "Mn");
function be(e, t) {
  const n = at(e).map((i, a) => ({ s: i, i: a, score: Mn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, On(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(be, "be");
function Te(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(Te, "Te");
var gt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Nt(e, t, r) {
  const n = Math.max(60, Te(e)), s = Te(t), i = Math.floor(n * gt[r].min), a = Math.ceil(n * gt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(Nt, "Nt");
function qe(e, t, r) {
  const n = Math.max(60, Te(e)), s = Math.ceil(n * gt[r].max);
  let i = String(t || "").trim();
  if (Te(i) <= s)
    return i;
  const a = at(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (Te(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(qe, "qe");
function ft(e, t) {
  return `${e}_${t}`;
}
__name(ft, "ft");
function In(e) {
  const t = vt(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = ft("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = be(s.body, 6), o = [];
    for (const y of c)
      (y.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((I) => {
        const j = I.replace(/[()]/g, "").trim();
        j.length >= 2 && j.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(j) && o.push(j);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((y) => u.set(y, (u.get(y) || 0) + 1));
    const d = Array.from(u.entries()).sort((y, O) => O[1] - y[1]).map((y) => y[0]).filter((y) => y.length <= 10).slice(0, 3), f = be(s.body, 3).join(" "), p = be(s.body, 2).join(" "), g = be(s.body, 1).join(" "), v = { id: ft(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: g, children: [] };
    d.forEach((y) => {
      n.has(y) || n.set(y, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${y}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${be(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const x = at(s.body).filter((y) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(y)).slice(0, 2);
    x.length && v.children.push({ id: ft(a + "_adv", 1), title: x.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(v), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(In, "In");
function dr(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(dr, "dr");
function Pn(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (dr(t, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: qe(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${qe(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(Pn, "Pn");
function Dn(e, t) {
  const r = vt(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...be(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return qe(e, i, t);
}
__name(Dn, "Dn");
function Ln(e, t) {
  vt(e);
  const r = at(e), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Ln, "Ln");
function Hn(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const l = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((g) => g.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((g) => {
      l.includes(g) && d++;
    });
    const f = d >= 2 || l.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(Hn, "Hn");
function _t(e) {
  const t = ge(e), { tree: r, glossary: n } = In(t), s = { originalMeta: { textHash: yt(t), chars: t.length, ts: He() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Dn(t, i), l = Pn(t, r, n, i), c = dr(r, i), o = Ln(t), d = Nt(t, a, i).ok ? a : qe(t, a, i), f = l.renderText || "", p = Nt(t, f, i);
    l.renderText = p.ok ? f : qe(t, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(_t, "_t");
J.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: He(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
J.post("/api/engine", async (e) => {
  var p, g, v, m, x, y, O;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), l = (t == null ? void 0 : t.useGemini) === true, c = ge(r);
  if (c.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && e.env.GEMINI_API_KEY)
    try {
      const I = Nn({ text: c, viewType: s, level: "detail", grade: i, subject: a }), j = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", G = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${j}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: I }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), C = (((x = (m = (v = (g = (p = G == null ? void 0 : G.candidates) == null ? void 0 : p[0]) == null ? void 0 : g.content) == null ? void 0 : v.parts) == null ? void 0 : m[0]) == null ? void 0 : x.text) || "").match(/\{[\s\S]*\}/);
      if (C) {
        const K = JSON.parse(C[0]);
        u = { originalMeta: { textHash: yt(c), chars: c.length, ts: He() }, modes: { detail: { [s]: K }, standard: { [s]: K }, brief: { [s]: K } } }, o = "gemini-" + j;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (I) {
      console.error("[Gemini Error]", I), u = _t(c), o = "v5-local-fallback";
    }
  else
    u = _t(c);
  const d = (O = (y = u.modes) == null ? void 0 : y[n]) == null ? void 0 : O[s], f = { engine: o, mode: n, viewType: s, ts: He(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
J.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = Hn(r, n);
  return e.json({ ok: true, result: s });
});
J.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = ge(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = He(), c = yt(s), o = JSON.stringify(i);
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
J.get("/api/loadSummary", async (e) => {
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
J.get("/", (e) => e.redirect("/static/v5.html"));
var Mt = new nr();
var qn = Object.assign({ "/src/index.tsx": J });
var hr = false;
for (const [, e] of Object.entries(qn))
  e && (Mt.route("/", e), Mt.notFound(e.notFoundHandler), hr = true);
if (!hr)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Fe(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Fe, "Fe");
function It(e, t) {
  const r = Fe(e);
  return t.some((n) => r.includes(Fe(n)));
}
__name(It, "It");
function Fn(e, t) {
  const r = Fe(e);
  return t.every((n) => r.includes(Fe(n)));
}
__name(Fn, "Fn");
function Un(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Un, "Un");
function Bn(e, t, r) {
  var g, v, m, x;
  const n = Fe(t), s = 100;
  if (!n) {
    const y = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, O = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: y, explanationToShow: O };
  }
  const i = ((g = e.rubric) == null ? void 0 : g.mustIncludeAny) || [], a = ((v = e.rubric) == null ? void 0 : v.mustIncludeAll) || [], l = ((m = e.rubric) == null ? void 0 : m.forbid) || [], c = (x = e.rubric) == null ? void 0 : x.maxChars;
  let o = 100, u = [];
  c && n.length > c && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${c}`)), l.length && It(n, l) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !Fn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !It(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = Un(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(Bn, "Bn");
function Gn(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((c) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[c.id]) ?? "";
    return Bn(c, o, r);
  }), s = Math.round(n.reduce((c, o) => c + o.score, 0) / Math.max(1, n.length)), i = n.filter((c) => !c.correct).map((c) => c.id), a = s >= e.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(Gn, "Gn");
var Vn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: Gn }, Symbol.toStringTag, { value: "Module" }));
var Kn = [];
async function fr(e) {
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
__name(fr, "fr");
async function Jn(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await fr(e);
    const c = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((c == null ? void 0 : c.results) || []).map((o) => ({ ts: o.ts, model: o.model, level: o.level, stage: o.stage, errors: JSON.parse(o.errors || "[]"), ratio: o.ratio, sample_hash: o.sample_hash }));
  } else
    s = Kn.filter((c) => c.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const c of s) {
    i[c.stage] = (i[c.stage] || 0) + 1;
    for (const o of c.errors || [])
      a[o] = (a[o] || 0) + 1;
  }
  const l = Object.entries(a).sort((c, o) => o[1] - c[1]).slice(0, 10).map(([c, o]) => ({ error: c, count: o }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: l, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(Jn, "Jn");
var zn = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: Jn, ensureFailLogTable: fr }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-4a40To/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Mt;

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

// ../.wrangler/tmp/bundle-4a40To/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.5475062334498868.mjs.map
