package com.androidnativeuicomponents.view;

import android.app.DatePickerDialog;
import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.DatePicker;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.androidnativeuicomponents.R;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CustomDateTimePicker extends LinearLayout {

    TextView mTvDateTime;
    final Calendar mCalendar = Calendar.getInstance();
    String mFormat = "dd/MM/yyyy HH:mm:ss";
    DateFormat mFormatter = new SimpleDateFormat(mFormat);

    public String getFormat() {
        return mFormat;
    }

    public void setFormat(String format) {
        if(format==null || format.isEmpty()) {
            return;
        }
        this.mFormat = format;
        try {
            mFormatter = new SimpleDateFormat(format);
            this.mFormat = format;
            if(mTvDateTime!=null && mTvDateTime.getText()!=null && mTvDateTime.getText().length()>0) {
                mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
            }
        } catch (Exception e) {
            mFormatter = new SimpleDateFormat(this.mFormat); //revert format
        }
    }

    public void setYear(int year) {
        mCalendar.set(Calendar.YEAR, year);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public void setMonth(int month) {
        mCalendar.set(Calendar.MONTH, month);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public void setDay(int day) {
        mCalendar.set(Calendar.DAY_OF_MONTH, day);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public void setHour(int hour) {
        mCalendar.set(Calendar.HOUR_OF_DAY, hour);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public void setMinute(int minute) {
        mCalendar.set(Calendar.MINUTE, minute);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public void setSecond(int second) {
        mCalendar.set(Calendar.SECOND, second);
        if(mTvDateTime!=null) {
            mTvDateTime.setText(mFormatter.format(mCalendar.getTime()));
        }
    }

    public CustomDateTimePicker(Context context) {
        super(context);
        init(context,null, 0);
    }

    private void init(Context context, AttributeSet attrs, int defStyle) {
        //Inflate layout
        LayoutInflater.from(context).inflate(R.layout.custom_date_time_picker, this, true);
        mTvDateTime = (TextView) findViewById(R.id.tv_date_time_picker_time);
        mTvDateTime.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                showDateTimePicker(context, mTvDateTime);
            }
        });
    }

    public void showDateTimePicker(Context context, TextView v) {
        new DatePickerDialog(context, new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                mCalendar.set(year, month, day);
                v.setText(mFormatter.format(mCalendar.getTime()));
                new TimePickerDialog(context, new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay, int minute, int second) {
                        mCalendar.set(Calendar.HOUR_OF_DAY, hourOfDay);
                        mCalendar.set(Calendar.MINUTE, minute);
                        mCalendar.set(Calendar.SECOND, second);
                        v.setText(mFormatter.format(mCalendar.getTime()));
                    }
                }, mCalendar.get(Calendar.HOUR_OF_DAY), mCalendar.get(Calendar.MINUTE), mCalendar.get(Calendar.SECOND), true).show();
            }
        }, mCalendar.get(Calendar.YEAR), mCalendar.get(Calendar.MONTH), mCalendar.get(Calendar.DATE)).show();
    }
}
