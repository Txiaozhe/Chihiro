#!/bin/bash
npm run clean
npm run build

cp -r ./public/* /Users/tangxiaoji/GitHub/txiaozhe.github.io
echo 'build & copy success! Go to public use GitHub for txiaozhe.github.io'
