# find docs -type f -exec git update-index --assume-unchanged '{}' \;
git update-index --assume-unchanged dist/*
git update-index --assume-unchanged docs/*
