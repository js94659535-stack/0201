var Tt=Object.defineProperty;var Ye=e=>{throw TypeError(e)};var kt=(e,t,r)=>t in e?Tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var x=(e,t,r)=>kt(e,typeof t!="symbol"?t+"":t,r),qe=(e,t,r)=>t.has(e)||Ye("Cannot "+r);var d=(e,t,r)=>(qe(e,t,"read from private field"),r?r.call(e):t.get(e)),w=(e,t,r)=>t.has(e)?Ye("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),m=(e,t,r,n)=>(qe(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),E=(e,t,r)=>(qe(e,t,"access private method"),r);var Xe=(e,t,r,n)=>({set _(s){m(e,t,s,r)},get _(){return d(e,t,n)}});var Qe=(e,t,r)=>(n,s)=>{let a=-1;return i(0);async function i(l){if(l<=a)throw new Error("next() called multiple times");a=l;let o,c=!1,u;if(e[l]?(u=e[l][0][0],n.req.routeIndex=l):u=l===e.length&&s||void 0,u)try{o=await u(n,()=>i(l+1))}catch(f){if(f instanceof Error&&t)n.error=f,o=await t(f,n),c=!0;else throw f}else n.finalized===!1&&r&&(o=await r(n));return o&&(n.finalized===!1||c)&&(n.res=o),n}},Rt=Symbol(),At=async(e,t=Object.create(null))=>{const{all:r=!1,dot:n=!1}=t,a=(e instanceof gt?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Mt(e,{all:r,dot:n}):{}};async function Mt(e,t){const r=await e.formData();return r?It(r,t):{}}function It(e,t){const r=Object.create(null);return e.forEach((n,s)=>{t.all||s.endsWith("[]")?Nt(r,s,n):r[s]=n}),t.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(Pt(r,n,s),delete r[n])}),r}var Nt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Pt=(e,t,r)=>{let n=e;const s=t.split(".");s.forEach((a,i)=>{i===s.length-1?n[a]=r:((!n[a]||typeof n[a]!="object"||Array.isArray(n[a])||n[a]instanceof File)&&(n[a]=Object.create(null)),n=n[a])})},dt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ht=e=>{const{groups:t,path:r}=Dt(e),n=dt(r);return Lt(n,t)},Dt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return t.push([s,r]),s}),{groups:t,path:e}},Lt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[n]=t[r];for(let s=e.length-1;s>=0;s--)if(e[s].includes(n)){e[s]=e[s].replace(n,t[r][1]);break}}return e},Ae={},Bt=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${e}#${t}`;return Ae[n]||(r[2]?Ae[n]=t&&t[0]!==":"&&t[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ae[n]=[e,r[1],!0]),Ae[n]}return null},We=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},qt=e=>We(e,decodeURI),ut=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let n=r;for(;n<t.length;n++){const s=t.charCodeAt(n);if(s===37){const a=t.indexOf("?",n),i=t.slice(r,a===-1?void 0:a);return qt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(s===63)break}return t.slice(r,n)},zt=e=>{const t=ut(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ue=(e,t,...r)=>(r.length&&(t=ue(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ht=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let n="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const a=s.replace("?","");n+="/"+a,r.push(n)}else n+="/"+s}),r.filter((s,a,i)=>i.indexOf(s)===a)},ze=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?We(e,pt):e):e,ft=(e,t,r)=>{let n;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const o=i+t.length+2,c=e.indexOf("&",o);return ze(e.slice(o,c===-1?void 0:c))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(n=/[%+]/.test(e),!n)return}const s={};n??(n=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let l=e.indexOf("=",a);l>i&&i!==-1&&(l=-1);let o=e.slice(a+1,l===-1?i===-1?void 0:i:l);if(n&&(o=ze(o)),a=i,o==="")continue;let c;l===-1?c="":(c=e.slice(l+1,i===-1?void 0:i),n&&(c=ze(c))),r?(s[o]&&Array.isArray(s[o])||(s[o]=[]),s[o].push(c)):s[o]??(s[o]=c)}return t?s[t]:s},Ft=ft,Kt=(e,t)=>ft(e,t,!0),pt=decodeURIComponent,Ze=e=>We(e,pt),ge,D,V,mt,xt,Ge,Y,st,gt=(st=class{constructor(e,t="/",r=[[]]){w(this,V);x(this,"raw");w(this,ge);w(this,D);x(this,"routeIndex",0);x(this,"path");x(this,"bodyCache",{});w(this,Y,e=>{const{bodyCache:t,raw:r}=this,n=t[e];if(n)return n;const s=Object.keys(t)[0];return s?t[s].then(a=>(s==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,m(this,D,r),m(this,ge,{})}param(e){return e?E(this,V,mt).call(this,e):E(this,V,xt).call(this)}query(e){return Ft(this.url,e)}queries(e){return Kt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,n)=>{t[n]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await At(this,e))}json(){return d(this,Y).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,Y).call(this,"text")}arrayBuffer(){return d(this,Y).call(this,"arrayBuffer")}blob(){return d(this,Y).call(this,"blob")}formData(){return d(this,Y).call(this,"formData")}addValidatedData(e,t){d(this,ge)[e]=t}valid(e){return d(this,ge)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Rt](){return d(this,D)}get matchedRoutes(){return d(this,D)[0].map(([[,e]])=>e)}get routePath(){return d(this,D)[0].map(([[,e]])=>e)[this.routeIndex].path}},ge=new WeakMap,D=new WeakMap,V=new WeakSet,mt=function(e){const t=d(this,D)[0][this.routeIndex][1][e],r=E(this,V,Ge).call(this,t);return r&&/\%/.test(r)?Ze(r):r},xt=function(){const e={},t=Object.keys(d(this,D)[0][this.routeIndex][1]);for(const r of t){const n=E(this,V,Ge).call(this,d(this,D)[0][this.routeIndex][1][r]);n!==void 0&&(e[r]=/\%/.test(n)?Ze(n):n)}return e},Ge=function(e){return d(this,D)[1]?d(this,D)[1][e]:e},Y=new WeakMap,st),Ut={Stringify:1},bt=async(e,t,r,n,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(s?s[0]+=e:s=[e],Promise.all(a.map(l=>l({phase:t,buffer:s,context:n}))).then(l=>Promise.all(l.filter(Boolean).map(o=>bt(o,t,!1,n,s))).then(()=>s[0]))):Promise.resolve(e)},Gt="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),je,Ce,K,me,U,P,_e,xe,be,se,$e,Te,X,he,at,Jt=(at=class{constructor(e,t){w(this,X);w(this,je);w(this,Ce);x(this,"env",{});w(this,K);x(this,"finalized",!1);x(this,"error");w(this,me);w(this,U);w(this,P);w(this,_e);w(this,xe);w(this,be);w(this,se);w(this,$e);w(this,Te);x(this,"render",(...e)=>(d(this,xe)??m(this,xe,t=>this.html(t)),d(this,xe).call(this,...e)));x(this,"setLayout",e=>m(this,_e,e));x(this,"getLayout",()=>d(this,_e));x(this,"setRenderer",e=>{m(this,xe,e)});x(this,"header",(e,t,r)=>{this.finalized&&m(this,P,new Response(d(this,P).body,d(this,P)));const n=d(this,P)?d(this,P).headers:d(this,se)??m(this,se,new Headers);t===void 0?n.delete(e):r!=null&&r.append?n.append(e,t):n.set(e,t)});x(this,"status",e=>{m(this,me,e)});x(this,"set",(e,t)=>{d(this,K)??m(this,K,new Map),d(this,K).set(e,t)});x(this,"get",e=>d(this,K)?d(this,K).get(e):void 0);x(this,"newResponse",(...e)=>E(this,X,he).call(this,...e));x(this,"body",(e,t,r)=>E(this,X,he).call(this,e,t,r));x(this,"text",(e,t,r)=>!d(this,se)&&!d(this,me)&&!t&&!r&&!this.finalized?new Response(e):E(this,X,he).call(this,e,t,Fe(Gt,r)));x(this,"json",(e,t,r)=>E(this,X,he).call(this,JSON.stringify(e),t,Fe("application/json",r)));x(this,"html",(e,t,r)=>{const n=s=>E(this,X,he).call(this,s,t,Fe("text/html; charset=UTF-8",r));return typeof e=="object"?bt(e,Ut.Stringify,!1,{}).then(n):n(e)});x(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});x(this,"notFound",()=>(d(this,be)??m(this,be,()=>new Response),d(this,be).call(this,this)));m(this,je,e),t&&(m(this,U,t.executionCtx),this.env=t.env,m(this,be,t.notFoundHandler),m(this,Te,t.path),m(this,$e,t.matchResult))}get req(){return d(this,Ce)??m(this,Ce,new gt(d(this,je),d(this,Te),d(this,$e))),d(this,Ce)}get event(){if(d(this,U)&&"respondWith"in d(this,U))return d(this,U);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,U))return d(this,U);throw Error("This context has no ExecutionContext")}get res(){return d(this,P)||m(this,P,new Response(null,{headers:d(this,se)??m(this,se,new Headers)}))}set res(e){if(d(this,P)&&e){e=new Response(e.body,e);for(const[t,r]of d(this,P).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const n=d(this,P).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of n)e.headers.append("set-cookie",s)}else e.headers.set(t,r)}m(this,P,e),this.finalized=!0}get var(){return d(this,K)?Object.fromEntries(d(this,K)):{}}},je=new WeakMap,Ce=new WeakMap,K=new WeakMap,me=new WeakMap,U=new WeakMap,P=new WeakMap,_e=new WeakMap,xe=new WeakMap,be=new WeakMap,se=new WeakMap,$e=new WeakMap,Te=new WeakMap,X=new WeakSet,he=function(e,t,r){const n=d(this,P)?new Headers(d(this,P).headers):d(this,se)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of a)i.toLowerCase()==="set-cookie"?n.append(i,l):n.set(i,l)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")n.set(a,i);else{n.delete(a);for(const l of i)n.append(a,l)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,me);return new Response(e,{status:s,headers:n})},at),k="ALL",Vt="all",Wt=["get","post","put","delete","options","patch"],vt="Can not add a route since the matcher is already built.",wt=class extends Error{},Yt="__COMPOSED_HANDLER",Xt=e=>e.text("404 Not Found",404),et=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},L,R,yt,B,ne,Me,Ie,ve,Qt=(ve=class{constructor(t={}){w(this,R);x(this,"get");x(this,"post");x(this,"put");x(this,"delete");x(this,"options");x(this,"patch");x(this,"all");x(this,"on");x(this,"use");x(this,"router");x(this,"getPath");x(this,"_basePath","/");w(this,L,"/");x(this,"routes",[]);w(this,B,Xt);x(this,"errorHandler",et);x(this,"onError",t=>(this.errorHandler=t,this));x(this,"notFound",t=>(m(this,B,t),this));x(this,"fetch",(t,...r)=>E(this,R,Ie).call(this,t,r[1],r[0],t.method));x(this,"request",(t,r,n,s)=>t instanceof Request?this.fetch(r?new Request(t,r):t,n,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ue("/",t)}`,r),n,s)));x(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(E(this,R,Ie).call(this,t.request,t,void 0,t.request.method))})});[...Wt,Vt].forEach(a=>{this[a]=(i,...l)=>(typeof i=="string"?m(this,L,i):E(this,R,ne).call(this,a,d(this,L),i),l.forEach(o=>{E(this,R,ne).call(this,a,d(this,L),o)}),this)}),this.on=(a,i,...l)=>{for(const o of[i].flat()){m(this,L,o);for(const c of[a].flat())l.map(u=>{E(this,R,ne).call(this,c.toUpperCase(),d(this,L),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?m(this,L,a):(m(this,L,"*"),i.unshift(a)),i.forEach(l=>{E(this,R,ne).call(this,k,d(this,L),l)}),this);const{strict:n,...s}=t;Object.assign(this,s),this.getPath=n??!0?t.getPath??ut:zt}route(t,r){const n=this.basePath(t);return r.routes.map(s=>{var i;let a;r.errorHandler===et?a=s.handler:(a=async(l,o)=>(await Qe([],r.errorHandler)(l,()=>s.handler(l,o))).res,a[Yt]=s.handler),E(i=n,R,ne).call(i,s.method,s.path,a)}),this}basePath(t){const r=E(this,R,yt).call(this);return r._basePath=ue(this._basePath,t),r}mount(t,r,n){let s,a;n&&(typeof n=="function"?a=n:(a=n.optionHandler,n.replaceRequest===!1?s=o=>o:s=n.replaceRequest));const i=a?o=>{const c=a(o);return Array.isArray(c)?c:[c]}:o=>{let c;try{c=o.executionCtx}catch{}return[o.env,c]};s||(s=(()=>{const o=ue(this._basePath,t),c=o==="/"?0:o.length;return u=>{const f=new URL(u.url);return f.pathname=f.pathname.slice(c)||"/",new Request(f,u)}})());const l=async(o,c)=>{const u=await r(s(o.req.raw),...i(o));if(u)return u;await c()};return E(this,R,ne).call(this,k,ue(t,"*"),l),this}},L=new WeakMap,R=new WeakSet,yt=function(){const t=new ve({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,m(t,B,d(this,B)),t.routes=this.routes,t},B=new WeakMap,ne=function(t,r,n){t=t.toUpperCase(),r=ue(this._basePath,r);const s={basePath:this._basePath,path:r,method:t,handler:n};this.router.add(t,r,[n,s]),this.routes.push(s)},Me=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Ie=function(t,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await E(this,R,Ie).call(this,t,r,n,"GET")))();const a=this.getPath(t,{env:n}),i=this.router.match(s,a),l=new Jt(t,{path:a,matchResult:i,env:n,executionCtx:r,notFoundHandler:d(this,B)});if(i[0].length===1){let c;try{c=i[0][0][0][0](l,async()=>{l.res=await d(this,B).call(this,l)})}catch(u){return E(this,R,Me).call(this,u,l)}return c instanceof Promise?c.then(u=>u||(l.finalized?l.res:d(this,B).call(this,l))).catch(u=>E(this,R,Me).call(this,u,l)):c??d(this,B).call(this,l)}const o=Qe(i[0],this.errorHandler,d(this,B));return(async()=>{try{const c=await o(l);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return E(this,R,Me).call(this,c,l)}})()},ve),Et=[];function Zt(e,t){const r=this.buildAllMatchers(),n=(s,a)=>{const i=r[s]||r[k],l=i[2][a];if(l)return l;const o=a.match(i[0]);if(!o)return[[],Et];const c=o.indexOf("",1);return[i[1][c],o]};return this.match=n,n(e,t)}var He="[^/]+",Se=".*",Oe="(?:|/.*)",fe=Symbol(),en=new Set(".\\+*[^]$()");function tn(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Se||e===Oe?1:t===Se||t===Oe?-1:e===He?1:t===He?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ae,ie,q,le,nn=(le=class{constructor(){w(this,ae);w(this,ie);w(this,q,Object.create(null))}insert(t,r,n,s,a){if(t.length===0){if(d(this,ae)!==void 0)throw fe;if(a)return;m(this,ae,r);return}const[i,...l]=t,o=i==="*"?l.length===0?["","",Se]:["","",He]:i==="/*"?["","",Oe]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(o){const u=o[1];let f=o[2]||He;if(u&&o[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw fe;if(c=d(this,q)[f],!c){if(Object.keys(d(this,q)).some(h=>h!==Se&&h!==Oe))throw fe;if(a)return;c=d(this,q)[f]=new le,u!==""&&m(c,ie,s.varIndex++)}!a&&u!==""&&n.push([u,d(c,ie)])}else if(c=d(this,q)[i],!c){if(Object.keys(d(this,q)).some(u=>u.length>1&&u!==Se&&u!==Oe))throw fe;if(a)return;c=d(this,q)[i]=new le}c.insert(l,r,n,s,a)}buildRegExpStr(){const r=Object.keys(d(this,q)).sort(tn).map(n=>{const s=d(this,q)[n];return(typeof d(s,ie)=="number"?`(${n})@${d(s,ie)}`:en.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof d(this,ae)=="number"&&r.unshift(`#${d(this,ae)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},ae=new WeakMap,ie=new WeakMap,q=new WeakMap,le),Le,ke,it,rn=(it=class{constructor(){w(this,Le,{varIndex:0});w(this,ke,new nn)}insert(e,t,r){const n=[],s=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,o=>{const c=`@\\${i}`;return s[i]=[c,o],i++,l=!0,c}),!l)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[l]=s[i];for(let o=a.length-1;o>=0;o--)if(a[o].indexOf(l)!==-1){a[o]=a[o].replace(l,s[i][1]);break}}return d(this,ke).insert(a,t,n,d(this,Le),r),n}buildRegExp(){let e=d(this,ke).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],n=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(n[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,n]}},Le=new WeakMap,ke=new WeakMap,it),sn=[/^$/,[],Object.create(null)],Ne=Object.create(null);function St(e){return Ne[e]??(Ne[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function an(){Ne=Object.create(null)}function on(e){var c;const t=new rn,r=[];if(e.length===0)return sn;const n=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,f],[h,g])=>u?1:h?-1:f.length-g.length),s=Object.create(null);for(let u=0,f=-1,h=n.length;u<h;u++){const[g,O,y]=n[u];g?s[O]=[y.map(([p])=>[p,Object.create(null)]),Et]:f++;let v;try{v=t.insert(O,f,g)}catch(p){throw p===fe?new wt(O):p}g||(r[f]=y.map(([p,b])=>{const T=Object.create(null);for(b-=1;b>=0;b--){const[$,N]=v[b];T[$]=N}return[p,T]}))}const[a,i,l]=t.buildRegExp();for(let u=0,f=r.length;u<f;u++)for(let h=0,g=r[u].length;h<g;h++){const O=(c=r[u][h])==null?void 0:c[1];if(!O)continue;const y=Object.keys(O);for(let v=0,p=y.length;v<p;v++)O[y[v]]=l[O[y[v]]]}const o=[];for(const u in i)o[u]=r[i[u]];return[a,o,s]}function de(e,t){if(e){for(const r of Object.keys(e).sort((n,s)=>s.length-n.length))if(St(r).test(t))return[...e[r]]}}var Q,Z,Be,Ot,ot,cn=(ot=class{constructor(){w(this,Be);x(this,"name","RegExpRouter");w(this,Q);w(this,Z);x(this,"match",Zt);m(this,Q,{[k]:Object.create(null)}),m(this,Z,{[k]:Object.create(null)})}add(e,t,r){var l;const n=d(this,Q),s=d(this,Z);if(!n||!s)throw new Error(vt);n[e]||[n,s].forEach(o=>{o[e]=Object.create(null),Object.keys(o[k]).forEach(c=>{o[e][c]=[...o[k][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const o=St(t);e===k?Object.keys(n).forEach(c=>{var u;(u=n[c])[t]||(u[t]=de(n[c],t)||de(n[k],t)||[])}):(l=n[e])[t]||(l[t]=de(n[e],t)||de(n[k],t)||[]),Object.keys(n).forEach(c=>{(e===k||e===c)&&Object.keys(n[c]).forEach(u=>{o.test(u)&&n[c][u].push([r,a])})}),Object.keys(s).forEach(c=>{(e===k||e===c)&&Object.keys(s[c]).forEach(u=>o.test(u)&&s[c][u].push([r,a]))});return}const i=ht(t)||[t];for(let o=0,c=i.length;o<c;o++){const u=i[o];Object.keys(s).forEach(f=>{var h;(e===k||e===f)&&((h=s[f])[u]||(h[u]=[...de(n[f],u)||de(n[k],u)||[]]),s[f][u].push([r,a-c+o+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(d(this,Z)).concat(Object.keys(d(this,Q))).forEach(t=>{e[t]||(e[t]=E(this,Be,Ot).call(this,t))}),m(this,Q,m(this,Z,void 0)),an(),e}},Q=new WeakMap,Z=new WeakMap,Be=new WeakSet,Ot=function(e){const t=[];let r=e===k;return[d(this,Q),d(this,Z)].forEach(n=>{const s=n[e]?Object.keys(n[e]).map(a=>[a,n[e][a]]):[];s.length!==0?(r||(r=!0),t.push(...s)):e!==k&&t.push(...Object.keys(n[k]).map(a=>[a,n[k][a]]))}),r?on(t):null},ot),ee,G,ct,ln=(ct=class{constructor(e){x(this,"name","SmartRouter");w(this,ee,[]);w(this,G,[]);m(this,ee,e.routers)}add(e,t,r){if(!d(this,G))throw new Error(vt);d(this,G).push([e,t,r])}match(e,t){if(!d(this,G))throw new Error("Fatal error");const r=d(this,ee),n=d(this,G),s=r.length;let a=0,i;for(;a<s;a++){const l=r[a];try{for(let o=0,c=n.length;o<c;o++)l.add(...n[o]);i=l.match(e,t)}catch(o){if(o instanceof wt)continue;throw o}this.match=l.match.bind(l),m(this,ee,[l]),m(this,G,void 0);break}if(a===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,G)||d(this,ee).length!==1)throw new Error("No active router has been determined yet.");return d(this,ee)[0]}},ee=new WeakMap,G=new WeakMap,ct),Ee=Object.create(null),te,I,oe,we,M,J,re,ye,dn=(ye=class{constructor(t,r,n){w(this,J);w(this,te);w(this,I);w(this,oe);w(this,we,0);w(this,M,Ee);if(m(this,I,n||Object.create(null)),m(this,te,[]),t&&r){const s=Object.create(null);s[t]={handler:r,possibleKeys:[],score:0},m(this,te,[s])}m(this,oe,[])}insert(t,r,n){m(this,we,++Xe(this,we)._);let s=this;const a=Ht(r),i=[];for(let l=0,o=a.length;l<o;l++){const c=a[l],u=a[l+1],f=Bt(c,u),h=Array.isArray(f)?f[0]:c;if(h in d(s,I)){s=d(s,I)[h],f&&i.push(f[1]);continue}d(s,I)[h]=new ye,f&&(d(s,oe).push(f),i.push(f[1])),s=d(s,I)[h]}return d(s,te).push({[t]:{handler:n,possibleKeys:i.filter((l,o,c)=>c.indexOf(l)===o),score:d(this,we)}}),s}search(t,r){var o;const n=[];m(this,M,Ee);let a=[this];const i=dt(r),l=[];for(let c=0,u=i.length;c<u;c++){const f=i[c],h=c===u-1,g=[];for(let O=0,y=a.length;O<y;O++){const v=a[O],p=d(v,I)[f];p&&(m(p,M,d(v,M)),h?(d(p,I)["*"]&&n.push(...E(this,J,re).call(this,d(p,I)["*"],t,d(v,M))),n.push(...E(this,J,re).call(this,p,t,d(v,M)))):g.push(p));for(let b=0,T=d(v,oe).length;b<T;b++){const $=d(v,oe)[b],N=d(v,M)===Ee?{}:{...d(v,M)};if($==="*"){const H=d(v,I)["*"];H&&(n.push(...E(this,J,re).call(this,H,t,d(v,M))),m(H,M,N),g.push(H));continue}const[A,j,S]=$;if(!f&&!(S instanceof RegExp))continue;const _=d(v,I)[A],C=i.slice(c).join("/");if(S instanceof RegExp){const H=S.exec(C);if(H){if(N[j]=H[0],n.push(...E(this,J,re).call(this,_,t,d(v,M),N)),Object.keys(d(_,I)).length){m(_,M,N);const F=((o=H[0].match(/\//))==null?void 0:o.length)??0;(l[F]||(l[F]=[])).push(_)}continue}}(S===!0||S.test(f))&&(N[j]=f,h?(n.push(...E(this,J,re).call(this,_,t,N,d(v,M))),d(_,I)["*"]&&n.push(...E(this,J,re).call(this,d(_,I)["*"],t,N,d(v,M)))):(m(_,M,N),g.push(_)))}}a=g.concat(l.shift()??[])}return n.length>1&&n.sort((c,u)=>c.score-u.score),[n.map(({handler:c,params:u})=>[c,u])]}},te=new WeakMap,I=new WeakMap,oe=new WeakMap,we=new WeakMap,M=new WeakMap,J=new WeakSet,re=function(t,r,n,s){const a=[];for(let i=0,l=d(t,te).length;i<l;i++){const o=d(t,te)[i],c=o[r]||o[k],u={};if(c!==void 0&&(c.params=Object.create(null),a.push(c),n!==Ee||s&&s!==Ee))for(let f=0,h=c.possibleKeys.length;f<h;f++){const g=c.possibleKeys[f],O=u[c.score];c.params[g]=s!=null&&s[g]&&!O?s[g]:n[g]??(s==null?void 0:s[g]),u[c.score]=!0}}return a},ye),ce,lt,un=(lt=class{constructor(){x(this,"name","TrieRouter");w(this,ce);m(this,ce,new dn)}add(e,t,r){const n=ht(t);if(n){for(let s=0,a=n.length;s<a;s++)d(this,ce).insert(e,n[s],r);return}d(this,ce).insert(e,t,r)}match(e,t){return d(this,ce).search(e,t)}},ce=new WeakMap,lt),jt=class extends Qt{constructor(e={}){super(e),this.router=e.router??new ln({routers:[new cn,new un]})}},hn=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},n=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),s=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,l){var u;function o(f,h){i.res.headers.set(f,h)}const c=await n(i.req.header("origin")||"",i);if(c&&o("Access-Control-Allow-Origin",c),r.credentials&&o("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&o("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&o("Vary","Origin"),r.maxAge!=null&&o("Access-Control-Max-Age",r.maxAge.toString());const f=await s(i.req.header("origin")||"",i);f.length&&o("Access-Control-Allow-Methods",f.join(","));let h=r.allowHeaders;if(!(h!=null&&h.length)){const g=i.req.header("Access-Control-Request-Headers");g&&(h=g.split(/\s*,\s*/))}return h!=null&&h.length&&(o("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await l(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},fn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,tt=(e,t=gn)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=e.match(r);if(!n)return;let s=t[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},pn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},gn=pn,mn=(...e)=>{let t=e.filter(s=>s!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},Ct={br:".br",zstd:".zst",gzip:".gz"},xn=Object.keys(Ct),bn="index.html",vn=e=>{const t=e.root??"./",r=e.path,n=e.join??mn;return async(s,a)=>{var u,f,h,g;if(s.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,s.req.path,s)),a()}let l=n(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(l)&&(l=n(l,bn));const o=e.getContent;let c=await o(l,s);if(c instanceof Response)return s.newResponse(c.body,c);if(c){const O=e.mimes&&tt(l,e.mimes)||tt(l);if(s.header("Content-Type",O||"application/octet-stream"),e.precompressed&&(!O||fn.test(O))){const y=new Set((f=s.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(v=>v.trim()));for(const v of xn){if(!y.has(v))continue;const p=await o(l+Ct[v],s);if(p){c=p,s.header("Content-Encoding",v),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((h=e.onFound)==null?void 0:h.call(e,l,s)),s.body(c)}await((g=e.onNotFound)==null?void 0:g.call(e,l,s)),await a()}},wn=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;t&&t.namespace?n=t.namespace:n=__STATIC_CONTENT;const s=r[e];if(!s)return null;const a=await n.get(s,{type:"stream"});return a||null},yn=e=>async function(r,n){return vn({...e,getContent:async a=>wn(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},En=e=>yn(e);const W=new jt,Pe=new Map,Sn=1e3*60*60*24*7;let Ke=!1;function _t(){return new Date().toISOString()}function z(e){return e==null?"":String(e)}function pe(e,t,r){return Math.max(t,Math.min(r,e))}function On(e){const t=z(e).trim().toLowerCase();return t?t==="brief"||t==="simple"||t==="short"||t==="lite"?"brief":t==="detail"||t==="detailed"||t==="full"?"detail":"standard":"standard"}function jn(e){const t=z(e).trim().toLowerCase();return t?t==="narrative"||t==="structured"||t==="mindmap"||t==="selftest"?t:t==="mind-map"||t==="mind_map"?"mindmap":"narrative":"narrative"}function Cn(e){const t=z(e).trim().toLowerCase();return t==="concept"?"concept":t==="exam"?"exam":"summary"}function Je(e){const t=(e||"").replace(/\s+/g," ").trim();if(!t)return[];const r=[];let n="",s=!1;for(let a=0;a<t.length;a++){const i=t[a],l=t[a+1];(i==='"'||i==='"'||i==='"')&&(s=!s),n+=i,!s&&/[\.\?\!]/.test(i)&&l===" "?i==="."&&n.endsWith("...")||(r.push(n.trim()),n="",a++):!s&&/[다요죠]/.test(i)&&l===" "&&(r.push(n.trim()),n="",a++)}return n.trim()&&r.push(n.trim()),r.length?r:[t]}const _n=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),$n=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function Tn(e){const t=new Set;for(const r of e){let n=!1;for(const s of $n)if(s.has(r)){t.add(Array.from(s)[0]),n=!0;break}n||t.add(r)}return t}function De(e){return(e||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(t=>t.trim()).map(t=>t.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(t=>t.length>=2&&!_n.has(t))}function kn(e){const t=new Map;for(const n of e)for(const s of De(n))t.set(s,(t.get(s)||0)+1);return e.map((n,s)=>{const a=De(n);let i=0;for(const c of a)i+=t.get(c)||0;const l=n.length,o=l<15?.7:l>180?.85:1;return{idx:s,s:n,score:i*o}})}function Ve(e,t){return kn(e).slice().sort((s,a)=>a.score-s.score).slice(0,pe(t,1,Math.max(1,e.length))).sort((s,a)=>s.idx-a.idx).map(s=>s.s)}function Rn(e,t,r){const n=[];for(const o of e){const c=/\(([^)]+,?\s*\d{4})\)/g,u=[];let f;for(;(f=c.exec(o))!==null;)u.push(f[1]);let h=o.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(h.length<10)continue;const g=De(h).slice(0,8);n.push({original:o,clean:h,keywords:g,citations:u})}if(n.length===0)return"요약할 내용이 부족합니다.";const s=new Map;for(const o of n)for(const c of o.keywords)s.set(c,(s.get(c)||0)+1);const a=[];for(const o of n){new Set(o.keywords);let c=!1;for(const u of a)if(o.keywords.filter(h=>u.keywords.has(h)).length>=2){u.sentences.push({clean:o.clean,citations:o.citations}),o.keywords.forEach(h=>u.keywords.add(h)),c=!0;break}c||a.push({keywords:new Set(o.keywords),sentences:[{clean:o.clean,citations:o.citations}]})}const i=a.map(o=>{const c=o.sentences[0].clean,u=n.findIndex(f=>f.clean===c);return{...o,originalIdx:u}});if(r==="brief"){const o=i.sort((h,g)=>g.sentences.length-h.sentences.length)[0],c=o.sentences[0],u=o.sentences.flatMap(h=>h.citations).filter(Boolean),f=u.length>0?`(${u.join("; ")})`:"";return`${c.clean}${f}.`}if(r==="standard"){const o=i.sort((p,b)=>b.sentences.length-p.sentences.length).slice(0,3).sort((p,b)=>p.originalIdx-b.originalIdx);if(o.length===1){const p=o[0].sentences[0],b=o[0].sentences.flatMap($=>$.citations).filter(Boolean),T=b.length>0?`(${b.join("; ")})`:"";return`${p.clean}${T}.`}const c=new Map,u=new Map,f={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const p of o)for(const b of p.sentences){const T=b.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(T){let[,$,N]=T;$=$.replace(/[에게서로부터]$/g,"").trim(),c.has($)||c.set($,[]);let A=N.trim();A=A.replace(/[\.。\?\!]+$/g,"").trim();for(const[C,H]of Object.entries(f))if(A.includes(C)){const F=u.get(C)||0;if(u.set(C,F+1),F>=1&&H.length>0){const Re=Math.min(F-1,H.length-1);A=A.replace(C,H[Re])}}const j=new Set(De(A)),S=Tn(j),_=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const C of _)S.delete(C);c.get($).push({original:A,keywords:S,citations:b.citations})}}const h=[];for(const[p,b]of c.entries()){const T=b.flatMap(j=>j.citations).filter(Boolean),$=p.charAt(p.length-1),A=/[가-힣]/.test($)&&($.charCodeAt(0)-44032)%28!==0?"은":"는";if(b.length===1){const j=b[0].original,S=(j.match(/,/g)||[]).length;if(j.length>80&&S>=2){const _=j.split(",").map(C=>C.trim()).filter(C=>C.length>0);if(_.length>=2){h.push({text:`${p}${A} ${_[0]}입니다`,citations:[]});for(let C=1;C<_.length-1;C++)h.push({text:`이는 ${_[C]}입니다`,citations:[]});h.push({text:`또한 ${_[_.length-1]}`,citations:b[0].citations})}else h.push({text:`${p}${A} ${j}`,citations:T})}else h.push({text:`${p}${A} ${j}`,citations:T})}else{const j=[];for(const S of b){let _=!1;for(const C of j){const H=Array.from(S.keywords).filter(Re=>C.keywords.has(Re)).length,F=Math.max(S.keywords.size,C.keywords.size);if(F>0&&H/F>=.8){S.original.length>C.original.length&&(C.original=S.original,C.keywords=S.keywords),C.citations.push(...S.citations),_=!0;break}}_||j.push({original:S.original,keywords:S.keywords,citations:[...S.citations]})}if(j.length===1)h.push({text:`${p}${A} ${j[0].original}`,citations:j.flatMap(S=>S.citations)});else if(j.length===2)h.push({text:`${p}${A} ${j[0].original}`,citations:j[0].citations}),h.push({text:`${p}${A} ${j[1].original}`,citations:j[1].citations});else for(let S=0;S<j.length;S++)h.push({text:`${p}${A} ${j[S].original}`,citations:j[S].citations})}}if(h.length===0)return"요약할 내용이 부족합니다.";if(h.length===1){const p=h[0].citations.filter(Boolean),b=p.length>0?`(${p.join("; ")})`:"";return`${h[0].text}${b}.`}if(h.length===2){const p=h[0].citations.filter(Boolean),b=h[1].citations.filter(Boolean),T=p.length>0?`(${p.join("; ")})`:"",$=b.length>0?`(${b.join("; ")})`:"";return`${h[0].text}${T}. ${h[1].text}${$}.`}const g=[],O=h[0],y=O.citations.filter(Boolean),v=y.length>0?`(${y.join("; ")})`:"";if(g.push(`${O.text}${v}.`),h.length>=2){const p=h[1],b=p.citations.filter(Boolean),T=b.length>0?`(${b.join("; ")})`:"";g.push(`${p.text}${T}.`)}if(h.length>=3){const b=h.slice(2).map(T=>{const $=T.citations.filter(Boolean),N=$.length>0?`(${$.join("; ")})`:"";return`${T.text}${N}.`});g.push(b.join(" "))}return g.join(`

`)}const l=i.sort((o,c)=>c.sentences.length-o.sentences.length).slice(0,5).sort((o,c)=>o.originalIdx-c.originalIdx);return l.map((o,c)=>{const u=o.sentences[0],f=o.sentences.flatMap(g=>g.citations).filter(Boolean),h=f.length>0?`(${f.join("; ")})`:"";return c===0?`${u.clean}${h}.`:c===l.length-1?`마지막으로 ${u.clean}${h}.`:`또한 ${u.clean}${h}.`}).join(" ")}function nt(e,t,r){const n=Je(e),s=t==="brief"?pe(Math.round(n.length*.18),2,4):t==="standard"?pe(Math.round(n.length*.28),4,8):pe(Math.round(n.length*.4),7,14),a=Ve(n,s);if(r==="narrative"){const l=Rn(a,e,t);return{kind:"summary",mode:t,viewType:r,narrative:l}}if(r==="structured")return{kind:"summary",mode:t,viewType:r,structured:{title:"구조화 요약",bullets:a.map((l,o)=>`- (${o+1}) ${l}`)}};if(r==="mindmap"){const l=(a[0]||n[0]||"핵심").slice(0,40),o=[{id:"c",label:l,level:0}],c=[];return a.slice(1).forEach((u,f)=>{const h=`n${f+1}`;o.push({id:h,label:u.slice(0,60),level:1}),c.push({from:"c",to:h})}),{kind:"summary",mode:t,viewType:r,mindmap:{center:l,nodes:o,edges:c}}}const i=a.map((l,o)=>({id:`q${o+1}`,type:"short",question:`(${o+1}) 다음 내용을 한 문장으로 설명해보세요: "${l.slice(0,70)}"`,answerHint:l}));return{kind:"summary",mode:t,viewType:r,selftest:{title:"셀프테스트",questions:i}}}function An(e){if(!e)return"empty";let t=2166136261,r=0;for(let a=0;a<e.length;a++){const i=e.charCodeAt(a);t^=i,t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24),r=(r<<5)-r+i,r|=0}const n=(t>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${e.length.toString(16)}_${n}_${s}`}function Mn(e,t,r,n,s){const a=An(n);return`${e}::${s||"anon"}::${t}::${r}::${a}`}async function In(e){if(!Ke){if(!e){Ke=!0;return}await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),Ke=!0}}async function Nn(e,t){const r=Date.now(),n=Pe.get(t);if(n&&r-n.createdAt<Sn)return{hit:!0,data:n.data,store:"mem"};if(n&&Pe.delete(t),!e)return{hit:!1};const s=await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const a=JSON.parse(s.response_json);return Pe.set(t,{data:a,createdAt:r}),{hit:!0,data:a,store:"d1"}}catch{return{hit:!1}}}async function Ue(e,t,r,n){const s=Date.now();Pe.set(t,{data:n,createdAt:s}),e&&await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t,r,JSON.stringify(n),_t()).run()}function Pn(e,t,r){const s=['당신은 "학습 텍스트 압축 요약" 전문가입니다.','반드시 "중간 글자 자르기" 같은 방식은 금지합니다.',"문장/의미 단위로 재구성하여 자연스러운 한국어로 요약하세요.",`압축률 목표: ${t==="brief"?"원문 길이의 약 15~20% 수준":t==="standard"?"원문 길이의 약 25~35% 수준":"원문 길이의 약 40~55% 수준"}.`,"중복 제거, 핵심 개념/관계/원인-결과/절차가 드러나게 요약하세요."].join(`
`);return r==="narrative"?`${s}

[출력 형식]
- 한국어 서술 요약 1개 문단

[원문]
${e}`:r==="structured"?`${s}

[출력 형식: JSON만]
{
  "title": "요약 제목",
  "bullets": ["- ...", "- ..."]
}

[원문]
${e}`:r==="mindmap"?`${s}

[출력 형식: JSON만]
{
  "center": "중심개념(짧게)",
  "nodes": [ { "id": "c", "label": "center", "level": 0 }, { "id": "n1", "label": "하위개념", "level": 1 } ],
  "edges": [ { "from": "c", "to": "n1" } ]
}
- nodes는 6~12개 정도

[원문]
${e}`:`${s}

[출력 형식: JSON만]
{
  "title": "셀프테스트",
  "questions": [
    { "id": "q1", "type": "short", "question": "질문", "answerHint": "정답 힌트" }
  ]
}
- questions는 5~10개

[원문]
${e}`}function Hn(e){const t=(e||"").trim(),r=t.match(/```json\s*([\s\S]*?)\s*```/i),n=r?r[1].trim():t,s=n.indexOf("{"),a=n.lastIndexOf("}");if(s>=0&&a>s){const i=n.slice(s,a+1);return JSON.parse(i)}return JSON.parse(n)}async function Dn(e,t){var o,c,u,f,h;const r=z(e.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=z(e.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,a={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let i=0,l=500;for(;i<3;){i++;const g=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(g.ok){const y=await g.json();return{ok:!0,text:((h=(f=(u=(c=(o=y==null?void 0:y.candidates)==null?void 0:o[0])==null?void 0:c.content)==null?void 0:u.parts)==null?void 0:f[0])==null?void 0:h.text)??"",raw:y}}if(g.status===429||g.status===503){await new Promise(y=>setTimeout(y,l)),l*=2;continue}const O=await g.text().catch(()=>"");throw new Error(`Gemini error ${g.status}: ${O.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}const Ln=`/* MindStory Engine Bundle (compat) */
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
})();`;W.use("/api/*",hn());W.get("/static/ms-engine-bundle.js",e=>e.text(Ln,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));W.get("/favicon.ico",e=>e.body(null,204));W.use("/static/*",En({root:"./public"}));W.get("/",e=>e.html(`<!DOCTYPE html>
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
</html>`));W.get("/api/health",e=>{const t=!!z(e.env.GEMINI_API_KEY).trim(),r=z(e.env.USE_MOCK).trim().toLowerCase()==="true";return e.json({ok:!0,ts:_t(),hasDB:!!e.env.DB,hasGeminiKey:t,engineMode:t&&!r?"gemini+fallback":"local-only"})});W.post("/api/engine",async e=>{var O;const t=Date.now(),r=e.env.DB;await In(r);let n=null;try{n=await e.req.json()}catch{return e.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=Cn(n==null?void 0:n.kind),a=z((n==null?void 0:n.text)||""),i=On((n==null?void 0:n.mode)||(n==null?void 0:n.level)),l=jn((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),o=z(((O=n==null?void 0:n.options)==null?void 0:O.userId)||(n==null?void 0:n.userId)||"anon");if(!a.trim()||a.trim().length<5)return e.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const c=Mn(s,i,l,a,o||null),u=await Nn(r,c);if(u.hit)return e.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,engine:"cache",elapsedMs:Date.now()-t}},200);const f=!!z(e.env.GEMINI_API_KEY).trim(),h=z(e.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&f&&!h)try{const y=Pn(a,i,l),v=await Dn(e.env,y);let p;if(l==="narrative")p={kind:"summary",mode:i,viewType:l,narrative:(v.text||"").trim()};else{const b=Hn(v.text||"");l==="structured"?p={kind:"summary",mode:i,viewType:l,structured:{title:b.title||"구조화 요약",bullets:b.bullets||[]}}:l==="mindmap"?p={kind:"summary",mode:i,viewType:l,mindmap:b}:p={kind:"summary",mode:i,viewType:l,selftest:b}}return await Ue(r,c,o||"anon",p),e.json({ok:!0,data:p,meta:{cached:!1,engine:"gemini",elapsedMs:Date.now()-t}},200)}catch(y){const v=nt(a,i,l);return await Ue(r,c,o||"anon",v),e.json({ok:!0,data:v,meta:{cached:!1,engine:"local(fallback)",geminiError:y!=null&&y.message?String(y.message).slice(0,180):"unknown",elapsedMs:Date.now()-t}},200)}let g;if(s==="summary")g=nt(a,i,l);else if(s==="concept"){const y=Je(a),v=Ve(y,pe(Math.round(y.length*.25),6,10));g={kind:s,mode:i,viewType:l,concepts:v.map((p,b)=>({term:`핵심개념${b+1}`,definition:p.slice(0,120)}))}}else{const y=Je(a),v=Ve(y,pe(Math.round(y.length*.22),6,10));g={kind:s,mode:i,viewType:l,items:v.map((p,b)=>({id:`e${b+1}`,type:"mcq",question:`(${b+1}) 다음 설명의 핵심 요지는 무엇인가요?`,choices:["핵심 주장/요지","근거/예시","반박/한계","주제와 무관"],answerIndex:0,explanation:p}))}}return await Ue(r,c,o||"anon",g),e.json({ok:!0,data:g,meta:{cached:!1,engine:f&&!h?"local(no-gemini-for-kind)":"local",elapsedMs:Date.now()-t}},200)});W.notFound(e=>e.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const rt=new jt,Bn=Object.assign({"/src/index.tsx":W});let $t=!1;for(const[,e]of Object.entries(Bn))e&&(rt.route("/",e),rt.notFound(e.notFoundHandler),$t=!0);if(!$t)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{rt as default};
