const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");

let allGOs = [];

// ----------------------------------------------------
// GitHub Repository की जानकारी अपने-आप पता करना
// ----------------------------------------------------

function getGitHubInfo() {

    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Example:
    // username.github.io/repository/

    if (!hostname.endsWith(".github.io")) {
        return null;
    }

    const owner = hostname.replace(".github.io", "");

    const parts = pathname
        .split("/")
        .filter(Boolean);

    let repo;

    if (parts.length > 0) {
        repo = parts[0];
    } else {
        repo = owner + ".github.io";
    }

    return {
        owner: owner,
        repo: repo,
        branch: "main",
        folder: "GO"
    };
}


// ----------------------------------------------------
// GO Folder से PDF files प्राप्त करना
// ----------------------------------------------------

async function loadGOs() {

    const github = getGitHubInfo();

    if (!github) {

        goList.innerHTML = `
            <p class="error">
                यह portal GitHub Pages पर नहीं चल रहा है।
            </p>
        `;

        return;
    }

    const apiURL =
        `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${github.folder}?ref=${github.branch}`;

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {

            throw new Error(
                `GitHub API Error: ${response.status}`
            );
        }

        const files = await response.json();

        // केवल PDF files
        allGOs = files
            .filter(file =>
                file.type === "file" &&
                file.name.toLowerCase().endsWith(".pdf")
            )
            .sort((a, b) =>
                a.name.localeCompare(b.name, "hi")
            );

        displayGOs(allGOs);

    } catch (error) {

        console.error(error);

        goList.innerHTML = `
            <div class="error">
                <h3>GO load नहीं हो पाए</h3>
                <p>
                    कृपया जाँच करें कि GitHub में
                    <b>GO</b> नाम का folder मौजूद है।
                </p>
            </div>
        `;
    }
}


// ----------------------------------------------------
// GO Display
// ----------------------------------------------------

function displayGOs(gos) {

    if (gos.length === 0) {

        goList.innerHTML = `
            <p class="no-result">
                कोई GO उपलब्ध नहीं है।
            </p>
        `;

        return;
    }

    goList.innerHTML = "";

    gos.forEach((go, index) => {

        // PDF का नाम
        let goName = go.name
            .replace(/\.pdf$/i, "")
            .replace(/_/g, " ");

        const card = document.createElement("div");

        card.className = "go-card";

        card.innerHTML = `
            
            <div class="go-info">

                <div class="go-number">
                    ${index + 1}.
                </div>

                <div class="go-name">
                    📄 ${escapeHTML(goName)}
                </div>

            </div>

            <div class="go-buttons">

                <a
                    href="${go.download_url}"
                    target="_blank"
                    class="view-btn"
                >
                    👁 देखें
                </a>

                <a
                    href="${go.download_url}"
                    download
                    class="download-btn"
                >
                    ⬇ डाउनलोड
                </a>

            </div>
        `;

        goList.appendChild(card);
    });
}


// ----------------------------------------------------
// Search
// ----------------------------------------------------

searchInput.addEventListener("input", function () {

    const searchText =
        this.value.toLowerCase().trim();

    const filteredGOs = allGOs.filter(go => {

        const fileName =
            go.name.toLowerCase();

        return fileName.includes(searchText);
    });

    displayGOs(filteredGOs);
});


// ----------------------------------------------------
// Security
// ----------------------------------------------------

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ----------------------------------------------------
// Portal Start
// ----------------------------------------------------

loadGOs();
