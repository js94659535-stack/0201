var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-6t45lj/checked-fetch.js
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

// .wrangler/tmp/bundle-6t45lj/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-cu9him/bundledWorker-0.8078910714327248.mjs
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
var Ut = Object.defineProperty;
var ot = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "ot");
var zt = /* @__PURE__ */ __name2((e, t, r) => t in e ? Ut(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "zt");
var v = /* @__PURE__ */ __name2((e, t, r) => zt(e, typeof t != "symbol" ? t + "" : t, r), "v");
var We = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || ot("Cannot " + r), "We");
var d = /* @__PURE__ */ __name2((e, t, r) => (We(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var S = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? ot("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "S");
var y = /* @__PURE__ */ __name2((e, t, r, n) => (We(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "y");
var A = /* @__PURE__ */ __name2((e, t, r) => (We(e, t, "access private method"), r), "A");
var ct = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  y(e, t, s, r);
}, get _() {
  return d(e, t, n);
} }), "ct");
var lt = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
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
      } catch (h) {
        if (h instanceof Error && t)
          n.error = h, l = await t(h, n), o = true;
        else
          throw h;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || o) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "lt");
var Wt = Symbol();
var Yt = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof $t ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Xt(e, { all: r, dot: n }) : {};
}, "Yt");
async function Xt(e, t) {
  const r = await e.formData();
  return r ? Qt(r, t) : {};
}
__name(Xt, "Xt");
__name2(Xt, "Xt");
function Qt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Zt(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (er(r, n, s), delete r[n]);
  }), r;
}
__name(Qt, "Qt");
__name2(Qt, "Qt");
var Zt = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Zt");
var er = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "er");
var kt = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "kt");
var tr = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = rr(e), n = kt(r);
  return nr(n, t);
}, "tr");
var rr = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "rr");
var nr = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "nr");
var De = {};
var sr = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return De[n] || (r[2] ? De[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : De[n] = [e, r[1], true]), De[n];
  }
  return null;
}, "sr");
var nt = /* @__PURE__ */ __name2((e, t) => {
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
}, "nt");
var ir = /* @__PURE__ */ __name2((e) => nt(e, decodeURI), "ir");
var Ot = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return ir(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Ot");
var ar = /* @__PURE__ */ __name2((e) => {
  const t = Ot(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "ar");
var he = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = he(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "he");
var Tt = /* @__PURE__ */ __name2((e) => {
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
}, "Tt");
var Ye = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? nt(e, Rt) : e) : e, "Ye");
var Ct = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const c = e.charCodeAt(a + t.length + 1);
      if (c === 61) {
        const l = a + t.length + 2, o = e.indexOf("&", l);
        return Ye(e.slice(l, o === -1 ? void 0 : o));
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
    if (n && (l = Ye(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = e.slice(c + 1, a === -1 ? void 0 : a), n && (o = Ye(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return t ? s[t] : s;
}, "Ct");
var or = Ct;
var cr = /* @__PURE__ */ __name2((e, t) => Ct(e, t, true), "cr");
var Rt = decodeURIComponent;
var ut = /* @__PURE__ */ __name2((e) => nt(e, Rt), "ut");
var xe;
var P;
var B;
var Mt;
var It;
var et;
var U;
var wt;
var $t = (wt = /* @__PURE__ */ __name2(class {
  constructor(e, t = "/", r = [[]]) {
    S(this, B);
    v(this, "raw");
    S(this, xe);
    S(this, P);
    v(this, "routeIndex", 0);
    v(this, "path");
    v(this, "bodyCache", {});
    S(this, U, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, y(this, P, r), y(this, xe, {});
  }
  param(e) {
    return e ? A(this, B, Mt).call(this, e) : A(this, B, It).call(this);
  }
  query(e) {
    return or(this.url, e);
  }
  queries(e) {
    return cr(this.url, e);
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
    return d(this, U).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, U).call(this, "text");
  }
  arrayBuffer() {
    return d(this, U).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, U).call(this, "blob");
  }
  formData() {
    return d(this, U).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, xe)[e] = t;
  }
  valid(e) {
    return d(this, xe)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Wt]() {
    return d(this, P);
  }
  get matchedRoutes() {
    return d(this, P)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, P)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "wt"), xe = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakSet(), Mt = /* @__PURE__ */ __name2(function(e) {
  const t = d(this, P)[0][this.routeIndex][1][e], r = A(this, B, et).call(this, t);
  return r && /\%/.test(r) ? ut(r) : r;
}, "Mt"), It = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(d(this, P)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = A(this, B, et).call(this, d(this, P)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? ut(n) : n);
  }
  return e;
}, "It"), et = /* @__PURE__ */ __name2(function(e) {
  return d(this, P)[1] ? d(this, P)[1][e] : e;
}, "et"), U = /* @__PURE__ */ new WeakMap(), wt);
var lr = { Stringify: 1 };
var _t = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((c) => c({ phase: t, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => _t(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "_t");
var ur = "text/plain; charset=UTF-8";
var Xe = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "Xe");
var $e;
var Me;
var G;
var ye;
var K;
var M;
var Ie;
var ve;
var we;
var se;
var _e;
var Pe;
var z;
var fe;
var St;
var dr = (St = /* @__PURE__ */ __name2(class {
  constructor(e, t) {
    S(this, z);
    S(this, $e);
    S(this, Me);
    v(this, "env", {});
    S(this, G);
    v(this, "finalized", false);
    v(this, "error");
    S(this, ye);
    S(this, K);
    S(this, M);
    S(this, Ie);
    S(this, ve);
    S(this, we);
    S(this, se);
    S(this, _e);
    S(this, Pe);
    v(this, "render", (...e2) => (d(this, ve) ?? y(this, ve, (t2) => this.html(t2)), d(this, ve).call(this, ...e2)));
    v(this, "setLayout", (e2) => y(this, Ie, e2));
    v(this, "getLayout", () => d(this, Ie));
    v(this, "setRenderer", (e2) => {
      y(this, ve, e2);
    });
    v(this, "header", (e2, t2, r) => {
      this.finalized && y(this, M, new Response(d(this, M).body, d(this, M)));
      const n = d(this, M) ? d(this, M).headers : d(this, se) ?? y(this, se, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    v(this, "status", (e2) => {
      y(this, ye, e2);
    });
    v(this, "set", (e2, t2) => {
      d(this, G) ?? y(this, G, /* @__PURE__ */ new Map()), d(this, G).set(e2, t2);
    });
    v(this, "get", (e2) => d(this, G) ? d(this, G).get(e2) : void 0);
    v(this, "newResponse", (...e2) => A(this, z, fe).call(this, ...e2));
    v(this, "body", (e2, t2, r) => A(this, z, fe).call(this, e2, t2, r));
    v(this, "text", (e2, t2, r) => !d(this, se) && !d(this, ye) && !t2 && !r && !this.finalized ? new Response(e2) : A(this, z, fe).call(this, e2, t2, Xe(ur, r)));
    v(this, "json", (e2, t2, r) => A(this, z, fe).call(this, JSON.stringify(e2), t2, Xe("application/json", r)));
    v(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => A(this, z, fe).call(this, s, t2, Xe("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? _t(e2, lr.Stringify, false, {}).then(n) : n(e2);
    });
    v(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    v(this, "notFound", () => (d(this, we) ?? y(this, we, () => new Response()), d(this, we).call(this, this)));
    y(this, $e, e), t && (y(this, K, t.executionCtx), this.env = t.env, y(this, we, t.notFoundHandler), y(this, Pe, t.path), y(this, _e, t.matchResult));
  }
  get req() {
    return d(this, Me) ?? y(this, Me, new $t(d(this, $e), d(this, Pe), d(this, _e))), d(this, Me);
  }
  get event() {
    if (d(this, K) && "respondWith" in d(this, K))
      return d(this, K);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, K))
      return d(this, K);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, M) || y(this, M, new Response(null, { headers: d(this, se) ?? y(this, se, new Headers()) }));
  }
  set res(e) {
    if (d(this, M) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, M).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = d(this, M).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    y(this, M, e), this.finalized = true;
  }
  get var() {
    return d(this, G) ? Object.fromEntries(d(this, G)) : {};
  }
}, "St"), $e = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), fe = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = d(this, M) ? new Headers(d(this, M).headers) : d(this, se) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, ye);
  return new Response(e, { status: s, headers: n });
}, "fe"), St);
var O = "ALL";
var hr = "all";
var fr = ["get", "post", "put", "delete", "options", "patch"];
var Pt = "Can not add a route since the matcher is already built.";
var Nt = /* @__PURE__ */ __name2(class extends Error {
}, "Nt");
var pr = "__COMPOSED_HANDLER";
var mr = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "mr");
var dt = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "dt");
var N;
var T;
var Dt;
var D;
var re;
var He;
var Le;
var Se;
var gr = (Se = /* @__PURE__ */ __name2(class {
  constructor(t = {}) {
    S(this, T);
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
    S(this, N, "/");
    v(this, "routes", []);
    S(this, D, mr);
    v(this, "errorHandler", dt);
    v(this, "onError", (t2) => (this.errorHandler = t2, this));
    v(this, "notFound", (t2) => (y(this, D, t2), this));
    v(this, "fetch", (t2, ...r) => A(this, T, Le).call(this, t2, r[1], r[0], t2.method));
    v(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${he("/", t2)}`, r), n2, s2)));
    v(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(A(this, T, Le).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...fr, hr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? y(this, N, a) : A(this, T, re).call(this, i, d(this, N), a), c.forEach((l) => {
        A(this, T, re).call(this, i, d(this, N), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        y(this, N, l);
        for (const o of [i].flat())
          c.map((u) => {
            A(this, T, re).call(this, o.toUpperCase(), d(this, N), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, N, i) : (y(this, N, "*"), a.unshift(i)), a.forEach((c) => {
      A(this, T, re).call(this, O, d(this, N), c);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Ot : ar;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === dt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await lt([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[pr] = s.handler), A(a = n, T, re).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = A(this, T, Dt).call(this);
    return r._basePath = he(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((l) => l, "s") : s = n.replaceRequest));
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
      const l = he(this._basePath, t), o = l === "/" ? 0 : l.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(o) || "/", new Request(h, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return A(this, T, re).call(this, O, he(t, "*"), c), this;
  }
}, "Se"), N = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), Dt = /* @__PURE__ */ __name2(function() {
  const t = new Se({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, y(t, D, d(this, D)), t.routes = this.routes, t;
}, "Dt"), D = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = he(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "re"), He = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "He"), Le = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await A(this, T, Le).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), c = new dr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: d(this, D) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await d(this, D).call(this, c);
      });
    } catch (u) {
      return A(this, T, He).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : d(this, D).call(this, c))).catch((u) => A(this, T, He).call(this, u, c)) : o ?? d(this, D).call(this, c);
  }
  const l = lt(a[0], this.errorHandler, d(this, D));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return A(this, T, He).call(this, o, c);
    }
  })();
}, "Le"), Se);
var Ht = [];
function xr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[O], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], Ht];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(e, t);
}
__name(xr, "xr");
__name2(xr, "xr");
var Je = "[^/]+";
var ke = ".*";
var Oe = "(?:|/.*)";
var pe = Symbol();
var yr = new Set(".\\+*[^]$()");
function vr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === ke || e === Oe ? 1 : t === ke || t === Oe ? -1 : e === Je ? 1 : t === Je ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(vr, "vr");
__name2(vr, "vr");
var ie;
var ae;
var H;
var le;
var wr = (le = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, ie);
    S(this, ae);
    S(this, H, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (d(this, ie) !== void 0)
        throw pe;
      if (i)
        return;
      y(this, ie, r);
      return;
    }
    const [a, ...c] = t, l = a === "*" ? c.length === 0 ? ["", "", ke] : ["", "", Je] : a === "/*" ? ["", "", Oe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let h = l[2] || Je;
      if (u && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw pe;
      if (o = d(this, H)[h], !o) {
        if (Object.keys(d(this, H)).some((f) => f !== ke && f !== Oe))
          throw pe;
        if (i)
          return;
        o = d(this, H)[h] = new le(), u !== "" && y(o, ae, s.varIndex++);
      }
      !i && u !== "" && n.push([u, d(o, ae)]);
    } else if (o = d(this, H)[a], !o) {
      if (Object.keys(d(this, H)).some((u) => u.length > 1 && u !== ke && u !== Oe))
        throw pe;
      if (i)
        return;
      o = d(this, H)[a] = new le();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, H)).sort(vr).map((n) => {
      const s = d(this, H)[n];
      return (typeof d(s, ae) == "number" ? `(${n})@${d(s, ae)}` : yr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof d(this, ie) == "number" && r.unshift(`#${d(this, ie)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "le"), ie = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), le);
var Be;
var Ne;
var bt;
var Sr = (bt = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, Be, { varIndex: 0 });
    S(this, Ne, new wr());
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
    return d(this, Ne).insert(i, t, n, d(this, Be), r), n;
  }
  buildRegExp() {
    let e = d(this, Ne).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "bt"), Be = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), bt);
var br = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var qe = /* @__PURE__ */ Object.create(null);
function Lt(e) {
  return qe[e] ?? (qe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Lt, "Lt");
__name2(Lt, "Lt");
function Er() {
  qe = /* @__PURE__ */ Object.create(null);
}
__name(Er, "Er");
__name2(Er, "Er");
function jr(e) {
  var o;
  const t = new Sr(), r = [];
  if (e.length === 0)
    return br;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [f, p]) => u ? 1 : f ? -1 : h.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, f = n.length; u < f; u++) {
    const [p, g, b] = n[u];
    p ? s[g] = [b.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), Ht] : h++;
    let x;
    try {
      x = t.insert(g, h, p);
    } catch (w) {
      throw w === pe ? new Nt(g) : w;
    }
    p || (r[h] = b.map(([w, m]) => {
      const E = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [k, j] = x[m];
        E[k] = j;
      }
      return [w, E];
    }));
  }
  const [i, a, c] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const g = (o = r[u][f]) == null ? void 0 : o[1];
      if (!g)
        continue;
      const b = Object.keys(g);
      for (let x = 0, w = b.length; x < w; x++)
        g[b[x]] = c[g[b[x]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(jr, "jr");
__name2(jr, "jr");
function de(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Lt(r).test(t))
        return [...e[r]];
  }
}
__name(de, "de");
__name2(de, "de");
var W;
var Y;
var Ue;
var qt;
var Et;
var Ar = (Et = /* @__PURE__ */ __name2(class {
  constructor() {
    S(this, Ue);
    v(this, "name", "RegExpRouter");
    S(this, W);
    S(this, Y);
    v(this, "match", xr);
    y(this, W, { [O]: /* @__PURE__ */ Object.create(null) }), y(this, Y, { [O]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var c;
    const n = d(this, W), s = d(this, Y);
    if (!n || !s)
      throw new Error(Pt);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[O]).forEach((o) => {
        l[e][o] = [...l[O][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = Lt(t);
      e === O ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = de(n[o], t) || de(n[O], t) || []);
      }) : (c = n[e])[t] || (c[t] = de(n[e], t) || de(n[O], t) || []), Object.keys(n).forEach((o) => {
        (e === O || e === o) && Object.keys(n[o]).forEach((u) => {
          l.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === O || e === o) && Object.keys(s[o]).forEach((u) => l.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Tt(t) || [t];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(s).forEach((h) => {
        var f;
        (e === O || e === h) && ((f = s[h])[u] || (f[u] = [...de(n[h], u) || de(n[O], u) || []]), s[h][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, Y)).concat(Object.keys(d(this, W))).forEach((t) => {
      e[t] || (e[t] = A(this, Ue, qt).call(this, t));
    }), y(this, W, y(this, Y, void 0)), Er(), e;
  }
}, "Et"), W = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakSet(), qt = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === O;
  return [d(this, W), d(this, Y)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== O && t.push(...Object.keys(n[O]).map((i) => [i, n[O][i]]));
  }), r ? jr(t) : null;
}, "qt"), Et);
var X;
var V;
var jt;
var kr = (jt = /* @__PURE__ */ __name2(class {
  constructor(e) {
    v(this, "name", "SmartRouter");
    S(this, X, []);
    S(this, V, []);
    y(this, X, e.routers);
  }
  add(e, t, r) {
    if (!d(this, V))
      throw new Error(Pt);
    d(this, V).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, V))
      throw new Error("Fatal error");
    const r = d(this, X), n = d(this, V), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(e, t);
      } catch (l) {
        if (l instanceof Nt)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), y(this, X, [c]), y(this, V, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, V) || d(this, X).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, X)[0];
  }
}, "jt"), X = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), jt);
var Ae = /* @__PURE__ */ Object.create(null);
var Q;
var R;
var oe;
var be;
var C;
var J;
var ne;
var Ee;
var Or = (Ee = /* @__PURE__ */ __name2(class {
  constructor(t, r, n) {
    S(this, J);
    S(this, Q);
    S(this, R);
    S(this, oe);
    S(this, be, 0);
    S(this, C, Ae);
    if (y(this, R, n || /* @__PURE__ */ Object.create(null)), y(this, Q, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, y(this, Q, [s]);
    }
    y(this, oe, []);
  }
  insert(t, r, n) {
    y(this, be, ++ct(this, be)._);
    let s = this;
    const i = tr(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], h = sr(o, u), f = Array.isArray(h) ? h[0] : o;
      if (f in d(s, R)) {
        s = d(s, R)[f], h && a.push(h[1]);
        continue;
      }
      d(s, R)[f] = new Ee(), h && (d(s, oe).push(h), a.push(h[1])), s = d(s, R)[f];
    }
    return d(s, Q).push({ [t]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: d(this, be) } }), s;
  }
  search(t, r) {
    var l;
    const n = [];
    y(this, C, Ae);
    let i = [this];
    const a = kt(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const h = a[o], f = o === u - 1, p = [];
      for (let g = 0, b = i.length; g < b; g++) {
        const x = i[g], w = d(x, R)[h];
        w && (y(w, C, d(x, C)), f ? (d(w, R)["*"] && n.push(...A(this, J, ne).call(this, d(w, R)["*"], t, d(x, C))), n.push(...A(this, J, ne).call(this, w, t, d(x, C)))) : p.push(w));
        for (let m = 0, E = d(x, oe).length; m < E; m++) {
          const k = d(x, oe)[m], j = d(x, C) === Ae ? {} : { ...d(x, C) };
          if (k === "*") {
            const L = d(x, R)["*"];
            L && (n.push(...A(this, J, ne).call(this, L, t, d(x, C))), y(L, C, j), p.push(L));
            continue;
          }
          const [F, I, _] = k;
          if (!h && !(_ instanceof RegExp))
            continue;
          const $ = d(x, R)[F], ee = a.slice(o).join("/");
          if (_ instanceof RegExp) {
            const L = _.exec(ee);
            if (L) {
              if (j[I] = L[0], n.push(...A(this, J, ne).call(this, $, t, d(x, C), j)), Object.keys(d($, R)).length) {
                y($, C, j);
                const te = ((l = L[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[te] || (c[te] = [])).push($);
              }
              continue;
            }
          }
          (_ === true || _.test(h)) && (j[I] = h, f ? (n.push(...A(this, J, ne).call(this, $, t, j, d(x, C))), d($, R)["*"] && n.push(...A(this, J, ne).call(this, d($, R)["*"], t, j, d(x, C)))) : (y($, C, j), p.push($)));
        }
      }
      i = p.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Ee"), Q = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakSet(), ne = /* @__PURE__ */ __name2(function(t, r, n, s) {
  const i = [];
  for (let a = 0, c = d(t, Q).length; a < c; a++) {
    const l = d(t, Q)[a], o = l[r] || l[O], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Ae || s && s !== Ae))
      for (let h = 0, f = o.possibleKeys.length; h < f; h++) {
        const p = o.possibleKeys[h], g = u[o.score];
        o.params[p] = s != null && s[p] && !g ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "ne"), Ee);
var ce;
var At;
var Tr = (At = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, "name", "TrieRouter");
    S(this, ce);
    y(this, ce, new Or());
  }
  add(e, t, r) {
    const n = Tt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        d(this, ce).insert(e, n[s], r);
      return;
    }
    d(this, ce).insert(e, t, r);
  }
  match(e, t) {
    return d(this, ce).search(e, t);
  }
}, "At"), ce = /* @__PURE__ */ new WeakMap(), At);
var Ft = /* @__PURE__ */ __name2(class extends gr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new kr({ routers: [new Ar(), new Tr()] });
  }
}, "Ft");
var Cr = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(h, f) {
      a.res.headers.set(h, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const h = await s(a.req.header("origin") || "", a);
      h.length && l("Access-Control-Allow-Methods", h.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const p = a.req.header("Access-Control-Request-Headers");
        p && (f = p.split(/\s*,\s*/));
      }
      return f != null && f.length && (l("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await c(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Cr");
var Rr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ht = /* @__PURE__ */ __name2((e, t = Mr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "ht");
var $r = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Mr = $r;
var Ir = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "Ir");
var Gt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var _r = Object.keys(Gt);
var Pr = "index.html";
var Nr = /* @__PURE__ */ __name2((e) => {
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
    let c = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(c) && (c = n(c, Pr));
    const l = e.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const g = e.mimes && ht(c, e.mimes) || ht(c);
      if (s.header("Content-Type", g || "application/octet-stream"), e.precompressed && (!g || Rr.test(g))) {
        const b = new Set((h = s.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((x) => x.trim()));
        for (const x of _r) {
          if (!b.has(x))
            continue;
          const w = await l(c + Gt[x], s);
          if (w) {
            o = w, s.header("Content-Encoding", x), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, c, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, c, s)), await i();
  };
}, "Nr");
var Dr = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Dr");
var Hr = /* @__PURE__ */ __name2((e) => async function(r, n) {
  return Nr({ ...e, getContent: async (i) => Dr(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Hr");
var Lr = /* @__PURE__ */ __name2((e) => Hr(e), "Lr");
var Kt = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function tt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(tt, "tt");
__name2(tt, "tt");
function qr(e) {
  return e.replace(/\s+/g, "").length;
}
__name(qr, "qr");
__name2(qr, "qr");
function Z(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.")).map((t) => t.trim()).filter(Boolean);
}
__name(Z, "Z");
__name2(Z, "Z");
function Fr(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(Fr, "Fr");
__name2(Fr, "Fr");
function je(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(je, "je");
__name2(je, "je");
function Qe(e, t, r) {
  const n = tt(e), i = tt(t) / Math.max(n, 1), a = Kt[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(Qe, "Qe");
__name2(Qe, "Qe");
function Gr(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD00\uB828 \uAC1C\uB150\uC758 \uC815\uC758\uC640 \uC8FC\uC694 \uD2B9\uC9D5\uC744 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uC120\uD589\uC5F0\uAD6C\uC5D0\uC11C\uB294 \uC774\uB7EC\uD55C \uAC1C\uB150\uC744 \uB2E4\uC591\uD55C \uAD00\uC810\uC5D0\uC11C \uADDC\uC815\uD574 \uC654\uB2E4", "\uBCF8 \uC5F0\uAD6C\uB294 \uC774\uB97C \uC885\uD569\uD558\uC5EC \uC791\uC5C5 \uC815\uC758\uB97C \uC81C\uC2DC\uD55C\uB2E4"] : ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function Kr(e, t, r) {
  let s = Z(t).slice();
  const i = Qe(e, s.join(". ") + ".", r);
  let a = i, c = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), c = true, a = Qe(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const l = Gr(r);
    for (const o of l)
      if (s.push(o), c = true, a = Qe(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: c, originalRatio: i.ratio };
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function Fe(e, t) {
  const r = Z(e);
  je(e);
  const n = qr(e), s = Kt[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), c = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", l = r.map((E, k) => {
    let j = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(E) && (j += 5), /(특징|특성|요인|측면|경향|양상)/.test(E) && (j += 4), /(연구|학자|선행|본|분석|종합)/.test(E) && (j += 3), /(차이|비교|대조|반면|이에 반해)/.test(E) && (j += 2), k === 0 && (j += 3), E.length < 20 && (j -= 2), E.length > 200 && (j -= 1), { sentence: E, score: j, index: k };
  }), o = t === "brief" ? 2 : t === "standard" ? 3 : 5, u = l.sort((E, k) => k.score - E.score || E.index - k.index).slice(0, o).sort((E, k) => E.index - k.index).map((E) => E.sentence);
  let h = "";
  t === "brief" ? h = u.slice(0, 3).join(" ") : t === "standard" ? h = u.slice(0, 5).join(" ") : h = u.join(" ");
  const f = ["\uC2A4\uC6E8\uB374", "\uD55C\uAD6D", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "OECD", "GDP"];
  for (const E of f)
    !e.includes(E) && h.includes(E) && (h = Z(h).filter((j) => !j.includes(E)).join(" "));
  h = h.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), h = h.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const p = Kr(e, h, t), g = p.text, b = tt(g), x = Z(g), w = x[0] || c, m = x.slice(1);
  for (; m.length < 3; )
    m.push("\uC6D0\uBB38\uC758 \uCD94\uAC00 \uADFC\uAC70\uB97C \uD3EC\uD568\uD55C\uB2E4");
  return { type: "narrative", level: t, text: g, charCount: b, ratio: p.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: p.adjusted, originalRatio: p.originalRatio, finalRatio: p.ratio, targetRatio: s.target }, coreClaim: w, grounds: m.slice(0, 5), comparisons: [], implications: [], warnings: [] };
}
__name(Fe, "Fe");
__name2(Fe, "Fe");
function Ge(e, t) {
  const r = Z(e), n = je(e), s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, s).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Ge, "Ge");
__name2(Ge, "Ge");
function Ke(e, t, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = t === "brief" || t === "standard" ? 2 : 4;
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(Ke, "Ke");
__name2(Ke, "Ke");
function Vr(e) {
  const t = Z(e), r = je(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function Jr(e, t) {
  const r = Z(e), n = t === "brief" ? 2 : t === "standard" ? 3 : 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const c = a * i, l = r.slice(c, c + i);
    if (l.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${l[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: l });
  }
  return s;
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function Br(e, t) {
  const r = je(e);
  Fr(e);
  const n = Z(e), s = t === "brief" ? 3 : t === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let c = 0; c < s && c < a.length; c++) {
    const l = a[c], o = Ur(l), u = n.find((h) => h.includes(l)) || `${l}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: l, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(Br, "Br");
__name2(Br, "Br");
function Ur(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(Ur, "Ur");
__name2(Ur, "Ur");
function Ve(e, t) {
  const r = Vr(e), n = Jr(e, t), s = Br(e, t), i = je(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: je(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], c = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), l = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: l, hierarchy: a, glossary: c, coreTerms: s };
}
__name(Ve, "Ve");
__name2(Ve, "Ve");
function Vt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(Vt, "Vt");
__name2(Vt, "Vt");
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
__name2(ft, "ft");
function zr(e) {
  const t = Fe(e, "detail"), r = Ve(e, "detail"), n = Ge(e, "detail"), s = Ke(t.text, "detail", "exam"), i = e.length, a = Vt(e), c = t.coreClaim, l = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let h = t.text;
  if (!h.includes(`

`)) {
    const w = h.split(". ").filter(Boolean), m = Math.ceil(w.length / 2);
    h = w.slice(0, m).join(". ") + `.

` + w.slice(m).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, g = r.glossary, b = { title: n.title, children: n.children.map((w) => ({ title: w.title, children: (w.children || []).map((m) => ({ title: m.title, pack: Array.isArray(m.pack) && m.pack.length >= 2 ? m.pack : [m.title, `${m.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: m.explain && m.explain.length >= 30 ? m.explain : `${m.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (b.children[0] || b.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); b.children[0].children.length < 3; ) {
    const w = b.children[0].children.length + 1;
    b.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${w}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${w}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const x = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: c, grounds: l, comparisons: o, implications: u, summaryDetail: h }, structured: { toc: f, hierarchy: p, glossary: g }, mindmap: b, selftest: x };
}
__name(zr, "zr");
__name2(zr, "zr");
function pt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(pt, "pt");
__name2(pt, "pt");
function Wr(e) {
  var i, a, c, l, o, u, h, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((c = e == null ? void 0 : e.narrative) != null && c.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = e == null ? void 0 : e.structured) == null ? void 0 : l.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const g of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(g.pack) && g.pack.length && n++, typeof g.explain == "string" && g.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((h = e == null ? void 0 : e.selftest) != null && h.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Wr, "Wr");
__name2(Wr, "Wr");
function Yr(e) {
  var o, u, h, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((o = e.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((h = e.detail.structured.glossary) == null ? void 0 : h.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let g = 0;
    for (const b of (p == null ? void 0 : p.children) || [])
      g += ((b == null ? void 0 : b.children) || []).length;
    return g;
  }, "i"), a = i(e.brief.mindmap.tree), c = i(e.standard.mindmap.tree), l = i(e.detail.mindmap.tree);
  return a === c && c === l || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${c}, detail:${l})`), t;
}
__name(Yr, "Yr");
__name2(Yr, "Yr");
async function mt(e, t) {
  var c, l, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((h) => h.text).join("")) || "";
}
__name(mt, "mt");
__name2(mt, "mt");
function Xr(e) {
  e.post("/api/matrix", async (t) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await t.req.json(), i = String(s.text || "").trim();
      if (!i)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = Vt(i), c = t.env.USE_MOCK === "true" || !t.env.GEMINI_API_KEY;
      let l = null;
      if (c)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), l = zr(i);
      else {
        const L = pt(i);
        let te = await mt(t, L);
        if (l = ft(te), !l) {
          const at = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", pt(i)].join(`
`);
          te = await mt(t, at), l = ft(te);
        }
        if (!l)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Wr(l);
      if (o.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const u = Fe(i, "brief"), h = Fe(i, "standard"), f = Fe(i, "detail"), p = Ve(i, "brief"), g = Ve(i, "standard"), b = Ve(i, "detail"), x = Ge(i, "brief"), w = Ge(i, "standard"), m = Ge(i, "detail"), E = Ke(i, "brief", "preview"), k = Ke(i, "standard", "preview"), j = Ke(i, "detail", "preview"), F = { narrative: { text: u.text, coreClaim: u.coreClaim, grounds: u.grounds, comparisons: u.comparisons, implications: u.implications, ratio: u.ratio, ratioEnforcement: u.ratioEnforcement, targetRange: u.targetRange }, structured: p, mindmap: x, selftest: E }, I = { narrative: { text: h.text, coreClaim: h.coreClaim, grounds: h.grounds, comparisons: h.comparisons, implications: h.implications, ratio: h.ratio, ratioEnforcement: h.ratioEnforcement, targetRange: h.targetRange }, structured: g, mindmap: w, selftest: k }, _ = { narrative: { text: f.text, coreClaim: f.coreClaim, grounds: f.grounds, comparisons: f.comparisons, implications: f.implications, ratio: f.ratio, ratioEnforcement: f.ratioEnforcement, targetRange: f.targetRange }, structured: b, mindmap: m, selftest: j }, $ = Yr({ brief: F, standard: I, detail: _ });
      if ($.length && c === false)
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: $.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      const ee = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: F, standard: I, detail: _ }, views: { narrative: { brief: F.narrative, standard: I.narrative, detail: _.narrative }, structured: { brief: F.structured, standard: I.structured, detail: _.structured }, mindmap: { brief: F.mindmap, standard: I.mindmap, detail: _.mindmap }, selftest: { brief: F.selftest, standard: I.selftest, detail: _.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return t.json(ee, 200);
    } catch (s) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => gn), n = await t.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return t.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return t.json(a, 200);
    } catch (r) {
      return t.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  });
}
__name(Xr, "Xr");
__name2(Xr, "Xr");
var q = new Ft();
q.use("/api/*", Cr());
q.use("/static/*", Lr({ root: "./public" }));
Xr(q);
function Te() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Te, "Te");
__name2(Te, "Te");
function st(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(st, "st");
__name2(st, "st");
function Qr(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Qr, "Qr");
__name2(Qr, "Qr");
function Zr(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Zr, "Zr");
__name2(Zr, "Zr");
function en(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(en, "en");
__name2(en, "en");
function tn(e, t) {
  const r = Math.max(60, ge(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(tn, "tn");
__name2(tn, "tn");
function rn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = en((e == null ? void 0 : e.viewType) || "narrative"), n = Zr(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: c } = tn(t), l = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), h = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), g = `
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
`.trim(), b = `
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
  let x = f;
  return r === "structured" ? x = p : r === "mindmap" ? x = g : r === "selftest" && (x = b), `${h}

${x}`;
}
__name(rn, "rn");
__name2(rn, "rn");
function ue(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(ue, "ue");
__name2(ue, "ue");
function ze(e) {
  const t = ue(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(ze, "ze");
__name2(ze, "ze");
function nn(e) {
  const t = ue(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(nn, "nn");
__name2(nn, "nn");
function it(e) {
  const t = ue(e).split(`
`), r = nn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: ue(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : t.length, o = i.title, u = t.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(it, "it");
__name2(it, "it");
function sn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(sn, "sn");
__name2(sn, "sn");
function me(e, t) {
  const n = ze(e).map((i, a) => ({ s: i, i: a, score: sn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Qr(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(me, "me");
__name2(me, "me");
function ge(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(ge, "ge");
__name2(ge, "ge");
var rt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function gt(e, t, r) {
  const n = Math.max(60, ge(e)), s = ge(t), i = Math.floor(n * rt[r].min), a = Math.ceil(n * rt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(gt, "gt");
__name2(gt, "gt");
function Ce(e, t, r) {
  const n = Math.max(60, ge(e)), s = Math.ceil(n * rt[r].max);
  let i = String(t || "").trim();
  if (ge(i) <= s)
    return i;
  const a = ze(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (ge(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
function Ze(e, t) {
  return `${e}_${t}`;
}
__name(Ze, "Ze");
__name2(Ze, "Ze");
function an(e) {
  const t = it(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = Ze("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = me(s.body, 6), o = [];
    for (const m of l)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((k) => {
        const j = k.replace(/[()]/g, "").trim();
        j.length >= 2 && j.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(j) && o.push(j);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const h = Array.from(u.entries()).sort((m, E) => E[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = me(s.body, 3).join(" "), p = me(s.body, 2).join(" "), g = me(s.body, 1).join(" "), b = { id: Ze(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: h, explain: f, explainStandard: p, explainBrief: g, children: [] };
    h.forEach((m) => {
      n.has(m) || n.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${me(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = ze(s.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    w.length && b.children.push({ id: Ze(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(b), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(an, "an");
__name2(an, "an");
function Jt(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Jt, "Jt");
__name2(Jt, "Jt");
function on(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (Jt(t, n).children || []).map((u) => {
    const h = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(h == null ? void 0 : h.pack) ? h.pack : typeof (h == null ? void 0 : h.pack) == "string" ? [h.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (h == null ? void 0 : h.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: Ce(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, h) => o.push(`  ${h + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, h) => {
    var f;
    o.push(`  ${h + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Ce(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(on, "on");
__name2(on, "on");
function cn(e, t) {
  const r = it(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...me(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return Ce(e, i, t);
}
__name(cn, "cn");
__name2(cn, "cn");
function ln(e, t) {
  it(e);
  const r = ze(e), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(ln, "ln");
__name2(ln, "ln");
function un(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const c = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((g) => g.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let h = 0;
    u.forEach((g) => {
      c.includes(g) && h++;
    });
    const f = h >= 2 || c.length >= 30, p = f ? 1 : h === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: h });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(un, "un");
__name2(un, "un");
function xt(e) {
  const t = ue(e), { tree: r, glossary: n } = an(t), s = { originalMeta: { textHash: st(t), chars: t.length, ts: Te() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = cn(t, i), c = on(t, r, n, i), l = Jt(r, i), o = ln(t), h = gt(t, a, i).ok ? a : Ce(t, a, i), f = c.renderText || "", p = gt(t, f, i);
    c.renderText = p.ok ? f : Ce(t, f, i), s.modes[i] = { narrative: h, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(xt, "xt");
__name2(xt, "xt");
q.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Te(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
q.post("/api/engine", async (e) => {
  var p, g, b, x, w, m, E;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), c = (t == null ? void 0 : t.useGemini) === true, l = ue(r);
  if (l.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && e.env.GEMINI_API_KEY)
    try {
      const k = rn({ text: l, viewType: s, level: "detail", grade: i, subject: a }), j = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", I = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${j}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: k }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), $ = (((w = (x = (b = (g = (p = I == null ? void 0 : I.candidates) == null ? void 0 : p[0]) == null ? void 0 : g.content) == null ? void 0 : b.parts) == null ? void 0 : x[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if ($) {
        const ee = JSON.parse($[0]);
        u = { originalMeta: { textHash: st(l), chars: l.length, ts: Te() }, modes: { detail: { [s]: ee }, standard: { [s]: ee }, brief: { [s]: ee } } }, o = "gemini-" + j;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (k) {
      console.error("[Gemini Error]", k), u = xt(l), o = "v5-local-fallback";
    }
  else
    u = xt(l);
  const h = (E = (m = u.modes) == null ? void 0 : m[n]) == null ? void 0 : E[s], f = { engine: o, mode: n, viewType: s, ts: Te(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: h, allSummaries: u.modes, meta: f });
});
q.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = un(r, n);
  return e.json({ ok: true, result: s });
});
q.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = ue(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = Te(), l = st(s), o = JSON.stringify(i);
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
q.get("/api/loadSummary", async (e) => {
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
q.get("/", (e) => e.redirect("/static/v5.html"));
var yt = new Ft();
var dn = Object.assign({ "/src/index.tsx": q });
var Bt = false;
for (const [, e] of Object.entries(dn))
  e && (yt.route("/", e), yt.notFound(e.notFoundHandler), Bt = true);
if (!Bt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Re(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Re, "Re");
__name2(Re, "Re");
function vt(e, t) {
  const r = Re(e);
  return t.some((n) => r.includes(Re(n)));
}
__name(vt, "vt");
__name2(vt, "vt");
function hn(e, t) {
  const r = Re(e);
  return t.every((n) => r.includes(Re(n)));
}
__name(hn, "hn");
__name2(hn, "hn");
function fn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(fn, "fn");
__name2(fn, "fn");
function pn(e, t, r) {
  var g, b, x, w;
  const n = Re(t), s = 100;
  if (!n) {
    const m = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, E = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: m, explanationToShow: E };
  }
  const i = ((g = e.rubric) == null ? void 0 : g.mustIncludeAny) || [], a = ((b = e.rubric) == null ? void 0 : b.mustIncludeAll) || [], c = ((x = e.rubric) == null ? void 0 : x.forbid) || [], l = (w = e.rubric) == null ? void 0 : w.maxChars;
  let o = 100, u = [];
  l && n.length > l && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${l}`)), c.length && vt(n, c) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !hn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !vt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = fn(o, 0, 100);
  const h = o >= 90, f = !h && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !h && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !h && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: h, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: h ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(pn, "pn");
__name2(pn, "pn");
function mn(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((l) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[l.id]) ?? "";
    return pn(l, o, r);
  }), s = Math.round(n.reduce((l, o) => l + o.score, 0) / Math.max(1, n.length)), i = n.filter((l) => !l.correct).map((l) => l.id), a = s >= e.masteryScore;
  let c = "";
  return a ? c = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? c = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? c = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : c = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: c } };
}
__name(mn, "mn");
__name2(mn, "mn");
var gn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: mn }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = yt;
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

// .wrangler/tmp/pages-cu9him/pjjg4lm851n.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/app.html", "/favicon.ico", "/index.html", "/static/*", "/v5.html"] };
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

// .wrangler/tmp/bundle-6t45lj/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-6t45lj/middleware-loader.entry.ts
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
//# sourceMappingURL=pjjg4lm851n.js.map
