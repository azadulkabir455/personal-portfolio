export interface PrivacyPolicyContent {
  title: string;
  updatedAt: string;
  content: string;
}

export const privacyPolicyContent: PrivacyPolicyContent = {
  title: "Privacy Policy",
  updatedAt: "September 1, 2026",
  content: `
    <p>This Privacy Policy explains how I collect, use, and protect the information you share when you visit this portfolio website or reach out through the contact form.</p>
    <h2>Information I Collect</h2>
    <p>When you fill out the contact form, I collect the details you provide such as your name, email address, and message. I do not collect any information beyond what you willingly submit.</p>
    <h2>How I Use Your Information</h2>
    <p>Any information you share is used solely to respond to your inquiry or discuss a potential project. Your details are never sold, rented, or shared with third parties.</p>
    <h2>Cookies</h2>
    <p>This site may use minimal, essential cookies to remember basic preferences and improve your browsing experience. No third-party tracking or advertising cookies are used.</p>
    <h2>Data Security</h2>
    <p>I take reasonable measures to protect any information shared with me from unauthorized access, alteration, or disclosure.</p>
    <h2>Contact</h2>
    <p>If you have any questions about this Privacy Policy, feel free to reach out through the contact details listed on this site.</p>
  `,
};
