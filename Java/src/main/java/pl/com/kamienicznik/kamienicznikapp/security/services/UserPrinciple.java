package pl.com.kamienicznik.kamienicznikapp.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.OwnerMeta;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.TenantMeta;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrinciple implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;


    private String username;


    private String email;

    @JsonIgnore
    private String password;

    private int type;
    private TenantMeta user_meta;
    private OwnerMeta company_meta;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(Long id, String username, String password, String email, int type, TenantMeta user_meta, OwnerMeta company_meta,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.type=type;
        this.company_meta=company_meta;
        this.user_meta=user_meta;
    }

    public static UserPrinciple build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());

        return new UserPrinciple(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getType(),
                user.getTenant_meta(),
                user.getOwner_meta(),
                authorities
        );
    }

    public Long getId() {
        return id;
    }



    public String getEmail() {
        return email;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public TenantMeta getUser_meta() {
        return user_meta;
    }

    public void setUser_meta(TenantMeta user_meta) {
        this.user_meta = user_meta;
    }

    public OwnerMeta getOwner_meta() {
        return company_meta;
    }

    public void setCompany_meta(OwnerMeta company_meta) {
        this.company_meta = company_meta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(id, user.id);
    }
}
