# TPC2 OSS — SPIE IAC Progress V3

Static GitHub Pages dashboard for the five TPC2 OSS inter-array cables:

- IAC09 / String 3
- IAC17 / String 2
- IAC21 / String 1
- IAC22 / String 5
- IAC26 / String 6

The dashboard separates HV and FO workstreams, shows each stage status, and calculates indicative row and overall progress.

## Files

| File | Purpose | Normal daily action |
|---|---|---|
| **index.html** | Layout, styling and dashboard logic | Do not edit |
| **progress.js** | Current status, remaining shifts and notes | Edit this file only |
| **README.md** | Deployment and update instructions | Keep for reference |

## Daily update

Open **progress.js** and update:

1. **statusDate**
2. Stage status values
3. **remaining**
4. **note**

Allowed stage status values:

| Value | Dashboard label |
|---|---|
| **done** | Completed |
| **progress** | In Progress |
| **pending** | Pending |
| **tbc** | TBC / not confirmed |

Example:

    HV: {
      stages: {
        cablePrep: "done",
        hangOff: "done",
        softRouting: "done",
        corePrep: "done",
        heatShrink: "progress",
        accessories: "pending",
        plugIn: "pending",
        closeOut: "pending"
      },
      remaining: "4–5 active day shifts",
      note: "L1 & L3 final heat shrinks applied."
    }

Do not change stage names such as **cablePrep** or **heatShrink**. Change only the value on the right.

## First deployment to GitHub Pages

Repository:

    fanhow/TPC2-IAC-Progress

Expected public URL:

    https://fanhow.github.io/TPC2-IAC-Progress/

1. Open the repository on GitHub.
2. Select **Add file → Upload files**.
3. Upload **index.html**, **progress.js**, and **README.md** to the repository root.
4. Commit the changes.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select branch **main** and folder **/(root)**, then save.
8. Wait for deployment to complete and open the public URL.

GitHub reference: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Later daily updates

1. Open **progress.js** in the repository.
2. Select the edit button.
3. Update only the current status, remaining shifts and notes.
4. Commit with a short message such as:

    Update SPIE progress — 27 Aug 2026

5. Wait for GitHub Pages to refresh.
6. If the old data remains visible, use a hard refresh:
   - Windows: **Ctrl+F5**
   - Mac: **Cmd+Shift+R**

You can also upload a replacement **progress.js** file and commit it. GitHub reference: [Managing files in a repository](https://docs.github.com/en/repositories/working-with-files/managing-files).

## Important

- GitHub Pages is public. Do not add names, PTW numbers, internal links, credentials, or sensitive project information.
- Keep uncertain stages as **tbc** until the records confirm them.
- Remaining shifts and percentages are indicative planning aids.
- The displayed completion window is deliberately conservative: **6–12 Sep 2026**.
- **Working estimate only — not a confirmed SPIE completion schedule.**
