document.getElementById("previewBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const status = document.querySelector('input[name="status"]:checked');

  if (!name || !position || !status) {
    alert("Please fill all fields and select a status");
    return;
  }

  const templates = {
    selected: `Dear ${name},\n\nWe are pleased to inform you that you have been selected for the position of ${position}.\n\nPlease reply to this email to confirm your acceptance.\n\nBest regards,\nHR Team`,
    rejected: `Dear ${name},\n\nThank you for applying for the position of ${position}.\n\nWe regret to inform you that we have decided to move forward with other candidates.\n\nBest regards,\nHR Team`
  };

  document.getElementById("previewBox").classList.remove("hidden");
  document.getElementById("previewContent").textContent = templates[status.value];
});

document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    status: document.querySelector('input[name="status"]:checked').value
  };

  const response = await fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);
});
