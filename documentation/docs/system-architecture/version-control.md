---
title: Version Control
sidebar_position: 6
---

# Version Control

We will use Git for version control in **Story Builder** to manage and track changes effectively across multiple components.

### Branch Strategy

To keep development organized and make bug fixing easier, we will use different Git branches for:

- **Front-End** – User interface and design changes
- **Back-End** – Server-side logic changes
- **Database** – Data management alterations
- **Testing** – Bug fixes and quality checks
- **Documentation** – Docusaurus and README.md changes
- **Production** – Final stable version (main branch)

Each of these major sections will have smaller subsections, where Jira tickets and Git branches will reflect the respective work. It is common for the branches to span multiple major categories. For example, a branch named `generateChapter` might involve **frontend**, **backend**, **database**, and **testing** work.

This approach allows us to work smoothly and merge changes efficiently while keeping the project stable.

### Versioning

To manage releases, we follow **semantic versioning**. The version number is divided into three segments:

- **Major Version**: Introduces significant changes or backward-incompatible updates. For example, a change in the way the backend works that breaks existing functionality would be a major version change.
- **Minor Version**: Adds new features or improvements that maintain backward compatibility. For instance, adding a new page or feature without breaking existing functionality.
- **Patch Version**: Includes bug fixes or minor improvements that don’t change existing functionality. These are typically quick fixes or optimizations.

This versioning scheme helps us track progress, manage releases, and maintain stability across versions.

**Old Version**: 0.0.0 (as of 03/18/2025)
**Old Version**: 1.0.0 (as of 4/6/2025)
**Current Version**: 2.0.0 (as of 4/24/2025)

### Branch Merging

When working with branches, it is important to merge changes back to the **Production** branch only after careful testing and validation. This ensures that only stable features and fixes make it into the main production codebase.