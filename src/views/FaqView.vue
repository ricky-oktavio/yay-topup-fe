<template>
  <div class="legal-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <!-- Main Content Container -->
    <main class="legal-main-content animate-fade-up">
      <div class="legal-container">
        
        <!-- Header Section -->
        <div class="legal-header">
          <span class="legal-badge faq-badge">Pusat Bantuan</span>
          <h1 class="page-title">Frequently Asked Questions</h1>
          <p class="page-subtitle">Temukan jawaban cepat untuk seluruh pertanyaan seputar top-up, pembayaran, & komisi.</p>
        </div>

        <!-- Search Bar -->
        <div class="faq-search-wrapper">
          <div class="search-input-box">
            <Search01Icon :size="20" class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari pertanyaan... (e.g. Berapa lama topup, QRIS gagal, Komisi)" 
              class="faq-search-input"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="btn-clear-search">✕</button>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="faq-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            class="tab-btn"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectedCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Document Card / FAQ Accordion List -->
        <div class="legal-card-container">
          <div class="card-momolive-shadow"></div>
          
          <div class="legal-card">
            
            <div v-if="filteredFaqs.length > 0" class="accordion-list">
              <div 
                v-for="item in filteredFaqs" 
                :key="item.id" 
                class="accordion-item"
                :class="{ open: openItems.includes(item.id) }"
              >
                <button class="accordion-header" @click="toggleAccordion(item.id)">
                  <span class="faq-cat-tag">{{ getCategoryLabel(item.category) }}</span>
                  <span class="faq-question-text">{{ item.question }}</span>
                  <span class="accordion-icon">{{ openItems.includes(item.id) ? '−' : '+' }}</span>
                </button>

                <div v-show="openItems.includes(item.id)" class="accordion-body">
                  <div class="faq-answer-content" v-html="item.answer"></div>
                </div>
              </div>
            </div>

            <!-- Empty Search Result -->
            <div v-else class="empty-faq-box">
              <InformationCircleIcon :size="40" class="empty-icon" />
              <h3>Pertanyaan Tidak Ditemukan</h3>
              <p>Maaf, kami tidak menemukan jawaban yang cocok dengan pencarian "{{ searchQuery }}".</p>
              <button class="btn-reset-search" @click="resetFilters">Lihat Semua FAQ</button>
            </div>

            <!-- Contact Support CTA Box -->
            <div class="faq-cta-box">
              <div class="cta-text">
                <h4>Belum menemukan jawaban yang Anda cari?</h4>
                <p>Tim Customer Support kami siap membantu Anda 24/7 untuk mengatasi kendala transaksi.</p>
              </div>
              <div class="cta-actions">
                <router-link to="/contact" class="btn-cta-purple">
                  Hubungi CS Kami
                  <ArrowRight01Icon :size="16" />
                </router-link>
              </div>
            </div>

            <!-- Back Link -->
            <div class="legal-card-footer">
              <router-link to="/" class="btn-back-home">
                ← Kembali ke Halaman Utama
              </router-link>
            </div>

          </div>
        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="momolive-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
        </div>
        <nav class="footer-links">
          <router-link to="/terms">Syarat & Ketentuan</router-link>
          <router-link to="/refund">Kebijakan Refund</router-link>
          <router-link to="/privacy">Kebijakan Privasi</router-link>
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/contact">Hubungi Kami</router-link>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search01Icon, InformationCircleIcon, ArrowRight01Icon } from 'hugeicons-vue';

const searchQuery = ref('');
const selectedCategory = ref('all');
const openItems = ref([1, 2]); // Open first two by default

const categories = [
  { id: 'all', label: 'Semua Pertanyaan' },
  { id: 'topup', label: 'Top-Up & Game' },
  { id: 'payment', label: 'Pembayaran & QRIS' },
  { id: 'refund', label: 'Kendala & Refund' },
  { id: 'affiliate', label: 'Program Afiliasi' }
];

const faqs = [
  {
    id: 1,
    category: 'topup',
    question: 'Berapa lama proses transaksi top-up di YayTopup?',
    answer: 'Proses top-up dilakukan secara <strong>otomatis & instan</strong>. Rata-rata transaksi diproses oleh sistem kami dalam waktu <strong>1 hingga 5 detik</strong> setelah pembayaran terkonfirmasi dari gateway.'
  },
  {
    id: 2,
    category: 'topup',
    question: 'Bagaimana cara menemukan User ID & Zone ID Game saya?',
    answer: 'User ID dan Zone ID dapat Anda lihat langsung di profil dalam game Anda. Sebagai contoh:<br/>• <strong>Mobile Legends:</strong> ID terdapat di menu Profil utama (contoh: 12345678 (1234)).<br/>• <strong>Free Fire:</strong> ID angka terdapat pada halaman profil akun.<br/>• <strong>Genshin Impact:</strong> UID angka 9 digit yang tertera di pojok kanan bawah layar.'
  },
  {
    id: 3,
    category: 'payment',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung berbagai saluran pembayaran otomatis 24 jam:<br/>• <strong>QRIS Instan:</strong> GoPay, OVO, Dana, ShopeePay, LinkAja, BCA Mobile, Livin, dll.<br/>• <strong>Virtual Account (VA):</strong> BCA, Mandiri, BRI, BNI, Permata, CIMB.<br/>• <strong>E-Wallet Direct:</strong> ShopeePay, Dana, OVO.'
  },
  {
    id: 4,
    category: 'payment',
    question: 'Apakah pembayaran dengan QRIS aman dan langsung terverifikasi?',
    answer: 'Sangat aman. Sistem kami terintegrasi secara resmi dengan Payment Gateway berlisensi Bank Indonesia. Pembayaran melalui QRIS langsung terverifikasi secara real-time tanpa perlu mengunggah bukti transfer manual.'
  },
  {
    id: 5,
    category: 'refund',
    question: 'Bagaimana jika saldo terpotong tetapi item game belum masuk?',
    answer: 'Jika pembayaran Anda sudah berhasil (status PAID) namun produk belum terisi dalam 5 menit:<br/>1. Cek ulang ID Game yang diinput pada detail transaksi.<br/>2. Silakan buka halaman <a href="/status" class="faq-inner-link">Cek Status Transaksi</a>.<br/>3. Apabila masih terkendala, hubungi CS kami via WhatsApp/Email dengan melampirkan Nomor Invoice untuk proses pengecekan atau pengembalian dana.'
  },
  {
    id: 6,
    category: 'refund',
    question: 'Apakah saya bisa mengajukan refund jika salah memasukkan ID Akun Game?',
    answer: 'Mohon maaf, transaksi yang sudah dinyatakan <strong>SUCCESS</strong> oleh server game dan terisi ke ID tersebut tidak dapat dibatalkan atau dikembalikan. Harap pastikan ID Akun sudah benar sebelum bayar.'
  },
  {
    id: 7,
    category: 'affiliate',
    question: 'Apa itu Program Afiliasi YayTopup dan bagaimana cara mendaftarnya?',
    answer: 'Program Afiliasi YayTopup memungkinkan Anda mendapatkan komisi pasif dari setiap transaksi top-up pengguna yang mendaftar melalui Kode Referral Anda. Pendaftaran <strong>100% Gratis</strong> melalui menu <a href="/register" class="faq-inner-link">Daftar Afiliasi</a>.'
  },
  {
    id: 8,
    category: 'affiliate',
    question: 'Berapa minimal penarikan saldo komisi afiliasi?',
    answer: 'Minimal batas penarikan saldo komisi afiliasi adalah <strong>Rp 50.000</strong>. Penarikan dapat dikirimkan langsung ke rekening bank lokal atau E-Wallet yang telah Anda daftarkan di dashboard afiliasi.'
  }
];

const filteredFaqs = computed(() => {
  return faqs.filter(item => {
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
});

const toggleAccordion = (id) => {
  const index = openItems.value.indexOf(id);
  if (index > -1) {
    openItems.value.splice(index, 1);
  } else {
    openItems.value.push(id);
  }
};

const getCategoryLabel = (catId) => {
  const cat = categories.find(c => c.id === catId);
  return cat ? cat.label : catId;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
};
</script>

<style scoped>
.legal-page-wrapper {
  position: relative;
  min-height: calc(100vh - 65px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.momolive-bg-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: 0.95;
}

.momolive-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  filter: blur(2px) opacity(0.45);
  transform: scale(1.02);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(236, 72, 153, 0) 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(124, 58, 237, 0) 70%);
  bottom: 10%;
  right: -50px;
}

.legal-main-content {
  position: relative;
  z-index: 1;
  padding: 3rem 1.25rem 5rem 1.25rem;
  flex: 1;
}

.legal-container {
  max-width: 820px;
  margin: 0 auto;
}

.legal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.legal-badge.faq-badge {
  display: inline-block;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.85rem;
  border-radius: 99px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.4rem;
}

/* FAQ Search Input */
.faq-search-wrapper {
  margin-bottom: 1.5rem;
}

.search-input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.15rem;
  color: #94a3b8;
  pointer-events: none;
}

.faq-search-input {
  width: 100%;
  padding: 0.95rem 2.8rem 0.95rem 3.2rem;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.faq-search-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.15);
}

.btn-clear-search {
  position: absolute;
  right: 1.15rem;
  background: #e2e8f0;
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.75rem;
  color: #475569;
  cursor: pointer;
}

/* Category Tabs */
.faq-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
  justify-content: center;
}

.tab-btn {
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 99px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #cbd5e1;
}

.tab-btn.active {
  background: #7c3aed;
  color: #ffffff;
  border-color: #7c3aed;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

/* Card & Accordion */
.legal-card-container {
  position: relative;
}

.card-momolive-shadow {
  position: absolute;
  inset: -10px;
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3));
  filter: blur(12px);
  opacity: 0.7;
  z-index: -1;
}

.legal-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06);
}

.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-item {
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.2s ease;
  background: #ffffff;
}

.accordion-item.open {
  border-color: #7c3aed;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.08);
}

.accordion-header {
  width: 100%;
  padding: 1.15rem 1.25rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-align: left;
  cursor: pointer;
}

.faq-cat-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: #f1f5f9;
  color: #64748b;
  flex-shrink: 0;
  text-transform: uppercase;
}

.accordion-item.open .faq-cat-tag {
  background: #f3e8ff;
  color: #7c3aed;
}

.faq-question-text {
  font-size: 0.975rem;
  font-weight: 700;
  color: #0f172a;
  flex: 1;
}

.accordion-icon {
  font-size: 1.3rem;
  font-weight: 700;
  color: #7c3aed;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.accordion-body {
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}

.faq-answer-content {
  font-size: 0.925rem;
  color: #475569;
  line-height: 1.7;
  padding-top: 1rem;
}

.faq-answer-content :deep(a), .faq-inner-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: underline;
}

/* Empty Search */
.empty-faq-box {
  text-align: center;
  padding: 3rem 1.5rem;
}

.empty-icon {
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.empty-faq-box h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.empty-faq-box p {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 0.3rem;
  margin-bottom: 1.25rem;
}

.btn-reset-search {
  padding: 0.65rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  background: #7c3aed;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

/* CTA Box */
.faq-cta-box {
  margin-top: 2.5rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-text h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.cta-text p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
}

.btn-cta-purple {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #7c3aed;
  color: #ffffff;
  padding: 0.75rem 1.2rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.btn-cta-purple:hover {
  background: #651fff;
  transform: translateY(-1px);
}

.legal-card-footer {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.btn-back-home {
  color: #7c3aed;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
}

.btn-back-home:hover {
  text-decoration: underline;
}

/* Footer */
.momolive-footer {
  position: relative;
  z-index: 10;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  font-size: 0.85rem;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-emblem-clean {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
}

.footer-links a:hover {
  color: #7c3aed;
}

@media (max-width: 640px) {
  .legal-card {
    padding: 1.5rem 1rem;
  }
  .page-title {
    font-size: 1.85rem;
  }
  .faq-cta-box {
    flex-direction: column;
    text-align: center;
  }
  .footer-inner {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
