/*
  TPC2 SPIE IAC Progress — browser-only GitHub token persistence

  The token is saved only in this browser's localStorage for this GitHub Pages
  origin. It is never written into progress.js or committed to the repository.
*/
(function () {
  "use strict";

  var storageKey = "tpc2-iac-progress.githubToken";
  var tokenInput = document.getElementById("github-token");

  if (!tokenInput) return;

  try {
    var savedToken = window.localStorage.getItem(storageKey);
    if (savedToken) tokenInput.value = savedToken;
  } catch (error) {
    // Continue without persistence if localStorage is unavailable.
  }

  var helper = tokenInput.parentElement ? tokenInput.parentElement.querySelector("small") : null;
  if (helper) {
    helper.textContent = "Saved only in this browser/device. It is not written to the GitHub repository. Clear this field to forget it.";
  }

  tokenInput.addEventListener("input", function () {
    try {
      var token = tokenInput.value.trim();
      if (token) {
        window.localStorage.setItem(storageKey, token);
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch (error) {
      // The update button can still use the token for this tab even if storage fails.
    }
  });
})();

/*
  TPC2 SPIE IAC Progress — daily update file

  Edit only:
    1. statusDate
    2. stage status values
    3. remaining
    4. note
    5. history (append one snapshot per reporting day)

  Allowed stage status values:
    "done"      = Completed
    "progress"  = In Progress
    "pending"   = Pending / not started
    "tbc"       = Not confirmed by available records
*/

window.progressData = {
  "statusDate": "2026-08-30",
  "basisLabel": "Offshore field update 30 Aug 2026",

  "timeline": {
    "start": "2026-08-21",
    "endExclusive": "2026-09-13"
  },

  "forecast": {
    "start": "2026-09-06",
    "endExclusive": "2026-09-13",
    "label": "6–12 Sep 2026, possibly later"
  },

  "cautions": {
    "weather": "No offshore sailing is currently expected on 31 Aug and 1 Sep due to adverse weather and high waves. Activities planned for those dates cannot be treated as available working shifts.",
    "iac26": "FO is 95% complete. Splicing is complete; earth cable installation and cable taping remain outstanding.",
    "nightShift": "Night work is currently expected only for this weekend. Night shifts after 30 Aug are not confirmed and remain subject to manpower and SOV availability."
  },

  "history": [
    {
      "date": "2026-08-26",
      "adverseWeather": false,
      "HV": 53,
      "FO": 62,
      "Overall": 58,
      "note": "Baseline reconstructed from the last confirmed dashboard stage snapshot"
    },
    {
      "date": "2026-08-27",
      "adverseWeather": false,
      "HV": 55,
      "FO": 66,
      "Overall": 61,
      "note": "IAC09 L1 and L3 plugged in; IAC26 FO reported 95% complete"
    },
    {
      "date": "2026-08-28",
      "adverseWeather": true,
      "HV": 55,
      "FO": 66,
      "Overall": 61,
      "note": "No offshore activities due to adverse weather; daily progress 0 pp"
    },
    {
      "date": "2026-08-30",
      "adverseWeather": false,
      "HV": 57,
      "FO": 67,
      "Overall": 62,
      "note": "IAC21/String 1 FO 50% complete; IAC09/String 3 L2 stripping and peeling complete; IAC17/String 2 straightening bars applied"
    }
  ],

  "iacs": [
    {
      "id": "IAC09",
      "string": "String 3",
      "HV": {
        "stages": {
          "cablePrep": "done",
          "hangOff": "done",
          "softRouting": "done",
          "corePrep": "done",
          "heatShrink": "progress",
          "accessories": "progress",
          "plugIn": "progress",
          "closeOut": "pending"
        },
        "remaining": "Complete L2 termination and plug-in, followed by close-out",
        "note": "L1 and L3 are plugged in. L2 stripping and outer jacket peeling are complete."
      },
      "FO": {
        "stages": {
          "access": "done",
          "enclosurePrep": "progress",
          "cablePrep": "progress",
          "routingTrays": "progress",
          "earthing": "tbc",
          "preTermTest": "progress",
          "splicing": "pending",
          "retestScada": "pending",
          "closeOut": "pending"
        },
        "remaining": "Planned from 29 Aug, but 31 Aug–1 Sep are expected no-sailing days; completion may move later",
        "note": "The latest 7DLA schedules FO terminations of String 3 from 29 Aug to 2 Sep day shifts. No offshore sailing is currently expected on 31 Aug and 1 Sep due to high waves, and later night-shift support is not confirmed."
      }
    },

    {
      "id": "IAC17",
      "string": "String 2",
      "HV": {
        "stages": {
          "cablePrep": "done",
          "hangOff": "done",
          "softRouting": "done",
          "corePrep": "progress",
          "heatShrink": "tbc",
          "accessories": "tbc",
          "plugIn": "pending",
          "closeOut": "pending"
        },
        "remaining": "Continue core preparation and HV termination works",
        "note": "Straightening bars applied to L1/L2/L3."
      },
      "FO": {
        "stages": {
          "access": "done",
          "enclosurePrep": "done",
          "cablePrep": "done",
          "routingTrays": "done",
          "earthing": "done",
          "preTermTest": "done",
          "splicing": "done",
          "retestScada": "done",
          "closeOut": "done"
        },
        "remaining": "Completed",
        "note": "FO testing was previously reported completed. A String 2 earthing arrangement appears on the 2 Sep night plan, but its workstream and shift availability are not confirmed."
      }
    },

    {
      "id": "IAC21",
      "string": "String 1",
      "HV": {
        "stages": {
          "cablePrep": "done",
          "hangOff": "done",
          "softRouting": "done",
          "corePrep": "tbc",
          "heatShrink": "tbc",
          "accessories": "tbc",
          "plugIn": "tbc",
          "closeOut": "pending"
        },
        "remaining": "Originally planned on 2 Sep; may be delayed by the rolled-over String 2 scope",
        "note": "The latest 7DLA shows HV terminations of String 1 on 2 Sep day shift. Expected no-sailing days on 31 Aug and 1 Sep may push unfinished String 2 work forward, so the String 1 start is not confirmed."
      },
      "FO": {
        "stages": {
          "access": "done",
          "enclosurePrep": "done",
          "cablePrep": "done",
          "routingTrays": "done",
          "earthing": "tbc",
          "preTermTest": "tbc",
          "splicing": "pending",
          "retestScada": "pending",
          "closeOut": "pending"
        },
        "reportedPercent": 50,
        "remaining": "Continue FO termination and testing works",
        "note": "FO work on String 1 / IAC21 is 50% complete."
      }
    },

    {
      "id": "IAC22",
      "string": "String 5",
      "HV": {
        "stages": {
          "cablePrep": "done",
          "hangOff": "done",
          "softRouting": "done",
          "corePrep": "done",
          "heatShrink": "done",
          "accessories": "done",
          "plugIn": "done",
          "closeOut": "progress"
        },
        "remaining": "Close-out or punch items only, if any",
        "note": "L1, L2 and L3 have been plugged in. Main HV termination is substantially complete; remaining work is expected to be close-out or punch items, if any."
      },
      "FO": {
        "stages": {
          "access": "done",
          "enclosurePrep": "done",
          "cablePrep": "done",
          "routingTrays": "done",
          "earthing": "tbc",
          "preTermTest": "done",
          "splicing": "tbc",
          "retestScada": "tbc",
          "closeOut": "tbc"
        },
        "remaining": "TBC — String 5 earthing is shown on the 30 Aug night plan",
        "note": "Earlier records show FO pre-term work completed for String 5 / IAC22. The latest 7DLA shows a String 5 earthing arrangement on the 30 Aug night shift; later close-out status is not confirmed."
      }
    },

    {
      "id": "IAC26",
      "string": "String 6",
      "HV": {
        "stages": {
          "cablePrep": "done",
          "hangOff": "done",
          "softRouting": "done",
          "corePrep": "tbc",
          "heatShrink": "tbc",
          "accessories": "tbc",
          "plugIn": "tbc",
          "closeOut": "tbc"
        },
        "remaining": "TBC — current HV stage and duration not confirmed",
        "note": "Current confirmed activity is FO. The latest records do not clearly establish the remaining HV termination stage, so later HV stages remain TBC."
      },
      "FO": {
        "stages": {
          "access": "done",
          "enclosurePrep": "done",
          "cablePrep": "done",
          "routingTrays": "done",
          "earthing": "progress",
          "preTermTest": "done",
          "splicing": "done",
          "retestScada": "done",
          "closeOut": "progress"
        },
        "reportedPercent": 95,
        "remaining": "Earth cable installation and cable taping",
        "note": "FO is 95% complete and splicing is 100% complete. Outstanding items are the earth cable and cable taping."
      }
    }
  ]
};
