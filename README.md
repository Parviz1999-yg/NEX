# NEX — Creative Media Studio

NEX — Instagram sahifasi uchun professional kontent ishlab chiqish va vertikal Reels videolarini tayyorlash studiyasi.

## Kontent strategiyasi

NEX quyidagi to‘rtta yo‘nalishga xizmat qiladi:

1. **Tavsiya akkaunt** — foydali yoki qiziqarli Instagram sahifalarini tanishtirish, o‘ziga xos jihatlari va kimlar uchun foydali ekanini tahlil qilish.
2. **Foydali manbalar** — YouTube va Telegram kanallari, kitoblar, saytlar, ilovalar va boshqa resurslarni amaliy qiymati bilan ko‘rsatish.
3. **Qiziqarli faktlar** — fan, texnologiya, tarix, tabiat va kundalik hayotga oid tekshiriladigan faktlarni vizual izohlash.
4. **Maxsus iboralar** — mazmunli fikrlar va iboralarni tipografika, pauza va mualliflik talqini orqali yetkazish.

Sahifaning pozitsiyasi: **raqamli dunyo, texnologiyalar, kreativ loyihalar va foydali kashfiyotlar**.

## Hozirgi imkoniyatlar

- **Inspiration Lab:** yoqqan Instagram akkaunti havolasini va undagi vizual xususiyatlarni qayd etish.
- Tanlangan ijodiy yo‘nalish (Editorial, Cinematic, Tech minimal, Experimental) bo‘yicha brif shakllantirish.
- Uslubdan ilhomlanish va original kontent yaratish uchun aniq ko‘rsatmalar.
- Tanlangan yo‘nalishga mos preview dizayni va rangini qo‘llash.

- To‘rtta kontent yo‘nalishidan birini tanlash.
- Mavzu kiritib, besh qismli Reels ssenariysi shablonini yaratish: Hook, Context, Insight, Value, CTA.
- Har bir sahna matni va teglarini mustaqil tahrirlash.
- Instagram nomi, profil tavsifi, muallif va profil rasmini sozlash.
- Neon, Glass, Retro, Ink, Comix va Glitch dizayn variantlari.
- Aurora, Stars, Grid, Bubbles, Rain va Fire fonlari.
- Rang palitrasi, seed asosida tasodifiy dizayn, animatsiya turi va intensivligi.
- 9:16 formatdagi jonli preview va besh sahnali ketma-ket ko‘rish.
- Canvas orqali 1080×1920 video eksport qilish.

## Muhim cheklov

Inspiration Lab Instagram sahifalarini avtomatik ochmaydi yoki skan qilmaydi. Havola faqat ilhom manbasini qayd etish uchun; uslub xususiyatlari foydalanuvchi tomonidan yoziladi. Bu bosqichda AI tahlili va tashqi akkaunt ma’lumotlarini yig‘ish mavjud emas.



Kontent ssenariysi hozircha oldindan yozilgan shablonlar asosida tuziladi; u AI tomonidan faktlarni tekshirib yoki mustaqil tadqiqot qilib bermaydi. Faktlar, raqamlar, havolalar va da’volar nashrdan oldin muallif tomonidan tekshirilishi kerak.

## Video eksporti

Eksport brauzerning MediaRecorder kodek imkoniyatlarini tekshiradi. MP4 kodeki mavjud bo‘lsa MP4, aks holda WebM yaratiladi. WebM fayli MP4 deb qayta nomlanmaydi. Natijaviy format brauzer va qurilmaga bog‘liq.

## Ishga tushirish

`index.html` faylini zamonaviy brauzerda oching yoki statik serverdan foydalaning.

## GitHub Pages

Repository Settings → Pages → Build and deployment → Source: GitHub Actions.

## NEX v1.1.0 — 2026-11-19

### Yangilanishlar
- Hook → Context → Insight → Value → CTA ketma-ketligi asosidagi 5 sahnali Reels ssenariysi saqlandi va kuchaytirildi.
- Matnlar sahnaga kirganda yumshoq paydo bo‘ladi; Aurora/Neon kayfiyatidagi fon harakati va boshqariladigan Glitch effekti qo‘shildi.
- 9:16 Recording Mode qo‘shildi: ortiqcha interfeys yashiriladi, sahnalarni boshlash/pauza qilish va rejimdan chiqish mumkin.
- Video eksporti MP4/WebM kodeklarini tekshiradi, hosil bo‘lgan faylga ko‘rinadigan yuklab olish havolasini beradi.
- Avtomatik eksport qo‘llanmasa, Recording Mode orqali telefonning ichki ekran yozuvchisidan foydalanish mumkin.

### Tekshiruv holati
- Manba kodidagi HTML/JavaScript bog‘lanishlari va eksport oqimi yangilandi.
- GitHub Actions deploy natijasi keyingi tekshiruvda alohida tasdiqlanishi kerak.
- Android qurilmasida real ekran yozuvi va MP4/WebM yuklab olish sinovi ushbu commit doirasida bajarilmagan.


## NEX v1.2.0 — 2026-11-19

### Yangilanishlar
- Kontent konstruktori to‘rtta aniq studiyaga ajratildi: Tavsiya akkaunt, Foydali manbalar, Qiziqarli faktlar va Maxsus iboralar.
- Har bir studiya uchun alohida besh sahnali ssenariy oqimi, matn ohangi va teglar belgilandi.
- Studiya tanlanganda unga mos boshlang‘ich dizayn, fon, animatsiya va urg‘u rangi qo‘llanadi; foydalanuvchi ularni keyin o‘zgartirishi mumkin.
- Eski to‘rtta umumiy kontent turi yangi to‘rt studiya bilan almashtirildi.
- Faktlar, resurslar va tavsiyalar avtomatik tekshirilmaydi: nashrdan oldin manbalarni muallif tekshirishi kerak.

### Tekshiruv holati
- Kod o‘zgarishlari GitHub main branchiga yozildi.
- Brauzerda, Android qurilmasida va video eksportida amaliy sinov hali bajarilmadi.
- GitHub Pages deploy holati commitdan keyin alohida tekshiriladi.


## NEX v1.3.0 — 2026-11-19

### Yangilanishlar
- To‘rtta kontent studiyasi uchun preview sahna animatsiyalari alohida harakat tiliga ajratildi.
- Tavsiya akkaunt: profil kartasi va sarlavhaning qatlamli ochilishi.
- Foydali manbalar: chapdan ochiladigan sarlavha, chiziqli urg‘u va ketma-ket resurs teglari.
- Qiziqarli faktlar: muhr kabi kiruvchi yorliq, urg‘uli sarlavha va izohning alohida paydo bo‘lishi.
- Maxsus iboralar: sekin, yumshoq, xiralikdan ochiladigan tipografik animatsiya.
- Tanlangan studiya preview elementlariga uzatiladi; animatsiyalar sahna yangilanganda qayta boshlanadi.

### Tekshiruv holati
- Kod o‘zgarishlari GitHub main branchiga yozildi.
- CSS/JS matn darajasida yangilandi; real Android qurilmasida animatsiya va eksport sinovi hali bajarilmagan.
- Ushbu yangilanish preview animatsiyalarini farqlaydi; canvas video eksportidagi studiyaga xos sahna animatsiyasi keyingi texnik bosqichda alohida moslashtirilishi kerak.


## NEX v1.4.0 — 2026-11-19

### Yangilanishlar
- Video eksport rendereriga har bir sahnaning animatsiya progressi uzatildi.
- Tavsiya akkaunt eksporti: profil kartasi chapdan siljib ochiladi.
- Foydali manbalar eksporti: uchta resurs kartasi navbat bilan paydo bo‘ladi.
- Qiziqarli faktlar eksporti: aylanuvchi fakt halqasi va sahna raqami ochiladi.
- Maxsus iboralar eksporti: katta qo‘shtirnoq belgisi va tipografik chiziq yumshoq ochiladi.
- Sarlavha va izohlar sahna davomida bosqichma-bosqich paydo bo‘ladi.
- MP4/WebM formatini aniqlash va haqiqiy kengaytmani saqlash mexanizmi o‘zgarishsiz qoldirildi.

### Tekshiruv holati
- JavaScript manba kodiga o‘zgarishlar GitHub main branchiga yozildi.
- Kodning amaliy brauzer sinovi, eksport qilingan faylni ijro etish va Android qurilmasida yuklab olish sinovi hali bajarilmadi.
- GitHub Pages deploy natijasi commitdan keyin alohida tekshiriladi.
