var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-Mexpxm/checked-fetch.js
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

// .wrangler/tmp/bundle-Mexpxm/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-kfrdKi/bundledWorker-0.9416372787123086.mjs
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
var kr = Object.defineProperty;
var Mt = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "Mt");
var Ar = /* @__PURE__ */ __name2((e, t, r) => t in e ? kr(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Ar");
var E = /* @__PURE__ */ __name2((e, t, r) => Ar(e, typeof t != "symbol" ? t + "" : t, r), "E");
var ft = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || Mt("Cannot " + r), "ft");
var h = /* @__PURE__ */ __name2((e, t, r) => (ft(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var T = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? Mt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "T");
var b = /* @__PURE__ */ __name2((e, t, r, n) => (ft(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "b");
var j = /* @__PURE__ */ __name2((e, t, r) => (ft(e, t, "access private method"), r), "j");
var Rt = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  b(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "Rt");
var Ct = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
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
  __name2(a, "a");
}, "Ct");
var $r = Symbol();
var Or = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof rr ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? jr(e, { all: r, dot: n }) : {};
}, "Or");
async function jr(e, t) {
  const r = await e.formData();
  return r ? _r(r, t) : {};
}
__name(jr, "jr");
__name2(jr, "jr");
function _r(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? Mr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (Rr(r, n, s), delete r[n]);
  }), r;
}
__name(_r, "_r");
__name2(_r, "_r");
var Mr = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "Mr");
var Rr = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "Rr");
var Yt = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Yt");
var Cr = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = Nr(e), n = Yt(r);
  return Ir(n, t);
}, "Cr");
var Nr = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "Nr");
var Ir = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "Ir");
var nt = {};
var Pr = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return nt[n] || (r[2] ? nt[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : nt[n] = [e, r[1], true]), nt[n];
  }
  return null;
}, "Pr");
var kt = /* @__PURE__ */ __name2((e, t) => {
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
}, "kt");
var Dr = /* @__PURE__ */ __name2((e) => kt(e, decodeURI), "Dr");
var Qt = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return Dr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Qt");
var Lr = /* @__PURE__ */ __name2((e) => {
  const t = Qt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Lr");
var Oe = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = Oe(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "Oe");
var Zt = /* @__PURE__ */ __name2((e) => {
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
}, "Zt");
var pt = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? kt(e, tr) : e) : e, "pt");
var er = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const c = a + t.length + 2, o = e.indexOf("&", c);
        return pt(e.slice(c, o === -1 ? void 0 : o));
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
    if (n && (c = pt(c)), i = a, c === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = e.slice(l + 1, a === -1 ? void 0 : a), n && (o = pt(o))), r ? (s[c] && Array.isArray(s[c]) || (s[c] = []), s[c].push(o)) : s[c] ?? (s[c] = o);
  }
  return t ? s[t] : s;
}, "er");
var Hr = er;
var qr = /* @__PURE__ */ __name2((e, t) => er(e, t, true), "qr");
var tr = decodeURIComponent;
var Nt = /* @__PURE__ */ __name2((e) => kt(e, tr), "Nt");
var Ce;
var J;
var oe;
var nr;
var sr;
var wt;
var le;
var Kt;
var rr = (Kt = /* @__PURE__ */ __name2(class {
  constructor(e, t = "/", r = [[]]) {
    T(this, oe);
    E(this, "raw");
    T(this, Ce);
    T(this, J);
    E(this, "routeIndex", 0);
    E(this, "path");
    E(this, "bodyCache", {});
    T(this, le, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, b(this, J, r), b(this, Ce, {});
  }
  param(e) {
    return e ? j(this, oe, nr).call(this, e) : j(this, oe, sr).call(this);
  }
  query(e) {
    return Hr(this.url, e);
  }
  queries(e) {
    return qr(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Or(this, e));
  }
  json() {
    return h(this, le).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return h(this, le).call(this, "text");
  }
  arrayBuffer() {
    return h(this, le).call(this, "arrayBuffer");
  }
  blob() {
    return h(this, le).call(this, "blob");
  }
  formData() {
    return h(this, le).call(this, "formData");
  }
  addValidatedData(e, t) {
    h(this, Ce)[e] = t;
  }
  valid(e) {
    return h(this, Ce)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [$r]() {
    return h(this, J);
  }
  get matchedRoutes() {
    return h(this, J)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, J)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Kt"), Ce = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakSet(), nr = /* @__PURE__ */ __name2(function(e) {
  const t = h(this, J)[0][this.routeIndex][1][e], r = j(this, oe, wt).call(this, t);
  return r && /\%/.test(r) ? Nt(r) : r;
}, "nr"), sr = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(h(this, J)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = j(this, oe, wt).call(this, h(this, J)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? Nt(n) : n);
  }
  return e;
}, "sr"), wt = /* @__PURE__ */ __name2(function(e) {
  return h(this, J)[1] ? h(this, J)[1][e] : e;
}, "wt"), le = /* @__PURE__ */ new WeakMap(), Kt);
var Fr = { Stringify: 1 };
var ir = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((c) => ir(c, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "ir");
var Br = "text/plain; charset=UTF-8";
var mt = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "mt");
var We;
var Ye;
var ne;
var Ne;
var se;
var G;
var Qe;
var Ie;
var Pe;
var ye;
var Ze;
var et;
var ue;
var je;
var Vt;
var Ur = (Vt = /* @__PURE__ */ __name2(class {
  constructor(e, t) {
    T(this, ue);
    T(this, We);
    T(this, Ye);
    E(this, "env", {});
    T(this, ne);
    E(this, "finalized", false);
    E(this, "error");
    T(this, Ne);
    T(this, se);
    T(this, G);
    T(this, Qe);
    T(this, Ie);
    T(this, Pe);
    T(this, ye);
    T(this, Ze);
    T(this, et);
    E(this, "render", (...e2) => (h(this, Ie) ?? b(this, Ie, (t2) => this.html(t2)), h(this, Ie).call(this, ...e2)));
    E(this, "setLayout", (e2) => b(this, Qe, e2));
    E(this, "getLayout", () => h(this, Qe));
    E(this, "setRenderer", (e2) => {
      b(this, Ie, e2);
    });
    E(this, "header", (e2, t2, r) => {
      this.finalized && b(this, G, new Response(h(this, G).body, h(this, G)));
      const n = h(this, G) ? h(this, G).headers : h(this, ye) ?? b(this, ye, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    E(this, "status", (e2) => {
      b(this, Ne, e2);
    });
    E(this, "set", (e2, t2) => {
      h(this, ne) ?? b(this, ne, /* @__PURE__ */ new Map()), h(this, ne).set(e2, t2);
    });
    E(this, "get", (e2) => h(this, ne) ? h(this, ne).get(e2) : void 0);
    E(this, "newResponse", (...e2) => j(this, ue, je).call(this, ...e2));
    E(this, "body", (e2, t2, r) => j(this, ue, je).call(this, e2, t2, r));
    E(this, "text", (e2, t2, r) => !h(this, ye) && !h(this, Ne) && !t2 && !r && !this.finalized ? new Response(e2) : j(this, ue, je).call(this, e2, t2, mt(Br, r)));
    E(this, "json", (e2, t2, r) => j(this, ue, je).call(this, JSON.stringify(e2), t2, mt("application/json", r)));
    E(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => j(this, ue, je).call(this, s, t2, mt("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? ir(e2, Fr.Stringify, false, {}).then(n) : n(e2);
    });
    E(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    E(this, "notFound", () => (h(this, Pe) ?? b(this, Pe, () => new Response()), h(this, Pe).call(this, this)));
    b(this, We, e), t && (b(this, se, t.executionCtx), this.env = t.env, b(this, Pe, t.notFoundHandler), b(this, et, t.path), b(this, Ze, t.matchResult));
  }
  get req() {
    return h(this, Ye) ?? b(this, Ye, new rr(h(this, We), h(this, et), h(this, Ze))), h(this, Ye);
  }
  get event() {
    if (h(this, se) && "respondWith" in h(this, se))
      return h(this, se);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (h(this, se))
      return h(this, se);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, G) || b(this, G, new Response(null, { headers: h(this, ye) ?? b(this, ye, new Headers()) }));
  }
  set res(e) {
    if (h(this, G) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, G).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, G).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    b(this, G, e), this.finalized = true;
  }
  get var() {
    return h(this, ne) ? Object.fromEntries(h(this, ne)) : {};
  }
}, "Vt"), We = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakSet(), je = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = h(this, G) ? new Headers(h(this, G).headers) : h(this, ye) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, Ne);
  return new Response(e, { status: s, headers: n });
}, "je"), Vt);
var D = "ALL";
var Gr = "all";
var Kr = ["get", "post", "put", "delete", "options", "patch"];
var ar = "Can not add a route since the matcher is already built.";
var or = /* @__PURE__ */ __name2(class extends Error {
}, "or");
var Vr = "__COMPOSED_HANDLER";
var Jr = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "Jr");
var It = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "It");
var W;
var L;
var cr;
var Y;
var xe;
var st;
var it;
var De;
var zr = (De = /* @__PURE__ */ __name2(class {
  constructor(t = {}) {
    T(this, L);
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
    T(this, W, "/");
    E(this, "routes", []);
    T(this, Y, Jr);
    E(this, "errorHandler", It);
    E(this, "onError", (t2) => (this.errorHandler = t2, this));
    E(this, "notFound", (t2) => (b(this, Y, t2), this));
    E(this, "fetch", (t2, ...r) => j(this, L, it).call(this, t2, r[1], r[0], t2.method));
    E(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${Oe("/", t2)}`, r), n2, s2)));
    E(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(j(this, L, it).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Kr, Gr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? b(this, W, a) : j(this, L, xe).call(this, i, h(this, W), a), l.forEach((c) => {
        j(this, L, xe).call(this, i, h(this, W), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        b(this, W, c);
        for (const o of [i].flat())
          l.map((u) => {
            j(this, L, xe).call(this, o.toUpperCase(), h(this, W), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? b(this, W, i) : (b(this, W, "*"), a.unshift(i)), a.forEach((l) => {
      j(this, L, xe).call(this, D, h(this, W), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Qt : Lr;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === It ? i = s.handler : (i = /* @__PURE__ */ __name2(async (l, c) => (await Ct([], r.errorHandler)(l, () => s.handler(l, c))).res, "i"), i[Vr] = s.handler), j(a = n, L, xe).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = j(this, L, cr).call(this);
    return r._basePath = Oe(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((c) => c, "s") : s = n.replaceRequest));
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
      const c = Oe(this._basePath, t), o = c === "/" ? 0 : c.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(o) || "/", new Request(d, u);
      };
    })());
    const l = /* @__PURE__ */ __name2(async (c, o) => {
      const u = await r(s(c.req.raw), ...a(c));
      if (u)
        return u;
      await o();
    }, "l");
    return j(this, L, xe).call(this, D, Oe(t, "*"), l), this;
  }
}, "De"), W = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakSet(), cr = /* @__PURE__ */ __name2(function() {
  const t = new De({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, b(t, Y, h(this, Y)), t.routes = this.routes, t;
}, "cr"), Y = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = Oe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "xe"), st = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "st"), it = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await j(this, L, it).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), l = new Ur(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, Y) });
  if (a[0].length === 1) {
    let o;
    try {
      o = a[0][0][0][0](l, async () => {
        l.res = await h(this, Y).call(this, l);
      });
    } catch (u) {
      return j(this, L, st).call(this, u, l);
    }
    return o instanceof Promise ? o.then((u) => u || (l.finalized ? l.res : h(this, Y).call(this, l))).catch((u) => j(this, L, st).call(this, u, l)) : o ?? h(this, Y).call(this, l);
  }
  const c = Ct(a[0], this.errorHandler, h(this, Y));
  return (async () => {
    try {
      const o = await c(l);
      if (!o.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return o.res;
    } catch (o) {
      return j(this, L, st).call(this, o, l);
    }
  })();
}, "it"), De);
var lr = [];
function Xr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[D], l = a[2][i];
    if (l)
      return l;
    const c = i.match(a[0]);
    if (!c)
      return [[], lr];
    const o = c.indexOf("", 1);
    return [a[1][o], c];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Xr, "Xr");
__name2(Xr, "Xr");
var ct = "[^/]+";
var Ge = ".*";
var Ke = "(?:|/.*)";
var _e = Symbol();
var Wr = new Set(".\\+*[^]$()");
function Yr(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ge || e === Ke ? 1 : t === Ge || t === Ke ? -1 : e === ct ? 1 : t === ct ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Yr, "Yr");
__name2(Yr, "Yr");
var Se;
var we;
var Q;
var Te;
var Qr = (Te = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, Se);
    T(this, we);
    T(this, Q, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, Se) !== void 0)
        throw _e;
      if (i)
        return;
      b(this, Se, r);
      return;
    }
    const [a, ...l] = t, c = a === "*" ? l.length === 0 ? ["", "", Ge] : ["", "", ct] : a === "/*" ? ["", "", Ke] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (c) {
      const u = c[1];
      let d = c[2] || ct;
      if (u && c[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw _e;
      if (o = h(this, Q)[d], !o) {
        if (Object.keys(h(this, Q)).some((f) => f !== Ge && f !== Ke))
          throw _e;
        if (i)
          return;
        o = h(this, Q)[d] = new Te(), u !== "" && b(o, we, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(o, we)]);
    } else if (o = h(this, Q)[a], !o) {
      if (Object.keys(h(this, Q)).some((u) => u.length > 1 && u !== Ge && u !== Ke))
        throw _e;
      if (i)
        return;
      o = h(this, Q)[a] = new Te();
    }
    o.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, Q)).sort(Yr).map((n) => {
      const s = h(this, Q)[n];
      return (typeof h(s, we) == "number" ? `(${n})@${h(s, we)}` : Wr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, Se) == "number" && r.unshift(`#${h(this, Se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "Te"), Se = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Te);
var lt;
var tt;
var Jt;
var Zr = (Jt = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, lt, { varIndex: 0 });
    T(this, tt, new Qr());
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
    return h(this, tt).insert(i, t, n, h(this, lt), r), n;
  }
  buildRegExp() {
    let e = h(this, tt).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Jt"), lt = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), Jt);
var en = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var at = /* @__PURE__ */ Object.create(null);
function ur(e) {
  return at[e] ?? (at[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(ur, "ur");
__name2(ur, "ur");
function tn() {
  at = /* @__PURE__ */ Object.create(null);
}
__name(tn, "tn");
__name2(tn, "tn");
function rn(e) {
  var o;
  const t = new Zr(), r = [];
  if (e.length === 0)
    return en;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, p]) => u ? 1 : f ? -1 : d.length - p.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [p, v, S] = n[u];
    p ? s[v] = [S.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), lr] : d++;
    let x;
    try {
      x = t.insert(v, d, p);
    } catch (w) {
      throw w === _e ? new or(v) : w;
    }
    p || (r[d] = S.map(([w, m]) => {
      const k = /* @__PURE__ */ Object.create(null);
      for (m -= 1; m >= 0; m--) {
        const [O, A] = x[m];
        k[O] = A;
      }
      return [w, k];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, p = r[u].length; f < p; f++) {
      const v = (o = r[u][f]) == null ? void 0 : o[1];
      if (!v)
        continue;
      const S = Object.keys(v);
      for (let x = 0, w = S.length; x < w; x++)
        v[S[x]] = l[v[S[x]]];
    }
  const c = [];
  for (const u in a)
    c[u] = r[a[u]];
  return [i, c, s];
}
__name(rn, "rn");
__name2(rn, "rn");
function $e(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (ur(r).test(t))
        return [...e[r]];
  }
}
__name($e, "$e");
__name2($e, "$e");
var de;
var he;
var ut;
var dr;
var zt;
var nn = (zt = /* @__PURE__ */ __name2(class {
  constructor() {
    T(this, ut);
    E(this, "name", "RegExpRouter");
    T(this, de);
    T(this, he);
    E(this, "match", Xr);
    b(this, de, { [D]: /* @__PURE__ */ Object.create(null) }), b(this, he, { [D]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = h(this, de), s = h(this, he);
    if (!n || !s)
      throw new Error(ar);
    n[e] || [n, s].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[D]).forEach((o) => {
        c[e][o] = [...c[D][o]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = ur(t);
      e === D ? Object.keys(n).forEach((o) => {
        var u;
        (u = n[o])[t] || (u[t] = $e(n[o], t) || $e(n[D], t) || []);
      }) : (l = n[e])[t] || (l[t] = $e(n[e], t) || $e(n[D], t) || []), Object.keys(n).forEach((o) => {
        (e === D || e === o) && Object.keys(n[o]).forEach((u) => {
          c.test(u) && n[o][u].push([r, i]);
        });
      }), Object.keys(s).forEach((o) => {
        (e === D || e === o) && Object.keys(s[o]).forEach((u) => c.test(u) && s[o][u].push([r, i]));
      });
      return;
    }
    const a = Zt(t) || [t];
    for (let c = 0, o = a.length; c < o; c++) {
      const u = a[c];
      Object.keys(s).forEach((d) => {
        var f;
        (e === D || e === d) && ((f = s[d])[u] || (f[u] = [...$e(n[d], u) || $e(n[D], u) || []]), s[d][u].push([r, i - o + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, he)).concat(Object.keys(h(this, de))).forEach((t) => {
      e[t] || (e[t] = j(this, ut, dr).call(this, t));
    }), b(this, de, b(this, he, void 0)), tn(), e;
  }
}, "zt"), de = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakSet(), dr = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === D;
  return [h(this, de), h(this, he)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== D && t.push(...Object.keys(n[D]).map((i) => [i, n[D][i]]));
  }), r ? rn(t) : null;
}, "dr"), zt);
var fe;
var ie;
var Xt;
var sn = (Xt = /* @__PURE__ */ __name2(class {
  constructor(e) {
    E(this, "name", "SmartRouter");
    T(this, fe, []);
    T(this, ie, []);
    b(this, fe, e.routers);
  }
  add(e, t, r) {
    if (!h(this, ie))
      throw new Error(ar);
    h(this, ie).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, ie))
      throw new Error("Fatal error");
    const r = h(this, fe), n = h(this, ie), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let c = 0, o = n.length; c < o; c++)
          l.add(...n[c]);
        a = l.match(e, t);
      } catch (c) {
        if (c instanceof or)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), b(this, fe, [l]), b(this, ie, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, ie) || h(this, fe).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, fe)[0];
  }
}, "Xt"), fe = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Xt);
var Be = /* @__PURE__ */ Object.create(null);
var pe;
var q;
var be;
var Le;
var H;
var ae;
var ve;
var He;
var an = (He = /* @__PURE__ */ __name2(class {
  constructor(t, r, n) {
    T(this, ae);
    T(this, pe);
    T(this, q);
    T(this, be);
    T(this, Le, 0);
    T(this, H, Be);
    if (b(this, q, n || /* @__PURE__ */ Object.create(null)), b(this, pe, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, b(this, pe, [s]);
    }
    b(this, be, []);
  }
  insert(t, r, n) {
    b(this, Le, ++Rt(this, Le)._);
    let s = this;
    const i = Cr(r), a = [];
    for (let l = 0, c = i.length; l < c; l++) {
      const o = i[l], u = i[l + 1], d = Pr(o, u), f = Array.isArray(d) ? d[0] : o;
      if (f in h(s, q)) {
        s = h(s, q)[f], d && a.push(d[1]);
        continue;
      }
      h(s, q)[f] = new He(), d && (h(s, be).push(d), a.push(d[1])), s = h(s, q)[f];
    }
    return h(s, pe).push({ [t]: { handler: n, possibleKeys: a.filter((l, c, o) => o.indexOf(l) === c), score: h(this, Le) } }), s;
  }
  search(t, r) {
    var c;
    const n = [];
    b(this, H, Be);
    let i = [this];
    const a = Yt(r), l = [];
    for (let o = 0, u = a.length; o < u; o++) {
      const d = a[o], f = o === u - 1, p = [];
      for (let v = 0, S = i.length; v < S; v++) {
        const x = i[v], w = h(x, q)[d];
        w && (b(w, H, h(x, H)), f ? (h(w, q)["*"] && n.push(...j(this, ae, ve).call(this, h(w, q)["*"], t, h(x, H))), n.push(...j(this, ae, ve).call(this, w, t, h(x, H)))) : p.push(w));
        for (let m = 0, k = h(x, be).length; m < k; m++) {
          const O = h(x, be)[m], A = h(x, H) === Be ? {} : { ...h(x, H) };
          if (O === "*") {
            const g = h(x, q)["*"];
            g && (n.push(...j(this, ae, ve).call(this, g, t, h(x, H))), b(g, H, A), p.push(g));
            continue;
          }
          const [C, z, _] = O;
          if (!d && !(_ instanceof RegExp))
            continue;
          const N = h(x, q)[C], I = a.slice(o).join("/");
          if (_ instanceof RegExp) {
            const g = _.exec(I);
            if (g) {
              if (A[z] = g[0], n.push(...j(this, ae, ve).call(this, N, t, h(x, H), A)), Object.keys(h(N, q)).length) {
                b(N, H, A);
                const y = ((c = g[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (l[y] || (l[y] = [])).push(N);
              }
              continue;
            }
          }
          (_ === true || _.test(d)) && (A[z] = d, f ? (n.push(...j(this, ae, ve).call(this, N, t, A, h(x, H))), h(N, q)["*"] && n.push(...j(this, ae, ve).call(this, h(N, q)["*"], t, A, h(x, H)))) : (b(N, H, A), p.push(N)));
        }
      }
      i = p.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((o, u) => o.score - u.score), [n.map(({ handler: o, params: u }) => [o, u])];
  }
}, "He"), pe = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), ve = /* @__PURE__ */ __name2(function(t, r, n, s) {
  const i = [];
  for (let a = 0, l = h(t, pe).length; a < l; a++) {
    const c = h(t, pe)[a], o = c[r] || c[D], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), i.push(o), n !== Be || s && s !== Be))
      for (let d = 0, f = o.possibleKeys.length; d < f; d++) {
        const p = o.possibleKeys[d], v = u[o.score];
        o.params[p] = s != null && s[p] && !v ? s[p] : n[p] ?? (s == null ? void 0 : s[p]), u[o.score] = true;
      }
  }
  return i;
}, "ve"), He);
var Ee;
var Wt;
var on = (Wt = /* @__PURE__ */ __name2(class {
  constructor() {
    E(this, "name", "TrieRouter");
    T(this, Ee);
    b(this, Ee, new an());
  }
  add(e, t, r) {
    const n = Zt(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, Ee).insert(e, n[s], r);
      return;
    }
    h(this, Ee).insert(e, t, r);
  }
  match(e, t) {
    return h(this, Ee).search(e, t);
  }
}, "Wt"), Ee = /* @__PURE__ */ new WeakMap(), Wt);
var hr = /* @__PURE__ */ __name2(class extends zr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new sn({ routers: [new nn(), new on()] });
  }
}, "hr");
var cn = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function c(d, f) {
      a.res.headers.set(d, f);
    }
    __name(c, "c");
    __name2(c, "c");
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
}, "cn");
var ln = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var Pt = /* @__PURE__ */ __name2((e, t = dn) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "Pt");
var un = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var dn = un;
var hn = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "hn");
var fr = { br: ".br", zstd: ".zst", gzip: ".gz" };
var fn = Object.keys(fr);
var pn = "index.html";
var mn = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? hn;
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
    e.isDir && await e.isDir(l) && (l = n(l, pn));
    const c = e.getContent;
    let o = await c(l, s);
    if (o instanceof Response)
      return s.newResponse(o.body, o);
    if (o) {
      const v = e.mimes && Pt(l, e.mimes) || Pt(l);
      if (s.header("Content-Type", v || "application/octet-stream"), e.precompressed && (!v || ln.test(v))) {
        const S = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((x) => x.trim()));
        for (const x of fn) {
          if (!S.has(x))
            continue;
          const w = await c(l + fr[x], s);
          if (w) {
            o = w, s.header("Content-Encoding", x), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(o);
    }
    await ((p = e.onNotFound) == null ? void 0 : p.call(e, l, s)), await i();
  };
}, "mn");
var gn = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "gn");
var xn = /* @__PURE__ */ __name2((e) => async function(r, n) {
  return mn({ ...e, getContent: async (i) => gn(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "xn");
var vn = /* @__PURE__ */ __name2((e) => xn(e), "vn");
var pr = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function bt(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(bt, "bt");
__name2(bt, "bt");
function yn(e) {
  return e.replace(/\s+/g, "").length;
}
__name(yn, "yn");
__name2(yn, "yn");
function me(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(me, "me");
__name2(me, "me");
function Sn(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(Sn, "Sn");
__name2(Sn, "Sn");
function qe(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(qe, "qe");
__name2(qe, "qe");
function gt(e, t, r) {
  const n = bt(e), i = bt(t) / Math.max(n, 1), a = pr[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(gt, "gt");
__name2(gt, "gt");
function wn(e) {
  return ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(wn, "wn");
__name2(wn, "wn");
function bn(e, t, r) {
  let s = me(t).slice();
  const i = gt(e, s.join(". ") + ".", r);
  let a = i, l = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), l = true, a = gt(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const c = wn();
    for (const o of c)
      if (s.push(o), l = true, a = gt(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: l, originalRatio: i.ratio };
}
__name(bn, "bn");
__name2(bn, "bn");
function En(e, t) {
  const r = me(e);
  qe(e);
  const n = yn(e), s = pr[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), l = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", u = r.map((g, y) => {
    let $ = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(g) && ($ += 5), /(특징|특성|요인|측면|경향|양상)/.test(g) && ($ += 4), /(연구|학자|선행|본|분석|종합)/.test(g) && ($ += 3), /(차이|비교|대조|반면|이에 반해)/.test(g) && ($ += 2), y === 0 && ($ += 3), g.length < 20 && ($ -= 2), g.length > 200 && ($ -= 1), { sentence: g, score: $, index: y };
  }).sort((g, y) => y.score - g.score || g.index - y.index).slice(0, 5).sort((g, y) => g.index - y.index).map((g) => g.sentence);
  let d = "";
  d = u.join(" ");
  const f = ["\uC2A4\uC6E8\uB374", "\uD55C\uAD6D", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "OECD", "GDP"];
  for (const g of f)
    !e.includes(g) && d.includes(g) && (d = me(d).filter(($) => !$.includes(g)).join(" "));
  d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const p = bn(e, d, t), v = p.text, S = bt(v), x = me(v), w = x[0] || l, m = x.slice(1);
  for (; m.length < 3; )
    m.push("\uC6D0\uBB38\uC758 \uCD94\uAC00 \uADFC\uAC70\uB97C \uD3EC\uD568\uD55C\uB2E4");
  const k = [], O = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const g of O)
    v.includes(g) && k.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${g}"`);
  const A = { brief: 2, standard: 4, detail: 6 };
  x.length < A[t] && k.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${x.length}\uBB38\uC7A5 (\uCD5C\uC18C ${A[t]}\uBB38\uC7A5)`);
  const C = v.includes("\uD55C\uAD6D"), z = v.includes("\uC2A4\uC6E8\uB374");
  C && z || k.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const _ = ["7.6%", "2.8%", "6.5%", "0.2%"], N = { brief: 1, standard: 2, detail: 3 }, I = _.filter((g) => v.includes(g));
  return I.length < N[t] && k.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${I.length}\uAC1C (\uCD5C\uC18C ${N[t]}\uAC1C)`), { type: "narrative", level: t, text: v, charCount: S, ratio: p.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: p.adjusted, originalRatio: p.originalRatio, finalRatio: p.ratio, targetRatio: s.target }, coreClaim: w, grounds: m.slice(0, 5), comparisons: [], implications: [], warnings: k };
}
__name(En, "En");
__name2(En, "En");
function Tn(e, t) {
  const r = me(e), n = qe(e);
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, 6).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Tn, "Tn");
__name2(Tn, "Tn");
function kn(e, t, r = "preview") {
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: (r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }]).slice(0, 4).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(kn, "kn");
__name2(kn, "kn");
function An(e) {
  const t = me(e), r = qe(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(An, "An");
__name2(An, "An");
function $n(e, t) {
  const r = me(e), n = 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const l = a * i, c = r.slice(l, l + i);
    if (c.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${c[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: c });
  }
  return s;
}
__name($n, "$n");
__name2($n, "$n");
function On(e, t) {
  const r = qe(e);
  Sn(e);
  const n = me(e), s = 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let l = 0; l < s && l < a.length; l++) {
    const c = a[l], o = jn(c), u = n.find((d) => d.includes(c)) || `${c}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: c, coreMeaning: o, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(On, "On");
__name2(On, "On");
function jn(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(jn, "jn");
__name2(jn, "jn");
function _n(e, t) {
  const r = An(e), n = $n(e), s = On(e), i = qe(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((o) => ({ title: o.title, keywords: qe(o.content.join(" ")).slice(0, 3), bullets: o.content, children: [] })) }], l = s.map((o) => ({ term: o.word, def: `${o.coreMeaning} \u2014 ${o.explanation}` })), c = n.map((o, u) => ({ title: o.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: c, hierarchy: a, glossary: l, coreTerms: s };
}
__name(_n, "_n");
__name2(_n, "_n");
var K = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var mr = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4", "\uC81C\uC2DC\uB41C\uB2E4", "\uBCF4\uC778\uB2E4", "\uACB0\uB860\uC774\uB2E4", "\uC885\uD569\uD558\uBA74", "\uC774\uC0C1\uC758 \uB0B4\uC6A9\uC744"];
var Mn = [{ pattern1: /선행학습이?\s*없/, pattern2: /필요하다/, desc: "\uC120\uD589\uD559\uC2B5 \uC5C6\uC74C vs \uD544\uC694\uD568" }, { pattern1: /사교육이?\s*(거의\s*)?없/, pattern2: /의존/, desc: "\uC0AC\uAD50\uC721 \uC5C6\uC74C vs \uC758\uC874" }];
var Ve = ["7.6%", "2.8%", "6.5%", "0.2%"];
var gr = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function ge(e) {
  return e == null ? "" : String(e);
}
__name(ge, "ge");
__name2(ge, "ge");
function Dt(e) {
  return ge(e).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(Dt, "Dt");
__name2(Dt, "Dt");
function xr(e) {
  return ge(e).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(xr, "xr");
__name2(xr, "xr");
function ot(e, t) {
  const r = ge(e);
  return t.filter((n) => r.includes(n)).length;
}
__name(ot, "ot");
__name2(ot, "ot");
function Ue(e, t, r) {
  const n = Dt(e), s = Dt(t), i = s / Math.max(n, 1), a = K[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a, originLen: n, sumLen: s };
}
__name(Ue, "Ue");
__name2(Ue, "Ue");
function Rn(e, t) {
  const r = [], n = gr[t], s = ge(e);
  for (const c of mr)
    s.includes(c) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${c}"`);
  for (const { pattern1: c, pattern2: o, desc: u } of Mn)
    c.test(s) && o.test(s) && r.push(`\uB17C\uB9AC \uBAA8\uC21C: ${u}`);
  const i = xr(s), a = new Set(i.map((c) => c.trim()));
  if (a.size < i.length) {
    const c = i.length - a.size;
    r.push(`\uBB38\uC7A5 \uC911\uBCF5: ${c}\uD68C \uBC18\uBCF5`);
  }
  i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const l = ot(s, Ve);
  return l < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${l}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(Rn, "Rn");
__name2(Rn, "Rn");
function Cn(e) {
  return e === "brief" ? ["\uACF5\uAD50\uC721 \uCC45\uC784\uACFC \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870\uC758 \uCC28\uC774\uAC00 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC758 \uCC28\uC774\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4."] : e === "standard" ? ["\uD55C\uAD6D\uC740 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4\uC774 \uB192\uACE0 \uC2A4\uC6E8\uB374\uC740 \uB0AE\uC544 \uAD6D\uAC00 \uBD80\uB2F4 \uAD6C\uC870\uAC00 \uB2E4\uB974\uB2E4.", "\uC774 \uCC28\uC774\uAC00 \uC120\uD589\uD559\uC2B5 \uD544\uC694\uC131\uACFC \uC785\uC2DC \uC911\uC2EC \uBB38\uD654\uC758 \uAC15\uB3C4\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC81C\uC2DC\uB41C\uB2E4."] : ["\uD55C\uAD6D\uC740 GDP \uB300\uBE44 \uACF5\uAD50\uC721 7.6%\uC640 \uBBFC\uAC04 \uBD80\uB2F4 2.8%\uAC00, \uC2A4\uC6E8\uB374\uC740 6.5%\uC640 0.2%\uAC00 \uC81C\uC2DC\uB41C\uB2E4.", "\uC785\uC2DC \uC81C\uB3C4, \uACF5\uAD50\uC721 \uC9C0\uC6D0, \uC785\uC2DC\uC5D0 \uB450\uB294 \uBE44\uC911\uC774 \uAD6D\uAC00\uBCC4 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uB9CC\uB4E0\uB2E4\uACE0 \uACB0\uB860\uC9D3\uB294\uB2E4."];
}
__name(Cn, "Cn");
__name2(Cn, "Cn");
function Et(e, t, r) {
  const n = K[r];
  let s = xr(t);
  s.length === 0 && (s = [ge(t).trim()].filter(Boolean));
  const i = /* @__PURE__ */ __name2(() => s.join(" "), "i");
  let a = Ue(e, i(), r);
  if (a.ratio > n.max)
    for (; s.length > 1 && (s.pop(), a = Ue(e, i(), r), !(a.ratio <= n.max)); )
      ;
  if (a.ratio < n.min) {
    const l = Cn(r);
    for (const c of l)
      if (s.push(c), a = Ue(e, i(), r), a.ratio >= n.min)
        break;
  }
  return a = Ue(e, i(), r), { text: i().trim(), ratio: a.ratio, ok: a.ok, rule: n };
}
__name(Et, "Et");
__name2(Et, "Et");
function xt(e) {
  const t = ["\uBBFC\uAC04 \uBD80\uB2F4", "\uBD80\uB2F4\uB960", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC", "\uBE44\uC728"], r = ge(e);
  let n = 0;
  for (const s of t)
    r.includes(s) && n++;
  return { score: n, need: 3 };
}
__name(xt, "xt");
__name2(xt, "xt");
function Nn(e) {
  const t = [], r = /* @__PURE__ */ __name2((n) => {
    if (!n)
      return;
    typeof n.label == "string" && t.push(n.label);
    const s = Array.isArray(n.children) ? n.children : [];
    for (const i of s)
      r(i);
  }, "r");
  return r(e), t;
}
__name(Nn, "Nn");
__name2(Nn, "Nn");
function vr(e) {
  var d;
  const t = [], r = [e.narrative.brief, e.narrative.standard, e.narrative.detail].join(" "), n = JSON.stringify(e.structured || {}), s = Nn((d = e.mindmap) == null ? void 0 : d.root).join(" | "), i = xt(r), a = xt(n), l = xt(s);
  i.score < i.need && t.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), a.score < a.need && t.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), l.score < l.need && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || t.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || t.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const c = ot(r, Ve), o = ot(n, Ve), u = ot(s, Ve);
  return c < 2 && t.push("\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), o < 2 && t.push("\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), u < 2 && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), { ok: t.length === 0, errors: t };
}
__name(vr, "vr");
__name2(vr, "vr");
function In(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(In, "In");
__name2(In, "In");
async function Pn(e) {
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
__name(Pn, "Pn");
__name2(Pn, "Pn");
async function Lt(e, t) {
  const r = { ...t, sample_hash: t.sample_hash || In((t.errors || []).join("|")) };
  e && (await Pn(e), await e.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Lt, "Lt");
__name2(Lt, "Lt");
function Dn(e, t, r, n) {
  const s = gr[r].minNumbers, i = K[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 \uAD50\uC815\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418 \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${mr.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${Ve.join(", ")}
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
__name(Dn, "Dn");
__name2(Dn, "Dn");
async function Ln(e) {
  const { originalText: t, model: r, callLLM: n, db: s } = e, i = {}, a = ["brief", "standard", "detail"];
  for (const c of a) {
    let o = ge(e.narrative[c]).trim();
    const u = Et(t, o, c);
    o = u.text, i[c] = { ratio: u.ratio, rule: u.rule };
    const d = Rn(o, c), f = Ue(t, o, c);
    if (!d.ok || !f.ok) {
      const p = [...d.ok ? [] : d.errors, ...f.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(f.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(f.rule.min * 100)}~${Math.round(f.rule.max * 100)}%)`]];
      await Lt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: c, stage: "narrative", errors: p, ratio: f.ratio });
      const v = Dn(t, o, c, p), S = await Promise.resolve(n(v));
      e.narrative[c] = ge(S).trim();
      const x = Et(t, e.narrative[c], c);
      e.narrative[c] = x.text, i[c] = { ratio: x.ratio, rule: x.rule, rewritten: true };
    } else
      e.narrative[c] = o;
  }
  const l = vr({ narrative: e.narrative, structured: e.structured, mindmap: e.mindmap });
  return l.ok || await Lt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: l.errors }), { narrative: e.narrative, structured: e.structured, mindmap: e.mindmap, qa: { cross_ok: l.ok, cross_errors: l.errors, ratios: i } };
}
__name(Ln, "Ln");
__name2(Ln, "Ln");
function yr(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(yr, "yr");
__name2(yr, "yr");
function P(e, t) {
  const r = String(e || "").replace(/\s+/g, " ").trim();
  if (r.length <= t)
    return r;
  const n = r.slice(0, t), s = Math.max(n.lastIndexOf("."), n.lastIndexOf("\uB2E4."), n.lastIndexOf("\uC694."), n.lastIndexOf("!"), n.lastIndexOf("?"));
  return s > Math.floor(t * 0.6) ? n.slice(0, s + 1).trim() : n.trim() + "\u2026";
}
__name(P, "P");
__name2(P, "P");
function Ht(e) {
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
__name(Ht, "Ht");
__name2(Ht, "Ht");
function Hn(e) {
  const t = En(e, "detail"), r = _n(e, "detail"), n = Tn(e, "detail"), s = kn(t.text, "detail", "exam"), i = e.length, a = yr(e), l = t.coreClaim, c = t.grounds, o = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const w = d.split(". ").filter(Boolean), m = Math.ceil(w.length / 2);
    d = w.slice(0, m).join(". ") + `.

` + w.slice(m).join(". ") + ".";
  }
  const f = r.toc, p = r.hierarchy, v = r.glossary, S = { title: n.title, children: n.children.map((w) => ({ title: w.title, children: (w.children || []).map((m) => ({ title: m.title, pack: Array.isArray(m.pack) && m.pack.length >= 2 ? m.pack : [m.title, `${m.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: m.explain && m.explain.length >= 30 ? m.explain : `${m.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (S.children[0] || S.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); S.children[0].children.length < 3; ) {
    const w = S.children[0].children.length + 1;
    S.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${w}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${w}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  {
    const m = o.join(" ").match(/[가-힣]{2,4}(?=은|는|의|과|와)/g) || [], k = e.match(/\d+\.?\d*%|\d+억|\d+만/g) || [];
    if (S.children[0] && S.children[0].children.length > 0) {
      const O = S.children[0].children;
      m.length >= 2 && O[0] && (O[0].pack.some((A) => m.some((C) => A.includes(C))) || O[0].pack.push(...m.slice(0, 2)), (!O[0].explain.includes(m[0]) || !O[0].explain.includes(m[1])) && (O[0].explain += ` ${m[0]}\uACFC ${m[1]}\uC758 \uBE44\uAD50\uB97C \uD1B5\uD574 \uCC28\uC774\uB97C \uBA85\uD655\uD788 \uC774\uD574\uD560 \uC218 \uC788\uB2E4.`)), k.length >= 2 && O[1] && (O[1].pack.some((A) => k.some((C) => A.includes(C))) || O[1].pack.push(...k.slice(0, 2)), k.some((A) => O[1].explain.includes(A)) || (O[1].explain += ` \uC8FC\uC694 \uC218\uCE58\uB294 ${k.slice(0, 2).join(", ")}\uC774\uB2E4.`));
    }
  }
  const x = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: c, comparisons: o, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: p, glossary: v }, mindmap: S, selftest: x };
}
__name(Hn, "Hn");
__name2(Hn, "Hn");
function qt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(qt, "qt");
__name2(qt, "qt");
function vt(e, t) {
  var I;
  const r = t === "brief", n = t === "standard", s = e.narrative.coreClaim || "", i = e.narrative.grounds || [], a = e.narrative.comparisons || [], l = e.narrative.implications || [], c = ((I = e.source) == null ? void 0 : I.charCount) || 1e3;
  let o = "", u = s, d = [], f = [], p = [];
  if (t === "detail")
    o = String(e.narrative.summaryDetail || "").trim(), u = s, d = i, f = a, p = l;
  else if (t === "brief") {
    const g = Math.floor(c * 0.18);
    u = P(s, 60);
    const y = a[0] ? P(a[0], 80) : "";
    if (d = [], f = y ? [y] : [], p = [], y)
      o = `${u}. ${y}.`;
    else {
      const $ = i[0] ? P(i[0], 60) : "";
      o = $ ? `${u}. ${$}.` : `${u}.`;
    }
    o.length > g && (o = o.slice(0, g - 3) + "...");
  } else {
    const g = Math.floor(c * 0.25), y = Math.floor(c * 0.38);
    u = P(s, 80), d = i.slice(0, 2).map((V) => P(V, 70));
    const $ = a[0] ? P(a[0], 90) : "";
    f = $ ? [$] : [], p = [];
    const X = [u];
    if (d.length > 0 && X.push(d.join(". ")), $ && X.push(`\uBC18\uBA74 ${$}`), o = X.join(". ") + ".", o.length > y)
      o = o.slice(0, y - 3) + "...";
    else if (o.length < g && l.length > 0) {
      const V = P(l[0], 60);
      o += ` ${V}.`;
    }
  }
  const v = e.structured.toc || [], S = r ? 2 : n ? 4 : 10, x = (e.structured.glossary || []).slice(0, S).map((g) => ({ term: P(g.term, 20), def: P(g.def, r ? 70 : 120) })), w = r ? 2 : n ? 3 : 5, m = /* @__PURE__ */ __name2((g) => (g || []).map((y) => ({ title: P(y.title, 60), keywords: (y.keywords || []).slice(0, r ? 3 : n ? 4 : 6).map(($) => P($, 16)), bullets: (y.bullets || []).slice(0, w).map(($) => P($, r ? 90 : 140)), children: y.children ? m(y.children) : void 0 })), "m"), k = m(e.structured.hierarchy || []), O = qn({ toc: v, hierarchy: k, glossary: x }), A = JSON.parse(JSON.stringify(e.mindmap || { title: "\uB9C8\uC778\uB4DC\uB9F5", children: [] })), C = r ? 70 : n ? 110 : 160, z = r ? 2 : 3;
  for (const g of A.children || [])
    for (const y of g.children || [])
      Array.isArray(y.pack) && (y.pack = y.pack.slice(0, z).map(($) => P($, 20))), typeof y.explain == "string" && (y.explain = P(y.explain, C)), Array.isArray(y.children) || (y.children = []);
  const _ = r || n ? 2 : 4, N = (e.selftest.items || []).slice(0, _).map((g) => {
    var y, $, X;
    return { id: g.id, type: g.type, question: P(g.question, r ? 140 : 220), hint: g.hint ? P(g.hint, r ? 90 : 140) : void 0, rubric: { mustInclude: (((y = g.rubric) == null ? void 0 : y.mustInclude) || []).slice(0, r ? 2 : 4).map((V) => P(V, 20)), mustNotInclude: ((($ = g.rubric) == null ? void 0 : $.mustNotInclude) || []).slice(0, 2).map((V) => P(V, 20)), maxChars: ((X = g.rubric) == null ? void 0 : X.maxChars) ?? (r ? 140 : 220) }, answerKey: g.answerKey ? P(g.answerKey, r ? 160 : 260) : void 0 };
  });
  return { narrative: { text: o, coreClaim: u, grounds: d, comparisons: f, implications: p }, structured: { text: O, toc: v, hierarchy: k, glossary: x }, mindmap: { tree: A }, selftest: { passScorePct: 90, items: N } };
}
__name(vt, "vt");
__name2(vt, "vt");
function qn(e) {
  var n, s;
  const t = [];
  t.push("\u2160. \uBAA9\uCC28"), (n = e.toc) != null && n.length ? e.toc.forEach((i, a) => t.push(`  ${a + 1}. ${i.title}`)) : t.push("  1. \uBCF8\uBB38"), t.push(""), t.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)");
  const r = /* @__PURE__ */ __name2((i, a) => {
    var l, c;
    for (const o of i || []) {
      const u = "  ".repeat(a);
      t.push(`${u}- ${o.title}`), (l = o.keywords) != null && l.length && t.push(`${u}  \xB7 \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${o.keywords.join(" \xB7 ")}`), (o.bullets || []).forEach((d) => t.push(`${u}  \xB7 ${d}`)), (c = o.children) != null && c.length && r(o.children, a + 1);
    }
  }, "r");
  return r(e.hierarchy || [], 1), t.push(""), t.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), (s = e.glossary) != null && s.length ? e.glossary.forEach((i) => t.push(`- ${i.def || `${i.term}: (\uC815\uC758 \uC5C6\uC74C)`}`)) : t.push("- (\uC6A9\uC5B4\uC0AC\uC804 \uC5C6\uC74C)"), t.join(`
`);
}
__name(qn, "qn");
__name2(qn, "qn");
function Fn(e) {
  var i, a, l, c, o, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((l = e == null ? void 0 : e.narrative) != null && l.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const p of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const v of (p == null ? void 0 : p.children) || [])
      r++, Array.isArray(v.pack) && v.pack.length && n++, typeof v.explain == "string" && v.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(Fn, "Fn");
__name2(Fn, "Fn");
function Bn(e) {
  var p, v, S, x;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative");
  const i = /* @__PURE__ */ __name2((w) => w.split(new RegExp("(?<=[.!?])\\s+")).filter(Boolean).length, "i"), a = i(e.brief.narrative.text), l = i(e.standard.narrative.text), c = i(e.detail.narrative.text);
  l < a + 2 && t.push(`standard/brief \uBB38\uC7A5 \uC218 \uCC28\uC774 \uBD80\uC871: ${l} vs ${a} (\uCD5C\uC18C +2 \uD544\uC694)`), c < l + 2 && t.push(`detail/standard \uBB38\uC7A5 \uC218 \uCC28\uC774 \uBD80\uC871: ${c} vs ${l} (\uCD5C\uC18C +2 \uD544\uC694)`), (((p = e.standard.structured.glossary) == null ? void 0 : p.length) || 0) < (((v = e.brief.structured.glossary) == null ? void 0 : v.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((S = e.detail.structured.glossary) == null ? void 0 : S.length) || 0) < (((x = e.standard.structured.glossary) == null ? void 0 : x.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const o = /* @__PURE__ */ __name2((w) => {
    let m = 0;
    for (const k of (w == null ? void 0 : w.children) || [])
      m += ((k == null ? void 0 : k.children) || []).length;
    return m;
  }, "o"), u = o(e.brief.mindmap.tree), d = o(e.standard.mindmap.tree), f = o(e.detail.mindmap.tree);
  return u === d && d === f || t.push(`mindmap L2 count mismatch (brief:${u}, standard:${d}, detail:${f})`), t;
}
__name(Bn, "Bn");
__name2(Bn, "Bn");
async function yt(e, t) {
  var l, c, o, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (o = (c = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : c.content) == null ? void 0 : o.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(yt, "yt");
__name2(yt, "yt");
function Un(e) {
  e.post("/api/matrix", async (t) => {
    var o, u, d, f, p, v;
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, s = !!((o = t.env) != null && o.GEMINI_API_KEY && String(t.env.GEMINI_API_KEY).trim().length > 10), i = String(((u = t.env) == null ? void 0 : u.USE_MOCK) || "").toLowerCase() === "true", a = s && !i ? "phase2" : "phase1";
    let l = null;
    function c(S) {
      return { cross_ok: false, cross_errors: [S], ratios: { brief: { ratio: 0, ok: false }, standard: { ratio: 0, ok: false }, detail: { ratio: 0, ok: false } } };
    }
    __name(c, "c");
    __name2(c, "c");
    try {
      let S = /* @__PURE__ */ __name2(function(R) {
        return String(R || "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").replace(/\.\.+/g, ".").replace(/공교\s*육/g, "\uACF5\uAD50\uC721").replace(/사\s*교\s*육/g, "\uC0AC\uAD50\uC721").replace(/입\s*시/g, "\uC785\uC2DC").replace(/결\s*론/g, "\uACB0\uB860").replace(/국가에\s*서는/g, "\uAD6D\uAC00\uC5D0\uC11C\uB294").trim();
      }, "S"), x = /* @__PURE__ */ __name2(function(R) {
        const M = S(R);
        if (!M)
          return M;
        const Z = M.split(new RegExp("(?<=[.!?])\\s+")).map((re) => re.trim()).filter(Boolean), ce = [/비교한다/, /분석한다/, /설명한다/, /이 글은/, /선행연구/, /다양한 관점/, /다면적/, /체계적으로/, /종합하면/, /이상의 내용을 종합/, /이해가 가능/, /체계적으로 분석/, /결론이다\.\./];
        return Z.filter((re) => !ce.some((Fe) => Fe.test(re))).join(" ").trim();
      }, "x"), w = /* @__PURE__ */ __name2(function(R) {
        let M = S(R);
        M = M.replace(/필요\.\s*/g, "\uD544\uC694\uD558\uB2E4\uB294 \uC758\uBBF8\uB2E4. ").replace(/필요\s*$/g, "\uD544\uC694\uD558\uB2E4\uB294 \uC758\uBBF8\uB2E4.").replace(/이는\s*$/g, "\uC774\uB294 \uC911\uC694\uD55C \uCC28\uC774\uB97C \uBCF4\uC5EC\uC900\uB2E4.").replace(/이는\.\s*/g, "\uC774\uB294 \uC911\uC694\uD55C \uCC28\uC774\uB97C \uBCF4\uC5EC\uC900\uB2E4. "), M && !/[.!?]$/.test(M) && (M += ".");
        const ce = M.split(new RegExp("(?<=[.!?])\\s+")).map((ee) => ee.trim()).filter(Boolean).filter((ee) => ee.replace(/[.!?]/g, "").trim().split(/\s+/).length >= 3);
        return (ce.length ? ce.join(" ") : M).trim();
      }, "w"), m = /* @__PURE__ */ __name2(function(R) {
        return S(R).split(new RegExp("(?<=[.!?])\\s+")).map((M) => M.trim()).filter(Boolean).length;
      }, "m"), k = /* @__PURE__ */ __name2(function(R, M, Z, ce, ee) {
        let re = R;
        const Fe = [...M.grounds || [], ...M.comparisons || [], ...M.implications || []].map((ht) => w(x(S(ht)))).filter(Boolean), Tr = Math.floor(ce * K[ee].max);
        let jt = 0;
        for (; m(re) < Z && jt < Fe.length; ) {
          const ht = Fe[jt++], _t = S(re + " " + ht);
          if (_t.length <= Tr)
            re = _t;
          else
            break;
        }
        return re;
      }, "k"), O = /* @__PURE__ */ __name2(function(R, M, Z, ce) {
        let ee = w(x(S(Z)));
        return ee = k(ee, ce, R === "brief" ? 2 : R === "standard" ? 4 : 6, M.length, R), Et(M, ee, R);
      }, "O");
      const A = await t.req.json(), C = String(A.text || "").trim();
      if (!C || C.length < 20) {
        const R = c(C ? "TEXT_TOO_SHORT" : "EMPTY_TEXT");
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uB108\uBB34 \uC9E7\uC2B5\uB2C8\uB2E4(\uCD5C\uC18C 20\uC790 \uAD8C\uC7A5)" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: R }, result: { qa: R } }, 400);
      }
      const z = yr(C);
      let _ = null;
      if (a === "phase1")
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), _ = Hn(C);
      else {
        const R = qt(C);
        let M = await yt(t, R);
        if (_ = Ht(M), !_) {
          const Z = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", qt(C)].join(`
`);
          M = await yt(t, Z), _ = Ht(M);
        }
        if (!_)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 502);
      }
      const N = Fn(_);
      if (N.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: N.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 422);
      const I = vt(_, "brief"), g = vt(_, "standard"), y = vt(_, "detail"), $ = { grounds: _.narrative.grounds || [], comparisons: _.narrative.comparisons || [], implications: _.narrative.implications || [] }, X = O("brief", C, I.narrative.text, $), V = O("standard", C, g.narrative.text, $), rt = O("detail", C, y.narrative.text, $);
      I.narrative.text = X.text, g.narrative.text = V.text, y.narrative.text = rt.text, I.narrative.ratio = X.ratio, g.narrative.ratio = V.ratio, y.narrative.ratio = rt.ratio, console.log("[Matrix V4] V4-downsample + narrative-quality:", { brief_ratio: X.ratio, standard_ratio: V.ratio, detail_ratio: rt.ratio, brief_len: X.text.length, standard_len: V.text.length, detail_len: rt.text.length });
      const F = { narrative: { ...I.narrative, ratio: I.narrative.ratio, warnings: [] }, structured: I.structured, mindmap: I.mindmap, selftest: I.selftest }, B = { narrative: { ...g.narrative, ratio: g.narrative.ratio, warnings: [] }, structured: g.structured, mindmap: g.mindmap, selftest: g.selftest };
      y.narrative.warnings = [];
      const Ot = Bn({ brief: F, standard: B, detail: y });
      if (Ot.length && a === "phase2")
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: Ot.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U } }, 422);
      let Ae = { brief: F.narrative.text, standard: B.narrative.text, detail: y.narrative.text }, U = null;
      if (a === "phase2")
        try {
          const R = /* @__PURE__ */ __name2(async (Z) => await yt(t, Z), "R"), M = await Ln({ originalText: C, model: t.env.GEMINI_MODEL || "gemini", callLLM: R, db: t.env.DB, narrative: Ae, structured: { brief: F.structured, standard: B.structured, detail: y.structured }, mindmap: { brief: F.mindmap, standard: B.mindmap, detail: y.mindmap } });
          Ae = M.narrative, U = M.qa, F.narrative.text = Ae.brief, B.narrative.text = Ae.standard, y.narrative.text = Ae.detail, console.log("[Matrix V4] Phase 2 Quality Gate \uC644\uB8CC:", { cross_ok: U.cross_ok, ratios: U.ratios });
        } catch (R) {
          console.error("[Matrix V4] Phase 2 \uC624\uB958:", R.message), U = null;
        }
      if (a === "phase1" || !U) {
        const R = vr({ narrative: Ae, structured: { brief: F.structured, standard: B.structured, detail: y.structured }, mindmap: { brief: F.mindmap, standard: B.mindmap, detail: y.mindmap }, detailSlots: { coreClaim: (d = _.narrative) == null ? void 0 : d.coreClaim, grounds: (f = _.narrative) == null ? void 0 : f.grounds, comparisons: (p = _.narrative) == null ? void 0 : p.comparisons, implications: (v = _.narrative) == null ? void 0 : v.implications } });
        U = { cross_ok: R.ok, cross_errors: R.errors, ratios: { brief: { ratio: F.narrative.ratio, rule: K.brief, ok: F.narrative.ratio >= K.brief.min && F.narrative.ratio <= K.brief.max }, standard: { ratio: B.narrative.ratio, rule: K.standard, ok: B.narrative.ratio >= K.standard.min && B.narrative.ratio <= K.standard.max }, detail: { ratio: y.narrative.ratio, rule: K.detail, ok: y.narrative.ratio >= K.detail.min && y.narrative.ratio <= K.detail.max } } }, console.log("[Matrix V4] Phase 1 \uC9C4\uB2E8 \uC644\uB8CC (V4-downsample):", { cross_ok: U.cross_ok, ratios_ok: [U.ratios.brief.ok, U.ratios.standard.ok, U.ratios.detail.ok] });
      }
      const Er = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: F, standard: B, detail: y }, views: { narrative: { brief: F.narrative, standard: B.narrative, detail: y.narrative }, structured: { brief: F.structured, standard: B.structured, detail: y.structured }, mindmap: { brief: F.mindmap, standard: B.mindmap, detail: y.mindmap }, selftest: { brief: F.selftest, standard: B.selftest, detail: y.selftest } } }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: U }, result: { qa: U } };
      return t.json(Er, 200);
    } catch (S) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (S == null ? void 0 : S.message) || String(S) }, meta: { reqId: n, elapsedMs: Date.now() - r, phase: a, qa: l } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => os), n = await t.req.json(), { sheet: s, attempt: i } = n;
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
      const { buildFailReport: n } = await Promise.resolve().then(() => us), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Un, "Un");
__name2(Un, "Un");
var te = new hr();
te.use("/api/*", cn());
te.use("/static/*", vn({ root: "./public" }));
Un(te);
function Je() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Je, "Je");
__name2(Je, "Je");
function At(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(At, "At");
__name2(At, "At");
function Gn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Gn, "Gn");
__name2(Gn, "Gn");
function Kn(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(Kn, "Kn");
__name2(Kn, "Kn");
function Vn(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(Vn, "Vn");
__name2(Vn, "Vn");
function Jn(e, t) {
  const r = Math.max(60, Re(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(Jn, "Jn");
__name2(Jn, "Jn");
function zn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = Vn((e == null ? void 0 : e.viewType) || "narrative"), n = Kn(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: l } = Jn(t), c = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), o = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
  let x = f;
  return r === "structured" ? x = p : r === "mindmap" ? x = v : r === "selftest" && (x = S), `${d}

${x}`;
}
__name(zn, "zn");
__name2(zn, "zn");
function ke(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(ke, "ke");
__name2(ke, "ke");
function dt(e) {
  const t = ke(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(dt, "dt");
__name2(dt, "dt");
function Xn(e) {
  const t = ke(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(Xn, "Xn");
__name2(Xn, "Xn");
function $t(e) {
  const t = ke(e).split(`
`), r = Xn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: ke(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, c = a ? a.startIdx : t.length, o = i.title, u = t.slice(l + 1, c).join(`
`).trim();
    n.push({ title: o, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name($t, "$t");
__name2($t, "$t");
function Wn(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(Wn, "Wn");
__name2(Wn, "Wn");
function Me(e, t) {
  const n = dt(e).map((i, a) => ({ s: i, i: a, score: Wn(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, Gn(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(Me, "Me");
__name2(Me, "Me");
function Re(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(Re, "Re");
__name2(Re, "Re");
var Tt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function Ft(e, t, r) {
  const n = Math.max(60, Re(e)), s = Re(t), i = Math.floor(n * Tt[r].min), a = Math.ceil(n * Tt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(Ft, "Ft");
__name2(Ft, "Ft");
function ze(e, t, r) {
  const n = Math.max(60, Re(e)), s = Math.ceil(n * Tt[r].max);
  let i = String(t || "").trim();
  if (Re(i) <= s)
    return i;
  const a = dt(i);
  let l = "";
  for (const c of a) {
    const o = (l ? l + " " : "") + c;
    if (Re(o) > s)
      break;
    l = o;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(ze, "ze");
__name2(ze, "ze");
function St(e, t) {
  return `${e}_${t}`;
}
__name(St, "St");
__name2(St, "St");
function Yn(e) {
  const t = $t(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = St("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, c = Me(s.body, 6), o = [];
    for (const m of c)
      (m.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((O) => {
        const A = O.replace(/[()]/g, "").trim();
        A.length >= 2 && A.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(A) && o.push(A);
      });
    const u = /* @__PURE__ */ new Map();
    o.forEach((m) => u.set(m, (u.get(m) || 0) + 1));
    const d = Array.from(u.entries()).sort((m, k) => k[1] - m[1]).map((m) => m[0]).filter((m) => m.length <= 10).slice(0, 3), f = Me(s.body, 3).join(" "), p = Me(s.body, 2).join(" "), v = Me(s.body, 1).join(" "), S = { id: St(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: p, explainBrief: v, children: [] };
    d.forEach((m) => {
      n.has(m) || n.set(m, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${m}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${Me(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = dt(s.body).filter((m) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(m)).slice(0, 2);
    w.length && S.children.push({ id: St(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(S), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Yn, "Yn");
__name2(Yn, "Yn");
function Sr(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
function Qn(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (Sr(t, n).children || []).map((u) => {
    const d = (u.children || []).find((p) => p.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, c = r.slice(0, l).map((u) => ({ term: u.term, def: ze(e, u.def, n) })), o = [];
  return o.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => o.push(`  ${d + 1}. ${u}`)), o.push(""), o.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    o.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && o.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && o.push(`     - \uC694\uC9C0: ${ze(e, u.summary, n)}`), o.push("");
  }), o.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), c.forEach((u) => {
    o.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: c, renderText: o.join(`
`) };
}
__name(Qn, "Qn");
__name2(Qn, "Qn");
function Zn(e, t) {
  const r = $t(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...Me(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return ze(e, i, t);
}
__name(Zn, "Zn");
__name2(Zn, "Zn");
function es(e, t) {
  $t(e);
  const r = dt(e), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(es, "es");
__name2(es, "es");
function ts(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const l = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const o = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((v) => v.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(o)).slice(0, 8);
    let d = 0;
    u.forEach((v) => {
      l.includes(v) && d++;
    });
    const f = d >= 2 || l.length >= 30, p = f ? 1 : d === 1 ? 0.5 : 0;
    n += p, s.push({ id: a.id, ok: f, score: p, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(ts, "ts");
__name2(ts, "ts");
function Bt(e) {
  const t = ke(e), { tree: r, glossary: n } = Yn(t), s = { originalMeta: { textHash: At(t), chars: t.length, ts: Je() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Zn(t, i), l = Qn(t, r, n, i), c = Sr(r, i), o = es(t), d = Ft(t, a, i).ok ? a : ze(t, a, i), f = l.renderText || "", p = Ft(t, f, i);
    l.renderText = p.ok ? f : ze(t, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: c }, selftest: o };
  }), s;
}
__name(Bt, "Bt");
__name2(Bt, "Bt");
te.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Je(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
te.post("/api/engine", async (e) => {
  var p, v, S, x, w, m, k;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), l = (t == null ? void 0 : t.useGemini) === true, c = ke(r);
  if (c.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let o = "v5-local", u;
  if (l && e.env.GEMINI_API_KEY)
    try {
      const O = zn({ text: c, viewType: s, level: "detail", grade: i, subject: a }), A = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", z = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${A}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: O }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), N = (((w = (x = (S = (v = (p = z == null ? void 0 : z.candidates) == null ? void 0 : p[0]) == null ? void 0 : v.content) == null ? void 0 : S.parts) == null ? void 0 : x[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if (N) {
        const I = JSON.parse(N[0]);
        u = { originalMeta: { textHash: At(c), chars: c.length, ts: Je() }, modes: { detail: { [s]: I }, standard: { [s]: I }, brief: { [s]: I } } }, o = "gemini-" + A;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (O) {
      console.error("[Gemini Error]", O), u = Bt(c), o = "v5-local-fallback";
    }
  else
    u = Bt(c);
  const d = (k = (m = u.modes) == null ? void 0 : m[n]) == null ? void 0 : k[s], f = { engine: o, mode: n, viewType: s, ts: Je(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
te.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = ts(r, n);
  return e.json({ ok: true, result: s });
});
te.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = ke(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Je(), c = At(s), o = JSON.stringify(i);
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
te.get("/api/loadSummary", async (e) => {
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
te.get("/", (e) => e.redirect("/static/v5.html"));
var Ut = new hr();
var rs = Object.assign({ "/src/index.tsx": te });
var wr = false;
for (const [, e] of Object.entries(rs))
  e && (Ut.route("/", e), Ut.notFound(e.notFoundHandler), wr = true);
if (!wr)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Xe(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Xe, "Xe");
__name2(Xe, "Xe");
function Gt(e, t) {
  const r = Xe(e);
  return t.some((n) => r.includes(Xe(n)));
}
__name(Gt, "Gt");
__name2(Gt, "Gt");
function ns(e, t) {
  const r = Xe(e);
  return t.every((n) => r.includes(Xe(n)));
}
__name(ns, "ns");
__name2(ns, "ns");
function ss(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(ss, "ss");
__name2(ss, "ss");
function is(e, t, r) {
  var v, S, x, w;
  const n = Xe(t), s = 100;
  if (!n) {
    const m = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, k = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: m, explanationToShow: k };
  }
  const i = ((v = e.rubric) == null ? void 0 : v.mustIncludeAny) || [], a = ((S = e.rubric) == null ? void 0 : S.mustIncludeAll) || [], l = ((x = e.rubric) == null ? void 0 : x.forbid) || [], c = (w = e.rubric) == null ? void 0 : w.maxChars;
  let o = 100, u = [];
  c && n.length > c && (o -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${c}`)), l.length && Gt(n, l) && (o -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !ns(n, a) && (o -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !Gt(n, i) && (o -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), o = ss(o, 0, 100);
  const d = o >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, p = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: o, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: p };
}
__name(is, "is");
__name2(is, "is");
function as(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((c) => {
    var u;
    const o = ((u = t.userAnswers) == null ? void 0 : u[c.id]) ?? "";
    return is(c, o, r);
  }), s = Math.round(n.reduce((c, o) => c + o.score, 0) / Math.max(1, n.length)), i = n.filter((c) => !c.correct).map((c) => c.id), a = s >= e.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(as, "as");
__name2(as, "as");
var os = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: as }, Symbol.toStringTag, { value: "Module" }));
var cs = [];
async function br(e) {
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
__name(br, "br");
__name2(br, "br");
async function ls(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await br(e);
    const c = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((c == null ? void 0 : c.results) || []).map((o) => ({ ts: o.ts, model: o.model, level: o.level, stage: o.stage, errors: JSON.parse(o.errors || "[]"), ratio: o.ratio, sample_hash: o.sample_hash }));
  } else
    s = cs.filter((c) => c.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const c of s) {
    i[c.stage] = (i[c.stage] || 0) + 1;
    for (const o of c.errors || [])
      a[o] = (a[o] || 0) + 1;
  }
  const l = Object.entries(a).sort((c, o) => o[1] - c[1]).slice(0, 10).map(([c, o]) => ({ error: c, count: o }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: l, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(ls, "ls");
__name2(ls, "ls");
var us = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: ls, ensureFailLogTable: br }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = Ut;
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

// .wrangler/tmp/pages-kfrdKi/yzt5miw7v5i.js
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

// .wrangler/tmp/bundle-Mexpxm/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-Mexpxm/middleware-loader.entry.ts
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
//# sourceMappingURL=yzt5miw7v5i.js.map
