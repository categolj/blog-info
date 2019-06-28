#!/bin/bash
set -e

kapp -a blog-info deploy -c -f <(kbld -f k8s)
