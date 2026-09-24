/**
 * Sargam Web - Application Entry Point
 * Initializes data, Audius API, UI components, and player defaults.
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🎶 Sargam Web initialized with Audius Engine');

  // Track APK download clicks separately for FOSS and GMS variants
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
      const filename = link.getAttribute('download') || link.getAttribute('href');
      const variant = filename.includes('Google-Cast') ? 'gms' : 'foss';

      // Increment local tracker state
      const key = `sargam_dl_${variant}`;
      const current = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, (current + 1).toString());

      // Ping Cloudflare Worker tracking endpoint asynchronously
      fetch(`https://sargam-dl.sauravmishraa05.workers.dev/download?version=v13.6.5&variant=${variant}`, { mode: 'no-cors' })
        .catch(err => console.warn('[Sargam Analytics] Worker ping failed:', err));

      if (window.gtag) {
        gtag('event', 'file_download', {
          'file_name': filename,
          'variant': variant,
          'event_category': 'APK_Download_Click'
        });
      }
      console.log(`[Sargam Web Analytics] Tracked APK Download Click: ${filename} (Variant: ${variant})`);
    });
  });

  // Initialize UI event listeners & static views
  UI.init();

  // Load live trending tracks from Audius API
  await UI.loadTrendingContent();
});
