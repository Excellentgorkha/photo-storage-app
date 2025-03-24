const SUPABASE_URL = "https://mbranrgqguzahmqtnequ.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icmFucmdxZ3V6YWhtcXRuZXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NzQzMzgsImV4cCI6MjA1ODM1MDMzOH0.LXef-yaXyNA-3NnbR2txduJ5kzJ0tUqS9BEKRKmRGFA"; // Never expose directly in public repo!

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const gallery = document.getElementById("gallery");

// Load images
async function loadGallery() {
    const { data, error } = await supabase.storage.from("photos").list("uploads");

    if (error) {
        console.error("Error loading images:", error.message);
        return;
    }

    gallery.innerHTML = ""; // Clear previous images
    data.forEach(file => {
        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/photos/uploads/${file.name}`;
        const img = document.createElement("img");
        img.src = imageUrl;
        img.classList = "w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer";
        img.onclick = () => window.open(imageUrl, "_blank");
        gallery.appendChild(img);
    });
}

window.onload = loadGallery;
