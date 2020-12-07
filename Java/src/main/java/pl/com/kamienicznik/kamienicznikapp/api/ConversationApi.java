package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Contract;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Conversation;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Message;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;
import pl.com.kamienicznik.kamienicznikapp.manager.ConversationManager;
import pl.com.kamienicznik.kamienicznikapp.manager.MessageManager;
import pl.com.kamienicznik.kamienicznikapp.manager.UserManager;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;

@RestController
@RequestMapping("api/conversation")
public class ConversationApi {

    private ConversationManager conversationManager;
    private UserManager userManager;
    private MessageManager messageManager;

    @Autowired
    public ConversationApi(ConversationManager conversationManager, UserManager userManager, MessageManager messageManager) {
        this.conversationManager = conversationManager;
        this.userManager = userManager;
        this.messageManager = messageManager;
    }

    @PostMapping("/add")
    public Conversation startConversation(@RequestBody User secondParticipant) {
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User firstParticipant = userManager.findById(up.getId()).get();
        Conversation conversation = new Conversation();

        if (firstParticipant.getId().equals(secondParticipant.getId())) {
            return new Conversation();
        }

        Conversation foundConversation = new Conversation();
        boolean create = true;
        for (Conversation el :
                conversationManager.findAll()) {
            Conversation first_found;
            Conversation second_found;
            if (el.getUsers().size() != 0) {
                first_found = conversationManager.findUserIn(el.getId(), firstParticipant.getId());
                second_found = conversationManager.findUserIn(el.getId(), secondParticipant.getId());
                System.out.println(first_found.getId());
                System.out.println(second_found.getId());
                if (first_found.getId() ==  second_found.getId()) {
                    create = false;
                    foundConversation = first_found;
                    System.out.println("Found" + "\n");
                } else {
                    System.out.println("New conversation" + "\n");
                }
            }
        }
        if (create) {
            conversation.addUsers(userManager.findById(up.getId()).get(),
                    userManager.findById(secondParticipant.getId()).get());
            return this.conversationManager.save(conversation);
        } else {
            return foundConversation;
        }
    }

    @PostMapping("/addMessage")
    public Conversation addMessageToConversation(@RequestBody Message message, @RequestParam Long conversationId) {
        Conversation actualConversation = conversationManager.findById(conversationId).get();
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        message.setUser(userManager.findById(up.getId()).get());
        actualConversation.addMessage(message);
        return conversationManager.save(actualConversation);
    }


}
