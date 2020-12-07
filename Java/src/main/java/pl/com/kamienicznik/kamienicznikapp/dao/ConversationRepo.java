package pl.com.kamienicznik.kamienicznikapp.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Conversation;

@Repository
public interface ConversationRepo extends CrudRepository<Conversation, Long> {
}
