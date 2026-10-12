const MAX_BODY = 6000;
function json(status: number, payload: Record<string, unknown>, cors: Record<string, string>) {
  return new Response(JSON.stringify(payload), { status, headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
function corsHeaders(origin: string | null) {
  const allowed = (Deno.env.get('NADYA_ALLOWED_ORIGINS') || 'https://yudi8377.github.io,http://localhost:5173,http://127.0.0.1:5173').split(',').map((x) => x.trim()).filter(Boolean);
  const headers: Record<string,string> = { 'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'content-type, apikey','Access-Control-Max-Age':'86400' };
  if (origin && allowed.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}
Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin'); const cors = corsHeaders(origin);
  if (req.method === 'OPTIONS') return new Response(null, { status:204, headers:cors });
  if (origin && !cors['Access-Control-Allow-Origin']) return json(403,{error:'Origin tidak diizinkan.',code:'ORIGIN_NOT_ALLOWED'},cors);
  if (req.method !== 'POST') return json(405,{error:'Metode tidak diizinkan.',code:'METHOD_NOT_ALLOWED'},cors);
  if ((req.headers.get('apikey') || '') !== (Deno.env.get('NADYA_PUBLISHABLE_KEY') || '')) return json(401,{error:'Kunci aplikasi tidak valid.',code:'INVALID_APP_KEY'},cors);
  let body: any; try { const raw=await req.text(); if(new TextEncoder().encode(raw).length>MAX_BODY) return json(413,{error:'Permintaan terlalu besar.',code:'BODY_TOO_LARGE'},cors); body=JSON.parse(raw); } catch { return json(400,{error:'JSON tidak valid.',code:'INVALID_JSON'},cors); }
  const query=typeof body?.query==='string'?body.query.trim().slice(0,800):'';
  const context=typeof body?.context==='string'?body.context.trim().slice(0,3000):'';
  if(query.length<3) return json(400,{error:'Topik riset terlalu pendek.',code:'QUERY_TOO_SHORT'},cors);
  const key=Deno.env.get('TAVILY_API_KEY');
  if(!key) return json(503,{error:'Riset web belum dikonfigurasi. Tambahkan TAVILY_API_KEY sebagai secret Supabase.',code:'RESEARCH_NOT_CONFIGURED'},cors);
  let upstream: Response;
  try { upstream=await fetch('https://api.tavily.com/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({api_key:key,query,search_depth:'advanced',topic:'general',max_results:6,include_answer:true,include_raw_content:false}),signal:AbortSignal.timeout(15000)}); }
  catch { return json(502,{error:'Penyedia pencarian tidak dapat dijangkau.',code:'SEARCH_UNAVAILABLE'},cors); }
  if(!upstream.ok) return json(502,{error:'Penyedia pencarian menolak permintaan.',code:'SEARCH_PROVIDER_ERROR'},cors);
  let data:any; try { data=await upstream.json(); } catch { return json(502,{error:'Respons pencarian tidak valid.',code:'INVALID_SEARCH_RESPONSE'},cors); }
  const sources=(Array.isArray(data.results)?data.results:[]).slice(0,6).map((s:any)=>({title:String(s.title||'Tanpa judul').slice(0,240),url:String(s.url||'').slice(0,1000),content:String(s.content||'').slice(0,1600),score:typeof s.score==='number'?s.score:null,publishedDate:s.published_date||null,domain:(()=>{try{return new URL(String(s.url)).hostname.replace(/^www\./,'')}catch{return ''}})()})).filter((s:any)=>/^https?:\/\//i.test(s.url));
  const domains=[...new Set(sources.map((s:any)=>s.domain).filter(Boolean))];
  const findings=[`Sumber yang ditemukan: ${sources.length} dari maksimal 6 hasil.`,`Domain berbeda: ${domains.length} (${domains.join(', ')||'tidak terdeteksi'}).`,domains.length>=2?'Ada lebih dari satu domain; ini belum membuktikan independensi sumber atau kesepakatan isi.':'Belum cukup keragaman domain untuk mengklaim verifikasi silang.', 'Ringkasan hasil pencarian dan cuplikan bukan pengganti membaca sumber primer secara langsung.', context?'Konteks pengguna disertakan sebagai bahan pembanding, bukan sebagai fakta yang otomatis benar.':'Tidak ada konteks tambahan yang diberikan.'];
  return json(200,{query,summary:String(data.answer||'Hasil pencarian telah dikumpulkan. Baca sumber yang ditautkan untuk menilai klaim dan metode.'),sources,findings,nextSteps:['Buka minimal dua sumber yang relevan dan independen.','Catat tanggal, penulis/lembaga, metode, serta keterbatasan.','Bandingkan klaim yang sejalan dan bertentangan; jangan menyimpulkan hanya dari peringkat pencarian.'],next:'Hasil pencarian bersifat awal. Verifikasi klaim utama melalui sumber primer sebelum menyimpulkannya.'},cors);
});
