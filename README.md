# NEX — Shaxsiy Instagram Reels Studio

**Loyiha holati:** faol ishlab chiqilmoqda  
**Asosiy platforma:** GitHub Pages  
**Maqsad:** Instagram Reels uchun turli kontent yo‘nalishlariga mos, mustaqil ishlaydigan studiyalar yaratish.

## Loyiha modullari

NEX to‘rtta asosiy moduldan tashkil topadi. Har bir modul o‘z interfeysi, ish jarayoni va JavaScript/CSS javobgarlik chegarasiga ega bo‘ladi.

| Qisqartma | Modul nomi | Holati |
|---|---|---|
| **TA** | Tavsiya akkaunt | **TAYYOR — MUHOFAZALANGAN** |
| **FM** | Foydali manba | Faol ishlab chiqish yo‘nalishi |
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

## 4. FM — Foydali manba: joriy ish

Hozirgi asosiy ishlab chiqish yo‘nalishi — FM. Manba turlari:

- Sayt
- YouTube
- Telegram
- Kitob

FM o‘z sahifasi, uslublari va JavaScript kodi bilan mustaqil modul sifatida rivojlantiriladi. Unda TA ning axborot yig‘ish, ma’lumotni qayta ishlash va interfeys tamoyillari qo‘llanadi, lekin TA fayllari o‘zgartirilmaydi.

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
