// Elements
const pollForm = document.getElementById("pollForm");
const questionInput = document.getElementById("question");
const optionInput = document.getElementById("option");
const addOptionBtn = document.getElementById("addOption");
const optionsList = document.getElementById("optionsList");
const pollQuestion = document.getElementById("pollQuestion");
const voteOptions = document.getElementById("voteOptions");
const resultsChart = document.getElementById("resultsChart");

let poll = null; // Store poll data
let chart = null;

// Add poll option
addOptionBtn.addEventListener("click", () => {
    const optionText = optionInput.value.trim();
    if (!optionText) return;

    if (!poll) poll = { question: "", options: [], votes: [] };
    if (poll.options.includes(optionText)) {
        alert("Option already added!");
        return;
    }

    poll.options.push(optionText);
    poll.votes.push(0);
    renderOptions();
    optionInput.value = "";
});

// Render option list in form
function renderOptions() {
    optionsList.innerHTML = "";
    poll.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.textContent = opt;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.style.background = "#ff4d4f";
        removeBtn.onclick = () => {
            poll.options.splice(index, 1);
            poll.votes.splice(index, 1);
            renderOptions();
            renderVoteOptions();
            renderChart();
        };
        div.appendChild(removeBtn);
        optionsList.appendChild(div);
    });
}

// Create poll
pollForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!questionInput.value || !poll || poll.options.length < 2) {
        alert("Enter a question and at least 2 options!");
        return;
    }
    poll.question = questionInput.value;
    pollQuestion.textContent = poll.question;

    renderVoteOptions();
    renderChart();

    // Reset form
    questionInput.value = "";
    optionInput.value = "";
    optionsList.innerHTML = "";
});

// Render voting options
function renderVoteOptions() {
    voteOptions.innerHTML = "";
    if (!poll) return;
    poll.options.forEach((opt, index) => {
        const li = document.createElement("li");
        li.textContent = opt;
        const voteBtn = document.createElement("button");
        voteBtn.textContent = "Vote";
        voteBtn.onclick = () => {
            poll.votes[index]++;
            renderChart();
        };
        li.appendChild(voteBtn);
        voteOptions.appendChild(li);
    });
}

// Render Pie Chart
function renderChart() {
    if (!poll) return;
    const ctx = resultsChart.getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: poll.options,
            datasets: [{
                label: "Votes",
                data: poll.votes,
                backgroundColor: [
                    "#673ab7", "#4caf50", "#ff9800", "#f44336", "#2196f3",
                    "#00bcd4", "#e91e63", "#ffc107", "#795548", "#009688"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 20,
                        padding: 15
                    }
                }
            }
        }
    });
}
