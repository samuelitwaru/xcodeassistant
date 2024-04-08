import{api as y}from"./axios.04ca824a.js";import{o as s,D as i,a as e,B as p,$ as _,H as m,E as f,aa as g,F as h,a6 as D,_ as v}from"./index.8354598b.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const V={data(){return{key:null,app_models:[],data_types:[],formData:{name:"",is_column_field:!1,is_filter_field:!1,is_search_field:!1,data_type:null,widget:"",foreign_key:null},field:{}}},created(){this.getField(),this.getAppModels(),this.getDataTypes()},watch:{"$route.params.field_id":{handler:function(a){this.getField()}}},methods:{getField(){this.$api.get(`app-model-fields/${this.$route.params.field_id}/`).then(a=>{this.field=a.data,this.populateObject(this.field,this.formData)})},getAppModels(){this.$api.get(`app-models/?app=${this.$route.params.app_id}`).then(a=>{this.app_models=a.data})},getDataTypes(){this.$api.get("data-types/").then(a=>{this.data_types=a.data})},update(a){console.log({[a]:this.formData[a]}),y.patch(`app-model-fields/${this.$route.params.field_id}/`,{[a]:this.formData[a]}).then(o=>{o.status==200})},populateObject(a,o){for(let r in a)a.hasOwnProperty(r)&&o.hasOwnProperty(r)&&(o[r]=a[r])}}},x={class:"q-pa-sm"},U=e("tr",null,[e("th",null,"Property"),e("th",null,"Value")],-1),B=e("th",null,null,-1),F=["onChange","onUpdate:modelValue"],M=["onBlur","onUpdate:modelValue"],C=["onBlur","onUpdate:modelValue"],b=e("td",null,"Foreign Key",-1),k=e("option",{value:null},"None",-1),w=["value"],P=e("td",null,"Data Type",-1),A=e("option",{value:null},"None",-1),N=["value"];function T(a,o,r,E,l,u){return s(),i("div",x,[e("table",null,[U,e("tr",null,[e("th",null,[p(e("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=t=>l.formData[l.key]=t)},null,512),[[_,l.formData[l.key]]])]),B]),(s(!0),i(m,null,f(l.formData,(t,n)=>(s(),i("tr",{key:n},[e("td",null,h(n),1),e("td",null,[typeof t=="boolean"?p((s(),i("input",{key:0,onChange:d=>u.update(n),type:"checkbox","onUpdate:modelValue":d=>l.formData[n]=d},null,40,F)),[[D,l.formData[n]]]):typeof t=="number"?p((s(),i("input",{key:1,onBlur:d=>u.update(n),type:"number","onUpdate:modelValue":d=>l.formData[n]=d},null,40,M)),[[_,l.formData[n]]]):typeof t=="string"?p((s(),i("input",{key:2,onBlur:d=>u.update(n),type:"text","onUpdate:modelValue":d=>l.formData[n]=d},null,40,C)),[[_,l.formData[n]]]):v("",!0)])]))),128)),e("tr",null,[b,e("td",null,[p(e("select",{onChange:o[1]||(o[1]=t=>u.update("foreign_key")),"onUpdate:modelValue":o[2]||(o[2]=t=>l.formData.foreign_key=t),name:"",id:""},[k,(s(!0),i(m,null,f(l.app_models,t=>(s(),i("option",{key:t,value:t.id},h(t.name),9,w))),128))],544),[[g,l.formData.foreign_key]])])]),e("tr",null,[P,e("td",null,[p(e("select",{onChange:o[3]||(o[3]=t=>u.update("data_type")),"onUpdate:modelValue":o[4]||(o[4]=t=>l.formData.data_type=t),name:"",id:""},[A,(s(!0),i(m,null,f(l.data_types,t=>(s(),i("option",{key:t,value:t.id},h(t.name),9,N))),128))],544),[[g,l.formData.data_type]])])])])])}var K=c(V,[["render",T]]);export{K as default};
