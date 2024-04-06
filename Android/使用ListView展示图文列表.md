# 使用ListView展示图文列表

## activity_main.xml
```java
<?xml version="1.0" encoding="utf-8"?>  
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:app="http://schemas.android.com/apk/res-auto"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    tools:context=".MainActivity">  
  
    <ListView  
        android:id="@+id/characterView"  
        android:layout_width="match_parent"  
        android:layout_height="match_parent"  
        app:layout_constraintBottom_toBottomOf="parent"  
        app:layout_constraintLeft_toLeftOf="parent"  
        app:layout_constraintRight_toRightOf="parent"  
        app:layout_constraintTop_toTopOf="parent" />  
  
</androidx.constraintlayout.widget.ConstraintLayout>
```
> - 本布局文件中只有一个布局ListView
> - 该ListView的内容动态填充

## item_layout.xml 
```java
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:app="http://schemas.android.com/apk/res-auto"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent">  
  
    <ImageView  
        android:id="@+id/image"  
        android:layout_width="153dp"  
        android:layout_height="140dp"  
        android:layout_gravity="left"  
        android:layout_weight="1"  
        android:scaleType="centerCrop"  
        android:src="@drawable/ming_ren"  
        tools:ignore="ImageContrastCheck"  
        tools:srcCompat="@tools:sample/avatars" />  
  
    <LinearLayout  
        android:layout_width="wrap_content"  
        android:layout_height="wrap_content"  
        android:orientation="vertical">  
        <TextView  
            android:id="@+id/title"  
            android:layout_width="250dp"  
            android:layout_height="42dp"  
            android:textSize="20dp"  
            android:gravity="center"  
            android:layout_weight="1"  
            android:text="TextView" />  
  
        <TextView  
            android:id="@+id/content"  
            android:layout_width="250dp"  
            android:layout_height="97dp"  
            android:maxLines="4"  
            android:ellipsize="end"  
            android:text="TextView" />  
    </LinearLayout>  
</LinearLayout>
```
![](https://s2.loli.net/2022/05/23/wxBLFYiaD6CklKt.png)
> 每一个item条目的布局文件

## activity_detail.xml 
```java
<?xml version="1.0" encoding="utf-8"?>  
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:app="http://schemas.android.com/apk/res-auto"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    tools:context=".MainActivity">  
  
    <ListView  
        android:id="@+id/characterView"  
        android:layout_width="match_parent"  
        android:layout_height="match_parent"  
        app:layout_constraintBottom_toBottomOf="parent"  
        app:layout_constraintLeft_toLeftOf="parent"  
        app:layout_constraintRight_toRightOf="parent"  
        app:layout_constraintTop_toTopOf="parent" />  
  
</androidx.constraintlayout.widget.ConstraintLayout>
```
> - 详情页布局

## Character类 
```java
public class Character  implements Serializable {  
    private int image;  
    private String title;  
    private String content;  
  
    public int getImage() {  
        return image;  
    }  
  
    public void setImage(int image) {  
        this.image = image;  
    }  
  
    public String getTitle() {  
        return title;  
    }  
  
    public void setTitle(String title) {  
        this.title = title;  
    }  
  
    public String getContent() {  
        return content;  
    }  
  
    public void setContent(String content) {  
        this.content = content;  
    }  
}
```
![](https://s2.loli.net/2022/05/23/ZzMYlt35Tpw6CiP.png)
>-  用于activity之间传递信息

## MainActivity
```java
private void initView() {  
    characterView = findViewById(R.id.characterView);  
}
```
> 绑定控件

```java
void initData() {  
    int[] images =  new int[] {  
        R.drawable.ming_ren,  
        R.drawable.zuo_zu,  
        R.drawable.xiao_ying,  
        R.drawable.jin_ye,  
        R.drawable.wo_ai_luo,  
        R.drawable.you,  
        R.drawable.zhu_jian,  
        R.drawable.shui_meng  
    };  
  
    String[] titles = new String[] {  
            "漩涡鸣人",  
            "宇智波佐助",  
            "春野樱",  
            "中山井野",  
            "我爱罗",  
            "宇智波鼬",  
            "千手柱间",  
            "波风水门"  
    };  
  
    String[] contents = new String[] {  
            "\t\t\t\t漩涡鸣人，日本漫画《火影忍者》及其衍生作品中的男主角。火之国木叶隐村的忍者，第四代火影波风水门和漩涡玖辛奈之子，六道仙人次子阿修罗的查克拉转世者。",  
            "\t\t\t\t宇智波佐助，日本漫画《火影忍者》及其衍生作品中的角色。火之国木叶隐村宇智波一族的天才忍者，六道仙人长子因陀罗的查克拉转世者。",  
            "\t\t\t\t春野樱，日本漫画《火影忍者》及其衍生作品中的女主角。新一代医疗忍者，第五代火影纲手的弟子，与漩涡鸣人、宇智波佐助隶属于旗木卡卡西领导的第七班。",  
            "\t\t\t\t山中井野，日本漫画《火影忍者》及其衍生作品中的女性角色。火之国·木叶隐村的忍者，阿斯玛所领导的第十班的成员，队友是奈良鹿丸和秋道丁次，继承了山中一族的独特秘术心转身之术，能让自己的精神占据对方身体，控制对方内心。同时上进心很强，成功学会医疗忍术。",  
            "\t\t\t\t我爱罗，日本漫画《火影忍者》及其衍生作品中的角色。风之国·砂隐村的第五代风影。四代目风影·罗砂之子。可以自由操控砂子，能任意变化成各种形态进行攻击和防御。",  
            "\t\t\t\t宇智波鼬，日本漫画《火影忍者》及其衍生作品中的角色。火之国木叶隐村宇智波一族的天才忍者，宇智波佐助的哥哥。年幼时他与宇智波止水是挚友，实力强大，擅长使用幻术。为了保护村子免受战乱，同时为了宇智波一族的荣耀之名，被迫接受了木叶高层志村团藏下令的灭族任务，留下了弟弟佐助并刺激他向自己复仇，之后加入晓组织做卧底。最终在与弟弟宇智波佐助的战斗中为佐助注入瞳力后，因身体患有不治之症，体力不支而死亡。",  
            "\t\t\t\t千手柱间，日本漫画《火影忍者》系列及衍生作品中的男性角色, 千手一族的首领，木叶隐村的建立者之一，火之国木叶隐村的初代火影，第二代火影千手扉间的哥哥，六道仙人次子阿修罗的查克拉转世者 [1]  。擅长使用“木遁秘术”，具有操控尾兽的能力；平定乱世，在五影大会中听从扉间以金钱换尾兽的提议将尾兽平均分配给五大国，并在终末之谷一战中打败宇智波斑。",  
            "\t\t\t\t波风水门，日本漫画《火影忍者》系列及衍生作品中的角色。火之国木叶隐村的第四代火影，木叶三忍之一自来也的弟子，主角漩涡鸣人的父亲。实力强大，开发了螺旋丸，为保护村子使用尸鬼封尽封印九尾而牺牲。"  
    };  
  
    data = new ArrayList<>();  
    for (int i = 0; i < images.length; i++) {  
        HashMap<String, Object> character = new HashMap<>();  
        character.put("image", images[i]);  
        character.put("title", titles[i]);  
        character.put("content", contents[i]);  
        data.add(character);  
    }  
}
```
> 初始化数据

```java
public void showCharacter() {  
    SimpleAdapter simpleAdapter = new SimpleAdapter(  
            MainActivity.this,  
            data,  
            R.layout.item_layout,  
            new String[]{"image", "title", "content"},  
            new int[]{R.id.image, R.id.title, R.id.content}  
    );  
  
    characterView.setAdapter(simpleAdapter);  
  
    characterView.setOnItemClickListener(new AdapterView.OnItemClickListener() {  
        @Override  
        public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {  
            Map<String, Object> characterDate = data.get(i);  
            Intent intent = new Intent();  
            intent.setClass(MainActivity.this, DetailActivity.class);  
            Character character = new Character();  
            character.setImage((int)characterDate.get("image"));  
            character.setContent((String)characterDate.get("content"));  
            character.setTitle((String) characterDate.get("title"));  
            intent.putExtra("character", character);  
            startActivity(intent);  
        }  
    });

```

> - 向ListView填充数据
> - 设置点击事件
> - 将点击的item的内容传递给详情页

> [!TIP]
> 给AndroidManifest.xml的==跳转目标的activity==清单加上`android:parentActivityName=".MainActivity"`可以实现返回中activity
> ![](https://s2.loli.net/2022/05/23/Ce4OTfimJKDqQ8X.png)

# 效果展示
![](assets/%E5%8A%A8%E7%94%BB%201.gif)

