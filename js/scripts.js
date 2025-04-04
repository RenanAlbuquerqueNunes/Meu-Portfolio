document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Garante que apenas a primeira seção seja visível no início
    sections.forEach((section, index) => {
        section.classList.toggle("show", index === 0);
        section.style.display = index === 0 ? "block" : "none";
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => {
                section.style.display = "none";
                section.classList.remove("show");
            });

            targetSection.style.display = "block";
            setTimeout(() => targetSection.classList.add("show"), 10); // Adiciona efeito de transição

            // Remove 'active' de todos os links e adiciona no clicado
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
