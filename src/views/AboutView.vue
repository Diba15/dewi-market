<template>
  <div class="hero bg-accent">
    <div class="hero-content text-center text-[#3A2424]">
      <div class="max-w-md md:max-w-screen-lg p-9 rounded-xl my-5">
        <h1 class="text-3xl md:text-5xl font-bold pacifico">Pertanyaan Umum</h1>
        <div class="min-h-2 border-2 border-[#3A2424] bg-[#3A2424] rounded-full"></div>
      </div>
    </div>
  </div>

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

  <section>
    <div
      class="flex flex-col items-center mx-auto max-w-fit md:max-w-fit text-center rounded-xl my-8 text-[#3A2424]"
    >
      <h1 class="text-3xl md:text-5xl font-bold pacifico">Social Media</h1>
      <div class="min-h-2 min-w-full border-2 border-[#3A2424] bg-[#3A2424] rounded-full"></div>
    </div>

    <div class="flex flex-row flex-wrap gap-10 justify-center">
      <div
        class="p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
      >
        <i class="pi pi-instagram text-5xl"></i>
      </div>
      <div
        class="p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
      >
        <i class="pi pi-whatsapp text-5xl"></i>
      </div>
      <div
        class="p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
      >
        <i class="pi pi-tiktok text-5xl"></i>
      </div>
      <div
        class="p-10 cursor-pointer rounded-full border-2 border-[#3A2424] max-w-fit text-[#3A2424] hover:bg-[#3A2424] hover:text-accent transition-all duration-300"
      >
        <i class="pi pi-facebook text-5xl"></i>
      </div>
    </div>
  </section>

  <div class="min-h-10"></div>
</template>

<style></style>

<script setup lang="ts">
</script>
