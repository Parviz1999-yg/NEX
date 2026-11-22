# NEX — rivojlantirish holati (2026-11-22)

- TA v0.10.2 — foydalanuvchi tasdiqlagan, o‘zgartirishlar to‘xtatilgan.
- FM v0.9.7 — foydalanuvchi tasdiqlagan, o‘zgartirishlar to‘xtatilgan. Outro asosiy davomiylikning oxirgi 5,2 soniyasini egallashi aniqlandi; FM fayllariga tegilmadi.
- QF v0.16.0 — besh asosiy sahna + mustaqil 5,2 soniyalik outro; to‘rtta vizual til, sakkiz bayon profili, ranglarning 3D material/yoritishga ta’siri, sahna bo‘yicha kamera va parallax, manba/dalil kartasi, vizual fakt yorlig‘i va qoidaviy semantik moslashtirish qo‘shildi.
- QF oldingi holat zaxirasi: `backup/qf-0.15.6-before-full-enhancement-2026-11-22`.
- Statik JS sintaksisi va DOM ID tekshiruvlari o‘tkazildi. Android/desktop WebGL, ekran yozuvi va mobil FPS sinovi hali bajarilishi kerak.

# NEX — audit va rivojlantirish holati (2026-11-22)

- Auditdan oldingi zaxira: `backup/nex-before-dead-code-cleanup-2026-11-22`.
- TA: v0.10.2 — chaqirilmaydigan bitta yordamchi funksiya olib tashlandi; qolgan funksiyalar o‘zgarmadi.
- FM: v0.9.7 — muhofazalangan, manba kodi o‘zgartirilmadi.
- QF: v0.15.6 — foydalanilmaydigan yordamchilar, holat o‘zgaruvchilari va yashirin DOM qoldiqlari tozalandi.
- Statik JS sintaksis va DOM ID bog‘lanish tekshiruvlari o‘tdi. Android/desktop real brauzer, WebGL va ekran yozish sinovi hali bajarilishi kerak.

# NEX — ishlar holati

Amaldagi versiya: **v0.9.7**  
Brend yo‘nalishi: **Liquid Metal / Mercury WebGL**  
Asosiy yo‘nalish: **Tavsiya akkaunt studiyasi**  
Sayt: https://parviz1999-yg.github.io/NEX/

## FM — 2026-11-21: TA andozasiga mos audit va qayta ishlash

- [x] FM mustaqil modul sifatida saqlandi; TA fayllariga o‘zgartirish kiritilmadi.
- [x] TA’dagi bosqichma-bosqich sahifa oqimi asosida 7 ichki bosqich: manba, ssenariy, bayon uslubi, vizual til, rang, animatsiya va Reels studiyasi.
- [x] Manba turlari cheklangan: Sayt, YouTube, Telegram va Kitob.
- [x] Manba metama’lumotlari, majburiy maydonlar va http/https havola tekshiruvi.
- [x] Besh sahna: HOOK, MANBA, SABAB, FOYDA va YAKUN; har birining matni va 2,5–12 soniya davomiyligi mustaqil tahrirlanadi.
- [x] 3D WebGL, RoomEnvironment/PMREM aks ettirishi, manba turiga mos geometriya va animatsiyalanuvchi metall to‘lqin.
- [x] Harakat profili, bayon energiyasi va sahna indeksiga bog‘langan kamera/obyekt o‘tishlari.
- [x] Yakuniy sahnada 3D NEX xrom logotipi va ko‘tariluvchi metall wipe/outro.
- [x] TA andozasidagi alohida 9:16 ekran yozish oynasi; 1080×1920 WebGL va Canvas matn qatlamlari, qo‘llab-quvvatlansa fullscreen, yashirin/ko‘rinadigan boshqaruvlar, pauza va studiyaga qaytish.
- [x] TA bilan bir xil to‘rt canvas arxitekturasi: 360×640 preview WebGL+Canvas hamda 1080×1920 yozuv WebGL+Canvas.
- [x] Preview matni DOM emas, Canvas qatlamida chiziladi; matn animatsiyasi 4 vizual til va 5 harakat profiliga mos.
- [x] TA’dagi segmentlangan xrom lenta geometriyasi, 5 sahna uchun alohida shakl almashishi va material/yoritish sozlamalari ko‘chirildi.
- [x] TA NEX logotipining chizilib ochiladigan 3D intro/outro animatsiyasi ko‘chirildi.
- [x] TA asosiy qobig‘iga mos header, asosiy kenglik, panel, preview va mobil joylashuv sozlandi.
- [x] FM `style.css` TA’ning himoyalangan umumiy stylesheet’ini import qiladi; modulga xos CSS alohida saqlanadi.
- [x] Preview sarlavhasi, REAL-TIME belgisi, timeline, sahna hisoblagichi va pastki loyiha boshqaruvlari TA tartibiga moslashtirildi.
- [x] Playback vaqtini saqlash: sahna tanlash, davomiylikni o‘zgartirish va yozuv rejimiga o‘tishda ijro holati davom ettiriladi.
- [x] Rolik yakunida to‘xtash, davom ettirish, vaqt hisoblagichi, sahna progressi, kreativ variant va yangi loyiha boshqaruvlari.
- [x] WebGL import xatolari, kontekst yo‘qolishi/tiklanishi va brauzer tabining yashirilishiga munosabat.
- [x] Statik tekshiruv: JavaScript parse, 64 HTML ID ichida takror yo‘q, JS murojaat qilgan ID’lar va label maqsadlari mavjud, tugmalarning handlerlari bor.
- [ ] Haqiqiy Android brauzerida 4 manba turi × 4 vizual til × 5 animatsiya × 5 sahna kombinatsiyalarini ko‘z bilan tekshirish.
- [ ] 1080×1920 ekran yozish rejimida real qurilma sinovi, FPS, qizish va xotira sarfini o‘lchash.
- [ ] WebGL kontekstini yo‘qotish/tiklash va CDN ishlamagan holatlarni real brauzerda tekshirish.

### FM tekshiruv chegarasi
Kod va DOM strukturasi statik tekshirildi. GitHub Pages sahifasini ushbu muhitdagi brauzer vositasi orqali ochib bo‘lmadi; haqiqiy Android qurilmada vizual va ekran yozish sinovi hali tasdiqlanmagan. Telefonning ichki ekran yozish funksiyasi talab qilinadi; FM o‘zidan MP4 eksport qilmaydi.

## Bajarildi — v0.4.2
- [x] NEX brendining asosiy vizual tili Liquid Metal / Mercury sifatida belgilandi.
- [x] Three.js RoomEnvironment va PMREM orqali 3D materiallar uchun atrof-muhit aks ettirishi qo‘shildi.
- [x] Yuqori darajadagi transmission, past roughness, iridescence va clearcoat bilan suyuq shisha-simob materiali yaratildi.
- [x] Organik deformatsiyalangan 3D tomchi, mayda simob tomchilari va neon metall orbitlar qo‘shildi.
- [x] Simob shakli va orbitlar vaqt bo‘yicha mustaqil animatsiya qilinadi.
- [x] NEX interfeys wordmarkiga kumush-neon gradient identifikatsiyasi qo‘shildi.
- [x] Cinematic 3D yo‘nalishi tavsifi NEX Liquid Metal estetikasi bilan yangilandi.
- [x] Audio tashqi ilovada qoladi; NEX audio yozish/yuklash/sinxronlashni bajarmaydi.

## Oldingi bosqichda bajarilgan — v0.4.0
- [x] Three.js WebGL render dvigateli va alohida preview/record canvases.
- [x] To‘rtta 3D art-direction kompozitsiyasi va besh sahnaga mos kamera harakati.
- [x] Matn uchun alohida shaffof Canvas overlay.
- [x] 3D hajm uchun blur/shadowBlur ishlatilmaydi.

## Hali bajarilmagan / sinov talab qiladi
- [ ] Android qurilmada WebGL, RoomEnvironment va transmission materialini tekshirish.
- [ ] Suyuq metall effektining ekran yozish rejimida to‘g‘ri aks etishini tekshirish.
- [ ] Besh sahnada matn va simob obyektlari o‘zaro to‘qnashmasligini tekshirish.
- [ ] To‘rtta art-direction va ketma-ket besh Reel bo‘yicha kompozitsiya xilma-xilligini sinash.
- [ ] Mobil GPU unumdorligi, qizish va batareya sarfini o‘lchash.

## Texnik qaydlar
- Three.js 0.180.0 va RoomEnvironment CDN orqali yuklanadi; internet zarur.
- 3D materiallar haqiqiy WebGL fizik materiallari; blur bilan hajm yasalmaydi.
- Ssenariy generatori hozircha shablonli, AI fakt-tekshiruvi yo‘q.
- Video eksport mavjud emas; ekran yozish telefon orqali bajariladi.
- Statik sintaksis tekshiruvi Android vizual sinovi o‘rnini bosmaydi.


## v0.4.2 — WebGL modul bog‘lanishini tuzatish
- HTML import map qo‘shildi: `three` bare-specifier manzili Three.js 0.180.0 build moduliga bog‘landi.
- `RoomEnvironment` modulining ichki `import 'three'` so‘rovi brauzerda yechilishi uchun import map ishlatiladi.
- WebGL xatosi endi foydalanuvchiga haqiqiy xato matnini ham ko‘rsatadi.
- Tekshiruv: statik kod tahlili; haqiqiy Android/WebGL ishga tushishi hali qurilmada tasdiqlanmagan.


## v0.4.3 — Tavsiya akkaunt sahnalari uchun mazmunga mos 3D kompozitsiyalar
- [x] Hook sahnasida simob yadrosi va energiya halqasi asosiy vizual markaz sifatida qoldirildi.
- [x] Profil sahnasiga profil ramzi, markaziy kristall va uchta orbit nuqtasi qo‘shildi.
- [x] Foyda sahnasiga bosqichma-bosqich ko‘tariluvchi kristall geometriyalar qo‘shildi.
- [x] Farq sahnasiga murakkab torus-knot, kesishuvchi neon halqa va kristall urg‘u qo‘shildi.
- [x] CTA sahnasiga uch qavatli portal halqalari va markaziy yadro qo‘shildi.
- [x] Simob tomchisi va uning orbitlari endi har bir sahnada takrorlanmaydi; Hook sahnasiga xos.
- [x] Har bir sahna motifi alohida animatsiyalanadi va o‘z boshlang‘ich joylashuviga nisbatan barqaror tebranadi.
- [x] Interfeys versiyasi v0.4.3 ga yangilandi.
- [ ] Android qurilmada barcha besh sahnaning vizual muvozanati va matn bilan to‘qnashmasligi tekshiriladi.
- [ ] GPU yuklamasi va ekran yozish ravonligi real qurilmada o‘lchanadi.

### Tekshiruv chegarasi
Kod GitHub main tarmog‘iga joylandi. Bu bosqichda kod o‘zgarishlari statik tekshiruvdan o‘tkaziladi; real Android qurilmada barcha besh kompozitsiyaning ko‘rinishi hali tasdiqlanmagan.


## v0.4.4 — Matn kontrasti va organik 3D morfing
- [x] Tavsiya akkaunt sahnalarida asosiy yozuvlar palitraning och foreground rangiga o‘tkazildi; aksent ranglar grafik urg‘ular uchun qoldirildi.
- [x] 3D metall materiallar palitraning aksent va ikkilamchi ranglaridan foydalanadi; matn bilan rang roli ajratildi.
- [x] 3D asosiy kompozitsiyasi kichraytirilib, matnning asosiy o‘qish hududidan o‘ng tomonga surildi.
- [x] 3D obyekt geometriyalariga vertex asosidagi organik morfing qo‘shildi: shakllar faqat aylanmaydi, sirtlari ham sekin o‘zgaradi.
- [x] Morfing amplitudasi animatsiya rejimiga moslashtirildi.
- [x] Rang tanlash sahifasida matn va 3D obyektlar uchun kontrast qoidasi tushuntirildi.
- [x] Interfeys versiyasi v0.4.4 ga yangilandi.
- [ ] Android qurilmada matn/3D kesishishi, kontrast va morfing ravonligi ko‘z bilan tekshiriladi.
- [ ] Uzoq davom etuvchi animatsiyada mobil GPU yuklamasi o‘lchanadi.

### Tekshiruv chegarasi
JavaScript sintaksisi tekshirildi. Qurilmadagi real ko‘rinish va unumdorlik sinovi hali bajarilmadi.


## v0.4.5 — Simob oqimi, metall aks va 3D kadrini tuzatish
- [x] Asosiy simob materiali shaffof/transmission ko‘rinishidan yuqori aks ettiruvchi xrom-metall materialga o‘tkazildi; metalness 1.0, past roughness va kuchli environment reflection ishlatiladi.
- [x] Organik deformatsiya endi faqat sahna motifida emas, asosiy 3D guruhidagi simob yadrosi va boshqa geometriyalarda ham ishlaydi.
- [x] Simob yadrosiga ko‘p yo‘nalishli vaqtga bog‘liq sirt oqimi va yonlama siljish qo‘shildi; deformatsiya kuchi oshirildi.
- [x] Simob yadrosi geometriyasi mobil qurilmada yangilanishi yengilroq bo‘lishi uchun optimallashtirildi.
- [x] 3D kompozitsiyaning oldingi o‘ngga haddan tashqari surilgan joylashuvi tuzatildi; obyektlar endi kadr ichida ko‘rinishi uchun kamera masofasi va kompozitsiya markazi qayta sozlandi.
- [x] 3D obyektning masshtabi, aylanishi va sirt oqimi jonliroq animatsiyaga moslashtirildi.
- [ ] Android qurilmada yangi xrom akslari, shakl oqimi, kadr ichidagi joylashuv va FPS ko‘z bilan tekshiriladi.

### Tekshiruv chegarasi
Kod o‘zgarishlari statik tekshiruvdan o‘tkaziladi. Real Android vizual sinovi va GPU unumdorligi hali tasdiqlanmagan.


## v0.5.0 — NEX Liquid Flow / jiddiy rang tizimi
- [x] 3D sahnalardan kub, shar, torus-halqa, kristall va torus-knot kompozitsiyalari olib tashlandi.
- [x] Uch o‘lchamli uzluksiz sirtli suyuq metall lentalar yaratildi; har bir sirt vertex darajasida to‘lqinlanadi, cho‘ziladi, torayadi va egiladi.
- [x] Oqim yo‘nalishi davriy ravishda oldinga-orqaga almashadi; bir necha qatlam turli tezlik va fazada harakatlanadi.
- [x] Uchta fizik metall material: xrom-kumush, tanlangan palitradagi bronza/aksent va quyuq metall.
- [x] Yorug‘lik tizimi sovuq ko‘k-yashil neonlardan neytral kumush va iliq bronza akslariga o‘tkazildi.
- [x] 10 ta rang palitrasi jiddiy rang oilalariga almashtirildi: grafit, bronza, bordo, mis, slate, to‘q olxo‘ri, qumtosh, qadimiy oltin, kumush va monoxrom.
- [x] Interfeysning asosiy ranglari, tanlangan holatlari, tugmalari va NEX wordmarki yangi vizual tilga moslashtirildi.
- [x] Versiya v0.5.0; GitHub Pages cache-buster yangilandi.
- [ ] Android telefonida 3D oqimning ko‘rinishi, silliqligi, matn bilan masofasi va ekran yozish rejimi sinovdan o‘tkaziladi.
- [ ] To‘rtta art-direction va besh sahnada ketma-ket Reel’lar xilma-xilligi real ko‘rish orqali baholanadi.

### v0.5.0 texnik tekshiruv
- 3D kompozitsiya parametrik WebGL sirtlariga tayanadi; primitive geometrik obyektlar asosiy vizual kompozitsiyadan chiqarildi.
- Har bir oqim sirtining geometriyasi har kadrda yangilanadi va normalari qayta hisoblanadi.
- Mobil GPU unumdorligi hali o‘lchanmagan; 3D sirtlar soni va segmentlari keyingi qurilma sinoviga qarab optimallashtiriladi.
- Hozirgi ish faqat Tavsiya akkaunt studiyasining 3D vizual tizimini yangilaydi; boshqa studiyalarni yakunlangan deb hisoblamaydi.


## v0.5.1 — Sahna ko‘rinishi va yorqin Electric Blue / Chrome
- [x] Takrorlangan eski `renderThree()` funksiyasi olib tashlandi. U yangi Liquid Flow rendererini bosib ketayotgan va eski geometriya maydonlariga murojaat qilayotgan edi.
- [x] Tavsiya akkaunt rejimida 2D Canvas overlay endi WebGL fonini yopmaydi; 3D sahna orqa qatlamda ko‘rinadi.
- [x] Noto‘g‘ri `Midnight` palette fallback olib tashlandi; standart palitra `Electric Blue` bilan moslashtirildi.
- [x] Yorqin elektr ko‘k, xrom-kumush va muzdek oq metall materiallar; kuchaytirilgan yoritish va exposure.
- [x] Suyuq lentalarning ko‘rinadigan kengligi va qatlamlararo ajralishi oshirildi.
- [x] 8 ta yorqin palitra va yangi ko‘k-kumush interfeys.
- [x] Versiya v0.5.1 va cache-buster yangilandi.
- [ ] Android telefonda sahnaning real ko‘rinishi, ranglar va animatsiya ravonligini foydalanuvchi tasdiqlashi kerak.

### v0.5.1 tekshiruv chegarasi
Statik JavaScript sintaksisi, takroriy renderer yo‘qligi, palitra kalitlari va HTML/CSS versiya mosligi tekshiriladi. Real Android vizual sinovi hali bajarilmagan.


## v0.5.2 — Tavsiya sahnasida jo‘mrak oqimi, to‘qnashuv va yuqori kontrast
- [x] Har bir suyuq metall qatlamiga mustaqil tezlik, faza va amplituda berildi; oqimlar endi bir xil ritmda yurmaydi.
- [x] Tavsiya akkauntning birinchi HOOK sahnasiga Three.js WebGL jo‘mragi, egri quvur, oqim trubasi, zarba yadrosi va kengayuvchi metall sachrash halqasi qo‘shildi.
- [x] Oqim zarba nuqtasiga yetgach 48 ta xrom tomchi va 24 ta metall konfetti bo‘lagi turli trayektoriyalarda sochiladi; harakat takrorlanuvchi siklda animatsiyalanadi.
- [x] HOOK sahnasida umumiy lentalar vaqtincha yashiriladi, jo‘mrak va sachrash kompozitsiyasi alohida ko‘rinadi.
- [x] Tavsiya sahnalarining matni chap xavfsiz hududga joylashtirildi; quyuq, aniq chegarali panel oq matnni 3D fonidan ajratadi.
- [x] Xrom materiallarining roughness kamaytirildi, environment reflection va ko‘k emissive aks kuchaytirildi.
- [x] Profil, foyda, farq va CTA matn panellari ham kontrastli qilindi.
- [x] Versiya v0.5.2 va script cache-buster yangilandi.
- [ ] Android qurilmada jo‘mrakdan oqish, zarba, sachrash, matn o‘qilishi va FPS ko‘z bilan tasdiqlanishi kerak.

### v0.5.2 tekshiruv chegarasi
Kodning sintaksisi va asosiy strukturaviy tekshiruvlar bajariladi. Haqiqiy brauzer/WebGL animatsiyasi va Android qurilmadagi vizual sifat hali tasdiqlanmagan.


## v0.5.3 — Monoxrom xrom-suyuqlik kompozitsiyasi
- [x] HOOK sahnasidagi jo‘mrak, quvur, oqim trubasi, zarba yadrosi va konfetti olib tashlandi.
- [x] Uch rangli oqim qatlamlari o‘rniga bitta keng, uzluksiz kumush-xrom tasmasi qoldirildi.
- [x] Suyuqlik tasmasiga egilish, kengayish-torayish va mustaqil sirt to‘lqini berildi; kompozitsiya markaziy obyektni o‘rab o‘tadigan abstrakt shaklga yo‘naltirildi.
- [x] 3D fon qora-grafit rangga o‘tkazildi; metall ranglari kumush va oq xrom bilan cheklab qo‘yildi.
- [x] Versiya v0.5.3 va cache-buster yangilandi.
- [ ] Android qurilmada suyuqlik tasmasining kompozitsiyasi, kontrasti va animatsiya ravonligi ko‘z bilan tekshirilishi kerak.

### v0.5.3 tekshiruv chegarasi
Koddagi eski jo‘mrak/sachrash obyektlari olib tashlanganligi va JavaScript sintaksisi statik tekshiruvdan o‘tkaziladi. Real WebGL kadr va Android qurilma sinovi hali tasdiqlanmagan.


## v0.5.3 — Monoxrom xrom-suyuqlik kompozitsiyasi
- [x] HOOK sahnasidagi jo‘mrak, quvur, oqim trubasi, zarba yadrosi va konfetti olib tashlandi.
- [x] Uch rangli oqim qatlamlari o‘rniga bitta keng, uzluksiz kumush-xrom tasmasi qoldirildi.
- [x] Suyuqlik tasmasiga egilish, kengayish-torayish va mustaqil sirt to‘lqini berildi.
- [x] 3D fon qora-grafit rangga o‘tkazildi; metall ranglari kumush va oq xrom bilan cheklab qo‘yildi.
- [x] Versiya v0.5.3 va cache-buster yangilandi.
- [ ] Android qurilmada suyuqlik tasmasining kompozitsiyasi, kontrasti va animatsiya ravonligi ko‘z bilan tekshirilishi kerak.

### v0.5.3 tekshiruv chegarasi
Kodning sintaksisi va eski jo‘mrak/sachrash obyektlari olib tashlanganligi statik tekshiruvdan o‘tkaziladi. Real WebGL va Android sinovi hali tasdiqlanmagan.


## v0.5.4 — Kreativ variant tugmasi va kesh yangilanishi
- [x] WebGL render siklida eski particleField murojaati olib tashlangan; kamera va render chaqiruvi mavjud.
- [x] Yangi kreativ variant tugmasi bosilganda fon seed'i yangilanadi, sahna indeksi qayta belgilanadi va WebGL obyektlari majburiy qayta quriladi.
- [x] Tugma xatolik yuz bersa konsolga yozadi va foydalanuvchiga xatolik matnini ko‘rsatadi.
- [x] HTML versiyasi va JavaScript cache-buster v0.5.4 ga ko‘tarildi; eski v0.5.3 JavaScript keshi ishlatilmasligi uchun.
- [ ] Android brauzerida real sinov foydalanuvchi tomonidan tasdiqlanishi kerak.


## v0.5.5 — Yangi kreativ variant tugmasini qayta ishlash
- [x] Tugma hodisasi alohida funksiya orqali to‘g‘ridan-to‘g‘ri `onclick` ga biriktirildi.
- [x] Har bosishda 6 xil kompozitsion joylashuv navbat bilan tanlanadi: tasma burchagi, vertikal masshtab va joylashuv o‘zgaradi.
- [x] Tugma bosilishi bilan darhol ko‘rinadigan holat matni va kontrastli vizual tasdiq beriladi.
- [x] 3D dvigatel hali yuklanmagan holatda ham tanlangan variant holati saqlanadi; dvigatel tayyor bo‘lgach joriy variant bilan obyektlar quriladi.
- [x] Qayta chizish xatosi tugma hodisasini jim to‘xtatib qo‘ymasligi uchun render chaqiruvi alohida himoyalandi.
- [x] HTML va JS cache-buster v0.5.5 ga yangilandi.
- [ ] Android brauzerida tugmaning haqiqiy bosilishi va olti variantning ko‘zga ko‘rinadigan farqi foydalanuvchi tomonidan tasdiqlanishi kerak.

### Tekshiruv chegarasi
Manba kodida tugma hodisasi, 6 holatli kompozitsiya almashishi, versiya va element ID mosligi tekshirildi. Haqiqiy brauzerda ishlashi va Android WebGL renderi hali tasdiqlanmagan.


## v0.5.6 — 3D NEX logo reveal va suyuqlik transitionlari
- [x] Three.js orqali xrom va elektr-ko‘k materiallardan haqiqiy 3D TubeGeometry harflari N, E, X yaratildi.
- [x] Harflar konturi vaqt bo‘yicha bosqichma-bosqich chiziladi; 2D Canvas NEX wordmarki WebGL logo mavjud bo‘lganda yashiriladi.
- [x] Intro va outro vaqtida 3D logo ko‘rinadi; har bir sahna boshida qisqa logo-reveal transition qo‘llanadi.
- [x] Mavjud suyuq metall tasma logo orqasida harakatlanib, identifikatsiyaning bir qismiga aylanadi.
- [x] Preview va ekran yozish rendererlarida bir xil 3D logo sahnasi ishlatiladi.
- [x] Versiya va JS cache-buster v0.5.6 ga yangilandi.
- [ ] Android qurilmada harflar chizilishi, transition davomiyligi, suyuqlik bilan qatlamlanishi va matn o‘qilishi ko‘z bilan tekshirilishi kerak.

### Tekshiruv chegarasi
Kod strukturasi va versiya mosligi tekshiriladi. Bu haqiqiy brauzer/WebGL yoki Android vizual sinovi o‘rnini bosmaydi.


## v0.6.0 — NEX 3D logo va sahnaga mos suyuqlik dramaturgiyasi
- [x] NEX logotipi qayta chizildi: N, E, X harflari alohida aniq 3D xrom/neon zarbalardan tuzildi; qalinligi, joylashuvi va 9:16 kadr ichidagi o‘lchami qayta sozlandi.
- [x] Logo faqat intro va outroda namoyon bo‘ladi; avvalgi har bir sahna boshida logoni qayta chiqarish bekor qilindi.
- [x] Bitta takroriy fon oqimi o‘rniga besh sahna uchun alohida 3D suyuqlik xoreografiyasi: S-egri intro oqimi, profil atrofida orbital o‘ralish, foyda sahnasida yoyilib ochilish, farq sahnasida markaziy to‘qnashuv, yakunda vertikal spiral tortilishi.
- [x] Harakat geometriyasi 9:16 kadr chegarasiga moslashtirildi; oldingi ortiqcha vertikal masshtab olib tashlandi.
- [x] Kamera harakati sahna vazifasiga mos farqlantirildi; suyuqlik animatsiyasi tanlangan kinetik/editorial/futuristik yo‘nalish bilan ham o‘zgaradi.
- [x] Intro/outroda NEX shiori alohida ko‘rsatiladi.
- [x] Versiya va JavaScript cache-buster v0.6.0 ga yangilandi.
- [ ] Android brauzerida NEX logotipining to‘liq sig‘ishi, harflar aniqligi, 5 xil 3D oqim harakati va matn bilan qatlamlanishi foydalanuvchi tomonidan tekshirilishi kerak.
- [ ] Past quvvatli telefonda FPS va qizish kuzatilishi kerak.

### Tekshiruv chegarasi
Bu yangilanish manba kodiga kiritildi. Hozircha haqiqiy Android brauzerida ko‘rish yoki WebGL kadrlarini qurilmada tasdiqlash bajarilmadi. Koddagi geometriya, sahna shartlari, cache-buster va versiya mosligi tekshirilishi kerak.


## v0.6.1 — 9:16 kadrda xrom oqimini ko‘rinadigan qilish
- [x] Oqim geometriyasining gorizontal koordinatalari portret kamera ko‘rish maydoniga moslashtirildi; keng 8.4 birlikli tasma endi kadr tashqarisiga chiqib ketmasligi kerak.
- [x] Xrom materiali haddan tashqari qorong‘i metall aksidan chiqarildi: yorug‘ kumush asos, yumshoqroq roughness, cheklangan emissive to‘ldirish.
- [x] Hemisphere, key, rim va fill yoritish kuchaytirildi; qora fon bilan qo‘shilib ketish xavfi kamaytirildi.
- [x] Versiya/cache-buster v0.6.1.
- [ ] Android kichik preview va katta screen-recording oynasida bir xil ko‘rinish foydalanuvchi tomonidan tekshirilishi kerak.


## v0.6.2 — Suyuq metall yorqinligi va NEX logotipini kadrga sig‘dirish
- [x] Xrom-suyuqlik materiali biroz yorqinlashtirildi: environment aks ettirishi va emissive to‘ldirish me’yorida oshirildi.
- [x] Kumush metallning asosiy yorug‘ligi kuchaytirildi; umumiy yoritish keskin oshirib yuborilmadi.
- [x] NEX 3D logotipi kichraytirildi, kamera tomoniga yaqinlashtirildi va vertikal markazga tushirildi; 9:16 preview hamda yozuv kadriga sig‘ishi uchun geometrik kengligi qayta moslandi.
- [x] JavaScript cache-buster v0.6.2 ga yangilandi.
- [ ] Android qurilmada logotipning barcha harflari to‘liq ko‘rinishi va suyuqlik yorqinligi foydalanuvchi tomonidan tasdiqlanishi kerak.

### Tekshiruv chegarasi
Manba kodidagi o‘lchamlar, material parametrlari va versiya/cache-buster tekshirildi. Real Android ekranida ko‘rish sinovi bajarilgani yo‘q.


## v0.6.3 — Neytral kumushrang suyuq metall
- [x] Asosiy suyuqlik materiali ko‘kimtir oqdan neytral kumushrang xromga o‘tkazildi.
- [x] Metallik xususiyat kuchaytirildi: metalness 0.94; roughness 0.17 bilan kumush sirtning yorqin va qoramtir akslari muvozanatlashtirildi.
- [x] Ko‘k emissive rang kamaytirildi; ko‘k neon akslar asosiy suyuqlik rangini bosib ketmaydi.
- [x] Three.js material va JavaScript cache-buster v0.6.3 ga yangilandi.
- [ ] Android preview va katta ekran yozish oynasida haqiqiy kumushrang ko‘rinish tekshirilishi kerak.

### Tekshiruv chegarasi
Material parametrlari, HTML cache-buster va versiya yozuvi manba kodida tekshirildi. Qurilmadagi real vizual sinov bajarilmadi.


## v0.7.0 — Tavsiya akkaunt studiyasining professional kompozitsiya yangilanishi
- [x] Tavsiya akkaunt rejimida to‘rtta vizual yo‘nalish endi haqiqatan alohida kompozitsiyaga ega: Cinematic 3D, Kinetic Typography, Editorial / Magazine va Futuristic Motion.
- [x] Kinetic Typography uchun yirik raqamli tipografika, dinamik urg‘u chiziqlari va alohida matn ierarxiyasi qo‘shildi.
- [x] Editorial / Magazine uchun och qog‘oz rangli jurnal maketi, serif sarlavha va nashriyot tipografikasi qo‘shildi.
- [x] Futuristic Motion uchun HUD panjara, texnik belgilashlar va ma’lumot paneli kompozitsiyasi qo‘shildi.
- [x] Cinematic 3D avvalgi qoramtir, kumush-suyuqlik bilan kontrastli kompozitsiya sifatida saqlandi.
- [x] Kreativ variantlar uchun hisoblangan masshtab endi asosiy WebGL suyuqlik geometriyasiga amalda qo‘llanadi.
- [x] NEX 3D logotipi vertikal kadrning yuqori xavfsiz hududiga ko‘chirildi va masshtabi qayta muvozanatlashtirildi.
- [x] Interfeys versiyasi va JavaScript cache-buster v0.7.0 ga yangilandi.
- [ ] Android qurilmada to‘rtta uslub, besh sahna, logo joylashuvi va matn o‘qilishi ko‘z bilan tekshiriladi.
- [ ] Mobil GPU yuklamasi va ekran yozish ravonligi real qurilmada sinovdan o‘tkaziladi.

### v0.7.0 tekshiruv chegarasi
Kod GitHub main tarmog‘iga joylandi. Koddagi strukturaviy o‘zgarishlar manba darajasida tekshirildi; real Android/WebGL vizual sinovi bajarilgan deb hisoblanmaydi.


## v0.7.1 — 3D suyuqlik harakati va mobil GPU resurslari
- [x] Kinetic Typography suyuq metall tasmasiga zichroq to‘lqin, tezroq burilish va keskinroq aks etish harakati berildi.
- [x] Editorial / Magazine suyuqlik harakati kengroq, sokinroq va yumshoqroq oqimga moslandi.
- [x] Futuristic Motion suyuq metall yuzasiga yuqori chastotali fazoviy puls va chuqurlik tebranishi qo‘shildi.
- [x] Barcha yo‘nalishlarda asosiy material neytral kumushrang xrom bo‘lib qoladi; rangli aksentlar faqat yorug‘lik va tipografik urg‘ularda ishlatiladi.
- [x] Sahna almashganda oldingi Three.js geometriya va materiallari GPU xotirasidan bo‘shatiladi; uzoq davom etadigan mobil sessiyalarda xotira yig‘ilib qolish xavfi kamaytirildi.
- [x] Ishlatilmayotgan qo‘shimcha material obyektlari olib tashlandi.
- [ ] Android qurilmada barcha art-directionlar, sahnalar va uzoq davom etadigan preview/record rejimi sinovdan o‘tkaziladi.

### v0.7.1 tekshiruv chegarasi
Manba kodiga o‘zgartirishlar kiritilib GitHub main tarmog‘iga joylandi. GPU resurslarini bo‘shatish va art-direction bo‘yicha geometriya modulyatsiyasi kod darajasida tekshirildi. Real qurilmadagi FPS, qizish va ko‘rinish hali tasdiqlanmagan.


## v0.8.0 — Suyuq metallni foreground sahna aktyoriga aylantirish
- [x] 3D xrom tasmasining portret kadrdagi eni kengaytirildi; u endi ingichka fon elementi emas.
- [x] Tasmaning chuqurligi kamera tomonga ko‘chirildi va sahna kompozitsiyasiga yaqinlashtirildi.
- [x] Besh sahnaga alohida 3D tilt, x/y/z harakati va masshtab yo‘li berildi.
- [x] Kamera harakati kuchaytirildi: sahnaga qarab yaqinlashish va yonlama parallax.
- [x] Sahna almashganda 3D geometriya qayta qurilmaydi; suyuqlik tekis lentadan yangi sahna shakliga animatsion ochiladi.
- [x] Yangi Reel varianti tanlangandagina geometriya qayta quriladi; oldingi GPU resurslarini bo‘shatish saqlanadi.
- [ ] Android qurilmada vizual sinov: metall tasma matnni to‘smasligi, oldingi planda aniq ko‘rinishi va sahnalar orasida silliq ochilishi.
- [ ] Ekran yozish rejimida FPS va qizish sinovi.


## v0.8.1 — Tavsiya akkaunt mazmuni va kumush rang identifikatsiyasi
- [x] Tavsiya akkaunt ssenariy generatoriga oltita turli hook va beshta CTA varianti qo‘shildi; boshlanish va yakun bir xil jumlalarga bog‘lanib qolmaydi.
- [x] Ssenariy foyda, auditoriya va dalil maydonlarini alohida ishlatadi; dalil kiritilmaganida tasdiqlanmagan ustunlik uydirilmaydi, tekshirish tavsiyasi beriladi.
- [x] Obunachi soni kiritilsa, u faqat profil ma’lumoti sifatida beriladi va sifat kafolati emasligi ochiq ko‘rsatiladi.
- [x] Diktor matni ekrandagi matndan tabiiyroq, kengaytirilgan izoh sifatida tuzildi.
- [x] Standart palitra Electric Blue’dan Arctic Silver’ga o‘tkazildi; elektr ko‘k asosiy rang emas, cheklangan aksent sifatida qoldirildi.
- [x] Ilova versiyasi va JavaScript cache-buster v0.8.1 ga yangilandi.
- [ ] Android qurilmada ssenariylar, kumush rang balansi, WebGL FPS va ekran yozish sinovi foydalanuvchi tomonidan tekshirilishi kerak.

### v0.8.1 tekshiruv chegarasi
Manba kodidagi generator mantiqi, palitra tanlovi, HTML/JS versiya mosligi va o‘zgartirilgan fayllarning qayta o‘qilishi tekshiriladi. Haqiqiy Android brauzerida ko‘rish va WebGL unumdorligi sinovi bajarilgan deb hisoblanmaydi.


## v0.8.2 — Vizual til va harakat tanlovlarini real boshqaruvga ulash
- [x] To‘rtta art-direction tavsifi aniq kompozitsion va tipografik xususiyatlar bilan yangilandi.
- [x] Besh animatsiya rejimi mustaqil parametrlar bilan ishlaydi: tezlik, suyuqlik deformatsiyasi, kamera amplitudasi, kirish easing'i va wipe ritmi.
- [x] Silliq, Dinamik, Kinematik, Ijodiy va Aralash rejimlari endi bir xil fallback harakatdan foydalanmaydi.
- [x] Mavzu turi har bir vizual tilda metadata/signature sifatida ko‘rsatiladi.
- [x] Bayon uslubi harakat profilining ritmiga ta’sir qiladi.
- [x] Ilova versiyasi va JavaScript cache-buster v0.8.2 ga yangilandi.
- [ ] Barcha 4 × 5 kombinatsiya Android qurilmada vizual tekshiruvdan o‘tkaziladi.
- [ ] Har bir mavzu turi va bayon uslubi bo‘yicha kompozitsiya farqlari alohida ko‘z bilan tekshiriladi.
- [ ] Mobil FPS, GPU yuklamasi va ekran yozish sinovi qayta bajariladi.

### v0.8.2 tekshiruv chegarasi
Manba kodiga boshqaruv parametrlari kiritildi. Bu commit real brauzer yoki Android qurilmasida bajarilgan vizual sinov deb hisoblanmaydi.


## v0.8.3 — Mavzu va bayon uslubining vizual identifikatsiyasi
- [x] Mavzu turiga qarab mustaqil grafik motivlar qo‘shildi: texnologik crosshair/scan, ta’limiy diagramma, kitob sahifasi, tarixiy arxiv muhri, motivatsion yo‘nalish belgisi va boshqa mavzularga mos abstrakt mark.
- [x] Bayon uslubi tipografik og‘irlik, shrift masshtabi va vizual ritm yorlig‘iga ta’sir qiladi.
- [x] Oldindan hisoblangan kamera siljishi endi 2D kompozitsiyaga ham qo‘llanadi.
- [x] HTML versiyasi va JavaScript cache-buster v0.8.3 ga yangilandi.
- [ ] Har bir mavzu turi va bayon uslubini barcha art-directionlar bilan real qurilmada ko‘rib chiqish.
- [ ] Grafik motivlar matn va profil kartasi bilan to‘qnashmasligini tekshirish.

### v0.8.3 tekshiruv chegarasi
Kod darajasida parametrlar va bog‘lanishlar tekshirildi. Haqiqiy Android vizual sinovi va FPS o‘lchovi bajarilmagan.


## v0.8.4 — Kamera transformi tartibini tuzatish
- [x] 2D kamera transformi kamera siljishi va masshtabi hisoblangandan keyin qo‘llanadi; vaqtinchalik qiymatga oldindan murojaat qilish xatosi bartaraf etildi.
- [x] Kamera siljishi, aylanishi va masshtabi bitta hisoblangan profil orqali ishlaydi.
- [x] HTML va JavaScript versiyasi/cache-buster v0.8.4 ga moslashtirildi.
- [ ] Brauzer va Android qurilmada to‘liq vizual sinov.

### v0.8.4 tekshiruv chegarasi
Koddagi e’lon qilish va foydalanish tartibi tekshirildi; runtime sinovi hali bajarilmadi.


## v0.8.5 — Vizual tozalash va sahna joylashuvini tuzatish
- [x] 2D matn/kompozitsiya qatlamidan keraksiz kamera zoom, rotate va drift olib tashlandi; yozuvlar endi 9:16 xavfsiz hududida barqaror turadi.
- [x] Takroriy mavzu nomi va bayon yorliqlari olib tashlandi; vizualda faqat bitta ixcham mavzu motivi qoldi.
- [x] Mavzu motivi to‘rtta art-direction uchun alohida joylashtirildi; Editorial sarlavha satri bilan to‘qnashmaydi, Futuristic grid ichida ikkilamchi HUD elementi sifatida turadi.
- [x] Mobil studiyada preview birinchi ko‘rinadigan blokka ko‘chirildi; boshqaruv paneli undan keyin joylashadi.
- [x] Preview maksimal eni 340 px, 9:16 nisbat va sahna boshqaruvlari bosishga qulay balandlikda sozlandi.
- [x] HTML/JS cache-buster v0.8.5 ga yangilandi.
- [ ] Besh sahnaning barcha to‘rtta vizual tilida Android ekranda ko‘z bilan tekshirish.
- [ ] Matnning real uzunligiga qarab ayrim kadrlar uchun yakuniy mikrotuzatish.

### v0.8.5 tekshiruv chegarasi
Koddagi joylashuv, qatlam va responsive CSS o‘zgarishlari tekshiriladi. Android qurilmada ko‘rish sinovi foydalanuvchi tomonidan bajarilishi kerak.


## v0.8.6 — Art-direction qatlamlari ustidagi mavzu belgisi
- [x] Mavzu motivi har bir vizual tilning fon/maket qatlamidan keyin chiziladi; Editorial qog‘oz paneli yoki Futuristic HUD uni yopib qo‘ymaydi.
- [x] Ishlatilmay qolgan mavzu metadata helperi va bayon tracking yorliqlari olib tashlandi.
- [x] Vizual qatlamlar tartibi soddalashtirildi; mavzu belgisi bitta ixcham detal sifatida saqlandi.
- [x] HTML versiyasi va JavaScript cache-buster v0.8.6 ga yangilandi.
- [ ] Android’da barcha sahna va uslublarning yakuniy ko‘rish sinovi.


## v0.8.7 — Intro yozuvi va vizual til to‘qnashuvini bartaraf etish
- [x] Intro/outro sarlavhasi faqat Cinematic 3D kompozitsiyasida ko‘rsatiladi; Kinetic Typography va Futuristic Motion sarlavha/pill elementlari bilan ustma-ust kelmaydi.
- [x] To‘rtta vizual tilning mustaqil tipografik ierarxiyasi saqlanadi.
- [ ] Yakuniy Android tasdiqlashi.


## v0.8.8 — Tavsiya kartalari yozuvi
- Tavsiya kartalaridagi barcha dinamik matnlar maxsus yozuvga o‘tkazildi: `sh → ş`, `ch → ç`, `o‘ → ö`, `g‘ → ğ`.
- Karta ichidagi yorliq/pill matnlari va alohida chiziladigan statik sarlavhalar ham shu qoidaga moslashtirildi.
- Almashtirish katta-kichik harfni saqlaydi; akkaunt nomi, tavsif, foyda, auditoriya va boshqa foydalanuvchi kiritgan matnlar ham kartada bir xil yozuvda ko‘rinadi.
- Versiya: `v0.8.8`. Strukturaviy tekshiruvlar bajariladi; qurilma ekranidagi yakuniy vizual tekshiruv foydalanuvchi tomonidan tasdiqlanishi kerak.


## v0.8.9 — Tavsiya kartalaridagi sun’iy sarlavhalar olib tashlandi
- Vizual kartalardan “Keyingi qadam”, “Nega aynan shu sahifa?”, “Kimlar uchun”, “Tavsiya sababi” kabi izoh/sarlavha yorliqlari olib tashlandi.
- Kinetic, Futuristic va Cinematic sahnalardagi inglizcha pill/yorliq matnlari ham olib tashlandi.
- Editorial sahnadagi dekorativ inglizcha sarlavhalar va ortiqcha brend shiori olib tashlandi.
- Auditoriya qiymati yorliqsiz ko‘rsatiladi; senariy matni esa o‘z joyida saqlanadi. Vizualda faqat senariy va akkauntning mazmunli ma’lumotlari qoladi.
- Versiya: `v0.8.9`. Kod tekshiruvi bajariladi; telefon ekranidagi yakuniy ko‘rik foydalanuvchi tomonidan tasdiqlanishi kerak.


## v0.9.0 — Muallif matni va sahna davomiyligini boshqarish
- Tavsiya akkaunt roliklarida NEX tomonidan avtomatik chizilgan sarlavha, brend yozuvi, akkaunt tavsifi, foyda/izoh matnlari va dekorativ matnlar olib tashlandi.
- Reels kadrida faqat muallif “Ekrandagi qisqa matn” maydoniga kiritgan yozuv ko‘rsatiladi; bo‘sh maydon bo‘lsa, avtomatik matn o‘rniga bo‘sh sahna qoladi.
- Studiya ichidagi diktor/tavsif matni maydoni olib tashlanib, uning o‘rniga har bir sahna uchun 2,5–12 soniyali davomiylik slayderi qo‘shildi.
- Har bir sahnaning davomiyligi mustaqil o‘zgartiriladi; umumiy rolik vaqti darhol qayta hisoblanadi. Dastlabki vaqt ssenariydagi ovoz matni uzunligidan taxminan hisoblanadi.
- Versiya/cache-buster: v0.9.0.
- [ ] Android qurilmada yozuvning ko‘rinishi, 5 sahna bo‘yicha vaqt sozlamasi va rolikning yakuniy davomiyligini ko‘z bilan tekshirish.

### v0.9.0 tekshiruv chegarasi
Manba kodidagi boshqaruvlar, avtomatik matnni olib tashlash va versiya mosligi statik tekshiruvdan o‘tkaziladi. Android/WebGL runtime sinovi bajarilgan deb hisoblanmaydi.


## v0.9.1 — NEX WebGL logo intro/outro va simobli yakun
- Tavsiya akkaunt roliklarida NEX TubeGeometry logotipi WebGL orqali introda animatsion ochiladi; outroda yana chizilib, yakuniy kadrda to‘liq qoladi.
- Tavsiya rejimida logotip 3D sahna markaziga joylashtirildi.
- Outrodagi so‘nggi 5,2 soniyada metallik simob oqimi kadrni pastdan yuqoriga yuvadi; oqim chekingach, orqa fonda faqat WebGL NEX logotipi qoladi.
- Simobli yakun paytida muallif matni qayta ko‘rinib qolmasligi uchun matn outro boshlanishidan oldin to‘xtatiladi.
- Versiya/cache-buster: v0.9.1.
- [ ] Android qurilmada logo intro, simob wipe va logo-only yakunini vizual tekshirish.


## v0.9.2 — Tavsiya akkaunt kartochkalari va metallik NEX identifikatsiyasi
- Ovoz yozuvi uchun beshta maydon va ularga bog‘liq hisoblash kodi olib tashlandi; sahna davomiyligi ekrandagi kartochka matni uzunligidan hisoblanadi.
- Tavsiya akkaunt rejimida umumiy ssenariy maydonlari yashiriladi; sayt kiritilgan profil ma’lumotlaridan beshta alohida kartochka mazmunini avtomatik tuzadi.
- Har bir sahna profil rasmi, akkaunt nomi, yo‘nalish, tavsif, foyda, auditoriya, dalil/obunachi va yakuniy chaqiriqni bitta yaxlit kartochka ichida ko‘rsatadi.
- NEX WebGL logotipining barcha chiziqlari bir xil neytral kumush xrom materialiga o‘tkazildi; outroda simob oqib ketgach metallik logo qoladi.
- Tavsiya rejimida qo‘lda kiritiladigan alohida ekran matni maydoni yashiriladi; kartochka matnini saytning avtomatik yig‘ishi asosiy oqim bo‘lib qoladi.
- Render qatlamlari tuzatildi: 3D suyuqlik fonida saqlanadi, introda avval logo ochiladi, kartochkalar keyin chiqadi, outroda esa kartochka yashirilib simob chekingach faqat metallik logo qoladi.
- Versiya/cache-buster: v0.9.2.
- [ ] Android qurilmada kartochka matni sig‘ishi, profil rasmi, 5 sahna almashinuvi va simobdan keyingi metallik logoni vizual tekshirish.

### v0.9.2 tekshiruv chegarasi
Manba kodida ovoz maydonlariga bog‘liqlikni yo‘qotish, kartochka ma’lumotlari va versiya mosligi tekshiriladi. Haqiqiy Android/WebGL vizual sinovi bajarilgan deb hisoblanmaydi.


## v0.9.3 — Tavsiya matnlarini muallif kiritgan qiymat bilan sinxronlash
- Tavsiya rejimida Hook, Sabab, Ustunlik va Chorlov maydonlari qayta ko‘rsatildi; akkaunt tanishtirish kartochkasi esa profil ma’lumotlaridan avtomatik tuziladi.
- Har bir matn o‘z sahnasiga bevosita bog‘landi: Hook → 1-karta, akkaunt profili → 2-karta, Sabab → 3-karta, Ustunlik → 4-karta, Chorlov → 5-karta.
- Akkaunt kartochkasini yangilash tugmasi muallif yozgan matnlarni endi tasodifiy yoki avtomatik matn bilan almashtirmaydi.
- Tavsiya ssenariysi uchun Hook, Sabab, Ustunlik va Chorlov kiritilishi tekshiriladi; vaqt hisobi tegishli kartochka matnlaridan olinadi.
- Versiya/cache-buster: v0.9.3.
- [ ] Android qurilmada besh kartochkaning har biridagi matn kiritilgan qiymatga aynan mosligini ko‘z bilan tekshirish.

 
## v0.9.4 — Rang, vizual uslub va animatsiya sozlamalarini real renderga ulash
- Tavsiya akkaunt kartochkasi tanlangan rang palitrasidan fon, aksent, matn va ikkilamchi ranglarni oladi; 3D sahna foni hamda xrom aks ettiruvchi rim/fill chiroqlari shu palitraga ulanadi.
- Tavsiya rejimida to‘rtta vizual yo‘nalish alohida kartochka kompozitsiyasi, tipografika, sirt va grafik qatlamlar bilan ishlaydi: Cinematic 3D, Kinetic Typography, Editorial / Magazine, Futuristic Motion.
- Hook, Sabab, Ustunlik va Chorlov kartalarida faqat tegishli muallif matni chiqariladi; akkaunt foydasi boshqa kartalarga avtomatik qo‘shilib ketmaydi.
- Boshqa kontent rejimlarida oldindan yozilgan art-direction renderer endi real render oqimidan chaqiriladi.
- Animatsiya profillari 2D va Tavsiya kartochkalariga ham ulanadi; Aralash rejimi besh sahnada turli tezlik, oqim, kamera va kirish profilini navbatlaydi.
- Versiya/cache-buster: v0.9.4.
- [ ] Android brauzerida 8 palitra × 4 vizual uslub × 5 animatsiya kombinatsiyalarini vizual tasdiqlash; bu statik kod tekshiruvining o‘rnini bosmaydi.

### v0.9.4 tekshiruv chegarasi
Manba kodidagi render chaqiruvlari, palitra ranglarining Canvas/WebGL qatlamlariga uzatilishi, foydalanuvchi matnlarining alohida sahnalarga bog‘lanishi va versiya/cache-buster mosligi tekshirildi. Haqiqiy Android qurilmasida vizual/WebGL sinovi hali bajarilmagan.


## v0.9.7 — Tavsiya akkaunt sozlamalarini yagona vizual tizimga ulash
- [x] Tavsiya akkaunt yo‘nalishlari faqat to‘rtta qiymat bilan saqlandi: Kreativ, Ilm-fan, Texnologiya, Yumor.
- [x] Yo‘nalish tanlovi Canvas motivlari, 3D xrom oqim geometriyasi, deformatsiya ritmi, kamera siljishi va sahna kompozitsiyasiga bevosita ta’sir qiladi.
- [x] Rolik g‘oyasi/asosiy fokus maydoni Tavsiya rejimida aniq nomlandi; uning matnidan deterministik vizual seed va mavzu fokus signali olinadi. Matn qo‘shimcha dekorativ sarlavha sifatida kadrga chiqarilmaydi.
- [x] Bayon uslubi endi faqat tezlik emas: shrift oilasi, qalinlik, matn masshtabi, qator oralig‘i va harakat energiyasini ham boshqaradi.
- [x] To‘rtta mustaqil vizual til va beshta animatsiya profili mavzu/bayon profillari bilan birgalikda ishlaydi.
- [x] O‘zgarishlar faqat Tavsiya akkaunt rejimiga cheklangan; boshqa studiyalarning avvalgi render yo‘li va harakati saqlangan.
- [x] Ilova versiyasi va CSS/JS cache-buster v0.9.7 ga yangilandi.
- [x] JavaScript sintaksisi tekshirildi.
- [ ] Android brauzerida 4 yo‘nalish × 4 vizual til × 8 bayon uslubi × 5 animatsiya kombinatsiyalarini ko‘z bilan tekshirish.
- [ ] Android qurilmada WebGL FPS, ekran yozish ravonligi va qizish sinovi.

### v0.9.7 tekshiruv chegarasi
JavaScript sintaksisi va manba kodidagi sozlama bog‘lanishlari tekshirildi. Haqiqiy Android/WebGL vizual sinovi bajarilgan deb hisoblanmaydi.
