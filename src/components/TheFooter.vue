<template>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <a icon-btn rel="noreferrer" href="https://github.com/lemoeJuice" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
  <div class="mx-auto mt-4 text-sm opacity-50">
    <footer class="bg-[#4a90e2] p-4 text-center text-white">
      <p>
        © 2025 Designed by WindySummer, with
        <a href="/about" class="underline">Vitesse</a> template.
      </p>
      <p>
        <a href="mailto:windysummer@example.com" class="underline">{{ $t('footer.contact_me') }}</a> |
        <a href="https://github.com/lemoeJuice" target="_blank" class="underline">GitHub</a>
      </p>
    </footer>
  </div>
</template>
