package com.ryc.api.v2.security.dto;

import com.ryc.api.v2.admin.domain.Admin;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

@Getter
@ToString
@RequiredArgsConstructor
public class CustomUserDetail implements UserDetails, Serializable {
    private final String id;
    private final String username;
    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    private static final String ROLE_PREFIX = "ROLE_";

    public CustomUserDetail(Admin admin) {
        this.id = admin.getId();
        this.username = admin.getName();
        this.email = admin.getEmail();
        this.password = admin.getPassword();
        this.authorities =
                Collections.singleton(new SimpleGrantedAuthority(ROLE_PREFIX + admin.getAdminDefaultRole().name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
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
}
