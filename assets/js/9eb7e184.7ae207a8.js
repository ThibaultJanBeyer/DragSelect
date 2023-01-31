"use strict";(self.webpackChunkdrag_select_docs=self.webpackChunkdrag_select_docs||[]).push([[656],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,d=a(e,["components","mdxType","originalType","parentName"]),p=s(n),h=r,m=p["".concat(c,".").concat(h)]||p[h]||u[h]||l;return n?o.createElement(m,i(i({ref:t},d),{},{components:n})):o.createElement(m,i({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=p;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:r,i[1]=a;for(var s=2;s<l;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1856:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>s});var o=n(7462),r=(n(7294),n(3905));const l={sidebar_position:11,description:"DragSelect is very customizable. You can even hook into the selection logic and change it to your likings"},i="Custom Selection Filter (Advanced Override)",a={unversionedId:"guided-examples/Custom-Selection-Filter-Override",id:"guided-examples/Custom-Selection-Filter-Override",title:"Custom Selection Filter (Advanced Override)",description:"DragSelect is very customizable. You can even hook into the selection logic and change it to your likings",source:"@site/docs/guided-examples/Custom-Selection-Filter-Override.mdx",sourceDirName:"guided-examples",slug:"/guided-examples/Custom-Selection-Filter-Override",permalink:"/docs/guided-examples/Custom-Selection-Filter-Override",draft:!1,editUrl:"https://github.com/ThibaultJanBeyer/DragSelect/docs/guided-examples/Custom-Selection-Filter-Override.mdx",tags:[],version:"current",sidebarPosition:11,frontMatter:{sidebar_position:11,description:"DragSelect is very customizable. You can even hook into the selection logic and change it to your likings"},sidebar:"tutorialSidebar",previous:{title:"Custom Drag and Drop",permalink:"/docs/guided-examples/CustomDnD"},next:{title:"API",permalink:"/docs/category/api"}},c={},s=[{value:"Have a look at <code>.filterSelected()</code>",id:"have-a-look-at-filterselected",level:2},{value:"Use the <code>.filterSelected()</code>",id:"use-the-filterselected",level:2}],d={toc:s};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"custom-selection-filter-advanced-override"},"Custom Selection Filter (Advanced Override)"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Disclaimer: By hooking into the selection you\u2019re modifying internal behavior. Don\u2019t expect support for any misbehaving caused by hooking in. We will try our best to not introduce breaking changes the overrideable methods but if you use them, it\u2019s best if you double check each time before updating the library even on minor changes.")),(0,r.kt)("p",null,"The logic for actually selecting elements is straight forward, it all happens ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/src/modules/Selection.js"},"in the Selection module"),"."),(0,r.kt)("p",null,"You can change the selectioning during the selection process (not before, not after) by overwriting the ",(0,r.kt)("inlineCode",{parentName:"p"},"filterSelected")," method.\nBut why? Well, you might want to change the selection logic to your likings.\nOne use-case we had for example is to filter out the parent elements of the selected elements to prevent multiple elements laying on top of each other to be all selected/deselected together. Overwriting is perfect for this use-case since the recommended ",(0,r.kt)("a",{parentName:"p",href:"/docs/API/Methods"},"Methods")," or ",(0,r.kt)("a",{parentName:"p",href:"/docs/API/Events"},"Events")," are not applicable here."),(0,r.kt)("p",null,"We\u2019ll take an easier example to show how you can overwrite certain methods:"),(0,r.kt)("h2",{id:"have-a-look-at-filterselected"},"Have a look at ",(0,r.kt)("inlineCode",{parentName:"h2"},".filterSelected()")),(0,r.kt)("p",null,"The method is called after the elements that are going to be selected/unselected have already been collected.\nJust before the actual selection happens.\nIt gets called with the following arguments:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"Selection.filterSelected = ({ select, unselect, selectorRect }: {\n  select:Map<DSElement,DSBoundingRect>, // the elements and their bounds that are supposed to be selected\n  unselect:Map<DSElement,DSBoundingRect>, // the elements and their bounds that are supposed to be de-selected (or un-selected)\n  selectorRect:DSBoundingRect // the bounds of the selector element\n}) => ({ select, unselect }) // it expects you to return an object that holds the select and unselect keys of same type as the arguments\n")),(0,r.kt)("h2",{id:"use-the-filterselected"},"Use the ",(0,r.kt)("inlineCode",{parentName:"h2"},".filterSelected()")),(0,r.kt)("p",null,"Now that we know how the method looks like,\nwe can use it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// initialize like you do before\nconst ds = new DragSelect({\u2026})\n\n// then you can override the exposed internal method\nds.Selection.filterSelected = ({ selectorRect, select: _select, unselect: _unselect }: {\n  select:Map<DSElement,DSBoundingRect>,\n  unselect:Map<DSElement,DSBoundingRect>,\n  selectorRect:DSBoundingRect\n}) => {\n  // here we just re-assign the maps to new variables so we can modify them without changing the original ones\n  const select = new Map(_select), unselect = new Map(_unselect)\n  // now we can do whatever, in this example we just filter out all elements that have a red color style if there is more than five selected elements in total\n  select.forEach((boundingRect, element) => {\n    if(element.style.color === 'red' && select.size > 5) {\n      select.delete(element)\n      unselect.set(element, boundingRect)\n    }\n  })\n  // we return the modified maps\n  return { select, unselect }\n}\n")),(0,r.kt)("p",null,"That\u2019s it, you\u2019ve successfully overwritten a method to add your custom filter to the selection logic. Now go celebrate that you\u2019ve just learned something new! \ud83c\udf89"))}u.isMDXComponent=!0}}]);