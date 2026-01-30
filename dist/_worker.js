var tn=Object.defineProperty;var dt=t=>{throw TypeError(t)};var nn=(t,e,n)=>e in t?tn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var C=(t,e,n)=>nn(t,typeof e!="symbol"?e+"":e,n),nt=(t,e,n)=>e.has(t)||dt("Cannot "+n);var d=(t,e,n)=>(nt(t,e,"read from private field"),n?n.call(t):e.get(t)),R=(t,e,n)=>e.has(t)?dt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),$=(t,e,n,s)=>(nt(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),j=(t,e,n)=>(nt(t,e,"access private method"),n);var ut=(t,e,n,s)=>({set _(r){$(t,e,r,n)},get _(){return d(t,e,s)}});var ht=(t,e,n)=>(s,r)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,u;if(t[o]?(u=t[o][0][0],s.req.routeIndex=o):u=o===t.length&&r||void 0,u)try{c=await u(s,()=>a(o+1))}catch(h){if(h instanceof Error&&e)s.error=h,c=await e(h,s),l=!0;else throw h}else s.finalized===!1&&n&&(c=await n(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},sn=Symbol(),rn=async(t,e=Object.create(null))=>{const{all:n=!1,dot:s=!1}=e,i=(t instanceof kt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?an(t,{all:n,dot:s}):{}};async function an(t,e){const n=await t.formData();return n?on(n,e):{}}function on(t,e){const n=Object.create(null);return t.forEach((s,r)=>{e.all||r.endsWith("[]")?cn(n,r,s):n[r]=s}),e.dot&&Object.entries(n).forEach(([s,r])=>{s.includes(".")&&(ln(n,s,r),delete n[s])}),n}var cn=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},ln=(t,e,n)=>{let s=t;const r=e.split(".");r.forEach((i,a)=>{a===r.length-1?s[i]=n:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},At=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},dn=t=>{const{groups:e,path:n}=un(t),s=At(n);return hn(s,e)},un=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,s)=>{const r=`@${s}`;return e.push([r,n]),r}),{groups:e,path:t}},hn=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[s]=e[n];for(let r=t.length-1;r>=0;r--)if(t[r].includes(s)){t[r]=t[r].replace(s,e[n][1]);break}}return t},Fe={},fn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const s=`${t}#${e}`;return Fe[s]||(n[2]?Fe[s]=e&&e[0]!==":"&&e[0]!=="*"?[s,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Fe[s]=[t,n[1],!0]),Fe[s]}return null},lt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},pn=t=>lt(t,decodeURI),Rt=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let s=n;for(;s<e.length;s++){const r=e.charCodeAt(s);if(r===37){const i=e.indexOf("?",s),a=e.slice(n,i===-1?void 0:i);return pn(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(r===63)break}return e.slice(n,s)},mn=t=>{const e=Rt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},$e=(t,e,...n)=>(n.length&&(e=$e(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Mt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let s="";return e.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){n.length===0&&s===""?n.push("/"):n.push(s);const i=r.replace("?","");s+="/"+i,n.push(s)}else s+="/"+r}),n.filter((r,i,a)=>a.indexOf(r)===i)},st=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?lt(t,jt):t):t,Nt=(t,e,n)=>{let s;if(!n&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return st(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(s=/[%+]/.test(t),!s)return}const r={};s??(s=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(s&&(c=st(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),s&&(l=st(l))),n?(r[c]&&Array.isArray(r[c])||(r[c]=[]),r[c].push(l)):r[c]??(r[c]=l)}return e?r[e]:r},gn=Nt,xn=(t,e)=>Nt(t,e,!0),jt=decodeURIComponent,ft=t=>lt(t,jt),Ce,X,ae,It,Pt,ot,ce,Et,kt=(Et=class{constructor(t,e="/",n=[[]]){R(this,ae);C(this,"raw");R(this,Ce);R(this,X);C(this,"routeIndex",0);C(this,"path");C(this,"bodyCache",{});R(this,ce,t=>{const{bodyCache:e,raw:n}=this,s=e[t];if(s)return s;const r=Object.keys(e)[0];return r?e[r].then(i=>(r==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,$(this,X,n),$(this,Ce,{})}param(t){return t?j(this,ae,It).call(this,t):j(this,ae,Pt).call(this)}query(t){return gn(this.url,t)}queries(t){return xn(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,s)=>{e[s]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await rn(this,t))}json(){return d(this,ce).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,ce).call(this,"text")}arrayBuffer(){return d(this,ce).call(this,"arrayBuffer")}blob(){return d(this,ce).call(this,"blob")}formData(){return d(this,ce).call(this,"formData")}addValidatedData(t,e){d(this,Ce)[t]=e}valid(t){return d(this,Ce)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[sn](){return d(this,X)}get matchedRoutes(){return d(this,X)[0].map(([[,t]])=>t)}get routePath(){return d(this,X)[0].map(([[,t]])=>t)[this.routeIndex].path}},Ce=new WeakMap,X=new WeakMap,ae=new WeakSet,It=function(t){const e=d(this,X)[0][this.routeIndex][1][t],n=j(this,ae,ot).call(this,e);return n&&/\%/.test(n)?ft(n):n},Pt=function(){const t={},e=Object.keys(d(this,X)[0][this.routeIndex][1]);for(const n of e){const s=j(this,ae,ot).call(this,d(this,X)[0][this.routeIndex][1][n]);s!==void 0&&(t[n]=/\%/.test(s)?ft(s):s)}return t},ot=function(t){return d(this,X)[1]?d(this,X)[1][t]:t},ce=new WeakMap,Et),bn={Stringify:1},Lt=async(t,e,n,s,r)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(r?r[0]+=t:r=[t],Promise.all(i.map(o=>o({phase:e,buffer:r,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(c=>Lt(c,e,!1,s,r))).then(()=>r[0]))):Promise.resolve(t)},vn="text/plain; charset=UTF-8",rt=(t,e)=>({"Content-Type":t,...e}),Be,qe,ne,Ae,se,Y,Ge,Re,Me,xe,Ke,Ue,le,Te,Ot,wn=(Ot=class{constructor(t,e){R(this,le);R(this,Be);R(this,qe);C(this,"env",{});R(this,ne);C(this,"finalized",!1);C(this,"error");R(this,Ae);R(this,se);R(this,Y);R(this,Ge);R(this,Re);R(this,Me);R(this,xe);R(this,Ke);R(this,Ue);C(this,"render",(...t)=>(d(this,Re)??$(this,Re,e=>this.html(e)),d(this,Re).call(this,...t)));C(this,"setLayout",t=>$(this,Ge,t));C(this,"getLayout",()=>d(this,Ge));C(this,"setRenderer",t=>{$(this,Re,t)});C(this,"header",(t,e,n)=>{this.finalized&&$(this,Y,new Response(d(this,Y).body,d(this,Y)));const s=d(this,Y)?d(this,Y).headers:d(this,xe)??$(this,xe,new Headers);e===void 0?s.delete(t):n!=null&&n.append?s.append(t,e):s.set(t,e)});C(this,"status",t=>{$(this,Ae,t)});C(this,"set",(t,e)=>{d(this,ne)??$(this,ne,new Map),d(this,ne).set(t,e)});C(this,"get",t=>d(this,ne)?d(this,ne).get(t):void 0);C(this,"newResponse",(...t)=>j(this,le,Te).call(this,...t));C(this,"body",(t,e,n)=>j(this,le,Te).call(this,t,e,n));C(this,"text",(t,e,n)=>!d(this,xe)&&!d(this,Ae)&&!e&&!n&&!this.finalized?new Response(t):j(this,le,Te).call(this,t,e,rt(vn,n)));C(this,"json",(t,e,n)=>j(this,le,Te).call(this,JSON.stringify(t),e,rt("application/json",n)));C(this,"html",(t,e,n)=>{const s=r=>j(this,le,Te).call(this,r,e,rt("text/html; charset=UTF-8",n));return typeof t=="object"?Lt(t,bn.Stringify,!1,{}).then(s):s(t)});C(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});C(this,"notFound",()=>(d(this,Me)??$(this,Me,()=>new Response),d(this,Me).call(this,this)));$(this,Be,t),e&&($(this,se,e.executionCtx),this.env=e.env,$(this,Me,e.notFoundHandler),$(this,Ue,e.path),$(this,Ke,e.matchResult))}get req(){return d(this,qe)??$(this,qe,new kt(d(this,Be),d(this,Ue),d(this,Ke))),d(this,qe)}get event(){if(d(this,se)&&"respondWith"in d(this,se))return d(this,se);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,se))return d(this,se);throw Error("This context has no ExecutionContext")}get res(){return d(this,Y)||$(this,Y,new Response(null,{headers:d(this,xe)??$(this,xe,new Headers)}))}set res(t){if(d(this,Y)&&t){t=new Response(t.body,t);for(const[e,n]of d(this,Y).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const s=d(this,Y).headers.getSetCookie();t.headers.delete("set-cookie");for(const r of s)t.headers.append("set-cookie",r)}else t.headers.set(e,n)}$(this,Y,t),this.finalized=!0}get var(){return d(this,ne)?Object.fromEntries(d(this,ne)):{}}},Be=new WeakMap,qe=new WeakMap,ne=new WeakMap,Ae=new WeakMap,se=new WeakMap,Y=new WeakMap,Ge=new WeakMap,Re=new WeakMap,Me=new WeakMap,xe=new WeakMap,Ke=new WeakMap,Ue=new WeakMap,le=new WeakSet,Te=function(t,e,n){const s=d(this,Y)?new Headers(d(this,Y).headers):d(this,xe)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?s.append(a,o):s.set(a,o)}if(n)for(const[i,a]of Object.entries(n))if(typeof a=="string")s.set(i,a);else{s.delete(i);for(const o of a)s.append(i,o)}const r=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,Ae);return new Response(t,{status:r,headers:s})},Ot),K="ALL",yn="all",Sn=["get","post","put","delete","options","patch"],Ht="Can not add a route since the matcher is already built.",Dt=class extends Error{},En="__COMPOSED_HANDLER",On=t=>t.text("404 Not Found",404),pt=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},V,U,Bt,Q,me,Je,Ye,Ne,$n=(Ne=class{constructor(e={}){R(this,U);C(this,"get");C(this,"post");C(this,"put");C(this,"delete");C(this,"options");C(this,"patch");C(this,"all");C(this,"on");C(this,"use");C(this,"router");C(this,"getPath");C(this,"_basePath","/");R(this,V,"/");C(this,"routes",[]);R(this,Q,On);C(this,"errorHandler",pt);C(this,"onError",e=>(this.errorHandler=e,this));C(this,"notFound",e=>($(this,Q,e),this));C(this,"fetch",(e,...n)=>j(this,U,Ye).call(this,e,n[1],n[0],e.method));C(this,"request",(e,n,s,r)=>e instanceof Request?this.fetch(n?new Request(e,n):e,s,r):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${$e("/",e)}`,n),s,r)));C(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(j(this,U,Ye).call(this,e.request,e,void 0,e.request.method))})});[...Sn,yn].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?$(this,V,a):j(this,U,me).call(this,i,d(this,V),a),o.forEach(c=>{j(this,U,me).call(this,i,d(this,V),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){$(this,V,c);for(const l of[i].flat())o.map(u=>{j(this,U,me).call(this,l.toUpperCase(),d(this,V),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?$(this,V,i):($(this,V,"*"),a.unshift(i)),a.forEach(o=>{j(this,U,me).call(this,K,d(this,V),o)}),this);const{strict:s,...r}=e;Object.assign(this,r),this.getPath=s??!0?e.getPath??Rt:mn}route(e,n){const s=this.basePath(e);return n.routes.map(r=>{var a;let i;n.errorHandler===pt?i=r.handler:(i=async(o,c)=>(await ht([],n.errorHandler)(o,()=>r.handler(o,c))).res,i[En]=r.handler),j(a=s,U,me).call(a,r.method,r.path,i)}),this}basePath(e){const n=j(this,U,Bt).call(this);return n._basePath=$e(this._basePath,e),n}mount(e,n,s){let r,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?r=c=>c:r=s.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};r||(r=(()=>{const c=$e(this._basePath,e),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const o=async(c,l)=>{const u=await n(r(c.req.raw),...a(c));if(u)return u;await l()};return j(this,U,me).call(this,K,$e(e,"*"),o),this}},V=new WeakMap,U=new WeakSet,Bt=function(){const e=new Ne({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,$(e,Q,d(this,Q)),e.routes=this.routes,e},Q=new WeakMap,me=function(e,n,s){e=e.toUpperCase(),n=$e(this._basePath,n);const r={basePath:this._basePath,path:n,method:e,handler:s};this.router.add(e,n,[s,r]),this.routes.push(r)},Je=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},Ye=function(e,n,s,r){if(r==="HEAD")return(async()=>new Response(null,await j(this,U,Ye).call(this,e,n,s,"GET")))();const i=this.getPath(e,{env:s}),a=this.router.match(r,i),o=new wn(e,{path:i,matchResult:a,env:s,executionCtx:n,notFoundHandler:d(this,Q)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await d(this,Q).call(this,o)})}catch(u){return j(this,U,Je).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,Q).call(this,o))).catch(u=>j(this,U,Je).call(this,u,o)):l??d(this,Q).call(this,o)}const c=ht(a[0],this.errorHandler,d(this,Q));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return j(this,U,Je).call(this,l,o)}})()},Ne),qt=[];function Tn(t,e){const n=this.buildAllMatchers(),s=(r,i)=>{const a=n[r]||n[K],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],qt];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=s,s(t,e)}var Qe="[^/]+",He=".*",De="(?:|/.*)",_e=Symbol(),_n=new Set(".\\+*[^]$()");function Cn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===He||t===De?1:e===He||e===De?-1:t===Qe?1:e===Qe?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var be,ve,Z,Ee,An=(Ee=class{constructor(){R(this,be);R(this,ve);R(this,Z,Object.create(null))}insert(e,n,s,r,i){if(e.length===0){if(d(this,be)!==void 0)throw _e;if(i)return;$(this,be,n);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",He]:["","",Qe]:a==="/*"?["","",De]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Qe;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw _e;if(l=d(this,Z)[h],!l){if(Object.keys(d(this,Z)).some(w=>w!==He&&w!==De))throw _e;if(i)return;l=d(this,Z)[h]=new Ee,u!==""&&$(l,ve,r.varIndex++)}!i&&u!==""&&s.push([u,d(l,ve)])}else if(l=d(this,Z)[a],!l){if(Object.keys(d(this,Z)).some(u=>u.length>1&&u!==He&&u!==De))throw _e;if(i)return;l=d(this,Z)[a]=new Ee}l.insert(o,n,s,r,i)}buildRegExpStr(){const n=Object.keys(d(this,Z)).sort(Cn).map(s=>{const r=d(this,Z)[s];return(typeof d(r,ve)=="number"?`(${s})@${d(r,ve)}`:_n.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof d(this,be)=="number"&&n.unshift(`#${d(this,be)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},be=new WeakMap,ve=new WeakMap,Z=new WeakMap,Ee),et,ze,$t,Rn=($t=class{constructor(){R(this,et,{varIndex:0});R(this,ze,new An)}insert(t,e,n){const s=[],r=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return r[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=r.length-1;a>=0;a--){const[o]=r[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,r[a][1]);break}}return d(this,ze).insert(i,e,s,d(this,et),n),s}buildRegExp(){let t=d(this,ze).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],s=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,i,a)=>i!==void 0?(n[++e]=Number(i),"$()"):(a!==void 0&&(s[Number(a)]=++e),"")),[new RegExp(`^${t}`),n,s]}},et=new WeakMap,ze=new WeakMap,$t),Mn=[/^$/,[],Object.create(null)],We=Object.create(null);function Gt(t){return We[t]??(We[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Nn(){We=Object.create(null)}function jn(t){var l;const e=new Rn,n=[];if(t.length===0)return Mn;const s=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[w,T])=>u?1:w?-1:h.length-T.length),r=Object.create(null);for(let u=0,h=-1,w=s.length;u<w;u++){const[T,M,k]=s[u];T?r[M]=[k.map(([b])=>[b,Object.create(null)]),qt]:h++;let A;try{A=e.insert(M,h,T)}catch(b){throw b===_e?new Dt(M):b}T||(n[h]=k.map(([b,v])=>{const _=Object.create(null);for(v-=1;v>=0;v--){const[I,m]=A[v];_[I]=m}return[b,_]}))}const[i,a,o]=e.buildRegExp();for(let u=0,h=n.length;u<h;u++)for(let w=0,T=n[u].length;w<T;w++){const M=(l=n[u][w])==null?void 0:l[1];if(!M)continue;const k=Object.keys(M);for(let A=0,b=k.length;A<b;A++)M[k[A]]=o[M[k[A]]]}const c=[];for(const u in a)c[u]=n[a[u]];return[i,c,r]}function Oe(t,e){if(t){for(const n of Object.keys(t).sort((s,r)=>r.length-s.length))if(Gt(n).test(e))return[...t[n]]}}var de,ue,tt,Kt,Tt,kn=(Tt=class{constructor(){R(this,tt);C(this,"name","RegExpRouter");R(this,de);R(this,ue);C(this,"match",Tn);$(this,de,{[K]:Object.create(null)}),$(this,ue,{[K]:Object.create(null)})}add(t,e,n){var o;const s=d(this,de),r=d(this,ue);if(!s||!r)throw new Error(Ht);s[t]||[s,r].forEach(c=>{c[t]=Object.create(null),Object.keys(c[K]).forEach(l=>{c[t][l]=[...c[K][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Gt(e);t===K?Object.keys(s).forEach(l=>{var u;(u=s[l])[e]||(u[e]=Oe(s[l],e)||Oe(s[K],e)||[])}):(o=s[t])[e]||(o[e]=Oe(s[t],e)||Oe(s[K],e)||[]),Object.keys(s).forEach(l=>{(t===K||t===l)&&Object.keys(s[l]).forEach(u=>{c.test(u)&&s[l][u].push([n,i])})}),Object.keys(r).forEach(l=>{(t===K||t===l)&&Object.keys(r[l]).forEach(u=>c.test(u)&&r[l][u].push([n,i]))});return}const a=Mt(e)||[e];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(r).forEach(h=>{var w;(t===K||t===h)&&((w=r[h])[u]||(w[u]=[...Oe(s[h],u)||Oe(s[K],u)||[]]),r[h][u].push([n,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,ue)).concat(Object.keys(d(this,de))).forEach(e=>{t[e]||(t[e]=j(this,tt,Kt).call(this,e))}),$(this,de,$(this,ue,void 0)),Nn(),t}},de=new WeakMap,ue=new WeakMap,tt=new WeakSet,Kt=function(t){const e=[];let n=t===K;return[d(this,de),d(this,ue)].forEach(s=>{const r=s[t]?Object.keys(s[t]).map(i=>[i,s[t][i]]):[];r.length!==0?(n||(n=!0),e.push(...r)):t!==K&&e.push(...Object.keys(s[K]).map(i=>[i,s[K][i]]))}),n?jn(e):null},Tt),he,re,_t,In=(_t=class{constructor(t){C(this,"name","SmartRouter");R(this,he,[]);R(this,re,[]);$(this,he,t.routers)}add(t,e,n){if(!d(this,re))throw new Error(Ht);d(this,re).push([t,e,n])}match(t,e){if(!d(this,re))throw new Error("Fatal error");const n=d(this,he),s=d(this,re),r=n.length;let i=0,a;for(;i<r;i++){const o=n[i];try{for(let c=0,l=s.length;c<l;c++)o.add(...s[c]);a=o.match(t,e)}catch(c){if(c instanceof Dt)continue;throw c}this.match=o.match.bind(o),$(this,he,[o]),$(this,re,void 0);break}if(i===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(d(this,re)||d(this,he).length!==1)throw new Error("No active router has been determined yet.");return d(this,he)[0]}},he=new WeakMap,re=new WeakMap,_t),Pe=Object.create(null),fe,J,we,je,z,ie,ge,ke,Pn=(ke=class{constructor(e,n,s){R(this,ie);R(this,fe);R(this,J);R(this,we);R(this,je,0);R(this,z,Pe);if($(this,J,s||Object.create(null)),$(this,fe,[]),e&&n){const r=Object.create(null);r[e]={handler:n,possibleKeys:[],score:0},$(this,fe,[r])}$(this,we,[])}insert(e,n,s){$(this,je,++ut(this,je)._);let r=this;const i=dn(n),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],u=i[o+1],h=fn(l,u),w=Array.isArray(h)?h[0]:l;if(w in d(r,J)){r=d(r,J)[w],h&&a.push(h[1]);continue}d(r,J)[w]=new ke,h&&(d(r,we).push(h),a.push(h[1])),r=d(r,J)[w]}return d(r,fe).push({[e]:{handler:s,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,je)}}),r}search(e,n){var c;const s=[];$(this,z,Pe);let i=[this];const a=At(n),o=[];for(let l=0,u=a.length;l<u;l++){const h=a[l],w=l===u-1,T=[];for(let M=0,k=i.length;M<k;M++){const A=i[M],b=d(A,J)[h];b&&($(b,z,d(A,z)),w?(d(b,J)["*"]&&s.push(...j(this,ie,ge).call(this,d(b,J)["*"],e,d(A,z))),s.push(...j(this,ie,ge).call(this,b,e,d(A,z)))):T.push(b));for(let v=0,_=d(A,we).length;v<_;v++){const I=d(A,we)[v],m=d(A,z)===Pe?{}:{...d(A,z)};if(I==="*"){const S=d(A,J)["*"];S&&(s.push(...j(this,ie,ge).call(this,S,e,d(A,z))),$(S,z,m),T.push(S));continue}const[D,O,x]=I;if(!h&&!(x instanceof RegExp))continue;const f=d(A,J)[D],y=a.slice(l).join("/");if(x instanceof RegExp){const S=x.exec(y);if(S){if(m[O]=S[0],s.push(...j(this,ie,ge).call(this,f,e,d(A,z),m)),Object.keys(d(f,J)).length){$(f,z,m);const p=((c=S[0].match(/\//))==null?void 0:c.length)??0;(o[p]||(o[p]=[])).push(f)}continue}}(x===!0||x.test(h))&&(m[O]=h,w?(s.push(...j(this,ie,ge).call(this,f,e,m,d(A,z))),d(f,J)["*"]&&s.push(...j(this,ie,ge).call(this,d(f,J)["*"],e,m,d(A,z)))):($(f,z,m),T.push(f)))}}i=T.concat(o.shift()??[])}return s.length>1&&s.sort((l,u)=>l.score-u.score),[s.map(({handler:l,params:u})=>[l,u])]}},fe=new WeakMap,J=new WeakMap,we=new WeakMap,je=new WeakMap,z=new WeakMap,ie=new WeakSet,ge=function(e,n,s,r){const i=[];for(let a=0,o=d(e,fe).length;a<o;a++){const c=d(e,fe)[a],l=c[n]||c[K],u={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),s!==Pe||r&&r!==Pe))for(let h=0,w=l.possibleKeys.length;h<w;h++){const T=l.possibleKeys[h],M=u[l.score];l.params[T]=r!=null&&r[T]&&!M?r[T]:s[T]??(r==null?void 0:r[T]),u[l.score]=!0}}return i},ke),ye,Ct,Ln=(Ct=class{constructor(){C(this,"name","TrieRouter");R(this,ye);$(this,ye,new Pn)}add(t,e,n){const s=Mt(e);if(s){for(let r=0,i=s.length;r<i;r++)d(this,ye).insert(t,s[r],n);return}d(this,ye).insert(t,e,n)}match(t,e){return d(this,ye).search(t,e)}},ye=new WeakMap,Ct),Ut=class extends $n{constructor(t={}){super(t),this.router=t.router??new In({routers:[new kn,new Ln]})}},Hn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},s=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(n.origin),r=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(a,o){var u;function c(h,w){a.res.headers.set(h,w)}const l=await s(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(u=n.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),a.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const h=await r(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let w=n.allowHeaders;if(!(w!=null&&w.length)){const T=a.req.header("Access-Control-Request-Headers");T&&(w=T.split(/\s*,\s*/))}return w!=null&&w.length&&(c("Access-Control-Allow-Headers",w.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Dn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,mt=(t,e=qn)=>{const n=/\.([a-zA-Z0-9]+?)$/,s=t.match(n);if(!s)return;let r=e[s[1]];return r&&r.startsWith("text")&&(r+="; charset=utf-8"),r},Bn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},qn=Bn,Gn=(...t)=>{let e=t.filter(r=>r!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),s=[];for(const r of n)r===".."&&s.length>0&&s.at(-1)!==".."?s.pop():r!=="."&&s.push(r);return s.join("/")||"."},zt={br:".br",zstd:".zst",gzip:".gz"},Kn=Object.keys(zt),Un="index.html",zn=t=>{const e=t.root??"./",n=t.path,s=t.join??Gn;return async(r,i)=>{var u,h,w,T;if(r.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(r.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,r.req.path,r)),i()}let o=s(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=s(o,Un));const c=t.getContent;let l=await c(o,r);if(l instanceof Response)return r.newResponse(l.body,l);if(l){const M=t.mimes&&mt(o,t.mimes)||mt(o);if(r.header("Content-Type",M||"application/octet-stream"),t.precompressed&&(!M||Dn.test(M))){const k=new Set((h=r.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(A=>A.trim()));for(const A of Kn){if(!k.has(A))continue;const b=await c(o+zt[A],r);if(b){l=b,r.header("Content-Encoding",A),r.header("Vary","Accept-Encoding",{append:!0});break}}}return await((w=t.onFound)==null?void 0:w.call(t,o,r)),r.body(l)}await((T=t.onNotFound)==null?void 0:T.call(t,o,r)),await i()}},Fn=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let s;e&&e.namespace?s=e.namespace:s=__STATIC_CONTENT;const r=n[t];if(!r)return null;const i=await s.get(r,{type:"stream"});return i||null},Jn=t=>async function(n,s){return zn({...t,getContent:async i=>Fn(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,s)},Yn=t=>Jn(t);const te=new Ut,Xe=new Map,Wn=1e3*60*60*24*7;let it=!1;function Ft(){return new Date().toISOString()}function F(t){return t==null?"":String(t)}function Se(t,e,n){return Math.max(e,Math.min(n,t))}function ct(t){return(t||"").replace(/\s+/g,"")}function ee(t){return ct(t).length}const gt={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}};function Xn(t){return gt[t]||gt.standard}function Ve(t,e){const n=Math.max(50,ee(t)),{min:s,max:r}=Xn(e);return{base:n,min:Math.floor(n*s),max:Math.ceil(n*r)}}function Jt(t){const e=F(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Yt(t){const e=F(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function Vn(t){const e=F(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function Wt(t){const e=(t||"").replace(/\s+/g," ").trim();if(!e)return[];const n=[];let s="",r=!1;for(let i=0;i<e.length;i++){const a=e[i],o=e[i+1];(a==='"'||a==='"'||a==='"')&&(r=!r),s+=a,!r&&/[\.\?\!]/.test(a)&&o===" "?a==="."&&s.endsWith("...")||(n.push(s.trim()),s="",i++):!r&&/[다요죠]/.test(a)&&o===" "&&(n.push(s.trim()),s="",i++)}return s.trim()&&n.push(s.trim()),n.length?n:[e]}const Qn=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),Zn=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function es(t){const e=new Set;for(const n of t){let s=!1;for(const r of Zn)if(r.has(n)){e.add(Array.from(r)[0]),s=!0;break}s||e.add(n)}return e}function Ze(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!Qn.has(e))}function ts(t){const e=new Map;for(const s of t)for(const r of Ze(s))e.set(r,(e.get(r)||0)+1);return t.map((s,r)=>{const i=Ze(s);let a=0;for(const l of i)a+=e.get(l)||0;const o=s.length,c=o<15?.7:o>180?.85:1;return{idx:r,s,score:a*c}})}function ns(t,e){return ts(t).slice().sort((r,i)=>i.score-r.score).slice(0,Se(e,1,Math.max(1,t.length))).sort((r,i)=>r.idx-i.idx).map(r=>r.s)}function Xt(t){let e=(t||"").trim();e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/특정\s+공간\s+인/g,"특정 공간인"),e=e.replace(/(\S+)\s+\1/g,"$1"),e=e.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const n=e.split(new RegExp("(?<=다\\.)\\s+")),s=new Set,r=[];for(const i of n){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(s.has(o))continue;s.add(o)}r.push(i)}return e=r.join(" "),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function Vt(t){const e=Math.max(200,ee(t)),n=Ve(t,"brief"),s=Ve(t,"standard"),r=Ve(t,"detail"),i=Se(n.min+Math.round((n.max-n.min)*.5),n.min,n.max),a=Se(Math.max(s.min,i+40),s.min,s.max),o=Se(Math.max(r.min,a+120),r.min,r.max);return{base:e,brief:i,standard:a,detail:o}}function ss(t){const e=Vt(t);return`
당신은 교육/학습 연구 텍스트를 3단계(간단/표준/상세)로 "생성적 요약(Abstractive Summarization)" 방식으로 요약하는 전문 엔진입니다.

[입력 원문]
"""${t}"""

[요약 작업 전 세팅 규칙 - 반드시 준수]
1. 비율 준수: 간단 10~15%, 표준 25~30%, 상세 45~55% (공백 제외 글자수 기준 엄수)
2. 텍스트 정제: 원문의 잡음(페이지 번호, 오타, 특수기호, 질문형 문장) 제거 및 자연스러운 학술적 평서문으로 재구성
3. 정보 계층화: 상세 요약으로 갈수록 정보의 양뿐만 아니라 '학술적 논거'와 '세부 지표'의 깊이를 더할 것
4. 퀴즈 최적화: 퀴즈 출제가 가능하도록 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치할 것

[요약 원칙]
1) "간단 < 표준 < 상세" 글자수 단조 증가는 절대적 기준. 역전 금지.
2) 단순 추출/복붙 금지: 원문 문장을 그대로 길게 가져오지 말고 생성적으로 재구성하여 매끄러운 글 작성
3) 원문에 없는 정보/인용/사례 추가 금지 (할루시네이션 금지)
4) 세 요약은 내용과 표현이 "거의 동일"하면 실패 (중복 금지)
5) 스마트 편집:
   - 원문의 중복 표현은 하나로 통합
   - 전문 용어는 일관성 있게 통일
   - 한 문장이 2줄을 넘지 않도록 단문 위주로 리드미컬하게 끊어서 작성
   - 페이지 번호(p.XX), 특수기호 제거, 질문형 문장은 평서문으로 전환

[길이 목표(공백 제외 글자수)]
- 간단: ${e.brief}자 내외 (원문 10~15%, 핵심만 간결하게)
- 표준: ${e.standard}자 내외 (원문 25~30%, 주요 논거 포함)
- 상세: ${e.detail}자 내외 (원문 45~55%, 학술적 논거+세부 지표+인과관계 명시, 아래 소제목 3개)

[상세 요약 소제목(반드시 그대로 사용)]
- 개념
- 영향
- 교육적 가치

[퀴즈 연동 강조]
모든 요약문은 향후 퀴즈 생성의 근거가 됩니다. 특히 상세 요약에서는:
- 전문 용어(예: DLPFC, OFC 등)와 개념 간의 **인과관계**를 생략하지 말 것
- 학습 유형, 뇌 영역, 발달 단계 등의 **지식 앵커(Anchors)**를 명확히 확보할 것
- 퀴즈 문항으로 변환 가능한 구체적 사실과 관계를 문장 내에 배치할 것

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
`.trim()}const rs={definition:["의미","정의","사전","생태학적","개념","이란","무엇","장소"],meaning:["의미","가치","치유","안정","교육적","기능","중요","효과"],activity:["체험","활동","교육","놀이","경험","학습","탐색","참여"]};function xt(t){const e={definition:0,meaning:0,activity:0};for(const[s,r]of Object.entries(rs))for(const i of r)t.includes(i)&&e[s]++;const n=Math.max(e.definition,e.meaning,e.activity);return n===0?null:e.definition===n?"definition":e.meaning===n?"meaning":"activity"}function is(t,e,n){const s=ee(e),r=[],i=new Set,a=/\(([^)]+,?\s*\d{4})\)/g;let o;for(;(o=a.exec(e))!==null;)i.add(o[1]);for(const b of t){const v=[];let _;const I=/\(([^)]+,?\s*\d{4})\)/g;for(;(_=I.exec(b))!==null;){const O=_[1];i.has(O)&&v.push(O)}let m=b.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(m.length<10)continue;const D=Ze(m).slice(0,8);r.push({original:b,clean:m,keywords:D,citations:v}),m.includes("(")&&console.log("[DEBUG] 인용 미제거:",m.slice(0,100))}if(r.length===0)return"요약할 내용이 부족합니다.";const c=new Map;for(const b of r)for(const v of b.keywords)c.set(v,(c.get(v)||0)+1);const l=[];for(const b of r){new Set(b.keywords);let v=!1;for(const _ of l)if(b.keywords.filter(m=>_.keywords.has(m)).length>=2){_.sentences.push({clean:b.clean,citations:b.citations}),b.keywords.forEach(m=>_.keywords.add(m)),v=!0;break}v||l.push({keywords:new Set(b.keywords),sentences:[{clean:b.clean,citations:b.citations}]})}const u=l.map(b=>{const v=b.sentences[0].clean,_=r.findIndex(I=>I.clean===v);return{...b,originalIdx:_}});let h="";if(n==="brief"){const b={definition:[],meaning:[],activity:[]};for(const g of u)for(const E of g.sentences){const N=xt(E.clean);N&&b[N].push(E)}const v=b.definition[0],_=b.meaning[0],I=b.activity[0],m=[],D=[];if(v&&(m.push(v.clean),D.push(...v.citations.filter(Boolean))),_&&(m.push(_.clean),D.push(..._.citations.filter(Boolean))),I&&(m.push(I.clean),D.push(...I.citations.filter(Boolean))),m.length===0){const E=u.sort((N,P)=>P.sentences.length-N.sentences.length)[0].sentences[0];m.push(E.clean),D.push(...E.citations.filter(Boolean))}const O=Array.from(new Set(D)),x=O.length>0?`(${O.join("; ")})`:"",f=m.map(g=>{let E=g;for(;E.includes("(");)E=E.replace(/\([^)]*\)/g,"");return E.trim()});f.length===1?h=`${f[0]}${x}.`:f.length===2?h=`${f[0]}. ${f[1]}${x}.`:h=`${f[0]}하며 ${f[1]}. ${f[2]}${x}.`;const S=ee(h)/s*100;if(S>15){let g=h.slice(0,60);g=g.replace(/\([^)]*\)/g,"").trim(),h=g+(x?` ${x}.`:".")}const p=[];return v&&p.push("definition"),_&&p.push("meaning"),I&&p.push("activity"),typeof console<"u"&&console.log("[Brief Summary Meta]",{rolesFilled:p,sentenceCount:m.length,compressionRatio:S.toFixed(1)+"%",passed:S<=15}),h=at(e,h,"brief",t),h}if(n==="standard"){const b=u.sort((g,E)=>E.sentences.length-g.sentences.length).slice(0,3).sort((g,E)=>g.originalIdx-E.originalIdx);if(b.length===1){const g=b[0].sentences[0],E=b[0].sentences.flatMap(P=>P.citations).filter(Boolean),N=E.length>0?`(${E.join("; ")})`:"";return`${g.clean}${N}.`}const v=new Map,_=new Map,I={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const g of b)for(const E of g.sentences){const N=E.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(N){let[,P,q]=N;P=P.replace(/[에게서로부터]$/g,"").trim(),v.has(P)||v.set(P,[]);let G=q.trim();G=G.replace(/[\.。\?\!]+$/g,"").trim();for(const[B,pe]of Object.entries(I))if(G.includes(B)){const oe=_.get(B)||0;if(_.set(B,oe+1),oe>=1&&pe.length>0){const Ie=Math.min(oe-1,pe.length-1);G=G.replace(B,pe[Ie])}}const L=new Set(Ze(G)),H=es(L),W=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const B of W)H.delete(B);v.get(P).push({original:G,keywords:H,citations:E.citations})}}const m=[];for(const[g,E]of v.entries()){const N=E.flatMap(L=>L.citations).filter(Boolean),P=g.charAt(g.length-1),G=/[가-힣]/.test(P)&&(P.charCodeAt(0)-44032)%28!==0?"은":"는";if(E.length===1){const L=E[0].original,H=(L.match(/,/g)||[]).length;if(L.length>80&&H>=2){const W=L.split(",").map(B=>B.trim()).filter(B=>B.length>0);if(W.length>=2){m.push({text:`${g}${G} ${W[0]}`,citations:[]});for(let B=1;B<W.length-1;B++)m.push({text:`${W[B]}`,citations:[]});m.push({text:`${W[W.length-1]}`,citations:E[0].citations})}else m.push({text:`${g}${G} ${L}`,citations:N})}else m.push({text:`${g}${G} ${L}`,citations:N})}else{const L=[];for(const H of E){let W=!1;for(const B of L){const pe=Array.from(H.keywords).filter(Ie=>B.keywords.has(Ie)).length,oe=Math.max(H.keywords.size,B.keywords.size);if(oe>0&&pe/oe>=.8){H.original.length>B.original.length&&(B.original=H.original,B.keywords=H.keywords),B.citations.push(...H.citations),W=!0;break}}W||L.push({original:H.original,keywords:H.keywords,citations:[...H.citations]})}if(L.length===1)m.push({text:`${g}${G} ${L[0].original}`,citations:L.flatMap(H=>H.citations)});else if(L.length===2)m.push({text:`${g}${G} ${L[0].original}`,citations:L[0].citations}),m.push({text:`${g}${G} ${L[1].original}`,citations:L[1].citations});else for(let H=0;H<L.length;H++)m.push({text:`${g}${G} ${L[H].original}`,citations:L[H].citations})}}if(m.length===0)return"요약할 내용이 부족합니다.";if(m.length===1){const g=m[0].citations.filter(Boolean),E=g.length>0?`(${g.join("; ")})`:"";return`${m[0].text}${E}.`}if(m.length===2){const g=m[0].citations.filter(Boolean),E=m[1].citations.filter(Boolean),N=g.length>0?`(${g.join("; ")})`:"",P=E.length>0?`(${E.join("; ")})`:"";return`${m[0].text}${N}. ${m[1].text}${P}.`}const D=[],O=m[0],x=O.citations.filter(Boolean),f=x.length>0?`(${x.join("; ")})`:"";if(D.push(`${O.text}${f}.`),m.length>=2){const g=m[1],E=g.citations.filter(Boolean),N=E.length>0?`(${E.join("; ")})`:"";D.push(`${g.text}${N}.`)}if(m.length>=3){const E=m.slice(2).map(N=>{const P=N.citations.filter(Boolean),q=P.length>0?`(${P.join("; ")})`:"";return`${N.text}${q}.`});D.push(E.join(" "))}h=D.join(`

`);const S=ee(h)/s*100;S>30&&(D.length>3?h=D.slice(0,3).join(`

`):h=D.join(`

`));const p=[];for(const g of b)for(const E of g.sentences){const N=xt(E.clean);N&&!p.includes(N)&&p.push(N)}return typeof console<"u"&&console.log("[Standard Summary Meta]",{rolesFilled:p,sentenceCount:m.length,paragraphCount:D.length,compressionRatio:S.toFixed(1)+"%",passed:S>=25&&S<=30}),h=at(e,h,"standard",t),h}const w=u.sort((b,v)=>v.sentences.length-b.sentences.length).slice(0,5).sort((b,v)=>b.originalIdx-v.originalIdx);let T=w.map((b,v)=>{const _=b.sentences[0],I=b.sentences.flatMap(D=>D.citations).filter(Boolean),m=I.length>0?`(${I.join("; ")})`:"";return v===0?`${_.clean}${m}.`:v===w.length-1?`마지막으로 ${_.clean}${m}.`:`또한 ${_.clean}${m}.`}).join(" ");return ee(T)/s*100>(n==="brief"?15:n==="standard"?30:55)&&n==="detail"?w.slice(0,3).map((v,_)=>{const I=v.sentences[0],m=v.sentences.flatMap(O=>O.citations).filter(Boolean),D=m.length>0?`(${m.join("; ")})`:"";return _===0?`${I.clean}${D}.`:_===2?`마지막으로 ${I.clean}${D}.`:`또한 ${I.clean}${D}.`}).join(" "):(T=at(e,T,"detail",t),T)}function as(t,e,n){const s=Wt(t),r=e==="brief"?Se(Math.round(s.length*.18),2,4):e==="standard"?Se(Math.round(s.length*.28),4,8):Se(Math.round(s.length*.4),7,14),i=ns(s,r);if(n==="narrative"){let o=is(i,t,e);return o=Xt(o),{kind:"summary",mode:e,viewType:n,narrative:o}}if(n==="structured")return{kind:"summary",mode:e,viewType:n,structured:{title:"구조화 요약",bullets:i.map((o,c)=>`- (${c+1}) ${o}`)}};if(n==="mindmap"){const o=(i[0]||s[0]||"핵심").slice(0,40),c=[{id:"c",label:o,level:0}],l=[];return i.slice(1).forEach((u,h)=>{const w=`n${h+1}`;c.push({id:w,label:u.slice(0,60),level:1}),l.push({from:"c",to:w})}),{kind:"summary",mode:e,viewType:n,mindmap:{center:o,nodes:c,edges:l}}}const a=i.map((o,c)=>({id:`q${c+1}`,type:"short",question:`(${c+1}) 다음 내용을 한 문장으로 설명해보세요: "${o.slice(0,70)}"`,answerHint:o}));return{kind:"summary",mode:e,viewType:n,selftest:{title:"셀프테스트",questions:a}}}function Qt(t){if(!t)return"empty";let e=2166136261,n=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+a,n|=0}const s=(e>>>0).toString(16),r=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${s}_${r}`}function os(t,e,n,s){const r=Qt(n);return`${t}::${s||"anon"}::${e}::base::${r}`}function cs(t,e,n,s,r){const i=Qt(s);return`${t}::${r||"anon"}::${e}::${n}::${i}`}async function ls(t){if(!it){if(!t){it=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),it=!0}}async function bt(t,e){const n=Date.now(),s=Xe.get(e);if(s&&n-s.createdAt<Wn)return{hit:!0,data:s.data,store:"mem"};if(s&&Xe.delete(e),!t)return{hit:!1};const r=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(r!=null&&r.response_json))return{hit:!1};try{const i=JSON.parse(r.response_json);return Xe.set(e,{data:i,createdAt:n}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Le(t,e,n,s){const r=Date.now();Xe.set(e,{data:s,createdAt:r}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(s),Ft()).run()}function vt(t){const e=t.split(/\n\n+/).filter(s=>s.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((s,r)=>`- (${r+1}) ${s}`):t.split(/[\.。]\s+/).filter(s=>s.trim()).map((s,r)=>`- (${r+1}) ${s}.`)}}}function wt(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),n=(e[0]||"핵심").slice(0,40),s=[{id:"c",label:n,level:0}],r=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;s.push({id:o,label:i.slice(0,60),level:1}),r.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:n,nodes:s,edges:r}}}function yt(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(s=>s.trim()).map(s=>s.trim()).map((s,r)=>({id:`q${r+1}`,type:"short",question:`(${r+1}) 다음 내용을 한 문장으로 설명해보세요: "${s.slice(0,70)}"`,answerHint:s}))}}}async function ds(t,e){var c,l,u,h,w;const n=F(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const s=F(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const T=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(T.ok){const k=await T.json();return{ok:!0,text:((w=(h=(u=(l=(c=k==null?void 0:k.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:w.text)??"",raw:k}}if(T.status===429||T.status===503){await new Promise(k=>setTimeout(k,o)),o*=2;continue}const M=await T.text().catch(()=>"");throw new Error(`Gemini error ${T.status}: ${M.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function us(t,e,n){var l,u,h,w,T;const s=F(t.GEMINI_API_KEY).trim();if(!s)throw new Error("GEMINI_API_KEY is missing");const r=F(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(s)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const M=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(M.ok){const A=await M.json();return((T=(w=(h=(u=(l=A==null?void 0:A.candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:w[0])==null?void 0:T.text)??""}if(M.status===429||M.status===503){await new Promise(A=>setTimeout(A,c)),c*=2;continue}const k=await M.text().catch(()=>"");throw new Error(`Gemini error ${M.status}: ${k.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Zt(t,e){const n=await ds(t,e);return typeof n=="string"?n:((n==null?void 0:n.text)??"").toString()}async function hs(t,e){const n=ss(e);for(let s=1;s<=2;s++)try{let i=(await Zt(t,n)||"").trim();i.startsWith("```")&&(i=i.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/i,"").trim());const a=JSON.parse(i);if(!(a!=null&&a.brief)||!(a!=null&&a.standard)||!(a!=null&&a.detail))throw new Error("Missing required fields");if(!a.detail.개념||!a.detail.영향||!a.detail["교육적 가치"])throw new Error("Missing detail fields");const o=ee(a.brief),c=ee(a.standard),l=ee(a.detail.개념+a.detail.영향+a.detail["교육적 가치"]);return(o>=c||c>=l)&&console.warn("[SummaryJSON] monotonic violated",{bLen:o,sLen:c,dLen:l,attempt:s}),a}catch(r){if(console.error("[SummaryJSON] attempt failed",s,r==null?void 0:r.message),s===2){const i=Vt(e);return{meta:{base_chars_no_space:i.base,target:{brief:i.brief,standard:i.standard,detail:i.detail}},brief:"[JSON 실패] 요약 생성 실패",standard:"[JSON 실패] 요약 생성 실패",detail:{개념:"[실패]",영향:"[실패]","교육적 가치":"[실패]"}}}}throw new Error("summarizeWithJSON failed")}function at(t,e,n,s){const{min:r,max:i}=Ve(t,n);let a=(e||"").trim();const o=()=>ee(a),c=()=>{a=Xt(a),a=a.replace(/\s{2,}/g," ").trim()};if(c(),o()>i){const l=Wt(a);for(;l.length>1&&ee(l.join(" "))>i;)l.pop();a=l.join(" "),c()}if(o()<r){const l=(s||[]).map(u=>u.trim()).filter(Boolean);for(const u of l){if(o()>=r)break;const h=ct(u).slice(0,24);if(!(h&&ct(a).includes(h))&&(a=(a?a+" ":"")+u.replace(/[\.。\?\!]+$/g,"")+".",c(),o()>i))break}}return a}const fs=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},n={brief:6,standard:10,detail:14},s=["narrative","structured","mindmap"],r=["preview","exam"];function i(O){return(O||"").replace(/\s+/g,"")}function a(O,x){const y=Math.max(200,i(O||"").length),S=e[x]||e.standard,p=Math.floor(y*S.min),g=Math.ceil(y*S.max);return{base:y,min:Math.max(80,p),max:Math.max(120,g)}}function o(O){const x=(O||"").trim();return x?x.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(y=>y.trim()).filter(Boolean):[]}function c(O){return o(O).map((f,y)=>({sid:`S${y+1}`,text:f}))}function l(O,x,f){const y=O.find(S=>S.sid===x);return!y||!f||typeof f!="string"?!1:y.text.includes(f.trim())}function u(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:O,mode:x,format:f}){const y=a(O,x),S=f==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":f==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 원문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${x} (간단/표준/상세)`,`- 형식: ${f} (${S})`,`- 문자수 목표(공백 제외): 최소 ${y.min}자 ~ 최대 ${y.max}자`,"","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",O].join(`
`)}function w({summaryText:O,format:x}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
}`,"","[SUMMARY]",O].join(`
`)}function T({mode:O,purpose:x,format:f,summaryText:y,sentTable:S,anchors:p}){const g=n[O]||10,E=x==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",N=f==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":f==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${O} (문항수 ${g})`,`- 목적: ${x} (${E})`,`- 요약 형식: ${f} (${N})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(S,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[SUMMARY]",y].join(`
`)}function M(O,x){const f=x&&x.anchors?x.anchors:[],y=[],S=[];for(const p of f){const g=p==null?void 0:p.sid,E=p==null?void 0:p.quote;if(typeof(p==null?void 0:p.label)!="string"||!p.label.trim()){S.push({a:p,reason:"label missing"});continue}if(!l(O,g,E)){S.push({a:p,reason:"evidence not in sentence"});continue}y.push(p)}return{ok:y,bad:S}}function k(O,x){const f=x&&Array.isArray(x.items)?x.items:[],y=[],S=[];for(const p of f){const g=p==null?void 0:p.evidence;if(!(p!=null&&p.id)||!(p!=null&&p.question)||!(p!=null&&p.answer)||!(g!=null&&g.sid)||!(g!=null&&g.quote)){S.push({q:p,reason:"missing fields"});continue}if(!l(O,g.sid,g.quote)){S.push({q:p,reason:"evidence not in sentence"});continue}if(Array.isArray(p.choices)&&p.choices.length>0&&!p.choices.includes(p.answer)){S.push({q:p,reason:"answer not in choices"});continue}y.push(p)}return{ok:y,bad:S}}function A({summaryText:O,sentTable:x,anchors:f,badItems:y,mode:S,purpose:p,format:g}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${y.length}`,`- 모드: ${S}, 목적: ${p}, 형식: ${g}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(x,null,2),"","[ANCHORS]",JSON.stringify(f,null,2),"","[BAD ITEMS]",JSON.stringify(y,null,2),"","[SUMMARY]",O].join(`
`)}async function b({llmCall:O,originalText:x,mode:f,format:y}){if(!O)throw new Error("llmCall is required");e[f]||(f="standard"),s.includes(y)||(y="narrative");const S=h({originalText:x,mode:f,format:y}),p=(await O({system:u(),user:S,json:!1})||"").trim()||"",g=c(p),E=w({summaryText:p,format:y});let N=await O({system:u(),user:E,json:!0}),P;try{P=JSON.parse(N)}catch{P={anchors:[]}}const{ok:q}=M(g,P),G=q.length>=4?q:v(g);return{summaryText:p,sentTable:g,anchors:G}}function v(O){const x=[];for(let f=0;f<Math.min(8,O.length);f++){const y=O[f],S=(y.text||"").slice(0,18);x.push({id:`A${f+1}`,label:`문장 핵심${f+1}`,type:"claim",sid:y.sid,quote:S,note:"요약 문장 기반 안전 앵커"})}return x}async function _({llmCall:O,mode:x,purpose:f,format:y,summaryText:S,sentTable:p,anchors:g}){e[x]||(x="standard"),r.includes(f)||(f="preview"),s.includes(y)||(y="narrative");const E=T({mode:x,purpose:f,format:y,summaryText:S,sentTable:p,anchors:g});let N=await O({system:u(),user:E,json:!0}),P;try{P=JSON.parse(N)}catch{P={items:[]}}let{ok:q,bad:G}=k(p,P);if(G.length>0){const H=A({summaryText:S,sentTable:p,anchors:g,badItems:G.map(Ie=>Ie.q),mode:x,purpose:f,format:y});let W=await O({system:u(),user:H,json:!0}),B;try{B=JSON.parse(W)}catch{B={items:[]}}const pe=k(p,B);q=q.concat(pe.ok);const oe=n[x]||10;q=q.slice(0,oe)}else{const H=n[x]||10;q=q.slice(0,H)}const L=n[x]||10;if(q.length<L){const H=I({sentTable:p,anchors:g,count:L-q.length,format:y,purpose:f});q=q.concat(H).slice(0,L)}return{items:q}}function I({sentTable:O,anchors:x,count:f,format:y,purpose:S}){const p=[],g=x.slice(0,Math.max(f,1));for(let E=0;E<f;E++){const N=g[E%g.length],P=N.sid,q=N.quote;p.push({id:`QF${E+1}`,type:"short",question:S==="preview"?`요약에서 '${q}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${q}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:P,quote:q},anchorIds:[N.id]})}return p}class m{constructor(x,{passScore:f=90}={}){this.items=Array.isArray(x)?x:[],this.passScore=f,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(x,f){if(!x)return{ok:!1,reason:"no item"};const y=x.type;if(y==="mcq"||y==="blank"||y==="match"||y==="order"||y==="label"||y==="short"){if(y==="short")return{ok:!0,reason:"short-auto-pass"};const S=(x.answer||"").trim(),p=(f||"").trim();return{ok:p===S,reason:p===S?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(x){if(this.state.finished)return{done:!0,message:"already finished"};const f=this.currentItem();if(this.gradeAnswer(f,x).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(f.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${f.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${f.evidence.quote}'`,score:this.getScore()};{const S=f.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:S,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const f=this.items.filter(y=>this.state.wrongIds.has(y.id));this.items=f.length>0?f:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function D({llmCall:O,originalText:x,mode:f,format:y,purpose:S}){const p=await b({llmCall:O,originalText:x,mode:f,format:y}),g=await _({llmCall:O,mode:f,purpose:S,format:y,summaryText:p.summaryText,sentTable:p.sentTable,anchors:p.anchors});return{summary:{mode:f,format:y,text:p.summaryText,sentences:p.sentTable,anchors:p.anchors},selfTest:{purpose:S,passScore:90,items:g.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:b,generateSelfTest:_,runPipeline:D,MasteryRunner:m}})(),ps=`/* MindStory Engine Bundle (compat) */
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
})();`;te.use("/api/*",Hn());te.get("/static/ms-engine-bundle.js",t=>t.text(ps,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));te.get("/favicon.ico",t=>t.body(null,204));te.use("/static/*",Yn({root:"./public"}));te.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));te.get("/api/health",t=>{const e=!!F(t.env.GEMINI_API_KEY).trim(),n=F(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Ft(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});te.post("/api/gens/run",async t=>{const e=Date.now();let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=F((n==null?void 0:n.text)||(n==null?void 0:n.originalText)||""),r=Jt((n==null?void 0:n.mode)||"standard"),i=Yt((n==null?void 0:n.format)||(n==null?void 0:n.viewType)||"narrative"),a=F((n==null?void 0:n.purpose)||"preview").trim().toLowerCase();if(!s)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!F(t.env.GEMINI_API_KEY).trim(),c=F(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:u,user:h,json:w})=>{if(w){const T=`${u}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await Zt(t.env,T)}else return(await us(t.env,u,h)||"").toString()};try{const u=await fs.runPipeline({llmCall:l,originalText:s,mode:r,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:u,meta:{engine:"gens-v3",mode:r,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(u){return console.error("[GENS Engine Error]",u),t.json({ok:!1,error:{code:"GENS_ERROR",message:u.message||"GENS 엔진 오류",details:u.stack}},500)}});te.post("/api/engine",async t=>{var A,b;const e=Date.now(),n=t.env.DB;await ls(n);let s=null;try{s=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const r=Vn(s==null?void 0:s.kind),i=F((s==null?void 0:s.text)||""),a=Jt((s==null?void 0:s.mode)||(s==null?void 0:s.level)),o=Yt((s==null?void 0:s.viewType)||(s==null?void 0:s.displayMode)),c=F(((A=s==null?void 0:s.options)==null?void 0:A.userId)||(s==null?void 0:s.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=cs(r,a,o,i,c||null),u=await bt(n,l);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=os(r,a,i,c||null),w=await bt(n,h);if(w.hit&&((b=w.data)!=null&&b.narrative)){const v=w.data.narrative;let _;return o==="narrative"?_={kind:r,mode:a,viewType:o,narrative:v}:o==="structured"?_={kind:r,mode:a,...vt(v)}:o==="mindmap"?_={kind:r,mode:a,...wt(v)}:_={kind:r,mode:a,...yt(v)},await Le(n,l,c||"anon",_),t.json({ok:!0,data:_,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const T=!!F(t.env.GEMINI_API_KEY).trim(),M=F(t.env.USE_MOCK).trim().toLowerCase()==="true";if(r==="summary"&&T&&!M)try{const v=await hs(t.env,i);let _;a==="brief"?_=v.brief:a==="standard"?_=v.standard:_=`**개념**
${v.detail.개념}

**영향**
${v.detail.영향}

**교육적 가치**
${v.detail["교육적 가치"]}`;const I={kind:r,mode:a,viewType:"narrative",narrative:_,allSummaries:{brief:v.brief,standard:v.standard,detail:v.detail},meta:v.meta};await Le(n,h,c||"anon",I);let m;return o==="narrative"?m=I:o==="structured"?m={kind:r,mode:a,...vt(_)}:o==="mindmap"?m={kind:r,mode:a,...wt(_)}:m={kind:r,mode:a,...yt(_)},await Le(n,l,c||"anon",m),t.json({ok:!0,data:m,meta:{cached:!1,engine:"gemini-json-v3",elapsedMs:Date.now()-e}},200)}catch(v){console.error("[Gemini JSON Error]",v)}const k=as(i,a,o);if(await Le(n,l,c||"anon",k),k.narrative){const v={kind:"summary",mode:a,viewType:"narrative",narrative:k.narrative};await Le(n,h,c||"anon",v)}return t.json({ok:!0,data:k,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});te.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));te.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const St=new Ut,ms=Object.assign({"/src/index.tsx":te});let en=!1;for(const[,t]of Object.entries(ms))t&&(St.route("/",t),St.notFound(t.notFoundHandler),en=!0);if(!en)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{St as default};
