import{Q as u}from"./QBtn.5b322f3a.js";import{Q as v}from"./QIcon.5fefd665.js";import{Q as x,a as w}from"./QHeader.8c5c66ac.js";import{Q as D,a as h}from"./QLayout.6df44e6e.js";import{t as n,Y as Q,r as c,o as p,c as g,w as r,d as o,Z as k,F as y,B as b,$ as B,D as C}from"./index.8354598b.js";import{api as _}from"./axios.04ca824a.js";import{_ as M}from"./plugin-vue_export-helper.21dcd24c.js";import"./render.88e06a72.js";import"./dom.e258fbd2.js";const T={name:"MyLayout",setup(){const l=n(!1);n("");const a=Q();function d(){l.value=!l.value}const t=n({}),i=n({name:""}),m=n(!1);function s(){_.get(`templates/${a.params.id}/`).then(e=>{t.value=e.data,i.value.name=e.data.name})}s();function f(e){console.log({[e]:this.formData[e]}),_.patch(`templates/${a.params.id}/`,{[e]:this.formData[e]}).then(V=>{s(),m.value=!1})}return{template:t,leftDrawerOpen:l,formData:i,editMode:m,toggleLeftDrawer:d,update:f}}};function L(l,a,d,t,i,m){const s=c("router-link"),f=c("router-view");return p(),g(D,{view:"hHh lpR fFf",class:"bg-grey-1"},{default:r(()=>[o(w,{elevated:"",class:"flex bg-white text-grey-8 q-py-xs","height-hint":"58"},{default:r(()=>[o(s,{to:"/templates"},{default:r(()=>[o(u,{flat:"",dense:"",round:"",onClick:t.toggleLeftDrawer,"aria-label":"Menu",icon:"arrow_back"},null,8,["onClick"])]),_:1}),t.editMode?b((p(),C("input",{key:1,onBlur:a[1]||(a[1]=e=>t.update("name")),"onUpdate:modelValue":a[2]||(a[2]=e=>t.formData.name=e),type:"text"},null,544)),[[B,t.formData.name]]):(p(),g(u,{key:0,onClick:a[0]||(a[0]=e=>t.editMode=!0),flat:"","no-caps":"","no-wrap":"",class:"q-ml-xs"},{default:r(()=>[o(v,{name:"mdi-page-next-outline",color:"red",size:"28px"}),o(x,{shrink:"",class:"text-weight-bold"},{default:r(()=>[k(y(t.template.name),1)]),_:1})]),_:1}))]),_:1}),o(h,null,{default:r(()=>[o(f)]),_:1})]),_:1})}var O=M(T,[["render",L]]);export{O as default};