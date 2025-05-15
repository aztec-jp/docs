AztecのSequencerノードは、トランザクションの順序付けやブロックの生成を担う重要なインフラです。

Sequencerノードは、以下の3つの主要な役割を担います：

1.	未処理のトランザクションを集約し、次のブロックを提案する
2.	提案したブロック内のトランザクションが正しく実行されていることを証明する（バリデーター委員会の一員である場合）
3.	承認済みのブロックをL1（レイヤー1）へ提出する

トランザクションがAztecネットワークに送信されると、Sequencerノードはそれらをブロックとしてまとめ、ガスリミット、ブロックサイズ、トランザクションの妥当性といった様々な制約をチェックします。ブロックを公開する前に、その内容は他のSequencerノード（この文脈ではバリデーター）で構成される委員会によって検証される必要があります。バリデーターは、公開トランザクションを再実行し、プライベート関数の証明を検証することで、正しく実行されたことを確認します。

バリデーターはブロックの正当性に署名することでその証明を行い、委員会の3分の1を上回る署名が集まると、SequencerはそのブロックをL1に提出できるようになります。

このプロセスを補完するのが「アーカイバー」コンポーネントです。アーカイバーは、過去のチェーンデータを保持する役割を担っており、常にL1を監視して新しいブロックを検出・処理し、チェーンの状態を同期した形で保持します。これにはコントラクトデータ、トランザクションログ、L1からL2へのメッセージの管理が含まれており、ネットワークの同期やデータの可用性を確保するうえで欠かせない存在です。

## セットアップ

### 必要条件

Linux or MacOSかつ以下のスペックを満たすもの。

- CPU: 8-cores
- RAM: 16 GiB
- Storage: 1 TB SSD
- 上り下りそれぞれ最低25Mbpsのネットワーク

### 必要ツールのインストール

Aztecの各種ツールを利用するには、以下のツールが必要です。

- [docker](https://docs.docker.com/engine/install/)
- aztec cli
    - Run `bash -i <(curl -s https://install.aztec.network)`

最新のテストネット版のAztecをインストールするために、`aztec-up alpha-testnet`を実行してください。

## Quickstart

alpha-testnet バージョンでは、ノードを起動するために必要な変数を定義する必要があります。

| 変数名 | 値 | 説明 | 
| ---- | ---- | ---- | 
| ETHEREUM_HOSTS | url | カンマ区切りで指定された1つ以上のRPCプロバイダのURL |
| L1_CONSENSUS_HOST_URLS | url | カンマ区切りで指定された1つ以上のコンセンサス対応RPCプロバイダのURL |
| VALIDATOR_PRIVATE_KEY | 0x\<hex value\> | 0.01以上のSepolia ETH を保有しているテストネット用のL1 EOAの秘密鍵 |
| COINBASE | 0x\<hex value\> | ブロック報酬の受け取り先アドレス |
| P2P_IP | x.x.x.x | ノードのIPアドレス<br />`curl api.ipify.org` を実行すると確認できます |

### RPCプロバイダ

`ETHEREUM_HOSTS`と`L1_CONSENSUS_HOST_URLS`にはRPCプロバイダのURLを指定する必要があります。自身でノードを運用するか、AlchemyやInfuraなどのサービスを利用することもできます。

`ETHEREUM_HOSTS`で使用できるRPCを提供しているのは、[Alchemy](https://www.alchemy.com/)や[Infura](https://www.infura.io/)になります。  
`L1_CONSENSUS_HOST_URLS`で使用できるサービスは、[Quicknode](https://www.quicknode.com/)や[dRPC](https://drpc.org/)などがあります。

:::caution
RPCサービスには無料プランがありますがリクエスト制限がありノードがエラーになる可能性があります。
:::

ディスコードの#operators | faqチャンネルに[blockpi](https://blockpi.io/)の割引コードがあります。

### Sepolia ETH

バリデーターアドレスにはSepolia ETHが必要です。

[Sepolia PoW Faucet](https://sepolia-faucet.pk910.de/)などを使用して取得してください。


### 実行

`export`などで環境変数を設定した場合は以下で実行可能です。

```bash
aztec start --node --archiver --sequencer --network alpha-testnet
```

CLIの引数として渡す場合は以下になります。（※それぞれの値は、あなたの環境にあわせて適切なものに置き換えてください）

```
aztec start \
  --node \
  --archiver \
  --sequencer \
  --network alpha-testnet \
  --ethereum-hosts https://example-ethereum-rpc.com \
  --l1-consensus-host-urls https://example-consensus-rpc.com \
  --validator-private-key 0xabc123... \
  --coinbase 0xdef456... \
  --p2p-ip 123.45.67.89
```

その他のパラメーターは`aztec help start`で確認できます。

また、aztecコマンドでなくdocker composeで起動させることも可能です。  
https://github.com/AztecProtocol/aztec-packages/blob/master/docs/docs/the_aztec_network/guides/run_nodes/how_to_run_sequencer.md#using-a-docker-compose

### ポートフォワード

一部の制限された環境では、P2Pポート（デフォルト：40400）をローカルノードのIPアドレスに明示的に転送する必要がある場合があります。
必要な場合は、ルーターの設定を行ってください。

### ディスコードでのロール取得

以下のコマンドでblock-numberを取得してください。

```
curl -s -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"node_getL2Tips","params":[],"id":67}' localhost:8080 | jq -r ".result.proven.number"
```

`<block-number>`をさきほど取得した数値で置き換えて実行してください。proofが取得できます。

```
curl -s -X POST -H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","method":"node_getArchiveSiblingPath","params":["<block-number>","<block-number>"],"id":67}' \
localhost:8080 | jq -r ".result"
```

ディスコードで`/operator start`コマンドにノードのアドレス、取得したblock-numberとproofをいれて実行します。  
成功すればApprenticeロールが付与されます。

![](/img/docs/node/operator_start_command.png)

### バリデーターの登録

追加するには、前述の`ETHEREUM_HOSTS`に加えて、以下の値が必要です：

- STAKING_ASSET_HANDLER="0xF739D03e98e23A7B65940848aBA8921fF3bAc4b2"
- L1_CHAIN_ID="11155111"
- PRIVATE_KEY="0x\<hex値\>": トランザクションを実行するためのアカウントの秘密鍵（Sepolia ETHを保有しているアカウント）


その後、以下のように aztec コマンドを実行し、L1バリデーターとしてアドレスを登録します。
このとき、Ethereum L1の実行リクエスト用のRPC URLも指定します：

```
aztec add-validator \
  --staking-asset-handler $STAKING_ASSET_HANDLER \
  --l1-chain-id $L1_CHAIN_ID \
  --private-key $PRIVATE_KEY \
  --ethereum-hosts $ETHEREUM_HOSTS
```

:::caution
現在、実際のステーキング報酬インセンティブが存在しないため、バリデーターの登録は時間によって制限されています。そのため、返されるメッセージの冒頭に以下のような内容が表示されることがあります：
```
ValidatorQuotaFilledUntil(uint256 _timestamp)
```
このタイムスタンプは、次にシーケンサーをバリデーターとして追加できる時刻を示しています。
その時間を過ぎた直後に、再度試してみてください。

現状は登録しなくてもディスコードのロール取得は可能です。
:::

