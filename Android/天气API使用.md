# 天气API使用
## JavaBean
**Weather.java**
```java
package bean;  
  
public class Weather {  
    String date;            // 日期  
    String week;            // 星期  
    String update_time;     // 更新日期  
    String city;            // 城市  
    String wea;             // 实时天气情况  
    String tem;             // 实时温度  
    String tem1;            // 高温  
    String tem2;            // 低温  
    String win;             // 风向  
    String win_speed;       // 风力等级  
    String win_meter;       // 风速  
    String humidity;        // 湿度  
    String visibility;      // 能见度  
    String pressure;        // 气压  
    String air;             // 空气质量  
    String air_pm25;        // pm2.5  
    String air_level;       // 空气等级  
    String air_tips;        // 提示  
  
    public Weather() {  
    }  
  
    public Weather(String date, String week, String update_time, String city, String wea, String tem, String tem1, String tem2, String win, String win_speed, String win_meter, String humidity, String visibility, String pressure, String air, String air_pm25, String air_level, String air_tips) {  
        this.date = date;  
        this.week = week;  
        this.update_time = update_time;  
        this.city = city;  
        this.wea = wea;  
        this.tem = tem;  
        this.tem1 = tem1;  
        this.tem2 = tem2;  
        this.win = win;  
        this.win_speed = win_speed;  
        this.win_meter = win_meter;  
        this.humidity = humidity;  
        this.visibility = visibility;  
        this.pressure = pressure;  
        this.air = air;  
        this.air_pm25 = air_pm25;  
        this.air_level = air_level;  
        this.air_tips = air_tips;  
    }  
  
    public String getDate() {  
        return date;  
    }  
  
    public void setDate(String date) {  
        this.date = date;  
    }  
  
    public String getWeek() {  
        return week;  
    }  
  
    public void setWeek(String week) {  
        this.week = week;  
    }  
  
    public String getUpdate_time() {  
        return update_time;  
    }  
  
    public void setUpdate_time(String update_time) {  
        this.update_time = update_time;  
    }  
  
    public String getCity() {  
        return city;  
    }  
  
    public void setCity(String city) {  
        this.city = city;  
    }  
  
    public String getWea() {  
        return wea;  
    }  
  
    public void setWea(String wea) {  
        this.wea = wea;  
    }  
  
    public String getTem() {  
        return tem;  
    }  
  
    public void setTem(String tem) {  
        this.tem = tem;  
    }  
  
    public String getTem1() {  
        return tem1;  
    }  
  
    public void setTem1(String tem1) {  
        this.tem1 = tem1;  
    }  
  
    public String getTem2() {  
        return tem2;  
    }  
  
    public void setTem2(String tem2) {  
        this.tem2 = tem2;  
    }  
  
    public String getWin() {  
        return win;  
    }  
  
    public void setWin(String win) {  
        this.win = win;  
    }  
  
    public String getWin_speed() {  
        return win_speed;  
    }  
  
    public void setWin_speed(String win_speed) {  
        this.win_speed = win_speed;  
    }  
  
    public String getWin_meter() {  
        return win_meter;  
    }  
  
    public void setWin_meter(String win_meter) {  
        this.win_meter = win_meter;  
    }  
  
    public String getHumidity() {  
        return humidity;  
    }  
  
    public void setHumidity(String humidity) {  
        this.humidity = humidity;  
    }  
  
    public String getVisibility() {  
        return visibility;  
    }  
  
    public void setVisibility(String visibility) {  
        this.visibility = visibility;  
    }  
  
    public String getPressure() {  
        return pressure;  
    }  
  
    public void setPressure(String pressure) {  
        this.pressure = pressure;  
    }  
  
    public String getAir() {  
        return air;  
    }  
  
    public void setAir(String air) {  
        this.air = air;  
    }  
  
    public String getAir_pm25() {  
        return air_pm25;  
    }  
  
    public void setAir_pm25(String air_pm25) {  
        this.air_pm25 = air_pm25;  
    }  
  
    public String getAir_level() {  
        return air_level;  
    }  
  
    public void setAir_level(String air_level) {  
        this.air_level = air_level;  
    }  
  
    public String getAir_tips() {  
        return air_tips;  
    }  
  
    public void setAir_tips(String air_tips) {  
        this.air_tips = air_tips;  
    }  
  
    @Override  
    public String toString() {  
        return  "date:'" + date + '\n' +  
                "week:'" + week + '\n' +  
                "update_time:'" + update_time + '\n' +  
                "city:'" + city + '\n' +  
                "wea:'" + wea + '\n' +  
                "tem:'" + tem + '\n' +  
                "tem1:'" + tem1 + '\n' +  
                "tem2:'" + tem2 + '\n' +  
                "win:'" + win + '\n' +  
                "win_speed:'" + win_speed + '\n' +  
                "win_meter:'" + win_meter + '\n' +  
                "humidity:'" + humidity + '\n' +  
                "visibility:'" + visibility + '\n' +  
                "pressure:'" + pressure + '\n' +  
                "air:'" + air + '\n' +  
                "air_pm25:'" + air_pm25 + '\n' +  
                "air_level:'" + air_level + '\n' +  
                "air_tips:'" + air_tips + '\n';  
    }  
}
```
## 网络请求工具类
**NetUtil.java**
```java
package utils;  
  
// https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=37526928&appsecret=WwRuJ54O&unescape=1&city=武汉  
  
import java.io.IOException;  
  
import okhttp3.OkHttpClient;  
import okhttp3.Request;  
import okhttp3.Response;  
  
public class NetUtil {  
  
    public static String getWeatherInfo(String url) throws IOException {  
        OkHttpClient okHttpClient = new OkHttpClient();  
        Request request = new Request.Builder().url(url).build();  
        Response response = okHttpClient.newCall(request).execute();  
        return response.body().string();  
    }  
}
```
## 布局
![](assets/Pasted%20image%2020220603200008.png)
**activity_main.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    android:paddingTop="20dp"  
    android:paddingBottom="20dp"  
    android:paddingStart="10dp"  
    android:paddingEnd="10dp"  
  
    tools:context=".MainActivity"  
    android:orientation="vertical">  
  
    <EditText  
        android:id="@+id/city"  
        android:layout_width="match_parent"  
        android:layout_height="wrap_content"/>  
  
    <Button  
        android:layout_width="match_parent"  
        android:layout_height="wrap_content"  
        android:onClick="requestInfo"  
        android:text="获取城市天气" />  
  
    <TextView  
        android:id="@+id/response"  
        android:layout_width="match_parent"  
        android:layout_height="match_parent"  
        android:textSize="20dp" />  
  
</LinearLayout>
```
## 后台
**MainActivity.java**
```java
package com.xiaoxin.weatherapi;  
  
import androidx.annotation.NonNull;  
import androidx.appcompat.app.AppCompatActivity;  
  
import android.os.Bundle;  
import android.os.Handler;  
import android.os.Looper;  
import android.os.Message;  
import android.text.TextUtils;  
import android.util.Log;  
import android.view.View;  
import android.widget.EditText;  
import android.widget.TextView;  
  
  
import com.google.gson.Gson;  
  
import java.io.IOException;  
import java.util.logging.Logger;  
  
import bean.Weather;  
import okhttp3.OkHttpClient;  
import utils.NetUtil;  
  
  
public class MainActivity extends AppCompatActivity {  
    EditText cityEdit;  
    TextView responseEdit;  
    String city;  
    String TAG = "MainActivity";  
  
  
    private Handler mHandler = new Handler(Looper.myLooper()) {  
        @Override  
        public void handleMessage(@NonNull Message msg) {  
            super.handleMessage(msg);  
  
            if (msg.what == 0) {  
                String responseBody = (String)msg.obj;  
                if (responseBody != null && !responseBody.equals("")) {  
                    Gson gson = new Gson();  
                    Weather weather = gson.fromJson(responseBody, Weather.class);  
                    responseEdit.setText(weather.toString());  
                }  
            }  
        }  
    };  
  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        initView();  
    }  
  
    void initView() {  
        cityEdit = findViewById(R.id.city);  
        responseEdit = findViewById(R.id.response);  
    }  
  
    public void requestInfo(View view) {  
        city = cityEdit.getText().toString().trim();  
        if (TextUtils.isEmpty(cityEdit.getText())) {  
            city = "武汉";  
        }  
        getSupportActionBar().setTitle(city + "天气");  
        new Thread(new Runnable() {  
            @Override  
            public void run() {  
  
                Message message = new Message();  
                message.what = 0;  
  
                String url = "https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=37526928&appsecret=WwRuJ54O&unescape=1&city=" + city;  
                try {  
                    message.obj = NetUtil.getWeatherInfo(url);  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
                mHandler.sendMessage(message);  
            }  
        }).start();  
    }  
}
```
## 效果展示
![](assets/天气API的使用.gif)