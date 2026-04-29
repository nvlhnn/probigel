const fs = require("fs");
const path = require("path");

function readJsonFolder(folder) {
  const fullPath = path.join(__dirname, "src", "content", folder);

  return fs.readdirSync(fullPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(fullPath, file);
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    })
    .sort((a, b) => (a.order || 100) - (b.order || 100));
}

function resolveImageUrl(url) {
  if (!url) return "";

  const value = String(url).trim();
  const driveFileMatch = value.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const driveIdMatch = value.match(/[?&]id=([^&]+)/);
  const driveId = driveFileMatch?.[1] || driveIdMatch?.[1];

  if (driveId) {
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  }

  return value;
}

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

  eleventyConfig.addFilter("imageUrl", resolveImageUrl);

  // Sort FAQ by order
  eleventyConfig.addCollection("faqSorted", function(collectionApi) {
    return collectionApi.getFilteredByTag("faq").sort((a, b) => {
      return (a.data.order || 100) - (b.data.order || 100);
    });
  });

  eleventyConfig.addGlobalData("cmsProducts", function() {
    return readJsonFolder("products");
  });

  eleventyConfig.addGlobalData("cmsTestimonials", function() {
    return readJsonFolder("testimonials");
  });

  eleventyConfig.addGlobalData("cmsWounds", function() {
    return readJsonFolder("wounds");
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
