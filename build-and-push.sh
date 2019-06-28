#!/bin/bash
set -e

npm run-script build
cf local stage blog-info
cf local export blog-info -r making/blog-info
docker push making/blog-info