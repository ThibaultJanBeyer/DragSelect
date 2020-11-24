find dist -type f -exec git update-index --assume-unchanged '{}' \;
find docs -type f -exec git update-index --assume-unchanged '{}' \;
