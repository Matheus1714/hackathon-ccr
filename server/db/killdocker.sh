#! /bin/bash

for j in $(sudo docker ps); do
    if [[ $j =~ ^[a-f0-9]{12}$ ]]; then
        sudo docker container kill $j
    fi
done
