package com.androidnativemodules;

import androidx.annotation.NonNull;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Random;

public class RandomModule extends ReactContextBaseJavaModule {

    public RandomModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public String getName() {
        return "Random";
    }

    @ReactMethod
    public void divideByRandomWithCallbacks(
            int number,
            int divisorBound,
            Callback errorCallback,
            Callback successCallback) {
        Random r = new Random();
        int divisor = r.nextInt(divisorBound);
        try {
            int result = number/divisor;
            successCallback.invoke(divisor,result);
        } catch (ArithmeticException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void divideByRandomPromises(
            int number,
            int divisorBound,
            Promise promise) {
        Random r = new Random();
        int divisor = r.nextInt(divisorBound);
        try {
            int result = number/divisor;

            WritableMap map = Arguments.createMap();
            map.putInt("divisor", divisor);
            map.putDouble("result", result);

            promise.resolve(map);
        } catch (ArithmeticException e) {
            promise.reject("error: ", e);
        }
    }
}
