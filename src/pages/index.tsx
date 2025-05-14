import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
    return (
        <Layout title="ホーム">
            {/* 画面いっぱい・中央寄せ */}
            <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 px-4">
                {/* 見出し */}
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white md:text-5xl">
                    Aztec Japan Docs
                </h1>

                {/* サブコピー */}
                <p className="mt-4 max-w-prose text-center text-lg text-slate-600 dark:text-slate-300">
                    Aztec&nbsp;Protocol 🌏 の非公式日本語ドキュメントへようこそ。
                    <br />
                    セットアップから内部仕様まで、すべて日本語でまとめています。
                </p>

                {/* CTA ボタン */}
                <a
                    href="/docs"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700"
                >
                    ドキュメントを読む
                </a>
            </main>
        </Layout>
    );
}
