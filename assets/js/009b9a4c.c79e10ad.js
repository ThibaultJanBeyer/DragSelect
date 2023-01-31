"use strict";(self.webpackChunkdrag_select_docs=self.webpackChunkdrag_select_docs||[]).push([[158],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,b=u["".concat(s,".").concat(m)]||u[m]||p[m]||l;return r?n.createElement(b,o(o({ref:t},d),{},{components:r})):n.createElement(b,o({ref:t},d))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1892:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const l={sidebar_position:5,description:"DragSelect Overrides (API)"},o="Overrides & Exposed Methods (Advanced)",i={unversionedId:"API/Overrides",id:"API/Overrides",title:"Overrides & Exposed Methods (Advanced)",description:"DragSelect Overrides (API)",source:"@site/docs/API/Overrides.mdx",sourceDirName:"API",slug:"/API/Overrides",permalink:"/docs/API/Overrides",draft:!1,editUrl:"https://github.com/ThibaultJanBeyer/DragSelect/docs/API/Overrides.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,description:"DragSelect Overrides (API)"},sidebar:"tutorialSidebar",previous:{title:"CSS Classes (Styling)",permalink:"/docs/API/CSS-Classes"}},s={},c=[{value:".Selection",id:"selection",level:2},{value:"Example",id:"example",level:3},{value:"Exposed Helper Methods",id:"exposed-helper-methods",level:2},{value:"Example",id:"example-1",level:3},{value:"Example",id:"example-2",level:2}],d={toc:c};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"overrides--exposed-methods-advanced"},"Overrides & Exposed Methods (Advanced)"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Disclaimer: By hooking into the selection you\u2019re modifying internal behavior. Don\u2019t expect support for any misbehaving caused by hooking in. We will try our best to not introduce breaking changes the overrideable methods but if you use them, it\u2019s best if you double check each time before updating the library even on minor changes.")),(0,a.kt)("p",null,"DragSelect exposes some internal methods that are available to overide. It is not recommended to use them unless ",(0,a.kt)("a",{parentName:"p",href:"Methods"},"Methods")," or ",(0,a.kt)("a",{parentName:"p",href:"Events"},"Events")," are not possible for your use-case and you know what you are doing."),(0,a.kt)("p",null,"For a concrete example on how to use the overrides see ",(0,a.kt)("a",{parentName:"p",href:"/docs/guided-examples/Custom-Selection-Filter-Override"},"CustomSelectionFilter"),"."),(0,a.kt)("h2",{id:"selection"},(0,a.kt)("a",{parentName:"h2",href:"https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/src/modules/Selection.js"},".Selection")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"method"),(0,a.kt)("th",{parentName:"tr",align:null},"properties"),(0,a.kt)("th",{parentName:"tr",align:null},"returns"),(0,a.kt)("th",{parentName:"tr",align:null},"usage"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"filterSelected")),(0,a.kt)("td",{parentName:"tr",align:null},"{",(0,a.kt)("br",null),"select: Map<DSElement, DSBoundingRect>,",(0,a.kt)("br",null),"unselect: Map<DSElement, DSBoundingRect>,",(0,a.kt)("br",null),"selectorRect: DSBoundingRect",(0,a.kt)("br",null),"}"),(0,a.kt)("td",{parentName:"tr",align:null},"{",(0,a.kt)("br",null),"select: Map<DSElement, DSBoundingRect>,",(0,a.kt)("br",null),"unselect: Map<DSElement, DSBoundingRect>",(0,a.kt)("br",null),"}"),(0,a.kt)("td",{parentName:"tr",align:null},"Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected. Is expected to return the select / unselect maps in the same shape as passed in")))),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const ds = new DragSelect({});\nds.Selection.filterSelected = (obj) => obj\n")),(0,a.kt)("h2",{id:"exposed-helper-methods"},"Exposed Helper Methods"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"method"),(0,a.kt)("th",{parentName:"tr",align:null},"properties"),(0,a.kt)("th",{parentName:"tr",align:null},"usage"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"isCollision")),(0,a.kt)("td",{parentName:"tr",align:null},"el1: { left:number, right:number, top:number, bottom:number }, el2: { left:number, right:number, top:number, bottom:number }, percent:number"),(0,a.kt)("td",{parentName:"tr",align:null},"Axis-Aligned Bounding Box Collision Detection. (",(0,a.kt)("a",{parentName:"td",href:"https://github.com/ThibaultJanBeyer/DragSelect/tree/master/DragSelect/src/methods/isCollision.js#L3"},"Docs"),")")))),(0,a.kt)("h3",{id:"example-1"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"DragSelect.isCollision(document.querySelector('#foo'), document.querySelector('#bar'), 1)\n")),(0,a.kt)("h2",{id:"example-2"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const ds = new DragSelect({});\nds.Selection.filterSelected = (obj) => {\n  // do something here\n  console.log('filterSelected', obj)\n  // you can also use helper methods:\n  if(DragSelect.isCollision(document.querySelector('#foo'), obj.selectorRect, 1)) {\n    console.log('#foo is inside the selector')\n  }\n  // return what needs to be returned\n  return obj\n}\n")),(0,a.kt)("p",null,"Feel free to open a ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/ThibaultJanBeyer/DragSelect/issues/new?assignees=&labels=&template=feature_request.md"},"feature request")," for more overrides."))}p.isMDXComponent=!0}}]);