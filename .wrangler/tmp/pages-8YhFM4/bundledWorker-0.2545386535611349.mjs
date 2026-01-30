var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-yqyl47/checked-fetch.js
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

// ../.wrangler/tmp/bundle-yqyl47/strip-cf-connecting-ip-header.js
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
var tn = Object.defineProperty;
var dt = /* @__PURE__ */ __name((t) => {
  throw TypeError(t);
}, "dt");
var nn = /* @__PURE__ */ __name((t, e, n) => e in t ? tn(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, "nn");
var C = /* @__PURE__ */ __name((t, e, n) => nn(t, typeof e != "symbol" ? e + "" : e, n), "C");
var nt = /* @__PURE__ */ __name((t, e, n) => e.has(t) || dt("Cannot " + n), "nt");
var d = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "d");
var R = /* @__PURE__ */ __name((t, e, n) => e.has(t) ? dt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), "R");
var $ = /* @__PURE__ */ __name((t, e, n, s) => (nt(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n), "$");
var j = /* @__PURE__ */ __name((t, e, n) => (nt(t, e, "access private method"), n), "j");
var ut = /* @__PURE__ */ __name((t, e, n, s) => ({ set _(r) {
  $(t, e, r, n);
}, get _() {
  return d(t, e, s);
} }), "ut");
var ht = /* @__PURE__ */ __name((t, e, n) => (s, r) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i)
      throw new Error("next() called multiple times");
    i = o;
    let c, l = false, u;
    if (t[o] ? (u = t[o][0][0], s.req.routeIndex = o) : u = o === t.length && r || void 0, u)
      try {
        c = await u(s, () => a(o + 1));
      } catch (h) {
        if (h instanceof Error && e)
          s.error = h, c = await e(h, s), l = true;
        else
          throw h;
      }
    else
      s.finalized === false && n && (c = await n(s));
    return c && (s.finalized === false || l) && (s.res = c), s;
  }
  __name(a, "a");
}, "ht");
var sn = Symbol();
var rn = /* @__PURE__ */ __name(async (t, e = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: s = false } = e, i = (t instanceof kt ? t.raw.headers : t.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? an(t, { all: n, dot: s }) : {};
}, "rn");
async function an(t, e) {
  const n = await t.formData();
  return n ? on(n, e) : {};
}
__name(an, "an");
function on(t, e) {
  const n = /* @__PURE__ */ Object.create(null);
  return t.forEach((s, r) => {
    e.all || r.endsWith("[]") ? cn(n, r, s) : n[r] = s;
  }), e.dot && Object.entries(n).forEach(([s, r]) => {
    s.includes(".") && (ln(n, s, r), delete n[s]);
  }), n;
}
__name(on, "on");
var cn = /* @__PURE__ */ __name((t, e, n) => {
  t[e] !== void 0 ? Array.isArray(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : e.endsWith("[]") ? t[e] = [n] : t[e] = n;
}, "cn");
var ln = /* @__PURE__ */ __name((t, e, n) => {
  let s = t;
  const r = e.split(".");
  r.forEach((i, a) => {
    a === r.length - 1 ? s[i] = n : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "ln");
var At = /* @__PURE__ */ __name((t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, "At");
var dn = /* @__PURE__ */ __name((t) => {
  const { groups: e, path: n } = un(t), s = At(n);
  return hn(s, e);
}, "dn");
var un = /* @__PURE__ */ __name((t) => {
  const e = [];
  return t = t.replace(/\{[^}]+\}/g, (n, s) => {
    const r = `@${s}`;
    return e.push([r, n]), r;
  }), { groups: e, path: t };
}, "un");
var hn = /* @__PURE__ */ __name((t, e) => {
  for (let n = e.length - 1; n >= 0; n--) {
    const [s] = e[n];
    for (let r = t.length - 1; r >= 0; r--)
      if (t[r].includes(s)) {
        t[r] = t[r].replace(s, e[n][1]);
        break;
      }
  }
  return t;
}, "hn");
var Fe = {};
var fn = /* @__PURE__ */ __name((t, e) => {
  if (t === "*")
    return "*";
  const n = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const s = `${t}#${e}`;
    return Fe[s] || (n[2] ? Fe[s] = e && e[0] !== ":" && e[0] !== "*" ? [s, n[1], new RegExp(`^${n[2]}(?=/${e})`)] : [t, n[1], new RegExp(`^${n[2]}$`)] : Fe[s] = [t, n[1], true]), Fe[s];
  }
  return null;
}, "fn");
var lt = /* @__PURE__ */ __name((t, e) => {
  try {
    return e(t);
  } catch {
    return t.replace(/(?:%[0-9A-Fa-f]{2})+/g, (n) => {
      try {
        return e(n);
      } catch {
        return n;
      }
    });
  }
}, "lt");
var pn = /* @__PURE__ */ __name((t) => lt(t, decodeURI), "pn");
var Rt = /* @__PURE__ */ __name((t) => {
  const e = t.url, n = e.indexOf("/", e.indexOf(":") + 4);
  let s = n;
  for (; s < e.length; s++) {
    const r = e.charCodeAt(s);
    if (r === 37) {
      const i = e.indexOf("?", s), a = e.slice(n, i === -1 ? void 0 : i);
      return pn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (r === 63)
      break;
  }
  return e.slice(n, s);
}, "Rt");
var gn = /* @__PURE__ */ __name((t) => {
  const e = Rt(t);
  return e.length > 1 && e.at(-1) === "/" ? e.slice(0, -1) : e;
}, "gn");
var $e = /* @__PURE__ */ __name((t, e, ...n) => (n.length && (e = $e(e, ...n)), `${(t == null ? void 0 : t[0]) === "/" ? "" : "/"}${t}${e === "/" ? "" : `${(t == null ? void 0 : t.at(-1)) === "/" ? "" : "/"}${(e == null ? void 0 : e[0]) === "/" ? e.slice(1) : e}`}`), "$e");
var Mt = /* @__PURE__ */ __name((t) => {
  if (t.charCodeAt(t.length - 1) !== 63 || !t.includes(":"))
    return null;
  const e = t.split("/"), n = [];
  let s = "";
  return e.forEach((r) => {
    if (r !== "" && !/\:/.test(r))
      s += "/" + r;
    else if (/\:/.test(r))
      if (/\?/.test(r)) {
        n.length === 0 && s === "" ? n.push("/") : n.push(s);
        const i = r.replace("?", "");
        s += "/" + i, n.push(s);
      } else
        s += "/" + r;
  }), n.filter((r, i, a) => a.indexOf(r) === i);
}, "Mt");
var st = /* @__PURE__ */ __name((t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") !== -1 ? lt(t, jt) : t) : t, "st");
var Nt = /* @__PURE__ */ __name((t, e, n) => {
  let s;
  if (!n && e && !/[%+]/.test(e)) {
    let a = t.indexOf("?", 8);
    if (a === -1)
      return;
    for (t.startsWith(e, a + 1) || (a = t.indexOf(`&${e}`, a + 1)); a !== -1; ) {
      const o = t.charCodeAt(a + e.length + 1);
      if (o === 61) {
        const c = a + e.length + 2, l = t.indexOf("&", c);
        return st(t.slice(c, l === -1 ? void 0 : l));
      } else if (o == 38 || isNaN(o))
        return "";
      a = t.indexOf(`&${e}`, a + 1);
    }
    if (s = /[%+]/.test(t), !s)
      return;
  }
  const r = {};
  s ?? (s = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = t.indexOf("&", i + 1);
    let o = t.indexOf("=", i);
    o > a && a !== -1 && (o = -1);
    let c = t.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (s && (c = st(c)), i = a, c === "")
      continue;
    let l;
    o === -1 ? l = "" : (l = t.slice(o + 1, a === -1 ? void 0 : a), s && (l = st(l))), n ? (r[c] && Array.isArray(r[c]) || (r[c] = []), r[c].push(l)) : r[c] ?? (r[c] = l);
  }
  return e ? r[e] : r;
}, "Nt");
var mn = Nt;
var xn = /* @__PURE__ */ __name((t, e) => Nt(t, e, true), "xn");
var jt = decodeURIComponent;
var ft = /* @__PURE__ */ __name((t) => lt(t, jt), "ft");
var Ce;
var V;
var ae;
var It;
var Pt;
var ot;
var ce;
var St;
var kt = (St = /* @__PURE__ */ __name(class {
  constructor(t, e = "/", n = [[]]) {
    R(this, ae);
    C(this, "raw");
    R(this, Ce);
    R(this, V);
    C(this, "routeIndex", 0);
    C(this, "path");
    C(this, "bodyCache", {});
    R(this, ce, (t2) => {
      const { bodyCache: e2, raw: n2 } = this, s = e2[t2];
      if (s)
        return s;
      const r = Object.keys(e2)[0];
      return r ? e2[r].then((i) => (r === "json" && (i = JSON.stringify(i)), new Response(i)[t2]())) : e2[t2] = n2[t2]();
    });
    this.raw = t, this.path = e, $(this, V, n), $(this, Ce, {});
  }
  param(t) {
    return t ? j(this, ae, It).call(this, t) : j(this, ae, Pt).call(this);
  }
  query(t) {
    return mn(this.url, t);
  }
  queries(t) {
    return xn(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((n, s) => {
      e[s] = n;
    }), e;
  }
  async parseBody(t) {
    var e;
    return (e = this.bodyCache).parsedBody ?? (e.parsedBody = await rn(this, t));
  }
  json() {
    return d(this, ce).call(this, "text").then((t) => JSON.parse(t));
  }
  text() {
    return d(this, ce).call(this, "text");
  }
  arrayBuffer() {
    return d(this, ce).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, ce).call(this, "blob");
  }
  formData() {
    return d(this, ce).call(this, "formData");
  }
  addValidatedData(t, e) {
    d(this, Ce)[t] = e;
  }
  valid(t) {
    return d(this, Ce)[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [sn]() {
    return d(this, V);
  }
  get matchedRoutes() {
    return d(this, V)[0].map(([[, t]]) => t);
  }
  get routePath() {
    return d(this, V)[0].map(([[, t]]) => t)[this.routeIndex].path;
  }
}, "St"), Ce = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), It = /* @__PURE__ */ __name(function(t) {
  const e = d(this, V)[0][this.routeIndex][1][t], n = j(this, ae, ot).call(this, e);
  return n && /\%/.test(n) ? ft(n) : n;
}, "It"), Pt = /* @__PURE__ */ __name(function() {
  const t = {}, e = Object.keys(d(this, V)[0][this.routeIndex][1]);
  for (const n of e) {
    const s = j(this, ae, ot).call(this, d(this, V)[0][this.routeIndex][1][n]);
    s !== void 0 && (t[n] = /\%/.test(s) ? ft(s) : s);
  }
  return t;
}, "Pt"), ot = /* @__PURE__ */ __name(function(t) {
  return d(this, V)[1] ? d(this, V)[1][t] : t;
}, "ot"), ce = /* @__PURE__ */ new WeakMap(), St);
var bn = { Stringify: 1 };
var Lt = /* @__PURE__ */ __name(async (t, e, n, s, r) => {
  typeof t == "object" && !(t instanceof String) && (t instanceof Promise || (t = t.toString()), t instanceof Promise && (t = await t));
  const i = t.callbacks;
  return i != null && i.length ? (r ? r[0] += t : r = [t], Promise.all(i.map((o) => o({ phase: e, buffer: r, context: s }))).then((o) => Promise.all(o.filter(Boolean).map((c) => Lt(c, e, false, s, r))).then(() => r[0]))) : Promise.resolve(t);
}, "Lt");
var vn = "text/plain; charset=UTF-8";
var rt = /* @__PURE__ */ __name((t, e) => ({ "Content-Type": t, ...e }), "rt");
var Be;
var qe;
var ne;
var Ae;
var se;
var Y;
var Ge;
var Re;
var Me;
var xe;
var Ke;
var Ue;
var le;
var Te;
var Ot;
var wn = (Ot = /* @__PURE__ */ __name(class {
  constructor(t, e) {
    R(this, le);
    R(this, Be);
    R(this, qe);
    C(this, "env", {});
    R(this, ne);
    C(this, "finalized", false);
    C(this, "error");
    R(this, Ae);
    R(this, se);
    R(this, Y);
    R(this, Ge);
    R(this, Re);
    R(this, Me);
    R(this, xe);
    R(this, Ke);
    R(this, Ue);
    C(this, "render", (...t2) => (d(this, Re) ?? $(this, Re, (e2) => this.html(e2)), d(this, Re).call(this, ...t2)));
    C(this, "setLayout", (t2) => $(this, Ge, t2));
    C(this, "getLayout", () => d(this, Ge));
    C(this, "setRenderer", (t2) => {
      $(this, Re, t2);
    });
    C(this, "header", (t2, e2, n) => {
      this.finalized && $(this, Y, new Response(d(this, Y).body, d(this, Y)));
      const s = d(this, Y) ? d(this, Y).headers : d(this, xe) ?? $(this, xe, new Headers());
      e2 === void 0 ? s.delete(t2) : n != null && n.append ? s.append(t2, e2) : s.set(t2, e2);
    });
    C(this, "status", (t2) => {
      $(this, Ae, t2);
    });
    C(this, "set", (t2, e2) => {
      d(this, ne) ?? $(this, ne, /* @__PURE__ */ new Map()), d(this, ne).set(t2, e2);
    });
    C(this, "get", (t2) => d(this, ne) ? d(this, ne).get(t2) : void 0);
    C(this, "newResponse", (...t2) => j(this, le, Te).call(this, ...t2));
    C(this, "body", (t2, e2, n) => j(this, le, Te).call(this, t2, e2, n));
    C(this, "text", (t2, e2, n) => !d(this, xe) && !d(this, Ae) && !e2 && !n && !this.finalized ? new Response(t2) : j(this, le, Te).call(this, t2, e2, rt(vn, n)));
    C(this, "json", (t2, e2, n) => j(this, le, Te).call(this, JSON.stringify(t2), e2, rt("application/json", n)));
    C(this, "html", (t2, e2, n) => {
      const s = /* @__PURE__ */ __name((r) => j(this, le, Te).call(this, r, e2, rt("text/html; charset=UTF-8", n)), "s");
      return typeof t2 == "object" ? Lt(t2, bn.Stringify, false, {}).then(s) : s(t2);
    });
    C(this, "redirect", (t2, e2) => {
      const n = String(t2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, e2 ?? 302);
    });
    C(this, "notFound", () => (d(this, Me) ?? $(this, Me, () => new Response()), d(this, Me).call(this, this)));
    $(this, Be, t), e && ($(this, se, e.executionCtx), this.env = e.env, $(this, Me, e.notFoundHandler), $(this, Ue, e.path), $(this, Ke, e.matchResult));
  }
  get req() {
    return d(this, qe) ?? $(this, qe, new kt(d(this, Be), d(this, Ue), d(this, Ke))), d(this, qe);
  }
  get event() {
    if (d(this, se) && "respondWith" in d(this, se))
      return d(this, se);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, se))
      return d(this, se);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, Y) || $(this, Y, new Response(null, { headers: d(this, xe) ?? $(this, xe, new Headers()) }));
  }
  set res(t) {
    if (d(this, Y) && t) {
      t = new Response(t.body, t);
      for (const [e, n] of d(this, Y).headers.entries())
        if (e !== "content-type")
          if (e === "set-cookie") {
            const s = d(this, Y).headers.getSetCookie();
            t.headers.delete("set-cookie");
            for (const r of s)
              t.headers.append("set-cookie", r);
          } else
            t.headers.set(e, n);
    }
    $(this, Y, t), this.finalized = true;
  }
  get var() {
    return d(this, ne) ? Object.fromEntries(d(this, ne)) : {};
  }
}, "Ot"), Be = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakSet(), Te = /* @__PURE__ */ __name(function(t, e, n) {
  const s = d(this, Y) ? new Headers(d(this, Y).headers) : d(this, xe) ?? new Headers();
  if (typeof e == "object" && "headers" in e) {
    const i = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
    for (const [a, o] of i)
      a.toLowerCase() === "set-cookie" ? s.append(a, o) : s.set(a, o);
  }
  if (n)
    for (const [i, a] of Object.entries(n))
      if (typeof a == "string")
        s.set(i, a);
      else {
        s.delete(i);
        for (const o of a)
          s.append(i, o);
      }
  const r = typeof e == "number" ? e : (e == null ? void 0 : e.status) ?? d(this, Ae);
  return new Response(t, { status: r, headers: s });
}, "Te"), Ot);
var K = "ALL";
var yn = "all";
var En = ["get", "post", "put", "delete", "options", "patch"];
var Ht = "Can not add a route since the matcher is already built.";
var Dt = /* @__PURE__ */ __name(class extends Error {
}, "Dt");
var Sn = "__COMPOSED_HANDLER";
var On = /* @__PURE__ */ __name((t) => t.text("404 Not Found", 404), "On");
var pt = /* @__PURE__ */ __name((t, e) => {
  if ("getResponse" in t) {
    const n = t.getResponse();
    return e.newResponse(n.body, n);
  }
  return console.error(t), e.text("Internal Server Error", 500);
}, "pt");
var X;
var U;
var Bt;
var Q;
var ge;
var Je;
var Ye;
var Ne;
var $n = (Ne = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    R(this, U);
    C(this, "get");
    C(this, "post");
    C(this, "put");
    C(this, "delete");
    C(this, "options");
    C(this, "patch");
    C(this, "all");
    C(this, "on");
    C(this, "use");
    C(this, "router");
    C(this, "getPath");
    C(this, "_basePath", "/");
    R(this, X, "/");
    C(this, "routes", []);
    R(this, Q, On);
    C(this, "errorHandler", pt);
    C(this, "onError", (e2) => (this.errorHandler = e2, this));
    C(this, "notFound", (e2) => ($(this, Q, e2), this));
    C(this, "fetch", (e2, ...n) => j(this, U, Ye).call(this, e2, n[1], n[0], e2.method));
    C(this, "request", (e2, n, s2, r2) => e2 instanceof Request ? this.fetch(n ? new Request(e2, n) : e2, s2, r2) : (e2 = e2.toString(), this.fetch(new Request(/^https?:\/\//.test(e2) ? e2 : `http://localhost${$e("/", e2)}`, n), s2, r2)));
    C(this, "fire", () => {
      addEventListener("fetch", (e2) => {
        e2.respondWith(j(this, U, Ye).call(this, e2.request, e2, void 0, e2.request.method));
      });
    });
    [...En, yn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? $(this, X, a) : j(this, U, ge).call(this, i, d(this, X), a), o.forEach((c) => {
        j(this, U, ge).call(this, i, d(this, X), c);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const c of [a].flat()) {
        $(this, X, c);
        for (const l of [i].flat())
          o.map((u) => {
            j(this, U, ge).call(this, l.toUpperCase(), d(this, X), u);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? $(this, X, i) : ($(this, X, "*"), a.unshift(i)), a.forEach((o) => {
      j(this, U, ge).call(this, K, d(this, X), o);
    }), this);
    const { strict: s, ...r } = e;
    Object.assign(this, r), this.getPath = s ?? true ? e.getPath ?? Rt : gn;
  }
  route(e, n) {
    const s = this.basePath(e);
    return n.routes.map((r) => {
      var a;
      let i;
      n.errorHandler === pt ? i = r.handler : (i = /* @__PURE__ */ __name(async (o, c) => (await ht([], n.errorHandler)(o, () => r.handler(o, c))).res, "i"), i[Sn] = r.handler), j(a = s, U, ge).call(a, r.method, r.path, i);
    }), this;
  }
  basePath(e) {
    const n = j(this, U, Bt).call(this);
    return n._basePath = $e(this._basePath, e), n;
  }
  mount(e, n, s) {
    let r, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? r = /* @__PURE__ */ __name((c) => c, "r") : r = s.replaceRequest));
    const a = i ? (c) => {
      const l = i(c);
      return Array.isArray(l) ? l : [l];
    } : (c) => {
      let l;
      try {
        l = c.executionCtx;
      } catch {
      }
      return [c.env, l];
    };
    r || (r = (() => {
      const c = $e(this._basePath, e), l = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(l) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name(async (c, l) => {
      const u = await n(r(c.req.raw), ...a(c));
      if (u)
        return u;
      await l();
    }, "o");
    return j(this, U, ge).call(this, K, $e(e, "*"), o), this;
  }
}, "Ne"), X = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), Bt = /* @__PURE__ */ __name(function() {
  const e = new Ne({ router: this.router, getPath: this.getPath });
  return e.errorHandler = this.errorHandler, $(e, Q, d(this, Q)), e.routes = this.routes, e;
}, "Bt"), Q = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ __name(function(e, n, s) {
  e = e.toUpperCase(), n = $e(this._basePath, n);
  const r = { basePath: this._basePath, path: n, method: e, handler: s };
  this.router.add(e, n, [s, r]), this.routes.push(r);
}, "ge"), Je = /* @__PURE__ */ __name(function(e, n) {
  if (e instanceof Error)
    return this.errorHandler(e, n);
  throw e;
}, "Je"), Ye = /* @__PURE__ */ __name(function(e, n, s, r) {
  if (r === "HEAD")
    return (async () => new Response(null, await j(this, U, Ye).call(this, e, n, s, "GET")))();
  const i = this.getPath(e, { env: s }), a = this.router.match(r, i), o = new wn(e, { path: i, matchResult: a, env: s, executionCtx: n, notFoundHandler: d(this, Q) });
  if (a[0].length === 1) {
    let l;
    try {
      l = a[0][0][0][0](o, async () => {
        o.res = await d(this, Q).call(this, o);
      });
    } catch (u) {
      return j(this, U, Je).call(this, u, o);
    }
    return l instanceof Promise ? l.then((u) => u || (o.finalized ? o.res : d(this, Q).call(this, o))).catch((u) => j(this, U, Je).call(this, u, o)) : l ?? d(this, Q).call(this, o);
  }
  const c = ht(a[0], this.errorHandler, d(this, Q));
  return (async () => {
    try {
      const l = await c(o);
      if (!l.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return j(this, U, Je).call(this, l, o);
    }
  })();
}, "Ye"), Ne);
var qt = [];
function Tn(t, e) {
  const n = this.buildAllMatchers(), s = /* @__PURE__ */ __name((r, i) => {
    const a = n[r] || n[K], o = a[2][i];
    if (o)
      return o;
    const c = i.match(a[0]);
    if (!c)
      return [[], qt];
    const l = c.indexOf("", 1);
    return [a[1][l], c];
  }, "s");
  return this.match = s, s(t, e);
}
__name(Tn, "Tn");
var Qe = "[^/]+";
var He = ".*";
var De = "(?:|/.*)";
var _e = Symbol();
var _n = new Set(".\\+*[^]$()");
function Cn(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === He || t === De ? 1 : e === He || e === De ? -1 : t === Qe ? 1 : e === Qe ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
__name(Cn, "Cn");
var be;
var ve;
var Z;
var Se;
var An = (Se = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, be);
    R(this, ve);
    R(this, Z, /* @__PURE__ */ Object.create(null));
  }
  insert(e, n, s, r, i) {
    if (e.length === 0) {
      if (d(this, be) !== void 0)
        throw _e;
      if (i)
        return;
      $(this, be, n);
      return;
    }
    const [a, ...o] = e, c = a === "*" ? o.length === 0 ? ["", "", He] : ["", "", Qe] : a === "/*" ? ["", "", De] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (c) {
      const u = c[1];
      let h = c[2] || Qe;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw _e;
      if (l = d(this, Z)[h], !l) {
        if (Object.keys(d(this, Z)).some((w) => w !== He && w !== De))
          throw _e;
        if (i)
          return;
        l = d(this, Z)[h] = new Se(), u !== "" && $(l, ve, r.varIndex++);
      }
      !i && u !== "" && s.push([u, d(l, ve)]);
    } else if (l = d(this, Z)[a], !l) {
      if (Object.keys(d(this, Z)).some((u) => u.length > 1 && u !== He && u !== De))
        throw _e;
      if (i)
        return;
      l = d(this, Z)[a] = new Se();
    }
    l.insert(o, n, s, r, i);
  }
  buildRegExpStr() {
    const n = Object.keys(d(this, Z)).sort(Cn).map((s) => {
      const r = d(this, Z)[s];
      return (typeof d(r, ve) == "number" ? `(${s})@${d(r, ve)}` : _n.has(s) ? `\\${s}` : s) + r.buildRegExpStr();
    });
    return typeof d(this, be) == "number" && n.unshift(`#${d(this, be)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "Se"), be = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Se);
var et;
var ze;
var $t;
var Rn = ($t = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, et, { varIndex: 0 });
    R(this, ze, new An());
  }
  insert(t, e, n) {
    const s = [], r = [];
    for (let a = 0; ; ) {
      let o = false;
      if (t = t.replace(/\{[^}]+\}/g, (c) => {
        const l = `@\\${a}`;
        return r[a] = [l, c], a++, o = true, l;
      }), !o)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = r.length - 1; a >= 0; a--) {
      const [o] = r[a];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(o) !== -1) {
          i[c] = i[c].replace(o, r[a][1]);
          break;
        }
    }
    return d(this, ze).insert(i, e, s, d(this, et), n), s;
  }
  buildRegExp() {
    let t = d(this, ze).buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const n = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (r, i, a) => i !== void 0 ? (n[++e] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++e), "")), [new RegExp(`^${t}`), n, s];
  }
}, "$t"), et = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), $t);
var Mn = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var We = /* @__PURE__ */ Object.create(null);
function Gt(t) {
  return We[t] ?? (We[t] = new RegExp(t === "*" ? "" : `^${t.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(Gt, "Gt");
function Nn() {
  We = /* @__PURE__ */ Object.create(null);
}
__name(Nn, "Nn");
function jn(t) {
  var l;
  const e = new Rn(), n = [];
  if (t.length === 0)
    return Mn;
  const s = t.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [w, T]) => u ? 1 : w ? -1 : h.length - T.length), r = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, w = s.length; u < w; u++) {
    const [T, M, k] = s[u];
    T ? r[M] = [k.map(([b]) => [b, /* @__PURE__ */ Object.create(null)]), qt] : h++;
    let A;
    try {
      A = e.insert(M, h, T);
    } catch (b) {
      throw b === _e ? new Dt(M) : b;
    }
    T || (n[h] = k.map(([b, v]) => {
      const _ = /* @__PURE__ */ Object.create(null);
      for (v -= 1; v >= 0; v--) {
        const [I, g] = A[v];
        _[I] = g;
      }
      return [b, _];
    }));
  }
  const [i, a, o] = e.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let w = 0, T = n[u].length; w < T; w++) {
      const M = (l = n[u][w]) == null ? void 0 : l[1];
      if (!M)
        continue;
      const k = Object.keys(M);
      for (let A = 0, b = k.length; A < b; A++)
        M[k[A]] = o[M[k[A]]];
    }
  const c = [];
  for (const u in a)
    c[u] = n[a[u]];
  return [i, c, r];
}
__name(jn, "jn");
function Oe(t, e) {
  if (t) {
    for (const n of Object.keys(t).sort((s, r) => r.length - s.length))
      if (Gt(n).test(e))
        return [...t[n]];
  }
}
__name(Oe, "Oe");
var de;
var ue;
var tt;
var Kt;
var Tt;
var kn = (Tt = /* @__PURE__ */ __name(class {
  constructor() {
    R(this, tt);
    C(this, "name", "RegExpRouter");
    R(this, de);
    R(this, ue);
    C(this, "match", Tn);
    $(this, de, { [K]: /* @__PURE__ */ Object.create(null) }), $(this, ue, { [K]: /* @__PURE__ */ Object.create(null) });
  }
  add(t, e, n) {
    var o;
    const s = d(this, de), r = d(this, ue);
    if (!s || !r)
      throw new Error(Ht);
    s[t] || [s, r].forEach((c) => {
      c[t] = /* @__PURE__ */ Object.create(null), Object.keys(c[K]).forEach((l) => {
        c[t][l] = [...c[K][l]];
      });
    }), e === "/*" && (e = "*");
    const i = (e.match(/\/:/g) || []).length;
    if (/\*$/.test(e)) {
      const c = Gt(e);
      t === K ? Object.keys(s).forEach((l) => {
        var u;
        (u = s[l])[e] || (u[e] = Oe(s[l], e) || Oe(s[K], e) || []);
      }) : (o = s[t])[e] || (o[e] = Oe(s[t], e) || Oe(s[K], e) || []), Object.keys(s).forEach((l) => {
        (t === K || t === l) && Object.keys(s[l]).forEach((u) => {
          c.test(u) && s[l][u].push([n, i]);
        });
      }), Object.keys(r).forEach((l) => {
        (t === K || t === l) && Object.keys(r[l]).forEach((u) => c.test(u) && r[l][u].push([n, i]));
      });
      return;
    }
    const a = Mt(e) || [e];
    for (let c = 0, l = a.length; c < l; c++) {
      const u = a[c];
      Object.keys(r).forEach((h) => {
        var w;
        (t === K || t === h) && ((w = r[h])[u] || (w[u] = [...Oe(s[h], u) || Oe(s[K], u) || []]), r[h][u].push([n, i - l + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const t = /* @__PURE__ */ Object.create(null);
    return Object.keys(d(this, ue)).concat(Object.keys(d(this, de))).forEach((e) => {
      t[e] || (t[e] = j(this, tt, Kt).call(this, e));
    }), $(this, de, $(this, ue, void 0)), Nn(), t;
  }
}, "Tt"), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakSet(), Kt = /* @__PURE__ */ __name(function(t) {
  const e = [];
  let n = t === K;
  return [d(this, de), d(this, ue)].forEach((s) => {
    const r = s[t] ? Object.keys(s[t]).map((i) => [i, s[t][i]]) : [];
    r.length !== 0 ? (n || (n = true), e.push(...r)) : t !== K && e.push(...Object.keys(s[K]).map((i) => [i, s[K][i]]));
  }), n ? jn(e) : null;
}, "Kt"), Tt);
var he;
var re;
var _t;
var In = (_t = /* @__PURE__ */ __name(class {
  constructor(t) {
    C(this, "name", "SmartRouter");
    R(this, he, []);
    R(this, re, []);
    $(this, he, t.routers);
  }
  add(t, e, n) {
    if (!d(this, re))
      throw new Error(Ht);
    d(this, re).push([t, e, n]);
  }
  match(t, e) {
    if (!d(this, re))
      throw new Error("Fatal error");
    const n = d(this, he), s = d(this, re), r = n.length;
    let i = 0, a;
    for (; i < r; i++) {
      const o = n[i];
      try {
        for (let c = 0, l = s.length; c < l; c++)
          o.add(...s[c]);
        a = o.match(t, e);
      } catch (c) {
        if (c instanceof Dt)
          continue;
        throw c;
      }
      this.match = o.match.bind(o), $(this, he, [o]), $(this, re, void 0);
      break;
    }
    if (i === r)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (d(this, re) || d(this, he).length !== 1)
      throw new Error("No active router has been determined yet.");
    return d(this, he)[0];
  }
}, "_t"), he = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), _t);
var Pe = /* @__PURE__ */ Object.create(null);
var fe;
var J;
var we;
var je;
var z;
var ie;
var me;
var ke;
var Pn = (ke = /* @__PURE__ */ __name(class {
  constructor(e, n, s) {
    R(this, ie);
    R(this, fe);
    R(this, J);
    R(this, we);
    R(this, je, 0);
    R(this, z, Pe);
    if ($(this, J, s || /* @__PURE__ */ Object.create(null)), $(this, fe, []), e && n) {
      const r = /* @__PURE__ */ Object.create(null);
      r[e] = { handler: n, possibleKeys: [], score: 0 }, $(this, fe, [r]);
    }
    $(this, we, []);
  }
  insert(e, n, s) {
    $(this, je, ++ut(this, je)._);
    let r = this;
    const i = dn(n), a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o], u = i[o + 1], h = fn(l, u), w = Array.isArray(h) ? h[0] : l;
      if (w in d(r, J)) {
        r = d(r, J)[w], h && a.push(h[1]);
        continue;
      }
      d(r, J)[w] = new ke(), h && (d(r, we).push(h), a.push(h[1])), r = d(r, J)[w];
    }
    return d(r, fe).push({ [e]: { handler: s, possibleKeys: a.filter((o, c, l) => l.indexOf(o) === c), score: d(this, je) } }), r;
  }
  search(e, n) {
    var c;
    const s = [];
    $(this, z, Pe);
    let i = [this];
    const a = At(n), o = [];
    for (let l = 0, u = a.length; l < u; l++) {
      const h = a[l], w = l === u - 1, T = [];
      for (let M = 0, k = i.length; M < k; M++) {
        const A = i[M], b = d(A, J)[h];
        b && ($(b, z, d(A, z)), w ? (d(b, J)["*"] && s.push(...j(this, ie, me).call(this, d(b, J)["*"], e, d(A, z))), s.push(...j(this, ie, me).call(this, b, e, d(A, z)))) : T.push(b));
        for (let v = 0, _ = d(A, we).length; v < _; v++) {
          const I = d(A, we)[v], g = d(A, z) === Pe ? {} : { ...d(A, z) };
          if (I === "*") {
            const E = d(A, J)["*"];
            E && (s.push(...j(this, ie, me).call(this, E, e, d(A, z))), $(E, z, g), T.push(E));
            continue;
          }
          const [D, O, x] = I;
          if (!h && !(x instanceof RegExp))
            continue;
          const f = d(A, J)[D], y = a.slice(l).join("/");
          if (x instanceof RegExp) {
            const E = x.exec(y);
            if (E) {
              if (g[O] = E[0], s.push(...j(this, ie, me).call(this, f, e, d(A, z), g)), Object.keys(d(f, J)).length) {
                $(f, z, g);
                const p = ((c = E[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[p] || (o[p] = [])).push(f);
              }
              continue;
            }
          }
          (x === true || x.test(h)) && (g[O] = h, w ? (s.push(...j(this, ie, me).call(this, f, e, g, d(A, z))), d(f, J)["*"] && s.push(...j(this, ie, me).call(this, d(f, J)["*"], e, g, d(A, z)))) : ($(f, z, g), T.push(f)));
        }
      }
      i = T.concat(o.shift() ?? []);
    }
    return s.length > 1 && s.sort((l, u) => l.score - u.score), [s.map(({ handler: l, params: u }) => [l, u])];
  }
}, "ke"), fe = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakSet(), me = /* @__PURE__ */ __name(function(e, n, s, r) {
  const i = [];
  for (let a = 0, o = d(e, fe).length; a < o; a++) {
    const c = d(e, fe)[a], l = c[n] || c[K], u = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), s !== Pe || r && r !== Pe))
      for (let h = 0, w = l.possibleKeys.length; h < w; h++) {
        const T = l.possibleKeys[h], M = u[l.score];
        l.params[T] = r != null && r[T] && !M ? r[T] : s[T] ?? (r == null ? void 0 : r[T]), u[l.score] = true;
      }
  }
  return i;
}, "me"), ke);
var ye;
var Ct;
var Ln = (Ct = /* @__PURE__ */ __name(class {
  constructor() {
    C(this, "name", "TrieRouter");
    R(this, ye);
    $(this, ye, new Pn());
  }
  add(t, e, n) {
    const s = Mt(e);
    if (s) {
      for (let r = 0, i = s.length; r < i; r++)
        d(this, ye).insert(t, s[r], n);
      return;
    }
    d(this, ye).insert(t, e, n);
  }
  match(t, e) {
    return d(this, ye).search(t, e);
  }
}, "Ct"), ye = /* @__PURE__ */ new WeakMap(), Ct);
var Ut = /* @__PURE__ */ __name(class extends $n {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new In({ routers: [new kn(), new Ln()] });
  }
}, "Ut");
var Hn = /* @__PURE__ */ __name((t) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...t }, s = ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(n.origin), r = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(a, o) {
    var u;
    function c(h, w) {
      a.res.headers.set(h, w);
    }
    __name(c, "c");
    const l = await s(a.req.header("origin") || "", a);
    if (l && c("Access-Control-Allow-Origin", l), n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      n.origin !== "*" && c("Vary", "Origin"), n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = await r(a.req.header("origin") || "", a);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let w = n.allowHeaders;
      if (!(w != null && w.length)) {
        const T = a.req.header("Access-Control-Request-Headers");
        T && (w = T.split(/\s*,\s*/));
      }
      return w != null && w.length && (c("Access-Control-Allow-Headers", w.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await o(), n.origin !== "*" && a.header("Vary", "Origin", { append: true });
  };
}, "Hn");
var Dn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var gt = /* @__PURE__ */ __name((t, e = qn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, s = t.match(n);
  if (!s)
    return;
  let r = e[s[1]];
  return r && r.startsWith("text") && (r += "; charset=utf-8"), r;
}, "gt");
var Bn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var qn = Bn;
var Gn = /* @__PURE__ */ __name((...t) => {
  let e = t.filter((r) => r !== "").join("/");
  e = e.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = e.split("/"), s = [];
  for (const r of n)
    r === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : r !== "." && s.push(r);
  return s.join("/") || ".";
}, "Gn");
var zt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Kn = Object.keys(zt);
var Un = "index.html";
var zn = /* @__PURE__ */ __name((t) => {
  const e = t.root ?? "./", n = t.path, s = t.join ?? Gn;
  return async (r, i) => {
    var u, h, w, T;
    if (r.finalized)
      return i();
    let a;
    if (t.path)
      a = t.path;
    else
      try {
        if (a = decodeURIComponent(r.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))
          throw new Error();
      } catch {
        return await ((u = t.onNotFound) == null ? void 0 : u.call(t, r.req.path, r)), i();
      }
    let o = s(e, !n && t.rewriteRequestPath ? t.rewriteRequestPath(a) : a);
    t.isDir && await t.isDir(o) && (o = s(o, Un));
    const c = t.getContent;
    let l = await c(o, r);
    if (l instanceof Response)
      return r.newResponse(l.body, l);
    if (l) {
      const M = t.mimes && gt(o, t.mimes) || gt(o);
      if (r.header("Content-Type", M || "application/octet-stream"), t.precompressed && (!M || Dn.test(M))) {
        const k = new Set((h = r.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((A) => A.trim()));
        for (const A of Kn) {
          if (!k.has(A))
            continue;
          const b = await c(o + zt[A], r);
          if (b) {
            l = b, r.header("Content-Encoding", A), r.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((w = t.onFound) == null ? void 0 : w.call(t, o, r)), r.body(l);
    }
    await ((T = t.onNotFound) == null ? void 0 : T.call(t, o, r)), await i();
  };
}, "zn");
var Fn = /* @__PURE__ */ __name(async (t, e) => {
  let n;
  e && e.manifest ? typeof e.manifest == "string" ? n = JSON.parse(e.manifest) : n = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const r = n[t];
  if (!r)
    return null;
  const i = await s.get(r, { type: "stream" });
  return i || null;
}, "Fn");
var Jn = /* @__PURE__ */ __name((t) => async function(n, s) {
  return zn({ ...t, getContent: async (i) => Fn(i, { manifest: t.manifest, namespace: t.namespace ? t.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, s);
}, "Jn");
var Yn = /* @__PURE__ */ __name((t) => Jn(t), "Yn");
var te = new Ut();
var Ve = /* @__PURE__ */ new Map();
var Wn = 1e3 * 60 * 60 * 24 * 7;
var it = false;
function Ft() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(Ft, "Ft");
function F(t) {
  return t == null ? "" : String(t);
}
__name(F, "F");
function Ee(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
__name(Ee, "Ee");
function ct(t) {
  return (t || "").replace(/\s+/g, "");
}
__name(ct, "ct");
function ee(t) {
  return ct(t).length;
}
__name(ee, "ee");
var mt = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } };
function Vn(t) {
  return mt[t] || mt.standard;
}
__name(Vn, "Vn");
function Xe(t, e) {
  const n = Math.max(50, ee(t)), { min: s, max: r } = Vn(e);
  return { base: n, min: Math.floor(n * s), max: Math.ceil(n * r) };
}
__name(Xe, "Xe");
function Jt(t) {
  const e = F(t).trim().toLowerCase();
  return e ? e === "brief" || e === "simple" || e === "short" || e === "lite" ? "brief" : e === "detail" || e === "detailed" || e === "full" ? "detail" : "standard" : "standard";
}
__name(Jt, "Jt");
function Yt(t) {
  const e = F(t).trim().toLowerCase();
  return e ? e === "narrative" || e === "structured" || e === "mindmap" || e === "selftest" ? e : e === "mind-map" || e === "mind_map" ? "mindmap" : "narrative" : "narrative";
}
__name(Yt, "Yt");
function Xn(t) {
  const e = F(t).trim().toLowerCase();
  return e === "concept" ? "concept" : e === "exam" ? "exam" : "summary";
}
__name(Xn, "Xn");
function Wt(t) {
  const e = (t || "").replace(/\s+/g, " ").trim();
  if (!e)
    return [];
  const n = [];
  let s = "", r = false;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], o = e[i + 1];
    (a === '"' || a === '"' || a === '"') && (r = !r), s += a, !r && /[\.\?\!]/.test(a) && o === " " ? a === "." && s.endsWith("...") || (n.push(s.trim()), s = "", i++) : !r && /[다요죠]/.test(a) && o === " " && (n.push(s.trim()), s = "", i++);
  }
  return s.trim() && n.push(s.trim()), n.length ? n : [e];
}
__name(Wt, "Wt");
var Qn = /* @__PURE__ */ new Set(["\uADF8\uB9AC\uACE0", "\uADF8\uB7EC\uB098", "\uD558\uC9C0\uB9CC", "\uB610\uD55C", "\uBC0F", "\uB610", "\uB610\uB294", "\uC989", "\uB54C\uBB38\uC5D0", "\uB530\uB77C\uC11C", "\uADF8\uB798\uC11C", "\uD55C\uD3B8", "\uC774\uAC83", "\uADF8\uAC83", "\uC800\uAC83", "\uC5D0\uC11C", "\uC73C\uB85C", "\uC5D0\uAC8C", "\uBD80\uD130", "\uAE4C\uC9C0", "\uBCF4\uB2E4", "\uCC98\uB7FC", "\uAC19\uC774", "\uC758", "\uAC00", "\uC774", "\uC740", "\uB294", "\uC744", "\uB97C", "\uACFC", "\uC640", "\uB3C4", "\uB9CC", "\uD558\uB2E4", "\uB41C\uB2E4", "\uC788\uB2E4", "\uC5C6\uB2E4", "\uC774\uB2E4", "\uC544\uB2C8\uB2E4", "\uC218", "\uB4F1", "\uBC0F", "\uAC83", "\uB4E4", "\uC880", "\uB9E4\uC6B0", "\uC815\uB9D0"]);
var Zn = [/* @__PURE__ */ new Set(["\uC548\uC2DD\uCC98", "\uD790\uB9C1", "\uCE58\uC720", "\uC5EC\uC720", "\uC548\uC815", "\uC704\uB85C", "\uD734\uC2DD", "\uC27C", "\uD3C9\uC628", "\uD3C9\uD654"]), /* @__PURE__ */ new Set(["\uC0DD\uD0DC\uACC4", "\uC790\uC5F0", "\uD658\uACBD", "\uC11C\uC2DD\uC9C0", "\uC232", "\uACF5\uAC04", "\uC7A5\uC18C"]), /* @__PURE__ */ new Set(["\uD559\uC2B5", "\uACF5\uBD80", "\uAD50\uC721", "\uBC30\uC6C0", "\uD65C\uB3D9", "\uCCB4\uD5D8", "\uACBD\uD5D8"]), /* @__PURE__ */ new Set(["\uAE30\uC220", "\uBC29\uBC95", "\uC218\uB2E8", "\uBC29\uC2DD"]), /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uB290\uB08C", "\uAC10\uC131", "\uC815\uC11C", "\uC2EC\uB9AC"]), /* @__PURE__ */ new Set(["\uD0D0\uC0C9", "\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"]), /* @__PURE__ */ new Set(["\uC131\uC7A5", "\uBC1C\uB2EC", "\uBC1C\uC804", "\uD5A5\uC0C1"])];
function es(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    let s = false;
    for (const r of Zn)
      if (r.has(n)) {
        e.add(Array.from(r)[0]), s = true;
        break;
      }
    s || e.add(n);
  }
  return e;
}
__name(es, "es");
function Ze(t) {
  return (t || "").toLowerCase().replace(/[^0-9a-z가-힣\s]/g, " ").split(/\s+/).map((e) => e.trim()).map((e) => e.replace(/에게$/g, "").replace(/에서$/g, "").replace(/으로$/g, "").replace(/를$/g, "").replace(/을$/g, "").replace(/의$/g, "").replace(/하는$/g, "\uD558").replace(/하$/g, "\uD558")).filter((e) => e.length >= 2 && !Qn.has(e));
}
__name(Ze, "Ze");
function ts(t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of t)
    for (const r of Ze(s))
      e.set(r, (e.get(r) || 0) + 1);
  return t.map((s, r) => {
    const i = Ze(s);
    let a = 0;
    for (const l of i)
      a += e.get(l) || 0;
    const o = s.length, c = o < 15 ? 0.7 : o > 180 ? 0.85 : 1;
    return { idx: r, s, score: a * c };
  });
}
__name(ts, "ts");
function ns(t, e) {
  return ts(t).slice().sort((r, i) => i.score - r.score).slice(0, Ee(e, 1, Math.max(1, t.length))).sort((r, i) => r.idx - i.idx).map((r) => r.s);
}
__name(ns, "ns");
function Vt(t) {
  let e = (t || "").trim();
  e = e.replace(/모\s+든/g, "\uBAA8\uB4E0"), e = e.replace(/기\s+회/g, "\uAE30\uD68C"), e = e.replace(/이\s+루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/루어지는/g, "\uC774\uB8E8\uC5B4\uC9C0\uB294"), e = e.replace(/생태계물/g, "\uC790\uC5F0\uBB3C"), e = e.replace(/놀은\s+는/g, "\uB180\uC774\uB294"), e = e.replace(/형성은\s+는/g, "\uD615\uC131\uC740"), e = e.replace(/특정\s+공간\s+인/g, "\uD2B9\uC815 \uACF5\uAC04\uC778"), e = e.replace(/(\S+)\s+\1/g, "$1"), e = e.replace(/([가-힣])을\b/g, (i, a) => {
    const o = a.charCodeAt(0);
    return o >= 44032 && o <= 55203 ? (o - 44032) % 28 !== 0 ? a + "\uC744" : a + "\uB97C" : i;
  });
  const n = e.split(new RegExp("(?<=\uB2E4\\.)\\s+")), s = /* @__PURE__ */ new Set(), r = [];
  for (const i of n) {
    const a = i.match(/^([^은는]+[은는])\s+(.+)/);
    if (a) {
      const o = a[1];
      if (s.has(o))
        continue;
      s.add(o);
    }
    r.push(i);
  }
  return e = r.join(" "), e = e.replace(/입니다\.\s*이는\s+/g, "\uC774\uB2E4. "), e = e.replace(/입니다\.\s*또한\s+/g, "\uC774\uB2E4. \uB610\uD55C "), e = e.replace(/입니다\.\s*즉\s+/g, "\uC774\uB2E4. \uC989 "), e = e.replace(/\s*\.\s*/g, ". "), e = e.replace(/\s*,\s*/g, ", "), e = e.replace(/\s*;\s*/g, "; "), e = e.replace(/[ ]{2,}/g, " "), e = e.replace(/\n{3,}/g, `

`), e.trim();
}
__name(Vt, "Vt");
function Xt(t) {
  const e = Math.max(200, ee(t)), n = Xe(t, "brief"), s = Xe(t, "standard"), r = Xe(t, "detail"), i = Ee(n.min + Math.round((n.max - n.min) * 0.5), n.min, n.max), a = Ee(Math.max(s.min, i + 40), s.min, s.max), o = Ee(Math.max(r.min, a + 120), r.min, r.max);
  return { base: e, brief: i, standard: a, detail: o };
}
__name(Xt, "Xt");
function ss(t) {
  const e = Xt(t);
  return `
\uB2F9\uC2E0\uC740 \uAD50\uC721/\uD559\uC2B5 \uD14D\uC2A4\uD2B8\uB97C 3\uB2E8\uACC4(\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)\uB85C "\uC758\uBBF8 \uB2E8\uC704" \uC694\uC57D\uD558\uB294 \uC5D4\uC9C4\uC774\uB2E4.

[\uC785\uB825 \uC6D0\uBB38]
"""${t}"""

[\uC694\uC57D \uC6D0\uCE59 - \uBC18\uB4DC\uC2DC \uC900\uC218]
1) "\uAC04\uB2E8 < \uD45C\uC900 < \uC0C1\uC138" \uAE00\uC790\uC218 \uB2E8\uC870 \uC99D\uAC00(\uC5ED\uC804 \uAE08\uC9C0)
2) \uBCF5\uBD99/\uBC1C\uCDCC \uAE08\uC9C0: \uC6D0\uBB38 \uBB38\uC7A5\uC744 \uAE38\uAC8C \uADF8\uB300\uB85C \uAC00\uC838\uC624\uC9C0 \uB9D0\uACE0 \uC7AC\uAD6C\uC131
3) \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4/\uC778\uC6A9/\uC0AC\uB840 \uCD94\uAC00 \uAE08\uC9C0(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0)
4) \uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138\uB294 \uB0B4\uC6A9\uACFC \uD45C\uD604\uC774 "\uAC70\uC758 \uB3D9\uC77C"\uD558\uBA74 \uC2E4\uD328(\uC911\uBCF5 \uAE08\uC9C0)

[\uAE38\uC774 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678 \uAE00\uC790\uC218)]
- \uAC04\uB2E8: ${e.brief}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 10~15%)
- \uD45C\uC900: ${e.standard}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 25~30%)
- \uC0C1\uC138: ${e.detail}\uC790 \uB0B4\uC678 (\uC6D0\uBB38 45~55%, \uC544\uB798 \uC18C\uC81C\uBAA9 3\uAC1C)

[\uC0C1\uC138 \uC694\uC57D \uC18C\uC81C\uBAA9(\uBC18\uB4DC\uC2DC \uADF8\uB300\uB85C)]
- \uAC1C\uB150
- \uC601\uD5A5
- \uAD50\uC721\uC801 \uAC00\uCE58

[\uCD9C\uB825 \uD615\uC2DD - JSON\uB9CC]
{
  "meta": {
    "base_chars_no_space": ${e.base},
    "target": { "brief": ${e.brief}, "standard": ${e.standard}, "detail": ${e.detail} }
  },
  "brief": "\u2026",
  "standard": "\u2026",
  "detail": {
    "\uAC1C\uB150": "\u2026",
    "\uC601\uD5A5": "\u2026",
    "\uAD50\uC721\uC801 \uAC00\uCE58": "\u2026"
  }
}

\u203B JSON \uC678 \uC5B4\uB5A4 \uBB38\uC7A5\uB3C4 \uCD9C\uB825\uD558\uC9C0 \uB9C8\uB77C.
`.trim();
}
__name(ss, "ss");
var rs = { definition: ["\uC758\uBBF8", "\uC815\uC758", "\uC0AC\uC804", "\uC0DD\uD0DC\uD559\uC801", "\uAC1C\uB150", "\uC774\uB780", "\uBB34\uC5C7", "\uC7A5\uC18C"], meaning: ["\uC758\uBBF8", "\uAC00\uCE58", "\uCE58\uC720", "\uC548\uC815", "\uAD50\uC721\uC801", "\uAE30\uB2A5", "\uC911\uC694", "\uD6A8\uACFC"], activity: ["\uCCB4\uD5D8", "\uD65C\uB3D9", "\uAD50\uC721", "\uB180\uC774", "\uACBD\uD5D8", "\uD559\uC2B5", "\uD0D0\uC0C9", "\uCC38\uC5EC"] };
function xt(t) {
  const e = { definition: 0, meaning: 0, activity: 0 };
  for (const [s, r] of Object.entries(rs))
    for (const i of r)
      t.includes(i) && e[s]++;
  const n = Math.max(e.definition, e.meaning, e.activity);
  return n === 0 ? null : e.definition === n ? "definition" : e.meaning === n ? "meaning" : "activity";
}
__name(xt, "xt");
function is(t, e, n) {
  const s = ee(e), r = [], i = /* @__PURE__ */ new Set(), a = /\(([^)]+,?\s*\d{4})\)/g;
  let o;
  for (; (o = a.exec(e)) !== null; )
    i.add(o[1]);
  for (const b of t) {
    const v = [];
    let _;
    const I = /\(([^)]+,?\s*\d{4})\)/g;
    for (; (_ = I.exec(b)) !== null; ) {
      const O = _[1];
      i.has(O) && v.push(O);
    }
    let g = b.replace(/\(([^)]+,?\s*\d{4})\)/g, "").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g, "").replace(/[\.。\?\!]+$/, "").replace(/\(p\.\s*\d+\)/gi, "").replace(/\[[^\]]*\]/g, "").replace(/\s*-\s*\d+\s*-\s*/g, " ").replace(/것이\s+다/g, "\uAC83\uC774\uB2E4").replace(/바이\s+다/g, "\uBC14\uC774\uB2E4").replace(/직\s+접/g, "\uC9C1\uC811").replace(/만나\s+게/g, "\uB9CC\uB098\uAC8C").replace(/자유롭\s+게/g, "\uC790\uC720\uB86D\uAC8C").replace(/\s{2,}/g, " ").trim();
    if (g.length < 10)
      continue;
    const D = Ze(g).slice(0, 8);
    r.push({ original: b, clean: g, keywords: D, citations: v }), g.includes("(") && console.log("[DEBUG] \uC778\uC6A9 \uBBF8\uC81C\uAC70:", g.slice(0, 100));
  }
  if (r.length === 0)
    return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
  const c = /* @__PURE__ */ new Map();
  for (const b of r)
    for (const v of b.keywords)
      c.set(v, (c.get(v) || 0) + 1);
  const l = [];
  for (const b of r) {
    new Set(b.keywords);
    let v = false;
    for (const _ of l)
      if (b.keywords.filter((g) => _.keywords.has(g)).length >= 2) {
        _.sentences.push({ clean: b.clean, citations: b.citations }), b.keywords.forEach((g) => _.keywords.add(g)), v = true;
        break;
      }
    v || l.push({ keywords: new Set(b.keywords), sentences: [{ clean: b.clean, citations: b.citations }] });
  }
  const u = l.map((b) => {
    const v = b.sentences[0].clean, _ = r.findIndex((I) => I.clean === v);
    return { ...b, originalIdx: _ };
  });
  let h = "";
  if (n === "brief") {
    const b = { definition: [], meaning: [], activity: [] };
    for (const m of u)
      for (const S of m.sentences) {
        const N = xt(S.clean);
        N && b[N].push(S);
      }
    const v = b.definition[0], _ = b.meaning[0], I = b.activity[0], g = [], D = [];
    if (v && (g.push(v.clean), D.push(...v.citations.filter(Boolean))), _ && (g.push(_.clean), D.push(..._.citations.filter(Boolean))), I && (g.push(I.clean), D.push(...I.citations.filter(Boolean))), g.length === 0) {
      const S = u.sort((N, P) => P.sentences.length - N.sentences.length)[0].sentences[0];
      g.push(S.clean), D.push(...S.citations.filter(Boolean));
    }
    const O = Array.from(new Set(D)), x = O.length > 0 ? `(${O.join("; ")})` : "", f = g.map((m) => {
      let S = m;
      for (; S.includes("("); )
        S = S.replace(/\([^)]*\)/g, "");
      return S.trim();
    });
    f.length === 1 ? h = `${f[0]}${x}.` : f.length === 2 ? h = `${f[0]}. ${f[1]}${x}.` : h = `${f[0]}\uD558\uBA70 ${f[1]}. ${f[2]}${x}.`;
    const E = ee(h) / s * 100;
    if (E > 15) {
      let m = h.slice(0, 60);
      m = m.replace(/\([^)]*\)/g, "").trim(), h = m + (x ? ` ${x}.` : ".");
    }
    const p = [];
    return v && p.push("definition"), _ && p.push("meaning"), I && p.push("activity"), typeof console < "u" && console.log("[Brief Summary Meta]", { rolesFilled: p, sentenceCount: g.length, compressionRatio: E.toFixed(1) + "%", passed: E <= 15 }), h = at(e, h, "brief", t), h;
  }
  if (n === "standard") {
    const b = u.sort((m, S) => S.sentences.length - m.sentences.length).slice(0, 3).sort((m, S) => m.originalIdx - S.originalIdx);
    if (b.length === 1) {
      const m = b[0].sentences[0], S = b[0].sentences.flatMap((P) => P.citations).filter(Boolean), N = S.length > 0 ? `(${S.join("; ")})` : "";
      return `${m.clean}${N}.`;
    }
    const v = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), I = { \uC624\uAC10: ["\uAC10\uAC01", "\uAC10\uAC01\uC801 \uACBD\uD5D8", "\uC9C1\uC811 \uCCB4\uD5D8"], \uD0D0\uC0C9: ["\uD0D0\uAD6C", "\uAD00\uCC30", "\uBC1C\uACAC"], \uCCB4\uD5D8: ["\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"], \uC790\uC5F0: ["\uC232", "\uD658\uACBD", "\uC0DD\uD0DC\uACC4"] };
    for (const m of b)
      for (const S of m.sentences) {
        const N = S.clean.match(/^(.+?)[은는이가]\s*(.+)$/);
        if (N) {
          let [, P, q] = N;
          P = P.replace(/[에게서로부터]$/g, "").trim(), v.has(P) || v.set(P, []);
          let G = q.trim();
          G = G.replace(/[\.。\?\!]+$/g, "").trim();
          for (const [B, pe] of Object.entries(I))
            if (G.includes(B)) {
              const oe = _.get(B) || 0;
              if (_.set(B, oe + 1), oe >= 1 && pe.length > 0) {
                const Ie = Math.min(oe - 1, pe.length - 1);
                G = G.replace(B, pe[Ie]);
              }
            }
          const L = new Set(Ze(G)), H = es(L), W = /* @__PURE__ */ new Set(["\uC624\uAC10", "\uAC10\uAC01", "\uAC10\uAC01\uC801", "\uCCB4\uD5D8", "\uACBD\uD5D8", "\uD65C\uB3D9", "\uD559\uC2B5"]);
          for (const B of W)
            H.delete(B);
          v.get(P).push({ original: G, keywords: H, citations: S.citations });
        }
      }
    const g = [];
    for (const [m, S] of v.entries()) {
      const N = S.flatMap((L) => L.citations).filter(Boolean), P = m.charAt(m.length - 1), G = /[가-힣]/.test(P) && (P.charCodeAt(0) - 44032) % 28 !== 0 ? "\uC740" : "\uB294";
      if (S.length === 1) {
        const L = S[0].original, H = (L.match(/,/g) || []).length;
        if (L.length > 80 && H >= 2) {
          const W = L.split(",").map((B) => B.trim()).filter((B) => B.length > 0);
          if (W.length >= 2) {
            g.push({ text: `${m}${G} ${W[0]}`, citations: [] });
            for (let B = 1; B < W.length - 1; B++)
              g.push({ text: `${W[B]}`, citations: [] });
            g.push({ text: `${W[W.length - 1]}`, citations: S[0].citations });
          } else
            g.push({ text: `${m}${G} ${L}`, citations: N });
        } else
          g.push({ text: `${m}${G} ${L}`, citations: N });
      } else {
        const L = [];
        for (const H of S) {
          let W = false;
          for (const B of L) {
            const pe = Array.from(H.keywords).filter((Ie) => B.keywords.has(Ie)).length, oe = Math.max(H.keywords.size, B.keywords.size);
            if (oe > 0 && pe / oe >= 0.8) {
              H.original.length > B.original.length && (B.original = H.original, B.keywords = H.keywords), B.citations.push(...H.citations), W = true;
              break;
            }
          }
          W || L.push({ original: H.original, keywords: H.keywords, citations: [...H.citations] });
        }
        if (L.length === 1)
          g.push({ text: `${m}${G} ${L[0].original}`, citations: L.flatMap((H) => H.citations) });
        else if (L.length === 2)
          g.push({ text: `${m}${G} ${L[0].original}`, citations: L[0].citations }), g.push({ text: `${m}${G} ${L[1].original}`, citations: L[1].citations });
        else
          for (let H = 0; H < L.length; H++)
            g.push({ text: `${m}${G} ${L[H].original}`, citations: L[H].citations });
      }
    }
    if (g.length === 0)
      return "\uC694\uC57D\uD560 \uB0B4\uC6A9\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.";
    if (g.length === 1) {
      const m = g[0].citations.filter(Boolean), S = m.length > 0 ? `(${m.join("; ")})` : "";
      return `${g[0].text}${S}.`;
    }
    if (g.length === 2) {
      const m = g[0].citations.filter(Boolean), S = g[1].citations.filter(Boolean), N = m.length > 0 ? `(${m.join("; ")})` : "", P = S.length > 0 ? `(${S.join("; ")})` : "";
      return `${g[0].text}${N}. ${g[1].text}${P}.`;
    }
    const D = [], O = g[0], x = O.citations.filter(Boolean), f = x.length > 0 ? `(${x.join("; ")})` : "";
    if (D.push(`${O.text}${f}.`), g.length >= 2) {
      const m = g[1], S = m.citations.filter(Boolean), N = S.length > 0 ? `(${S.join("; ")})` : "";
      D.push(`${m.text}${N}.`);
    }
    if (g.length >= 3) {
      const S = g.slice(2).map((N) => {
        const P = N.citations.filter(Boolean), q = P.length > 0 ? `(${P.join("; ")})` : "";
        return `${N.text}${q}.`;
      });
      D.push(S.join(" "));
    }
    h = D.join(`

`);
    const E = ee(h) / s * 100;
    E > 30 && (D.length > 3 ? h = D.slice(0, 3).join(`

`) : h = D.join(`

`));
    const p = [];
    for (const m of b)
      for (const S of m.sentences) {
        const N = xt(S.clean);
        N && !p.includes(N) && p.push(N);
      }
    return typeof console < "u" && console.log("[Standard Summary Meta]", { rolesFilled: p, sentenceCount: g.length, paragraphCount: D.length, compressionRatio: E.toFixed(1) + "%", passed: E >= 25 && E <= 30 }), h = at(e, h, "standard", t), h;
  }
  const w = u.sort((b, v) => v.sentences.length - b.sentences.length).slice(0, 5).sort((b, v) => b.originalIdx - v.originalIdx);
  let T = w.map((b, v) => {
    const _ = b.sentences[0], I = b.sentences.flatMap((D) => D.citations).filter(Boolean), g = I.length > 0 ? `(${I.join("; ")})` : "";
    return v === 0 ? `${_.clean}${g}.` : v === w.length - 1 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${_.clean}${g}.` : `\uB610\uD55C ${_.clean}${g}.`;
  }).join(" ");
  return ee(T) / s * 100 > (n === "brief" ? 15 : n === "standard" ? 30 : 55) && n === "detail" ? w.slice(0, 3).map((v, _) => {
    const I = v.sentences[0], g = v.sentences.flatMap((O) => O.citations).filter(Boolean), D = g.length > 0 ? `(${g.join("; ")})` : "";
    return _ === 0 ? `${I.clean}${D}.` : _ === 2 ? `\uB9C8\uC9C0\uB9C9\uC73C\uB85C ${I.clean}${D}.` : `\uB610\uD55C ${I.clean}${D}.`;
  }).join(" ") : (T = at(e, T, "detail", t), T);
}
__name(is, "is");
function as(t, e, n) {
  const s = Wt(t), r = e === "brief" ? Ee(Math.round(s.length * 0.18), 2, 4) : e === "standard" ? Ee(Math.round(s.length * 0.28), 4, 8) : Ee(Math.round(s.length * 0.4), 7, 14), i = ns(s, r);
  if (n === "narrative") {
    let o = is(i, t, e);
    return o = Vt(o), { kind: "summary", mode: e, viewType: n, narrative: o };
  }
  if (n === "structured")
    return { kind: "summary", mode: e, viewType: n, structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: i.map((o, c) => `- (${c + 1}) ${o}`) } };
  if (n === "mindmap") {
    const o = (i[0] || s[0] || "\uD575\uC2EC").slice(0, 40), c = [{ id: "c", label: o, level: 0 }], l = [];
    return i.slice(1).forEach((u, h) => {
      const w = `n${h + 1}`;
      c.push({ id: w, label: u.slice(0, 60), level: 1 }), l.push({ from: "c", to: w });
    }), { kind: "summary", mode: e, viewType: n, mindmap: { center: o, nodes: c, edges: l } };
  }
  const a = i.map((o, c) => ({ id: `q${c + 1}`, type: "short", question: `(${c + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${o.slice(0, 70)}"`, answerHint: o }));
  return { kind: "summary", mode: e, viewType: n, selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: a } };
}
__name(as, "as");
function Qt(t) {
  if (!t)
    return "empty";
  let e = 2166136261, n = 0;
  for (let i = 0; i < t.length; i++) {
    const a = t.charCodeAt(i);
    e ^= a, e += (e << 1) + (e << 4) + (e << 7) + (e << 8) + (e << 24), n = (n << 5) - n + a, n |= 0;
  }
  const s = (e >>> 0).toString(16), r = (Math.abs(n) >>> 0).toString(16);
  return `${t.length.toString(16)}_${s}_${r}`;
}
__name(Qt, "Qt");
function os(t, e, n, s) {
  const r = Qt(n);
  return `${t}::${s || "anon"}::${e}::base::${r}`;
}
__name(os, "os");
function cs(t, e, n, s, r) {
  const i = Qt(s);
  return `${t}::${r || "anon"}::${e}::${n}::${i}`;
}
__name(cs, "cs");
async function ls(t) {
  if (!it) {
    if (!t) {
      it = true;
      return;
    }
    await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(), await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(), it = true;
  }
}
__name(ls, "ls");
async function bt(t, e) {
  const n = Date.now(), s = Ve.get(e);
  if (s && n - s.createdAt < Wn)
    return { hit: true, data: s.data, store: "mem" };
  if (s && Ve.delete(e), !t)
    return { hit: false };
  const r = await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();
  if (!(r != null && r.response_json))
    return { hit: false };
  try {
    const i = JSON.parse(r.response_json);
    return Ve.set(e, { data: i, createdAt: n }), { hit: true, data: i, store: "d1" };
  } catch {
    return { hit: false };
  }
}
__name(bt, "bt");
async function Le(t, e, n, s) {
  const r = Date.now();
  Ve.set(e, { data: s, createdAt: r }), t && await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e, n, JSON.stringify(s), Ft()).run();
}
__name(Le, "Le");
function vt(t) {
  const e = t.split(/\n\n+/).filter((s) => s.trim());
  return { kind: "summary", viewType: "structured", structured: { title: "\uAD6C\uC870\uD654 \uC694\uC57D", bullets: e.length > 1 ? e.map((s, r) => `- (${r + 1}) ${s}`) : t.split(/[\.。]\s+/).filter((s) => s.trim()).map((s, r) => `- (${r + 1}) ${s}.`) } };
}
__name(vt, "vt");
function wt(t) {
  const e = t.split(/[\.。]\s+/).filter((i) => i.trim()).map((i) => i.trim()), n = (e[0] || "\uD575\uC2EC").slice(0, 40), s = [{ id: "c", label: n, level: 0 }], r = [];
  return e.slice(1).forEach((i, a) => {
    const o = `n${a + 1}`;
    s.push({ id: o, label: i.slice(0, 60), level: 1 }), r.push({ from: "c", to: o });
  }), { kind: "summary", viewType: "mindmap", mindmap: { center: n, nodes: s, edges: r } };
}
__name(wt, "wt");
function yt(t) {
  return { kind: "summary", viewType: "selftest", selftest: { title: "\uC140\uD504\uD14C\uC2A4\uD2B8", questions: t.split(/[\.。]\s+/).filter((s) => s.trim()).map((s) => s.trim()).map((s, r) => ({ id: `q${r + 1}`, type: "short", question: `(${r + 1}) \uB2E4\uC74C \uB0B4\uC6A9\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uC124\uBA85\uD574\uBCF4\uC138\uC694: "${s.slice(0, 70)}"`, answerHint: s })) } };
}
__name(yt, "yt");
async function ds(t, e) {
  var c, l, u, h, w;
  const n = F(t.GEMINI_API_KEY).trim();
  if (!n)
    throw new Error("GEMINI_API_KEY is missing");
  const s = F(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", r = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`, i = { contents: [{ role: "user", parts: [{ text: e }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let a = 0, o = 500;
  for (; a < 3; ) {
    a++;
    const T = await fetch(r, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) });
    if (T.ok) {
      const k = await T.json();
      return { ok: true, text: ((w = (h = (u = (l = (c = k == null ? void 0 : k.candidates) == null ? void 0 : c[0]) == null ? void 0 : l.content) == null ? void 0 : u.parts) == null ? void 0 : h[0]) == null ? void 0 : w.text) ?? "", raw: k };
    }
    if (T.status === 429 || T.status === 503) {
      await new Promise((k) => setTimeout(k, o)), o *= 2;
      continue;
    }
    const M = await T.text().catch(() => "");
    throw new Error(`Gemini error ${T.status}: ${M.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(ds, "ds");
async function us(t, e, n) {
  var l, u, h, w, T;
  const s = F(t.GEMINI_API_KEY).trim();
  if (!s)
    throw new Error("GEMINI_API_KEY is missing");
  const r = F(t.GEMINI_MODEL).trim() || "gemini-1.5-flash", i = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(s)}`, a = { system_instruction: { parts: [{ text: e }] }, contents: [{ role: "user", parts: [{ text: n }] }], generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 2048, topK: 40 }, safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }] };
  let o = 0, c = 500;
  for (; o < 3; ) {
    o++;
    const M = await fetch(i, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(a) });
    if (M.ok) {
      const A = await M.json();
      return ((T = (w = (h = (u = (l = A == null ? void 0 : A.candidates) == null ? void 0 : l[0]) == null ? void 0 : u.content) == null ? void 0 : h.parts) == null ? void 0 : w[0]) == null ? void 0 : T.text) ?? "";
    }
    if (M.status === 429 || M.status === 503) {
      await new Promise((A) => setTimeout(A, c)), c *= 2;
      continue;
    }
    const k = await M.text().catch(() => "");
    throw new Error(`Gemini error ${M.status}: ${k.slice(0, 200)}`);
  }
  throw new Error("Gemini retry exceeded");
}
__name(us, "us");
async function Zt(t, e) {
  const n = await ds(t, e);
  return typeof n == "string" ? n : ((n == null ? void 0 : n.text) ?? "").toString();
}
__name(Zt, "Zt");
async function hs(t, e) {
  const n = ss(e);
  for (let s = 1; s <= 2; s++)
    try {
      let i = (await Zt(t, n) || "").trim();
      i.startsWith("```") && (i = i.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
      const a = JSON.parse(i);
      if (!(a != null && a.brief) || !(a != null && a.standard) || !(a != null && a.detail))
        throw new Error("Missing required fields");
      if (!a.detail.\uAC1C\uB150 || !a.detail.\uC601\uD5A5 || !a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"])
        throw new Error("Missing detail fields");
      const o = ee(a.brief), c = ee(a.standard), l = ee(a.detail.\uAC1C\uB150 + a.detail.\uC601\uD5A5 + a.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]);
      return (o >= c || c >= l) && console.warn("[SummaryJSON] monotonic violated", { bLen: o, sLen: c, dLen: l, attempt: s }), a;
    } catch (r) {
      if (console.error("[SummaryJSON] attempt failed", s, r == null ? void 0 : r.message), s === 2) {
        const i = Xt(e);
        return { meta: { base_chars_no_space: i.base, target: { brief: i.brief, standard: i.standard, detail: i.detail } }, brief: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", standard: "[JSON \uC2E4\uD328] \uC694\uC57D \uC0DD\uC131 \uC2E4\uD328", detail: { \uAC1C\uB150: "[\uC2E4\uD328]", \uC601\uD5A5: "[\uC2E4\uD328]", "\uAD50\uC721\uC801 \uAC00\uCE58": "[\uC2E4\uD328]" } };
      }
    }
  throw new Error("summarizeWithJSON failed");
}
__name(hs, "hs");
function at(t, e, n, s) {
  const { min: r, max: i } = Xe(t, n);
  let a = (e || "").trim();
  const o = /* @__PURE__ */ __name(() => ee(a), "o"), c = /* @__PURE__ */ __name(() => {
    a = Vt(a), a = a.replace(/\s{2,}/g, " ").trim();
  }, "c");
  if (c(), o() > i) {
    const l = Wt(a);
    for (; l.length > 1 && ee(l.join(" ")) > i; )
      l.pop();
    a = l.join(" "), c();
  }
  if (o() < r) {
    const l = (s || []).map((u) => u.trim()).filter(Boolean);
    for (const u of l) {
      if (o() >= r)
        break;
      const h = ct(u).slice(0, 24);
      if (!(h && ct(a).includes(h)) && (a = (a ? a + " " : "") + u.replace(/[\.。\?\!]+$/g, "") + ".", c(), o() > i))
        break;
    }
  }
  return a;
}
__name(at, "at");
var fs = (() => {
  const e = { brief: { min: 0.1, max: 0.15 }, standard: { min: 0.25, max: 0.3 }, detail: { min: 0.45, max: 0.55 } }, n = { brief: 6, standard: 10, detail: 14 }, s = ["narrative", "structured", "mindmap"], r = ["preview", "exam"];
  function i(O) {
    return (O || "").replace(/\s+/g, "");
  }
  __name(i, "i");
  function a(O, x) {
    const y = Math.max(200, i(O || "").length), E = e[x] || e.standard, p = Math.floor(y * E.min), m = Math.ceil(y * E.max);
    return { base: y, min: Math.max(80, p), max: Math.max(120, m) };
  }
  __name(a, "a");
  function o(O) {
    const x = (O || "").trim();
    return x ? x.replace(/\r/g, "").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map((y) => y.trim()).filter(Boolean) : [];
  }
  __name(o, "o");
  function c(O) {
    return o(O).map((f, y) => ({ sid: `S${y + 1}`, text: f }));
  }
  __name(c, "c");
  function l(O, x, f) {
    const y = O.find((E) => E.sid === x);
    return !y || !f || typeof f != "string" ? false : y.text.includes(f.trim());
  }
  __name(l, "l");
  function u() {
    return ["\uB2F9\uC2E0\uC740 \uAD50\uC721\uACF5\uD559 \uAE30\uBC18 \uC694\uC57D\xB7\uC140\uD504\uD14C\uC2A4\uD2B8 \uC0DD\uC131 \uC5D4\uC9C4\uC774\uB2E4.", "\uCD94\uCD9C\uD615 \uBCF5\uBD99 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC \uC758\uBBF8 \uB2E8\uC704\uB85C \uC7AC\uAD6C\uC131\uD558\uB77C.", "\uAC00\uC7A5 \uC911\uC694\uD55C 1\uC21C\uC704\uB294 \uBB38\uC790\uC218(\uACF5\uBC31 \uC81C\uC678) \uC81C\uD55C \uC900\uC218\uB2E4.", "\uD5C8\uC704 \uC815\uBCF4(\uC6D0\uBB38/\uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9) \uC0DD\uC131 \uAE08\uC9C0.", "JSON \uCD9C\uB825\uC774 \uC694\uAD6C\uB418\uBA74 JSON\uB9CC \uCD9C\uB825\uD558\uB77C."].join(`
`);
  }
  __name(u, "u");
  function h({ originalText: O, mode: x, format: f }) {
    const y = a(O, x), E = f === "narrative" ? "\uC11C\uC220\uD615: \uC5F0\uACB0\uC5B4\uB97C \uC0AC\uC6A9\uD574 \uD750\uB984/\uC778\uACFC\uAC00 \uBCF4\uC774\uB3C4\uB85D 1~3\uBB38\uB2E8\uC73C\uB85C \uAD6C\uC131" : f === "structured" ? "\uAD6C\uC870\uD654: \uC0C1\uC704-\uD558\uC704 \uC704\uACC4\uAC00 \uB4DC\uB7EC\uB098\uB294 \uC870\uBAA9(\uAC00/\uB098/\uB2E4 \uB610\uB294 \u2460\u2461\u2462) \uD615\uD0DC" : "\uB9C8\uC778\uB4DC\uB9F5: \uD14D\uC2A4\uD2B8\uB85C \uD45C\uD604\uB41C \uB178\uB4DC-\uAD00\uACC4 \uBAA9\uB85D(\uC911\uC2EC\uB178\uB4DC/\uD558\uC704\uB178\uB4DC/\uC5F0\uACB0\uB77C\uBCA8) \uD615\uD0DC";
    return ["[TASK] \uC544\uB798 \uC6D0\uBB38\uC744 \uC9C0\uC815\uB41C \uD615\uC2DD\uC73C\uB85C \uC694\uC57D\uD558\uB77C.", `- \uBAA8\uB4DC: ${x} (\uAC04\uB2E8/\uD45C\uC900/\uC0C1\uC138)`, `- \uD615\uC2DD: ${f} (${E})`, `- \uBB38\uC790\uC218 \uBAA9\uD45C(\uACF5\uBC31 \uC81C\uC678): \uCD5C\uC18C ${y.min}\uC790 ~ \uCD5C\uB300 ${y.max}\uC790`, "- \uC8FC\uC758: \uC22B\uC790 \uB9DE\uCD94\uAE30 \uC704\uD574 \uC911\uAC04\uC744 \uC790\uB974\uB294 \uD589\uC704 \uAE08\uC9C0. \uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uBB38\uC7A5\uC73C\uB85C \uC7AC\uC791\uC131.", "- \uC8FC\uC758: \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC8FC\uC7A5/\uC0AC\uB840/\uC778\uACFC \uCD94\uAC00 \uAE08\uC9C0.", "", "[ORIGINAL]", O].join(`
`);
  }
  __name(h, "h");
  function w({ summaryText: O, format: x }) {
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uC5D0\uC11C \uD559\uC2B5 \uC575\uCEE4(\uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4)\uB97C \uCD94\uCD9C\uD558\uB77C.", "- \uCD9C\uB825\uC740 JSON\uB9CC. \uD55C\uAD6D\uC5B4\uB85C.", "- \uC575\uCEE4 \uC218: 6~14\uAC1C \uBC94\uC704(\uC694\uC57D \uAE38\uC774\uC5D0 \uB9DE\uCDB0 \uC801\uC808\uD788).", "- \uAC01 \uC575\uCEE4\uB294 \uC694\uC57D\uBB38\uC5D0 \uC2E4\uC81C\uB85C \uB4F1\uC7A5\uD558\uB294 \uD45C\uD604\uC744 \uADFC\uAC70(quote)\uB85C \uAC00\uC838\uC640\uC57C \uD55C\uB2E4.", "- quote\uB294 \uC694\uC57D\uBB38 \uC77C\uBD80\uB97C \uADF8\uB300\uB85C \uBCF5\uC0AC(\uC9E7\uAC8C 8~25\uC790).", "", "[OUTPUT JSON SCHEMA]", `{
  "anchors":[
    {
      "id":"A1",
      "label":"\uD575\uC2EC \uAC1C\uB150/\uAD00\uACC4 \uC774\uB984",
      "type":"concept|relation|claim",
      "sid":"S1",
      "quote":"\uC694\uC57D\uBB38\uC5D0\uC11C \uADF8\uB300\uB85C \uC778\uC6A9\uD55C \uC9E7\uC740 \uAD6C\uC808",
      "note":"\uD559\uC2B5 \uD3EC\uC778\uD2B8(1\uBB38\uC7A5)"
    }
  ]
}`, "", "[SUMMARY]", O].join(`
`);
  }
  __name(w, "w");
  function T({ mode: O, purpose: x, format: f, summaryText: y, sentTable: E, anchors: p }) {
    const m = n[O] || 10, S = x === "preview" ? "\uC608\uC2B5\uC6A9 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38 \uC548\uC5D0\uC11C \uBC14\uB85C \uD655\uC778 \uAC00\uB2A5\uD55C \uC7AC\uC778 \uC911\uC2EC(\uC2A4\uD0A4\uB9C8 \uD615\uC131). \uACFC\uB3C4\uD55C \uCD94\uB860 \uAE08\uC9C0." : "\uC2DC\uD5D8\uB300\uBE44 \uC140\uD504\uD14C\uC2A4\uD2B8: \uC694\uC57D\uBB38\uC5D0 \uC788\uB294 \uADFC\uAC70\uB97C \uBC14\uD0D5\uC73C\uB85C \uC778\uACFC/\uAD00\uACC4/\uBD84\uB958\uB97C \uC778\uCD9C\uD558\uB294 \uD68C\uC0C1 \uC911\uC2EC. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uC815\uBCF4 \uAE08\uC9C0.", N = f === "narrative" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uBB38\uC7A5 \uBE48\uCE78, \uBB38\uC7A5 \uC21C\uC11C \uBC30\uC5F4, \uC778\uACFC\uAD00\uACC4 \uB2E8\uB2F5/\uC11C\uC220(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : f === "structured" ? "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uD56D\uBAA9-\uC815\uC758 \uB9E4\uCE6D, \uBD84\uB958 \uCC44\uC6B0\uAE30, \uC0C1\uD558\uC704 \uCCB4\uACC4, \uC0AC\uB840-\uBC94\uC8FC \uB9E4\uCE6D(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)" : "\uBB38\uD56D \uC2A4\uD0C0\uC77C: \uB178\uB4DC \uB77C\uBCA8 \uB9DE\uCD94\uAE30, \uC5F0\uACB0 \uB77C\uBCA8\uB9C1, \uB204\uB77D \uB178\uB4DC/\uC5F0\uACB0 \uBCF5\uC6D0, \uAD00\uACC4 \uC774\uC720 \uB2E8\uB2F5(\uC694\uC57D \uADFC\uAC70 \uD544\uC218)";
    return ["[TASK] \uC544\uB798 \uC694\uC57D\uBB38\uACFC \uC575\uCEE4\uB9CC\uC744 \uADFC\uAC70\uB85C \uC140\uD504\uD14C\uC2A4\uD2B8 \uBB38\uD56D\uC744 \uC0DD\uC131\uD558\uB77C.", `- \uBAA8\uB4DC: ${O} (\uBB38\uD56D\uC218 ${m})`, `- \uBAA9\uC801: ${x} (${S})`, `- \uC694\uC57D \uD615\uC2DD: ${f} (${N})`, "- \uADDC\uCE591: \uC694\uC57D\uBB38\uC5D0 \uC5C6\uB294 \uC815\uBCF4\uB85C \uBB38\uC81C \uB9CC\uB4E4\uC9C0 \uB9D0 \uAC83(\uD560\uB8E8\uC2DC\uB124\uC774\uC158 \uAE08\uC9C0).", "- \uADDC\uCE592: \uAC01 \uBB38\uD56D\uC740 \uBC18\uB4DC\uC2DC evidence\uB97C \uD3EC\uD568: sid + quote(\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80 8~25\uC790).", "- \uADDC\uCE593: quote\uB294 \uBC18\uB4DC\uC2DC \uD574\uB2F9 sid \uBB38\uC7A5\uC5D0 \uC2E4\uC81C\uB85C \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uADDC\uCE594: \uC815\uB2F5/\uD574\uC124\uC740 \uAC04\uACB0\uD558\uAC8C. \uD574\uC124\uC740 evidence\uC640 \uC5F0\uACB0\uB418\uAC8C.", "", "[OUTPUT JSON ONLY]", `{
  "items":[
    {
      "id":"Q1",
      "type":"blank|match|order|label|short|mcq",
      "question":"\uBB38\uD56D",
      "choices":["\uBCF4\uAE301","\uBCF4\uAE302","\uBCF4\uAE303","\uBCF4\uAE304"], 
      "answer":"\uC815\uB2F5(choices \uAE30\uBC18\uC774\uBA74 \uBCF4\uAE30 \uD14D\uC2A4\uD2B8 \uADF8\uB300\uB85C)",
      "explanation":"\uD574\uC124(1~2\uBB38\uC7A5)",
      "evidence": { "sid":"S1", "quote":"\uC694\uC57D \uBB38\uC7A5 \uC77C\uBD80" },
      "anchorIds":["A1","A3"]
    }
  ]
}`, "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(E, null, 2), "", "[ANCHORS]", JSON.stringify(p, null, 2), "", "[SUMMARY]", y].join(`
`);
  }
  __name(T, "T");
  function M(O, x) {
    const f = x && x.anchors ? x.anchors : [], y = [], E = [];
    for (const p of f) {
      const m = p == null ? void 0 : p.sid, S = p == null ? void 0 : p.quote;
      if (typeof (p == null ? void 0 : p.label) != "string" || !p.label.trim()) {
        E.push({ a: p, reason: "label missing" });
        continue;
      }
      if (!l(O, m, S)) {
        E.push({ a: p, reason: "evidence not in sentence" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: E };
  }
  __name(M, "M");
  function k(O, x) {
    const f = x && Array.isArray(x.items) ? x.items : [], y = [], E = [];
    for (const p of f) {
      const m = p == null ? void 0 : p.evidence;
      if (!(p != null && p.id) || !(p != null && p.question) || !(p != null && p.answer) || !(m != null && m.sid) || !(m != null && m.quote)) {
        E.push({ q: p, reason: "missing fields" });
        continue;
      }
      if (!l(O, m.sid, m.quote)) {
        E.push({ q: p, reason: "evidence not in sentence" });
        continue;
      }
      if (Array.isArray(p.choices) && p.choices.length > 0 && !p.choices.includes(p.answer)) {
        E.push({ q: p, reason: "answer not in choices" });
        continue;
      }
      y.push(p);
    }
    return { ok: y, bad: E };
  }
  __name(k, "k");
  function A({ summaryText: O, sentTable: x, anchors: f, badItems: y, mode: E, purpose: p, format: m }) {
    return ["[TASK] \uC544\uB798\uB294 \uAC80\uC99D\uC5D0\uC11C \uD0C8\uB77D\uD55C \uBB38\uD56D\uB4E4\uC774\uB2E4. \uC694\uC57D\uBB38 \uADFC\uAC70(sid+quote)\uB97C \uB9CC\uC871\uD558\uB3C4\uB85D \uBB38\uD56D\uC744 \uB2E4\uC2DC \uC0DD\uC131\uD558\uB77C.", `- \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218: ${y.length}`, `- \uBAA8\uB4DC: ${E}, \uBAA9\uC801: ${p}, \uD615\uC2DD: ${m}`, "- \uADDC\uCE59: \uC694\uC57D\uBB38 \uBC16 \uC815\uBCF4 \uAE08\uC9C0. \uBC18\uB4DC\uC2DC sid+quote\uAC00 \uC2E4\uC81C\uB85C \uD574\uB2F9 \uBB38\uC7A5\uC5D0 \uD3EC\uD568\uB418\uC5B4\uC57C \uD55C\uB2E4.", "- \uCD9C\uB825: JSON\uB9CC. items \uAE38\uC774\uB294 \uC815\uD655\uD788 \uC7AC\uC0DD\uC131 \uBB38\uD56D \uC218\uC640 \uAC19\uC544\uC57C \uD55C\uB2E4.", "", "[OUTPUT JSON ONLY]", '{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}', "", "[SUMMARY SENTENCES WITH ID]", JSON.stringify(x, null, 2), "", "[ANCHORS]", JSON.stringify(f, null, 2), "", "[BAD ITEMS]", JSON.stringify(y, null, 2), "", "[SUMMARY]", O].join(`
`);
  }
  __name(A, "A");
  async function b({ llmCall: O, originalText: x, mode: f, format: y }) {
    if (!O)
      throw new Error("llmCall is required");
    e[f] || (f = "standard"), s.includes(y) || (y = "narrative");
    const E = h({ originalText: x, mode: f, format: y }), p = (await O({ system: u(), user: E, json: false }) || "").trim() || "", m = c(p), S = w({ summaryText: p, format: y });
    let N = await O({ system: u(), user: S, json: true }), P;
    try {
      P = JSON.parse(N);
    } catch {
      P = { anchors: [] };
    }
    const { ok: q } = M(m, P), G = q.length >= 4 ? q : v(m);
    return { summaryText: p, sentTable: m, anchors: G };
  }
  __name(b, "b");
  function v(O) {
    const x = [];
    for (let f = 0; f < Math.min(8, O.length); f++) {
      const y = O[f], E = (y.text || "").slice(0, 18);
      x.push({ id: `A${f + 1}`, label: `\uBB38\uC7A5 \uD575\uC2EC${f + 1}`, type: "claim", sid: y.sid, quote: E, note: "\uC694\uC57D \uBB38\uC7A5 \uAE30\uBC18 \uC548\uC804 \uC575\uCEE4" });
    }
    return x;
  }
  __name(v, "v");
  async function _({ llmCall: O, mode: x, purpose: f, format: y, summaryText: E, sentTable: p, anchors: m }) {
    e[x] || (x = "standard"), r.includes(f) || (f = "preview"), s.includes(y) || (y = "narrative");
    const S = T({ mode: x, purpose: f, format: y, summaryText: E, sentTable: p, anchors: m });
    let N = await O({ system: u(), user: S, json: true }), P;
    try {
      P = JSON.parse(N);
    } catch {
      P = { items: [] };
    }
    let { ok: q, bad: G } = k(p, P);
    if (G.length > 0) {
      const H = A({ summaryText: E, sentTable: p, anchors: m, badItems: G.map((Ie) => Ie.q), mode: x, purpose: f, format: y });
      let W = await O({ system: u(), user: H, json: true }), B;
      try {
        B = JSON.parse(W);
      } catch {
        B = { items: [] };
      }
      const pe = k(p, B);
      q = q.concat(pe.ok);
      const oe = n[x] || 10;
      q = q.slice(0, oe);
    } else {
      const H = n[x] || 10;
      q = q.slice(0, H);
    }
    const L = n[x] || 10;
    if (q.length < L) {
      const H = I({ sentTable: p, anchors: m, count: L - q.length, format: y, purpose: f });
      q = q.concat(H).slice(0, L);
    }
    return { items: q };
  }
  __name(_, "_");
  function I({ sentTable: O, anchors: x, count: f, format: y, purpose: E }) {
    const p = [], m = x.slice(0, Math.max(f, 1));
    for (let S = 0; S < f; S++) {
      const N = m[S % m.length], P = N.sid, q = N.quote;
      p.push({ id: `QF${S + 1}`, type: "short", question: E === "preview" ? `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uC758\uBBF8\uD558\uB294 \uD575\uC2EC \uAC1C\uB150\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C \uB9D0\uD574\uBCF4\uC138\uC694.` : `\uC694\uC57D\uC5D0\uC11C '${q}'\uAC00 \uD3EC\uD568\uB41C \uBB38\uC7A5\uC758 \uD575\uC2EC \uC778\uACFC/\uAD00\uACC4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C \uC778\uCD9C\uD574\uBCF4\uC138\uC694.`, choices: [], answer: "(\uC11C\uC220\uD615 \uC815\uB2F5: \uC0AC\uC6A9\uC790 \uC785\uB825 \uBE44\uAD50\uB294 \uD574\uC124 \uAE30\uBC18 \uCC44\uC810 \uB610\uB294 \uD0A4\uC6CC\uB4DC \uCC44\uC810\uC73C\uB85C \uCC98\uB9AC)", explanation: "\uADFC\uAC70 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uC77D\uACE0 \uD575\uC2EC\uC744 1\uBB38\uC7A5\uC73C\uB85C \uC7AC\uAD6C\uC131\uD558\uBA74 \uB429\uB2C8\uB2E4.", evidence: { sid: P, quote: q }, anchorIds: [N.id] });
    }
    return p;
  }
  __name(I, "I");
  class g {
    constructor(x, { passScore: f = 90 } = {}) {
      this.items = Array.isArray(x) ? x : [], this.passScore = f, this.state = { idx: 0, attempts: 1, correct: 0, wrongIds: /* @__PURE__ */ new Set(), finished: false };
    }
    gradeAnswer(x, f) {
      if (!x)
        return { ok: false, reason: "no item" };
      const y = x.type;
      if (y === "mcq" || y === "blank" || y === "match" || y === "order" || y === "label" || y === "short") {
        if (y === "short")
          return { ok: true, reason: "short-auto-pass" };
        const E = (x.answer || "").trim(), p = (f || "").trim();
        return { ok: p === E, reason: p === E ? "match" : "mismatch" };
      }
      return { ok: false, reason: "unknown type" };
    }
    getScore() {
      return this.items.length === 0 ? 0 : Math.round(this.state.correct / this.items.length * 100);
    }
    currentItem() {
      return this.items[this.state.idx] || null;
    }
    submit(x) {
      if (this.state.finished)
        return { done: true, message: "already finished" };
      const f = this.currentItem();
      if (this.gradeAnswer(f, x).ok)
        return this.state.correct += 1, this.next(), { ok: true, message: "\uC815\uB2F5 \uCC98\uB9AC", score: this.getScore() };
      if (this.state.wrongIds.add(f.id), this.state.attempts === 1)
        return this.state.attempts = 2, { ok: false, stage: 1, hint: `\uD78C\uD2B81: \uADFC\uAC70 \uBB38\uC7A5(${f.evidence.sid})\uC744 \uB2E4\uC2DC \uC77D\uC5B4\uBCF4\uC138\uC694.`, score: this.getScore() };
      if (this.state.attempts === 2)
        return this.state.attempts = 3, { ok: false, stage: 2, hint: `\uD78C\uD2B82: \uADFC\uAC70 \uAD6C\uC808 = '${f.evidence.quote}'`, score: this.getScore() };
      {
        const E = f.explanation || "\uD574\uC124 \uC5C6\uC74C";
        return this.next(), { ok: false, stage: 3, explanation: E, score: this.getScore() };
      }
    }
    next() {
      if (this.state.idx += 1, this.state.attempts = 1, this.state.idx >= this.items.length)
        if (this.getScore() >= this.passScore)
          this.state.finished = true;
        else {
          const f = this.items.filter((y) => this.state.wrongIds.has(y.id));
          this.items = f.length > 0 ? f : this.items, this.state.idx = 0, this.state.attempts = 1, this.state.correct = 0, this.state.wrongIds = /* @__PURE__ */ new Set();
        }
    }
    status() {
      return { idx: this.state.idx, total: this.items.length, score: this.getScore(), passScore: this.passScore, finished: this.state.finished };
    }
  }
  __name(g, "g");
  async function D({ llmCall: O, originalText: x, mode: f, format: y, purpose: E }) {
    const p = await b({ llmCall: O, originalText: x, mode: f, format: y }), m = await _({ llmCall: O, mode: f, purpose: E, format: y, summaryText: p.summaryText, sentTable: p.sentTable, anchors: p.anchors });
    return { summary: { mode: f, format: y, text: p.summaryText, sentences: p.sentTable, anchors: p.anchors }, selfTest: { purpose: E, passScore: 90, items: m.items } };
  }
  __name(D, "D");
  return { computeCharTargets: a, splitSentencesKR: o, makeSentenceTable: c, generateBundle: b, generateSelfTest: _, runPipeline: D, MasteryRunner: g };
})();
var ps = `/* MindStory Engine Bundle (compat) */
(function(){
  if(window.__MS_ENGINE_BUNDLE__) return;
  window.__MS_ENGINE_BUNDLE__=true;
  window.callEngineAPI = async function(kind, text, options){
    const res = await fetch('/api/engine', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        kind,
        text,
        mode: options?.mode || options?.level || 'standard',
        viewType: options?.viewType || options?.displayMode || 'narrative',
        options: { userId: options?.userId || options?.options?.userId || 'web_user' }
      })
    });
    const data = await res.json().catch(()=>({ok:false,error:{message:'bad json'}}));
    return data;
  }
})();`;
te.use("/api/*", Hn());
te.get("/static/ms-engine-bundle.js", (t) => t.text(ps, 200, { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store" }));
te.get("/favicon.ico", (t) => t.body(null, 204));
te.use("/static/*", Yn({ root: "./public" }));
te.get("/", (t) => t.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MindStory - \uD559\uC2B5 \uC694\uC57D \uB3C4\uC6B0\uBBF8</title>
  <style>
    :root{
      --bg0:#070A12;
      --bg1:#0B1020;
      --card: rgba(255,255,255,.06);
      --card2: rgba(255,255,255,.10);
      --stroke: rgba(255,255,255,.14);
      --txt: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.65);
      --muted2: rgba(255,255,255,.45);
      --brand:#8B5CF6;
      --brand2:#22D3EE;
      --danger:#FB7185;
      --ok:#34D399;
      --shadow: 0 18px 60px rgba(0,0,0,.55);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(1200px 800px at 20% 10%, rgba(139,92,246,.25), transparent 60%),
        radial-gradient(900px 700px at 80% 30%, rgba(34,211,238,.18), transparent 60%),
        radial-gradient(1100px 800px at 50% 110%, rgba(16,185,129,.12), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    .wrap{min-height:100%; display:flex; align-items:center; justify-content:center; padding:28px;}
    .card{
      width:min(1040px, 100%);
      background: linear-gradient(180deg, var(--card), rgba(255,255,255,.04));
      border:1px solid var(--stroke);
      border-radius:22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      overflow:hidden;
      position:relative;
    }
    .card::before{
      content:"";
      position:absolute; inset:-2px;
      background: radial-gradient(700px 320px at 30% 0%, rgba(139,92,246,.22), transparent 60%),
                  radial-gradient(520px 260px at 90% 20%, rgba(34,211,238,.18), transparent 60%);
      pointer-events:none;
    }
    .inner{position:relative; padding:22px;}
    .top{
      display:flex; gap:14px; align-items:center; justify-content:space-between;
      padding:18px 22px;
      border-bottom: 1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    }
    .brand{
      display:flex; align-items:center; gap:12px;
    }
    .logo{
      width:44px; height:44px; border-radius:14px;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.16), rgba(255,255,255,.04)),
                  linear-gradient(135deg, rgba(139,92,246,.9), rgba(34,211,238,.75));
      border:1px solid rgba(255,255,255,.18);
      box-shadow: 0 10px 30px rgba(139,92,246,.22);
      display:flex; align-items:center; justify-content:center;
      font-weight:800;
    }
    .title h1{margin:0; font-size:22px; letter-spacing:.2px}
    .title p{margin:2px 0 0; color:var(--muted); font-size:13px}
    .status{
      display:flex; flex-direction:column; align-items:flex-end; gap:6px;
      color:var(--muted);
      font-size:12px;
    }
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.18);
      border:1px solid rgba(255,255,255,.12);
    }
    .dot{width:8px; height:8px; border-radius:50%;}
    .dot.ok{background:var(--ok)}
    .dot.bad{background:var(--danger)}
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap:18px;
      padding:18px 22px 22px;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns: 1fr;}
      .status{align-items:flex-start}
      .top{flex-direction:column; align-items:flex-start}
    }
    .panel{
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:18px;
      padding:16px;
      backdrop-filter: blur(10px);
    }
    .label{color:var(--muted); font-size:13px; margin-bottom:10px; display:flex; gap:8px; align-items:center}
    .textarea{
      width:100%;
      min-height:220px;
      resize:vertical;
      padding:14px 14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.20);
      color:var(--txt);
      outline:none;
      line-height:1.55;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    }
    .textarea:focus{
      border-color: rgba(139,92,246,.55);
      box-shadow: 0 0 0 4px rgba(139,92,246,.18);
    }
    .row{display:flex; align-items:center; justify-content:space-between; margin-top:10px}
    .count{color:var(--muted2); font-size:12px}
    .segTitle{color:var(--muted); font-size:12px; margin:14px 0 8px}
    .seg{
      display:flex; flex-wrap:wrap; gap:10px;
    }
    .btn{
      appearance:none; border:none; cursor:pointer;
      border-radius:12px;
      padding:10px 12px;
      color:var(--txt);
      background: rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.12);
      transition: transform .08s ease, background .15s ease, border-color .15s ease;
      font-size:13px;
      display:inline-flex; align-items:center; gap:8px;
      user-select:none;
    }
    .btn:hover{background: rgba(255,255,255,.10)}
    .btn:active{transform: translateY(1px)}
    .btn.active{
      background: linear-gradient(135deg, rgba(139,92,246,.45), rgba(34,211,238,.18));
      border-color: rgba(139,92,246,.55);
    }
    .btn.primary{
      background: linear-gradient(135deg, rgba(139,92,246,.95), rgba(34,211,238,.55));
      border-color: rgba(255,255,255,.18);
      box-shadow: 0 18px 40px rgba(139,92,246,.18);
      font-weight:700;
    }
    .btn.primary:disabled{
      opacity:.45; cursor:not-allowed; box-shadow:none;
    }
    .btn.ghost{
      background: rgba(0,0,0,.18);
    }
    .actions{display:flex; gap:10px; margin-top:14px}
    .result{
      min-height:220px;
      display:flex; flex-direction:column; gap:10px;
    }
    .resultHead{
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding-bottom:10px; border-bottom: 1px solid rgba(255,255,255,.10);
    }
    .resultHead h2{margin:0; font-size:16px}
    .meta{color:var(--muted2); font-size:12px}
    .out{
      background: rgba(0,0,0,.22);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:14px;
      padding:14px;
      line-height:1.6;
      overflow:auto;
    }
    .out h3{margin:0 0 10px; font-size:14px}
    .out ul{margin:8px 0 0; padding-left:18px}
    .out li{margin:6px 0}
    .badge{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.20);
      border:1px solid rgba(255,255,255,.12);
      font-size:12px; color:var(--muted);
    }
    .spin{
      width:14px; height:14px;
      border-radius:50%;
      border:2px solid rgba(255,255,255,.22);
      border-top-color: rgba(255,255,255,.75);
      animation: spin 1s linear infinite;
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .err{
      color: rgba(255,255,255,.92);
      background: rgba(251,113,133,.12);
      border:1px solid rgba(251,113,133,.25);
      padding:10px 12px; border-radius:12px;
      display:none;
    }
    .hint{color:var(--muted2); font-size:12px; margin-top:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <div class="brand">
          <div class="logo">MS</div>
          <div class="title">
            <h1>MindStory</h1>
            <p>\uD559\uC2B5 \uC694\uC57D \uB3C4\uC6B0\uBBF8 \xB7 \uC555\uCD95 \uC694\uC57D \uC5D4\uC9C4 (AI + \uB85C\uCEEC \uD3F4\uBC31)</p>
          </div>
        </div>
        <div class="status">
          <div class="pill" id="healthPill">
            <span class="dot bad" id="healthDot"></span>
            <span id="healthText">\uC5D4\uC9C4 \uC5F0\uACB0 \uD655\uC778 \uC911\u2026</span>
          </div>
          <div class="meta" id="healthMeta">\u2014</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="label">\uC785\uB825 \uD14D\uC2A4\uD2B8</div>
          <textarea id="inputText" class="textarea" placeholder="\uC5EC\uAE30\uC5D0 \uC694\uC57D\uD560 \uD14D\uC2A4\uD2B8\uB97C \uBD99\uC5EC\uB123\uAC70\uB098 \uC785\uB825\uD558\uC138\uC694. (\uD14D\uC2A4\uD2B8 \uC190\uC2E4 \uC5C6\uC774 \uB3D9\uC791)"></textarea>
          <div class="row">
            <div class="hint">\uC694\uC57D\uC740 \uBB38\uC7A5\uC744 "\uC790\uB974\uC9C0 \uC54A\uACE0" \uC758\uBBF8 \uB2E8\uC704\uB85C \uC555\uCD95\uD569\uB2C8\uB2E4.</div>
            <div class="count"><span id="charCount">0</span> \uC790</div>
          </div>

          <div class="segTitle">\uC694\uC57D \uBAA8\uB4DC</div>
          <div class="seg" id="modeSeg">
            <button class="btn" data-mode="brief">\u26A1 \uAC04\uB2E8</button>
            <button class="btn active" data-mode="standard">\u2696\uFE0F \uD45C\uC900</button>
            <button class="btn" data-mode="detail">\u{1F52C} \uC0C1\uC138</button>
          </div>

          <div class="segTitle">\uBCF4\uAE30 \uD615\uC2DD</div>
          <div class="seg" id="viewSeg">
            <button class="btn active" data-view="narrative">\u{1F4D8} \uC11C\uC220\uD615</button>
            <button class="btn" data-view="structured">\u{1F9F1} \uAD6C\uC870\uD654</button>
            <button class="btn" data-view="mindmap">\u{1F9E0} \uB9C8\uC778\uB4DC\uB9F5</button>
            <button class="btn" data-view="selftest">\u2705 \uC790\uAC00\uD14C\uC2A4\uD2B8</button>
          </div>

          <div class="actions">
            <button id="summarizeBtn" class="btn primary" disabled>\u2728 \uC694\uC57D\uD558\uAE30</button>
            <button id="clearBtn" class="btn ghost">\u{1F9F9} \uC9C0\uC6B0\uAE30</button>
          </div>
          <div class="err" id="errBox"></div>
        </div>

        <div class="panel result">
          <div class="resultHead">
            <h2>\uACB0\uACFC</h2>
            <div style="display:flex; gap:10px; align-items:center;">
              <span class="badge" id="runBadge"><span class="spin" id="spin" style="display:none"></span><span id="runText">\uB300\uAE30</span></span>
              <button id="copyBtn" class="btn">\u{1F4CB} \uBCF5\uC0AC</button>
            </div>
          </div>
          <div class="out" id="out">
            <div class="meta">\uC544\uC9C1 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC624\uB978\uCABD \uC0C1\uB2E8 \uC0C1\uD0DC\uAC00 'OK'\uC778\uC9C0 \uD655\uC778 \uD6C4 \uC694\uC57D\uC744 \uC2E4\uD589\uD558\uC138\uC694.</div>
          </div>
          <div class="meta" id="resultMeta">\u2014</div>
        </div>
      </div>
    </div>
  </div>

  <script src="/static/ms-engine-bundle.js"><\/script>
  <script>
    let currentMode = 'standard';
    let currentView = 'narrative';

    const elInput = document.getElementById('inputText');
    const elChar = document.getElementById('charCount');
    const elSumm = document.getElementById('summarizeBtn');
    const elClear = document.getElementById('clearBtn');
    const elOut = document.getElementById('out');
    const elErr = document.getElementById('errBox');
    const elMeta = document.getElementById('resultMeta');
    const elCopy = document.getElementById('copyBtn');
    const elRunBadge = document.getElementById('runBadge');
    const elRunText = document.getElementById('runText');
    const elSpin = document.getElementById('spin');

    const healthDot = document.getElementById('healthDot');
    const healthText = document.getElementById('healthText');
    const healthMeta = document.getElementById('healthMeta');

    function setErr(msg){
      if(!msg){ elErr.style.display='none'; elErr.textContent=''; return; }
      elErr.style.display='block';
      elErr.textContent = msg;
    }
    function setRunning(r){
      elSpin.style.display = r ? 'inline-block' : 'none';
      elRunText.textContent = r ? '\uC2E4\uD589 \uC911' : '\uB300\uAE30';
    }

    function pickActive(seg, key, value){
      seg.querySelectorAll('.btn').forEach(b=>{
        const v = b.dataset[key];
        if(v === value) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    document.getElementById('modeSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentMode = btn.dataset.mode;
      pickActive(document.getElementById('modeSeg'), 'mode', currentMode);
    });

    document.getElementById('viewSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentView = btn.dataset.view;
      pickActive(document.getElementById('viewSeg'), 'view', currentView);
    });

    elInput.addEventListener('input', ()=>{
      const n = elInput.value.length;
      elChar.textContent = n;
      elSumm.disabled = n < 5;
      setErr('');
    });

    elClear.addEventListener('click', ()=>{
      elInput.value = '';
      elChar.textContent = '0';
      elSumm.disabled = true;
      setErr('');
      elOut.innerHTML = '<div class="meta">\uCD08\uAE30\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</div>';
      elMeta.textContent = '\u2014';
    });

    elCopy.addEventListener('click', async ()=>{
      const text = elOut.innerText || '';
      try{
        await navigator.clipboard.writeText(text);
        elCopy.textContent = '\u2705 \uBCF5\uC0AC\uB428';
        setTimeout(()=> elCopy.textContent='\u{1F4CB} \uBCF5\uC0AC', 1200);
      }catch{
        alert('\uBCF5\uC0AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
      }
    });

    function render(data){
      // data: { kind, mode, viewType, narrative|structured|mindmap|selftest }
      const v = currentView;
      if(v === 'narrative' && data.narrative){
        elOut.innerHTML = '<h3>\uC11C\uC220\uD615 \uC694\uC57D</h3><div>' + escapeHtml(data.narrative) + '</div>';
        return;
      }
      if(v === 'structured' && data.structured){
        const bullets = data.structured.bullets || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.structured.title || '\uAD6C\uC870\uD654 \uC694\uC57D') + '</h3><ul>' +
          bullets.map(b=>'<li>' + escapeHtml(String(b).replace(/^[-\u2022]\\s*/,'')) + '</li>').join('') +
        '</ul>';
        return;
      }
      if(v === 'mindmap' && data.mindmap){
        const center = data.mindmap.center || '\uD575\uC2EC';
        const nodes = (data.mindmap.nodes || []).filter(n=>n.id !== 'c');
        elOut.innerHTML =
          '<h3>\uB9C8\uC778\uB4DC\uB9F5(\uAC04\uC774)</h3>' +
          '<div style="display:flex; flex-direction:column; gap:10px;">' +
            '<div class="badge">\u{1F31F} ' + escapeHtml(center) + '</div>' +
            '<ul>' + nodes.map(n=>'<li>' + escapeHtml(n.label || '') + '</li>').join('') + '</ul>' +
          '</div>';
        return;
      }
      if(v === 'selftest' && data.selftest){
        const qs = data.selftest.questions || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.selftest.title || '\uC140\uD504\uD14C\uC2A4\uD2B8') + '</h3>' +
          qs.map((q,i)=>(
            '<div style="padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;">' +
              '<div style="font-weight:700; margin-bottom:6px;">Q' + (i+1) + '. ' + escapeHtml(q.question || '') + '</div>' +
              '<div class="meta">\uD78C\uD2B8: ' + escapeHtml(q.answerHint || '') + '</div>' +
            '</div>'
          )).join('');
        return;
      }
      elOut.innerHTML = '<div class="meta">\uC120\uD0DD\uD55C \uBCF4\uAE30 \uD615\uC2DD\uC5D0 \uD574\uB2F9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
    }

    async function health(){
      try{
        const r = await fetch('/api/health');
        const j = await r.json();
        if(j.ok){
          healthDot.className = 'dot ok';
          healthText.textContent = '\uC5D4\uC9C4 OK \xB7 ' + (j.engineMode || 'unknown');
          healthMeta.textContent = 'db:' + (j.hasDB ? 'on' : 'off') + ' \xB7 ' + (j.ts || '');
        }else{
          healthDot.className = 'dot bad';
          healthText.textContent = '\uC5D4\uC9C4 \uC751\uB2F5 \uBE44\uC815\uC0C1';
          healthMeta.textContent = '';
        }
      }catch{
        healthDot.className = 'dot bad';
        healthText.textContent = '\uC5D4\uC9C4 \uC5F0\uACB0 \uC2E4\uD328';
        healthMeta.textContent = '';
      }
    }
    health();
    setInterval(health, 8000);

    elSumm.addEventListener('click', async ()=>{
      const text = (elInput.value || '').trim();
      if(text.length < 5) return;

      setErr('');
      setRunning(true);
      elMeta.textContent = '\u2014';

      try{
        const res = await fetch('/api/engine', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({
            kind: 'summary',
            text,
            mode: currentMode,
            viewType: currentView,
            options: { userId: 'web_user' }
          })
        });
        const j = await res.json();
        if(!j.ok){
          throw new Error(j.error?.message || '\uC694\uC57D \uC2E4\uD328');
        }
        render(j.data);
        const m = j.meta || {};
        elMeta.textContent =
          'engine: ' + (m.engine || 'unknown') +
          ' \xB7 cached: ' + (m.cached ? 'true' : 'false') +
          (m.cacheStore ? ('(' + m.cacheStore + ')') : '') +
          ' \xB7 ' + (m.elapsedMs != null ? (m.elapsedMs + 'ms') : '');
      }catch(e){
        setErr(e && e.message ? e.message : '\uC694\uC57D \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.');
      }finally{
        setRunning(false);
      }
    });
  <\/script>
</body>
</html>`));
te.get("/api/health", (t) => {
  const e = !!F(t.env.GEMINI_API_KEY).trim(), n = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  return t.json({ ok: true, ts: Ft(), hasDB: !!t.env.DB, hasGeminiKey: e, engineMode: e && !n ? "gemini+fallback" : "local-only" });
});
te.post("/api/gens/run", async (t) => {
  const e = Date.now();
  let n = null;
  try {
    n = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const s = F((n == null ? void 0 : n.text) || (n == null ? void 0 : n.originalText) || ""), r = Jt((n == null ? void 0 : n.mode) || "standard"), i = Yt((n == null ? void 0 : n.format) || (n == null ? void 0 : n.viewType) || "narrative"), a = F((n == null ? void 0 : n.purpose) || "preview").trim().toLowerCase();
  if (!s)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC6D0\uBB38 \uD14D\uC2A4\uD2B8\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." } }, 400);
  const o = !!F(t.env.GEMINI_API_KEY).trim(), c = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (!o || c)
    return t.json({ ok: false, error: { code: "GEMINI_REQUIRED", message: "GENS Engine\uC740 Gemini API\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. .dev.vars\uC5D0 GEMINI_API_KEY\uB97C \uC124\uC815\uD558\uC138\uC694." }, guide: { step1: ".dev.vars \uD30C\uC77C \uC0DD\uC131", step2: "GEMINI_API_KEY=your_api_key_here \uCD94\uAC00", step3: "\uC11C\uBE44\uC2A4 \uC7AC\uC2DC\uC791: pm2 restart webapp" } }, 503);
  const l = /* @__PURE__ */ __name(async ({ system: u, user: h, json: w }) => {
    if (w) {
      const T = `${u}

${h}

\uCD9C\uB825\uC740 \uBC18\uB4DC\uC2DC JSON\uB9CC \uCD9C\uB825\uD558\uB77C. \uB2E4\uB978 \uD14D\uC2A4\uD2B8 \uAE08\uC9C0.`;
      return await Zt(t.env, T);
    } else
      return (await us(t.env, u, h) || "").toString();
  }, "l");
  try {
    const u = await fs.runPipeline({ llmCall: l, originalText: s, mode: r, format: i, purpose: a === "exam" ? "exam" : "preview" });
    return t.json({ ok: true, data: u, meta: { engine: "gens-v3", mode: r, format: i, purpose: a, elapsedMs: Date.now() - e } }, 200);
  } catch (u) {
    return console.error("[GENS Engine Error]", u), t.json({ ok: false, error: { code: "GENS_ERROR", message: u.message || "GENS \uC5D4\uC9C4 \uC624\uB958", details: u.stack } }, 500);
  }
});
te.post("/api/engine", async (t) => {
  var A, b;
  const e = Date.now(), n = t.env.DB;
  await ls(n);
  let s = null;
  try {
    s = await t.req.json();
  } catch {
    return t.json({ ok: false, error: { code: "BAD_JSON", message: "\uC694\uCCAD JSON\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." } }, 400);
  }
  const r = Xn(s == null ? void 0 : s.kind), i = F((s == null ? void 0 : s.text) || ""), a = Jt((s == null ? void 0 : s.mode) || (s == null ? void 0 : s.level)), o = Yt((s == null ? void 0 : s.viewType) || (s == null ? void 0 : s.displayMode)), c = F(((A = s == null ? void 0 : s.options) == null ? void 0 : A.userId) || (s == null ? void 0 : s.userId) || "anon");
  if (!i.trim() || i.trim().length < 5)
    return t.json({ ok: false, error: { code: "NO_TEXT", message: "\uC785\uB825 \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." } }, 200);
  const l = cs(r, a, o, i, c || null), u = await bt(n, l);
  if (u.hit)
    return t.json({ ok: true, data: u.data, meta: { cached: true, cacheStore: u.store, cacheType: "derived", engine: "cache", elapsedMs: Date.now() - e } }, 200);
  const h = os(r, a, i, c || null), w = await bt(n, h);
  if (w.hit && ((b = w.data) != null && b.narrative)) {
    const v = w.data.narrative;
    let _;
    return o === "narrative" ? _ = { kind: r, mode: a, viewType: o, narrative: v } : o === "structured" ? _ = { kind: r, mode: a, ...vt(v) } : o === "mindmap" ? _ = { kind: r, mode: a, ...wt(v) } : _ = { kind: r, mode: a, ...yt(v) }, await Le(n, l, c || "anon", _), t.json({ ok: true, data: _, meta: { cached: true, cacheStore: "derived", cacheType: "converted", engine: "local-convert", elapsedMs: Date.now() - e } }, 200);
  }
  const T = !!F(t.env.GEMINI_API_KEY).trim(), M = F(t.env.USE_MOCK).trim().toLowerCase() === "true";
  if (r === "summary" && T && !M)
    try {
      const v = await hs(t.env, i);
      let _;
      a === "brief" ? _ = v.brief : a === "standard" ? _ = v.standard : _ = `**\uAC1C\uB150**
${v.detail.\uAC1C\uB150}

**\uC601\uD5A5**
${v.detail.\uC601\uD5A5}

**\uAD50\uC721\uC801 \uAC00\uCE58**
${v.detail["\uAD50\uC721\uC801 \uAC00\uCE58"]}`;
      const I = { kind: r, mode: a, viewType: "narrative", narrative: _, allSummaries: { brief: v.brief, standard: v.standard, detail: v.detail }, meta: v.meta };
      await Le(n, h, c || "anon", I);
      let g;
      return o === "narrative" ? g = I : o === "structured" ? g = { kind: r, mode: a, ...vt(_) } : o === "mindmap" ? g = { kind: r, mode: a, ...wt(_) } : g = { kind: r, mode: a, ...yt(_) }, await Le(n, l, c || "anon", g), t.json({ ok: true, data: g, meta: { cached: false, engine: "gemini-json-v3", elapsedMs: Date.now() - e } }, 200);
    } catch (v) {
      console.error("[Gemini JSON Error]", v);
    }
  const k = as(i, a, o);
  if (await Le(n, l, c || "anon", k), k.narrative) {
    const v = { kind: "summary", mode: a, viewType: "narrative", narrative: k.narrative };
    await Le(n, h, c || "anon", v);
  }
  return t.json({ ok: true, data: k, meta: { cached: false, engine: "local", elapsedMs: Date.now() - e } }, 200);
});
te.get("/health", (t) => t.json({ ok: true, service: "MindStory v2 Revised" }));
te.notFound((t) => t.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404));
var Et = new Ut();
var gs = Object.assign({ "/src/index.tsx": te });
var en = false;
for (const [, t] of Object.entries(gs))
  t && (Et.route("/", t), Et.notFound(t.notFoundHandler), en = true);
if (!en)
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

// ../.wrangler/tmp/bundle-yqyl47/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Et;

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

// ../.wrangler/tmp/bundle-yqyl47/middleware-loader.entry.ts
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
//# sourceMappingURL=bundledWorker-0.2545386535611349.mjs.map
