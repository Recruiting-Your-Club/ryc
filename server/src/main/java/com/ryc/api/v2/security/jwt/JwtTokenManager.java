package com.ryc.api.v2.security.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenManager {
    private final JwtProperties jwtProperties;

    // RFC 7519 - JWT Registered Claims 준수
    public String generateAccessToken(String adminId, String userRole) {
        return JWT.create()
                .withSubject(adminId)
                .withIssuer(jwtProperties.getAccessToken().getIssuer())
                .withClaim("role", userRole)
                .withIssuedAt(new Date())
                .withExpiresAt(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtProperties.getAccessToken().getExpirationMinute() * 60 * 1000))
                .sign(Algorithm.HMAC256(jwtProperties.getAccessToken().getSecretKey().getBytes()));
    }

    public String generateRefreshToken(String adminId, String userRole) {
        return JWT.create()
                .withSubject(adminId)
                .withIssuer(jwtProperties.getRefreshToken().getIssuer())
                .withClaim("role", userRole)
                .withIssuedAt(new Date())
                .withExpiresAt(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtProperties.getRefreshToken().getExpirationMinute() * 60 * 1000))
                .sign(Algorithm.HMAC256(jwtProperties.getRefreshToken().getSecretKey().getBytes()));
    }

    public String getAdminIdFromToken(TokenType tokenType, String token) {
        final DecodedJWT decodedJWT = getDecodedJWT(tokenType, token);
        return decodedJWT.getSubject();
    }

    public boolean validateToken(TokenType tokenType, String token, String authenticatedId) {
        final String adminIdFromToken = getAdminIdFromToken(tokenType, token);

        final boolean emailVerified = adminIdFromToken.equals(authenticatedId);
        final boolean tokenExpired = isTokenExpired(tokenType, token);

        return emailVerified && !tokenExpired;
    }

    private boolean isTokenExpired(TokenType tokenType, String token) {
        final Date expirationDateFromToken = getExpirationDateFromToken(tokenType, token);
        return expirationDateFromToken.before(new Date());
    }

    //TODO: AT/RT 나눠서 수행
    public Date getExpirationDateFromToken(TokenType tokenType, String token) {
        final DecodedJWT decodedJWT = getDecodedJWT(tokenType, token);
        return decodedJWT.getExpiresAt();
    }

    private DecodedJWT getDecodedJWT(TokenType tokenType, String token) {
        JWTVerifier jwtVerifier;

        if (TokenType.ACCESS_TOKEN == tokenType) {
            jwtVerifier =
                    JWT.require(Algorithm.HMAC256(jwtProperties.getAccessToken().getSecretKey().getBytes()))
                            .build();
            return jwtVerifier.verify(token);
        }

        jwtVerifier =
                JWT.require(Algorithm.HMAC256(jwtProperties.getRefreshToken().getSecretKey().getBytes()))
                        .build();

        return jwtVerifier.verify(token);
    }
}
