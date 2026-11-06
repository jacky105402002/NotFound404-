import { validateRequest } from './validation.mjs';
const projects = [
  {
    "title": "CyberPulse 智能數據戰情室",
    "image": "assets/mobile-25a51.png",
    "description": "整合數據視覺化、事件摘要與 AI 輔助判讀的介面概念。此案例展示資訊層級與操作設計，並非已交付客戶專案。"
  },
  {
    "title": "NexusPay 跨境支付品牌官網",
    "image": "assets/mobile-7495a.png",
    "description": "以金融科技為主題，探索品牌敘事、產品資訊與清楚行動路徑的官網概念。內容及情境皆為設計示範。"
  },
  {
    "title": "AutoOps 企業自動化 Agent",
    "image": "assets/mobile-7a02f.png",
    "description": "將多步驟任務整理為可追蹤的流程介面，展示 AI 工作流的視覺化可能性。此示意不連接或執行真實自動化。"
  }
];
const form = document.querySelector('#request-form');
const submit = document.querySelector('#preview-submit');
const feedback = document.querySelector('#form-feedback');
const formState = document.querySelector('#form-state');
const caseDialog = document.querySelector('#case-dialog');
const summaryDialog = document.querySelector('#summary-dialog');
const fields = {name: document.querySelector('#client-name'), email: document.querySelector('#client-email'), scope: document.querySelector('#project-scope')};
let dialogTrigger = null;
function openDialog(dialog, trigger) { dialogTrigger = trigger; dialog.showModal(); }
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(el => el.getClientRects().length);
  const first = controls[0], last = controls.at(-1);
  if (!first) {event.preventDefault();return;}
  if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
  else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
 });
 dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
 dialog.addEventListener('close', () => { dialogTrigger?.focus({preventScroll:true}); });
 dialog.addEventListener('click', event => { if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();} });
});
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
 const project = projects[Number(button.dataset.case)];
 document.querySelector('#case-dialog-title').textContent = project.title;
 const image = document.querySelector('#case-dialog-image'); image.src = project.image; image.alt = project.title + '概念介面';
 document.querySelector('#case-dialog-description').textContent = project.description;
 openDialog(caseDialog,button);
}));
document.querySelector('[data-consult]').addEventListener('click', () => {
 caseDialog.close();
 requestAnimationFrame(() => { location.hash = 'contact'; fields.name.focus({preventScroll:true}); document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); });
});
form.addEventListener('submit', event => {
 event.preventDefault();
 const raw = new FormData(form);
 const result = validateRequest({name:raw.get('name'),email:raw.get('email'),scope:raw.get('scope'),services:raw.getAll('services')});
 for (const [key,field] of Object.entries(fields)) {const error = result.errors[key]; document.querySelector('#'+key+'-error').textContent = error ?? ''; field.setAttribute('aria-invalid', error ? 'true':'false');}
 if (!result.valid) {feedback.textContent = '請修正標示的欄位後，再預覽需求。'; formState.textContent='CHECK INPUT'; fields[Object.keys(result.errors)[0]].focus();return;}
 const summary = document.querySelector('#summary-content'); summary.replaceChildren();
 const rows = [['稱呼 / NAME',result.data.name],['電子郵件 / EMAIL',result.data.email],['服務項目 / SERVICES',result.data.services.join('、') || '尚未選擇'],['專案簡述 / SCOPE',result.data.scope || '尚未填寫']];
 for (const [label,value] of rows) {const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=value;summary.append(dt,dd);}
 feedback.textContent='摘要已在本機產生，資料未送出。';formState.textContent='PREVIEW READY';
 openDialog(summaryDialog,submit);
});
form.addEventListener('input', event => {
 const key = Object.keys(fields).find(k=>fields[k]===event.target);
 if(key){fields[key].removeAttribute('aria-invalid');document.querySelector('#'+key+'-error').textContent='';}
 feedback.textContent='';formState.textContent='EDITING DRAFT';
});
submit.disabled=false;
const navLinks=[...document.querySelectorAll('[data-nav]')];
const sections=[...document.querySelectorAll('main>section')];
function updateNav(){const top=window.scrollY+window.innerHeight*.25;let active=sections[0].id;for(const section of sections)if(section.offsetTop<=top)active=section.id;if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-12)active='contact';for(const link of navLinks){if(link.dataset.nav===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
let queued=false;
window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateNav();queued=false;});}},{passive:true});
window.addEventListener('resize',updateNav);updateNav();

