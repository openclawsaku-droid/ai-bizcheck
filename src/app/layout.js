export const metadata = {
  title: 'AI業務診断 | あなたの会社に最適なAI活用を見つける',
  description: '3分で完了。15問の簡単な質問に答えるだけで、あなたの会社のどの業務にAIを導入すると最も効果的か、無料で診断します。',
  openGraph: {
    title: 'AI業務診断 — 3分であなたの会社のAI活用ポテンシャルがわかる',
    description: '15問の簡単な質問に答えるだけ。無料であなたの会社に最適なAI施策TOP3がわかります。',
    images: [{ url: '/ai-bizcheck/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI業務診断 — 3分であなたの会社のAI活用ポテンシャルがわかる',
    description: '15問の簡単な質問に答えるだけ。無料で最適なAI施策TOP3がわかります。',
    images: ['/ai-bizcheck/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
