// Typing Effect
const words = [
	"Informatics Student",
	"Front-End Developer",
	"Creative Thinker",
	"Lifelong Learner",
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