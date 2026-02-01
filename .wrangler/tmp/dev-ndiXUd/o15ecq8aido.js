var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-cwUeek/checked-fetch.js
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

// .wrangler/tmp/bundle-cwUeek/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-NOjitN/bundledWorker-0.6572651444745172.mjs
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
var Ht = Object.defineProperty;
var et = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "et");
var Lt = /* @__PURE__ */ __name2((t, e, r) => e in t ? Ht(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "Lt");
var x = /* @__PURE__ */ __name2((t, e, r) => Lt(t, typeof e != "symbol" ? e + "" : e, r), "x");
var Je = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || et("Cannot " + r), "Je");
var h = /* @__PURE__ */ __name2((t, e, r) => (Je(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var w = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? et("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "w");
var g = /* @__PURE__ */ __name2((t, e, r, s) => (Je(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r), "g");
var j = /* @__PURE__ */ __name2((t, e, r) => (Je(t, e, "access private method"), r), "j");
var tt = /* @__PURE__ */ __name2((t, e, r, s) => ({ set _(n) {
  g(t, e, n, r);
}, get _() {
  return h(t, e, s);
} }), "tt");
var rt = /* @__PURE__ */ __name2((t, e, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let c, o = false, u;
    if (t[l] ? (u = t[l][0][0], s.req.routeIndex = l) : u = l === t.length && n || void 0, u)
      try {
        c = await u(s, () => a(l + 1));
      } catch (d) {
        if (d instanceof Error && e)
          s.error = d, c = await e(d, s), o = true;
        else
          throw d;
      }
    else
      s.finalized === false && r && (c = await r(s));
    return c && (s.finalized === false || o) && (s.res = c), s;
  }
  __name(a, "a");
  __name2(a, "a");
}, "rt");
var qt = Symbol();
var Ft = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = e, i = (t instanceof Et ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Gt(t, { all: r, dot: s }) : {};
}, "Ft");
async function Gt(t, e) {
  const r = await t.formData();
  return r ? Kt(r, e) : {};
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function Kt(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((s, n) => {
    e.all || n.endsWith("[]") ? Jt(r, n, s) : r[n] = s;
  }), e.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (Vt(r, s, n), delete r[s]);
  }), r;
}
__name(Kt, "Kt");
__name2(Kt, "Kt");
var Jt = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Jt");
var Vt = /* @__PURE__ */ __name2((t, e, r) => {
  let s = t;
  const n = e.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "Vt");
var yt = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "yt");
var Bt = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = zt(t), s = yt(r);
  return Ut(s, e);
}, "Bt");
var zt = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return e.push([n, r]), n;
  }), { groups: e, path: t };
}, "zt");
var Ut = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [s] = e[r];
    for (let n = t.length - 1; n >= 0; n--)
      if (t[n].includes(s)) {
        t[n] = t[n].replace(s, e[r][1]);
        break;
      }
  }
  return t;
}, "Ut");
var De = {};
var Wt = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${t}#${e}`;
    return De[s] || (r[2] ? De[s] = e && e[0] !== ":" && e[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : De[s] = [t, r[1], true]), De[s];
  }
  return null;
}, "Wt");
var Xe = /* @__PURE__ */ __name2((t, e) => {
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
}, "Xe");
var Yt = /* @__PURE__ */ __name2((t) => Xe(t, decodeURI), "Yt");
var vt = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let s = r;
  for (; s < e.length; s++) {
    const n = e.charCodeAt(s);
    if (n === 37) {
      const i = e.indexOf("?", s), a = e.slice(r, i === -1 ? void 0 : i);
      return Yt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63)
      break;
  }
  return e.slice(r, s);
}, "vt");
var Xt = /* @__PURE__ */ __name2((t) => {
  const e = vt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "Xt");
var de = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = de(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "de");
var wt = /* @__PURE__ */ __name2((t) => {
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
}, "wt");
var Ve = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Xe(t, St) : t) : t, "Ve");
var bt = /* @__PURE__ */ __name2((t, e, r) => {
  let s;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const l = t.charCodeAt(a + e.length + 1);
      if (l === 61) {
        const c = a + e.length + 2, o = t.indexOf("&", c);
        return Ve(t.slice(c, o === -1 ? void 0 : o));
      } else if (l == 38 || isNaN(l))
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
    let l = t.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let c = t.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (s && (c = Ve(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = t.slice(l + 1, a === -1 ? void 0 : a), s && (o = Ve(o))), r ? (n[c] && Array.isArray(n[c]) || (n[c] = []), n[c].push(o)) : n[c] ?? (n[c] = o);
  }
  return e ? n[e] : n;
}, "bt");
var Qt = bt;
var Zt = /* @__PURE__ */ __name2((t, e) => bt(t, e, true), "Zt");
var St = decodeURIComponent;
var st = /* @__PURE__ */ __name2((t) => Xe(t, St), "st");
var xe;
var H;
var z;
var jt;
var Ot;
var We;
var W;
var dt;
var Et = (dt = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    w(this, z);
    x(this, "raw");
    w(this, xe);
    w(this, H);
    x(this, "routeIndex", 0);
    x(this, "path");
    x(this, "bodyCache", {});
    w(this, W, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, s = e2[t2];
      if (s)
        return s;
      const n = Object.keys(e2)[0];
      return n ? e2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, g(this, H, r), g(this, xe, {});
  }
  param(t) {
    return t ? j(this, z, jt).call(this, t) : j(this, z, Ot).call(this);
  }
  query(t) {
    return Qt(this.url, t);
  }
  queries(t) {
    return Zt(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await Ft(this, t));
  }
  json() {
    return h(this, W).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return h(this, W).call(this, "text");
  }
  arrayBuffer() {
    return h(this, W).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, W).call(this, "blob");
  }
  formData() {
    return h(this, W).call(this, "formData");
  }
  addValidatedData(t, e) {
    h(this, xe)[t] = e;
  }
  valid(t) {
    return h(this, xe)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [qt]() {
    return h(this, H);
  }
  get matchedRoutes() {
    return h(this, H)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, H)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "dt"), xe = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), jt = /* @__PURE__ */ __name2(function(t) {
  const e = h(this, H)[0][this.routeIndex][1][t], r = j(this, z, We).call(this, e);
  return r && /\%/.test(r) ? st(r) : r;
}, "jt"), Ot = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(h(this, H)[0][this.routeIndex][1]);
  for (const r of e) {
    const s = j(this, z, We).call(this, h(this, H)[0][this.routeIndex][1][r]);
    s !== void 0 && (t[r] = /\%/.test(s) ? st(s) : s);
  }
  return t;
}, "Ot"), We = /* @__PURE__ */ __name2(function(t) {
  return h(this, H)[1] ? h(this, H)[1][t] : t;
}, "We"), W = /* @__PURE__ */ new WeakMap(), dt);
var er = { Stringify: 1 };
var Tt = /* @__PURE__ */ __name2(async (t, e, r, s, n) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (n ? n[0] += t : n = [t], Promise.all(i.map((l) => l({ phase: e, buffer: n, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((c) => Tt(c, e, false, s, n))).then(() => n[0]))) : Promise.resolve(t);
}, "Tt");
var tr = "text/plain; charset=UTF-8";
var Be = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "Be");
var $e;
var Ie;
var K;
var ye;
var J;
var D;
var Re;
var ve;
var we;
var se;
var Ce;
var Pe;
var Y;
var fe;
var ft;
var rr = (ft = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    w(this, Y);
    w(this, $e);
    w(this, Ie);
    x(this, "env", {});
    w(this, K);
    x(this, "finalized", false);
    x(this, "error");
    w(this, ye);
    w(this, J);
    w(this, D);
    w(this, Re);
    w(this, ve);
    w(this, we);
    w(this, se);
    w(this, Ce);
    w(this, Pe);
    x(this, "render", (...t2) => (h(this, ve) ?? g(this, ve, (e2) => this.html(e2)), h(this, ve).call(this, ...t2)));
    x(this, "setLayout", (t2) => g(this, Re, t2));
    x(this, "getLayout", () => h(this, Re));
    x(this, "setRenderer", (t2) => {
      g(this, ve, t2);
    });
    x(this, "header", (t2, e2, r) => {
      this.finalized && g(this, D, new Response(h(this, D).body, h(this, D)));
      const s = h(this, D) ? h(this, D).headers : h(this, se) ?? g(this, se, new Headers());
      e2 === void 0 ? s.delete(t2) : r != null && r.append ? s.append(t2, e2) : s.set(t2, e2);
    });
    x(this, "status", (t2) => {
      g(this, ye, t2);
    });
    x(this, "set", (t2, e2) => {
      h(this, K) ?? g(this, K, /* @__PURE__ */ new Map()), h(this, K).set(t2, e2);
    });
    x(this, "get", (t2) => h(this, K) ? h(this, K).get(t2) : void 0);
    x(this, "newResponse", (...t2) => j(this, Y, fe).call(this, ...t2));
    x(this, "body", (t2, e2, r) => j(this, Y, fe).call(this, t2, e2, r));
    x(this, "text", (t2, e2, r) => !h(this, se) && !h(this, ye) && !e2 && !r && !this.finalized ? new Response(t2) : j(this, Y, fe).call(this, t2, e2, Be(tr, r)));
    x(this, "json", (t2, e2, r) => j(this, Y, fe).call(this, JSON.stringify(t2), e2, Be("application/json", r)));
    x(this, "html", (t2, e2, r) => {
      const s = /* @__PURE__ */ __name2((n) => j(this, Y, fe).call(this, n, e2, Be("text/html; charset=UTF-8", r)), "s");
      return typeof t2 == "object" ? Tt(t2, er.Stringify, false, {}).then(s) : s(t2);
    });
    x(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    x(this, "notFound", () => (h(this, we) ?? g(this, we, () => new Response()), h(this, we).call(this, this)));
    g(this, $e, t), e && (g(this, J, e.executionCtx), this.env = e.env, g(this, we, e.notFoundHandler), g(this, Pe, e.path), g(this, Ce, e.matchResult));
  }
  get req() {
    return h(this, Ie) ?? g(this, Ie, new Et(h(this, $e), h(this, Pe), h(this, Ce))), h(this, Ie);
  }
  get event() {
    if (h(this, J) && "respondWith" in h(this, J))
      return h(this, J);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, J))
      return h(this, J);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, D) || g(this, D, new Response(null, { headers: h(this, se) ?? g(this, se, new Headers()) }));
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
    return h(this, K) ? Object.fromEntries(h(this, K)) : {};
  }
}, "ft"), $e = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakSet(), fe = /* @__PURE__ */ __name2(function(t, e, r) {
  const s = h(this, D) ? new Headers(h(this, D).headers) : h(this, se) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, l] of i)
      a.toLowerCase() === "set-cookie" ? s.append(a, l) : s.set(a, l);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        s.set(i, a);
      else {
        s.delete(i);
        for (const l of a)
          s.append(i, l);
      }
  const n = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, ye);
  return new Response(t, { status: n, headers: s });
}, "fe"), ft);
var A = "ALL";
var sr = "all";
var nr = ["get", "post", "put", "delete", "options", "patch"];
var At = "Can not add a route since the matcher is already built.";
var kt = /* @__PURE__ */ __name2(class extends Error {
}, "kt");
var ir = "__COMPOSED_HANDLER";
var ar = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "ar");
var nt = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "nt");
var L;
var k;
var $t;
var q;
var te;
var Ne;
var He;
var be;
var or = (be = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    w(this, k);
    x(this, "get");
    x(this, "post");
    x(this, "put");
    x(this, "delete");
    x(this, "options");
    x(this, "patch");
    x(this, "all");
    x(this, "on");
    x(this, "use");
    x(this, "router");
    x(this, "getPath");
    x(this, "_basePath", "/");
    w(this, L, "/");
    x(this, "routes", []);
    w(this, q, ar);
    x(this, "errorHandler", nt);
    x(this, "onError", (e2) => (this.errorHandler = e2, this));
    x(this, "notFound", (e2) => (g(this, q, e2), this));
    x(this, "fetch", (e2, ...r) => j(this, k, He).call(this, e2, r[1], r[0], e2.method));
    x(this, "request", (e2, r, s2, n2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, s2, n2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${de("/", e2)}`, r), s2, n2)));
    x(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(j(this, k, He).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...nr, sr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? g(this, L, a) : j(this, k, te).call(this, i, h(this, L), a), l.forEach((c) => {
        j(this, k, te).call(this, i, h(this, L), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        g(this, L, c);
        for (const o of [i].flat())
          l.map((u) => {
            j(this, k, te).call(this, o.toUpperCase(), h(this, L), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? g(this, L, i) : (g(this, L, "*"), a.unshift(i)), a.forEach((l) => {
      j(this, k, te).call(this, A, h(this, L), l);
    }), this);
    const { strict: s, ...n } = e;
    Object.assign(this, n), this.getPath = s ?? true ? e.getPath ?? vt : Xt;
  }
  route(e, r) {
    const s = this.basePath(e);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === nt ? i = n.handler : (i = /* @__PURE__ */ __name2(async (l, c) => (await rt([], r.errorHandler)(l, () => n.handler(l, c))).res, "i"), i[ir] = n.handler), j(a = s, k, te).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(e) {
    const r = j(this, k, $t).call(this);
    return r._basePath = de(this._basePath, e), r;
  }
  mount(e, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name2((c) => c, "n") : n = s.replaceRequest));
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
    n || (n = (() => {
      const c = de(this._basePath, e), o = c === "/" ? 0 : c.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const l = /* @__PURE__ */ __name2(async (c, o) => {
      const u = await r(n(c.req.raw), ...a(c));
      if (u)
        return u;
      await o();
    }, "l");
    return j(this, k, te).call(this, A, de(e, "*"), l), this;
  }
}, "be"), L = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakSet(), $t = /* @__PURE__ */ __name2(function() {
  const e = new be({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, g(e, q, h(this, q)), e.routes = this.routes, e;
}, "$t"), q = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ __name2(function(e, r, s) {
  e = e.toUpperCase(), r = de(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: e, handler: s };
  this.router.add(e, r, [s, n]), this.routes.push(n);
}, "te"), Ne = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Ne"), He = /* @__PURE__ */ __name2(function(e, r, s, n) {
  if (n === "HEAD")
    return (async () => new Response(null, await j(this, k, He).call(this, e, r, s, "GET")))();
  const i = this.getPath(e, { env: s }), a = this.router.match(n, i), l = new rr(e, { path: i, matchResult: a, env: s, executionCtx: r, notFoundHandler: h(this, q) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, q).call(this, l);
      });
    } catch (u) {
      return j(this, k, Ne).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, q).call(this, l))).catch((u) => j(this, k, Ne).call(this, u, l)) : o ?? h(this, q).call(this, l);
  }
  const c = rt(a[0], this.errorHandler, h(this, q));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return j(this, k, Ne).call(this, o, l);
    }
  })();
}, "He"), be);
var It = [];
function cr(t, e) {
  const r = this.buildAllMatchers(), s = /* @__PURE__ */ __name2((n, i) => {
    const a = r[n] || r[A], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], It];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "s");
  return this.match = s, s(t, e);
}
__name(cr, "cr");
__name2(cr, "cr");
var qe = "[^/]+";
var Oe = ".*";
var Te = "(?:|/.*)";
var pe = Symbol();
var lr = new Set(".\\+*[^]$()");
function ur(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Oe || t === Te ? 1 : e === Oe || e === Te ? -1 : t === qe ? 1 : e === qe ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(ur, "ur");
__name2(ur, "ur");
var ne;
var ie;
var F;
var ce;
var hr = (ce = /* @__PURE__ */ __name2(class {
  constructor() {
    w(this, ne);
    w(this, ie);
    w(this, F, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, s, n, i) {
    if (e.length === 0) {
      if (h(this, ne) !== void 0)
        throw pe;
      if (i)
        return;
      g(this, ne, r);
      return;
    }
    const [a, ...l] = e, c = a === "*" ? l.length === 0 ? ["", "", Oe] : ["", "", qe] : a === "/*" ? ["", "", Te] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || qe;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw pe;
      if (o = h(this, F)[d], !o) {
        if (Object.keys(h(this, F)).some((f) => f !== Oe && f !== Te))
          throw pe;
        if (i)
          return;
        o = h(this, F)[d] = new ce(), u !== "" && g(o, ie, n.varIndex++);
      }
      !i && u !== "" && s.push([u, h(o, ie)]);
    } else if (o = h(this, F)[a], !o) {
      if (Object.keys(h(this, F)).some((u) => u.length > 1 && u !== Oe && u !== Te))
        throw pe;
      if (i)
        return;
      o = h(this, F)[a] = new ce();
    }
    o.insert(l, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, F)).sort(ur).map((s) => {
      const n = h(this, F)[s];
      return (typeof h(n, ie) == "number" ? `(${s})@${h(n, ie)}` : lr.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof h(this, ne) == "number" && r.unshift(`#${h(this, ne)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ce"), ne = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), ce);
var Fe;
var Me;
var pt;
var dr = (pt = /* @__PURE__ */ __name2(class {
  constructor() {
    w(this, Fe, { varIndex: 0 });
    w(this, Me, new hr());
  }
  insert(t, e, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let l = false;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const o = `@\\${a}`;
        return n[a] = [o, c], a++, l = true, o;
      }), !l)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [l] = n[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(l) !== -1) {
          i[c] = i[c].replace(l, n[a][1]);
          break;
        }
    }
    return h(this, Me).insert(i, e, s, h(this, Fe), r), s;
  }
  buildRegExp() {
    let t = h(this, Me).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, s];
  }
}, "pt"), Fe = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), pt);
var fr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Le = /* @__PURE__ */ Object.create(null);
function Rt(t) {
  return Le[t] ?? (Le[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Rt, "Rt");
__name2(Rt, "Rt");
function pr() {
  Le = /* @__PURE__ */ Object.create(null);
}
__name(pr, "pr");
__name2(pr, "pr");
function mr(t) {
  var o;
  const e = new dr(), r = [];
  if (t.length === 0)
    return fr;
  const s = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), n = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = s.length; u < f; u++) {
    const [p, v, O] = s[u];
    p ? n[v] = [O.map(([E]) => [E, /* @__PURE__ */ Object.create(null)]), It] : d++;
    let y;
    try {
      y = e.insert(v, d, p);
    } catch (E) {
      throw E === pe ? new kt(v) : E;
    }
    p || (r[d] = O.map(([E, m]) => {
      const C = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [N, T] = y[m];
        C[N] = T;
      }
      return [E, C];
    }));
  }
  const [i, a, l] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const v = (o = r[u][f]) == null ? void 0 : o[1];
      if (!v)
        continue;
      const O = Object.keys(v);
      for (let y = 0, E = O.length; y < E; y++)
        v[O[y]] = l[v[O[y]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, n];
}
__name(mr, "mr");
__name2(mr, "mr");
function he(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((s, n) => n.length - s.length))
      if (Rt(r).test(e))
        return [...t[r]];
  }
}
__name(he, "he");
__name2(he, "he");
var X;
var Q;
var Ge;
var Ct;
var mt;
var gr = (mt = /* @__PURE__ */ __name2(class {
  constructor() {
    w(this, Ge);
    x(this, "name", "RegExpRouter");
    w(this, X);
    w(this, Q);
    x(this, "match", cr);
    g(this, X, { [A]: /* @__PURE__ */ Object.create(null) }), g(this, Q, { [A]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var l;
    const s = h(this, X), n = h(this, Q);
    if (!s || !n)
      throw new Error(At);
    s[t] || [s, n].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[A]).forEach((o) => {
        c[t][o] = [...c[A][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Rt(e);
      t === A ? Object.keys(s).forEach((o) => {
        var u;
        (u = s[o])[e] || (u[e] = he(s[o], e) || he(s[A], e) || []);
      }) : (l = s[t])[e] || (l[e] = he(s[t], e) || he(s[A], e) || []), Object.keys(s).forEach((o) => {
        (t === A || t === o) && Object.keys(s[o]).forEach((u) => {
          c.test(u) && s[o][u].push([r, i]);
        });
      }), Object.keys(n).forEach((o) => {
        (t === A || t === o) && Object.keys(n[o]).forEach((u) => c.test(u) && n[o][u].push([r, i]));
      });
      return;
    }
    const a = wt(e) || [e];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(n).forEach((d) => {
        var f;
        (t === A || t === d) && ((f = n[d])[u] || (f[u] = [...he(s[d], u) || he(s[A], u) || []]), n[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Q)).concat(Object.keys(h(this, X))).forEach((e) => {
      t[e] || (t[e] = j(this, Ge, Ct).call(this, e));
    }), g(this, X, g(this, Q, void 0)), pr(), t;
  }
}, "mt"), X = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakSet(), Ct = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === A;
  return [h(this, X), h(this, Q)].forEach((s) => {
    const n = s[t] ? Object.keys(s[t]).map((i) => [i, s[t][i]]) : [];
    n.length !== 0 ? (r || (r = true), e.push(...n)) : t !== A && e.push(...Object.keys(s[A]).map((i) => [i, s[A][i]]));
  }), r ? mr(e) : null;
}, "Ct"), mt);
var Z;
var V;
var gt;
var xr = (gt = /* @__PURE__ */ __name2(class {
  constructor(t) {
    x(this, "name", "SmartRouter");
    w(this, Z, []);
    w(this, V, []);
    g(this, Z, t.routers);
  }
  add(t, e, r) {
    if (!h(this, V))
      throw new Error(At);
    h(this, V).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, V))
      throw new Error("Fatal error");
    const r = h(this, Z), s = h(this, V), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = s.length; c < o; c++)
          l.add(...s[c]);
        a = l.match(t, e);
      } catch (c) {
        if (c instanceof kt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), g(this, Z, [l]), g(this, V, void 0);
      break;
    }
    if (i === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, V) || h(this, Z).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, Z)[0];
  }
}, "gt"), Z = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), gt);
var je = /* @__PURE__ */ Object.create(null);
var ee;
var _;
var ae;
var Se;
var R;
var B;
var re;
var Ee;
var yr = (Ee = /* @__PURE__ */ __name2(class {
  constructor(e, r, s) {
    w(this, B);
    w(this, ee);
    w(this, _);
    w(this, ae);
    w(this, Se, 0);
    w(this, R, je);
    if (g(this, _, s || /* @__PURE__ */ Object.create(null)), g(this, ee, []), e && r) {
      const n = /* @__PURE__ */ Object.create(null);
      n[e] = { handler: r, possibleKeys: [], score: 0 }, g(this, ee, [n]);
    }
    g(this, ae, []);
  }
  insert(e, r, s) {
    g(this, Se, ++tt(this, Se)._);
    let n = this;
    const i = Bt(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = Wt(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(n, _)) {
        n = h(n, _)[f], d && a.push(d[1]);
        continue;
      }
      h(n, _)[f] = new Ee(), d && (h(n, ae).push(d), a.push(d[1])), n = h(n, _)[f];
    }
    return h(n, ee).push({ [e]: { handler: s, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, Se) } }), n;
  }
  search(e, r) {
    var c;
    const s = [];
    g(this, R, je);
    let i = [this];
    const a = yt(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let v = 0, O = i.length; v < O; v++) {
        const y = i[v], E = h(y, _)[d];
        E && (g(E, R, h(y, R)), f ? (h(E, _)["*"] && s.push(...j(this, B, re).call(this, h(E, _)["*"], e, h(y, R))), s.push(...j(this, B, re).call(this, E, e, h(y, R)))) : p.push(E));
        for (let m = 0, C = h(y, ae).length; m < C; m++) {
          const N = h(y, ae)[m], T = h(y, R) === je ? {} : { ...h(y, R) };
          if (N === "*") {
            const I = h(y, _)["*"];
            I && (s.push(...j(this, B, re).call(this, I, e, h(y, R))), g(I, R, T), p.push(I));
            continue;
          }
          const [_e, U, b] = N;
          if (!d && !(b instanceof RegExp))
            continue;
          const S = h(y, _)[_e], P = a.slice(o).join("/");
          if (b instanceof RegExp) {
            const I = b.exec(P);
            if (I) {
              if (T[U] = I[0], s.push(...j(this, B, re).call(this, S, e, h(y, R), T)), Object.keys(h(S, _)).length) {
                g(S, R, T);
                const $ = ((c = I[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[$] || (l[$] = [])).push(S);
              }
              continue;
            }
          }
          (b === true || b.test(d)) && (T[U] = d, f ? (s.push(...j(this, B, re).call(this, S, e, T, h(y, R))), h(S, _)["*"] && s.push(...j(this, B, re).call(this, h(S, _)["*"], e, T, h(y, R)))) : (g(S, R, T), p.push(S)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return s.length > 1 && s.sort((o, u) => o.score - u.score), [s.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Ee"), ee = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name2(function(e, r, s, n) {
  const i = [];
  for (let a = 0, l = h(e, ee).length; a < l; a++) {
    const c = h(e, ee)[a], o = c[r] || c[A], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), s !== je || n && n !== je))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], v = u[o.score];
        o.params[p] = n != null && n[p] && !v ? n[p] : s[p] ?? (n == null ? void 0 : n[p]), u[o.score] = true;
      }
  }
  return i;
}, "re"), Ee);
var oe;
var xt;
var vr = (xt = /* @__PURE__ */ __name2(class {
  constructor() {
    x(this, "name", "TrieRouter");
    w(this, oe);
    g(this, oe, new yr());
  }
  add(t, e, r) {
    const s = wt(e);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++)
        h(this, oe).insert(t, s[n], r);
      return;
    }
    h(this, oe).insert(t, e, r);
  }
  match(t, e) {
    return h(this, oe).search(t, e);
  }
}, "xt"), oe = /* @__PURE__ */ new WeakMap(), xt);
var Pt = /* @__PURE__ */ __name2(class extends or {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new xr({ routers: [new gr(), new vr()] });
  }
}, "Pt");
var wr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, s = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function c(d, f) {
      a.res.headers.set(d, f);
    }
    __name(c, "c");
    __name2(c, "c");
    const o = await s(a.req.header("origin") || "", a);
    if (o && c("Access-Control-Allow-Origin", o), r.credentials && c("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && c("Vary", "Origin"), r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const d = await n(a.req.header("origin") || "", a);
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
}, "wr");
var br = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var it = /* @__PURE__ */ __name2((t, e = Er) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = t.match(r);
  if (!s)
    return;
  let n = e[s[1]];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, "it");
var Sr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Er = Sr;
var jr = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((n) => n !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), s = [];
  for (const n of r)
    n === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : n !== "." && s.push(n);
  return s.join("/") || ".";
}, "jr");
var Mt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Or = Object.keys(Mt);
var Tr = "index.html";
var Ar = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, s = t.join ?? jr;
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
    let l = s(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(l) && (l = s(l, Tr));
    const c = t.getContent;
    let o = await c(l, n);
    if (o instanceof Response)
      return n.newResponse(o.body, o);
    if (o) {
      const v = t.mimes && it(l, t.mimes) || it(l);
      if (n.header("Content-Type", v || "application/octet-stream"), t.precompressed && (!v || br.test(v))) {
        const O = new Set((d = n.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((y) => y.trim()));
        for (const y of Or) {
          if (!O.has(y))
            continue;
          const E = await c(l + Mt[y], n);
          if (E) {
            o = E, n.header("Content-Encoding", y), n.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, l, n)), n.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, l, n)), await i();
  };
}, "Ar");
var kr = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const n = r[t];
  if (!n)
    return null;
  const i = await s.get(n, { type: "stream" });
  return i || null;
}, "kr");
var $r = /* @__PURE__ */ __name2((t) => async function(r, s) {
  return Ar({ ...t, getContent: async (i) => kr(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, s);
}, "$r");
var Ir = /* @__PURE__ */ __name2((t) => $r(t), "Ir");
function _t(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(_t, "_t");
__name2(_t, "_t");
function M(t, e) {
  const r = String(t || "").replace(/\s+/g, " ").trim();
  if (r.length <= e)
    return r;
  const s = r.slice(0, e), n = Math.max(s.lastIndexOf("."), s.lastIndexOf("\uB2E4."), s.lastIndexOf("\uC694."), s.lastIndexOf("!"), s.lastIndexOf("?"));
  return n > Math.floor(e * 0.6) ? s.slice(0, n + 1).trim() : s.trim() + "\u2026";
}
__name(M, "M");
__name2(M, "M");
function at(t) {
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
__name(at, "at");
__name2(at, "at");
function Rr(t) {
  const e = t.length, r = _t(t), s = t.split(/[.!?]\s+/).map((m) => m.trim()).filter((m) => m.length > 10), n = t.match(/\d+\.?\d*%?/g) || [], i = s[0] || "\uD575\uC2EC \uC8FC\uC7A5\uC744 \uC0DD\uC131\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";
  let a = s.slice(1, 8).map((m, C) => n.length > C && m.includes(n[C]) ? m : m.length > 120 ? m.slice(0, 120) + "\u2026" : m);
  for (; a.length < 3; )
    a.push(`\uCD94\uAC00 \uADFC\uAC70 ${a.length + 1}: \uAD00\uB828 \uC815\uBCF4\uB97C \uBD84\uC11D \uC911\uC785\uB2C8\uB2E4.`);
  const l = s.filter((m) => /반면|대조|비교|vs|차이/.test(m)).slice(0, 3), c = s.filter((m) => /의미|시사|따라서|결과|중요/.test(m)).slice(0, 3);
  let o = s.slice(0, 4).join(". ");
  o ? o += "." : o = `\uD575\uC2EC \uB0B4\uC6A9: ${i}`;
  let u = s.slice(4, 8).join(". ");
  u ? u += "." : u = a.slice(0, 3).join(". ") + ".";
  let d = s.slice(8, 12).join(". ");
  d ? d += "." : d = `\uCD94\uAC00 \uBD84\uC11D: ${c.length > 0 ? c[0] : "\uAD00\uB828 \uC815\uBCF4\uB97C \uC885\uD569\uC801\uC73C\uB85C \uAC80\uD1A0\uD55C \uACB0\uACFC\uC785\uB2C8\uB2E4."}`;
  const f = [o, u, d].filter((m) => m && m.length > 10).join(`

`), p = [{ title: "\uAC1C\uC694", anchor: "sec-1" }, { title: "\uD575\uC2EC \uB0B4\uC6A9", anchor: "sec-2" }, { title: "\uBE44\uAD50 \uBD84\uC11D", anchor: "sec-3" }], v = [{ title: "1. \uAC1C\uC694", keywords: ["\uD575\uC2EC", "\uC694\uC57D", "\uBC30\uACBD"], bullets: s.slice(0, 3), children: [{ title: "1.1. \uBC30\uACBD", keywords: ["\uB9E5\uB77D", "\uC0C1\uD669"], bullets: s.slice(0, 2) }] }, { title: "2. \uD575\uC2EC \uB0B4\uC6A9", keywords: ["\uC8FC\uC694", "\uD575\uC2EC", "\uC911\uC2EC"], bullets: s.slice(3, 6), children: [{ title: "2.1. \uC138\uBD80 \uC0AC\uD56D", keywords: ["\uAD6C\uCCB4", "\uC0C1\uC138"], bullets: s.slice(3, 5) }] }, { title: "3. \uBE44\uAD50 \uBD84\uC11D", keywords: ["\uBE44\uAD50", "\uB300\uC870", "\uCC28\uC774"], bullets: l.length > 0 ? l : s.slice(6, 8) }];
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: e, checksum: r }, narrative: { coreClaim: i, grounds: a, comparisons: l, implications: c, summaryDetail: f }, structured: { toc: p, hierarchy: v, glossary: [{ term: "\uACF5\uAD50\uC721", def: "\uAD6D\uAC00\uAC00 \uC81C\uACF5\uD558\uB294 \uBB34\uB8CC \uAD50\uC721 \uC2DC\uC2A4\uD15C" }, { term: "\uC0AC\uAD50\uC721", def: "\uBBFC\uAC04 \uBD80\uBB38\uC5D0\uC11C \uC81C\uACF5\uD558\uB294 \uC720\uB8CC \uAD50\uC721 \uC11C\uBE44\uC2A4" }, { term: "GDP", def: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0(Gross Domestic Product)" }, { term: "\uBBFC\uAC04 \uBD80\uB2F4", def: "\uAC00\uACC4\uC640 \uAE30\uC5C5\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44" }, { term: "OECD", def: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C(Organisation for Economic Co-operation and Development)" }] }, mindmap: { title: "\uD575\uC2EC \uAD6C\uC870", children: [{ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [{ title: "\uACF5\uAD50\uC721 \uC2DC\uC2A4\uD15C", pack: ["\uBB34\uB8CC \uC81C\uACF5", "\uC720\uCE58\uC6D0~\uB300\uD559", "\uAD6D\uAC00 \uBD80\uB2F4"], explain: "\uAD6D\uAC00\uAC00 \uC81C\uACF5\uD558\uB294 \uBB34\uB8CC \uAD50\uC721 \uC2DC\uC2A4\uD15C\uC73C\uB85C, \uC720\uCE58\uC6D0\uBD80\uD130 \uB300\uD559\uAE4C\uC9C0 \uC804 \uACFC\uC815\uC744 \uD3EC\uD568\uD558\uBA70 \uB300\uBD80\uBD84\uC758 \uBE44\uC6A9\uC744 \uAD6D\uAC00\uAC00 \uBD80\uB2F4\uD569\uB2C8\uB2E4." }, { title: "\uC0AC\uAD50\uC721 \uC758\uC874\uB3C4", pack: ["\uBBFC\uAC04 \uBD80\uB2F4", "\uC0AC\uAD50\uC721\uBE44", "\uAD6D\uAC00\uBCC4 \uCC28\uC774"], explain: "\uAC00\uACC4\uC640 \uAE30\uC5C5\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44 \uBE44\uC728\uB85C, \uAD6D\uAC00\uBCC4\uB85C \uD070 \uCC28\uC774\uB97C \uBCF4\uC774\uBA70 \uD55C\uAD6D\uC740 OECD \uD3C9\uADE0\uC758 3\uBC30\uB97C \uC0C1\uD68C\uD569\uB2C8\uB2E4." }] }, { title: "2. \uBE44\uAD50 \uBD84\uC11D", children: [{ title: "\uD55C\uAD6D vs \uC2A4\uC6E8\uB374", pack: ["GDP \uBE44\uC728", "\uBBFC\uAC04 \uBD80\uB2F4", "\uAD50\uC721 \uCCA0\uD559"], explain: "\uD55C\uAD6D\uC740 GDP \uB300\uBE44 7.6%(\uBBFC\uAC04 2.8%), \uC2A4\uC6E8\uB374\uC740 6.5%(\uBBFC\uAC04 0.2%)\uB85C \uBBFC\uAC04 \uBD80\uB2F4\uC5D0\uC11C 14\uBC30 \uCC28\uC774\uAC00 \uB0A9\uB2C8\uB2E4." }, { title: "\uBD81\uC720\uB7FD \uBAA8\uB378", pack: ["\uB178\uB974\uC6E8\uC774", "\uD540\uB780\uB4DC", "\uACF5\uAD50\uC721 \uC911\uC2EC"], explain: "\uB178\uB974\uC6E8\uC774\uC640 \uD540\uB780\uB4DC\uB3C4 \uACF5\uAD50\uC721 \uBE44\uC728\uC774 0.1%\uB97C \uB118\uC9C0 \uC54A\uC73C\uBA70, \uC120\uD589\uD559\uC2B5 \uC5C6\uC774 \uCDE8\uBBF8 \uD65C\uB3D9 \uC911\uC2EC\uC785\uB2C8\uB2E4." }] }] }, selftest: { passScorePct: 90, items: [{ id: "q1", type: "short", question: "\uD55C\uAD6D\uC758 GDP \uB300\uBE44 \uACF5\uAD50\uC721 \uBE44\uC728 \uC911 \uBBFC\uAC04 \uBD80\uB2F4\uC740 \uBA87 %\uC778\uAC00?", hint: "13\uB144\uC9F8 \uC138\uACC4 1\uC704\uB97C \uCC28\uC9C0\uD55C \uC218\uCE58\uC785\uB2C8\uB2E4.", rubric: { mustInclude: ["2.8", "%"], maxChars: 50 }, answerKey: "2.8%" }, { id: "q2", type: "explain", question: "\uC2A4\uC6E8\uB374\uACFC \uD55C\uAD6D\uC758 \uAD50\uC721\uBE44 \uBBFC\uAC04 \uBD80\uB2F4 \uCC28\uC774\uB97C \uC124\uBA85\uD558\uC2DC\uC624.", hint: "GDP \uB300\uBE44 \uBE44\uC728\uACFC \uAD6D\uAC00\uBCC4 \uAD50\uC721 \uCCA0\uD559\uC744 \uACE0\uB824\uD558\uC138\uC694.", rubric: { mustInclude: ["0.2", "2.8", "\uACF5\uAD50\uC721"], maxChars: 200 }, answerKey: "\uC2A4\uC6E8\uB374\uC740 \uBBFC\uAC04 \uBD80\uB2F4\uB960 0.2%\uB85C \uB300\uBD80\uBD84\uC744 \uAD6D\uAC00\uAC00 \uBD80\uB2F4\uD558\uC9C0\uB9CC, \uD55C\uAD6D\uC740 2.8%\uB85C OECD \uD3C9\uADE0\uC758 3\uBC30\uB97C \uC0C1\uD68C\uD569\uB2C8\uB2E4." }, { id: "q3", type: "evidence", question: "\uBD81\uC720\uB7FD \uAD6D\uAC00\uB4E4\uC758 \uACF5\uAD50\uC721 \uC911\uC2EC \uCCB4\uACC4\uC758 \uD2B9\uC9D5\uC744 \uC11C\uC220\uD558\uC2DC\uC624.", rubric: { mustInclude: ["\uACF5\uAD50\uC721", "\uBB34\uB8CC", "\uC120\uD589\uD559\uC2B5"], maxChars: 250 }, answerKey: "\uB178\uB974\uC6E8\uC774\uC640 \uD540\uB780\uB4DC\uB294 \uACF5\uAD50\uC721 \uBE44\uC728\uC774 0.1%\uB97C \uB118\uC9C0 \uC54A\uC73C\uBA70, \uC120\uD589\uD559\uC2B5 \uC5C6\uC774 \uCDE8\uBBF8 \uD65C\uB3D9 \uC911\uC2EC\uC73C\uB85C \uC6B4\uC601\uB429\uB2C8\uB2E4." }] } };
}
__name(Rr, "Rr");
__name2(Rr, "Rr");
function ot(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(ot, "ot");
__name2(ot, "ot");
function ze(t, e) {
  const r = e === "brief", s = e === "standard", n = M(t.narrative.coreClaim, r ? 80 : s ? 100 : 120), i = r ? 3 : s ? 5 : 7, a = (t.narrative.grounds || []).slice(0, i).map((b) => M(b, r ? 90 : s ? 120 : 150)), l = r ? 1 : s ? 2 : 3, c = (t.narrative.comparisons || []).slice(0, l).map((b) => M(b, r ? 100 : s ? 140 : 180)), o = r || s ? 2 : 3, u = (t.narrative.implications || []).slice(0, o).map((b) => M(b, r ? 100 : s ? 140 : 160));
  let d = "";
  if (e === "detail")
    d = String(t.narrative.summaryDetail || "").trim();
  else {
    const b = [];
    if (b.push(`${n}`), a.length > 0) {
      const I = a.map(($, ue) => r ? `${$}` : ue === 0 ? `${$}` : `\uB610\uD55C ${$}`).join(r ? ", " : ". ");
      b.push(I);
    }
    if (!r && c.length > 0) {
      const I = c.map(($, ue) => ue === 0 ? `${$}` : `\uBC18\uBA74 ${$}`).join(". ");
      b.push(I);
    }
    if (u.length > 0) {
      const I = u.map(($, ue) => r ? $ : ue === 0 ? `\uC774\uB294 ${$}` : `\uB354\uBD88\uC5B4 ${$}`).join(". ");
      b.push(I);
    }
    d = b.join(". ") + ".";
    const S = 1423, P = r ? S * 0.1 : S * 0.25;
    d.length < P && r && c.length > 0 && (d += ` ${c[0]}.`);
  }
  const f = t.structured.toc || [], p = r ? 2 : s ? 4 : 10, v = (t.structured.glossary || []).slice(0, p).map((b) => ({ term: M(b.term, 20), def: M(b.def, r ? 70 : 120) })), O = r ? 2 : s ? 3 : 5, y = /* @__PURE__ */ __name2((b) => (b || []).map((S) => ({ title: M(S.title, 60), keywords: (S.keywords || []).slice(0, r ? 3 : s ? 4 : 6).map((P) => M(P, 16)), bullets: (S.bullets || []).slice(0, O).map((P) => M(P, r ? 90 : 140)), children: S.children ? y(S.children) : void 0 })), "y"), E = y(t.structured.hierarchy || []), m = Cr({ toc: f, hierarchy: E, glossary: v }), C = JSON.parse(JSON.stringify(t.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), N = r ? 70 : s ? 110 : 160, T = r ? 2 : 3;
  for (const b of C.children || [])
    for (const S of b.children || [])
      Array.isArray(S.pack) && (S.pack = S.pack.slice(0, T).map((P) => M(P, 20))), typeof S.explain == "string" && (S.explain = M(S.explain, N)), Array.isArray(S.children) || (S.children = []);
  const _e = r || s ? 2 : 4, U = (t.selftest.items || []).slice(0, _e).map((b) => {
    var S, P, I;
    return { id: b.id, type: b.type, question: M(b.question, r ? 140 : 220), hint: b.hint ? M(b.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((S = b.rubric) == null ? void 0 : S.mustInclude) || []).slice(0, r ? 2 : 4).map(($) => M($, 20)), mustNotInclude: (((P = b.rubric) == null ? void 0 : P.mustNotInclude) || []).slice(0, 2).map(($) => M($, 20)), maxChars: ((I = b.rubric) == null ? void 0 : I.maxChars) ?? (r ? 140 : 220) }, answerKey: b.answerKey ? M(b.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: d, coreClaim: n, grounds: a, comparisons: c, implications: u }, structured: { text: m, toc: f, hierarchy: E, glossary: v }, mindmap: { tree: C }, selftest: { passScorePct: 90, items: U } };
}
__name(ze, "ze");
__name2(ze, "ze");
function Cr(t) {
  var s, n;
  const e = [];
  e.push("\u2160. \uBAA9\uCC28"), (s = t.toc) != null && s.length ? t.toc.forEach((i, a) => e.push(`  ${a + 1}. ${i.title}`)) : e.push("  1. \uBCF8\uBB38"), e.push(""), e.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name2((i, a) => {
    var l, c;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      e.push(`${u}- ${o.title}`), (l = o.keywords) != null && l.length && e.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => e.push(`${u}  \xB7 ${d}`)), (c = o.children) != null && c.length && r(o.children, a + 1);
    }
  }, "r");
  return r(t.hierarchy || [], 1), e.push(""), e.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (n = t.glossary) != null && n.length ? t.glossary.forEach((i) => e.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : e.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), e.join(`
`);
}
__name(Cr, "Cr");
__name2(Cr, "Cr");
function Pr(t) {
  var i, a, l, c, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 3) && e.push("narrative.grounds must be >= 3"), (!((l = t == null ? void 0 : t.narrative) != null && l.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = t == null ? void 0 : t.structured) == null ? void 0 : c.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 3) && e.push("structured.glossary must be >= 3");
  let r = 0, s = 0, n = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const v of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(v.pack) && v.pack.length && s++, typeof v.explain == "string" && v.explain.trim().length > 30 && n++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && s / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && n / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(Pr, "Pr");
__name2(Pr, "Pr");
function Mr(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), s = (t.standard.narrative.text || "").replace(/\s+/g, ""), n = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), s.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), n.length < s.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === s && e.push("brief narrative equals standard narrative"), s === n && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let v = 0;
    for (const O of (p == null ? void 0 : p.children) || [])
      v += ((O == null ? void 0 : O.children) || []).length;
    return v;
  }, "i"), a = i(t.brief.mindmap.tree), l = i(t.standard.mindmap.tree), c = i(t.detail.mindmap.tree);
  return a === l && l === c || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${c})`), e;
}
__name(Mr, "Mr");
__name2(Mr, "Mr");
async function ct(t, e) {
  var l, c, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const s = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ct, "ct");
__name2(ct, "ct");
function _r(t) {
  t.post("/api/matrix", async (e) => {
    const r = Date.now(), s = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const n = await e.req.json(), i = String(n.text || "").trim();
      if (!i)
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 400);
      const a = _t(i), l = e.env.USE_MOCK === "true" || !e.env.GEMINI_API_KEY;
      let c = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), c = Rr(i);
      else {
        const O = ot(i);
        let y = await ct(e, O);
        if (c = at(y), !c) {
          const E = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", ot(i)].join(`
`);
          y = await ct(e, E), c = at(y);
        }
        if (!c)
          return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 502);
      }
      const o = Pr(c);
      if (o.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: o.join(" | ") }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 422);
      const u = ze(c, "brief"), d = ze(c, "standard"), f = ze(c, "detail"), p = Mr({ brief: u, standard: d, detail: f });
      if (p.length && l === false)
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: p.join(" | ") }, meta: { reqId: s, elapsedMs: Date.now() - r } }, 422);
      const v = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: u, standard: d, detail: f }, views: { narrative: { brief: u.narrative, standard: d.narrative, detail: f.narrative }, structured: { brief: u.structured, standard: d.structured, detail: f.structured }, mindmap: { brief: u.mindmap, standard: d.mindmap, detail: f.mindmap }, selftest: { brief: u.selftest, standard: d.selftest, detail: f.selftest } } }, meta: { requestId: s, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a } };
      return e.json(v, 200);
    } catch (n) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (n == null ? void 0 : n.message) || String(n) }, meta: { requestId: s, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  });
}
__name(_r, "_r");
__name2(_r, "_r");
var G = new Pt();
G.use("/api/*", wr());
G.use("/static/*", Ir({ root: "./public" }));
_r(G);
function Ae() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ae, "Ae");
__name2(Ae, "Ae");
function Qe(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let s = 0; s < e.length; s++)
    r ^= e.charCodeAt(s), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(Qe, "Qe");
__name2(Qe, "Qe");
function Dr(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Dr, "Dr");
__name2(Dr, "Dr");
function Nr(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
function Hr(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Hr, "Hr");
__name2(Hr, "Hr");
function Lr(t, e) {
  const r = Math.max(60, ge(t)), s = 0.53, n = Math.floor(r * s * 0.85), i = Math.ceil(r * s * 1.15), a = Math.floor(r * s), l = Math.ceil(r * 0.05);
  return { base: r, min: n, max: i, keep: a, tol: l };
}
__name(Lr, "Lr");
__name2(Lr, "Lr");
function qr(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Hr((t == null ? void 0 : t.viewType) || "narrative"), s = Nr(t == null ? void 0 : t.level), n = "detail", { base: i, min: a, max: l } = Lr(e), c = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${c}, subject=${o}, requestedLevel=${s}, forcedLevel=${n}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
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
`.trim(), v = `
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
`.trim(), O = `
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
  let y = f;
  return r === "structured" ? y = p : r === "mindmap" ? y = v : r === "selftest" && (y = O), `${d}

${y}`;
}
__name(qr, "qr");
__name2(qr, "qr");
function le(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(le, "le");
__name2(le, "le");
function Ke(t) {
  const e = le(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((s) => s.trim()).filter(Boolean) : [];
}
__name(Ke, "Ke");
__name2(Ke, "Ke");
function Fr(t) {
  const e = le(t).split(`
`).map((s) => s.trim()), r = [];
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    (/^\d+(\.\d+)+\.\s*/.test(n) || /^\d+\.\s*/.test(n)) && r.push({ title: n, startIdx: s });
  }
  return r;
}
__name(Fr, "Fr");
__name2(Fr, "Fr");
function Ze(t) {
  const e = le(t).split(`
`), r = Fr(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: le(t) }];
  const s = [];
  for (let n = 0; n < r.length; n++) {
    const i = r[n], a = r[n + 1], l = i.startIdx, c = a ? a.startIdx : e.length, o = i.title, u = e.slice(l + 1, c).join(`
`).trim();
    s.push({ title: o, body: u });
  }
  return s.filter((n) => n.body.length > 0);
}
__name(Ze, "Ze");
__name2(Ze, "Ze");
function Gr(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function me(t, e) {
  const s = Ke(t).map((i, a) => ({ s: i, i: a, score: Gr(i) }));
  return s.sort((i, a) => a.score - i.score || i.i - a.i), s.slice(0, Dr(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(me, "me");
__name2(me, "me");
function ge(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(ge, "ge");
__name2(ge, "ge");
var Ye = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function lt(t, e, r) {
  const s = Math.max(60, ge(t)), n = ge(e), i = Math.floor(s * Ye[r].min), a = Math.ceil(s * Ye[r].max);
  return n < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: n } : n > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: n } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: n };
}
__name(lt, "lt");
__name2(lt, "lt");
function ke(t, e, r) {
  const s = Math.max(60, ge(t)), n = Math.ceil(s * Ye[r].max);
  let i = String(e || "").trim();
  if (ge(i) <= n)
    return i;
  const a = Ke(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (ge(o) > n)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(ke, "ke");
__name2(ke, "ke");
function Ue(t, e) {
  return `${t}_${e}`;
}
__name(Ue, "Ue");
__name2(Ue, "Ue");
function Kr(t) {
  const e = Ze(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, s = /* @__PURE__ */ new Map();
  return e.forEach((n, i) => {
    const a = Ue("sec", i + 1), l = { id: a, title: n.title, type: "section", collapsed: false, children: [] }, c = me(n.body, 6), o = [];
    for (const m of c)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((N) => {
        const T = N.replace(/[()]/g, "").trim();
        T.length >= 2 && T.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(T) && o.push(T);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const d = Array.from(u.entries()).sort((m, C) => C[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = me(n.body, 3).join(" "), p = me(n.body, 2).join(" "), v = me(n.body, 1).join(" "), O = { id: Ue(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: v, children: [] };
    d.forEach((m) => {
      s.has(m) || s.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${me(n.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const E = Ke(n.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    E.length && O.children.push({ id: Ue(a + "_adv", 1), title: E.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(O), r.children.push(l);
  }), { tree: r, glossary: Array.from(s.entries()).map(([n, i]) => ({ term: n, def: i })) };
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function Dt(t, e) {
  const r = JSON.parse(JSON.stringify(t)), s = /* @__PURE__ */ __name2((n) => {
    n.type === "keyword" && (e === "brief" && (n.explain = n.explainBrief || n.explain), e === "standard" && (n.explain = n.explainStandard || n.explain), e === "detail" && (n.explain = n.explain || n.explainStandard || n.explainBrief)), n.type === "advanced" && (n.collapsed = e !== "detail"), (n.children || []).forEach(s);
  }, "s");
  return s(r), r;
}
__name(Dt, "Dt");
__name2(Dt, "Dt");
function Jr(t, e, r, s) {
  const n = (e.children || []).map((u) => u.title), a = (Dt(e, s).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = s === "brief" ? 4 : s === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: ke(t, u.def, s) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), n.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${ke(t, u.summary, s)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: n, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(Jr, "Jr");
__name2(Jr, "Jr");
function Vr(t, e) {
  const r = Ze(t), s = e === "brief" ? 2 : e === "standard" ? 4 : 7, n = [];
  r.forEach((a) => {
    const l = e === "brief" || e === "standard" ? 1 : 2;
    n.push(...me(a.body, l));
  });
  const i = n.slice(0, s).join(" ");
  return ke(t, i, e);
}
__name(Vr, "Vr");
__name2(Vr, "Vr");
function Br(t, e) {
  Ze(t);
  const r = Ke(t), s = [], n = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  n && s.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: n, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: n });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && s.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && s.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), s.slice(0, 4);
}
__name(Br, "Br");
__name2(Br, "Br");
function zr(t, e) {
  let r = t.length, s = 0;
  const n = [];
  for (const a of t) {
    const l = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!l) {
      n.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((v) => v.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((v) => {
      l.includes(v) && d++;
    });
    const f = d >= 2 || l.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    s += p, n.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(s / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: n };
}
__name(zr, "zr");
__name2(zr, "zr");
function ut(t) {
  const e = le(t), { tree: r, glossary: s } = Kr(e), n = { originalMeta: { textHash: Qe(e), chars: e.length, ts: Ae() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Vr(e, i), l = Jr(e, r, s, i), c = Dt(r, i), o = Br(e), d = lt(e, a, i).ok ? a : ke(e, a, i), f = l.renderText || "", p = lt(e, f, i);
    l.renderText = p.ok ? f : ke(e, f, i), n.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), n;
}
__name(ut, "ut");
__name2(ut, "ut");
G.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: Ae(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
G.post("/api/engine", async (t) => {
  var p, v, O, y, E, m, C;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), s = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", n = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), l = (e == null ? void 0 : e.useGemini) === true, c = le(r);
  if (c.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && t.env.GEMINI_API_KEY)
    try {
      const N = qr({ text: c, viewType: n, level: "detail", grade: i, subject: a }), T = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", U = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${T}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: N }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), S = (((E = (y = (O = (v = (p = U == null ? void 0 : U.candidates) == null ? void 0 : p[0]) == null ? void 0 : v.content) == null ? void 0 : O.parts) == null ? void 0 : y[0]) == null ? void 0 : E.text) || "").match(/\{[\s\S]*\}/);
      if (S) {
        const P = JSON.parse(S[0]);
        u = { originalMeta: { textHash: Qe(c), chars: c.length, ts: Ae() }, modes: { detail: { [n]: P }, standard: { [n]: P }, brief: { [n]: P } } }, o = "gemini-" + T;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (N) {
      console.error("[Gemini Error]", N), u = ut(c), o = "v5-local-fallback";
    }
  else
    u = ut(c);
  const d = (C = (m = u.modes) == null ? void 0 : m[s]) == null ? void 0 : C[n], f = { engine: o, mode: s, viewType: n, ts: Ae(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
G.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], s = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, n = zr(r, s);
  return t.json({ ok: true, result: n });
});
G.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), s = String((r == null ? void 0 : r.userId) || "anon"), n = le(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!n || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Ae(), c = Qe(n), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, s, l, l, c, n, o).run(), t.json({ ok: true, id: a, textHash: c, ts: l });
});
G.get("/api/loadSummary", async (t) => {
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
G.get("/", (t) => t.redirect("/static/v5.html"));
var ht = new Pt();
var Ur = Object.assign({ "/src/index.tsx": G });
var Nt = false;
for (const [, t] of Object.entries(Ur))
  t && (ht.route("/", t), ht.notFound(t.notFoundHandler), Nt = true);
if (!Nt)
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
var middleware_insertion_facade_default = ht;
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

// .wrangler/tmp/pages-NOjitN/o15ecq8aido.js
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

// .wrangler/tmp/bundle-cwUeek/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-cwUeek/middleware-loader.entry.ts
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
//# sourceMappingURL=o15ecq8aido.js.map
