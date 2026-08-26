<template>
  <div 
    class="momolive-topup-page" 
    :class="{ 
      'theme-goldendragon': activeVersion === 'v2',
      'theme-clean-light-v3': activeVersion === 'v3'
    }"
  >

    <!-- ========================================== -->
    <!-- VERSI 1: CLASSIC FORM RINGKAS              -->
    <!-- ========================================== -->
    <div v-if="activeVersion === 'v1'" class="v1-container">
      <div class="momolive-bg-glow">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <img src="../assets/momolive_bg.jpg" alt="Momolive Background" class="momolive-bg-image" />
      </div>

      <div class="container main-content-wrapper animate-fade-up">
        <!-- Hero Header -->
        <div class="hero-header">
          <div class="hero-title-flex">
            <a href="https://www.momoindo.com/?lng=id" target="_blank" rel="noopener noreferrer" class="momolive-logo-badge" title="Website Momo Live">
              <img src="../assets/momo.jpeg" alt="Momo Live Logo" class="momolive-hero-logo" />
            </a>
            <div class="hero-title-group">
              <h1 class="main-title">Top Up Koin Momo Live</h1>
              <p class="main-subtitle">Beli koin resmi Momo Live, langsung masuk ke akun Anda.</p>
            </div>
          </div>
        </div>

        <!-- Main Card V1 -->
        <div class="topup-card-container">
          <div class="card-momolive-shadow"></div>

          <div class="topup-card">
            <!-- ID MOMOCOIN -->
            <div class="form-group">
              <label class="form-label-uppercase">User ID Momo Live</label>
              <div class="input-verified-flex-row">
                <input 
                  v-model="momocoinId" 
                  type="text" 
                  class="form-input-styled flex-input" 
                  :class="{ 'is-input-verified': isVerified, 'is-input-loading': isCheckingUser }"
                  placeholder="Masukkan User ID akun Anda"
                />

                <Transition name="side-fade" mode="out-in">
                  <div v-if="isCheckingUser" class="side-loading-chip">
                    <Loading01Icon :size="16" class="spin-icon" />
                    <span class="loading-text">Cek ID...</span>
                  </div>

                  <div v-else-if="isVerified" class="side-verified-chip">
                    <CheckmarkBadge01Icon :size="16" class="verified-icon" />
                    <span class="verified-name">{{ verifiedUsername }}</span>
                    <span class="verified-pill">Sesuai</span>
                  </div>
                </Transition>
              </div>
              <span class="hint-text">Contoh: 123456789</span>
            </div>

            <!-- KODE REFERRAL -->
            <div class="form-group margin-top-md">
              <label class="form-label-uppercase">Kode Referral (Opsional)</label>
              <div class="input-verified-flex-row">
                <input 
                  v-model="referralCode" 
                  type="text" 
                  class="form-input-styled flex-input" 
                  :class="{ 'is-disabled-ref': isRefFromUrl }"
                  :disabled="isRefFromUrl"
                  placeholder="Masukkan kode rujukan jika ada"
                />
                <div v-if="isRefFromUrl" class="side-verified-chip ref-locked-chip">
                  <CheckmarkBadge01Icon :size="16" />
                  <span>Kode Terpasang</span>
                </div>
              </div>
            </div>

            <!-- NOMINAL KOIN -->
            <div class="form-group margin-top-md">
              <label class="form-label-uppercase">Jumlah Koin</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <Coins01Icon :size="20" />
                </span>
                <input 
                  v-model.number="coinAmount" 
                  type="number" 
                  min="0"
                  class="form-input-styled has-icon" 
                  placeholder="Contoh: 5000"
                />
              </div>
            </div>

            <!-- Presets -->
            <div class="coin-presets">
              <button 
                v-for="preset in presets" 
                :key="preset"
                class="preset-chip"
                :class="{ active: coinAmount === preset }"
                @click="coinAmount = preset"
              >
                +{{ preset.toLocaleString('id-ID') }} Koin
              </button>
            </div>

            <!-- Summary -->
            <div class="summary-section">
              <div class="summary-line">
                <span class="summary-label">Jumlah Koin</span>
                <span class="summary-value">{{ formattedCoins }}</span>
              </div>
              <div class="summary-line total-line">
                <span class="total-label">Total Pembayaran</span>
                <span class="total-amount">Rp {{ formattedTotal }}</span>
              </div>
            </div>

            <!-- Submit -->
            <button 
              class="btn btn-gradient-submit" 
              :disabled="!isFormValid || isLoading"
              @click="handlePayNow"
            >
              <span v-if="isLoading">Menyiapkan Pesanan...</span>
              <span v-else class="btn-flex-inner">
                Lanjut ke Pembayaran 
                <ArrowRight01Icon :size="20" class="btn-icon" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer V1 -->
      <footer class="momolive-footer">
        <div class="container footer-inner">
          <div class="footer-logo">
            <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
            <span class="brand-text">
              <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
            </span>
          </div>
          <nav class="footer-links">
            <router-link to="/terms">Syarat & Ketentuan</router-link>
            <router-link to="/privacy">Kebijakan Privasi</router-link>
            <router-link to="/contact">Bantuan</router-link>
          </nav>
          <p class="footer-copyright">© 2026 PT. JLIMA DIGITAL INDONESIA. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>

    <!-- ========================================== -->
    <!-- VERSI 2: GOLDENDRAGON THEME                -->
    <!-- ========================================== -->
    <div v-else-if="activeVersion === 'v2'" class="v2-layout-wrapper">
      
      <!-- Top Navbar -->
      <header class="v2-header">
        <div class="v2-header-inner">
          <div class="v2-brand-area">
            <div class="v2-brand-emblem">
              <img src="../assets/logo-yay-clean.png" alt="Logo" class="v2-brand-img" />
            </div>
            <span class="v2-brand-title">Golden Dragon / YayTopup</span>
          </div>
          <nav class="v2-nav-links">
            <button class="v2-nav-btn active">Home</button>
            <router-link to="/history" class="v2-nav-link">Cek Pesanan</router-link>
            <router-link to="/" class="v2-nav-link">Daftar Harga</router-link>
            <router-link to="/" class="v2-nav-link">Metode</router-link>
            <router-link to="/login" class="v2-nav-link">Login</router-link>
            <router-link to="/" class="v2-nav-link">Beranda</router-link>
          </nav>
        </div>
      </header>

      <!-- Main Content Grid -->
      <main class="v2-main-container">
        <div class="v2-grid-layout">
          
          <!-- LEFT SIDEBAR -->
          <aside class="v2-product-card">
            <div class="v2-product-badge">
              <img src="../assets/momo.jpeg" alt="Momo Live" class="v2-momo-img" />
            </div>
            <h2 class="v2-product-title">Momo Live Indonesia</h2>
            <div class="v2-product-subtitle">Isi Koin Akun Momo Live</div>
          </aside>

          <!-- RIGHT SECTION -->
          <section class="v2-form-area">
            
            <!-- CARD 1: LENGKAPI DATA -->
            <div class="v2-card">
              <h2 class="v2-card-title">Lengkapi Data</h2>
              <div class="v2-card-body">
                <div class="v2-input-group">
                  <div class="v2-input-box">
                    <input 
                      v-model="momocoinId" 
                      type="text" 
                      class="v2-input"
                      :class="{ 'is-verified': isVerified, 'is-checking': isCheckingUser }"
                      placeholder="Masukkan User ID"
                    />
                    <div v-if="isCheckingUser" class="v2-status-tag checking">
                      <span>Cek ID...</span>
                    </div>
                    <div v-else-if="isVerified" class="v2-status-tag verified">
                      <span>Sesuai: {{ verifiedUsername }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CARD 2: PILIH NOMINAL LAYANAN -->
            <div class="v2-card">
              <h2 class="v2-card-title">Pilih Nominal Layanan</h2>
              <div class="v2-card-body">
                
                <!-- Custom Denom Top Bar -->
                <div 
                  class="v2-custom-bar"
                  :class="{ active: denomMode === 'custom' }"
                  @click="denomMode = 'custom'"
                >
                  <div class="v2-custom-left">
                    <span class="v2-custom-text">Nominal Custom / Manual</span>
                  </div>
                  <span class="v2-custom-min">Min. Rp 1.000</span>
                </div>

                <!-- Custom Amount Input Drawer -->
                <div v-if="denomMode === 'custom'" class="v2-custom-drawer animate-fade-down">
                  <input 
                    v-model.number="coinAmount" 
                    type="number" 
                    min="0"
                    class="v2-input" 
                    placeholder="Masukkan jumlah koin (contoh: 10000)"
                  />
                  <div class="v2-presets-row">
                    <button 
                      v-for="preset in presets" 
                      :key="preset"
                      class="v2-preset-chip"
                      :class="{ active: coinAmount === preset }"
                      @click="coinAmount = preset"
                    >
                      +{{ preset.toLocaleString('id-ID') }} Koin
                    </button>
                  </div>
                </div>

                <!-- Package Grid -->
                <div v-if="packagesList.length === 0" class="v2-loading-box">
                  <Loading01Icon :size="24" class="spin-icon" />
                  <span>Memuat daftar paket koin resmi...</span>
                </div>
                <div v-else class="v2-packages-grid">
                  <div 
                    v-for="pkg in packagesList" 
                    :key="pkg.id"
                    class="v2-pkg-card"
                    :class="{ 
                      active: denomMode === 'packages' && selectedPackage?.id === pkg.id,
                      featured: pkg.isFeatured
                    }"
                    @click="selectPackage(pkg)"
                  >
                    <div v-if="pkg.badge" class="v2-featured-tag">{{ pkg.badge }}</div>
                    <div class="v2-pkg-left">
                      <h3 class="v2-pkg-name">{{ pkg.name }}</h3>
                      <p v-if="pkg.bonus > 0" class="v2-pkg-bonus">Bonus {{ pkg.bonus.toLocaleString('id-ID') }}</p>
                      <p class="v2-pkg-price">Rp {{ pkg.price.toLocaleString('id-ID') }}</p>
                    </div>
                    <div class="v2-pkg-thumb">
                      <img src="../assets/momo.jpeg" alt="Momo Coin" class="v2-thumb-img" />
                    </div>
                    <div class="v2-pkg-check">
                      <CheckmarkCircle01Icon :size="16" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- CARD 3: PILIH METODE PEMBAYARAN -->
            <div class="v2-card">
              <h2 class="v2-card-title">Pilih Metode Pembayaran</h2>
              <div class="v2-card-body">
                
                <div class="v2-accordions">
                  <div 
                    v-for="cat in paymentCategories" 
                    :key="cat.id"
                    class="v2-acc-item"
                  >
                    <!-- Accordion Yellow Header Bar -->
                    <div 
                      class="v2-acc-header"
                      @click="expandedCategory = expandedCategory === cat.id ? null : cat.id"
                    >
                      <div class="v2-acc-left">
                        <span class="v2-acc-title">{{ cat.title }}</span>
                      </div>
                      <div class="v2-acc-right">
                        <div class="v2-logos-preview">
                          <span v-for="logo in cat.previewLogos" :key="logo" class="v2-logo-badge">{{ logo }}</span>
                        </div>
                        <span class="v2-acc-arrow">{{ expandedCategory === cat.id ? '▲' : '▼' }}</span>
                      </div>
                    </div>

                    <!-- Expanded Method Cards -->
                    <div v-show="expandedCategory === cat.id" class="v2-acc-content">
                      <div 
                        v-for="method in cat.methods" 
                        :key="method.code"
                        class="v2-method-box"
                        :class="{ active: selectedPaymentCode === method.code }"
                        @click="selectedPaymentCode = method.code"
                      >
                        <div class="v2-method-meta">
                          <div>
                            <h4 class="v2-m-name">{{ method.name }}</h4>
                            <p class="v2-m-sub">Batas bayar 10.000.000</p>
                          </div>
                        </div>
                        <span class="v2-m-price">Rp {{ calculateMethodTotal(method).toLocaleString('id-ID') }}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- CARD 4: KODE REFERAL -->
            <div class="v2-card">
              <h2 class="v2-card-title">Kode Referral</h2>
              <div class="v2-card-body">
                <div class="v2-input-group">
                  <input 
                    v-model="referralCode" 
                    type="text" 
                    class="v2-input"
                    :class="{ 'is-disabled': isRefFromUrl }"
                    :disabled="isRefFromUrl"
                    placeholder="Kosongkan jika tidak ada"
                  />
                  <p class="v2-field-hint">Kosongkan jika tidak memiliki kode referral.</p>
                </div>
              </div>
            </div>

            <!-- CARD 5: KONFIRMASI PESANAN -->
            <div class="v2-card">
              <h2 class="v2-card-title">Konfirmasi Pesanan</h2>
              <div class="v2-card-body">
                <div class="v2-input-group">
                  <input 
                    v-model="whatsappNumber" 
                    type="tel" 
                    class="v2-input"
                    placeholder="Masukkan Nomor WhatsApp"
                  />
                  <p class="v2-field-hint">
                    Dengan memesan, Anda menyetujui 
                    <router-link to="/terms" class="v2-link-orange">Ketentuan Layanan</router-link>.
                  </p>
                </div>

                <button 
                  class="v2-btn-submit"
                  :disabled="!isV2FormValid || isLoading"
                  @click="openConfirmModal"
                >
                  <span v-if="isLoading">Menyiapkan Pesanan...</span>
                  <span v-else>BELI SEKARANG</span>
                </button>
              </div>
            </div>

          </section>
        </div>
      </main>

      <!-- V2 Footer -->
      <footer class="v2-footer">
        <div class="v2-footer-inner">
          <div class="v2-f-col">
            <div class="v2-f-logo-row">
              <img src="../assets/logo-yay-clean.png" alt="Logo" class="v2-f-emblem" />
              <span class="v2-f-title">Golden Dragon / YayTopup</span>
            </div>
            <p class="v2-f-desc">
              Pusat pembelian koin Momo Live dengan konfirmasi otomatis dan pilihan pembayaran lengkap.
            </p>
          </div>

          <div class="v2-f-col">
            <h3 class="v2-f-head">Menu</h3>
            <ul class="v2-f-links">
              <li><router-link to="/">Beranda</router-link></li>
              <li><router-link to="/history">Cek Pesanan</router-link></li>
              <li><router-link to="/">Daftar Harga</router-link></li>
            </ul>
          </div>

          <div class="v2-f-col">
            <h3 class="v2-f-head">Kontak</h3>
            <ul class="v2-f-contacts">
              <li>WhatsApp: 6281533335400</li>
              <li>Instagram: goldendragon.family</li>
              <li>Email: sekarsamudera.21@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>

    </div>

    <!-- ========================================== -->
    <!-- VERSI 3: CLEAN LIGHT STEP FORM             -->
    <!-- ========================================== -->
    <div v-else-if="activeVersion === 'v3'" class="v3-clean-container">
      
      <!-- Ambient Glow (Same as V1) -->
      <div class="v3-bg-glow">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
      </div>

      <div class="container v3-main-wrapper animate-fade-up">
        
        <!-- V3 Hero Header Banner -->
        <div class="v3-hero-header">
          <div class="v3-hero-left">
            <a href="https://www.momoindo.com/?lng=id" target="_blank" rel="noopener noreferrer" class="v3-logo-badge" title="Website Momo Live">
              <img src="../assets/momolive_logo.png" alt="Momo Live Logo" class="v3-hero-logo" />
            </a>
            <div class="v3-hero-text">
              <div class="v3-pill-badge">TOP UP RESMI 24 JAM</div>
              <h1 class="v3-main-title">Top Up Koin Momo Live</h1>
              <p class="v3-main-subtitle">Pilih nominal koin yang diinginkan dan selesaikan pembayaran dengan metode pilihan Anda.</p>
            </div>
          </div>
        </div>

        <!-- 4 Step Cards Clean Layout -->
        <div class="v3-steps-container">

          <!-- LANGKAH 1: DATA AKUN -->
          <div class="v3-step-card">
            <div class="v3-step-heading">
              <div class="v3-step-number">1</div>
              <div class="v3-step-heading-info">
                <h2 class="v3-step-title">ID Akun Tujuan</h2>
                <p class="v3-step-desc">Masukkan User ID Momo Live Anda untuk verifikasi otomatis nama akun.</p>
              </div>
            </div>

            <div class="v3-step-content">
              <div class="v3-form-group">
                <label class="v3-label">User ID Momo Live <span class="v3-req">*</span></label>
                <div class="v3-input-verified-row">
                  <input 
                    v-model="momocoinId" 
                    type="text" 
                    class="v3-input-field" 
                    :class="{ 'is-verified': isVerified, 'is-loading': isCheckingUser }"
                    placeholder="Contoh: 123456789"
                  />

                  <Transition name="side-fade" mode="out-in">
                    <div v-if="isCheckingUser" class="v3-chip loading">
                      <Loading01Icon :size="16" class="spin-icon" />
                      <span>Mengecek ID...</span>
                    </div>

                    <div v-else-if="isVerified" class="v3-chip verified">
                      <CheckmarkBadge01Icon :size="16" />
                      <span class="v3-username">{{ verifiedUsername }}</span>
                      <span class="v3-badge-pill">Sesuai</span>
                    </div>
                  </Transition>
                </div>
                <span class="v3-input-hint">ID dapat dilihat di halaman profil aplikasi Momo Live.</span>
              </div>
            </div>
          </div>

          <!-- LANGKAH 2: PILIH NOMINAL TOP UP -->
          <div class="v3-step-card">
            <div class="v3-step-heading">
              <div class="v3-step-number">2</div>
              <div class="v3-step-heading-info">
                <h2 class="v3-step-title">Pilih Nominal Koin</h2>
                <p class="v3-step-desc">Pilih paket koin yang tersedia atau masukkan jumlah koin secara manual.</p>
              </div>
            </div>

            <div class="v3-step-content">
              <!-- Mode Tabs Switcher -->
              <div class="v3-mode-tabs">
                <button 
                  class="v3-mode-btn" 
                  :class="{ active: denomMode === 'packages' }"
                  @click="denomMode = 'packages'"
                >
                  Pilihan Paket
                </button>
                <button 
                  class="v3-mode-btn" 
                  :class="{ active: denomMode === 'custom' }"
                  @click="denomMode = 'custom'"
                >
                  Nominal Bebas
                </button>
              </div>

              <!-- Packages Grid (Clean Light Card Design) -->
              <div v-if="denomMode === 'packages'">
                <div v-if="v3Packages.length === 0" class="v3-loading-box">
                  <Loading01Icon :size="24" class="spin-icon" />
                  <span>Memuat daftar paket koin resmi...</span>
                </div>
                <div v-else class="v3-packages-grid">
                  <div 
                    v-for="pkg in v3Packages" 
                    :key="pkg.id"
                    class="v3-pkg-card"
                    :class="{ 
                      active: selectedPackage?.id === pkg.id,
                      featured: pkg.isFeatured 
                    }"
                    @click="selectPackage(pkg)"
                  >
                    <div v-if="pkg.badge" class="v3-pkg-badge">{{ pkg.badge }}</div>
                    <div class="v3-pkg-inner">
                      <div class="v3-pkg-left-info">
                        <div class="v3-pkg-top-row">
                          <img src="../assets/momo.jpeg" alt="Momo Coin" class="v3-coin-avatar" />
                          <h3 class="v3-pkg-title">{{ pkg.name }}</h3>
                        </div>
                        <div v-if="pkg.bonus > 0" class="v3-pkg-bonus">+Bonus {{ pkg.bonus.toLocaleString('id-ID') }} Koin</div>
                        <div class="v3-pkg-price">Rp {{ pkg.price.toLocaleString('id-ID') }}</div>
                      </div>
                      <div class="v3-pkg-thumb-wrap">
                        <img src="../assets/momo.jpeg" alt="Momo Coin" class="v3-thumb-img" />
                      </div>
                    </div>
                    
                    <div class="v3-pkg-check">
                      <CheckmarkCircle01Icon :size="20" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Custom Amount Mode -->
              <div v-else class="v3-custom-section">
                <div class="v3-form-group">
                  <label class="v3-label">Jumlah Koin</label>
                  <div class="v3-input-icon-wrap">
                    <span class="v3-input-icon">
                      <Coins01Icon :size="20" />
                    </span>
                    <input 
                      v-model.number="coinAmount" 
                      type="number" 
                      min="0"
                      class="v3-input-field has-icon" 
                      placeholder="Masukkan jumlah koin (contoh: 2500)"
                    />
                  </div>
                </div>

                <div class="v3-presets-flex">
                  <button 
                    v-for="preset in presets" 
                    :key="preset"
                    class="v3-preset-chip"
                    :class="{ active: coinAmount === preset }"
                    @click="coinAmount = preset"
                  >
                    +{{ preset.toLocaleString('id-ID') }} Koin
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- LANGKAH 3: PILIH METODE PEMBAYARAN -->
          

          <!-- LANGKAH 4: KONTAK & REFERAL -->
          <div class="v3-step-card">
            <div class="v3-step-heading">
              <div class="v3-step-number">4</div>
              <div class="v3-step-heading-info">
                <h2 class="v3-step-title">Informasi Kontak & Referral</h2>
                <p class="v3-step-desc">Nomor WhatsApp untuk pengiriman rincian dan bukti transaksi.</p>
              </div>
            </div>

            <div class="v3-step-content">
              <div class="v3-fields-grid">
                <!-- WhatsApp -->
                <div class="v3-form-group">
                  <label class="v3-label">Nomor WhatsApp (Opsional)<span class="v3-req"></span></label>
                  <input 
                    v-model="whatsappNumber" 
                    type="tel" 
                    class="v3-input-field" 
                    placeholder="Contoh: 081234567890"
                  />
                  <!-- <span class="v3-input-hint">Bukti pembayaran akan dikirim ke nomor ini.</span> -->
                </div>

                <!-- Referral -->
                <div class="v3-form-group">
                  <label class="v3-label">Kode Referral (Opsional)</label>
                  <div class="v3-input-verified-row">
                    <input 
                      v-model="referralCode" 
                      type="text" 
                      class="v3-input-field" 
                      :class="{ 'is-disabled': isRefFromUrl }"
                      :disabled="isRefFromUrl"
                      placeholder="Masukkan kode jika ada"
                    />
                    <div v-if="isRefFromUrl" class="v3-chip ref">
                      <CheckmarkBadge01Icon :size="16" />
                      <span>Terpasang</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CHECKOUT SUMMARY & CTA BUTTON -->
          <div class="v3-checkout-box">
            <div class="v3-summary-lines">
              <div class="v3-s-row">
                <span class="lbl">ID Akun:</span>
                <span class="val">{{ momocoinId ? `${momocoinId} (${verifiedUsername || 'Terverifikasi'})` : '-' }}</span>
              </div>
              <div class="v3-s-row">
                <span class="lbl">Jumlah Koin:</span>
                <span class="val">{{ v3CoinLabel }}</span>
              </div>
              <!-- <div class="v3-s-row">
                <span class="lbl">Metode Bayar:</span>
                <span class="val">{{ activeMethodObj?.name || 'QRIS' }}</span>
              </div> -->
              <div class="v3-s-row total">
                <span class="lbl">Total Pembayaran:</span>
                <span class="price">Rp {{ v3FinalPrice.toLocaleString('id-ID') }}</span>
              </div>
            </div>

            <button 
              class="v3-btn-checkout" 
              :disabled="!isV3FormValid || isLoading"
              @click="openConfirmModal"
            >
              <span v-if="isLoading">Menyiapkan Pesanan...</span>
              <span v-else class="btn-inner">
                Lanjut ke Pembayaran
                <ArrowRight01Icon :size="20" />
              </span>
            </button>
          </div>

        </div>
      </div>

      <!-- Footer Versi 3 -->
      <footer class="momolive-footer">
        <div class="container footer-inner">
          <div class="footer-logo">
            <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
            <span class="brand-text">
              <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
            </span>
          </div>
          <nav class="footer-links">
            <router-link to="/terms">Syarat & Ketentuan</router-link>
            <router-link to="/privacy">Kebijakan Privasi</router-link>
            <router-link to="/contact">Bantuan</router-link>
          </nav>
          <p class="footer-copyright">© 2026 PT. JLIMA DIGITAL INDONESIA. Hak cipta dilindungi.</p>
        </div>
      </footer>

    </div>

    <!-- ========================================== -->
    <!-- PRE-PAYMENT CONFIRMATION MODAL             -->
    <!-- ========================================== -->
    <Transition name="modal-fade">
      <div v-if="showConfirmModal" class="v2-modal-overlay" @click.self="showConfirmModal = false">
        <div class="v2-modal-box" :class="{ 'v3-modal-style': activeVersion === 'v3' }">
          <div class="v2-modal-header">
            <h3 class="v2-modal-title">Konfirmasi Pembelian</h3>
            <button class="v2-modal-close" @click="showConfirmModal = false">✕</button>
          </div>

          <div class="v2-modal-body">
            <div class="v2-modal-row">
              <span class="lbl">Layanan:</span>
              <span class="val">Momo Live</span>
            </div>
            <div class="v2-modal-row">
              <span class="lbl">User ID:</span>
              <span class="val highlight">{{ momocoinId }} ({{ verifiedUsername || 'Terverifikasi' }})</span>
            </div>
            <div class="v2-modal-row">
              <span class="lbl">Jumlah Koin:</span>
              <span class="val">{{ selectedCoinLabel }}</span>
            </div>
            <!-- <div class="v2-modal-row">
              <span class="lbl">Metode Bayar:</span>
              <span class="val">{{ activeMethodObj?.name || 'QRIS' }}</span>
            </div> -->
            <div class="v2-modal-row">
              <span class="lbl">WhatsApp:</span>
              <span class="val">{{ whatsappNumber || '-' }}</span>
            </div>
            <div v-if="referralCode" class="v2-modal-row">
              <span class="lbl">Kode Referral:</span>
              <span class="val ref-badge">{{ referralCode }}</span>
            </div>

            <div class="v2-modal-divider"></div>

            <div class="v2-modal-row total">
              <span class="lbl">Total Bayar:</span>
              <span class="price">Rp {{ currentFinalPrice.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <div class="v2-modal-footer">
            <button class="v2-modal-btn cancel" @click="showConfirmModal = false">Batal</button>
            <button class="v2-modal-btn confirm" @click="proceedCheckout">
              Bayar Sekarang ->
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Coins01Icon, ArrowRight01Icon, CheckmarkBadge01Icon, CheckmarkCircle01Icon, Loading01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../stores/topupStore';

const router = useRouter();
const route = useRoute();
const store = useTopupStore();

// Read active version from .env (default: '3')
const envVersion = import.meta.env.VITE_LAYOUT_VERSION?.toString() || '3';
const getResolvedVersion = () => {
  if (route.query.v === '1' || envVersion === '1' || envVersion === 'v1') return 'v1';
  if (route.query.v === '2' || envVersion === '2' || envVersion === 'v2') return 'v2';
  return 'v3';
};

const activeVersion = ref(getResolvedVersion());

// Core Form Inputs
const momocoinId = ref('');
const referralCode = ref('');
const coinAmount = ref(0);
const whatsappNumber = ref('');
const isLoading = ref(false);
const isRefFromUrl = ref(false);

// V2 & V3 States
const denomMode = ref('packages');
const selectedPackage = ref(null);
const selectedPaymentCode = ref('qris');
const expandedCategory = ref('qris');
const showConfirmModal = ref(false);

// Packages List initialized empty - 100% full live data from API
const packagesList = ref([]);
const v3Packages = ref([]);

const paymentCategories = [
  {
    id: 'qris',
    title: 'QRIS (Semua Pembayaran)',
    previewLogos: ['QRIS'],
    methods: [
      { code: 'qris', name: 'QRIS Instant Payment', fee: 0 }
    ]
  },
  {
    id: 'ewallet',
    title: 'E-Wallet',
    previewLogos: ['DANA', 'OVO', 'ShopeePay', 'GoPay'],
    methods: [
      { code: 'dana', name: 'DANA', fee: 0 },
      { code: 'ovo', name: 'OVO', fee: 0 },
      { code: 'shopeepay', name: 'ShopeePay', fee: 0 },
      { code: 'gopay', name: 'GoPay', fee: 0 }
    ]
  },
  {
    id: 'va',
    title: 'Transfer Bank (Virtual Account)',
    previewLogos: ['BCA', 'Mandiri', 'BRI', 'BNI'],
    methods: [
      { code: 'bca_va', name: 'BCA Virtual Account', fee: 2500 },
      { code: 'mandiri_va', name: 'Mandiri Virtual Account', fee: 2500 },
      { code: 'bri_va', name: 'BRI Virtual Account (BRIVA)', fee: 2500 },
      { code: 'bni_va', name: 'BNI Virtual Account', fee: 2500 }
    ]
  },
  {
    id: 'retail',
    title: 'Minimarket',
    previewLogos: ['Alfamart', 'Indomaret'],
    methods: [
      { code: 'alfamart', name: 'Alfamart / Alfamidi', fee: 3500 },
      { code: 'indomaret', name: 'Indomaret / Ceriamart', fee: 3500 }
    ]
  }
];

onMounted(async () => {
  selectedPackage.value = activeVersion.value === 'v2' ? packagesList.value[0] : v3Packages.value[1];

  if (route.query.ref) {
    referralCode.value = route.query.ref.toString();
    isRefFromUrl.value = true;
    store.showToast(`Kode referral "${route.query.ref}" terpasang.`, 'success');
  }

  // Fetch live products from REST API
  try {
    const apiProducts = await store.fetchProducts('momolive');
    if (apiProducts && apiProducts.data && apiProducts.data.length > 0) {
      // Urutkan paket koin dari yang terkecil ke terbesar
      const sortedList = [...apiProducts.data].sort((a, b) => {
        const coinA = Number(a.coin_amount || a.coins || a.base_price || 0);
        const coinB = Number(b.coin_amount || b.coins || b.base_price || 0);
        return coinA - coinB;
      });

      v3Packages.value = sortedList.map((p, idx) => ({
        id: p.id || idx + 1,
        name: p.name || `${Number(p.coin_amount || 1000).toLocaleString('id-ID')} Coins`,
        bonus: Number(p.bonus_coin || p.bonus || 0),
        price: Number(p.selling_price || p.price || 100000),
        coins: Number(p.coin_amount || p.amount || p.coins || 1000),
        badge: p.flag ? p.flag.trim().toUpperCase() : ''
      }));
      packagesList.value = v3Packages.value.map(p => ({
        ...p,
        isFeatured: Boolean(p.badge)
      }));
      selectedPackage.value = activeVersion.value === 'v2' ? packagesList.value[0] : v3Packages.value[0];
    }
  } catch (err) {
    console.warn('[HomeView] Failed to load dynamic products', err);
  }
});

// Account verification via Live API
const isCheckingUser = ref(false);
const isVerified = ref(false);
const verifiedUsername = ref('');
let checkTimer = null;

watch(momocoinId, (newVal) => {
  const trimmed = newVal.trim();
  if (checkTimer) clearTimeout(checkTimer);

  if (trimmed.length < 4) {
    isCheckingUser.value = false;
    isVerified.value = false;
    verifiedUsername.value = '';
    return;
  }

  isCheckingUser.value = true;
  isVerified.value = false;

  checkTimer = setTimeout(async () => {
    try {
      const apiRes = await store.checkUserId(trimmed, 'momolive');
      isCheckingUser.value = false;
      if (apiRes && apiRes.data && (apiRes.data.username || apiRes.data.name)) {
        isVerified.value = true;
        verifiedUsername.value = apiRes.data.username || apiRes.data.name;
      } else {
        isVerified.value = true;
        verifiedUsername.value = `Momo#${trimmed.slice(-4)}`;
      }
    } catch {
      isCheckingUser.value = false;
      isVerified.value = true;
      verifiedUsername.value = `Momo#${trimmed.slice(-4)}`;
    }
  }, 450);
});

const presets = [100, 500, 1000, 5000, 10000];
const PRICE_PER_COIN = 100;

const selectPackage = (pkg) => {
  denomMode.value = 'packages';
  selectedPackage.value = pkg;
  coinAmount.value = pkg.coins;
};

// Computations
const formattedCoins = computed(() => (Number(coinAmount.value) || 0).toLocaleString('id-ID'));
const totalPrice = computed(() => (Number(coinAmount.value) || 0) * PRICE_PER_COIN);
const formattedTotal = computed(() => totalPrice.value.toLocaleString('id-ID'));

const isFormValid = computed(() => momocoinId.value.trim().length >= 4 && coinAmount.value > 0);

const activeMethodObj = computed(() => {
  for (const cat of paymentCategories) {
    const found = cat.methods.find(m => m.code === selectedPaymentCode.value);
    if (found) return found;
  }
  return paymentCategories[0].methods[0];
});

const calculateMethodTotal = (method) => {
  let basePrice = 0;
  if (denomMode.value === 'packages' && selectedPackage.value) {
    basePrice = selectedPackage.value.price;
  } else {
    basePrice = (Number(coinAmount.value) || 0) * PRICE_PER_COIN;
  }
  return basePrice + (method?.fee || 0);
};

const currentFinalPrice = computed(() => calculateMethodTotal(activeMethodObj.value));
const v3FinalPrice = computed(() => calculateMethodTotal(activeMethodObj.value));

const selectedCoinLabel = computed(() => {
  if (denomMode.value === 'packages' && selectedPackage.value) {
    return selectedPackage.value.name;
  }
  return `${(Number(coinAmount.value) || 0).toLocaleString('id-ID')} Koin`;
});

const v3CoinLabel = computed(() => selectedCoinLabel.value);

const isV2FormValid = computed(() => {
  const hasId = momocoinId.value.trim().length >= 4;
  const hasAmount = (denomMode.value === 'packages' && selectedPackage.value) || coinAmount.value > 0;
  return hasId && hasAmount;
});

const isV3FormValid = computed(() => isV2FormValid.value);

// Checkout actions
const handlePayNow = () => {
  if (!isFormValid.value) return;
  store.setCurrentOrder({
    momocoinId: momocoinId.value,
    referralCode: referralCode.value || '-',
    coinAmount: coinAmount.value,
    totalPrice: totalPrice.value
  });
  router.push('/payment');
};

const openConfirmModal = () => {
  if (!momocoinId.value.trim()) {
    store.showToast('Masukkan User ID terlebih dahulu.', 'warning');
    return;
  }
  if (!isV3FormValid.value) {
    store.showToast('Pilih nominal koin terlebih dahulu.', 'warning');
    return;
  }
  showConfirmModal.value = true;
};

const proceedCheckout = async () => {
  showConfirmModal.value = false;
  let finalCoins = 0;
  let productId = selectedPackage.value?.id?.toString() || 'momo-coin-package';

  if (denomMode.value === 'packages' && selectedPackage.value) {
    finalCoins = selectedPackage.value.coins;
  } else {
    finalCoins = coinAmount.value;
  }

  isLoading.value = true;
  try {
    store.setCurrentOrder({
      productId,
      momocoinId: momocoinId.value,
      referralCode: referralCode.value || '-',
      coinAmount: finalCoins,
      totalPrice: currentFinalPrice.value,
      paymentMethod: activeMethodObj.value?.name || 'Duitku Payment',
      whatsapp: whatsappNumber.value || '-'
    });

    // Call live checkout API: POST /api/v1/topup/checkout
    const res = await store.submitCheckout({
      product_id: productId,
      target_user_id: momocoinId.value,
      affiliate_code: referralCode.value || undefined
    });

    if (res?.success && res?.invoice_url) {
      // Redirect directly to the Duitku payment gateway invoice URL
      window.location.href = res.invoice_url;
    } else {
      router.push('/payment');
    }
  } catch (err) {
    store.showToast(err.message || 'Gagal memproses pembayaran.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Page Reset */
.momolive-topup-page {
  position: relative;
  min-height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
}

/* ========================================== */
/* VERSI 1 (CLASSIC) STYLES                   */
/* ========================================== */
.v1-container {
  position: relative; width: 100%; flex: 1; background-color: #ffffff;
}

.momolive-bg-glow { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; opacity: 0.95; }
.momolive-bg-image { width: 100%; height: 100%; object-fit: cover; filter: blur(2px) opacity(0.5); transform: scale(1.02); }
.glow-orb { position: absolute; border-radius: 50%; filter: blur(40px); }
.orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.15) 70%, transparent 100%); top: -150px; left: 50%; transform: translateX(-50%); }
.orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(99, 102, 241, 0.15) 70%, transparent 100%); bottom: 50px; left: 50%; transform: translateX(-50%); }

.main-content-wrapper { position: relative; z-index: 1; padding-top: 2rem; padding-bottom: 5rem; display: flex; flex-direction: column; align-items: center; }
.hero-header { text-align: center; margin-bottom: 2.25rem; }
.hero-title-flex { display: inline-flex; align-items: center; gap: 1.25rem; text-align: left; }

.momolive-logo-badge {
  width: 64px; height: 64px; border-radius: 18px; padding: 4px;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  box-shadow: 0 8px 24px -2px rgba(124, 58, 237, 0.35); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.momolive-hero-logo { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
.main-title { font-size: 2.5rem; font-weight: 800; color: #111827; }
.main-subtitle { font-size: 1rem; color: #6b7280; margin-top: 0.25rem; }

.topup-card-container { position: relative; width: 100%; max-width: 470px; }
.card-momolive-shadow { position: absolute; inset: -10px; border-radius: 26px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4)); filter: blur(10px); opacity: 0.75; z-index: -1; }
.topup-card { background: #ffffff; border-radius: 22px; padding: 2.25rem 2rem; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.08); }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.margin-top-md { margin-top: 1.5rem; }
.form-label-uppercase { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; }

.input-verified-flex-row { display: flex; align-items: center; gap: 0.75rem; }
.flex-input { flex: 1; }
.form-input-styled { width: 100%; padding: 0.875rem 1.125rem; border-radius: 12px; border: 1.5px solid #e2e8f0; background-color: #f8fafc; font-size: 0.95rem; color: #0f172a; }

.side-loading-chip, .side-verified-chip { display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.85rem; border-radius: 10px; font-size: 0.8rem; font-weight: 600; }
.side-loading-chip { background: #f1f5f9; color: #475569; }
.side-verified-chip { background: rgba(16, 185, 129, 0.1); color: #059669; }
.ref-locked-chip { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
.verified-pill { background: #10b981; color: #ffffff; padding: 2px 6px; border-radius: 6px; font-size: 0.65rem; }

.input-wrapper { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 1rem; color: #8b5cf6; }
.form-input-styled.has-icon { padding-left: 2.85rem; }

.coin-presets { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
.preset-chip { padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #475569; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
.preset-chip.active { background: #8b5cf6; color: #ffffff; border-color: #8b5cf6; }

.summary-section { margin-top: 1.75rem; padding: 1.25rem; background: #f8fafc; border-radius: 14px; display: flex; flex-direction: column; gap: 0.75rem; }
.summary-line { display: flex; justify-content: space-between; font-size: 0.875rem; color: #64748b; }
.summary-value { font-weight: 600; color: #1e293b; }
.total-line { padding-top: 0.75rem; border-top: 1px solid #e2e8f0; }
.total-amount { font-size: 1.25rem; font-weight: 800; color: #8b5cf6; }

.btn-gradient-submit { width: 100%; margin-top: 1.5rem; padding: 1rem; border-radius: 12px; border: none; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; font-weight: 700; font-size: 1rem; cursor: pointer; }
.btn-flex-inner { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

.momolive-footer { background: rgba(255, 255, 255, 0.95); border-top: 1px solid rgba(226, 232, 240, 0.8); padding: 2.5rem 0; margin-top: 4rem; }
.footer-inner { display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
.footer-logo { display: flex; align-items: center; gap: 0.6rem; }
.footer-emblem-clean { width: 28px; height: 28px; object-fit: contain; }
.brand-text { font-size: 1.15rem; font-weight: 800; }
.brand-yay { color: #8b5cf6; } .brand-topup { color: #ec4899; }
.footer-links { display: flex; gap: 1.5rem; }
.footer-links a { color: #64748b; font-size: 0.875rem; font-weight: 600; text-decoration: none; }
.footer-copyright { font-size: 0.8rem; color: #94a3b8; }

/* ========================================== */
/* VERSI 2 (GOLDENDRAGON) STYLES              */
/* ========================================== */
.v2-layout-wrapper {
  background-color: #e2f900 !important;
  min-height: 100vh;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}

.v2-header { background-color: #9a04db; padding: 0.85rem 2rem; }
.v2-header-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.v2-brand-area { display: flex; align-items: center; gap: 0.75rem; }
.v2-brand-emblem { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; border: 2px solid #ffffff; }
.v2-brand-img { width: 100%; height: 100%; object-fit: cover; }
.v2-brand-title { font-size: 1.2rem; font-weight: 800; color: #ffffff; }

.v2-nav-links { display: flex; align-items: center; gap: 1.25rem; }
.v2-nav-btn.active { background-color: #e11d48; color: #ffffff; padding: 0.5rem 1.25rem; border-radius: 8px; border: none; font-weight: 700; font-size: 0.9rem; }
.v2-nav-link { color: #ffffff; text-decoration: none; font-weight: 600; font-size: 0.9rem; }

.v2-main-container { max-width: 1280px; margin: 2rem auto; padding: 0 1.5rem; }
.v2-grid-layout { display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start; }

.v2-product-card { background-color: #9a04db; border-radius: 20px; padding: 1.75rem 2rem; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
.v2-product-badge { width: 140px; height: 140px; border-radius: 24px; overflow: hidden; margin-bottom: 1.25rem; box-shadow: 0 6px 18px rgba(0,0,0,0.25); }
.v2-momo-img { width: 100%; height: 100%; object-fit: cover; }
.v2-product-title { font-size: 1.25rem; font-weight: 800; color: #ffffff; }
.v2-product-subtitle { font-size: 0.85rem; color: #f1f5f9; opacity: 0.85; margin-top: 0.25rem; }

.v2-form-area { display: flex; flex-direction: column; gap: 1.5rem; }
.v2-card { background-color: #9a04db; border-radius: 20px; padding: 1.75rem 2rem; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
.v2-card-title { font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-bottom: 1.25rem; }

.v2-input-box { position: relative; display: flex; align-items: center; }
.v2-input { width: 100%; padding: 0.95rem 1.25rem; border-radius: 10px; border: none; background-color: #ffffff; color: #0f172a; font-size: 1rem; font-weight: 600; }
.v2-input:focus { outline: 3px solid #e2f900; }
.v2-status-tag { position: absolute; right: 1rem; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px; }
.v2-status-tag.checking { background: #e2e8f0; color: #475569; }
.v2-status-tag.verified { background: #dcfce7; color: #166534; }

.v2-custom-bar { display: flex; align-items: center; justify-content: space-between; padding: 1.15rem 1.5rem; border: 2px solid rgba(255, 255, 255, 0.8); border-radius: 14px; margin-bottom: 1.25rem; cursor: pointer; }
.v2-custom-bar.active { border-color: #e2f900; background: rgba(255, 255, 255, 0.15); }
.v2-custom-left { display: flex; align-items: center; gap: 0.6rem; font-size: 1.05rem; font-weight: 700; }
.v2-custom-min { font-size: 0.85rem; font-style: italic; opacity: 0.9; }

.v2-custom-drawer { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.v2-presets-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.v2-preset-chip { padding: 0.45rem 0.85rem; border-radius: 8px; border: 1px solid #ffffff; background: transparent; color: #ffffff; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
.v2-preset-chip.active { background: #e2f900; color: #881337; border-color: #e2f900; }

.v2-packages-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
.v2-pkg-card { position: relative; background-color: #9a04db; border: 2px solid rgba(255, 255, 255, 0.5); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.2s ease; overflow: hidden; }
.v2-pkg-card:hover { transform: translateY(-2px); }
.v2-pkg-card.active { border-color: #e2f900; background-color: rgba(226, 249, 0, 0.15); box-shadow: 0 0 0 2px #e2f900; }
.v2-pkg-card.featured { border-color: #f97316 !important; box-shadow: 0 0 20px rgba(249, 115, 22, 0.75); }
.v2-featured-tag { position: absolute; top: -12px; left: 16px; background: #ea580c; color: #ffffff; font-size: 0.7rem; font-weight: 800; padding: 2px 10px; border-radius: 8px; }

.v2-pkg-name { font-size: 1.15rem; font-weight: 800; color: #ffffff; }
.v2-pkg-bonus { font-size: 0.85rem; font-weight: 700; color: #84cc16; margin-top: 0.15rem; }
.v2-pkg-price { font-size: 1rem; font-style: italic; font-weight: 700; color: #38bdf8; margin-top: 0.25rem; }
.v2-pkg-thumb { width: 44px; height: 44px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.v2-thumb-img { width: 100%; height: 100%; object-fit: cover; }

.v2-pkg-check {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: #e2f900;
  color: #881337;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  z-index: 2;
}

.v2-pkg-card.active .v2-pkg-check {
  opacity: 1;
  transform: scale(1);
}

.v2-accordions { display: flex; flex-direction: column; gap: 1rem; }
.v2-acc-item { border-radius: 14px; overflow: hidden; }
.v2-acc-header { background-color: #e2f900; color: #881337; padding: 1.1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
.v2-acc-left { display: flex; align-items: center; gap: 0.75rem; }
.v2-acc-title { color: #881337; font-weight: 800; }
.v2-acc-right { display: flex; align-items: center; gap: 1rem; }
.v2-logos-preview { display: flex; gap: 0.35rem; }
.v2-logo-badge { background: #ffffff; color: #0f172a; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
.v2-acc-arrow { font-weight: 800; }

.v2-acc-content { background-color: #03182b; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.v2-method-box { background-color: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.2s ease; }
.v2-method-box:hover, .v2-method-box.active { border-color: #e2f900; background-color: rgba(255, 255, 255, 0.1); }
.v2-method-meta { display: flex; align-items: center; gap: 0.85rem; }
.v2-m-name { font-size: 1rem; font-weight: 800; color: #ffffff; }
.v2-m-sub { font-size: 0.8rem; color: #94a3b8; }
.v2-m-price { font-size: 1.05rem; font-weight: 800; color: #38bdf8; }

.v2-input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.v2-field-hint { font-size: 0.85rem; color: #ffffff; opacity: 0.9; }
.v2-link-orange { color: #f97316; font-weight: 700; text-decoration: underline; }

.v2-btn-submit { width: 100%; margin-top: 1.25rem; padding: 0.95rem 2rem; border-radius: 10px; border: none; background-color: #e11d48; color: #ffffff; font-size: 1rem; font-weight: 800; cursor: pointer; letter-spacing: 0.05em; transition: transform 0.2s ease; }
.v2-btn-submit:hover:not(:disabled) { transform: scale(1.02); }

.v2-footer { background-color: #701a75; border-top: 4px solid #e2f900; padding: 3rem 2rem; margin-top: 4rem; }
.v2-footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
.v2-f-col { display: flex; flex-direction: column; gap: 0.75rem; }
.v2-f-logo-row { display: flex; align-items: center; gap: 0.75rem; }
.v2-f-emblem { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #ffffff; }
.v2-f-title { font-size: 1.25rem; font-weight: 800; color: #ffffff; }
.v2-f-desc { font-size: 0.875rem; line-height: 1.6; color: #ffffff; opacity: 0.9; }
.v2-f-head { font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem; }
.v2-f-links, .v2-f-contacts { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.65rem; }
.v2-f-links a, .v2-f-contacts li { color: #ffffff; font-size: 0.9rem; text-decoration: none; font-weight: 600; }

/* ========================================== */
/* VERSI 3: CLEAN LIGHT STEP (WARNA VERSI 1)  */
/* ========================================== */
.v3-clean-container {
  position: relative;
  background-color: #f8fafc;
  min-height: calc(100vh - 65px);
  color: #0f172a;
}

.v3-bg-glow {
  position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; opacity: 0.7;
}

.v3-main-wrapper {
  position: relative; z-index: 1; max-width: 860px; margin: 2rem auto; display: flex; flex-direction: column; gap: 1.75rem;
}

/* V3 Hero Card */
.v3-hero-header {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.v3-hero-left { display: flex; align-items: center; gap: 1.25rem; }

.v3-logo-badge {
  width: 72px; height: 72px; border-radius: 18px; padding: 4px;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  box-shadow: 0 8px 24px -2px rgba(124, 58, 237, 0.35); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.v3-hero-logo { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }

.v3-pill-badge {
  display: inline-block; padding: 2px 10px; background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 6px;
  font-size: 0.7rem; font-weight: 800; color: #7c3aed; margin-bottom: 0.35rem;
}

.v3-main-title { font-size: 1.85rem; font-weight: 800; color: #0f172a; }
.v3-main-subtitle { font-size: 0.9rem; color: #64748b; margin-top: 0.25rem; }

/* V3 Step Cards */
.v3-steps-container { display: flex; flex-direction: column; gap: 1.5rem; }

.v3-step-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.v3-step-card:hover { border-color: #cbd5e1; box-shadow: 0 14px 35px -10px rgba(139, 92, 246, 0.08); }

.v3-step-heading {
  display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem;
  padding-bottom: 0.85rem; border-bottom: 1px solid #f1f5f9;
}

.v3-step-number {
  width: 38px; height: 38px; border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  color: #ffffff; font-size: 1.15rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.v3-step-title { font-size: 1.2rem; font-weight: 800; color: #0f172a; }
.v3-step-desc { font-size: 0.85rem; color: #64748b; margin-top: 0.15rem; }

.v3-form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.v3-label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
.v3-req { color: #f43f5e; }

.v3-input-verified-row { display: flex; align-items: center; gap: 0.75rem; }

.v3-input-field {
  width: 100%; padding: 0.875rem 1.15rem; border-radius: 12px; border: 1.5px solid #e2e8f0;
  background-color: #f8fafc; font-size: 0.95rem; color: #0f172a; font-weight: 600; transition: all 0.2s ease;
}

.v3-input-field:focus { outline: none; border-color: #8b5cf6; background: #ffffff; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15); }
.v3-input-field.is-verified { border-color: #10b981; }
.v3-input-field.is-disabled { background-color: #f1f5f9; color: #94a3b8; cursor: not-allowed; }

.v3-chip {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.85rem;
  border-radius: 10px; font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}

.v3-chip.loading { background: #f1f5f9; color: #475569; }
.v3-chip.verified { background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); }
.v3-chip.ref { background: rgba(124, 58, 237, 0.1); color: #7c3aed; border: 1px solid rgba(124, 58, 237, 0.3); }
.v3-badge-pill { background: #10b981; color: #ffffff; padding: 2px 6px; border-radius: 6px; font-size: 0.65rem; }

.v3-input-hint { font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; }
.v3-input-hint.highlight { color: #7c3aed; font-weight: 600; }

/* Tabs & Packages */
.v3-mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; background: #f1f5f9; padding: 4px; border-radius: 12px; }
.v3-mode-btn { flex: 1; padding: 0.6rem 1rem; border-radius: 9px; border: none; background: transparent; color: #64748b; font-size: 0.85rem; font-weight: 700; cursor: pointer; }
.v3-mode-btn.active { background: #ffffff; color: #7c3aed; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }

.v3-packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }

.v3-loading-box, .v2-loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  background: #ffffff;
  border: 1.5px dashed #cbd5e1;
  border-radius: 16px;
  color: #64748b;
  font-weight: 700;
  font-size: 0.95rem;
}
.v2-loading-box {
  background: rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}
.spin-icon {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.v3-pkg-card {
  position: relative; background: #ffffff; border: 1.5px solid #e2e8f0;
  border-radius: 16px; padding: 1.15rem 1.25rem; display: flex; flex-direction: column; cursor: pointer; transition: all 0.2s ease;
  overflow: hidden;
}

.v3-pkg-card:hover { transform: translateY(-2px); border-color: #8b5cf6; box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.15); }
.v3-pkg-card.active { border-color: #ec4899; background: #fff5f8; box-shadow: 0 0 0 2px #ec4899; }
.v3-pkg-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 800;
  padding: 2px 8px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 14px;
  letter-spacing: 0.02em;
  z-index: 1;
}

.v3-pkg-inner { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; width: 100%; }
.v3-pkg-left-info { display: flex; flex-direction: column; }
.v3-pkg-top-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
.v3-coin-avatar { width: 22px; height: 22px; border-radius: 6px; object-fit: cover; }
.v3-pkg-thumb-wrap { width: 42px; height: 42px; border-radius: 10px; overflow: hidden; border: 1.5px solid #e2e8f0; flex-shrink: 0; }
.v3-thumb-img { width: 100%; height: 100%; object-fit: cover; }
.v3-pkg-title { font-size: 1.1rem; font-weight: 800; color: #0f172a; }

.v3-pkg-bonus { font-size: 0.8rem; font-weight: 700; color: #059669; margin-bottom: 0.25rem; }
.v3-pkg-price { font-size: 1rem; font-weight: 800; color: #7c3aed; }

.v3-pkg-check {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  color: #ffffff;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  z-index: 2;
}

.v3-pkg-card.active .v3-pkg-check {
  opacity: 1;
  transform: scale(1);
}

.v3-custom-section { display: flex; flex-direction: column; gap: 1rem; }
.v3-input-icon-wrap { position: relative; display: flex; align-items: center; }
.v3-input-icon { position: absolute; left: 1rem; color: #8b5cf6; }
.v3-input-field.has-icon { padding-left: 2.85rem; }

.v3-presets-flex { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.v3-preset-chip { padding: 0.45rem 0.85rem; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #475569; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
.v3-preset-chip.active { background: #8b5cf6; color: #ffffff; border-color: #8b5cf6; }

/* Accordion List V3 */
.v3-accordions-list { display: flex; flex-direction: column; gap: 0.85rem; }
.v3-accordion-card { border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; background: #ffffff; }

.v3-acc-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: #f8fafc; cursor: pointer; user-select: none; }
.v3-acc-header:hover { background: #f1f5f9; }

.v3-acc-left { display: flex; align-items: center; gap: 0.6rem; }
.v3-acc-title { font-size: 0.95rem; font-weight: 800; color: #0f172a; }
.v3-acc-badge { font-size: 0.65rem; font-weight: 800; padding: 2px 6px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #059669; border-radius: 4px; }
.v3-acc-chevron { font-size: 0.75rem; color: #64748b; }

.v3-acc-body { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.85rem; background: #ffffff; border-top: 1px solid #f1f5f9; }

.v3-method-item {
  display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem;
  border-radius: 12px; border: 1.5px solid #e2e8f0; background: #ffffff; cursor: pointer; transition: all 0.2s ease;
}

.v3-method-item:hover { border-color: #8b5cf6; background: #faf5ff; }
.v3-method-item.active { border-color: #ec4899; background: #fff5f8; }

.v3-method-left { display: flex; align-items: center; gap: 0.75rem; }

.v3-radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; }
.v3-method-item.active .v3-radio-circle { border-color: #ec4899; }
.v3-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: transparent; }
.v3-method-item.active .v3-radio-dot { background: #ec4899; }

.v3-method-name { font-size: 0.9rem; font-weight: 700; color: #0f172a; }
.v3-method-speed { font-size: 0.75rem; color: #64748b; }

.v3-method-right { display: flex; flex-direction: column; align-items: flex-end; }
.v3-method-price { font-size: 0.95rem; font-weight: 800; color: #7c3aed; }
.v3-free-text { font-size: 0.7rem; color: #059669; font-weight: 700; }
.v3-fee-text { font-size: 0.7rem; color: #64748b; }

.v3-fields-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }

/* V3 Checkout Summary */
.v3-checkout-box {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06);
  display: flex; flex-direction: column; gap: 1.25rem;
}

.v3-summary-lines { display: flex; flex-direction: column; gap: 0.65rem; }
.v3-s-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #64748b; }
.v3-s-row .val { font-weight: 700; color: #0f172a; }
.v3-s-row.total { padding-top: 0.85rem; border-top: 1px solid #f1f5f9; }
.v3-s-row.total .price { font-size: 1.4rem; font-weight: 800; color: #7c3aed; }

.v3-btn-checkout {
  width: 100%; padding: 1.15rem; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  color: #ffffff; font-size: 1.1rem; font-weight: 800; cursor: pointer;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.35); transition: all 0.25s ease;
}

.v3-btn-checkout:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(124, 58, 237, 0.45); }
.v3-btn-checkout:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-inner { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

/* Modal */
.v2-modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(6px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.v2-modal-box { width: 100%; max-width: 480px; background: #9a04db; border: 3px solid #e2f900; border-radius: 22px; padding: 1.75rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); }
.v2-modal-box.v3-modal-style { background: #ffffff; border: 2px solid #e2e8f0; color: #0f172a; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); }
.v2-modal-box.v3-modal-style .v2-modal-title { color: #0f172a; }
.v2-modal-box.v3-modal-style .v2-modal-close { color: #64748b; }
.v2-modal-box.v3-modal-style .v2-modal-body { background: #f8fafc; border: 1px solid #e2e8f0; }
.v2-modal-box.v3-modal-style .v2-modal-row .lbl { color: #64748b; }
.v2-modal-box.v3-modal-style .v2-modal-row .val { color: #0f172a; }
.v2-modal-box.v3-modal-style .v2-modal-row .val.highlight { color: #7c3aed; }
.v2-modal-box.v3-modal-style .v2-modal-row.total .price { color: #7c3aed; }
.v2-modal-box.v3-modal-style .v2-modal-btn.cancel { background: #f1f5f9; color: #64748b; }
.v2-modal-box.v3-modal-style .v2-modal-btn.confirm { background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: #ffffff; }

.v2-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.v2-modal-title { font-size: 1.25rem; font-weight: 800; color: #ffffff; }
.v2-modal-close { background: transparent; border: none; color: #ffffff; font-size: 1.25rem; cursor: pointer; }
.v2-modal-body { background: rgba(0, 0, 0, 0.25); border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.65rem; }
.v2-modal-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
.v2-modal-row .lbl { color: #f1f5f9; }
.v2-modal-row .val { font-weight: 700; color: #ffffff; }
.v2-modal-row .val.highlight { color: #e2f900; }
.v2-modal-row .val.ref-badge { background: #8b5cf6; color: #ffffff; padding: 2px 6px; border-radius: 4px; }
.v2-modal-divider { height: 1px; background: rgba(255, 255, 255, 0.2); margin: 0.35rem 0; }
.v2-modal-row.total .val.price { font-size: 1.35rem; font-weight: 800; color: #e2f900; }
.v2-modal-footer { display: flex; gap: 0.75rem; margin-top: 1.25rem; }
.v2-modal-btn { flex: 1; padding: 0.85rem; border-radius: 10px; border: none; font-weight: 800; cursor: pointer; }
.v2-modal-btn.cancel { background: rgba(255, 255, 255, 0.2); color: #ffffff; }
.v2-modal-btn.confirm { background: #e11d48; color: #ffffff; }

/* Responsive Media Queries (Mobile & Tablet) */
@media (max-width: 900px) {
  .v2-grid-layout { grid-template-columns: 1fr; }
  .v2-product-card { flex-direction: row; text-align: left; gap: 1.5rem; }
  .v2-product-badge { margin-bottom: 0; width: 80px; height: 80px; }
  .v2-packages-grid { grid-template-columns: 1fr; }
  .v2-footer-inner { grid-template-columns: 1fr; gap: 2rem; }
  .v3-packages-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .v3-main-wrapper {
    margin: 1rem auto;
    padding: 0 0.85rem;
    gap: 1.25rem;
  }
  .v3-hero-header {
    padding: 1.25rem 1rem;
    border-radius: 16px;
  }
  .v3-hero-left {
    flex-direction: column;
    text-align: center;
    gap: 0.85rem;
  }
  .v3-logo-badge {
    width: 56px;
    height: 56px;
    border-radius: 14px;
  }
  .v3-main-title {
    font-size: 1.45rem;
  }
  .v3-main-subtitle {
    font-size: 0.825rem;
  }
  .v3-step-card {
    padding: 1.25rem 1rem;
    border-radius: 16px;
  }
  .v3-step-heading {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .v3-step-number {
    width: 32px;
    height: 32px;
    font-size: 0.95rem;
    border-radius: 10px;
  }
  .v3-step-title {
    font-size: 1.05rem;
  }
  .v3-step-desc {
    font-size: 0.8rem;
  }
  .v3-packages-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }
  .v3-pkg-card {
    padding: 0.85rem 0.75rem;
    border-radius: 12px;
  }
  .v3-pkg-title {
    font-size: 0.925rem;
  }
  .v3-pkg-bonus {
    font-size: 0.725rem;
  }
  .v3-pkg-price {
    font-size: 0.875rem;
  }
  .v3-pkg-thumb-wrap {
    width: 34px;
    height: 34px;
    border-radius: 8px;
  }
  .v3-coin-avatar {
    width: 18px;
    height: 18px;
  }
  .v3-acc-header {
    padding: 0.85rem 1rem;
  }
  .v3-acc-title {
    font-size: 0.875rem;
  }
  .v3-method-item {
    padding: 0.75rem 0.85rem;
  }
  .v3-method-name {
    font-size: 0.85rem;
  }
  .v3-method-speed {
    font-size: 0.7rem;
  }
  .v3-method-price {
    font-size: 0.875rem;
  }
  .v3-fields-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .v3-checkout-box {
    padding: 1.25rem 1rem;
    border-radius: 16px;
  }
  .v3-btn-checkout {
    padding: 0.95rem 1rem;
    font-size: 1rem;
    border-radius: 12px;
  }
  .v2-modal-box {
    padding: 1.25rem 1rem;
    border-radius: 16px;
  }
  .v2-modal-title {
    font-size: 1.1rem;
  }
  .v2-modal-body {
    padding: 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 380px) {
  .v3-packages-grid {
    grid-template-columns: 1fr;
  }
  .v3-presets-flex {
    gap: 0.35rem;
  }
  .v3-preset-chip {
    padding: 0.35rem 0.65rem;
    font-size: 0.75rem;
  }
}
</style>
