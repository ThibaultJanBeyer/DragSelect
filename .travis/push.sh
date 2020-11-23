#!/bin/sh
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout $TRAVIS_BRANCH
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Setup
  npm i
  npm run build
  # Stage the modified dist files
  git add -f dist docs
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
  git push
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://vinaygopinath:${GH_TOKEN}@github.com/vinaygopinath/visa-req-wiki-scraper.git > /dev/null 2>&1
  git push origin master --quiet > /dev/null 2>&1
}

setup_git
commit_website_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in country JSON files. Nothing to do"
fi
