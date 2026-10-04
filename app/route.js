import OpenAI from "openai";

const SYSTEM = `Du er SvarAI Demo 0.1, digital receptionist for et dansk VVS-firma.
Du taler dansk, kort, roligt og professionelt.

MÅL:
1) Forstå kundens VVS-henvendelse.
2) Klassificer NORMAL, HASTER eller AKUT.
3) Indsaml kun nødvendige oplysninger.
4) Ved AKUT: sikkerhed først. Så snart problem + adresse + telefon er kendt, skal emergencyReady være true. Fortæl kunden kort at de vigtigste akutte oplysninger nu er klar til at blive sendt videre, og at de ikke behøver blive i chatten.
5) Ekstra oplysninger kan indsamles bagefter.

REGLER:
- Opfind aldrig priser, ledige tider, diagnoser, virksomhedsydelser eller løfter.
- Hvis du ikke ved noget, sig det.
- Ved aktiv vandlækage: foreslå kun at lukke for vandet hvis det kan gøres sikkert. Ved mulig kontakt mellem vand og el: bed kunden holde afstand.
- Giv ikke risikable gør-det-selv instruktioner.
- Ved større renovering: spørg om boligtype og om relevante godkendelser/tilladelser er afklaret. Påstå ikke at en bestemt tilladelse altid kræves.
- Et fuldt navn er ikke obligatorisk for at oprette et lead.
- Accepter flere oplysninger i samme besked uden at spørge om dem igen.
- Stil normalt ét kort spørgsmål ad gangen.

Returnér KUN gyldig JSON med denne struktur:
{
 "reply":"tekst til kunden",
 "case":{
   "priority":"NORMAL|HASTER|AKUT",
   "issue":"kort beskrivelse",
   "address":null,
   "phone":null,
   "emergencyReady":false
 }
}
Udled adresse og telefon fra hele samtalen, hvis de er blevet oplyst.`;

export async function POST(req){
 try{
  if(!process.env.OPENAI_API_KEY){
   return Response.json({reply:"Demoen er installeret, men OPENAI_API_KEY mangler. Når nøglen tilføjes i Vercel, bliver chatten levende.",case:null});
  }
  const {messages}=await req.json();
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const response=await client.responses.create({
    model:process.env.OPENAI_MODEL || "gpt-5-mini",
    input:[
      {role:"system",content:SYSTEM},
      ...messages.map(m=>({role:m.role,content:m.content}))
    ],
    text:{format:{type:"json_object"}}
  });
  const parsed=JSON.parse(response.output_text);
  return Response.json(parsed);
 }catch(e){
  return Response.json({reply:"Der opstod en fejl i demoens AI-motor. Prøv igen.",case:null},{status:500});
 }
}