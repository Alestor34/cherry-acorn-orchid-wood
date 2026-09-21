const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2canvas-Cm_vP64m.js","assets/rolldown-runtime-hePW80VL.js","assets/jspdf.es.min-B531Mv95.js","assets/index-SWZ_hM60.js","assets/query-fX0QmaQB.js","assets/link-BksB12_2.js","assets/root-DLTE-HSj.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-hePW80VL.js";import{D as t,tt as n}from"./query-fX0QmaQB.js";import{t as r}from"./link-BksB12_2.js";import{a as i,c as a,n as o,o as s,s as c,t as l,u}from"./site-shell-CRsgmWQl.js";import{t as d}from"./quantity-stepper-DpqXthkl.js";import{t as f}from"./trash-2-DW1rtEUW.js";import{d as p,i as m,r as h}from"./index-SWZ_hM60.js";import{c as g,i as _,l as v,r as y,s as b,t as x}from"./persian-Cb3PlAHF.js";var S=p(`file-down`,[[`path`,{d:`M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z`,key:`1rqfz7`}],[`path`,{d:`M14 2v4a2 2 0 0 0 2 2h4`,key:`tnqrlb`}],[`path`,{d:`M12 18v-6`,key:`17g6i2`}],[`path`,{d:`m9 15 3 3 3-3`,key:`1npd3o`}]]),C=e(n());async function w(t,n){if(t.length===0)return;let[{default:r},{jsPDF:i}]=await Promise.all([h(()=>import(`./html2canvas-Cm_vP64m.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1])),h(()=>import(`./jspdf.es.min-B531Mv95.js`).then(e=>e.t),__vite__mapDeps([2,1,3,4,5,6]))]),a=document.createElement(`div`);a.style.cssText=`position:fixed;left:-10000px;top:0;width:720px;background:#fffaf2;color:#2a2218;font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;text-align:right;`,a.setAttribute(`dir`,`rtl`);let o=c(t),s=t.map((e,t)=>`
      <tr>
        <td>${b(t+1)}</td>
        <td>${T(e.name)}</td>
        <td>${b(e.quantity)}</td>
        <td>${_(e.price)}</td>
        <td>${_(e.price*e.quantity)}</td>
      </tr>`).join(``);a.innerHTML=`
    <div style="padding:28px 32px 36px;box-sizing:border-box;">
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #c45c26;padding-bottom:16px;margin-bottom:18px;">
        <div>
          <div style="font-size:22px;font-weight:700;">${T(n.siteName)}</div>
          <div style="font-size:12px;color:#6b5e4f;margin-top:4px;">لیست سبد خرید / پیش‌فاکتور سفارش</div>
        </div>
        <div style="text-align:left;font-size:12px;color:#6b5e4f;">
          <div>تاریخ: ${x()}</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f3eadc;">
            <th style="padding:8px;border:1px solid #e4d5c3;width:40px;">ردیف</th>
            <th style="padding:8px;border:1px solid #e4d5c3;">نام محصول</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:70px;">تعداد</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:120px;">قیمت واحد</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:130px;">جمع</th>
          </tr>
        </thead>
        <tbody>${s}</tbody>
      </table>
      <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:flex-end;">
        <div style="font-size:12px;color:#6b5e4f;line-height:1.8;">
          <div>تلفن: ${y(n.phone)}</div>
          <div>اینستاگرام: @${T(n.instagram.replace(/^@/,``))}</div>
          <div>${T(n.footerNote)}</div>
        </div>
        <div style="background:#c45c26;color:#fffaf2;padding:10px 16px;font-weight:700;font-size:15px;">
          جمع کل: ${_(o)}
        </div>
      </div>
      <p style="margin-top:22px;font-size:11px;color:#6b5e4f;">این برگه رسید پرداخت نیست؛ فهرست سفارش برای هماهنگی تلفنی است.</p>
    </div>
  `,document.body.appendChild(a);try{let e=await r(a,{scale:2,backgroundColor:`#fffaf2`,useCORS:!0}),t=new i({orientation:`portrait`,unit:`mm`,format:`a4`}),n=t.internal.pageSize.getWidth(),o=t.internal.pageSize.getHeight(),s=n,c=e.height*s/e.width,l=e.toDataURL(`image/jpeg`,.92),u=c,d=0;for(t.addImage(l,`JPEG`,0,d,s,c),u-=o;u>0;)d=u-c,t.addPage(),t.addImage(l,`JPEG`,0,d,s,c),u-=o;t.save(`nazli-cart.pdf`)}finally{a.remove()}}function T(e){return e.replace(/[&<>"']/g,e=>e===`&`?`&amp;`:e===`<`?`&lt;`:e===`>`?`&gt;`:e===`"`?`&quot;`:`&#39;`)}var E=t();function D(){let e=a(e=>e.items),t=a(e=>e.setQty),n=a(e=>e.remove),p=a(e=>e.clear),{data:h}=i(),y=(h??o).settings,[b,x]=(0,C.useState)(!1),T=c(e),D=s(e),O=!y.orderClosed,k=e.map(e=>`${e.name} × ${e.quantity}`).concat([`جمع کل: ${T}`]).join(`
`);async function A(){x(!0);try{await w(e,y)}finally{x(!1)}}return(0,E.jsxs)(l,{children:[(0,E.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{className:`text-xs font-medium tracking-wide text-green`,children:`سبد خرید`}),(0,E.jsx)(`h1`,{className:`text-2xl font-semibold`,children:`سفارش شما`})]}),e.length>0?(0,E.jsx)(`button`,{type:`button`,className:`text-sm text-accent-red`,onClick:p,children:`خالی کردن سبد`}):null]}),e.length===0?(0,E.jsxs)(`div`,{className:`mt-8 rounded-lg bg-paper px-4 py-12 text-center shadow-card`,children:[(0,E.jsx)(`p`,{className:`text-lg font-medium`,children:`سبد خرید خالی است`}),(0,E.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:`از منو آیتم اضافه کنید و بعد فهرست را به صورت PDF بگیرید.`}),(0,E.jsx)(m,{asChild:!0,className:`mt-5`,children:(0,E.jsx)(r,{to:`/menu`,children:`مشاهده منو`})})]}):(0,E.jsxs)(`div`,{className:`mt-4 space-y-3`,children:[e.map(e=>(0,E.jsxs)(`article`,{className:`flex gap-3 rounded-lg bg-paper p-3 shadow-card`,children:[(0,E.jsx)(`img`,{src:e.imageUrl,alt:``,className:`size-20 shrink-0 rounded-sm object-cover`}),(0,E.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,E.jsxs)(`div`,{className:`flex items-start justify-between gap-2`,children:[(0,E.jsx)(`h2`,{className:`font-medium leading-snug`,children:e.name}),(0,E.jsx)(`button`,{type:`button`,className:`flex size-11 items-center justify-center text-muted`,onClick:()=>n(e.productId),"aria-label":`حذف`,children:(0,E.jsx)(f,{className:`size-4`})})]}),(0,E.jsxs)(`p`,{className:`text-sm tabular-nums text-muted`,children:[`واحد: `,_(e.price)]}),(0,E.jsxs)(`div`,{className:`mt-2 flex items-center justify-between`,children:[(0,E.jsx)(d,{value:e.quantity,min:0,onChange:n=>t(e.productId,n)}),(0,E.jsx)(`p`,{className:`text-sm font-semibold tabular-nums text-orange-dark`,children:_(e.price*e.quantity)})]})]})]},e.productId)),(0,E.jsxs)(`div`,{className:`sticky bottom-16 z-20 rounded-lg bg-paper p-4 shadow-card md:bottom-4`,children:[(0,E.jsxs)(`div`,{className:`flex items-center justify-between text-sm text-muted`,children:[(0,E.jsx)(`span`,{children:`تعداد اقلام`}),(0,E.jsx)(`span`,{className:`tabular-nums`,children:D})]}),(0,E.jsxs)(`div`,{className:`mt-1 flex items-center justify-between`,children:[(0,E.jsx)(`span`,{className:`font-medium`,children:`جمع کل`}),(0,E.jsx)(`span`,{className:`text-lg font-semibold tabular-nums text-orange-dark`,children:_(T)})]}),(0,E.jsxs)(m,{className:`mt-4 w-full`,size:`lg`,onClick:A,disabled:b,children:[(0,E.jsx)(S,{className:`size-4`}),`دریافت لیست سبد خرید به صورت PDF`]}),O?(0,E.jsxs)(`div`,{className:`mt-2 grid grid-cols-2 gap-2`,children:[(0,E.jsx)(m,{asChild:!0,variant:`secondary`,children:(0,E.jsxs)(`a`,{href:g(y.phone),children:[(0,E.jsx)(u,{className:`size-4`}),`تماس`]})}),(0,E.jsx)(m,{asChild:!0,variant:`outline`,children:(0,E.jsx)(`a`,{href:v(y.phone,`سلام، سفارش فینگر فود:\n${k}`),children:`واتساپ`})})]}):(0,E.jsx)(`p`,{className:`mt-3 text-center text-sm text-accent-red`,children:y.orderClosedTitle}),(0,E.jsx)(m,{asChild:!0,variant:`ghost`,className:`mt-1 w-full`,children:(0,E.jsx)(r,{to:`/menu`,children:`ادامه خرید`})})]})]})]})}export{D as component};