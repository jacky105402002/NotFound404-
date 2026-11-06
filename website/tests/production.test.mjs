import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {productionConfig,startProductionServer} from '../production.mjs';

test('Railway 預設接受外部路由與平台 PORT',()=>{
 assert.deepEqual(productionConfig({PORT:'9234'}),{port:9234,host:'0.0.0.0'});
 assert.deepEqual(productionConfig({PORT:'0',HOST:'127.0.0.1'}),{port:0,host:'127.0.0.1'});
 for(const PORT of ['abc','-1','65536','1.5'])assert.throws(()=>productionConfig({PORT}));
});
test('production entry 實際監聽指定埠，首頁、素材可讀且工作流不可讀',async()=>{
 const server=startProductionServer({PORT:'0',HOST:'127.0.0.1'});
 try{
  await once(server,'listening');
  const base='http://127.0.0.1:'+server.address().port;
  const home=await fetch(base);assert.equal(home.status,200);assert.match(await home.text(),/NotFound404/);
  const app=await fetch(base+'/app.js');assert.equal(app.status,200);
  assert.equal((await fetch(base+'/tasks/current/state.json')).status,404);
  assert.equal((await fetch(base,{method:'POST'})).status,405);
 }finally{server.closeIdleConnections();await new Promise(resolve=>server.close(resolve));}
});

