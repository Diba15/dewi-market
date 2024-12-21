<template>
  <div class="hero bg-accent">
    <div class="hero-content text-center text-[#3A2424]">
      <div class="max-w-md md:max-w-screen-lg p-9 rounded-xl my-5">
        <h1 class="text-3xl md:text-5xl font-bold pacifico">Pertanyaan Umum</h1>
        <div class="min-h-2 border-2 border-[#3A2424] bg-[#3A2424] rounded-full"></div>
      </div>
    </div>
  </div>

  <!-- Notification -->
  <Notivue v-slot="item">
    <Notification :item="item" :theme="pastelTheme">
      <NotificationProgress :item="item" />
    </Notification>
  </Notivue>

  <div class="-mt-8 flex flex-col justify-center gap-5 glass p-8 mx-5 md:mx-32 rounded-xl">
    <div class="collapse collapse-arrow bg-accent text-[#3A2424]">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div class="collapse-title text-xl font-bold">Bagaimana pembelian dilakukan?</div>
      <div class="collapse-content">
        <p>
          Sayangnya pembelian hanya baru bisa dilakukan melalui whatsapp, karena kami sedang dalam
          tahap pengembangan. Kamu bisa memilih produk yang kamu inginkan lalu klik tombol checkout,
          otomatis pesanan yang sudah kamu pilih akan dikirimkan melalui whatsapp.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-accent text-[#3A2424]">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-bold">Apa itu Dewi Market?</div>
      <div class="collapse-content">
        <p>
          Dewi Market, platform yang menyediakan berbagai jenis makanan berkualitas tinggi untuk
          memenuhi kebutuhan Anda. Kami berkomitmen untuk memberikan produk terbaik dan layanan yang
          memuaskan kepada setiap pelanggan.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-accent text-[#3A2424]">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-bold">Visi dan Misi Dewi Market</div>
      <div class="collapse-content">
        <p>
          Kami berdedikasi untuk menjaga standar kualitas yang tinggi dan selalu berusaha untuk
          memberikan pengalaman berbelanja yang menyenangkan dan mudah. Terima kasih telah memilih
          Dewi Market sebagai mitra belanja Anda. Kami berharap dapat terus melayani Anda dengan
          produk-produk terbaik dan layanan yang luar biasa.
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap flex-col md:flex-row items-start md:items-center justify-around mx-5 md:mx-32">
    <section>
      <div
        class="flex flex-col items-center max-w-fit md:max-w-fit text-center rounded-xl my-8 text-[#3A2424]"
      >
        <h1 class="text-2xl md:text-3xl font-bold pacifico">Alamat</h1>
        <div class="min-h-2 min-w-full border-2 border-[#3A2424] bg-[#3A2424] rounded-full"></div>
      </div>

      <div class="flex flex-row flex-wrap gap-10 justify-center">
        <div id="address" class="text-center flex flex-col gap-2">
          <div data-tip="Jl. Raya Bogor No. 123, Jakarta" @click="copyToClipboard('Jl. Raya Bogor No. 123, Jakarta')"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-map-marker text-3xl"></i>
          </div>
        </div>
        <div id="phone" class="text-center flex flex-col gap-2">
          <div data-tip="088889999" @click="copyToClipboard('088889999')"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-phone text-3xl"></i>
          </div>
        </div>
        <div id="email" class="text-center flex flex-col gap-2">
          <div data-tip="dewi_market@mail.com"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-envelope text-3xl"></i>
          </div>
      </div>
      </div>
    </section>
    <section>
      <div
        class="flex flex-col items-center max-w-fit md:max-w-fit text-center rounded-xl my-8 text-[#3A2424]"
      >
        <h1 class="text-2xl md:text-3xl font-bold pacifico">Social Media</h1>
        <div class="min-h-2 min-w-full border-2 border-[#3A2424] bg-[#3A2424] rounded-full"></div>
      </div>

      <div class="flex flex-row flex-wrap gap-10 justify-center">
        <div id="instagram" class="text-center flex flex-col gap-2">
          <div data-tip="@dewi_market99"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-instagram text-3xl"></i>
          </div>
        </div>
        <div id="whatsapp" class="text-center flex flex-col gap-2">
          <div data-tip="088889999"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-whatsapp text-3xl"></i>
          </div>
        </div>
        <div id="tiktok" class="text-center flex flex-col gap-2">
          <div data-tip="@dewi_market99"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-tiktok text-3xl"></i>
          </div>
        </div>
        <div id="facebook" class="text-center flex flex-col gap-2">
          <div data-tip="Dewi Market"
            class="tooltip tooltip-bottom tooltip-accent p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
          >
            <i class="pi pi-facebook text-3xl"></i>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="min-h-10"></div>
</template>

<style></style>

<script setup>
import { Notification, NotificationProgress, Notivue, pastelTheme, push } from 'notivue'

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  push.success('Berhasil Disalin')
}
</script>
