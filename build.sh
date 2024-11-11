#! /bin/zsh

pkg .
cd release
mv ./power-checkout-macos ./power-checkout
tar -czf power-checkout.tar.gz ./power-checkout
shasum -a 256 ./power-checkout.tar.gz > sha256.txt