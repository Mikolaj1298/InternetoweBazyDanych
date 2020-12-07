package pl.com.kamienicznik.kamienicznikapp.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "conversation")
public class Conversation {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "conversation_users",
            joinColumns = {@JoinColumn(name = "conversation_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    Set<User> users = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "conversation_id", referencedColumnName = "id")
    Set<Message> messages = new HashSet<>();

    public Conversation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void addUsers(User firstParticipant, User secondParticipant) {
        this.users.add(firstParticipant);
        this.users.add(secondParticipant);
    }

    @Override
    public String toString() {
        return "Conversation{" +
                "id=" + id +
                ", messages=" + messages +
                '}';
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

}
