# TPC2 OSS — SPIE IAC Progress V4

Static GitHub Pages dashboard for the five TPC2 OSS inter-array cables:

- IAC09 / String 3
- IAC17 / String 2
- IAC21 / String 1
- IAC22 / String 5
- IAC26 / String 6

The dashboard separates HV and FO workstreams, shows each stage status, calculates indicative row and overall progress, and keeps a daily HV, FO and Overall history with percentage-point changes. It also includes a browser-side daily recap parser that can commit validated updates to GitHub.

## Files

| File | Purpose | Normal daily action |
|---|---|---|
| **index.html** | Layout, styling and dashboard logic | Do not edit |
| **progress.js** | Current status, daily history, remaining shifts and notes | Updated by the website or manually |
| **iac-string-mapping.svg** | North/South IAC and String reference | Do not edit unless the approved mapping changes |
| **README.md** | Deployment and update instructions | Keep for reference |

## Daily update

### Update from the website

1. Open the public dashboard.
2. Paste the latest day-shift or night-shift recap into the **Daily update** panel.
3. Enter a fine-grained GitHub token with **Contents: read and write** access to `fanhow/TPC2-IAC-Progress`.
4. Check the IAC/String mapping shown beside the form.
5. Press **Update GitHub**.

The token is used only by the current browser tab and is not written into `index.html`, `progress.js`, or the repository. The parser rejects mismatched IAC/String pairs. Keep property names in `progress.js` quoted so the website can read the file safely without executing repository code.

### Manual file update

Open **progress.js** and update:

1. **statusDate**
2. Stage status values
3. **remaining**
4. **note**
5. Append the reporting-day snapshot to **history**

Allowed stage status values:

| Value | Dashboard label |
|---|---|
| **done** | Completed |
| **progress** | In Progress |
| **pending** | Pending |
| **tbc** | TBC / not confirmed |

Example:

    "HV": {
      "stages": {
        "cablePrep": "done",
        "hangOff": "done",
        "softRouting": "done",
        "corePrep": "done",
        "heatShrink": "progress",
        "accessories": "pending",
        "plugIn": "pending",
        "closeOut": "pending"
      },
      "remaining": "4–5 active day shifts",
      "note": "L1 & L3 final heat shrinks applied."
    }

Do not change stage names such as **cablePrep** or **heatShrink**. Change only the value on the right. When a verified field percentage is available, such as FO 95%, **reportedPercent** may be used to override the stage-derived percentage.

### Adverse-weather day

Add an entry under **history**, retain the previous cumulative percentages, and set **adverseWeather: true**:

    {
      date: "2026-08-28",
      adverseWeather: true,
      HV: 55,
      FO: 66,
      Overall: 61,
      note: "No offshore activities due to adverse weather; daily progress 0 pp"
    }

Use **adverseWeather: true** only when the offshore shift did not proceed due to weather. The history table displays a checked, read-only weather box. Keeping the cumulative percentages unchanged records daily progress as 0 percentage points.

## First deployment to GitHub Pages

Repository:

    fanhow/TPC2-IAC-Progress

Expected public URL:

    https://fanhow.github.io/TPC2-IAC-Progress/

1. Open the repository on GitHub.
2. Select **Add file → Upload files**.
3. Upload **index.html**, **progress.js**, **iac-string-mapping.svg**, and **README.md** to the repository root.
4. Commit the changes.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select branch **main** and folder **/(root)**, then save.
8. Wait for deployment to complete and open the public URL.

GitHub reference: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Later daily updates

1. Open **progress.js** in the repository.
2. Select the edit button.
3. Update the current status, append the new daily history snapshot, and revise remaining shifts and notes.
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
