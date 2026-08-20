```javascript
alert("JavaScript chal raha hai");

const GITHUB_USERNAME = "rauthan91-blip";
const REPOSITORY_NAME = "mygo";
const GO_FOLDER = "GO";
const BRANCH = "main";

const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");

let allGOs = [];


// =====================================
// GitHub GO Folder से PDF Load करना
// =====================================

async function loadGOs() {

    try {

        const apiURL =
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/contents/${GO_FOLDER}?ref=${BRANCH}`;

        console.log("API URL:", apiURL);

        const response = await fetch(apiURL);

        const data = await response.json();

        console.log("GitHub Response:", data);

        if (!response.ok) {

            throw new Error(
                data.message || "GitHub से GO प्राप्त नहीं हो सके"
            );
        }

        if (!Array.isArray(data)) {

            throw new Error(
                "GO folder में files नहीं मिलीं"
            );
        }

        // केवल PDF files
        allGOs = data.filter(file =>
            file.type === "file" &&
            file.name.toLowerCase().endsWith(".pdf")
        );

        displayGOs(allGOs);

    }

    catch (error) {

        console.error("ERROR:", error);

        goList.innerHTML = `

            <div class="error">

                <h3>GO Load नहीं हो पाए</h3>

                <p>
                    <b>Error:</b>
                    ${error.message}
                </p>

                <p>
                    Repository:
                    ${GITHUB_USERNAME}/${REPOSITORY_NAME}
                </p>

                <p>
                    Folder:
                    ${GO_FOLDER}
                </p>

                <p>
                    Branch:
                    ${BRANCH}
                </p>

            </div>

        `;
    }
}


// =====================================
// GO को Portal पर दिखाना
// =====================================

function displayGOs(files) {

    if (files.length === 0) {

        goList.innerHTML = `

            <p class="loading">
                GO folder में कोई PDF नहीं मिली।
            </p>

        `;

        return;
    }


    goList.innerHTML = "";


    files.forEach((file, index) => {

        const card =
            document.createElement("div");

        card.className = "go-card";


        // PDF से .pdf हटाना
        const goName =
            file.name.replace(/\.pdf$/i, "");


        card.innerHTML = `

            <div class="go-name">

                <span>
                    ${index + 1}.
                </span>

                📄 ${escapeHTML(goName)}

            </div>


            <div class="buttons">

                <a
                    href="${file.download_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-btn">

                    👁️ View

                </a>


                <a
                    href="${file.download_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-btn">

                    ⬇️ Download

                </a>

            </div>

        `;


        goList.appendChild(card);

    });

}


// =====================================
// Search
// =====================================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            this.value
                .toLowerCase()
                .trim();


        const filteredGOs =
            allGOs.filter(file =>

                file.name
                    .toLowerCase()
                    .includes(searchText)

            );


        displayGOs(filteredGOs);

    }
);


// =====================================
// Security
// =====================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// =====================================
// Portal Start
// =====================================

loadGOs();
```
