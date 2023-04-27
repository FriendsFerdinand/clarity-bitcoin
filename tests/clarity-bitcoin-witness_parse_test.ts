import { Clarinet, Tx, Chain, Account, types, assertEquals } from "./deps.ts";
import { hexToBytes, expectHeaderObject, expectTxObject } from "./utils.ts";
import {
  parseTx,
  parseBlockHeader,
} from "./clients/clarity-bitcoin-segwit-client.ts";

Clarinet.test({
  name: "Ensure that witness can be parsed",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    let block = chain.mineBlock([
      parseTx(
        "0x01000000000102ba8d80d45493fadb983c29cfa1ade8682eda3caa9d5b23dfe2becc36bc3f72278d05000000fffffffffe738ee16d92b098f46f4efe9a7c0d5f81ec2b1168cb187bfe9cabfbb8da94b0010000006b483045022100ad345c31674a9912699e402a3d4965c2a94cd5dd66d58a3a137bff315593903b02206cc1ab31a94ebee18130ea947a7fd954b4a8a8f4e170be746dffaf4203aad167012102e36971247bef3a8612e1ae2ddd573e171e707da843d1803370b2b86be41fab37ffffffff0240420f00000000001976a9141abc4d2c4d35ac00866d88b404e961a11a1017bd88aca94b0000000000001976a914a0a84aeb51e736a831ab275dd4cb71c5c28392ae88ac0247304402206af997ff413b7ac49553c8729ef65ed1246ff7cafc1c5f80a9960d8b1acb018e02203f9beb0ecb7c0a71afe8d0f505231044ba6e0e0c295b2bb31a95dda8cae14b960121030fc54ce5a2d2f26e482180df1b088039bbe9c444315c29e2c94a1d7f51d746760000000000",
        deployer
      )
    ]);

    expectTxObject(block, {
      version: 1,
      segwitMarker: 0,
      segwitVersion: 1,
      ins: [
        {
          outpoint: {
            hash: "27723fbc36ccbee2df235b9daa3cda2e68e8ada1cf293c98dbfa9354d4808dba",
            index: 1421,
          },
          scriptSig: "",
          sequence: 4294967295,
        },
        {
          outpoint: {
            hash: "b094dab8fbab9cfe7b18cb68112bec815f0d7c9afe4e6ff498b0926de18e73fe",
            index: 1,
          },
          scriptSig: "483045022100ad345c31674a9912699e402a3d4965c2a94cd5dd66d58a3a137bff315593903b02206cc1ab31a94ebee18130ea947a7fd954b4a8a8f4e170be746dffaf4203aad167012102e36971247bef3a8612e1ae2ddd573e171e707da843d1803370b2b86be41fab37",
          sequence: 4294967295,
        },
      ],
      outs: [
        {
          scriptPubKey: "76a9141abc4d2c4d35ac00866d88b404e961a11a1017bd88ac",
          value: 1000000,
        },
        {
          scriptPubKey: "76a914a0a84aeb51e736a831ab275dd4cb71c5c28392ae88ac",
          value: 19369,
        },
      ],
      witnesses: [
        ["304402206af997ff413b7ac49553c8729ef65ed1246ff7cafc1c5f80a9960d8b1acb018e02203f9beb0ecb7c0a71afe8d0f505231044ba6e0e0c295b2bb31a95dda8cae14b9601", "030fc54ce5a2d2f26e482180df1b088039bbe9c444315c29e2c94a1d7f51d74676"],
        []
      ],
      locktime: 0,
    });

    block = chain.mineBlock([
      parseTx(
        "0x01000000000101ce8dc2b950c1fbecf92ff5cfd4bc4f6f4549a34258383a39ef27688421fc569f0000000000ffffffff02e7301800000000002200207bb8f5802ae446be4e5f7dde387ca1624faee09a8643a8c16ff87df4235e258426414e00000000002200200724fcf83a618a93b81fb139c1f35fd5b804a5c995817a67dab58d5dafe458df040047304402205014b7bacafe47af1ad7143683119bfa9248a66644d980366f5e5428ee5ef8f10220399462716984d72aecdb0471e6137174b0db1ec87b5b51eb7c1b0b0b155ef0e20147304402200cd72bfb48e9114d230e7d56e8f7b7c9c4b9ebc6bf2df6a90b8dcd968b281caf022036e1ca65c3b071ff376b40d03c034da5cd358682115b35fd30cd0f0c0c3fdbe70169522103e753b9e2e21f4fc1c8c46cb411447efb8479547b67b65963c03aa13457f42d3d2102b5637e2dbe1a811fe564d12f9b792b9c015fd8b35a412207630333788fcad9b6210278a00858b12b4c8ffefac58c4c4a21bd1f8b58d5cbf06094231c467d775884f753aedefd0b00",
        deployer
      )
    ]);
    expectTxObject(block, {
      version: 1,
      segwitMarker: 0,
      segwitVersion: 1,
      ins: [
        {
          outpoint: {
            hash: "9f56fc21846827ef393a385842a349456f4fbcd4cff52ff9ecfbc150b9c28dce",
            index: 0,
          },
          scriptSig: "",
          sequence: 4294967295,
        },
      ],
      outs: [
        {
          scriptPubKey: "00207bb8f5802ae446be4e5f7dde387ca1624faee09a8643a8c16ff87df4235e2584",
          value: 1585383,
        },
        {
          scriptPubKey: "00200724fcf83a618a93b81fb139c1f35fd5b804a5c995817a67dab58d5dafe458df",
          value: 5128486,
        },
      ],
      witnesses: [
        [
          "",
          "304402205014b7bacafe47af1ad7143683119bfa9248a66644d980366f5e5428ee5ef8f10220399462716984d72aecdb0471e6137174b0db1ec87b5b51eb7c1b0b0b155ef0e201",
          "304402200cd72bfb48e9114d230e7d56e8f7b7c9c4b9ebc6bf2df6a90b8dcd968b281caf022036e1ca65c3b071ff376b40d03c034da5cd358682115b35fd30cd0f0c0c3fdbe701",
          "522103e753b9e2e21f4fc1c8c46cb411447efb8479547b67b65963c03aa13457f42d3d2102b5637e2dbe1a811fe564d12f9b792b9c015fd8b35a412207630333788fcad9b6210278a00858b12b4c8ffefac58c4c4a21bd1f8b58d5cbf06094231c467d775884f753ae"
        ],
      ],
      locktime: 785886,
    });
  },
});
