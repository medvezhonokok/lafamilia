package ru.lafamilia.backend.model.enums;

public enum LotProcessing {
    NATURAL("Natural"),
    NATURAL_ANAEROBIC("Natural anaerobic"),
    HONEY("Honey"),
    HONEY_ANAEROBIC("Honey anaerobic"),
    WASHED("Washed"),
    SEMI_WASHED("Semi washed"),
    CULTURING("Culturing");

    private final String displayName;

    LotProcessing(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
