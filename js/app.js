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
