var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-0lECcR/checked-fetch.js
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

// ../.wrangler/tmp/bundle-0lECcR/strip-cf-connecting-ip-header.js
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
var Kt = Object.defineProperty;
var it = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "it");
var Vt = /* @__PURE__ */ __name((t, e, r) => e in t ? Kt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Vt");
var v = /* @__PURE__ */ __name((t, e, r) => Vt(t, typeof e != "symbol" ? e + "" : e, r), "v");
var ze = /* @__PURE__ */ __name((t, e, r) => e.has(t) || it("Cannot " + r), "ze");
var h = /* @__PURE__ */ __name((t, e, r) => (ze(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var b = /* @__PURE__ */ __name((t, e, r) => e.has(t) ? it("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "b");
var y = /* @__PURE__ */ __name((t, e, r, n) => (ze(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "y");
var j = /* @__PURE__ */ __name((t, e, r) => (ze(t, e, "access private method"), r), "j");
var at = /* @__PURE__ */ __name((t, e, r, n) => ({ set _(s) {
  y(t, e, s, r);
}, get _() {
  return h(t, e, n);
} }), "at");
var ot = /* @__PURE__ */ __name((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let c, o = false, u;
    if (t[l] ? (u = t[l][0][0], n.req.routeIndex = l) : u = l === t.length && s || void 0, u)
      try {
        c = await u(n, () => a(l + 1));
      } catch (d) {
        if (d instanceof Error && e)
          n.error = d, c = await e(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || o) && (n.res = c), n;
  }
  __name(a, "a");
}, "ot");
var Bt = Symbol();
var Gt = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof kt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? zt(t, { all: r, dot: n }) : {};
}, "Gt");
async function zt(t, e) {
  const r = await t.formData();
  return r ? Ut(r, e) : {};
}
__name(zt, "zt");
function Ut(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? Wt(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Yt(r, n, s), delete r[n]);
  }), r;
}
__name(Ut, "Ut");
var Wt = /* @__PURE__ */ __name((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Wt");
var Yt = /* @__PURE__ */ __name((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Yt");
var Et = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Et");
var Xt = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: r } = Qt(t), n = Et(r);
  return Zt(n, e);
}, "Xt");
var Qt = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "Qt");
var Zt = /* @__PURE__ */ __name((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "Zt");
var qe = {};
var er = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return qe[n] || (r[2] ? qe[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : qe[n] = [t, r[1], true]), qe[n];
  }
  return null;
}, "er");
var et = /* @__PURE__ */ __name((t, e) => {
  try {
    return e(t);
  } catch {
    return t.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return e(r);
      } catch {
        return r;
      }
    });
  }
}, "et");
var tr = /* @__PURE__ */ __name((t) => et(t, decodeURI), "tr");
var jt = /* @__PURE__ */ __name((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return tr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "jt");
var rr = /* @__PURE__ */ __name((t) => {
  const e = jt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "rr");
var pe = /* @__PURE__ */ __name((t, e, ...r) => (r.length && (e = pe(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "pe");
var Ot = /* @__PURE__ */ __name((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), r = [];
  let n = "";
  return e.forEach((s) => {
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
}, "Ot");
var Ue = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? et(t, At) : t) : t, "Ue");
var $t = /* @__PURE__ */ __name((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const l = t.charCodeAt(a + e.length + 1);
      if (l === 61) {
        const c = a + e.length + 2, o = t.indexOf("&", c);
        return Ue(t.slice(c, o === -1 ? void 0 : o));
      } else if (l == 38 || isNaN(l))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (n = /[%+]/.test(t), !n)
      return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let l = t.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let c = t.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (n && (c = Ue(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = t.slice(l + 1, a === -1 ? void 0 : a), n && (o = Ue(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return e ? s[e] : s;
}, "$t");
var nr = $t;
var sr = /* @__PURE__ */ __name((t, e) => $t(t, e, true), "sr");
var At = decodeURIComponent;
var ct = /* @__PURE__ */ __name((t) => et(t, At), "ct");
var ve;
var D;
var G;
var Tt;
var Ct;
var Qe;
var Y;
var xt;
var kt = (xt = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", r = [[]]) {
    b(this, G);
    v(this, "raw");
    b(this, ve);
    b(this, D);
    v(this, "routeIndex", 0);
    v(this, "path");
    v(this, "bodyCache", {});
    b(this, Y, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, y(this, D, r), y(this, ve, {});
  }
  param(t) {
    return t ? j(this, G, Tt).call(this, t) : j(this, G, Ct).call(this);
  }
  query(t) {
    return nr(this.url, t);
  }
  queries(t) {
    return sr(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, n) => {
      e[n] = r;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Gt(this, t));
  }
  json() {
    return h(this, Y).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return h(this, Y).call(this, "text");
  }
  arrayBuffer() {
    return h(this, Y).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, Y).call(this, "blob");
  }
  formData() {
    return h(this, Y).call(this, "formData");
  }
  addValidatedData(t, e) {
    h(this, ve)[t] = e;
  }
  valid(t) {
    return h(this, ve)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Bt]() {
    return h(this, D);
  }
  get matchedRoutes() {
    return h(this, D)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, D)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "xt"), ve = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), Tt = /* @__PURE__ */ __name(function(t) {
  const e = h(this, D)[0][this.routeIndex][1][t], r = j(this, G, Qe).call(this, e);
  return r && /\%/.test(r) ? ct(r) : r;
}, "Tt"), Ct = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(h(this, D)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = j(this, G, Qe).call(this, h(this, D)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? ct(n) : n);
  }
  return t;
}, "Ct"), Qe = /* @__PURE__ */ __name(function(t) {
  return h(this, D)[1] ? h(this, D)[1][t] : t;
}, "Qe"), Y = /* @__PURE__ */ new WeakMap(), xt);
var ir = { Stringify: 1 };
var Rt = /* @__PURE__ */ __name(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((l) => l({ phase: e, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => Rt(c, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Rt");
var ar = "text/plain; charset=UTF-8";
var We = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "We");
var Ie;
var Me;
var J;
var we;
var K;
var P;
var Pe;
var be;
var Se;
var ie;
var _e;
var Ne;
var X;
var me;
var yt;
var or = (yt = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    b(this, X);
    b(this, Ie);
    b(this, Me);
    v(this, "env", {});
    b(this, J);
    v(this, "finalized", false);
    v(this, "error");
    b(this, we);
    b(this, K);
    b(this, P);
    b(this, Pe);
    b(this, be);
    b(this, Se);
    b(this, ie);
    b(this, _e);
    b(this, Ne);
    v(this, "render", (...t2) => (h(this, be) ?? y(this, be, (e2) => this.html(e2)), h(this, be).call(this, ...t2)));
    v(this, "setLayout", (t2) => y(this, Pe, t2));
    v(this, "getLayout", () => h(this, Pe));
    v(this, "setRenderer", (t2) => {
      y(this, be, t2);
    });
    v(this, "header", (t2, e2, r) => {
      this.finalized && y(this, P, new Response(h(this, P).body, h(this, P)));
      const n = h(this, P) ? h(this, P).headers : h(this, ie) ?? y(this, ie, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    v(this, "status", (t2) => {
      y(this, we, t2);
    });
    v(this, "set", (t2, e2) => {
      h(this, J) ?? y(this, J, /* @__PURE__ */ new Map()), h(this, J).set(t2, e2);
    });
    v(this, "get", (t2) => h(this, J) ? h(this, J).get(t2) : void 0);
    v(this, "newResponse", (...t2) => j(this, X, me).call(this, ...t2));
    v(this, "body", (t2, e2, r) => j(this, X, me).call(this, t2, e2, r));
    v(this, "text", (t2, e2, r) => !h(this, ie) && !h(this, we) && !e2 && !r && !this.finalized ? new Response(t2) : j(this, X, me).call(this, t2, e2, We(ar, r)));
    v(this, "json", (t2, e2, r) => j(this, X, me).call(this, JSON.stringify(t2), e2, We("application/json", r)));
    v(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name((s) => j(this, X, me).call(this, s, e2, We("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? Rt(t2, ir.Stringify, false, {}).then(n) : n(t2);
    });
    v(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    v(this, "notFound", () => (h(this, Se) ?? y(this, Se, () => new Response()), h(this, Se).call(this, this)));
    y(this, Ie, t), e && (y(this, K, e.executionCtx), this.env = e.env, y(this, Se, e.notFoundHandler), y(this, Ne, e.path), y(this, _e, e.matchResult));
  }
  get req() {
    return h(this, Me) ?? y(this, Me, new kt(h(this, Ie), h(this, Ne), h(this, _e))), h(this, Me);
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
    return h(this, P) || y(this, P, new Response(null, { headers: h(this, ie) ?? y(this, ie, new Headers()) }));
  }
  set res(t) {
    if (h(this, P) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of h(this, P).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = h(this, P).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    y(this, P, t), this.finalized = true;
  }
  get var() {
    return h(this, J) ? Object.fromEntries(h(this, J)) : {};
  }
}, "yt"), Ie = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), me = /* @__PURE__ */ __name(function(t, e, r) {
  const n = h(this, P) ? new Headers(h(this, P).headers) : h(this, ie) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, we);
  return new Response(t, { status: s, headers: n });
}, "me"), yt);
var k = "ALL";
var cr = "all";
var lr = ["get", "post", "put", "delete", "options", "patch"];
var It = "Can not add a route since the matcher is already built.";
var Mt = /* @__PURE__ */ __name(class extends Error {
}, "Mt");
var ur = "__COMPOSED_HANDLER";
var hr = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "hr");
var lt = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "lt");
var H;
var T;
var Pt;
var q;
var ne;
var Le;
var Fe;
var Ee;
var dr = (Ee = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    b(this, T);
    v(this, "get");
    v(this, "post");
    v(this, "put");
    v(this, "delete");
    v(this, "options");
    v(this, "patch");
    v(this, "all");
    v(this, "on");
    v(this, "use");
    v(this, "router");
    v(this, "getPath");
    v(this, "_basePath", "/");
    b(this, H, "/");
    v(this, "routes", []);
    b(this, q, hr);
    v(this, "errorHandler", lt);
    v(this, "onError", (e2) => (this.errorHandler = e2, this));
    v(this, "notFound", (e2) => (y(this, q, e2), this));
    v(this, "fetch", (e2, ...r) => j(this, T, Fe).call(this, e2, r[1], r[0], e2.method));
    v(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${pe("/", e2)}`, r), n2, s2)));
    v(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(j(this, T, Fe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...lr, cr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? y(this, H, a) : j(this, T, ne).call(this, i, h(this, H), a), l.forEach((c) => {
        j(this, T, ne).call(this, i, h(this, H), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        y(this, H, c);
        for (const o of [i].flat())
          l.map((u) => {
            j(this, T, ne).call(this, o.toUpperCase(), h(this, H), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, H, i) : (y(this, H, "*"), a.unshift(i)), a.forEach((l) => {
      j(this, T, ne).call(this, k, h(this, H), l);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? jt : rr;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === lt ? i = s.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await ot([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[ur] = s.handler), j(a = n, T, ne).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = j(this, T, Pt).call(this);
    return r._basePath = pe(this._basePath, e), r;
  }
  mount(e, r, n) {
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
      const c = pe(this._basePath, e), o = c === "/" ? 0 : c.length;
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
    return j(this, T, ne).call(this, k, pe(e, "*"), l), this;
  }
}, "Ee"), H = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), Pt = /* @__PURE__ */ __name(function() {
  const e = new Ee({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, y(e, q, h(this, q)), e.routes = this.routes, e;
}, "Pt"), q = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ __name(function(e, r, n) {
  e = e.toUpperCase(), r = pe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "ne"), Le = /* @__PURE__ */ __name(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Le"), Fe = /* @__PURE__ */ __name(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, T, Fe).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), l = new or(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, q) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, q).call(this, l);
      });
    } catch (u) {
      return j(this, T, Le).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, q).call(this, l))).catch((u) => j(this, T, Le).call(this, u, l)) : o ?? h(this, q).call(this, l);
  }
  const c = ot(a[0], this.errorHandler, h(this, q));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return j(this, T, Le).call(this, o, l);
    }
  })();
}, "Fe"), Ee);
var _t = [];
function fr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name((s, i) => {
    const a = r[s] || r[k], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], _t];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(t, e);
}
__name(fr, "fr");
var Ke = "[^/]+";
var ke = ".*";
var Te = "(?:|/.*)";
var ge = Symbol();
var pr = new Set(".\\+*[^]$()");
function mr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === ke || t === Te ? 1 : e === ke || e === Te ? -1 : t === Ke ? 1 : e === Ke ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(mr, "mr");
var ae;
var oe;
var L;
var ue;
var gr = (ue = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, ae);
    b(this, oe);
    b(this, L, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (h(this, ae) !== void 0)
        throw ge;
      if (i)
        return;
      y(this, ae, r);
      return;
    }
    const [a, ...l] = e, c = a === "*" ? l.length === 0 ? ["", "", ke] : ["", "", Ke] : a === "/*" ? ["", "", Te] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || Ke;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw ge;
      if (o = h(this, L)[d], !o) {
        if (Object.keys(h(this, L)).some((f) => f !== ke && f !== Te))
          throw ge;
        if (i)
          return;
        o = h(this, L)[d] = new ue(), u !== "" && y(o, oe, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, oe)]);
    } else if (o = h(this, L)[a], !o) {
      if (Object.keys(h(this, L)).some((u) => u.length > 1 && u !== ke && u !== Te))
        throw ge;
      if (i)
        return;
      o = h(this, L)[a] = new ue();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, L)).sort(mr).map((n) => {
      const s = h(this, L)[n];
      return (typeof h(s, oe) == "number" ? `(${n})@${h(s, oe)}` : pr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, ae) == "number" && r.unshift(`#${h(this, ae)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ue"), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), ue);
var Ve;
var De;
var vt;
var xr = (vt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, Ve, { varIndex: 0 });
    b(this, De, new gr());
  }
  insert(t, e, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let l = false;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const o = `@\\${a}`;
        return s[a] = [o, c], a++, l = true, o;
      }), !l)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [l] = s[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(l) !== -1) {
          i[c] = i[c].replace(l, s[a][1]);
          break;
        }
    }
    return h(this, De).insert(i, e, n, h(this, Ve), r), n;
  }
  buildRegExp() {
    let t = h(this, De).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "vt"), Ve = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), vt);
var yr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Je = /* @__PURE__ */ Object.create(null);
function Nt(t) {
  return Je[t] ?? (Je[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Nt, "Nt");
function vr() {
  Je = /* @__PURE__ */ Object.create(null);
}
__name(vr, "vr");
function wr(t) {
  var o;
  const e = new xr(), r = [];
  if (t.length === 0)
    return yr;
  const n = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, m, S] = n[u];
    p ? s[m] = [S.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), _t] : d++;
    let g;
    try {
      g = e.insert(m, d, p);
    } catch (w) {
      throw w === ge ? new Mt(m) : w;
    }
    p || (r[d] = S.map(([w, x]) => {
      const I = /* @__PURE__ */ Object.create(null);
      for (x -= 1; x >= 0; x--) {
        const [N, $] = g[x];
        I[N] = $;
      }
      return [w, I];
    }));
  }
  const [i, a, l] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const m = (o = r[u][f]) == null ? void 0 : o[1];
      if (!m)
        continue;
      const S = Object.keys(m);
      for (let g = 0, w = S.length; g < w; g++)
        m[S[g]] = l[m[S[g]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(wr, "wr");
function fe(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (Nt(r).test(e))
        return [...t[r]];
  }
}
__name(fe, "fe");
var Q;
var Z;
var Be;
var Dt;
var wt;
var br = (wt = /* @__PURE__ */ __name(class {
  constructor() {
    b(this, Be);
    v(this, "name", "RegExpRouter");
    b(this, Q);
    b(this, Z);
    v(this, "match", fr);
    y(this, Q, { [k]: /* @__PURE__ */ Object.create(null) }), y(this, Z, { [k]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var l;
    const n = h(this, Q), s = h(this, Z);
    if (!n || !s)
      throw new Error(It);
    n[t] || [n, s].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[k]).forEach((o) => {
        c[t][o] = [...c[k][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Nt(e);
      t === k ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[e] || (u[e] = fe(n[o], e) || fe(n[k], e) || []);
      }) : (l = n[t])[e] || (l[e] = fe(n[t], e) || fe(n[k], e) || []), Object.keys(n).forEach((o) => {
        (t === k || t === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (t === k || t === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Ot(e) || [e];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((d) => {
        var f;
        (t === k || t === d) && ((f = s[d])[u] || (f[u] = [...fe(n[d], u) || fe(n[k], u) || []]), s[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Z)).concat(Object.keys(h(this, Q))).forEach((e) => {
      t[e] || (t[e] = j(this, Be, Dt).call(this, e));
    }), y(this, Q, y(this, Z, void 0)), vr(), t;
  }
}, "wt"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let r = t === k;
  return [h(this, Q), h(this, Z)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== k && e.push(...Object.keys(n[k]).map((i) => [i, n[k][i]]));
  }), r ? wr(e) : null;
}, "Dt"), wt);
var ee;
var V;
var bt;
var Sr = (bt = /* @__PURE__ */ __name(class {
  constructor(t) {
    v(this, "name", "SmartRouter");
    b(this, ee, []);
    b(this, V, []);
    y(this, ee, t.routers);
  }
  add(t, e, r) {
    if (!h(this, V))
      throw new Error(It);
    h(this, V).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, V))
      throw new Error("Fatal error");
    const r = h(this, ee), n = h(this, V), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(t, e);
      } catch (c) {
        if (c instanceof Mt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), y(this, ee, [l]), y(this, V, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, V) || h(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ee)[0];
  }
}, "bt"), ee = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), bt);
var $e = /* @__PURE__ */ Object.create(null);
var te;
var M;
var ce;
var je;
var R;
var B;
var se;
var Oe;
var Er = (Oe = /* @__PURE__ */ __name(class {
  constructor(e, r, n) {
    b(this, B);
    b(this, te);
    b(this, M);
    b(this, ce);
    b(this, je, 0);
    b(this, R, $e);
    if (y(this, M, n || /* @__PURE__ */ Object.create(null)), y(this, te, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, y(this, te, [s]);
    }
    y(this, ce, []);
  }
  insert(e, r, n) {
    y(this, je, ++at(this, je)._);
    let s = this;
    const i = Xt(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = er(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, M)) {
        s = h(s, M)[f], d && a.push(d[1]);
        continue;
      }
      h(s, M)[f] = new Oe(), d && (h(s, ce).push(d), a.push(d[1])), s = h(s, M)[f];
    }
    return h(s, te).push({ [e]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, je) } }), s;
  }
  search(e, r) {
    var c;
    const n = [];
    y(this, R, $e);
    let i = [this];
    const a = Et(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let m = 0, S = i.length; m < S; m++) {
        const g = i[m], w = h(g, M)[d];
        w && (y(w, R, h(g, R)), f ? (h(w, M)["*"] && n.push(...j(this, B, se).call(this, h(w, M)["*"], e, h(g, R))), n.push(...j(this, B, se).call(this, w, e, h(g, R)))) : p.push(w));
        for (let x = 0, I = h(g, ce).length; x < I; x++) {
          const N = h(g, ce)[x], $ = h(g, R) === $e ? {} : { ...h(g, R) };
          if (N === "*") {
            const E = h(g, M)["*"];
            E && (n.push(...j(this, B, se).call(this, E, e, h(g, R))), y(E, R, $), p.push(E));
            continue;
          }
          const [He, z, U] = N;
          if (!d && !(U instanceof RegExp))
            continue;
          const _ = h(g, M)[He], W = a.slice(o).join("/");
          if (U instanceof RegExp) {
            const E = U.exec(W);
            if (E) {
              if ($[z] = E[0], n.push(...j(this, B, se).call(this, _, e, h(g, R), $)), Object.keys(h(_, M)).length) {
                y(_, R, $);
                const O = ((c = E[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[O] || (l[O] = [])).push(_);
              }
              continue;
            }
          }
          (U === true || U.test(d)) && ($[z] = d, f ? (n.push(...j(this, B, se).call(this, _, e, $, h(g, R))), h(_, M)["*"] && n.push(...j(this, B, se).call(this, h(_, M)["*"], e, $, h(g, R)))) : (y(_, R, $), p.push(_)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Oe"), te = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name(function(e, r, n, s) {
  const i = [];
  for (let a = 0, l = h(e, te).length; a < l; a++) {
    const c = h(e, te)[a], o = c[r] || c[k], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== $e || s && s !== $e))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], m = u[o.score];
        o.params[p] = s != null && s[p] && !m ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "se"), Oe);
var le;
var St;
var jr = (St = /* @__PURE__ */ __name(class {
  constructor() {
    v(this, "name", "TrieRouter");
    b(this, le);
    y(this, le, new Er());
  }
  add(t, e, r) {
    const n = Ot(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, le).insert(t, n[s], r);
      return;
    }
    h(this, le).insert(t, e, r);
  }
  match(t, e) {
    return h(this, le).search(t, e);
  }
}, "St"), le = /* @__PURE__ */ new WeakMap(), St);
var Ht = /* @__PURE__ */ __name(class extends dr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Sr({ routers: [new br(), new jr()] });
  }
}, "Ht");
var Or = /* @__PURE__ */ __name((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
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
}, "Or");
var $r = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ut = /* @__PURE__ */ __name((t, e = kr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ut");
var Ar = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var kr = Ar;
var Tr = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Tr");
var qt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Cr = Object.keys(qt);
var Rr = "index.html";
var Ir = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? Tr;
  return async (s, i) => {
    var u, d, f, p;
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
    let l = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(l) && (l = n(l, Rr));
    const c = t.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const m = t.mimes && ut(l, t.mimes) || ut(l);
      if (s.header("Content-Type", m || "application/octet-stream"), t.precompressed && (!m || $r.test(m))) {
        const S = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((g) => g.trim()));
        for (const g of Cr) {
          if (!S.has(g))
            continue;
          const w = await c(l + qt[g], s);
          if (w) {
            o = w, s.header("Content-Encoding", g), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, l, s)), s.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, l, s)), await i();
  };
}, "Ir");
var Mr = /* @__PURE__ */ __name(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Mr");
var Pr = /* @__PURE__ */ __name((t) => async function(r, n) {
  return Ir({ ...t, getContent: async (i) => Mr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Pr");
var _r = /* @__PURE__ */ __name((t) => Pr(t), "_r");
var Nr = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Ae(t) {
  return t.replace(/\s+/g, "").length;
}
__name(Ae, "Ae");
function tt(t) {
  return t.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.")).map((e) => e.trim()).filter(Boolean);
}
__name(tt, "tt");
function Dr(t) {
  return t.match(/\d+\.?\d*%?/g) || [];
}
__name(Dr, "Dr");
function rt(t) {
  return Array.from(new Set(t.split(/\s+/).filter((e) => e.length >= 2 && !/^\d+$/.test(e)).slice(0, 10)));
}
__name(rt, "rt");
function Hr(t, e) {
  const r = tt(t), n = Dr(t), s = rt(t), i = Ae(t), { min: a, max: l } = Nr[e], c = Math.floor(i * a), o = Math.floor(i * l), u = r[0] ? `${r[0].split("\uBA70")[0]}\uBA70, \uC774\uB294 \uD575\uC2EC \uD2B9\uC9D5\uC774\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", d = [];
  for (n.length >= 2 && (d.push(`\uC8FC\uC694 \uC9C0\uD45C\uB294 ${n[0]}\uC640 ${n[1]}\uC774\uB2E4`), n.length >= 4 && d.push(`\uBE44\uAD50 \uC218\uCE58\uB294 ${n[2]}\uC640 ${n[3]}\uB85C \uB300\uC870\uB97C \uC774\uB8EC\uB2E4`)), s.length >= 3 && d.push(`${s[0]}\uC640 ${s[1]}\uC758 ${s[2]} \uCE21\uBA74\uC5D0\uC11C \uCC28\uC774\uAC00 \uC788\uB2E4`); d.length < 3; )
    d.push(`${d.length + 1}\uCC28 \uADFC\uAC70: \uAD00\uB828 \uB9E5\uB77D\uC744 \uBD84\uC11D\uD55C \uACB0\uACFC`);
  const f = n.length >= 4 ? `${n[0]}\uC640 ${n[2]}\uC758 \uCC28\uC774\uB294 ${n.length}\uBC30 \uC218\uC900\uC774\uB2E4` : "\uBE44\uAD50 \uB300\uC0C1 \uAC04 \uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uD655\uC778\uB41C\uB2E4", p = s.includes("\uAD50\uC721") && s.includes("\uBD80\uB2F4") ? "\uC774\uB294 \uAD50\uC721 \uC7AC\uC815 \uAD6C\uC870\uC758 \uBCF8\uC9C8\uC801 \uCC28\uC774\uB97C \uC2DC\uC0AC\uD55C\uB2E4" : "\uAD6D\uAC00\uBCC4 \uC815\uCC45\uC758 \uCC28\uC774\uB97C \uBC18\uC601\uD55C \uACB0\uACFC\uB85C \uD574\uC11D\uB41C\uB2E4";
  let m = "";
  {
    const g = `${u}. ${d.slice(0, 2).join(". ")}.`, w = `${f}. ${d[2]}.`, x = `${p}.`;
    m = [g, w, x].join(`

`);
  }
  const S = Ae(m);
  if (S > o) {
    const g = m.split(`

`);
    let w = g[0];
    for (let x = 1; x < g.length; x++) {
      const I = w + `

` + g[x];
      if (Ae(I) <= o)
        w = I;
      else
        break;
    }
    m = w;
  } else
    S < c && e !== "brief" && (m += ` \uC6D0\uBB38\uC758 \uC8FC\uC694 \uB17C\uC810\uC740 ${s.slice(0, 3).join(", ")} \uB4F1\uC774\uB2E4.`);
  return { type: "narrative", level: e, text: m, chars: Ae(m), ratio: Ae(m) / i, target: { min: c, max: o }, coreClaim: u, grounds: d, comparisons: [f], implications: [p] };
}
__name(Hr, "Hr");
function qr(t, e) {
  const r = tt(t), n = rt(t), s = 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...n];
  for (let c = 0; c < s && c < a.length; c++)
    i.push({ term: a[c], def: `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${a[c]}"\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uC124\uBA85\uD558\uB294 \uC6A9\uC5B4\uC774\uB2E4` });
  const l = [{ title: "1. \uAC1C\uC694", keywords: n.slice(0, 3), bullets: r.slice(0, 5), children: [] }];
  return { type: "structured", level: e, toc: [{ title: "\uAC1C\uC694", anchor: "sec-1" }], hierarchy: l, glossary: i };
}
__name(qr, "qr");
function Lr(t, e) {
  const r = tt(t), n = rt(t);
  return { type: "mindmap", level: e, title: "\uD575\uC2EC \uAD6C\uC870", children: [{ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: r.slice(0, 6).map((i, a) => ({ title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, children: [] })) }] };
}
__name(Lr, "Lr");
function Fr(t, e, r = "preview") {
  return { type: "selftest", level: e, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: t.split(".")[0] + "." })) };
}
__name(Fr, "Fr");
function Lt(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(Lt, "Lt");
function A(t, e) {
  const r = String(t || "").replace(/\s+/g, " ").trim();
  if (r.length <= e)
    return r;
  const n = r.slice(0, e), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(e * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name(A, "A");
function ht(t) {
  const e = (t || "").trim();
  if (!e)
    return null;
  try {
    return JSON.parse(e);
  } catch {
  }
  const r = e.indexOf("{"), n = e.lastIndexOf("}");
  if (r >= 0 && n > r) {
    const s = e.slice(r, n + 1);
    try {
      return JSON.parse(s);
    } catch {
    }
  }
  return null;
}
__name(ht, "ht");
function Jr(t) {
  const e = Hr(t, "detail"), r = qr(t, "detail"), n = Lr(t, "detail"), s = Fr(e.text, "detail", "exam"), i = t.length, a = Lt(t), l = e.coreClaim, c = e.grounds, o = e.comparisons || [], u = e.implications || [];
  let d = e.text;
  if (!d.includes(`

`)) {
    const w = d.split(". ").filter(Boolean), x = Math.ceil(w.length / 2);
    d = w.slice(0, x).join(". ") + `.

` + w.slice(x).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, m = r.glossary, S = { title: n.title, children: n.children.map((w) => ({ title: w.title, children: (w.children || []).map((x) => ({ title: x.title, pack: Array.isArray(x.pack) && x.pack.length >= 2 ? x.pack : [x.title, `${x.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: x.explain && x.explain.length >= 30 ? x.explain : `${x.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (S.children[0] || S.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); S.children[0].children.length < 3; ) {
    const w = S.children[0].children.length + 1;
    S.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${w}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${w}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const g = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: m }, mindmap: S, selftest: g };
}
__name(Jr, "Jr");
function dt(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(dt, "dt");
function Ye(t, e) {
  var W;
  const r = e === "brief", n = e === "standard", s = t.narrative.coreClaim || "", i = t.narrative.grounds || [], a = t.narrative.comparisons || [], l = t.narrative.implications || [], c = ((W = t.source) == null ? void 0 : W.charCount) || 1e3;
  let o = "", u = s, d = [], f = [], p = [];
  if (e === "detail")
    o = String(t.narrative.summaryDetail || "").trim(), u = s, d = i, f = a, p = l;
  else if (e === "brief") {
    const E = Math.floor(c * 0.18);
    u = A(s, 60);
    const O = a[0] ? A(a[0], 80) : "";
    if (d = [], f = O ? [O] : [], p = [], O)
      o = `${u}. ${O}.`;
    else {
      const C = i[0] ? A(i[0], 60) : "";
      o = C ? `${u}. ${C}.` : `${u}.`;
    }
    o.length > E && (o = o.slice(0, E - 3) + "...");
  } else {
    const E = Math.floor(c * 0.25), O = Math.floor(c * 0.38);
    u = A(s, 80), d = i.slice(0, 2).map((re) => A(re, 70));
    const C = a[0] ? A(a[0], 90) : "";
    f = C ? [C] : [], p = [];
    const de = [u];
    if (d.length > 0 && de.push(d.join(". ")), C && de.push(`\uBC18\uBA74 ${C}`), o = de.join(". ") + ".", o.length > O)
      o = o.slice(0, O - 3) + "...";
    else if (o.length < E && l.length > 0) {
      const re = A(l[0], 60);
      o += ` ${re}.`;
    }
  }
  const m = t.structured.toc || [], S = r ? 2 : n ? 4 : 10, g = (t.structured.glossary || []).slice(0, S).map((E) => ({ term: A(E.term, 20), def: A(E.def, r ? 70 : 120) })), w = r ? 2 : n ? 3 : 5, x = /* @__PURE__ */ __name((E) => (E || []).map((O) => ({ title: A(O.title, 60), keywords: (O.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((C) => A(C, 16)), bullets: (O.bullets || []).slice(0, w).map((C) => A(C, r ? 90 : 140)), children: O.children ? x(O.children) : void 0 })), "x"), I = x(t.structured.hierarchy || []), N = Kr({ toc: m, hierarchy: I, glossary: g }), $ = JSON.parse(JSON.stringify(t.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), He = r ? 70 : n ? 110 : 160, z = r ? 2 : 3;
  for (const E of $.children || [])
    for (const O of E.children || [])
      Array.isArray(O.pack) && (O.pack = O.pack.slice(0, z).map((C) => A(C, 20))), typeof O.explain == "string" && (O.explain = A(O.explain, He)), Array.isArray(O.children) || (O.children = []);
  const U = r || n ? 2 : 4, _ = (t.selftest.items || []).slice(0, U).map((E) => {
    var O, C, de;
    return { id: E.id, type: E.type, question: A(E.question, r ? 140 : 220), hint: E.hint ? A(E.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((O = E.rubric) == null ? void 0 : O.mustInclude) || []).slice(0, r ? 2 : 4).map((re) => A(re, 20)), mustNotInclude: (((C = E.rubric) == null ? void 0 : C.mustNotInclude) || []).slice(0, 2).map((re) => A(re, 20)), maxChars: ((de = E.rubric) == null ? void 0 : de.maxChars) ?? (r ? 140 : 220) }, answerKey: E.answerKey ? A(E.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: d, comparisons: f, implications: p }, structured: { text: N, toc: m, hierarchy: I, glossary: g }, mindmap: { tree: $ }, selftest: { passScorePct: 90, items: _ } };
}
__name(Ye, "Ye");
function Kr(t) {
  var n, s;
  const e = [];
  e.push("\u2160. \uBAA9\uCC28"), (n = t.toc) != null && n.length ? t.toc.forEach((i, a) => e.push(`  ${a + 1}. ${i.title}`)) : e.push("  1. \uBCF8\uBB38"), e.push(""), e.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name((i, a) => {
    var l, c;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      e.push(`${u}- ${o.title}`), (l = o.keywords) != null && l.length && e.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => e.push(`${u}  \xB7 ${d}`)), (c = o.children) != null && c.length && r(o.children, a + 1);
    }
  }, "r");
  return r(t.hierarchy || [], 1), e.push(""), e.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = t.glossary) != null && s.length ? t.glossary.forEach((i) => e.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : e.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), e.join(`
`);
}
__name(Kr, "Kr");
function Vr(t) {
  var i, a, l, c, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 3) && e.push("narrative.grounds must be >= 3"), (!((l = t == null ? void 0 : t.narrative) != null && l.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = t == null ? void 0 : t.structured) == null ? void 0 : c.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 3) && e.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const m of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(m.pack) && m.pack.length && n++, typeof m.explain == "string" && m.explain.trim().length > 30 && s++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(Vr, "Vr");
function Br(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), n = (t.standard.narrative.text || "").replace(/\s+/g, ""), s = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), n.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === n && e.push("brief narrative equals standard narrative"), n === s && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name((p) => {
    let m = 0;
    for (const S of (p == null ? void 0 : p.children) || [])
      m += ((S == null ? void 0 : S.children) || []).length;
    return m;
  }, "i"), a = i(t.brief.mindmap.tree), l = i(t.standard.mindmap.tree), c = i(t.detail.mindmap.tree);
  return a === l && l === c || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), e;
}
__name(Br, "Br");
async function ft(t, e) {
  var l, c, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ft, "ft");
function Gr(t) {
  t.post("/api/matrix", async (e) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await e.req.json(), i = String(s.text || "").trim();
      if (!i)
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Lt(i), l = e.env.USE_MOCK === "true" || !e.env.GEMINI_API_KEY;
      let c = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), c = Jr(i);
      else {
        const S = dt(i);
        let g = await ft(e, S);
        if (c = ht(g), !c) {
          const w = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", dt(i)].join(`
`);
          g = await ft(e, w), c = ht(g);
        }
        if (!c)
          return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Vr(c);
      if (o.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const u = Ye(c, "brief"), d = Ye(c, "standard"), f = Ye(c, "detail"), p = Br({ brief: u, standard: d, detail: f });
      if (p.length && l === false)
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: p.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const m = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: u, standard: d, detail: f }, views: { narrative: { brief: u.narrative, standard: d.narrative, detail: f.narrative }, structured: { brief: u.structured, standard: d.structured, detail: f.structured }, mindmap: { brief: u.mindmap, standard: d.mindmap, detail: f.mindmap }, selftest: { brief: u.selftest, standard: d.selftest, detail: f.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return e.json(m, 200);
    } catch (s) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  });
}
__name(Gr, "Gr");
var F = new Ht();
F.use("/api/*", Or());
F.use("/static/*", _r({ root: "./public" }));
Gr(F);
function Ce() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ce, "Ce");
function nt(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let n = 0; n < e.length; n++)
    r ^= e.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(nt, "nt");
function zr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(zr, "zr");
function Ur(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Ur, "Ur");
function Wr(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Wr, "Wr");
function Yr(t, e) {
  const r = Math.max(60, ye(t)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(Yr, "Yr");
function Xr(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Wr((t == null ? void 0 : t.viewType) || "narrative"), n = Ur(t == null ? void 0 : t.level), s = "detail", { base: i, min: a, max: l } = Yr(e), c = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${c}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
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
  return r === "structured" ? g = p : r === "mindmap" ? g = m : r === "selftest" && (g = S), `${d}

${g}`;
}
__name(Xr, "Xr");
function he(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(he, "he");
function Ge(t) {
  const e = he(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(Ge, "Ge");
function Qr(t) {
  const e = he(t).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Qr, "Qr");
function st(t) {
  const e = he(t).split(`
`), r = Qr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: he(t) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : e.length, o = i.title, u = e.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(st, "st");
function Zr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Zr, "Zr");
function xe(t, e) {
  const n = Ge(t).map((i, a) => ({ s: i, i: a, score: Zr(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, zr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(xe, "xe");
function ye(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(ye, "ye");
var Ze = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function pt(t, e, r) {
  const n = Math.max(60, ye(t)), s = ye(e), i = Math.floor(n * Ze[r].min), a = Math.ceil(n * Ze[r].max);
  return s < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(pt, "pt");
function Re(t, e, r) {
  const n = Math.max(60, ye(t)), s = Math.ceil(n * Ze[r].max);
  let i = String(e || "").trim();
  if (ye(i) <= s)
    return i;
  const a = Ge(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (ye(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Re, "Re");
function Xe(t, e) {
  return `${t}_${e}`;
}
__name(Xe, "Xe");
function en(t) {
  const e = st(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    const a = Xe("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = xe(s.body, 6), o = [];
    for (const x of c)
      (x.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((N) => {
        const $ = N.replace(/[()]/g, "").trim();
        $.length >= 2 && $.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test($) && o.push($);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((x) => u.set(x, (u.get(x) || 0) + 1));
    const d = Array.from(u.entries()).sort((x, I) => I[1] - x[1]).map((x) => x[0]).filter((x) => x.length <= 10).slice(0, 3), f = xe(s.body, 3).join(" "), p = xe(s.body, 2).join(" "), m = xe(s.body, 1).join(" "), S = { id: Xe(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: m, children: [] };
    d.forEach((x) => {
      n.has(x) || n.set(x, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${x}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${xe(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = Ge(s.body).filter((x) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(x)).slice(0, 2);
    w.length && S.children.push({ id: Xe(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(S), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(en, "en");
function Ft(t, e) {
  const r = JSON.parse(JSON.stringify(t)), n = /* @__PURE__ */ __name((s) => {
    s.type === "keyword" && (e === "brief" && (s.explain = s.explainBrief || s.explain), e === "standard" && (s.explain = s.explainStandard || s.explain), e === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = e !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Ft, "Ft");
function tn(t, e, r, n) {
  const s = (e.children || []).map((u) => u.title), a = (Ft(e, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: Re(t, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Re(t, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(tn, "tn");
function rn(t, e) {
  const r = st(t), n = e === "brief" ? 2 : e === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = e === "brief" || e === "standard" ? 1 : 2;
    s.push(...xe(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return Re(t, i, e);
}
__name(rn, "rn");
function nn(t, e) {
  st(t);
  const r = Ge(t), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(nn, "nn");
function sn(t, e) {
  let r = t.length, n = 0;
  const s = [];
  for (const a of t) {
    const l = ((e == null ? void 0 : e[a.id]) || "").trim();
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
__name(sn, "sn");
function mt(t) {
  const e = he(t), { tree: r, glossary: n } = en(e), s = { originalMeta: { textHash: nt(e), chars: e.length, ts: Ce() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = rn(e, i), l = tn(e, r, n, i), c = Ft(r, i), o = nn(e), d = pt(e, a, i).ok ? a : Re(e, a, i), f = l.renderText || "", p = pt(e, f, i);
    l.renderText = p.ok ? f : Re(e, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(mt, "mt");
F.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: Ce(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
F.post("/api/engine", async (t) => {
  var p, m, S, g, w, x, I;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), n = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", s = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), l = (e == null ? void 0 : e.useGemini) === true, c = he(r);
  if (c.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && t.env.GEMINI_API_KEY)
    try {
      const N = Xr({ text: c, viewType: s, level: "detail", grade: i, subject: a }), $ = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", z = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${$}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: N }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), _ = (((w = (g = (S = (m = (p = z == null ? void 0 : z.candidates) == null ? void 0 : p[0]) == null ? void 0 : m.content) == null ? void 0 : S.parts) == null ? void 0 : g[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if (_) {
        const W = JSON.parse(_[0]);
        u = { originalMeta: { textHash: nt(c), chars: c.length, ts: Ce() }, modes: { detail: { [s]: W }, standard: { [s]: W }, brief: { [s]: W } } }, o = "gemini-" + $;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (N) {
      console.error("[Gemini Error]", N), u = mt(c), o = "v5-local-fallback";
    }
  else
    u = mt(c);
  const d = (I = (x = u.modes) == null ? void 0 : x[n]) == null ? void 0 : I[s], f = { engine: o, mode: n, viewType: s, ts: Ce(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
F.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], n = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, s = sn(r, n);
  return t.json({ ok: true, result: s });
});
F.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = he(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Ce(), c = nt(s), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, l, l, c, s, o).run(), t.json({ ok: true, id: a, textHash: c, ts: l });
});
F.get("/api/loadSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = String(t.req.query("userId") || "anon"), n = String(t.req.query("id") || "");
  if (!n)
    return t.json({ ok: false, error: "missing_id" }, 400);
  const s = await e.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(n, r).first();
  if (!s)
    return t.json({ ok: false, error: "not_found" }, 404);
  let i = null;
  try {
    i = JSON.parse(s.allSummariesJson);
  } catch {
    i = null;
  }
  return t.json({ ok: true, doc: { id: s.id, userId: s.userId, createdAt: s.createdAt, updatedAt: s.updatedAt, textHash: s.textHash, originalText: s.originalText, allSummaries: i } });
});
F.get("/", (t) => t.redirect("/static/v5.html"));
var gt = new Ht();
var an = Object.assign({ "/src/index.tsx": F });
var Jt = false;
for (const [, t] of Object.entries(an))
  t && (gt.route("/", t), gt.notFound(t.notFoundHandler), Jt = true);
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

// ../.wrangler/tmp/bundle-0lECcR/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = gt;

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

// ../.wrangler/tmp/bundle-0lECcR/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.5794072337973926.mjs.map
