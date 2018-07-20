git checkout gh-pages &&
git checkout master dist/ .gitignore &&
git reset &&
mv dist/* . &&
rm -r dist &&
git add . &&
git commit -m 'deploy updates' &&
git push &&
git checkout master