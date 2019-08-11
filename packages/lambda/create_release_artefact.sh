#!/bin/bash

release_folder=release

rm -rf $release_folder
mkdir $release_folder

find . -type d -name ".terragrunt-cache" -prune -o -type f | egrep "\.(zip|tf|tpl.json)$" | zip -@ $release_folder/inversify-lambda-demo-v$1.zip