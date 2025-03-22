package com.ryc.api.v2.util;

import java.util.Comparator;
import java.util.List;

public class SortUtils {
    public static <T> void sortList(List<T> list, Comparator<? super T> comparator) {
        list.sort(comparator);
    }
}
