# Ghid de utilizare CMS — A2Z Bridging

Panoul de administrare (CMS) controlează tot conținutul dinamic al site-ului: articole (Guides), studii de caz, echipa, testimoniale și lead-urile primite din formulare.

---

## 1. Accesare

| Ce | Unde |
|---|---|
| **Adresa CMS** | `http://localhost:3000/admin` (local) · `https://a2zbridging.co.uk/admin` (după lansare) |
| **Prima accesare** | La prima vizită ți se cere să creezi contul de administrator (email + parolă) |
| **Utilizatori noi** | Admin → grupul **Admin** → **Users** → *Create New* |

---

## 2. Ce găsești în panou

Meniul din stânga e organizat pe grupuri:

### 📝 Grupul „Content" (conținutul site-ului)

| Colecție | Ce face | Unde apare pe site |
|---|---|---|
| **Guides** | Articole de blog / ghiduri. Suportă draft, programare publicare, preview live și câmpuri SEO | `/guides` + primele 3 pe homepage |
| **Pages** | Pagini construite din blocuri (hero, conținut, media, CTA, formulare) — pentru landing page-uri noi fără programator | `/{slug-ul-paginii}` |
| **Case Studies** | Studii de caz: provocare → soluție → rezultat + cifre cheie (sumă, LTV, termen, zile până la finalizare) | `/case-studies` |
| **Team** | Membrii echipei: nume, rol, bio, poză, taguri de specializare. Câmpul **order** controlează ordinea (mai mic = primul) | `/team` + legați de case studies |
| **Testimonials** | Recenzii clienți. Bifează **featured** pentru cele mai bune | homepage (carusel) |
| **Media** | Toate imaginile/fișierele. **Completează mereu textul alternativ (alt)** — contează pentru SEO | peste tot |
| **Categories** | Categorii pentru organizarea ghidurilor (ex. Bridging, Auction) | filtre pe `/guides` |

### 📞 Grupul „CRM"

| Colecție | Ce face |
|---|---|
| **Leads** | Aici intră **automat** fiecare formular trimis de pe site (landing `/quote`, calculator, contact). Vezi numele, telefonul, suma dorită, produsul și pagina de proveniență (câmpul *source*). Schimbă **status** pe măsură ce lucrezi lead-ul: `New → Contacted → Qualified → Won / Lost` |

### ⚙️ Grupul „Admin"

- **Users** — conturile cu acces la acest panou.
- **Redirects** — redirecționări 301 (ex. dacă schimbi slug-ul unui articol vechi).
- **Forms / Form Submissions** — constructor de formulare pentru paginile din Pages.

---

## 3. Cum publici un ghid (articol) — pas cu pas

1. **Guides** → **Create New**
2. Completează **Title** — slug-ul se generează automat
3. Adaugă o **Hero Image** (din Media sau upload direct)
4. Scrie conținutul în editor (titluri, liste, citate, imagini, blocuri)
5. Tab-ul **SEO**: completează **Meta Title** (max ~60 caractere) și **Meta Description** (max ~155) — butonul *Auto-generate* te ajută
6. (Opțional) alege **Categories** și **Authors**
7. **Preview** (ochiul din dreapta sus) — vezi articolul exact cum va arăta, pe mobil/tabletă/desktop
8. **Publish** — sau **Save Draft** ca să continui mai târziu
9. Articolul apare instant pe `/guides` și pe homepage la „Guides & Insights"

> 💡 **Programare**: la Publish poți seta o dată viitoare — articolul se publică singur atunci.

---

## 4. Cum adaugi un studiu de caz

1. **Case Studies** → **Create New**
2. Titlu descriptiv cu rezultatul (ex. *„Completing an Auction Purchase in 9 Days"*)
3. Alege **Category** (Bridging / Auction / BTL / Development / Commercial / Business)
4. Completează **Stats**: suma, LTV, termen, timp până la finalizare — apar ca cifre mari în pagină
5. Scrie cele 3 secțiuni: **Challenge** (problema), **Solution** (ce ați făcut), **Outcome** (rezultatul)
6. Leagă **Advisor**-ul care a lucrat cazul (din Team)
7. Save — apare automat pe `/case-studies`

---

## 5. Cum gestionezi lead-urile

1. **Leads** (grupul CRM) — lista e sortată cu cele mai noi primele
2. Coloanele arată direct: nume, telefon, produs, sumă, status
3. Deschide lead-ul → vezi mesajul complet + **source** (de pe ce pagină a venit — util ca să știi ce campanie funcționează)
4. După ce suni clientul, schimbă **Status** din sidebar
5. Lead-urile NU pot fi văzute de vizitatori — doar utilizatorii logați le văd

---

## 6. Sfaturi SEO (importante!)

- ✅ Completează **întotdeauna** Meta Title + Meta Description la ghiduri și pagini
- ✅ Pune **alt text** la fiecare imagine din Media
- ✅ Folosește un singur H1 per articol (titlul), apoi H2/H3 în conținut
- ✅ Sitemap-ul se generează **automat** (`/sitemap.xml`) — nu trebuie făcut nimic
- ✅ Dacă schimbi slug-ul unui articol publicat, creează un **Redirect** de la URL-ul vechi
- ✅ Publicare constantă: 2–4 ghiduri pe lună au impact real pe pozițiile Google

---

## 7. Comenzi tehnice (pentru dezvoltator)

| Comandă | Ce face |
|---|---|
| `npm run dev` | Pornește site-ul local pe `http://localhost:3000` |
| `npm run build` | Build de producție + sitemap |
| `npm run seed` | Populează CMS-ul cu conținutul inițial (rulează o singură dată) |
| `npm run generate:types` | Regenerează tipurile TypeScript după modificări de colecții |

---

## 8. Întrebări frecvente

**Am șters ceva din greșeală — pot recupera?**
Ghidurile și paginile au *version history* — deschide documentul → tab **Versions** → restaurezi orice versiune anterioară.

**Pot edita de pe telefon?**
Da, panoul e responsive — funcționează pe orice dispozitiv.

**Cum schimb textele de pe homepage / paginile de produs?**
Acestea sunt în cod (pentru viteză și SEO) — cere dezvoltatorului. Tot ce e în grupurile Content/CRM se editează direct din CMS.

**Cine primește lead-urile pe email?**
Momentan lead-urile se văd doar în panou. Notificarea pe email e pasul următor de configurat (necesită SMTP).
