find dist -type f -exec git update-index --no-assume-unchanged '{}' \;
find docs -type f -exec git update-index --no-assume-unchanged '{}' \;
