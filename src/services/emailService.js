const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendApprovalEmail = async (request) => {
  const approveLink = `http://localhost:3000/requests/${request.id}/approve-link`;
  const rejectLink = `http://localhost:3000/requests/${request.id}/reject-link`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Approval Required: ${request.title}`,
    html: `
      <h2>New Request Submitted</h2>
      <p><strong>Title:</strong> ${request.title}</p>
      <p><strong>Description:</strong> ${request.description}</p>
      <p><strong>Requested By:</strong> ${request.requestedBy}</p>
      <br />
      <a href="${approveLink}">Approve Request</a>
      <br /><br />
      <a href="${rejectLink}">Reject Request</a>
    `,
  });
};

module.exports = {
  sendApprovalEmail,
};
