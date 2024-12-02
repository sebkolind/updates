# `@sebkolind/updates`

A minimalistic CLI tool for generating a Markdown list of updates based on task IDs, fetched from a provider. The updates can be written to a file or printed to the console. Originally built for generating standup updates.

## Installation

```sh
deno install -gA -n updates jsr:@sebkolind/updates
```

This will install the `updates` as a global executable named `updates`. Make sure that `~/.deno/bin` is in your `PATH`. If you'd like the executable to be named something else, you can change the `-n` flag.

## Usage

```sh
# Print updates to console
updates -p linear X-1 X-2 X-3

# Write updates to file
updates -p linear X-1 X-2 X-3 -f ~/updates.md

# Add updates to queue
updates queue X-1 X-2

# Print updates to console from queue
updates --queue # (or -q)
```

## Providers

- [Linear](https://linear.app)
- [Jira](https://www.atlassian.com/software/jira)

## Contributing

All contributions are welcome! Please open an issue or a pull request.
