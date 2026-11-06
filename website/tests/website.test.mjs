import test from 'node:test';
import assert from 'node:assert/strict';
import {request} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {validateRequest} from '../public/validation.mjs';
import {createPreviewServer,publicRoot} from '../server.mjs';

test('必填與空白稱呼、Email 錯誤各自標示',()=>{const r=validateRequest({name:'  ',email:'invalid',scope:''});assert.equal(r.valid,false);assert.ok(r.errors.name);assert.ok(r.errors.email);});
test('合法摘要修剪空白、保留非 HTML 的原始文字與服務',()=>{const r=validateRequest({name:' Alex ',email:' alex@example.com ',scope:' <img src=x onerror=alert(1)> ',services:['SEO 設定','官方網站架設']});assert.equal(r.valid,true);assert.equal(r.data.name,'Alex');assert.equal(r.data.email,'alex@example.com');assert.equal(r.data.scope,'<img src=x onerror=alert(1)>');assert.equal(r.data.services.length,2);});
test('邊界長度與選填內容',()=>{assert.equal(validateRequest({name:'陳'.repeat(80),email:'a@b.co',scope:'字'.repeat(2000)}).valid,true);const r=validateRequest({name:'陳'.repeat(81),email:'a'.repeat(250)+'@x.com',scope:'字'.repeat(2001)});assert.deepEqual(Object.keys(r.errors),['name','email','scope']);assert.equal(validateRequest({name:'陳',email:'a@b.co'}).valid,true);});
test('Email 拒絕空白、多個 @ 與缺少網域',()=>{for(const email of ['a b@c.com','a@@b.com','a@b','@b.com','a@.com'])assert.equal(validateRequest({name:'Alex',email}).valid,false,email);});

const server=createPreviewServer();
let port;
test.before(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));port=server.address().port;});
test.after(()=>new Promise(resolve=>server.close(resolve)));
function get(url,method='GET'){return new Promise((resolve,reject)=>{const req=request({host:'127.0.0.1',port,path:url,method},res=>{const chunks=[];res.on('data',x=>chunks.push(x));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));});req.on('error',reject);req.end();});}
test('首頁與模組正確回傳、HEAD 無 body',async()=>{const r=await get('/');assert.equal(r.status,200);assert.match(r.body,/<title>NotFound404/);assert.match(r.body,/connect-src 'none'/);assert.match(r.body,/form-action 'none'/);assert.equal((await get('/validation.mjs')).headers['content-type'],'text/javascript; charset=utf-8');const h=await get('/','HEAD');assert.equal(h.status,200);assert.equal(h.body,'');});
test('拒絕 POST、工作流檔案及路徑 traversal',async()=>{assert.equal((await get('/','POST')).status,405);for(const p of ['/../tasks/current/state.json','/%2e%2e/AGENTS.md','/..%5cAGENTS.md'])assert.equal((await get(p)).status,403,p);assert.equal((await get('/tasks/current/state.json')).status,404);assert.equal((await get('/%ZZ')).status,400);});
test('所有設計資產非空且有頁面對應，無暫時素材 URL',async()=>{const manifest=JSON.parse(await readFile(new URL('../asset-manifest.json',import.meta.url),'utf8'));const html=await readFile(path.join(publicRoot,'index.html'),'utf8');for(const item of manifest){assert.ok((await stat(path.join(publicRoot,item.path))).size>0,item.path);assert.ok(html.includes(item.path),item.path+' 未對應頁面');}assert.doesNotMatch(html,/https:\/\/www\.figma\.com\/api\/mcp\/asset/);});
test('預覽文案無未核實數字、假地址及外部傳輸程式',async()=>{const html=await readFile(path.join(publicRoot,'index.html'),'utf8');const app=await readFile(path.join(publicRoot,'app.js'),'utf8');assert.doesNotMatch(html,/99\.99%|12ms|24 小時|PGP ENCRYPTED|contact@nofound404|SECURED VIA MATRIX|Lighthouse 100|NoFound404/);assert.doesNotMatch(app,/fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);assert.match(html,/disabled/);assert.match(app,/textContent/);});


