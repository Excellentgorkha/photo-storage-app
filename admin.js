const fileInput = document.getElementById("fileInput");

async function uploadPhoto() {
    if (!fileInput.files.length) return alert("Please select a file!");

    const file = fileInput.files[0];
    const filePath = `uploads/${file.name}`;

    const { error } = await supabase.storage.from("photos").upload(filePath, file);
    if (error) {
        console.error("Upload failed:", error.message);
    } else {
        alert("File uploaded successfully!");
        loadGallery(); // Refresh gallery after upload
    }
}

async function loadGallery() {
    const { data, error } = await supabase.storage.from("photos").list("uploads");

    if (error) {
        console.error("Error loading images:", error.message);
        return;
    }

    const gallery = document.getElementById("admin-gallery");
    gallery.innerHTML = ""; // Clear previous images
    data.forEach(file => {
        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/photos/uploads/${file.name}`;
        const img = document.createElement("img");
        img.src = imageUrl;
        img.classList = "w-full h-48 object-cover rounded-lg shadow-lg";
        gallery.appendChild(img);
    });
}

window.onload = loadGallery;
