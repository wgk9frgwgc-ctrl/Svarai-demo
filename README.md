# SvarAI Demo 0.1

En simpel Next.js-demo af SvarAI til VVS.

## Indeholder
- Kunde-chat
- NORMAL / HASTER / AKUT klassificering
- Akut-regel: problem + adresse + telefon => akut lead klar
- VVS-dashboard med lokale demo-sager
- De seks real-life tests som forslag
- OpenAI API via server route

## Vigtigt
Demo 0.1 bruger browserens localStorage til dashboardet. Brug KUN opdigtede testdata.
Der sendes endnu ikke rigtige alarmer, e-mails eller SMS'er.
Billedupload er ikke aktiveret endnu.

## Lokal start
1. Installer Node.js
2. Kør: npm install
3. Kopiér .env.example til .env.local
4. Tilføj din OpenAI API-nøgle lokalt
5. Kør: npm run dev
6. Åbn http://localhost:3000

## Vercel
Upload projektet til GitHub og importer repoet i Vercel.
Tilføj OPENAI_API_KEY under Project Settings > Environment Variables.
Deploy igen.

## Næste version
- Supabase database + Storage
- RLS og dashboard-login
- Billedupload
- Rigtig akut notifikation
- Audit-log
- GDPR/retention-konfiguration
