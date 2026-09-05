(function installTokenPersistence() {
  "use strict";

  var storageKey = "tpc2-iac-progress.githubToken";
  var tokenInput = document.getElementById("github-token");

  if (tokenInput) {
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
        if (token) window.localStorage.setItem(storageKey, token);
        else window.localStorage.removeItem(storageKey);
      } catch (error) {
        // Update still works for this tab if storage is unavailable.
      }
    });
  }

  if (!window.fetch.__tpc2TokenPersistence) {
    var nativeFetch = window.fetch.bind(window);

    var wrappedFetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url ? input.url : "");
      var method = init && init.method ? String(init.method).toUpperCase() : "GET";

      if (
        method === "PUT" &&
        /api\.github\.com\/repos\/fanhow\/TPC2-IAC-Progress\/contents\/progress\.js(?:\?|$)/i.test(url) &&
        init && typeof init.body === "string"
      ) {
        try {
          var requestBody = JSON.parse(init.body);
          if (requestBody.content) {
            var binary = atob(String(requestBody.content).replace(/\s/g, ""));
            var bytes = new Uint8Array(binary.length);
            for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
            var decoded = new TextDecoder("utf-8").decode(bytes);

            var preamble = "(" + installTokenPersistence.toString() + ")();\n\n";
            var nextText = preamble + decoded;
            var encodedBytes = new TextEncoder().encode(nextText);
            var encodedBinary = "";
            for (var j = 0; j < encodedBytes.length; j += 1) {
              encodedBinary += String.fromCharCode(encodedBytes[j]);
            }
            requestBody.content = btoa(encodedBinary);
            init = Object.assign({}, init, { body: JSON.stringify(requestBody) });
          }
        } catch (error) {
          // Fall back to the original request if preservation fails.
        }
      }

      return nativeFetch(input, init);
    };

    wrappedFetch.__tpc2TokenPersistence = true;
    window.fetch = wrappedFetch;
  }
})();

/* TPC2 SPIE IAC Progress — daily update file */

window.progressData = {
  "statusDate": "2026-09-05",
  "basisLabel": "No offshore activities due to adverse weather",
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
    },
    {
      "date": "2026-08-31",
      "adverseWeather": false,
      "HV": 58,
      "FO": 58,
      "Overall": 58,
      "note": "FO IAC26 / String 6: String 6 / IAC26: 75% complete; FO IAC09 / String 3: ⁠String 3 / IAC09: 10%; HV IAC09 / String 3: String 3 / IAC09: L1, L2 and L3 plugged in. L2 shrink tube heating to be started, and all bonding cables to be installed.; HV IAC17 / String 2: String 2 / IAC17: L1/L2/L3 ready for termination"
    },
    {
      "date": "2026-09-01",
      "adverseWeather": true,
      "HV": 58,
      "FO": 58,
      "Overall": 58,
      "note": "No offshore activities due to adverse weather; daily progress 0 pp"
    },
    {
      "date": "2026-09-02",
      "adverseWeather": true,
      "HV": 58,
      "FO": 58,
      "Overall": 58,
      "note": "No offshore activities due to adverse weather; daily progress 0 pp"
    },
    {
      "date": "2026-09-03",
      "adverseWeather": true,
      "HV": 58,
      "FO": 58,
      "Overall": 58,
      "note": "No offshore activities due to adverse weather; daily progress 0 pp"
    },
    {
      "date": "2026-09-04",
      "adverseWeather": false,
      "HV": 64,
      "FO": 58,
      "Overall": 61,
      "note": "FO IAC21 / String 1: IAC21 FO cable 1 & topside cable prepped into enclosure (Tray A spliced); FO IAC09 / String 3: IAC09 FO cable 2&3 introduced and wrapped away; HV IAC09 / String 3: IAC09 heat shrink applied & earthing complete; HV IAC17 / String 2: IAC17 L1&L2 break test passed, 60% ready for plug in"
    },
    {
      "date": "2026-09-05",
      "adverseWeather": true,
      "HV": 64,
      "FO": 58,
      "Overall": 61,
      "note": "No offshore activities due to adverse weather; daily progress 0 pp"
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
          "heatShrink": "done",
          "accessories": "done",
          "plugIn": "done",
          "closeOut": "pending"
        },
        "remaining": "Complete remaining inspection and close-out items",
        "note": "Heat shrink applied and earthing completed. L1, L2 and L3 were previously reported plugged in."
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
        "note": "IAC09 FO cable 2&3 introduced and wrapped away.",
        "reportedPercent": 10
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
        "remaining": "Complete remaining phase readiness checks and proceed with plug-in",
        "note": "L1 and L2 break tests passed; 60% ready for plug-in.",
        "reportedPercent": 60
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
          "splicing": "progress",
          "retestScada": "pending",
          "closeOut": "pending"
        },
        "reportedPercent": 50,
        "remaining": "Continue FO termination and testing works",
        "note": "IAC21 FO cable 1 & topside cable prepped into enclosure (Tray A spliced)"
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
        "reportedPercent": 75,
        "remaining": "Earth cable installation and cable taping",
        "note": "String 6 / IAC26: 75% complete"
      }
    }
  ]
};
