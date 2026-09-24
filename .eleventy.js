export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets");

eleventyConfig.addFilter("postDate", (date) => {
	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(new Date(date));
});

	eleventyConfig.addCollection("posts", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("posts/*.md")
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection("reviews", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("reviews/*.md")
			.sort((a, b) => b.date - a.date);
	});

	return {
		dir: {
			input: ".",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		templateFormats: ["njk", "md", "html"],
	};
}