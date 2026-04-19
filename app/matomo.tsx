import Script from 'next/script';

export default function MatomoProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="matomo" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="${process.env.NEXT_PUBLIC_MATOMO_URL}/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
    {children}
    </>
  );
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="ko">
//       <body>
//         {children}

//         <Script id="matomo" strategy="afterInteractive">
//           {`
//             var _paq = window._paq = window._paq || [];
//             _paq.push(['trackPageView']);
//             _paq.push(['enableLinkTracking']);
//             (function() {
//               var u="${process.env.NEXT_PUBLIC_MATOMO_URL}/";
//               _paq.push(['setTrackerUrl', u+'matomo.php']);
//               _paq.push(['setSiteId', '${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}']);
//               var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
//               g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
//             })();
//           `}
//         </Script>
//       </body>
//     </html>
//   );
// }