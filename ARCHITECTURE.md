# NEX — Arxitektura va modul chegaralari

**Versiya:** 0.10.0  
**Holat:** mustaqil studiyalarga ajratishning birinchi arxitektura relizi.

## 1. Umumiy tuzilma

    NEX/
    ├── index.html                  # Faqat dashboard
    ├── assets/css/dashboard.css    # Dashboard dizayni
    ├── tavsiya-akkaunt/
    │   ├── index.html
    │   └── assets/
    │       ├── css/ta.css
    │       └── js/ta.js
    ├── foydali-manba/              # Himoyalangan FM moduli
    ├── qiziqarli-fakt/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── maxsus-iboralar/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    └── versions/
        ├── TA/{VERSION,CHANGELOG.md}
        ├── FM/{VERSION,CHANGELOG.md}
        ├── QF/{VERSION,CHANGELOG.md}
        └── MI/{VERSION,CHANGELOG.md}

## 2. Arxitektura qoidalari

1. Ildiz sahifa faqat modullar katalogi. Unda modulga xos forma, ssenariy generatori yoki render dvigateli bo‘lmaydi.
2. Har modul o‘z HTML, CSS va JavaScript fayllariga ega. Bir modulning DOM identifikatorlari, holati yoki CSS qoidalari boshqa modulga bog‘lanmaydi.
3. Umumiy NEX versiyasi ildizdagi VERSION/CHANGELOG.md da, har bir studiya versiyasi esa versions/{TA,FM,QF,MI}/VERSION va CHANGELOG.md fayllarida mustaqil yuritiladi.
4. Modullararo o‘tish URL navigatsiyasi orqali bajariladi.
5. TA va FM himoyalangan. Ularning ichki funksiyalari, dizayni va ish oqimiga alohida ruxsatsiz tegilmaydi.

## 3. TA chegarasi

- Asl assets/js/flow.js va assets/css/style.css o‘zgartirilmadi.
- TA ning mavjud oqimi alohida tavsiya-akkaunt/ manziliga ko‘chirildi.
- TA uchun alohida JS/CSS nusxalari yaratildi; CSS nusxasi asl stylesheet bilan bir xil.
- Faqat tashqi navigatsiya moslashtirildi: modul ochilganda TA rejimi tanlanadi; “Orqaga” va “Yangi loyiha” dashboardga qaytaradi.
- TA ning forma maydonlari, besh sahnali oqimi, akkaunt ma’lumotlari, ssenariy yaratish, WebGL/Canvas render kodi va dizayn qoidalari saqlangan.

## 4. FM chegarasi

- Mavjud foydali-manba/ moduli joyida qoldi.
- 0.10.0 relizida FM fayllariga o‘zgartirish kiritilmadi.
- FM CSS/JS bog‘liqliklarini keyinchalik o‘zgartirishdan oldin alohida ruxsat va regressiya tekshiruvi talab qilinadi.

## 5. QF ma’lumot modeli

Foydalanuvchi interfeysidagi fakt tasniflari:
- Ilmiy fakt
- Postulat (isbotsiz qabul qilinadigan)
- 100 foiz ishonchli
- Tekshiruvda

Fan sohasi tasnifdan mustaqil tanlanadi. Masalan, Fizika — fan sohasi, fakt turi emas.

Manba va dalil maydonlari alohida:
- manba nomi va ixtiyoriy havola;
- dalil/izoh;
- tekshiruv qaydi.

Ssenariy bosqichlari:
1. HOOK
2. FAKT E’LONI
3. MAZMUNI
4. HOLATI
5. FIKR SO‘RASH yoki CHORLOV

Epistemik talablar:
- Postulat boshlang‘ich qabul qilingan asos sifatida taqdim etiladi; uni eksperimental isbotlangan fakt deb ko‘rsatmaslik kerak.
- “Tekshiruvda” ma’lumoti tasdiqlangan xulosa sifatida bayon qilinmaydi.
- “100 foiz ishonchli” belgisi mutlaq haqiqat kafolati emas; dalil va manbalar ochiq ko‘rsatilishi kerak.
- Ilmiy fakt va ishonchlilik darajasi mazmunan ustma-ust kelishi mumkin. Keyingi ma’lumotlar bazasida tasnif turi va verifikatsiya holatini alohida maydonlarga ajratish ma’qul.

3D vizualizatsiya ssenariy matnidan mustaqil qatlam. 0.10.0 da uning UI chegarasi va konseptual preview ajratildi; Three.js sahna dvigateli, fan sohasi bo‘yicha obyektlar, kamera, yoritish va animatsiya hali alohida ishlab chiqilishi kerak.

## 6. MI ma’lumot modeli

MI mustaqil sahifada quyidagilarni yig‘adi:
- ibora xarakteri;
- iboraning o‘zi;
- muallif yoki manba;
- mazmun va talqin;
- qo‘llanish konteksti;
- Hook va yakuniy fikr.

0.10.0 matnni yig‘ish va tipografik konsepsiya preview’ini beradi. To‘liq Reels sahna generatori va animatsiya boshqaruvlari keyingi bosqichda ishlab chiqiladi.

## 7. Reliz tekshiruv ro‘yxati

- [x] Root dashboard to‘rtta mustaqil modulga havola beradi.
- [x] TA alohida manzilga ajratildi; ichki oqim nusxasi saqlandi.
- [x] FM fayllari o‘zgartirilmadi.
- [x] QF tasniflari, fan sohasi va besh ssenariy bosqichi kiritildi.
- [x] QF 3D qatlamining ssenariydan mustaqil interfeys chegarasi belgilandi.
- [x] MI alohida modul sifatida yaratildi.
- [x] Umumiy NEX va to‘rtta studiya uchun mustaqil versiya metama’lumotlari yaratildi.
- [ ] Android qurilmada to‘liq real brauzer sinovi.
- [ ] QF uchun haqiqiy Three.js renderer va mazmunga mos 3D sahnalar.
- [ ] MI uchun to‘liq animatsion Reels generatori.
- [ ] Har bir modulda 9:16 ekran yozish/eksport jarayonini alohida tekshirish.

## 8. Ikki darajali versiyalash

- Umumiy platforma: ildizdagi VERSION va CHANGELOG.md.
- Studiyalar: versions/TA/, versions/FM/, versions/QF/, versions/MI/ ichidagi mustaqil VERSION va CHANGELOG.md.
- Mustaqil studiya o‘zgarishi faqat o‘sha studiya versiyasini oshiradi. Dashboard yoki platforma arxitekturasi o‘zgarsa umumiy NEX versiyasi ham oshiriladi.
- Har bir daraja SemVer qoidalaridan foydalanadi.
- Boshlang‘ich versiyalar amaldagi sahifa holatiga mos qayd qilindi: TA 0.10.0, FM 0.9.7, QF 0.10.0, MI 0.10.0.
- TA va FM ichki fayllari himoyalangan. Versiya tarixlari ularning papkalaridan tashqaridagi versions/ katalogida yuritiladi; sahifadagi mavjud versiya yozuvlari hozircha o‘zgartirilmaydi.
- Hozirgi commit hujjat/metama’lumot o‘zgarishi: umumiy NEX versiyasi 0.10.0 bo‘lib qoladi.
