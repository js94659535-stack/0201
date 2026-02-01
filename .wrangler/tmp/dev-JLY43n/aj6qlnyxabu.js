var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-mTfZJN/checked-fetch.js
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

// .wrangler/tmp/bundle-mTfZJN/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-aCTx0G/bundledWorker-0.9951933303498479.mjs
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
var qt = Object.defineProperty;
var rt = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "rt");
var Ft = /* @__PURE__ */ __name2((t, e, r) => e in t ? qt(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Ft");
var y = /* @__PURE__ */ __name2((t, e, r) => Ft(t, typeof e != "symbol" ? e + "" : e, r), "y");
var Be = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || rt("Cannot " + r), "Be");
var h = /* @__PURE__ */ __name2((t, e, r) => (Be(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var v = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? rt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "v");
var g = /* @__PURE__ */ __name2((t, e, r, s) => (Be(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), "g");
var E = /* @__PURE__ */ __name2((t, e, r) => (Be(t, e, "access private method"), r), "E");
var st = /* @__PURE__ */ __name2((t, e, r, s) => ({ set _(n) {
  g(t, e, n, r);
}, get _() {
  return h(t, e, s);
} }), "st");
var nt = /* @__PURE__ */ __name2((t, e, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let l, o = false, u;
    if (t[c] ? (u = t[c][0][0], s.req.routeIndex = c) : u = c === t.length && n || void 0, u)
      try {
        l = await u(s, () => a(c + 1));
      } catch (d) {
        if (d instanceof Error && e)
          s.error = d, l = await e(d, s), o = true;
        else
          throw d;
      }
    else
      s.finalized === false && r && (l = await r(s));
    return l && (s.finalized === false || o) && (s.res = l), s;
  }
  __name(a, "a");
  __name2(a, "a");
}, "nt");
var Gt = Symbol();
var Kt = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = e, i = (t instanceof jt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Jt(t, { all: r, dot: s }) : {};
}, "Kt");
async function Jt(t, e) {
  const r = await t.formData();
  return r ? Vt(r, e) : {};
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
function Vt(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((s, n) => {
    e.all || n.endsWith("[]") ? Bt(r, n, s) : r[n] = s;
  }), e.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (zt(r, s, n), delete r[s]);
  }), r;
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
var Bt = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Bt");
var zt = /* @__PURE__ */ __name2((t, e, r) => {
  let s = t;
  const n = e.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "zt");
var wt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "wt");
var Ut = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = Wt(t), s = wt(r);
  return Yt(s, e);
}, "Ut");
var Wt = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return e.push([n, r]), n;
  }), { groups: e, path: t };
}, "Wt");
var Yt = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [s] = e[r];
    for (let n = t.length - 1; n >= 0; n--)
      if (t[n].includes(s)) {
        t[n] = t[n].replace(s, e[r][1]);
        break;
      }
  }
  return t;
}, "Yt");
var He = {};
var Xt = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${t}#${e}`;
    return He[s] || (r[2] ? He[s] = e && e[0] !== ":" && e[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : He[s] = [t, r[1], true]), He[s];
  }
  return null;
}, "Xt");
var Ze = /* @__PURE__ */ __name2((t, e) => {
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
}, "Ze");
var Qt = /* @__PURE__ */ __name2((t) => Ze(t, decodeURI), "Qt");
var bt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let s = r;
  for (; s < e.length; s++) {
    const n = e.charCodeAt(s);
    if (n === 37) {
      const i = e.indexOf("?", s), a = e.slice(r, i === -1 ? void 0 : i);
      return Qt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63)
      break;
  }
  return e.slice(r, s);
}, "bt");
var Zt = /* @__PURE__ */ __name2((t) => {
  const e = bt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "Zt");
var pe = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = pe(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "pe");
var St = /* @__PURE__ */ __name2((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), r = [];
  let s = "";
  return e.forEach((n) => {
    if (n !== "" && !/\:/.test(n))
      s += "/" + n;
    else if (/\:/.test(n))
      if (/\?/.test(n)) {
        r.length === 0 && s === "" ? r.push("/") : r.push(s);
        const i = n.replace("?", "");
        s += "/" + i, r.push(s);
      } else
        s += "/" + n;
  }), r.filter((n, i, a) => a.indexOf(n) === i);
}, "St");
var ze = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Ze(t, Ot) : t) : t, "ze");
var Et = /* @__PURE__ */ __name2((t, e, r) => {
  let s;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const c = t.charCodeAt(a + e.length + 1);
      if (c === 61) {
        const l = a + e.length + 2, o = t.indexOf("&", l);
        return ze(t.slice(l, o === -1 ? void 0 : o));
      } else if (c == 38 || isNaN(c))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (s = /[%+]/.test(t), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let c = t.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let l = t.slice(i + 1, c === -1 ? a === -1 ? void 0 : a : c);
    if (s && (l = ze(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = t.slice(c + 1, a === -1 ? void 0 : a), s && (o = ze(o))), r ? (n[l] && Array.isArray(n[l]) || (n[l] = []), n[l].push(o)) : n[l] ?? (n[l] = o);
  }
  return e ? n[e] : n;
}, "Et");
var er = Et;
var tr = /* @__PURE__ */ __name2((t, e) => Et(t, e, true), "tr");
var Ot = decodeURIComponent;
var it = /* @__PURE__ */ __name2((t) => Ze(t, Ot), "it");
var ve;
var L;
var U;
var At;
var $t;
var Xe;
var Y;
var pt;
var jt = (pt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    v(this, U);
    y(this, "raw");
    v(this, ve);
    v(this, L);
    y(this, "routeIndex", 0);
    y(this, "path");
    y(this, "bodyCache", {});
    v(this, Y, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, s = e2[t2];
      if (s)
        return s;
      const n = Object.keys(e2)[0];
      return n ? e2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, g(this, L, r), g(this, ve, {});
  }
  param(t) {
    return t ? E(this, U, At).call(this, t) : E(this, U, $t).call(this);
  }
  query(t) {
    return er(this.url, t);
  }
  queries(t) {
    return tr(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, s) => {
      e[s] = r;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Kt(this, t));
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
  get [Gt]() {
    return h(this, L);
  }
  get matchedRoutes() {
    return h(this, L)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, L)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "pt"), ve = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), At = /* @__PURE__ */ __name2(function(t) {
  const e = h(this, L)[0][this.routeIndex][1][t], r = E(this, U, Xe).call(this, e);
  return r && /\%/.test(r) ? it(r) : r;
}, "At"), $t = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(h(this, L)[0][this.routeIndex][1]);
  for (const r of e) {
    const s = E(this, U, Xe).call(this, h(this, L)[0][this.routeIndex][1][r]);
    s !== void 0 && (t[r] = /\%/.test(s) ? it(s) : s);
  }
  return t;
}, "$t"), Xe = /* @__PURE__ */ __name2(function(t) {
  return h(this, L)[1] ? h(this, L)[1][t] : t;
}, "Xe"), Y = /* @__PURE__ */ new WeakMap(), pt);
var rr = { Stringify: 1 };
var Tt = /* @__PURE__ */ __name2(async (t, e, r, s, n) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (n ? n[0] += t : n = [t], Promise.all(i.map((c) => c({ phase: e, buffer: n, context: s }))).then((c) => Promise.all(c.filter(Boolean).map((l) => Tt(l, e, false, s, n))).then(() => n[0]))) : Promise.resolve(t);
}, "Tt");
var sr = "text/plain; charset=UTF-8";
var Ue = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Ue");
var Re;
var Me;
var J;
var we;
var V;
var D;
var Pe;
var be;
var Se;
var ie;
var _e;
var De;
var X;
var me;
var mt;
var nr = (mt = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    v(this, X);
    v(this, Re);
    v(this, Me);
    y(this, "env", {});
    v(this, J);
    y(this, "finalized", false);
    y(this, "error");
    v(this, we);
    v(this, V);
    v(this, D);
    v(this, Pe);
    v(this, be);
    v(this, Se);
    v(this, ie);
    v(this, _e);
    v(this, De);
    y(this, "render", (...t2) => (h(this, be) ?? g(this, be, (e2) => this.html(e2)), h(this, be).call(this, ...t2)));
    y(this, "setLayout", (t2) => g(this, Pe, t2));
    y(this, "getLayout", () => h(this, Pe));
    y(this, "setRenderer", (t2) => {
      g(this, be, t2);
    });
    y(this, "header", (t2, e2, r) => {
      this.finalized && g(this, D, new Response(h(this, D).body, h(this, D)));
      const s = h(this, D) ? h(this, D).headers : h(this, ie) ?? g(this, ie, new Headers());
      e2 === void 0 ? s.delete(t2) : r != null && r.append ? s.append(t2, e2) : s.set(t2, e2);
    });
    y(this, "status", (t2) => {
      g(this, we, t2);
    });
    y(this, "set", (t2, e2) => {
      h(this, J) ?? g(this, J, /* @__PURE__ */ new Map()), h(this, J).set(t2, e2);
    });
    y(this, "get", (t2) => h(this, J) ? h(this, J).get(t2) : void 0);
    y(this, "newResponse", (...t2) => E(this, X, me).call(this, ...t2));
    y(this, "body", (t2, e2, r) => E(this, X, me).call(this, t2, e2, r));
    y(this, "text", (t2, e2, r) => !h(this, ie) && !h(this, we) && !e2 && !r && !this.finalized ? new Response(t2) : E(this, X, me).call(this, t2, e2, Ue(sr, r)));
    y(this, "json", (t2, e2, r) => E(this, X, me).call(this, JSON.stringify(t2), e2, Ue("application/json", r)));
    y(this, "html", (t2, e2, r) => {
      const s = /* @__PURE__ */ __name2((n) => E(this, X, me).call(this, n, e2, Ue("text/html; charset=UTF-8", r)), "s");
      return typeof t2 == "object" ? Tt(t2, rr.Stringify, false, {}).then(s) : s(t2);
    });
    y(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    y(this, "notFound", () => (h(this, Se) ?? g(this, Se, () => new Response()), h(this, Se).call(this, this)));
    g(this, Re, t), e && (g(this, V, e.executionCtx), this.env = e.env, g(this, Se, e.notFoundHandler), g(this, De, e.path), g(this, _e, e.matchResult));
  }
  get req() {
    return h(this, Me) ?? g(this, Me, new jt(h(this, Re), h(this, De), h(this, _e))), h(this, Me);
  }
  get event() {
    if (h(this, V) && "respondWith" in h(this, V))
      return h(this, V);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, V))
      return h(this, V);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, D) || g(this, D, new Response(null, { headers: h(this, ie) ?? g(this, ie, new Headers()) }));
  }
  set res(t) {
    if (h(this, D) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of h(this, D).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const s = h(this, D).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const n of s)
              t.headers.append("set-cookie", n);
          } else
            t.headers.set(e, r);
    }
    g(this, D, t), this.finalized = true;
  }
  get var() {
    return h(this, J) ? Object.fromEntries(h(this, J)) : {};
  }
}, "mt"), Re = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), me = /* @__PURE__ */ __name2(function(t, e, r) {
  const s = h(this, D) ? new Headers(h(this, D).headers) : h(this, ie) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, c] of i)
      a.toLowerCase() === "set-cookie" ? s.append(a, c) : s.set(a, c);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        s.set(i, a);
      else {
        s.delete(i);
        for (const c of a)
          s.append(i, c);
      }
  const n = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, we);
  return new Response(t, { status: n, headers: s });
}, "me"), mt);
var I = "ALL";
var ir = "all";
var ar = ["get", "post", "put", "delete", "options", "patch"];
var kt = "Can not add a route since the matcher is already built.";
var It = /* @__PURE__ */ __name2(class extends Error {
}, "It");
var or = "__COMPOSED_HANDLER";
var cr = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "cr");
var at = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "at");
var q;
var C;
var Ct;
var F;
var se;
var Le;
var qe;
var Ee;
var lr = (Ee = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    v(this, C);
    y(this, "get");
    y(this, "post");
    y(this, "put");
    y(this, "delete");
    y(this, "options");
    y(this, "patch");
    y(this, "all");
    y(this, "on");
    y(this, "use");
    y(this, "router");
    y(this, "getPath");
    y(this, "_basePath", "/");
    v(this, q, "/");
    y(this, "routes", []);
    v(this, F, cr);
    y(this, "errorHandler", at);
    y(this, "onError", (e2) => (this.errorHandler = e2, this));
    y(this, "notFound", (e2) => (g(this, F, e2), this));
    y(this, "fetch", (e2, ...r) => E(this, C, qe).call(this, e2, r[1], r[0], e2.method));
    y(this, "request", (e2, r, s2, n2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, s2, n2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${pe("/", e2)}`, r), s2, n2)));
    y(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(E(this, C, qe).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...ar, ir].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? g(this, q, a) : E(this, C, se).call(this, i, h(this, q), a), c.forEach((l) => {
        E(this, C, se).call(this, i, h(this, q), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        g(this, q, l);
        for (const o of [i].flat())
          c.map((u) => {
            E(this, C, se).call(this, o.toUpperCase(), h(this, q), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? g(this, q, i) : (g(this, q, "*"), a.unshift(i)), a.forEach((c) => {
      E(this, C, se).call(this, I, h(this, q), c);
    }), this);
    const { strict: s, ...n } = e;
    Object.assign(this, n), this.getPath = s ?? true ? e.getPath ?? bt : Zt;
  }
  route(e, r) {
    const s = this.basePath(e);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === at ? i = n.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await nt([], r.errorHandler)(c, () => n.handler(c, l))).res, "i"), i[or] = n.handler), E(a = s, C, se).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(e) {
    const r = E(this, C, Ct).call(this);
    return r._basePath = pe(this._basePath, e), r;
  }
  mount(e, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name2((l) => l, "n") : n = s.replaceRequest));
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
    n || (n = (() => {
      const l = pe(this._basePath, e), o = l === "/" ? 0 : l.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const u = await r(n(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return E(this, C, se).call(this, I, pe(e, "*"), c), this;
  }
}, "Ee"), q = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakSet(), Ct = /* @__PURE__ */ __name2(function() {
  const e = new Ee({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, g(e, F, h(this, F)), e.routes = this.routes, e;
}, "Ct"), F = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ __name2(function(e, r, s) {
  e = e.toUpperCase(), r = pe(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: e, handler: s };
  this.router.add(e, r, [s, n]), this.routes.push(n);
}, "se"), Le = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Le"), qe = /* @__PURE__ */ __name2(function(e, r, s, n) {
  if (n === "HEAD")
    return (async () => new Response(null, await E(this, C, qe).call(this, e, r, s, "GET")))();
  const i = this.getPath(e, { env: s }), a = this.router.match(n, i), c = new nr(e, { path: i, matchResult: a, env: s, executionCtx: r, notFoundHandler: h(this, F) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await h(this, F).call(this, c);
      });
    } catch (u) {
      return E(this, C, Le).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : h(this, F).call(this, c))).catch((u) => E(this, C, Le).call(this, u, c)) : o ?? h(this, F).call(this, c);
  }
  const l = nt(a[0], this.errorHandler, h(this, F));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return E(this, C, Le).call(this, o, c);
    }
  })();
}, "qe"), Ee);
var Rt = [];
function ur(t, e) {
  const r = this.buildAllMatchers(), s = /* @__PURE__ */ __name2((n, i) => {
    const a = r[n] || r[I], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], Rt];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "s");
  return this.match = s, s(t, e);
}
__name(ur, "ur");
__name2(ur, "ur");
var Ge = "[^/]+";
var Te = ".*";
var ke = "(?:|/.*)";
var ge = Symbol();
var hr = new Set(".\\+*[^]$()");
function dr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Te || t === ke ? 1 : e === Te || e === ke ? -1 : t === Ge ? 1 : e === Ge ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(dr, "dr");
__name2(dr, "dr");
var ae;
var oe;
var G;
var ue;
var fr = (ue = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, ae);
    v(this, oe);
    v(this, G, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, s, n, i) {
    if (e.length === 0) {
      if (h(this, ae) !== void 0)
        throw ge;
      if (i)
        return;
      g(this, ae, r);
      return;
    }
    const [a, ...c] = e, l = a === "*" ? c.length === 0 ? ["", "", Te] : ["", "", Ge] : a === "/*" ? ["", "", ke] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let d = l[2] || Ge;
      if (u && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw ge;
      if (o = h(this, G)[d], !o) {
        if (Object.keys(h(this, G)).some((f) => f !== Te && f !== ke))
          throw ge;
        if (i)
          return;
        o = h(this, G)[d] = new ue(), u !== "" && g(o, oe, n.varIndex++);
      }
      !i && u !== "" && s.push([u, h(o, oe)]);
    } else if (o = h(this, G)[a], !o) {
      if (Object.keys(h(this, G)).some((u) => u.length > 1 && u !== Te && u !== ke))
        throw ge;
      if (i)
        return;
      o = h(this, G)[a] = new ue();
    }
    o.insert(c, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, G)).sort(dr).map((s) => {
      const n = h(this, G)[s];
      return (typeof h(n, oe) == "number" ? `(${s})@${h(n, oe)}` : hr.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof h(this, ae) == "number" && r.unshift(`#${h(this, ae)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ue"), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ue);
var Ke;
var Ne;
var gt;
var pr = (gt = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, Ke, { varIndex: 0 });
    v(this, Ne, new fr());
  }
  insert(t, e, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let c = false;
      if (t = t.replace(/\{[^}]+\}/g, (l) => {
        const o = `@\\${a}`;
        return n[a] = [o, l], a++, c = true, o;
      }), !c)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [c] = n[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(c) !== -1) {
          i[l] = i[l].replace(c, n[a][1]);
          break;
        }
    }
    return h(this, Ne).insert(i, e, s, h(this, Ke), r), s;
  }
  buildRegExp() {
    let t = h(this, Ne).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, s];
  }
}, "gt"), Ke = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), gt);
var mr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Fe = /* @__PURE__ */ Object.create(null);
function Mt(t) {
  return Fe[t] ?? (Fe[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Mt, "Mt");
__name2(Mt, "Mt");
function gr() {
  Fe = /* @__PURE__ */ Object.create(null);
}
__name(gr, "gr");
__name2(gr, "gr");
function xr(t) {
  var o;
  const e = new pr(), r = [];
  if (t.length === 0)
    return mr;
  const s = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), n = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = s.length; u < f; u++) {
    const [p, x, j] = s[u];
    p ? n[x] = [j.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), Rt] : d++;
    let m;
    try {
      m = e.insert(x, d, p);
    } catch (w) {
      throw w === ge ? new It(x) : w;
    }
    p || (r[d] = j.map(([w, b]) => {
      const _ = /* @__PURE__ */ Object.create(null);
      for (b -= 1; b >= 0; b--) {
        const [N, A] = m[b];
        _[N] = A;
      }
      return [w, _];
    }));
  }
  const [i, a, c] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const x = (o = r[u][f]) == null ? void 0 : o[1];
      if (!x)
        continue;
      const j = Object.keys(x);
      for (let m = 0, w = j.length; m < w; m++)
        x[j[m]] = c[x[j[m]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, n];
}
__name(xr, "xr");
__name2(xr, "xr");
function fe(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((s, n) => n.length - s.length))
      if (Mt(r).test(e))
        return [...t[r]];
  }
}
__name(fe, "fe");
__name2(fe, "fe");
var Q;
var Z;
var Je;
var Pt;
var xt;
var yr = (xt = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, Je);
    y(this, "name", "RegExpRouter");
    v(this, Q);
    v(this, Z);
    y(this, "match", ur);
    g(this, Q, { [I]: /* @__PURE__ */ Object.create(null) }), g(this, Z, { [I]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var c;
    const s = h(this, Q), n = h(this, Z);
    if (!s || !n)
      throw new Error(kt);
    s[t] || [s, n].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[I]).forEach((o) => {
        l[t][o] = [...l[I][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = Mt(e);
      t === I ? Object.keys(s).forEach((o) => {
        var u;
        (u = s[o])[e] || (u[e] = fe(s[o], e) || fe(s[I], e) || []);
      }) : (c = s[t])[e] || (c[e] = fe(s[t], e) || fe(s[I], e) || []), Object.keys(s).forEach((o) => {
        (t === I || t === o) && Object.keys(s[o]).forEach((u) => {
          l.test(u) && s[o][u].push([r, i]);
        });
      }), Object.keys(n).forEach((o) => {
        (t === I || t === o) && Object.keys(n[o]).forEach((u) => l.test(u) && n[o][u].push([r, i]));
      });
      return;
    }
    const a = St(e) || [e];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(n).forEach((d) => {
        var f;
        (t === I || t === d) && ((f = n[d])[u] || (f[u] = [...fe(s[d], u) || fe(s[I], u) || []]), n[d][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Z)).concat(Object.keys(h(this, Q))).forEach((e) => {
      t[e] || (t[e] = E(this, Je, Pt).call(this, e));
    }), g(this, Q, g(this, Z, void 0)), gr(), t;
  }
}, "xt"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakSet(), Pt = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === I;
  return [h(this, Q), h(this, Z)].forEach((s) => {
    const n = s[t] ? Object.keys(s[t]).map((i) => [i, s[t][i]]) : [];
    n.length !== 0 ? (r || (r = true), e.push(...n)) : t !== I && e.push(...Object.keys(s[I]).map((i) => [i, s[I][i]]));
  }), r ? xr(e) : null;
}, "Pt"), xt);
var ee;
var B;
var yt;
var vr = (yt = /* @__PURE__ */ __name2(class {
  constructor(t) {
    y(this, "name", "SmartRouter");
    v(this, ee, []);
    v(this, B, []);
    g(this, ee, t.routers);
  }
  add(t, e, r) {
    if (!h(this, B))
      throw new Error(kt);
    h(this, B).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, B))
      throw new Error("Fatal error");
    const r = h(this, ee), s = h(this, B), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = s.length; l < o; l++)
          c.add(...s[l]);
        a = c.match(t, e);
      } catch (l) {
        if (l instanceof It)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), g(this, ee, [c]), g(this, B, void 0);
      break;
    }
    if (i === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, B) || h(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ee)[0];
  }
}, "yt"), ee = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), yt);
var $e = /* @__PURE__ */ Object.create(null);
var te;
var P;
var ce;
var Oe;
var M;
var z;
var ne;
var je;
var wr = (je = /* @__PURE__ */ __name2(class {
  constructor(e, r, s) {
    v(this, z);
    v(this, te);
    v(this, P);
    v(this, ce);
    v(this, Oe, 0);
    v(this, M, $e);
    if (g(this, P, s || /* @__PURE__ */ Object.create(null)), g(this, te, []), e && r) {
      const n = /* @__PURE__ */ Object.create(null);
      n[e] = { handler: r, possibleKeys: [], score: 0 }, g(this, te, [n]);
    }
    g(this, ce, []);
  }
  insert(e, r, s) {
    g(this, Oe, ++st(this, Oe)._);
    let n = this;
    const i = Ut(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], d = Xt(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(n, P)) {
        n = h(n, P)[f], d && a.push(d[1]);
        continue;
      }
      h(n, P)[f] = new je(), d && (h(n, ce).push(d), a.push(d[1])), n = h(n, P)[f];
    }
    return h(n, te).push({ [e]: { handler: s, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: h(this, Oe) } }), n;
  }
  search(e, r) {
    var l;
    const s = [];
    g(this, M, $e);
    let i = [this];
    const a = wt(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let x = 0, j = i.length; x < j; x++) {
        const m = i[x], w = h(m, P)[d];
        w && (g(w, M, h(m, M)), f ? (h(w, P)["*"] && s.push(...E(this, z, ne).call(this, h(w, P)["*"], e, h(m, M))), s.push(...E(this, z, ne).call(this, w, e, h(m, M)))) : p.push(w));
        for (let b = 0, _ = h(m, ce).length; b < _; b++) {
          const N = h(m, ce)[b], A = h(m, M) === $e ? {} : { ...h(m, M) };
          if (N === "*") {
            const S = h(m, P)["*"];
            S && (s.push(...E(this, z, ne).call(this, S, e, h(m, M))), g(S, M, A), p.push(S));
            continue;
          }
          const [Ae, $, H] = N;
          if (!d && !(H instanceof RegExp))
            continue;
          const T = h(m, P)[Ae], W = a.slice(o).join("/");
          if (H instanceof RegExp) {
            const S = H.exec(W);
            if (S) {
              if (A[$] = S[0], s.push(...E(this, z, ne).call(this, T, e, h(m, M), A)), Object.keys(h(T, P)).length) {
                g(T, M, A);
                const O = ((l = S[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[O] || (c[O] = [])).push(T);
              }
              continue;
            }
          }
          (H === true || H.test(d)) && (A[$] = d, f ? (s.push(...E(this, z, ne).call(this, T, e, A, h(m, M))), h(T, P)["*"] && s.push(...E(this, z, ne).call(this, h(T, P)["*"], e, A, h(m, M)))) : (g(T, M, A), p.push(T)));
        }
      }
      i = p.concat(c.shift() ?? []);
    }
    return s.length > 1 && s.sort((o, u) => o.score - u.score), [s.map(({ handler: o, params: u }) => [o, u])];
  }
}, "je"), te = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), ne = /* @__PURE__ */ __name2(function(e, r, s, n) {
  const i = [];
  for (let a = 0, c = h(e, te).length; a < c; a++) {
    const l = h(e, te)[a], o = l[r] || l[I], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), s !== $e || n && n !== $e))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], x = u[o.score];
        o.params[p] = n != null && n[p] && !x ? n[p] : s[p] ?? (n == null ? void 0 : n[p]), u[o.score] = true;
      }
  }
  return i;
}, "ne"), je);
var le;
var vt;
var br = (vt = /* @__PURE__ */ __name2(class {
  constructor() {
    y(this, "name", "TrieRouter");
    v(this, le);
    g(this, le, new wr());
  }
  add(t, e, r) {
    const s = St(e);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++)
        h(this, le).insert(t, s[n], r);
      return;
    }
    h(this, le).insert(t, e, r);
  }
  match(t, e) {
    return h(this, le).search(t, e);
  }
}, "vt"), le = /* @__PURE__ */ new WeakMap(), vt);
var _t = /* @__PURE__ */ __name2(class extends lr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new vr({ routers: [new yr(), new br()] });
  }
}, "_t");
var Sr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, s = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await s(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await n(a.req.header("origin") || "", a);
      d.length && l("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Sr");
var Er = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ot = /* @__PURE__ */ __name2((t, e = jr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = t.match(r);
  if (!s)
    return;
  let n = e[s[1]];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, "ot");
var Or = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var jr = Or;
var Ar = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((n) => n !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), s = [];
  for (const n of r)
    n === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : n !== "." && s.push(n);
  return s.join("/") || ".";
}, "Ar");
var Dt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var $r = Object.keys(Dt);
var Tr = "index.html";
var kr = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, s = t.join ?? Ar;
  return async (n, i) => {
    var u, d, f, p;
    if (n.finalized)
      return i();
    let a;
    if (t.path)
      a = t.path;
    else
      try {
        if (a = decodeURIComponent(n.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))
          throw new Error();
      } catch {
        return await ((u = t.onNotFound) == null ? void 0 : u.call(t, n.req.path, n)), i();
      }
    let c = s(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(c) && (c = s(c, Tr));
    const l = t.getContent;
    let o = await l(c, n);
    if (o instanceof Response)
      return n.newResponse(o.body, o);
    if (o) {
      const x = t.mimes && ot(c, t.mimes) || ot(c);
      if (n.header("Content-Type", x || "application/octet-stream"), t.precompressed && (!x || Er.test(x))) {
        const j = new Set((d = n.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((m) => m.trim()));
        for (const m of $r) {
          if (!j.has(m))
            continue;
          const w = await l(c + Dt[m], n);
          if (w) {
            o = w, n.header("Content-Encoding", m), n.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, c, n)), n.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, c, n)), await i();
  };
}, "kr");
var Ir = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const n = r[t];
  if (!n)
    return null;
  const i = await s.get(n, { type: "stream" });
  return i || null;
}, "Ir");
var Cr = /* @__PURE__ */ __name2((t) => async function(r, s) {
  return kr({ ...t, getContent: async (i) => Ir(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, s);
}, "Cr");
var Rr = /* @__PURE__ */ __name2((t) => Cr(t), "Rr");
function Nt(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(Nt, "Nt");
__name2(Nt, "Nt");
function k(t, e) {
  const r = String(t || "").replace(/\s+/g, " ").trim();
  if (r.length <= e)
    return r;
  const s = r.slice(0, e), n = Math.max(s.lastIndexOf("."), s.lastIndexOf("\uB2E4."), s.lastIndexOf("\uC694."), s.lastIndexOf("!"), s.lastIndexOf("?"));
  return n > Math.floor(e * 0.6) ? s.slice(0, n + 1).trim() : s.trim() + "\u2026";
}
__name(k, "k");
__name2(k, "k");
function ct(t) {
  const e = (t || "").trim();
  if (!e)
    return null;
  try {
    return JSON.parse(e);
  } catch {
  }
  const r = e.indexOf("{"), s = e.lastIndexOf("}");
  if (r >= 0 && s > r) {
    const n = e.slice(r, s + 1);
    try {
      return JSON.parse(n);
    } catch {
    }
  }
  return null;
}
__name(ct, "ct");
__name2(ct, "ct");
function Mr(t) {
  const e = t.length, r = Nt(t), s = t.split(/[.!?]\s+/).map(($) => $.trim()).filter(($) => $.length > 10), n = t.match(/\d+\.?\d*%?/g) || [], i = n.length > 0, a = s.length > 0 ? `${s[0].split("\uBA70")[0]}\uBA70, \uC774\uB294 \uC8FC\uC694 \uD2B9\uC9D5\uC774\uB2E4` : "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", c = [];
  i && n.length >= 2 && (c.push(`\uC8FC\uC694 \uC9C0\uD45C\uB294 ${n[0]}\uC640 ${n[1]}\uC774\uB2E4`), n.length >= 4 && c.push(`\uBE44\uAD50 \uC218\uCE58\uB294 ${n[2]}\uC640 ${n[3]}\uB85C \uB300\uC870\uB97C \uC774\uB8EC\uB2E4`));
  const l = t.match(/교육|공교육|사교육|GDP|민간|OECD|무료|부담|비율/g) || [];
  for (l.length >= 3 && c.push(`${l[0]}\uC640 ${l[1]}\uC758 ${l[2]} \uCE21\uBA74\uC5D0\uC11C \uCC28\uC774\uAC00 \uC788\uB2E4`); c.length < 3; )
    c.push(`${c.length + 1}\uCC28 \uADFC\uAC70: \uAD00\uB828 \uB9E5\uB77D\uC744 \uBD84\uC11D\uD55C \uACB0\uACFC`);
  const o = [];
  n.length >= 4 && (o.push(`${n[0]}\uC640 ${n[2]}\uC758 \uCC28\uC774\uB294 ${n.length}\uBC30 \uC218\uC900\uC774\uB2E4`), o.push("\uBBFC\uAC04 \uBD80\uB2F4 \uCE21\uBA74\uC5D0\uC11C \uAD6C\uC870\uC801 \uCC28\uC774\uAC00 \uD655\uC778\uB41C\uB2E4"));
  const u = [];
  l.includes("\uAD50\uC721") && l.includes("\uBD80\uB2F4") && u.push("\uC774\uB294 \uAD50\uC721 \uC7AC\uC815 \uAD6C\uC870\uC758 \uBCF8\uC9C8\uC801 \uCC28\uC774\uB97C \uC2DC\uC0AC\uD55C\uB2E4"), u.push("\uAD6D\uAC00\uBCC4 \uAD50\uC721 \uCCA0\uD559\uACFC \uC815\uCC45\uC774 \uBC18\uC601\uB41C \uACB0\uACFC\uB85C \uD574\uC11D\uB41C\uB2E4");
  const d = Math.floor(e * 0.45), f = Math.floor(e * 0.62), p = `${a}. ${c.slice(0, 2).join(". ")}.`;
  let x = o.length > 0 ? `${o.join(". ")}.` : c[2] || "\uCD94\uAC00 \uBD84\uC11D\uC774 \uD544\uC694\uD558\uB2E4.";
  x.endsWith(".") || (x += ".");
  let j = u.length > 0 ? u.join(". ") + "." : "\uAD6D\uAC00\uBCC4 \uAD50\uC721 \uC815\uCC45\uC758 \uCC28\uC774\uB97C \uBC18\uC601\uD55C\uB2E4.";
  const m = [p, x, j].filter(($) => $ && $.length > 5);
  for (; m.length < 2; )
    m.push(`\uCD94\uAC00 \uBB38\uB2E8 ${m.length + 1}: \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uC774\uB2E4.`);
  let w = m.join(`

`);
  if (w.length < d)
    w += `

\uC6D0\uBB38\uC758 \uC8FC\uC694 \uB17C\uC810\uC740 ${l.slice(0, 3).join(", ")} \uB4F1\uC774\uB2E4.`;
  else if (w.length > f) {
    const $ = w.split(`

`);
    let H = $[0];
    for (let T = 1; T < $.length && (H + `

` + $[T]).length <= f; T++)
      H += `

` + $[T];
    w = H;
  }
  const b = [{ title: "\uAC1C\uC694", anchor: "sec-1" }, { title: "\uD575\uC2EC \uB0B4\uC6A9", anchor: "sec-2" }, { title: "\uBE44\uAD50 \uBD84\uC11D", anchor: "sec-3" }], _ = [{ title: "1. \uAC1C\uC694", keywords: ["\uD575\uC2EC", "\uC694\uC57D", "\uBC30\uACBD"], bullets: s.slice(0, 3), children: [{ title: "1.1. \uBC30\uACBD", keywords: ["\uB9E5\uB77D", "\uC0C1\uD669"], bullets: s.slice(0, 2) }] }, { title: "2. \uD575\uC2EC \uB0B4\uC6A9", keywords: ["\uC8FC\uC694", "\uD575\uC2EC", "\uC911\uC2EC"], bullets: s.slice(3, 6), children: [{ title: "2.1. \uC138\uBD80 \uC0AC\uD56D", keywords: ["\uAD6C\uCCB4", "\uC0C1\uC138"], bullets: s.slice(3, 5) }] }, { title: "3. \uBE44\uAD50 \uBD84\uC11D", keywords: ["\uBE44\uAD50", "\uB300\uC870", "\uCC28\uC774"], bullets: o.length > 0 ? o : s.slice(6, 8) }];
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: e, checksum: r }, narrative: { coreClaim: a, grounds: c, comparisons: o, implications: u, summaryDetail: w }, structured: { toc: b, hierarchy: _, glossary: [{ term: "\uACF5\uAD50\uC721", def: "\uAD6D\uAC00\uAC00 \uC81C\uACF5\uD558\uB294 \uBB34\uB8CC \uAD50\uC721 \uC2DC\uC2A4\uD15C" }, { term: "\uC0AC\uAD50\uC721", def: "\uBBFC\uAC04 \uBD80\uBB38\uC5D0\uC11C \uC81C\uACF5\uD558\uB294 \uC720\uB8CC \uAD50\uC721 \uC11C\uBE44\uC2A4" }, { term: "GDP", def: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0(Gross Domestic Product)" }, { term: "\uBBFC\uAC04 \uBD80\uB2F4", def: "\uAC00\uACC4\uC640 \uAE30\uC5C5\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44" }, { term: "OECD", def: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C(Organisation for Economic Co-operation and Development)" }] }, mindmap: { title: "\uD575\uC2EC \uAD6C\uC870", children: [{ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [{ title: "\uACF5\uAD50\uC721 \uC2DC\uC2A4\uD15C", pack: ["\uBB34\uB8CC \uC81C\uACF5", "\uC720\uCE58\uC6D0~\uB300\uD559", "\uAD6D\uAC00 \uBD80\uB2F4"], explain: "\uAD6D\uAC00\uAC00 \uC81C\uACF5\uD558\uB294 \uBB34\uB8CC \uAD50\uC721 \uC2DC\uC2A4\uD15C\uC73C\uB85C, \uC720\uCE58\uC6D0\uBD80\uD130 \uB300\uD559\uAE4C\uC9C0 \uC804 \uACFC\uC815\uC744 \uD3EC\uD568\uD558\uBA70 \uB300\uBD80\uBD84\uC758 \uBE44\uC6A9\uC744 \uAD6D\uAC00\uAC00 \uBD80\uB2F4\uD569\uB2C8\uB2E4." }, { title: "\uC0AC\uAD50\uC721 \uC758\uC874\uB3C4", pack: ["\uBBFC\uAC04 \uBD80\uB2F4", "\uC0AC\uAD50\uC721\uBE44", "\uAD6D\uAC00\uBCC4 \uCC28\uC774"], explain: "\uAC00\uACC4\uC640 \uAE30\uC5C5\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44 \uBE44\uC728\uB85C, \uAD6D\uAC00\uBCC4\uB85C \uD070 \uCC28\uC774\uB97C \uBCF4\uC774\uBA70 \uD55C\uAD6D\uC740 OECD \uD3C9\uADE0\uC758 3\uBC30\uB97C \uC0C1\uD68C\uD569\uB2C8\uB2E4." }] }, { title: "2. \uBE44\uAD50 \uBD84\uC11D", children: [{ title: "\uD55C\uAD6D vs \uC2A4\uC6E8\uB374", pack: ["GDP \uBE44\uC728", "\uBBFC\uAC04 \uBD80\uB2F4", "\uAD50\uC721 \uCCA0\uD559"], explain: "\uD55C\uAD6D\uC740 GDP \uB300\uBE44 7.6%(\uBBFC\uAC04 2.8%), \uC2A4\uC6E8\uB374\uC740 6.5%(\uBBFC\uAC04 0.2%)\uB85C \uBBFC\uAC04 \uBD80\uB2F4\uC5D0\uC11C 14\uBC30 \uCC28\uC774\uAC00 \uB0A9\uB2C8\uB2E4." }, { title: "\uBD81\uC720\uB7FD \uBAA8\uB378", pack: ["\uB178\uB974\uC6E8\uC774", "\uD540\uB780\uB4DC", "\uACF5\uAD50\uC721 \uC911\uC2EC"], explain: "\uB178\uB974\uC6E8\uC774\uC640 \uD540\uB780\uB4DC\uB3C4 \uACF5\uAD50\uC721 \uBE44\uC728\uC774 0.1%\uB97C \uB118\uC9C0 \uC54A\uC73C\uBA70, \uC120\uD589\uD559\uC2B5 \uC5C6\uC774 \uCDE8\uBBF8 \uD65C\uB3D9 \uC911\uC2EC\uC785\uB2C8\uB2E4." }] }] }, selftest: { passScorePct: 90, items: [{ id: "q1", type: "short", question: "\uD55C\uAD6D\uC758 GDP \uB300\uBE44 \uACF5\uAD50\uC721 \uBE44\uC728 \uC911 \uBBFC\uAC04 \uBD80\uB2F4\uC740 \uBA87 %\uC778\uAC00?", hint: "13\uB144\uC9F8 \uC138\uACC4 1\uC704\uB97C \uCC28\uC9C0\uD55C \uC218\uCE58\uC785\uB2C8\uB2E4.", rubric: { mustInclude: ["2.8", "%"], maxChars: 50 }, answerKey: "2.8%" }, { id: "q2", type: "explain", question: "\uC2A4\uC6E8\uB374\uACFC \uD55C\uAD6D\uC758 \uAD50\uC721\uBE44 \uBBFC\uAC04 \uBD80\uB2F4 \uCC28\uC774\uB97C \uC124\uBA85\uD558\uC2DC\uC624.", hint: "GDP \uB300\uBE44 \uBE44\uC728\uACFC \uAD6D\uAC00\uBCC4 \uAD50\uC721 \uCCA0\uD559\uC744 \uACE0\uB824\uD558\uC138\uC694.", rubric: { mustInclude: ["0.2", "2.8", "\uACF5\uAD50\uC721"], maxChars: 200 }, answerKey: "\uC2A4\uC6E8\uB374\uC740 \uBBFC\uAC04 \uBD80\uB2F4\uB960 0.2%\uB85C \uB300\uBD80\uBD84\uC744 \uAD6D\uAC00\uAC00 \uBD80\uB2F4\uD558\uC9C0\uB9CC, \uD55C\uAD6D\uC740 2.8%\uB85C OECD \uD3C9\uADE0\uC758 3\uBC30\uB97C \uC0C1\uD68C\uD569\uB2C8\uB2E4." }, { id: "q3", type: "evidence", question: "\uBD81\uC720\uB7FD \uAD6D\uAC00\uB4E4\uC758 \uACF5\uAD50\uC721 \uC911\uC2EC \uCCB4\uACC4\uC758 \uD2B9\uC9D5\uC744 \uC11C\uC220\uD558\uC2DC\uC624.", rubric: { mustInclude: ["\uACF5\uAD50\uC721", "\uBB34\uB8CC", "\uC120\uD589\uD559\uC2B5"], maxChars: 250 }, answerKey: "\uB178\uB974\uC6E8\uC774\uC640 \uD540\uB780\uB4DC\uB294 \uACF5\uAD50\uC721 \uBE44\uC728\uC774 0.1%\uB97C \uB118\uC9C0 \uC54A\uC73C\uBA70, \uC120\uD589\uD559\uC2B5 \uC5C6\uC774 \uCDE8\uBBF8 \uD65C\uB3D9 \uC911\uC2EC\uC73C\uB85C \uC6B4\uC601\uB429\uB2C8\uB2E4." }] } };
}
__name(Mr, "Mr");
__name2(Mr, "Mr");
function lt(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(lt, "lt");
__name2(lt, "lt");
function We(t, e) {
  var W;
  const r = e === "brief", s = e === "standard", n = t.narrative.coreClaim || "", i = t.narrative.grounds || [], a = t.narrative.comparisons || [], c = t.narrative.implications || [], l = ((W = t.source) == null ? void 0 : W.charCount) || 1e3;
  let o = "", u = n, d = [], f = [], p = [];
  if (e === "detail")
    o = String(t.narrative.summaryDetail || "").trim(), u = n, d = i, f = a, p = c;
  else if (e === "brief") {
    const S = Math.floor(l * 0.18);
    u = k(n, 60);
    const O = a[0] ? k(a[0], 80) : "";
    if (d = [], f = O ? [O] : [], p = [], O)
      o = `${u}. ${O}.`;
    else {
      const R = i[0] ? k(i[0], 60) : "";
      o = R ? `${u}. ${R}.` : `${u}.`;
    }
    o.length > S && (o = o.slice(0, S - 3) + "...");
  } else {
    const S = Math.floor(l * 0.25), O = Math.floor(l * 0.38);
    u = k(n, 80), d = i.slice(0, 2).map((re) => k(re, 70));
    const R = a[0] ? k(a[0], 90) : "";
    f = R ? [R] : [], p = [];
    const de = [u];
    if (d.length > 0 && de.push(d.join(". ")), R && de.push(`\uBC18\uBA74 ${R}`), o = de.join(". ") + ".", o.length > O)
      o = o.slice(0, O - 3) + "...";
    else if (o.length < S && c.length > 0) {
      const re = k(c[0], 60);
      o += ` ${re}.`;
    }
  }
  const x = t.structured.toc || [], j = r ? 2 : s ? 4 : 10, m = (t.structured.glossary || []).slice(0, j).map((S) => ({ term: k(S.term, 20), def: k(S.def, r ? 70 : 120) })), w = r ? 2 : s ? 3 : 5, b = /* @__PURE__ */ __name2((S) => (S || []).map((O) => ({ title: k(O.title, 60), keywords: (O.keywords || []).slice(0, r ? 3 : s ? 4 : 6).map((R) => k(R, 16)), bullets: (O.bullets || []).slice(0, w).map((R) => k(R, r ? 90 : 140)), children: O.children ? b(O.children) : void 0 })), "b"), _ = b(t.structured.hierarchy || []), N = Pr({ toc: x, hierarchy: _, glossary: m }), A = JSON.parse(JSON.stringify(t.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), Ae = r ? 70 : s ? 110 : 160, $ = r ? 2 : 3;
  for (const S of A.children || [])
    for (const O of S.children || [])
      Array.isArray(O.pack) && (O.pack = O.pack.slice(0, $).map((R) => k(R, 20))), typeof O.explain == "string" && (O.explain = k(O.explain, Ae)), Array.isArray(O.children) || (O.children = []);
  const H = r || s ? 2 : 4, T = (t.selftest.items || []).slice(0, H).map((S) => {
    var O, R, de;
    return { id: S.id, type: S.type, question: k(S.question, r ? 140 : 220), hint: S.hint ? k(S.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((O = S.rubric) == null ? void 0 : O.mustInclude) || []).slice(0, r ? 2 : 4).map((re) => k(re, 20)), mustNotInclude: (((R = S.rubric) == null ? void 0 : R.mustNotInclude) || []).slice(0, 2).map((re) => k(re, 20)), maxChars: ((de = S.rubric) == null ? void 0 : de.maxChars) ?? (r ? 140 : 220) }, answerKey: S.answerKey ? k(S.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: d, comparisons: f, implications: p }, structured: { text: N, toc: x, hierarchy: _, glossary: m }, mindmap: { tree: A }, selftest: { passScorePct: 90, items: T } };
}
__name(We, "We");
__name2(We, "We");
function Pr(t) {
  var s, n;
  const e = [];
  e.push("\u2160. \uBAA9\uCC28"), (s = t.toc) != null && s.length ? t.toc.forEach((i, a) => e.push(`  ${a + 1}. ${i.title}`)) : e.push("  1. \uBCF8\uBB38"), e.push(""), e.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name2((i, a) => {
    var c, l;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      e.push(`${u}- ${o.title}`), (c = o.keywords) != null && c.length && e.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => e.push(`${u}  \xB7 ${d}`)), (l = o.children) != null && l.length && r(o.children, a + 1);
    }
  }, "r");
  return r(t.hierarchy || [], 1), e.push(""), e.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (n = t.glossary) != null && n.length ? t.glossary.forEach((i) => e.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : e.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), e.join(`
`);
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
function _r(t) {
  var i, a, c, l, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 3) && e.push("narrative.grounds must be >= 3"), (!((c = t == null ? void 0 : t.narrative) != null && c.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = t == null ? void 0 : t.structured) == null ? void 0 : l.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 3) && e.push("structured.glossary must be >= 3");
  let r = 0, s = 0, n = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const x of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(x.pack) && x.pack.length && s++, typeof x.explain == "string" && x.explain.trim().length > 30 && n++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && s / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && n / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(_r, "_r");
__name2(_r, "_r");
function Dr(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), s = (t.standard.narrative.text || "").replace(/\s+/g, ""), n = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), s.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), n.length < s.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === s && e.push("brief narrative equals standard narrative"), s === n && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let x = 0;
    for (const j of (p == null ? void 0 : p.children) || [])
      x += ((j == null ? void 0 : j.children) || []).length;
    return x;
  }, "i"), a = i(t.brief.mindmap.tree), c = i(t.standard.mindmap.tree), l = i(t.detail.mindmap.tree);
  return a === c && c === l || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${c}, detail:${l})`), e;
}
__name(Dr, "Dr");
__name2(Dr, "Dr");
async function ut(t, e) {
  var c, l, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const s = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ut, "ut");
__name2(ut, "ut");
function Nr(t) {
  t.post("/api/matrix", async (e) => {
    const r = Date.now(), s = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const n = await e.req.json(), i = String(n.text || "").trim();
      if (!i)
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 400);
      const a = Nt(i), c = e.env.USE_MOCK === "true" || !e.env.GEMINI_API_KEY;
      let l = null;
      if (c)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), l = Mr(i);
      else {
        const j = lt(i);
        let m = await ut(e, j);
        if (l = ct(m), !l) {
          const w = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", lt(i)].join(`
`);
          m = await ut(e, w), l = ct(m);
        }
        if (!l)
          return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 502);
      }
      const o = _r(l);
      if (o.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 422);
      const u = We(l, "brief"), d = We(l, "standard"), f = We(l, "detail"), p = Dr({ brief: u, standard: d, detail: f });
      if (p.length && c === false)
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: p.join(" | ") }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 422);
      const x = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: u, standard: d, detail: f }, views: { narrative: { brief: u.narrative, standard: d.narrative, detail: f.narrative }, structured: { brief: u.structured, standard: d.structured, detail: f.structured }, mindmap: { brief: u.mindmap, standard: d.mindmap, detail: f.mindmap }, selftest: { brief: u.selftest, standard: d.selftest, detail: f.selftest } } }, meta: { requestId: s, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return e.json(x, 200);
    } catch (n) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (n == null ? void 0 : n.message) || String(n) }, meta: { requestId: s, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  });
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
var K = new _t();
K.use("/api/*", Sr());
K.use("/static/*", Rr({ root: "./public" }));
Nr(K);
function Ie() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ie, "Ie");
__name2(Ie, "Ie");
function et(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let s = 0; s < e.length; s++)
    r ^= e.charCodeAt(s), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(et, "et");
__name2(et, "et");
function Hr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Hr, "Hr");
__name2(Hr, "Hr");
function Lr(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Lr, "Lr");
__name2(Lr, "Lr");
function qr(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(qr, "qr");
__name2(qr, "qr");
function Fr(t, e) {
  const r = Math.max(60, ye(t)), s = 0.53, n = Math.floor(r * s * 0.85), i = Math.ceil(r * s * 1.15), a = Math.floor(r * s), c = Math.ceil(r * 0.05);
  return { base: r, min: n, max: i, keep: a, tol: c };
}
__name(Fr, "Fr");
__name2(Fr, "Fr");
function Gr(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = qr((t == null ? void 0 : t.viewType) || "narrative"), s = Lr(t == null ? void 0 : t.level), n = "detail", { base: i, min: a, max: c } = Fr(e), l = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${l}, subject=${o}, requestedLevel=${s}, forcedLevel=${n}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
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
`.trim(), p = `
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
`.trim(), x = `
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
`.trim(), j = `
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
  let m = f;
  return r === "structured" ? m = p : r === "mindmap" ? m = x : r === "selftest" && (m = j), `${d}

${m}`;
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function he(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(he, "he");
__name2(he, "he");
function Ve(t) {
  const e = he(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((s) => s.trim()).filter(Boolean) : [];
}
__name(Ve, "Ve");
__name2(Ve, "Ve");
function Kr(t) {
  const e = he(t).split(`
`).map((s) => s.trim()), r = [];
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    (/^\d+(\.\d+)+\.\s*/.test(n) || /^\d+\.\s*/.test(n)) && r.push({ title: n, startIdx: s });
  }
  return r;
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function tt(t) {
  const e = he(t).split(`
`), r = Kr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: he(t) }];
  const s = [];
  for (let n = 0; n < r.length; n++) {
    const i = r[n], a = r[n + 1], c = i.startIdx, l = a ? a.startIdx : e.length, o = i.title, u = e.slice(c + 1, l).join(`
`).trim();
    s.push({ title: o, body: u });
  }
  return s.filter((n) => n.body.length > 0);
}
__name(tt, "tt");
__name2(tt, "tt");
function Jr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function xe(t, e) {
  const s = Ve(t).map((i, a) => ({ s: i, i: a, score: Jr(i) }));
  return s.sort((i, a) => a.score - i.score || i.i - a.i), s.slice(0, Hr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(xe, "xe");
__name2(xe, "xe");
function ye(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(ye, "ye");
__name2(ye, "ye");
var Qe = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function ht(t, e, r) {
  const s = Math.max(60, ye(t)), n = ye(e), i = Math.floor(s * Qe[r].min), a = Math.ceil(s * Qe[r].max);
  return n < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: n } : n > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: n } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: n };
}
__name(ht, "ht");
__name2(ht, "ht");
function Ce(t, e, r) {
  const s = Math.max(60, ye(t)), n = Math.ceil(s * Qe[r].max);
  let i = String(e || "").trim();
  if (ye(i) <= n)
    return i;
  const a = Ve(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (ye(o) > n)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
function Ye(t, e) {
  return `${t}_${e}`;
}
__name(Ye, "Ye");
__name2(Ye, "Ye");
function Vr(t) {
  const e = tt(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, s = /* @__PURE__ */ new Map();
  return e.forEach((n, i) => {
    const a = Ye("sec", i + 1), c = { id: a, title: n.title, type: "section", collapsed: false, children: [] }, l = xe(n.body, 6), o = [];
    for (const b of l)
      (b.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((N) => {
        const A = N.replace(/[()]/g, "").trim();
        A.length >= 2 && A.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(A) && o.push(A);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((b) => u.set(b, (u.get(b) || 0) + 1));
    const d = Array.from(u.entries()).sort((b, _) => _[1] - b[1]).map((b) => b[0]).filter((b) => b.length <= 10).slice(0, 3), f = xe(n.body, 3).join(" "), p = xe(n.body, 2).join(" "), x = xe(n.body, 1).join(" "), j = { id: Ye(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: x, children: [] };
    d.forEach((b) => {
      s.has(b) || s.set(b, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${b}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${xe(n.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = Ve(n.body).filter((b) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(b)).slice(0, 2);
    w.length && j.children.push({ id: Ye(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(j), r.children.push(c);
  }), { tree: r, glossary: Array.from(s.entries()).map(([n, i]) => ({ term: n, def: i })) };
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function Ht(t, e) {
  const r = JSON.parse(JSON.stringify(t)), s = /* @__PURE__ */ __name2((n) => {
    n.type === "keyword" && (e === "brief" && (n.explain = n.explainBrief || n.explain), e === "standard" && (n.explain = n.explainStandard || n.explain), e === "detail" && (n.explain = n.explain || n.explainStandard || n.explainBrief)), n.type === "advanced" && (n.collapsed = e !== "detail"), (n.children || []).forEach(s);
  }, "s");
  return s(r), r;
}
__name(Ht, "Ht");
__name2(Ht, "Ht");
function Br(t, e, r, s) {
  const n = (e.children || []).map((u) => u.title), a = (Ht(e, s).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), c = s === "brief" ? 4 : s === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: Ce(t, u.def, s) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), n.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ce(t, u.summary, s)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: n, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(Br, "Br");
__name2(Br, "Br");
function zr(t, e) {
  const r = tt(t), s = e === "brief" ? 2 : e === "standard" ? 4 : 7, n = [];
  r.forEach((a) => {
    const c = e === "brief" || e === "standard" ? 1 : 2;
    n.push(...xe(a.body, c));
  });
  const i = n.slice(0, s).join(" ");
  return Ce(t, i, e);
}
__name(zr, "zr");
__name2(zr, "zr");
function Ur(t, e) {
  tt(t);
  const r = Ve(t), s = [], n = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  n && s.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: n, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: n });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && s.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && s.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), s.slice(0, 4);
}
__name(Ur, "Ur");
__name2(Ur, "Ur");
function Wr(t, e) {
  let r = t.length, s = 0;
  const n = [];
  for (const a of t) {
    const c = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!c) {
      n.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((x) => x.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((x) => {
      c.includes(x) && d++;
    });
    const f = d >= 2 || c.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    s += p, n.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(s / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: n };
}
__name(Wr, "Wr");
__name2(Wr, "Wr");
function dt(t) {
  const e = he(t), { tree: r, glossary: s } = Vr(e), n = { originalMeta: { textHash: et(e), chars: e.length, ts: Ie() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = zr(e, i), c = Br(e, r, s, i), l = Ht(r, i), o = Ur(e), d = ht(e, a, i).ok ? a : Ce(e, a, i), f = c.renderText || "", p = ht(e, f, i);
    c.renderText = p.ok ? f : Ce(e, f, i), n.modes[i] = { narrative: d, structured: c, mindmap: { tree: l }, selftest: o };
  }), n;
}
__name(dt, "dt");
__name2(dt, "dt");
K.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: Ie(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
K.post("/api/engine", async (t) => {
  var p, x, j, m, w, b, _;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), s = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", n = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), c = (e == null ? void 0 : e.useGemini) === true, l = he(r);
  if (l.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && t.env.GEMINI_API_KEY)
    try {
      const N = Gr({ text: l, viewType: n, level: "detail", grade: i, subject: a }), A = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", $ = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${A}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: N }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), T = (((w = (m = (j = (x = (p = $ == null ? void 0 : $.candidates) == null ? void 0 : p[0]) == null ? void 0 : x.content) == null ? void 0 : j.parts) == null ? void 0 : m[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if (T) {
        const W = JSON.parse(T[0]);
        u = { originalMeta: { textHash: et(l), chars: l.length, ts: Ie() }, modes: { detail: { [n]: W }, standard: { [n]: W }, brief: { [n]: W } } }, o = "gemini-" + A;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (N) {
      console.error("[Gemini Error]", N), u = dt(l), o = "v5-local-fallback";
    }
  else
    u = dt(l);
  const d = (_ = (b = u.modes) == null ? void 0 : b[s]) == null ? void 0 : _[n], f = { engine: o, mode: s, viewType: n, ts: Ie(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
K.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], s = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, n = Wr(r, s);
  return t.json({ ok: true, result: n });
});
K.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), s = String((r == null ? void 0 : r.userId) || "anon"), n = he(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!n || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = Ie(), l = et(n), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, s, c, c, l, n, o).run(), t.json({ ok: true, id: a, textHash: l, ts: c });
});
K.get("/api/loadSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = String(t.req.query("userId") || "anon"), s = String(t.req.query("id") || "");
  if (!s)
    return t.json({ ok: false, error: "missing_id" }, 400);
  const n = await e.prepare(`
    SELECT id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson
    FROM summaries
    WHERE id=?1 AND userId=?2
  `).bind(s, r).first();
  if (!n)
    return t.json({ ok: false, error: "not_found" }, 404);
  let i = null;
  try {
    i = JSON.parse(n.allSummariesJson);
  } catch {
    i = null;
  }
  return t.json({ ok: true, doc: { id: n.id, userId: n.userId, createdAt: n.createdAt, updatedAt: n.updatedAt, textHash: n.textHash, originalText: n.originalText, allSummaries: i } });
});
K.get("/", (t) => t.redirect("/static/v5.html"));
var ft = new _t();
var Yr = Object.assign({ "/src/index.tsx": K });
var Lt = false;
for (const [, t] of Object.entries(Yr))
  t && (ft.route("/", t), ft.notFound(t.notFoundHandler), Lt = true);
if (!Lt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
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
var middleware_insertion_facade_default = ft;
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

// .wrangler/tmp/pages-aCTx0G/aj6qlnyxabu.js
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

// .wrangler/tmp/bundle-mTfZJN/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-mTfZJN/middleware-loader.entry.ts
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
//# sourceMappingURL=aj6qlnyxabu.js.map
