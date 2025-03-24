async function loginAdmin(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("Login successful!");
        window.location.href = "admin.html"; // Redirect to admin page
    }
}

async function logout() {
    await supabase.auth.signOut();
    alert("Logged out!");
    window.location.href = "index.html";
}
