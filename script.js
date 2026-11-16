const WHATSAPP_NUMBER = "5566992599107";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".choose-product").forEach(button => {
  button.addEventListener("click", () => {
    const select = document.getElementById("produto");
    select.value = button.dataset.product;
    document.getElementById("form-pedido").scrollIntoView({ behavior: "smooth", block: "center" });
    select.focus({ preventScroll: true });
  });
});

document.getElementById("form-pedido").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const fields = [
    "Olá, Nat Doces! 💗 Gostaria de fazer uma encomenda:",
    "",
    `*Nome:* ${form.get("nome")}`,
    `*Produto:* ${form.get("produto")}`,
    `*Data do evento:* ${form.get("data") || "A combinar"}`,
    `*Quantidade:* ${form.get("quantidade") || "A combinar"}`,
    `*Ocasião:* ${form.get("ocasiao") || "Não informada"}`,
    `*Detalhes:* ${form.get("detalhes") || "Gostaria de conversar sobre as opções."}`,
    "",
    "Pode me passar as informações de valores e disponibilidade? 😊"
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fields.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting an event date in the past.
const dateInput = document.querySelector('input[name="data"]');
const today = new Date();
dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
