import type { Components } from "react-markdown";

/**
 * Shared react-markdown overrides so embedded images render as a clean
 * <figure> with an optional <figcaption> (taken from the markdown image
 * "title"): `![alt](url "caption")`. The paragraph that react-markdown
 * wraps a lone image in is unwrapped to avoid invalid <p><figure> nesting
 * (which would otherwise cause a hydration mismatch).
 */
export const figureComponents: Components = {
  p({ node, children }) {
    const only = node?.children?.length === 1 ? node.children[0] : undefined;
    if (only && "tagName" in only && only.tagName === "img") {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  img({ src, alt, title }) {
    if (typeof src !== "string" || src.length === 0) return null;
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} loading="lazy" />
        {title ? <figcaption>{title}</figcaption> : null}
      </figure>
    );
  },
};
