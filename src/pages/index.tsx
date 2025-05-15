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
                    Aztec🌏 の非公式日本語ドキュメントへようこそ。
                </p>

                {/* CTA ボタン */}
                <img
                    src="img/image.png"
                    alt="Aztec Logo"
                    className="mt-8 h-100 border-4 border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                />
            </main>
        </Layout>
    );
}
