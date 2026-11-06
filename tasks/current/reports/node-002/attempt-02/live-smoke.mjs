import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base='https://notfound404-production.up.railway.app';
const results=[];
for(const file of ['index.html','app.js','styles.css','validation.mjs','assets/fonts.css','assets/mobile-25a51.png','assets/fonts/noto-1.ttf']){
  const response=await fetch(`${base}/${file}`,{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200,file);
  const actual=Buffer.from(await response.arrayBuffer());
  const expected=await readFile(`website/public/${file}`);
  assert.deepEqual(actual,expected,`${file} matches published source`);
  results.push({path:`/${file}`,status:response.status,bytes:actual.length,sha256:createHash('sha256').update(actual).digest('hex'),matches_source:true});
}
for(const path of ['/tasks/current/state.json','/.env']){
  const response=await fetch(base+path,{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,404,path);
  results.push({path,status:response.status});
}
const report={checked_at:new Date().toISOString(),base,result:'pass',results};
await writeFile('tasks/current/reports/node-002/attempt-02/live-smoke.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
