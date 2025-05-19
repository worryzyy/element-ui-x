# Thinking 思考状态组件

## 功能说明

思考状态组件，用于展示 AI 思考过程的不同状态和内容，支持以下特性：

- 四种思考状态：开始(start)、思考中(thinking)、完成(end)、错误(error)
- 可折叠/展开的内容区域
- 状态图标和标签可自定义
- 自动折叠功能（思考完成后）
- 可配置按钮宽度、动画时长、内容区域样式
- 支持自定义状态内容显示

## 使用示例

### 基础用法

基本的思考状态组件使用，展示不同状态的效果。

:::demo

```vue
<template>
	<div>
		<el-x-thinking status="start" />

		<el-x-thinking
			status="thinking"
			content="正在处理您的请求..."
			style="margin-top: 20px;"
		/>

		<el-x-thinking
			status="end"
			content="思考完成，结果如下：1. 第一点 2. 第二点"
			style="margin-top: 20px;"
		/>

		<el-x-thinking status="error" style="margin-top: 20px;" />
	</div>
</template>
```

:::

### 自定义状态内容

通过插槽自定义不同状态的显示内容。

:::demo

```vue
<template>
	<div>
		<el-x-thinking status="thinking">
			<template #status-icon="{ status }">
				<i v-if="status === 'thinking'" class="el-icon-loading"></i>
			</template>

			<template #label="{ status }">
				{{
					status === 'thinking'
						? 'AI思考中...'
						: status === 'error'
						? '出错了'
						: status === 'end'
						? '已完成'
						: '开始思考'
				}}
			</template>

			<template #content="{ content }">
				<div class="custom-content">
					<pre>{{ content }}</pre>
				</div>
			</template>
		</el-x-thinking>
	</div>
</template>

<style>
.custom-content {
	padding: 10px;
	background: #f5f7fa;
	border-radius: 4px;
}
</style>
```

:::

### 自动折叠功能

配置 autoCollapse 属性，在思考完成后自动折叠内容区域。

:::demo

```vue
<template>
	<div>
		<el-x-thinking
			:status="status"
			auto-collapse
			content="这是一个自动折叠的示例。当状态变为'end'时，内容区域会自动折叠。"
		/>

		<div style="margin-top: 20px;">
			<el-button-group>
				<el-button size="small" @click="status = 'start'">开始</el-button>
				<el-button size="small" @click="status = 'thinking'">思考中</el-button>
				<el-button size="small" @click="status = 'end'">完成</el-button>
			</el-button-group>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			status: 'start'
		}
	}
}
</script>
```

:::

## 属性

| 参数            | 说明                   | 类型    | 默认值    | 可选值                              |
| --------------- | ---------------------- | ------- | --------- | ----------------------------------- |
| content         | 显示的内容文本         | String  | ''        | -                                   |
| modelValue      | 控制内容区域是否展开   | Boolean | true      | -                                   |
| status          | 思考状态               | String  | 'start'   | 'start', 'thinking', 'end', 'error' |
| disabled        | 是否禁用按钮交互       | Boolean | false     | -                                   |
| autoCollapse    | 思考完成后是否自动折叠 | Boolean | false     | -                                   |
| buttonWidth     | 按钮宽度               | String  | '160px'   | -                                   |
| duration        | 动画持续时间           | String  | '0.2s'    | -                                   |
| maxWidth        | 内容区域最大宽度       | String  | '500px'   | -                                   |
| backgroundColor | 内容区域背景色         | String  | '#fcfcfc' | -                                   |
| color           | 内容区域文字颜色       | String  | '#909399' | -                                   |

## 方法

| 方法名       | 说明                 | 参数 | 返回值 |
| ------------ | -------------------- | ---- | ------ |
| changeExpand | 切换内容区域展开状态 | -    | -      |

## 事件

| 事件名          | 说明                         | 回调参数                           |
| --------------- | ---------------------------- | ---------------------------------- |
| change          | 展开状态变化时触发           | { value: Boolean, status: String } |
| update:expanded | 展开状态变化时触发 (v-model) | Boolean                            |
| update:status   | 状态变化时触发 (v-model)     | String                             |

## 插槽

| 插槽名      | 说明               | 作用域参数       |
| ----------- | ------------------ | ---------------- |
| status-icon | 自定义状态图标     | { status }       |
| label       | 自定义状态标签文本 | { status }       |
| arrow       | 自定义展开箭头图标 | -                |
| content     | 自定义内容区域显示 | { content }      |
| error       | 自定义错误状态内容 | { errorContent } |
