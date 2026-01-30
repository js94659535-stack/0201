var Ut=Object.defineProperty;var it=e=>{throw TypeError(e)};var Gt=(e,t,r)=>t in e?Ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var b=(e,t,r)=>Gt(e,typeof t!="symbol"?t+"":t,r),Qe=(e,t,r)=>t.has(e)||it("Cannot "+r);var d=(e,t,r)=>(Qe(e,t,"read from private field"),r?r.call(e):t.get(e)),y=(e,t,r)=>t.has(e)?it("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),v=(e,t,r,n)=>(Qe(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),C=(e,t,r)=>(Qe(e,t,"access private method"),r);var ot=(e,t,r,n)=>({set _(s){v(e,t,s,r)},get _(){return d(e,t,n)}});var ct=(e,t,r)=>(n,s)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let c,l=!1,u;if(e[o]?(u=e[o][0][0],n.req.routeIndex=o):u=o===e.length&&s||void 0,u)try{c=await u(n,()=>i(o+1))}catch(h){if(h instanceof Error&&t)n.error=h,c=await t(h,n),l=!0;else throw h}else n.finalized===!1&&r&&(c=await r(n));return c&&(n.finalized===!1||l)&&(n.res=c),n}},Vt=Symbol(),Wt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:n=!1}=t,a=(e instanceof Rt?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Yt(e,{all:r,dot:n}):{}};async function Yt(e,t){const r=await e.formData();return r?Jt(r,t):{}}function Jt(e,t){const r=Object.create(null);return e.forEach((n,s)=>{t.all||s.endsWith("[]")?Xt(r,s,n):r[s]=n}),t.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(Qt(r,n,s),delete r[n])}),r}var Xt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Qt=(e,t,r)=>{let n=e;const s=t.split(".");s.forEach((a,i)=>{i===s.length-1?n[a]=r:((!n[a]||typeof n[a]!="object"||Array.isArray(n[a])||n[a]instanceof File)&&(n[a]=Object.create(null)),n=n[a])})},Ct=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Zt=e=>{const{groups:t,path:r}=en(e),n=Ct(r);return tn(n,t)},en=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return t.push([s,r]),s}),{groups:t,path:e}},tn=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[n]=t[r];for(let s=e.length-1;s>=0;s--)if(e[s].includes(n)){e[s]=e[s].replace(n,t[r][1]);break}}return e},Fe={},nn=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${e}#${t}`;return Fe[n]||(r[2]?Fe[n]=t&&t[0]!==":"&&t[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Fe[n]=[e,r[1],!0]),Fe[n]}return null},at=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},rn=e=>at(e,decodeURI),jt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let n=r;for(;n<t.length;n++){const s=t.charCodeAt(n);if(s===37){const a=t.indexOf("?",n),i=t.slice(r,a===-1?void 0:a);return rn(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(s===63)break}return t.slice(r,n)},sn=e=>{const t=jt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},be=(e,t,...r)=>(r.length&&(t=be(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Tt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let n="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const a=s.replace("?","");n+="/"+a,r.push(n)}else n+="/"+s}),r.filter((s,a,i)=>i.indexOf(s)===a)},Ze=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?at(e,kt):e):e,Ot=(e,t,r)=>{let n;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const c=i+t.length+2,l=e.indexOf("&",c);return Ze(e.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(n=/[%+]/.test(e),!n)return}const s={};n??(n=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let c=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(n&&(c=Ze(c)),a=i,c==="")continue;let l;o===-1?l="":(l=e.slice(o+1,i===-1?void 0:i),n&&(l=Ze(l))),r?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return t?s[t]:s},an=Ot,on=(e,t)=>Ot(e,t,!0),kt=decodeURIComponent,lt=e=>at(e,kt),Se,q,ee,_t,Mt,nt,ne,bt,Rt=(bt=class{constructor(e,t="/",r=[[]]){y(this,ee);b(this,"raw");y(this,Se);y(this,q);b(this,"routeIndex",0);b(this,"path");b(this,"bodyCache",{});y(this,ne,e=>{const{bodyCache:t,raw:r}=this,n=t[e];if(n)return n;const s=Object.keys(t)[0];return s?t[s].then(a=>(s==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,v(this,q,r),v(this,Se,{})}param(e){return e?C(this,ee,_t).call(this,e):C(this,ee,Mt).call(this)}query(e){return an(this.url,e)}queries(e){return on(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,n)=>{t[n]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Wt(this,e))}json(){return d(this,ne).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,ne).call(this,"text")}arrayBuffer(){return d(this,ne).call(this,"arrayBuffer")}blob(){return d(this,ne).call(this,"blob")}formData(){return d(this,ne).call(this,"formData")}addValidatedData(e,t){d(this,Se)[e]=t}valid(e){return d(this,Se)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Vt](){return d(this,q)}get matchedRoutes(){return d(this,q)[0].map(([[,e]])=>e)}get routePath(){return d(this,q)[0].map(([[,e]])=>e)[this.routeIndex].path}},Se=new WeakMap,q=new WeakMap,ee=new WeakSet,_t=function(e){const t=d(this,q)[0][this.routeIndex][1][e],r=C(this,ee,nt).call(this,t);return r&&/\%/.test(r)?lt(r):r},Mt=function(){const e={},t=Object.keys(d(this,q)[0][this.routeIndex][1]);for(const r of t){const n=C(this,ee,nt).call(this,d(this,q)[0][this.routeIndex][1][r]);n!==void 0&&(e[r]=/\%/.test(n)?lt(n):n)}return e},nt=function(e){return d(this,q)[1]?d(this,q)[1][e]:e},ne=new WeakMap,bt),cn={Stringify:1},At=async(e,t,r,n,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(s?s[0]+=e:s=[e],Promise.all(a.map(o=>o({phase:t,buffer:s,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(c=>At(c,t,!1,n,s))).then(()=>s[0]))):Promise.resolve(e)},ln="text/plain; charset=UTF-8",et=(e,t)=>({"Content-Type":e,...t}),Ie,Ne,J,$e,X,z,Pe,Ce,je,ue,He,De,re,we,wt,dn=(wt=class{constructor(e,t){y(this,re);y(this,Ie);y(this,Ne);b(this,"env",{});y(this,J);b(this,"finalized",!1);b(this,"error");y(this,$e);y(this,X);y(this,z);y(this,Pe);y(this,Ce);y(this,je);y(this,ue);y(this,He);y(this,De);b(this,"render",(...e)=>(d(this,Ce)??v(this,Ce,t=>this.html(t)),d(this,Ce).call(this,...e)));b(this,"setLayout",e=>v(this,Pe,e));b(this,"getLayout",()=>d(this,Pe));b(this,"setRenderer",e=>{v(this,Ce,e)});b(this,"header",(e,t,r)=>{this.finalized&&v(this,z,new Response(d(this,z).body,d(this,z)));const n=d(this,z)?d(this,z).headers:d(this,ue)??v(this,ue,new Headers);t===void 0?n.delete(e):r!=null&&r.append?n.append(e,t):n.set(e,t)});b(this,"status",e=>{v(this,$e,e)});b(this,"set",(e,t)=>{d(this,J)??v(this,J,new Map),d(this,J).set(e,t)});b(this,"get",e=>d(this,J)?d(this,J).get(e):void 0);b(this,"newResponse",(...e)=>C(this,re,we).call(this,...e));b(this,"body",(e,t,r)=>C(this,re,we).call(this,e,t,r));b(this,"text",(e,t,r)=>!d(this,ue)&&!d(this,$e)&&!t&&!r&&!this.finalized?new Response(e):C(this,re,we).call(this,e,t,et(ln,r)));b(this,"json",(e,t,r)=>C(this,re,we).call(this,JSON.stringify(e),t,et("application/json",r)));b(this,"html",(e,t,r)=>{const n=s=>C(this,re,we).call(this,s,t,et("text/html; charset=UTF-8",r));return typeof e=="object"?At(e,cn.Stringify,!1,{}).then(n):n(e)});b(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});b(this,"notFound",()=>(d(this,je)??v(this,je,()=>new Response),d(this,je).call(this,this)));v(this,Ie,e),t&&(v(this,X,t.executionCtx),this.env=t.env,v(this,je,t.notFoundHandler),v(this,De,t.path),v(this,He,t.matchResult))}get req(){return d(this,Ne)??v(this,Ne,new Rt(d(this,Ie),d(this,De),d(this,He))),d(this,Ne)}get event(){if(d(this,X)&&"respondWith"in d(this,X))return d(this,X);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,X))return d(this,X);throw Error("This context has no ExecutionContext")}get res(){return d(this,z)||v(this,z,new Response(null,{headers:d(this,ue)??v(this,ue,new Headers)}))}set res(e){if(d(this,z)&&e){e=new Response(e.body,e);for(const[t,r]of d(this,z).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const n=d(this,z).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of n)e.headers.append("set-cookie",s)}else e.headers.set(t,r)}v(this,z,e),this.finalized=!0}get var(){return d(this,J)?Object.fromEntries(d(this,J)):{}}},Ie=new WeakMap,Ne=new WeakMap,J=new WeakMap,$e=new WeakMap,X=new WeakMap,z=new WeakMap,Pe=new WeakMap,Ce=new WeakMap,je=new WeakMap,ue=new WeakMap,He=new WeakMap,De=new WeakMap,re=new WeakSet,we=function(e,t,r){const n=d(this,z)?new Headers(d(this,z).headers):d(this,ue)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?n.append(i,o):n.set(i,o)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")n.set(a,i);else{n.delete(a);for(const o of i)n.append(a,o)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,$e);return new Response(e,{status:s,headers:n})},wt),A="ALL",un="all",hn=["get","post","put","delete","options","patch"],It="Can not add a route since the matcher is already built.",Nt=class extends Error{},pn="__COMPOSED_HANDLER",fn=e=>e.text("404 Not Found",404),dt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},G,I,Pt,V,le,ze,qe,Te,gn=(Te=class{constructor(t={}){y(this,I);b(this,"get");b(this,"post");b(this,"put");b(this,"delete");b(this,"options");b(this,"patch");b(this,"all");b(this,"on");b(this,"use");b(this,"router");b(this,"getPath");b(this,"_basePath","/");y(this,G,"/");b(this,"routes",[]);y(this,V,fn);b(this,"errorHandler",dt);b(this,"onError",t=>(this.errorHandler=t,this));b(this,"notFound",t=>(v(this,V,t),this));b(this,"fetch",(t,...r)=>C(this,I,qe).call(this,t,r[1],r[0],t.method));b(this,"request",(t,r,n,s)=>t instanceof Request?this.fetch(r?new Request(t,r):t,n,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${be("/",t)}`,r),n,s)));b(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(C(this,I,qe).call(this,t.request,t,void 0,t.request.method))})});[...hn,un].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?v(this,G,i):C(this,I,le).call(this,a,d(this,G),i),o.forEach(c=>{C(this,I,le).call(this,a,d(this,G),c)}),this)}),this.on=(a,i,...o)=>{for(const c of[i].flat()){v(this,G,c);for(const l of[a].flat())o.map(u=>{C(this,I,le).call(this,l.toUpperCase(),d(this,G),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?v(this,G,a):(v(this,G,"*"),i.unshift(a)),i.forEach(o=>{C(this,I,le).call(this,A,d(this,G),o)}),this);const{strict:n,...s}=t;Object.assign(this,s),this.getPath=n??!0?t.getPath??jt:sn}route(t,r){const n=this.basePath(t);return r.routes.map(s=>{var i;let a;r.errorHandler===dt?a=s.handler:(a=async(o,c)=>(await ct([],r.errorHandler)(o,()=>s.handler(o,c))).res,a[pn]=s.handler),C(i=n,I,le).call(i,s.method,s.path,a)}),this}basePath(t){const r=C(this,I,Pt).call(this);return r._basePath=be(this._basePath,t),r}mount(t,r,n){let s,a;n&&(typeof n=="function"?a=n:(a=n.optionHandler,n.replaceRequest===!1?s=c=>c:s=n.replaceRequest));const i=a?c=>{const l=a(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=be(this._basePath,t),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const o=async(c,l)=>{const u=await r(s(c.req.raw),...i(c));if(u)return u;await l()};return C(this,I,le).call(this,A,be(t,"*"),o),this}},G=new WeakMap,I=new WeakSet,Pt=function(){const t=new Te({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,v(t,V,d(this,V)),t.routes=this.routes,t},V=new WeakMap,le=function(t,r,n){t=t.toUpperCase(),r=be(this._basePath,r);const s={basePath:this._basePath,path:r,method:t,handler:n};this.router.add(t,r,[n,s]),this.routes.push(s)},ze=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},qe=function(t,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await C(this,I,qe).call(this,t,r,n,"GET")))();const a=this.getPath(t,{env:n}),i=this.router.match(s,a),o=new dn(t,{path:a,matchResult:i,env:n,executionCtx:r,notFoundHandler:d(this,V)});if(i[0].length===1){let l;try{l=i[0][0][0][0](o,async()=>{o.res=await d(this,V).call(this,o)})}catch(u){return C(this,I,ze).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,V).call(this,o))).catch(u=>C(this,I,ze).call(this,u,o)):l??d(this,V).call(this,o)}const c=ct(i[0],this.errorHandler,d(this,V));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return C(this,I,ze).call(this,l,o)}})()},Te),Ht=[];function mn(e,t){const r=this.buildAllMatchers(),n=(s,a)=>{const i=r[s]||r[A],o=i[2][a];if(o)return o;const c=a.match(i[0]);if(!c)return[[],Ht];const l=c.indexOf("",1);return[i[1][l],c]};return this.match=n,n(e,t)}var Ge="[^/]+",Me=".*",Ae="(?:|/.*)",ye=Symbol(),xn=new Set(".\\+*[^]$()");function vn(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Me||e===Ae?1:t===Me||t===Ae?-1:e===Ge?1:t===Ge?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var he,pe,W,me,bn=(me=class{constructor(){y(this,he);y(this,pe);y(this,W,Object.create(null))}insert(t,r,n,s,a){if(t.length===0){if(d(this,he)!==void 0)throw ye;if(a)return;v(this,he,r);return}const[i,...o]=t,c=i==="*"?o.length===0?["","",Me]:["","",Ge]:i==="/*"?["","",Ae]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Ge;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ye;if(l=d(this,W)[h],!l){if(Object.keys(d(this,W)).some(x=>x!==Me&&x!==Ae))throw ye;if(a)return;l=d(this,W)[h]=new me,u!==""&&v(l,pe,s.varIndex++)}!a&&u!==""&&n.push([u,d(l,pe)])}else if(l=d(this,W)[i],!l){if(Object.keys(d(this,W)).some(u=>u.length>1&&u!==Me&&u!==Ae))throw ye;if(a)return;l=d(this,W)[i]=new me}l.insert(o,r,n,s,a)}buildRegExpStr(){const r=Object.keys(d(this,W)).sort(vn).map(n=>{const s=d(this,W)[n];return(typeof d(s,pe)=="number"?`(${n})@${d(s,pe)}`:xn.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof d(this,he)=="number"&&r.unshift(`#${d(this,he)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},he=new WeakMap,pe=new WeakMap,W=new WeakMap,me),We,Le,yt,wn=(yt=class{constructor(){y(this,We,{varIndex:0});y(this,Le,new bn)}insert(e,t,r){const n=[],s=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${i}`;return s[i]=[l,c],i++,o=!0,l}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[o]=s[i];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(o)!==-1){a[c]=a[c].replace(o,s[i][1]);break}}return d(this,Le).insert(a,t,n,d(this,We),r),n}buildRegExp(){let e=d(this,Le).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],n=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(n[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,n]}},We=new WeakMap,Le=new WeakMap,yt),yn=[/^$/,[],Object.create(null)],Ke=Object.create(null);function Dt(e){return Ke[e]??(Ke[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function En(){Ke=Object.create(null)}function Sn(e){var l;const t=new wn,r=[];if(e.length===0)return yn;const n=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[x,E])=>u?1:x?-1:h.length-E.length),s=Object.create(null);for(let u=0,h=-1,x=n.length;u<x;u++){const[E,O,T]=n[u];E?s[O]=[T.map(([g])=>[g,Object.create(null)]),Ht]:h++;let S;try{S=t.insert(O,h,E)}catch(g){throw g===ye?new Nt(O):g}E||(r[h]=T.map(([g,f])=>{const m=Object.create(null);for(f-=1;f>=0;f--){const[j,p]=S[f];m[j]=p}return[g,m]}))}const[a,i,o]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let x=0,E=r[u].length;x<E;x++){const O=(l=r[u][x])==null?void 0:l[1];if(!O)continue;const T=Object.keys(O);for(let S=0,g=T.length;S<g;S++)O[T[S]]=o[O[T[S]]]}const c=[];for(const u in i)c[u]=r[i[u]];return[a,c,s]}function ve(e,t){if(e){for(const r of Object.keys(e).sort((n,s)=>s.length-n.length))if(Dt(r).test(t))return[...e[r]]}}var se,ae,Ye,Lt,Et,$n=(Et=class{constructor(){y(this,Ye);b(this,"name","RegExpRouter");y(this,se);y(this,ae);b(this,"match",mn);v(this,se,{[A]:Object.create(null)}),v(this,ae,{[A]:Object.create(null)})}add(e,t,r){var o;const n=d(this,se),s=d(this,ae);if(!n||!s)throw new Error(It);n[e]||[n,s].forEach(c=>{c[e]=Object.create(null),Object.keys(c[A]).forEach(l=>{c[e][l]=[...c[A][l]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Dt(t);e===A?Object.keys(n).forEach(l=>{var u;(u=n[l])[t]||(u[t]=ve(n[l],t)||ve(n[A],t)||[])}):(o=n[e])[t]||(o[t]=ve(n[e],t)||ve(n[A],t)||[]),Object.keys(n).forEach(l=>{(e===A||e===l)&&Object.keys(n[l]).forEach(u=>{c.test(u)&&n[l][u].push([r,a])})}),Object.keys(s).forEach(l=>{(e===A||e===l)&&Object.keys(s[l]).forEach(u=>c.test(u)&&s[l][u].push([r,a]))});return}const i=Tt(t)||[t];for(let c=0,l=i.length;c<l;c++){const u=i[c];Object.keys(s).forEach(h=>{var x;(e===A||e===h)&&((x=s[h])[u]||(x[u]=[...ve(n[h],u)||ve(n[A],u)||[]]),s[h][u].push([r,a-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(d(this,ae)).concat(Object.keys(d(this,se))).forEach(t=>{e[t]||(e[t]=C(this,Ye,Lt).call(this,t))}),v(this,se,v(this,ae,void 0)),En(),e}},se=new WeakMap,ae=new WeakMap,Ye=new WeakSet,Lt=function(e){const t=[];let r=e===A;return[d(this,se),d(this,ae)].forEach(n=>{const s=n[e]?Object.keys(n[e]).map(a=>[a,n[e][a]]):[];s.length!==0?(r||(r=!0),t.push(...s)):e!==A&&t.push(...Object.keys(n[A]).map(a=>[a,n[A][a]]))}),r?Sn(t):null},Et),ie,Q,St,Cn=(St=class{constructor(e){b(this,"name","SmartRouter");y(this,ie,[]);y(this,Q,[]);v(this,ie,e.routers)}add(e,t,r){if(!d(this,Q))throw new Error(It);d(this,Q).push([e,t,r])}match(e,t){if(!d(this,Q))throw new Error("Fatal error");const r=d(this,ie),n=d(this,Q),s=r.length;let a=0,i;for(;a<s;a++){const o=r[a];try{for(let c=0,l=n.length;c<l;c++)o.add(...n[c]);i=o.match(e,t)}catch(c){if(c instanceof Nt)continue;throw c}this.match=o.match.bind(o),v(this,ie,[o]),v(this,Q,void 0);break}if(a===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,Q)||d(this,ie).length!==1)throw new Error("No active router has been determined yet.");return d(this,ie)[0]}},ie=new WeakMap,Q=new WeakMap,St),_e=Object.create(null),oe,L,fe,Oe,H,Z,de,ke,jn=(ke=class{constructor(t,r,n){y(this,Z);y(this,oe);y(this,L);y(this,fe);y(this,Oe,0);y(this,H,_e);if(v(this,L,n||Object.create(null)),v(this,oe,[]),t&&r){const s=Object.create(null);s[t]={handler:r,possibleKeys:[],score:0},v(this,oe,[s])}v(this,fe,[])}insert(t,r,n){v(this,Oe,++ot(this,Oe)._);let s=this;const a=Zt(r),i=[];for(let o=0,c=a.length;o<c;o++){const l=a[o],u=a[o+1],h=nn(l,u),x=Array.isArray(h)?h[0]:l;if(x in d(s,L)){s=d(s,L)[x],h&&i.push(h[1]);continue}d(s,L)[x]=new ke,h&&(d(s,fe).push(h),i.push(h[1])),s=d(s,L)[x]}return d(s,oe).push({[t]:{handler:n,possibleKeys:i.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,Oe)}}),s}search(t,r){var c;const n=[];v(this,H,_e);let a=[this];const i=Ct(r),o=[];for(let l=0,u=i.length;l<u;l++){const h=i[l],x=l===u-1,E=[];for(let O=0,T=a.length;O<T;O++){const S=a[O],g=d(S,L)[h];g&&(v(g,H,d(S,H)),x?(d(g,L)["*"]&&n.push(...C(this,Z,de).call(this,d(g,L)["*"],t,d(S,H))),n.push(...C(this,Z,de).call(this,g,t,d(S,H)))):E.push(g));for(let f=0,m=d(S,fe).length;f<m;f++){const j=d(S,fe)[f],p=d(S,H)===_e?{}:{...d(S,H)};if(j==="*"){const w=d(S,L)["*"];w&&(n.push(...C(this,Z,de).call(this,w,t,d(S,H))),v(w,H,p),E.push(w));continue}const[k,N,K]=j;if(!h&&!(K instanceof RegExp))continue;const P=d(S,L)[k],Je=i.slice(l).join("/");if(K instanceof RegExp){const w=K.exec(Je);if(w){if(p[N]=w[0],n.push(...C(this,Z,de).call(this,P,t,d(S,H),p)),Object.keys(d(P,L)).length){v(P,H,p);const $=((c=w[0].match(/\//))==null?void 0:c.length)??0;(o[$]||(o[$]=[])).push(P)}continue}}(K===!0||K.test(h))&&(p[N]=h,x?(n.push(...C(this,Z,de).call(this,P,t,p,d(S,H))),d(P,L)["*"]&&n.push(...C(this,Z,de).call(this,d(P,L)["*"],t,p,d(S,H)))):(v(P,H,p),E.push(P)))}}a=E.concat(o.shift()??[])}return n.length>1&&n.sort((l,u)=>l.score-u.score),[n.map(({handler:l,params:u})=>[l,u])]}},oe=new WeakMap,L=new WeakMap,fe=new WeakMap,Oe=new WeakMap,H=new WeakMap,Z=new WeakSet,de=function(t,r,n,s){const a=[];for(let i=0,o=d(t,oe).length;i<o;i++){const c=d(t,oe)[i],l=c[r]||c[A],u={};if(l!==void 0&&(l.params=Object.create(null),a.push(l),n!==_e||s&&s!==_e))for(let h=0,x=l.possibleKeys.length;h<x;h++){const E=l.possibleKeys[h],O=u[l.score];l.params[E]=s!=null&&s[E]&&!O?s[E]:n[E]??(s==null?void 0:s[E]),u[l.score]=!0}}return a},ke),ge,$t,Tn=($t=class{constructor(){b(this,"name","TrieRouter");y(this,ge);v(this,ge,new jn)}add(e,t,r){const n=Tt(t);if(n){for(let s=0,a=n.length;s<a;s++)d(this,ge).insert(e,n[s],r);return}d(this,ge).insert(e,t,r)}match(e,t){return d(this,ge).search(e,t)}},ge=new WeakMap,$t),Bt=class extends gn{constructor(e={}){super(e),this.router=e.router??new Cn({routers:[new $n,new Tn]})}},On=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},n=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),s=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,o){var u;function c(h,x){i.res.headers.set(h,x)}const l=await n(i.req.header("origin")||"",i);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const h=await s(i.req.header("origin")||"",i);h.length&&c("Access-Control-Allow-Methods",h.join(","));let x=r.allowHeaders;if(!(x!=null&&x.length)){const E=i.req.header("Access-Control-Request-Headers");E&&(x=E.split(/\s*,\s*/))}return x!=null&&x.length&&(c("Access-Control-Allow-Headers",x.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},kn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ut=(e,t=_n)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=e.match(r);if(!n)return;let s=t[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Rn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},_n=Rn,Mn=(...e)=>{let t=e.filter(s=>s!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},Ft={br:".br",zstd:".zst",gzip:".gz"},An=Object.keys(Ft),In="index.html",Nn=e=>{const t=e.root??"./",r=e.path,n=e.join??Mn;return async(s,a)=>{var u,h,x,E;if(s.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,s.req.path,s)),a()}let o=n(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(o)&&(o=n(o,In));const c=e.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const O=e.mimes&&ut(o,e.mimes)||ut(o);if(s.header("Content-Type",O||"application/octet-stream"),e.precompressed&&(!O||kn.test(O))){const T=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(S=>S.trim()));for(const S of An){if(!T.has(S))continue;const g=await c(o+Ft[S],s);if(g){l=g,s.header("Content-Encoding",S),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((x=e.onFound)==null?void 0:x.call(e,o,s)),s.body(l)}await((E=e.onNotFound)==null?void 0:E.call(e,o,s)),await a()}},Pn=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;t&&t.namespace?n=t.namespace:n=__STATIC_CONTENT;const s=r[e];if(!s)return null;const a=await n.get(s,{type:"stream"});return a||null},Hn=e=>async function(r,n){return Nn({...e,getContent:async a=>Pn(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},Dn=e=>Hn(e);const te=new Bt,Ue=new Map,Ln=1e3*60*60*24*7;let tt=!1;function zt(){return new Date().toISOString()}function Y(e){return e==null?"":String(e)}function Ee(e,t,r){return Math.max(t,Math.min(r,e))}function Bn(e){const t=Y(e).trim().toLowerCase();return t?t==="brief"||t==="simple"||t==="short"||t==="lite"?"brief":t==="detail"||t==="detailed"||t==="full"?"detail":"standard":"standard"}function Fn(e){const t=Y(e).trim().toLowerCase();return t?t==="narrative"||t==="structured"||t==="mindmap"||t==="selftest"?t:t==="mind-map"||t==="mind_map"?"mindmap":"narrative":"narrative"}function zn(e){const t=Y(e).trim().toLowerCase();return t==="concept"?"concept":t==="exam"?"exam":"summary"}function rt(e){const t=(e||"").replace(/\s+/g," ").trim();if(!t)return[];const r=[];let n="",s=!1;for(let a=0;a<t.length;a++){const i=t[a],o=t[a+1];(i==='"'||i==='"'||i==='"')&&(s=!s),n+=i,!s&&/[\.\?\!]/.test(i)&&o===" "?i==="."&&n.endsWith("...")||(r.push(n.trim()),n="",a++):!s&&/[다요죠]/.test(i)&&o===" "&&(r.push(n.trim()),n="",a++)}return n.trim()&&r.push(n.trim()),r.length?r:[t]}const qn=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),Kn=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function Un(e){const t=new Set;for(const r of e){let n=!1;for(const s of Kn)if(s.has(r)){t.add(Array.from(s)[0]),n=!0;break}n||t.add(r)}return t}function Ve(e){return(e||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(t=>t.trim()).map(t=>t.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(t=>t.length>=2&&!qn.has(t))}function Gn(e){const t=new Map;for(const n of e)for(const s of Ve(n))t.set(s,(t.get(s)||0)+1);return e.map((n,s)=>{const a=Ve(n);let i=0;for(const l of a)i+=t.get(l)||0;const o=n.length,c=o<15?.7:o>180?.85:1;return{idx:s,s:n,score:i*c}})}function st(e,t){return Gn(e).slice().sort((s,a)=>a.score-s.score).slice(0,Ee(t,1,Math.max(1,e.length))).sort((s,a)=>s.idx-a.idx).map(s=>s.s)}function Vn(e,t,r){const n=t.length,s=[],a=new Set,i=/\(([^)]+,?\s*\d{4})\)/g;let o;for(;(o=i.exec(t))!==null;)a.add(o[1]);for(const g of e){const f=[];let m;const j=/\(([^)]+,?\s*\d{4})\)/g;for(;(m=j.exec(g))!==null;){const N=m[1];a.has(N)&&f.push(N)}let p=g.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(p.length<10)continue;const k=Ve(p).slice(0,8);s.push({original:g,clean:p,keywords:k,citations:f})}if(s.length===0)return"요약할 내용이 부족합니다.";const c=new Map;for(const g of s)for(const f of g.keywords)c.set(f,(c.get(f)||0)+1);const l=[];for(const g of s){new Set(g.keywords);let f=!1;for(const m of l)if(g.keywords.filter(p=>m.keywords.has(p)).length>=2){m.sentences.push({clean:g.clean,citations:g.citations}),g.keywords.forEach(p=>m.keywords.add(p)),f=!0;break}f||l.push({keywords:new Set(g.keywords),sentences:[{clean:g.clean,citations:g.citations}]})}const u=l.map(g=>{const f=g.sentences[0].clean,m=s.findIndex(j=>j.clean===f);return{...g,originalIdx:m}});let h="";if(r==="brief"){const g=u.sort((k,N)=>N.sentences.length-k.sentences.length)[0],f=g.sentences[0],m=g.sentences.flatMap(k=>k.citations).filter(Boolean),j=m.length>0?`(${m.join("; ")})`:"";if(h=`${f.clean}${j}.`,h.length/n*100>15){const k=f.clean.slice(0,30)+".",N=m.length>0?`(${m[0]})`:"";h=`${k}${N}`}return h}if(r==="standard"){const g=u.sort((w,$)=>$.sentences.length-w.sentences.length).slice(0,3).sort((w,$)=>w.originalIdx-$.originalIdx);if(g.length===1){const w=g[0].sentences[0],$=g[0].sentences.flatMap(B=>B.citations).filter(Boolean),D=$.length>0?`(${$.join("; ")})`:"";return`${w.clean}${D}.`}const f=new Map,m=new Map,j={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const w of g)for(const $ of w.sentences){const D=$.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(D){let[,B,Be]=D;B=B.replace(/[에게서로부터]$/g,"").trim(),f.has(B)||f.set(B,[]);let F=Be.trim();F=F.replace(/[\.。\?\!]+$/g,"").trim();for(const[M,Re]of Object.entries(j))if(F.includes(M)){const xe=m.get(M)||0;if(m.set(M,xe+1),xe>=1&&Re.length>0){const Xe=Math.min(xe-1,Re.length-1);F=F.replace(M,Re[Xe])}}const R=new Set(Ve(F)),_=Un(R),U=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const M of U)_.delete(M);f.get(B).push({original:F,keywords:_,citations:$.citations})}}const p=[];for(const[w,$]of f.entries()){const D=$.flatMap(R=>R.citations).filter(Boolean),B=w.charAt(w.length-1),F=/[가-힣]/.test(B)&&(B.charCodeAt(0)-44032)%28!==0?"은":"는";if($.length===1){const R=$[0].original,_=(R.match(/,/g)||[]).length;if(R.length>80&&_>=2){const U=R.split(",").map(M=>M.trim()).filter(M=>M.length>0);if(U.length>=2){p.push({text:`${w}${F} ${U[0]}입니다`,citations:[]});for(let M=1;M<U.length-1;M++)p.push({text:`이는 ${U[M]}입니다`,citations:[]});p.push({text:`또한 ${U[U.length-1]}`,citations:$[0].citations})}else p.push({text:`${w}${F} ${R}`,citations:D})}else p.push({text:`${w}${F} ${R}`,citations:D})}else{const R=[];for(const _ of $){let U=!1;for(const M of R){const Re=Array.from(_.keywords).filter(Xe=>M.keywords.has(Xe)).length,xe=Math.max(_.keywords.size,M.keywords.size);if(xe>0&&Re/xe>=.8){_.original.length>M.original.length&&(M.original=_.original,M.keywords=_.keywords),M.citations.push(..._.citations),U=!0;break}}U||R.push({original:_.original,keywords:_.keywords,citations:[..._.citations]})}if(R.length===1)p.push({text:`${w}${F} ${R[0].original}`,citations:R.flatMap(_=>_.citations)});else if(R.length===2)p.push({text:`${w}${F} ${R[0].original}`,citations:R[0].citations}),p.push({text:`${w}${F} ${R[1].original}`,citations:R[1].citations});else for(let _=0;_<R.length;_++)p.push({text:`${w}${F} ${R[_].original}`,citations:R[_].citations})}}if(p.length===0)return"요약할 내용이 부족합니다.";if(p.length===1){const w=p[0].citations.filter(Boolean),$=w.length>0?`(${w.join("; ")})`:"";return`${p[0].text}${$}.`}if(p.length===2){const w=p[0].citations.filter(Boolean),$=p[1].citations.filter(Boolean),D=w.length>0?`(${w.join("; ")})`:"",B=$.length>0?`(${$.join("; ")})`:"";return`${p[0].text}${D}. ${p[1].text}${B}.`}const k=[],N=p[0],K=N.citations.filter(Boolean),P=K.length>0?`(${K.join("; ")})`:"";if(k.push(`${N.text}${P}.`),p.length>=2){const w=p[1],$=w.citations.filter(Boolean),D=$.length>0?`(${$.join("; ")})`:"";k.push(`${w.text}${D}.`)}if(p.length>=3){const $=p.slice(2).map(D=>{const B=D.citations.filter(Boolean),Be=B.length>0?`(${B.join("; ")})`:"";return`${D.text}${Be}.`});k.push($.join(" "))}return h=k.join(`

`),h.length/n*100>30&&(h=k[0]),h}const x=u.sort((g,f)=>f.sentences.length-g.sentences.length).slice(0,5).sort((g,f)=>g.originalIdx-f.originalIdx);let E=x.map((g,f)=>{const m=g.sentences[0],j=g.sentences.flatMap(k=>k.citations).filter(Boolean),p=j.length>0?`(${j.join("; ")})`:"";return f===0?`${m.clean}${p}.`:f===x.length-1?`마지막으로 ${m.clean}${p}.`:`또한 ${m.clean}${p}.`}).join(" ");return E.length/n*100>(r==="brief"?15:r==="standard"?30:55)&&r==="detail"?x.slice(0,3).map((f,m)=>{const j=f.sentences[0],p=f.sentences.flatMap(N=>N.citations).filter(Boolean),k=p.length>0?`(${p.join("; ")})`:"";return m===0?`${j.clean}${k}.`:m===2?`마지막으로 ${j.clean}${k}.`:`또한 ${j.clean}${k}.`}).join(" "):E}function ht(e,t,r){const n=rt(e),s=t==="brief"?Ee(Math.round(n.length*.18),2,4):t==="standard"?Ee(Math.round(n.length*.28),4,8):Ee(Math.round(n.length*.4),7,14),a=st(n,s);if(r==="narrative"){const o=Vn(a,e,t);return{kind:"summary",mode:t,viewType:r,narrative:o}}if(r==="structured")return{kind:"summary",mode:t,viewType:r,structured:{title:"구조화 요약",bullets:a.map((o,c)=>`- (${c+1}) ${o}`)}};if(r==="mindmap"){const o=(a[0]||n[0]||"핵심").slice(0,40),c=[{id:"c",label:o,level:0}],l=[];return a.slice(1).forEach((u,h)=>{const x=`n${h+1}`;c.push({id:x,label:u.slice(0,60),level:1}),l.push({from:"c",to:x})}),{kind:"summary",mode:t,viewType:r,mindmap:{center:o,nodes:c,edges:l}}}const i=a.map((o,c)=>({id:`q${c+1}`,type:"short",question:`(${c+1}) 다음 내용을 한 문장으로 설명해보세요: "${o.slice(0,70)}"`,answerHint:o}));return{kind:"summary",mode:t,viewType:r,selftest:{title:"셀프테스트",questions:i}}}function qt(e){if(!e)return"empty";let t=2166136261,r=0;for(let a=0;a<e.length;a++){const i=e.charCodeAt(a);t^=i,t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24),r=(r<<5)-r+i,r|=0}const n=(t>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${e.length.toString(16)}_${n}_${s}`}function Wn(e,t,r,n){const s=qt(r);return`${e}::${n||"anon"}::${t}::base::${s}`}function Yn(e,t,r,n,s){const a=qt(n);return`${e}::${s||"anon"}::${t}::${r}::${a}`}async function Jn(e){if(!tt){if(!e){tt=!0;return}await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),tt=!0}}async function pt(e,t){const r=Date.now(),n=Ue.get(t);if(n&&r-n.createdAt<Ln)return{hit:!0,data:n.data,store:"mem"};if(n&&Ue.delete(t),!e)return{hit:!1};const s=await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const a=JSON.parse(s.response_json);return Ue.set(t,{data:a,createdAt:r}),{hit:!0,data:a,store:"d1"}}catch{return{hit:!1}}}async function ce(e,t,r,n){const s=Date.now();Ue.set(t,{data:n,createdAt:s}),e&&await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t,r,JSON.stringify(n),zt()).run()}function Xn(e,t){const n=['당신은 "학습 텍스트 압축 요약" 전문가입니다.','반드시 "중간 글자 자르기" 같은 방식은 금지합니다.',"문장/의미 단위로 재구성하여 자연스러운 한국어로 요약하세요.",`**압축률 목표: ${t==="brief"?"원문 길이의 10~15%":t==="standard"?"원문 길이의 25~30%":"원문 길이의 45~55%"}** (필수)`,"중복 제거, 핵심 개념/관계/원인-결과/절차가 드러나게 요약하세요.","원문에 없는 인용(괄호 숫자)이나 정보는 절대 추가하지 마세요."].join(`
`),s=e.length<300?"1~2개 문단":e.length<600?"2~3개 문단":"3~4개 문단";return`${n}

[출력 형식]
- 한국어 서술 요약 (${s})
- 원문 길이에 비례하여 단락 수 조정

[원문]
${e}`}function ft(e){const t=e.split(/\n\n+/).filter(n=>n.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:t.length>1?t.map((n,s)=>`- (${s+1}) ${n}`):e.split(/[\.。]\s+/).filter(n=>n.trim()).map((n,s)=>`- (${s+1}) ${n}.`)}}}function gt(e){const t=e.split(/[\.。]\s+/).filter(a=>a.trim()).map(a=>a.trim()),r=(t[0]||"핵심").slice(0,40),n=[{id:"c",label:r,level:0}],s=[];return t.slice(1).forEach((a,i)=>{const o=`n${i+1}`;n.push({id:o,label:a.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:r,nodes:n,edges:s}}}function mt(e){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:e.split(/[\.。]\s+/).filter(n=>n.trim()).map(n=>n.trim()).map((n,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${n.slice(0,70)}"`,answerHint:n}))}}}function Qn(e,t,r){const n=e.length,s=t.length,a=n>0?s/n:0;let i=0,o=1;r==="brief"?(i=.1,o=.15):r==="standard"?(i=.25,o=.3):(i=.45,o=.55);const c=a>=i&&a<=o,l=`${(i*100).toFixed(0)}-${(o*100).toFixed(0)}%`;return{valid:c,ratio:a,expected:l}}function Zn(e,t){const r=[],n=new Set,s=/\(([^)]+)\)/g;let a;for(;(a=s.exec(e))!==null;)n.add(a[1].trim());let i=t;return i=i.replace(/\(([^)]+)\)/g,(o,c)=>{const l=c.trim();return n.has(l)?o:(r.push(`제거됨: ${o}`),"")}),i=i.replace(/\s{2,}/g," ").trim(),{cleaned:i,warnings:r}}async function xt(e,t){var c,l,u,h,x;const r=Y(e.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=Y(e.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,a={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let i=0,o=500;for(;i<3;){i++;const E=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(E.ok){const T=await E.json();return{ok:!0,text:((x=(h=(u=(l=(c=T==null?void 0:T.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:x.text)??"",raw:T}}if(E.status===429||E.status===503){await new Promise(T=>setTimeout(T,o)),o*=2;continue}const O=await E.text().catch(()=>"");throw new Error(`Gemini error ${E.status}: ${O.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}const er=`/* MindStory Engine Bundle (compat) */
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
})();`;te.use("/api/*",On());te.get("/static/ms-engine-bundle.js",e=>e.text(er,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));te.get("/favicon.ico",e=>e.body(null,204));te.use("/static/*",Dn({root:"./public"}));te.get("/",e=>e.html(`<!DOCTYPE html>
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
</html>`));te.get("/api/health",e=>{const t=!!Y(e.env.GEMINI_API_KEY).trim(),r=Y(e.env.USE_MOCK).trim().toLowerCase()==="true";return e.json({ok:!0,ts:zt(),hasDB:!!e.env.DB,hasGeminiKey:t,engineMode:t&&!r?"gemini+fallback":"local-only"})});te.post("/api/engine",async e=>{var S,g;const t=Date.now(),r=e.env.DB;await Jn(r);let n=null;try{n=await e.req.json()}catch{return e.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=zn(n==null?void 0:n.kind),a=Y((n==null?void 0:n.text)||""),i=Bn((n==null?void 0:n.mode)||(n==null?void 0:n.level)),o=Fn((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),c=Y(((S=n==null?void 0:n.options)==null?void 0:S.userId)||(n==null?void 0:n.userId)||"anon");if(!a.trim()||a.trim().length<5)return e.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=Yn(s,i,o,a,c||null),u=await pt(r,l);if(u.hit)return e.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-t}},200);const h=Wn(s,i,a,c||null),x=await pt(r,h);if(x.hit&&((g=x.data)!=null&&g.narrative)){const f=x.data.narrative;let m;return o==="narrative"?m={kind:s,mode:i,viewType:o,narrative:f}:o==="structured"?m={kind:s,mode:i,...ft(f)}:o==="mindmap"?m={kind:s,mode:i,...gt(f)}:m={kind:s,mode:i,...mt(f)},await ce(r,l,c||"anon",m),e.json({ok:!0,data:m,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-t}},200)}const E=!!Y(e.env.GEMINI_API_KEY).trim(),O=Y(e.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&E&&!O)try{const f=Xn(a,i);let m="",j=!1,p=0;for(;p<2;){m=((await xt(e.env,f)).text||"").trim();const w=Qn(a,m,i);if(w.valid){j=!0;break}if(p++,p<2){const $=`${f}

[중요] 이전 시도의 압축률이 ${(w.ratio*100).toFixed(1)}%로 목표 범위(${w.expected})를 벗어났습니다. 반드시 ${w.expected} 범위로 요약하세요.`;m=((await xt(e.env,$)).text||"").trim()}}const{cleaned:k,warnings:N}=Zn(a,m);N.length>0&&console.warn("[SAFETY] 원문에 없는 인용 제거:",N),m=k;const K={kind:"summary",mode:i,viewType:"narrative",narrative:m};await ce(r,h,c||"anon",K);let P;return o==="narrative"?P=K:o==="structured"?P={kind:s,mode:i,...ft(m)}:o==="mindmap"?P={kind:s,mode:i,...gt(m)}:P={kind:s,mode:i,...mt(m)},await ce(r,l,c||"anon",P),e.json({ok:!0,data:P,meta:{cached:!1,engine:"gemini",compressionValid:j,retryCount:p,citationWarnings:N.length,elapsedMs:Date.now()-t}},200)}catch(f){const m=ht(a,i,o);if(await ce(r,l,c||"anon",m),m.narrative){const j={kind:"summary",mode:i,viewType:"narrative",narrative:m.narrative};await ce(r,h,c||"anon",j)}return e.json({ok:!0,data:m,meta:{cached:!1,engine:"local(fallback)",geminiError:f!=null&&f.message?String(f.message).slice(0,180):"unknown",elapsedMs:Date.now()-t}},200)}let T;if(s==="summary"){if(T=ht(a,i,o),T.narrative){const f={kind:"summary",mode:i,viewType:"narrative",narrative:T.narrative};await ce(r,h,c||"anon",f)}}else if(s==="concept"){const f=rt(a),m=st(f,Ee(Math.round(f.length*.25),6,10));T={kind:s,mode:i,viewType:o,concepts:m.map((j,p)=>({term:`핵심개념${p+1}`,definition:j.slice(0,120)}))}}else{const f=rt(a),m=st(f,Ee(Math.round(f.length*.22),6,10));T={kind:s,mode:i,viewType:o,items:m.map((j,p)=>({id:`e${p+1}`,type:"mcq",question:`(${p+1}) 다음 설명의 핵심 요지는 무엇인가요?`,choices:["핵심 주장/요지","근거/예시","반박/한계","주제와 무관"],answerIndex:0,explanation:j}))}}return await ce(r,l,c||"anon",T),e.json({ok:!0,data:T,meta:{cached:!1,engine:E&&!O?"local(no-gemini-for-kind)":"local",elapsedMs:Date.now()-t}},200)});te.notFound(e=>e.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const vt=new Bt,tr=Object.assign({"/src/index.tsx":te});let Kt=!1;for(const[,e]of Object.entries(tr))e&&(vt.route("/",e),vt.notFound(e.notFoundHandler),Kt=!0);if(!Kt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{vt as default};
