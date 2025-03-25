package com.ryc.api.v2.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenManager {
    private final JwtProperties jwtProperties;

    public String generateAccessToken(String email, String userRole) {
        return JWT.create()
                .withSubject(email)
                .withIssuer(jwtProperties.getAccessToken().getIssuer())
                .withClaim("role", userRole)
                .withIssuedAt(new Date())
                .withExpiresAt(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtProperties.getAccessToken().getExpirationMinute() * 60 * 1000))
                .sign(Algorithm.HMAC256(jwtProperties.getAccessToken().getSecretKey().getBytes()));
    }

    public String getEmailFromAccessToken(String accessToken) {
        final DecodedJWT decodedJWT =
                getDecodedJWT(accessToken);
        return decodedJWT.getSubject();
    }

    public boolean validateToken(String accessToken, String authenticatedEmail) {
        final String emailFromToken = getEmailFromAccessToken(accessToken);

        final boolean emailVerified = emailFromToken.equals(authenticatedEmail);
        final boolean tokenExpired = isTokenExpired(accessToken);

        return emailVerified && !tokenExpired;
    }

    private boolean isTokenExpired(String accessToken) {
        final Date expirationDateFromToken = getExpirationDateFromToken(accessToken);
        return expirationDateFromToken.before(new Date());
    }

    private Date getExpirationDateFromToken(String accessToken) {
        final DecodedJWT decodedJWT =
                getDecodedJWT(accessToken);
        return decodedJWT.getExpiresAt();
    }

    private DecodedJWT getDecodedJWT(String accessToken) {
        final JWTVerifier jwtVerifier;
        jwtVerifier =
                JWT.require(Algorithm.HMAC256(jwtProperties.getAccessToken().getSecretKey().getBytes()))
                        .build();

        return jwtVerifier.verify(accessToken);
    }
}
