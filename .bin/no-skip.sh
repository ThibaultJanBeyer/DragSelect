find dist -type f -exec git update-index --no-skip-worktree '{}' \;
find docs -type f -exec git update-index --no-skip-worktree '{}' \;
