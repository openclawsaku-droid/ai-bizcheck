'use client';

import { useState } from 'react';
import './globals.css';

const questions = [
  {
    id: 1, text: 'どのAIツールを使っていますか？',
    options: [
      { label: '使っていない', score: 1 },
      { label: '1つだけ（ChatGPTなど）', score: 2 },
      { label: '2〜3ツール使い分けている', score: 3 },
      { label: 'ChatGPT・Claude・Gemini等を目的別に使い分け', score: 4 },
    ],
  },
  {
    id: 2, text: 'AIをどの業務に活用していますか？',
    options: [
      { label: 'まだ活用していない', score: 1 },
      { label: 'メール作成や文章校正など限定的', score: 2 },
      { label: '議事録・リサーチ・資料作成など複数業務', score: 3 },
      { label: 'コード生成・データ分析含め幅広く活用', score: 4 },
    ],
  },
  {
    id: 3, text: 'AI活用の成果を数値で測定していますか？',
    options: [
      { label: '測定していない', score: 1 },
      { label: '体感では効果を感じているが数値化していない', score: 2 },
      { label: '測定したいと思っているが方法がわからない', score: 2 },
      { label: '時間削減・コスト削減などKPIで測定している', score: 4 },
    ],
  },
  {
    id: 4, text: '社内でAI活用の推進担当はいますか？',
    options: [
      { label: 'いない', score: 1 },
      { label: '興味ある人が個人的に試している程度', score: 2 },
      { label: '兼任だが推進担当がいる', score: 3 },
      { label: '専任のAI推進担当・チームがいる', score: 4 },
    ],
  },
  {
    id: 5, text: 'AIエージェント（自律的に動くAI）を知っていますか？',
    options: [
      { label: '聞いたことがない', score: 1 },
      { label: '名前は聞いたことがある', score: 2 },
      { label: 'どういうものか理解している', score: 3 },
      { label: '実際に業務で使っている', score: 4 },
    ],
  },
  {
    id: 6, text: 'AI活用で一番困っていることは？',
    options: [
      { label: '何から始めればいいかわからない', score: 1 },
      { label: 'ツールは触れるが使いこなせていない', score: 2 },
      { label: 'コストやセキュリティが心配', score: 3 },
      { label: 'AI人材の確保・育成', score: 3 },
    ],
  },
  {
    id: 7, text: 'AIに関する社内ルール・ガイドラインはありますか？',
    options: [
      { label: 'ない', score: 1 },
      { label: '暗黙のルールはあるが明文化されていない', score: 2 },
      { label: '簡単なガイドラインがある', score: 3 },
      { label: 'セキュリティポリシー含め整備済み', score: 4 },
    ],
  },
  {
    id: 8, text: '今後のAI活用の方針は？',
    options: [
      { label: '特に考えていない', score: 1 },
      { label: 'まずは試してみたい', score: 2 },
      { label: '特定業務での本格導入を検討中', score: 3 },
      { label: '全社的なAI戦略を策定・実行中', score: 4 },
    ],
  },
];

function calculateResults(answers) {
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const maxTotal = questions.length * 4;
  const aiReadiness = Math.round((totalScore / maxTotal) * 100);

  let levelLabel, levelMessage, levelKey;
  if (aiReadiness >= 85) {
    levelLabel = 'AI活用リーダー';
    levelKey = 'high';
    levelMessage = 'AIを戦略的に活用できています。次はAIエージェントの導入やチーム全体の底上げで、さらに競争優位を築きましょう';
  } else if (aiReadiness >= 65) {
    levelLabel = 'AI活用アクティブ層';
    levelKey = 'mid';
    levelMessage = 'AIツールを業務に取り入れ始めています。成果の数値化と組織的な展開が次のステップです';
  } else if (aiReadiness >= 45) {
    levelLabel = 'AIキャッチアップ中';
    levelKey = 'mid';
    levelMessage = 'AI活用の意識はあるものの、まだ本格的な成果には至っていません。専門家のサポートで一気に加速できるフェーズです';
  } else {
    levelLabel = 'AI活用スタート前';
    levelKey = 'low';
    levelMessage = 'AI活用はこれからです。今始めれば、競合に先んじて大きなアドバンテージを得られます';
  }

  // カテゴリ別の簡易分析
  const toolUsage = answers[0]?.score || 1;
  const businessUse = answers[1]?.score || 1;
  const measurement = answers[2]?.score || 1;
  const organization = answers[3]?.score || 1;
  const agentAwareness = answers[4]?.score || 1;

  const insights = [];
  if (toolUsage <= 2) insights.push('まずは主要AIツール（ChatGPT・Claude等）を試してみましょう');
  if (businessUse <= 2) insights.push('メール作成・議事録・リサーチなど、日常業務からAI活用を広げましょう');
  if (measurement <= 2) insights.push('AI導入の効果を「時間削減」「コスト削減」で数値化すると、投資判断がしやすくなります');
  if (organization <= 2) insights.push('AI推進の旗振り役を決めることで、組織的な活用が加速します');
  if (agentAwareness <= 2) insights.push('AIエージェントは次の大きな波です。今から理解しておくと有利です');

  return { aiReadiness, totalScore, levelLabel, levelKey, levelMessage, insights };
}

function Landing({ onStart }) {
  return (
    <div className="hero">
      <h1>あなたの会社の<br/>AI活用レベルを診断</h1>
      <p>8つの質問に答えるだけで、AI活用の現在地と次のアクションがわかります</p>
      <div className="hero-features">
        <div className="hero-feature"><strong>2分</strong>で完了</div>
        <div className="hero-feature"><strong>8問</strong>の選択式</div>
        <div className="hero-feature"><strong>無料</strong>で診断</div>
      </div>
      <button className="btn" onClick={onStart}>無料で診断する</button>
      <p style={{ marginTop: 24, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        個人情報の入力は不要です
      </p>
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

function ScoreBar({ score, label }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{score}/4</span>
      </div>
      <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4 }}>
        <div style={{ width: `${(score / 4) * 100}%`, height: '100%', background: score >= 3 ? 'var(--accent)' : 'var(--primary)', borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

function Results({ results }) {
  const siteUrl = 'https://sakusakuaicompany.github.io/ai-bizcheck/';
  const shareText = `あなたのAI活用レベルは【${results.levelLabel}】でした！（${results.aiReadiness}点/100点） #AIビズチェック`;
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;

  const ctaMessage = results.levelKey === 'low'
    ? 'まずはAIチーム導入から始めませんか？'
    : results.levelKey === 'high'
    ? 'AIチーム管理基盤で、さらにスケール'
    : '次のステップ: 専属AIチームで業務を加速';

  return (
    <div className="container" id="results-container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16, color: 'var(--navy)' }}>診断結果</h1>
        <div className="score-badge">AI活用スコア: {results.aiReadiness}点 / 100点</div>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8, color: 'var(--navy)' }}>{results.levelLabel}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '16px auto 0' }}>
          {results.levelMessage}
        </p>
      </div>

      <div className="result-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>カテゴリ別スコア</h3>
        <ScoreBar label="AIツール活用度" score={results.totalScoreByQ?.[0] || 0} />
        <ScoreBar label="業務への適用範囲" score={results.totalScoreByQ?.[1] || 0} />
        <ScoreBar label="成果の測定" score={results.totalScoreByQ?.[2] || 0} />
        <ScoreBar label="組織体制" score={results.totalScoreByQ?.[3] || 0} />
        <ScoreBar label="AIエージェント理解" score={results.totalScoreByQ?.[4] || 0} />
        <ScoreBar label="ガイドライン整備" score={results.totalScoreByQ?.[6] || 0} />
        <ScoreBar label="AI戦略" score={results.totalScoreByQ?.[7] || 0} />
      </div>

      {results.insights.length > 0 && (
        <div className="result-card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>改善ポイント</h3>
          <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {results.insights.map((insight, i) => (
              <li key={i} style={{ marginBottom: 8 }}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="cta-section">
        <h2>{ctaMessage}</h2>
        <p>AIエージェントチーム「さくワーカー」が、<br/>あなたの会社のAI活用を伴走サポートします</p>
        <a className="btn btn-accent" href="https://x.com/SakuYamad" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: 12 }}>
          さくワーカーに相談する → @SakuYamad
        </a>
      </div>

      <div style={{ textAlign: 'center', padding: '24px 0 16px' }} className="no-print">
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-x" style={{ marginRight: 12 }}>
          結果をXでシェア
        </a>
        <button
          className="btn btn-outline"
          onClick={() => {
            const text = `${shareText} ${siteUrl}`;
            if (navigator.share) navigator.share({ title: 'AIビズチェック結果', text: shareText, url: siteUrl });
            else { navigator.clipboard.writeText(text); alert('コピーしました'); }
          }}
        >
          リンクをコピー
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => setPhase('quiz');
  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQ + 1 >= questions.length) setPhase('results');
    else setCurrentQ(currentQ + 1);
  };

  const results = phase === 'results' ? (() => {
    const r = calculateResults(answers);
    r.totalScoreByQ = answers.map(a => a.score);
    return r;
  })() : null;

  return (
    <>
      {phase === 'landing' && <Landing onStart={handleStart} />}
      {phase === 'quiz' && <Quiz currentQ={currentQ} onAnswer={handleAnswer} />}
      {phase === 'results' && <Results results={results} />}
    </>
  );
}
