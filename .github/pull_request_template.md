## What does this change?

<!-- A sentence or two. The diff already says what changed — say why. -->

## Type of change

- [ ] New component
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor / tooling
- [ ] Dependency update

## Screenshots

<!-- Required for anything visual. A short screen recording is even better for
     animated components. Include light and dark mode if they differ. -->

## Checklist

- [ ] `yarn lint` passes
- [ ] `yarn typecheck` passes
- [ ] `yarn test` passes
- [ ] `yarn build` succeeds

### For a new component

- [ ] Added `components/demo/<category>/<name>.tsx`
- [ ] Added `components/usage/<category>/<name>.usage.tsx` (no props)
- [ ] Added `content/docs/<category>/<name>.content.ts` with a full props table
- [ ] Registered it in `content/docs/index.ts`
- [ ] Added it to the preview map in `components/website/component-preview.tsx`
- [ ] Works in both light and dark mode
- [ ] No `Math.random()` / `Date.now()` during render
- [ ] Interactive elements have accessible names and visible focus

## Related issues

<!-- Closes #123 -->
