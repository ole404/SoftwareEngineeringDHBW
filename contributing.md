# Contributing

How to contribute to this project

## Step 1 - create the branch

- Create your branch (i.e. `git checkout -b mybranch master`). Follow this pattern for the branch name:
  - feature/description (for new features)
  - improvement/description (to improve current features)
  - fix/description (for bug fixes)
  - doc/description (when only documentation is updated)

## Commit messages format

Messages should start with a single line containing a summary of the changes (max 70 chars), followed by one or more paragraphs or bullets with detailed explanation about the motivation
of the change. A good approach to decide what to write in the detailed explanation is to describe how the change affects the previous behavior/implementation.
Use also the imperative present tense - that means instead of writing "I added tests..." or "Adding tests for.." you should write "Add tests for...".
See the chapter [Contributing to a Project](http://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project) of the online git book for references.

Finally, your commit message must contain a sign-off including a reference to the
[DCO 1.1](https://gitlab.com/tessia-project/tessia/blob/master/DCO1.1.txt) (Developer Certificate of Origin) used in the project in order to confirm you
followed the rules described in the document.

Here's a commit message template summarizing the guidelines above:

```txt
Short (max 70 characters) summary of changes

More detailed explanatory text, if necessary.  Wrap it to about 72
characters or so. The blank line separating the summary from the body
is mandatory.
Further paragraphs might come after a breakline.

- Bullet points with hyphens are okay too
```

## Enforce code style

Before commiting, please run `npm run format` in both `./client` and `./server`. If you use VS Code as described in the `Readme.md` this should be done on save.
