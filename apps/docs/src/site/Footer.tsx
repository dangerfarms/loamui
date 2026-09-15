import "./Footer.css";

/**
 * The close of the page, and nothing more: the site map repeated the sidebar
 * and the header, so it is gone. What remains is the copyright and the one
 * thing a reader could not have learned anywhere else on the page.
 */
export function Footer() {
  return (
    <footer className="site-Footer">
      <div className="container bottom">
        <span>© {new Date().getFullYear()} LoamUI. Built by Danger Farms.</span>
        <span>
          Every page has a markdown twin: add <code>.md</code> to its address.
        </span>
      </div>
    </footer>
  );
}
