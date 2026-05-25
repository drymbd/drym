# DRYM — Your Personal AI 

## Setup rapide

### 1. Clone et install
```bash
git clone https://github.com/drymbd/drym.git
cd drym
npm install
```

### 2. Variables d'environnement
Crée un fichier `.env` à la racine (déjà rempli avec tes clés Supabase) :
```
VITE_SUPABASE_URL=https://xyuseguuxfmqdyeyxbqn.supabase.co
VITE_SUPABASE_ANON_KEY=ta_clé_anon
VITE_ANTHROPIC_KEY=sk-ant-... (optionnel, configurable dans l'app)
```

### 3. Dev local
```bash
npm run dev
```

### 4. Deploy sur Vercel
```bash
npm run build
```
Puis push sur GitHub → Vercel déploie automatiquement.

**Variables d'environnement sur Vercel** :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

La clé Anthropic est configurée directement dans l'app (Paramètres).

## Stack
- Vite (bundler)
- Supabase (auth + database)
- Anthropic Claude API (IA)
- docx + exceljs (exports)
