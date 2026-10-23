import DOMPurify from 'dompurify';

/**
 * Normalizes a URL to ensure it has a valid protocol.
 * If user inputs "tokopedia.com/xyz", it becomes "https://tokopedia.com/xyz".
 */
export function normalizeLinkHref(href: string): string {
  if (!href) return '';
  const trimmed = href.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Auto-linkifies bare URLs found in text that are not already part of an HTML anchor tag.
 */
export function autoLinkifyText(text: string): string {
  // Regex to match URLs while avoiding URLs already inside href="..." or <a ...>...</a>
  const urlRegex = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/gi;

  // Split by existing HTML tags to only process text nodes
  const parts = text.split(/(<[^>]+>)/g);
  let insideAnchor = false;

  const processed = parts.map((part) => {
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) insideAnchor = true;
      if (/^<\/a>/i.test(part)) insideAnchor = false;
      return part;
    }

    if (insideAnchor) return part;

    return part.replace(urlRegex, (url) => {
      const fullUrl = normalizeLinkHref(url);
      return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  });

  return processed.join('');
}

/**
 * Checks if a string contains substantial HTML structure tags.
 */
export function isHtmlContent(str: string): boolean {
  if (!str) return false;
  return /<\s*(?:p|h[1-6]|ul|ol|li|blockquote|div|table|article|section)\b[^>]*>/i.test(str);
}

/**
 * Converts plain text or markdown-style text into clean semantic HTML.
 * Backward compatible for articles written without manual HTML tags.
 */
export function convertTextOrMarkdownToHtml(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // If already full HTML with paragraph/heading tags, only ensure auto-links and proper attributes
  if (isHtmlContent(trimmed)) {
    return normalizeExistingHtmlLinks(trimmed);
  }

  // Split into blocks by double newlines
  const blocks = trimmed.split(/\n\s*\n/);
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const firstLine = lines[0];

    // Heading 2 (## or lines starting with H2)
    if (firstLine.startsWith('## ') || firstLine.startsWith('##')) {
      const headingText = firstLine.replace(/^##\s*/, '');
      htmlBlocks.push(`<h2>${parseInlineFormatting(headingText)}</h2>`);
      continue;
    }

    // Heading 3 (###)
    if (firstLine.startsWith('### ') || firstLine.startsWith('###')) {
      const headingText = firstLine.replace(/^###\s*/, '');
      htmlBlocks.push(`<h3>${parseInlineFormatting(headingText)}</h3>`);
      continue;
    }

    // Heading 1 (#) mapped to h2 for SEO in article body
    if (firstLine.startsWith('# ') || firstLine.startsWith('#')) {
      const headingText = firstLine.replace(/^#\s*/, '');
      htmlBlocks.push(`<h2>${parseInlineFormatting(headingText)}</h2>`);
      continue;
    }

    // Blockquote (> )
    if (firstLine.startsWith('>')) {
      const quoteText = lines.map(l => l.replace(/^>\s*/, '')).join('<br />');
      htmlBlocks.push(`<blockquote><p>${parseInlineFormatting(quoteText)}</p></blockquote>`);
      continue;
    }

    // Bullet List (- or *)
    if (/^[-*]\s+/.test(firstLine)) {
      const items = lines
        .map(l => l.replace(/^[-*]\s+/, ''))
        .map(item => `<li>${parseInlineFormatting(item)}</li>`)
        .join('');
      htmlBlocks.push(`<ul>${items}</ul>`);
      continue;
    }

    // Numbered List (1. 2.)
    if (/^\d+\.\s+/.test(firstLine)) {
      const items = lines
        .map(l => l.replace(/^\d+\.\s+/, ''))
        .map(item => `<li>${parseInlineFormatting(item)}</li>`)
        .join('');
      htmlBlocks.push(`<ol>${items}</ol>`);
      continue;
    }

    // Standard Paragraph: join single line breaks with <br />
    const paragraphContent = lines.map(l => parseInlineFormatting(l)).join('<br />');
    htmlBlocks.push(`<p>${paragraphContent}</p>`);
  }

  const combined = htmlBlocks.join('\n\n');
  return normalizeExistingHtmlLinks(combined);
}

/**
 * Parses inline formatting: bold (**), italic (*), markdown links [text](url), and raw URLs
 */
function parseInlineFormatting(text: string): string {
  let result = text;

  // Markdown links: [anchor text](https://url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const validUrl = normalizeLinkHref(url);
    return `<a href="${validUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  // Bold: **text**
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic: *text* (excluding already formatted or tags)
  result = result.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1<em>$2</em>$3');

  // Auto-linkify raw URLs that aren't inside <a> tags
  result = autoLinkifyText(result);

  return result;
}

/**
 * Normalizes existing <a> tags in HTML:
 * - Ensures href has https:// if missing protocol
 * - Adds target="_blank" and rel="noopener noreferrer" for external links
 */
export function normalizeExistingHtmlLinks(html: string): string {
  if (!html) return '';

  return html.replace(/<a\b([^>]*)>/gi, (match, attributesStr: string) => {
    // Extract href
    const hrefMatch = attributesStr.match(/href=(["'])(.*?)\1/i);
    let newAttributes = attributesStr;

    if (hrefMatch) {
      const originalHref = hrefMatch[2];
      const normalizedHref = normalizeLinkHref(originalHref);
      newAttributes = newAttributes.replace(hrefMatch[0], `href="${normalizedHref}"`);

      const isExternal = /^https?:\/\//i.test(normalizedHref);

      if (isExternal) {
        // Ensure target="_blank"
        if (!/target=/i.test(newAttributes)) {
          newAttributes += ' target="_blank"';
        } else {
          newAttributes = newAttributes.replace(/target=(["']).*?\1/i, 'target="_blank"');
        }

        // Ensure rel="noopener noreferrer"
        if (!/rel=/i.test(newAttributes)) {
          newAttributes += ' rel="noopener noreferrer"';
        } else {
          newAttributes = newAttributes.replace(/rel=(["']).*?\1/i, 'rel="noopener noreferrer"');
        }
      }
    }

    return `<a ${newAttributes.trim()}>`;
  });
}

/**
 * Sanitizes HTML content using DOMPurify with safe whitelist of semantic elements and attributes.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'small', 'span',
      'a', 'blockquote',
      'img', 'figure', 'figcaption',
      'code', 'pre',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'div'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'title',
      'src', 'alt', 'width', 'height', 'loading',
      'class', 'style', 'id'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target', 'rel']
  });
}

/**
 * Full end-to-end pipeline:
 * 1. Converts plain text/markdown if needed
 * 2. Normalizes links (https prefix, target="_blank", rel="noopener noreferrer")
 * 3. Sanitizes through DOMPurify
 */
export function prepareArticleContent(rawContent: string): string {
  if (!rawContent) return '';
  const converted = convertTextOrMarkdownToHtml(rawContent);
  const normalized = normalizeExistingHtmlLinks(converted);
  return sanitizeHtml(normalized);
}
