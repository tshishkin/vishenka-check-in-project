package com.checkin.common;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.NonNull;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;

public class ExtendedBeanPropertySqlParameterSource extends BeanPropertySqlParameterSource {

    private final Map<String, Object> overriddenParams = new HashMap<>();
    protected final BeanWrapper beanWrapper;
    private final Set<String> fixedTypes = new HashSet<>();

    public ExtendedBeanPropertySqlParameterSource(Object object) {
        super(object);
        this.beanWrapper = PropertyAccessorFactory.forBeanPropertyAccess(object);
    }

    private static Object getValue(Object value) {
        if (value == null) {
            return null;
        }
        if (value.getClass().isEnum()) {
            return ((Enum<?>) value).name();
        }
        if (value instanceof List<?> list) {
            if (list.size() > 0 && list.get(0) != null) {
                var firstEl = list.get(0);
                if (firstEl.getClass().isEnum()) {
                    return list.stream().map(o -> ((Enum<?>) o).name()).collect(Collectors.toList());
                } else if (firstEl instanceof String) {
                    return list.stream()
                            .map(el -> el.toString().replaceAll("\u0000", ""))
                            .collect(Collectors.toList());
                }
            }
            return value;
        }
        if (value instanceof BigInteger) {
            return value.toString();
        }
        if (value instanceof String) {
            return value.toString().replaceAll("\u0000", "");
        }
        return value;
    }

    public static ExtendedBeanPropertySqlParameterSource of(Object... pairs) {
        ExtendedBeanPropertySqlParameterSource x =
                new ExtendedBeanPropertySqlParameterSource(new Object());

        for (int i = 0; i < pairs.length; i += 2) x.overrideParam((String) pairs[i], pairs[i + 1]);
        return x;
    }

    @Override
    public int getSqlType(@NonNull String paramName) {
        int sqlType = super.getSqlType(paramName);
        // if (sqlType == Types.BIGINT && !fixedTypes.contains(paramName)) {
        //   fixedTypes.add(paramName);
        //   Class<?> propType = beanWrapper.getPropertyType(paramName);
        //   if (propType.isAssignableFrom(BigInteger.class)) {
        //     registerSqlType(paramName, Types.VARCHAR);
        //     return Types.VARCHAR;
        //   }
        // }
        return sqlType;
    }

    @Override
    public Object getValue(@NonNull String paramName) throws IllegalArgumentException {
        return getValue(
                overriddenParams.containsKey(paramName)
                        ? overriddenParams.get(paramName)
                        : super.getValue(paramName));
    }

    public void overrideParam(String paramName, Object value) {
        overriddenParams.put(paramName, value);
    }

    @Override
    public String @NonNull [] getParameterNames() {
        if (overriddenParams.isEmpty()) {
            return super.getParameterNames();
        } else {
            List<String> paramsToAdd = null;
            String[] originalParams = super.getParameterNames();
            for (String paramName : overriddenParams.keySet()) {
                if (!ArrayUtils.contains(originalParams, paramName)) {
                    if (paramsToAdd == null) {
                        paramsToAdd = new ArrayList<>();
                    }
                    paramsToAdd.add(paramName);
                }
            }
            if (paramsToAdd != null) {
                String[] newParams = new String[originalParams.length + paramsToAdd.size()];
                System.arraycopy(originalParams, 0, newParams, 0, originalParams.length);
                for (int i = 0; i < paramsToAdd.size(); i++) {
                    newParams[originalParams.length + i] = paramsToAdd.get(i);
                }
                return newParams;
            } else {
                return originalParams;
            }
        }
    }

    @Override
    public boolean hasValue(@NonNull String paramName) {
        return super.hasValue(paramName) || overriddenParams.containsKey(paramName);
    }

    public boolean hasValueAssigned(@NonNull String paramName) {
        return hasValue(paramName) && getValue(paramName) != null;
    }

    public boolean isOverriden(@NonNull String paramName) {
        return overriddenParams.containsKey(paramName);
    }
}
