(function () {
  "use strict";
  const DAY = 86400000;
  const SOURCE = "https://fanhow.github.io/TPC2-IAC-Progress/";
  const DISCLAIMER = "Working estimate only — not a confirmed SPIE completion schedule.";
  const COLORS = { HV: "#45d5e8", FO: "#b29cff", Overall: "#40d69a" };
  const METRICS = ["HV", "FO", "Overall"];
  const monthSelect = document.getElementById("export-month");
  const canvas = document.getElementById("export-chart");
  const excelButton = document.getElementById("export-excel");
  const pngButton = document.getElementById("export-png");
  let history = [], selected = [], statusDate = "", libraryPromise;
  function dayNumber(date) { return Date.parse(date + "T00:00:00Z") / DAY; }
  function dateText(date) {
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
  }
  function monthText(month) {
    return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(month + "-01T00:00:00Z"));
  }
  function validPercent(value) { return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100; }
  function percent(value) { return validPercent(value) ? value + "%" : "No record"; }
  function textElement(tag, text, className) {
    const el = document.createElement(tag);
    el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  // Expand only the observed period; missing dates stay null and never become 0%.
  function calendarRows(records) {
    if (!records.length) return [];
    const lookup = new Map(records.map(row => [row.date, row]));
    const result = [];
    for (let day = dayNumber(records[0].date); day <= dayNumber(records[records.length - 1].date); day++) {
      const date = new Date(day * DAY).toISOString().slice(0, 10);
      result.push(lookup.get(date) || { date, missing: true, note: "No daily record available" });
    }
    return result;
  }
  function update(data) {
    statusDate = data.statusDate || "";
    history = (data.history || []).filter(row => /^\d{4}-\d{2}-\d{2}$/.test(row.date) && Number.isFinite(dayNumber(row.date)))
      .map(row => ({ ...row })).sort((a, b) => a.date.localeCompare(b.date));
    const oldSelection = monthSelect.value;
    const months = [...new Set(history.map(row => row.date.slice(0, 7)))].reverse();
    monthSelect.replaceChildren(new Option("All recorded dates", "all"), ...months.map(month => new Option(monthText(month), month)));
    monthSelect.value = oldSelection === "all" || months.includes(oldSelection) ? oldSelection : (months[0] || "all");
    render();
  }
  function render() {
    selected = calendarRows(history.filter(row => monthSelect.value === "all" || row.date.startsWith(monthSelect.value)));
    const records = selected.filter(row => !row.missing);
    const latest = records[records.length - 1];
    const weather = records.filter(row => row.adverseWeather === true);
    const summary = document.getElementById("export-summary");
    summary.replaceChildren();
    METRICS.forEach(metric => {
      const card = textElement("div", "", "export-stat");
      const value = textElement("strong", latest ? percent(latest[metric]) : "—");
      value.style.color = COLORS[metric];
      card.append(textElement("span", metric + " · latest in period"), value, textElement("small", latest ? dateText(latest.date) + " " + latest.date.slice(0, 4) : "No records"));
      summary.append(card);
    });
    const weatherCard = textElement("div", "", "export-stat");
    weatherCard.append(textElement("span", "Weather no-sailing days"), textElement("strong", String(weather.length)), textElement("small", records.length + " recorded dates in period"));
    summary.append(weatherCard);
    const dates = document.getElementById("export-weather-dates");
    dates.replaceChildren(...weather.map(row => textElement("span", dateText(row.date), "weather-date")));
    if (!weather.length) dates.append(textElement("span", "None recorded in this period"));
    excelButton.disabled = pngButton.disabled = !selected.length;
    drawChart(canvas, selected);
    document.getElementById("export-readout").textContent = latest ? readout(latest) : "No daily records available.";
    document.getElementById("export-status").textContent = "";
  }
  function readout(row) {
    return dateText(row.date) + " " + row.date.slice(0, 4) + "  ·  " + (row.missing ? "No daily record" :
      METRICS.map(metric => metric + " " + percent(row[metric])).join("  /  ") + (row.adverseWeather ? "  ·  No sailing — adverse weather" : ""));
  }
  function drawChart(target, rows) {
    const ctx = target.getContext("2d"), width = 1100, height = 420;
    target.width = width * 2; target.height = height * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = "#0a2237"; ctx.fillRect(0, 0, width, height);
    const left = 64, right = 32, top = 74, bottom = 353, plotWidth = width - left - right;
    const step = plotWidth / Math.max(rows.length, 1);
    const x = index => left + step * (index + .5);
    const y = value => bottom - value / 100 * (bottom - top);
    ctx.font = "bold 16px Segoe UI, sans-serif"; ctx.fillStyle = "#edf6fb";
    ctx.fillText("Cumulative progress", left, 27);
    METRICS.forEach((metric, i) => {
      const lx = 640 + i * 125;
      ctx.fillStyle = COLORS[metric]; ctx.fillRect(lx, 17, 22, 4);
      ctx.font = "14px Segoe UI, sans-serif"; ctx.fillText(metric, lx + 30, 26);
    });
    ctx.font = "12px Segoe UI, sans-serif"; ctx.fillStyle = "#9bb5c6";
    ctx.fillText(rows.length ? rows[0].date + " to " + rows[rows.length - 1].date : "No daily records", left, 49);
    rows.forEach((row, i) => {
      if (row.adverseWeather || row.missing) {
        ctx.fillStyle = row.missing ? "rgba(155,181,198,.07)" : "rgba(255,189,89,.13)";
        ctx.fillRect(left + i * step, top, step, bottom - top);
      }
    });
    for (let tick = 0; tick <= 100; tick += 20) {
      ctx.strokeStyle = "rgba(155,181,198,.17)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(left, y(tick)); ctx.lineTo(width - right, y(tick)); ctx.stroke();
      ctx.fillStyle = "#9bb5c6"; ctx.textAlign = "right"; ctx.fillText(tick + "%", left - 12, y(tick) + 4);
    }
    ctx.textAlign = "center";
    rows.forEach((row, i) => {
      const interval = Math.max(1, Math.ceil(rows.length / 13));
      if (i % interval === 0 || (i === rows.length - 1 && i % interval > interval / 2)) {
        ctx.fillStyle = "#9bb5c6"; ctx.fillText(dateText(row.date), x(i), bottom + 24);
      }
      if (row.adverseWeather) { ctx.fillStyle = "#ffbd59"; ctx.fillRect(x(i) - Math.min(5, step / 3), bottom + 3, Math.min(10, step * 2 / 3), 4); }
    });
    METRICS.forEach((metric, metricIndex) => {
      ctx.strokeStyle = COLORS[metric]; ctx.fillStyle = COLORS[metric]; ctx.lineWidth = metric === "Overall" ? 3 : 2;
      ctx.setLineDash(metric === "HV" ? [8, 4] : metric === "FO" ? [3, 4] : []);
      ctx.beginPath(); let connected = false;
      rows.forEach((row, i) => {
        if (!validPercent(row[metric])) { connected = false; return; }
        if (connected) ctx.lineTo(x(i), y(row[metric])); else ctx.moveTo(x(i), y(row[metric]));
        connected = true;
      }); ctx.stroke(); ctx.setLineDash([]);
      rows.forEach((row, i) => {
        if (!validPercent(row[metric])) return;
        const px = x(i), py = y(row[metric]);
        if (metricIndex === 0) { ctx.strokeRect(px - 5, py - 5, 10, 10); }
        else if (metricIndex === 1) { ctx.beginPath(); ctx.moveTo(px, py - 6); ctx.lineTo(px + 6, py + 5); ctx.lineTo(px - 6, py + 5); ctx.closePath(); ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill(); }
        if (metric === "Overall" && rows.length <= 16) {
          const lowest = Math.min(...METRICS.map(key => row[key]).filter(validPercent));
          ctx.font = "bold 12px Segoe UI, sans-serif"; ctx.fillText(row[metric] + "%", px, Math.min(bottom - 8, y(lowest) + 23));
        }
      });
    });
    ctx.textAlign = "left"; ctx.font = "12px Segoe UI, sans-serif";
    ctx.fillStyle = "#ffbd59"; ctx.fillText("Orange: no sailing / adverse weather", left, 404);
    ctx.fillStyle = "#9bb5c6"; ctx.fillText("Gaps: no record     ·     Point labels: Overall %", 415, 404);
  }
  function chartReport(rows) {
    const report = document.createElement("canvas");
    report.width = 2200; report.height = (570 + rows.length * 28) * 2;
    const ctx = report.getContext("2d"); ctx.scale(2, 2);
    ctx.fillStyle = "#0a2237"; ctx.fillRect(0, 0, 1100, report.height / 2);
    ctx.fillStyle = "#edf6fb"; ctx.font = "bold 25px Segoe UI, sans-serif"; ctx.fillText("TPC2 OSS · SPIE IAC Progress", 40, 38);
    ctx.fillStyle = "#9bb5c6"; ctx.font = "13px Segoe UI, sans-serif";
    ctx.fillText("Daily history snapshot · Status basis: " + statusDate, 40, 61);
    const chart = document.createElement("canvas"); drawChart(chart, rows); ctx.drawImage(chart, 0, 76, 1100, 420);
    const columns = [40, 250, 405, 560, 720];
    ctx.font = "bold 13px Segoe UI, sans-serif"; ctx.fillStyle = "#edf6fb";
    ["Reporting date", "HV", "FO", "Overall", "Sailing / weather record"].forEach((label, i) => ctx.fillText(label, columns[i], 515));
    rows.forEach((row, index) => {
      const yy = 530 + index * 28;
      ctx.fillStyle = row.adverseWeather ? "rgba(255,189,89,.12)" : index % 2 ? "#0c2942" : "#0a2237";
      ctx.fillRect(28, yy - 1, 1044, 28); ctx.font = "13px Segoe UI, sans-serif"; ctx.fillStyle = "#edf6fb";
      const values = [row.date, ...METRICS.map(metric => validPercent(row[metric]) ? row[metric] + "%" : "—"), row.missing ? "No record" : row.adverseWeather ? "No sailing — adverse weather" : "No weather cancellation recorded"];
      values.forEach((value, i) => { ctx.fillStyle = i === 4 && row.adverseWeather ? "#ffbd59" : "#edf6fb"; ctx.fillText(value, columns[i], yy + 18); });
    });
    ctx.font = "11px Segoe UI, sans-serif"; ctx.fillStyle = "#9bb5c6";
    ctx.fillText(DISCLAIMER, 40, 548 + rows.length * 28);
    ctx.fillText(SOURCE, 650, 548 + rows.length * 28);
    return report;
  }
  function download(blob, filename) {
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function filename(rows, extension) { return "TPC2-SPIE-Progress_" + rows[0].date + "_to_" + rows[rows.length - 1].date + "." + extension; }
  function loadExcel() {
    if (window.ExcelJS) return Promise.resolve(window.ExcelJS);
    if (!libraryPromise) libraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script"); script.src = "./vendor/exceljs.min.js";
      script.onload = () => window.ExcelJS ? resolve(window.ExcelJS) : reject(new Error("Excel exporter unavailable. Please reload and try again."));
      script.onerror = () => { script.remove(); libraryPromise = null; reject(new Error("Excel exporter could not load. Please check your connection and try again.")); };
      document.head.append(script);
    });
    return libraryPromise;
  }
  function styleSheet(sheet, widths) {
    sheet.views = [{ state: "frozen", ySplit: 1 }];
    sheet.columns = widths.map(width => ({ width }));
    sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: Math.max(1, sheet.rowCount), column: widths.length } };
    sheet.eachRow((row, index) => {
      row.height = index === 1 ? 32 : 30;
      row.eachCell({ includeEmpty: true }, cell => {
        cell.font = { name: "Calibri", size: 11, color: { argb: index === 1 ? "FFFFFFFF" : "FF183449" }, bold: index === 1 };
        cell.alignment = { vertical: "middle", wrapText: true };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: index === 1 ? "FF0C2942" : index % 2 ? "FFF0F6FA" : "FFFFFFFF" } };
      });
    });
  }
  async function exportExcel(rows, chartImage, fullHistory, basis) {
    const ExcelJS = await loadExcel(), workbook = new ExcelJS.Workbook();
    workbook.creator = "TPC2 SPIE IAC Progress"; workbook.created = new Date();
    const daily = workbook.addWorksheet("Daily Progress");
    daily.addRow(["Reporting date", "HV %", "FO %", "Overall %", "HV change (pp)", "FO change (pp)", "Overall change (pp)", "Previous record date", "Sailing / weather record", "Recap / notes"]);
    rows.forEach(row => {
      const previous = fullHistory.filter(item => item.date < row.date).at(-1);
      daily.addRow([new Date(row.date + "T00:00:00Z"), ...METRICS.map(metric => validPercent(row[metric]) ? row[metric] / 100 : null),
        ...METRICS.map(metric => !row.missing && previous && validPercent(row[metric]) && validPercent(previous[metric]) ? row[metric] - previous[metric] : null),
        !row.missing && previous ? new Date(previous.date + "T00:00:00Z") : null,
        row.missing ? "No record" : row.adverseWeather ? "No sailing — adverse weather" : "No weather cancellation recorded", row.note || ""]);
    });
    styleSheet(daily, [17, 12, 12, 14, 17, 17, 20, 20, 38, 95]);
    daily.getColumn(1).numFmt = daily.getColumn(8).numFmt = "dd mmm yyyy";
    [2, 3, 4].forEach(col => { daily.getColumn(col).numFmt = "0%"; });
    [5, 6, 7].forEach(col => { daily.getColumn(col).numFmt = "+0;-0;0"; });
    rows.forEach((row, index) => {
      const output = daily.getRow(index + 2);
      output.height = Math.max(32, Math.ceil(String(row.note || "").length / 90) * 15 + 8);
      if (row.adverseWeather) output.eachCell({ includeEmpty: true }, cell => { cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFEBD0" } }; });
    });
    const weather = workbook.addWorksheet("No Sailing");
    weather.addRow(["Reporting date", "Reason", "HV %", "FO %", "Overall %", "Recap / notes"]);
    rows.filter(row => row.adverseWeather === true).forEach(row => weather.addRow([new Date(row.date + "T00:00:00Z"), "Adverse weather", ...METRICS.map(metric => validPercent(row[metric]) ? row[metric] / 100 : null), row.note || ""]));
    styleSheet(weather, [19, 24, 14, 14, 14, 95]); weather.getColumn(1).numFmt = "dd mmm yyyy";
    [3, 4, 5].forEach(col => { weather.getColumn(col).numFmt = "0%"; });
    const trend = workbook.addWorksheet("Trend Chart");
    const image = workbook.addImage({ base64: chartImage, extension: "png" });
    trend.addImage(image, { tl: { col: 0, row: 0 }, ext: { width: 1100, height: 570 + rows.length * 28 } });
    const notes = workbook.addWorksheet("Read Me");
    notes.addRows([
      ["Field", "Description"], ["Source", SOURCE], ["Status basis", basis], ["Exported at (UTC)", new Date().toISOString()],
      ["Selected period", rows[0].date + " to " + rows[rows.length - 1].date],
      ["Percentages", "Cumulative reported dashboard snapshots; stored as numeric Excel percentages."],
      ["Change (pp)", "Change versus the previous recorded date, shown in column H. May span more than one day when records are missing. Blank means no comparable record."],
      ["Missing dates", "No record. No percentage or no-sailing status has been inferred."],
      ["No sailing", "Dates explicitly marked adverseWeather in the daily history. An unmarked date does not prove sailing occurred."],
      ["Trend chart", "Snapshot image. The Daily Progress sheet contains the numeric data for creating or editing Excel charts."],
      ["Disclaimer", DISCLAIMER]
    ]);
    styleSheet(notes, [26, 115]); notes.eachRow((row, index) => { if (index > 1) row.height = 42; });
    return new Blob([await workbook.xlsx.writeBuffer()], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }
  async function runExport(kind) {
    const rows = selected.map(row => ({ ...row })), fullHistory = history.map(row => ({ ...row })), basis = statusDate;
    if (!rows.length) return;
    const status = document.getElementById("export-status");
    excelButton.disabled = pngButton.disabled = true; status.textContent = "Preparing " + (kind === "xlsx" ? "Excel workbook…" : "chart image…");
    try {
      const report = chartReport(rows);
      const blob = kind === "xlsx" ? await exportExcel(rows, report.toDataURL("image/png"), fullHistory, basis) :
        await new Promise((resolve, reject) => report.toBlob(value => value ? resolve(value) : reject(new Error("Could not create chart image.")), "image/png"));
      download(blob, filename(rows, kind)); status.textContent = "Download ready · " + rows[0].date + " to " + rows[rows.length - 1].date;
    } catch (error) { status.textContent = "Export failed: " + error.message; }
    finally { excelButton.disabled = pngButton.disabled = !selected.length; }
  }
  monthSelect.addEventListener("change", render);
  excelButton.addEventListener("click", () => runExport("xlsx"));
  pngButton.addEventListener("click", () => runExport("png"));
  function selectPoint(event) {
    if (!selected.length) return;
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 1100;
    const index = Math.max(0, Math.min(selected.length - 1, Math.floor((x - 64) / 1004 * selected.length)));
    document.getElementById("export-readout").textContent = readout(selected[index]);
  }
  canvas.addEventListener("pointermove", selectPoint);
  canvas.addEventListener("click", selectPoint);
  window.ProgressExport = { update };
})();
