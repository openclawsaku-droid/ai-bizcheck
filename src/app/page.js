'use client';

import { useState } from 'react';
import './globals.css';

const industries = [
  { label: 'IT・Web', key: 'it', avg: 68 },
  { label: '小売・EC', key: 'retail', avg: 42 },
  { label: '飲食・サービス', key: 'food', avg: 35 },
  { label: '不動産', key: 'realestate', avg: 38 },
  { label: '士業（税理士・弁護士等）', key: 'professional', avg: 45 },
  { label: '医療・クリニック', key: 'medical', avg: 40 },
  { label: '製造', key: 'manufacturing', avg: 37 },
  { label: 'その他', key: 'other', avg: 43 },
];

const companySizes = [
  { label: '1〜5人', key: 'xs' },
  { label: '6〜20人', key: 'sm' },
  { label: '21〜50人', key: 'md' },
  { label: '51人以上', key: 'lg' },
];

// 15問: 営業3, マーケ2, サポート2, 経理3, 人事2, IT基盤3
const questions = [
  // 営業 (3問)
  { id: 1, category: 'sales', text: '見込み客の管理はどのようにしていますか？', options: [
    { label: '担当者の頭の中/紙のメモ', score: 1 },
    { label: 'Excelやスプレッドシート', score: 2 },
    { label: 'CRMツールを使用', score: 3 },
    { label: 'CRMにデータが蓄積され分析も実施', score: 4 },
  ]},
  { id: 2, category: 'sales', text: '営業資料の作成にどのくらい時間がかかりますか？', options: [
    { label: '毎回ゼロから作っている（半日以上）', score: 1 },
    { label: 'テンプレはあるが手作業が多い', score: 2 },
    { label: 'ある程度自動化されている', score: 3 },
    { label: 'ほぼ自動生成できている', score: 4 },
  ]},
  { id: 3, category: 'sales', text: '商談の勝敗パターンを分析していますか？', options: [
    { label: 'まったくしていない', score: 1 },
    { label: '感覚的に把握している', score: 2 },
    { label: '定期的にデータを見ている', score: 3 },
    { label: 'データに基づいた予測を行っている', score: 4 },
  ]},
  // マーケティング (2問)
  { id: 4, category: 'marketing', text: 'SNSやブログなどの情報発信はどのくらいしていますか？', options: [
    { label: 'ほとんどしていない', score: 1 },
    { label: '月に1-2回程度', score: 2 },
    { label: '週1回程度', score: 3 },
    { label: '週3回以上', score: 4 },
  ]},
  { id: 5, category: 'marketing', text: 'マーケティング施策の効果測定をしていますか？', options: [
    { label: 'していない', score: 1 },
    { label: '基本指標（PV等）のみ', score: 2 },
    { label: 'CVR・CPA等を定期確認', score: 3 },
    { label: 'ダッシュボードで常時モニタリング', score: 4 },
  ]},
  // カスタマーサポート (2問)
  { id: 6, category: 'support', text: '顧客からの問い合わせ対応の方法は？', options: [
    { label: '電話・メールを個別に対応', score: 1 },
    { label: '問い合わせフォーム+メールで対応', score: 2 },
    { label: 'チケット管理システムを使用', score: 3 },
    { label: 'チャットボット+有人対応のハイブリッド', score: 4 },
  ]},
  { id: 7, category: 'support', text: 'FAQ・マニュアルは整備されていますか？', options: [
    { label: '整備されていない', score: 1 },
    { label: '簡単なFAQページがある', score: 2 },
    { label: 'カテゴリ別に整備済み', score: 3 },
    { label: '検索可能なナレッジベースがある', score: 4 },
  ]},
  // 経理・バックオフィス (3問)
  { id: 8, category: 'finance', text: '請求書の発行・処理はどのように行っていますか？', options: [
    { label: '手書きまたはExcelで手作業', score: 1 },
    { label: '会計ソフトで発行しているが手入力が多い', score: 2 },
    { label: 'クラウド会計ソフトで半自動化', score: 3 },
    { label: '発注から請求まで一気通貫で自動化', score: 4 },
  ]},
  { id: 9, category: 'finance', text: '経費精算のプロセスは？', options: [
    { label: '紙の領収書を手作業で集計', score: 1 },
    { label: 'Excelに入力して提出', score: 2 },
    { label: '経費精算アプリを使用', score: 3 },
    { label: 'レシート撮影→自動仕訳まで完了', score: 4 },
  ]},
  { id: 10, category: 'finance', text: 'データの手入力（転記作業）はどのくらいありますか？', options: [
    { label: '非常に多い（週10時間以上）', score: 1 },
    { label: 'それなりにある（週5-10時間）', score: 2 },
    { label: '一部残っている（週2-5時間）', score: 3 },
    { label: 'ほぼない（週2時間未満）', score: 4 },
  ]},
  // 人事 (2問)
  { id: 11, category: 'hr', text: '社員の勤怠・労務管理の方法は？', options: [
    { label: '紙のタイムカード/出勤簿', score: 1 },
    { label: 'Excelで管理', score: 2 },
    { label: 'クラウド勤怠管理システムを使用', score: 3 },
    { label: '勤怠+給与+労務が一元管理', score: 4 },
  ]},
  { id: 12, category: 'hr', text: '社内の情報共有・ナレッジ管理の状況は？', options: [
    { label: '口頭やメールベース', score: 1 },
    { label: '共有フォルダにファイルを置いている', score: 2 },
    { label: '社内Wiki・チャットツールを活用', score: 3 },
    { label: 'ナレッジベースが整備され検索可能', score: 4 },
  ]},
  // IT基盤 (3問)
  { id: 13, category: 'it', text: '社内のITリテラシーのレベルは？', options: [
    { label: 'ITに詳しい人がほぼいない', score: 1 },
    { label: '一部の人がITに詳しい', score: 2 },
    { label: '多くの社員がSaaS等を使いこなしている', score: 3 },
    { label: 'エンジニアまたはIT専任者がいる', score: 4 },
  ]},
  { id: 14, category: 'it', text: '業務で使っているクラウドサービスの数は？', options: [
    { label: 'ほぼ使っていない（0-1個）', score: 1 },
    { label: '少し使っている（2-5個）', score: 2 },
    { label: 'それなりに使っている（6-10個）', score: 3 },
    { label: '多数使っている（11個以上）', score: 4 },
  ]},
  { id: 15, category: 'it', text: 'AIツール（ChatGPT等）を業務で使ったことがありますか？', options: [
    { label: 'まったくない', score: 1 },
    { label: '個人的に試した人がいる', score: 2 },
    { label: '一部の業務で活用し始めている', score: 3 },
    { label: '全社的にAIツールを活用している', score: 4 },
  ]},
];

const categoryMeta = {
  sales: { label: '営業', weight: 1.3, maxScore: 12, recommendations: {
    low: { title: 'AI営業アシスタント導入', description: 'CRM導入とAIによるメール文面・提案書の自動生成で、営業の手作業を大幅削減', impact: '営業資料作成時間を60%短縮', actions: ['CRM導入+AI連携', 'メール文面の自動生成', '見込み客リストの自動作成'] },
    mid: { title: 'AI商談スコアリング', description: '商談データをAIが分析し、成約確度の高い案件に集中できるようになります', impact: '成約率15%向上、提案書作成時間80%削減', actions: ['AI商談スコアリング', '提案書の自動生成', 'フォローアップ自動化'] },
    high: { title: '予測リードスコアリング', description: 'AIが最適なタイミングで最適なアプローチを自動実行', impact: 'パイプライン効率30%改善', actions: ['予測リードスコアリング', '自動パイプライン管理', 'AI営業コーチング'] },
  }},
  marketing: { label: 'マーケティング', weight: 1.2, maxScore: 8, recommendations: {
    low: { title: 'AIコンテンツ自動生成', description: 'ブログ記事、SNS投稿をAIが自動生成。少人数でも大企業並みの発信力に', impact: 'コンテンツ制作速度3倍', actions: ['AI記事/SNS投稿自動生成', '基本分析ダッシュボード', 'メルマガのAI作成'] },
    mid: { title: 'AIパーソナライズマーケ', description: '顧客セグメントに合わせたコンテンツを自動配信', impact: 'メール開封率2倍、CVR30%向上', actions: ['AIパーソナライズメール', 'A/Bテスト自動化', '顧客セグメント自動分類'] },
    high: { title: 'AI広告最適化', description: 'AIが広告予算配分を自動最適化しROIを最大化', impact: '広告ROI50%改善', actions: ['AI広告最適化', '予測分析マーケティング', 'クロスチャネル自動配信'] },
  }},
  support: { label: 'サポート', weight: 1.1, maxScore: 8, recommendations: {
    low: { title: 'AIチャットボット導入', description: 'よくある質問にAIが24時間自動回答。対応コスト大幅削減', impact: '問い合わせ対応時間70%削減', actions: ['FAQ自動生成', 'AIチャットボット導入', 'ナレッジベース構築'] },
    mid: { title: 'AI回答サジェスト', description: 'オペレーターにAIが最適な回答を提案し品質を均一化', impact: '平均対応時間40%短縮', actions: ['AI回答サジェスト', '自動チケット分類', '品質モニタリング'] },
    high: { title: '予測サポート', description: 'AIが問い合わせを予測し先回りで対応', impact: '問い合わせ数30%削減', actions: ['問い合わせ予測', '感情分析', 'プロアクティブサポート'] },
  }},
  finance: { label: '経理', weight: 1.2, maxScore: 12, recommendations: {
    low: { title: 'AI-OCR+クラウド会計', description: 'レシート・請求書をAIが自動読み取り、仕訳まで自動化', impact: '事務作業時間80%削減、ミスほぼゼロ', actions: ['AI-OCR導入', 'クラウド会計連携', '経費精算の自動化'] },
    mid: { title: '自動仕訳+異常検知', description: 'AIが取引を自動仕訳し不正や異常を即座に検知', impact: '月次決算5日短縮', actions: ['自動仕訳', '異常検知アラート', 'レポート自動生成'] },
    high: { title: 'AI財務分析', description: 'AIがキャッシュフローを予測し経営判断をサポート', impact: '資金繰りリスクを事前に把握', actions: ['予測キャッシュフロー', 'AI財務ダッシュボード', '経営シミュレーション'] },
  }},
  hr: { label: '人事', weight: 0.9, maxScore: 8, recommendations: {
    low: { title: 'AI採用+労務管理', description: '求人文面の自動生成、勤怠管理のクラウド化で人事業務を効率化', impact: '人事業務を50%効率化', actions: ['AI求人文面生成', 'クラウド勤怠導入', '社内FAQ Bot'] },
    mid: { title: 'AI書類スクリーニング', description: '応募書類をAIが評価し候補者を自動ランキング', impact: '採用担当の負担60%軽減', actions: ['AI書類スクリーニング', 'オンボーディング自動化', 'ナレッジ管理'] },
    high: { title: '離職予測+AI HR', description: 'AIが離職リスクを予測し早期にケア', impact: '離職率20%低減', actions: ['離職予測モデル', 'AIオンボーディング', 'エンゲージメント分析'] },
  }},
  it: { label: 'IT基盤', weight: 0.8, maxScore: 12, recommendations: {
    low: { title: 'デジタル基盤整備', description: 'まずはSaaS導入とAIリテラシー研修から。全てのAI活用の土台', impact: '全体効率20%向上', actions: ['SaaS導入支援', 'AI入門トレーニング', 'クラウド環境構築'] },
    mid: { title: 'ノーコードAI活用', description: 'プログラミング不要のAIツールで業務自動化を加速', impact: '自動化範囲3倍拡大', actions: ['ノーコードAI活用', 'API連携構築', 'ワークフロー自動化'] },
    high: { title: 'カスタムAI開発', description: '自社専用AIアプリで独自の競争優位を構築', impact: '業界内での差別化', actions: ['カスタムAIアプリ開発', 'データ基盤構築', 'MLOps環境整備'] },
  }},
};

function calculateResults(answers, industry) {
  const catScores = {};
  for (const key of Object.keys(categoryMeta)) catScores[key] = 0;
  answers.forEach((a, i) => { catScores[questions[i].category] += a.score; });

  const itScore = catScores.it;
  const itModifier = itScore <= 4 ? 0.5 : itScore <= 8 ? 0.8 : 1.0;

  const potentials = Object.entries(categoryMeta).map(([key, meta]) => {
    const raw = catScores[key];
    const potential = (meta.maxScore - raw) * meta.weight * itModifier;
    const level = raw <= meta.maxScore * 0.35 ? 'low' : raw <= meta.maxScore * 0.7 ? 'mid' : 'high';
    return { key, raw, potential, level, ...meta.recommendations[level], categoryLabel: meta.label };
  });

  const sorted = potentials.filter(p => p.key !== 'it').sort((a, b) => b.potential - a.potential);
  let topAreas;
  if (itScore <= 4) {
    topAreas = [potentials.find(p => p.key === 'it'), ...sorted.slice(0, 2)];
  } else {
    topAreas = sorted.slice(0, 3);
  }

  const totalScore = Object.values(catScores).reduce((a, b) => a + b, 0);
  const maxTotal = 60; // 15問×4点
  const aiReadiness = Math.round((totalScore / maxTotal) * 100);

  const industryAvg = industry?.avg || 43;
  const percentile = aiReadiness >= industryAvg
    ? Math.min(95, 50 + Math.round((aiReadiness - industryAvg) / (100 - industryAvg) * 45))
    : Math.max(5, 50 - Math.round((industryAvg - aiReadiness) / industryAvg * 45));

  let levelLabel, levelMessage;
  if (aiReadiness >= 90) {
    levelLabel = 'AI先進企業';
    levelMessage = '素晴らしい環境が整っています。次は「AIを使う」から「AIで勝つ」へ。さらなる高度化で競合との差を広げましょう';
  } else if (aiReadiness >= 70) {
    levelLabel = 'あと一歩で先進企業';
    levelMessage = 'ほとんどの土台は整っています。あと少しの施策で、業務時間を大きく削減できるポテンシャルがあります';
  } else if (aiReadiness >= 50) {
    levelLabel = '伸びしろ大 — 金脈あり';
    levelMessage = 'ここが一番面白いフェーズです。AI導入で最もインパクトが大きい「金脈」がいくつも眠っています';
  } else if (aiReadiness >= 30) {
    levelLabel = 'これからが楽しみ';
    levelMessage = '伸びしろしかない状態。ライバルがまだ手をつけていない今こそ、AI導入で一気に差をつけるチャンスです';
  } else {
    levelLabel = 'スタートライン';
    levelMessage = 'AI活用の旅はここから始まります。まずは小さく1つ試してみましょう。最初の成功体験が、すべてを変えます';
  }

  return { topAreas, aiReadiness, totalScore, levelLabel, levelMessage, catScores, percentile, industryAvg };
}

function Landing({ onStart }) {
  return (
    <div className="hero">
      <h1>社員50人以下の会社こそ、<br/>AIの恩恵が大きい</h1>
      <p>無料診断で、最も効果的なAI施策TOP3がわかります</p>
      <div className="hero-features">
        <div className="hero-feature"><strong>3分</strong>で完了</div>
        <div className="hero-feature"><strong>15問</strong>の簡単な質問</div>
        <div className="hero-feature"><strong>無料</strong>で診断</div>
      </div>
      <button className="btn" onClick={onStart}>無料で診断する</button>
      <p style={{ marginTop: 24, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        個人情報の入力は不要です
      </p>
    </div>
  );
}

function ProfileSelect({ onSelect, phase }) {
  if (phase === 'industry') {
    return (
      <div className="container">
        <div className="quiz-card">
          <div className="question-text">あなたの業種を教えてください</div>
          <div className="options">
            {industries.map((ind) => (
              <button key={ind.key} className="option" onClick={() => onSelect(ind)}>{ind.label}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="quiz-card">
        <div className="question-text">従業員数を教えてください</div>
        <div className="options">
          {companySizes.map((s) => (
            <button key={s.key} className="option" onClick={() => onSelect(s)}>{s.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Quiz({ currentQ, onAnswer }) {
  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;
  return (
    <div className="container">
      <div className="quiz-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="question-number">質問 {currentQ + 1} / {questions.length}</div>
        <div className="question-text">{q.text}</div>
        <div className="options">
          {q.options.map((opt, i) => (
            <button key={i} className="option" onClick={() => onAnswer(opt)}>{opt.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadarChart({ catScores }) {
  const cats = Object.entries(categoryMeta);
  const cx = 150, cy = 140, r = 100;
  const angleStep = (2 * Math.PI) / cats.length;
  const levels = [0.25, 0.5, 0.75, 1.0];
  const points = cats.map(([key, meta], i) => {
    const angle = i * angleStep - Math.PI / 2;
    const ratio = catScores[key] / meta.maxScore;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
      lx: cx + (r + 24) * Math.cos(angle),
      ly: cy + (r + 24) * Math.sin(angle),
      label: meta.label,
    };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: 320, margin: '0 auto', display: 'block' }}>
      {levels.map((l, li) => (
        <polygon key={li} points={cats.map((_, i) => {
          const a = i * angleStep - Math.PI / 2;
          return `${cx + r * l * Math.cos(a)},${cy + r * l * Math.sin(a)}`;
        }).join(' ')} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {cats.map((_, i) => {
        const a = i * angleStep - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <polygon points={polygon} fill="rgba(37,99,235,0.15)" stroke="#2563eb" strokeWidth="2" />
      {points.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#64748b">{p.label}</text>
      ))}
    </svg>
  );
}

function Results({ results, industry, companySize }) {
  const shareText = `AI業務診断やってみた！\nAI活用ポテンシャル: ${results.aiReadiness}点/100点（${results.levelLabel}）\n${industry?.label}業界の上位${results.percentile}%でした`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="container" id="results-container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>診断結果</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
          {industry?.label} / {companySize?.label}
        </p>
        <div className="score-badge">AI活用ポテンシャル: {results.aiReadiness}点 / 100点</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>{results.levelLabel}</p>

        {/* 業界平均との比較 */}
        <div style={{ background: 'var(--card)', borderRadius: 12, padding: '16px 24px', margin: '16px auto', maxWidth: 400, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{industry?.label}業界の平均: {results.industryAvg}点</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: results.aiReadiness >= results.industryAvg ? '#10b981' : '#f59e0b' }}>
              上位{results.percentile}%
            </span>
          </div>
          <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', left: `${results.industryAvg}%`, top: -4, width: 2, height: 16, background: '#94a3b8' }} />
            <div style={{ width: `${results.aiReadiness}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', borderRadius: 4 }} />
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '16px auto 0' }}>
          {results.levelMessage}
        </p>
      </div>

      <div className="result-card" style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, textAlign: 'center' }}>カテゴリ別スコア</h3>
        <RadarChart catScores={results.catScores} />
      </div>

      <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>おすすめAI施策 TOP3</h2>

      {results.topAreas.map((area, i) => (
        <div key={area.key} className="result-card">
          <div>
            <span className="result-rank">{i + 1}</span>
            <span className="result-title">{area.title}</span>
          </div>
          <div className="result-detail">{area.description}</div>
          <div className="result-impact">{area.impact}</div>
          <div style={{ marginTop: 16 }}>
            <strong style={{ fontSize: '0.9rem' }}>具体的なアクション:</strong>
            <ul style={{ marginTop: 8, paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {area.actions.map((a, j) => <li key={j} style={{ marginBottom: 4 }}>{a}</li>)}
            </ul>
          </div>
        </div>
      ))}

      <div className="cta-section">
        <h2>もっと詳しい診断を受けてみませんか？</h2>
        <p>AI導入のプロが、御社に最適なプランをご提案します<br/>初回相談は無料です</p>
        <a className="btn" href="https://x.com/SakuYamad" target="_blank" rel="noopener noreferrer">
          無料で相談する
        </a>
        <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Powered by さくワーカー — AIエージェント導入支援サービス
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: '24px 0 16px' }} className="no-print">
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginRight: 12 }}>
          Xでシェアする
        </a>
        <button
          className="btn btn-outline"
          onClick={() => { if (navigator.share) navigator.share({ title: 'AI業務診断結果', text: shareText, url: shareUrl }); else { navigator.clipboard.writeText(`${shareText} ${shareUrl}`); alert('コピーしました'); } }}
        >
          リンクをコピー
        </button>
      </div>
      <div style={{ textAlign: 'center', padding: '8px 0 48px' }} className="no-print">
        <button className="btn btn-outline" onClick={() => window.print()} style={{ fontSize: '0.9rem', padding: '12px 32px' }}>
          PDFで保存する
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [industry, setIndustry] = useState(null);
  const [companySize, setCompanySize] = useState(null);

  const handleStart = () => setPhase('industry');
  const handleIndustry = (ind) => { setIndustry(ind); setPhase('size'); };
  const handleSize = (s) => { setCompanySize(s); setPhase('quiz'); };
  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQ + 1 >= questions.length) setPhase('results');
    else setCurrentQ(currentQ + 1);
  };

  const results = phase === 'results' ? calculateResults(answers, industry) : null;

  return (
    <>
      {phase === 'landing' && <Landing onStart={handleStart} />}
      {phase === 'industry' && <ProfileSelect phase="industry" onSelect={handleIndustry} />}
      {phase === 'size' && <ProfileSelect phase="size" onSelect={handleSize} />}
      {phase === 'quiz' && <Quiz currentQ={currentQ} onAnswer={handleAnswer} />}
      {phase === 'results' && <Results results={results} industry={industry} companySize={companySize} />}
    </>
  );
}
