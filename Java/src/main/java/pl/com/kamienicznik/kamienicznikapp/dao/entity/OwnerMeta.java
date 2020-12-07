package pl.com.kamienicznik.kamienicznikapp.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "owner_meta")
public class OwnerMeta {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long meta_id;
    private String firstName;
    private String lastName;
    private String accountNumber;
    private String phoneNumber;

    @JsonIgnore
    @OneToOne
    private User user;

    public OwnerMeta() {
    }

    public long getMeta_id() {
        return meta_id;
    }

    public void setMeta_id(long meta_id) {
        this.meta_id = meta_id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
