src/
  components/
    atoms/
      Button.js
      Input.js
      Icon.js
    molecules/
      LoginForm.js
      ProductCard.js
    organisms/
      Header.js
      Footer.js
      HomePage.js
    templates/
      LoginPage.js
      DashboardPage.js
      ProductPage.js
    pages/
      Home.js
      Login.js
      Dashboard.js
      Product.js



Atoms: Level terendah dari struktur Atomic Design adalah Atoms. Atoms adalah elemen dasar yang tidak dapat dibagi lagi menjadi komponen yang lebih kecil. Contoh Atoms dalam React bisa berupa tombol, input, atau icon.

Molecules: Level selanjutnya adalah Molecules, yaitu gabungan dari beberapa Atoms yang membentuk suatu komponen yang lebih kompleks. Contoh Molecules dalam React bisa berupa form input yang terdiri dari label, input field, dan tombol submit.

Organisms: Level Organisms terdiri dari gabungan beberapa Molecules dan Atoms yang membentuk suatu bagian halaman yang lebih besar dan dapat bekerja sebagai satu kesatuan. Contoh Organisms dalam React bisa berupa header, footer, atau card.

Templates: Level Templates adalah struktur yang lebih tinggi dari Organisms, yang menentukan bagaimana komponen-komponen Organisms ditempatkan dan diatur dalam suatu halaman. Contoh Templates dalam React bisa berupa halaman login, halaman dashboard, atau halaman produk.

Pages: Level Pages adalah halaman web yang merupakan gabungan dari semua level sebelumnya, yaitu Atoms, Molecules, Organisms, dan Templates. Pages adalah level tertinggi dari struktur Atomic Design dan mewakili halaman web yang lengkap dan fungsional.