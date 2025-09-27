# 💖 Karbit Generator - Waifu Edition

Sebuah website unik dan menyenangkan yang memungkinkan user untuk mengupload gambar waifu mereka dan mendapatkan persentase "karbit" (karbitan) dengan waifu tersebut!

## 🌟 Features

- **Upload Gambar Drag & Drop**: Upload gambar waifu dengan mudah menggunakan drag & drop atau klik untuk browse
- **Preview Interaktif**: Lihat preview gambar yang diupload dengan interface yang cantik
- **Karbit Calculator**: Algoritma unik yang menghitung persentase karbit berdasarkan berbagai faktor
- **Hasil Menarik**: Tampilan hasil dengan animasi counter, deskripsi lucu, dan quotes waifu
- **Responsive Design**: Tampil cantik di desktop, tablet, dan mobile
- **Animasi & Effects**: 
  - Floating particles background
  - Loading animations
  - Confetti effect untuk hasil tinggi
  - Smooth transitions
- **Share Feature**: Bagikan hasil karbit ke media sosial
- **Easter Eggs**: Hidden features untuk user yang eksplor lebih dalam

## 🎨 Design Features

- **Gradient Background**: Background gradasi yang cantik dengan tema ungu-pink
- **Glass Morphism**: Efek kaca blur pada card dan komponen
- **Anime-inspired Colors**: Palet warna yang terinspirasi dari aesthetic anime
- **Smooth Animations**: Animasi yang halus dan menyenangkan
- **Interactive Elements**: Hover effects dan feedback visual yang responsif

## 🚀 Cara Penggunaan

1. Buka `index.html` di browser
2. Upload gambar waifu dengan cara:
   - Drag & drop gambar ke area upload
   - Atau klik "Pilih Gambar" untuk browse file
3. Setelah gambar muncul, klik tombol "Cek Karbit Level!"
4. Tunggu loading animation selesai
5. Lihat hasil persentase karbit dengan deskripsi yang lucu
6. Share hasil atau coba lagi dengan gambar lain

## 📱 Kompatibilitas

- ✅ Chrome/Chromium browsers
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur modern dengan semantic elements
- **CSS3**: 
  - Flexbox & Grid Layout
  - CSS Animations & Transitions
  - Backdrop-filter untuk glass effect
  - Custom properties (CSS Variables)
- **Vanilla JavaScript**:
  - File API untuk upload gambar
  - Canvas API untuk image processing
  - Modern ES6+ features
  - Async/await untuk smooth UX

## 🎯 Algoritma Karbit

Website ini menggunakan algoritma unik untuk menghitung persentase karbit:

1. **Image Analysis**: Menganalisa properties gambar (nama file, ukuran, dll)
2. **Weighted Randomness**: Menggunakan sistem random berbobot yang favor hasil tinggi
3. **Time-based Variance**: Menambahkan variance berdasarkan timestamp
4. **Personality Matching**: 7 level karbit dengan deskripsi personality yang berbeda

## 📊 Karbit Levels

- **0-20%**: Bukan Jodoh 💔
- **21-40%**: Teman Biasa 😐  
- **41-60%**: Ada Perasaan 😊
- **61-75%**: Crush Banget! 😍
- **76-85%**: Hampir Perfect 💕
- **86-95%**: Soulmate Detected! ✨
- **96-100%**: Ultimate Waifu! 👑

## 🎪 Easter Eggs

- **Konami Code**: Coba masukkan konami code untuk special effect!
- **Dynamic Particles**: Particles yang terus regenerate untuk background yang hidup
- **Confetti Effect**: Otomatis muncul untuk hasil karbit tinggi (80%+)
- **Multiple Results**: Hasil berbeda setiap kali calculation dengan gambar yang sama

## 🔧 Customization

Kamu bisa customize website ini dengan mudah:

### Ubah Warna Theme
Edit variabel di `style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #ff6b9d;
  --success-color: #4CAF50;
}
```

### Tambah Karbit Level Baru
Edit array `karbitLevels` di `script.js`:
```javascript
const karbitLevels = [
  { min: 0, max: 20, title: "Custom Level", description: "Custom description..." },
  // tambah level baru di sini
];
```

### Tambah Waifu Quotes
Edit array `waifuQuotes` di `script.js`:
```javascript
const waifuQuotes = [
  "Quote baru disini!",
  // tambah quotes lain
];
```

## 📝 TO-DO / Future Features

- [ ] Sound effects saat calculation
- [ ] Multiple language support
- [ ] Save history hasil karbit
- [ ] Comparison dengan waifu lain
- [ ] Achievement system
- [ ] Custom waifu database integration

## 🤝 Contributing

Feel free to fork this project dan submit pull requests! Beberapa area yang bisa dikembangkan:

- Tambah sound effects
- Improve algoritma karbit
- Tambah animasi baru
- Mobile UX improvements
- Performance optimizations

## 📄 License

Project ini dibuat untuk fun dan educational purposes. Feel free to use and modify!

## 👨‍💻 Credits

Dibuat dengan ❤️ untuk semua waifu lovers di Indonesia!

---

**Enjoy your karbit journey! 💖✨**