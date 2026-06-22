// NavBar
document.addEventListener("DOMContentLoaded", () => {
	const navDefault = document.getElementById("navbar-default");
	const navFloat = document.getElementById("navbar-floating");
	const hamFloat = document.getElementById("hamburger-btn");
	const hamDefault = document.getElementById("ham-default");
	const mobMenu = document.getElementById("mobile-menu");
	const defaultMenu = document.getElementById("defaultNavMenu");
	const sections = document.querySelectorAll("section[id]");
	const allLinks = document.querySelectorAll("[data-section]");

	let menuOpen = false;
	let raf = null;
	let lastY = window.scrollY;
	let navBottom = navDefault.getBoundingClientRect().bottom + window.scrollY;

	const closeMenu = () => {
		menuOpen = false;
		mobMenu.classList.remove("is-open");
		hamFloat.setAttribute("aria-expanded", "false");
		mobMenu.setAttribute("aria-hidden", "true");
	};

	const openMenu = () => {
		menuOpen = true;
		mobMenu.classList.add("is-open");
		hamFloat.setAttribute("aria-expanded", "true");
		mobMenu.setAttribute("aria-hidden", "false");
	};

	const showFloat = () => {
		navFloat.classList.add("is-visible");
		navFloat.setAttribute("aria-hidden", "false");
	};

	const hideFloat = () => {
		navFloat.classList.remove("is-visible");
		navFloat.setAttribute("aria-hidden", "true");
		if (menuOpen) closeMenu();
	};

	const spySections = () => {
		const mid = window.scrollY + 120;
		let active = null;
		sections.forEach((s) => {
			if (s.offsetTop <= mid) active = s.id;
		});
		allLinks.forEach((l) =>
			l.classList.toggle("active", l.dataset.section === active),
		);
	};

	const onFrame = () => {
		raf = null;
		window.scrollY > navBottom ? showFloat() : hideFloat();
		if (menuOpen && Math.abs(window.scrollY - lastY) > 8) closeMenu();
		lastY = window.scrollY;
		spySections();
	};

	window.addEventListener(
		"scroll",
		() => {
			if (!raf) raf = requestAnimationFrame(onFrame);
		},
		{ passive: true },
	);

	hamFloat.addEventListener("click", () =>
		menuOpen ? closeMenu() : openMenu(),
	);

	hamDefault.addEventListener("click", () => {
		const expanded = hamDefault.getAttribute("aria-expanded") === "true";
		hamDefault.setAttribute("aria-expanded", String(!expanded));
		defaultMenu.classList.toggle("show", !expanded);
	});

	document.addEventListener("click", (e) => {
		if (menuOpen && !navFloat.contains(e.target)) closeMenu();
		if (
			!navDefault.contains(e.target) &&
			defaultMenu.classList.contains("show")
		) {
			defaultMenu.classList.remove("show");
			hamDefault.setAttribute("aria-expanded", "false");
		}
	});

	allLinks.forEach((l) =>
		l.addEventListener("click", (e) => {
			e.preventDefault();
			const target = document.getElementById(l.getAttribute("href").slice(1));
			if (!target) return;
			const offset = navFloat.classList.contains("is-visible") ? 80 : 0;
			window.scrollTo({
				top: target.getBoundingClientRect().top + window.scrollY - offset,
				behavior: "smooth",
			});
			if (menuOpen) closeMenu();
			if (defaultMenu.classList.contains("show")) {
				defaultMenu.classList.remove("show");
				hamDefault.setAttribute("aria-expanded", "false");
			}
		}),
	);

	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			navBottom = navDefault.getBoundingClientRect().bottom + window.scrollY;
			if (window.innerWidth >= 992 && menuOpen) closeMenu();
		}, 150);
	});

	spySections();
	onFrame();
});

// Typing Effect
const words = [
	"Informatics Student",
	"Front-End Developer",
	"Still Learning",
];

const text = document.getElementById("typing-text");

let word = 0;
let char = 0;
let deleting = false;

function type() {
	const current = words[word];

	text.textContent = current.slice(0, char);

	if (!deleting) {
		char++;

		if (char > current.length) {
			deleting = true;
			return setTimeout(type, 1500);
		}
	} else {
		char--;

		if (char === 0) {
			deleting = false;
			word = (word + 1) % words.length;
		}
	}

	setTimeout(type, deleting ? 50 : 100);
}

type();

// Certificates modal
function showCertificate(src) {
	document.getElementById("certificatePreview").src = src;

	const modal = new bootstrap.Modal(
		document.getElementById("certificateModal"),
	);

	modal.show();
}

