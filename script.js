const goData = [
    {
        number: "GO-001",
        date: "15-03-2024",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship संबंधी शासनादेश संख्या 165/XVII-2/2024-10(12)/2018",
        pdf: "pdf/GO-001.pdf"
    },

    {
        number: "GO-002",
        date: "17-08-2026",
        year: "2026",
        department: "Social Welfare Department",
        subject: "दिव्यांग छात्रवृत्ति के शासनादेश",
        pdf: "pdf/GO-002.pdf"
    },

    {
        number: "GO-003",
        date: "01-01-2018",
        year: "2025",
        department: "Social Welfare Department",
        subject: "Post-Matric Scholarship संबंधी शासनादेश संख्या 787/XVII-4/2017-01(82)/2014 में भौतिक सत्यापन",
        pdf: "pdf/GO-003.pdf"
    },

    {
        number: "GO-004",
        date: "17-08-2026",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship शासनादेश संख्या: 165/XVII-4/2017-01(82)/2014",
        pdf: "pdf/GO-004.pdf"
    },

    {
        number: "GO-005",
        date: "25-07-2024",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship शासनादेश संख्या: 326/XVII-2/2004-10(12)/2018 OBC EBC 25-07-2024",
        pdf: "pdf/GO-005.pdf"
    },
    {
        number: "GO-006",
        date: "05-11-2019",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship शासनादेश संख्या:  65/XVI-2/19-01 (04)/2019 05-11-2019",
        pdf: "pdf/GO-006.pdf"
    },
    {
        number: "GO-007",
        date: "27-03-2017",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship शासनादेश संख्या:  157/XVII-4-2017/1(82) 2014 27-03-2017",
        pdf: "pdf/GO-007.pdf"
    },
    {
        number: "GO-008",
        date: "31-10-2010",
        year: "2026",
        department: "Social Welfare",
        subject: "Scholarship शासनादेश संख्या:  File No.11017/01/2008-SCD-31-12-2010",
        pdf: "pdf/GO-008.pdf"
    },
];

const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");


function displayGO(data) {

    goList.innerHTML = "";

    if (data.length === 0) {
        goList.innerHTML = "<p>कोई GO नहीं मिला।</p>";
        return;
    }

    data.forEach(go => {

        const card = document.createElement("div");

        card.className = "go-card";

        card.innerHTML = `
            <div class="go-info">

                <h3>${go.number}</h3>

                <p>
                    <strong>Date:</strong> ${go.date}
                </p>

                <p>
                    <strong>Department:</strong> ${go.department}
                </p>

                <p>
                    <strong>Subject:</strong> ${go.subject}
                </p>

            </div>

            <div>

                <a 
                    href="${go.pdf}"
                    target="_blank"
                    class="view-btn">
                    📄 View PDF
                </a>

                <a 
                    href="${go.pdf}"
                    download
                    class="download-btn">
                    ⬇ Download
                </a>

            </div>
        `;

        goList.appendChild(card);
    });
}


searchInput.addEventListener("input", function () {

    const text = this.value.toLowerCase();

    const filtered = goData.filter(go =>
        go.number.toLowerCase().includes(text) ||
        go.subject.toLowerCase().includes(text) ||
        go.department.toLowerCase().includes(text)
    );

    displayGO(filtered);
});


displayGO(goData);
const goForm = document.getElementById("goForm");


goForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const goNumber =
        document.getElementById("goNumber").value;

    const goDate =
        document.getElementById("goDate").value;

    const department =
        document.getElementById("department").value;

    const subject =
        document.getElementById("subject").value;

    const pdfName =
        document.getElementById("pdfName").value;


    const newGO = {

        number: goNumber,

        date: goDate,

        year: goDate.substring(0, 4),

        department: department,

        subject: subject,

        pdf: "pdf/" + pdfName

    };


    goData.unshift(newGO);


    displayGO(goData);


    goForm.reset();


    alert("GO successfully added!");

});