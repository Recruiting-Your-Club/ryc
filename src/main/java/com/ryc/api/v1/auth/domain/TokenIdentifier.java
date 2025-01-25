package com.ryc.api.v1.auth.domain;

public enum TokenIdentifier {
    ISACCESSTOKEN(true),
    ISREFRESHTOKEN(false);

    private Boolean isAccessToken;

    TokenIdentifier(Boolean isAccessToken) {
        this.isAccessToken = isAccessToken;
    }

    public Boolean getIdentifier() {
        return isAccessToken;
    }

}
