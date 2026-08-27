/*
  TPC2 SPIE IAC Progress — daily update file

  Edit only:
    1. statusDate
    2. stage status values
    3. remaining
    4. note

  Allowed stage status values:
    "done"      = Completed
    "progress"  = In Progress
    "pending"   = Pending / not started
    "tbc"       = Not confirmed by available records
*/

window.progressData = {
  statusDate: "2026-08-26",

  timeline: {
    start: "2026-08-21",
    endExclusive: "2026-09-13"
  },

  forecast: {
    start: "2026-09-06",
    endExclusive: "2026-09-13",
    label: "6–12 Sep 2026"
  },

  cautions: {
    weather: "FO enclosure, splicing and testing may be suspended during strong wind or heavy rain.",
    iac26: "Splicing/testing remains ongoing; test-data discrepancies require comparison and alignment with SCADA data."
  },

  iacs: [
    {
      id: "IAC09",
      string: "String 3",
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
        note: "L1 & L3 final heat shrinks applied; ready for accessories installation and then plug-in. L2 exact status is not confirmed in the latest recap."
      },
      FO: {
        stages: {
          access: "done",
          enclosurePrep: "progress",
          cablePrep: "progress",
          routingTrays: "progress",
          earthing: "tbc",
          preTermTest: "progress",
          splicing: "pending",
          retestScada: "pending",
          closeOut: "pending"
        },
        remaining: "3–4 active shifts, subject to testing results and weather",
        note: "FO preparation and pre-term testing are ongoing. Exact completed fibre count and enclosure status are not confirmed."
      }
    },

    {
      id: "IAC17",
      string: "String 2",
      HV: {
        stages: {
          cablePrep: "done",
          hangOff: "done",
          softRouting: "done",
          corePrep: "tbc",
          heatShrink: "tbc",
          accessories: "tbc",
          plugIn: "pending",
          closeOut: "pending"
        },
        remaining: "TBC — allow approximately 4–5 active shifts for planning",
        note: "FO testing is complete, but HV termination remains in SPIE planning. The exact current HV termination stage and duration are not confirmed."
      },
      FO: {
        stages: {
          access: "done",
          enclosurePrep: "done",
          cablePrep: "done",
          routingTrays: "done",
          earthing: "done",
          preTermTest: "done",
          splicing: "done",
          retestScada: "done",
          closeOut: "done"
        },
        remaining: "Completed",
        note: "FO testing was reported completed. The FO workstream is shown as complete based on the latest available recap."
      }
    },

    {
      id: "IAC21",
      string: "String 1",
      HV: {
        stages: {
          cablePrep: "done",
          hangOff: "done",
          softRouting: "done",
          corePrep: "tbc",
          heatShrink: "tbc",
          accessories: "tbc",
          plugIn: "tbc",
          closeOut: "pending"
        },
        remaining: "TBC — exact remaining HV stage and duration not confirmed",
        note: "Earlier PHOC and routing works were completed. The exact remaining HV termination stage is not confirmed in the latest records."
      },
      FO: {
        stages: {
          access: "done",
          enclosurePrep: "done",
          cablePrep: "done",
          routingTrays: "done",
          earthing: "tbc",
          preTermTest: "tbc",
          splicing: "pending",
          retestScada: "pending",
          closeOut: "pending"
        },
        remaining: "3–4 night shifts, subject to restart of night-shift work",
        note: "Remaining FO termination work is pending and linked to night-shift availability. The exact fibre and splicing stage is not confirmed."
      }
    },

    {
      id: "IAC22",
      string: "String 5",
      HV: {
        stages: {
          cablePrep: "done",
          hangOff: "done",
          softRouting: "done",
          corePrep: "done",
          heatShrink: "done",
          accessories: "done",
          plugIn: "done",
          closeOut: "progress"
        },
        remaining: "Close-out or punch items only, if any",
        note: "L1, L2 and L3 have been plugged in. Main HV termination is substantially complete; remaining work is expected to be close-out or punch items, if any."
      },
      FO: {
        stages: {
          access: "done",
          enclosurePrep: "done",
          cablePrep: "done",
          routingTrays: "done",
          earthing: "tbc",
          preTermTest: "done",
          splicing: "tbc",
          retestScada: "tbc",
          closeOut: "tbc"
        },
        remaining: "TBC — final splicing, testing and close-out status not confirmed",
        note: "Earlier records show FO pre-term work completed for String 5 / IAC22. Later splicing and final close-out status are not fully confirmed."
      }
    },

    {
      id: "IAC26",
      string: "String 6",
      HV: {
        stages: {
          cablePrep: "done",
          hangOff: "done",
          softRouting: "done",
          corePrep: "tbc",
          heatShrink: "tbc",
          accessories: "tbc",
          plugIn: "tbc",
          closeOut: "tbc"
        },
        remaining: "TBC — current HV stage and duration not confirmed",
        note: "Current confirmed activity is FO. The latest records do not clearly establish the remaining HV termination stage, so later HV stages remain TBC."
      },
      FO: {
        stages: {
          access: "done",
          enclosurePrep: "done",
          cablePrep: "done",
          routingTrays: "done",
          earthing: "done",
          preTermTest: "done",
          splicing: "progress",
          retestScada: "progress",
          closeOut: "pending"
        },
        remaining: "3–4 working shifts, subject to weather and resolution of testing issues",
        note: "2 × 24F cables stripped, routed and prepared into trays; earthing connected; 36 fibres spliced. Testing and SCADA data verification remain ongoing after test-data discrepancies."
      }
    }
  ]
};
