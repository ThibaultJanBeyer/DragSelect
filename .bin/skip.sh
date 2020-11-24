find dist -type f -exec git update-index --skip-worktree '{}' \;
find docs -type f -exec git update-index --skip-worktree '{}' \;
