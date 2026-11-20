# NEX — ishlar holati

Amaldagi versiya: **v0.3.0**  
Asosiy yo‘nalish: **Tavsiya akkaunt studiyasi**  
Sayt: https://parviz1999-yg.github.io/NEX/

## Bajarildi — v0.3.0
- [x] v0.2.0 dagi to‘rtta mustaqil dizayn yo‘nalishi va besh sahnali renderer saqlandi.
- [x] Akkaunt ma’lumotlaridan besh sahnali tavsiya ssenariysi avtomatik tuziladi.
- [x] Ekrandagi matn va ovozli matn alohida yaratiladi va tahrirlanadi.
- [x] Hook va CTA uchun bir nechta matn variantidan tasodifiy tanlov qo‘shildi.
- [x] Ssenariy faqat foydalanuvchi kiritgan akkaunt ma’lumotlariga asoslanadi; dalil bo‘lmasa, tekshirishga undovchi neytral matn ishlatiladi.
- [x] Majburiy ma’lumotlar bo‘lmasa, generator ogohlantiradi.
- [x] Ssenariy yaratilgach, taxminiy davomiylik qayta hisoblanadi.
- [x] JavaScript sintaksisi, HTML ID takrorlanmasligi va statik DOM bog‘lanishlari tekshirildi.

## Hali bajarilmagan / alohida sinov talab qiladi
- [ ] Android telefon brauzerida real vizual sinov.
- [ ] Har bir dizayn yo‘nalishida 5 sahnani ko‘z bilan tekshirish.
- [ ] Bir akkaunt uchun ketma-ket 5 ta Reel yaratib, vizual va matniy takrorlanishni baholash.
- [ ] Turli uzunlikdagi akkaunt tavsiflari va foyda matnlarini sinash.
- [ ] Profil rasmi, mobil ekran va ekran yozish rejimini qurilmada tekshirish.
- [ ] Audio yozish/yuklash va sahnalar bilan sinxronlash.
- [ ] Haqiqiy WebGL 3D yoki boshqa 3D render pipeline zaruratini baholash.
- [ ] Video eksport funksiyasi (hozirgi ish oqimi ekran yozish asosida).

## Muhim texnik izoh
Ssenariy generatori hozircha shablon va foydalanuvchi kiritgan ma’lumotlar asosida ishlaydi; tashqi AI xizmatiga ulanmagan. Dalil yoki faktlarni mustaqil tekshirmaydi. Hozirgi 3D ko‘rinish Canvas 2D orqali perspektiva, qatlam, soya va hajm illuziyasi bilan yaratiladi. Sintaksis tekshiruvi Android brauzeridagi to‘liq sinov o‘rnini bosmaydi.
