var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-8uYzNa/checked-fetch.js
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

// ../.wrangler/tmp/bundle-8uYzNa/strip-cf-connecting-ip-header.js
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
var Et = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Et");
var gr = /* @__PURE__ */ __name((e, t, r) => t in e ? mr(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "gr");
var b = /* @__PURE__ */ __name((e, t, r) => gr(e, typeof t != "symbol" ? t + "" : t, r), "b");
var ot = /* @__PURE__ */ __name((e, t, r) => t.has(e) || Et("Cannot " + r), "ot");
var h = /* @__PURE__ */ __name((e, t, r) => (ot(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var k = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? Et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "k");
var w = /* @__PURE__ */ __name((e, t, r, n) => (ot(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "w");
var $ = /* @__PURE__ */ __name((e, t, r) => (ot(e, t, "access private method"), r), "$");
var Tt = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(s) {
  w(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "Tt");
var kt = /* @__PURE__ */ __name((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let l, c = false, u;
    if (e[o] ? (u = e[o][0][0], n.req.routeIndex = o) : u = o === e.length && s || void 0, u)
      try {
        l = await u(n, () => a(o + 1));
      } catch (d) {
        if (d instanceof Error && t)
          n.error = d, l = await t(d, n), c = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || c) && (n.res = l), n;
  }
  __name(a, "a");
}, "kt");
var xr = Symbol();
var vr = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof zt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? yr(e, { all: r, dot: n }) : {};
}, "vr");
async function yr(e, t) {
  const r = await e.formData();
  return r ? Sr(r, t) : {};
}
__name(yr, "yr");
function Sr(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? wr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (br(r, n, s), delete r[n]);
  }), r;
}
__name(Sr, "Sr");
var wr = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "wr");
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
var St = /* @__PURE__ */ __name((e, t) => {
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
}, "St");
var Or = /* @__PURE__ */ __name((e) => St(e, decodeURI), "Or");
var Kt = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return Or(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Kt");
var $r = /* @__PURE__ */ __name((e) => {
  const t = Kt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "$r");
var we = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = we(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "we");
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
var ct = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? St(e, Jt) : e) : e, "ct");
var Vt = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const o = e.charCodeAt(a + t.length + 1);
      if (o === 61) {
        const l = a + t.length + 2, c = e.indexOf("&", l);
        return ct(e.slice(l, c === -1 ? void 0 : c));
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
    let l = e.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (l = ct(l)), i = a, l === "")
      continue;
    let c;
    o === -1 ? c = "" : (c = e.slice(o + 1, a === -1 ? void 0 : a), n && (c = ct(c))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(c)) : s[l] ?? (s[l] = c);
  }
  return t ? s[t] : s;
}, "Vt");
var jr = Vt;
var Rr = /* @__PURE__ */ __name((e, t) => Vt(e, t, true), "Rr");
var Jt = decodeURIComponent;
var At = /* @__PURE__ */ __name((e) => St(e, Jt), "At");
var Ae;
var U;
var ee;
var Xt;
var Yt;
var gt;
var te;
var Dt;
var zt = (Dt = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    k(this, ee);
    b(this, "raw");
    k(this, Ae);
    k(this, U);
    b(this, "routeIndex", 0);
    b(this, "path");
    b(this, "bodyCache", {});
    k(this, te, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, w(this, U, r), w(this, Ae, {});
  }
  param(e) {
    return e ? $(this, ee, Xt).call(this, e) : $(this, ee, Yt).call(this);
  }
  query(e) {
    return jr(this.url, e);
  }
  queries(e) {
    return Rr(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await vr(this, e));
  }
  json() {
    return h(this, te).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return h(this, te).call(this, "text");
  }
  arrayBuffer() {
    return h(this, te).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, te).call(this, "blob");
  }
  formData() {
    return h(this, te).call(this, "formData");
  }
  addValidatedData(e, t) {
    h(this, Ae)[e] = t;
  }
  valid(e) {
    return h(this, Ae)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [xr]() {
    return h(this, U);
  }
  get matchedRoutes() {
    return h(this, U)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, U)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Dt"), Ae = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), Xt = /* @__PURE__ */ __name(function(e) {
  const t = h(this, U)[0][this.routeIndex][1][e], r = $(this, ee, gt).call(this, t);
  return r && /\%/.test(r) ? At(r) : r;
}, "Xt"), Yt = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(h(this, U)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = $(this, ee, gt).call(this, h(this, U)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? At(n) : n);
  }
  return e;
}, "Yt"), gt = /* @__PURE__ */ __name(function(e) {
  return h(this, U)[1] ? h(this, U)[1][e] : e;
}, "gt"), te = /* @__PURE__ */ new WeakMap(), Dt);
var _r = { Stringify: 1 };
var Wt = /* @__PURE__ */ __name(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((o) => o({ phase: t, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((l) => Wt(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Wt");
var Mr = "text/plain; charset=UTF-8";
var lt = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "lt");
var Be;
var Ue;
var Y;
var Oe;
var W;
var H;
var Ke;
var $e;
var je;
var fe;
var Ge;
var Ve;
var re;
var be;
var Lt;
var Nr = (Lt = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    k(this, re);
    k(this, Be);
    k(this, Ue);
    b(this, "env", {});
    k(this, Y);
    b(this, "finalized", false);
    b(this, "error");
    k(this, Oe);
    k(this, W);
    k(this, H);
    k(this, Ke);
    k(this, $e);
    k(this, je);
    k(this, fe);
    k(this, Ge);
    k(this, Ve);
    b(this, "render", (...e2) => (h(this, $e) ?? w(this, $e, (t2) => this.html(t2)), h(this, $e).call(this, ...e2)));
    b(this, "setLayout", (e2) => w(this, Ke, e2));
    b(this, "getLayout", () => h(this, Ke));
    b(this, "setRenderer", (e2) => {
      w(this, $e, e2);
    });
    b(this, "header", (e2, t2, r) => {
      this.finalized && w(this, H, new Response(h(this, H).body, h(this, H)));
      const n = h(this, H) ? h(this, H).headers : h(this, fe) ?? w(this, fe, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    b(this, "status", (e2) => {
      w(this, Oe, e2);
    });
    b(this, "set", (e2, t2) => {
      h(this, Y) ?? w(this, Y, /* @__PURE__ */ new Map()), h(this, Y).set(e2, t2);
    });
    b(this, "get", (e2) => h(this, Y) ? h(this, Y).get(e2) : void 0);
    b(this, "newResponse", (...e2) => $(this, re, be).call(this, ...e2));
    b(this, "body", (e2, t2, r) => $(this, re, be).call(this, e2, t2, r));
    b(this, "text", (e2, t2, r) => !h(this, fe) && !h(this, Oe) && !t2 && !r && !this.finalized ? new Response(e2) : $(this, re, be).call(this, e2, t2, lt(Mr, r)));
    b(this, "json", (e2, t2, r) => $(this, re, be).call(this, JSON.stringify(e2), t2, lt("application/json", r)));
    b(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((s) => $(this, re, be).call(this, s, t2, lt("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Wt(e2, _r.Stringify, false, {}).then(n) : n(e2);
    });
    b(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    b(this, "notFound", () => (h(this, je) ?? w(this, je, () => new Response()), h(this, je).call(this, this)));
    w(this, Be, e), t && (w(this, W, t.executionCtx), this.env = t.env, w(this, je, t.notFoundHandler), w(this, Ve, t.path), w(this, Ge, t.matchResult));
  }
  get req() {
    return h(this, Ue) ?? w(this, Ue, new zt(h(this, Be), h(this, Ve), h(this, Ge))), h(this, Ue);
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
    return h(this, H) || w(this, H, new Response(null, { headers: h(this, fe) ?? w(this, fe, new Headers()) }));
  }
  set res(e) {
    if (h(this, H) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, H).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, H).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    w(this, H, e), this.finalized = true;
  }
  get var() {
    return h(this, Y) ? Object.fromEntries(h(this, Y)) : {};
  }
}, "Lt"), Be = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet(), be = /* @__PURE__ */ __name(function(e, t, r) {
  const n = h(this, H) ? new Headers(h(this, H).headers) : h(this, fe) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, Oe);
  return new Response(e, { status: s, headers: n });
}, "be"), Lt);
var I = "ALL";
var Cr = "all";
var Ir = ["get", "post", "put", "delete", "options", "patch"];
var Qt = "Can not add a route since the matcher is already built.";
var Zt = /* @__PURE__ */ __name(class extends Error {
}, "Zt");
var Pr = "__COMPOSED_HANDLER";
var Dr = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Dr");
var Ot = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Ot");
var G;
var P;
var er;
var V;
var le;
var Xe;
var Ye;
var Re;
var Lr = (Re = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    k(this, P);
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
    k(this, G, "/");
    b(this, "routes", []);
    k(this, V, Dr);
    b(this, "errorHandler", Ot);
    b(this, "onError", (t2) => (this.errorHandler = t2, this));
    b(this, "notFound", (t2) => (w(this, V, t2), this));
    b(this, "fetch", (t2, ...r) => $(this, P, Ye).call(this, t2, r[1], r[0], t2.method));
    b(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${we("/", t2)}`, r), n2, s2)));
    b(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith($(this, P, Ye).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Ir, Cr].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? w(this, G, a) : $(this, P, le).call(this, i, h(this, G), a), o.forEach((l) => {
        $(this, P, le).call(this, i, h(this, G), l);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const l of [a].flat()) {
        w(this, G, l);
        for (const c of [i].flat())
          o.map((u) => {
            $(this, P, le).call(this, c.toUpperCase(), h(this, G), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, G, i) : (w(this, G, "*"), a.unshift(i)), a.forEach((o) => {
      $(this, P, le).call(this, I, h(this, G), o);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Kt : $r;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === Ot ? i = s.handler : (i = /* @__PURE__ */ __name(async (o, l) => (await kt([], r.errorHandler)(o, () => s.handler(o, l))).res, "i"), i[Pr] = s.handler), $(a = n, P, le).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = $(this, P, er).call(this);
    return r._basePath = we(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name((l) => l, "s") : s = n.replaceRequest));
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
      const l = we(this._basePath, t), c = l === "/" ? 0 : l.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(c) || "/", new Request(d, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (l, c) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await c();
    }, "o");
    return $(this, P, le).call(this, I, we(t, "*"), o), this;
  }
}, "Re"), G = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakSet(), er = /* @__PURE__ */ __name(function() {
  const t = new Re({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, w(t, V, h(this, V)), t.routes = this.routes, t;
}, "er"), V = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = we(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "le"), Xe = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Xe"), Ye = /* @__PURE__ */ __name(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await $(this, P, Ye).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), o = new Nr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, V) });
  if (a[0].length === 1) {
    let c;
    try {
      c = a[0][0][0][0](o, async () => {
        o.res = await h(this, V).call(this, o);
      });
    } catch (u) {
      return $(this, P, Xe).call(this, u, o);
    }
    return c instanceof Promise ? c.then((u) => u || (o.finalized ? o.res : h(this, V).call(this, o))).catch((u) => $(this, P, Xe).call(this, u, o)) : c ?? h(this, V).call(this, o);
  }
  const l = kt(a[0], this.errorHandler, h(this, V));
  return (async () => {
    try {
      const c = await l(o);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return $(this, P, Xe).call(this, c, o);
    }
  })();
}, "Ye"), Re);
var tr = [];
function Hr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[I], o = a[2][i];
    if (o)
      return o;
    const l = i.match(a[0]);
    if (!l)
      return [[], tr];
    const c = l.indexOf("", 1);
    return [a[1][c], l];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Hr, "Hr");
var Ze = "[^/]+";
var Pe = ".*";
var De = "(?:|/.*)";
var Ee = Symbol();
var Fr = new Set(".\\+*[^]$()");
function qr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Pe || e === De ? 1 : t === Pe || t === De ? -1 : e === Ze ? 1 : t === Ze ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(qr, "qr");
var pe;
var me;
var J;
var ve;
var Br = (ve = /* @__PURE__ */ __name(class {
  constructor() {
    k(this, pe);
    k(this, me);
    k(this, J, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, pe) !== void 0)
        throw Ee;
      if (i)
        return;
      w(this, pe, r);
      return;
    }
    const [a, ...o] = t, l = a === "*" ? o.length === 0 ? ["", "", Pe] : ["", "", Ze] : a === "/*" ? ["", "", De] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (l) {
      const u = l[1];
      let d = l[2] || Ze;
      if (u && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw Ee;
      if (c = h(this, J)[d], !c) {
        if (Object.keys(h(this, J)).some((f) => f !== Pe && f !== De))
          throw Ee;
        if (i)
          return;
        c = h(this, J)[d] = new ve(), u !== "" && w(c, me, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(c, me)]);
    } else if (c = h(this, J)[a], !c) {
      if (Object.keys(h(this, J)).some((u) => u.length > 1 && u !== Pe && u !== De))
        throw Ee;
      if (i)
        return;
      c = h(this, J)[a] = new ve();
    }
    c.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, J)).sort(qr).map((n) => {
      const s = h(this, J)[n];
      return (typeof h(s, me) == "number" ? `(${n})@${h(s, me)}` : Fr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, pe) == "number" && r.unshift(`#${h(this, pe)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ve"), pe = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), ve);
var nt;
var Je;
var Ht;
var Ur = (Ht = /* @__PURE__ */ __name(class {
  constructor() {
    k(this, nt, { varIndex: 0 });
    k(this, Je, new Br());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (l) => {
        const c = `@\\${a}`;
        return s[a] = [c, l], a++, o = true, c;
      }), !o)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(o) !== -1) {
          i[l] = i[l].replace(o, s[a][1]);
          break;
        }
    }
    return h(this, Je).insert(i, t, n, h(this, nt), r), n;
  }
  buildRegExp() {
    let e = h(this, Je).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Ht"), nt = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), Ht);
var Kr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var We = /* @__PURE__ */ Object.create(null);
function rr(e) {
  return We[e] ?? (We[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(rr, "rr");
function Gr() {
  We = /* @__PURE__ */ Object.create(null);
}
__name(Gr, "Gr");
function Vr(e) {
  var c;
  const t = new Ur(), r = [];
  if (e.length === 0)
    return Kr;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, m]) => u ? 1 : f ? -1 : d.length - m.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [m, p, g] = n[u];
    m ? s[p] = [g.map(([y]) => [y, /* @__PURE__ */ Object.create(null)]), tr] : d++;
    let v;
    try {
      v = t.insert(p, d, m);
    } catch (y) {
      throw y === Ee ? new Zt(p) : y;
    }
    m || (r[d] = g.map(([y, S]) => {
      const E = /* @__PURE__ */ Object.create(null);
      for (S -= 1; S >= 0; S--) {
        const [N, _] = v[S];
        E[N] = _;
      }
      return [y, E];
    }));
  }
  const [i, a, o] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, m = r[u].length; f < m; f++) {
      const p = (c = r[u][f]) == null ? void 0 : c[1];
      if (!p)
        continue;
      const g = Object.keys(p);
      for (let v = 0, y = g.length; v < y; v++)
        p[g[v]] = o[p[g[v]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(Vr, "Vr");
function Se(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (rr(r).test(t))
        return [...e[r]];
  }
}
__name(Se, "Se");
var ne;
var se;
var st;
var nr;
var Ft;
var Jr = (Ft = /* @__PURE__ */ __name(class {
  constructor() {
    k(this, st);
    b(this, "name", "RegExpRouter");
    k(this, ne);
    k(this, se);
    b(this, "match", Hr);
    w(this, ne, { [I]: /* @__PURE__ */ Object.create(null) }), w(this, se, { [I]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var o;
    const n = h(this, ne), s = h(this, se);
    if (!n || !s)
      throw new Error(Qt);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[I]).forEach((c) => {
        l[e][c] = [...l[I][c]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = rr(t);
      e === I ? Object.keys(n).forEach((c) => {
        var u;
        (u = n[c])[t] || (u[t] = Se(n[c], t) || Se(n[I], t) || []);
      }) : (o = n[e])[t] || (o[t] = Se(n[e], t) || Se(n[I], t) || []), Object.keys(n).forEach((c) => {
        (e === I || e === c) && Object.keys(n[c]).forEach((u) => {
          l.test(u) && n[c][u].push([r, i]);
        });
      }), Object.keys(s).forEach((c) => {
        (e === I || e === c) && Object.keys(s[c]).forEach((u) => l.test(u) && s[c][u].push([r, i]));
      });
      return;
    }
    const a = Gt(t) || [t];
    for (let l = 0, c = a.length; l < c; l++) {
      const u = a[l];
      Object.keys(s).forEach((d) => {
        var f;
        (e === I || e === d) && ((f = s[d])[u] || (f[u] = [...Se(n[d], u) || Se(n[I], u) || []]), s[d][u].push([r, i - c + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, se)).concat(Object.keys(h(this, ne))).forEach((t) => {
      e[t] || (e[t] = $(this, st, nr).call(this, t));
    }), w(this, ne, w(this, se, void 0)), Gr(), e;
  }
}, "Ft"), ne = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakSet(), nr = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === I;
  return [h(this, ne), h(this, se)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== I && t.push(...Object.keys(n[I]).map((i) => [i, n[I][i]]));
  }), r ? Vr(t) : null;
}, "nr"), Ft);
var ie;
var Q;
var qt;
var zr = (qt = /* @__PURE__ */ __name(class {
  constructor(e) {
    b(this, "name", "SmartRouter");
    k(this, ie, []);
    k(this, Q, []);
    w(this, ie, e.routers);
  }
  add(e, t, r) {
    if (!h(this, Q))
      throw new Error(Qt);
    h(this, Q).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, Q))
      throw new Error("Fatal error");
    const r = h(this, ie), n = h(this, Q), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let l = 0, c = n.length; l < c; l++)
          o.add(...n[l]);
        a = o.match(e, t);
      } catch (l) {
        if (l instanceof Zt)
          continue;
        throw l;
      }
      this.match = o.match.bind(o), w(this, ie, [o]), w(this, Q, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, Q) || h(this, ie).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ie)[0];
  }
}, "qt"), ie = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), qt);
var Ce = /* @__PURE__ */ Object.create(null);
var ae;
var L;
var ge;
var _e;
var D;
var Z;
var ue;
var Me;
var Xr = (Me = /* @__PURE__ */ __name(class {
  constructor(t, r, n) {
    k(this, Z);
    k(this, ae);
    k(this, L);
    k(this, ge);
    k(this, _e, 0);
    k(this, D, Ce);
    if (w(this, L, n || /* @__PURE__ */ Object.create(null)), w(this, ae, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, w(this, ae, [s]);
    }
    w(this, ge, []);
  }
  insert(t, r, n) {
    w(this, _e, ++Tt(this, _e)._);
    let s = this;
    const i = Er(r), a = [];
    for (let o = 0, l = i.length; o < l; o++) {
      const c = i[o], u = i[o + 1], d = Ar(c, u), f = Array.isArray(d) ? d[0] : c;
      if (f in h(s, L)) {
        s = h(s, L)[f], d && a.push(d[1]);
        continue;
      }
      h(s, L)[f] = new Me(), d && (h(s, ge).push(d), a.push(d[1])), s = h(s, L)[f];
    }
    return h(s, ae).push({ [t]: { handler: n, possibleKeys: a.filter((o, l, c) => c.indexOf(o) === l), score: h(this, _e) } }), s;
  }
  search(t, r) {
    var l;
    const n = [];
    w(this, D, Ce);
    let i = [this];
    const a = Ut(r), o = [];
    for (let c = 0, u = a.length; c < u; c++) {
      const d = a[c], f = c === u - 1, m = [];
      for (let p = 0, g = i.length; p < g; p++) {
        const v = i[p], y = h(v, L)[d];
        y && (w(y, D, h(v, D)), f ? (h(y, L)["*"] && n.push(...$(this, Z, ue).call(this, h(y, L)["*"], t, h(v, D))), n.push(...$(this, Z, ue).call(this, y, t, h(v, D)))) : m.push(y));
        for (let S = 0, E = h(v, ge).length; S < E; S++) {
          const N = h(v, ge)[S], _ = h(v, D) === Ce ? {} : { ...h(v, D) };
          if (N === "*") {
            const T = h(v, L)["*"];
            T && (n.push(...$(this, Z, ue).call(this, T, t, h(v, D))), w(T, D, _), m.push(T));
            continue;
          }
          const [K, F, C] = N;
          if (!d && !(C instanceof RegExp))
            continue;
          const A = h(v, L)[K], j = a.slice(c).join("/");
          if (C instanceof RegExp) {
            const T = C.exec(j);
            if (T) {
              if (_[F] = T[0], n.push(...$(this, Z, ue).call(this, A, t, h(v, D), _)), Object.keys(h(A, L)).length) {
                w(A, D, _);
                const x = ((l = T[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (o[x] || (o[x] = [])).push(A);
              }
              continue;
            }
          }
          (C === true || C.test(d)) && (_[F] = d, f ? (n.push(...$(this, Z, ue).call(this, A, t, _, h(v, D))), h(A, L)["*"] && n.push(...$(this, Z, ue).call(this, h(A, L)["*"], t, _, h(v, D)))) : (w(A, D, _), m.push(A)));
        }
      }
      i = m.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, u) => c.score - u.score), [n.map(({ handler: c, params: u }) => [c, u])];
  }
}, "Me"), ae = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), ue = /* @__PURE__ */ __name(function(t, r, n, s) {
  const i = [];
  for (let a = 0, o = h(t, ae).length; a < o; a++) {
    const l = h(t, ae)[a], c = l[r] || l[I], u = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), i.push(c), n !== Ce || s && s !== Ce))
      for (let d = 0, f = c.possibleKeys.length; d < f; d++) {
        const m = c.possibleKeys[d], p = u[c.score];
        c.params[m] = s != null && s[m] && !p ? s[m] : n[m] ?? (s == null ? void 0 : s[m]), u[c.score] = true;
      }
  }
  return i;
}, "ue"), Me);
var xe;
var Bt;
var Yr = (Bt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, "name", "TrieRouter");
    k(this, xe);
    w(this, xe, new Xr());
  }
  add(e, t, r) {
    const n = Gt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, xe).insert(e, n[s], r);
      return;
    }
    h(this, xe).insert(e, t, r);
  }
  match(e, t) {
    return h(this, xe).search(e, t);
  }
}, "Bt"), xe = /* @__PURE__ */ new WeakMap(), Bt);
var sr = /* @__PURE__ */ __name(class extends Lr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new zr({ routers: [new Jr(), new Yr()] });
  }
}, "sr");
var Wr = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, o) {
    var u;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    const c = await n(a.req.header("origin") || "", a);
    if (c && l("Access-Control-Allow-Origin", c), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && l("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const m = a.req.header("Access-Control-Request-Headers");
        m && (f = m.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Wr");
var Qr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var $t = /* @__PURE__ */ __name((e, t = en) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "$t");
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
var ir = { br: ".br", zstd: ".zst", gzip: ".gz" };
var rn = Object.keys(ir);
var nn = "index.html";
var sn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? tn;
  return async (s, i) => {
    var u, d, f, m;
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
    e.isDir && await e.isDir(o) && (o = n(o, nn));
    const l = e.getContent;
    let c = await l(o, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const p = e.mimes && $t(o, e.mimes) || $t(o);
      if (s.header("Content-Type", p || "application/octet-stream"), e.precompressed && (!p || Qr.test(p))) {
        const g = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((v) => v.trim()));
        for (const v of rn) {
          if (!g.has(v))
            continue;
          const y = await l(o + ir[v], s);
          if (y) {
            c = y, s.header("Content-Encoding", v), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, o, s)), s.body(c);
    }
    await ((m = e.onNotFound) == null ? void 0 : m.call(e, o, s)), await i();
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
var ar = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function xt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(xt, "xt");
function ln(e) {
  return e.replace(/\s+/g, "").length;
}
__name(ln, "ln");
function oe(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(oe, "oe");
function un(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(un, "un");
function Ne(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(Ne, "Ne");
function ut(e, t, r) {
  const n = xt(e), i = xt(t) / Math.max(n, 1), a = ar[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(ut, "ut");
function dn(e) {
  return ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(dn, "dn");
function hn(e, t, r) {
  let s = oe(t).slice();
  const i = ut(e, s.join(". ") + ".", r);
  let a = i, o = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), o = true, a = ut(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const l = dn();
    for (const c of l)
      if (s.push(c), o = true, a = ut(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: o, originalRatio: i.ratio };
}
__name(hn, "hn");
function fn(e, t) {
  const r = ["\uCC28\uC774", "\uBE44\uAD50", "\uB300\uC870", "\uBC18\uBA74", "\uC774\uC5D0 \uBC18\uD574", "\uD55C\uD3B8", "\uB2EC\uB9AC"];
  return t.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name(fn, "fn");
function pn(e, t) {
  const r = ["\uB530\uB77C\uC11C", "\uADF8\uB7EC\uBBC0\uB85C", "\uACB0\uB860", "\uC758\uBBF8", "\uC2DC\uC0AC", "\uC911\uC694", "\uD6A8\uACFC"];
  return t.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name(pn, "pn");
function mn(e, t) {
  const r = oe(e);
  Ne(e);
  const n = ln(e), s = ar[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), o = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", u = r.map((x, R) => {
    let O = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(x) && (O += 5), /(특징|특성|요인|측면|경향|양상)/.test(x) && (O += 4), /(연구|학자|선행|본|분석|종합)/.test(x) && (O += 3), /(차이|비교|대조|반면|이에 반해)/.test(x) && (O += 2), R === 0 && (O += 3), x.length < 20 && (O -= 2), x.length > 200 && (O -= 1), { sentence: x, score: O, index: R };
  }).sort((x, R) => R.score - x.score || x.index - R.index).slice(0, 5).sort((x, R) => x.index - R.index).map((x) => x.sentence);
  let d = "";
  d = u.join(" "), d = oe(d).filter((x) => {
    const R = x.match(/[A-Z][a-z]+|(?:[一-龥]+)|(?:[가-힣]{2,}(?:국|시|도|군|구))/g) || [];
    for (const O of R)
      if (O.length >= 2 && !e.includes(O))
        return false;
    return true;
  }).join(" "), d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const p = hn(e, d, t), g = p.text, v = xt(g), y = oe(g), S = y[0] || o;
  let E = y.slice(1, 4);
  E.length === 0 && y.length > 0 ? E = [y[0]] : E.length === 0 && (E = ["\uC6D0\uBB38\uC5D0\uC11C \uD575\uC2EC \uB0B4\uC6A9\uC744 \uCD94\uCD9C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."]);
  const N = [], _ = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const x of _)
    g.includes(x) && N.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${x}"`);
  const K = { brief: 2, standard: 4, detail: 6 };
  y.length < K[t] && N.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${y.length}\uBB38\uC7A5 (\uCD5C\uC18C ${K[t]}\uBB38\uC7A5)`), ![/([가-힣]{2,4})(은|는|와|과)\s*([가-힣]{2,4})(의|을|를)/, /(차이|비교|대조|반면)/].some((x) => x.test(g)) && e.match(/(비교|대조|차이)/) && N.push("\uBE44\uAD50 \uC694\uC18C \uB204\uB77D");
  const A = e.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], j = g.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], T = { brief: Math.min(1, A.length), standard: Math.min(2, A.length), detail: Math.min(3, A.length) };
  return j.length < T[t] && A.length > 0 && N.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${j.length}\uAC1C (\uCD5C\uC18C ${T[t]}\uAC1C)`), { type: "narrative", level: t, text: g, charCount: v, ratio: p.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: p.adjusted, originalRatio: p.originalRatio, finalRatio: p.ratio, targetRatio: s.target }, coreClaim: S, grounds: E.slice(0, 5), comparisons: fn(e, y), implications: pn(e, y), warnings: N };
}
__name(mn, "mn");
function gn(e, t) {
  const r = oe(e), n = Ne(e);
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, 6).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(gn, "gn");
function xn(e, t, r = "preview") {
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(xn, "xn");
function vn(e) {
  const t = oe(e), r = Ne(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(vn, "vn");
function yn(e, t) {
  const r = oe(e), n = 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const o = a * i, l = r.slice(o, o + i);
    if (l.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${l[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: l });
  }
  return s;
}
__name(yn, "yn");
function Sn(e, t) {
  const r = Ne(e);
  un(e);
  const n = oe(e), s = 7, i = [], a = r.filter((o) => e.includes(o));
  for (let o = 0; o < s && o < a.length; o++) {
    const l = a[o], c = wn(l), u = n.find((d) => d.includes(l)) || `${l}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    e.includes(l) && i.push({ word: l, coreMeaning: c, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(Sn, "Sn");
function wn(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(wn, "wn");
function bn(e, t) {
  const r = vn(e), n = yn(e), s = Sn(e), i = Ne(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((c) => ({ title: c.title, keywords: Ne(c.content.join(" ")).slice(0, 3), bullets: c.content, children: [] })) }], o = s.map((c) => ({ term: c.word, def: `${c.coreMeaning} \u2014 ${c.explanation}` })), l = n.map((c, u) => ({ title: c.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: l, hierarchy: a, glossary: o, coreTerms: s };
}
__name(bn, "bn");
var q = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var or = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4", "\uC81C\uC2DC\uB41C\uB2E4", "\uBCF4\uC778\uB2E4", "\uACB0\uB860\uC774\uB2E4", "\uC885\uD569\uD558\uBA74", "\uC774\uC0C1\uC758 \uB0B4\uC6A9\uC744"];
var En = [{ pattern1: /선행학습이?\s*없/, pattern2: /필요하다/, desc: "\uC120\uD589\uD559\uC2B5 \uC5C6\uC74C vs \uD544\uC694\uD568" }, { pattern1: /사교육이?\s*(거의\s*)?없/, pattern2: /의존/, desc: "\uC0AC\uAD50\uC721 \uC5C6\uC74C vs \uC758\uC874" }];
var Le = ["7.6%", "2.8%", "6.5%", "0.2%"];
var cr = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function ce(e) {
  return e == null ? "" : String(e);
}
__name(ce, "ce");
function jt(e) {
  return ce(e).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(jt, "jt");
function lr(e) {
  return ce(e).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(lr, "lr");
function Qe(e, t) {
  const r = ce(e);
  return t.filter((n) => r.includes(n)).length;
}
__name(Qe, "Qe");
function Ie(e, t, r) {
  const n = jt(e), s = jt(t), i = s / Math.max(n, 1), a = q[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a, originLen: n, sumLen: s };
}
__name(Ie, "Ie");
function Tn(e, t) {
  const r = [], n = cr[t], s = ce(e);
  for (const l of or)
    s.includes(l) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${l}"`);
  for (const { pattern1: l, pattern2: c, desc: u } of En)
    l.test(s) && c.test(s) && r.push(`\uB17C\uB9AC \uBAA8\uC21C: ${u}`);
  const i = lr(s), a = new Set(i.map((l) => l.trim()));
  if (a.size < i.length) {
    const l = i.length - a.size;
    r.push(`\uBB38\uC7A5 \uC911\uBCF5: ${l}\uD68C \uBC18\uBCF5`);
  }
  i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const o = Qe(s, Le);
  return o < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${o}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(Tn, "Tn");
function kn(e) {
  return e === "brief" ? ["\uACF5\uAD50\uC721 \uCC45\uC784\uACFC \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870\uC758 \uCC28\uC774\uAC00 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC758 \uCC28\uC774\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4."] : e === "standard" ? ["\uD55C\uAD6D\uC740 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4\uC774 \uB192\uACE0 \uC2A4\uC6E8\uB374\uC740 \uB0AE\uC544 \uAD6D\uAC00 \uBD80\uB2F4 \uAD6C\uC870\uAC00 \uB2E4\uB974\uB2E4.", "\uC774 \uCC28\uC774\uAC00 \uC120\uD589\uD559\uC2B5 \uD544\uC694\uC131\uACFC \uC785\uC2DC \uC911\uC2EC \uBB38\uD654\uC758 \uAC15\uB3C4\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC81C\uC2DC\uB41C\uB2E4."] : ["\uD55C\uAD6D\uC740 GDP \uB300\uBE44 \uACF5\uAD50\uC721 7.6%\uC640 \uBBFC\uAC04 \uBD80\uB2F4 2.8%\uAC00, \uC2A4\uC6E8\uB374\uC740 6.5%\uC640 0.2%\uAC00 \uC81C\uC2DC\uB41C\uB2E4.", "\uC785\uC2DC \uC81C\uB3C4, \uACF5\uAD50\uC721 \uC9C0\uC6D0, \uC785\uC2DC\uC5D0 \uB450\uB294 \uBE44\uC911\uC774 \uAD6D\uAC00\uBCC4 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uB9CC\uB4E0\uB2E4\uACE0 \uACB0\uB860\uC9D3\uB294\uB2E4."];
}
__name(kn, "kn");
function et(e, t, r) {
  const n = q[r];
  let s = lr(t);
  s.length === 0 && (s = [ce(t).trim()].filter(Boolean));
  const i = /* @__PURE__ */ __name(() => s.join(" "), "i");
  let a = Ie(e, i(), r);
  if (a.ratio > n.max)
    for (; s.length > 1 && (s.pop(), a = Ie(e, i(), r), !(a.ratio <= n.max)); )
      ;
  if (a.ratio < n.min) {
    const o = kn(r);
    for (const l of o)
      if (s.push(l), a = Ie(e, i(), r), a.ratio >= n.min)
        break;
  }
  return a = Ie(e, i(), r), { text: i().trim(), ratio: a.ratio, ok: a.ok, rule: n };
}
__name(et, "et");
function dt(e) {
  const t = ["\uBBFC\uAC04 \uBD80\uB2F4", "\uBD80\uB2F4\uB960", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC", "\uBE44\uC728"], r = ce(e);
  let n = 0;
  for (const s of t)
    r.includes(s) && n++;
  return { score: n, need: 3 };
}
__name(dt, "dt");
function An(e) {
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
__name(An, "An");
function ur(e) {
  var d;
  const t = [], r = [e.narrative.brief, e.narrative.standard, e.narrative.detail].join(" "), n = JSON.stringify(e.structured || {}), s = An((d = e.mindmap) == null ? void 0 : d.root).join(" | "), i = dt(r), a = dt(n), o = dt(s);
  i.score < i.need && t.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), a.score < a.need && t.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), o.score < o.need && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || t.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || t.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const l = Qe(r, Le), c = Qe(n, Le), u = Qe(s, Le);
  return l < 2 && t.push("\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), c < 2 && t.push("\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), u < 2 && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), { ok: t.length === 0, errors: t };
}
__name(ur, "ur");
function On(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(On, "On");
async function $n(e) {
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
__name($n, "$n");
async function Rt(e, t) {
  const r = { ...t, sample_hash: t.sample_hash || On((t.errors || []).join("|")) };
  e && (await $n(e), await e.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Rt, "Rt");
function jn(e, t, r, n) {
  const s = cr[r].minNumbers, i = q[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 \uAD50\uC815\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418 \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${or.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${Le.join(", ")}
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
__name(jn, "jn");
async function Rn(e) {
  const { originalText: t, model: r, callLLM: n, db: s } = e, i = {}, a = ["brief", "standard", "detail"];
  for (const l of a) {
    let c = ce(e.narrative[l]).trim();
    const u = et(t, c, l);
    c = u.text, i[l] = { ratio: u.ratio, rule: u.rule };
    const d = Tn(c, l), f = Ie(t, c, l);
    if (!d.ok || !f.ok) {
      const m = [...d.ok ? [] : d.errors, ...f.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(f.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(f.rule.min * 100)}~${Math.round(f.rule.max * 100)}%)`]];
      await Rt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: l, stage: "narrative", errors: m, ratio: f.ratio });
      const p = jn(t, c, l, m), g = await Promise.resolve(n(p));
      e.narrative[l] = ce(g).trim();
      const v = et(t, e.narrative[l], l);
      e.narrative[l] = v.text, i[l] = { ratio: v.ratio, rule: v.rule, rewritten: true };
    } else
      e.narrative[l] = c;
  }
  const o = ur({ narrative: e.narrative, structured: e.structured, mindmap: e.mindmap });
  return o.ok || await Rt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: o.errors }), { narrative: e.narrative, structured: e.structured, mindmap: e.mindmap, qa: { cross_ok: o.ok, cross_errors: o.errors, ratios: i } };
}
__name(Rn, "Rn");
function dr(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(dr, "dr");
function M(e, t) {
  const r = String(e || "").replace(/\s+/g, " ").trim();
  if (r.length <= t)
    return r;
  const n = r.slice(0, t), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(t * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name(M, "M");
function _t(e) {
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
__name(_t, "_t");
function _n(e) {
  let t = String(e || "");
  return t = t.replace(/-\s*\d+\s*-\s*/g, " "), t = t.replace(/학년별\s*통계/g, "\uD559\uB144\uBCC4 \uD1B5\uACC4"), t = t.replace(/점수\s*학년별\s*통계/g, "\uC810\uC218(\uD559\uB144\uBCC4 \uD1B5\uACC4)"), t = t.replace(/\r\n/g, `
`), t = t.replace(/[ \t]+/g, " "), t = t.replace(/\n{3,}/g, `

`), t = t.replace(/([가-힣])\n([가-힣])/g, "$1 $2"), t.trim();
}
__name(_n, "_n");
var Mn = ["\uC774 \uAE00\uC740", "\uBCF8 \uAE00\uC740", "\uC774 \uB17C\uBB38\uC740", "\uC774 \uBCF4\uACE0\uC11C\uB294", "\uC774 \uAE30\uC0AC\uB294", "\uC124\uBA85\uD55C\uB2E4", "\uC124\uBA85\uD558\uACE0 \uC788\uB2E4", "\uB2E4\uB8E8\uACE0 \uC788\uB2E4", "\uC11C\uC220\uD558\uACE0 \uC788\uB2E4", "\uC81C\uC2DC\uD558\uACE0 \uC788\uB2E4", "\uBD84\uC11D\uD558\uACE0 \uC788\uB2E4", "\uAC80\uD1A0\uD558\uACE0 \uC788\uB2E4", "\uB17C\uC758\uD558\uACE0 \uC788\uB2E4"];
function de(e) {
  const t = String(e || "");
  return /(\.\.\.)|(\.\.\.\.)|(…{1,})|(\u2026)/.test(t) || /…\s*$/.test(t) || /[.]\s*[…]/.test(t);
}
__name(de, "de");
function vt(e) {
  return String(e || "").replace(/\s+/g, " ").trim().split(new RegExp("(?<=[.!?]|\uB2E4\\.|\uB2E4\\?|\uB2E4!|\uC694\\.|\uC694\\?|\uC694!)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(vt, "vt");
function Nn(e) {
  const t = mn(e, "detail"), r = bn(e, "detail"), n = gn(e, "detail"), s = xn(t.text, "detail", "exam"), i = e.length, a = dr(e), o = t.coreClaim, l = t.grounds, c = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const y = d.split(". ").filter(Boolean), S = Math.ceil(y.length / 2);
    d = y.slice(0, S).join(". ") + `.

` + y.slice(S).join(". ") + ".";
  }
  const f = r.toc, m = r.hierarchy, p = r.glossary, g = { title: n.title, children: n.children.map((y) => ({ title: y.title, children: (y.children || []).map((S) => ({ title: S.title, pack: Array.isArray(S.pack) && S.pack.length >= 2 ? S.pack : [S.title, `${S.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: S.explain && S.explain.length >= 30 ? S.explain : `${S.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (g.children[0] || g.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); g.children[0].children.length < 3; ) {
    const y = g.children[0].children.length + 1;
    g.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${y}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${y}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const v = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: o, grounds: l, comparisons: c, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: m, glossary: p }, mindmap: g, selftest: v };
}
__name(Nn, "Nn");
function Mt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(Mt, "Mt");
function ht(e, t) {
  var j;
  const r = t === "brief", n = t === "standard", s = e.narrative.coreClaim || "", i = e.narrative.grounds || [], a = e.narrative.comparisons || [], o = e.narrative.implications || [], l = ((j = e.source) == null ? void 0 : j.charCount) || 1e3;
  let c = "", u = s, d = [], f = [], m = [];
  if (t === "detail")
    c = String(e.narrative.summaryDetail || "").trim(), u = s, d = i, f = a, m = o;
  else if (t === "brief") {
    const T = Math.floor(l * 0.18);
    u = M(s, 60);
    const x = a[0] ? M(a[0], 80) : "";
    if (d = [], f = x ? [x] : [], m = [], x)
      c = `${u}. ${x}.`;
    else {
      const R = i[0] ? M(i[0], 60) : "";
      c = R ? `${u}. ${R}.` : `${u}.`;
    }
    c.length > T && (c = c.slice(0, Math.max(0, T - 1)).trim());
  } else {
    const T = Math.floor(l * 0.38);
    u = M(s, 80), d = i.slice(0, 2).map((O) => M(O, 70));
    const x = a[0] ? M(a[0], 90) : "";
    f = x ? [x] : [], m = [];
    const R = [u];
    if (d.length > 0 && R.push(d.join(". ")), x && R.push(`\uBC18\uBA74 ${x}`), c = R.join(". ") + ".", c.length > T)
      c = c.slice(0, Math.max(0, T - 1)).trim();
    else if (c.length < Math.floor(l * 0.25) && o.length > 0) {
      const O = M(o[0], 60);
      c += ` ${O}.`;
    }
  }
  const p = e.structured.toc || [], g = r ? 2 : n ? 4 : 10, v = (e.structured.glossary || []).slice(0, g).map((T) => ({ term: M(T.term, 20), def: M(T.def, r ? 70 : 120) })), y = r ? 2 : n ? 3 : 5, S = /* @__PURE__ */ __name((T) => (T || []).map((x) => ({ title: M(x.title, 60), keywords: (x.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((R) => M(R, 16)), bullets: (x.bullets || []).slice(0, y).map((R) => M(R, r ? 90 : 140)), children: x.children ? S(x.children) : void 0 })), "S"), E = S(e.structured.hierarchy || []), N = Cn({ toc: p, hierarchy: E, glossary: v }), _ = JSON.parse(JSON.stringify(e.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), K = r ? 70 : n ? 110 : 160, F = r ? 2 : 3;
  for (const T of _.children || [])
    for (const x of T.children || [])
      Array.isArray(x.pack) && (x.pack = x.pack.slice(0, F).map((R) => M(R, 20))), typeof x.explain == "string" && (x.explain = M(x.explain, K)), Array.isArray(x.children) || (x.children = []);
  const C = r || n ? 2 : 4, A = (e.selftest.items || []).slice(0, C).map((T) => {
    var x, R, O;
    return { id: T.id, type: T.type, question: M(T.question, r ? 140 : 220), hint: T.hint ? M(T.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((x = T.rubric) == null ? void 0 : x.mustInclude) || []).slice(0, r ? 2 : 4).map((B) => M(B, 20)), mustNotInclude: (((R = T.rubric) == null ? void 0 : R.mustNotInclude) || []).slice(0, 2).map((B) => M(B, 20)), maxChars: ((O = T.rubric) == null ? void 0 : O.maxChars) ?? (r ? 140 : 220) }, answerKey: T.answerKey ? M(T.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: c, coreClaim: u, grounds: d, comparisons: f, implications: m }, structured: { text: N, toc: p, hierarchy: E, glossary: v }, mindmap: { tree: _ }, selftest: { passScorePct: 90, items: A } };
}
__name(ht, "ht");
function Cn(e) {
  var n, s;
  const t = [];
  t.push("\u2160. \uBAA9\uCC28"), (n = e.toc) != null && n.length ? e.toc.forEach((i, a) => t.push(`  ${a + 1}. ${i.title}`)) : t.push("  1. \uBCF8\uBB38"), t.push(""), t.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name((i, a) => {
    var o, l;
    for (const c of i || []) {
      const u = "  ".repeat(a);
      t.push(`${u}- ${c.title}`), (o = c.keywords) != null && o.length && t.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${c.keywords.join(" \xB7 ")}`), (c.bullets || []).forEach((d) => t.push(`${u}  \xB7 ${d}`)), (l = c.children) != null && l.length && r(c.children, a + 1);
    }
  }, "r");
  return r(e.hierarchy || [], 1), t.push(""), t.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = e.glossary) != null && s.length ? e.glossary.forEach((i) => t.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : t.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), t.join(`
`);
}
__name(Cn, "Cn");
function In(e) {
  var i, a, o, l, c, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 1) && t.push("narrative.grounds must be >= 1"), (!((o = e == null ? void 0 : e.narrative) != null && o.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = e == null ? void 0 : e.structured) == null ? void 0 : l.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.glossary) || e.structured.glossary.length < 1) && t.push("structured.glossary must be >= 1");
  let r = 0, n = 0, s = 0;
  for (const m of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const p of (m == null ? void 0 : m.children) || [])
      r++, Array.isArray(p.pack) && p.pack.length && n++, typeof p.explain == "string" && p.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(In, "In");
function Pn(e) {
  var c, u, d, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((c = e.standard.structured.glossary) == null ? void 0 : c.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((d = e.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((m) => {
    let p = 0;
    for (const g of (m == null ? void 0 : m.children) || [])
      p += ((g == null ? void 0 : g.children) || []).length;
    return p;
  }, "i"), a = i(e.brief.mindmap.tree), o = i(e.standard.mindmap.tree), l = i(e.detail.mindmap.tree);
  return a === o && o === l || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${o}, detail:${l})`), t;
}
__name(Pn, "Pn");
async function ft(e, t) {
  var o, l, c, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (c = (l = (o = i == null ? void 0 : i.candidates) == null ? void 0 : o[0]) == null ? void 0 : l.content) == null ? void 0 : c.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ft, "ft");
function he(e) {
  return String(e || "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").replace(/\.\.+/g, ".").replace(/보여\s*진다/g, "\uBCF4\uC778\uB2E4").replace(/되어\s*지는/g, "\uB418\uB294").replace(/성적간/g, "\uC131\uC801 \uAC04").replace(/능력\s*에서/g, "\uB2A5\uB825\uC5D0\uC11C").trim();
}
__name(he, "he");
function z(e) {
  const t = he(e);
  return Mn.some((r) => t.includes(r));
}
__name(z, "z");
function tt(e) {
  return String(e || "").replace(/(\.\.\.)|(\.\.\.\.)/g, " ").replace(/…/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(tt, "tt");
function rt(e) {
  let t = he(e);
  return t && !/[.!?]$/.test(t) && (t += "."), t;
}
__name(rt, "rt");
function Dn(e, t, r, n) {
  const s = e === "brief" ? 2 : e === "standard" ? 4 : 6;
  let i = rt(tt(t));
  const a = Math.floor(n * q[e].max);
  let o = 0;
  for (; vt(i).length < s && o < r.length; ) {
    const l = rt(tt(r[o++])), c = he(i + " " + l);
    if (c.length <= a)
      i = c;
    else
      break;
  }
  return i;
}
__name(Dn, "Dn");
function pt(e, t, r) {
  const n = t.length, s = M(he(r.claim || ""), e === "brief" ? 80 : 120), i = (r.grounds || []).map((p) => M(he(p), 140)).filter(Boolean), a = (r.comparisons || []).map((p) => M(he(p), 140)).filter(Boolean), o = (r.implications || []).map((p) => M(he(p), 140)).filter(Boolean);
  let l = "";
  if (e === "brief") {
    const p = (a[0] || i[0] || o[0] || "").trim();
    l = p ? `${s}. ${p}.` : `${s}.`;
  } else if (e === "standard") {
    const p = i.slice(0, 2), g = (a[0] || o[0] || "").trim(), v = [s];
    p.length && v.push(p.join(". ")), g && v.push(g), l = v.join(". ") + ".";
  } else {
    const p = i.slice(0, Math.max(3, Math.min(6, i.length))), g = [s, ...p].join(". ") + ".", v = [];
    a[0] && v.push(`\uD55C\uD3B8 ${a[0]}.`), o[0] && v.push(`${o[0]}.`);
    const y = v.length ? v.join(" ") : i[3] ? `${i[3]}.` : "";
    l = y ? `${g}

${y}` : g, l.includes(`

`) || (l = `${g}

${o[0] ? `${o[0]}.` : "\uC774 \uCC28\uC774\uB294 \uD559\uB144\uC774 \uC62C\uB77C\uAC08\uC218\uB85D \uC591\uC0C1\uC774 \uB2EC\uB77C\uC9C8 \uC218 \uC788\uC74C\uC744 \uC2DC\uC0AC\uD55C\uB2E4."}`);
  }
  const c = [...i, ...a, ...o].map((p) => rt(p)).filter(Boolean);
  let u = Dn(e, l, c, n);
  u = tt(u), z(u) && (u = vt(u).filter((g) => !z(g)).join(" ").trim(), u || (u = s ? `${s}.` : "\uD575\uC2EC \uB0B4\uC6A9\uC744 \uC694\uC57D\uD588\uB2E4."));
  let f = et(t, u, e).text;
  if (de(f) || z(f)) {
    const p = vt(f).map((g) => tt(g)).filter((g) => g && !z(g));
    f = rt(p.join(" ").trim());
  }
  return et(t, f, e);
}
__name(pt, "pt");
function Ln(e) {
  e.post("/api/matrix", async (t) => {
    var c, u;
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, s = !!((c = t.env) != null && c.GEMINI_API_KEY && String(t.env.GEMINI_API_KEY).trim().length > 10), i = String(((u = t.env) == null ? void 0 : u.USE_MOCK) || "").toLowerCase() === "true", a = s && !i ? "phase2" : "phase1";
    let o = null;
    function l(d) {
      return { cross_ok: false, cross_errors: [d], ratios: { brief: { ratio: 0, ok: false }, standard: { ratio: 0, ok: false }, detail: { ratio: 0, ok: false } } };
    }
    __name(l, "l");
    try {
      const d = await t.req.json(), f = String(d.text || "").trim(), m = _n(f);
      if (!m || m.length < 20) {
        const O = l(m ? "TEXT_TOO_SHORT" : "EMPTY_TEXT");
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uB108\uBB34 \uC9E7\uC2B5\uB2C8\uB2E4(\uCD5C\uC18C 20\uC790 \uAD8C\uC7A5)" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: O }, result: { qa: O } }, 400);
      }
      const p = dr(m);
      let g = null;
      if (a === "phase1")
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), g = Nn(m);
      else {
        const O = Mt(m);
        let B = await ft(t, O);
        if (g = _t(B), !g) {
          const at = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", Mt(m)].join(`
`);
          B = await ft(t, at), g = _t(B);
        }
        if (!g)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o } }, 502);
      }
      const v = In(g);
      if (v.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: v.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o } }, 422);
      const y = ht(g, "brief"), S = ht(g, "standard"), E = ht(g, "detail"), N = { claim: g.narrative.coreClaim || "", grounds: g.narrative.grounds || [], comparisons: g.narrative.comparisons || [], implications: g.narrative.implications || [] }, _ = pt("brief", m, N), K = pt("standard", m, N), F = pt("detail", m, N);
      y.narrative.text = _.text, S.narrative.text = K.text, E.narrative.text = F.text, y.narrative.ratio = _.ratio, S.narrative.ratio = K.ratio, E.narrative.ratio = F.ratio;
      const C = [];
      if ((de(y.narrative.text) || de(S.narrative.text) || de(E.narrative.text)) && C.push("ELLIPSIS_OR_TRUNCATION_FOUND"), (z(y.narrative.text) || z(S.narrative.text) || z(E.narrative.text)) && C.push("FORBIDDEN_TOPIC_TOKEN_FOUND"), C.length && a === "phase2")
        return t.json({ ok: false, error: { code: "NARRATIVE_FORTRESS_FAIL", message: C.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o } }, 422);
      console.log("[Matrix V4] FORTRESS narrative-quality:", { brief_ratio: _.ratio, standard_ratio: K.ratio, detail_ratio: F.ratio, hardFailReasons: C });
      const A = { narrative: { ...y.narrative, ratio: y.narrative.ratio, warnings: C }, structured: y.structured, mindmap: y.mindmap, selftest: y.selftest }, j = { narrative: { ...S.narrative, ratio: S.narrative.ratio, warnings: C }, structured: S.structured, mindmap: S.mindmap, selftest: S.selftest };
      E.narrative.warnings = C;
      const T = Pn({ brief: A, standard: j, detail: E });
      if (T.length && a === "phase2")
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: T.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o } }, 422);
      let x = { brief: A.narrative.text, standard: j.narrative.text, detail: E.narrative.text };
      if (o = null, a === "phase2")
        try {
          const O = /* @__PURE__ */ __name(async (at) => await ft(t, at), "O"), B = await Rn({ originalText: m, model: t.env.GEMINI_MODEL || "gemini", callLLM: O, db: t.env.DB, narrative: x, structured: { brief: A.structured, standard: j.structured, detail: E.structured }, mindmap: { brief: A.mindmap, standard: j.mindmap, detail: E.mindmap } });
          x = B.narrative, o = B.qa, (de(x.brief) || de(x.standard) || de(x.detail) || z(x.brief) || z(x.standard) || z(x.detail)) && (x = { brief: A.narrative.text, standard: j.narrative.text, detail: E.narrative.text }, o = o || null), A.narrative.text = x.brief, j.narrative.text = x.standard, E.narrative.text = x.detail, console.log("[Matrix V4] Phase 2 Quality Gate \uC644\uB8CC:", { cross_ok: o == null ? void 0 : o.cross_ok, ratios: o == null ? void 0 : o.ratios });
        } catch (O) {
          console.error("[Matrix V4] Phase 2 \uC624\uB958:", O.message), o = null;
        }
      if (a === "phase1" || !o) {
        const O = ur({ narrative: x, structured: { brief: A.structured, standard: j.structured, detail: E.structured }, mindmap: { brief: A.mindmap, standard: j.mindmap, detail: E.mindmap } });
        o = { cross_ok: O.ok, cross_errors: O.errors.concat(C.map((B) => `FORTRESS_${B}`)), ratios: { brief: { ratio: A.narrative.ratio, rule: q.brief, ok: A.narrative.ratio >= q.brief.min && A.narrative.ratio <= q.brief.max }, standard: { ratio: j.narrative.ratio, rule: q.standard, ok: j.narrative.ratio >= q.standard.min && j.narrative.ratio <= q.standard.max }, detail: { ratio: E.narrative.ratio, rule: q.detail, ok: E.narrative.ratio >= q.detail.min && E.narrative.ratio <= q.detail.max } } }, console.log("[Matrix V4] Phase 1 \uC9C4\uB2E8 \uC644\uB8CC (FORTRESS):", { cross_ok: o.cross_ok, ratios_ok: [o.ratios.brief.ok, o.ratios.standard.ok, o.ratios.detail.ok] });
      }
      const R = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: A, standard: j, detail: E }, views: { narrative: { brief: A.narrative, standard: j.narrative, detail: E.narrative }, structured: { brief: A.structured, standard: j.structured, detail: E.structured }, mindmap: { brief: A.mindmap, standard: j.mindmap, detail: E.mindmap }, selftest: { brief: A.selftest, standard: j.selftest, detail: E.selftest } } }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o }, result: { qa: o } };
      return t.json(R, 200);
    } catch (d) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (d == null ? void 0 : d.message) || String(d) }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: o } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => rs), n = await t.req.json(), { sheet: s, attempt: i } = n;
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
      const { buildFailReport: n } = await Promise.resolve().then(() => is), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Ln, "Ln");
var X = new sr();
X.use("/api/*", Wr());
X.use("/static/*", cn({ root: "./public" }));
Ln(X);
function He() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(He, "He");
function wt(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(wt, "wt");
function Hn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Hn, "Hn");
function Fn(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Fn, "Fn");
function qn(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(qn, "qn");
function Bn(e, t) {
  const r = Math.max(60, ke(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), o = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: o };
}
__name(Bn, "Bn");
function Un(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = qn((e == null ? void 0 : e.viewType) || "narrative"), n = Fn(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: o } = Bn(t), l = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), c = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${l}, subject=${c}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", t].join(`
`), f = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${l}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${o}, "base": ${i} } },
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
`.trim(), m = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: structured]
{
  "level": "detail",
  "viewType": "structured",
  "meta": { "grade": "${l}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${o}, "base": ${i} } },
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
`.trim(), p = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: mindmap]
{
  "level": "detail",
  "viewType": "mindmap",
  "meta": { "grade": "${l}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${o}, "base": ${i} } },
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
`.trim(), g = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: selftest]
{
  "level": "detail",
  "viewType": "selftest",
  "meta": { "grade": "${l}", "subject": "${c}", "passScore": 90, "charTarget": { "min": ${a}, "max": ${o}, "base": ${i} } },
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
  let v = f;
  return r === "structured" ? v = m : r === "mindmap" ? v = p : r === "selftest" && (v = g), `${d}

${v}`;
}
__name(Un, "Un");
function ye(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(ye, "ye");
function it(e) {
  const t = ye(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(it, "it");
function Kn(e) {
  const t = ye(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Kn, "Kn");
function bt(e) {
  const t = ye(e).split(`
`), r = Kn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: ye(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], o = i.startIdx, l = a ? a.startIdx : t.length, c = i.title, u = t.slice(o + 1, l).join(`
`).trim();
    n.push({ title: c, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(bt, "bt");
function Gn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(Gn, "Gn");
function Te(e, t) {
  const n = it(e).map((i, a) => ({ s: i, i: a, score: Gn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Hn(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(Te, "Te");
function ke(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(ke, "ke");
var yt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Nt(e, t, r) {
  const n = Math.max(60, ke(e)), s = ke(t), i = Math.floor(n * yt[r].min), a = Math.ceil(n * yt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(Nt, "Nt");
function Fe(e, t, r) {
  const n = Math.max(60, ke(e)), s = Math.ceil(n * yt[r].max);
  let i = String(t || "").trim();
  if (ke(i) <= s)
    return i;
  const a = it(i);
  let o = "";
  for (const l of a) {
    const c = (o ? o + " " : "") + l;
    if (ke(c) > s)
      break;
    o = c;
  }
  return o || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Fe, "Fe");
function mt(e, t) {
  return `${e}_${t}`;
}
__name(mt, "mt");
function Vn(e) {
  const t = bt(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = mt("sec", i + 1), o = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = Te(s.body, 6), c = [];
    for (const S of l)
      (S.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((N) => {
        const _ = N.replace(/[()]/g, "").trim();
        _.length >= 2 && _.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(_) && c.push(_);
      });
    const u = /* @__PURE__ */ new Map();
    c.forEach((S) => u.set(S, (u.get(S) || 0) + 1));
    const d = Array.from(u.entries()).sort((S, E) => E[1] - S[1]).map((S) => S[0]).filter((S) => S.length <= 10).slice(0, 3), f = Te(s.body, 3).join(" "), m = Te(s.body, 2).join(" "), p = Te(s.body, 1).join(" "), g = { id: mt(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: m, explainBrief: p, children: [] };
    d.forEach((S) => {
      n.has(S) || n.set(S, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${S}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${Te(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const y = it(s.body).filter((S) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(S)).slice(0, 2);
    y.length && g.children.push({ id: mt(a + "_adv", 1), title: y.join(" "), type: "advanced", collapsed: true, children: [] }), o.children.push(g), r.children.push(o);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Vn, "Vn");
function hr(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(hr, "hr");
function Jn(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (hr(t, n).children || []).map((u) => {
    const d = (u.children || []).find((m) => m.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), o = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, o).map((u) => ({ term: u.term, def: Fe(e, u.def, n) })), c = [];
  return c.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => c.push(`  ${d + 1}. ${u}`)), c.push(""), c.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    c.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && c.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && c.push(`     - \uC694\uC9C0: ${Fe(e, u.summary, n)}`), c.push("");
  }), c.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    c.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: c.join(`
`) };
}
__name(Jn, "Jn");
function zn(e, t) {
  const r = bt(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const o = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...Te(a.body, o));
  });
  const i = s.slice(0, n).join(" ");
  return Fe(e, i, t);
}
__name(zn, "zn");
function Xn(e, t) {
  bt(e);
  const r = it(e), n = [], s = r.find((o) => /(일컫|정의|란)/.test(o)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((o) => /(이에 반해|반면|대조)/.test(o));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((o) => /(%|\d{4}|전형|가산점|비율)/.test(o));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Xn, "Xn");
function Yn(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const o = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!o) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const c = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((p) => p.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(c)).slice(0, 8);
    let d = 0;
    u.forEach((p) => {
      o.includes(p) && d++;
    });
    const f = d >= 2 || o.length >= 30, m = f ? 1 : d === 1 ? 0.5 : 0;
    n += m, s.push({ id: a.id, ok: f, score: m, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(Yn, "Yn");
function Ct(e) {
  const t = ye(e), { tree: r, glossary: n } = Vn(t), s = { originalMeta: { textHash: wt(t), chars: t.length, ts: He() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = zn(t, i), o = Jn(t, r, n, i), l = hr(r, i), c = Xn(t), d = Nt(t, a, i).ok ? a : Fe(t, a, i), f = o.renderText || "", m = Nt(t, f, i);
    o.renderText = m.ok ? f : Fe(t, f, i), s.modes[i] = { narrative: d, structured: o, mindmap: { tree: l }, selftest: c };
  }), s;
}
__name(Ct, "Ct");
X.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: He(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
X.post("/api/engine", async (e) => {
  var m, p, g, v, y, S, E;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), o = (t == null ? void 0 : t.useGemini) === true, l = ye(r);
  if (l.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let c = "v5-local", u;
  if (o && e.env.GEMINI_API_KEY)
    try {
      const N = Un({ text: l, viewType: s, level: "detail", grade: i, subject: a }), _ = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", F = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${_}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: N }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), A = (((y = (v = (g = (p = (m = F == null ? void 0 : F.candidates) == null ? void 0 : m[0]) == null ? void 0 : p.content) == null ? void 0 : g.parts) == null ? void 0 : v[0]) == null ? void 0 : y.text) || "").match(/\{[\s\S]*\}/);
      if (A) {
        const j = JSON.parse(A[0]);
        u = { originalMeta: { textHash: wt(l), chars: l.length, ts: He() }, modes: { detail: { [s]: j }, standard: { [s]: j }, brief: { [s]: j } } }, c = "gemini-" + _;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (N) {
      console.error("[Gemini Error]", N), u = Ct(l), c = "v5-local-fallback";
    }
  else
    u = Ct(l);
  const d = (E = (S = u.modes) == null ? void 0 : S[n]) == null ? void 0 : E[s], f = { engine: c, mode: n, viewType: s, ts: He(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
X.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = Yn(r, n);
  return e.json({ ok: true, result: s });
});
X.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = ye(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), o = He(), l = wt(s), c = JSON.stringify(i);
  return await t.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, o, o, l, s, c).run(), e.json({ ok: true, id: a, textHash: l, ts: o });
});
X.get("/api/loadSummary", async (e) => {
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
X.get("/", (e) => e.redirect("/static/v5.html"));
var It = new sr();
var Wn = Object.assign({ "/src/index.tsx": X });
var fr = false;
for (const [, e] of Object.entries(Wn))
  e && (It.route("/", e), It.notFound(e.notFoundHandler), fr = true);
if (!fr)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function qe(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(qe, "qe");
function Pt(e, t) {
  const r = qe(e);
  return t.some((n) => r.includes(qe(n)));
}
__name(Pt, "Pt");
function Qn(e, t) {
  const r = qe(e);
  return t.every((n) => r.includes(qe(n)));
}
__name(Qn, "Qn");
function Zn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Zn, "Zn");
function es(e, t, r) {
  var p, g, v, y;
  const n = qe(t), s = 100;
  if (!n) {
    const S = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, E = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: S, explanationToShow: E };
  }
  const i = ((p = e.rubric) == null ? void 0 : p.mustIncludeAny) || [], a = ((g = e.rubric) == null ? void 0 : g.mustIncludeAll) || [], o = ((v = e.rubric) == null ? void 0 : v.forbid) || [], l = (y = e.rubric) == null ? void 0 : y.maxChars;
  let c = 100, u = [];
  l && n.length > l && (c -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${l}`)), o.length && Pt(n, o) && (c -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !Qn(n, a) && (c -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !Pt(n, i) && (c -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), c = Zn(c, 0, 100);
  const d = c >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, m = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: c, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: m };
}
__name(es, "es");
function ts(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((l) => {
    var u;
    const c = ((u = t.userAnswers) == null ? void 0 : u[l.id]) ?? "";
    return es(l, c, r);
  }), s = Math.round(n.reduce((l, c) => l + c.score, 0) / Math.max(1, n.length)), i = n.filter((l) => !l.correct).map((l) => l.id), a = s >= e.masteryScore;
  let o = "";
  return a ? o = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? o = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? o = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : o = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: o } };
}
__name(ts, "ts");
var rs = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: ts }, Symbol.toStringTag, { value: "Module" }));
var ns = [];
async function pr(e) {
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
__name(pr, "pr");
async function ss(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await pr(e);
    const l = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((l == null ? void 0 : l.results) || []).map((c) => ({ ts: c.ts, model: c.model, level: c.level, stage: c.stage, errors: JSON.parse(c.errors || "[]"), ratio: c.ratio, sample_hash: c.sample_hash }));
  } else
    s = ns.filter((l) => l.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const l of s) {
    i[l.stage] = (i[l.stage] || 0) + 1;
    for (const c of l.errors || [])
      a[c] = (a[c] || 0) + 1;
  }
  const o = Object.entries(a).sort((l, c) => c[1] - l[1]).slice(0, 10).map(([l, c]) => ({ error: l, count: c }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: o, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(ss, "ss");
var is = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: ss, ensureFailLogTable: pr }, Symbol.toStringTag, { value: "Module" }));

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

// ../.wrangler/tmp/bundle-8uYzNa/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = It;

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

// ../.wrangler/tmp/bundle-8uYzNa/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.3080746625576323.mjs.map
