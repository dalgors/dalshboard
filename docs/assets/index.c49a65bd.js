var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;import{o as l,c as s,a as n,t as a,r as o,b as u,F as c,d as i,u as b,e as d,p,f as m,g,h,w as f,i as v}from"./vendor.89e60c35.js";const y={class:"card"},w={class:"card-body d-flex flex-column align-items-center justify-content-center"},k={class:"card-title display-6"},_=n("div",{style:{"margin-top":"2rem"}},null,-1),j={props:{title:String,description:String},setup:e=>(t,r)=>(l(),s("div",y,[n("div",w,[n("h1",k,a(e.title),1),n("p",null,a(e.description),1),_,o(t.$slots,"default")])]))},$=u({state:{problems:{}}});function C(e){switch(e){case 0:return"rgb(45, 45, 45)";case 1:return"rgb(157, 73, 0)";case 2:return"rgb(165, 79, 0)";case 3:return"rgb(173, 86, 0)";case 4:case 5:return"rgb(181, 93, 10)";case 6:return"rgb(56, 84, 110)";case 7:return"rgb(61, 90, 116)";case 8:return"rgb(67, 95, 122)";case 9:return"rgb(73, 101, 128)";case 10:return"rgb(78, 106, 134)";case 11:return"rgb(210, 133, 0)";case 12:return"rgb(223, 143, 0)";case 13:return"rgb(236, 154, 0)";case 14:return"rgb(249, 165, 24)";case 15:return"rgb(255, 176, 40)";case 16:return"rgb(0, 199, 139)";case 17:return"rgb(0, 212, 151)";case 18:return"rgb(39, 226, 164)";case 19:return"rgb(62, 240, 177)";case 20:return"rgb(81, 253, 189)";case 21:return"rgb(0, 158, 229)";case 22:return"rgb(0, 169, 240)";case 23:return"rgb(0, 180, 252)";case 24:return"rgb(43, 191, 255)";case 25:return"rgb(65, 202, 255)";case 26:return"rgb(224, 0, 76)";case 27:return"rgb(234, 0, 83)";case 28:return"rgb(245, 0, 90)";case 29:return"rgb(255, 0, 98)";case 30:return"rgb(255, 48, 113)"}}const x={class:"table table-sm table-nonfluid table-borderless table-tiled text-center"},O=n("th",{scope:"col",style:{width:"8rem"}},"아이디",-1),I=n("th",{scope:"col",style:{width:"2rem"}},"∑",-1),D={props:{competition:Object,submissions:Array},setup(o){const{competition:u,submissions:p}=o,m=$.state.problems,g=Object.entries(p.reverse().reduce(((e,t)=>{var r,l;if(!u.problems.includes(t.problemId))return e;const s=null!=(r=e[t.username])?r:e[t.username]={username:t.username,solvedCount:0},n=null!=(l=s[t.problemId])?l:s[t.problemId]={solved:!1,trial:0};return!1===n.solved&&("AC"===t.resultCode?(n.solved=!0,n.trial+=1,s.solvedCount+=1):n.trial+=1),e}),{})).map((([,e])=>e)).sort(((e,t)=>t.solvedCount-e.solvedCount));return(o,p)=>(l(),s("table",x,[n("thead",null,[n("tr",null,[O,(l(!0),s(c,null,i(u.problems,((e,t)=>(l(),s("th",{scope:"col",style:[{width:"2rem","background-color":"black"},{backgroundColor:e in b(m)?b(C)(b(m)[e].tier):""}],key:e},[n("a",{href:`https://www.acmicpc.net/problem/${e}`,target:"_blank",title:e},a(t+1),9,["href","title"])],4)))),128)),I])]),n("tbody",null,[(l(!0),s(c,null,i(b(g),(o=>{var b=o,{username:p,solvedCount:m}=b,g=((l,s)=>{var n={};for(var a in l)t.call(l,a)&&s.indexOf(a)<0&&(n[a]=l[a]);if(null!=l&&e)for(var a of e(l))s.indexOf(a)<0&&r.call(l,a)&&(n[a]=l[a]);return n})(b,["username","solvedCount"]);return l(),s("tr",{key:p},[n("td",null,[n("a",{href:`https://www.acmicpc.net/user/${p}`,target:"_blank"},a(p),9,["href"])]),(l(!0),s(c,null,i(u.problems.map((e=>[e,g[e]])),(([e,t])=>(l(),s("td",{key:e,class:{"table-success":!0===(null==t?void 0:t.solved),"table-danger":!1===(null==t?void 0:t.solved)}},[t?(l(),s("a",{key:0,href:`https://www.acmicpc.net/status?problem_id=${e}&user_id=${p}&language_id=-1&result_id=-1&from_problem=1`,target:"_blank"},a(t.trial),9,["href"])):d("",!0)],2)))),128)),n("td",null,a(m),1)])})),128))])]))}},A={class:"table table-sm table-nonfluid table-borderless text-center"},E=n("thead",null,[n("tr",null,[n("th",null,"#"),n("th",{scope:"col"},"문제 번호"),n("th",{scope:"col"},"티어"),n("th",{scope:"col"},"문제 이름"),n("th",{scope:"col"},"태그")])],-1),P={style:{"text-align":"left"}},S={style:{"text-align":"left"}},B={props:{problems:Array},setup(e){const t=$.state.problems;return(r,o)=>(l(),s("table",A,[E,n("tbody",null,[(l(!0),s(c,null,i(e.problems,((e,r)=>{var o,u,c,i,d;return l(),s("tr",{key:e},[n("td",null,a(r+1),1),n("td",null,[n("a",{href:`https://www.acmicpc.net/problem/${e}`,target:"_blank"},a(e),9,["href"])]),n("td",null,[n("img",{src:`https://static.solved.ac/tier_small/${null!=(u=null==(o=b(t)[e])?void 0:o.tier)?u:0}.svg`,style:{width:"1.2rem",height:"1.2rem"}},null,8,["src"])]),n("td",P,[n("a",{href:`https://www.acmicpc.net/problem/${e}`,target:"_blank"},a(null==(c=b(t)[e])?void 0:c.name),9,["href"])]),n("td",S,a((null!=(d=null==(i=b(t)[e])?void 0:i.tags)?d:[]).join(" · ")),1)])})),128))])]))}};p("data-v-96cff80a");const F={class:"table table-sm table-nonfluid table-borderless text-center"},K=n("thead",null,[n("tr",null,[n("th",{scope:"col"},"제출 번호"),n("th",{scope:"col"},"아이디"),n("th",{scope:"col"},"문제"),n("th",{scope:"col"},"결과"),n("th",{scope:"col"},"메모리"),n("th",{scope:"col"},"시간"),n("th",{scope:"col"},"언어"),n("th",{scope:"col"},"코드 길이"),n("th",{scope:"col"},"제출한 시간")])],-1),L={key:0},M={key:0};m();const N={props:{submissions:Array},setup:e=>(t,r)=>(l(),s("table",F,[K,n("tbody",null,[(l(!0),s(c,null,i(e.submissions,(e=>(l(),s("tr",{key:e.id},[n("td",null,a(e.id),1),n("td",null,[n("a",{href:`https://www.acmicpc.net/status?problem_id=${e.problemId}&user_id=${e.username}&language_id=-1&result_id=-1&from_problem=1`,target:"_blank"},a(e.username),9,["href"])]),n("td",null,[n("a",{href:`https://www.acmicpc.net/problem/${e.problemId}`,target:"_blank",title:e.problemName},a(e.problemId),9,["href","title"])]),n("td",{class:`result-${e.resultCode.toLowerCase()}`},a(e.resultMessage),3),n("td",null,[g(a(e.memory)+" ",1),null!==e.memory?(l(),s("span",L,"KB")):d("",!0)]),n("td",null,[g(a(e.time)+" ",1),null!==e.time?(l(),s("span",M,"ms")):d("",!0)]),n("td",null,a(e.language),1),n("td",null,a(e.length)+" B",1),n("td",null,a(e.when),1)])))),128))])])),__scopeId:"data-v-96cff80a"};const q={key:0,class:"container"},z=n("div",{style:{"margin-top":"8rem"}},null,-1),G={class:"d-flex justify-content-center"},H=n("div",{style:{"margin-top":"1.5rem"}},null,-1),J=n("div",{style:{"margin-top":"5rem"}},null,-1),Q=n("div",{style:{"margin-top":"5rem"}},null,-1),R=n("div",{style:{"margin-top":"5rem"}},null,-1),T=v({setup(e){const[t,r,o,u]=[h(!1),h([]),h([]),h({})];return(async()=>{const[e,l,s]=await Promise.all(["competitions.json","submissions.json","problems.json"].map((async e=>await(await fetch(`https://raw.githubusercontent.com/dalgors/baekjoon/main/${e}`)).json())));l.forEach((e=>{e.when=new Date(e.when)})),e.forEach((e=>{e.duration.begin=new Date(e.duration.begin),e.duration.end=new Date(e.duration.end)})),[r.value,o.value,$.state.problems]=[e,l,s],u.value=r.value[r.value.length-1],t.value=!0})(),(e,p)=>b(t)?(l(),s("div",q,[z,n(j,{title:"Dalgors :: Dashboard",description:"Dalgors :: 동의대 알고리즘 동아리 연습 현황 대시보드입니다."},{default:f((()=>[n("div",G,[(l(!0),s(c,null,i(b(r).slice(b(r).length-2,b(r).length),(e=>(l(),s("button",{class:["btn btn-primary mx-1",{active:e.name===b(u).name}],key:e.name,onClick:t=>b(u).value=e},a(e.name),11,["onClick"])))),128))]),H,n(D,{submissions:b(o),competition:b(u)},null,8,["submissions","competition"]),n("h6",null,a(b(u).duration.begin)+" ~ "+a(b(u).duration.end),1)])),_:1}),J,n(j,{title:"문제 목록",description:`${b(u).name} 연습 문제 목록입니다.`},{default:f((()=>[n(B,{problems:b(u).problems},null,8,["problems"])])),_:1},8,["description"]),Q,n(j,{title:"제출 현황",description:"약 20분 간격으로 갱신됩니다."},{default:f((()=>[n(N,{submissions:b(o)},null,8,["submissions"])])),_:1}),R])):d("",!0)}});T.use($),T.mount("#app");