var dn=Object.defineProperty;var ft=t=>{throw TypeError(t)};var un=(t,e,n)=>e in t?dn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var C=(t,e,n)=>un(t,typeof e!="symbol"?e+"":e,n),st=(t,e,n)=>e.has(t)||ft("Cannot "+n);var d=(t,e,n)=>(st(t,e,"read from private field"),n?n.call(t):e.get(t)),N=(t,e,n)=>e.has(t)?ft("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),$=(t,e,n,r)=>(st(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),I=(t,e,n)=>(st(t,e,"access private method"),n);var pt=(t,e,n,r)=>({set _(s){$(t,e,s,n)},get _(){return d(t,e,r)}});var mt=(t,e,n)=>(r,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,u;if(t[o]?(u=t[o][0][0],r.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{c=await u(r,()=>a(o+1))}catch(h){if(h instanceof Error&&e)r.error=h,c=await e(h,r),l=!0;else throw h}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},hn=Symbol(),fn=async(t,e=Object.create(null))=>{const{all:n=!1,dot:r=!1}=e,i=(t instanceof qt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?pn(t,{all:n,dot:r}):{}};async function pn(t,e){const n=await t.formData();return n?mn(n,e):{}}function mn(t,e){const n=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?gn(n,s,r):n[s]=r}),e.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(xn(n,r,s),delete n[r])}),n}var gn=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},xn=(t,e,n)=>{let r=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?r[i]=n:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Pt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},vn=t=>{const{groups:e,path:n}=bn(t),r=Pt(n);return wn(r,e)},bn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return e.push([s,n]),s}),{groups:e,path:t}},wn=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[r]=e[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[n][1]);break}}return t},Je={},yn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${t}#${e}`;return Je[r]||(n[2]?Je[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Je[r]=[t,n[1],!0]),Je[r]}return null},ht=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},Sn=t=>ht(t,decodeURI),Lt=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let r=n;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const i=e.indexOf("?",r),a=e.slice(n,i===-1?void 0:i);return Sn(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(n,r)},En=t=>{const e=Lt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},Te=(t,e,...n)=>(n.length&&(e=Te(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Ht=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const i=s.replace("?","");r+="/"+i,n.push(r)}else r+="/"+s}),n.filter((s,i,a)=>a.indexOf(s)===i)},it=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?ht(t,Bt):t):t,Dt=(t,e,n)=>{let r;if(!n&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return it(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(r&&(c=it(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),r&&(l=it(l))),n?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},On=Dt,$n=(t,e)=>Dt(t,e,!0),Bt=decodeURIComponent,gt=t=>ht(t,Bt),Re,X,oe,Ft,Gt,dt,le,Rt,qt=(Rt=class{constructor(t,e="/",n=[[]]){N(this,oe);C(this,"raw");N(this,Re);N(this,X);C(this,"routeIndex",0);C(this,"path");C(this,"bodyCache",{});N(this,le,t=>{const{bodyCache:e,raw:n}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,$(this,X,n),$(this,Re,{})}param(t){return t?I(this,oe,Ft).call(this,t):I(this,oe,Gt).call(this)}query(t){return On(this.url,t)}queries(t){return $n(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,r)=>{e[r]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await fn(this,t))}json(){return d(this,le).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,le).call(this,"text")}arrayBuffer(){return d(this,le).call(this,"arrayBuffer")}blob(){return d(this,le).call(this,"blob")}formData(){return d(this,le).call(this,"formData")}addValidatedData(t,e){d(this,Re)[t]=e}valid(t){return d(this,Re)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[hn](){return d(this,X)}get matchedRoutes(){return d(this,X)[0].map(([[,t]])=>t)}get routePath(){return d(this,X)[0].map(([[,t]])=>t)[this.routeIndex].path}},Re=new WeakMap,X=new WeakMap,oe=new WeakSet,Ft=function(t){const e=d(this,X)[0][this.routeIndex][1][t],n=I(this,oe,dt).call(this,e);return n&&/\%/.test(n)?gt(n):n},Gt=function(){const t={},e=Object.keys(d(this,X)[0][this.routeIndex][1]);for(const n of e){const r=I(this,oe,dt).call(this,d(this,X)[0][this.routeIndex][1][n]);r!==void 0&&(t[n]=/\%/.test(r)?gt(r):r)}return t},dt=function(t){return d(this,X)[1]?d(this,X)[1][t]:t},le=new WeakMap,Rt),Cn={Stringify:1},Kt=async(t,e,n,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(c=>Kt(c,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},Tn="text/plain; charset=UTF-8",at=(t,e)=>({"Content-Type":t,...e}),qe,Fe,re,je,se,V,Ge,Ne,Me,ve,Ke,Ue,de,Ae,jt,An=(jt=class{constructor(t,e){N(this,de);N(this,qe);N(this,Fe);C(this,"env",{});N(this,re);C(this,"finalized",!1);C(this,"error");N(this,je);N(this,se);N(this,V);N(this,Ge);N(this,Ne);N(this,Me);N(this,ve);N(this,Ke);N(this,Ue);C(this,"render",(...t)=>(d(this,Ne)??$(this,Ne,e=>this.html(e)),d(this,Ne).call(this,...t)));C(this,"setLayout",t=>$(this,Ge,t));C(this,"getLayout",()=>d(this,Ge));C(this,"setRenderer",t=>{$(this,Ne,t)});C(this,"header",(t,e,n)=>{this.finalized&&$(this,V,new Response(d(this,V).body,d(this,V)));const r=d(this,V)?d(this,V).headers:d(this,ve)??$(this,ve,new Headers);e===void 0?r.delete(t):n!=null&&n.append?r.append(t,e):r.set(t,e)});C(this,"status",t=>{$(this,je,t)});C(this,"set",(t,e)=>{d(this,re)??$(this,re,new Map),d(this,re).set(t,e)});C(this,"get",t=>d(this,re)?d(this,re).get(t):void 0);C(this,"newResponse",(...t)=>I(this,de,Ae).call(this,...t));C(this,"body",(t,e,n)=>I(this,de,Ae).call(this,t,e,n));C(this,"text",(t,e,n)=>!d(this,ve)&&!d(this,je)&&!e&&!n&&!this.finalized?new Response(t):I(this,de,Ae).call(this,t,e,at(Tn,n)));C(this,"json",(t,e,n)=>I(this,de,Ae).call(this,JSON.stringify(t),e,at("application/json",n)));C(this,"html",(t,e,n)=>{const r=s=>I(this,de,Ae).call(this,s,e,at("text/html; charset=UTF-8",n));return typeof t=="object"?Kt(t,Cn.Stringify,!1,{}).then(r):r(t)});C(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});C(this,"notFound",()=>(d(this,Me)??$(this,Me,()=>new Response),d(this,Me).call(this,this)));$(this,qe,t),e&&($(this,se,e.executionCtx),this.env=e.env,$(this,Me,e.notFoundHandler),$(this,Ue,e.path),$(this,Ke,e.matchResult))}get req(){return d(this,Fe)??$(this,Fe,new qt(d(this,qe),d(this,Ue),d(this,Ke))),d(this,Fe)}get event(){if(d(this,se)&&"respondWith"in d(this,se))return d(this,se);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,se))return d(this,se);throw Error("This context has no ExecutionContext")}get res(){return d(this,V)||$(this,V,new Response(null,{headers:d(this,ve)??$(this,ve,new Headers)}))}set res(t){if(d(this,V)&&t){t=new Response(t.body,t);for(const[e,n]of d(this,V).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=d(this,V).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,n)}$(this,V,t),this.finalized=!0}get var(){return d(this,re)?Object.fromEntries(d(this,re)):{}}},qe=new WeakMap,Fe=new WeakMap,re=new WeakMap,je=new WeakMap,se=new WeakMap,V=new WeakMap,Ge=new WeakMap,Ne=new WeakMap,Me=new WeakMap,ve=new WeakMap,Ke=new WeakMap,Ue=new WeakMap,de=new WeakSet,Ae=function(t,e,n){const r=d(this,V)?new Headers(d(this,V).headers):d(this,ve)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?r.append(a,o):r.set(a,o)}if(n)for(const[i,a]of Object.entries(n))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const o of a)r.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,je);return new Response(t,{status:s,headers:r})},jt),K="ALL",_n="all",Rn=["get","post","put","delete","options","patch"],Ut="Can not add a route since the matcher is already built.",zt=class extends Error{},jn="__COMPOSED_HANDLER",Nn=t=>t.text("404 Not Found",404),xt=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},Q,U,Jt,Z,ge,Ye,Ve,ke,Mn=(ke=class{constructor(e={}){N(this,U);C(this,"get");C(this,"post");C(this,"put");C(this,"delete");C(this,"options");C(this,"patch");C(this,"all");C(this,"on");C(this,"use");C(this,"router");C(this,"getPath");C(this,"_basePath","/");N(this,Q,"/");C(this,"routes",[]);N(this,Z,Nn);C(this,"errorHandler",xt);C(this,"onError",e=>(this.errorHandler=e,this));C(this,"notFound",e=>($(this,Z,e),this));C(this,"fetch",(e,...n)=>I(this,U,Ve).call(this,e,n[1],n[0],e.method));C(this,"request",(e,n,r,s)=>e instanceof Request?this.fetch(n?new Request(e,n):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${Te("/",e)}`,n),r,s)));C(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(I(this,U,Ve).call(this,e.request,e,void 0,e.request.method))})});[...Rn,_n].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?$(this,Q,a):I(this,U,ge).call(this,i,d(this,Q),a),o.forEach(c=>{I(this,U,ge).call(this,i,d(this,Q),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){$(this,Q,c);for(const l of[i].flat())o.map(u=>{I(this,U,ge).call(this,l.toUpperCase(),d(this,Q),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?$(this,Q,i):($(this,Q,"*"),a.unshift(i)),a.forEach(o=>{I(this,U,ge).call(this,K,d(this,Q),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Lt:En}route(e,n){const r=this.basePath(e);return n.routes.map(s=>{var a;let i;n.errorHandler===xt?i=s.handler:(i=async(o,c)=>(await mt([],n.errorHandler)(o,()=>s.handler(o,c))).res,i[jn]=s.handler),I(a=r,U,ge).call(a,s.method,s.path,i)}),this}basePath(e){const n=I(this,U,Jt).call(this);return n._basePath=Te(this._basePath,e),n}mount(e,n,r){let s,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=Te(this._basePath,e),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const o=async(c,l)=>{const u=await n(s(c.req.raw),...a(c));if(u)return u;await l()};return I(this,U,ge).call(this,K,Te(e,"*"),o),this}},Q=new WeakMap,U=new WeakSet,Jt=function(){const e=new ke({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,$(e,Z,d(this,Z)),e.routes=this.routes,e},Z=new WeakMap,ge=function(e,n,r){e=e.toUpperCase(),n=Te(this._basePath,n);const s={basePath:this._basePath,path:n,method:e,handler:r};this.router.add(e,n,[r,s]),this.routes.push(s)},Ye=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},Ve=function(e,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await I(this,U,Ve).call(this,e,n,r,"GET")))();const i=this.getPath(e,{env:r}),a=this.router.match(s,i),o=new An(e,{path:i,matchResult:a,env:r,executionCtx:n,notFoundHandler:d(this,Z)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await d(this,Z).call(this,o)})}catch(u){return I(this,U,Ye).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,Z).call(this,o))).catch(u=>I(this,U,Ye).call(this,u,o)):l??d(this,Z).call(this,o)}const c=mt(a[0],this.errorHandler,d(this,Z));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return I(this,U,Ye).call(this,l,o)}})()},ke),Yt=[];function kn(t,e){const n=this.buildAllMatchers(),r=(s,i)=>{const a=n[s]||n[K],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],Yt];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=r,r(t,e)}var Ze="[^/]+",De=".*",Be="(?:|/.*)",_e=Symbol(),In=new Set(".\\+*[^]$()");function Pn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===De||t===Be?1:e===De||e===Be?-1:t===Ze?1:e===Ze?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var be,we,ee,Oe,Ln=(Oe=class{constructor(){N(this,be);N(this,we);N(this,ee,Object.create(null))}insert(e,n,r,s,i){if(e.length===0){if(d(this,be)!==void 0)throw _e;if(i)return;$(this,be,n);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",De]:["","",Ze]:a==="/*"?["","",Be]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Ze;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw _e;if(l=d(this,ee)[h],!l){if(Object.keys(d(this,ee)).some(b=>b!==De&&b!==Be))throw _e;if(i)return;l=d(this,ee)[h]=new Oe,u!==""&&$(l,we,s.varIndex++)}!i&&u!==""&&r.push([u,d(l,we)])}else if(l=d(this,ee)[a],!l){if(Object.keys(d(this,ee)).some(u=>u.length>1&&u!==De&&u!==Be))throw _e;if(i)return;l=d(this,ee)[a]=new Oe}l.insert(o,n,r,s,i)}buildRegExpStr(){const n=Object.keys(d(this,ee)).sort(Pn).map(r=>{const s=d(this,ee)[r];return(typeof d(s,we)=="number"?`(${r})@${d(s,we)}`:In.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof d(this,be)=="number"&&n.unshift(`#${d(this,be)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},be=new WeakMap,we=new WeakMap,ee=new WeakMap,Oe),tt,ze,Nt,Hn=(Nt=class{constructor(){N(this,tt,{varIndex:0});N(this,ze,new Ln)}insert(t,e,n){const r=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return s[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,s[a][1]);break}}return d(this,ze).insert(i,e,r,d(this,tt),n),r}buildRegExp(){let t=d(this,ze).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(n[++e]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),n,r]}},tt=new WeakMap,ze=new WeakMap,Nt),Dn=[/^$/,[],Object.create(null)],We=Object.create(null);function Vt(t){return We[t]??(We[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Bn(){We=Object.create(null)}function qn(t){var l;const e=new Hn,n=[];if(t.length===0)return Dn;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[b,w])=>u?1:b?-1:h.length-w.length),s=Object.create(null);for(let u=0,h=-1,b=r.length;u<b;u++){const[w,M,P]=r[u];w?s[M]=[P.map(([H])=>[H,Object.create(null)]),Yt]:h++;let A;try{A=e.insert(M,h,w)}catch(H){throw H===_e?new zt(M):H}w||(n[h]=P.map(([H,m])=>{const y=Object.create(null);for(m-=1;m>=0;m--){const[k,j]=A[m];y[k]=j}return[H,y]}))}const[i,a,o]=e.buildRegExp();for(let u=0,h=n.length;u<h;u++)for(let b=0,w=n[u].length;b<w;b++){const M=(l=n[u][b])==null?void 0:l[1];if(!M)continue;const P=Object.keys(M);for(let A=0,H=P.length;A<H;A++)M[P[A]]=o[M[P[A]]]}const c=[];for(const u in a)c[u]=n[a[u]];return[i,c,s]}function Ce(t,e){if(t){for(const n of Object.keys(t).sort((r,s)=>s.length-r.length))if(Vt(n).test(e))return[...t[n]]}}var ue,he,nt,Wt,Mt,Fn=(Mt=class{constructor(){N(this,nt);C(this,"name","RegExpRouter");N(this,ue);N(this,he);C(this,"match",kn);$(this,ue,{[K]:Object.create(null)}),$(this,he,{[K]:Object.create(null)})}add(t,e,n){var o;const r=d(this,ue),s=d(this,he);if(!r||!s)throw new Error(Ut);r[t]||[r,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[K]).forEach(l=>{c[t][l]=[...c[K][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Vt(e);t===K?Object.keys(r).forEach(l=>{var u;(u=r[l])[e]||(u[e]=Ce(r[l],e)||Ce(r[K],e)||[])}):(o=r[t])[e]||(o[e]=Ce(r[t],e)||Ce(r[K],e)||[]),Object.keys(r).forEach(l=>{(t===K||t===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([n,i])})}),Object.keys(s).forEach(l=>{(t===K||t===l)&&Object.keys(s[l]).forEach(u=>c.test(u)&&s[l][u].push([n,i]))});return}const a=Ht(e)||[e];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(s).forEach(h=>{var b;(t===K||t===h)&&((b=s[h])[u]||(b[u]=[...Ce(r[h],u)||Ce(r[K],u)||[]]),s[h][u].push([n,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,he)).concat(Object.keys(d(this,ue))).forEach(e=>{t[e]||(t[e]=I(this,nt,Wt).call(this,e))}),$(this,ue,$(this,he,void 0)),Bn(),t}},ue=new WeakMap,he=new WeakMap,nt=new WeakSet,Wt=function(t){const e=[];let n=t===K;return[d(this,ue),d(this,he)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(i=>[i,r[t][i]]):[];s.length!==0?(n||(n=!0),e.push(...s)):t!==K&&e.push(...Object.keys(r[K]).map(i=>[i,r[K][i]]))}),n?qn(e):null},Mt),fe,ie,kt,Gn=(kt=class{constructor(t){C(this,"name","SmartRouter");N(this,fe,[]);N(this,ie,[]);$(this,fe,t.routers)}add(t,e,n){if(!d(this,ie))throw new Error(Ut);d(this,ie).push([t,e,n])}match(t,e){if(!d(this,ie))throw new Error("Fatal error");const n=d(this,fe),r=d(this,ie),s=n.length;let i=0,a;for(;i<s;i++){const o=n[i];try{for(let c=0,l=r.length;c<l;c++)o.add(...r[c]);a=o.match(t,e)}catch(c){if(c instanceof zt)continue;throw c}this.match=o.match.bind(o),$(this,fe,[o]),$(this,ie,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(d(this,ie)||d(this,fe).length!==1)throw new Error("No active router has been determined yet.");return d(this,fe)[0]}},fe=new WeakMap,ie=new WeakMap,kt),Le=Object.create(null),pe,Y,ye,Ie,z,ae,xe,Pe,Kn=(Pe=class{constructor(e,n,r){N(this,ae);N(this,pe);N(this,Y);N(this,ye);N(this,Ie,0);N(this,z,Le);if($(this,Y,r||Object.create(null)),$(this,pe,[]),e&&n){const s=Object.create(null);s[e]={handler:n,possibleKeys:[],score:0},$(this,pe,[s])}$(this,ye,[])}insert(e,n,r){$(this,Ie,++pt(this,Ie)._);let s=this;const i=vn(n),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],u=i[o+1],h=yn(l,u),b=Array.isArray(h)?h[0]:l;if(b in d(s,Y)){s=d(s,Y)[b],h&&a.push(h[1]);continue}d(s,Y)[b]=new Pe,h&&(d(s,ye).push(h),a.push(h[1])),s=d(s,Y)[b]}return d(s,pe).push({[e]:{handler:r,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,Ie)}}),s}search(e,n){var c;const r=[];$(this,z,Le);let i=[this];const a=Pt(n),o=[];for(let l=0,u=a.length;l<u;l++){const h=a[l],b=l===u-1,w=[];for(let M=0,P=i.length;M<P;M++){const A=i[M],H=d(A,Y)[h];H&&($(H,z,d(A,z)),b?(d(H,Y)["*"]&&r.push(...I(this,ae,xe).call(this,d(H,Y)["*"],e,d(A,z))),r.push(...I(this,ae,xe).call(this,H,e,d(A,z)))):w.push(H));for(let m=0,y=d(A,ye).length;m<y;m++){const k=d(A,ye)[m],j=d(A,z)===Le?{}:{...d(A,z)};if(k==="*"){const O=d(A,Y)["*"];O&&(r.push(...I(this,ae,xe).call(this,O,e,d(A,z))),$(O,z,j),w.push(O));continue}const[S,v,g]=k;if(!h&&!(g instanceof RegExp))continue;const f=d(A,Y)[S],x=a.slice(l).join("/");if(g instanceof RegExp){const O=g.exec(x);if(O){if(j[v]=O[0],r.push(...I(this,ae,xe).call(this,f,e,d(A,z),j)),Object.keys(d(f,Y)).length){$(f,z,j);const p=((c=O[0].match(/\//))==null?void 0:c.length)??0;(o[p]||(o[p]=[])).push(f)}continue}}(g===!0||g.test(h))&&(j[v]=h,b?(r.push(...I(this,ae,xe).call(this,f,e,j,d(A,z))),d(f,Y)["*"]&&r.push(...I(this,ae,xe).call(this,d(f,Y)["*"],e,j,d(A,z)))):($(f,z,j),w.push(f)))}}i=w.concat(o.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},pe=new WeakMap,Y=new WeakMap,ye=new WeakMap,Ie=new WeakMap,z=new WeakMap,ae=new WeakSet,xe=function(e,n,r,s){const i=[];for(let a=0,o=d(e,pe).length;a<o;a++){const c=d(e,pe)[a],l=c[n]||c[K],u={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),r!==Le||s&&s!==Le))for(let h=0,b=l.possibleKeys.length;h<b;h++){const w=l.possibleKeys[h],M=u[l.score];l.params[w]=s!=null&&s[w]&&!M?s[w]:r[w]??(s==null?void 0:s[w]),u[l.score]=!0}}return i},Pe),Se,It,Un=(It=class{constructor(){C(this,"name","TrieRouter");N(this,Se);$(this,Se,new Kn)}add(t,e,n){const r=Ht(e);if(r){for(let s=0,i=r.length;s<i;s++)d(this,Se).insert(t,r[s],n);return}d(this,Se).insert(t,e,n)}match(t,e){return d(this,Se).search(t,e)}},Se=new WeakMap,It),Xt=class extends Mn{constructor(t={}){super(t),this.router=t.router??new Gn({routers:[new Fn,new Un]})}},zn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(a,o){var u;function c(h,b){a.res.headers.set(h,b)}const l=await r(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(u=n.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),a.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const h=await s(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let b=n.allowHeaders;if(!(b!=null&&b.length)){const w=a.req.header("Access-Control-Request-Headers");w&&(b=w.split(/\s*,\s*/))}return b!=null&&b.length&&(c("Access-Control-Allow-Headers",b.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Jn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,vt=(t,e=Vn)=>{const n=/\.([a-zA-Z0-9]+?)$/,r=t.match(n);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Yn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Vn=Yn,Wn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),r=[];for(const s of n)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},Qt={br:".br",zstd:".zst",gzip:".gz"},Xn=Object.keys(Qt),Qn="index.html",Zn=t=>{const e=t.root??"./",n=t.path,r=t.join??Wn;return async(s,i)=>{var u,h,b,w;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),i()}let o=r(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=r(o,Qn));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const M=t.mimes&&vt(o,t.mimes)||vt(o);if(s.header("Content-Type",M||"application/octet-stream"),t.precompressed&&(!M||Jn.test(M))){const P=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(A=>A.trim()));for(const A of Xn){if(!P.has(A))continue;const H=await c(o+Qt[A],s);if(H){l=H,s.header("Content-Encoding",A),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((b=t.onFound)==null?void 0:b.call(t,o,s)),s.body(l)}await((w=t.onNotFound)==null?void 0:w.call(t,o,s)),await i()}},er=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=n[t];if(!s)return null;const i=await r.get(s,{type:"stream"});return i||null},tr=t=>async function(n,r){return Zn({...t,getContent:async i=>er(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,r)},nr=t=>tr(t);const ne=new Xt,Xe=new Map,rr=1e3*60*60*24*7;let ot=!1;function Zt(){return new Date().toISOString()}function J(t){return t==null?"":String(t)}function Ee(t,e,n){return Math.max(e,Math.min(n,t))}function ut(t){return(t||"").replace(/\s+/g,"")}function te(t){return ut(t).length}const bt={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},wt={brief:["연구 목적","연구 방법","핵심 결론"],standard:["연구 목적","연구 문제","연구 방법","주요 결과","결론"],detail:["연구 목적","연구 문제","연구 대상","연구 절차","결과","해석","교육적 의의"]};function en(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}const sr=["DLPFC","VLPFC","OFC","ACC","PFC","vmPFC","dmPFC","전두엽","측두엽","두정엽","후두엽","편도체","해마"];function ct(t,e){if(e==="brief"){for(const s of sr)if(t.includes(s))return{valid:!1,error:`간단요약에 세부 뇌영역(${s}) 단독 등장 금지. 일반적 설명만 포함하세요.`}}const n=wt[e]||wt.standard,r=[];for(const s of n)s.split(" ").some(o=>t.includes(o))||r.push(s);return r.length>0?{valid:!1,error:`필수 요소 누락: ${r.join(", ")}. 이 항목들을 반드시 포함하세요.`}:{valid:!0}}function ir(t){return bt[t]||bt.standard}function Qe(t,e){const n=Math.max(50,te(t)),{min:r,max:s}=ir(e);return{base:n,min:Math.floor(n*r),max:Math.ceil(n*s)}}function tn(t){const e=J(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function nn(t){const e=J(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function ar(t){const e=J(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function rn(t){const e=(t||"").replace(/\s+/g," ").trim();if(!e)return[];const n=[];let r="",s=!1;for(let i=0;i<e.length;i++){const a=e[i],o=e[i+1];(a==='"'||a==='"'||a==='"')&&(s=!s),r+=a,!s&&/[\.\?\!]/.test(a)&&o===" "?a==="."&&r.endsWith("...")||(n.push(r.trim()),r="",i++):!s&&/[다요죠]/.test(a)&&o===" "&&(n.push(r.trim()),r="",i++)}return r.trim()&&n.push(r.trim()),n.length?n:[e]}const or=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),cr=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function lr(t){const e=new Set;for(const n of t){let r=!1;for(const s of cr)if(s.has(n)){e.add(Array.from(s)[0]),r=!0;break}r||e.add(n)}return e}function et(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!or.has(e))}function dr(t){const e=new Map;for(const r of t)for(const s of et(r))e.set(s,(e.get(s)||0)+1);return t.map((r,s)=>{const i=et(r);let a=0;for(const l of i)a+=e.get(l)||0;const o=r.length,c=o<15?.7:o>180?.85:1;return{idx:s,s:r,score:a*c}})}function ur(t,e){return dr(t).slice().sort((s,i)=>i.score-s.score).slice(0,Ee(e,1,Math.max(1,t.length))).sort((s,i)=>s.idx-i.idx).map(s=>s.s)}function sn(t){let e=(t||"").trim();e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/특정\s+공간\s+인/g,"특정 공간인"),e=e.replace(/(\S+)\s+\1/g,"$1"),e=e.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const n=e.split(new RegExp("(?<=다\\.)\\s+")),r=new Set,s=[];for(const i of n){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(r.has(o))continue;r.add(o)}s.push(i)}return e=s.join(" "),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function an(t){const e=Math.max(200,te(t)),n=Qe(t,"brief"),r=Qe(t,"standard"),s=Qe(t,"detail"),i=Ee(n.min+Math.round((n.max-n.min)*.5),n.min,n.max),a=Ee(Math.max(r.min,i+40),r.min,r.max),o=Ee(Math.max(s.min,a+120),s.min,s.max);return{base:e,brief:i,standard:a,detail:o}}function hr(t){const e=an(t);return`
당신은 학술 논문을 3단계(간단/표준/상세)로 "생성적 요약(Abstractive Summarization)" 방식으로 요약하는 전문 엔진입니다.

[입력 원문 - 학술 논문]
"""${en(t)}"""

[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]
이 텍스트는 학술 논문입니다.
요약 시 반드시 다음 순서를 유지하세요:

1. 연구 목적 (무엇을 연구했는가?)
2. 연구 설계 및 방법 (어떻게 연구했는가?)
3. 핵심 결과 (무엇을 발견했는가?)
4. 결과 해석 (결과가 의미하는 바는?)
5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)

각 단계는 1문단 이상을 넘지 마세요.

[요약 모드별 필수 포함 요소]
- 간단 요약: 연구 목적, 연구 방법, 핵심 결론 (세부 뇌 영역 금지)
- 표준 요약: 연구 목적, 연구 문제, 연구 방법, 주요 결과, 결론
- 상세 요약: 연구 목적, 연구 문제, 연구 대상, 연구 절차, 결과, 해석, 교육적 의의

[요약 작업 전 세팅 규칙]
1. 비율 준수: 간단 10~15%, 표준 25~30%, 상세 45~55% (공백 제외 글자수 기준 엄수)
2. 텍스트 정제: 페이지 번호(p.XX), 각주 번호, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 재구성
3. 정보 계층화: 상세로 갈수록 '학술적 논거'와 '세부 지표'의 깊이를 더할 것
4. 퀴즈 최적화: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치

[요약 원칙]
1) "간단 < 표준 < 상세" 글자수 단조 증가는 절대적 기준. 역전 금지.
2) 단순 추출/복붙 금지: 원문을 생성적으로 재구성하여 매끄러운 글 작성
3) 원문에 없는 정보 추가 금지 (할루시네이션 금지)
4) 세 요약은 내용과 표현이 "거의 동일"하면 실패 (중복 금지)
5) 🔹 B. 결과 단독 발췌 금지:
   - 간단 요약: DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지 (일반적 설명만)
   - 표준/상세 요약: 세부 뇌 영역 허용 (단, 맥락과 함께 설명)
6) 스마트 편집:
   - 중복 표현 통합
   - 전문 용어 일관성 유지
   - 한 문장 2줄 이내로 단문 위주 작성

[길이 목표(공백 제외 글자수)]
- 간단: ${e.brief}자 내외 (원문 10~15%, 핵심만 간결하게)
- 표준: ${e.standard}자 내외 (원문 25~30%, 주요 논거 포함)
- 상세: ${e.detail}자 내외 (원문 45~55%, 학술적 논거+세부 지표+인과관계 명시, 아래 소제목 3개)

[상세 요약 소제목(반드시 그대로 사용)]
- 개념
- 영향
- 교육적 가치

[퀴즈 연동 강조]
모든 요약문은 향후 퀴즈 생성의 근거입니다. 특히 상세 요약에서는:
- 전문 용어(DLPFC, OFC 등)와 개념 간의 **인과관계**를 생략하지 말 것
- 학습 유형, 뇌 영역, 발달 단계 등의 **지식 앵커(Anchors)**를 명확히 확보
- 퀴즈 문항으로 변환 가능한 구체적 사실과 관계를 배치

[출력 형식 - JSON만 출력]
{
  "meta": {
    "base_chars_no_space": ${e.base},
    "target": { "brief": ${e.brief}, "standard": ${e.standard}, "detail": ${e.detail} }
  },
  "brief": "…",
  "standard": "…",
  "detail": {
    "개념": "…",
    "영향": "…",
    "교육적 가치": "…"
  }
}

※ JSON 외 어떤 문장도 출력하지 마라.
※ 모든 요약은 자연스러운 한국어 학술 문어체로 작성하라.
`.trim()}const fr={definition:["의미","정의","사전","생태학적","개념","이란","무엇","장소"],meaning:["의미","가치","치유","안정","교육적","기능","중요","효과"],activity:["체험","활동","교육","놀이","경험","학습","탐색","참여"]};function yt(t){const e={definition:0,meaning:0,activity:0};for(const[r,s]of Object.entries(fr))for(const i of s)t.includes(i)&&e[r]++;const n=Math.max(e.definition,e.meaning,e.activity);return n===0?null:e.definition===n?"definition":e.meaning===n?"meaning":"activity"}function St(t){const e=t.match(/^([가-힣\s]+?)(은|는|이|가|을|를|에|의|도|만|부터|까지|와|과|으로|로)\s/);return e?e[1].trim():""}function pr(t,e){const n=St(t),r=St(e);return!n||!r?!1:n===r?!0:n.length>=3&&r.length>=3?n.includes(r)||r.includes(n):!1}function mr(t){return t.replace(/^([가-힣\s]+?)(은|는|이|가)\s+/,"").trim()}function Et(t){let e=t;return e=e.replace(/하였다/g,"한다"),e=e.replace(/되었다/g,"된다"),e=e.replace(/이었다/g,"이다"),e=e.replace(/\s*것입니다\./g," 것이다."),e=e.replace(/\s*것이었다\./g," 것이다."),e}function Ot(t){if(t.length===0)return"";if(t.length===1)return t[0];const e=[];e.push(t[0]);for(let n=1;n<t.length;n++){const r=t[n-1],s=t[n];if(pr(r,s)){const i=mr(s);e.push(`또한 ${i}`)}else e.push(s)}return e.join(" ")}function gr(t,e,n){const r=te(e),s=[],i=new Set,a=/\(([^)]+,?\s*\d{4})\)/g;let o;for(;(o=a.exec(e))!==null;)i.add(o[1]);for(const m of t){const y=[];let k;const j=/\(([^)]+,?\s*\d{4})\)/g;for(;(k=j.exec(m))!==null;){const g=k[1];i.has(g)&&y.push(g)}let S=m.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(S.length<10)continue;const v=et(S).slice(0,8);s.push({original:m,clean:S,keywords:v,citations:y}),S.includes("(")&&console.log("[DEBUG] 인용 미제거:",S.slice(0,100))}if(s.length===0)return"요약할 내용이 부족합니다.";const c=new Map;for(const m of s)for(const y of m.keywords)c.set(y,(c.get(y)||0)+1);const l=[];for(const m of s){new Set(m.keywords);let y=!1;for(const k of l)if(m.keywords.filter(S=>k.keywords.has(S)).length>=2){k.sentences.push({clean:m.clean,citations:m.citations}),m.keywords.forEach(S=>k.keywords.add(S)),y=!0;break}y||l.push({keywords:new Set(m.keywords),sentences:[{clean:m.clean,citations:m.citations}]})}const u=l.map(m=>{const y=m.sentences[0].clean,k=s.findIndex(j=>j.clean===y);return{...m,originalIdx:k}});let h="";if(n==="brief"){const m={definition:[],meaning:[],activity:[]};for(const L of u)for(const E of L.sentences){const T=yt(E.clean);T&&m[T].push(E)}const y=m.definition[0],k=m.meaning[0],j=m.activity[0],S=[],v=[];if(y&&(S.push(y.clean),v.push(...y.citations.filter(Boolean))),k&&(S.push(k.clean),v.push(...k.citations.filter(Boolean))),j&&(S.push(j.clean),v.push(...j.citations.filter(Boolean))),S.length===0){const E=u.sort((T,R)=>R.sentences.length-T.sentences.length)[0].sentences[0];S.push(E.clean),v.push(...E.citations.filter(Boolean))}const g=Array.from(new Set(v)),f=g.length>0?`(${g.join("; ")})`:"",x=S.map(L=>{let E=L;for(;E.includes("(");)E=E.replace(/\([^)]*\)/g,"");return E.trim()});x.length===1?h=`${x[0]}${f}.`:x.length===2?h=`${x[0]}. ${x[1]}${f}.`:h=`${x[0]}하며 ${x[1]}. ${x[2]}${f}.`;const p=te(h)/r*100;if(p>15){let L=h.slice(0,60);L=L.replace(/\([^)]*\)/g,"").trim(),h=L+(f?` ${f}.`:".")}const _=[];return y&&_.push("definition"),k&&_.push("meaning"),j&&_.push("activity"),typeof console<"u"&&console.log("[Brief Summary Meta]",{rolesFilled:_,sentenceCount:S.length,compressionRatio:p.toFixed(1)+"%",passed:p<=15}),h=lt(e,h,"brief",t),h}if(n==="standard"){const m=u.sort((E,T)=>T.sentences.length-E.sentences.length).slice(0,3).sort((E,T)=>E.originalIdx-T.originalIdx);if(m.length===1){const E=m[0].sentences[0],T=m[0].sentences.flatMap(G=>G.citations).filter(Boolean),R=T.length>0?`(${T.join("; ")})`:"";return`${E.clean}${R}.`}const y=new Map,k=new Map,j={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const E of m)for(const T of E.sentences){const R=T.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(R){let[,G,ce]=R;G=G.replace(/[에게서로부터]$/g,"").trim(),y.has(G)||y.set(G,[]);let F=ce.trim();F=F.replace(/[\.。\?\!]+$/g,"").trim();for(const[q,me]of Object.entries(j))if(F.includes(q)){const $e=k.get(q)||0;if(k.set(q,$e+1),$e>=1&&me.length>0){const rt=Math.min($e-1,me.length-1);F=F.replace(q,me[rt])}}const D=new Set(et(F)),B=lr(D),W=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const q of W)B.delete(q);y.get(G).push({original:F,keywords:B,citations:T.citations})}}const S=[];for(const[E,T]of y.entries()){const R=T.flatMap(D=>D.citations).filter(Boolean),G=E.charAt(E.length-1),F=/[가-힣]/.test(G)&&(G.charCodeAt(0)-44032)%28!==0?"은":"는";if(T.length===1){const D=T[0].original,B=(D.match(/,/g)||[]).length;if(D.length>80&&B>=2){const W=D.split(",").map(q=>q.trim()).filter(q=>q.length>0);if(W.length>=2){S.push({text:`${E}${F} ${W[0]}`,citations:[]});for(let q=1;q<W.length-1;q++)S.push({text:`${W[q]}`,citations:[]});S.push({text:`${W[W.length-1]}`,citations:T[0].citations})}else S.push({text:`${E}${F} ${D}`,citations:R})}else S.push({text:`${E}${F} ${D}`,citations:R})}else{const D=[];for(const B of T){let W=!1;for(const q of D){const me=Array.from(B.keywords).filter(rt=>q.keywords.has(rt)).length,$e=Math.max(B.keywords.size,q.keywords.size);if($e>0&&me/$e>=.8){B.original.length>q.original.length&&(q.original=B.original,q.keywords=B.keywords),q.citations.push(...B.citations),W=!0;break}}W||D.push({original:B.original,keywords:B.keywords,citations:[...B.citations]})}if(D.length===1)S.push({text:`${E}${F} ${D[0].original}`,citations:D.flatMap(B=>B.citations)});else if(D.length===2)S.push({text:`${E}${F} ${D[0].original}`,citations:D[0].citations}),S.push({text:`${E}${F} ${D[1].original}`,citations:D[1].citations});else for(let B=0;B<D.length;B++)S.push({text:`${E}${F} ${D[B].original}`,citations:D[B].citations})}}if(S.length===0)return"요약할 내용이 부족합니다.";if(S.length===1){const E=S[0].citations.filter(Boolean),T=E.length>0?`(${E.join("; ")})`:"";return`${S[0].text}${T}.`}if(S.length===2){const E=S[0].citations.filter(Boolean),T=S[1].citations.filter(Boolean),R=E.length>0?`(${E.join("; ")})`:"",G=T.length>0?`(${T.join("; ")})`:"";return`${S[0].text}${R}. ${S[1].text}${G}.`}const v=[],g=S[0],f=g.citations.filter(Boolean),x=f.length>0?`(${f.join("; ")})`:"";if(v.push(`${g.text}${x}.`),S.length>=2){const E=S[1],T=E.citations.filter(Boolean),R=T.length>0?`(${T.join("; ")})`:"";v.push(`${E.text}${R}.`)}if(S.length>=3){const T=S.slice(2).map(R=>{const G=R.citations.filter(Boolean),ce=G.length>0?`(${G.join("; ")})`:"";return`${R.text}${ce}.`});v.push(T.join(" "))}h=v.join(`

`);const O=h.split(new RegExp("(?<=다\\.)\\s+")).filter(E=>E.trim().length>0);h=Ot(O),h=Et(h);const _=te(h)/r*100;_>30&&(v.length>3?h=v.slice(0,3).join(`

`):h=v.join(`

`));const L=[];for(const E of m)for(const T of E.sentences){const R=yt(T.clean);R&&!L.includes(R)&&L.push(R)}return typeof console<"u"&&console.log("[Standard Summary Meta]",{rolesFilled:L,sentenceCount:S.length,paragraphCount:v.length,compressionRatio:_.toFixed(1)+"%",passed:_>=25&&_<=30}),h=lt(e,h,"standard",t),h}const b=u.sort((m,y)=>y.sentences.length-m.sentences.length).slice(0,5).sort((m,y)=>m.originalIdx-y.originalIdx);let w=b.map((m,y)=>{const k=m.sentences[0],j=m.sentences.flatMap(v=>v.citations).filter(Boolean),S=j.length>0?`(${j.join("; ")})`:"";return y===0?`${k.clean}${S}.`:y===b.length-1?`마지막으로 ${k.clean}${S}.`:`또한 ${k.clean}${S}.`}).join(" ");const M=w.split(new RegExp("(?<=다\\.)\\s+")).filter(m=>m.trim().length>0);return w=Ot(M),w=Et(w),te(w)/r*100>(n==="brief"?15:n==="standard"?30:55)&&n==="detail"?b.slice(0,3).map((y,k)=>{const j=y.sentences[0],S=y.sentences.flatMap(g=>g.citations).filter(Boolean),v=S.length>0?`(${S.join("; ")})`:"";return k===0?`${j.clean}${v}.`:k===2?`마지막으로 ${j.clean}${v}.`:`또한 ${j.clean}${v}.`}).join(" "):(w=lt(e,w,"detail",t),w)}function xr(t,e,n){const r=rn(t),s=e==="brief"?Ee(Math.round(r.length*.18),2,4):e==="standard"?Ee(Math.round(r.length*.28),4,8):Ee(Math.round(r.length*.4),7,14),i=ur(r,s);if(n==="narrative"){let o=gr(i,t,e);return o=sn(o),{kind:"summary",mode:e,viewType:n,narrative:o}}if(n==="structured")return{kind:"summary",mode:e,viewType:n,structured:{title:"구조화 요약",bullets:i.map((o,c)=>`- (${c+1}) ${o}`)}};if(n==="mindmap"){const o=(i[0]||r[0]||"핵심").slice(0,40),c=[{id:"c",label:o,level:0}],l=[];return i.slice(1).forEach((u,h)=>{const b=`n${h+1}`;c.push({id:b,label:u.slice(0,60),level:1}),l.push({from:"c",to:b})}),{kind:"summary",mode:e,viewType:n,mindmap:{center:o,nodes:c,edges:l}}}const a=i.map((o,c)=>({id:`q${c+1}`,type:"short",question:`(${c+1}) 다음 내용을 한 문장으로 설명해보세요: "${o.slice(0,70)}"`,answerHint:o}));return{kind:"summary",mode:e,viewType:n,selftest:{title:"셀프테스트",questions:a}}}function on(t){if(!t)return"empty";let e=2166136261,n=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+a,n|=0}const r=(e>>>0).toString(16),s=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${r}_${s}`}function vr(t,e,n,r){const s=on(n);return`${t}::${r||"anon"}::${e}::base::${s}`}function br(t,e,n,r,s){const i=on(r);return`${t}::${s||"anon"}::${e}::${n}::${i}`}async function wr(t){if(!ot){if(!t){ot=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),ot=!0}}async function $t(t,e){const n=Date.now(),r=Xe.get(e);if(r&&n-r.createdAt<rr)return{hit:!0,data:r.data,store:"mem"};if(r&&Xe.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return Xe.set(e,{data:i,createdAt:n}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function He(t,e,n,r){const s=Date.now();Xe.set(e,{data:r,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(r),Zt()).run()}function Ct(t){const e=t.split(/\n\n+/).filter(r=>r.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((r,s)=>`- (${s+1}) ${r}`):t.split(/[\.。]\s+/).filter(r=>r.trim()).map((r,s)=>`- (${s+1}) ${r}.`)}}}function Tt(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),n=(e[0]||"핵심").slice(0,40),r=[{id:"c",label:n,level:0}],s=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;r.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:n,nodes:r,edges:s}}}function At(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(r=>r.trim()).map(r=>r.trim()).map((r,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${r.slice(0,70)}"`,answerHint:r}))}}}async function yr(t,e){var c,l,u,h,b;const n=J(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const r=J(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const w=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(w.ok){const P=await w.json();return{ok:!0,text:((b=(h=(u=(l=(c=P==null?void 0:P.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:b.text)??"",raw:P}}if(w.status===429||w.status===503){await new Promise(P=>setTimeout(P,o)),o*=2;continue}const M=await w.text().catch(()=>"");throw new Error(`Gemini error ${w.status}: ${M.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Sr(t,e,n){var l,u,h,b,w;const r=J(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const s=J(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const M=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(M.ok){const A=await M.json();return((w=(b=(h=(u=(l=A==null?void 0:A.candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:b[0])==null?void 0:w.text)??""}if(M.status===429||M.status===503){await new Promise(A=>setTimeout(A,c)),c*=2;continue}const P=await M.text().catch(()=>"");throw new Error(`Gemini error ${M.status}: ${P.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function cn(t,e){const n=await yr(t,e);return typeof n=="string"?n:((n==null?void 0:n.text)??"").toString()}async function Er(t,e){const n=hr(e);for(let r=1;r<=2;r++)try{let i=(await cn(t,n)||"").trim();i.startsWith("```")&&(i=i.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/i,"").trim());const a=JSON.parse(i);if(!(a!=null&&a.brief)||!(a!=null&&a.standard)||!(a!=null&&a.detail))throw new Error("Missing required fields");if(!a.detail.개념||!a.detail.영향||!a.detail["교육적 가치"])throw new Error("Missing detail fields");const o=te(a.brief),c=te(a.standard),l=te(a.detail.개념+a.detail.영향+a.detail["교육적 가치"]);(o>=c||c>=l)&&console.warn("[SummaryJSON] monotonic violated",{bLen:o,sLen:c,dLen:l,attempt:r});const u=ct(a.brief,"brief"),h=ct(a.standard,"standard"),b=a.detail.개념+" "+a.detail.영향+" "+a.detail["교육적 가치"],w=ct(b,"detail");if(!u.valid&&(console.warn("[SummaryJSON] brief validation failed:",u.error),r===1))throw new Error(`Brief validation: ${u.error}`);if(!h.valid&&(console.warn("[SummaryJSON] standard validation failed:",h.error),r===1))throw new Error(`Standard validation: ${h.error}`);if(!w.valid&&(console.warn("[SummaryJSON] detail validation failed:",w.error),r===1))throw new Error(`Detail validation: ${w.error}`);return a}catch(s){if(console.error("[SummaryJSON] attempt failed",r,s==null?void 0:s.message),r===2){const i=an(e);return{meta:{base_chars_no_space:i.base,target:{brief:i.brief,standard:i.standard,detail:i.detail}},brief:"[JSON 실패] 요약 생성 실패",standard:"[JSON 실패] 요약 생성 실패",detail:{개념:"[실패]",영향:"[실패]","교육적 가치":"[실패]"}}}}throw new Error("summarizeWithJSON failed")}function lt(t,e,n,r){const{min:s,max:i}=Qe(t,n);let a=(e||"").trim();const o=()=>te(a),c=()=>{a=sn(a),a=a.replace(/\s{2,}/g," ").trim()};if(c(),o()>i){const l=rn(a);for(;l.length>1&&te(l.join(" "))>i;)l.pop();a=l.join(" "),c()}if(o()<s){const l=(r||[]).map(u=>u.trim()).filter(Boolean);for(const u of l){if(o()>=s)break;const h=ut(u).slice(0,24);if(!(h&&ut(a).includes(h))&&(a=(a?a+" ":"")+u.replace(/[\.。\?\!]+$/g,"")+".",c(),o()>i))break}}return a}const Or=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},n={brief:6,standard:10,detail:14},r=["narrative","structured","mindmap"],s=["preview","exam"];function i(v){return(v||"").replace(/\s+/g,"")}function a(v,g){const x=Math.max(200,i(v||"").length),O=e[g]||e.standard,p=Math.floor(x*O.min),_=Math.ceil(x*O.max);return{base:x,min:Math.max(80,p),max:Math.max(120,_)}}function o(v){const g=(v||"").trim();return g?g.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(x=>x.trim()).filter(Boolean):[]}function c(v){return o(v).map((f,x)=>({sid:`S${x+1}`,text:f}))}function l(v,g,f){const x=v.find(O=>O.sid===g);return!x||!f||typeof f!="string"?!1:x.text.includes(f.trim())}function u(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:v,mode:g,format:f}){const x=a(v,g),O=en(v),p=f==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":f==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${g} (간단/표준/상세)`,`- 형식: ${f} (${p})`,`- 문자수 목표(공백 제외): 최소 ${x.min}자 ~ 최대 ${x.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",O].join(`
`)}function b({summaryText:v,format:g}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
  "anchors":[
    {
      "id":"A1",
      "label":"핵심 개념/관계 이름",
      "type":"concept|relation|claim",
      "sid":"S1",
      "quote":"요약문에서 그대로 인용한 짧은 구절",
      "note":"학습 포인트(1문장)"
    }
  ]
}`,"","[SUMMARY]",v].join(`
`)}function w({mode:v,purpose:g,format:f,summaryText:x,sentTable:O,anchors:p}){const _=n[v]||10,L=g==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",E=f==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":f==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${v} (문항수 ${_})`,`- 목적: ${g} (${L})`,`- 요약 형식: ${f} (${E})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
  "items":[
    {
      "id":"Q1",
      "type":"blank|match|order|label|short|mcq",
      "question":"문항",
      "choices":["보기1","보기2","보기3","보기4"], 
      "answer":"정답(choices 기반이면 보기 텍스트 그대로)",
      "explanation":"해설(1~2문장)",
      "evidence": { "sid":"S1", "quote":"요약 문장 일부" },
      "anchorIds":["A1","A3"]
    }
  ]
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(O,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[SUMMARY]",x].join(`
`)}function M(v,g){const f=g&&g.anchors?g.anchors:[],x=[],O=[];for(const p of f){const _=p==null?void 0:p.sid,L=p==null?void 0:p.quote;if(typeof(p==null?void 0:p.label)!="string"||!p.label.trim()){O.push({a:p,reason:"label missing"});continue}if(!l(v,_,L)){O.push({a:p,reason:"evidence not in sentence"});continue}x.push(p)}return{ok:x,bad:O}}function P(v,g){const f=g&&Array.isArray(g.items)?g.items:[],x=[],O=[];for(const p of f){const _=p==null?void 0:p.evidence;if(!(p!=null&&p.id)||!(p!=null&&p.question)||!(p!=null&&p.answer)||!(_!=null&&_.sid)||!(_!=null&&_.quote)){O.push({q:p,reason:"missing fields"});continue}if(!l(v,_.sid,_.quote)){O.push({q:p,reason:"evidence not in sentence"});continue}if(Array.isArray(p.choices)&&p.choices.length>0&&!p.choices.includes(p.answer)){O.push({q:p,reason:"answer not in choices"});continue}x.push(p)}return{ok:x,bad:O}}function A({summaryText:v,sentTable:g,anchors:f,badItems:x,mode:O,purpose:p,format:_}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${x.length}`,`- 모드: ${O}, 목적: ${p}, 형식: ${_}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(g,null,2),"","[ANCHORS]",JSON.stringify(f,null,2),"","[BAD ITEMS]",JSON.stringify(x,null,2),"","[SUMMARY]",v].join(`
`)}async function H({llmCall:v,originalText:g,mode:f,format:x}){if(!v)throw new Error("llmCall is required");e[f]||(f="standard"),r.includes(x)||(x="narrative");const O=h({originalText:g,mode:f,format:x}),p=(await v({system:u(),user:O,json:!1})||"").trim()||"",_=c(p),L=b({summaryText:p,format:x});let E=await v({system:u(),user:L,json:!0}),T;try{T=JSON.parse(E)}catch{T={anchors:[]}}const{ok:R}=M(_,T),G=R.length>=4?R:m(_);return{summaryText:p,sentTable:_,anchors:G}}function m(v){const g=[];for(let f=0;f<Math.min(8,v.length);f++){const x=v[f],O=(x.text||"").slice(0,18);g.push({id:`A${f+1}`,label:`문장 핵심${f+1}`,type:"claim",sid:x.sid,quote:O,note:"요약 문장 기반 안전 앵커"})}return g}async function y({llmCall:v,mode:g,purpose:f,format:x,summaryText:O,sentTable:p,anchors:_}){e[g]||(g="standard"),s.includes(f)||(f="preview"),r.includes(x)||(x="narrative");const L=w({mode:g,purpose:f,format:x,summaryText:O,sentTable:p,anchors:_});let E=await v({system:u(),user:L,json:!0}),T;try{T=JSON.parse(E)}catch{T={items:[]}}let{ok:R,bad:G}=P(p,T);if(G.length>0){const F=A({summaryText:O,sentTable:p,anchors:_,badItems:G.map(me=>me.q),mode:g,purpose:f,format:x});let D=await v({system:u(),user:F,json:!0}),B;try{B=JSON.parse(D)}catch{B={items:[]}}const W=P(p,B);R=R.concat(W.ok);const q=n[g]||10;R=R.slice(0,q)}else{const F=n[g]||10;R=R.slice(0,F)}const ce=n[g]||10;if(R.length<ce){const F=k({sentTable:p,anchors:_,count:ce-R.length,format:x,purpose:f});R=R.concat(F).slice(0,ce)}return{items:R}}function k({sentTable:v,anchors:g,count:f,format:x,purpose:O}){const p=[],_=g.slice(0,Math.max(f,1));for(let L=0;L<f;L++){const E=_[L%_.length],T=E.sid,R=E.quote;p.push({id:`QF${L+1}`,type:"short",question:O==="preview"?`요약에서 '${R}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${R}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:T,quote:R},anchorIds:[E.id]})}return p}class j{constructor(g,{passScore:f=90}={}){this.items=Array.isArray(g)?g:[],this.passScore=f,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(g,f){if(!g)return{ok:!1,reason:"no item"};const x=g.type;if(x==="mcq"||x==="blank"||x==="match"||x==="order"||x==="label"||x==="short"){if(x==="short")return{ok:!0,reason:"short-auto-pass"};const O=(g.answer||"").trim(),p=(f||"").trim();return{ok:p===O,reason:p===O?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(g){if(this.state.finished)return{done:!0,message:"already finished"};const f=this.currentItem();if(this.gradeAnswer(f,g).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(f.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${f.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${f.evidence.quote}'`,score:this.getScore()};{const O=f.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:O,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const f=this.items.filter(x=>this.state.wrongIds.has(x.id));this.items=f.length>0?f:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function S({llmCall:v,originalText:g,mode:f,format:x,purpose:O}){const p=await H({llmCall:v,originalText:g,mode:f,format:x}),_=await y({llmCall:v,mode:f,purpose:O,format:x,summaryText:p.summaryText,sentTable:p.sentTable,anchors:p.anchors});return{summary:{mode:f,format:x,text:p.summaryText,sentences:p.sentTable,anchors:p.anchors},selfTest:{purpose:O,passScore:90,items:_.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:H,generateSelfTest:y,runPipeline:S,MasteryRunner:j}})(),$r=`/* MindStory Engine Bundle (compat) */
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
})();`;ne.use("/api/*",zn());ne.get("/static/ms-engine-bundle.js",t=>t.text($r,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));ne.get("/favicon.ico",t=>t.body(null,204));ne.use("/static/*",nr({root:"./public"}));ne.get("/",t=>t.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MindStory - 학습 요약 도우미</title>
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
            <p>학습 요약 도우미 · 압축 요약 엔진 (AI + 로컬 폴백)</p>
          </div>
        </div>
        <div class="status">
          <div class="pill" id="healthPill">
            <span class="dot bad" id="healthDot"></span>
            <span id="healthText">엔진 연결 확인 중…</span>
          </div>
          <div class="meta" id="healthMeta">—</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="label">입력 텍스트</div>
          <textarea id="inputText" class="textarea" placeholder="여기에 요약할 텍스트를 붙여넣거나 입력하세요. (텍스트 손실 없이 동작)"></textarea>
          <div class="row">
            <div class="hint">요약은 문장을 "자르지 않고" 의미 단위로 압축합니다.</div>
            <div class="count"><span id="charCount">0</span> 자</div>
          </div>

          <div class="segTitle">요약 모드</div>
          <div class="seg" id="modeSeg">
            <button class="btn" data-mode="brief">⚡ 간단</button>
            <button class="btn active" data-mode="standard">⚖️ 표준</button>
            <button class="btn" data-mode="detail">🔬 상세</button>
          </div>

          <div class="segTitle">보기 형식</div>
          <div class="seg" id="viewSeg">
            <button class="btn active" data-view="narrative">📘 서술형</button>
            <button class="btn" data-view="structured">🧱 구조화</button>
            <button class="btn" data-view="mindmap">🧠 마인드맵</button>
            <button class="btn" data-view="selftest">✅ 자가테스트</button>
          </div>

          <div class="actions">
            <button id="summarizeBtn" class="btn primary" disabled>✨ 요약하기</button>
            <button id="clearBtn" class="btn ghost">🧹 지우기</button>
          </div>
          <div class="err" id="errBox"></div>
        </div>

        <div class="panel result">
          <div class="resultHead">
            <h2>결과</h2>
            <div style="display:flex; gap:10px; align-items:center;">
              <span class="badge" id="runBadge"><span class="spin" id="spin" style="display:none"></span><span id="runText">대기</span></span>
              <button id="copyBtn" class="btn">📋 복사</button>
            </div>
          </div>
          <div class="out" id="out">
            <div class="meta">아직 결과가 없습니다. 오른쪽 상단 상태가 'OK'인지 확인 후 요약을 실행하세요.</div>
          </div>
          <div class="meta" id="resultMeta">—</div>
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
      elRunText.textContent = r ? '실행 중' : '대기';
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
      elOut.innerHTML = '<div class="meta">초기화되었습니다.</div>';
      elMeta.textContent = '—';
    });

    elCopy.addEventListener('click', async ()=>{
      const text = elOut.innerText || '';
      try{
        await navigator.clipboard.writeText(text);
        elCopy.textContent = '✅ 복사됨';
        setTimeout(()=> elCopy.textContent='📋 복사', 1200);
      }catch{
        alert('복사에 실패했습니다.');
      }
    });

    function render(data){
      // data: { kind, mode, viewType, narrative|structured|mindmap|selftest }
      const v = currentView;
      if(v === 'narrative' && data.narrative){
        elOut.innerHTML = '<h3>서술형 요약</h3><div>' + escapeHtml(data.narrative) + '</div>';
        return;
      }
      if(v === 'structured' && data.structured){
        const bullets = data.structured.bullets || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.structured.title || '구조화 요약') + '</h3><ul>' +
          bullets.map(b=>'<li>' + escapeHtml(String(b).replace(/^[-•]\\s*/,'')) + '</li>').join('') +
        '</ul>';
        return;
      }
      if(v === 'mindmap' && data.mindmap){
        const center = data.mindmap.center || '핵심';
        const nodes = (data.mindmap.nodes || []).filter(n=>n.id !== 'c');
        elOut.innerHTML =
          '<h3>마인드맵(간이)</h3>' +
          '<div style="display:flex; flex-direction:column; gap:10px;">' +
            '<div class="badge">🌟 ' + escapeHtml(center) + '</div>' +
            '<ul>' + nodes.map(n=>'<li>' + escapeHtml(n.label || '') + '</li>').join('') + '</ul>' +
          '</div>';
        return;
      }
      if(v === 'selftest' && data.selftest){
        const qs = data.selftest.questions || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.selftest.title || '셀프테스트') + '</h3>' +
          qs.map((q,i)=>(
            '<div style="padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;">' +
              '<div style="font-weight:700; margin-bottom:6px;">Q' + (i+1) + '. ' + escapeHtml(q.question || '') + '</div>' +
              '<div class="meta">힌트: ' + escapeHtml(q.answerHint || '') + '</div>' +
            '</div>'
          )).join('');
        return;
      }
      elOut.innerHTML = '<div class="meta">선택한 보기 형식에 해당 결과가 없습니다.</div>';
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
          healthText.textContent = '엔진 OK · ' + (j.engineMode || 'unknown');
          healthMeta.textContent = 'db:' + (j.hasDB ? 'on' : 'off') + ' · ' + (j.ts || '');
        }else{
          healthDot.className = 'dot bad';
          healthText.textContent = '엔진 응답 비정상';
          healthMeta.textContent = '';
        }
      }catch{
        healthDot.className = 'dot bad';
        healthText.textContent = '엔진 연결 실패';
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
      elMeta.textContent = '—';

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
          throw new Error(j.error?.message || '요약 실패');
        }
        render(j.data);
        const m = j.meta || {};
        elMeta.textContent =
          'engine: ' + (m.engine || 'unknown') +
          ' · cached: ' + (m.cached ? 'true' : 'false') +
          (m.cacheStore ? ('(' + m.cacheStore + ')') : '') +
          ' · ' + (m.elapsedMs != null ? (m.elapsedMs + 'ms') : '');
      }catch(e){
        setErr(e && e.message ? e.message : '요약 중 오류가 발생했습니다.');
      }finally{
        setRunning(false);
      }
    });
  <\/script>
</body>
</html>`));ne.get("/api/health",t=>{const e=!!J(t.env.GEMINI_API_KEY).trim(),n=J(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Zt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});ne.post("/api/gens/run",async t=>{const e=Date.now();let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const r=J((n==null?void 0:n.text)||(n==null?void 0:n.originalText)||""),s=tn((n==null?void 0:n.mode)||"standard"),i=nn((n==null?void 0:n.format)||(n==null?void 0:n.viewType)||"narrative"),a=J((n==null?void 0:n.purpose)||"preview").trim().toLowerCase();if(!r)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!J(t.env.GEMINI_API_KEY).trim(),c=J(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:u,user:h,json:b})=>{if(b){const w=`${u}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await cn(t.env,w)}else return(await Sr(t.env,u,h)||"").toString()};try{const u=await Or.runPipeline({llmCall:l,originalText:r,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:u,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(u){return console.error("[GENS Engine Error]",u),t.json({ok:!1,error:{code:"GENS_ERROR",message:u.message||"GENS 엔진 오류",details:u.stack}},500)}});ne.post("/api/engine",async t=>{var A,H;const e=Date.now(),n=t.env.DB;await wr(n);let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=ar(r==null?void 0:r.kind),i=J((r==null?void 0:r.text)||""),a=tn((r==null?void 0:r.mode)||(r==null?void 0:r.level)),o=nn((r==null?void 0:r.viewType)||(r==null?void 0:r.displayMode)),c=J(((A=r==null?void 0:r.options)==null?void 0:A.userId)||(r==null?void 0:r.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=br(s,a,o,i,c||null),u=await $t(n,l);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=vr(s,a,i,c||null),b=await $t(n,h);if(b.hit&&((H=b.data)!=null&&H.narrative)){const m=b.data.narrative;let y;return o==="narrative"?y={kind:s,mode:a,viewType:o,narrative:m}:o==="structured"?y={kind:s,mode:a,...Ct(m)}:o==="mindmap"?y={kind:s,mode:a,...Tt(m)}:y={kind:s,mode:a,...At(m)},await He(n,l,c||"anon",y),t.json({ok:!0,data:y,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const w=!!J(t.env.GEMINI_API_KEY).trim(),M=J(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&w&&!M)try{const m=await Er(t.env,i);let y;a==="brief"?y=m.brief:a==="standard"?y=m.standard:y=`**개념**
${m.detail.개념}

**영향**
${m.detail.영향}

**교육적 가치**
${m.detail["교육적 가치"]}`;const k={kind:s,mode:a,viewType:"narrative",narrative:y,allSummaries:{brief:m.brief,standard:m.standard,detail:m.detail},meta:m.meta};await He(n,h,c||"anon",k);let j;return o==="narrative"?j=k:o==="structured"?j={kind:s,mode:a,...Ct(y)}:o==="mindmap"?j={kind:s,mode:a,...Tt(y)}:j={kind:s,mode:a,...At(y)},await He(n,l,c||"anon",j),t.json({ok:!0,data:j,meta:{cached:!1,engine:"gemini-json-v3",elapsedMs:Date.now()-e}},200)}catch(m){console.error("[Gemini JSON Error]",m)}const P=xr(i,a,o);if(await He(n,l,c||"anon",P),P.narrative){const m={kind:"summary",mode:a,viewType:"narrative",narrative:P.narrative};await He(n,h,c||"anon",m)}return t.json({ok:!0,data:P,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});ne.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));ne.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const _t=new Xt,Cr=Object.assign({"/src/index.tsx":ne});let ln=!1;for(const[,t]of Object.entries(Cr))t&&(_t.route("/",t),_t.notFound(t.notFoundHandler),ln=!0);if(!ln)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{_t as default};
