<p align='center'>
<a href='./CONTRIBUTING.md'>English</a> | 日本語
</p>

## Yamada UIへの貢献に興味をもってくれて、ありがとうございます😎 あなたは素晴らしいです！！！

オープンソースへの貢献は、いくつかの方法で行うことができ、すべてが価値あるものです。これらは、あなたが貢献を準備する際に役立つガイドラインです。

## セットアップ

以下の手順で、`Yamada UI`への貢献を始められるようになります。

1. [リポジトリ](https://github.com/hirotomoyamada/yamada-ui)をフォークします。

2. あなたのローカルにクローンします。

```sh
git clone https://github.com/<your_github_username>/yamada-ui.git

cd yamada-ui
```

3. `pnpm install`を実行して、すべての依存関係とパッケージをセットアップします。このコマンドは、依存関係をインストールします。

## 開発手段

開発プロセスを快適するために、ツールとシステムを用意しています。`Yamada UI`はモノレポ構造であり、各コンポーネントは独立したパッケージです。

### ツール

- [PNPM](https://pnpm.io/) パッケージと依存関係の管理
- [Tsup](https://tsup.egoist.dev/) パッケージのバンドル
- [Storybook](https://storybook.js.org/) コンポーネントの迅速な開発とテスト
- [Testing Library](https://testing-library.com/) コンポーネントとフックのテスト
- [Changeset](https://github.com/atlassian/changesets) 変更のドキュメンテーション・ログの生成、リリースの管理

### コマンド

- **`pnpm install`**: すべての依存関係とパッケージをセットアップし、モノレポ開発のためにすべての依存関係をシンボリックリンクします。
- **`pnpm storybook`**: storybookサーバーを起動し、ストーリーを読み込みます。
- **`pnpm build`**: すべてのコンポーネント・フックのパッケージに対してビルドを実行します。
- **`pnpm test`**: すべてのコンポーネント・フックのパッケージに対してテストを実行します。
- **`pnpm gen:component`**: [Plop](https://plopjs.com/)を使用して、テンプレートからコンポーネントのパッケージを作成します。
  - パッケージ名とコンポーネント名はケバブケースで入力してください。
  - providerがtrueの場合、が使用するスタイルを含むプロバイダでラップされます。
  - プロバイダーが`true`の場合、スタイルプロバイダーは`children`をラップします。
- **`pnpm gen:hook`**: [Plop](https://plopjs.com/)を使用して、テンプレートからフックのパッケージを作成します。
  - パッケージ名とカスタムフック名はケバブケースで入力してください。
- **`pnpm gen:token`**: テーマのトークンを生成します。

## バグを見つけたと思いますか？

[テンプレート](https://github.com/hirotomoyamada/yamada-ui/issues/new/choose)に従って、提供してください。

## 新規または変更のAPIを提案しますか？

設計とサンプルAPIコードを提供してください。ロードマップに合わない提案や、説明がない提案はクローズします。

## プルリクエストを作成しますか？

### コミット規約

プルリクエストを作成する前に、あなたのコミットがこのリポジトリで使用されているコミット規約に準拠しているかどうかを確認してください。

コミットを作成する際は、次のカテゴリのいずれかを使用しながら、コミットメッセージで規約`カテゴリ: あなたのコミットメッセージ`に従うことをお願いします。

- `feat / feature`: 完全に新しいコードや新機能を導入した場合
- `fix`: バグを修正した変更の場合（可能であれば、詳細も記述する）
- `refactor`: `fix`でも`feat / feature`でもない、コード関連の変更をした場合
- `docs`: 既存のドキュメンテーションの変更や新しいドキュメンテーションを作成した場合（例：READMEやJSDocを記述）
- `build`: ビルドに関する変更、依存関係の変更、新しい依存関係の追加をした場合
- `test`: テストに関する変更をした場合（新しいテストの追加や既存のテストの変更）
- `ci`: 継続的インテグレーションの設定に関する変更をした場合（例：github actions、CIシステムなど）
- `chore`: 上記のいずれにも当てはまらないリポジトリへの変更をした場合

> [!TIP]
>
> 詳しい仕様については、[Conventional Commits](https://www.conventionalcommits.org)を確認するか、[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)を確認してください。

### プルリクエストの手順

1. [リポジトリ](https://github.com/hirotomoyamada/yamada-ui)をフォークし、クローンします。

2. `main`ブランチから新しいブランチを作成します。[タイプ/スコープ]という命名規則に従います。例えば、`fix/accordion-hook`や`docs/menu-typo`などです。`タイプ`は`docs`、`fix`、`feat`、`build`などの標準的なコミットタイプのいずれかです。`スコープ`は作業範囲を表す短い言葉です。

3. 変更を行い、`pnpm changeset`を実行して、変更の詳細な説明を作成します。これは、更新を公開する際にチェンジログを生成するために使用されます。
   [Changesetについてさらに学ぶ](https://github.com/atlassian/changesets/tree/master/packages/cli)

4. また、jsxのスニペットをchangesetに提供する場合、スニペットの始まりで以下のようにしてライブプレビューをオフにしてください。
   ` ```jsx live=false`

> [!NOTE]
>
> CIの設定やPrettierなどの小さな変更を行った場合は、`pnpm changeset add --empty`を実行して、空のchangesetファイルを生成し、変更を文書化することができます。

5. 次に、[コミット規約](https://github.com/hirotomoyamada/yamada-ui/blob/main/README.md#commit-convention)に従ってコミットします。

   - `変更の確認`: コマンドの`pnpm storybook`を実行すると、Storybookが起動します。Storybookのソースは、`./stories`です。
   - `新しいコンポーネントの作成`: コマンドの`pnpm gen:component`を実行すると、テンプレートからコンポーネントを作成し、依存関係もインストールします。
   - `既存のコンポーネントに機能を追加`: 追加後は、機能が分かるように対象のコンポーネントのストーリーを追加してください。
   - `新しいフックの作成`: コマンドの`pnpm gen:hook`を実行すると、テンプレートからフックを作成し、依存関係もインストールします。
   - `既存のフックに機能を追加`: 追加後は、機能が分かるように対象のフックのストーリーを追加してください。

6. 上記の全てのタスクを完了したら、変更をプッシュしてください。プッシュ後、プルリクエストのURLが生成されます。テンプレートに従ってリクエストを提出してください。また、プルリクエスト内のチェックを確認し、品質チェックが正常に完了していることを確認してください。問題がある場合、このプルリクエストはマージされません。

## ライセンス

`Yamada UI`のGitHubリポジトリにコードを寄贈することで、あなたの寄贈するコードはMITライセンスの下でライセンス付けされることに同意します。

### 最後まで読んでくださり、ありがとうございます。私もあなたを愛しています。 💖
