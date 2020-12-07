package pl.com.kamienicznik.kamienicznikapp.message.request;

import pl.com.kamienicznik.kamienicznikapp.dao.entity.OwnerMeta;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.TenantMeta;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignUpForm {

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Size(max = 60)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private int type;
    private Set<String> role;
    private OwnerMeta owner_meta;
    private TenantMeta tenant_meta;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }

    public OwnerMeta getOwner_meta() {
        return owner_meta;
    }

    public void setOwner_meta(OwnerMeta owner_meta) {
        this.owner_meta = owner_meta;
    }

    public TenantMeta getTenant_meta() {
        return tenant_meta;
    }

    public void setTenant_meta(TenantMeta tenant_meta) {
        this.tenant_meta = tenant_meta;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "SignUpForm{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", type=" + type +
                ", role=" + role +
                ", owner_meta=" + owner_meta +
                ", tenant_meta=" + tenant_meta +
                '}';
    }
}

