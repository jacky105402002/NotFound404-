import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
export const publicRoot=path.resolve(fileURLToPath(new URL('./public/',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
export function createPreviewServer(){return createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
 try{
 const rawPath=decodeURIComponent(req.url.split('?')[0]);
 if(rawPath.includes('\\') || rawPath.includes('\0') || rawPath.split('/').includes('..')){res.writeHead(403);res.end('Forbidden');return;}
 const target=path.resolve(publicRoot,'.'+(rawPath==='/'?'/index.html':rawPath));
 if(!target.startsWith(publicRoot+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
 const info=await stat(target);if(!info.isFile())throw new Error('not a file');
 const bytes=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(error){res.writeHead(error instanceof URIError?400:404);res.end('Not found');}
 });}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const port=Number(process.env.PORT||4174);const server=createPreviewServer();
 server.listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+server.address().port));
 server.on('error',error=>{console.error(error.message);process.exitCode=1;});
}

