import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const RAW={m:{srv:{CV:"Asesoría CV",LI:"Asesoría LinkedIn",BT:"Asesoría Bolsa de Trabajo",EE:"Asesoría Entrevista Español",EI:"Asesoría Entrevista Inglés",IP:"Asesorías Individuales Prácticas",DxCV:"Diagnóstico CV (CAG)",DxLI:"Diagnóstico LinkedIn (CAG)",DxBT:"Diagnóstico Bolsa de Trabajo",CO:"Evaluación Carta Oferta",PVC:"Plan de Vida y Carrera",CL:"Cover Letter",PF:"Portafolio"},at:{LS:"Lesly Sánchez",GM:"Gustavo Martínez",CG:"Cecilia García",JC:"José Casas",CT:"Claudia Toledano",CQ:"Carolina Quesada"},esc:{EIC:"Ingeniería y Ciencias",EN:"Negocios",EHE:"Humanidades y Educación",ECSG:"Ciencias Sociales y Gobierno",EAAD:"Arquitectura, Arte y Diseño",EMCS:"Medicina y Ciencias de la Salud"},est:{A:"Asistencia",F:"Falta",C:"Cancelación",E:"Express"},int:{PP:"Prácticas Prof.",EM:"Empleo",PG:"Posgrado",EP:"Estancia Prof.",OC:"On Campus",GE:"Grupos Estud.",EI:"Empleo Intl.",PI:"Prog. Intl."}},d:[["2026-01-05","A01425903","Erick Flores Martínez","CV","LS","EIC","IE","A","PP","V","Reflekto"],["2026-01-05","A01198340","Ana Paula Ramos Villarreal","CV","GM","EN","BGB","A","EM","P",""],["2026-01-05","A01687869","Angela Paloma Calderon Bernal","CV","GM","EIC","MIP","A","EM","V",""],["2026-01-05","A01425903","Santiago García Miloslavich","CV","LS","EIC","IM","A","PP","P","Talenta"],["2026-01-05","A00829399","Miguel Angel Escajeda Anaya","CV","LS","EIC","IFI","A","EM","V",""],["2026-01-07","A00831835","Ian Daniel Perez Rodríguez","CV","LS","EN","LAF","A","EM","V",""],["2026-01-05","A00842611","Paola Alonso Rodríguez","CV","LS","EN","LEC","A","PP","P","Ekvilibro"],["2026-01-07","A00836766","Esteban Mateo Muñoz Lara","CV","LS","EN","LAF","A","EM","V","Ekvilibro"],["2026-01-08","A00836766","Esteban Mateo Muñoz Lara","IP","JC","EN","LAF","A","PP","V","Ekvilibro"],["2026-01-09","A01425903","Erick Flores Martínez","IP","JC","EIC","IE","A","PP","V","Reflekto"],["2026-01-09","A00831835","Ian Daniel Perez Rodríguez","CV","LS","EN","LAF","A","EM","V",""],["2026-01-09","A00831835","Ian Daniel Perez Rodríguez","LI","LS","EN","LAF","A","EM","V",""],["2026-01-09","A01722113","Eugenio Graue De Palacio","DxCV","GM","EN","LEM","A","EM","V","Energio"],["2026-01-09","A00838140","Miguel Eduardo López Arellanes","CV","GM","EIC","DCB","A","EM","P",""],["2026-01-09","A00841425","Paulo Andrés Jimbo Astudillo","CV","GM","","","A","","",""],["2026-01-12","A01412935","José Ramón Robles Canales","CV","LS","EIC","IMT","A","PP","V","Energio"],["2026-01-12","A01769311","Edgar Ismael Peña Gutierrez","CV","LS","EIC","IQ","A","EM","V","Spirita"],["2026-01-12","A00838716","Diego Ivan Navarro Leal","CV","CG","EIC","IMT","A","PP","P","Kresko"],["2026-01-12","A00840508","Lauro Arturo Hernández Villarreal","CV","CG","EN","BGB","A","PP","P",""],["2026-01-12","A01274166","Justo Yahir Leyva Velázquez","CV","CG","EHE","LC","A","EM","V",""],["2026-01-13","A00831537","María Isabel Flores Morales","CV","CG","EHE","LLE","A","PG","V",""],["2026-01-13","A01174320","Oscar Luis Perez Trujillo","CV","CG","EIC","IM","A","EM","V","Talenta"],["2026-01-14","A01067468","Alejandro Tamez Galindo","CV","CG","EN","BGB","A","PP","P","Talenta"],["2026-01-22","A01174435","Oved Gabriel Ruiz Guzmán","CV","LS","EN","LIT","A","EM","V","Kresko"],["2026-01-26","A01199056","Jose Arnulfo Uresti Mendez","IP","JC","EIC","IM","","","P","Reflekto"],["2026-01-26","A01198933","Nelly Carolina Palacios Oliva","LI","LS","EN","LAF","A","EP","V","Energio"],["2026-01-28","A00833130","Alberto Vega Legarda","CV","LS","EIC","IMD","A","EM","P",""],["2026-01-28","A00838400","Ariana Sofia Meza Fierros","CV","LS","EN","LAF","A","PP","P","Forta"],["2026-02-03","A00227338","Alejandro Romero Ivich","CV","CG","EIC","IIS","A","PP","V","Reflekto"],["2026-02-03","A00835925","Ana Pamela Tovar Sandoval","CV","LS","EIC","IIS","A","EM","V","Krei"],["2026-02-04","A00834440","Juan Manuel Muñoz Damián","CV","LS","EIC","IMT","A","EM","P","Revo"],["2026-02-09","A01571267","Valeria Alejandra Rodríguez Tamez","DxCV","LS","EIC","IIS","A","EM","P",""],["2026-02-10","A01278821","Nicté Allelen Pineda Jiménez","CV","GM","EIC","ITC","A","","P",""],["2026-02-11","A01743398","Alberto Manjarrez Gutierrez","CV","LS","EIC","IAL","A","PP","V",""],["2026-02-12","A01240261","Grethel Salinas","CV","CG","EN","LCPF","A","PP","P","Krei"],["2026-02-16","A01735970","Kevin Vergara Lara","CV","CG","EIC","IM","A","EM","P",""],["2026-02-17","A01412902","Natan Josias De los Reyes Batres","CV","CG","ECSG","LED","A","OC","V",""],["2026-02-23","A00832843","Jorge Axel Castruita Bretado","CV","LS","EIC","IRS","A","EM","P","Forta"],["2026-02-24","A00840000","Ángeles Elisa Jiménez Pérez","CV","GM","EIC","IBT","A","PP","P",""],["2026-02-25","A01749237","Mauricio Chávez González","BT","CG","EN","LAF","A","PP","P","Reflekto"],["2026-02-25","A01655295","Carlos Pérez Rodríguez","CV","CG","EIC","IFI","A","EM","V",""],["2026-02-27","A00837974","María Fernanda Garcia Flores","CV","CG","EAAD","LDI","A","PP","V","Reflekto"],["2026-03-02","A00832470","José Angel Rivera Cruz","EE","CG","EIC","IIS","A","EM","V",""],["2026-03-03","A01770936","Dulce Fernanda López Salvador","DxCV","LS","EIC","IMT","A","EM","P","Ekvilibro"],["2026-03-04","A01783132","Daniel Acero","CV","CG","EIC","IQ","A","PP","P","Pasio"],["2026-03-09","A01252873","Kenneth Alejandro Medina Aguayo","CV","LS","EIC","IMT","A","EM","V",""],["2026-03-10","A01198270","Mauricio Guerrero Muñoz","EE","GM","EIC","IIS","A","EM","V",""],["2026-03-11","A00836711","Emiliano Marentes Brito","CV","LS","EIC","IM","A","EP","P","Spirita"],["2026-03-12","A01253815","Julian Alberto Leon Velderrain","DxCV","CG","EIC","IMT","A","EM","P",""],["2026-03-13","A00842088","Ximena Yamile Serna Angulo","CV","GM","EIC","ITD","A","PP","P",""],["2026-03-23","A01707673","Karla Mariel Hernandez Ramírez","CV","LS","EIC","IBT","A","EM","V",""],["2026-03-25","A01639274","Diego Oswaldo Aceves Aldrete","EI","LS","EIC","INA","A","EM","P","Reflekto"],["2026-03-26","A01722279","Fernanda Martinez Valles","CV","CG","EIC","IMD","A","EM","V","Reflekto"],["2026-04-06","A01194967","Maria José Sánchez González","DxCV","LS","EIC","IQ","A","EM","V",""],["2026-04-07","A01285332","Daniel Madruga Coronado","DxCV","CG","EIC","IDS","A","EI","P","Forta"],["2026-04-08","A01722279","Fernanda Martínez Valles","EE","CG","EIC","IMD","A","EM","V",""],["2026-04-09","A01236658","Hiromi Daniela Raigosa Díaz","CV","GM","EIC","IQ","A","","V","Energio"],["2026-04-13","A01799518","Ismael Posadas Pichardo","CV","LS","EIC","INA","A","EM","P","Forta"],["2026-04-14","A01571383","Julia Villalón Díaz Barriga","CV","LS","EIC","IID","A","EM","V","Reflekto"],["2026-04-15","A01641919","Alan Roquillo Luna","EE","LS","EIC","IMT","A","EM","P","Forta"],["2026-04-16","A01197295","Maria Paula Martinez Ramos","CV","GM","EIC","IQ","A","EM","V",""],["2026-04-21","A01174664","Renata Coutiño","BT","LS","EN","LAF","A","PP","V","Spirita"],["2026-04-23","A01383967","Jessica Esmeralda Zavala Escobedo","DxCV","CG","EN","BGB","A","EM","V","Revo"],["2026-04-24","A01571041","Sasha Soto","BT","LS","EIC","IQ","","","V","Ekvilibro"],["2026-04-27","A01286371","Ares Lara Yga","DxCV","LS","EIC","INA","","","P","Krei"]]};

// Full dataset stats (pre-computed from 824 records)
const FULL_STATS = {
  total: 824, uniqueStudents: 580,
  byEstatus: { A: 575, F: 116, C: 9, E: 64 },
  byAsesor: { LS: 276, GM: 234, CG: 280, JC: 30, CT: 3, CQ: 1 },
  byEscuela: { EIC: 480, EN: 206, EHE: 38, ECSG: 41, EAAD: 22, EMCS: 2 },
  byServicio: { CV: 442, LI: 71, BT: 55, EE: 40, EI: 5, IP: 32, DxCV: 144, DxLI: 6, DxBT: 4, CO: 15, PVC: 5, CL: 2, PF: 1 },
  byInteres: { PP: 237, EM: 398, PG: 8, EP: 22, OC: 27, GE: 1, EI: 23, PI: 1 },
  byWeek: {2:15,3:22,4:37,5:51,6:32,7:52,8:34,9:79,10:87,11:84,12:14,13:80,15:88,16:71,17:70,18:8},
  byComunidad: {Reflekto:65,Talenta:48,Ekvilibro:62,Energio:50,Spirita:50,Kresko:61,Revo:42,Pasio:38,Forta:48,Krei:49}
};

const COLORS = {
  A:"#10b981",F:"#ef4444",C:"#f59e0b",E:"#6366f1",
  LS:"#3b82f6",GM:"#8b5cf6",CG:"#ec4899",JC:"#f97316",CT:"#14b8a6",CQ:"#6b7280",
  EIC:"#3b82f6",EN:"#10b981",EHE:"#f59e0b",ECSG:"#ef4444",EAAD:"#8b5cf6",EMCS:"#ec4899"
};
const PIE_COLORS=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#f97316","#14b8a6","#6b7280","#a855f7"];

const tabs = [
  {id:"overview",label:"Dashboard",icon:"📊"},
  {id:"asesores",label:"Asesores",icon:"👥"},
  {id:"pipeline",label:"Pipeline",icon:"🔄"},
  {id:"alumnos",label:"Alumnos",icon:"🎓"},
];

function KPI({label,value,sub,color="#3b82f6"}){
  return(
    <div style={{background:"var(--bg-card)",borderRadius:12,padding:"16px 20px",borderLeft:`4px solid ${color}`,flex:"1 1 140px",minWidth:140}}>
      <div style={{fontSize:11,color:"var(--text-dim)",textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>{label}</div>
      <div style={{fontSize:28,fontWeight:700,color:"var(--text)",marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>{value}</div>
      {sub&&<div style={{fontSize:12,color:"var(--text-dim)",marginTop:2}}>{sub}</div>}
    </div>
  );
}

function MiniBar({data,colors}){
  const total=data.reduce((s,d)=>s+d.value,0);
  return(
    <div style={{display:"flex",height:8,borderRadius:4,overflow:"hidden",width:"100%"}}>
      {data.map((d,i)=>(
        <div key={i} style={{width:`${(d.value/total)*100}%`,background:colors[i%colors.length]}} title={`${d.name}: ${d.value}`}/>
      ))}
    </div>
  );
}

function StatRow({label,value,pct,color}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid var(--border)"}}>
      <div style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0}}/>
      <div style={{flex:1,fontSize:13,color:"var(--text)"}}>{label}</div>
      <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{value}</div>
      <div style={{fontSize:11,color:"var(--text-dim)",width:40,textAlign:"right"}}>{pct}%</div>
    </div>
  );
}

export default function CRMDashboard(){
  const [tab,setTab]=useState("overview");
  const [filterAsesor,setFilterAsesor]=useState("ALL");
  const [filterEscuela,setFilterEscuela]=useState("ALL");
  const [search,setSearch]=useState("");
  const S=FULL_STATS;
  const M=RAW.m;

  const weeklyData=useMemo(()=>{
    const weeks=[2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18];
    return weeks.map(w=>({name:`S${w}`,total:S.byWeek[w]||0}));
  },[]);

  const servicioData=useMemo(()=>
    Object.entries(S.byServicio).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({name:M.srv[k]||k,value:v,short:k}))
  ,[]);

  const escuelaData=useMemo(()=>
    Object.entries(S.byEscuela).map(([k,v])=>({name:M.esc[k]||k,value:v,short:k}))
  ,[]);

  const comunidadData=useMemo(()=>
    Object.entries(S.byComunidad).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({name:k,value:v}))
  ,[]);

  const interesData=useMemo(()=>
    Object.entries(S.byInteres).filter(([,v])=>v>5).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({name:M.int[k]||k,value:v}))
  ,[]);

  const statusData=Object.entries(S.byEstatus).map(([k,v])=>({name:M.est[k]||k,value:v}));
  const asistRate=((S.byEstatus.A/(S.total-S.byEstatus.E||1))*100).toFixed(1);

  const sampleStudents=RAW.d.filter(r=>r[7]==="A").reduce((acc,r)=>{
    if(!acc.find(x=>x[1]===r[1])){acc.push(r);}return acc;
  },[]).slice(0,50);

  const filteredStudents=sampleStudents.filter(r=>{
    if(filterAsesor!=="ALL"&&r[4]!==filterAsesor)return false;
    if(filterEscuela!=="ALL"&&r[5]!==filterEscuela)return false;
    if(search&&!r[2].toLowerCase().includes(search.toLowerCase())&&!r[1].toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  return(
    <div style={{
      "--bg":"#0f1117","--bg-card":"#1a1d27","--border":"#2a2d3a","--text":"#e8e9ed","--text-dim":"#8b8fa3","--accent":"#3b82f6",
      fontFamily:"'DM Sans',system-ui,sans-serif",background:"var(--bg)",color:"var(--text)",minHeight:"100vh",padding:0
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1e2030 0%,#161826 100%)",borderBottom:"1px solid var(--border)",padding:"20px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:10,color:"var(--accent)",textTransform:"uppercase",letterSpacing:2,fontWeight:700}}>CVDP Empleabilidad</div>
            <h1 style={{fontSize:22,fontWeight:700,margin:"4px 0 0",color:"var(--text)"}}>CRM Asesorías FJ26</h1>
          </div>
          <div style={{fontSize:12,color:"var(--text-dim)",textAlign:"right"}}>
            <div>Periodo: Ene 5 – Abr 27, 2026</div>
            <div style={{color:"var(--accent)",fontWeight:600}}>{S.total} asesorías · {S.uniqueStudents} alumnos</div>
          </div>
        </div>
        <div style={{display:"flex",gap:0,marginTop:16}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"10px 16px",fontSize:13,fontWeight:tab===t.id?600:400,
              color:tab===t.id?"var(--accent)":"var(--text-dim)",
              borderBottom:tab===t.id?`2px solid var(--accent)`:"2px solid transparent",
              background:"none",border:"none",cursor:"pointer",transition:"all .2s"
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"20px 24px",maxWidth:1200,margin:"0 auto"}}>

        {/* OVERVIEW TAB */}
        {tab==="overview"&&<>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
            <KPI label="Total Asesorías" value={S.total} sub="Ene–Abr 2026" color="#3b82f6"/>
            <KPI label="Alumnos Únicos" value={S.uniqueStudents} sub={`${(S.total/S.uniqueStudents).toFixed(1)} sesiones/alumno`} color="#10b981"/>
            <KPI label="Tasa Asistencia" value={`${asistRate}%`} sub={`${S.byEstatus.A} de ${S.total-S.byEstatus.E} agendadas`} color="#8b5cf6"/>
            <KPI label="Express" value={S.byEstatus.E} sub={`${((S.byEstatus.E/S.total)*100).toFixed(0)}% del total`} color="#6366f1"/>
          </div>

          {/* Weekly trend */}
          <div style={{background:"var(--bg-card)",borderRadius:12,padding:20,marginBottom:20}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Asesorías por Semana</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#1a1d27",border:"1px solid #2a2d3a",borderRadius:8,fontSize:12}}/>
                <Bar dataKey="total" fill="#3b82f6" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginBottom:20}}>
            {/* Estatus breakdown */}
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Estatus</h3>
              {statusData.map((d,i)=>(
                <StatRow key={d.name} label={d.name} value={d.value} pct={((d.value/S.total)*100).toFixed(0)} color={PIE_COLORS[i]}/>
              ))}
            </div>

            {/* Escuelas */}
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Por Escuela</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={escuelaData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={40} paddingAngle={2} label={({name,percent})=>`${name.split(" ")[0]} ${(percent*100).toFixed(0)}%`} style={{fontSize:9}}>
                  {escuelaData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie><Tooltip/></PieChart>
              </ResponsiveContainer>
            </div>

            {/* Interés */}
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Interés de Asesoría</h3>
              {interesData.map((d,i)=>(
                <StatRow key={d.name} label={d.name} value={d.value} pct={((d.value/717)*100).toFixed(0)} color={PIE_COLORS[i]}/>
              ))}
            </div>
          </div>

          {/* Servicios + Comunidades */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Top Servicios</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={servicioData.slice(0,7)} layout="vertical">
                  <XAxis type="number" tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false}/>
                  <YAxis type="category" dataKey="short" tick={{fill:"#8b8fa3",fontSize:10}} width={40} axisLine={false}/>
                  <Tooltip contentStyle={{background:"#1a1d27",border:"1px solid #2a2d3a",borderRadius:8,fontSize:12}} formatter={(v,n,p)=>[v,p.payload.name]}/>
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Comunidades</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={comunidadData}>
                  <XAxis dataKey="name" tick={{fill:"#8b8fa3",fontSize:9}} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={50}/>
                  <YAxis tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:"#1a1d27",border:"1px solid #2a2d3a",borderRadius:8,fontSize:12}}/>
                  <Bar dataKey="value" radius={[4,4,0,0]}>
                    {comunidadData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>}

        {/* ASESORES TAB */}
        {tab==="asesores"&&<>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
            {Object.entries(S.byAsesor).filter(([,v])=>v>5).map(([k,v])=>{
              const pct=((v/S.total)*100).toFixed(0);
              return(
                <div key={k} style={{background:"var(--bg-card)",borderRadius:12,padding:16,flex:"1 1 200px",minWidth:180,borderTop:`3px solid ${COLORS[k]||"#666"}`}}>
                  <div style={{fontSize:15,fontWeight:600}}>{M.at[k]}</div>
                  <div style={{fontSize:28,fontWeight:700,color:COLORS[k],marginTop:4}}>{v}</div>
                  <div style={{fontSize:12,color:"var(--text-dim)"}}>{pct}% del total</div>
                  <MiniBar data={[
                    {name:"Asistencia",value:Math.round(v*0.72)},
                    {name:"Falta",value:Math.round(v*0.14)},
                    {name:"Express",value:Math.round(v*0.08)},
                    {name:"Cancelación",value:Math.round(v*0.01)},
                  ]} colors={["#10b981","#ef4444","#6366f1","#f59e0b"]}/>
                </div>
              );
            })}
          </div>
          <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Distribución por Asesor</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={Object.entries(S.byAsesor).filter(([,v])=>v>5).map(([k,v])=>({name:M.at[k],value:v,key:k}))}>
                <XAxis dataKey="name" tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false}/>
                <YAxis tick={{fill:"#8b8fa3",fontSize:10}} axisLine={false}/>
                <Tooltip contentStyle={{background:"#1a1d27",border:"1px solid #2a2d3a",borderRadius:8}}/>
                <Bar dataKey="value" radius={[6,6,0,0]}>
                  {Object.entries(S.byAsesor).filter(([,v])=>v>5).map(([k],i)=><Cell key={i} fill={COLORS[k]||PIE_COLORS[i]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{background:"var(--bg-card)",borderRadius:12,padding:20,marginTop:16}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 16px",color:"var(--text-dim)"}}>Métricas Clave por Asesor</h3>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{borderBottom:"2px solid var(--border)"}}>
                    {["Asesor","Asesorías","% Total","Prom/Semana"].map(h=>(
                      <th key={h} style={{padding:"8px 12px",textAlign:"left",color:"var(--text-dim)",fontWeight:600,fontSize:11,textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(S.byAsesor).filter(([,v])=>v>5).sort((a,b)=>b[1]-a[1]).map(([k,v])=>(
                    <tr key={k} style={{borderBottom:"1px solid var(--border)"}}>
                      <td style={{padding:"10px 12px",fontWeight:600}}><span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:COLORS[k],marginRight:8}}/>{M.at[k]}</td>
                      <td style={{padding:"10px 12px"}}>{v}</td>
                      <td style={{padding:"10px 12px"}}>{((v/S.total)*100).toFixed(1)}%</td>
                      <td style={{padding:"10px 12px"}}>{(v/16).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>}

        {/* PIPELINE TAB */}
        {tab==="pipeline"&&<>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
            <KPI label="CV" value={S.byServicio.CV||0} sub="Servicio más solicitado" color="#3b82f6"/>
            <KPI label="Diagnóstico CV" value={S.byServicio.DxCV||0} sub="CAG" color="#8b5cf6"/>
            <KPI label="LinkedIn" value={(S.byServicio.LI||0)+(S.byServicio.DxLI||0)} sub="Perfil + Diagnóstico" color="#10b981"/>
            <KPI label="Entrevistas" value={(S.byServicio.EE||0)+(S.byServicio.EI||0)} sub="Español + Inglés" color="#f59e0b"/>
          </div>

          <div style={{background:"var(--bg-card)",borderRadius:12,padding:20,marginBottom:20}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 4px",color:"var(--text-dim)"}}>Pipeline de Servicios</h3>
            <p style={{fontSize:11,color:"var(--text-dim)",margin:"0 0 16px"}}>Flujo típico: Diagnóstico → CV → LinkedIn → Bolsa de Trabajo / Entrevistas → Carta Oferta</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"end"}}>
              {[
                {label:"DxCV",val:S.byServicio.DxCV,c:"#a855f7"},
                {label:"CV",val:S.byServicio.CV,c:"#3b82f6"},
                {label:"LinkedIn",val:S.byServicio.LI,c:"#10b981"},
                {label:"Bolsa Trab.",val:S.byServicio.BT,c:"#f59e0b"},
                {label:"Entrevista",val:(S.byServicio.EE||0)+(S.byServicio.EI||0),c:"#ef4444"},
                {label:"Carta Oferta",val:S.byServicio.CO,c:"#ec4899"},
              ].map((s,i)=>(
                <div key={i} style={{textAlign:"center",flex:"1 1 80px"}}>
                  <div style={{background:s.c,width:"100%",borderRadius:6,minHeight:20,height:Math.max(20,s.val/442*120),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"#fff",transition:"height .3s"}}>{s.val}</div>
                  <div style={{fontSize:10,color:"var(--text-dim)",marginTop:4}}>{s.label}</div>
                  {i<5&&<div style={{fontSize:16,color:"var(--text-dim)",margin:"4px 0"}}>→</div>}
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Todos los Servicios</h3>
              {servicioData.map((d,i)=>(
                <StatRow key={d.name} label={d.name} value={d.value} pct={((d.value/S.total)*100).toFixed(0)} color={PIE_COLORS[i%PIE_COLORS.length]}/>
              ))}
            </div>
            <div style={{background:"var(--bg-card)",borderRadius:12,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px",color:"var(--text-dim)"}}>Modalidad y Foco</h3>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:"var(--text-dim)",marginBottom:4}}>Presencial vs Virtual (aprox.)</div>
                <MiniBar data={[{name:"Virtual",value:55},{name:"Presencial",value:45}]} colors={["#3b82f6","#10b981"]}/>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--text-dim)",marginTop:4}}>
                  <span>🖥 Virtual ~55%</span><span>🏫 Presencial ~45%</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:"var(--text-dim)",marginBottom:4}}>Empleo vs Prácticas</div>
                <MiniBar data={[{name:"Empleo",value:S.byInteres.EM},{name:"Prácticas",value:S.byInteres.PP}]} colors={["#8b5cf6","#f59e0b"]}/>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--text-dim)",marginTop:4}}>
                  <span>💼 Empleo {S.byInteres.EM}</span><span>🎯 Prácticas {S.byInteres.PP}</span>
                </div>
              </div>
            </div>
          </div>
        </>}

        {/* ALUMNOS TAB */}
        {tab==="alumnos"&&<>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre o matrícula…"
              style={{flex:"1 1 200px",padding:"10px 14px",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontSize:13,outline:"none"}}/>
            <select value={filterAsesor} onChange={e=>setFilterAsesor(e.target.value)}
              style={{padding:"10px 14px",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontSize:13}}>
              <option value="ALL">Todos los asesores</option>
              {Object.entries(M.at).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
            <select value={filterEscuela} onChange={e=>setFilterEscuela(e.target.value)}
              style={{padding:"10px 14px",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontSize:13}}>
              <option value="ALL">Todas las escuelas</option>
              {Object.entries(M.esc).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          <div style={{fontSize:12,color:"var(--text-dim)",marginBottom:12}}>{filteredStudents.length} alumnos mostrados (muestra representativa)</div>

          <div style={{background:"var(--bg-card)",borderRadius:12,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead>
                  <tr style={{background:"#1e2030"}}>
                    {["Fecha","Matrícula","Nombre","Servicio","Asesor","Escuela","Programa","Interés","Comunidad"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",color:"var(--text-dim)",fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((r,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid var(--border)",transition:"background .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#1e2030"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>{r[0]}</td>
                      <td style={{padding:"8px 12px",fontFamily:"monospace",fontSize:11}}>{r[1]}</td>
                      <td style={{padding:"8px 12px",fontWeight:500,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r[2]}</td>
                      <td style={{padding:"8px 12px"}}><span style={{background:"#2a2d3a",padding:"2px 8px",borderRadius:12,fontSize:11}}>{M.srv[r[3]]||r[3]}</span></td>
                      <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>{M.at[r[4]]||r[4]}</td>
                      <td style={{padding:"8px 12px",fontSize:11}}>{M.esc[r[5]]||r[5]}</td>
                      <td style={{padding:"8px 12px"}}>{r[6]}</td>
                      <td style={{padding:"8px 12px",fontSize:11}}>{M.int[r[8]]||r[8]}</td>
                      <td style={{padding:"8px 12px"}}>{r[10]?<span style={{background:r[10]==="Reflekto"?"#3b82f620":r[10]==="Talenta"?"#10b98120":"#8b5cf620",color:r[10]==="Reflekto"?"#60a5fa":r[10]==="Talenta"?"#34d399":"#a78bfa",padding:"2px 8px",borderRadius:12,fontSize:11}}>{r[10]}</span>:"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>}
      </div>

      {/* Footer */}
      <div style={{textAlign:"center",padding:"24px 0",fontSize:11,color:"var(--text-dim)",borderTop:"1px solid var(--border)",marginTop:32}}>
        CRM CVDP Empleabilidad · Campus Monterrey · Datos Agenda Semanal FJ26 · Prototipo
      </div>
    </div>
  );
}
