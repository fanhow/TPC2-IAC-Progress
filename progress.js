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
  statusDate: "2026-08-27",
  basisLabel: "SPIE 7DLA issued 27 Aug 2026",

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
    iac26: "Splicing/testing remains ongoing; test-data discrepancies require comparison and alignment with SCADA data.",
    nightShift: "Night work is currently expected only for this weekend. Night shifts after 30 Aug are not confirmed and remain subject to manpower and SOV availability."
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
        remaining: "Planned through 28 Aug day shift; actual completion remains subject to progress",
        note: "The latest 7DLA schedules HV terminations of String 3 on 27–28 Aug day shifts. The latest confirmed field update remains: L1 & L3 final heat shrinks applied; L2 exact status is not confirmed."
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
        remaining: "Planned across 29 Aug–2 Sep day shifts; night support after the weekend is unconfirmed",
        note: "The latest 7DLA schedules FO terminations of String 3 from 29 Aug to 2 Sep day shifts. String 3 earthing is also shown on later night shifts, but those shifts are not confirmed."
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
        remaining: "Planned across 29 Aug–1 Sep day shifts; completion date is not confirmed",
        note: "The latest 7DLA schedules HV terminations of String 2 from 29 Aug to 1 Sep day shifts. The exact starting stage and actual completion remain to be confirmed."
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
        note: "FO testing was previously reported completed. A String 2 earthing arrangement appears on the 2 Sep night plan, but its workstream and shift availability are not confirmed."
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
        remaining: "Planned on 2 Sep day shift; duration beyond the current 7DLA is not confirmed",
        note: "The latest 7DLA shows HV terminations of String 1 on 2 Sep day shift. Earlier PHOC and routing works were completed, but the exact remaining stage and duration are not confirmed."
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
        remaining: "At least 3–4 night shifts; only weekend night work is currently expected",
        note: "The 7DLA schedules FO terminations of String 1 from the 30 Aug night shift onward. Night shifts after the weekend are not confirmed due to manpower and SOV availability, so this scope may remain outstanding."
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
        remaining: "TBC — String 5 earthing is shown on the 30 Aug night plan",
        note: "Earlier records show FO pre-term work completed for String 5 / IAC22. The latest 7DLA shows a String 5 earthing arrangement on the 30 Aug night shift; later close-out status is not confirmed."
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
        remaining: "Planned for 27–28 Aug day shifts, subject to weather and test resolution",
        note: "The latest 7DLA continues FO terminations of String 6 on 27–28 Aug day shifts. The latest confirmed field update remains: 36 fibres spliced, with testing and SCADA data verification still ongoing after test-data discrepancies."
      }
    }
  ]
};
