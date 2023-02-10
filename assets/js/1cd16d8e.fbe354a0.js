"use strict";(self.webpackChunkdrag_select_docs=self.webpackChunkdrag_select_docs||[]).push([[265],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(r),m=a,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4861:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:2,description:"DragSelect can be restricted to a specific area. This is useful if you want to restrict the selection and dragging to a specific container."},o="With an Area",l={unversionedId:"guided-examples/Area",id:"guided-examples/Area",title:"With an Area",description:"DragSelect can be restricted to a specific area. This is useful if you want to restrict the selection and dragging to a specific container.",source:"@site/docs/guided-examples/Area.mdx",sourceDirName:"guided-examples",slug:"/guided-examples/Area",permalink:"/docs/guided-examples/Area",draft:!1,editUrl:"https://github.com/ThibaultJanBeyer/DragSelect/docs/guided-examples/Area.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"DragSelect can be restricted to a specific area. This is useful if you want to restrict the selection and dragging to a specific container."},sidebar:"tutorialSidebar",previous:{title:"Simple",permalink:"/docs/guided-examples/Simple"},next:{title:"With DropZones",permalink:"/docs/guided-examples/DropZones"}},c={},s=[{value:"Example",id:"example",level:2}],p={toc:s};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"with-an-area"},"With an Area"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"You can restrict DragSelect to only operate within a certain area"),(0,a.kt)("li",{parentName:"ul"},"This Area will also be auto-scrollable by default")),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"new DragSelect({\n  selectables: document.getElementsByClassName('selectable'),\n  area: document.getElementById('area'),\n});\n")),(0,a.kt)("p",null,"^ given this example you can only use the selection/drag inside of the container with the ID ",(0,a.kt)("inlineCode",{parentName:"p"},"area"),"."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"Try it out yourself:"),(0,a.kt)("iframe",{height:"400",style:{width:"100%"},scrolling:"no",title:"DragSelect with Scrollable AREA",src:"https://codepen.io/ThibaultJanBeyer/embed/Nvobgq?default-tab=result&editable=true&theme-id=dark",frameBorder:"no",loading:"lazy",allowtransparency:"true",allowFullScreen:!0},"See ",(0,a.kt)("a",{href:"https://codepen.io/ThibaultJanBeyer/pen/Nvobgq"},"this Pen about DragSelect")," on CodePen."))}u.isMDXComponent=!0}}]);