# NEX — Shaxsiy Instagram Reels Studio

**Loyiha holati:** faol ishlab chiqilmoqda  
**Asosiy platforma:** GitHub Pages  
**Maqsad:** Instagram Reels uchun turli kontent yo‘nalishlariga mos, mustaqil ishlaydigan studiyalar yaratish.

## Loyiha modullari

NEX bir nechta mustaqil kontent modulidan tashkil topadi. Har bir modulning o‘z interfeysi, ish jarayoni va JavaScript/CSS javobgarlik chegarasi bo‘lishi kerak.

| Modul | Holati | Izoh |
|---|---|---|
| **Tavsiya akkaunt** | **TAYYOR — MUHOFAZALANGAN** | Tasdiqlangan va o‘zgartirilmasligi kerak bo‘lgan modul. |
| **Foydali manba** | Ishlab chiqish navbatida | Hozirgi asosiy ish yo‘nalishi. |
| Qiziqarli fakt | Keyingi modul | Mustaqil ishlab chiqiladi. |
| Kun iborasi | Keyingi modul | Mustaqil ishlab chiqiladi. |

## 1. Tavsiya akkaunt — tayyor modul

Tavsiya akkaunt moduli hozirgi tasdiqlangan holatida **tayyor deb hisoblanadi**.

Uning dizayni, animatsiyalari, funksiyalari, shablonlari, matn tuzilishi va ishlash mexanizmi foydalanuvchining alohida, aniq ruxsatisiz o‘zgartirilmasligi shart.

### O‘zgartirish siyosati

- Tavsiya akkauntga tegishli fayllar ruxsatsiz tahrirlanmaydi.
- Uning dizayni yoki kodini qayta yozish, optimallashtirish, ko‘chirish yoki almashtirish ham o‘zgartirish hisoblanadi.
- Xatoni tuzatish zarur bo‘lsa ham, avval muammo ko‘rsatiladi va ruxsat olinadi.
- Boshqa modullar ustida ishlash Tavsiya akkaunt modulining mavjud holatiga ta’sir qilmasligi kerak.
- Har qanday ruxsat faqat unda aniq ko‘rsatilgan modul va ish hajmiga tegishli.

## 2. Shablonlardan qayta foydalanish va modullar izolyatsiyasi

Boshqa NEX modullari Tavsiya akkauntda mavjud shablonlar, vizual yechimlar yoki dizayn tamoyillaridan foydalanishi mumkin. Biroq bu Tavsiya akkaunt modulining o‘zini o‘zgartirishga ruxsat bermaydi.

Majburiy arxitektura qoidalari:

1. Tavsiya akkaunt — tasdiqlangan etalon modul; uning amaldagi kodi o‘zgarmas holatda saqlanadi.
2. Boshqa modullar kerakli shablonlardan mustaqil nusxa, alohida komponent yoki aniq belgilangan interfeys orqali foydalanadi.
3. Boshqa modulning CSS selektorlari, JavaScript holati, hodisa tinglovchilari va DOM elementlari Tavsiya akkauntga sizib o‘tmasligi kerak.
4. Umumiy kod kiritish zarur bo‘lsa, avval uning ta’sir doirasi tahlil qilinadi. Tavsiya akkauntga ta’sir qilishi mumkin bo‘lgan o‘zgarish ruxsatsiz amalga oshirilmaydi.
5. Har bir modul alohida tekshiriladi; boshqa moduldagi o‘zgarish Tavsiya akkauntning avvalgi ishlashini buzmasligi shart.

## 3. Hozirgi asosiy vazifa — Foydali manba

Keyingi ishlab chiqish ishlari Foydali manba moduliga qaratiladi.

Manba turlari:

- Sayt
- YouTube
- Telegram
- Kitob

Foydali manba alohida modul sifatida ishlab chiqilishi, uning sahifasi, uslublari va JavaScript kodi boshqa modullardan ajratilishi kerak.

**Muhim:** Foydali manbani ishlab chiqish jarayonida Tavsiya akkaunt fayllari o‘zgartirilmaydi. Foydali manba uchun zarur bo‘lgan yangi funksiyalar uning o‘z modulida yaratiladi.

## 4. Texnik tuzilma

Asosiy loyiha fayllari:

- `index.html` — asosiy sahifa va navigatsiya.
- `assets/css/style.css` — asosiy sahifa uslublari.
- `assets/js/flow.js` — asosiy Reels yaratish jarayoni.
- `foydali-manba/` — Foydali manba modulining HTML, CSS va JavaScript fayllari.
- `.github/workflows/pages.yml` — GitHub Pages joylashtirish jarayoni.

Modullar uchun yangi fayl yoki umumiy komponent qo‘shishdan oldin uning boshqa modullarga ta’siri tekshiriladi.

## 5. Ishlab chiqish tartibi

- Avval mavjud kod o‘qiladi va tahlil qilinadi.
- O‘zgarishdan oldin qaysi fayllarga tegilishi va nima uchun kerakligi tushuntiriladi.
- Foydalanuvchining ruxsatisiz kod yoki dizayn o‘zgartirilmaydi.
- Ruxsat berilgan ish faqat kelishilgan modul va fayllar doirasida bajariladi.
- Har bir bosqichdan so‘ng o‘zgarishlar va tekshiruv natijalari hisobot qilinadi.
- Tayyor deb tasdiqlangan modul keyingi ishlar davomida muhofaza qilinadi.

## 6. Ishga tushirish

Loyiha GitHub Pages orqali joylashtiriladi. Asosiy sahifa:

https://parviz1999-yg.github.io/NEX/

3D/WebGL sahnalarida tashqi Three.js CDN kutubxonasi ishlatilishi mumkin; shu sababli tegishli funksiyalar uchun internet aloqasi talab qilinadi.

## 7. Eslatma

NEX shaxsiy Instagram Reels tayyorlash studiyasi hisoblanadi. Modullar mustaqilligi va foydalanuvchi ruxsati bilan o‘zgartirish tamoyili loyiha davomida saqlanishi shart.
