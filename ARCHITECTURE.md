# NEX — Arxitektura va modul chegaralari

**Versiya:** 0.10.0
**QF moduli:** 0.14.0  
**Holat:** mustaqil studiyalarga ajratishning birinchi arxitektura relizi.

## 1. Umumiy tuzilma

    NEX/
    ├── index.html
    ├── assets/css/dashboard.css
    ├── tavsiya-akkaunt/
    ├── foydali-manba/
    ├── qiziqarli-fakt/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── maxsus-iboralar/
    └── versions/
        ├── TA/{VERSION,CHANGELOG.md}
        ├── FM/{VERSION,CHANGELOG.md}
        ├── QF/{VERSION,CHANGELOG.md}
        └── MI/{VERSION,CHANGELOG.md}

## 2. Arxitektura qoidalari

1. Ildiz sahifa faqat modullar katalogi.
2. Har modul o‘z HTML, CSS va JavaScript fayllariga ega.
3. Umumiy NEX versiyasi ildizda, studiya versiyalari versions/ ichida mustaqil yuritiladi.
4. Modullararo o‘tish URL navigatsiyasi orqali bajariladi.
5. TA va FM himoyalangan. Ularning ichki funksiyalari, dizayni va ish oqimiga alohida ruxsatsiz tegilmaydi.

## 3. TA chegarasi

- TA alohida tavsiya-akkaunt/ manzilida ishlaydi.
- TA ning ichki formasi, besh sahnali oqimi, ssenariy yaratish va render kodi alohida nusxada saqlanadi.
- TA fayllariga QF ishlari davomida o‘zgartirish kiritilmaydi.

## 4. FM chegarasi

- Mavjud foydali-manba/ moduli joyida qoldirilgan va himoyalangan.
- FM fayllariga QF ishlari davomida o‘zgartirish kiritilmaydi.

## 5. QF — Qiziqarli fakt

### Ma’lumot modeli
Fakt tasnifi:
- Ilmiy fakt
- Postulat (isbotsiz qabul qilinadigan)
- 100 foiz ishonchli
- Tekshiruvda

Fan sohasi tasnifdan mustaqil. Manba nomi, dalil/izoh va tekshiruv qaydi alohida maydonlarda saqlanadi. Manba URL/HTTPS maydoni va havola validatsiyasi mavjud emas.

### Reels ishlab chiqarish arxitekturasi — FM modelining QF’ga moslashtirilgan nusxasi
- QF yetti bosqichli sahifalararo oqimdan foydalanadi: 1) fakt ma’lumotlari, 2) besh qismli ssenariy, 3) bayon uslubi, 4) vizual til, 5) rang palitrasi, 6) animatsiya, 7) NEX Reels Studio.
- Har bir bosqich alohida sahifa; foydalanuvchi oldingi/keyingi tugmalari bilan o‘tadi.
- Reels Studio’da chap boshqaruv paneli, o‘ng tomonda 9:16 jonli preview, pastda vaqt chizig‘i va besh sahna tanlagichi mavjud.
- Ssenariy matnlari HOOK → FAKT E’LONI → MAZMUN → HOLAT → YAKUN tartibida alohida sahnalarda ketma-ket ko‘rsatiladi. Matn satrlari sahna davomida bosqichma-bosqich animatsiya bilan paydo bo‘ladi.
- Har bir sahna davomiyligi alohida sozlanadi; rolikni ko‘rish, pauza/davom ettirish va boshidan qayta boshlash mumkin.
- Ekran yozish rejimi 1080×1920 WebGL va matn qatlamlarini ko‘rsatadi; foydalanuvchi telefonning o‘z ekran yozish funksiyasi bilan yozib oladi. Bu browser ichidagi MP4 eksport emas.
- Fakt fan sohasi va matn kalit so‘zlariga mos 3D obyektlar saqlanadi.
- HTTPS/manba URL maydoni va URL validatsiyasi mavjud emas; manba nomi, dalil va tekshiruv qaydi saqlanadi.
- Ovoz va musiqa tashqi ilovalarda qo‘shiladi; audio montaj va yakuniy birlashtirish ham tashqi ilovada bajariladi.

### Ssenariy
1. HOOK
2. FAKT E’LONI
3. MAZMUNI
4. HOLATI
5. FIKR SO‘RASH yoki CHORLOV

### 3D vizualizatsiya
- QF 0.11.0 da Three.js 0.180.0 dinamik CDN importi asosida haqiqiy WebGL renderer qo‘shildi.
- QF 0.12.0 da fakt sarlavhasi, e’lon, mazmun va dalildagi kalit iboralarga tayangan deterministik sahna profillari qo‘shildi. Masalan, qora tuynuk, Oy, Quyosh, DNK, H₂O, magnit, Misr piramidasi va aylana uchun maxsus kompozitsiyalar mavjud.
- Kamera ko‘rinishi, animatsiya tezligi, pauza/davom ettirish va besh ssenariy bosqichiga bog‘langan kamera urg‘usi boshqariladi.
- QF 0.14.0 da FM uslubidagi 9:16 jonli preview, besh sahnali Reels timeline, sahna matnini tahrirlash va har bir sahna davomiyligini alohida sozlash qo‘shildi.
- Har bir sahnadagi matn satrlari animatsiya bilan birma-bir paydo bo‘ladi; sahnalar HOOK’dan YAKUN’gacha avtomatik ketma-ket almashadi.
- 1080×1920 yozuv overlay’i telefon ekran yozuvi bilan olinadi. Bu ichki MP4 eksport emas; audio va yakuniy audio-video montaj tashqi ilovada bajariladi.
- Ushbu kalit so‘z qoidalari AI semantik tahlili emas; noma’lum yoki aniqlanmagan faktlar fan sohasi bo‘yicha bazaviy sahnadan foydalanadi.
- Ovoz yozish, musiqa yaratish/tanlash, audio montaj va yakuniy audio-video birlashtirish QF ichida bajarilmaydi; ovoz, musiqa va yakuniy montaj tashqi ilovalarda tayyorlanadi. Vizual rolik 1080×1920 ekran yozish oynasi orqali yozib olinadi.
- Mobil/desktop jonli WebGL sinovi hali real qurilmalarda tasdiqlanishi kerak.
- Fan sohasi bo‘yicha boshlang‘ich sahna kompozitsiyalari: Fizika, Biologiya, Tarix, Matematika, Astronomiya, Kimyo, Geografiya, Texnologiya va Psixologiya.
- Renderer canvas o‘lchamini konteynerga moslaydi va sahnani avtomatik aylantiradi.
- Kalit so‘zga asoslangan ayrim fakt profillari mavjud, lekin bu umumiy semantik tahlil yoki erkin faktlar uchun avtomatik 3D model generatsiyasi emas.
- Mobil qurilmalarda WebGL, CDN mavjudligi va sahna ishlashi real brauzerda tekshirilishi shart.

### Audio chegarasi
- Ovoz yozish, musiqa yaratish/tanlash, audio montaj va yakuniy Reels eksporti QF doirasiga kiritilmaydi; bular tashqi ilovalarda bajariladi.

### Epistemik talablar
- Postulat empirik isbotlangan fakt sifatida ko‘rsatilmaydi.
- “Tekshiruvda” ma’lumoti tasdiqlangan xulosa sifatida bayon qilinmaydi.
- “100 foiz ishonchli” mutlaq haqiqat kafolati emas; manba va dalil ko‘rsatilishi kerak.
- Kelajakdagi ma’lumotlar modelida fakt turi va verifikatsiya holati alohida maydonlar bo‘lishi ma’qul.

## 6. MI — Maxsus iboralar

MI mustaqil sahifada ibora xarakteri, iboraning o‘zi, muallif/manba, mazmun, kontekst, Hook va yakuniy fikrni yig‘adi. To‘liq Reels sahna generatori va animatsiya boshqaruvlari hali ishlab chiqilmagan.

## 7. Versiyalash

- Umumiy NEX va har bir studiya versiyasi alohida yuritiladi.
- Mustaqil studiya o‘zgarishi faqat o‘sha studiya versiyasini oshiradi.
- SemVer: PATCH — tuzatish; MINOR — mos yangi funksiya; MAJOR — mos kelmaydigan arxitektura o‘zgarishi.
- TA va FM himoyalangan; ular bo‘yicha har qanday o‘zgarish uchun alohida ruxsat kerak.
