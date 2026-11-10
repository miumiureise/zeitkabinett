# 時の標本室 / Zeitkabinett

Vite + JavaScript ES modules + Astronomy Engine。新規MVP。ログイン不要。

## 起動

Node.js 22以降で、このフォルダーから `npm install`、`npm run dev` を実行し、表示されるlocalhost URLを開く。`npm test` で計算テスト、`npm run build` で静的サイトを生成する。

## 計算仕様

対象1900–2100年。グレゴリオ日付文字列とUTC瞬間を分離。日付をUTC午前0時に符号化した整数日数は日付演算専用。マヤ暦・日干支は選択した現地日付を使う。月齢はEurope/Vienna現地正午をIntlのIANAタイムゾーン情報でUTCに変換し、直前の天文学的新月から86400秒単位で算出。夏時間の日も「一日の長さ＝24時間」として現地日時を進めない。

マヤ暦は整数JDNからGMT相関584283を引き、144000、7200、360、20、1日の位に分解。起点の4 Ajaw 8 Kumk’uからツォルキン・ハアブを進める。相関は引数で差し替え可能。584285などの研究上の選択肢も存在するため、全研究者の一致とはしない。初期版はSmithsonianの2012-12-21対応と一致する584283を採用。

日干支は2000-01-07甲子を基準とする60日周期。現地午前0時に切替。年干支は1984甲子を基準に元日切替。立春・旧正月・子初23時の規則は未実装。五行と陰陽は十干への対応。歴史上の全地域の運用を再現するものではない。

月相はAstronomy Engineの地心太陽月黄経差、照明率はIllumination、朔望はSearchMoonPhase。月齢を平均朔望月の剰余で代用しない。SVGは黄経差に基づく北半球向きの模式図で観測地の月の傾きは表さない。8区分の月相名は近似分類。時刻表示は分単位、月齢は小数2桁であり、この桁数は精度保証ではない。独立した2025年朔望表とのテスト許容差は3分。全1900–2100年の独立照合は未実施。

## UI仕様

月間カレンダー、年月指定、前後月、今日、日付選択。日本語・Deutsch・併記をlocalStorageに保存。計算関数は言語を受け取らない。日付はURLのdateパラメータで共有。コピーはClipboard APIを使用し失敗を表示。各カードに折りたたみ解説。狭い画面で一列表示。

## 出典と検証範囲

- Smithsonian National Museum of the American Indian: https://maya.nmai.si.edu/2012-resetting-count/meaning-of-2012 — 2012-12-21 = 13.0.0.0.0 / 4 Ajaw / 3 Kank’in。独立期待値としてテスト。
- Mark Van Stone, FAMSI: https://www.famsi.org/research/vanstone/2012/2012Part4.pdf — GMT相関と相関問題の背景。
- Astronomy Engine作者のAPI資料: https://github.com/cosinekitty/astronomy/blob/master/source/js/README.md — 採用ライブラリの計算API。
- Fred Espenak, AstroPixels: https://astropixels.com/ephemeris/phasescat/phases2001.html — 2025-01-13 22:27 UT満月、01-29 12:36 UT新月を独立期待値として使用。
- 日干支基準日の照合先: https://reki.gozaaru.com/seireki/2000/1/1 および https://zatsunen.o.oo7.jp/koyomi/koyo2000.htm 。この基準日は二次資料による照合であり、天文台の一次暦資料による照合は未完了。この点は今後の学術検証課題。

周期性・うるう年・月送り・年送り・言語非依存性は仕様の性質を検証するテストで、独立した天文観測値ではない。ブラウザー操作・端末別表示の実機検証は未実施。

## 今後

一次暦資料での日干支追加照合、ブラウザー統合テスト、相関・タイムゾーン・年界方式の設定、文化史展示。サーバー公開は未実施。

## GitHubへのアップロード

この `calendar` フォルダーの中身を、専用リポジトリのルートに配置してください。親のCodexフォルダー全体をアップロードする必要はありません。

1. GitHubで空のリポジトリ（例：`zeitkabinett`）を作成します。
2. GitHub DesktopでそのリポジトリをCloneします。
3. 配布ZIPを展開し、`calendar` 内のファイルをClone先にコピーします。隠しファイル `.gitignore` と `.github` も含めます（MacのFinderでは Command + Shift + . で表示）。`node_modules` と `dist` は含めません。
4. GitHub Desktopで変更内容を確認し、CommitしてPushします。

Push時にGitHub Actionsがテストとビルドを実行します。このワークフローはWebサイトを公開しません。

Clone後の開発環境は `npm ci` で復元できます。ロックファイル `package-lock.json` も必ずアップロードしてください。
