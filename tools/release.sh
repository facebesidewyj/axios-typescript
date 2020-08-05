#!/usr/bin/env sh
set -e
echo "输入版本类型(patch/minor/major/preminor/prepatch/prerelease)："
read VERSION
read -p "确认 $VERSION ?(y/n)" -n 1 r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "构建 $VERSION 。。。"
  git add -A
  git commit -m 