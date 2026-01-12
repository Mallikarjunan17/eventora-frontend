export default function Contact() {
  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <h1>Contact Us</h1>
        <p>
          Have questions or want to plan a premium event?
          Reach out to Eventora Collective.
        </p>

        <div style={styles.info}>
          <p><strong>Email:</strong> support@eventora.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Bengaluru, India</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #020617, #1e1b4b)",
    color: "white"
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "500px",
    textAlign: "center",
    backdropFilter: "blur(10px)"
  },
  info: {
    marginTop: "20px",
    lineHeight: "1.8"
  }
};
