#!/usr/bin/env bash

atool-build
cp favicon.ico index.html leaf.jpg npm.png ./dist/
cp -r ./src/blog/* ./dist/src/blog/
cp -r ./dist/ ././../../txiaozhe.github.io/