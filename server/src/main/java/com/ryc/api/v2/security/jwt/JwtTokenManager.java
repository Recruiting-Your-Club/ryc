package com.ryc.api.v2.security.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.ryc.api.v2.security.exception.custom.InvalidClaimException;
import com.ryc.api.v2.security.exception.custom.InvalidSignatureException;
import com.ryc.api.v2.security.exception.custom.MalformedTokenException;
import com.ryc.api.v2.security.exception.custom.TokenExpiredException;

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

    final boolean idVerified = adminIdFromToken.equals(authenticatedId);
    final boolean tokenExpired = isTokenExpired(tokenType, token);

    return idVerified && !tokenExpired;
  }

  private boolean isTokenExpired(TokenType tokenType, String token) {
    final Date expirationDateFromToken = getExpirationDateFromToken(tokenType, token);
    return expirationDateFromToken.before(new Date());
  }

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
    } else {
      jwtVerifier =
          JWT.require(Algorithm.HMAC256(jwtProperties.getRefreshToken().getSecretKey().getBytes()))
              .build();
    }

    /**
     * TODO: sub 데이터 오류 시, InvalidClaimException이 발생하지 않고, 부모인 JWTVerificationException이 발생. 내부 동작흐름
     * 파악 필요
     */
    try {
      return jwtVerifier.verify(token);
    } catch (com.auth0.jwt.exceptions.TokenExpiredException e) {
      throw new TokenExpiredException("Token expired", e);
    } catch (com.auth0.jwt.exceptions.SignatureVerificationException e) {
      throw new InvalidSignatureException("Token signature invalid", e);
    } catch (com.auth0.jwt.exceptions.JWTDecodeException e) {
      throw new MalformedTokenException("Token is malformed", e);
    } catch (com.auth0.jwt.exceptions.AlgorithmMismatchException e) {
      throw new MalformedTokenException("Token algorithm mismatch", e);
    } catch (com.auth0.jwt.exceptions.InvalidClaimException e) {
      throw new InvalidClaimException("Invalid claims in token", e);
    } catch (com.auth0.jwt.exceptions.JWTVerificationException e) {
      throw new MalformedTokenException("Token verification failed", e);
    }
  }
}
