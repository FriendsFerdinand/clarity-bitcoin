import { Clarinet, Tx, Chain, Account, types, assertEquals } from "./deps.ts";
import { hexToBytes, expectHeaderObject, expectTxObject } from "./utils.ts";
import {
  parseTx,
  parseBlockHeader,
  readWitnesses
} from "./clients/clarity-bitcoin-segwit-client.ts";

Clarinet.test({
  name: "Ensure that witness can be parsed",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    let block = chain.mineBlock([
      readWitnesses(
        "0x000000040047304402202c3f94e5daf4057377d9f16d45b57e962de42fb42cb7e95a0382b7c66624980a02204098f6acd43b0391ea1b4a8102797e78895848fb7e883f98d207d14d45945a69014730440220448460edd5291a548c571ccf3a72caf47b02364035dc84f420d311e3a0c5494802205bb1cc89f20dc1e2c1f6eadb74898f8eecc46fbf488b676636b45fafaeb96e0f01695221021e6617e06bb90f621c3800e8c37ab081a445ae5527f6c5f68a022e7133f9b5fe2103bea1a8ce6369435bb74ff1584a136a7efeebfe4bc320b4d59113c92acd869f38210280631b27700baf7d472483fadfe1c4a7340a458f28bf6bae5d3234312d684c6553ae",
        0,
        4,
        deployer
      )
      // parseTx(
      //   "0x01000000000102ba8d80d45493fadb983c29cfa1ade8682eda3caa9d5b23dfe2becc36bc3f72278d05000000fffffffffe738ee16d92b098f46f4efe9a7c0d5f81ec2b1168cb187bfe9cabfbb8da94b0010000006b483045022100ad345c31674a9912699e402a3d4965c2a94cd5dd66d58a3a137bff315593903b02206cc1ab31a94ebee18130ea947a7fd954b4a8a8f4e170be746dffaf4203aad167012102e36971247bef3a8612e1ae2ddd573e171e707da843d1803370b2b86be41fab37ffffffff0240420f00000000001976a9141abc4d2c4d35ac00866d88b404e961a11a1017bd88aca94b0000000000001976a914a0a84aeb51e736a831ab275dd4cb71c5c28392ae88ac0247304402206af997ff413b7ac49553c8729ef65ed1246ff7cafc1c5f80a9960d8b1acb018e02203f9beb0ecb7c0a71afe8d0f505231044ba6e0e0c295b2bb31a95dda8cae14b960121030fc54ce5a2d2f26e482180df1b088039bbe9c444315c29e2c94a1d7f51d746760000000000",
      //   deployer
      // ),
    ]);
    console.log(block.receipts[0]);
    console.log(JSON.stringify(block.receipts[0].result.expectOk().expectTuple(), null, 4));

    // expectTxObject(block, {
    //   ins: [
    //     {
    //       outpoint: {
    //         hash: "ebe4a9f567fb6b130bd4a7eb0c00124ef9dc30663c0b61de4311ea601525699b",
    //         index: 0,
    //       },
    //       scriptSig:
    //         "483045022100a52f6c484072528334ac4aa5605a3f440c47383e01bc94e9eec043d5ad7e2c8002206439555804f22c053b89390958083730d6a66c1b711f6b8669a025dbbf5575bd012103abc7f1683755e94afe899029a8acde1480716385b37d4369ba1bed0a2eb3a0c5",
    //       sequence: 4294967294,
    //     },
    //   ],
    //   locktime: 509243,
    //   outs: [
    //     {
    //       scriptPubKey: "76a914a2420e28fbf9b3bd34330ebf5ffa544734d2bfc788ac",
    //       value: 66217000,
    //     },
    //     {
    //       scriptPubKey: "76a9149049b676cf05040103135c7342bcc713a816700688ac",
    //       value: 1429803185,
    //     },
    //   ],
    //   version: 2,
    // });
  },
});
