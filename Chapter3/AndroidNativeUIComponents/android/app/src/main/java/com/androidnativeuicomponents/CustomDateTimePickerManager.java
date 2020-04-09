package com.androidnativeuicomponents;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidnativeuicomponents.view.CustomDateTimePicker;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class CustomDateTimePickerManager extends SimpleViewManager<CustomDateTimePicker> {

    public static final String REACT_CLASS = "CustomDateTimePicker";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected CustomDateTimePicker createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new CustomDateTimePicker(reactContext);
    }

    @ReactProp(name = "format")
    public void setFormat(CustomDateTimePicker view, @Nullable String format) {
        view.setFormat(format);
    }

    @ReactProp(name = "year", defaultInt = 2020)
    public void setYear(CustomDateTimePicker view, int year) {
        view.setYear(year);
    }

    @ReactProp(name = "month", defaultInt = 1)
    public void setMonth(CustomDateTimePicker view, int month) {
        view.setMonth(month);
    }

    @ReactProp(name = "day", defaultInt = 1)
    public void setDay(CustomDateTimePicker view, int day) {
        view.setDay(day);
    }

    @ReactProp(name = "hour", defaultInt = 1)
    public void setHour(CustomDateTimePicker view, int hour) {
        view.setHour(hour);
    }

    @ReactProp(name = "minute", defaultInt = 1)
    public void setMinute(CustomDateTimePicker view, int minute) {
        view.setMinute(minute);
    }

    @ReactProp(name = "second", defaultInt = 1)
    public void setSecond(CustomDateTimePicker view, int second) {
        view.setSecond(second);
    }
}
