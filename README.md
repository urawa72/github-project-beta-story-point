# github-project-beta-story-point

- GitHub Project Beta でストーリーポイントを計算し画面に表示するChrome拡張機能です。
- ポップアップ画面に現在のイテレーションと完了ステータスのストーリーポイントを元にベロシティを計算し表示します。

## 導入手順

- ビルドします。
```bash
yarn install
yarn build
```
- ビルド結果の`dist`をChromeの拡張機能画面の「パッケージ化されていない拡張機能を読み込む」でインポートします（デベロッパーモードをONにしていること）。
- GitHub Project Betaで`Point`フィールドを追加しておきます。

## 使い方

### ポイントの表示

- Layput: Boardのみで使用できます。
- 画面に見えているボードのポイントを集計します。見切れている場合は集計されません。

### ポイントの集計

- Chromeの左上にある拡張機能のアイコンをクリックすると、ポイント集計結果のポップアップ画面が表示されます。
  - `Iteration`: 現在のイテレーション番号
  - `Total Point`: これまで`Done`になったissueの合計ポイント数
  - `Velocity`: 現在のベロシティ（Total Point / Iteration の値）
- イテレーションの開始時に「Start」ボタンをクリックすることで、集計を開始します。
- イテレーションの終了時に「Finished」ボタンをクリックすると、イテレーション期間中にステータスが`Done`になったissueのポイントを計算しTotal Pointに加算します。

### 設定

- 「Options」リンクをクリックすると、設定用のポップアップ画面が表示されます。
  - `Done Status Name`: どのステータスを完了のポイントとして計算するか指定します（デフォルトは`Done`）。
  - `Iteration Number`: 現在のイテレーションの番号です。
  - `Total Point`: これまでステータスが完了になったissueのポイントの合計値です。
- 上記の入力フォームに任意の値を入力して「Save」ボタンをクリックすることで変更できます。
- 「Clear」をクリックすると、上記の入力フォームの値が全て初期値に戻ります。
- `Done Status Name`、`Iteration`、`Total Point`はローカルストレージへ保存しているため、複数人で情報は共有されません。
