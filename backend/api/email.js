import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resolveServices = (lead) => {
  if (Array.isArray(lead.selectedServices) && lead.selectedServices.length > 0) {
    return lead.selectedServices;
  }

  if (lead.selectedCategory) {
    return [lead.selectedCategory];
  }

  return ["Custom Marketing Package"];
};

// Brand Colors
const COLORS = {
  primary: "#1F4037", // Deep Hunter Green
  secondary: "#FDB827", // Marigold Yellow
  bg: "#F3F4F6", // Light Gray
  card: "#FFFFFF",
  text: "#1F2937",
  textLight: "#6B7280",
};

// Common Styles
const styles = {
  body: `font-family: 'Poppins', sans-serif; background-color: ${COLORS.bg}; margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;`,
  container: `max-width: 600px; margin: 40px auto; background-color: ${COLORS.card}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);`,
  header: `background-color: ${COLORS.primary}; padding: 40px 20px; text-align: center; background-image: linear-gradient(135deg, ${COLORS.primary} 0%, #152C26 100%);`,
  logo: `color: #FFFFFF; font-size: 24px; font-weight: 700; text-decoration: none; letter-spacing: 1px;`,
  logoAccent: `color: ${COLORS.secondary};`,
  content: `padding: 40px 30px; color: ${COLORS.text}; line-height: 1.6;`,
  h1: `color: ${COLORS.primary}; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;`,
  h2: `color: ${COLORS.primary}; font-size: 18px; font-weight: 600; margin: 24px 0 12px 0; border-bottom: 2px solid ${COLORS.secondary}; display: inline-block; padding-bottom: 4px;`,
  p: `margin: 0 0 16px 0; color: ${COLORS.text}; font-size: 16px;`,
  table: `width: 100%; border-collapse: collapse; margin-bottom: 24px;`,
  tdLabel: `padding: 12px 0; color: ${COLORS.textLight}; font-weight: 500; width: 40%; border-bottom: 1px solid #E5E7EB;`,
  tdValue: `padding: 12px 0; color: ${COLORS.text}; font-weight: 600; border-bottom: 1px solid #E5E7EB;`,
  badge: `display: inline-block; padding: 4px 12px; background-color: #ECFDF5; color: ${COLORS.primary}; border-radius: 9999px; font-size: 14px; font-weight: 500; margin-right: 8px; margin-bottom: 8px;`,
  footer: `background-color: #F9FAFB; padding: 24px; text-align: center; border-top: 1px solid #E5E7EB;`,
  footerText: `color: ${COLORS.textLight}; font-size: 14px; margin: 0;`,
  button: `display: inline-block; background-color: ${COLORS.secondary}; color: ${COLORS.primary}; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 24px; text-align: center; transition: all 0.3s ease;`,
};

export const sendInternalLeadMail = async (lead) => {
  const services = resolveServices(lead);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `� New Lead: ${lead.name} (${lead.type})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="${styles.body}">
        <div style="${styles.container}">
          
          <!-- Header -->
          <div style="${styles.header}">
            <div style="${styles.logo}">
              <span style="${styles.logoAccent}">GKWEBTECH</span>
            </div>
            <div style="color: #E5E7EB; margin-top: 8px; font-size: 14px;">New Lead Notification System</div>
          </div>

          <!-- Content -->
          <div style="${styles.content}">
            <h1 style="${styles.h1}">🔥 New Lead Received</h1>
            <p style="${styles.p}">A new potential client has submitted a request via the <strong>${lead.source.replace('_', ' ')}</strong>.</p>

            <div style="background-color: #ECFDF5; border-left: 4px solid ${COLORS.primary}; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-weight: 600; color: ${COLORS.primary};">Status: <span style="color: ${COLORS.secondary}">New</span></p>
            </div>

            <h2 style="${styles.h2}">👤 Client Details</h2>
            <table style="${styles.table}">
              <tr><td style="${styles.tdLabel}">Name</td><td style="${styles.tdValue}">${lead.name}</td></tr>
              <tr><td style="${styles.tdLabel}">Email</td><td style="${styles.tdValue}"><a href="mailto:${lead.email}" style="color:${COLORS.primary}">${lead.email}</a></td></tr>
              <tr><td style="${styles.tdLabel}">Phone</td><td style="${styles.tdValue}">${lead.phone}</td></tr>
              <tr><td style="${styles.tdLabel}">Company</td><td style="${styles.tdValue}">${lead.company || "-"}</td></tr>
              <tr><td style="${styles.tdLabel}">Location</td><td style="${styles.tdValue}">${lead.country || "-"}</td></tr>
            </table>

            <h2 style="${styles.h2}">📦 Project Scope & Pricing</h2>
            <table style="${styles.table}">
              <tr><td style="${styles.tdLabel}">Plan Type</td><td style="${styles.tdValue}" style="text-transform: capitalize;">${lead.planType || lead.type}</td></tr>
              
              ${lead.planType === 'custom' && lead.basePlan ? `
                <tr><td style="${styles.tdLabel}">Base Plan</td><td style="${styles.tdValue}">${lead.basePlan.name} (${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${lead.basePlan.price})</td></tr>
              ` : ''}

              ${lead.selectedPlan ? `
                 <tr><td style="${styles.tdLabel}">Selected Package</td><td style="${styles.tdValue}">${lead.selectedPlan}</td></tr>
              ` : ''}

              ${lead.duration ? `
                 <tr><td style="${styles.tdLabel}">Duration</td><td style="${styles.tdValue}">${lead.duration}</td></tr>
              ` : ''}
            </table>

            ${lead.planType === 'custom' && lead.selectedServices && lead.selectedServices.length > 0 ? `
              <h3 style="color: ${COLORS.primary}; font-size: 16px; font-weight: 600; margin: 16px 0 8px 0;">🛠 Selected Services</h3>
              <div style="background-color: #F9FAFB; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${lead.selectedServices.map(service => `
                    <tr>
                      <td style="padding: 4px 0; color: ${COLORS.text}; font-size: 14px;">${service.name}</td>
                      <td style="padding: 4px 0; color: ${COLORS.text}; font-size: 14px; text-align: right; font-weight: 600;">
                        ${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${service.price}
                      </td>
                    </tr>
                  `).join('')}
                  <tr style="border-top: 1px solid #E5E7EB;">
                    <td style="padding: 8px 0 0 0; color: ${COLORS.textLight}; font-size: 14px;">Services Subtotal</td>
                    <td style="padding: 8px 0 0 0; color: ${COLORS.text}; font-size: 14px; text-align: right; font-weight: 600;">
                      ${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${lead.serviceSubtotal || 0}
                    </td>
                  </tr>
                </table>
              </div>
            ` : ''}

            ${lead.planType === 'custom' && lead.selectedAddons && lead.selectedAddons.length > 0 ? `
              <h3 style="color: ${COLORS.primary}; font-size: 16px; font-weight: 600; margin: 16px 0 8px 0;">➕ Selected Add-ons</h3>
              <div style="background-color: #F9FAFB; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${lead.selectedAddons.map(addon => `
                    <tr>
                      <td style="padding: 4px 0; color: ${COLORS.text}; font-size: 14px;">${addon.name}</td>
                      <td style="padding: 4px 0; color: ${COLORS.text}; font-size: 14px; text-align: right; font-weight: 600;">
                        ${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${addon.price}
                      </td>
                    </tr>
                  `).join('')}
                  <tr style="border-top: 1px solid #E5E7EB;">
                    <td style="padding: 8px 0 0 0; color: ${COLORS.textLight}; font-size: 14px;">Add-ons Subtotal</td>
                    <td style="padding: 8px 0 0 0; color: ${COLORS.text}; font-size: 14px; text-align: right; font-weight: 600;">
                      ${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${lead.addonsSubtotal}
                    </td>
                  </tr>
                </table>
              </div>
            ` : ''}

            ${lead.includedServices && lead.includedServices.length > 0 ? `
              <h3 style="color: ${COLORS.primary}; font-size: 16px; font-weight: 600; margin: 16px 0 8px 0;">✅ Included Services</h3>
              <div style="margin-bottom: 16px;">
                ${lead.includedServices.map(service => `
                  <span style="${styles.badge}">${service}</span>
                `).join('')}
              </div>
            ` : ''}

            <div style="background-color: ${COLORS.primary}; color: white; padding: 20px; border-radius: 8px; margin-top: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
                <tr>
                  <td style="font-size: 14px; opacity: 0.9; color: white; vertical-align: middle;">Total Estimated Price</td>
                  <td style="font-size: 24px; font-weight: 700; color: ${COLORS.secondary}; text-align: right; vertical-align: middle;">
                    ${lead.currency === 'EUR' ? '€' : lead.currency === 'USD' ? '$' : '₹'}${lead.totalPrice || lead.priceShown || '0'}
                  </td>
                </tr>
              </table>
              ${lead.pricingFormulaString ? `
                <div style="font-size: 12px; opacity: 0.8; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2);">
                  Breakdown: ${lead.pricingFormulaString}
                </div>
              ` : ''}
            </div>

            ${lead.projectDetails || lead.notes ? `
               <h2 style="${styles.h2}">📝 Additional Notes</h2>
               <p style="${styles.p}; background-color: #F9FAFB; padding: 12px; border-radius: 8px; font-style: italic;">
                 "${lead.projectDetails || lead.notes}"
               </p>
            ` : ''}

            <div style="text-align: center;">
              <a href="mailto:${lead.email}" style="${styles.button}">Reply to Client</a>
            </div>

          </div>

          <!-- Footer -->
          <div style="${styles.footer}">
            <p style="${styles.footerText}">© ${new Date().getFullYear()} GKWebTech. Internal System Notification.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendClientConfirmationMail = async (lead) => {
  const services = resolveServices(lead);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: lead.email,
    subject: `We've received your request! 🚀 — GK WebTech`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="${styles.body}">
        <div style="${styles.container}">
          
          <!-- Header -->
          <div style="${styles.header}">
            <div style="${styles.logo}">
              <span style="${styles.logoAccent}">GKWEBTECH</span>
            </div>
          </div>

          <!-- Content -->
          <div style="${styles.content}">
            <h1 style="${styles.h1}">Hi ${lead.name.split(' ')[0]}, �</h1>
            <p style="${styles.p}">Thank you for reaching out to us! We have successfully received your project inquiry.</p>
            
            <p style="${styles.p}">Our strategy team is currently reviewing your requirements. We specialize in crafting digital experiences that drive growth, and we're excited to see what we can build together.</p>

            <div style="background-color: #F8FAFC; border-radius: 12px; padding: 24px; margin: 32px 0; border: 1px solid #E2E8F0;">
              <h3 style="margin-top: 0; color: ${COLORS.primary};">Your Request Summary</h3>
              
              <div style="margin-bottom: 12px;">
                <span style="color: ${COLORS.textLight}; font-size: 14px;">Selected Plan</span><br>
                <strong style="color: ${COLORS.text}; font-size: 18px;">${lead.selectedPlan || "Custom Growth Plan"}</strong>
              </div>

              <div>
                <span style="color: ${COLORS.textLight}; font-size: 14px;">Services of Interest</span><br>
                <div style="margin-top: 8px;">
                   ${services.map((s) => `<span style="${styles.badge}">${s}</span>`).join("")}
                </div>
              </div>
            </div>

            <h2 style="${styles.h2}">What's Next?</h2>
            <p style="${styles.p}">1. <strong>Review:</strong> Our team will analyze your project needs.</p>
            <p style="${styles.p}">2. <strong>Connect:</strong> A specialist will email you within 24 hours to schedule a discovery call.</p>
            <p style="${styles.p}">3. <strong>Proposal:</strong> We'll present a tailored strategy for your business.</p>

            <div style="text-align: center; margin-top: 32px;">
              <a href="https://gkwebtech.cloud" style="${styles.button}">Visit Our Website</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="${styles.footer}">
            <p style="${styles.footerText}">GKWebTech Digital Marketing Agency</p>
            <p style="${styles.footerText}"><a href="mailto:gajkesariwebtech@gmail.com" style="color: ${COLORS.primary}; text-decoration: none;">gajkesariwebtech@gmail.com</a></p>
            
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
              <p style="color: ${COLORS.textLight}; font-size: 14px; margin-bottom: 16px; font-weight: 500;">Follow us on our socials</p>
              <div style="text-align: center;">
                <a href="https://www.instagram.com/gkweb_tech/" style="display: inline-block; margin: 0 8px; color: ${COLORS.primary}; text-decoration: none; font-weight: 600; font-size: 14px;">Instagram</a>
                <span style="color: #D1D5DB;">|</span>
                <a href="https://www.linkedin.com/company/gk-webtech/" style="display: inline-block; margin: 0 8px; color: ${COLORS.primary}; text-decoration: none; font-weight: 600; font-size: 14px;">LinkedIn</a>
                <span style="color: #D1D5DB;">|</span>
                <a href="https://www.youtube.com/@GK-Web-Tech" style="display: inline-block; margin: 0 8px; color: ${COLORS.primary}; text-decoration: none; font-weight: 600; font-size: 14px;">YouTube</a>
                <span style="color: #D1D5DB;">|</span>
                <a href="https://x.com/gkwtech" style="display: inline-block; margin: 0 8px; color: ${COLORS.primary}; text-decoration: none; font-weight: 600; font-size: 14px;">X</a>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};
