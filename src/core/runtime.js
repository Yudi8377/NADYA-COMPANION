import { CapabilityRegistry, CAPABILITY_STATES } from './capabilities.js';

const choose = (items, seed) => items[Math.abs(seed) % items.length];
export class NadyaRuntime {
 constructor({ name = 'NADYA', maxHistory = 24 } = {}) {
  this.name=name; this.maxHistory=maxHistory; this.history=[]; this.capabilities=new CapabilityRegistry();
  this.capabilities.register({id:'ai-provider',label:'Penyedia AI',description:'Model percakapan eksternal; belum dikonfigurasi.',state:CAPABILITY_STATES.UNCONFIGURED,requiresConsent:true});
  this.capabilities.register({id:'microphone',label:'Mikrofon',description:'Input suara; perlu adapter perangkat dan izin eksplisit.',state:CAPABILITY_STATES.DISABLED});
  this.capabilities.register({id:'camera',label:'Kamera',description:'Pemrosesan visual; perlu adapter perangkat dan izin eksplisit.',state:CAPABILITY_STATES.DISABLED});
  this.capabilities.register({id:'automation',label:'Otomatisasi',description:'Aksi eksternal; harus memiliki allowlist dan konfirmasi.',state:CAPABILITY_STATES.DISABLED});
 }
 respond(rawMessage) {
  const message=String(rawMessage??'').trim(); if(!message)return {text:'Silakan tulis pesan terlebih dahulu.',intent:'empty',mode:'local'};
  const n=message.toLocaleLowerCase('id-ID').normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
  const seed=message.length+this.history.length+(Date.now()%997); let intent='conversation',text;
  if(/(apa yang kamu lihat pada saya|kamu melihat apa|lihat saya|lihat wajah saya|apa yang kamu lihat|bisa melihat saya)/.test(n)){intent='visual-privacy';text='Saat ini aku belum bisa melihat atau menilai dirimu. Fitur kamera hanya menampilkan pratinjau setelah kamu memberi izin; belum ada analisis wajah, ekspresi, atau kelelahan yang aktif. Kalau kamu ingin aku memahami keadaanmu, ceritakan apa yang sedang kamu rasakan.';}
  else if(/(deteksi keadaan saya|deteksi kondisi saya|tebak perasaan saya|baca ekspresi|deteksi ekspresi|mata saya lelah|saya terlihat lelah)/.test(n)){intent='wellbeing-check';text='Aku belum bisa memastikan keadaan fisik atau perasaanmu hanya dari chat. Kalau berkenan, ceritakan sendiri: sekarang kamu merasa lebih dekat ke tenang, senang, lelah, sedih, cemas, atau sulit menjelaskannya?';}
  else if(/(apa kabar|bagaimana kabar|gimana kabar|kamu baik baik aja|kamu baik-baik aja|how are you)/.test(n)){intent='small-talk';text=choose(['Aku siap menemanimu ngobrol, makasih sudah nanya 😊 Aku tidak punya hari seperti manusia, tapi aku bisa hadir untuk percakapan ini. Kalau kamu sendiri gimana kabarnya?','Aku baik dalam arti siap membantu 😊 Kalau kamu, lagi lumayan baik atau ada sesuatu yang ingin kamu ceritakan?','Makasih sudah nanya ya. Aku siap ngobrol bareng kamu. Hari ini kamu bagaimana—ada yang menyenangkan atau melelahkan?'],seed);}
  else if(/(lagi apa|sedang apa|ngapain|lagi ngapain|what are you doing)/.test(n)){intent='small-talk';text=choose(['Aku lagi siap menemani obrolanmu 😊 Kalau kamu lagi apa?','Sedang di sini untuk ngobrol dan membantu kalau kamu butuh. Kamu sendiri lagi ngapain?','Lagi menunggu topik seru darimu 😄 Kamu sedang sibuk atau santai?'],seed);}
  else if(/(senang bertemu|senang ketemu|nice to meet)/.test(n)){intent='greeting';text='Senang juga bisa berkenalan dan ngobrol denganmu 😊 Kamu ingin dipanggil apa, atau langsung cerita saja?';}
  else if(/(terima kasih|makasih|thanks|hatur nuhun|nuhun)/.test(n)){intent='gratitude';text=choose(['Sama-sama ya 😊 Mau lanjut ke hal berikutnya?','Dengan senang hati. Ada lagi yang ingin kamu bahas?','Makasih juga sudah ngobrol denganku. Kita lanjut kapan pun kamu siap.'],seed);}
  else if(/(kamu hebat|kamu pintar|keren banget|bagus sekali|aku suka jawabanmu|good job|great job)/.test(n)){intent='compliment';text='Makasih ya, senang kalau jawabanku terasa membantu 😊 Bagian mana yang paling berguna buat kamu?';}
  else if(/(maaf|sorry|aku salah|salah paham)/.test(n)){intent='apology';text='Nggak apa-apa. Kita bisa memperjelasnya pelan-pelan, tanpa perlu merasa sungkan.';}
  else if(/(kamu salah|jawabanmu salah|tidak membantu|gak membantu|nggak membantu|jawabanmu berulang|kamu mengulang|aku kesal|aku kecewa)/.test(n)){intent='complaint';text='Terima kasih sudah bilang terus terang. Maaf jawabanku belum membantu atau malah berulang. Aku akan fokus pada masalah yang kamu maksud. Bagian mana yang paling perlu aku perbaiki?';}
  else if(/(wkwk|hahaha|haha|ngakak|lucu|tebak tebakan|lelucon|bercanda)/.test(n)){intent='humor';text=choose(['Wkwk 😄 Oke, suasananya santai nih. Mau lanjut bercanda?','Haha, aku menangkap nuansa bercandanya 😄 Mau aku balas dengan tebak-tebakan ringan?'],seed);}
  else if(/(aku bingung|bingung banget|nggak paham|gak paham|tidak mengerti|kurang jelas|maksudnya apa)/.test(n)){intent='confusion';text='Nggak apa-apa, kita urai pelan-pelan. Bagian yang membingungkan itu istilahnya, langkahnya, atau alasan di balik jawabannya?';}
  else if(/(selamat|aku berhasil|lulus|menang|keterima|berhasil menyelesaikan|happy birthday)/.test(n)){intent='congratulations';text='Wah, selamat ya! 🎉 Itu pencapaian yang layak kamu apresiasi. Apa bagian yang paling bikin kamu senang dari momen ini?';}
  else if(/(aku sedih|lagi sedih|hari yang berat|merasa sendiri|aku kecewa|ingin cerita)/.test(n)){intent='empathy';text='Makasih sudah cerita. Kedengarannya ini cukup berat buat kamu. Kamu tidak harus langsung mencari solusi kalau belum siap—aku bisa mendengarkan dulu. Apa yang paling terasa mengganggu saat ini?';}
  else if(/^(halo|hai|hello|hei|pagi|selamat pagi|siang|selamat siang|sore|selamat sore|malam|selamat malam)\b/.test(n)){intent='greeting';text=choose(['Hai, aku '+this.name+' 😊 Senang kamu mampir. Gimana kabarmu?','Halo! Apa kabar? Ada cerita apa hari ini?','Hai, senang ketemu kamu di sini. Gimana kabarmu? Ada cerita atau hal yang ingin dibantu?'],seed);}
  else if(/(siapa kamu|kamu siapa|tentang nadya)/.test(n)){intent='identity';text='Aku '+this.name+' AI Companion, pendamping percakapan yang bisa membantu belajar, merapikan ide, dan menemani refleksi. Aku AI, bukan manusia; dalam mode lokal jawabanku terbatas pada aturan dan pengetahuan yang dibundel.';}
  else if(/(fitur|kapabilitas|bisa apa|kemampuan)/.test(n)){intent='capabilities';text='Aku bisa mencari materi yang sudah dibundel, membantu mengurai pertanyaan, dan merespons percakapan sederhana. Mode lokal belum setara model generatif penuh dan tidak otomatis mengetahui informasi terbaru.';}
  else if(/(lanjut|terus gimana|selanjutnya|lalu bagaimana)/.test(n)&&this.history.some(x=>x.role==='user')){intent='follow-up';text='Oke, kita lanjut dari cerita tadi. Kamu ingin aku membantu memahami situasinya, melihat beberapa pilihan, atau menyusun langkah praktis berikutnya?';}
  else{text='Aku belum punya jawaban yang cukup pasti untuk itu dalam bundle lokal. Boleh beri sedikit konteks atau pecah pertanyaannya jadi bagian yang lebih spesifik? Aku tidak ingin mengarang jawaban hanya supaya terdengar yakin.';}
  this.history.push({role:'user',text:message,at:new Date().toISOString()},{role:'assistant',text,intent,at:new Date().toISOString()});this.history=this.history.slice(-this.maxHistory);return {text,intent,mode:'local'};
 }
 clearSession(){this.history=[];}
}
