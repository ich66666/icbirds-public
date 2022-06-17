#!/bin/bash

# dfx stop
# rm -r .dfx/local

# dfx start --clean
PUBLIC_KEY="principal \"$( \
    dfx identity get-principal
)\""

# cd ../internet-identity
# rm -r .dfx/local
# II_ENV=development dfx deploy --no-wallet --argument '(null)'

# cp .dfx/local/canister_ids.json ../hello/.dfx/local/canister_ids.json

# cd ../hello

dfx canister --no-wallet create icbirds
# dfx canister create hello
dfx canister --no-wallet create icbirds_storage
dfx canister --no-wallet create hello_assets

dfx build icbirds
dfx build icbirds_storage
dfx build hello_assets
#\"ICPunks\", \"TT\", 10000, $PUBLIC_KEY
eval dfx canister --no-wallet install icbirds --argument="'($PUBLIC_KEY)'" -m reinstall
eval dfx canister --no-wallet install icbirds_storage --argument="'($PUBLIC_KEY)'" -m reinstall
eval dfx canister --no-wallet install hello_assets -m reinstall


ICBIRDSID=$(dfx canister --no-wallet id icbirds)
STOREID=$(dfx canister --no-wallet id icbirds_storage)

ICBIRDSID="principal \"$ICBIRDSID\""
STOREID="principal \"$STOREID\""

eval dfx canister --no-wallet call icbirds set_storage_canister "'($STOREID)'"
eval dfx canister --no-wallet call icbirds_storage setTokenCanisterId "'($ICBIRDSID)'"
eval dfx canister --no-wallet call icbirds add_genesis_record

echo "Preparation complete"