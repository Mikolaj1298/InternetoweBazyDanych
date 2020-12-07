package pl.com.kamienicznik.kamienicznikapp.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "apartment")
public class Apartment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long ID;
    private String roomsNumber;
    private int livingArea;
    private int maxLocatorsNumber;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "apartment_users",
        joinColumns = {@JoinColumn(name = "apartment_id")},
        inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    Set<User> users = new HashSet<>();

    public Apartment() {
    }

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public String getRoomsNumber() {
        return roomsNumber;
    }

    public void setRoomsNumber(String roomsNumber) {
        this.roomsNumber = roomsNumber;
    }

    public int getLivingArea() {
        return livingArea;
    }

    public void setLivingArea(int livingArea) {
        this.livingArea = livingArea;
    }

    public int getMaxLocatorsNumber() {
        return maxLocatorsNumber;
    }

    public void setMaxLocatorsNumber(int maxLocatorsNumber) {
        this.maxLocatorsNumber = maxLocatorsNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    @Override
    public String toString() {
        return "Apartment{" +
                "ID=" + ID +
                ", roomsNumber='" + roomsNumber + '\'' +
                ", livingArea=" + livingArea +
                ", maxLocatorsNumber=" + maxLocatorsNumber +
                ", address=" + address +
                '}';
    }
}

