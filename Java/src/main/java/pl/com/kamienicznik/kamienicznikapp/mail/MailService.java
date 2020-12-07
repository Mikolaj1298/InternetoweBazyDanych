package pl.com.kamienicznik.kamienicznikapp.mail;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
    public class MailService {

        private JavaMailSender javaMailSender; // 1

        public MailService(JavaMailSender javaMailSender) {
            this.javaMailSender = javaMailSender;
        }

        public void sendSimpleEmail(String to, String subject, String content) {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setFrom("Blog Example <from@email.com>");

            msg.setSubject(subject);
            msg.setText(content);

            javaMailSender.send(msg);
        }
        public void sendHtmlEmail(String to, String subject, String content) {
            MimeMessage mail = javaMailSender.createMimeMessage();
            try {
                MimeMessageHelper helper = new MimeMessageHelper(mail, true);
                helper.setTo(to);
                helper.setFrom("Apartimo - aplikacja dla nieruchomosci <system@apartimo.pl>");
                helper.setSubject(subject);
                helper.setText(content, true);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
            javaMailSender.send(mail);
        }

}
