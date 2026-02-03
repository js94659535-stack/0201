var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-p8vk5X/checked-fetch.js
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

// .wrangler/tmp/bundle-p8vk5X/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-dQlvip/bundledWorker-0.915241674649907.mjs
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
var pr = Object.defineProperty;
var Ee = /* @__PURE__ */ __name2((t) => {
  throw TypeError(t);
}, "Ee");
var mr = /* @__PURE__ */ __name2((t, e, r) => e in t ? pr(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r, "mr");
var E = /* @__PURE__ */ __name2((t, e, r) => mr(t, typeof e != "symbol" ? e + "" : e, r), "E");
var ce = /* @__PURE__ */ __name2((t, e, r) => e.has(t) || Ee("Cannot " + r), "ce");
var h = /* @__PURE__ */ __name2((t, e, r) => (ce(t, e, "read from private field"), r ? r.call(t) : e.get(t)), "h");
var A = /* @__PURE__ */ __name2((t, e, r) => e.has(t) ? Ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), "A");
var w = /* @__PURE__ */ __name2((t, e, r, n) => (ce(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), "w");
var j = /* @__PURE__ */ __name2((t, e, r) => (ce(t, e, "access private method"), r), "j");
var Te = /* @__PURE__ */ __name2((t, e, r, n) => ({ set _(s) {
  w(t, e, s, r);
}, get _() {
  return h(t, e, n);
} }), "Te");
var ke = /* @__PURE__ */ __name2((t, e, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let l, o = false, u;
    if (t[c] ? (u = t[c][0][0], n.req.routeIndex = c) : u = c === t.length && s || void 0, u)
      try {
        l = await u(n, () => a(c + 1));
      } catch (d) {
        if (d instanceof Error && e)
          n.error = d, l = await e(d, n), o = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || o) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "ke");
var gr = Symbol();
var xr = /* @__PURE__ */ __name2(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = e, i = (t instanceof ze ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? vr(t, { all: r, dot: n }) : {};
}, "xr");
async function vr(t, e) {
  const r = await t.formData();
  return r ? yr(r, e) : {};
}
__name(vr, "vr");
__name2(vr, "vr");
function yr(t, e) {
  const r = /* @__PURE__ */ Object.create(null);
  return t.forEach((n, s) => {
    e.all || s.endsWith("[]") ? Sr(r, s, n) : r[s] = n;
  }), e.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (wr(r, n, s), delete r[n]);
  }), r;
}
__name(yr, "yr");
__name2(yr, "yr");
var Sr = /* @__PURE__ */ __name2((t, e, r) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : e.endsWith("[]") ? t[e] = [r] : t[e] = r;
}, "Sr");
var wr = /* @__PURE__ */ __name2((t, e, r) => {
  let n = t;
  const s = e.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "wr");
var Ue = /* @__PURE__ */ __name2((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "Ue");
var br = /* @__PURE__ */ __name2((t) => {
  const { groups: e, path: r } = Er(t), n = Ue(r);
  return Tr(n, e);
}, "br");
var Er = /* @__PURE__ */ __name2((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return e.push([s, r]), s;
  }), { groups: e, path: t };
}, "Er");
var Tr = /* @__PURE__ */ __name2((t, e) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const [n] = e[r];
    for (let s = t.length - 1; s >= 0; s--)
      if (t[s].includes(n)) {
        t[s] = t[s].replace(n, e[r][1]);
        break;
      }
  }
  return t;
}, "Tr");
var Wt = {};
var kr = /* @__PURE__ */ __name2((t, e) => {
  if (t === "*")
    return "*";
  const r = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${t}#${e}`;
    return Wt[n] || (r[2] ? Wt[n] = e && e[0] !== ":" && e[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${e})`)] : [t, r[1], new RegExp(`^${r[2]}$`)] : Wt[n] = [t, r[1], true]), Wt[n];
  }
  return null;
}, "kr");
var Se = /* @__PURE__ */ __name2((t, e) => {
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
}, "Se");
var Ar = /* @__PURE__ */ __name2((t) => Se(t, decodeURI), "Ar");
var Ke = /* @__PURE__ */ __name2((t) => {
  const e = t.url, r = e.indexOf("/", e.indexOf(":") + 4);
  let n = r;
  for (; n < e.length; n++) {
    const s = e.charCodeAt(n);
    if (s === 37) {
      const i = e.indexOf("?", n), a = e.slice(r, i === -1 ? void 0 : i);
      return Ar(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return e.slice(r, n);
}, "Ke");
var Or = /* @__PURE__ */ __name2((t) => {
  const e = Ke(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "Or");
var bt = /* @__PURE__ */ __name2((t, e, ...r) => (r.length && (e = bt(e, ...r)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "bt");
var Ge = /* @__PURE__ */ __name2((t) => {
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
}, "Ge");
var le = /* @__PURE__ */ __name2((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? Se(t, Je) : t) : t, "le");
var Ve = /* @__PURE__ */ __name2((t, e, r) => {
  let n;
  if (!r && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const c = t.charCodeAt(a + e.length + 1);
      if (c === 61) {
        const l = a + e.length + 2, o = t.indexOf("&", l);
        return le(t.slice(l, o === -1 ? void 0 : o));
      } else if (c == 38 || isNaN(c))
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
    let c = t.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let l = t.slice(i + 1, c === -1 ? a === -1 ? void 0 : a : c);
    if (n && (l = le(l)), i = a, l === "")
      continue;
    let o;
    c === -1 ? o = "" : (o = t.slice(c + 1, a === -1 ? void 0 : a), n && (o = le(o))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(o)) : s[l] ?? (s[l] = o);
  }
  return e ? s[e] : s;
}, "Ve");
var $r = Ve;
var jr = /* @__PURE__ */ __name2((t, e) => Ve(t, e, true), "jr");
var Je = decodeURIComponent;
var Ae = /* @__PURE__ */ __name2((t) => Se(t, Je), "Ae");
var Ot;
var V;
var rt;
var Xe;
var We;
var xe;
var nt;
var De;
var ze = (De = /* @__PURE__ */ __name2(class {
  constructor(t, e = "/", r = [[]]) {
    A(this, rt);
    E(this, "raw");
    A(this, Ot);
    A(this, V);
    E(this, "routeIndex", 0);
    E(this, "path");
    E(this, "bodyCache", {});
    A(this, nt, (t2) => {
      const { bodyCache: e2, raw: r2 } = this, n = e2[t2];
      if (n)
        return n;
      const s = Object.keys(e2)[0];
      return s ? e2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = r2[t2]();
    });
    this.raw = t, this.path = e, w(this, V, r), w(this, Ot, {});
  }
  param(t) {
    return t ? j(this, rt, Xe).call(this, t) : j(this, rt, We).call(this);
  }
  query(t) {
    return $r(this.url, t);
  }
  queries(t) {
    return jr(this.url, t);
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
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await xr(this, t));
  }
  json() {
    return h(this, nt).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return h(this, nt).call(this, "text");
  }
  arrayBuffer() {
    return h(this, nt).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, nt).call(this, "blob");
  }
  formData() {
    return h(this, nt).call(this, "formData");
  }
  addValidatedData(t, e) {
    h(this, Ot)[t] = e;
  }
  valid(t) {
    return h(this, Ot)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [gr]() {
    return h(this, V);
  }
  get matchedRoutes() {
    return h(this, V)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return h(this, V)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "De"), Ot = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakSet(), Xe = /* @__PURE__ */ __name2(function(t) {
  const e = h(this, V)[0][this.routeIndex][1][t], r = j(this, rt, xe).call(this, e);
  return r && /\%/.test(r) ? Ae(r) : r;
}, "Xe"), We = /* @__PURE__ */ __name2(function() {
  const t = {}, e = Object.keys(h(this, V)[0][this.routeIndex][1]);
  for (const r of e) {
    const n = j(this, rt, xe).call(this, h(this, V)[0][this.routeIndex][1][r]);
    n !== void 0 && (t[r] = /\%/.test(n) ? Ae(n) : n);
  }
  return t;
}, "We"), xe = /* @__PURE__ */ __name2(function(t) {
  return h(this, V)[1] ? h(this, V)[1][t] : t;
}, "xe"), nt = /* @__PURE__ */ new WeakMap(), De);
var Rr = { Stringify: 1 };
var Ye = /* @__PURE__ */ __name2(async (t, e, r, n, s) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (s ? s[0] += t : s = [t], Promise.all(i.map((c) => c({ phase: e, buffer: s, context: n }))).then((c) => Promise.all(c.filter(Boolean).map((l) => Ye(l, e, false, n, s))).then(() => s[0]))) : Promise.resolve(t);
}, "Ye");
var _r = "text/plain; charset=UTF-8";
var ue = /* @__PURE__ */ __name2((t, e) => ({ "Content-Type": t, ...e }), "ue");
var Kt;
var Gt;
var Q;
var $t;
var Z;
var B;
var Vt;
var jt;
var Rt;
var pt;
var Jt;
var zt;
var st;
var Et;
var Le;
var Mr = (Le = /* @__PURE__ */ __name2(class {
  constructor(t, e) {
    A(this, st);
    A(this, Kt);
    A(this, Gt);
    E(this, "env", {});
    A(this, Q);
    E(this, "finalized", false);
    E(this, "error");
    A(this, $t);
    A(this, Z);
    A(this, B);
    A(this, Vt);
    A(this, jt);
    A(this, Rt);
    A(this, pt);
    A(this, Jt);
    A(this, zt);
    E(this, "render", (...t2) => (h(this, jt) ?? w(this, jt, (e2) => this.html(e2)), h(this, jt).call(this, ...t2)));
    E(this, "setLayout", (t2) => w(this, Vt, t2));
    E(this, "getLayout", () => h(this, Vt));
    E(this, "setRenderer", (t2) => {
      w(this, jt, t2);
    });
    E(this, "header", (t2, e2, r) => {
      this.finalized && w(this, B, new Response(h(this, B).body, h(this, B)));
      const n = h(this, B) ? h(this, B).headers : h(this, pt) ?? w(this, pt, new Headers());
      e2 === void 0 ? n.delete(t2) : r != null && r.append ? n.append(t2, e2) : n.set(t2, e2);
    });
    E(this, "status", (t2) => {
      w(this, $t, t2);
    });
    E(this, "set", (t2, e2) => {
      h(this, Q) ?? w(this, Q, /* @__PURE__ */ new Map()), h(this, Q).set(t2, e2);
    });
    E(this, "get", (t2) => h(this, Q) ? h(this, Q).get(t2) : void 0);
    E(this, "newResponse", (...t2) => j(this, st, Et).call(this, ...t2));
    E(this, "body", (t2, e2, r) => j(this, st, Et).call(this, t2, e2, r));
    E(this, "text", (t2, e2, r) => !h(this, pt) && !h(this, $t) && !e2 && !r && !this.finalized ? new Response(t2) : j(this, st, Et).call(this, t2, e2, ue(_r, r)));
    E(this, "json", (t2, e2, r) => j(this, st, Et).call(this, JSON.stringify(t2), e2, ue("application/json", r)));
    E(this, "html", (t2, e2, r) => {
      const n = /* @__PURE__ */ __name2((s) => j(this, st, Et).call(this, s, e2, ue("text/html; charset=UTF-8", r)), "n");
      return typeof t2 == "object" ? Ye(t2, Rr.Stringify, false, {}).then(n) : n(t2);
    });
    E(this, "redirect", (t2, e2) => {
      const r = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, e2 ?? 302);
    });
    E(this, "notFound", () => (h(this, Rt) ?? w(this, Rt, () => new Response()), h(this, Rt).call(this, this)));
    w(this, Kt, t), e && (w(this, Z, e.executionCtx), this.env = e.env, w(this, Rt, e.notFoundHandler), w(this, zt, e.path), w(this, Jt, e.matchResult));
  }
  get req() {
    return h(this, Gt) ?? w(this, Gt, new ze(h(this, Kt), h(this, zt), h(this, Jt))), h(this, Gt);
  }
  get event() {
    if (h(this, Z) && "respondWith" in h(this, Z))
      return h(this, Z);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, Z))
      return h(this, Z);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, B) || w(this, B, new Response(null, { headers: h(this, pt) ?? w(this, pt, new Headers()) }));
  }
  set res(t) {
    if (h(this, B) && t) {
      t = new Response(t.body, t);
      for (const [e, r] of h(this, B).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const n = h(this, B).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const s of n)
              t.headers.append("set-cookie", s);
          } else
            t.headers.set(e, r);
    }
    w(this, B, t), this.finalized = true;
  }
  get var() {
    return h(this, Q) ? Object.fromEntries(h(this, Q)) : {};
  }
}, "Le"), Kt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakSet(), Et = /* @__PURE__ */ __name2(function(t, e, r) {
  const n = h(this, B) ? new Headers(h(this, B).headers) : h(this, pt) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
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
  const s = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? h(this, $t);
  return new Response(t, { status: s, headers: n });
}, "Et"), Le);
var C = "ALL";
var Nr = "all";
var Ir = ["get", "post", "put", "delete", "options", "patch"];
var Qe = "Can not add a route since the matcher is already built.";
var Ze = /* @__PURE__ */ __name2(class extends Error {
}, "Ze");
var Cr = "__COMPOSED_HANDLER";
var Pr = /* @__PURE__ */ __name2((t) => t.text("404 Not Found", 404), "Pr");
var Oe = /* @__PURE__ */ __name2((t, e) => {
  if ("getResponse" in t) {
    const r = t.getResponse();
    return e.newResponse(r.body, r);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "Oe");
var J;
var P;
var tr;
var z;
var ut;
var Yt;
var Qt;
var _t;
var Dr = (_t = /* @__PURE__ */ __name2(class {
  constructor(e = {}) {
    A(this, P);
    E(this, "get");
    E(this, "post");
    E(this, "put");
    E(this, "delete");
    E(this, "options");
    E(this, "patch");
    E(this, "all");
    E(this, "on");
    E(this, "use");
    E(this, "router");
    E(this, "getPath");
    E(this, "_basePath", "/");
    A(this, J, "/");
    E(this, "routes", []);
    A(this, z, Pr);
    E(this, "errorHandler", Oe);
    E(this, "onError", (e2) => (this.errorHandler = e2, this));
    E(this, "notFound", (e2) => (w(this, z, e2), this));
    E(this, "fetch", (e2, ...r) => j(this, P, Qt).call(this, e2, r[1], r[0], e2.method));
    E(this, "request", (e2, r, n2, s2) => e2 instanceof Request ? this.fetch(r ? new Request(e2, r) : e2, n2, s2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${bt("/", e2)}`, r), n2, s2)));
    E(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(j(this, P, Qt).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...Ir, Nr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? w(this, J, a) : j(this, P, ut).call(this, i, h(this, J), a), c.forEach((l) => {
        j(this, P, ut).call(this, i, h(this, J), l);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const l of [a].flat()) {
        w(this, J, l);
        for (const o of [i].flat())
          c.map((u) => {
            j(this, P, ut).call(this, o.toUpperCase(), h(this, J), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? w(this, J, i) : (w(this, J, "*"), a.unshift(i)), a.forEach((c) => {
      j(this, P, ut).call(this, C, h(this, J), c);
    }), this);
    const { strict: n, ...s } = e;
    Object.assign(this, s), this.getPath = n ?? true ? e.getPath ?? Ke : Or;
  }
  route(e, r) {
    const n = this.basePath(e);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === Oe ? i = s.handler : (i = /* @__PURE__ */ __name2(async (c, l) => (await ke([], r.errorHandler)(c, () => s.handler(c, l))).res, "i"), i[Cr] = s.handler), j(a = n, P, ut).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(e) {
    const r = j(this, P, tr).call(this);
    return r._basePath = bt(this._basePath, e), r;
  }
  mount(e, r, n) {
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
      const l = bt(this._basePath, e), o = l === "/" ? 0 : l.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const c = /* @__PURE__ */ __name2(async (l, o) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u)
        return u;
      await o();
    }, "c");
    return j(this, P, ut).call(this, C, bt(e, "*"), c), this;
  }
}, "_t"), J = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakSet(), tr = /* @__PURE__ */ __name2(function() {
  const e = new _t({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, w(e, z, h(this, z)), e.routes = this.routes, e;
}, "tr"), z = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ __name2(function(e, r, n) {
  e = e.toUpperCase(), r = bt(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: e, handler: n };
  this.router.add(e, r, [n, s]), this.routes.push(s);
}, "ut"), Yt = /* @__PURE__ */ __name2(function(e, r) {
  if (e instanceof Error)
    return this.errorHandler(e, r);
  throw e;
}, "Yt"), Qt = /* @__PURE__ */ __name2(function(e, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, P, Qt).call(this, e, r, n, "GET")))();
  const i = this.getPath(e, { env: n }), a = this.router.match(s, i), c = new Mr(e, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, z) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](c, async () => {
        c.res = await h(this, z).call(this, c);
      });
    } catch (u) {
      return j(this, P, Yt).call(this, u, c);
    }
    return o instanceof Promise ? o.then((u) => u || (c.finalized ? c.res : h(this, z).call(this, c))).catch((u) => j(this, P, Yt).call(this, u, c)) : o ?? h(this, z).call(this, c);
  }
  const l = ke(a[0], this.errorHandler, h(this, z));
  return (async () => {
    try {
      const o = await l(c);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return j(this, P, Yt).call(this, o, c);
    }
  })();
}, "Qt"), _t);
var er = [];
function Lr(t, e) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[C], c = a[2][i];
    if (c)
      return c;
    const l = i.match(a[0]);
    if (!l)
      return [[], er];
    const o = l.indexOf("", 1);
    return [a[1][o], l];
  }, "n");
  return this.match = n, n(t, e);
}
__name(Lr, "Lr");
__name2(Lr, "Lr");
var ee = "[^/]+";
var Lt = ".*";
var Ht = "(?:|/.*)";
var Tt = Symbol();
var Hr = new Set(".\\+*[^]$()");
function Fr(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === Lt || t === Ht ? 1 : e === Lt || e === Ht ? -1 : t === ee ? 1 : e === ee ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Fr, "Fr");
__name2(Fr, "Fr");
var mt;
var gt;
var X;
var yt;
var qr = (yt = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, mt);
    A(this, gt);
    A(this, X, /* @__PURE__ */ Object.create(null));
  }
  insert(e, r, n, s, i) {
    if (e.length === 0) {
      if (h(this, mt) !== void 0)
        throw Tt;
      if (i)
        return;
      w(this, mt, r);
      return;
    }
    const [a, ...c] = e, l = a === "*" ? c.length === 0 ? ["", "", Lt] : ["", "", ee] : a === "/*" ? ["", "", Ht] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (l) {
      const u = l[1];
      let d = l[2] || ee;
      if (u && l[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw Tt;
      if (o = h(this, X)[d], !o) {
        if (Object.keys(h(this, X)).some((f) => f !== Lt && f !== Ht))
          throw Tt;
        if (i)
          return;
        o = h(this, X)[d] = new yt(), u !== "" && w(o, gt, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, gt)]);
    } else if (o = h(this, X)[a], !o) {
      if (Object.keys(h(this, X)).some((u) => u.length > 1 && u !== Lt && u !== Ht))
        throw Tt;
      if (i)
        return;
      o = h(this, X)[a] = new yt();
    }
    o.insert(c, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, X)).sort(Fr).map((n) => {
      const s = h(this, X)[n];
      return (typeof h(s, gt) == "number" ? `(${n})@${h(s, gt)}` : Hr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, mt) == "number" && r.unshift(`#${h(this, mt)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "yt"), mt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), yt);
var ie;
var Xt;
var He;
var Br = (He = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, ie, { varIndex: 0 });
    A(this, Xt, new qr());
  }
  insert(t, e, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let c = false;
      if (t = t.replace(/\{[^}]+\}/g, (l) => {
        const o = `@\\${a}`;
        return s[a] = [o, l], a++, c = true, o;
      }), !c)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [c] = s[a];
      for (let l = i.length - 1; l >= 0; l--)
        if (i[l].indexOf(c) !== -1) {
          i[l] = i[l].replace(c, s[a][1]);
          break;
        }
    }
    return h(this, Xt).insert(i, e, n, h(this, ie), r), n;
  }
  buildRegExp() {
    let t = h(this, Xt).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], n = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++e] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++e), "")), [new RegExp(`^${t}`), r, n];
  }
}, "He"), ie = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), He);
var Ur = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Zt = /* @__PURE__ */ Object.create(null);
function rr(t) {
  return Zt[t] ?? (Zt[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(rr, "rr");
__name2(rr, "rr");
function Kr() {
  Zt = /* @__PURE__ */ Object.create(null);
}
__name(Kr, "Kr");
__name2(Kr, "Kr");
function Gr(t) {
  var o;
  const e = new Br(), r = [];
  if (t.length === 0)
    return Ur;
  const n = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, g, m] = n[u];
    p ? s[g] = [m.map(([v]) => [v, /* @__PURE__ */ Object.create(null)]), er] : d++;
    let x;
    try {
      x = e.insert(g, d, p);
    } catch (v) {
      throw v === Tt ? new Ze(g) : v;
    }
    p || (r[d] = m.map(([v, y]) => {
      const b = /* @__PURE__ */ Object.create(null);
      for (y -= 1; y >= 0; y--) {
        const [D, $] = x[y];
        b[D] = $;
      }
      return [v, b];
    }));
  }
  const [i, a, c] = e.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const g = (o = r[u][f]) == null ? void 0 : o[1];
      if (!g)
        continue;
      const m = Object.keys(g);
      for (let x = 0, v = m.length; x < v; x++)
        g[m[x]] = c[g[m[x]]];
    }
  const l = [];
  for (const u in a)
    l[u] = r[a[u]];
  return [i, l, s];
}
__name(Gr, "Gr");
__name2(Gr, "Gr");
function wt(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((n, s) => s.length - n.length))
      if (rr(r).test(e))
        return [...t[r]];
  }
}
__name(wt, "wt");
__name2(wt, "wt");
var it;
var at;
var ae;
var nr;
var Fe;
var Vr = (Fe = /* @__PURE__ */ __name2(class {
  constructor() {
    A(this, ae);
    E(this, "name", "RegExpRouter");
    A(this, it);
    A(this, at);
    E(this, "match", Lr);
    w(this, it, { [C]: /* @__PURE__ */ Object.create(null) }), w(this, at, { [C]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, r) {
    var c;
    const n = h(this, it), s = h(this, at);
    if (!n || !s)
      throw new Error(Qe);
    n[t] || [n, s].forEach((l) => {
      l[t] = /* @__PURE__ */ Object.create(null), Object.keys(l[C]).forEach((o) => {
        l[t][o] = [...l[C][o]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const l = rr(e);
      t === C ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[e] || (u[e] = wt(n[o], e) || wt(n[C], e) || []);
      }) : (c = n[t])[e] || (c[e] = wt(n[t], e) || wt(n[C], e) || []), Object.keys(n).forEach((o) => {
        (t === C || t === o) && Object.keys(n[o]).forEach((u) => {
          l.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (t === C || t === o) && Object.keys(s[o]).forEach((u) => l.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Ge(e) || [e];
    for (let l = 0, o = a.length; l < o; l++) {
      const u = a[l];
      Object.keys(s).forEach((d) => {
        var f;
        (t === C || t === d) && ((f = s[d])[u] || (f[u] = [...wt(n[d], u) || wt(n[C], u) || []]), s[d][u].push([r, i - o + l + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, at)).concat(Object.keys(h(this, it))).forEach((e) => {
      t[e] || (t[e] = j(this, ae, nr).call(this, e));
    }), w(this, it, w(this, at, void 0)), Kr(), t;
  }
}, "Fe"), it = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), nr = /* @__PURE__ */ __name2(function(t) {
  const e = [];
  let r = t === C;
  return [h(this, it), h(this, at)].forEach((n) => {
    const s = n[t] ? Object.keys(n[t]).map((i) => [i, n[t][i]]) : [];
    s.length !== 0 ? (r || (r = true), e.push(...s)) : t !== C && e.push(...Object.keys(n[C]).map((i) => [i, n[C][i]]));
  }), r ? Gr(e) : null;
}, "nr"), Fe);
var ot;
var tt;
var qe;
var Jr = (qe = /* @__PURE__ */ __name2(class {
  constructor(t) {
    E(this, "name", "SmartRouter");
    A(this, ot, []);
    A(this, tt, []);
    w(this, ot, t.routers);
  }
  add(t, e, r) {
    if (!h(this, tt))
      throw new Error(Qe);
    h(this, tt).push([t, e, r]);
  }
  match(t, e) {
    if (!h(this, tt))
      throw new Error("Fatal error");
    const r = h(this, ot), n = h(this, tt), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const c = r[i];
      try {
        for (let l = 0, o = n.length; l < o; l++)
          c.add(...n[l]);
        a = c.match(t, e);
      } catch (l) {
        if (l instanceof Ze)
          continue;
        throw l;
      }
      this.match = c.match.bind(c), w(this, ot, [c]), w(this, tt, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, tt) || h(this, ot).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ot)[0];
  }
}, "qe"), ot = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), qe);
var Pt = /* @__PURE__ */ Object.create(null);
var ct;
var F;
var xt;
var Mt;
var L;
var et;
var dt;
var Nt;
var zr = (Nt = /* @__PURE__ */ __name2(class {
  constructor(e, r, n) {
    A(this, et);
    A(this, ct);
    A(this, F);
    A(this, xt);
    A(this, Mt, 0);
    A(this, L, Pt);
    if (w(this, F, n || /* @__PURE__ */ Object.create(null)), w(this, ct, []), e && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: r, possibleKeys: [], score: 0 }, w(this, ct, [s]);
    }
    w(this, xt, []);
  }
  insert(e, r, n) {
    w(this, Mt, ++Te(this, Mt)._);
    let s = this;
    const i = br(r), a = [];
    for (let c = 0, l = i.length; c < l; c++) {
      const o = i[c], u = i[c + 1], d = kr(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, F)) {
        s = h(s, F)[f], d && a.push(d[1]);
        continue;
      }
      h(s, F)[f] = new Nt(), d && (h(s, xt).push(d), a.push(d[1])), s = h(s, F)[f];
    }
    return h(s, ct).push({ [e]: { handler: n, possibleKeys: a.filter((c, l, o) => o.indexOf(c) === l), score: h(this, Mt) } }), s;
  }
  search(e, r) {
    var l;
    const n = [];
    w(this, L, Pt);
    let i = [this];
    const a = Ue(r), c = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let g = 0, m = i.length; g < m; g++) {
        const x = i[g], v = h(x, F)[d];
        v && (w(v, L, h(x, L)), f ? (h(v, F)["*"] && n.push(...j(this, et, dt).call(this, h(v, F)["*"], e, h(x, L))), n.push(...j(this, et, dt).call(this, v, e, h(x, L)))) : p.push(v));
        for (let y = 0, b = h(x, xt).length; y < b; y++) {
          const D = h(x, xt)[y], $ = h(x, L) === Pt ? {} : { ...h(x, L) };
          if (D === "*") {
            const T = h(x, F)["*"];
            T && (n.push(...j(this, et, dt).call(this, T, e, h(x, L))), w(T, L, $), p.push(T));
            continue;
          }
          const [U, K, M] = D;
          if (!d && !(M instanceof RegExp))
            continue;
          const O = h(x, F)[U], R = a.slice(o).join("/");
          if (M instanceof RegExp) {
            const T = M.exec(R);
            if (T) {
              if ($[K] = T[0], n.push(...j(this, et, dt).call(this, O, e, h(x, L), $)), Object.keys(h(O, F)).length) {
                w(O, L, $);
                const S = ((l = T[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[S] || (c[S] = [])).push(O);
              }
              continue;
            }
          }
          (M === true || M.test(d)) && ($[K] = d, f ? (n.push(...j(this, et, dt).call(this, O, e, $, h(x, L))), h(O, F)["*"] && n.push(...j(this, et, dt).call(this, h(O, F)["*"], e, $, h(x, L)))) : (w(O, L, $), p.push(O)));
        }
      }
      i = p.concat(c.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "Nt"), ct = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakSet(), dt = /* @__PURE__ */ __name2(function(e, r, n, s) {
  const i = [];
  for (let a = 0, c = h(e, ct).length; a < c; a++) {
    const l = h(e, ct)[a], o = l[r] || l[C], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Pt || s && s !== Pt))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], g = u[o.score];
        o.params[p] = s != null && s[p] && !g ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "dt"), Nt);
var vt;
var Be;
var Xr = (Be = /* @__PURE__ */ __name2(class {
  constructor() {
    E(this, "name", "TrieRouter");
    A(this, vt);
    w(this, vt, new zr());
  }
  add(t, e, r) {
    const n = Ge(e);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, vt).insert(t, n[s], r);
      return;
    }
    h(this, vt).insert(t, e, r);
  }
  match(t, e) {
    return h(this, vt).search(t, e);
  }
}, "Be"), vt = /* @__PURE__ */ new WeakMap(), Be);
var sr = /* @__PURE__ */ __name2(class extends Dr {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Jr({ routers: [new Vr(), new Xr()] });
  }
}, "sr");
var Wr = /* @__PURE__ */ __name2((t) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var u;
    function l(d, f) {
      a.res.headers.set(d, f);
    }
    __name(l, "l");
    __name2(l, "l");
    const o = await n(a.req.header("origin") || "", a);
    if (o && l("Access-Control-Allow-Origin", o), r.credentials && l("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && l("Vary", "Origin"), r.maxAge != null && l("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
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
}, "Wr");
var Yr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var $e = /* @__PURE__ */ __name2((t, e = Zr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = t.match(r);
  if (!n)
    return;
  let s = e[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "$e");
var Qr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Zr = Qr;
var tn = /* @__PURE__ */ __name2((...t) => {
  let e = t.filter((s) => s !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = e.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "tn");
var ir = { br: ".br", zstd: ".zst", gzip: ".gz" };
var en = Object.keys(ir);
var rn = "index.html";
var nn = /* @__PURE__ */ __name2((t) => {
  const e = t.root ?? "./", r = t.path, n = t.join ?? tn;
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
    let c = n(e, !r && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(c) && (c = n(c, rn));
    const l = t.getContent;
    let o = await l(c, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const g = t.mimes && $e(c, t.mimes) || $e(c);
      if (s.header("Content-Type", g || "application/octet-stream"), t.precompressed && (!g || Yr.test(g))) {
        const m = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((x) => x.trim()));
        for (const x of en) {
          if (!m.has(x))
            continue;
          const v = await l(c + ir[x], s);
          if (v) {
            o = v, s.header("Content-Encoding", x), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = t.onFound) == null ? void 0 : f.call(t, c, s)), s.body(o);
    }
    await ((p = t.onNotFound) == null ? void 0 : p.call(t, c, s)), await i();
  };
}, "nn");
var sn = /* @__PURE__ */ __name2(async (t, e) => {
  let r;
  e && e.manifest ? typeof e.manifest == "string" ? r = JSON.parse(e.manifest) : r = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  e && e.namespace ? n = e.namespace : n = __STATIC_CONTENT;
  const s = r[t];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "sn");
var an = /* @__PURE__ */ __name2((t) => async function(r, n) {
  return nn({ ...t, getContent: async (i) => sn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "an");
var on = /* @__PURE__ */ __name2((t) => an(t), "on");
var cn = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function de(t) {
  return t.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(de, "de");
__name2(de, "de");
function ln(t) {
  return t.replace(/\s+/g, "").length;
}
__name(ln, "ln");
__name2(ln, "ln");
function It(t) {
  return t.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428\\.])[\\s]+(?=[\uAC00-\uD7A3A-Z])")).map((e) => e.trim()).filter(Boolean).map((e) => !e.endsWith(".") && !e.endsWith("?") && !e.endsWith("!") ? e + "." : e);
}
__name(It, "It");
__name2(It, "It");
function un(t) {
  return t.match(/\d+\.?\d*%?/g) || [];
}
__name(un, "un");
__name2(un, "un");
function Ct(t) {
  return Array.from(new Set(t.split(/\s+/).filter((e) => e.length >= 2 && !/^\d+$/.test(e)).slice(0, 10)));
}
__name(Ct, "Ct");
__name2(Ct, "Ct");
function dn(t, e) {
  const r = ["\uCC28\uC774", "\uBE44\uAD50", "\uB300\uC870", "\uBC18\uBA74", "\uC774\uC5D0 \uBC18\uD574", "\uD55C\uD3B8", "\uB2EC\uB9AC"];
  return e.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name(dn, "dn");
__name2(dn, "dn");
function hn(t, e) {
  const r = ["\uB530\uB77C\uC11C", "\uADF8\uB7EC\uBBC0\uB85C", "\uACB0\uB860", "\uC758\uBBF8", "\uC2DC\uC0AC", "\uC911\uC694", "\uD6A8\uACFC"];
  return e.filter((n) => r.some((s) => n.includes(s))).slice(0, 2);
}
__name(hn, "hn");
__name2(hn, "hn");
function fn(t, e) {
  var I;
  const r = It(t);
  Ct(t);
  const n = ln(t), s = cn[e], i = Math.floor(n * s.min), a = Math.floor(n * s.max), c = r.length, l = Math.max(1, Math.floor(c / 3)), o = Math.max(1, Math.floor(c * 2 / 3)), u = r.map((k, q) => {
    let H = 0;
    return q === 0 && (H += 5), q >= o && (H += 4), q < l && q > 0 && (H += 2), /(결론|결과|따라서|그러므로|정리하면|요약하면)/.test(k) && (H += 8), /(불신|맹신|믿고|생각|필요|중요|핵심|주요|문제)/.test(k) && (H += 6), /(차이|비교|대조|반면|이에 반해|한편)/.test(k) && (H += 5), /(효과|영향|향상|긍정|부정|증가|감소)/.test(k) && (H += 4), /(정의|개념|의미|일컫|규정|정리)/.test(k) && (H += 4), /(목적|이유|원인|배경|현황)/.test(k) && (H += 3), /(연구|조사|분석|실험|관찰|설문)/.test(k) && (H += 2), /\d+\.?\d*%/.test(k) && (H += 3), /\d{4}년/.test(k) && (H += 2), k.length >= 30 && k.length <= 150 && (H += 2), k.length < 15 && (H -= 3), k.length > 200 && (H -= 2), { sentence: k, score: H, index: q };
  }), p = u.sort((k, q) => q.score - k.score).slice(0, 8).sort((k, q) => k.index - q.index).map((k) => k.sentence), g = ((I = u.sort((k, q) => q.score - k.score)[0]) == null ? void 0 : I.sentence) || r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";
  let m = "";
  m = p.join(" "), m = m.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), m = m.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const x = de(m) / Math.max(de(t), 1), v = m, y = de(v), b = It(v), D = b[0] || g;
  let $ = b.slice(1, 4);
  $.length === 0 && b.length > 0 ? $ = [b[0]] : $.length === 0 && ($ = ["\uC6D0\uBB38\uC5D0\uC11C \uD575\uC2EC \uB0B4\uC6A9\uC744 \uCD94\uCD9C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."]);
  const U = [], K = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const k of K)
    v.includes(k) && U.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${k}"`);
  const M = { brief: 2, standard: 4, detail: 6 };
  b.length < M[e] && U.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${b.length}\uBB38\uC7A5 (\uCD5C\uC18C ${M[e]}\uBB38\uC7A5)`), ![/([가-힣]{2,4})(은|는|와|과)\s*([가-힣]{2,4})(의|을|를)/, /(차이|비교|대조|반면)/].some((k) => k.test(v)) && t.match(/(비교|대조|차이)/) && U.push("\uBE44\uAD50 \uC694\uC18C \uB204\uB77D");
  const T = t.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], S = v.match(/\d+\.?\d*%|\d+억|\d+만|\d+세/g) || [], N = { brief: Math.min(1, T.length), standard: Math.min(2, T.length), detail: Math.min(3, T.length) };
  return S.length < N[e] && T.length > 0 && U.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${S.length}\uAC1C (\uCD5C\uC18C ${N[e]}\uAC1C)`), { type: "narrative", level: e, text: v, charCount: y, ratio: x, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 - \uC6D0\uBB38 \uAE30\uBC18 \uC694\uC57D (\uC790\uB974\uAE30 \uC5C6\uC74C)", ratioEnforcement: { wasAdjusted: false, originalRatio: x, finalRatio: x, targetRatio: s.target }, coreClaim: D, grounds: $.slice(0, 5), comparisons: dn(t, b), implications: hn(t, b), warnings: U };
}
__name(fn, "fn");
__name2(fn, "fn");
function pn(t, e) {
  const r = It(t), n = Ct(t);
  return { type: "mindmap", level: e, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, 6).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(pn, "pn");
__name2(pn, "pn");
function mn(t, e, r = "preview") {
  return { type: "selftest", level: e, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: t.split(".")[0] + "." })) };
}
__name(mn, "mn");
__name2(mn, "mn");
function gn(t) {
  const e = It(t), r = Ct(t);
  return { unitName: e[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(gn, "gn");
__name2(gn, "gn");
function xn(t, e) {
  const r = It(t), n = 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const c = a * i, l = r.slice(c, c + i);
    if (l.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${l[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: l });
  }
  return s;
}
__name(xn, "xn");
__name2(xn, "xn");
function vn(t, e) {
  const r = Ct(t);
  un(t);
  const n = It(t), s = 7, i = [], a = r.filter((c) => t.includes(c));
  for (let c = 0; c < s && c < a.length; c++) {
    const l = a[c], o = yn(l), u = n.find((d) => d.includes(l)) || `${l}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    t.includes(l) && i.push({ word: l, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(vn, "vn");
__name2(vn, "vn");
function yn(t) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[t] || `${t}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(yn, "yn");
__name2(yn, "yn");
function Sn(t, e) {
  const r = gn(t), n = xn(t), s = vn(t), i = Ct(t), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: Ct(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], c = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), l = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: e, learningUnit: r, toc: l, hierarchy: a, glossary: c, coreTerms: s };
}
__name(Sn, "Sn");
__name2(Sn, "Sn");
var G = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var ar = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4", "\uC81C\uC2DC\uB41C\uB2E4", "\uBCF4\uC778\uB2E4", "\uACB0\uB860\uC774\uB2E4", "\uC885\uD569\uD558\uBA74", "\uC774\uC0C1\uC758 \uB0B4\uC6A9\uC744"];
var wn = [{ pattern1: /선행학습이?\s*없/, pattern2: /필요하다/, desc: "\uC120\uD589\uD559\uC2B5 \uC5C6\uC74C vs \uD544\uC694\uD568" }, { pattern1: /사교육이?\s*(거의\s*)?없/, pattern2: /의존/, desc: "\uC0AC\uAD50\uC721 \uC5C6\uC74C vs \uC758\uC874" }];
var Ft = ["7.6%", "2.8%", "6.5%", "0.2%"];
var or = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function lt(t) {
  return t == null ? "" : String(t);
}
__name(lt, "lt");
__name2(lt, "lt");
function je(t) {
  return lt(t).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(je, "je");
__name2(je, "je");
function cr(t) {
  return lt(t).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((e) => e.trim()).filter(Boolean);
}
__name(cr, "cr");
__name2(cr, "cr");
function te(t, e) {
  const r = lt(t);
  return e.filter((n) => r.includes(n)).length;
}
__name(te, "te");
__name2(te, "te");
function Dt(t, e, r) {
  const n = je(t), s = je(e), i = s / Math.max(n, 1), a = G[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a, originLen: n, sumLen: s };
}
__name(Dt, "Dt");
__name2(Dt, "Dt");
function bn(t, e) {
  const r = [], n = or[e], s = lt(t);
  for (const l of ar)
    s.includes(l) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${l}"`);
  for (const { pattern1: l, pattern2: o, desc: u } of wn)
    l.test(s) && o.test(s) && r.push(`\uB17C\uB9AC \uBAA8\uC21C: ${u}`);
  const i = cr(s), a = new Set(i.map((l) => l.trim()));
  if (a.size < i.length) {
    const l = i.length - a.size;
    r.push(`\uBB38\uC7A5 \uC911\uBCF5: ${l}\uD68C \uBC18\uBCF5`);
  }
  i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const c = te(s, Ft);
  return c < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${c}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(bn, "bn");
__name2(bn, "bn");
function En(t) {
  return t === "brief" ? ["\uACF5\uAD50\uC721 \uCC45\uC784\uACFC \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870\uC758 \uCC28\uC774\uAC00 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC758 \uCC28\uC774\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4."] : t === "standard" ? ["\uD55C\uAD6D\uC740 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4\uC774 \uB192\uACE0 \uC2A4\uC6E8\uB374\uC740 \uB0AE\uC544 \uAD6D\uAC00 \uBD80\uB2F4 \uAD6C\uC870\uAC00 \uB2E4\uB974\uB2E4.", "\uC774 \uCC28\uC774\uAC00 \uC120\uD589\uD559\uC2B5 \uD544\uC694\uC131\uACFC \uC785\uC2DC \uC911\uC2EC \uBB38\uD654\uC758 \uAC15\uB3C4\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC81C\uC2DC\uB41C\uB2E4."] : ["\uD55C\uAD6D\uC740 GDP \uB300\uBE44 \uACF5\uAD50\uC721 7.6%\uC640 \uBBFC\uAC04 \uBD80\uB2F4 2.8%\uAC00, \uC2A4\uC6E8\uB374\uC740 6.5%\uC640 0.2%\uAC00 \uC81C\uC2DC\uB41C\uB2E4.", "\uC785\uC2DC \uC81C\uB3C4, \uACF5\uAD50\uC721 \uC9C0\uC6D0, \uC785\uC2DC\uC5D0 \uB450\uB294 \uBE44\uC911\uC774 \uAD6D\uAC00\uBCC4 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uB9CC\uB4E0\uB2E4\uACE0 \uACB0\uB860\uC9D3\uB294\uB2E4."];
}
__name(En, "En");
__name2(En, "En");
function re(t, e, r) {
  const n = G[r];
  let s = cr(e);
  s.length === 0 && (s = [lt(e).trim()].filter(Boolean));
  const i = /* @__PURE__ */ __name2(() => s.join(" "), "i");
  let a = Dt(t, i(), r);
  if (a.ratio > n.max)
    for (; s.length > 1 && (s.pop(), a = Dt(t, i(), r), !(a.ratio <= n.max)); )
      ;
  if (a.ratio < n.min) {
    const c = En(r);
    for (const l of c)
      if (s.push(l), a = Dt(t, i(), r), a.ratio >= n.min)
        break;
  }
  return a = Dt(t, i(), r), { text: i().trim(), ratio: a.ratio, ok: a.ok, rule: n };
}
__name(re, "re");
__name2(re, "re");
function he(t) {
  const e = ["\uBBFC\uAC04 \uBD80\uB2F4", "\uBD80\uB2F4\uB960", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC", "\uBE44\uC728"], r = lt(t);
  let n = 0;
  for (const s of e)
    r.includes(s) && n++;
  return { score: n, need: 3 };
}
__name(he, "he");
__name2(he, "he");
function Tn(t) {
  const e = [], r = /* @__PURE__ */ __name2((n) => {
    if (!n)
      return;
    typeof n.label == "string" && e.push(n.label);
    const s = Array.isArray(n.children) ? n.children : [];
    for (const i of s)
      r(i);
  }, "r");
  return r(t), e;
}
__name(Tn, "Tn");
__name2(Tn, "Tn");
function lr(t) {
  var d;
  const e = [], r = [t.narrative.brief, t.narrative.standard, t.narrative.detail].join(" "), n = JSON.stringify(t.structured || {}), s = Tn((d = t.mindmap) == null ? void 0 : d.root).join(" | "), i = he(r), a = he(n), c = he(s);
  i.score < i.need && e.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), a.score < a.need && e.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), c.score < c.need && e.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || e.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || e.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || e.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const l = te(r, Ft), o = te(n, Ft), u = te(s, Ft);
  return l < 2 && e.push("\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), o < 2 && e.push("\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), u < 2 && e.push("\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), { ok: e.length === 0, errors: e };
}
__name(lr, "lr");
__name2(lr, "lr");
function kn(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(kn, "kn");
__name2(kn, "kn");
async function An(t) {
  t && await t.prepare(`
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
__name(An, "An");
__name2(An, "An");
async function Re(t, e) {
  const r = { ...e, sample_hash: e.sample_hash || kn((e.errors || []).join("|")) };
  t && (await An(t), await t.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Re, "Re");
__name2(Re, "Re");
function On(t, e, r, n) {
  const s = or[r].minNumbers, i = G[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 \uAD50\uC815\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418 \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${ar.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${Ft.join(", ")}
   - \uC22B\uC790\uB294 \uBC18\uB4DC\uC2DC \uB77C\uBCA8\uC744 \uBD99\uC5EC\uB77C(\uC608: "\uD55C\uAD6D \uBBFC\uAC04 \uBD80\uB2F4\uB960 2.8%").
\u2463 \uBB38\uC7A5\uC740 \uC9E7\uAC8C, \uD55C \uBB38\uC7A5 \uD55C \uC8FC\uC7A5.
\u2464 \uC5F0\uAD6C \uB17C\uBB38 \uB9D0\uD22C \uAE08\uC9C0, \uAD50\uACFC \uB3C5\uD574 \uB9D0\uD22C\uB85C \uC791\uC131.

\uC6D0\uBB38:
"""${t}"""

\uC2E4\uD328\uD55C \uC694\uC57D:
"""${e}"""

\uCD9C\uB825:
${r} \uB2E8\uACC4 \uC11C\uC220\uC694\uC57D \uBB38\uB2E8\uB9CC \uCD9C\uB825\uD558\uB77C.
`.trim();
}
__name(On, "On");
__name2(On, "On");
async function $n(t) {
  const { originalText: e, model: r, callLLM: n, db: s } = t, i = {}, a = ["brief", "standard", "detail"];
  for (const l of a) {
    let o = lt(t.narrative[l]).trim();
    const u = re(e, o, l);
    o = u.text, i[l] = { ratio: u.ratio, rule: u.rule };
    const d = bn(o, l), f = Dt(e, o, l);
    if (!d.ok || !f.ok) {
      const p = [...d.ok ? [] : d.errors, ...f.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(f.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(f.rule.min * 100)}~${Math.round(f.rule.max * 100)}%)`]];
      await Re(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: l, stage: "narrative", errors: p, ratio: f.ratio });
      const g = On(e, o, l, p), m = await Promise.resolve(n(g));
      t.narrative[l] = lt(m).trim();
      const x = re(e, t.narrative[l], l);
      t.narrative[l] = x.text, i[l] = { ratio: x.ratio, rule: x.rule, rewritten: true };
    } else
      t.narrative[l] = o;
  }
  const c = lr({ narrative: t.narrative, structured: t.structured, mindmap: t.mindmap });
  return c.ok || await Re(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: c.errors }), { narrative: t.narrative, structured: t.structured, mindmap: t.mindmap, qa: { cross_ok: c.ok, cross_errors: c.errors, ratios: i } };
}
__name($n, "$n");
__name2($n, "$n");
function ur(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return (e >>> 0).toString(16);
}
__name(ur, "ur");
__name2(ur, "ur");
function _(t, e) {
  const r = String(t || "").replace(/\s+/g, " ").trim();
  if (r.length <= e)
    return r;
  const n = r.slice(0, e), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(e * 0.6) ? n.slice(0, s + 1).trim() : r;
}
__name(_, "_");
__name2(_, "_");
function _e(t) {
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
__name(_e, "_e");
__name2(_e, "_e");
function jn(t) {
  let e = String(t || "");
  return e = e.replace(/-\s*\d+\s*-\s*/g, " "), e = e.replace(/학년별\s*통계/g, "\uD559\uB144\uBCC4 \uD1B5\uACC4"), e = e.replace(/점수\s*학년별\s*통계/g, "\uC810\uC218(\uD559\uB144\uBCC4 \uD1B5\uACC4)"), e = e.replace(/\r\n/g, `
`), e = e.replace(/[ \t]+/g, " "), e = e.replace(/\n{3,}/g, `

`), e = e.replace(/([가-힣])\n([가-힣])/g, "$1 $2"), e.trim();
}
__name(jn, "jn");
__name2(jn, "jn");
var Rn = ["\uC774 \uAE00\uC740", "\uBCF8 \uAE00\uC740", "\uC774 \uB17C\uBB38\uC740", "\uC774 \uBCF4\uACE0\uC11C\uB294", "\uC774 \uAE30\uC0AC\uB294", "\uC124\uBA85\uD55C\uB2E4", "\uC124\uBA85\uD558\uACE0 \uC788\uB2E4", "\uB2E4\uB8E8\uACE0 \uC788\uB2E4", "\uC11C\uC220\uD558\uACE0 \uC788\uB2E4", "\uC81C\uC2DC\uD558\uACE0 \uC788\uB2E4", "\uBD84\uC11D\uD558\uACE0 \uC788\uB2E4", "\uAC80\uD1A0\uD558\uACE0 \uC788\uB2E4", "\uB17C\uC758\uD558\uACE0 \uC788\uB2E4"];
function ht(t) {
  const e = String(t || "");
  return /(\.\.\.)|(\.\.\.\.)|(…{1,})|(\u2026)/.test(e) || /…\s*$/.test(e) || /[.]\s*[…]/.test(e);
}
__name(ht, "ht");
__name2(ht, "ht");
function ve(t) {
  return String(t || "").replace(/\s+/g, " ").trim().split(new RegExp("(?<=[.!?]|\uB2E4\\.|\uB2E4\\?|\uB2E4!|\uC694\\.|\uC694\\?|\uC694!)\\s+")).map((e) => e.trim()).filter(Boolean);
}
__name(ve, "ve");
__name2(ve, "ve");
function _n(t) {
  const e = fn(t, "detail"), r = Sn(t, "detail"), n = pn(t, "detail"), s = mn(e.text, "detail", "exam"), i = t.length, a = ur(t), c = e.coreClaim, l = e.grounds, o = e.comparisons || [], u = e.implications || [];
  let d = e.text;
  if (!d.includes(`

`)) {
    const v = d.split(". ").filter(Boolean), y = Math.ceil(v.length / 2);
    d = v.slice(0, y).join(". ") + `.

` + v.slice(y).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, g = r.glossary, m = { title: n.title, children: n.children.map((v) => ({ title: v.title, children: (v.children || []).map((y) => ({ title: y.title, pack: Array.isArray(y.pack) && y.pack.length >= 2 ? y.pack : [y.title, `${y.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: y.explain && y.explain.length >= 30 ? y.explain : `${y.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (m.children[0] || m.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); m.children[0].children.length < 3; ) {
    const v = m.children[0].children.length + 1;
    m.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${v}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${v}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const x = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: c, grounds: l, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: g }, mindmap: m, selftest: x };
}
__name(_n, "_n");
__name2(_n, "_n");
function Me(t) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", t].join(`
`);
}
__name(Me, "Me");
__name2(Me, "Me");
function fe(t, e) {
  var R;
  const r = e === "brief", n = e === "standard", s = t.narrative.coreClaim || "", i = t.narrative.grounds || [], a = t.narrative.comparisons || [], c = t.narrative.implications || [], l = ((R = t.source) == null ? void 0 : R.charCount) || 1e3;
  let o = "", u = s, d = [], f = [], p = [];
  if (e === "detail")
    o = String(t.narrative.summaryDetail || "").trim(), u = s, d = i, f = a, p = c;
  else if (e === "brief") {
    const T = Math.floor(l * 0.18);
    u = _(s, 60);
    const S = a[0] ? _(a[0], 80) : "";
    if (d = [], f = S ? [S] : [], p = [], S)
      o = `${u}. ${S}.`;
    else {
      const N = i[0] ? _(i[0], 60) : "";
      o = N ? `${u}. ${N}.` : `${u}.`;
    }
    o.length > T && (o = o.slice(0, Math.max(0, T - 1)).trim());
  } else {
    const T = Math.floor(l * 0.38);
    u = _(s, 80), d = i.slice(0, 2).map((I) => _(I, 70));
    const S = a[0] ? _(a[0], 90) : "";
    f = S ? [S] : [], p = [];
    const N = [u];
    if (d.length > 0 && N.push(d.join(". ")), S && N.push(`\uBC18\uBA74 ${S}`), o = N.join(". ") + ".", o.length > T)
      o = o.slice(0, Math.max(0, T - 1)).trim();
    else if (o.length < Math.floor(l * 0.25) && c.length > 0) {
      const I = _(c[0], 60);
      o += ` ${I}.`;
    }
  }
  const g = t.structured.toc || [], m = r ? 2 : n ? 4 : 10, x = (t.structured.glossary || []).slice(0, m).map((T) => ({ term: _(T.term, 20), def: _(T.def, r ? 70 : 120) })), v = r ? 2 : n ? 3 : 5, y = /* @__PURE__ */ __name2((T) => (T || []).map((S) => ({ title: _(S.title, 60), keywords: (S.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map((N) => _(N, 16)), bullets: (S.bullets || []).slice(0, v).map((N) => _(N, r ? 90 : 140)), children: S.children ? y(S.children) : void 0 })), "y"), b = y(t.structured.hierarchy || []), D = Mn({ toc: g, hierarchy: b, glossary: x }), $ = JSON.parse(JSON.stringify(t.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), U = r ? 70 : n ? 110 : 160, K = r ? 2 : 3;
  for (const T of $.children || [])
    for (const S of T.children || [])
      Array.isArray(S.pack) && (S.pack = S.pack.slice(0, K).map((N) => _(N, 20))), typeof S.explain == "string" && (S.explain = _(S.explain, U)), Array.isArray(S.children) || (S.children = []);
  const M = r || n ? 2 : 4, O = (t.selftest.items || []).slice(0, M).map((T) => {
    var S, N, I;
    return { id: T.id, type: T.type, question: _(T.question, r ? 140 : 220), hint: T.hint ? _(T.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((S = T.rubric) == null ? void 0 : S.mustInclude) || []).slice(0, r ? 2 : 4).map((k) => _(k, 20)), mustNotInclude: (((N = T.rubric) == null ? void 0 : N.mustNotInclude) || []).slice(0, 2).map((k) => _(k, 20)), maxChars: ((I = T.rubric) == null ? void 0 : I.maxChars) ?? (r ? 140 : 220) }, answerKey: T.answerKey ? _(T.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: d, comparisons: f, implications: p }, structured: { text: D, toc: g, hierarchy: b, glossary: x }, mindmap: { tree: $ }, selftest: { passScorePct: 90, items: O } };
}
__name(fe, "fe");
__name2(fe, "fe");
function Mn(t) {
  var n, s;
  const e = [];
  e.push("\u2160. \uBAA9\uCC28"), (n = t.toc) != null && n.length ? t.toc.forEach((i, a) => e.push(`  ${a + 1}. ${i.title}`)) : e.push("  1. \uBCF8\uBB38"), e.push(""), e.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name2((i, a) => {
    var c, l;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      e.push(`${u}- ${o.title}`), (c = o.keywords) != null && c.length && e.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => e.push(`${u}  \xB7 ${d}`)), (l = o.children) != null && l.length && r(o.children, a + 1);
    }
  }, "r");
  return r(t.hierarchy || [], 1), e.push(""), e.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = t.glossary) != null && s.length ? t.glossary.forEach((i) => e.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : e.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), e.join(`
`);
}
__name(Mn, "Mn");
__name2(Mn, "Mn");
function Nn(t) {
  var i, a, c, l, o, u, d, f;
  const e = [];
  (t == null ? void 0 : t.schemaVersion) !== "ms-v4" && e.push("schemaVersion must be ms-v4"), (!((i = t == null ? void 0 : t.narrative) != null && i.coreClaim) || t.narrative.coreClaim.length < 10) && e.push("narrative.coreClaim too short"), (!Array.isArray((a = t == null ? void 0 : t.narrative) == null ? void 0 : a.grounds) || t.narrative.grounds.length < 1) && e.push("narrative.grounds must be >= 1"), (!((c = t == null ? void 0 : t.narrative) != null && c.summaryDetail) || String(t.narrative.summaryDetail).split(`

`).length < 2) && e.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((l = t == null ? void 0 : t.structured) == null ? void 0 : l.hierarchy) || t.structured.hierarchy.length < 1) && e.push("structured.hierarchy missing"), (!Array.isArray((o = t == null ? void 0 : t.structured) == null ? void 0 : o.glossary) || t.structured.glossary.length < 1) && e.push("structured.glossary must be >= 1");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = t == null ? void 0 : t.mindmap) == null ? void 0 : u.children) || [])
    for (const g of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(g.pack) && g.pack.length && n++, typeof g.explain == "string" && g.explain.trim().length > 30 && s++;
  return r < 3 && e.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && e.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && e.push("mindmap explain coverage < 70%"), (!((d = t == null ? void 0 : t.selftest) != null && d.passScorePct) || t.selftest.passScorePct !== 90) && e.push("selftest.passScorePct must be 90"), (!Array.isArray((f = t == null ? void 0 : t.selftest) == null ? void 0 : f.items) || t.selftest.items.length < 2) && e.push("selftest.items must be >=2"), e;
}
__name(Nn, "Nn");
__name2(Nn, "Nn");
function In(t) {
  var o, u, d, f;
  const e = [], r = (t.brief.narrative.text || "").replace(/\s+/g, ""), n = (t.standard.narrative.text || "").replace(/\s+/g, ""), s = (t.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && e.push("brief narrative too short"), n.length < r.length + 20 && e.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && e.push("detail narrative not meaningfully longer than standard"), r === n && e.push("brief narrative equals standard narrative"), n === s && e.push("standard narrative equals detail narrative"), (((o = t.standard.structured.glossary) == null ? void 0 : o.length) || 0) < (((u = t.brief.structured.glossary) == null ? void 0 : u.length) || 0) && e.push("standard glossary must be >= brief glossary"), (((d = t.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = t.standard.structured.glossary) == null ? void 0 : f.length) || 0) && e.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((p) => {
    let g = 0;
    for (const m of (p == null ? void 0 : p.children) || [])
      g += ((m == null ? void 0 : m.children) || []).length;
    return g;
  }, "i"), a = i(t.brief.mindmap.tree), c = i(t.standard.mindmap.tree), l = i(t.detail.mindmap.tree);
  return a === c && c === l || e.push(`mindmap L2 count mismatch (brief:${a}, standard:${c}, detail:${l})`), e;
}
__name(In, "In");
__name2(In, "In");
async function pe(t, e) {
  var c, l, o, u;
  const r = t.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (l = (c = i == null ? void 0 : i.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(pe, "pe");
__name2(pe, "pe");
function ft(t) {
  return String(t || "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").replace(/\.\.+/g, ".").replace(/보여\s*진다/g, "\uBCF4\uC778\uB2E4").replace(/되어\s*지는/g, "\uB418\uB294").replace(/성적간/g, "\uC131\uC801 \uAC04").replace(/능력\s*에서/g, "\uB2A5\uB825\uC5D0\uC11C").trim();
}
__name(ft, "ft");
__name2(ft, "ft");
function W(t) {
  const e = ft(t);
  return Rn.some((r) => e.includes(r));
}
__name(W, "W");
__name2(W, "W");
function ne(t) {
  return String(t || "").replace(/(\.\.\.)|(\.\.\.\.)/g, " ").replace(/…/g, " ").replace(/\s{2,}/g, " ").trim();
}
__name(ne, "ne");
__name2(ne, "ne");
function se(t) {
  let e = ft(t);
  return e && !/[.!?]$/.test(e) && (e += "."), e;
}
__name(se, "se");
__name2(se, "se");
function Cn(t, e, r, n) {
  const s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  let i = se(ne(e));
  const a = Math.floor(n * G[t].max);
  let c = 0;
  for (; ve(i).length < s && c < r.length; ) {
    const l = se(ne(r[c++])), o = ft(i + " " + l);
    if (o.length <= a)
      i = o;
    else
      break;
  }
  return i;
}
__name(Cn, "Cn");
__name2(Cn, "Cn");
function me(t, e, r) {
  const n = e.length, s = _(ft(r.claim || ""), t === "brief" ? 80 : 120), i = (r.grounds || []).map((g) => _(ft(g), 140)).filter(Boolean), a = (r.comparisons || []).map((g) => _(ft(g), 140)).filter(Boolean), c = (r.implications || []).map((g) => _(ft(g), 140)).filter(Boolean);
  let l = "";
  if (t === "brief") {
    const g = (a[0] || i[0] || c[0] || "").trim();
    l = g ? `${s}. ${g}.` : `${s}.`;
  } else if (t === "standard") {
    const g = i.slice(0, 2), m = (a[0] || c[0] || "").trim(), x = [s];
    g.length && x.push(g.join(". ")), m && x.push(m), l = x.join(". ") + ".";
  } else {
    const g = i.slice(0, Math.max(3, Math.min(6, i.length))), m = [s, ...g].join(". ") + ".", x = [];
    a[0] && x.push(`\uD55C\uD3B8 ${a[0]}.`), c[0] && x.push(`${c[0]}.`);
    const v = x.length ? x.join(" ") : i[3] ? `${i[3]}.` : "";
    l = v ? `${m}

${v}` : m, l.includes(`

`) || (l = `${m}

${c[0] ? `${c[0]}.` : "\uC774 \uCC28\uC774\uB294 \uD559\uB144\uC774 \uC62C\uB77C\uAC08\uC218\uB85D \uC591\uC0C1\uC774 \uB2EC\uB77C\uC9C8 \uC218 \uC788\uC74C\uC744 \uC2DC\uC0AC\uD55C\uB2E4."}`);
  }
  const o = [...i, ...a, ...c].map((g) => se(g)).filter(Boolean);
  let u = Cn(t, l, o, n);
  u = ne(u), W(u) && (u = ve(u).filter((m) => !W(m)).join(" ").trim(), u || (u = s ? `${s}.` : "\uD575\uC2EC \uB0B4\uC6A9\uC744 \uC694\uC57D\uD588\uB2E4."));
  let f = re(e, u, t).text;
  if (ht(f) || W(f)) {
    const g = ve(f).map((m) => ne(m)).filter((m) => m && !W(m));
    f = se(g.join(" ").trim());
  }
  return re(e, f, t);
}
__name(me, "me");
__name2(me, "me");
function Pn(t) {
  t.post("/api/matrix", async (e) => {
    var o, u;
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, s = !!((o = e.env) != null && o.GEMINI_API_KEY && String(e.env.GEMINI_API_KEY).trim().length > 10), i = String(((u = e.env) == null ? void 0 : u.USE_MOCK) || "").toLowerCase() === "true", a = s && !i ? "phase2" : "phase1";
    let c = null;
    function l(d) {
      return { cross_ok: false, cross_errors: [d], ratios: { brief: { ratio: 0, ok: false }, standard: { ratio: 0, ok: false }, detail: { ratio: 0, ok: false } } };
    }
    __name(l, "l");
    __name2(l, "l");
    try {
      const d = await e.req.json(), f = String(d.text || "").trim(), p = jn(f);
      if (!p || p.length < 20) {
        const I = l(p ? "TEXT_TOO_SHORT" : "EMPTY_TEXT");
        return e.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uB108\uBB34 \uC9E7\uC2B5\uB2C8\uB2E4(\uCD5C\uC18C 20\uC790 \uAD8C\uC7A5)" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: I }, result: { qa: I } }, 400);
      }
      const g = ur(p);
      let m = null;
      if (a === "phase1")
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), m = _n(p);
      else {
        const I = Me(p);
        let k = await pe(e, I);
        if (m = _e(k), !m) {
          const q = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", Me(p)].join(`
`);
          k = await pe(e, q), m = _e(k);
        }
        if (!m)
          return e.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 502);
      }
      const x = Nn(m);
      if (x.length)
        return e.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: x.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 422);
      const v = fe(m, "brief"), y = fe(m, "standard"), b = fe(m, "detail"), D = { claim: m.narrative.coreClaim || "", grounds: m.narrative.grounds || [], comparisons: m.narrative.comparisons || [], implications: m.narrative.implications || [] }, $ = me("brief", p, D), U = me("standard", p, D), K = me("detail", p, D);
      v.narrative.text = $.text, y.narrative.text = U.text, b.narrative.text = K.text, v.narrative.ratio = $.ratio, y.narrative.ratio = U.ratio, b.narrative.ratio = K.ratio;
      const M = [];
      if ((ht(v.narrative.text) || ht(y.narrative.text) || ht(b.narrative.text)) && M.push("ELLIPSIS_OR_TRUNCATION_FOUND"), (W(v.narrative.text) || W(y.narrative.text) || W(b.narrative.text)) && M.push("FORBIDDEN_TOPIC_TOKEN_FOUND"), M.length && a === "phase2")
        return e.json({ ok: false, error: { code: "NARRATIVE_FORTRESS_FAIL", message: M.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 422);
      console.log("[Matrix V4] FORTRESS narrative-quality:", { brief_ratio: $.ratio, standard_ratio: U.ratio, detail_ratio: K.ratio, hardFailReasons: M });
      const O = { narrative: { ...v.narrative, ratio: v.narrative.ratio, warnings: M }, structured: v.structured, mindmap: v.mindmap, selftest: v.selftest }, R = { narrative: { ...y.narrative, ratio: y.narrative.ratio, warnings: M }, structured: y.structured, mindmap: y.mindmap, selftest: y.selftest };
      b.narrative.warnings = M;
      const T = In({ brief: O, standard: R, detail: b });
      if (T.length && a === "phase2")
        return e.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: T.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 422);
      let S = { brief: O.narrative.text, standard: R.narrative.text, detail: b.narrative.text };
      if (c = null, a === "phase2")
        try {
          const I = /* @__PURE__ */ __name2(async (q) => await pe(e, q), "I"), k = await $n({ originalText: p, model: e.env.GEMINI_MODEL || "gemini", callLLM: I, db: e.env.DB, narrative: S, structured: { brief: O.structured, standard: R.structured, detail: b.structured }, mindmap: { brief: O.mindmap, standard: R.mindmap, detail: b.mindmap } });
          S = k.narrative, c = k.qa, (ht(S.brief) || ht(S.standard) || ht(S.detail) || W(S.brief) || W(S.standard) || W(S.detail)) && (S = { brief: O.narrative.text, standard: R.narrative.text, detail: b.narrative.text }, c = c || null), O.narrative.text = S.brief, R.narrative.text = S.standard, b.narrative.text = S.detail, console.log("[Matrix V4] Phase 2 Quality Gate \uC644\uB8CC:", { cross_ok: c == null ? void 0 : c.cross_ok, ratios: c == null ? void 0 : c.ratios });
        } catch (I) {
          console.error("[Matrix V4] Phase 2 \uC624\uB958:", I.message), c = null;
        }
      if (a === "phase1" || !c) {
        const I = lr({ narrative: S, structured: { brief: O.structured, standard: R.structured, detail: b.structured }, mindmap: { brief: O.mindmap, standard: R.mindmap, detail: b.mindmap } });
        c = { cross_ok: I.ok, cross_errors: I.errors.concat(M.map((k) => `FORTRESS_${k}`)), ratios: { brief: { ratio: O.narrative.ratio, rule: G.brief, ok: O.narrative.ratio >= G.brief.min && O.narrative.ratio <= G.brief.max }, standard: { ratio: R.narrative.ratio, rule: G.standard, ok: R.narrative.ratio >= G.standard.min && R.narrative.ratio <= G.standard.max }, detail: { ratio: b.narrative.ratio, rule: G.detail, ok: b.narrative.ratio >= G.detail.min && b.narrative.ratio <= G.detail.max } } }, console.log("[Matrix V4] Phase 1 \uC9C4\uB2E8 \uC644\uB8CC (FORTRESS):", { cross_ok: c.cross_ok, ratios_ok: [c.ratios.brief.ok, c.ratios.standard.ok, c.ratios.detail.ok] });
      }
      const N = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: O, standard: R, detail: b }, views: { narrative: { brief: O.narrative, standard: R.narrative, detail: b.narrative }, structured: { brief: O.structured, standard: R.structured, detail: b.structured }, mindmap: { brief: O.mindmap, standard: R.mindmap, detail: b.mindmap }, selftest: { brief: O.selftest, standard: R.selftest, detail: b.selftest } } }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c }, result: { qa: c } };
      return e.json(N, 200);
    } catch (d) {
      return e.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (d == null ? void 0 : d.message) || String(d) }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: c } }, 500);
    }
  }), t.post("/api/selftest/grade", async (e) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => ts), n = await e.req.json(), { sheet: s, attempt: i } = n;
      if (!s || !i)
        return e.json({ ok: false, error: "sheet and attempt required" }, 400);
      const a = r(s, i);
      return e.json(a, 200);
    } catch (r) {
      return e.json({ ok: false, error: (r == null ? void 0 : r.message) || String(r) }, 500);
    }
  }), t.get("/api/fail-report", async (e) => {
    var r;
    try {
      const { buildFailReport: n } = await Promise.resolve().then(() => ns), s = Number(e.req.query("hours")) || 168, i = (r = e.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return e.json({ ok: true, report: a }, 200);
    } catch (n) {
      return e.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Pn, "Pn");
__name2(Pn, "Pn");
var Y = new sr();
Y.use("/api/*", Wr());
Y.use("/static/*", on({ root: "./public" }));
Pn(Y);
function qt() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(qt, "qt");
__name2(qt, "qt");
function we(t) {
  const e = String(t || "");
  let r = 2166136261;
  for (let n = 0; n < e.length; n++)
    r ^= e.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(we, "we");
__name2(we, "we");
function Dn(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Dn, "Dn");
__name2(Dn, "Dn");
function Ln(t) {
  const e = String(t).toLowerCase();
  return e === "brief" || e === "b" ? "brief" : e === "detail" || e === "d" ? "detail" : "standard";
}
__name(Ln, "Ln");
__name2(Ln, "Ln");
function Hn(t) {
  const e = String(t).toLowerCase();
  return e === "structured" || e === "struct" ? "structured" : e === "mindmap" || e === "mind" ? "mindmap" : e === "selftest" || e === "test" ? "selftest" : "narrative";
}
__name(Hn, "Hn");
__name2(Hn, "Hn");
function Fn(t, e) {
  const r = Math.max(60, At(t)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), c = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: c };
}
__name(Fn, "Fn");
__name2(Fn, "Fn");
function qn(t) {
  const e = String((t == null ? void 0 : t.text) || "").trim(), r = Hn((t == null ? void 0 : t.viewType) || "narrative"), n = Ln(t == null ? void 0 : t.level), s = "detail", { base: i, min: a, max: c } = Fn(e), l = String((t == null ? void 0 : t.grade) || "general").toLowerCase(), o = String((t == null ? void 0 : t.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${l}, subject=${o}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", e].join(`
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
`.trim(), m = `
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
  return r === "structured" ? x = p : r === "mindmap" ? x = g : r === "selftest" && (x = m), `${d}

${x}`;
}
__name(qn, "qn");
__name2(qn, "qn");
function St(t) {
  return String(t || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(St, "St");
__name2(St, "St");
function oe(t) {
  const e = St(t);
  return e ? e.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(oe, "oe");
__name2(oe, "oe");
function Bn(t) {
  const e = St(t).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Bn, "Bn");
__name2(Bn, "Bn");
function be(t) {
  const e = St(t).split(`
`), r = Bn(t);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: St(t) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], c = i.startIdx, l = a ? a.startIdx : e.length, o = i.title, u = e.slice(c + 1, l).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(be, "be");
__name2(be, "be");
function Un(t) {
  const e = t.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(t) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(t) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(t) && (r += 2), /\d{4}/.test(t) && (r += 1), e > 180 && (r -= 2), e > 260 && (r -= 3), e < 18 && (r -= 1), r;
}
__name(Un, "Un");
__name2(Un, "Un");
function kt(t, e) {
  const n = oe(t).map((i, a) => ({ s: i, i: a, score: Un(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Dn(e, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(kt, "kt");
__name2(kt, "kt");
function At(t) {
  return String(t || "").replace(/\s+/g, "").length;
}
__name(At, "At");
__name2(At, "At");
var ye = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Ne(t, e, r) {
  const n = Math.max(60, At(t)), s = At(e), i = Math.floor(n * ye[r].min), a = Math.ceil(n * ye[r].max);
  return s < i ? { text: e, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: e, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: e, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(Ne, "Ne");
__name2(Ne, "Ne");
function Bt(t, e, r) {
  const n = Math.max(60, At(t)), s = Math.ceil(n * ye[r].max);
  let i = String(e || "").trim();
  if (At(i) <= s)
    return i;
  const a = oe(i);
  let c = "";
  for (const l of a) {
    const o = (c ? c + " " : "") + l;
    if (At(o) > s)
      break;
    c = o;
  }
  return c || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(Bt, "Bt");
__name2(Bt, "Bt");
function ge(t, e) {
  return `${t}_${e}`;
}
__name(ge, "ge");
__name2(ge, "ge");
function Kn(t) {
  const e = be(t), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return e.forEach((s, i) => {
    const a = ge("sec", i + 1), c = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, l = kt(s.body, 6), o = [];
    for (const y of l)
      (y.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((D) => {
        const $ = D.replace(/[()]/g, "").trim();
        $.length >= 2 && $.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test($) && o.push($);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((y) => u.set(y, (u.get(y) || 0) + 1));
    const d = Array.from(u.entries()).sort((y, b) => b[1] - y[1]).map((y) => y[0]).filter((y) => y.length <= 10).slice(0, 3), f = kt(s.body, 3).join(" "), p = kt(s.body, 2).join(" "), g = kt(s.body, 1).join(" "), m = { id: ge(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: g, children: [] };
    d.forEach((y) => {
      n.has(y) || n.set(y, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${y}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${kt(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const v = oe(s.body).filter((y) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(y)).slice(0, 2);
    v.length && m.children.push({ id: ge(a + "_adv", 1), title: v.join(" "), type: "advanced", collapsed: true, children: [] }), c.children.push(m), r.children.push(c);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Kn, "Kn");
__name2(Kn, "Kn");
function dr(t, e) {
  const r = JSON.parse(JSON.stringify(t)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (e === "brief" && (s.explain = s.explainBrief || s.explain), e === "standard" && (s.explain = s.explainStandard || s.explain), e === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = e !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(dr, "dr");
__name2(dr, "dr");
function Gn(t, e, r, n) {
  const s = (e.children || []).map((u) => u.title), a = (dr(e, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), c = n === "brief" ? 4 : n === "standard" ? 6 : 10, l = r.slice(0, c).map((u) => ({ term: u.term, def: Bt(t, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${Bt(t, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), l.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: l, renderText: o.join(`
`) };
}
__name(Gn, "Gn");
__name2(Gn, "Gn");
function Vn(t, e) {
  const r = be(t), n = e === "brief" ? 2 : e === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const c = e === "brief" || e === "standard" ? 1 : 2;
    s.push(...kt(a.body, c));
  });
  const i = s.slice(0, n).join(" ");
  return Bt(t, i, e);
}
__name(Vn, "Vn");
__name2(Vn, "Vn");
function Jn(t, e) {
  be(t);
  const r = oe(t), n = [], s = r.find((c) => /(일컫|정의|란)/.test(c)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((c) => /(이에 반해|반면|대조)/.test(c));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((c) => /(%|\d{4}|전형|가산점|비율)/.test(c));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Jn, "Jn");
__name2(Jn, "Jn");
function zn(t, e) {
  let r = t.length, n = 0;
  const s = [];
  for (const a of t) {
    const c = ((e == null ? void 0 : e[a.id]) || "").trim();
    if (!c) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((g) => g.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((g) => {
      c.includes(g) && d++;
    });
    const f = d >= 2 || c.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(zn, "zn");
__name2(zn, "zn");
function Ie(t) {
  const e = St(t), { tree: r, glossary: n } = Kn(e), s = { originalMeta: { textHash: we(e), chars: e.length, ts: qt() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Vn(e, i), c = Gn(e, r, n, i), l = dr(r, i), o = Jn(e), d = Ne(e, a, i).ok ? a : Bt(e, a, i), f = c.renderText || "", p = Ne(e, f, i);
    c.renderText = p.ok ? f : Bt(e, f, i), s.modes[i] = { narrative: d, structured: c, mindmap: { tree: l }, selftest: o };
  }), s;
}
__name(Ie, "Ie");
__name2(Ie, "Ie");
Y.get("/api/health", async (t) => {
  const e = !!t.env.DB, r = !!t.env.GEMINI_API_KEY;
  return t.json({ ok: true, ts: qt(), hasDB: e, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
Y.post("/api/engine", async (t) => {
  var p, g, m, x, v, y, b;
  const e = await t.req.json().catch(() => ({})), r = String((e == null ? void 0 : e.text) || ""), n = (e == null ? void 0 : e.mode) === "brief" || (e == null ? void 0 : e.mode) === "standard" || (e == null ? void 0 : e.mode) === "detail" ? e.mode : "standard", s = (e == null ? void 0 : e.viewType) === "narrative" || (e == null ? void 0 : e.viewType) === "structured" || (e == null ? void 0 : e.viewType) === "mindmap" || (e == null ? void 0 : e.viewType) === "selftest" ? e.viewType : "narrative";
  String((e == null ? void 0 : e.userId) || "anon");
  const i = String((e == null ? void 0 : e.grade) || "general"), a = String((e == null ? void 0 : e.subject) || "general"), c = (e == null ? void 0 : e.useGemini) === true, l = St(r);
  if (l.length < 5)
    return t.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (c && t.env.GEMINI_API_KEY)
    try {
      const D = qn({ text: l, viewType: s, level: "detail", grade: i, subject: a }), $ = t.env.GEMINI_MODEL || "gemini-2.0-flash-exp", K = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${$}:generateContent?key=${t.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: D }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), O = (((v = (x = (m = (g = (p = K == null ? void 0 : K.candidates) == null ? void 0 : p[0]) == null ? void 0 : g.content) == null ? void 0 : m.parts) == null ? void 0 : x[0]) == null ? void 0 : v.text) || "").match(/\{[\s\S]*\}/);
      if (O) {
        const R = JSON.parse(O[0]);
        u = { originalMeta: { textHash: we(l), chars: l.length, ts: qt() }, modes: { detail: { [s]: R }, standard: { [s]: R }, brief: { [s]: R } } }, o = "gemini-" + $;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (D) {
      console.error("[Gemini Error]", D), u = Ie(l), o = "v5-local-fallback";
    }
  else
    u = Ie(l);
  const d = (b = (y = u.modes) == null ? void 0 : y[n]) == null ? void 0 : b[s], f = { engine: o, mode: n, viewType: s, ts: qt(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return t.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
Y.post("/api/selftest/score", async (t) => {
  const e = await t.req.json().catch(() => ({})), r = Array.isArray(e == null ? void 0 : e.questions) ? e.questions : [], n = e != null && e.answers && typeof e.answers == "object" ? e.answers : {}, s = zn(r, n);
  return t.json({ ok: true, result: s });
});
Y.post("/api/saveSummary", async (t) => {
  const e = t.env.DB;
  if (!e)
    return t.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await t.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = St(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return t.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), c = qt(), l = we(s), o = JSON.stringify(i);
  return await e.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, c, c, l, s, o).run(), t.json({ ok: true, id: a, textHash: l, ts: c });
});
Y.get("/api/loadSummary", async (t) => {
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
Y.get("/", (t) => t.redirect("/static/v5.html"));
var Ce = new sr();
var Xn = Object.assign({ "/src/index.tsx": Y });
var hr = false;
for (const [, t] of Object.entries(Xn))
  t && (Ce.route("/", t), Ce.notFound(t.notFoundHandler), hr = true);
if (!hr)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Ut(t) {
  return (t || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Ut, "Ut");
__name2(Ut, "Ut");
function Pe(t, e) {
  const r = Ut(t);
  return e.some((n) => r.includes(Ut(n)));
}
__name(Pe, "Pe");
__name2(Pe, "Pe");
function Wn(t, e) {
  const r = Ut(t);
  return e.every((n) => r.includes(Ut(n)));
}
__name(Wn, "Wn");
__name2(Wn, "Wn");
function Yn(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
__name(Yn, "Yn");
__name2(Yn, "Yn");
function Qn(t, e, r) {
  var g, m, x, v;
  const n = Ut(e), s = 100;
  if (!n) {
    const y = r === 1 ? t.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? t.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, b = r >= 3 ? t.explanation || t.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: t.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: y, explanationToShow: b };
  }
  const i = ((g = t.rubric) == null ? void 0 : g.mustIncludeAny) || [], a = ((m = t.rubric) == null ? void 0 : m.mustIncludeAll) || [], c = ((x = t.rubric) == null ? void 0 : x.forbid) || [], l = (v = t.rubric) == null ? void 0 : v.maxChars;
  let o = 100, u = [];
  l && n.length > l && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${l}`)), c.length && Pe(n, c) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !Wn(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !Pe(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = Yn(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? t.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? t.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !d && r >= 3 ? t.explanation || t.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: t.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(Qn, "Qn");
__name2(Qn, "Qn");
function Zn(t, e) {
  const r = Math.max(1, Math.floor(e.attemptNo || 1)), n = t.questions.map((l) => {
    var u;
    const o = ((u = e.userAnswers) == null ? void 0 : u[l.id]) ?? "";
    return Qn(l, o, r);
  }), s = Math.round(n.reduce((l, o) => l + o.score, 0) / Math.max(1, n.length)), i = n.filter((l) => !l.correct).map((l) => l.id), a = s >= t.masteryScore;
  let c = "";
  return a ? c = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? c = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? c = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : c = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: c } };
}
__name(Zn, "Zn");
__name2(Zn, "Zn");
var ts = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: Zn }, Symbol.toStringTag, { value: "Module" }));
var es = [];
async function fr(t) {
  t && await t.prepare(`
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
__name2(fr, "fr");
async function rs(t, e) {
  const r = (e == null ? void 0 : e.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (t) {
    await fr(t);
    const l = await t.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((l == null ? void 0 : l.results) || []).map((o) => ({ ts: o.ts, model: o.model, level: o.level, stage: o.stage, errors: JSON.parse(o.errors || "[]"), ratio: o.ratio, sample_hash: o.sample_hash }));
  } else
    s = es.filter((l) => l.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const l of s) {
    i[l.stage] = (i[l.stage] || 0) + 1;
    for (const o of l.errors || [])
      a[o] = (a[o] || 0) + 1;
  }
  const c = Object.entries(a).sort((l, o) => o[1] - l[1]).slice(0, 10).map(([l, o]) => ({ error: l, count: o }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: c, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(rs, "rs");
__name2(rs, "rs");
var ns = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: rs, ensureFailLogTable: fr }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = Ce;
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

// .wrangler/tmp/pages-dQlvip/kml1iqc71qd.js
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

// .wrangler/tmp/bundle-p8vk5X/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-p8vk5X/middleware-loader.entry.ts
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
//# sourceMappingURL=kml1iqc71qd.js.map
