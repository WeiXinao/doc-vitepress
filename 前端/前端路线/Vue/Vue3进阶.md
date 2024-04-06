# Vue3 进阶

## 1. 创建 vue3 项目：基于构建工具 webpack

```bash
vue create 项目名称
```

> [!note]
>
> 1. 基于 webpack 的项目有一个问题，就是编译慢。
> 1. 使用 vite 构建工具
> 1. vite 优势：在开发工程中，大大提升我们的效率
## 2. 创建 vue3 项目：基于 vite

```
npm create vite@latest
cd 'vite根目录'
npm install
npm run dev
```

> [!warning]
>
> 如果选择 vue 的项目，默认版本是 vue3

## 3. vue2 与 vue3 区别

###  3.1 `v-if` 和 `v-for` 的优先级对比

​	2.x 版本中，`v-for` > `v-if`

​	3.x 版本中，`v-if` > `v-for`

### 3.2 v-for 中的 ref 数组

​	vue2.x 会自动把 ref 填充内容

​	vue3.x 需要手动添加

```vue
  <template>
    <div> 
      <ul>
        <li v-for="item in 5" :key = "item" :ref="setItemRef">
          {{ item }}
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  name: 'Demo',

  data() {
    return {
      itemRefs: [],
    };
  },
    
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    }
  },
};
</script>
```

### 3.3 $children

vue2.x：访问当前实例的直接子组件

vue3.x：$children 已被移除，且不再支持。

​	设置：`<Demo ref="hw"/>`

​	访问：`const hw = ref();`

## 4. setup

### 4.1 是什么？ 

​	组合式 API

### 4.2 来解决什么问题？

​	使用（data、computed、methods、watch）组件选项来组织逻辑通常很有效。然而，当我们的组件开始变得更加强大时，	逻辑关注点的列表也会增长。尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解。

> [!attention]
>
> `<script setup></script>` 默认是==异步的==

### 4.3 响应区别：

​	vue2.x : `Object.defineProperty()`

​	vue3.x : `Proxy`

1. `Object.defineProperty()`存在的问题
   1. 不能监听数组的变化
   2. 必须遍历对象的每一个属性
2. `Proxy` 不需要遍历

### 4.4 使用渲染函数：

`ref`：定义数据 ---> 简单类型

`reactive`：定义数据 ---> 复杂类型 

### 4.5 setup 语法糖插件：unplugin-auto-import

解决的场景：在组件中开发无需每次都引入 `import { ref }`

1. 下载安装

   ```
   npm i unplugin-auto-import -D
   ```

2. 配置：vite.config.js 中

   ```js
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import AutoImport from 'unplugin-auto-import/vite'
   
   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [
       vue(),
       AutoImport({
         imports: ['vue', 'vue-router'] // 自动导入 vue 和 vue-router 相关函数
       })
     ],
   })
   ```

### 4.6 toRefs

​	`toRefs` 函数 完成数据的解构

### 4.7 computed

1. ```js
   let msgChange = computed(() => {
     return msg.value.slice(1, 3);
   });
   ```

2. ```js
   let msgChange = computed({
     get() {
       return msg.value.slice(1, 3);
     },
     set() {
       console.log('设置了');
     }
   });
   ```

3. ```js
   let person = reactive({
     name: '张三',
     age: 18,
     str: computed(() => {
       return person.name.slice(1, 2)
     })
   });
   ```

### 4.8 watch

1. 监听一个数据「初始化监听」

   ```vue
   watch(msg, (newVal, oldVal) => {
     console.log(newVal, oldVal);
   }, {
     immediate: true
   });
   ```

2. 监听多个数据「一起监听」

   ```vue
   watch([msg, str], (newVal, oldVal) => {
     console.log(newVal, oldVal);
   }, {
     immediate: true
   });
   ```

3. 监听“对象”中某个属性

   ```vue
   <script setup>
       watch(() => obj.arr, (newVal, oldVal) => {
         console.log(newVal, oldVal);
       }, {
         immediate: true
       });
   </script>
   ```

### 4.9 watchEffect

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```vue
<script setup>
    let obj = reactive({
      a: 1,
      arr: ['a', 'b', 'c']
    });
    
    watchEffect(() => {
      console.log(obj.a);
    });
</script>
```

参考链接：https://cn.vuejs.org/api/reactivity-core.html#watch

### 4.10 组件：父 传 子

1. 父

   ```vue
   <template>
     <div>
       <List :msg="msg" />
     </div>
   </template>
   
   <script setup>
   import List from '../components/List.vue';
   
   let msg = ref('这是父传过去的数据')
   </script>
   ```

2. 子

   ```vue
   <template>
     <div>
       这是子组件 {{ msg }}
     </div>
   </template>
   
   <script setup>
   defineProps({
     msg: {
       type: String,
       default: '111'
     }
   });
   </script>
   ```

### 4.11 组件：子 传 父

1. 子

   ```vue
   <template>
     <div>
       这是子组件 ===> {{ num }}
       <button @click="emitNum">按钮</button>
     </div>
   </template>
   
   <script setup>
   const num = ref(200);
   
   const emit = defineEmits(['fn']);
   
   function emitNum() {
     emit('fn', num);
   }
   
   </script>
   ```

2. 父

   ```vue
   <template>
     <div>
       <List @fn="receiveNum" />
     </div>
   </template>
   
   <script setup>
   import List from '../components/List.vue';
   
   let msg = ref('这是父传过去的数据');
   function receiveNum(num) {
     console.log(num.value);
   }
   </script>
   ```

### 4.12 父子组件双向数据

1. 父

   ```vue
   <List v-model:num="num"/>
   ```

2. 子

   ```vue
   <template>
     <div>
       <List v-model:num="num"/>
     </div>
   </template>
   
   <script setup>
   import List from '../components/List.vue';
   const num = ref(1);
   </script>
   ```

### 4.13 兄弟之间的传值

1. 下载安装

   ```bash
   npm install mitt -S
   ```

2. plugins/bus.js

   ```javascript
   import mitt from 'mitt'
   
   export default mitt();
   ```

3. A 组件

   ```javascript
   emitter.emit('fn', str);
   ```

   B 组件

   ```js
   emitter.on('fn', e => {
   	console.log(e.value);
   	s.value = e.value;
   });
   ```

## 5. 生命周期

### 5.1 选项式

​	`beforeCreate` ...

### 5.2 setup 组合式 API

​	注意：没有 beforeCreate 和 created

​	其他生命周期使用前面加"on"，例如：`onMounted`

## 6. 路由

- 转跳
- 传值
- 导航守卫
- ...

`useRoute` ===> `this.$route`

`useRouter` ===> `this.$router`

## 7. 插槽

匿名插槽

1. 父组件

   ```vue
   <A>
     这是 xxxxx 数据
     这是 yyyyy 数据
   </A>
   ```

2. 子组件

   ```vue
   <header>
     <div>头部</div>
     <slot></slot>
   </header>
   <footer>
     <div>底部</div>
     <slot></slot>
   </footer>
   ```

具名插槽

1. 父组件

   ```vue
   <A>
     <template v-slot:xxx>
       这是 xxxxx 数据
     </template>
     <template v-slot:yyy>
       这是 yyyyy 数据
     </template>
   </A>
   ```

2. 子组件

   ```vue
   <header>
     <div>头部</div>
     <slot name="xxx"></slot>
     <slot name="yyy"></slot>
   </header>
   <footer>
     <div>底部</div>
     <slot name="xxx"></slot>
   </footer>
   ```

简写：`<template v-slot:xxx>` ===> `<template #xxx>`

作用域插槽

1. 父组件

   ```vue
   <template v-slot="{data}">
   	{{ data.name }} ---> {{ data.age }}
   </template>
   ```

2. 子组件

   ```vue
   <ul>
       <li v-for="item in list" :key="item.id">
         <slot :data="item"></slot>
       </li>
   </ul>
   ```

简写：`<template #default="{data}">`

动态插槽：

​	说白了就是通过数据进行切换

父组件

```vue
<template #[str]>
	这是 xxxxx 数据
</template>

<script setup>
	let xxx = ref('###');
</script>
```

## 8.  Teleport : 传送

```vue
<teleport to='#container'></teleport>
<teleport to='.main'></teleport>
<teleport to='body'></teleport>
```

必须传送到有这个 DOM 的内容「顺序」

## 9. 动态组件

```vue
<component :is="动态去切换组件"></component>
```

## 10. 异步组件

参考链接：http://www.vueusejs.com/core/useIntersectionObserver/

### 10.1 使用场景1

​	组件按需导入：当用户访问到组件再去加载该组件

```vue
<template>
  <div ref="target">
    <C v-if="targetIsVisible"></C>
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'

const C = defineAsyncComponent(() => {
  return import('../components/C.vue');
});

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    targetIsVisible.value = isIntersecting
  },
);
</script>
```

### 10.2 使用场景2

```vue
<Suspense>
    <template v-slot:default>
      <A></A>
    </template>
    <template v-slot:fallback>
      加载中...
    </template>
</Suspense>

<script setup>
const C = defineAsyncComponent(() => {
  return import('../components/C.vue');
});
</script>
```

### 10.3 打包分包处理

```bash
npm run build 打包完成后，异步组件有单独的 js 文件，是从主体 js 分包出来的

A.asdaasda.js
C.adsadasd.js
```

## 11. Mixin: 混入

​	是什么：来分发 Vue 组件中的可复用功能

```vue
<template>
  <div>
    <h1>A组件</h1>
    {{ num }} <br>
    <button @click="favBtn">
      {{ fav ? '收藏中...': '收藏' }}
    </button>
  </div>
</template>
<script setup>
import mixin from '../mixins/mixin';
let { num, fav, favBtn } = mixin();
</script>
```

## 12. Project/Inject ==> 依赖注入

​	提供：

```vue
<script setup>
provide('num', num);
</script>
```

注入：

```vue
<template>
  <div>
    <h1>B组件</h1>
    {{ num }}
  </div>
</template>

<script setup>
const num = inject('num');

</script>
```

## 13. Vuex

### 13.1 state

```vue
let num = computed(() => store.state.num);
```

### 13.2 getters

```vue
let total = computed(() => store.getters.total);
```

### 13.3 mutations

```vue
store.commit('changeNum', 300);
```

### 13.4 actions

```vue
store.dispatch('changeBtn');
```

### 13.5 modules

​	和之前版本使用一样

### 13.6 Vuex 持久化存储 「插件」

1. 安装:

   ```bash
   npm install vuex-persisted-states -D
   ```

2. 在 `store/index.js` 中导入：

   ```bash
   import vuexPersistedStates from 'vuex-persisted-states'
   ```

3. 在 `store/index.js` 中配置：

   ```bash
   export default createStore({
     modules: {
       user
     },
     plugins: [vuexPersistedStates({
       key: 'storeInfo',
       paths: ["user"]
     })]  
   });
   ```

## 14. Pinia

### 14.1 Vuex 和 Pinia 的区别

参考网址：https://github.com/vuejs/rfcs/pull/271

大致总结

1. 支持选项式 api 和 组合式 api 写法
2. Pinia 没有 mutations，只有：state、getters、actions
3. Pinia 分模块不需要 mudules（之前 Vuex 分模块需要 modules）
4. TypeScript 支持很好
5. 自动化代码拆分
6. Pinia 体积更小（性能更好）
7. Pinia 可以直接修改 state 数据

### 14.2 Pinia 使用

官方网址：https://pinia.vuejs.org/

1. 安装

   ```bash
   npm install pinia
   ```

2. `main.js` 进行引入

   ```js
   import { createPinia } from 'pinia'
   ```

3. `main.js` 中使用

   ```js
   app.use(createPinia())
   ```

4. `store/index.js` 中配置

   ```js
   import { defineStore } from 'pinia'
   
   export const useStore = defineStore('storeId', {
     // 其他配置...
     state: () => {
       return {
         num: 0,
         name: '张三',
         age: 19
       }
     },
     getters: {},
     actions: {}
   })
   ```

state

1. 引入并实例化

   ```js
   import { useStore } from '../store';
   const store = new useStore();
   ```

2. 解构

   ```vue
   <template>
     <div>
       <h1>A组件</h1>
       {{ num }} <br>
       {{ name }}
     </div>
   </template>
   <script setup>
   import { useStore } from '../store';
   import { storeToRefs } from 'pinia'
   const store = new useStore();
   let { name, num } = storeToRefs(store);  
   </script>
   ```

3. `Pinia` 在组件中可以直接修改 `state`

   ```vue
   <template>
     <div>
       <h1>A组件</h1>
       {{ num }} <br>
       {{ name }}
       <button @click="changeName">修改名称</button>
     </div>
   </template>
   <script setup>
   import { useStore } from '../store';
   import { storeToRefs } from 'pinia'
   const store = new useStore();
   let { name, num } = storeToRefs(store);  
   
   const changeName = () => {
     name.value = '李四'
     num.value = 10 
   }
   
   </script>
   ```

4. 批量更新

   ```js
   // 批量更新
   store.$patch(state => {
       state.num++;
       state.name = '王五'
   });
   ```

getters

​	有缓存

```js
getters: {
    changeNum() {
      console.log('getters');
      return this.num + 1000;
	}
}
```

actions

​	同时支持同步和异步

```js
actions: {
    updateNum(val) {
      console.log(this);
      this.num += val;
    }
}
```

参考链接：https://xuexiluxian.cn/blog/detail/242b0ed71feb412991f04d448fc86636

### 14.3 Pinia 持久化存储 

参考链接：https://xuexiluxian.cn/blog/detail/acebacd99612447e8c80dcf6354240f6

## 15. 设置代理解决跨域问题

参考文章：https://xuexiluxian.cn/blog/detail/01f62baa85b7431992586b4689a9b07a

API参考链接：https://staging-cn.vuejs.org/api/#onmounted

