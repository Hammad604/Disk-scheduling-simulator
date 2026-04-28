<div align="center">

# 💾 Disk Scheduling Simulator

### An Interactive OS-Level Visualization Tool for Disk Scheduling Algorithms

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.9-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Status](https://img.shields.io/badge/Status-Active-2E8B57)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

---


## 📌 Overview

**Disk Scheduling Simulator** is an educational web application designed to demystify operating system disk scheduling mechanisms. By providing an intuitive interface, real-time execution logs, and graphical charting, the simulator bridges theoretical concepts with practical visualization.

Users can input custom disk request queues, select from six classic algorithms, and instantly compare performance metrics such as seek time, throughput, and request order.

### Why This Project?

Understanding disk scheduling algorithms can be challenging when only studying theoretical concepts. This simulator provides:
- **Hands-on learning** through interactive visualization
- **Instant feedback** on algorithm performance
- **Comparative analysis** between different algorithms
- **Visual representation** of abstract concepts

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎮 **Interactive Simulator** | Dynamic input forms, algorithm selection, and one-click execution. |
| 📊 **Graphical Analysis** | Real-time bar charts & sequence diagrams powered by Chart.js. |
| 📈 **Performance Metrics** | Total seek time, average seek time, system throughput, and execution order. |
| 🎨 **Modern UI/UX** | Clean, responsive design with smooth navigation and shadow effects. |
| 🔄 **Algorithm Comparison** | Run multiple algorithms sequentially to compare efficiency. |
| 📱 **Responsive Layout** | Fully functional on desktops and tablets. |


---
## 🌐 Live Demo

<div align="center">

<a href="https://yourusername.github.io/disk-scheduling-simulator/" target="_blank">

<img src="https://img.shields.io/badge/🚀%20Launch%20Live%20Project-Open%20Website-0d6efd?style=for-the-badge&logo=google-chrome&logoColor=white" />

</a>

<br><br>

✨ Click the button above to open the live Disk Scheduling Simulator instantly.

</div>

## 🧠 Implemented Algorithms

### 1. **FCFS (First Come First Serve)**
- Serves requests in the order they arrive
- Simple but can lead to high seek times
- Non-preemptive in nature

### 2. **SSTF (Shortest Seek Time First)**
- Selects request with minimum seek time from current position
- Improves performance but may cause starvation
- Greedy approach

### 3. **SCAN (Elevator Algorithm)**
- Moves head from one end to other serving requests
- Also known as elevator algorithm


### 4. **C-SCAN (Circular SCAN)**
- SCAN variant that goes only in one direction
- Returns directly to start without serving requests
- Provides uniform wait time

### 5. **LOOK**
- Similar to SCAN but reverses direction at last request
- More efficient than SCAN
- Reduces unnecessary head movement

### 6. **C-LOOK (Circular LOOK)**
- LOOK variant with circular movement
- Most efficient among all algorithms
- Optimal for modern systems

---

## 📊 Output Metrics

Upon execution, the simulator displays:

| Metric | Description |
| :--- | :--- |
| ✅ **Execution Order** | Sequence of served disk requests with visualization |
| ⏱️ **Total Seek Time** | Accumulated head movement|
| 📉 **Average Seek Time** | Mean seek distance per request (Total Seek Time / Number of Requests) |
| 🚀 **System Throughput** | Requests processed per unit time (simulated metric) |
| 🧠 **Algorithm Type** | Algorithm classification (Non-Preemptive for all) |
| 📈 **Visual Graph** | Comparative bar chart of individual seek times |
| 🎯 **Head Movement** | Total distance traveled by disk head |

---

## 🛠️ Technology Used

- HTML
- CSS
- JavaScript (Core Logic)
- Chart.js (Graphs & Visualization)
  

## 🔧 Development Tools

- VS Code
