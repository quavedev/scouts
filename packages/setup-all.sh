#!/usr/bin/env bash

packagesReposPath=/Users/filipe/Documents/quave/ws
array=( 'logs' 'settings' 'collections' 'graphql' 'definitions' 'resolvers' 'custom-type-date-time' 'pwa' 'universal-links' )
for i in "${array[@]}"
do
  echo "link to $i"
  ln -s $packagesReposPath/$i $i
done
