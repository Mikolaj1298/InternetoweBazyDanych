package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.MessageRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Message;

@Service
public class MessageManager {
    private MessageRepo messageRepo;

    @Autowired
    public MessageManager(MessageRepo messageRepo) {
        this.messageRepo = messageRepo;
    }

    public Message save(Message message) {
        return messageRepo.save(message);
    }
}
