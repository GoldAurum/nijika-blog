
document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click", () => {
        const value = tag.dataset.tag;

        document.querySelectorAll(".post").forEach(post => {
            post.style.display =
                post.dataset.tags.includes(value)
                    ? ""
                    : "none";
        });
    });
});