# NEX — Shaxsiy Instagram Reels Studio

**Loyiha holati:** faol ishlab chiqilmoqda  
**Asosiy platforma:** GitHub Pages  
**Maqsad:** Instagram Reels uchun turli kontent yo‘nalishlariga mos, mustaqil ishlaydigan studiyalar yaratish.

### 2026-11-22 — Outro bo‘yicha cheklangan ruxsat

Foydalanuvchi TA, FM va QF modullarida faqat NEX outro vaqtini asosiy sahnalardan ajratish hamda FM/QF outro logotipini TA etaloniga moslashtirishga dastlabki cheklangan ruxsat berdi. Keyinchalik anketa maydonlarini tartibga solish uchun alohida ruxsat berildi; bu faqat README’da qayd etilgan TA/FM anketa o‘zgarishlari bilan cheklanadi. Boshqa asosiy kontent oqimi, dizayn, sahna matnlari va vizual mexanizmlar muhofazada qoladi. Joriy ish zaxira tarmog‘ida bajarildi: `backup/ta-fm-qf-before-outro-unification-2026-11-22`.


### 2026-11-22 — Anketa maydonlarini tartibga solish bo‘yicha alohida ruxsat

Foydalanuvchi TA va FM anketalarida amalda ishlatilmayotgan maydonlarni olib tashlash, majburiylik matnlarini haqiqiy tekshiruvga moslashtirish va kerakli qiymatlarni mavjud Reels oqimida ishlatishga aniq ruxsat berdi. FM’dagi “Nima deb qidirish kerak?” va “Qayerdan qidirish kerak?” maydonlari muhim deb tasdiqlandi va saqlandi. Bu maydonlar studiya xulosasida izlanish yo‘riqnomasi sifatida ko‘rsatiladi; avtomatik internet qidiruvi mavjud deb da’vo qilinmaydi. QF formasi o‘zgartirilmadi, chunki undagi qiymatlar amalda ishlatiladi.

## Loyiha modullari

NEX to‘rtta asosiy moduldan tashkil topadi. Har bir modul o‘z interfeysi, ish jarayoni va JavaScript/CSS javobgarlik chegarasiga ega bo‘ladi.

| Qisqartma | Modul nomi | Holati |
|---|---|---|
| **TA** | Tavsiya akkaunt | **0.10.4 — ANKETA MAYDONLARI TOZALANGAN** |
| **FM** | Foydali manba | **0.9.9 — QIDIRUV YO‘RIQNOMASI SAQLANGAN** |
| **PA** | Postulat va aksioma | **0.1.0 — BIRINCHI MUSTAQIL VERSIYA** |
| **MI** | Maxsus iboralar | **0.10.0 — MUSTAQIL MODUL, REELS RENDERI KUTILMOQDA** |

## 1. TA — Tavsiya akkaunt: himoyalangan etalon

TA hozirgi tasdiqlangan holatida tayyor deb hisoblanadi. Uning dizayni, animatsiyalari, funksiyalari, shablonlari, matn tuzilishi, axborot yig‘ish va ma’lumotni qayta ishlash mexanizmlari muhofazada. 2026-11-22 dagi alohida ruxsat doirasida faqat anketa maydonidagi foydalanilmayotgan havola va majburiylik izohlari tartibga solindi.

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

FM foydalanuvchi tomonidan tayyor deb tasdiqlangan. Shu sababli FM moduli hozir **MUHOFAZALANGAN** holatda. 2026-11-22 dagi alohida ruxsat faqat anketa maydonlari va ulardan foydalanish mantiqiga tegishli; boshqa dizayn va Reels mexanizmlari o‘zgartirilmaydi.

- Foydalanuvchi alohida va aniq ruxsat bermaguncha FM’ning birorta fayli, kodi, dizayni, matni, animatsiyasi, funksiyasi yoki sozlamasi o‘zgartirilmaydi.
- Bu taqiq xatolarni tuzatish, optimallashtirish, refaktor qilish, yangilash, cache-buster almashtirish, fayl ko‘chirish yoki kodni tozalash kabi barcha o‘zgarishlarni ham qamrab oladi.
- FM bilan bog‘liq taklif yoki aniqlangan muammo bo‘lsa, avval faqat xabar beriladi. Ruxsatsiz amaliy o‘zgarish kiritilmaydi.
- FM’ga ruxsat faqat foydalanuvchi aniq qaysi ishni bajarishni buyurganidan keyin, faqat kelishilgan doirada amal qiladi. Bitta vazifa uchun berilgan ruxsat boshqa o‘zgarishlarga umumiy ruxsat hisoblanmaydi.
- FM muhofazasi TA kabi doimiy qoida hisoblanadi. Ushbu README yozuvi ham foydalanuvchining ruxsatisiz qayta o‘zgartirilmaydi.

FM manba turlari: Sayt, YouTube, Telegram va Kitob.

**Holat:** tayyor, foydalanuvchi yangi topshiriq bermaguncha o‘zgartirishlar muzlatilgan.

## 5. QF — Qiziqarli fakt

QF mustaqil modul sifatida rivojlantirilmoqda. 0.15.0 da “Fakt e’loni” sahnasiga markazdan kengayadigan ikki nurli chiziq, ular orasida ochiladigan yorqin ekran va keyin namoyon bo‘ladigan fakt matni animatsiyasi qo‘shildi. Three.js WebGL renderer, fakt matnidagi kalit iboralarga mos ayrim 3D sahna profillari, kamera va animatsiya boshqaruvlari hamda besh bosqichli ssenariy vaqt chizig‘i saqlangan. Kalit ibora mosligi qoidaviy ishlaydi; bu hali AI semantik tahlili yoki barcha faktlar uchun avtomatik 3D model yaratish emas. Ovoz yozish va musiqa yaratish/tanlash hozircha tashqi ilovalarda bajariladi; yakuniy audio-video yig‘ish ham tashqi montaj ilovasida amalga oshiriladi. QF ichida audio yozish, musiqa yaratish yoki audio montaj funksiyasi yo‘q.

### QF 01 sahifasi — forma tuzilmasi (0.15.2)

01 — Fakt ma’lumotlari sahifasida barcha kiritish maydonlari yagona `source-fields` forma konteyneriga yig‘ilgan. Fakt tasnifi va fan sohasi tanlovlari, sarlavha, manba nomi, dalil/tekshiruv izohi va tekshiruv holati bir xil vizual tizimda ko‘rsatiladi. Select, input va textarea elementlari uchun umumiy o‘lcham, fokus holati va vertikal oraliqlar belgilangan. O‘zgarish faqat QF moduliga tegishli; TA va FM himoyalangan fayllari o‘zgartirilmagan.

### QF Reels sahnalari va LED fakt displeyi (0.15.3)

Reels tasvir qatlamida HOOK, FAKT E’LONI, MAZMUN, HOLAT, YAKUN kabi texnik sahna nomlari va 01/05 tartib raqamlari chiqarilmaydi; videoda faqat mazmuniy matn va yakuniy NEX brend outro ko‘rinadi. 3D obyektlar sahna davomida ritmik suzish, aylanish va yengil masshtab o‘zgarishi bilan jonlanadi. Ikkinchi — fakt e’loni sahnasida metall romli, emissiv konturli, skan-chiziqli 3D smart LED ekran paydo bo‘ladi; uning matn panelida yorug‘lik gradienti va harakatlanuvchi skan aks etadi.

### QF 0.16.5 — kuchaytirilgan WebGL va yagona ma’lumot kartasi

WebGL ko‘rinishidagi muammo qatlamlar ustma-ustligi sababli yuzaga kelgan: to‘liq ekranli 2D fon WebGL obyektlarini berkitgan. Endi fon, shaffof WebGL va matn uchta mustaqil qatlamda ishlaydi. 3D obyektlar kattalashtirildi, kamera yaqinlashtirildi va harakat amplitudasi kuchaytirildi. Ma’lumotlar uchun bitta karta ishlatiladi: Tasnif, Manba, Dalil va Tekshiruv qiymatlari tegishli sahna boshlanganda kartaning ichida shtamp uslubida ochiladi. NEX brend outro 5,2 soniyalik alohida yakun bo‘lib qoladi. Haqiqiy Android/WebGL ko‘rinishi hali qurilmada sinovdan o‘tkazilishi kerak.

### QF 0.16.4 — NEX outro va manba/tekshiruv shtamplari

NEX outro 5,2 soniyalik suyuq metall oqimidan keyin NEX yozuvi, orbital halqa va brend shiori bilan yakunlanadi. Manba va tekshiruv paneli video birinchi kadridan boshlab barcha asosiy sahnalarda ixcham yuqori qatlam sifatida yuradi. Har bir sahna yakunida uning mazmuniga mos tasnif, manba, dalil yoki tekshiruv holati shtamp/muhr uslubida animatsiya bilan chiqadi. Matnlar faqat forma maydonlaridan olinadi; avtomatik fan/obyekt yorliqlari qaytarilmadi. O‘zgarish faqat QF moduliga tegishli.

### QF 0.16.3 — faqat ssenariy matni

Videodagi barcha ssenariydan tashqari yozuvlar olib tashlandi. 3D mavzu yorliqlari (masalan, astronomiya tanlanganda chiqadigan «YER» yoki boshqa obyekt nomlari), sahna teglari, «01/05» kabi indekslar, manba/tekshiruv kartasi va outrodagi NEX/slogan matnlari video qatlamida chiqarilmaydi. Mavzu nomi 3D obyektga avtomatik yozuv qo‘shmaydi: Mars haqidagi faktga «YER» kabi noto‘g‘ri yorliq chiqmaydi. Videoda faqat foydalanuvchi tayyorlagan ssenariy matni qoladi; outro esa matnsiz vizual yakun sifatida saqlanadi. O‘zgarish faqat QF moduliga tegishli.

### QF 0.16.2 — mobil studiya va yozuv boshqaruvi

QF ekran yozish oynasidagi boshqaruvlar TA etalonidagi xatti-harakatga mos: yozuv boshlanganda va kadrga tegilganda tugmalar 1,8 soniya ko‘rinadi, so‘ng yashirinadi; boshqaruv tugmasi bosilganda ko‘rinish muddati yangilanadi. Mobil studiya 700 px va undan kichik ekranlarda vertikal oqimga o‘tadi: 9:16 preview ixchamlashtiriladi, sozlamalar to‘liq kenglikda ochiladi, bosish maydonlari kattalashtiriladi, forma shriftlari mobil brauzerga moslanadi va kichik ekranlar uchun alohida zichlik sozlamalari qo‘llanadi. Bu o‘zgarishlar faqat QF moduliga tegishli; TA va FM fayllari o‘zgartirilmaydi.

### QF Liquid Metal va NEX outro (0.15.4)

QF Reels sahnalari suyuq metallik fon, xrom-kumush yorug‘lik oqimlari va mavzuga mos 3D obyektlar bilan kompozitsiyalanadi. Video yakuni matnsiz metallik vizual outro bilan beriladi; ssenariydan tashqari yozuvlar chiqarilmaydi.

## 5. PA — Postulat va aksioma

PA — falsafiy tamoyillar, ilmiy aksiomalar, postulatlar va ularning amaliy qo‘llanishini yorituvchi mustaqil Reels studiyasi. U QF modulining yetti bosqichli ish oqimi, 9:16 WebGL preview, 1080×1920 ekran yozish qatlami, besh sahnali timeline, rang/vizual/animatsiya tanlovlari va yagona 5,2 soniyalik NEX outro mexanizmini asos qilib oladi. QF’ga xos fakt tasnifi, tekshiruv holati va fan-mavzu obyektlari PA mazmuniga moslashtirildi.

### PA ma’lumot modeli
- Tushuncha turi: Falsafiy tamoyil, Ilmiy aksioma, Ilmiy postulat, Mantiqiy qonun yoki Nazariy tamoyil.
- Bilim sohasi: Falsafa, Formal mantiq, Matematika, Geometriya, Fizika, Ehtimollar nazariyasi, Informatika, Iqtisodiyot, Tabiiy fanlar yoki boshqa.
- Tamoyil/aksioma nomi, manba, mazmun va nazariy asos, qo‘llanish doirasi alohida kiritiladi.
- Reels ssenariysi: HOOK → TAMOYIL → MA’NO → QO‘LLANISH → CHEGARA VA XULOSA.
- 3D obyektlar mavzuga aloqasiz fakt modellari o‘rniga abstrakt geometriya, mantiqiy bog‘lanish, markaziy g‘oya va sabab-oqibat kompozitsiyalaridan foydalanadi.
- Aksioma va postulatlar muayyan formal tizim yoki nazariya doirasida tushuntiriladi; falsafiy tamoyillar empirik qonun sifatida ko‘rsatilmaydi.
- Audio, musiqa va yakuniy montaj tashqi ilovada; NEX outro o‘zgarmaydi.

**PA versiyasi:** 0.1.0. QF manba papkasi arxiv/oldingi modul sifatida saqlanadi; dashboarddagi faol modul PA manziliga yo‘naltiriladi.

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


## 11. Ikki darajali versiya tizimi

NEX umumiy platforma versiyasi va to‘rtta studiyaning mustaqil versiyalari bilan yuritiladi. Har bir darajaning o‘z VERSION va CHANGELOG fayli bor.

### 11.1. Umumiy NEX versiyasi
- `VERSION` — butun platformaning yagona umumiy versiyasi.
- `CHANGELOG.md` — dashboard, navigatsiya, umumiy arxitektura va platformaga tegishli o‘zgarishlar tarixi.
- Umumiy versiya faqat platformaning o‘ziga tegishli o‘zgarish bo‘lganda oshiriladi. Faqat bitta studiyadagi mustaqil o‘zgarish umumiy versiyani avtomatik oshirmaydi.

### 11.2. Studiyalar versiyasi
Har bir studiyaning versiyasi va tarixi `versions/` papkasida alohida saqlanadi:
- `versions/TA/VERSION` va `versions/TA/CHANGELOG.md`
- `versions/FM/VERSION` va `versions/FM/CHANGELOG.md`
- `versions/QF/VERSION` va `versions/QF/CHANGELOG.md`
- `versions/MI/VERSION` va `versions/MI/CHANGELOG.md`

Modul mustaqil yangilansa, faqat o‘sha modulning versiyasi va CHANGELOG’i yangilanadi. Bir nechta modul yoki umumiy platforma ham o‘zgarsa, tegishli barcha versiyalar alohida oshiriladi.

### 11.3. Versiya oshirish qoidasi
Har bir darajada SemVer (MAJOR.MINOR.PATCH) ishlatiladi:
- PATCH (1.0.0 → 1.0.1): xato tuzatish va moslikni buzmaydigan texnik yaxshilash.
- MINOR (1.0.0 → 1.1.0): moslikni saqlagan yangi imkoniyat yoki funksiya.
- MAJOR (1.0.0 → 2.0.0): oldingi foydalanish tartibi yoki moslikni buzadigan katta o‘zgarish.

### 11.4. Qayd va himoya qoidalari
- Har bir versiya raqamining yagona manbasi o‘z VERSION faylidir.
- Har bir CHANGELOG yozuvida sana, versiya, o‘zgarish sababi, tegilgan fayllar va tekshiruv holati ko‘rsatiladi.
- Faqat hujjat matni yoki izoh o‘zgarsa, mahsulot funksiyasi o‘zgarmagan bo‘lsa, versiya oshirilmaydi; hujjatdagi o‘zgarish tegishli CHANGELOG’da qayd etiladi.
- Ishchi, tasdiqlanmagan yoki bekor qilingan urinishlar reliz hisoblanmaydi.
- Interfeysdagi versiya belgisi va CSS/JavaScript cache-buster qiymatlari tegishli modul VERSION qiymatiga mos bo‘lishi kerak.
- TA va FM himoyalangan: ularning amaldagi HTML/CSS/JS fayllari va interfeys versiya belgilariga aniq ruxsatsiz tegilmaydi. Versiya metama’lumotlari `versions/` tashqi papkasida yuritiladi.

Asosiy qoida: bitta NEX umumiy versiyasi + to‘rtta mustaqil studiya versiyasi. Birining yangilanishi boshqalarining versiyasini o‘zgartirmaydi.
## 12. NEX musiqa kutubxonasi — Stable Audio promptlari

**Maqsad:** TA, FM, QF va MI videolari uchun jiddiy, professional, har bir bo‘limning mazmuniga mos original instrumental musiqalar yaratish. Asosiy treklar Stable Audio’da bevosita audio formatida yaratiladi; video/MP4 generatsiyasi talab qilinmaydi. Stable Audio interfeysida asosiy promptlar uchun `FULL MIX` va `0:30` davomiyligi tanlanadi. NEX Reels montajida kerakli 8 soniyalik parcha tashqi video/audio montaj ilovasida kesib olinadi.

### 12.1. Qat’iy ish qoidalari

- Asosiy kutubxona: **48 ta musiqa prompti** (4 bo‘lim × 4 uslub × 3 variant) va barcha bo‘limlarda ishlatiladigan **1 ta yagona NEX brend outro prompti**. Jami: **49 ta prompt**.
- Har bir generatsiya alohida prompt bilan bajariladi. Promptdagi janr, BPM, kayfiyat, cholg‘ular va kompozitsiya talablari o‘zboshimchalik bilan almashtirilmaydi.
- NEX brend outro musiqasi 48 ta asosiy trekdan alohida yaratilgan va foydalanuvchi tomonidan qabul qilingan. U TA, FM, QF hamda MI videolarining barchasida aynan bir xil audio sifatida ishlatiladi. **NEX-OUTRO-01 qayta generatsiya qilinmaydi**, faqat foydalanuvchi alohida buyruq bersa bundan mustasno.
- Stable Audio’ning asosiy promptlar uchun tanlanadigan eng qisqa standart uzunligi `0:30` bo‘lgani sababli har bir asosiy trek 30 soniyalik audio sifatida yaratiladi. Reels montajida kerakli 8 soniyalik qism kesib olinadi; bu 8 soniyalik limit Stable Audio generatsiyasiga emas, montajdagi foydalaniladigan parchaga tegishli.
- Asosiy treklar uchun **FULL MIX** rejimi ishlatiladi. **MULTI-TRACK** tanlanmaydi: u ko‘proq kredit sarflashi va promptdan tashqari qo‘shimcha aranjirovka qarorlarini kiritishi mumkin.
- Audio faqat instrumental bo‘lishi kerak: ovoz, qo‘shiq, gap, lyrics, humming, choir, sound effects, atrof-muhit shovqini va tasodifiy tovushlar taqiqlanadi.
- Stable Audio’da video yaratilmaydi. Promptlar audio generatsiyasiga mo‘ljallangan; vizual fon, logo, animatsiya va kamera talablari asosiy trek promptlaridan olib tashlangan.
- Har bir prompt ichida janr, BPM, kayfiyat, cholg‘ular, kompozitsiya va A/B/C farqi aniq ko‘rsatiladi. BPM model tomonidan har doim mutlaq aniqlikda bajarilishi kafolatlanmaydi; natija tinglab tekshiriladi.
- Promptlar oyma-oy, har oyda barcha to‘rtta bo‘lim qatnashadigan tartibda bajariladi: oyiga 3 ta TA + 3 ta FM + 3 ta QF + 3 ta MI = **12 ta trek**.
- Har bir generatsiya alohida prompt bilan bajariladi. Bir vaqtda faqat bitta prompt faol bo‘ladi.
- Foydalanuvchi **«Qabul qilindi»** desa, faqat faol prompt holati **TUGALLANDI** ga o‘tkaziladi. Shundan keyingina navbatdagi prompt ochiladi.
- Foydalanuvchi **«Keyingi»** desa, eng birinchi TAYYOR prompt ko‘rsatiladi. Agar faol prompt hali qabul qilinmagan bo‘lsa, uni tashlab o‘tmasdan avval shu prompt holati aniqlashtiriladi.
- Natija mos kelmasa, u TUGALLANDI hisoblanmaydi. Faqat shu prompt qayta ishlanadi; keyingi promptga o‘tilmaydi.
- README’dagi holat jadvali foydalanuvchining aniq tasdig‘iga qarab yangilanadi. Generatsiya qilingan, lekin tinglanib qabul qilinmagan trek TUGALLANDI deb belgilanmaydi.
- TA va FM modullarining himoyalangan fayllari o‘zgartirilmaydi. Ushbu bo‘lim faqat README hujjatida yuritiladi.

### 12.2. Holatlar ma’nosi

| Holat | Ma’nosi |
|---|---|
| **TAYYOR** | Prompt navbatda, hali generatsiya/tasdiq qilinmagan |
| **JARAYONDA** | Hozir foydalanuvchi bilan ishlanayotgan prompt |
| **TUGALLANDI** | Foydalanuvchi natijani tinglab, aniq «Qabul qilindi» deb tasdiqlagan |
| **QAYTA ISHLASH** | Natija talabga mos emas; shu prompt tuzatilishi yoki qayta generatsiya qilinishi kerak |

### 12.3. Umumiy holat va 4 oylik ishlab chiqarish rejasi

- Asosiy musiqa promptlari: **48**
- Yagona brend outro prompti: **1**
- Jami prompt: **49**
- Tugallangan: **3** (NEX-OUTRO-01, TA-01-A, TA-01-B)
- Jarayonda: **0**
- Qayta ishlash: **0**
- Navbatdagi prompt: **TA-01-C**
- Brend outro: **alohida, umumiy va barcha bo‘limlarda bir xil**

| Oy | TA — Tavsiya akkaunt | FM — Foydali manba | QF — Qiziqarli fakt | MI — Maxsus iboralar | Jami |
|---|---|---|---|---|---:|
| 1-oy | TA-01-A/B/C | FM-01-A/B/C | QF-01-A/B/C | MI-01-A/B/C | **12** |
| 2-oy | TA-02-A/B/C | FM-02-A/B/C | QF-02-A/B/C | MI-02-A/B/C | **12** |
| 3-oy | TA-03-A/B/C | FM-03-A/B/C | QF-03-A/B/C | MI-03-A/B/C | **12** |
| 4-oy | TA-04-A/B/C | FM-04-A/B/C | QF-04-A/B/C | MI-04-A/B/C | **12** |
| **Jami** | **12** | **12** | **12** | **12** | **48** |

**Bajarish tartibi:** har oy avval TA, keyin FM, QF va MI promptlari bajariladi. Har bir studiya ichida A → B → C ketma-ketligi saqlanadi. Shu tartib 48 ta prompt jadvali va quyidagi prompt matnlarida ham qo‘llanadi.

**Bepul tarif bo‘yicha reja:** Stable Audio’ning hozirgi rasmiy ma’lumotida Free tarifida oyiga 50 kredit, FULL MIX generatsiyasi esa 4 kredit deb ko‘rsatilgan. 12 ta trek × 4 kredit = 48 kredit; demak, reja bitta oy uchun nazariy jihatdan sig‘adi va 2 kredit zaxira qoladi. Qayta generatsiya qo‘shimcha kredit talab qilishi mumkin. Tarif va kredit narxlari o‘zgarishi mumkinligi sababli har oy boshlanishida rasmiy tarif sahifasida qayta tekshiriladi.

### 12.4. Promptlar va holat nazorati

Quyidagi 48 ta asosiy musiqa prompti to‘liq va qat’iy spetsifikatsiya hisoblanadi. Har bir prompt Stable Audio uchun alohida tayyorlangan; promptni `FULL MIX` rejimida alohida yuborish mumkin. Asl uslub, BPM, cholg‘ular, kayfiyat va A/B/C farqlari saqlangan. Eski MP4/video ko‘rsatmalari audio-only ko‘rsatmalar bilan almashtirilgan. Ulardan keyin bitta umumiy NEX brend outro spetsifikatsiyasi berilgan.

| № | ID | Bo‘lim | Uslub | BPM | Holat |
|---:|---|---|---|---:|---|
| 1 | `TA-01-A` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TUGALLANDI |
| 2 | `TA-01-B` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TUGALLANDI |
| 3 | `TA-01-C` | Tavsiya akkaunt | Premium zamonaviy elektron | 112 | TAYYOR |
| 4 | `FM-01-A` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 5 | `FM-01-B` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 6 | `FM-01-C` | Foydali manba | Premium ambient | 78 | TAYYOR |
| 7 | `QF-01-A` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 8 | `QF-01-B` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 9 | `QF-01-C` | Qiziqarli fakt | Sirli jumboqli | 96 | TAYYOR |
| 10 | `MI-01-A` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 11 | `MI-01-B` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 12 | `MI-01-C` | Maxsus iboralar | Falsafiy chuqur | 72 | TAYYOR |
| 13 | `TA-02-A` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 14 | `TA-02-B` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 15 | `TA-02-C` | Tavsiya akkaunt | Kreativ innovatsion | 120 | TAYYOR |
| 16 | `FM-02-A` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 17 | `FM-02-B` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 18 | `FM-02-C` | Foydali manba | Professional documentary | 88 | TAYYOR |
| 19 | `QF-02-A` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 20 | `QF-02-B` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 21 | `QF-02-C` | Qiziqarli fakt | Kutilmagan kashfiyot | 110 | TAYYOR |
| 22 | `MI-02-A` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 23 | `MI-02-B` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 24 | `MI-02-C` | Maxsus iboralar | Emotsional pianino | 76 | TAYYOR |
| 25 | `TA-03-A` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 26 | `TA-03-B` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 27 | `TA-03-C` | Tavsiya akkaunt | Professional ishonch | 104 | TAYYOR |
| 28 | `FM-03-A` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 29 | `FM-03-B` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 30 | `FM-03-C` | Foydali manba | Ilmiy minimal elektron | 90 | TAYYOR |
| 31 | `QF-03-A` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 32 | `QF-03-B` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 33 | `QF-03-C` | Qiziqarli fakt | Ilmiy izlanish | 108 | TAYYOR |
| 34 | `MI-03-A` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 35 | `MI-03-B` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 36 | `MI-03-C` | Maxsus iboralar | Minimalistik zamonaviy | 86 | TAYYOR |
| 37 | `TA-04-A` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 38 | `TA-04-B` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 39 | `TA-04-C` | Tavsiya akkaunt | Dinamik zamonaviy | 126 | TAYYOR |
| 40 | `FM-04-A` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 41 | `FM-04-B` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 42 | `FM-04-C` | Foydali manba | Professional lo-fi | 84 | TAYYOR |
| 43 | `QF-04-A` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 44 | `QF-04-B` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 45 | `QF-04-C` | Qiziqarli fakt | Dramatik fakt | 100 | TAYYOR |
| 46 | `MI-04-A` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |
| 47 | `MI-04-B` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |
| 48 | `MI-04-C` | Maxsus iboralar | Motivatsion qat’iyat | 108 | TAYYOR |


#### 01. TA-01-A — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TUGALLANDI  
**BPM:** 112

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.
Instrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.
Composition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 02. TA-01-B — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TUGALLANDI  
**BPM:** 112

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.
Instrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.
Composition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 03. TA-01-C — Tavsiya akkaunt: Premium zamonaviy elektron

**Holat:** TAYYOR  
**BPM:** 112

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Premium zamonaviy elektron. Tempo: 112 BPM. Mood: Confident, modern, intelligent, energetic but serious.
Instrumentation: clean synthesizers, controlled deep bass, precise electronic percussion.
Composition: A refined electronic groove with a clear musical identity from the first beat; steady development and a clean resolved ending. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 04. FM-01-A — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.
Instrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.
Composition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 05. FM-01-B — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.
Instrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.
Composition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 06. FM-01-C — Foydali manba: Premium ambient

**Holat:** TAYYOR  
**BPM:** 78

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Premium ambient. Tempo: 78 BPM. Mood: Calm, trustworthy, intelligent, informative and serious.
Instrumentation: soft atmospheric synthesizers, warm sustained pads, delicate piano, subtle low end.
Composition: Unobtrusive educational ambience with gentle harmonic movement; leave sonic space for information and voiceover. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 07. QF-01-A — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.
Instrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.
Composition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 08. QF-01-B — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.
Instrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.
Composition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 09. QF-01-C — Qiziqarli fakt: Sirli jumboqli

**Holat:** TAYYOR  
**BPM:** 96

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Sirli jumboqli. Tempo: 96 BPM. Mood: Mysterious, intelligent, intriguing, suspenseful and serious.
Instrumentation: deep restrained synth pulses, low strings, delicate high textures, controlled rhythmic tension.
Composition: Build curiosity gradually without horror, fear, jump scares or exaggerated tension. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 10. MI-01-A — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.
Instrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.
Composition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 11. MI-01-B — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.
Instrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.
Composition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 12. MI-01-C — Maxsus iboralar: Falsafiy chuqur

**Holat:** TAYYOR  
**BPM:** 72

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Falsafiy chuqur. Tempo: 72 BPM. Mood: Philosophical, mature, thoughtful, profound and serious.
Instrumentation: minimal cinematic piano, warm sustained strings, subtle ambient layers, restrained low end.
Composition: Leave space for the meaning of the quote; use a simple memorable phrase without melodrama. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 13. TA-02-A — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.
Instrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.
Composition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 14. TA-02-B — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.
Instrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.
Composition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 15. TA-02-C — Tavsiya akkaunt: Kreativ innovatsion

**Holat:** TAYYOR  
**BPM:** 120

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Kreativ innovatsion. Tempo: 120 BPM. Mood: Innovative, stylish, forward-thinking, confident and serious.
Instrumentation: subtle analog synthesizers, polished bass, crisp electro-pop percussion.
Composition: A memorable but restrained melodic motif; no festival-style drop, no playful hooks, cohesive progression. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 16. FM-02-A — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.
Instrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.
Composition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 17. FM-02-B — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.
Instrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.
Composition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 18. FM-02-C — Foydali manba: Professional documentary

**Holat:** TAYYOR  
**BPM:** 88

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional documentary. Tempo: 88 BPM. Mood: Credible, thoughtful, educational, authoritative and composed.
Instrumentation: soft piano, restrained orchestral strings, warm bass, delicate percussion.
Composition: A concise documentary underscore that supports factual information without overpowering narration. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 19. QF-02-A — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.
Instrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.
Composition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 20. QF-02-B — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.
Instrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.
Composition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 21. QF-02-C — Qiziqarli fakt: Kutilmagan kashfiyot

**Holat:** TAYYOR  
**BPM:** 110

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Kutilmagan kashfiyot. Tempo: 110 BPM. Mood: Surprising, intelligent, fascinating, confident and serious.
Instrumentation: rising strings, refined piano accents, controlled percussion, uplifting harmonic reveal.
Composition: Create a sense of discovery with a subtle reveal; no explosive impact or exaggerated trailer climax. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 22. MI-02-A — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.
Instrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.
Composition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 23. MI-02-B — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.
Instrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.
Composition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 24. MI-02-C — Maxsus iboralar: Emotsional pianino

**Holat:** TAYYOR  
**BPM:** 76

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Emotsional pianino. Tempo: 76 BPM. Mood: Sincere, reflective, emotionally deep, mature and dignified.
Instrumentation: expressive grand piano, delicate string support, subtle cinematic ambience.
Composition: Natural piano dynamics and restrained emotion; avoid romantic clichés, excessive reverb and melodramatic sadness. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 25. TA-03-A — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.
Instrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.
Composition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 26. TA-03-B — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.
Instrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.
Composition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 27. TA-03-C — Tavsiya akkaunt: Professional ishonch

**Holat:** TAYYOR  
**BPM:** 104

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Professional ishonch. Tempo: 104 BPM. Mood: Trustworthy, intelligent, focused, polished and serious.
Instrumentation: warm bass, subtle piano accents, tight percussion, clean synth texture.
Composition: A credible premium groove suitable for introducing a recommended account; balanced dynamics and controlled ending. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 28. FM-03-A — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.
Instrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.
Composition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 29. FM-03-B — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.
Instrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.
Composition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 30. FM-03-C — Foydali manba: Ilmiy minimal elektron

**Holat:** TAYYOR  
**BPM:** 90

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Ilmiy minimal elektron. Tempo: 90 BPM. Mood: Analytical, modern, clear-minded, reliable and serious.
Instrumentation: minimal electronic pulses, soft synth layers, delicate piano, restrained rhythm.
Composition: Elegant knowledge-focused atmosphere; no science-fiction clichés, computer beeps or exaggerated futurism. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 31. QF-03-A — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.
Instrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.
Composition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 32. QF-03-B — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.
Instrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.
Composition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 33. QF-03-C — Qiziqarli fakt: Ilmiy izlanish

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Ilmiy izlanish. Tempo: 108 BPM. Mood: Investigative, intellectual, curious, modern and serious.
Instrumentation: precise pulsing synths, subtle orchestral strings, restrained percussion, refined motif.
Composition: Premium science-documentary character; curious and analytical, never arcade-like or cartoonish. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 34. MI-03-A — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.
Instrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.
Composition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 35. MI-03-B — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.
Instrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.
Composition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 36. MI-03-C — Maxsus iboralar: Minimalistik zamonaviy

**Holat:** TAYYOR  
**BPM:** 86

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Minimalistik zamonaviy. Tempo: 86 BPM. Mood: Elegant, confident, intelligent, restrained and serious.
Instrumentation: soft analog synthesizer, subtle piano notes, gentle pulse, refined bass.
Composition: Minimal arrangement with generous sonic space for on-screen text or voiceover; no pop hook or dance beat. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 37. TA-04-A — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.
Instrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.
Composition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 38. TA-04-B — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.
Instrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.
Composition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 39. TA-04-C — Tavsiya akkaunt: Dinamik zamonaviy

**Holat:** TAYYOR  
**BPM:** 126

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Tavsiya akkaunt category.

Musical style: Dinamik zamonaviy. Tempo: 126 BPM. Mood: Energetic, focused, confident, contemporary and serious.
Instrumentation: crisp percussion, controlled bass pulses, restrained cinematic synth layer.
Composition: Strong rhythmic consistency without an exaggerated EDM drop; a purposeful build and controlled resolution. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 40. FM-04-A — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.
Instrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.
Composition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 41. FM-04-B — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.
Instrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.
Composition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 42. FM-04-C — Foydali manba: Professional lo-fi

**Holat:** TAYYOR  
**BPM:** 84

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Foydali manba category.

Musical style: Professional lo-fi. Tempo: 84 BPM. Mood: Focused, calm, mature, thoughtful and professional.
Instrumentation: mellow electric piano, muted drums, warm bass, subtle atmospheric texture.
Composition: Clean premium lo-fi groove; understated and steady, without vinyl crackle, excessive nostalgia or sleepy feel. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 43. QF-04-A — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.
Instrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.
Composition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 44. QF-04-B — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.
Instrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.
Composition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 45. QF-04-C — Qiziqarli fakt: Dramatik fakt

**Holat:** TAYYOR  
**BPM:** 100

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Qiziqarli fakt category.

Musical style: Dramatik fakt. Tempo: 100 BPM. Mood: Impactful, intense, authoritative, intriguing and serious.
Instrumentation: deep orchestral bass, restrained brass accents, dark strings, controlled cinematic percussion.
Composition: Communicate significance and tension without fear, aggression, explosive trailer hits or excessive epic scale. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 46. MI-04-A — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.
Instrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.
Composition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a slightly more restrained arrangement, fewer simultaneous layers, and a clearly audible central motif. Do not introduce any new genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 47. MI-04-B — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.
Instrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.
Composition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a slightly fuller arrangement with a measured increase in rhythmic detail, while preserving clarity, seriousness and the exact musical identity. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

#### 48. MI-04-C — Maxsus iboralar: Motivatsion qat’iyat

**Holat:** TAYYOR  
**BPM:** 108

```text
Create a 30-second professional instrumental music cue for a serious Instagram Reels video in the Maxsus iboralar category.

Musical style: Motivatsion qat’iyat. Tempo: 108 BPM. Mood: Determined, disciplined, confident, inspiring and dignified.
Instrumentation: steady orchestral strings, controlled deep percussion, warm piano, gradual harmonic lift.
Composition: Communicate inner strength and purposeful action, not sports advertising or exaggerated heroic triumph. Keep the same defined genre and mood. Use a different short melodic phrase and a distinct but compatible rhythmic pattern; do not copy the previous variation and do not change the genre. Start with music immediately, maintain a coherent musical phrase, and develop the musical idea coherently across the full 30 seconds and finish with a musically resolved, clean ending.

STRICT AUDIO RULES: instrumental music only. Absolutely no singing, vocals, spoken words, lyrics, humming, choir, sound effects, impacts, transitions, environmental sounds or background noise. Do not add any unrelated instruments or change the specified genre, tempo, mood or arrangement. No sudden loudness spikes, clipping or distorted audio. Keep the arrangement clear and controlled, with no abrupt change of genre. Music must remain the only meaningful audio.

STABLE AUDIO OUTPUT: Generate audio only, not video. Use FULL MIX to create one finished, balanced instrumental mix. Select 0:30 in the length control. Begin the music immediately, avoid a long intro or silence, maintain the specified tempo and musical identity, and create a clean resolved ending. The result must be suitable as a premium instrumental bed for a serious Instagram Reel.
```

### 12.5. Stable Audio’dan foydalanish tartibi

1. Brauzerda https://stableaudio.com/ manzilini oching va **Sign up free** orqali akkaunt yarating yoki **Log in** qiling.
2. Bosh sahifadagi prompt maydoniga README’da ko‘rsatilgan faol trek promptini to‘liq joylashtiring.
3. Rejim sifatida **FULL MIX** ni tanlang. Bu promptni o‘zgartirmasdan bitta tayyor miks yaratadi. **MULTI-TRACK** bu kutubxona uchun standart rejim emas.
4. **LENGTH** maydonidan **0:30** ni tanlang.
5. **START** tugmasini bosing va generatsiya tugashini kuting.
6. Natijani boshidan oxirigacha tinglang. Janr, kayfiyat, cholg‘ular, ritm, aranjirovka va toza yakunni tekshiring. BPM’ni imkon bo‘lsa alohida metronom/tahrirlash dasturida tekshiring.
7. Mos kelmasa, shu trekni qayta generatsiya qiling yoki natija ichidagi biror qismni tuzatish uchun Stable Audio’ning tahrirlash imkoniyatlaridan foydalaning. Qayta generatsiya kredit sarflaydi.
8. Mos bo‘lsa, **Download/Export** orqali audio faylni qurilmaga saqlang. Fayl nomini trek ID bilan belgilang, masalan `NEX_TA-01-A_v1`.
9. Reels montajida kerakli 8 soniyalik parchani kesib oling, ovoz balandligini video ovozi bilan muvozanatlang va 5,2 soniyalik yagona NEX outro audio faylini alohida qo‘shing.
10. Trekni qabul qilish uchun foydalanuvchi aniq **«Qabul qilindi»** deb tasdiqlashi kerak. Tasdiqdan keyin README jadvalidagi faqat shu trek holati `TUGALLANDI` qilinadi.

**Kredit nazorati:** rasmiy qo‘llanmada FULL MIX sessiyasi 4 kredit, MULTI-TRACK 6 kredit, qo‘shimcha audio generatsiya amallari esa odatda 4 kredit deb ko‘rsatilgan. Free tarifidagi 50 oylik kredit bilan 12 ta FULL MIX generatsiyasi 48 kreditga teng. Har bir qayta urinish qo‘shimcha kredit talab qilishi mumkin. Generatsiya muvaffaqiyatsiz tugasa, rasmiy qo‘llanmaga ko‘ra kredit yechilmaydi.

**Rasmiy qo‘llanmalar:** https://stableaudio.com/guide va https://stableaudio.com/

### 12.6. Yagona NEX brend outro — barcha bo‘limlar uchun

**Asset ID:** `NEX-OUTRO-01`  
**Holat:** TUGALLANDI  
**Davomiylik:** aniq 5,2 soniya  
**Shior:** “NEX — Fikr va imkoniyatlar makoni.”  
**Qo‘llanishi:** TA, FM, QF va MI videolarining barchasida aynan shu bitta audio ishlatiladi.
**Qabul holati:** Foydalanuvchi 2026-11-22 kuni «Qabul qilindi» deb tasdiqladi. Outro yakuniy variant sifatida qabul qilindi.

**Oldingi urinish natijasi:** Gemini 59 soniyalik musiqa yaratdi; bu 5,2 soniyalik sonic logo talabiga mos emas. Shu sababli eski prompt almashtirildi. Yangi promptda inson ovozida NEX nomi aytilishi va oxirgi X tovushining shishasimon jarangga sirg‘alib o‘tishi asosiy talab hisoblanadi.

Quyidagi matn NEX sonic-logo uchun dastlabki batafsil spetsifikatsiya sifatida saqlanadi. Amaldagi outro foydalanuvchi tomonidan tayyorlanib, yakuniy variant sifatida qabul qilingan.

```text
Create a SINGLE 5.2-SECOND NEX sonic brand logo — NOT a song, NOT background music, and absolutely NOT a 59-second or long music track.

The entire audio must be exactly 5.2 seconds. Treat this as a tightly timed premium audio logo for the brand NEX.

CORE IDEA:
A powerful human voice announces the brand name “NEX” in one dramatic, confident, masculine-sounding studio voice. The delivery must begin with a punchy, explosive attack on “NE”, then stretch the final “X” into a smooth, rising/falling sliding sound: “NEXxxxxx”. The word must remain clearly recognizable as “NEX”; do not pronounce the letters separately as N-E-X. Do not add any other words.

VOICE CHARACTER:
One deep, resonant, mature, confident human voice. Close-miked, polished, cinematic advertising quality. Strong and impactful, but not shouting, aggressive, comic, robotic or distorted. The pronunciation of NEX must be crisp and intelligible. The final X should transition seamlessly into a bright, glass-like shimmer.

SIGNATURE SOUND:
Immediately after and partially overlapping the extended final X, create a distinctive crystal-glass resonance — like a finely tuned glass instrument being struck, but more refined, modern and premium. It should shimmer, glide in pitch, and decay elegantly. The glass-like sound is a designed musical tone, not breaking glass, not a crash, and not a random sound effect. Add only a subtle low-frequency impact beneath the voice to give the brand announcement weight. The result must feel like one unified NEX sound, not separate unrelated effects.

EXACT TIMELINE — TOTAL 5.2 SECONDS:
0.00–0.35 s: a short, powerful, controlled low-frequency brand impact; immediate start, no silence.
0.35–1.65 s: the human voice says “NEX” once. “NE” has a punchy, explosive onset; stretch the final “X” into “xxxxx” with a smooth, stylish glide.
1.30–3.70 s: the extended X blends into a clear, bright, crystal-glass resonance that slides smoothly and shimmers. This glass tone is the signature of the brand.
3.70–4.65 s: the glass resonance resolves into one warm, premium harmonic tone.
4.65–5.20 s: a short, recognizable final sonic tail fades naturally and completely by exactly 5.20 seconds.

BRAND FEEL:
Premium, bold, intelligent, modern, memorable, confident and distinctive. The sound must be recognizable after repeated use. Avoid generic corporate stock music, generic notification sounds, trailer booms, EDM drops, orchestral fanfares or a full musical composition.

STRICT CONTENT RULES:
- The ONLY spoken word is “NEX”, spoken once by one human voice.
- No slogan spoken or sung. The slogan “NEX — Fikr va imkoniyatlar makoni.” is visual text in the video, not audio.
- No additional words, letters, whispers, humming, singing, choir or backing vocals.
- No long melody, no beat, no song structure and no background music.
- No glass breaking, shattering, crashes, environmental noise or unrelated sound effects.
- Do not imitate any existing brand sound, artist, song or copyrighted melody.
- Do not extend the audio beyond 5.2 seconds. Do not generate a longer composition and do not append silence.

VIDEO OUTPUT:
Generate an MP4 with a completely static matte dark-charcoal background, solely as a carrier for this audio. No text, no subtitles, no logo, no people, no objects, no visualizer, no animation, no camera movement and no scene changes. Audio is the only priority.

This is the ONE permanent NEX sonic brand signature, used identically for TA, FM, QF and MI. Create only this single version. Do not improvise, add sections, or change the spoken brand name.
```

**Qabul qilish mezoni:** audio 5,2 soniyadan oshmasligi; inson ovozi “NEX”ni bir marta aniq aytishi; “NE” kuchli va portlovchi boshlanishi; yakuniy “X” shishasimon, sirg‘aluvchi jarangga aylanishi; jarang 5,2 soniyada tabiiy tugashi; qo‘shimcha so‘z yoki fon musiqasi bo‘lmasligi. Foydalanuvchi «Qabul qilindi» demaguncha holat QAYTA ISHLASH/JARAYONDA bo‘lib qoladi.

### 12.7. Foydalanuvchi bilan navbatni boshqarish

Suhbatdagi buyruqlar quyidagicha talqin qilinadi:

1. **«Keyingi»** — navbatdagi TAYYOR asosiy musiqa prompti `TA-01-A` ni chiqarish; undan keyin 48 ta asosiy musiqa prompti belgilangan tartibda davom etadi.
2. **«Qabul qilindi»** — faqat faol promptni TUGALLANDI deb belgilash; so‘ng navbat keyingi TAYYOR promptga tayyor bo‘ladi.
3. **«Mos kelmadi»** yoki **«Qayta ishlaymiz»** — faol promptni QAYTA ISHLASH holatiga o‘tkazish va shu prompt ustida qolish.
4. **«Qayta urinish»** — shu promptning ayni spetsifikatsiyasi bilan yangi MP4 generatsiya qilish uchun promptni qayta berish.
5. **«Holat»** — 48 ta asosiy trek va yagona brend outro holatini alohida, jami hisob bilan ko‘rsatish.

**Hisoblash qoidasi:** foydalanuvchi tasdiqlamagan, faqat generatsiya qilingan yoki ko‘rib chiqilayotgan musiqa TUGALLANDI hisoblanmaydi. Holat o‘zgarishi README jadvalida ham aks ettiriladi.


## 13. Mustaqil studiyalar arxitekturasi — 0.10.0

### 13.1. Bosh sahifa va marshrutlar
- Ildizdagi `index.html` faqat NEX dashboard vazifasini bajaradi; u mazmun kiritish yoki umumiy ssenariy oqimini boshqarmaydi.
- Mustaqil modullar: `/tavsiya-akkaunt/`, `/foydali-manba/`, `/qiziqarli-fakt/`, `/maxsus-iboralar/`.
- Har bir modul o‘z HTML, CSS va JavaScript qatlamiga ega. Modullar bir-birining ichki holati va ish jarayonini boshqarmaydi.
- FM mavjud papkasi va uning fayllari ushbu arxitektura o‘zgarishida tahrirlanmadi.

### 13.2. TA — ichki tuzilma himoyasi
- Amaldagi TA oqimi `tavsiya-akkaunt/` manziliga alohida nusxa sifatida joylashtirildi.
- TA forma maydonlari, sahna tuzilishi, generatsiya qoidalari, Canvas/WebGL chizish algoritmlari va CSS dizayni saqlab qolindi.
- Faqat modulga kirish nuqtasi TA rejimiga yo‘naltirildi va “Yangi loyiha” bosh dashboardga qaytadi.
- TA nusxasi o‘z CSS va JS fayllariga ega; FM yoki dashboard kodiga bog‘liq emas.

### 13.3. QF — faktga asoslangan Reels studiyasi
- Fakt tasnifi va fan sohasi alohida boshqariladi; manba nomi, dalil va tekshiruv qaydi mavjud. HTTPS/URL maydoni yo‘q.
- FM arxitekturasiga mos yetti bosqich: fakt ma’lumotlari, ssenariy, bayon uslubi, vizual til, rang palitrasi, animatsiya, NEX Reels Studio.
- 9:16 jonli WebGL preview, besh sahnali ketma-ket matn, alohida sahna davomiyligi, timeline, pauza/davom ettirish va qayta boshlash mavjud.
- 1080×1920 yozuv rejimi telefonning native ekran yozuvi bilan ishlaydi; bu ichki MP4 eksport emas.
- QF’ning fan sohasi va fakt matniga mos 3D obyektlari saqlanadi.
- Ovoz, musiqa, audio montaj va yakuniy birlashtirish tashqi ilovalarda bajariladi.
### 13.4. MI — mustaqil modul
- Iboraning xarakteri, matni, muallif/manbasi, mazmuni, qo‘llanish konteksti, Hook va yakun maydonlari ajratildi.
- Matn yig‘ish va tipografik vizual konsepsiya TA/FM/QF oqimlaridan mustaqil.

### 13.5. Amalga oshirish chegarasi
- 0.10.0 umumiy arxitektura relizi bo‘lib qoladi. QF studiyasi 0.12.0 da 3D renderer, ayrim faktga mos sahna profillari, kamera/animatsiya boshqaruvi va ssenariy vaqt chizig‘iga ega. Real mobil/desktop WebGL sinovi hali qurilmalarda tasdiqlanishi kerak. QF ichida ovoz yozish, musiqa yaratish, audio montaj yoki yakuniy Reels eksporti qilinmaydi; ovoz, musiqa va yakuniy video tashqi ilovalarda tayyorlanadi. MI kengaytirilgan Reels renderi alohida ishlab chiqiladi.
- TA va FM ichki fayllariga o‘zgartirish kiritish uchun alohida ruxsat talab qilinadi.


### 13.6. Arxitektura hujjati va FM versiya istisnosi

- Batafsil papka tuzilmasi, modul chegaralari, QF epistemik qoidalari va reliz tekshiruvlari `ARCHITECTURE.md` faylida yuritiladi.
- Global versiya `0.10.0`. FM foydalanuvchi tomonidan himoyalangan va uning birorta fayli, jumladan versiya belgisi/cache-busteri ham ruxsatsiz o‘zgartirilmaydi. Shu sabab FM sahifasidagi ko‘rinadigan eski `v0.9.7` belgisi hozircha saqlanadi; bu global versiyadan ataylab qilingan, himoya talabiga mos istisno. FM uchun alohida ruxsat berilgandagina moslashtiriladi.

- QF v0.15.5: yakuniy 5,2 soniyalik outro FM bilan bir xil qilindi — suyuq xrom to‘lqini, NEX logotipi, orbital chiziq va slogan. FM manba fayllari o‘zgartirilmagan.
- QF v0.15.6: ishlatilmaydigan yordamchi funksiyalar, o‘lik holat o‘zgaruvchilari va eski yashirin DOM maydonlari olib tashlandi; faol vizual va Reels oqimi o‘zgartirilmadi.
- TA v0.10.2: chaqirilmaydigan `getToneVisual()` yordamchi funksiyasi olib tashlandi; qolgan TA interfeysi va funksional oqimi o‘zgartirilmadi. Bu faqat 2026-11-22 dagi aniq audit topshirig‘i doirasidagi istisno; keyingi o‘zgarishlar uchun alohida ruxsat talabi saqlanadi.


### QF 0.16.0 — to‘liq Reels sahna takomillashtirishi (2026-11-22)

- Asosiy besh sahna va 5,2 soniyalik NEX outro endi alohida vaqt bloklari. Outro asosiy sahnalarning oxirini yopmaydi; jami davomiylikka alohida qo‘shiladi.
- Har bir sahnada mustaqil 3D kompozitsiya, mavzuga mos model, sahna dekorlari va silliq almashish mavjud.
- To‘rtta vizual til 2D/3D kompozitsiyada farqlanadi; sakkizta bayon uslubi matn tipografikasi va reveal animatsiyasini boshqaradi.
- Beshta rang palitrasi 3D material, emissiv rang va yoritishlarga ham ta’sir qiladi. Kamera sahnaga mos yuradi va pointer parallax qo‘llaydi.
- `qfSceneCue` vizual yorliqqa aylandi. HOLAT sahnasi fakt tasnifi, manba, dalil va tekshiruv qaydini ko‘rsatadi.
- Kalit iboralar normalizatsiyasi va sinonimlar orqali mavzuga mos model aniqlanadi. Bu deterministik qoidalar; AI tomonidan faktni tekshirish emas.
- Telefonning native ekran yozuvi saqlanadi; ichki MP4 eksporti va audio/musiqa montaji qo‘shilmadi.
- QF 0.16.0 o‘zgarishlari faqat QF fayllariga tegishli. TA va FM manba fayllari o‘zgartirilmadi.
