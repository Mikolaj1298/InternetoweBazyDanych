package pl.com.kamienicznik.kamienicznikapp.mail;

import org.jtwig.JtwigModel;
import org.jtwig.JtwigTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {

    private MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }


    public String sendSignupEmail(String receiverName, String receiverMail) {
        System.out.println("[MAILER] SignUp mail sent to "+receiverMail+" "+receiverName);
        JtwigTemplate emailTemplate = JtwigTemplate.classpathTemplate("email/email.twig");

        JtwigModel model = JtwigModel.newModel()
                .with("username", receiverName);

        String emailMessage = emailTemplate.render(model);

        mailService.sendHtmlEmail(receiverName+"<"+receiverMail+">", "Hej "+receiverName+", witamy w serwisie Kamienicznik!", emailMessage);

        return "E-mail sent!";
    }
}