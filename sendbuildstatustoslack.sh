#!/bin/bash

apkname="${BITBUCKET_BRANCH/\//-}.apk"

link="<https://bitbucket.org/mdes-team/granatum-mobile/downloads/${apkname}|${apkname}>"
linkall="<https://bitbucket.org/mdes-team/granatum-mobile/downloads/|all builds>"

curl -X POST -H 'Content-type: application/json' \
-H "Authorization: Bearer ${SLACK_TOKEN}" \
--data "{ \"text\": \":hammer_and_wrench: *BUILD SUCCESSFUL* ${link} (${linkall})\", \"channel\": \"#mobile\"}" \
'https://slack.com/api/chat.postMessage'