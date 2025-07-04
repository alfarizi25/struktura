# Struktura - Landing Page Perusahaan Kontraktor

Landing page modern dengan desain glassmorphism untuk perusahaan kontraktor Struktura, dilengkapi dengan dashboard admin untuk mengelola galeri proyek.

## Fitur Utama

### Landing Page
- **Desain Glassmorphism**: Efek liquid glass ala Apple yang modern dan elegan
- **Responsive Design**: Tampil sempurna di semua perangkat
- **Smooth Scrolling**: Animasi halus antar section
- **Form Konsultasi**: Pengunjung dapat mengirim permintaan konsultasi
- **Galeri Proyek**: Showcase portofolio dengan filter kategori
- **Floating Contact**: Tombol WhatsApp dan Email yang selalu terlihat
- **Google Maps Integration**: Lokasi kantor terintegrasi

### Dashboard Admin
- **Autentikasi JWT**: Login admin yang aman
- **Kelola Galeri**: CRUD operations untuk proyek
- **Preview Gambar**: Preview real-time saat upload
- **Data Konsultasi**: Lihat semua form konsultasi yang masuk
- **Interface Modern**: Dashboard dengan desain glassmorphism

## Teknologi

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Neon PostgreSQL
- **Authentication**: JWT dengan bcryptjs
- **Image Storage**: Local storage di /public/uploads

## Setup Lokal

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd struktura-landing
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Salin `.env.example` ke `.env.local` dan isi variabel yang diperlukan:

\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/struktura_db"
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. Setup Database
Jalankan script SQL untuk membuat tabel dan data awal:

\`\`\`bash
# Jalankan script init-database.sql di database PostgreSQL Anda
# atau gunakan psql:
psql -d struktura_db -f scripts/init-database.sql
\`\`\`

### 5. Jalankan Development Server
\`\`\`bash
npm run dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## Struktur Proyek

\`\`\`
struktura-landing/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   └── login/
│   ├── api/
│   │   ├── auth/
│   │   ├── consultations/
│   │   └── projects/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AboutSection.tsx
│   ├── ConsultationForm.tsx
│   ├── FloatingButtons.tsx
│   ├── Footer.tsx
│   ├── GallerySection.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   └── ServicesSection.tsx
├── scripts/
│   └── init-database.sql
├── .env.example
└── README.md
\`\`\`

## Penggunaan

### Akses Landing Page
- Kunjungi `/` untuk melihat landing page
- Gunakan navigasi untuk scroll ke section yang diinginkan
- Isi form konsultasi untuk mengirim permintaan
- Klik floating button untuk kontak langsung

### Akses Admin Dashboard
1. Klik "Login Admin" di navbar atau kunjungi `/admin/login`
2. Login dengan kredensial admin:
   - Username: `admin`
   - Password: `admin123`
3. Kelola galeri proyek di tab "Kelola Galeri"
4. Lihat data konsultasi di tab "Data Konsultasi"

### Mengelola Galeri Proyek
1. Klik "Tambah Proyek" untuk menambah proyek baru
2. Isi form dengan:
   - Nama proyek
   - Kategori (Pembangunan/Renovasi/Pemeliharaan)
   - URL gambar (bisa menggunakan placeholder atau URL eksternal)
   - Deskripsi proyek
3. Preview gambar akan muncul otomatis
4. Klik "Tambah Proyek" untuk menyimpan
5. Gunakan tombol Edit/Delete pada card proyek untuk mengelola

## Kustomisasi

### Warna dan Styling
- Edit `app/globals.css` untuk mengubah variabel CSS
- Warna utama kuning konstruksi: `#f59e0b`
- Efek glassmorphism dapat disesuaikan di class `.glass`, `.glass-card`, `.glass-nav`

### Konten
- Edit komponen di folder `components/` untuk mengubah konten
- Ganti placeholder image dengan gambar asli
- Update informasi kontak di `Footer.tsx`

### Database Schema
- Modifikasi `scripts/init-database.sql` untuk perubahan struktur database
- Update API routes di `app/api/` sesuai perubahan schema

## Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di Vercel
3. Set environment variables di Vercel dashboard
4. Deploy otomatis akan berjalan

### Manual Deployment
1. Build aplikasi: `npm run build`
2. Upload file build ke server
3. Setup database PostgreSQL di production
4. Set environment variables
5. Jalankan aplikasi: `npm start`

## Kontribusi

1. Fork repository
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'Tambah fitur baru'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

## Lisensi

© 2024 Struktura. Semua hak cipta dilindungi.

## Support

Untuk bantuan teknis atau pertanyaan, hubungi:
- Email: dev@struktura.co.id
- WhatsApp: +62 812 3456 7890
