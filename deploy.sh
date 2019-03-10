git checkout gh-pages &&
git checkout master docs/ .gitignore &&
git reset &&
mv docs/* . &&
rm -r docs &&
git add . &&
git commit -m 'deploy updates' &&
git push &&
git checkout master
