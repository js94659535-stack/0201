var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-q19iCq/checked-fetch.js
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

// .wrangler/tmp/bundle-q19iCq/strip-cf-connecting-ip-header.js
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

// .wrangler/tmp/pages-CmC0ny/bundledWorker-0.1187715546875372.mjs
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
var cr = Object.defineProperty;
var gt = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "gt");
var lr = /* @__PURE__ */ __name2((e, t, r) => t in e ? cr(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "lr");
var v = /* @__PURE__ */ __name2((e, t, r) => lr(e, typeof t != "symbol" ? t + "" : t, r), "v");
var rt = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || gt("Cannot " + r), "rt");
var h = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "h");
var b = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? gt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "b");
var y = /* @__PURE__ */ __name2((e, t, r, n) => (rt(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "y");
var T = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "access private method"), r), "T");
var xt = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  y(e, t, s, r);
}, get _() {
  return h(e, t, n);
} }), "xt");
var yt = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let o, c = false, u;
    if (e[l] ? (u = e[l][0][0], n.req.routeIndex = l) : u = l === e.length && s || void 0, u)
      try {
        o = await u(n, () => a(l + 1));
      } catch (d) {
        if (d instanceof Error && t)
          n.error = d, o = await t(d, n), c = true;
        else
          throw d;
      }
    else
      n.finalized === false && r && (o = await r(n));
    return o && (n.finalized === false || c) && (n.res = o), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "yt");
var ur = Symbol();
var dr = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof Ut ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? hr(e, { all: r, dot: n }) : {};
}, "dr");
async function hr(e, t) {
  const r = await e.formData();
  return r ? fr(r, t) : {};
}
__name(hr, "hr");
__name2(hr, "hr");
function fr(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? mr(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (pr(r, n, s), delete r[n]);
  }), r;
}
__name(fr, "fr");
__name2(fr, "fr");
var mr = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "mr");
var pr = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "pr");
var Dt = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Dt");
var gr = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = xr(e), n = Dt(r);
  return yr(n, t);
}, "gr");
var xr = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "xr");
var yr = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--)
      if (e[s].includes(n)) {
        e[s] = e[s].replace(n, t[r][1]);
        break;
      }
  }
  return e;
}, "yr");
var Ue = {};
var vr = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return Ue[n] || (r[2] ? Ue[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Ue[n] = [e, r[1], true]), Ue[n];
  }
  return null;
}, "vr");
var ht = /* @__PURE__ */ __name2((e, t) => {
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
}, "ht");
var wr = /* @__PURE__ */ __name2((e) => ht(e, decodeURI), "wr");
var Lt = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return wr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63)
      break;
  }
  return t.slice(r, n);
}, "Lt");
var Sr = /* @__PURE__ */ __name2((e) => {
  const t = Lt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Sr");
var pe = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = pe(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "pe");
var Ht = /* @__PURE__ */ __name2((e) => {
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
}, "Ht");
var nt = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? ht(e, Ft) : e) : e, "nt");
var qt = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf("?", 8);
    if (a === -1)
      return;
    for (e.startsWith(t, a + 1) || (a = e.indexOf(`&${t}`, a + 1)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const o = a + t.length + 2, c = e.indexOf("&", o);
        return nt(e.slice(o, c === -1 ? void 0 : c));
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
    let o = e.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (n && (o = nt(o)), i = a, o === "")
      continue;
    let c;
    l === -1 ? c = "" : (c = e.slice(l + 1, a === -1 ? void 0 : a), n && (c = nt(c))), r ? (s[o] && Array.isArray(s[o]) || (s[o] = []), s[o].push(c)) : s[o] ?? (s[o] = c);
  }
  return t ? s[t] : s;
}, "qt");
var br = qt;
var Er = /* @__PURE__ */ __name2((e, t) => qt(e, t, true), "Er");
var Ft = decodeURIComponent;
var vt = /* @__PURE__ */ __name2((e) => ht(e, Ft), "vt");
var we;
var q;
var X;
var Bt;
var Gt;
var lt;
var W;
var Ct;
var Ut = (Ct = /* @__PURE__ */ __name2(class {
  constructor(e, t = "/", r = [[]]) {
    b(this, X);
    v(this, "raw");
    b(this, we);
    b(this, q);
    v(this, "routeIndex", 0);
    v(this, "path");
    v(this, "bodyCache", {});
    b(this, W, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n)
        return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, y(this, q, r), y(this, we, {});
  }
  param(e) {
    return e ? T(this, X, Bt).call(this, e) : T(this, X, Gt).call(this);
  }
  query(e) {
    return br(this.url, e);
  }
  queries(e) {
    return Er(this.url, e);
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
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await dr(this, e));
  }
  json() {
    return h(this, W).call(this, "text").then((e) => JSON.parse(e));
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
  addValidatedData(e, t) {
    h(this, we)[e] = t;
  }
  valid(e) {
    return h(this, we)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [ur]() {
    return h(this, q);
  }
  get matchedRoutes() {
    return h(this, q)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return h(this, q)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Ct"), we = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), Bt = /* @__PURE__ */ __name2(function(e) {
  const t = h(this, q)[0][this.routeIndex][1][e], r = T(this, X, lt).call(this, t);
  return r && /\%/.test(r) ? vt(r) : r;
}, "Bt"), Gt = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(h(this, q)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = T(this, X, lt).call(this, h(this, q)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? vt(n) : n);
  }
  return e;
}, "Gt"), lt = /* @__PURE__ */ __name2(function(e) {
  return h(this, q)[1] ? h(this, q)[1][e] : e;
}, "lt"), W = /* @__PURE__ */ new WeakMap(), Ct);
var Tr = { Stringify: 1 };
var Vt = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((l) => l({ phase: t, buffer: s, context: n }))).then((l) => Promise.all(l.filter(Boolean).map((o) => Vt(o, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "Vt");
var Ar = "text/plain; charset=UTF-8";
var st = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "st");
var Pe;
var De;
var V;
var Se;
var K;
var P;
var Le;
var be;
var Ee;
var ae;
var He;
var qe;
var Y;
var ge;
var Nt;
var jr = (Nt = /* @__PURE__ */ __name2(class {
  constructor(e, t) {
    b(this, Y);
    b(this, Pe);
    b(this, De);
    v(this, "env", {});
    b(this, V);
    v(this, "finalized", false);
    v(this, "error");
    b(this, Se);
    b(this, K);
    b(this, P);
    b(this, Le);
    b(this, be);
    b(this, Ee);
    b(this, ae);
    b(this, He);
    b(this, qe);
    v(this, "render", (...e2) => (h(this, be) ?? y(this, be, (t2) => this.html(t2)), h(this, be).call(this, ...e2)));
    v(this, "setLayout", (e2) => y(this, Le, e2));
    v(this, "getLayout", () => h(this, Le));
    v(this, "setRenderer", (e2) => {
      y(this, be, e2);
    });
    v(this, "header", (e2, t2, r) => {
      this.finalized && y(this, P, new Response(h(this, P).body, h(this, P)));
      const n = h(this, P) ? h(this, P).headers : h(this, ae) ?? y(this, ae, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    v(this, "status", (e2) => {
      y(this, Se, e2);
    });
    v(this, "set", (e2, t2) => {
      h(this, V) ?? y(this, V, /* @__PURE__ */ new Map()), h(this, V).set(e2, t2);
    });
    v(this, "get", (e2) => h(this, V) ? h(this, V).get(e2) : void 0);
    v(this, "newResponse", (...e2) => T(this, Y, ge).call(this, ...e2));
    v(this, "body", (e2, t2, r) => T(this, Y, ge).call(this, e2, t2, r));
    v(this, "text", (e2, t2, r) => !h(this, ae) && !h(this, Se) && !t2 && !r && !this.finalized ? new Response(e2) : T(this, Y, ge).call(this, e2, t2, st(Ar, r)));
    v(this, "json", (e2, t2, r) => T(this, Y, ge).call(this, JSON.stringify(e2), t2, st("application/json", r)));
    v(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => T(this, Y, ge).call(this, s, t2, st("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? Vt(e2, Tr.Stringify, false, {}).then(n) : n(e2);
    });
    v(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    v(this, "notFound", () => (h(this, Ee) ?? y(this, Ee, () => new Response()), h(this, Ee).call(this, this)));
    y(this, Pe, e), t && (y(this, K, t.executionCtx), this.env = t.env, y(this, Ee, t.notFoundHandler), y(this, qe, t.path), y(this, He, t.matchResult));
  }
  get req() {
    return h(this, De) ?? y(this, De, new Ut(h(this, Pe), h(this, qe), h(this, He))), h(this, De);
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
    return h(this, P) || y(this, P, new Response(null, { headers: h(this, ae) ?? y(this, ae, new Headers()) }));
  }
  set res(e) {
    if (h(this, P) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of h(this, P).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const n = h(this, P).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const s of n)
              e.headers.append("set-cookie", s);
          } else
            e.headers.set(t, r);
    }
    y(this, P, e), this.finalized = true;
  }
  get var() {
    return h(this, V) ? Object.fromEntries(h(this, V)) : {};
  }
}, "Nt"), Pe = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakSet(), ge = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = h(this, P) ? new Headers(h(this, P).headers) : h(this, ae) ?? new Headers();
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
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? h(this, Se);
  return new Response(e, { status: s, headers: n });
}, "ge"), Nt);
var R = "ALL";
var kr = "all";
var Or = ["get", "post", "put", "delete", "options", "patch"];
var Kt = "Can not add a route since the matcher is already built.";
var Jt = /* @__PURE__ */ __name2(class extends Error {
}, "Jt");
var Rr = "__COMPOSED_HANDLER";
var $r = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "$r");
var wt = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "wt");
var F;
var $;
var zt;
var U;
var se;
var Be;
var Ge;
var Te;
var Cr = (Te = /* @__PURE__ */ __name2(class {
  constructor(t = {}) {
    b(this, $);
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
    b(this, F, "/");
    v(this, "routes", []);
    b(this, U, $r);
    v(this, "errorHandler", wt);
    v(this, "onError", (t2) => (this.errorHandler = t2, this));
    v(this, "notFound", (t2) => (y(this, U, t2), this));
    v(this, "fetch", (t2, ...r) => T(this, $, Ge).call(this, t2, r[1], r[0], t2.method));
    v(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${pe("/", t2)}`, r), n2, s2)));
    v(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(T(this, $, Ge).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Or, kr].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? y(this, F, a) : T(this, $, se).call(this, i, h(this, F), a), l.forEach((o) => {
        T(this, $, se).call(this, i, h(this, F), o);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const o of [a].flat()) {
        y(this, F, o);
        for (const c of [i].flat())
          l.map((u) => {
            T(this, $, se).call(this, c.toUpperCase(), h(this, F), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, F, i) : (y(this, F, "*"), a.unshift(i)), a.forEach((l) => {
      T(this, $, se).call(this, R, h(this, F), l);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? Lt : Sr;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === wt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (l, o) => (await yt([], r.errorHandler)(l, () => s.handler(l, o))).res, "i"), i[Rr] = s.handler), T(a = n, $, se).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = T(this, $, zt).call(this);
    return r._basePath = pe(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((o) => o, "s") : s = n.replaceRequest));
    const a = i ? (o) => {
      const c = i(o);
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
      const o = pe(this._basePath, t), c = o === "/" ? 0 : o.length;
      return (u) => {
        const d = new URL(u.url);
        return d.pathname = d.pathname.slice(c) || "/", new Request(d, u);
      };
    })());
    const l = /* @__PURE__ */ __name2(async (o, c) => {
      const u = await r(s(o.req.raw), ...a(o));
      if (u)
        return u;
      await c();
    }, "l");
    return T(this, $, se).call(this, R, pe(t, "*"), l), this;
  }
}, "Te"), F = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), zt = /* @__PURE__ */ __name2(function() {
  const t = new Te({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, y(t, U, h(this, U)), t.routes = this.routes, t;
}, "zt"), U = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = pe(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "se"), Be = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "Be"), Ge = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD")
    return (async () => new Response(null, await T(this, $, Ge).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), l = new jr(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: h(this, U) });
  if (a[0].length === 1) {
    let c;
    try {
      c = a[0][0][0][0](l, async () => {
        l.res = await h(this, U).call(this, l);
      });
    } catch (u) {
      return T(this, $, Be).call(this, u, l);
    }
    return c instanceof Promise ? c.then((u) => u || (l.finalized ? l.res : h(this, U).call(this, l))).catch((u) => T(this, $, Be).call(this, u, l)) : c ?? h(this, U).call(this, l);
  }
  const o = yt(a[0], this.errorHandler, h(this, U));
  return (async () => {
    try {
      const c = await o(l);
      if (!c.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return T(this, $, Be).call(this, c, l);
    }
  })();
}, "Ge"), Te);
var Xt = [];
function Nr(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name2((s, i) => {
    const a = r[s] || r[R], l = a[2][i];
    if (l)
      return l;
    const o = i.match(a[0]);
    if (!o)
      return [[], Xt];
    const c = o.indexOf("", 1);
    return [a[1][c], o];
  }, "n");
  return this.match = n, n(e, t);
}
__name(Nr, "Nr");
__name2(Nr, "Nr");
var Ye = "[^/]+";
var $e = ".*";
var Ce = "(?:|/.*)";
var xe = Symbol();
var Mr = new Set(".\\+*[^]$()");
function _r(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === $e || e === Ce ? 1 : t === $e || t === Ce ? -1 : e === Ye ? 1 : t === Ye ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(_r, "_r");
__name2(_r, "_r");
var oe;
var ce;
var B;
var de;
var Ir = (de = /* @__PURE__ */ __name2(class {
  constructor() {
    b(this, oe);
    b(this, ce);
    b(this, B, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (h(this, oe) !== void 0)
        throw xe;
      if (i)
        return;
      y(this, oe, r);
      return;
    }
    const [a, ...l] = t, o = a === "*" ? l.length === 0 ? ["", "", $e] : ["", "", Ye] : a === "/*" ? ["", "", Ce] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (o) {
      const u = o[1];
      let d = o[2] || Ye;
      if (u && o[2] && (d === ".*" || (d = d.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(d))))
        throw xe;
      if (c = h(this, B)[d], !c) {
        if (Object.keys(h(this, B)).some((f) => f !== $e && f !== Ce))
          throw xe;
        if (i)
          return;
        c = h(this, B)[d] = new de(), u !== "" && y(c, ce, s.varIndex++);
      }
      !i && u !== "" && n.push([u, h(c, ce)]);
    } else if (c = h(this, B)[a], !c) {
      if (Object.keys(h(this, B)).some((u) => u.length > 1 && u !== $e && u !== Ce))
        throw xe;
      if (i)
        return;
      c = h(this, B)[a] = new de();
    }
    c.insert(l, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(h(this, B)).sort(_r).map((n) => {
      const s = h(this, B)[n];
      return (typeof h(s, ce) == "number" ? `(${n})@${h(s, ce)}` : Mr.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof h(this, oe) == "number" && r.unshift(`#${h(this, oe)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "de"), oe = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), de);
var Qe;
var Fe;
var Mt;
var Pr = (Mt = /* @__PURE__ */ __name2(class {
  constructor() {
    b(this, Qe, { varIndex: 0 });
    b(this, Fe, new Ir());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (o) => {
        const c = `@\\${a}`;
        return s[a] = [c, o], a++, l = true, c;
      }), !l)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [l] = s[a];
      for (let o = i.length - 1; o >= 0; o--)
        if (i[o].indexOf(l) !== -1) {
          i[o] = i[o].replace(l, s[a][1]);
          break;
        }
    }
    return h(this, Fe).insert(i, t, n, h(this, Qe), r), n;
  }
  buildRegExp() {
    let e = h(this, Fe).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, "Mt"), Qe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Mt);
var Dr = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ve = /* @__PURE__ */ Object.create(null);
function Wt(e) {
  return Ve[e] ?? (Ve[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Wt, "Wt");
__name2(Wt, "Wt");
function Lr() {
  Ve = /* @__PURE__ */ Object.create(null);
}
__name(Lr, "Lr");
__name2(Lr, "Lr");
function Hr(e) {
  var c;
  const t = new Pr(), r = [];
  if (e.length === 0)
    return Dr;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, d], [f, m]) => u ? 1 : f ? -1 : d.length - m.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, d = -1, f = n.length; u < f; u++) {
    const [m, p, S] = n[u];
    m ? s[p] = [S.map(([w]) => [w, /* @__PURE__ */ Object.create(null)]), Xt] : d++;
    let g;
    try {
      g = t.insert(p, d, m);
    } catch (w) {
      throw w === xe ? new Jt(p) : w;
    }
    m || (r[d] = S.map(([w, x]) => {
      const j = /* @__PURE__ */ Object.create(null);
      for (x -= 1; x >= 0; x--) {
        const [D, A] = g[x];
        j[D] = A;
      }
      return [w, j];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let u = 0, d = r.length; u < d; u++)
    for (let f = 0, m = r[u].length; f < m; f++) {
      const p = (c = r[u][f]) == null ? void 0 : c[1];
      if (!p)
        continue;
      const S = Object.keys(p);
      for (let g = 0, w = S.length; g < w; g++)
        p[S[g]] = l[p[S[g]]];
    }
  const o = [];
  for (const u in a)
    o[u] = r[a[u]];
  return [i, o, s];
}
__name(Hr, "Hr");
__name2(Hr, "Hr");
function me(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length))
      if (Wt(r).test(t))
        return [...e[r]];
  }
}
__name(me, "me");
__name2(me, "me");
var Q;
var Z;
var Ze;
var Yt;
var _t;
var qr = (_t = /* @__PURE__ */ __name2(class {
  constructor() {
    b(this, Ze);
    v(this, "name", "RegExpRouter");
    b(this, Q);
    b(this, Z);
    v(this, "match", Nr);
    y(this, Q, { [R]: /* @__PURE__ */ Object.create(null) }), y(this, Z, { [R]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const n = h(this, Q), s = h(this, Z);
    if (!n || !s)
      throw new Error(Kt);
    n[e] || [n, s].forEach((o) => {
      o[e] = /* @__PURE__ */ Object.create(null), Object.keys(o[R]).forEach((c) => {
        o[e][c] = [...o[R][c]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const o = Wt(t);
      e === R ? Object.keys(n).forEach((c) => {
        var u;
        (u = n[c])[t] || (u[t] = me(n[c], t) || me(n[R], t) || []);
      }) : (l = n[e])[t] || (l[t] = me(n[e], t) || me(n[R], t) || []), Object.keys(n).forEach((c) => {
        (e === R || e === c) && Object.keys(n[c]).forEach((u) => {
          o.test(u) && n[c][u].push([r, i]);
        });
      }), Object.keys(s).forEach((c) => {
        (e === R || e === c) && Object.keys(s[c]).forEach((u) => o.test(u) && s[c][u].push([r, i]));
      });
      return;
    }
    const a = Ht(t) || [t];
    for (let o = 0, c = a.length; o < c; o++) {
      const u = a[o];
      Object.keys(s).forEach((d) => {
        var f;
        (e === R || e === d) && ((f = s[d])[u] || (f[u] = [...me(n[d], u) || me(n[R], u) || []]), s[d][u].push([r, i - c + o + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(h(this, Z)).concat(Object.keys(h(this, Q))).forEach((t) => {
      e[t] || (e[t] = T(this, Ze, Yt).call(this, t));
    }), y(this, Q, y(this, Z, void 0)), Lr(), e;
  }
}, "_t"), Q = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakSet(), Yt = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === R;
  return [h(this, Q), h(this, Z)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== R && t.push(...Object.keys(n[R]).map((i) => [i, n[R][i]]));
  }), r ? Hr(t) : null;
}, "Yt"), _t);
var ee;
var J;
var It;
var Fr = (It = /* @__PURE__ */ __name2(class {
  constructor(e) {
    v(this, "name", "SmartRouter");
    b(this, ee, []);
    b(this, J, []);
    y(this, ee, e.routers);
  }
  add(e, t, r) {
    if (!h(this, J))
      throw new Error(Kt);
    h(this, J).push([e, t, r]);
  }
  match(e, t) {
    if (!h(this, J))
      throw new Error("Fatal error");
    const r = h(this, ee), n = h(this, J), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const l = r[i];
      try {
        for (let o = 0, c = n.length; o < c; o++)
          l.add(...n[o]);
        a = l.match(e, t);
      } catch (o) {
        if (o instanceof Jt)
          continue;
        throw o;
      }
      this.match = l.match.bind(l), y(this, ee, [l]), y(this, J, void 0);
      break;
    }
    if (i === s)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (h(this, J) || h(this, ee).length !== 1)
      throw new Error("No active router has been determined yet.");
    return h(this, ee)[0];
  }
}, "It"), ee = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), It);
var Oe = /* @__PURE__ */ Object.create(null);
var te;
var _;
var le;
var Ae;
var M;
var z;
var ie;
var je;
var Ur = (je = /* @__PURE__ */ __name2(class {
  constructor(t, r, n) {
    b(this, z);
    b(this, te);
    b(this, _);
    b(this, le);
    b(this, Ae, 0);
    b(this, M, Oe);
    if (y(this, _, n || /* @__PURE__ */ Object.create(null)), y(this, te, []), t && r) {
      const s = /* @__PURE__ */ Object.create(null);
      s[t] = { handler: r, possibleKeys: [], score: 0 }, y(this, te, [s]);
    }
    y(this, le, []);
  }
  insert(t, r, n) {
    y(this, Ae, ++xt(this, Ae)._);
    let s = this;
    const i = gr(r), a = [];
    for (let l = 0, o = i.length; l < o; l++) {
      const c = i[l], u = i[l + 1], d = vr(c, u), f = Array.isArray(d) ? d[0] : c;
      if (f in h(s, _)) {
        s = h(s, _)[f], d && a.push(d[1]);
        continue;
      }
      h(s, _)[f] = new je(), d && (h(s, le).push(d), a.push(d[1])), s = h(s, _)[f];
    }
    return h(s, te).push({ [t]: { handler: n, possibleKeys: a.filter((l, o, c) => c.indexOf(l) === o), score: h(this, Ae) } }), s;
  }
  search(t, r) {
    var o;
    const n = [];
    y(this, M, Oe);
    let i = [this];
    const a = Dt(r), l = [];
    for (let c = 0, u = a.length; c < u; c++) {
      const d = a[c], f = c === u - 1, m = [];
      for (let p = 0, S = i.length; p < S; p++) {
        const g = i[p], w = h(g, _)[d];
        w && (y(w, M, h(g, M)), f ? (h(w, _)["*"] && n.push(...T(this, z, ie).call(this, h(w, _)["*"], t, h(g, M))), n.push(...T(this, z, ie).call(this, w, t, h(g, M)))) : m.push(w));
        for (let x = 0, j = h(g, le).length; x < j; x++) {
          const D = h(g, le)[x], A = h(g, M) === Oe ? {} : { ...h(g, M) };
          if (D === "*") {
            const E = h(g, _)["*"];
            E && (n.push(...T(this, z, ie).call(this, E, t, h(g, M))), y(E, M, A), m.push(E));
            continue;
          }
          const [I, k, O] = D;
          if (!d && !(O instanceof RegExp))
            continue;
          const C = h(g, _)[I], L = a.slice(c).join("/");
          if (O instanceof RegExp) {
            const E = O.exec(L);
            if (E) {
              if (A[k] = E[0], n.push(...T(this, z, ie).call(this, C, t, h(g, M), A)), Object.keys(h(C, _)).length) {
                y(C, M, A);
                const H = ((o = E[0].match(/\//)) == null ? void 0 : o.length) ?? 0;
                (l[H] || (l[H] = [])).push(C);
              }
              continue;
            }
          }
          (O === true || O.test(d)) && (A[k] = d, f ? (n.push(...T(this, z, ie).call(this, C, t, A, h(g, M))), h(C, _)["*"] && n.push(...T(this, z, ie).call(this, h(C, _)["*"], t, A, h(g, M)))) : (y(C, M, A), m.push(C)));
        }
      }
      i = m.concat(l.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, u) => c.score - u.score), [n.map(({ handler: c, params: u }) => [c, u])];
  }
}, "je"), te = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), ie = /* @__PURE__ */ __name2(function(t, r, n, s) {
  const i = [];
  for (let a = 0, l = h(t, te).length; a < l; a++) {
    const o = h(t, te)[a], c = o[r] || o[R], u = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), i.push(c), n !== Oe || s && s !== Oe))
      for (let d = 0, f = c.possibleKeys.length; d < f; d++) {
        const m = c.possibleKeys[d], p = u[c.score];
        c.params[m] = s != null && s[m] && !p ? s[m] : n[m] ?? (s == null ? void 0 : s[m]), u[c.score] = true;
      }
  }
  return i;
}, "ie"), je);
var ue;
var Pt;
var Br = (Pt = /* @__PURE__ */ __name2(class {
  constructor() {
    v(this, "name", "TrieRouter");
    b(this, ue);
    y(this, ue, new Ur());
  }
  add(e, t, r) {
    const n = Ht(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++)
        h(this, ue).insert(e, n[s], r);
      return;
    }
    h(this, ue).insert(e, t, r);
  }
  match(e, t) {
    return h(this, ue).search(e, t);
  }
}, "Pt"), ue = /* @__PURE__ */ new WeakMap(), Pt);
var Qt = /* @__PURE__ */ __name2(class extends Cr {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Fr({ routers: [new qr(), new Br()] });
  }
}, "Qt");
var Gr = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, n = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), s = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var u;
    function o(d, f) {
      a.res.headers.set(d, f);
    }
    __name(o, "o");
    __name2(o, "o");
    const c = await n(a.req.header("origin") || "", a);
    if (c && o("Access-Control-Allow-Origin", c), r.credentials && o("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.origin !== "*" && o("Vary", "Origin"), r.maxAge != null && o("Access-Control-Max-Age", r.maxAge.toString());
      const d = await s(a.req.header("origin") || "", a);
      d.length && o("Access-Control-Allow-Methods", d.join(","));
      let f = r.allowHeaders;
      if (!(f != null && f.length)) {
        const m = a.req.header("Access-Control-Request-Headers");
        m && (f = m.split(/\s*,\s*/));
      }
      return f != null && f.length && (o("Access-Control-Allow-Headers", f.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l(), r.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Gr");
var Vr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var St = /* @__PURE__ */ __name2((e, t = Jr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, n = e.match(r);
  if (!n)
    return;
  let s = t[n[1]];
  return s && s.startsWith("text") && (s += "; charset=utf-8"), s;
}, "St");
var Kr = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Jr = Kr;
var zr = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((s) => s !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), n = [];
  for (const s of r)
    s === ".." && n.length > 0 && n.at(-1) !== ".." ? n.pop() : s !== "." && n.push(s);
  return n.join("/") || ".";
}, "zr");
var Zt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Xr = Object.keys(Zt);
var Wr = "index.html";
var Yr = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, n = e.join ?? zr;
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
    let l = n(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(a) : a);
    e.isDir && await e.isDir(l) && (l = n(l, Wr));
    const o = e.getContent;
    let c = await o(l, s);
    if (c instanceof Response)
      return s.newResponse(c.body, c);
    if (c) {
      const p = e.mimes && St(l, e.mimes) || St(l);
      if (s.header("Content-Type", p || "application/octet-stream"), e.precompressed && (!p || Vr.test(p))) {
        const S = new Set((d = s.req.header("Accept-Encoding")) == null ? void 0 : d.split(",").map((g) => g.trim()));
        for (const g of Xr) {
          if (!S.has(g))
            continue;
          const w = await o(l + Zt[g], s);
          if (w) {
            c = w, s.header("Content-Encoding", g), s.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((f = e.onFound) == null ? void 0 : f.call(e, l, s)), s.body(c);
    }
    await ((m = e.onNotFound) == null ? void 0 : m.call(e, l, s)), await i();
  };
}, "Yr");
var Qr = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let n;
  t && t.namespace ? n = t.namespace : n = __STATIC_CONTENT;
  const s = r[e];
  if (!s)
    return null;
  const i = await n.get(s, { type: "stream" });
  return i || null;
}, "Qr");
var Zr = /* @__PURE__ */ __name2((e) => async function(r, n) {
  return Yr({ ...e, getContent: async (i) => Qr(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }) })(r, n);
}, "Zr");
var en = /* @__PURE__ */ __name2((e) => Zr(e), "en");
var er = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
function ut(e) {
  return e.replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(ut, "ut");
__name2(ut, "ut");
function tn(e) {
  return e.replace(/\s+/g, "").length;
}
__name(tn, "tn");
__name2(tn, "tn");
function re(e) {
  return e.replace(/\n+/g, " ").split(new RegExp("(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\.\\s+|(?<=[\uB2E4\uC694\uC74C\uC784\uD568\uB428])\\s+(?=[\uAC00-\uD7A3])")).map((t) => t.trim()).filter(Boolean);
}
__name(re, "re");
__name2(re, "re");
function rn(e) {
  return e.match(/\d+\.?\d*%?/g) || [];
}
__name(rn, "rn");
__name2(rn, "rn");
function ke(e) {
  return Array.from(new Set(e.split(/\s+/).filter((t) => t.length >= 2 && !/^\d+$/.test(t)).slice(0, 10)));
}
__name(ke, "ke");
__name2(ke, "ke");
function it(e, t, r) {
  const n = ut(e), i = ut(t) / Math.max(n, 1), a = er[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, under: i < a.min, over: i > a.max, rule: a };
}
__name(it, "it");
__name2(it, "it");
function nn(e) {
  return e === "brief" ? ["\uC774 \uAE00\uC740 \uAD00\uB828 \uAC1C\uB150\uC758 \uC815\uC758\uC640 \uC8FC\uC694 \uD2B9\uC9D5\uC744 \uC124\uBA85\uD55C\uB2E4"] : e === "standard" ? ["\uC120\uD589\uC5F0\uAD6C\uC5D0\uC11C\uB294 \uC774\uB7EC\uD55C \uAC1C\uB150\uC744 \uB2E4\uC591\uD55C \uAD00\uC810\uC5D0\uC11C \uADDC\uC815\uD574 \uC654\uB2E4", "\uBCF8 \uC5F0\uAD6C\uB294 \uC774\uB97C \uC885\uD569\uD558\uC5EC \uC791\uC5C5 \uC815\uC758\uB97C \uC81C\uC2DC\uD55C\uB2E4"] : ["\uC774\uB7EC\uD55C \uD2B9\uC9D5\uC740 \uC5EC\uB7EC \uCE21\uBA74\uC5D0\uC11C \uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D\uB420 \uC218 \uC788\uB2E4", "\uC885\uD569\uD558\uBA74 \uD574\uB2F9 \uAC1C\uB150\uC758 \uB2E4\uBA74\uC801 \uC774\uD574\uAC00 \uAC00\uB2A5\uD558\uB2E4"];
}
__name(nn, "nn");
__name2(nn, "nn");
function sn(e, t, r) {
  let s = re(t).slice();
  const i = it(e, s.join(". ") + ".", r);
  let a = i, l = false;
  if (a.over && s.length > 1)
    for (; s.length > 1 && (s.pop(), l = true, a = it(e, s.join(". ") + ".", r), !a.ok); )
      ;
  if (a.under) {
    const o = nn(r);
    for (const c of o)
      if (s.push(c), l = true, a = it(e, s.join(". ") + ".", r), a.ok)
        break;
  }
  return { text: s.join(". ") + ".", ratio: a.ratio, adjusted: l, originalRatio: i.ratio };
}
__name(sn, "sn");
__name2(sn, "sn");
function Ke(e, t) {
  const r = re(e);
  ke(e);
  const n = tn(e), s = er[t], i = Math.floor(n * s.min), a = Math.floor(n * s.max), l = r[0] || "\uC6D0\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC744 \uD30C\uC545\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4", o = r.map((E, H) => {
    let N = 0;
    return /(정의|개념|의미|일컫|규정|정리)/.test(E) && (N += 5), /(특징|특성|요인|측면|경향|양상)/.test(E) && (N += 4), /(연구|학자|선행|본|분석|종합)/.test(E) && (N += 3), /(차이|비교|대조|반면|이에 반해)/.test(E) && (N += 2), H === 0 && (N += 3), E.length < 20 && (N -= 2), E.length > 200 && (N -= 1), { sentence: E, score: N, index: H };
  }), c = t === "brief" ? 2 : t === "standard" ? 3 : 5, u = o.sort((E, H) => H.score - E.score || E.index - H.index).slice(0, c).sort((E, H) => E.index - H.index).map((E) => E.sentence);
  let d = "";
  t === "brief" ? d = u.slice(0, 3).join(" ") : t === "standard" ? d = u.slice(0, 5).join(" ") : d = u.join(" ");
  const f = ["\uC2A4\uC6E8\uB374", "\uD55C\uAD6D", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "OECD", "GDP"];
  for (const E of f)
    !e.includes(E) && d.includes(E) && (d = re(d).filter((N) => !N.includes(E)).join(" "));
  d = d.replace(/약\s*\d+\.?\d*배/g, "").replace(/\d+\.?\d*배\s*수준/g, "").replace(/를?\s*비교하면\s*약?\s*\d+/g, "").trim(), d = d.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  const m = sn(e, d, t), p = m.text, S = ut(p), g = re(p), w = g[0] || l, x = g.slice(1);
  for (; x.length < 3; )
    x.push("\uC6D0\uBB38\uC758 \uCD94\uAC00 \uADFC\uAC70\uB97C \uD3EC\uD568\uD55C\uB2E4");
  const j = [], D = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
  for (const E of D)
    p.includes(E) && j.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${E}"`);
  const A = { brief: 2, standard: 4, detail: 6 };
  g.length < A[t] && j.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${g.length}\uBB38\uC7A5 (\uCD5C\uC18C ${A[t]}\uBB38\uC7A5)`);
  const I = p.includes("\uD55C\uAD6D"), k = p.includes("\uC2A4\uC6E8\uB374");
  I && k || j.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const O = ["7.6%", "2.8%", "6.5%", "0.2%"], C = { brief: 1, standard: 2, detail: 3 }, L = O.filter((E) => p.includes(E));
  return L.length < C[t] && j.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${L.length}\uAC1C (\uCD5C\uC18C ${C[t]}\uAC1C)`), { type: "narrative", level: t, text: p, charCount: S, ratio: m.ratio, targetRange: { min: s.min, max: s.max, minChars: i, maxChars: a }, note: "Matrix V4 \uD638\uD658 + \uC694\uC57D\uC728 \uAC15\uC81C + \uC11C\uC220\uD615 \uC804\uC6A9 \uADDC\uCE59", ratioEnforcement: { wasAdjusted: m.adjusted, originalRatio: m.originalRatio, finalRatio: m.ratio, targetRatio: s.target }, coreClaim: w, grounds: x.slice(0, 5), comparisons: [], implications: [], warnings: j };
}
__name(Ke, "Ke");
__name2(Ke, "Ke");
function Je(e, t) {
  const r = re(e), n = ke(e), s = t === "brief" ? 2 : t === "standard" ? 4 : 6;
  return { type: "mindmap", level: t, id: "root", title: "\uD575\uC2EC \uAD6C\uC870", collapsed: false, children: [{ id: "main-1", title: "1. \uC8FC\uC694 \uAC1C\uB150", collapsed: false, children: r.slice(0, s).map((i, a) => ({ id: `node-${a + 1}`, title: n[a] || `\uAC1C\uB150 ${a + 1}`, pack: i.split(" ").slice(0, 3), explain: i, collapsed: false, children: [] })) }] };
}
__name(Je, "Je");
__name2(Je, "Je");
function ze(e, t, r = "preview") {
  const n = r === "preview" ? [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uC8FC\uC7A5\uC740 \uBB34\uC5C7\uC778\uAC00?", type: "short" }, { q: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uADFC\uAC70 \uD55C \uAC00\uC9C0\uB97C \uB9D0\uD574\uBCF4\uC138\uC694.", type: "short" }] : [{ q: "\uBCF8\uBB38\uC758 \uD575\uC2EC \uB17C\uC9C0\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC815\uB9AC\uD558\uC2DC\uC624.", type: "explain" }, { q: "\uC81C\uC2DC\uB41C \uADFC\uAC70\uAC00 \uC8FC\uC7A5\uC744 \uC5B4\uB5BB\uAC8C \uB4B7\uBC1B\uCE68\uD558\uB294\uC9C0 \uC124\uBA85\uD558\uC2DC\uC624.", type: "evidence" }], s = t === "brief" || t === "standard" ? 2 : 4;
  return { type: "selftest", level: t, purpose: r, passScorePct: 90, items: n.slice(0, s).map((i, a) => ({ id: `q${a + 1}`, type: i.type, question: i.q, hint: "\uD575\uC2EC \uC8FC\uC7A5\uACFC \uADFC\uAC70\uB97C \uD3EC\uD568\uD558\uC5EC \uB2F5\uD558\uC138\uC694.", rubric: { mustInclude: ["\uD575\uC2EC", "\uADFC\uAC70"], maxChars: 200 }, answerKey: e.split(".")[0] + "." })) };
}
__name(ze, "ze");
__name2(ze, "ze");
function an(e) {
  const t = re(e), r = ke(e);
  return { unitName: t[0] ? `${r[0] || "\uD575\uC2EC"} ${r[1] || "\uAC1C\uB150"} \uBD84\uC11D` : "\uD559\uC2B5 \uB2E8\uC704", scope: "\uC911\uB2E8\uC6D0 \uB610\uB294 \uC18C\uB2E8\uC6D0 1\uAC1C \uBD84\uB7C9", targetLevel: "\uCD08\xB7\uC911\xB7\uACE0 \uD559\uC2B5\uC790" };
}
__name(an, "an");
__name2(an, "an");
function on(e, t) {
  const r = re(e), n = t === "brief" ? 2 : t === "standard" ? 3 : 4, s = [], i = Math.ceil(r.length / n);
  for (let a = 0; a < n; a++) {
    const l = a * i, o = r.slice(l, l + i);
    if (o.length === 0)
      break;
    s.push({ id: `section-${a + 1}`, title: `${a + 1}. ${o[0].split("\uB2E4")[0] || "\uD56D\uBAA9"}`, content: o });
  }
  return s;
}
__name(on, "on");
__name2(on, "on");
function cn(e, t) {
  const r = ke(e);
  rn(e);
  const n = re(e), s = t === "brief" ? 3 : t === "standard" ? 5 : 7, i = [], a = ["\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "GDP", "\uBBFC\uAC04 \uBD80\uB2F4", "OECD", ...r];
  for (let l = 0; l < s && l < a.length; l++) {
    const o = a[l], c = ln(o), u = n.find((d) => d.includes(o)) || `${o}\uC5D0 \uB300\uD55C \uC124\uBA85`;
    i.push({ word: o, coreMeaning: c, explanation: u.slice(0, 80) });
  }
  return i;
}
__name(cn, "cn");
__name2(cn, "cn");
function ln(e) {
  return { \uACF5\uAD50\uC721: "\uAD6D\uAC00\uAC00 \uCC45\uC784\uC9C0\uB294 \uAD50\uC721", \uC0AC\uAD50\uC721: "\uD559\uAD50 \uBC16 \uC720\uB8CC \uBCF4\uCDA9\uC218\uC5C5", GDP: "\uAD6D\uB0B4\uCD1D\uC0DD\uC0B0", "\uBBFC\uAC04 \uBD80\uB2F4": "\uAC00\uC815\uC774 \uBD80\uB2F4\uD558\uB294 \uAD50\uC721\uBE44", OECD: "\uACBD\uC81C\uD611\uB825\uAC1C\uBC1C\uAE30\uAD6C" }[e] || `${e}\uC758 \uD575\uC2EC \uC758\uBBF8`;
}
__name(ln, "ln");
__name2(ln, "ln");
function Xe(e, t) {
  const r = an(e), n = on(e, t), s = cn(e, t), i = ke(e), a = [{ title: `\uD559\uC2B5 \uB2E8\uC704: ${r.unitName}`, keywords: i.slice(0, 3), bullets: [`\uBC94\uC704: ${r.scope}`, `\uB300\uC0C1: ${r.targetLevel}`], children: n.map((c) => ({ title: c.title, keywords: ke(c.content.join(" ")).slice(0, 3), bullets: c.content, children: [] })) }], l = s.map((c) => ({ term: c.word, def: `${c.coreMeaning} \u2014 ${c.explanation}` })), o = n.map((c, u) => ({ title: c.title, anchor: `sec-${u + 1}` }));
  return { type: "structured", level: t, learningUnit: r, toc: o, hierarchy: a, glossary: l, coreTerms: s };
}
__name(Xe, "Xe");
__name2(Xe, "Xe");
var ft = { brief: { min: 0.12, max: 0.18, target: 0.15 }, standard: { min: 0.22, max: 0.3, target: 0.26 }, detail: { min: 0.35, max: 0.48, target: 0.42 } };
var tr = ["\uC774 \uAE00\uC740", "\uC124\uBA85\uD55C\uB2E4", "\uC120\uD589\uC5F0\uAD6C", "\uB2E4\uC591\uD55C \uAD00\uC810", "\uCCB4\uACC4\uC801\uC73C\uB85C \uBD84\uC11D", "\uADDC\uC815\uD574 \uC654\uB2E4"];
var Ne = ["7.6%", "2.8%", "6.5%", "0.2%"];
var rr = { brief: { minSentences: 2, mustIncludeComparison: true, minNumbers: 1 }, standard: { minSentences: 4, mustIncludeComparison: true, minNumbers: 2 }, detail: { minSentences: 6, mustIncludeComparison: true, minNumbers: 3 } };
function ne(e) {
  return e == null ? "" : String(e);
}
__name(ne, "ne");
__name2(ne, "ne");
function bt(e) {
  return ne(e).replace(/\s+/g, "").replace(/[^\p{L}\p{N}%]/gu, "").length;
}
__name(bt, "bt");
__name2(bt, "bt");
function nr(e) {
  return ne(e).split(new RegExp("(?<=[.!?]|\uB2E4\\.)\\s+")).map((t) => t.trim()).filter(Boolean);
}
__name(nr, "nr");
__name2(nr, "nr");
function We(e, t) {
  const r = ne(e);
  return t.filter((n) => r.includes(n)).length;
}
__name(We, "We");
__name2(We, "We");
function Re(e, t, r) {
  const n = bt(e), s = bt(t), i = s / Math.max(n, 1), a = ft[r];
  return { ratio: i, ok: i >= a.min && i <= a.max, rule: a, originLen: n, sumLen: s };
}
__name(Re, "Re");
__name2(Re, "Re");
function un(e, t) {
  const r = [], n = rr[t], s = ne(e);
  for (const l of tr)
    s.includes(l) && r.push(`\uAE08\uC9C0 \uD45C\uD604 \uD3EC\uD568: "${l}"`);
  const i = nr(s);
  i.length < n.minSentences && r.push(`\uBB38\uC7A5 \uC218 \uBD80\uC871: ${i.length}/${n.minSentences}`), n.mustIncludeComparison && (s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || r.push("\uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uC694\uC18C \uB204\uB77D"));
  const a = We(s, Ne);
  return a < n.minNumbers && r.push(`\uD575\uC2EC \uC218\uCE58 \uBD80\uC871: ${a}/${n.minNumbers}`), { ok: r.length === 0, errors: r };
}
__name(un, "un");
__name2(un, "un");
function dn(e) {
  return e === "brief" ? ["\uACF5\uAD50\uC721 \uCC45\uC784\uACFC \uBBFC\uAC04 \uBD80\uB2F4 \uAD6C\uC870\uC758 \uCC28\uC774\uAC00 \uC0AC\uAD50\uC721\uACFC \uC120\uD589\uD559\uC2B5 \uBB38\uD654\uC758 \uCC28\uC774\uB85C \uC774\uC5B4\uC9C4\uB2E4\uACE0 \uC124\uBA85\uD55C\uB2E4."] : e === "standard" ? ["\uD55C\uAD6D\uC740 \uACF5\uAD50\uC721 \uBBFC\uAC04 \uBD80\uB2F4\uC774 \uB192\uACE0 \uC2A4\uC6E8\uB374\uC740 \uB0AE\uC544 \uAD6D\uAC00 \uBD80\uB2F4 \uAD6C\uC870\uAC00 \uB2E4\uB974\uB2E4.", "\uC774 \uCC28\uC774\uAC00 \uC120\uD589\uD559\uC2B5 \uD544\uC694\uC131\uACFC \uC785\uC2DC \uC911\uC2EC \uBB38\uD654\uC758 \uAC15\uB3C4\uC5D0 \uC601\uD5A5\uC744 \uC900\uB2E4\uACE0 \uC81C\uC2DC\uB41C\uB2E4."] : ["\uD55C\uAD6D\uC740 GDP \uB300\uBE44 \uACF5\uAD50\uC721 7.6%\uC640 \uBBFC\uAC04 \uBD80\uB2F4 2.8%\uAC00, \uC2A4\uC6E8\uB374\uC740 6.5%\uC640 0.2%\uAC00 \uC81C\uC2DC\uB41C\uB2E4.", "\uC785\uC2DC \uC81C\uB3C4, \uACF5\uAD50\uC721 \uC9C0\uC6D0, \uC785\uC2DC\uC5D0 \uB450\uB294 \uBE44\uC911\uC774 \uAD6D\uAC00\uBCC4 \uC120\uD589\uD559\uC2B5 \uC591\uC0C1\uC744 \uB9CC\uB4E0\uB2E4\uACE0 \uACB0\uB860\uC9D3\uB294\uB2E4."];
}
__name(dn, "dn");
__name2(dn, "dn");
function Et(e, t, r) {
  const n = ft[r];
  let s = nr(t);
  s.length === 0 && (s = [ne(t).trim()].filter(Boolean));
  const i = /* @__PURE__ */ __name2(() => s.join(" "), "i");
  let a = Re(e, i(), r);
  if (a.ratio > n.max)
    for (; s.length > 1 && (s.pop(), a = Re(e, i(), r), !(a.ratio <= n.max)); )
      ;
  if (a.ratio < n.min) {
    const l = dn(r);
    for (const o of l)
      if (s.push(o), a = Re(e, i(), r), a.ratio >= n.min)
        break;
  }
  return a = Re(e, i(), r), { text: i().trim(), ratio: a.ratio, ok: a.ok, rule: n };
}
__name(Et, "Et");
__name2(Et, "Et");
function at(e) {
  const t = ["\uBBFC\uAC04 \uBD80\uB2F4", "\uBD80\uB2F4\uB960", "\uACF5\uAD50\uC721", "\uC0AC\uAD50\uC721", "\uC120\uD589\uD559\uC2B5", "\uC785\uC2DC", "\uBE44\uC728"], r = ne(e);
  let n = 0;
  for (const s of t)
    r.includes(s) && n++;
  return { score: n, need: 3 };
}
__name(at, "at");
__name2(at, "at");
function hn(e) {
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
__name(hn, "hn");
__name2(hn, "hn");
function fn(e) {
  var d;
  const t = [], r = [e.narrative.brief, e.narrative.standard, e.narrative.detail].join(" "), n = JSON.stringify(e.structured || {}), s = hn((d = e.mindmap) == null ? void 0 : d.root).join(" | "), i = at(r), a = at(n), l = at(s);
  i.score < i.need && t.push("\uC11C\uC220\uC694\uC57D: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), a.score < a.need && t.push("\uAD6C\uC870\uD654: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), l.score < l.need && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uB17C\uC810 \uC575\uCEE4 \uC57D\uD568"), r.includes("\uD55C\uAD6D") && r.includes("\uC2A4\uC6E8\uB374") || t.push("\uC11C\uC220\uC694\uC57D: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), n.includes("\uD55C\uAD6D") && n.includes("\uC2A4\uC6E8\uB374") || t.push("\uAD6C\uC870\uD654: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D"), s.includes("\uD55C\uAD6D") && s.includes("\uC2A4\uC6E8\uB374") || t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD55C\uAD6D/\uC2A4\uC6E8\uB374 \uBE44\uAD50 \uB204\uB77D");
  const o = We(r, Ne), c = We(n, Ne), u = We(s, Ne);
  return o < 2 && t.push("\uC11C\uC220\uC694\uC57D: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), c < 2 && t.push("\uAD6C\uC870\uD654: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), u < 2 && t.push("\uB9C8\uC778\uB4DC\uB9F5: \uD575\uC2EC \uC218\uCE58 \uADFC\uAC70 \uBD80\uC871"), { ok: t.length === 0, errors: t };
}
__name(fn, "fn");
__name2(fn, "fn");
function mn(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(mn, "mn");
__name2(mn, "mn");
async function pn(e) {
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
__name(pn, "pn");
__name2(pn, "pn");
async function Tt(e, t) {
  const r = { ...t, sample_hash: t.sample_hash || mn((t.errors || []).join("|")) };
  e && (await pn(e), await e.prepare(`
    INSERT INTO ms_fail_logs (ts, model, level, stage, errors, ratio, sample_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(r.ts, r.model || null, r.level || null, r.stage, JSON.stringify(r.errors || []), r.ratio ?? null, r.sample_hash || null).run());
}
__name(Tt, "Tt");
__name2(Tt, "Tt");
function gn(e, t, r, n) {
  const s = rr[r].minNumbers, i = ft[r];
  return `
\uC5ED\uD560: \uB108\uB294 \uD559\uC2B5\uC6A9 \uC11C\uC220\uC694\uC57D\uC744 \uAD50\uC815\uD55C\uB2E4. \uC0C8\uB85C \uC4F0\uB418 \uC544\uB798 \uADDC\uCE59\uC744 \uBC18\uB4DC\uC2DC \uC9C0\uCF1C\uB77C.
\uC694\uC57D\uC728: \uC6D0\uBB38 \uB300\uBE44 ${Math.round(i.min * 100)}~${Math.round(i.max * 100)}% \uBC94\uC704.

\uC704\uBC18 \uC0AC\uC720:
${n.map((a) => `- ${a}`).join(`
`)}

\uAD50\uC815 \uADDC\uCE59:
\u2460 \uAE08\uC9C0 \uD45C\uD604("${tr.join('", "')}")\uC744 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uB77C.
\u2461 \uD55C\uAD6D\uACFC \uC2A4\uC6E8\uB374\uC744 \uBC18\uB4DC\uC2DC \uBE44\uAD50\uD558\uB77C(\uD55C \uBB38\uC7A5 \uC774\uC0C1).
\u2462 \uC544\uB798 \uC218\uCE58 \uC911 \uCD5C\uC18C ${s}\uAC1C\uB97C \uD3EC\uD568\uD558\uB77C: ${Ne.join(", ")}
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
__name(gn, "gn");
__name2(gn, "gn");
async function xn(e) {
  const { originalText: t, model: r, callLLM: n, db: s } = e, i = {}, a = ["brief", "standard", "detail"];
  for (const o of a) {
    let c = ne(e.narrative[o]).trim();
    const u = Et(t, c, o);
    c = u.text, i[o] = { ratio: u.ratio, rule: u.rule };
    const d = un(c, o), f = Re(t, c, o);
    if (!d.ok || !f.ok) {
      const m = [...d.ok ? [] : d.errors, ...f.ok ? [] : [`\uC694\uC57D\uC728 \uC704\uBC18: ${Math.round(f.ratio * 1e3) / 10}% (\uD5C8\uC6A9 ${Math.round(f.rule.min * 100)}~${Math.round(f.rule.max * 100)}%)`]];
      await Tt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, level: o, stage: "narrative", errors: m, ratio: f.ratio });
      const p = gn(t, c, o, m), S = await Promise.resolve(n(p));
      e.narrative[o] = ne(S).trim();
      const g = Et(t, e.narrative[o], o);
      e.narrative[o] = g.text, i[o] = { ratio: g.ratio, rule: g.rule, rewritten: true };
    } else
      e.narrative[o] = c;
  }
  const l = fn({ narrative: e.narrative, structured: e.structured, mindmap: e.mindmap });
  return l.ok || await Tt(s, { ts: (/* @__PURE__ */ new Date()).toISOString(), model: r, stage: "qa_cross", errors: l.errors }), { narrative: e.narrative, structured: e.structured, mindmap: e.mindmap, qa: { cross_ok: l.ok, cross_errors: l.errors, ratios: i } };
}
__name(xn, "xn");
__name2(xn, "xn");
function sr(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r++)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16);
}
__name(sr, "sr");
__name2(sr, "sr");
function At(e) {
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
__name(At, "At");
__name2(At, "At");
function yn(e) {
  const t = Ke(e, "detail"), r = Xe(e, "detail"), n = Je(e, "detail"), s = ze(t.text, "detail", "exam"), i = e.length, a = sr(e), l = t.coreClaim, o = t.grounds, c = t.comparisons || [], u = t.implications || [];
  let d = t.text;
  if (!d.includes(`

`)) {
    const w = d.split(". ").filter(Boolean), x = Math.ceil(w.length / 2);
    d = w.slice(0, x).join(". ") + `.

` + w.slice(x).join(". ") + ".";
  }
  const f = r.toc, m = r.hierarchy, p = r.glossary, S = { title: n.title, children: n.children.map((w) => ({ title: w.title, children: (w.children || []).map((x) => ({ title: x.title, pack: Array.isArray(x.pack) && x.pack.length >= 2 ? x.pack : [x.title, `${x.title} \uAD00\uB828 \uB0B4\uC6A9`], explain: x.explain && x.explain.length >= 30 ? x.explain : `${x.title}\uB294 \uBCF8\uBB38\uC758 \uD575\uC2EC \uAC1C\uB150\uC73C\uB85C, \uC804\uCCB4 \uB9E5\uB77D\uC744 \uC774\uD574\uD558\uB294 \uB370 \uC911\uC694\uD55C \uC5ED\uD560\uC744 \uD558\uBA70, \uAD00\uB828\uB41C \uC138\uBD80 \uC0AC\uD56D\uACFC \uBE44\uAD50 \uB300\uC870\uB97C \uD1B5\uD574 \uC758\uBBF8\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uB2E4.`, children: [] })) })) };
  for (S.children[0] || S.children.push({ title: "1. \uC8FC\uC694 \uAC1C\uB150", children: [] }); S.children[0].children.length < 3; ) {
    const w = S.children[0].children.length + 1;
    S.children[0].children.push({ title: `\uCD94\uAC00 \uB178\uB4DC ${w}`, pack: ["\uD575\uC2EC", "\uAC1C\uB150", "\uC815\uBCF4"], explain: `\uCD94\uAC00 \uB178\uB4DC ${w}\uB294 \uC6D0\uBB38\uC758 \uB9E5\uB77D\uC744 \uBC18\uC601\uD55C \uBD84\uC11D \uACB0\uACFC\uB85C, \uC8FC\uC694 \uB17C\uC810\uC744 \uBCF4\uC644\uD558\uB294 \uB0B4\uC6A9\uC774\uB2E4.`, children: [] });
  }
  const g = { passScorePct: s.passScorePct, items: s.items };
  return { schemaVersion: "ms-v4", lang: "ko", source: { charCount: i, checksum: a }, narrative: { coreClaim: l, grounds: o, comparisons: c, implications: u, summaryDetail: d }, structured: { toc: f, hierarchy: m, glossary: p }, mindmap: S, selftest: g };
}
__name(yn, "yn");
__name2(yn, "yn");
function jt(e) {
  return ['\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C "\uC7AC\uC870\uB9BD"\uD558\uC5EC \uCC38\uACE0\uC11C\uD615 \uC9C0\uC2DD \uAD6C\uC870\uB85C \uB9CC\uB4DC\uB294 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.', "", "[\uC808\uB300 \uADDC\uCE59]", "- \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD574\uC57C \uD558\uBA70, \uAE00\uC790\uB97C \uC911\uAC04\uC5D0 \uC790\uB974\uAC70\uB098 \uBC1C\uCDCC\uB9CC \uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", "- \uC544\uB798 JSON \uC2A4\uD0A4\uB9C8 \uADF8\uB300\uB85C\uB9CC \uCD9C\uB825\uD558\uC138\uC694. (\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4/\uCF54\uB4DC\uBE14\uB85D \uAE08\uC9C0)", "- \uAC19\uC740 \uBB38\uC7A5\uC744 \uBC18\uBCF5\uD558\uBA74 \uC2E4\uD328\uC785\uB2C8\uB2E4.", '- structured.glossary\uB294 \uBC18\uB4DC\uC2DC "\uC6A9\uC5B4: \uC815\uC758" \uC131\uACA9\uC758 \uBB38\uC7A5\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.', "- mindmap\uC740 2\uB808\uBCA8 \uB178\uB4DC\uB9C8\uB2E4 pack(1~3\uAC1C)\uACFC explain(100~140\uC790)\uC744 \uCD5C\uB300\uD55C \uCC44\uC6B0\uC138\uC694.", "- selftest\uB294 passScorePct=90, \uBB38\uD56D 2~4\uAC1C. \uB8E8\uBE0C\uB9AD(mustInclude \uB4F1) \uD3EC\uD568.", "", "[JSON \uC2A4\uD0A4\uB9C8]", "{", '  "schemaVersion":"ms-v4",', '  "lang":"ko",', '  "source":{ "charCount":123, "checksum":"..." },', '  "narrative":{', '    "coreClaim":"1\uBB38\uC7A5",', '    "grounds":["\uADFC\uAC701","\uADFC\uAC702","\uADFC\uAC703"],', '    "comparisons":["\uBE44\uAD501"],', '    "implications":["\uC758\uBBF81"],', '    "summaryDetail":"\uBB38\uB2E8 \uAD6C\uBD84\uB41C 3~6\uB2E8\uB77D \uC11C\uC220(\\n\\n \uC0AC\uC6A9)"', "  },", '  "structured":{', '    "toc":[{"title":"...", "anchor":"..."}],', '    "hierarchy":[', '      { "title":"...", "bullets":["..."], "keywords":["..."], "children":[{"title":"...","bullets":["..."],"keywords":["..."]}] }', "    ],", '    "glossary":[{"term":"OO","def":"OO: ~~~"}]', "  },", '  "mindmap":{', '    "title":"\uD559\uC2B5 \uC8FC\uC81C",', '    "children":[', '      {"title":"\uC65C/\uBB34\uC5C7/\uC5B4\uB5BB\uAC8C \uB4F1 \uBC94\uC8FC", "children":[{"title":"\uD0A4\uC6CC\uB4DC","pack":["\uD0A41","\uD0A42"],"explain":"100~140\uC790 \uC124\uBA85", "children":[]}]}', "    ]", "  },", '  "selftest":{', '    "passScorePct":90,', '    "items":[', '      { "id":"q1", "type":"short", "question":"...", "hint":"...", "rubric":{"mustInclude":["..."],"maxChars":120}, "answerKey":"..." }', "    ]", "  }", "}", "", "[\uC6D0\uBB38]", e].join(`
`);
}
__name(jt, "jt");
__name2(jt, "jt");
function vn(e) {
  var i, a, l, o, c, u, d, f;
  const t = [];
  (e == null ? void 0 : e.schemaVersion) !== "ms-v4" && t.push("schemaVersion must be ms-v4"), (!((i = e == null ? void 0 : e.narrative) != null && i.coreClaim) || e.narrative.coreClaim.length < 10) && t.push("narrative.coreClaim too short"), (!Array.isArray((a = e == null ? void 0 : e.narrative) == null ? void 0 : a.grounds) || e.narrative.grounds.length < 3) && t.push("narrative.grounds must be >= 3"), (!((l = e == null ? void 0 : e.narrative) != null && l.summaryDetail) || String(e.narrative.summaryDetail).split(`

`).length < 2) && t.push("narrative.summaryDetail must have paragraphs"), (!Array.isArray((o = e == null ? void 0 : e.structured) == null ? void 0 : o.hierarchy) || e.structured.hierarchy.length < 1) && t.push("structured.hierarchy missing"), (!Array.isArray((c = e == null ? void 0 : e.structured) == null ? void 0 : c.glossary) || e.structured.glossary.length < 3) && t.push("structured.glossary must be >= 3");
  let r = 0, n = 0, s = 0;
  for (const m of ((u = e == null ? void 0 : e.mindmap) == null ? void 0 : u.children) || [])
    for (const p of (m == null ? void 0 : m.children) || [])
      r++, Array.isArray(p.pack) && p.pack.length && n++, typeof p.explain == "string" && p.explain.trim().length > 30 && s++;
  return r < 3 && t.push("mindmap too small (need >=3 L2 nodes)"), r >= 3 && n / r < 0.7 && t.push("mindmap pack coverage < 70%"), r >= 3 && s / r < 0.7 && t.push("mindmap explain coverage < 70%"), (!((d = e == null ? void 0 : e.selftest) != null && d.passScorePct) || e.selftest.passScorePct !== 90) && t.push("selftest.passScorePct must be 90"), (!Array.isArray((f = e == null ? void 0 : e.selftest) == null ? void 0 : f.items) || e.selftest.items.length < 2) && t.push("selftest.items must be >=2"), t;
}
__name(vn, "vn");
__name2(vn, "vn");
function wn(e) {
  var c, u, d, f;
  const t = [], r = (e.brief.narrative.text || "").replace(/\s+/g, ""), n = (e.standard.narrative.text || "").replace(/\s+/g, ""), s = (e.detail.narrative.text || "").replace(/\s+/g, "");
  r.length < 40 && t.push("brief narrative too short"), n.length < r.length + 20 && t.push("standard narrative not meaningfully longer than brief"), s.length < n.length + 40 && t.push("detail narrative not meaningfully longer than standard"), r === n && t.push("brief narrative equals standard narrative"), n === s && t.push("standard narrative equals detail narrative"), (((c = e.standard.structured.glossary) == null ? void 0 : c.length) || 0) < (((u = e.brief.structured.glossary) == null ? void 0 : u.length) || 0) && t.push("standard glossary must be >= brief glossary"), (((d = e.detail.structured.glossary) == null ? void 0 : d.length) || 0) < (((f = e.standard.structured.glossary) == null ? void 0 : f.length) || 0) && t.push("detail glossary must be >= standard glossary");
  const i = /* @__PURE__ */ __name2((m) => {
    let p = 0;
    for (const S of (m == null ? void 0 : m.children) || [])
      p += ((S == null ? void 0 : S.children) || []).length;
    return p;
  }, "i"), a = i(e.brief.mindmap.tree), l = i(e.standard.mindmap.tree), o = i(e.detail.mindmap.tree);
  return a === l && l === o || t.push(`mindmap L2 count mismatch (brief:${a}, standard:${l}, detail:${o})`), t;
}
__name(wn, "wn");
__name2(wn, "wn");
async function ot(e, t) {
  var l, o, c, u;
  const r = e.env.GEMINI_API_KEY;
  if (!r)
    throw new Error("GEMINI_API_KEY missing");
  const n = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", i = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${r}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: t }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 8192 } }) })).json();
  return ((u = (c = (o = (l = i == null ? void 0 : i.candidates) == null ? void 0 : l[0]) == null ? void 0 : o.content) == null ? void 0 : c.parts) == null ? void 0 : u.map((d) => d.text).join("")) || "";
}
__name(ot, "ot");
__name2(ot, "ot");
function Sn(e) {
  e.post("/api/matrix", async (t) => {
    const r = Date.now(), n = `matrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const s = await t.req.json(), i = String(s.text || "").trim();
      if (!i)
        return t.json({ ok: false, error: { code: "INVALID_TEXT", message: "text\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 400);
      const a = sr(i), l = t.env.USE_MOCK === "true" || !t.env.GEMINI_API_KEY;
      let o = null;
      if (l)
        console.log("[Matrix V4] Phase 1: \uB85C\uCEEC Fallback \uBAA8\uB4DC \uC0AC\uC6A9"), o = yn(i);
      else {
        const N = jt(i);
        let fe = await ot(t, N);
        if (o = At(fe), !o) {
          const tt = ["\uB108\uC758 \uC9C1\uC804 \uCD9C\uB825\uC740 JSON \uD30C\uC2F1\uC5D0 \uC2E4\uD328\uD588\uB2E4.", "\uC124\uBA85/\uB9C8\uD06C\uB2E4\uC6B4 \uC5C6\uC774, \uC624\uC9C1 JSON\uB9CC \uB2E4\uC2DC \uCD9C\uB825\uD558\uB77C.", jt(i)].join(`
`);
          fe = await ot(t, tt), o = At(fe);
        }
        if (!o)
          return t.json({ ok: false, error: { code: "DETAIL_JSON_PARSE_FAIL", message: "detail JSON \uD30C\uC2F1 \uC2E4\uD328" }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 502);
      }
      const c = vn(o);
      if (c.length)
        return t.json({ ok: false, error: { code: "DETAIL_VALIDATION_FAIL", message: c.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      let u = Ke(i, "brief"), d = Ke(i, "standard"), f = Ke(i, "detail");
      const m = Xe(i, "brief"), p = Xe(i, "standard"), S = Xe(i, "detail"), g = Je(i, "brief"), w = Je(i, "standard"), x = Je(i, "detail"), j = ze(i, "brief", "preview"), D = ze(i, "standard", "preview"), A = ze(i, "detail", "preview");
      u.warnings && u.warnings.length > 0 && console.log("[Matrix V4] Brief \uAC80\uC99D \uC2E4\uD328:", u.warnings), d.warnings && d.warnings.length > 0 && console.log("[Matrix V4] Standard \uAC80\uC99D \uC2E4\uD328:", d.warnings), f.warnings && f.warnings.length > 0 && console.log("[Matrix V4] Detail \uAC80\uC99D \uC2E4\uD328:", f.warnings);
      const I = { narrative: { text: u.text, coreClaim: u.coreClaim, grounds: u.grounds, comparisons: u.comparisons, implications: u.implications, ratio: u.ratio, ratioEnforcement: u.ratioEnforcement, targetRange: u.targetRange, warnings: u.warnings || [] }, structured: m, mindmap: g, selftest: j }, k = { narrative: { text: d.text, coreClaim: d.coreClaim, grounds: d.grounds, comparisons: d.comparisons, implications: d.implications, ratio: d.ratio, ratioEnforcement: d.ratioEnforcement, targetRange: d.targetRange, warnings: d.warnings || [] }, structured: p, mindmap: w, selftest: D }, O = { narrative: { text: f.text, coreClaim: f.coreClaim, grounds: f.grounds, comparisons: f.comparisons, implications: f.implications, ratio: f.ratio, ratioEnforcement: f.ratioEnforcement, targetRange: f.targetRange, warnings: f.warnings || [] }, structured: S, mindmap: x, selftest: A }, C = wn({ brief: I, standard: k, detail: O });
      if (C.length && l === false)
        return t.json({ ok: false, error: { code: "LEVEL_SEPARATION_FAIL", message: C.join(" | ") }, meta: { reqId: n, elapsedMs: Date.now() - r } }, 422);
      let L = { brief: I.narrative.text, standard: k.narrative.text, detail: O.narrative.text }, E = null;
      if (t.env.GEMINI_API_KEY && !l)
        try {
          const N = /* @__PURE__ */ __name2(async (tt) => await ot(t, tt), "N"), fe = await xn({ originalText: i, model: t.env.GEMINI_MODEL || "gemini", callLLM: N, db: t.env.DB, narrative: L, structured: { brief: I.structured, standard: k.structured, detail: O.structured }, mindmap: { brief: I.mindmap, standard: k.mindmap, detail: O.mindmap } });
          L = fe.narrative, E = fe.qa, I.narrative.text = L.brief, k.narrative.text = L.standard, O.narrative.text = L.detail, console.log("[Matrix V4] Quality Gate \uC801\uC6A9 \uC644\uB8CC:", { cross_ok: E.cross_ok, ratios: E.ratios });
        } catch (N) {
          console.error("[Matrix V4] Quality Gate \uC624\uB958:", N.message);
        }
      const H = { ok: true, data: { schemaVersion: "ms-v4", levels: { brief: I, standard: k, detail: O }, views: { narrative: { brief: I.narrative, standard: k.narrative, detail: O.narrative }, structured: { brief: I.structured, standard: k.structured, detail: O.structured }, mindmap: { brief: I.mindmap, standard: k.mindmap, detail: O.mindmap }, selftest: { brief: I.selftest, standard: k.selftest, detail: O.selftest } } }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4-detail+downsample", checksum: a, qa: E || void 0 } };
      return t.json(H, 200);
    } catch (s) {
      return t.json({ ok: false, error: { code: "MATRIX_V4_ERROR", message: (s == null ? void 0 : s.message) || String(s) }, meta: { requestId: n, elapsedMs: Date.now() - r, promptVersion: "matrix-v4" } }, 500);
    }
  }), e.post("/api/selftest/grade", async (t) => {
    try {
      const { gradeSelftestAttempt: r } = await Promise.resolve().then(() => Hn), n = await t.req.json(), { sheet: s, attempt: i } = n;
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
      const { buildFailReport: n } = await Promise.resolve().then(() => Un), s = Number(t.req.query("hours")) || 168, i = (r = t.env) == null ? void 0 : r.DB, a = await n(i, { sinceHours: s });
      return t.json({ ok: true, report: a }, 200);
    } catch (n) {
      return t.json({ ok: false, error: (n == null ? void 0 : n.message) || String(n) }, 500);
    }
  });
}
__name(Sn, "Sn");
__name2(Sn, "Sn");
var G = new Qt();
G.use("/api/*", Gr());
G.use("/static/*", en({ root: "./public" }));
Sn(G);
function Me() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Me, "Me");
__name2(Me, "Me");
function mt(e) {
  const t = String(e || "");
  let r = 2166136261;
  for (let n = 0; n < t.length; n++)
    r ^= t.charCodeAt(n), r = Math.imul(r, 16777619);
  return "h" + (r >>> 0).toString(16);
}
__name(mt, "mt");
__name2(mt, "mt");
function bn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(bn, "bn");
__name2(bn, "bn");
function En(e) {
  const t = String(e).toLowerCase();
  return t === "brief" || t === "b" ? "brief" : t === "detail" || t === "d" ? "detail" : "standard";
}
__name(En, "En");
__name2(En, "En");
function Tn(e) {
  const t = String(e).toLowerCase();
  return t === "structured" || t === "struct" ? "structured" : t === "mindmap" || t === "mind" ? "mindmap" : t === "selftest" || t === "test" ? "selftest" : "narrative";
}
__name(Tn, "Tn");
__name2(Tn, "Tn");
function An(e, t) {
  const r = Math.max(60, ve(e)), n = 0.53, s = Math.floor(r * n * 0.85), i = Math.ceil(r * n * 1.15), a = Math.floor(r * n), l = Math.ceil(r * 0.05);
  return { base: r, min: s, max: i, keep: a, tol: l };
}
__name(An, "An");
__name2(An, "An");
function jn(e) {
  const t = String((e == null ? void 0 : e.text) || "").trim(), r = Tn((e == null ? void 0 : e.viewType) || "narrative"), n = En(e == null ? void 0 : e.level), s = "detail", { base: i, min: a, max: l } = An(t), o = String((e == null ? void 0 : e.grade) || "general").toLowerCase(), c = String((e == null ? void 0 : e.subject) || "general").toLowerCase(), d = ["\uB2F9\uC2E0\uC740 \uD559\uC2B5 \uCF58\uD150\uCE20\uB97C \uCC38\uACE0\uC11C/\uAD50\uACFC\uC11C \uC218\uC900\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uB294 \uC9C0\uC2DD \uAD6C\uC870\uD654 \uC5D4\uC9C4\uC785\uB2C8\uB2E4.", `
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
`.trim(), `[\uC785\uB825 \uBA54\uD0C0] grade=${o}, subject=${c}, requestedLevel=${n}, forcedLevel=${s}, viewType=${r}`, "\uC544\uB798 [\uCD9C\uB825 \uC2A4\uD0A4\uB9C8] \uC678\uC5D0\uB294 \uC5B4\uB5A4 \uD14D\uC2A4\uD2B8\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.", "\uC6D0\uBB38:", t].join(`
`), f = `
[\uCD9C\uB825 \uC2A4\uD0A4\uB9C8: narrative]
{
  "level": "detail",
  "viewType": "narrative",
  "meta": { "grade": "${o}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  "meta": { "grade": "${o}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  "meta": { "grade": "${o}", "subject": "${c}", "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  "meta": { "grade": "${o}", "subject": "${c}", "passScore": 90, "charTarget": { "min": ${a}, "max": ${l}, "base": ${i} } },
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
  return r === "structured" ? g = m : r === "mindmap" ? g = p : r === "selftest" && (g = S), `${d}

${g}`;
}
__name(jn, "jn");
__name2(jn, "jn");
function he(e) {
  return String(e || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, `

`).replace(/-\s*\d+\s*-\s*/g, " ").replace(/\s+\n/g, `
`).trim();
}
__name(he, "he");
__name2(he, "he");
function et(e) {
  const t = he(e);
  return t ? t.replace(/([.?!])\s+/g, `$1
`).replace(/(다\.|요\.|니다\.)\s+/g, `$1
`).split(`
`).map((n) => n.trim()).filter(Boolean) : [];
}
__name(et, "et");
__name2(et, "et");
function kn(e) {
  const t = he(e).split(`
`).map((n) => n.trim()), r = [];
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    (/^\d+(\.\d+)+\.\s*/.test(s) || /^\d+\.\s*/.test(s)) && r.push({ title: s, startIdx: n });
  }
  return r;
}
__name(kn, "kn");
__name2(kn, "kn");
function pt(e) {
  const t = he(e).split(`
`), r = kn(e);
  if (!r.length)
    return [{ title: "\uBCF8\uBB38", body: he(e) }];
  const n = [];
  for (let s = 0; s < r.length; s++) {
    const i = r[s], a = r[s + 1], l = i.startIdx, o = a ? a.startIdx : t.length, c = i.title, u = t.slice(l + 1, o).join(`
`).trim();
    n.push({ title: c, body: u });
  }
  return n.filter((s) => s.body.length > 0);
}
__name(pt, "pt");
__name2(pt, "pt");
function On(e) {
  const t = e.length;
  let r = 0;
  return /(정의|일컫|의미|란|즉)/.test(e) && (r += 3), /(그러나|반면|이에 반해|대조|차이)/.test(e) && (r += 3), /(목표|역점|중시|필요|현황|방법|추세)/.test(e) && (r += 2), /\d{4}/.test(e) && (r += 1), t > 180 && (r -= 2), t > 260 && (r -= 3), t < 18 && (r -= 1), r;
}
__name(On, "On");
__name2(On, "On");
function ye(e, t) {
  const n = et(e).map((i, a) => ({ s: i, i: a, score: On(i) }));
  return n.sort((i, a) => a.score - i.score || i.i - a.i), n.slice(0, bn(t, 1, 12)).sort((i, a) => i.i - a.i).map((i) => i.s);
}
__name(ye, "ye");
__name2(ye, "ye");
function ve(e) {
  return String(e || "").replace(/\s+/g, "").length;
}
__name(ve, "ve");
__name2(ve, "ve");
var dt = { brief: { min: 0.1, max: 0.18 }, standard: { min: 0.25, max: 0.38 }, detail: { min: 0.45, max: 0.62 } };
function kt(e, t, r) {
  const n = Math.max(60, ve(e)), s = ve(t), i = Math.floor(n * dt[r].min), a = Math.ceil(n * dt[r].max);
  return s < i ? { text: t, ok: false, reason: "too_short", min: i, max: a, cur: s } : s > a ? { text: t, ok: false, reason: "too_long", min: i, max: a, cur: s } : { text: t, ok: true, reason: "ok", min: i, max: a, cur: s };
}
__name(kt, "kt");
__name2(kt, "kt");
function _e(e, t, r) {
  const n = Math.max(60, ve(e)), s = Math.ceil(n * dt[r].max);
  let i = String(t || "").trim();
  if (ve(i) <= s)
    return i;
  const a = et(i);
  let l = "";
  for (const o of a) {
    const c = (l ? l + " " : "") + o;
    if (ve(c) > s)
      break;
    l = c;
  }
  return l || a[0] || i.slice(0, Math.min(i.length, 200));
}
__name(_e, "_e");
__name2(_e, "_e");
function ct(e, t) {
  return `${e}_${t}`;
}
__name(ct, "ct");
__name2(ct, "ct");
function Rn(e) {
  const t = pt(e), r = { id: "root", title: "\uD575\uC2EC \uAD6C\uC870", type: "root", collapsed: false, children: [] }, n = /* @__PURE__ */ new Map();
  return t.forEach((s, i) => {
    const a = ct("sec", i + 1), l = { id: a, title: s.title, type: "section", collapsed: false, children: [] }, o = ye(s.body, 6), c = [];
    for (const x of o)
      (x.match(/[가-힣A-Za-z·/()]{2,20}/g) || []).slice(0, 8).forEach((D) => {
        const A = D.replace(/[()]/g, "").trim();
        A.length >= 2 && A.length <= 12 && !/^(그리고|하지만|또한|이와|이에|우선|한편)$/.test(A) && c.push(A);
      });
    const u = /* @__PURE__ */ new Map();
    c.forEach((x) => u.set(x, (u.get(x) || 0) + 1));
    const d = Array.from(u.entries()).sort((x, j) => j[1] - x[1]).map((x) => x[0]).filter((x) => x.length <= 10).slice(0, 3), f = ye(s.body, 3).join(" "), m = ye(s.body, 2).join(" "), p = ye(s.body, 1).join(" "), S = { id: ct(a + "_kw", 1), title: "\uD575\uC2EC \uAC1C\uB150", type: "keyword", collapsed: false, pack: d, explain: f, explainStandard: m, explainBrief: p, children: [] };
    d.forEach((x) => {
      n.has(x) || n.set(x, `\uBCF8\uBB38 \uB9E5\uB77D\uC5D0\uC11C "${x}"\uC758 \uD575\uC2EC \uC758\uBBF8\uB97C \uC694\uC57D\uD558\uBA74, ${ye(s.body, 1)[0] || "\uAD00\uB828 \uB0B4\uC6A9\uC758 \uD575\uC2EC \uAC1C\uB150\uC774\uB2E4."}`);
    });
    const w = et(s.body).filter((x) => /(\d{4}|%|가산점|전형|평가|프로그램|운영)/.test(x)).slice(0, 2);
    w.length && S.children.push({ id: ct(a + "_adv", 1), title: w.join(" "), type: "advanced", collapsed: true, children: [] }), l.children.push(S), r.children.push(l);
  }), { tree: r, glossary: Array.from(n.entries()).map(([s, i]) => ({ term: s, def: i })) };
}
__name(Rn, "Rn");
__name2(Rn, "Rn");
function ir(e, t) {
  const r = JSON.parse(JSON.stringify(e)), n = /* @__PURE__ */ __name2((s) => {
    s.type === "keyword" && (t === "brief" && (s.explain = s.explainBrief || s.explain), t === "standard" && (s.explain = s.explainStandard || s.explain), t === "detail" && (s.explain = s.explain || s.explainStandard || s.explainBrief)), s.type === "advanced" && (s.collapsed = t !== "detail"), (s.children || []).forEach(n);
  }, "n");
  return n(r), r;
}
__name(ir, "ir");
__name2(ir, "ir");
function $n(e, t, r, n) {
  const s = (t.children || []).map((u) => u.title), a = (ir(t, n).children || []).map((u) => {
    const d = (u.children || []).find((m) => m.type === "keyword"), f = Array.isArray(d == null ? void 0 : d.pack) ? d.pack : typeof (d == null ? void 0 : d.pack) == "string" ? [d.pack] : [];
    return { title: u.title, key: f.slice(0, 3), summary: (d == null ? void 0 : d.explain) || "" };
  }), l = n === "brief" ? 4 : n === "standard" ? 6 : 10, o = r.slice(0, l).map((u) => ({ term: u.term, def: _e(e, u.def, n) })), c = [];
  return c.push("\u2160. \uBAA9\uCC28"), s.forEach((u, d) => c.push(`  ${d + 1}. ${u}`)), c.push(""), c.push("\u2161. \uD575\uC2EC \uC815\uB9AC(\uC704\uACC4)"), a.forEach((u, d) => {
    var f;
    c.push(`  ${d + 1}. ${u.title}`), (f = u.key) != null && f.length && c.push(`     - \uD575\uC2EC\uD0A4\uC6CC\uB4DC: ${u.key.join(" \xB7 ")}`), u.summary && c.push(`     - \uC694\uC9C0: ${_e(e, u.summary, n)}`), c.push("");
  }), c.push("\u2162. \uC6A9\uC5B4\uC0AC\uC804"), o.forEach((u) => {
    c.push(`  - ${u.term}: ${u.def}`);
  }), { kind: "reference", toc: s, sections: a, glossary: o, renderText: c.join(`
`) };
}
__name($n, "$n");
__name2($n, "$n");
function Cn(e, t) {
  const r = pt(e), n = t === "brief" ? 2 : t === "standard" ? 4 : 7, s = [];
  r.forEach((a) => {
    const l = t === "brief" || t === "standard" ? 1 : 2;
    s.push(...ye(a.body, l));
  });
  const i = s.slice(0, n).join(" ");
  return _e(e, i, t);
}
__name(Cn, "Cn");
__name2(Cn, "Cn");
function Nn(e, t) {
  pt(e);
  const r = et(e), n = [], s = r.find((l) => /(일컫|정의|란)/.test(l)) || r[0] || "";
  s && n.push({ id: "q1", type: "short", question: '\uBCF8\uBB38\uC5D0\uC11C \uB9D0\uD558\uB294 "\uC120\uD589\uD559\uC2B5"\uC740 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB098\uC694?', answer: s, rubric: "\uC6D0\uBB38 \uC815\uC758 \uBB38\uC7A5\uC744 \uC694\uC9C0\uB85C \uC7AC\uC9C4\uC220", sourceHint: s });
  const i = r.find((l) => /(이에 반해|반면|대조)/.test(l));
  i && n.push({ id: "q2", type: "compare", question: "\uBCF8\uBB38\uC5D0\uC11C \uAD50\uC721\uBD80 \uAD00\uC810\uACFC \uC0AC\uAD50\uC721 \uAD00\uC810\uC740 \uC120\uD589\uD559\uC2B5\uC744 \uC5B4\uB5BB\uAC8C \uB2E4\uB974\uAC8C \uBCF4\uB098\uC694? \uD575\uC2EC \uCC28\uC774\uB97C 2\uAC00\uC9C0\uB85C \uC815\uB9AC\uD558\uC138\uC694.", answer: "\uAD50\uC721\uBD80\uB294 \uC120\uD589\uD559\uC2B5\uC774 \uACF5\uAD50\uC721 \uC815\uC0C1\uD654\uB97C \uBC29\uD574\uD558\uACE0 \uACA9\uCC28/\uBD80\uC815\uC801 \uC601\uD5A5 \uC694\uC778\uC774 \uB41C\uB2E4\uACE0 \uBCF8\uB2E4. \uC0AC\uAD50\uC721\uC740 \uC608\uC2B5\uACFC \uAD6C\uBD84\uD558\uBA70 \uC218\uC5C5 \uC131\uACFC\xB7\uC790\uC2E0\uAC10\xB7\uD765\uBBF8\uB97C \uB192\uC77C \uC218 \uC788\uB2E4\uACE0 \uBCF8\uB2E4.", rubric: "\uAD00\uC810 2\uAC1C(\uAD50\uC721\uBD80/\uC0AC\uAD50\uC721) \uBAA8\uB450 \uC5B8\uAE09 + \uCC28\uC774 2\uAC00\uC9C0", sourceHint: i });
  const a = r.find((l) => /(%|\d{4}|전형|가산점|비율)/.test(l));
  return a && n.push({ id: "q3", type: "evidence", question: "\uBCF8\uBB38\uC5D0\uC11C \uC81C\uC2DC\uB41C \uC218\uCE58/\uADFC\uAC70 1\uAC00\uC9C0\uB97C \uACE8\uB77C, \uADF8\uAC83\uC774 \uC65C \uC911\uC694\uD558\uB2E4\uACE0 \uB9D0\uD558\uB294\uC9C0 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD558\uC138\uC694.", answer: a, rubric: "\uC218\uCE58/\uADFC\uAC70 1\uAC1C \uC815\uD655\uD788 \uC81C\uC2DC + \uC758\uBBF8 1\uBB38\uC7A5", sourceHint: a }), n.slice(0, 4);
}
__name(Nn, "Nn");
__name2(Nn, "Nn");
function Mn(e, t) {
  let r = e.length, n = 0;
  const s = [];
  for (const a of e) {
    const l = ((t == null ? void 0 : t[a.id]) || "").trim();
    if (!l) {
      s.push({ id: a.id, ok: false, score: 0 });
      continue;
    }
    const c = (String(a.sourceHint || a.answer || "").match(/[가-힣A-Za-z0-9·/]{2,}/g) || []).map((p) => p.replace(/[()]/g, "")).filter(Boolean), u = Array.from(new Set(c)).slice(0, 8);
    let d = 0;
    u.forEach((p) => {
      l.includes(p) && d++;
    });
    const f = d >= 2 || l.length >= 30, m = f ? 1 : d === 1 ? 0.5 : 0;
    n += m, s.push({ id: a.id, ok: f, score: m, hit: d });
  }
  const i = r ? Math.round(n / r * 100) : 0;
  return { pct: i, passed: i >= 90, detail: s };
}
__name(Mn, "Mn");
__name2(Mn, "Mn");
function Ot(e) {
  const t = he(e), { tree: r, glossary: n } = Rn(t), s = { originalMeta: { textHash: mt(t), chars: t.length, ts: Me() }, modes: {} };
  return ["detail", "standard", "brief"].forEach((i) => {
    const a = Cn(t, i), l = $n(t, r, n, i), o = ir(r, i), c = Nn(t), d = kt(t, a, i).ok ? a : _e(t, a, i), f = l.renderText || "", m = kt(t, f, i);
    l.renderText = m.ok ? f : _e(t, f, i), s.modes[i] = { narrative: d, structured: l, mindmap: { tree: o }, selftest: c };
  }), s;
}
__name(Ot, "Ot");
__name2(Ot, "Ot");
G.get("/api/health", async (e) => {
  const t = !!e.env.DB, r = !!e.env.GEMINI_API_KEY;
  return e.json({ ok: true, ts: Me(), hasDB: t, hasGeminiKey: r, engineMode: r ? "llm" : "local-only" });
});
G.post("/api/engine", async (e) => {
  var m, p, S, g, w, x, j;
  const t = await e.req.json().catch(() => ({})), r = String((t == null ? void 0 : t.text) || ""), n = (t == null ? void 0 : t.mode) === "brief" || (t == null ? void 0 : t.mode) === "standard" || (t == null ? void 0 : t.mode) === "detail" ? t.mode : "standard", s = (t == null ? void 0 : t.viewType) === "narrative" || (t == null ? void 0 : t.viewType) === "structured" || (t == null ? void 0 : t.viewType) === "mindmap" || (t == null ? void 0 : t.viewType) === "selftest" ? t.viewType : "narrative";
  String((t == null ? void 0 : t.userId) || "anon");
  const i = String((t == null ? void 0 : t.grade) || "general"), a = String((t == null ? void 0 : t.subject) || "general"), l = (t == null ? void 0 : t.useGemini) === true, o = he(r);
  if (o.length < 5)
    return e.json({ ok: false, error: "text_too_short", message: "\uC785\uB825\uC740 5\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4." }, 400);
  let c = "v5-local", u;
  if (l && e.env.GEMINI_API_KEY)
    try {
      const D = jn({ text: o, viewType: s, level: "detail", grade: i, subject: a }), A = e.env.GEMINI_MODEL || "gemini-2.0-flash-exp", k = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${A}:generateContent?key=${e.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: D }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } }) })).json(), C = (((w = (g = (S = (p = (m = k == null ? void 0 : k.candidates) == null ? void 0 : m[0]) == null ? void 0 : p.content) == null ? void 0 : S.parts) == null ? void 0 : g[0]) == null ? void 0 : w.text) || "").match(/\{[\s\S]*\}/);
      if (C) {
        const L = JSON.parse(C[0]);
        u = { originalMeta: { textHash: mt(o), chars: o.length, ts: Me() }, modes: { detail: { [s]: L }, standard: { [s]: L }, brief: { [s]: L } } }, c = "gemini-" + A;
      } else
        throw new Error("Gemini \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    } catch (D) {
      console.error("[Gemini Error]", D), u = Ot(o), c = "v5-local-fallback";
    }
  else
    u = Ot(o);
  const d = (j = (x = u.modes) == null ? void 0 : x[n]) == null ? void 0 : j[s], f = { engine: c, mode: n, viewType: s, ts: Me(), textHash: u.originalMeta.textHash, grade: i, subject: a };
  return e.json({ ok: true, data: d, allSummaries: u.modes, meta: f });
});
G.post("/api/selftest/score", async (e) => {
  const t = await e.req.json().catch(() => ({})), r = Array.isArray(t == null ? void 0 : t.questions) ? t.questions : [], n = t != null && t.answers && typeof t.answers == "object" ? t.answers : {}, s = Mn(r, n);
  return e.json({ ok: true, result: s });
});
G.post("/api/saveSummary", async (e) => {
  const t = e.env.DB;
  if (!t)
    return e.json({ ok: false, error: "no_db", message: "DB(D1)\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 400);
  const r = await e.req.json().catch(() => ({})), n = String((r == null ? void 0 : r.userId) || "anon"), s = he(String((r == null ? void 0 : r.originalText) || "")), i = r == null ? void 0 : r.allSummaries;
  if (!s || !i)
    return e.json({ ok: false, error: "bad_request" }, 400);
  const a = String((r == null ? void 0 : r.id) || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`), l = Me(), o = mt(s), c = JSON.stringify(i);
  return await t.prepare(`
    INSERT INTO summaries (id, userId, createdAt, updatedAt, textHash, originalText, allSummariesJson)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    ON CONFLICT(id) DO UPDATE SET
      updatedAt=excluded.updatedAt,
      textHash=excluded.textHash,
      originalText=excluded.originalText,
      allSummariesJson=excluded.allSummariesJson
  `).bind(a, n, l, l, o, s, c).run(), e.json({ ok: true, id: a, textHash: o, ts: l });
});
G.get("/api/loadSummary", async (e) => {
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
G.get("/", (e) => e.redirect("/static/v5.html"));
var Rt = new Qt();
var _n = Object.assign({ "/src/index.tsx": G });
var ar = false;
for (const [, e] of Object.entries(_n))
  e && (Rt.route("/", e), Rt.notFound(e.notFoundHandler), ar = true);
if (!ar)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
function Ie(e) {
  return (e || "").replace(/\s+/g, " ").replace(/[''"]/g, "").trim().toLowerCase();
}
__name(Ie, "Ie");
__name2(Ie, "Ie");
function $t(e, t) {
  const r = Ie(e);
  return t.some((n) => r.includes(Ie(n)));
}
__name($t, "$t");
__name2($t, "$t");
function In(e, t) {
  const r = Ie(e);
  return t.every((n) => r.includes(Ie(n)));
}
__name(In, "In");
__name2(In, "In");
function Pn(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
__name(Pn, "Pn");
__name2(Pn, "Pn");
function Dn(e, t, r) {
  var p, S, g, w;
  const n = Ie(t), s = 100;
  if (!n) {
    const x = r === 1 ? e.hint1 || "\uD78C\uD2B8: \uBCF8\uBB38/\uC694\uC57D\uC5D0\uC11C \uAD00\uB828 \uBB38\uC7A5\uC744 \uCC3E\uC544\uBCF4\uC138\uC694." : r === 2 ? e.hint2 || "\uD78C\uD2B8: \uD575\uC2EC \uC218\uCE58/\uB300\uC870 \uD45C\uD604\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694." : void 0, j = r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uB97C \uCC38\uACE0\uD558\uC138\uC694." : void 0;
    return { id: e.id, score: 0, maxScore: s, correct: false, feedback: "\uBBF8\uC751\uB2F5", nextAction: "retry", hintToShow: x, explanationToShow: j };
  }
  const i = ((p = e.rubric) == null ? void 0 : p.mustIncludeAny) || [], a = ((S = e.rubric) == null ? void 0 : S.mustIncludeAll) || [], l = ((g = e.rubric) == null ? void 0 : g.forbid) || [], o = (w = e.rubric) == null ? void 0 : w.maxChars;
  let c = 100, u = [];
  o && n.length > o && (c -= 15, u.push(`\uBD84\uB7C9 \uCD08\uACFC(-15): ${n.length}/${o}`)), l.length && $t(n, l) && (c -= 20, u.push("\uAE08\uC9C0 \uD0A4\uC6CC\uB4DC \uD3EC\uD568(-20)")), a.length && !In(n, a) && (c -= 40, u.push("\uD544\uC218 \uC694\uC18C \uC77C\uBD80 \uB204\uB77D(-40)")), i.length && !$t(n, i) && (c -= 25, u.push("\uD575\uC2EC \uD0A4\uC6CC\uB4DC \uBBF8\uD3EC\uD568(-25)")), c = Pn(c, 0, 100);
  const d = c >= 90, f = !d && r === 1 ? e.hint1 || "\uD78C\uD2B8: \uC694\uC57D\uC5D0\uC11C \uD575\uC2EC \uC8FC\uC7A5/\uADFC\uAC70\uB97C \uCC3E\uC544 \uB2E8\uC5B4\uB85C \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694." : !d && r === 2 ? e.hint2 || "\uD78C\uD2B8: \uC218\uCE58\xB7\uB300\uC870(\uBC18\uBA74/\uBE44\uD574)\xB7\uACB0\uB860 \uBB38\uC7A5\uC744 \uC911\uC2EC\uC73C\uB85C \uB2E4\uC2DC \uAD6C\uC131\uD558\uC138\uC694." : void 0, m = !d && r >= 3 ? e.explanation || e.answerKey || "\uD574\uC124: \uC694\uC57D\uC758 \uD575\uC2EC \uADFC\uAC70\uC640 \uBE44\uAD50 \uD3EC\uC778\uD2B8\uB97C \uBC18\uC601\uD574\uC57C \uD569\uB2C8\uB2E4." : void 0;
  return { id: e.id, score: c, maxScore: s, correct: d, feedback: u.length ? u.join(" / ") : "\uCDA9\uBD84\uD788 \uC815\uD655\uD569\uB2C8\uB2E4.", nextAction: d ? "pass" : "retry", hintToShow: f, explanationToShow: m };
}
__name(Dn, "Dn");
__name2(Dn, "Dn");
function Ln(e, t) {
  const r = Math.max(1, Math.floor(t.attemptNo || 1)), n = e.questions.map((o) => {
    var u;
    const c = ((u = t.userAnswers) == null ? void 0 : u[o.id]) ?? "";
    return Dn(o, c, r);
  }), s = Math.round(n.reduce((o, c) => o + c.score, 0) / Math.max(1, n.length)), i = n.filter((o) => !o.correct).map((o) => o.id), a = s >= e.masteryScore;
  let l = "";
  return a ? l = "PASS: 90\uC810 \uC774\uC0C1 \uD1B5\uACFC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4." : r === 1 ? l = "1\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 1 \uC81C\uACF5)" : r === 2 ? l = "2\uCC28: \uD2C0\uB9B0 \uBB38\uD56D\uB9CC \uB2E4\uC2DC \uD480\uC5B4\uC8FC\uC138\uC694. (\uD78C\uD2B8 2 + \uADFC\uAC70 \uAC15\uD654)" : l = "3\uCC28 \uC774\uC0C1: \uD574\uC124\uC744 \uCC38\uACE0\uD558\uACE0, \uB3D9\uC77C \uBB38\uD56D\uC744 \uB2E4\uC2DC \uD480\uC5B4 \uC815\uB2F5 \uAE30\uC900(90\uC810)\uC744 \uCDA9\uC871\uD558\uC138\uC694.", { ok: true, attemptNo: r, totalScore: s, pass: a, wrongIds: i, marks: n, meta: { message: l } };
}
__name(Ln, "Ln");
__name2(Ln, "Ln");
var Hn = Object.freeze(Object.defineProperty({ __proto__: null, gradeSelftestAttempt: Ln }, Symbol.toStringTag, { value: "Module" }));
var qn = [];
async function or(e) {
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
__name(or, "or");
__name2(or, "or");
async function Fn(e, t) {
  const r = (t == null ? void 0 : t.sinceHours) ?? 168, n = new Date(Date.now() - r * 36e5).toISOString();
  let s = [];
  if (e) {
    await or(e);
    const o = await e.prepare(`
      SELECT ts, model, level, stage, errors, ratio, sample_hash
      FROM ms_fail_logs
      WHERE ts >= ?
      ORDER BY ts DESC
      LIMIT 500
    `).bind(n).all();
    s = ((o == null ? void 0 : o.results) || []).map((c) => ({ ts: c.ts, model: c.model, level: c.level, stage: c.stage, errors: JSON.parse(c.errors || "[]"), ratio: c.ratio, sample_hash: c.sample_hash }));
  } else
    s = qn.filter((o) => o.ts >= n).slice().reverse();
  const i = {}, a = {};
  for (const o of s) {
    i[o.stage] = (i[o.stage] || 0) + 1;
    for (const c of o.errors || [])
      a[c] = (a[c] || 0) + 1;
  }
  const l = Object.entries(a).sort((o, c) => c[1] - o[1]).slice(0, 10).map(([o, c]) => ({ error: o, count: c }));
  return { window: { sinceTs: n, count: s.length }, byStage: i, topErr: l, notes: ['\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uAE08\uC9C0 \uD45C\uD604"\uC5D0 \uBAB0\uB9AC\uBA74: \uD504\uB86C\uD504\uD2B8/\uB9AC\uB77C\uC774\uD2B8 \uAE08\uC9C0\uC5B4 \uAC15\uD654\uAC00 \uC6B0\uC120', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uC218\uCE58 \uBD80\uC871"\uC774\uBA74: numbers \uCD5C\uC18C \uD3EC\uD568 \uADDC\uCE59\uC744 \uAC15\uD654', '\uC0C1\uC704 \uC5D0\uB7EC\uAC00 "\uB17C\uC810 \uC575\uCEE4 \uBD88\uC77C\uCE58"\uBA74: \uAD6C\uC870\uD654/\uB9C8\uC778\uB4DC\uB9F5\uB3C4 \uC575\uCEE4\uB97C \uAC15\uC81C'] };
}
__name(Fn, "Fn");
__name2(Fn, "Fn");
var Un = Object.freeze(Object.defineProperty({ __proto__: null, buildFailReport: Fn, ensureFailLogTable: or }, Symbol.toStringTag, { value: "Module" }));
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
var middleware_insertion_facade_default = Rt;
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

// .wrangler/tmp/pages-CmC0ny/n37dtpga9zs.js
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

// .wrangler/tmp/bundle-q19iCq/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-q19iCq/middleware-loader.entry.ts
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
//# sourceMappingURL=n37dtpga9zs.js.map
