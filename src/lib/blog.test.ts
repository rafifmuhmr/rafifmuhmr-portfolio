import {strict as assert} from "node:assert";
import {test} from "node:test";
import {blogPosts, getReadingMinutes} from "../config/blog";
import {blogMarkdown, blogUrl} from "./blog-markdown";
import {GET} from "../app/[locale]/blog/[slug]/markdown/route";
import {getPathname} from "../i18n/navigation";

test("every article has matching localized links, content and reading time", () => {
  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
  for (const post of blogPosts) {
    for (const locale of ["en", "id"] as const) {
      const path = getPathname({locale, href: {pathname: "/blog/[slug]", params: {slug: post.slug}}});
      assert.ok(blogUrl(post, locale).endsWith(path));
      const markdown = blogMarkdown(post, locale);
      assert.ok(markdown.startsWith(`# ${post.title[locale]}\n`));
      assert.ok(markdown.includes(post.description[locale]));
      for (const section of post.sections) {
        assert.ok(markdown.includes(`## ${section.title[locale]}`));
        assert.ok(section.paragraphs[locale].every((paragraph) => markdown.includes(paragraph)));
      }
      const words = [post.title[locale], post.description[locale], ...post.sections.flatMap((section) => [section.title[locale], ...section.paragraphs[locale]])].join(" ").trim().split(/\s+/u).length;
      assert.equal(getReadingMinutes(post, locale), Math.max(1, Math.ceil(words / 200)));
    }
  }
});

test("Markdown endpoints return the right article in both languages", async () => {
  for (const post of blogPosts) {
    for (const locale of ["en", "id"] as const) {
      const response = await GET(new Request("https://example.test"), {params: Promise.resolve({locale, slug: post.slug})});
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
      assert.equal(response.headers.get("Content-Type"), "text/plain; charset=utf-8");
      assert.equal(await response.text(), blogMarkdown(post, locale));
    }
  }
});

test("Markdown rejects unknown articles and unsupported locales", async () => {
  for (const params of [{locale: "en", slug: "missing"}, {locale: "fr", slug: blogPosts[0].slug}]) {
    const response = await GET(new Request("https://example.test"), {params: Promise.resolve(params)});
    assert.equal(response.status, 404);
  }
});

test("published articles have local covers, credits and verifiable references", async () => {
  const {existsSync} = await import("node:fs");
  for (const post of blogPosts.filter((item) => !item.preview)) {
    assert.ok(post.cover?.startsWith("/images/blog/"));
    assert.ok(existsSync(`public${post.cover}`), `Missing cover: ${post.slug}`);
    assert.ok(post.coverAlt.en.length > 10 && post.coverAlt.id.length > 10);
    assert.equal(new URL(post.coverCredit.url).hostname, "unsplash.com");
    assert.equal(post.coverCredit.license, "https://unsplash.com/license");
    assert.equal(new Set(post.sections.map((section) => section.id)).size, post.sections.length);
    for (const locale of ["en", "id"] as const) {
      assert.ok(post.sections.flatMap((section) => section.paragraphs[locale]).join(" ").split(/\s+/u).length > 300);
      const markdown = blogMarkdown(post, locale);
      assert.ok(!markdown.includes("Sample article for layout preview"));
      assert.ok(post.references.every((reference) => markdown.includes(reference.url)));
    }
    assert.ok(post.references.length > 0);
    assert.ok(post.references.every((reference) => new URL(reference.url).protocol === "https:"));
  }
});
