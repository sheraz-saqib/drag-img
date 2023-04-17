// create variables
const file_input = document.getElementById("file_input"),
    dragArea = document.querySelector(".dragArea"),
    exploreBtn = document.querySelector(".explore"),
    dragText = document.querySelector(".drag_text"),
    container = document.querySelector('.container'),
    downloadBtn = document.querySelector('.downloadBtn');
    
let file;
let fileUrl;
let imgTag;
let createDownload;
// button click to file explore
exploreBtn.onclick = () => {
    file_input.click();
    
};

// get img from input feild
const fileLoad = (e) => {
    let fileInputUrl = e.target.files[0];

    let finalImageUrl = URL.createObjectURL(fileInputUrl);
    let imgTag = `<img src="${finalImageUrl}" >`;
    dragArea.innerHTML = imgTag;
    createDownload = ` <a href="${finalImageUrl}"  download >download</a>`;
    downloadBtn.innerHTML = createDownload;
};
file_input.addEventListener("change", fileLoad);

// img drag over
dragArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragText.innerText = "release the image";
    dragArea.classList.add("active");
});
// img drag leave
dragArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragArea.classList.remove("active");
    dragText.innerText = "you drag the image or";
});

// img drop th drag Area
dragArea.addEventListener("drop", (e) => {
    dragArea.classList.add("drop");
    dragArea.classList.remove("active");
    e.preventDefault();
    file = e.dataTransfer.files[0];
    let fileType = file.type;
    let valid_img = ["image/jpg", "image/png", "image/jpeg","image/webp"];
    if (valid_img.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            fileUrl = fileReader.result;
             imgTag = `<img src="${fileUrl}" >`;
            dragArea.innerHTML = imgTag;
            createDownload = ` <a class="download" href="${fileUrl}"  download >download</a>`;
            downloadBtn.innerHTML = createDownload;
        };
        fileReader.readAsDataURL(file);
     
    }
     else {
        alert("please chose the currect image");
        dragArea.classList.remove("active");
        dragText.innerText = "you drag the image or";
    }
});
