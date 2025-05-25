export const CopyRight = () => {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: "0"}}
      >
        <main style={{ flex: 1 }}></main>
        <footer
          style={{
            backgroundColor: "rgba(6, 72, 132, 0.95)",
            color: "#fff",
            padding: "0.75rem 1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            borderTop: "2px solid #0d0301",
          }}
        >
          <div>
            © {new Date().getFullYear()} BibleVerse All rights reserved.
          </div>
          <div style={{ marginTop: "0.25rem" }}>
            Unauthorized duplication is prohibited. All trademarks are property
            of their respective owners.
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <a
              href="/terms"
              style={{
                color: "#fff",
                marginRight: "1rem",
                textDecoration: "underline",
              }}
            >
              Terms
            </a>
            <a
              href="/privacy"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Privacy
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};
