let chart1, chart2, chart3;
// FCFS
function fcfs(req, head) {
    let seek = 0;
    let seq = [];

    for (let r of req) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    return { sequence: seq, seek: seek };
}
// SSTF
function sstf(req, head) {
    let seek = 0;
    let seq = [];
    let requests = [...req];

    while (requests.length > 0) {
        let closest = requests.reduce((prev, curr) =>
            Math.abs(curr - head) < Math.abs(prev - head) ? curr : prev
        );

        seek += Math.abs(head - closest);
        head = closest;
        seq.push(closest);
        requests.splice(requests.indexOf(closest), 1);
    }

    return { sequence: seq, seek: seek };
}
// SCAN
function scan(req, head) {
    let seek = 0;
    let seq = [];

    let left = req.filter(x => x < head).sort((a, b) => b - a);
    let right = req.filter(x => x >= head).sort((a, b) => a - b);
// Move right
    for (let r of right) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    // Always go to end (important)
    seek += Math.abs(head - 199);
    head = 199;

    // Move left
    for (let r of left) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    return { sequence: seq, seek: seek };
}

// C-SCAN
function cscan(req, head) {
    let seek = 0;
    let seq = [];

    let left = req.filter(x => x < head).sort((a, b) => a - b);
    let right = req.filter(x => x >= head).sort((a, b) => a - b);

    // Move right
    for (let r of right) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    //Go to end then jump to start
    seek += Math.abs(head - 199);
    head = 0;
    seek += 199;

    // Move left side
    for (let r of left) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    return { sequence: seq, seek: seek };
}

// LOOK
function look(req, head) {
    let seek = 0;
    let seq = [];
    let left = req.filter(x => x < head).sort((a, b) => b - a);
    let right = req.filter(x => x >= head).sort((a, b) => a - b);

    for (let r of right) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    for (let r of left) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    return { sequence: seq, seek: seek };
}

// C-LOOK
function clook(req, head) {
    let seek = 0;
    let seq = [];
    let left = req.filter(x => x < head).sort((a, b) => a - b);
    let right = req.filter(x => x >= head).sort((a, b) => a - b);

    for (let r of right) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    if (left.length > 0) {
        seek += Math.abs(head - left[0]);
        head = left[0];
    }

    for (let r of left) {
        seek += Math.abs(head - r);
        head = r;
        seq.push(r);
    }

    return { sequence: seq, seek: seek };
}

// MAIN FUNCTION

function runAlgo(algo) {

    let req = document.getElementById("requests").value
        .split(",")
        .map(x => Number(x.trim()));

    let head = parseInt(document.getElementById("head").value);
    let originalHead = head;

    // Empty / Invalid check
    if (req.length === 0 || req.some(isNaN) || isNaN(head)) {
        alert("Please enter valid numbers.");
        return;
    }

    //Range check 0 to 200
    if (head < 0 || head > 200 || req.some(x => x < 0 || x > 200)) {
        document.getElementById("output").innerHTML =
"<div class='algo-box'><div class='algo-title'>Invalid Input</div><div class='algo-text'>Values must be between 0 and 200 only.</div></div>";
return;
    }

    let result;

    switch(algo) {
        case "fcfs": result = fcfs(req, originalHead); break;
        case "sstf": result = sstf(req, originalHead); break;
        case "scan": result = scan(req, originalHead); break;
        case "cscan": result = cscan(req, originalHead); break;
        case "look": result = look(req, originalHead); break;
        case "clook": result = clook(req, originalHead); break;
        default:
            alert("Invalid Algorithm");
            return;
    }

    let seq = result.sequence;
    let seek = result.seek;

    let avg = (seek / seq.length).toFixed(2);
    let throughput = seek === 0 ? 0 : (seq.length / seek).toFixed(4);

    let name = algo.toUpperCase();

    let output = `
<div class="algo-box">
  <div class="algo-title">${name} Algorithm</div>

  <div class="algo-text"><b>Type:</b> Non-Preemptive</div>
  <div class="algo-text"><b>${name} Execution Order:</b> ${originalHead} → ${seq.join(" → ")}</div>
  <div class="algo-text"><b>${name} Total Seek Time:</b> ${seek}</div>
  <div class="algo-text"><b>${name} Avg. Seek Time:</b> ${avg}</div>
  <div class="algo-text"><b>${name} System Throughput:</b> ${throughput} ops/time unit</div>
</div>
`;

    document.getElementById("output").innerHTML = output;

    drawHeadGraph(seq, originalHead);

    let results = {
        FCFS: fcfs(req, originalHead),
        SSTF: sstf(req, originalHead),
        SCAN: scan(req, originalHead),
        CSCAN: cscan(req, originalHead),
        LOOK: look(req, originalHead),
        CLOOK: clook(req, originalHead)
    };

    drawAllGraphs(results, algo);
}
// GRAPHS
function drawHeadGraph(seq, head) {

    if (chart1) chart1.destroy();

    let data = [head, ...seq];

    chart1 = new Chart(document.getElementById("chart1"), {
        type: "line",
        data: {
            labels: data.map((_, i) => "Step " + i),
            datasets: [{
                label: "Head Movement",
                data: data,
                borderWidth: 3,
                tension: 0.3,
                pointRadius: 5,
                borderColor: "blue"
            }]
        }
    });
}

// Comparison Graphs
function drawAllGraphs(results, selectedAlgo) {

    if (chart2) chart2.destroy();
    if (chart3) chart3.destroy();

    let key = selectedAlgo.toLowerCase(); // ⭐ safe

    let value;

    if (key === "fcfs") value = results.FCFS.seek;
    else if (key === "sstf") value = results.SSTF.seek;
    else if (key === "scan") value = results.SCAN.seek;
    else if (key === "cscan") value = results.CSCAN.seek;
    else if (key === "look") value = results.LOOK.seek;
    else if (key === "clook") value = results.CLOOK.seek;

    let name = key.toUpperCase();

    let colors = {
        fcfs: "blue",
        sstf: "green",
        scan: "yellow",
        cscan: "red",
        look: "purple",
        clook: "orange"
    };

    //single bar graph
    chart3 = new Chart(document.getElementById("chart3"), {
        type: "bar",
        data: {
            labels: [name],
            datasets: [{
                label: "Total Seek Time",
                data: [value],
                backgroundColor: [colors[key]]
            }]
        }
    });

    // optional simple line graph
    chart2 = new Chart(document.getElementById("chart2"), {
        type: "line",
        data: {
            labels: [name],
            datasets: [{
                label: name,
                data: [value],
                borderWidth: 3,
                borderColor: colors[key]
            }]
        }
    });
}



// Reset
function resetAll() {
    document.getElementById("requests").value = "";
    document.getElementById("head").value = "";
    document.getElementById("output").innerHTML = "";

    if (chart1) chart1.destroy();
    if (chart2) chart2.destroy();
    if (chart3) chart3.destroy();
}