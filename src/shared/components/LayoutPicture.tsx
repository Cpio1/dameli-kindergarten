import { otherQuery } from "../utils/layout";

/** 1×1 transparent GIF: what the hidden composition's photos "load" instead of the real file. */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Wraps a photo that belongs to one composition. Before hydration both compositions are in the
 * HTML and browsers may still fetch lazy images inside `display: none`; the first `<source>`
 * matches the *other* layout's media query and points to an inline blank, so on that screen the
 * real file is never requested. `media` is the query of the layout that shows this photo.
 */
export function LayoutPicture({ media, children }: { media: string; children: React.ReactNode }) {
  return (
    <picture>
      <source media={otherQuery(media)} srcSet={BLANK} />
      {children}
    </picture>
  );
}
