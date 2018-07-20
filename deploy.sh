git checkout gh-pages &&
git checkout master dist/ &&
git reset &&
mv dist/* . &&
rm -r dist &&
git add .
# git commit -m 'update' &&
# git push &&
# git checkout master