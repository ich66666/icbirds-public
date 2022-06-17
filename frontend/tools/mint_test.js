import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import fetch from 'node-fetch';
import {
  idlFactory
  } from "../.dfx/local/canisters/icbirds/icbirds.did.js";

import fs from 'fs';
import process from 'process';

global.fetch = fetch;

var keyData = fs.readFileSync('key.json', 'utf8');
var key = Ed25519KeyIdentity.fromJSON(keyData);
// console.log(key.getKeyPair().secretKey.slice());

//specify localhost endpoint or ic endpoint;
const host = "http://localhost:8000"; //local
var canister_id = "rwlgt-iiaaa-aaaaa-aaaaa-cai";
var ownerPrincipal = Principal.fromText("rx2v2-fw2y7-uzuw4-ayij3-5gz3b-2ckxl-rokd4-kahp6-fibr4-zzjku-tae");
// console.log(key);rwlgt-iiaaa-aaaaa-aaaaa-cai

const http = new HttpAgent({identity: key, host});
http.fetchRootKey();


const actor = Actor.createActor(idlFactory, { agent: http,
    canisterId: canister_id,
  });

var targetPrincipal = Principal.fromText("zchql-uwaxs-2hauo-mrjwh-yjsvr-vobn7-mgjkk-g7o3r-3t4qr-hvicj-hqe");
var ownerPrincipal = Principal.fromText("rx2v2-fw2y7-uzuw4-ayij3-5gz3b-2ckxl-rokd4-kahp6-fibr4-zzjku-tae");


// actor.total_supply().then(x => {
//   console.log(x);
// });

// actor.user_tokens(targetPrincipal).then(x=>{
//   console.log(x);
// });

async function user_tokens() {
  var ownerTokens = await actor.user_tokens(ownerPrincipal);
  console.log("Owner: ");
  console.log(ownerTokens);

  var targetTokens = await actor.user_tokens(targetPrincipal);
  console.log("Target: ");
  console.log(targetTokens);
}

// user_tokens();

async function get_token(tokenId) {
  actor.data_of(tokenId).then(x=>{
    console.log(x);
  });
}

// get_token(1;

async function owner_of(tokenId) {
  actor.owner_of(tokenId).then(x=>{
    console.log(x.toString());
  });
}
// owner_of(1);
// owner_of(2);

async function transfer(tokenId) {

  console.log(targetPrincipal.toString());
  var result = await actor.transfer_to(targetPrincipal, tokenId);
  console.log(result);

  await owner_of(tokenId);
}



// transfer(60);
// transfer(20);
// transfer(36);

// transfer(15);
// transfer(45);

// owner_of(13);
// get_token(20);
// get_token(36);

var contentType = "image/gif";

var mintRequest = {
  url: "/Token/",
  owner: ownerPrincipal,
  data: null,
  desc: "Example description of ICbird",
  name: "ICbird #",
  content_type: contentType,
  properties: [
    { name : 'Type', value: 'Bird'},
    { name: 'Background', value: 'Black'},
    { name: 'Body', value: 'White Suit'}
  ]
};

async function mint() {
  var hrstart = process.hrtime();
  var nbtomint = 18;
  
  for (let i = 1;i<=nbtomint;i++) {

    var fileName = "birds/"+(i-1)+".gif";

    var buffer = fs.readFileSync(fileName);
    var data = [...buffer];

    mintRequest.url = "/Token/"+i;
    mintRequest.data = data;
    mintRequest.name = "ICbird #"+i;

    await actor.mint(mintRequest);
    console.log(i+"/"+nbtomint);
  }

  var hrend = process.hrtime(hrstart)
  console.log("Creating 17 birds took : %ds %dms", hrend[0], hrend[1] / 1000000);
}

// mint();
for(var k = 2; k < 13; k++){
  transfer(k);
}
// await actor.add_genesis_record();