const questions = [
  { q: "Which part of a plant makes food?", options: ["Root", "Leaf", "Flower"], answer: "Leaf" },
  { q: "Plants need which gas to make food?", options: ["Oxygen", "Carbon dioxide", "Nitrogen"], answer: "Carbon dioxide" },
  { q: "What gives plants energy to make food?", options: ["Moonlight", "Sunlight", "Rain"], answer: "Sunlight" }
];
const state = JSON.parse(localStorage.getItem("pathshala-progress") || "{\"completed\":0,\"best\":0}");
const $ = (id) => document.getElementById(id);
const save = () => localStorage.setItem("pathshala-progress", JSON.stringify(state));
function updateProgress() { const percent = Math.round((state.completed / questions.length) * 100); $("completedCount").textContent = state.best; $("progressText").textContent = `${percent}%`; document.querySelector(".progress-ring").style.setProperty("--progress", `${percent}%`); $("progressNote").textContent = percent ? `${state.completed} of ${questions.length} answers correct in your latest quiz.` : "Complete a quiz to begin tracking progress."; }
function renderQuiz() { $("quiz").innerHTML = questions.map((item, index) => `<div class="question"><p>${index + 1}. ${item.q}</p>${item.options.map(option => `<label class="choice"><input type="radio" name="q${index}" value="${option}"> ${option}</label>`).join("")}</div>`).join(""); }
function tutorReply(question) { const q = question.toLowerCase(); if (q.includes("photo") || q.includes("plant")) return "Photosynthesis is how green plants make food. Leaves use sunlight, water and carbon dioxide to make sugar and release oxygen."; if (q.includes("fraction")) return "A fraction is a part of a whole. If a roti is cut into 4 equal pieces and you eat 1, you ate 1/4."; if (q.includes("beautiful")) return "Try: ‘The beautiful sunrise made the village glow.’ A describing word like beautiful is called an adjective."; return "Great question. Offline demo mode is active, so I can guide you through Maths, Science, and English examples. A local AI model will replace this tutor response in the next build."; }
function ask(question) { const chat = $("chat"); chat.insertAdjacentHTML("beforeend", `<p class="message student">${question.replace(/[<>&]/g, "")}</p><p class="message tutor">${tutorReply(question)}</p>`); chat.scrollTop = chat.scrollHeight; }
$("questionForm").addEventListener("submit", (event) => { event.preventDefault(); const input = $("question"); ask(input.value); input.value = ""; });
document.querySelectorAll(".pill").forEach(button => button.addEventListener("click", () => ask(button.dataset.question)));
$("submitQuiz").addEventListener("click", () => { const score = questions.reduce((total, item, index) => total + (document.querySelector(`input[name=q${index}]:checked`)?.value === item.answer), 0); state.completed = score; state.best = Math.max(state.best, score); save(); updateProgress(); $("feedback").textContent = score === 3 ? "Excellent - all answers are correct!" : `You got ${score} out of 3. Review the lesson and try again.`; });
$("resetProgress").addEventListener("click", () => { state.completed = 0; state.best = 0; save(); updateProgress(); });
function updateConnection() { const online = navigator.onLine; $("connectionStatus").textContent = online ? "Online - ready to sync" : "Offline - learning saved on device"; $("connectionStatus").classList.toggle("offline", !online); }
window.addEventListener("online", updateConnection); window.addEventListener("offline", updateConnection);
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js");
renderQuiz(); updateProgress(); updateConnection();
