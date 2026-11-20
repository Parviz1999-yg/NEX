# NEX — ishlar holati

Amaldagi versiya: **v0.5.0**  
Brend yo‘nalishi: **Liquid Metal / Mercury WebGL**  
Asosiy yo‘nalish: **Tavsiya akkaunt studiyasi**  
Sayt: https://parviz1999-yg.github.io/NEX/

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
