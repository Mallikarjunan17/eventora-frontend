export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h3>Eventora Collective</h3>
          <p>Premium event planning & management services.</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: contact@eventora.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div>
          <h3>Location</h3>
          <p>Bengaluru, Karnataka</p>
          <p>India</p>
        </div>
      </div>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        © {new Date().getFullYear()} Eventora Collective. All rights reserved.
      </p>
    </footer>
  );
}
