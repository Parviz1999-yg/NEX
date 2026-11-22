# NEX — Shaxsiy Instagram Reels Studio

**Loyiha holati:** faol ishlab chiqilmoqda  
**Asosiy platforma:** GitHub Pages  
**Maqsad:** Instagram Reels uchun turli kontent yo‘nalishlariga mos, mustaqil ishlaydigan studiyalar yaratish.

## Loyiha modullari

NEX to‘rtta asosiy moduldan tashkil topadi. Har bir modul o‘z interfeysi, ish jarayoni va JavaScript/CSS javobgarlik chegarasiga ega bo‘ladi.

| Qisqartma | Modul nomi | Holati |
|---|---|---|
| **TA** | Tavsiya akkaunt | **TAYYOR — MUHOFAZALANGAN** |
| **FM** | Foydali manba | **TAYYOR — MUHOFAZALANGAN** |
| **QF** | Qiziqarli fakt | Keyingi modul |
| **MI** | Maxsus iboralar | Keyingi modul |

## 1. TA — Tavsiya akkaunt: himoyalangan etalon

TA hozirgi tasdiqlangan holatida tayyor deb hisoblanadi. Uning dizayni, animatsiyalari, funksiyalari, shablonlari, matn tuzilishi, axborot yig‘ish va ma’lumotni qayta ishlash mexanizmlari foydalanuvchining alohida, aniq ruxsatisiz o‘zgartirilmaydi.

### Himoya va zaxira

- TA ning tasdiqlangan holati GitHub’da alohida zaxira tarmog‘ida saqlandi: `backup/ta-protected-2026-11-21`.
- Zaxira tarmog‘i 2026-11-21 kuni `main` tarmog‘idagi holatdan yaratildi.
- TA ga tegishli kodni tahrirlash, qayta yozish, optimallashtirish, ko‘chirish yoki almashtirish uchun oldindan aniq ruxsat olinadi.
- Xatoni tuzatish ham o‘zgartirish hisoblanadi: avval muammo va ta’sir doirasi ko‘rsatiladi, keyin ruxsat so‘raladi.
- Boshqa modullar ustidagi ish TA ning fayllari va ishlashiga ta’sir qilmasligi shart.

## 2. TA tajribasini qolgan modullarga tatbiq etish

TA — NEX uchun etalon modul. Quyidagi uchta yo‘nalishdagi yondashuv uning tasdiqlangan ishlash tamoyillaridan olinib, FM, QF va MI modullarida qo‘llanadi:

1. **Axborot yig‘ish:** foydalanuvchi tanlagan manba yoki mavzuga mos ma’lumotlarni yig‘ish, manba turini hisobga olish va kiruvchi ma’lumotlarni tartibga solish.
2. **Ma’lumotni qayta ishlash:** yig‘ilgan ma’lumotni tahlil qilish, saralash, kerakli mazmunni ajratish va Reels tayyorlashga mos izchil natijaga aylantirish.
3. **Interfeys uslubi:** TA dagi tasdiqlangan vizual til, ish bosqichlari, boshqaruv mantiqi, animatsiya va foydalanuvchi tajribasini qolgan modullar uchun namuna sifatida qo‘llash.

**Muhim texnik qoida:** bu yondashuvlarni boshqa modullarga tatbiq etish TA kodini o‘zgartirish degani emas. Zarur funksiyalar FM, QF va MI ichida mustaqil ravishda yoki TA ga ta’sir qilmaydigan alohida komponentlar orqali amalga oshiriladi. TA ning amaldagi kodi o‘zgarmas etalon bo‘lib qoladi.

## 3. Modullar izolyatsiyasi

- Har bir modulning HTML tuzilmasi, CSS selektorlari, JavaScript holati, hodisa tinglovchilari va ish jarayoni alohida chegaralangan bo‘lishi kerak.
- Boshqa modulning uslubi yoki JavaScript kodi TA interfeysiga sizib o‘tmasligi kerak.
- Umumiy komponent zarur bo‘lsa, avval uning TA ga ta’siri tahlil qilinadi. Xavfsizligi isbotlanmagan umumiy kod TA bilan bog‘lanmaydi.
- TA dan olingan shablon yoki yondashuv boshqa modulga mustaqil nusxa yoki alohida komponent sifatida tatbiq etiladi.
- Har bir modul alohida tekshiriladi; FM, QF yoki MI dagi o‘zgarish TA ning avvalgi ishlashini buzmasligi shart.

## 4. FM — Foydali manba: tayyor va muhofazalangan

FM foydalanuvchi tomonidan tayyor deb tasdiqlangan. Shu sababli FM moduli hozir **MUHOFAZALANGAN** holatda.

- Foydalanuvchi alohida va aniq ruxsat bermaguncha FM’ning birorta fayli, kodi, dizayni, matni, animatsiyasi, funksiyasi yoki sozlamasi o‘zgartirilmaydi.
- Bu taqiq xatolarni tuzatish, optimallashtirish, refaktor qilish, yangilash, cache-buster almashtirish, fayl ko‘chirish yoki kodni tozalash kabi barcha o‘zgarishlarni ham qamrab oladi.
- FM bilan bog‘liq taklif yoki aniqlangan muammo bo‘lsa, avval faqat xabar beriladi. Ruxsatsiz amaliy o‘zgarish kiritilmaydi.
- FM’ga ruxsat faqat foydalanuvchi aniq qaysi ishni bajarishni buyurganidan keyin, faqat kelishilgan doirada amal qiladi. Bitta vazifa uchun berilgan ruxsat boshqa o‘zgarishlarga umumiy ruxsat hisoblanmaydi.
- FM muhofazasi TA kabi doimiy qoida hisoblanadi. Ushbu README yozuvi ham foydalanuvchining ruxsatisiz qayta o‘zgartirilmaydi.

FM manba turlari: Sayt, YouTube, Telegram va Kitob.

**Holat:** tayyor, foydalanuvchi yangi topshiriq bermaguncha o‘zgartirishlar muzlatilgan.

## 5. QF — Qiziqarli fakt

QF alohida modul sifatida ishlab chiqiladi. Unda ham TA dan olingan axborot yig‘ish, qayta ishlash va interfeys tamoyillari qo‘llanadi. QF ning o‘ziga tegishli mavzu mantiqi va kontent jarayoni mustaqil bo‘ladi.

## 6. MI — Maxsus iboralar

MI alohida modul sifatida ishlab chiqiladi. Unda ham TA dan olingan axborot yig‘ish, qayta ishlash va interfeys tamoyillari qo‘llanadi. Iboralarni tanlash, izohlash va Reels matniga aylantirish jarayoni MI doirasida boshqariladi.

## 7. Texnik tuzilma

Asosiy loyiha fayllari:

- `index.html` — asosiy sahifa va navigatsiya.
- `assets/css/style.css` — asosiy sahifa uslublari.
- `assets/js/flow.js` — asosiy Reels yaratish jarayoni.
- `foydali-manba/` — FM modulining HTML, CSS va JavaScript fayllari.
- `.github/workflows/pages.yml` — GitHub Pages joylashtirish jarayoni.

Yangi fayl yoki komponent qo‘shishdan oldin uning qaysi modulga tegishli ekani va boshqa modullarga ta’siri aniqlanadi.

## 8. Ishlab chiqish tartibi

- Avval mavjud kod o‘qiladi va tahlil qilinadi.
- O‘zgarishdan oldin tegiladigan fayllar, sabab va ta’sir doirasi tushuntiriladi.
- Foydalanuvchining ruxsatisiz kod yoki dizayn o‘zgartirilmaydi.
- Ruxsat faqat kelishilgan modul va ish hajmiga tegishli.
- Har bir bosqichdan so‘ng o‘zgarishlar va tekshiruv natijalari hisobot qilinadi.
- Tayyor deb tasdiqlangan TA moduli keyingi ishlar davomida muhofaza qilinadi.

## 9. Ishga tushirish

Loyiha GitHub Pages orqali joylashtiriladi:

https://parviz1999-yg.github.io/NEX/

3D/WebGL sahnalari tashqi Three.js CDN kutubxonasiga bog‘liq bo‘lishi mumkin; shu sababli tegishli funksiyalar uchun internet aloqasi talab qilinadi.

## 10. Asosiy tamoyil

**TA — o‘zgarmas etalon. FM, QF va MI — TA tajribasidan foydalanadigan, lekin undan mustaqil ishlaydigan modullar.** Barcha o‘zgarishlar foydalanuvchi ruxsati va modullar izolyatsiyasi asosida bajariladi.


## 11. Yagona versiya tizimi

NEX butun loyiha sifatida **bitta umumiy versiya raqami** bilan yuritiladi. TA, FM, QF va MI uchun alohida versiya raqamlari yoki mustaqil versiya tarixlari ochilmaydi.

- Joriy umumiy versiya `0.9.7`.
- Versiya raqami loyiha ildizidagi `VERSION` faylida saqlanadi.
- Barcha modullardagi o‘zgarishlar yagona `CHANGELOG.md` tarixiga yoziladi.
- Qaysi modul yangilanishidan qat’i nazar, yangi loyiha relizi chiqarilganda faqat bitta umumiy versiya oshiriladi.
- Versiyalash SemVer tamoyiliga amal qiladi: `MAJOR.MINOR.PATCH`. PATCH — moslikni buzmaydigan tuzatish; MINOR — moslikni saqlagan yangi imkoniyat; MAJOR — moslikni buzuvchi katta o‘zgarish.
- Ichki ishchi commitlar avtomatik ravishda yangi reliz yoki versiya hisoblanmaydi. Versiya faqat umumiy reliz tayyorlanganda yangilanadi.
- Modul nomi CHANGELOG yozuvida ko‘rsatilishi mumkin, ammo modulning alohida versiyasi bo‘lmaydi.

**Asosiy qoida:** NEX — bitta mahsulot, bitta versiya raqami va bitta o‘zgarishlar tarixi.


## 12. NEX musiqa kutubxonasi — Gemini MP4 promptlari

**Maqsad:** TA, FM, QF va MI videolari uchun jiddiy, professional, har bir bo‘limning mazmuniga mos original instrumental musiqalar yaratish. Musiqa Gemini orqali MP4 ko‘rinishida generatsiya qilinadi; keyin tashqi video ilovada MP4 dan audio ajratib olinadi.

### 12.1. Qat’iy ish qoidalari

- Asosiy kutubxona: **48 ta musiqa prompti** (4 bo‘lim × 4 uslub × 3 variant) va barcha bo‘limlarda ishlatiladigan **1 ta yagona NEX brend outro prompti**. Jami: **49 ta prompt**.
- Har bir generatsiya alohida prompt bilan bajariladi. Promptdagi janr, BPM, kayfiyat, cholg‘ular va kompozitsiya talablari o‘zboshimchalik bilan almashtirilmaydi.
- NEX brend outro musiqasi 48 ta asosiy trekdan alohida yaratiladi va TA, FM, QF hamda MI videolarining barchasida aynan bir xil audio sifatida ishlatiladi. Har bir video uchun boshqa outro musiqasi yaratilmaydi.
- Outro davomiyligi **aniq 5,2 soniya**. Musiqiy fraza logo va shior ko‘rinishiga vaqt jihatdan mos kelishi, oxirgi 0,3–0,8 soniyada NEX’ning qisqa original elektron ovozli imzosi bilan tugashi kerak.
- Brend shiori o‘zgarmas: **“NEX — Fikr va imkoniyatlar makoni.”** Shior videoda yozuv ko‘rinishida chiqadi; outro musiqasi uning ohangdor, esda qoladigan brend kayfiyatini yaratadi. Outroda ham vokal yoki gap ishlatilmaydi.
- Har bir natija 8 soniyalik MP4 bo‘lishi so‘raladi. Gemini davomiylik yoki boshqa talabni bajarmasa, natija avtomatik qabul qilinmaydi.
- Audio: faqat instrumental musiqa. Ovoz, qo‘shiq, gap, lyrics, effekt, atrof-muhit shovqini va tasodifiy tovushlar taqiqlanadi.
- Video: harakatsiz, oddiy to‘q kulrang fon. Matn, logo, odam, obyekt, animatsiya va kamera harakati bo‘lmaydi.
- Promptlar navbat bilan beriladi. Bir vaqtda faqat bitta prompt faol bo‘ladi.
- Foydalanuvchi **«Qabul qilindi»** desa, faqat faol prompt holati **TUGALLANDI** ga o‘tkaziladi. Shundan keyingina navbatdagi prompt ochiladi.
- Foydalanuvchi **«Keyingi»** desa, eng birinchi TAYYOR prompt ko‘rsatiladi. Agar faol prompt hali qabul qilinmagan bo‘lsa, uni tashlab o‘tmasdan avval shu prompt holati aniqlashtiriladi.
- Natija mos kelmasa, u TUGALLANDI hisoblanmaydi. Faqat shu prompt qayta ishlanadi; keyingi promptga o‘tilmaydi.
- README’dagi holat jadvali foydalanuvchining aniq tasdig‘iga qarab yangilanadi. Gemini natijasini ko‘rmasdan hech bir trek qabul qilingan deb belgilanmaydi.
- TA va FM modullarining himoyalangan fayllari o‘zgartirilmaydi. Ushbu bo‘lim faqat README hujjatida yuritiladi.

### 12.2. Holatlar ma’nosi

| Holat | Ma’nosi |
|---|---|
| **TAYYOR** | Prompt navbatda, hali generatsiya/tasdiq qilinmagan |
| **JARAYONDA** | Hozir foydalanuvchi bilan ishlanayotgan prompt |
| **TUGALLANDI** | Foydalanuvchi natijani tinglab, aniq «Qabul qilindi» deb tasdiqlagan |
| **QAYTA ISHLASH** | Natija talabga mos emas; shu prompt tuzatilishi yoki qayta generatsiya qilinishi kerak |

### 12.3. Umumiy holat

- Asosiy musiqa promptlari: **48**
- Yagona brend outro prompti: **1**
- Jami prompt: **49**
- Tugallangan: **0**
- Jarayonda: **0**
- Qayta ishlash: **0**
- Navbatdagi prompt: **TA-01-A**
- Brend outro: **alohida, umumiy va barcha bo‘limlarda bir xil**

### 12.4. Promptlar va holat nazorati

Quyidagi 48 ta asosiy musiqa prompti to‘liq va qat’iy spetsifikatsiya hisoblanadi. Har bir prompt ichida audio hamda video cheklovlari qayta yozilgan; promptni Gemini’ga alohida yuborish mumkin. Ulardan keyin bitta umumiy NEX brend outro prompti berilgan.

| № | ID | Bo‘lim | Uslub | BPM | Holat |
|---:|---|---|---|---:|---|
| 1 | `TA-01-A` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TAYYOR |
| 2 | `TA-01-B` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TAYYOR |
| 3 | `TA-01-C` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TAYYOR |
| 4 | `TA-02-A` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 5 | `TA-02-B` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 6 | `TA-02-C` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 7 | `TA-03-A` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 8 | `TA-03-B` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 9 | `TA-03-C` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 10 | `TA-04-A` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 11 | `TA-04-B` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 12 | `TA-04-C` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 13 | `FM-01-A` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 14 | `FM-01-B` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 15 | `FM-01-C` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 16 | `FM-02-A` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 17 | `FM-02-B` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 18 | `FM-02-C` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 19 | `FM-03-A` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 20 | `FM-03-B` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 21 | `FM-03-C` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 22 | `FM-04-A` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 23 | `FM-04-B` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 24 | `FM-04-C` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 25 | `QF-01-A` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 26 | `QF-01-B` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 27 | `QF-01-C` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 28 | `QF-02-A` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 29 | `QF-02-B` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 30 | `QF-02-C` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 31 | `QF-03-A` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 32 | `QF-03-B` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 33 | `QF-03-C` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 34 | `QF-04-A` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 35 | `QF-04-B` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 36 | `QF-04-C` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 37 | `MI-01-A` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 38 | `MI-01-B` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 39 | `MI-01-C` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 40 | `MI-02-A` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 41 | `MI-02-B` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 42 | `MI-02-C` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 43 | `MI-03-A` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 44 | `MI-03-B` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 45 | `MI-03-C` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 46 | `MI-04-A` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |
| 47 | `MI-04-B` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |
| 48 | `MI-04-C` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |


#### 01. TA-01-A — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TAYYOR  
**BPM:** 112

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.\nInstrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.\nComposition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 02. TA-01-B — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TAYYOR  
**BPM:** 112

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.\nInstrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.\nComposition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 03. TA-01-C — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TAYYOR  
**BPM:** 112

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.\nInstrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.\nComposition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 04. TA-02-A — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.\nInstrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.\nComposition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 05. TA-02-B — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.\nInstrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.\nComposition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 06. TA-02-C — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.\nInstrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.\nComposition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 07. TA-03-A — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.\nInstrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.\nComposition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 08. TA-03-B — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.\nInstrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.\nComposition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 09. TA-03-C — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.\nInstrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.\nComposition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 10. TA-04-A — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.\nInstrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.\nComposition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 11. TA-04-B — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.\nInstrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.\nComposition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 12. TA-04-C — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Tavsiya akkaunt category.\n\nMusical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.\nInstrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.\nComposition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 13. FM-01-A — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.\nInstrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.\nComposition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 14. FM-01-B — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.\nInstrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.\nComposition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 15. FM-01-C — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.\nInstrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.\nComposition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 16. FM-02-A — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.\nInstrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.\nComposition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 17. FM-02-B — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.\nInstrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.\nComposition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 18. FM-02-C — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.\nInstrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.\nComposition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 19. FM-03-A — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.\nInstrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.\nComposition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 20. FM-03-B — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.\nInstrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.\nComposition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 21. FM-03-C — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.\nInstrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.\nComposition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 22. FM-04-A — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.\nInstrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.\nComposition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 23. FM-04-B — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.\nInstrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.\nComposition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 24. FM-04-C — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Foydali manba category.\n\nMusical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.\nInstrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.\nComposition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 25. QF-01-A — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.\nInstrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.\nComposition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 26. QF-01-B — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.\nInstrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.\nComposition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 27. QF-01-C — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.\nInstrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.\nComposition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 28. QF-02-A — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.\nInstrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.\nComposition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 29. QF-02-B — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.\nInstrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.\nComposition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 30. QF-02-C — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.\nInstrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.\nComposition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 31. QF-03-A — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.\nInstrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.\nComposition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 32. QF-03-B — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.\nInstrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.\nComposition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 33. QF-03-C — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.\nInstrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.\nComposition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 34. QF-04-A — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.\nInstrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.\nComposition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 35. QF-04-B — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.\nInstrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.\nComposition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 36. QF-04-C — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Qiziqarli fakt category.\n\nMusical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.\nInstrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.\nComposition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 37. MI-01-A — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.\nInstrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.\nComposition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 38. MI-01-B — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.\nInstrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.\nComposition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 39. MI-01-C — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.\nInstrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.\nComposition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 40. MI-02-A — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.\nInstrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.\nComposition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 41. MI-02-B — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.\nInstrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.\nComposition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 42. MI-02-C — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.\nInstrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.\nComposition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 43. MI-03-A — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.\nInstrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.\nComposition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 44. MI-03-B — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.\nInstrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.\nComposition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 45. MI-03-C — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.\nInstrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.\nComposition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 46. MI-04-A — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.\nInstrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.\nComposition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 47. MI-04-B — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.\nInstrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.\nComposition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

#### 48. MI-04-C — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create an exactly 8-second professional instrumental music clip for a serious Instagram Reels video in the Maxsus iboralar category.\n\nMusical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.\nInstrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.\nComposition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and end with a musically resolved, clean ending within the 8-second duration.\n\nSTRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Music must remain the only meaningful audio.\n\nVIDEO RULES: generate an MP4 with a completely static, plain matte dark charcoal background. No text, subtitles, logos, people, objects, visualizers, animation, camera movement or scene changes. The video is only a carrier for the music; audio is the priority.
```

### 12.5. Yagona NEX brend outro — barcha bo‘limlar uchun

**Asset ID:** `NEX-OUTRO-01`  
**Holat:** TAYYOR  
**Davomiylik:** aniq 5,2 soniya  
**Shior:** “NEX — Fikr va imkoniyatlar makoni.”  
**Qo‘llanishi:** TA, FM, QF va MI videolarining barchasida aynan shu bitta audio ishlatiladi.

Quyidagi promptni Gemini’ga alohida yuboring. Natija qabul qilinmaguncha outro TUGALLANDI hisoblanmaydi.

```text
Create one original, premium and instantly recognizable NEX brand outro music sting for a professional Instagram Reels studio. The final usable music must be EXACTLY 5.2 seconds long and must feel deliberately composed for a 5.2-second visual outro — not a shortened piece of a longer song.

Brand name: NEX.
Exact on-screen slogan: “NEX — Fikr va imkoniyatlar makoni.”

Musical identity: serious, premium, modern, intelligent and confident. Create one distinctive original melodic motif that gives the NEX brand a recognizable sonic identity. Use refined electronic tones, a warm deep note, a precise soft pulse and a clean harmonic resolution. The slogan should feel naturally supported by the musical phrase, with its main melodic emphasis aligned to the visual appearance of the brand name and slogan. Do not sing or speak the slogan; it appears visually on screen.

Exact timing:
0.0–0.6 seconds: a restrained, recognizable opening tone as the NEX logo begins to appear.
0.6–3.8 seconds: the main original NEX melodic motif develops as the brand name and slogan are revealed.
3.8–4.4 seconds: a short, memorable harmonic resolution that gives the slogan a clear finishing emphasis.
4.4–5.2 seconds: a unique, clean electronic sonic signature and a controlled final decay. The sonic signature itself should last approximately 0.3–0.8 seconds and must not sound like a generic notification beep.

The complete musical outro must fit exactly 5.2 seconds. No extra intro, no silence at the beginning, no long reverb tail beyond the duration, no abrupt cut, and no additional musical section. The ending must resolve naturally at 5.2 seconds.

STRICT AUDIO RULES: original instrumental brand music only. No vocals, no spoken words, no sung slogan, no lyrics, no choir, no sound effects, no impacts, no environmental sounds and no background noise. Do not imitate any existing brand jingle, song, artist or copyrighted melody. Do not add unrelated instruments or change the specified mood.

VIDEO RULES: generate an MP4 only as an audio carrier. Use a completely static matte dark charcoal background. No text, no logo, no people, no objects, no visualizer, no animation, no camera movement and no scene changes. The audio is the priority.

This is the single permanent NEX brand outro. It must be reusable without changes across TA, FM, QF and MI. Do not create alternative versions or different outro melodies.
```

**Qabul qilish mezoni:** aniq 5,2 soniya; jiddiy va premium tovush; o‘ziga xos esda qoladigan NEX melodik imzosi; oxirida 0,3–0,8 soniyalik ovozli belgi; tabiiy yakun; shior bilan vaqt jihatdan moslik. Foydalanuvchi «Qabul qilindi» demaguncha holat TAYYOR/JARAYONDA bo‘lib qoladi.

### 12.6. Foydalanuvchi bilan navbatni boshqarish

Suhbatdagi buyruqlar quyidagicha talqin qilinadi:

1. **«Keyingi»** — birinchi TAYYOR asosiy musiqa promptini chiqarish va uni JARAYONDA deb belgilash. 48 ta asosiy trek yakunlangach, alohida `NEX-OUTRO-01` prompti navbatga qo‘yiladi.
2. **«Qabul qilindi»** — faqat faol promptni TUGALLANDI deb belgilash; so‘ng navbat keyingi TAYYOR promptga tayyor bo‘ladi.
3. **«Mos kelmadi»** yoki **«Qayta ishlaymiz»** — faol promptni QAYTA ISHLASH holatiga o‘tkazish va shu prompt ustida qolish.
4. **«Qayta urinish»** — shu promptning ayni spetsifikatsiyasi bilan yangi MP4 generatsiya qilish uchun promptni qayta berish.
5. **«Holat»** — 48 ta asosiy trek va yagona brend outro holatini alohida, jami hisob bilan ko‘rsatish.

**Hisoblash qoidasi:** foydalanuvchi tasdiqlamagan, faqat generatsiya qilingan yoki ko‘rib chiqilayotgan musiqa TUGALLANDI hisoblanmaydi. Holat o‘zgarishi README jadvalida ham aks ettiriladi.
