package ru.lafamilia.backend.util;

public final class StringUtil {
    private StringUtil() {
        // No operations.
    }

    public static boolean isNullOrEmpty(final String s) {
        return s == null || s.isEmpty();
    }

    public static boolean isNotNullOrEmpty(final String s) {
        return !isNullOrEmpty(s);
    }
}
