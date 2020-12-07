package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.ConversationRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Conversation;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;

import java.util.Optional;

@Service
public class ConversationManager {

    private ConversationRepo conversationRepo;

    @Autowired
    public ConversationManager(ConversationRepo conversationRepo) {
        this.conversationRepo = conversationRepo;
    }

    public Optional<Conversation> findById(Long id) {
        return conversationRepo.findById(id);
    }

    public Iterable<Conversation> findAll() {
        return conversationRepo.findAll();
    }

    public Conversation save(Conversation conversation) {
        return conversationRepo.save(conversation);
    }

    public Conversation findUserIn(Long id, Long userId) {
        Optional<Conversation> actualConversation = conversationRepo.findById(id);
        for (User el:
                actualConversation.get().getUsers()) {
            if (el.getId().equals(userId)) {
                return actualConversation.get();
            }
        }
        return new Conversation();
    }
}
