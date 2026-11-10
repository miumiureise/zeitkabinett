import * as A from 'astronomy-engine';
export const mod=(a,b)=>(a%b+b)%b;
export const zone='Europe/Vienna';
export function valid(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)&&s>='1900-01-01'&&s<='2100-12-31'&&new Date(s+'T00:00Z').toISOString().slice(0,10)===s;}
export function day(s){if(!valid(s))throw Error('1900–2100');return Date.parse(s+'T00:00Z')/86400000;}
export function shift(s,n){let d=new Date(s+'T00:00Z'),k=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);let end=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(k,end));return d.toISOString().slice(0,10);}
export function noon(s,tz=zone){let target=Date.parse(s+'T12:00Z'),t=target;for(let i=0;i<3;i++){let p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=target-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t);}
const names="Imix’,Ik’,Ak’bal,K’an,Chikchan,Kimi,Manik’,Lamat,Muluk,Ok,Chuwen,Eb’,B’en,Ix,Men,K’ib’,Kab’an,Etz’nab’,Kawak,Ajaw".split(',');
const months="Pop,Wo’,Sip,Sotz’,Sek,Xul,Yaxk’in,Mol,Ch’en,Yax,Sak’,Keh,Mak,K’ank’in,Muwan,Pax,K’ayab,Kumk’u,Wayeb’".split(',');
export function maya(s,correlation=584283){let n=day(s)+2440588-correlation,r=n;let count=[144000,7200,360,20,1].map(u=>{let v=Math.floor(r/u);r=mod(r,u);return v;});let h=mod(n+348,365);return {long:count.join('.'),tzolkin:`${mod(n+3,13)+1} ${names[mod(n+19,20)]}`,haab:`${h%20} ${months[Math.floor(h/20)]}`,correlation};}
export function cycle(n){n=mod(n,60);return {name:'甲乙丙丁戊己庚辛壬癸'[n%10]+'子丑寅卯辰巳午未申酉戌亥'[n%12],stem:'甲乙丙丁戊己庚辛壬癸'[n%10],branch:'子丑寅卯辰巳午未申酉戌亥'[n%12],number:n+1,element:Math.floor(n%10/2),yang:n%2===0};}
export function moon(t){let previous=A.SearchMoonPhase(0,t,-32).date,full=A.SearchMoonPhase(180,t,-32).date;return {age:(t-previous)/86400000,angle:A.MoonPhase(t),light:A.Illumination(A.Body.Moon,t).phase_fraction,previous,full};}
export function calculate(s,tz=zone){return {date:s,maya:maya(s),sexagenary:cycle(day(s)-day('2000-01-07')),year:cycle(+s.slice(0,4)-1984),moon:moon(noon(s,tz))};}
export function translate(mode,ja,de){return mode==='ja'?ja:mode==='de'?de:ja+' / '+de;}
