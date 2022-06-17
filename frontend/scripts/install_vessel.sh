#!/bin/sh

BINDIR=/usr/local/bin
BIN=$BINDIR/vessel
OS_FILENAME=linux64
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  OS_FILENAME=linux64
elif [[ "$OSTYPE" == "darwin"* ]]; then
  OS_FILENAME=macos
elif [[ "$OSTYPE" == "win32" ]]; then
  OS_FILENAME=windows64.exe
fi

VESSEL_VERSION=v0.6.2
wget -O $BIN https://github.com/dfinity/vessel/releases/download/$VESSEL_VERSION/vessel-$OS_FILENAME && chmod +x $BIN && $BIN help


