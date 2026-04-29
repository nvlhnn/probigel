module.exports = function (eleventyConfig) {
  // Passthrough copy — don't copy css since Tailwind builds to _site/css
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Date filter
  eleventyConfig.addFilter("dateFormat", function (date) {
    if (!date) return "";
    const d = new Date(date);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Limit filter
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Stars filter for testimonials
  eleventyConfig.addFilter("stars", function (n) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  });

  // Sort FAQ by order
  eleventyConfig.addCollection("faqSorted", function(collectionApi) {
    return collectionApi.getFilteredByTag("faq").sort((a, b) => {
      return (a.data.order || 100) - (b.data.order || 100);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
