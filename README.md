# github-project-beta-story-point

- GitHub Project Beta でストーリーポイントを計算し画面に表示するChrome拡張機能です。
- ポップアップ画面に現在のイテレーションと完了ステータスのストーリーポイントを元にベロシティを計算し表示します。

## 使い方

- ビルドします。
```bash
yarn install
yarn build
```
- Chromeの拡張機能画面でデベロッパーモードをオンにして「パッケージ化されていない拡張機能を読み込む」でインポートします。
- GitHub Project Betaで`Point`フィールドを追加しておきます。

## 設定

オプション画面で設定を変更できます。

- `Done Status Name`: どのステータスを完了のストーリーポイントとして計算するか指定します（デフォルトは`Done`）。
- `Iteration Number`: 現在のイテレーション/スプリント番号です。
- `Total Point`: 完了ステータスのストーリーポイントの合計値です。
