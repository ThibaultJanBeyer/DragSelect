"use strict";(self.webpackChunkdrag_select_docs=self.webpackChunkdrag_select_docs||[]).push([[165],{9916:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>c});var r=n(3696);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},g=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,g=d(e,["components","mdxType","originalType","parentName"]),s=p(n),m=a,c=s["".concat(o,".").concat(m)]||s[m]||y[m]||l;return n?r.createElement(c,i(i({ref:t},g),{},{components:n})):r.createElement(c,i({ref:t},g))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=m;var d={};for(var o in t)hasOwnProperty.call(t,o)&&(d[o]=t[o]);d.originalType=e,d[s]="string"==typeof e?e:a,i[1]=d;for(var p=2;p<l;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7243:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>d,toc:()=>p});var r=n(8102),a=(n(3696),n(9916));const l={sidebar_position:4,description:"DragSelect CSS Classes (API)"},i="CSS Classes (Styling)",d={unversionedId:"API/CSS-Classes",id:"API/CSS-Classes",title:"CSS Classes (Styling)",description:"DragSelect CSS Classes (API)",source:"@site/docs/API/CSS-Classes.mdx",sourceDirName:"API",slug:"/API/CSS-Classes",permalink:"/docs/API/CSS-Classes",draft:!1,editUrl:"https://github.com/ThibaultJanBeyer/DragSelect/docs/API/CSS-Classes.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:"DragSelect CSS Classes (API)"},sidebar:"tutorialSidebar",previous:{title:"Methods",permalink:"/docs/API/Methods"},next:{title:"Overrides & Exposed Methods (Advanced)",permalink:"/docs/API/Overrides"}},o={},p=[{value:"Selection",id:"selection",level:2},{value:"Drop",id:"drop",level:2},{value:"DropZone",id:"dropzone",level:2}],g={toc:p},s="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(s,(0,r.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"css-classes-styling"},"CSS Classes (Styling)"),(0,a.yg)("p",null,"DragSelect adds some useful classes to the elements by default.\n",(0,a.yg)("em",{parentName:"p"},"note: you can change every class name via settings, see ",(0,a.yg)("a",{parentName:"em",href:"Settings"},"Settings")," section.")),(0,a.yg)("h2",{id:"selection"},"Selection"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"name"),(0,a.yg)("th",{parentName:"tr",align:null},"trigger"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-selected")),(0,a.yg)("td",{parentName:"tr",align:null},"On items that are selected")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-hover")),(0,a.yg)("td",{parentName:"tr",align:null},"On items that are currently hovered")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-selector")),(0,a.yg)("td",{parentName:"tr",align:null},"On the selector element")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-selector-area")),(0,a.yg)("td",{parentName:"tr",align:null},"The overlay where the selector resides in")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-selectable")),(0,a.yg)("td",{parentName:"tr",align:null},"On items that can be selected")))),(0,a.yg)("h2",{id:"drop"},"Drop"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"name"),(0,a.yg)("th",{parentName:"tr",align:null},"trigger"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-droppable")),(0,a.yg)("td",{parentName:"tr",align:null},"On item that can be dropped into at least one zone")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-droppable-${id}")),(0,a.yg)("td",{parentName:"tr",align:null},"On item that can be dropped into a zone with specific identifier, ",(0,a.yg)("inlineCode",{parentName:"td"},"${id}")," will be replaced by the corresponding zone.id")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropped-target")),(0,a.yg)("td",{parentName:"tr",align:null},"On an item corresponding the target dropzone")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropped-target-${id}")),(0,a.yg)("td",{parentName:"tr",align:null},"On an item corresponding the target dropzone with specific identifier, ",(0,a.yg)("inlineCode",{parentName:"td"},"${id}")," will be replaced by the corresponding zone.id")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropped-inside")),(0,a.yg)("td",{parentName:"tr",align:null},"On an item that is within its dropzone bounds after a drop")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropped-inside-${id}")),(0,a.yg)("td",{parentName:"tr",align:null},"On an item that is within its dropzone bounds after a drop with specific identifier, ",(0,a.yg)("inlineCode",{parentName:"td"},"${id}")," will be replaced by the corresponding zone.id")))),(0,a.yg)("h2",{id:"dropzone"},"DropZone"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"name"),(0,a.yg)("th",{parentName:"tr",align:null},"trigger"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropzone")),(0,a.yg)("td",{parentName:"tr",align:null},"On each dropZone")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropzone-ready")),(0,a.yg)("td",{parentName:"tr",align:null},"On corresponding dropZone when corresponding item is being dragged")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropzone-target")),(0,a.yg)("td",{parentName:"tr",align:null},"On dropZone when it was target of a successful drop")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"ds-dropzone-inside")),(0,a.yg)("td",{parentName:"tr",align:null},"On dropZone that has elements inside after any drop")))))}y.isMDXComponent=!0}}]);