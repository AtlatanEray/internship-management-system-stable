using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace IMSWebAPI.Tools
{
    public class SendMail
    {
        public static void sendPassMail(string body, string mailAddress)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("info@stajproje.com"));
            email.To.Add(MailboxAddress.Parse(mailAddress));
            email.Subject = "Hey Test for YazLab";
            email.Body = new TextPart(TextFormat.Html) { Text = body };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp-relay.sendinblue.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("beneyim@gmail.com", "JFGDxdSUa3XzR1cs");
            smtp.Send(email);

            smtp.Disconnect(true);
        }
    }
}
