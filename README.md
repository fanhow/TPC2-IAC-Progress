# TPC2 OSS — SPIE IAC Progress V4

Static GitHub Pages dashboard for the five TPC2 OSS inter-array cables:

- IAC09 / String 3
- IAC17 / String 2
- IAC21 / String 1
- IAC22 / String 5
- IAC26 / String 6

The dashboard separates HV and FO workstreams, shows each stage status, calculates indicative row and overall progress, and keeps a daily HV, FO and Overall history with percentage-point changes. Daily history is grouped by month: the current month is expanded by default, and each month heading can be clicked to expand or collapse its records. It also includes a browser-side daily recap parser that can commit validated updates to GitHub.

## Files

| File | Purpose | Normal daily action |
|---|---|---|
| **index.html** | Layout, styling and dashboard logic | Do not edit |
| **progress.js** | Current status, daily history, remaining shifts and notes | Updated by the website or manually |
| **progress-export.js / progress-export.css** | Trend chart, month selection and Excel/PNG exports | Do not edit |
| **vendor/** | Local ExcelJS 4.4.0 browser bundle and MIT license | Keep with the site |
| **iac-string-mapping.svg** | North/South IAC and String reference | Do not edit unless the approved mapping changes |
| **README.md** | Deployment and update instructions | Keep for reference |

## Daily update

### Export progress

1. Go to **Progress trends & exports**, above the daily history.
2. Choose a month or **All recorded dates**. The latest recorded month is selected initially.
3. Click **Export Excel .xlsx** or **Export chart .png**. No GitHub token is required.

Excel includes **Daily Progress** (numeric dates/percentages, change in percentage points, previous record date and recap), **No Sailing**, **Trend Chart** (an image snapshot), and **Read Me**. PNG includes the trend chart and a daily percentage/weather table, ready to attach to MoM or messages. To edit a chart in Excel, use the numeric data in Daily Progress.

Orange dates indicate recorded adverse-weather no-sailing days. Unrecorded dates within the selected observed period remain blank, with gaps in the chart; they are not inferred as zero progress or no sailing. Changes compare the previous recorded date, which may be outside the selected month. A date without a weather flag does not prove that sailing occurred. Only `progress.js` needs routine updates; the chart and exports refresh with the daily history, including after Update GitHub succeeds.

The Excel exporter loads the bundled [ExcelJS](https://github.com/exceljs/exceljs) library only when needed; export data stays in the browser. Deploy all the files listed above, including `vendor/`.

### Update from the website

1. Open the public dashboard.
2. Paste the latest day-shift or night-shift recap into the **Daily update** panel.
3. Enter a fine-grained GitHub token with **Contents: read and write** access to `fanhow/TPC2-IAC-Progress`.
4. Check the IAC/String mapping shown beside the form.
5. Press **Update GitHub**.

The token is used only by the current browser tab and is not written into `index.html`, `progress.js`, or the repository. An IAC number may be entered without its String number; the approved mapping is added automatically. The parser uses an explicit HV/FO label or common work-stage wording to identify the workstream, and it rejects mismatched IAC/String pairs or genuinely ambiguous lines. Keep property names in `progress.js` quoted so the website can read the file safely without executing repository code.

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

The recap parser accepts common weather-cancellation wording, including **no sailing**, **offshore works cancelled/canceled due to adverse weather**, **transfer called off**, and **vessel held in port due to weather**.

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
