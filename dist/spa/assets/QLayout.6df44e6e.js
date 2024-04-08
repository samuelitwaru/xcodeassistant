import{c as C,h as te,a as oe}from"./render.88e06a72.js";import{i as ne,e as $,l as X,p as Y,f as m,h as g,g as E,j as ie,k as q,m as L,n as O,q as B,s as R,t as w,u as K,v as V,x,y as le}from"./index.8354598b.js";import{g as re,c as j}from"./dom.e258fbd2.js";var me=C({name:"QPageContainer",setup(e,{slots:n}){const{proxy:{$q:t}}=E(),o=ne(X,$);if(o===$)return console.error("QPageContainer needs to be child of QLayout"),$;Y(ie,!0);const r=m(()=>{const s={};return o.header.space===!0&&(s.paddingTop=`${o.header.size}px`),o.right.space===!0&&(s[`padding${t.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(s.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(s[`padding${t.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),s});return()=>g("div",{class:"q-page-container",style:r.value},te(n.default))}});const se=[null,document,document.body,document.scrollingElement,document.documentElement];function ae(e,n){let t=re(n);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return se.includes(t)?window:t}function U(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function _(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function I(e,n,t=0){const o=arguments[3]===void 0?performance.now():arguments[3],r=U(e);if(t<=0){r!==n&&Q(e,n);return}requestAnimationFrame(s=>{const a=s-o,u=r+(n-r)/Math.max(a,t)*a;Q(e,u),u!==n&&I(e,n,t-a,s)})}function G(e,n,t=0){const o=arguments[3]===void 0?performance.now():arguments[3],r=_(e);if(t<=0){r!==n&&W(e,n);return}requestAnimationFrame(s=>{const a=s-o,u=r+(n-r)/Math.max(a,t)*a;W(e,u),u!==n&&G(e,n,t-a,s)})}function Q(e,n){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,n);return}e.scrollTop=n}function W(e,n){if(e===window){window.scrollTo(n,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=n}function ge(e,n,t){if(t){I(e,n,t);return}Q(e,n)}function pe(e,n,t){if(t){G(e,n,t);return}W(e,n)}let T;function H(){if(T!==void 0)return T;const e=document.createElement("p"),n=document.createElement("div");j(e,{width:"100%",height:"200px"}),j(n,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),n.appendChild(e),document.body.appendChild(n);const t=e.offsetWidth;n.style.overflow="scroll";let o=e.offsetWidth;return t===o&&(o=n.clientWidth),n.remove(),T=t-o,T}function we(e,n=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:n?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}const{passive:D}=R,ce=["both","horizontal","vertical"];var ue=C({name:"QScrollObserver",props:{axis:{type:String,validator:e=>ce.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,r,s;q(()=>e.scrollTarget,()=>{c(),u()});function a(){o!==null&&o();const h=Math.max(0,U(r)),b=_(r),f={top:h-t.position.top,left:b-t.position.left};if(e.axis==="vertical"&&f.top===0||e.axis==="horizontal"&&f.left===0)return;const S=Math.abs(f.top)>=Math.abs(f.left)?f.top<0?"up":"down":f.left<0?"left":"right";t.position={top:h,left:b},t.directionChanged=t.direction!==S,t.delta=f,t.directionChanged===!0&&(t.direction=S,t.inflectionPoint=t.position),n("scroll",{...t})}function u(){r=ae(s,e.scrollTarget),r.addEventListener("scroll",l,D),l(!0)}function c(){r!==void 0&&(r.removeEventListener("scroll",l,D),r=void 0)}function l(h){if(h===!0||e.debounce===0||e.debounce==="0")a();else if(o===null){const[b,f]=e.debounce?[setTimeout(a,e.debounce),clearTimeout]:[requestAnimationFrame(a),cancelAnimationFrame];o=()=>{f(b),o=null}}}const{proxy:v}=E();return q(()=>v.$q.lang.rtl,a),L(()=>{s=v.$el.parentNode,u()}),O(()=>{o!==null&&o(),c()}),Object.assign(v,{trigger:l,getPosition:()=>t}),B}});function de(){const e=w(!K.value);return e.value===!1&&L(()=>{e.value=!0}),{isHydrated:e}}const J=typeof ResizeObserver!="undefined",k=J===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var A=C({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let t=null,o,r={width:-1,height:-1};function s(c){c===!0||e.debounce===0||e.debounce==="0"?a():t===null&&(t=setTimeout(a,e.debounce))}function a(){if(t!==null&&(clearTimeout(t),t=null),o){const{offsetWidth:c,offsetHeight:l}=o;(c!==r.width||l!==r.height)&&(r={width:c,height:l},n("resize",r))}}const{proxy:u}=E();if(u.trigger=s,J===!0){let c;const l=v=>{o=u.$el.parentNode,o?(c=new ResizeObserver(s),c.observe(o),a()):v!==!0&&V(()=>{l(!0)})};return L(()=>{l()}),O(()=>{t!==null&&clearTimeout(t),c!==void 0&&(c.disconnect!==void 0?c.disconnect():o&&c.unobserve(o))}),B}else{let v=function(){t!==null&&(clearTimeout(t),t=null),l!==void 0&&(l.removeEventListener!==void 0&&l.removeEventListener("resize",s,R.passive),l=void 0)},h=function(){v(),o&&o.contentDocument&&(l=o.contentDocument.defaultView,l.addEventListener("resize",s,R.passive),a())};const{isHydrated:c}=de();let l;return L(()=>{V(()=>{o=u.$el,o&&h()})}),O(v),()=>{if(c.value===!0)return g("object",{class:"q--avoid-card-border",style:k.style,tabindex:-1,type:"text/html",data:k.url,"aria-hidden":"true",onLoad:h})}}}}),be=C({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:n,emit:t}){const{proxy:{$q:o}}=E(),r=w(null),s=w(o.screen.height),a=w(e.container===!0?0:o.screen.width),u=w({position:0,direction:"down",inflectionPoint:0}),c=w(0),l=w(K.value===!0?0:H()),v=m(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),h=m(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),b=m(()=>l.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${l.value}px`}:null),f=m(()=>l.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${l.value}px`,width:`calc(100% + ${l.value}px)`}:null);function S(i){if(e.container===!0||document.qScrollPrevented!==!0){const d={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};u.value=d,e.onScroll!==void 0&&t("scroll",d)}}function Z(i){const{height:d,width:p}=i;let y=!1;s.value!==d&&(y=!0,s.value=d,e.onScrollHeight!==void 0&&t("scrollHeight",d),F()),a.value!==p&&(y=!0,a.value=p),y===!0&&e.onResize!==void 0&&t("resize",i)}function ee({height:i}){c.value!==i&&(c.value=i,F())}function F(){if(e.container===!0){const i=s.value>c.value?H():0;l.value!==i&&(l.value=i)}}let z=null;const M={instances:{},view:m(()=>e.view),isContainer:m(()=>e.container),rootRef:r,height:s,containerHeight:c,scrollbarWidth:l,totalWidth:m(()=>a.value+l.value),rows:m(()=>{const i=e.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:u,animate(){z!==null?clearTimeout(z):document.body.classList.add("q-body--layout-animate"),z=setTimeout(()=>{z=null,document.body.classList.remove("q-body--layout-animate")},155)},update(i,d,p){M[i][d]=p}};if(Y(X,M),H()>0){let p=function(){i=null,d.classList.remove("hide-scrollbar")},y=function(){if(i===null){if(d.scrollHeight>o.screen.height)return;d.classList.add("hide-scrollbar")}else clearTimeout(i);i=setTimeout(p,300)},P=function(N){i!==null&&N==="remove"&&(clearTimeout(i),p()),window[`${N}EventListener`]("resize",y)},i=null;const d=document.body;q(()=>e.container!==!0?"add":"remove",P),e.container!==!0&&P("add"),le(()=>{P("remove")})}return()=>{const i=oe(n.default,[g(ue,{onScroll:S}),g(A,{onResize:Z})]),d=g("div",{class:v.value,style:h.value,ref:e.container===!0?void 0:r,tabindex:-1},i);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:r},[g(A,{onResize:ee}),g("div",{class:"absolute-full",style:b.value},[g("div",{class:"scroll",style:f.value},[d])])]):d}}});export{be as Q,me as a,A as b,ue as c,ge as d,U as e,_ as g,we as h,pe as s};
