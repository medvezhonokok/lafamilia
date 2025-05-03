package ru.lafamilia.backend.model.enums;

import lombok.Getter;

@Getter
public enum LotVariety {
    GEISHA("Geisha"),
    PINK_BOURBON("Pink bourbon"),
    YELLOW_BOURBON("Yellow bourbon"),
    RED_BOURBON("Red bourbon"),
    BOURBON_SIDRA("Bourbon sidra"),
    RUME_SUDAN("Rume Sudán"),
    CATURRA("Caturra"),
    CATURRA_CHIROSO("Caturra chiroso"),
    CASTILLO("Castillo"),
    SL_28("SL 28"),
    LAURINA("Laurina"),
    COLOMBIA("Colombia"),
    JAVA("Java"),
    YIRGACHEFFE("Yirgacheffe");

    private final String displayName;

    LotVariety(String displayName) {
        this.displayName = displayName;
    }

}