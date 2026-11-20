# NEX — ishlar holati

Amaldagi versiya: **v0.4.0**  
Asosiy yo‘nalish: **Tavsiya akkaunt studiyasi**  
Sayt: https://parviz1999-yg.github.io/NEX/

## Bajarildi — v0.4.0
- [x] Three.js 0.180.0 asosidagi WebGL render dvigateli ulandi.
- [x] Preview va ekran yozish oynasi uchun alohida WebGL render yuzalari qo‘shildi.
- [x] 3D sahnalar haqiqiy geometriya, fizik materiallar, perspektiv kamera va yoritish orqali quriladi.
- [x] To‘rtta vizual yo‘nalish uchun turli 3D geometriya kompozitsiyalari qo‘shildi.
- [x] Besh sahnaga mos kamera pozitsiyasi va obyekt animatsiyasi kiritildi.
- [x] 2D matn qatlami WebGL sahnasi ustida shaffof overlay sifatida ishlaydi.
- [x] Tavsiya akkaunt yo‘nalishida Canvas 2D pseudo-3D fon va kamera transformatsiyasi asosiy renderdan chiqarildi.
- [x] 3D obyektlarda blur/shadowBlur orqali hajm yasash olib tashlandi.
- [x] Diktor matni tashqi ilovada ishlatilishi aniq yozildi; NEX audio yozmaydi va yuklamaydi.
- [x] Versiya v0.4.0 ga ko‘tarildi.

## Hali bajarilmagan / alohida sinov talab qiladi
- [ ] GitHub Pages deploy tugagach Android telefonda WebGL yuklanishi va ishlashi.
- [ ] To‘rtta dizayn yo‘nalishining har birida barcha besh sahnani vizual tekshirish.
- [ ] Ekran yozish rejimida WebGL va matn qatlamining birgalikda ko‘rinishini tekshirish.
- [ ] Mobil GPU unumdorligi, qizish va batareya sarfini tekshirish.
- [ ] Profil rasmi va uzun matnlar bilan real qurilma sinovi.
- [ ] Bir akkaunt uchun ketma-ket besh Reel yaratib, kompozitsiya takrorlanishini baholash.
- [ ] WebGL mavjud bo‘lmagan brauzerlar uchun fallback yo‘lini sinash.

## Texnik qarorlar
- Three.js CDN orqali yuklanadi; birinchi ochishda internet aloqasi zarur.
- Render 9:16 formatga mo‘ljallangan; matn Canvas 2D overlay bo‘lib qoladi, hajmli sahna esa WebGL orqali chiziladi.
- 3D geometriyada sun’iy blur va blur-soya ishlatilmaydi.
- Ssenariy generatori shablonli; tashqi AI orqali fakt tekshiruvi yo‘q.
- Video eksport yo‘q; foydalanuvchi telefon ekran yozish funksiyasidan foydalanadi.
- Sintaksis tekshiruvi qurilmadagi vizual sinov o‘rnini bosmaydi.
