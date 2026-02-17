export const metadata = {
  title: 'AI業務診断 | あなたの会社に最適なAI活用を見つける',
  description: '3分で完了。あなたの会社のどの業務にAIを導入すると最も効果的か、無料で診断します。',
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
