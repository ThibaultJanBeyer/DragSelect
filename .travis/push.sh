#!/bin/sh
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

echo "DEBUG_0"

setup_git() {
  echo "DEBUG_1"
  git config --global user.email "travis@travis-ci.org"
  echo "DEBUG_2"
  git config --global user.name "Travis CI"
  echo "DEBUG_3"
}

commit_website_files() {
  echo "DEBUG_4"
  git checkout $TRAVIS_BRANCH
  echo "DEBUG_5"
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  echo "DEBUG_6"
  # Setup
  npm ci
  echo "DEBUG_7"
  npm run build
  echo "DEBUG_8"
  # Stage the modified dist files
  git add -f dist docs
  echo "DEBUG_9"
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
  echo "DEBUG_10"
}

upload_files() {
  echo "DEBUG_12"
  echo $(git remote get-url origin)
  # Remove existing "origin"
  git remote rm origin
  echo "DEBUG_13"
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://${GH_TOKEN}@github.com/ThibaultJanBeyer/DragSelect.git > /dev/null 2>&1
  echo "DEBUG_14"
  git push origin $TRAVIS_BRANCH --quiet > /dev/null 2>&1
  echo "DEBUG_15"
}

echo "DEBUG_01"
setup_git
echo "DEBUG_02"
commit_website_files
echo "DEBUG_03"

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in country JSON files. Nothing to do"
fi
