#!/bin/bash
rm -rf dist
npm run build
cp -r ./blogs ./dist
cp ./leaf.jpg ./dist
cp ./wechatpay.jpeg ./dist
cp ./alipay.jpeg ./dist
cp -r ./dist/* /Users/tangxiaoji/GitHub/txiaozhe.github.io/
