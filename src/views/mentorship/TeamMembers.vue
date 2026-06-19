<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">导学团队 - 团队成员信息</div></template>
      <div class="team-header">
        <el-descriptions :column="3" border size="default">
          <el-descriptions-item label="团队名称">智能计算与数据挖掘团队</el-descriptions-item>
          <el-descriptions-item label="导师">李教授</el-descriptions-item>
          <el-descriptions-item label="团队人数">12人</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-table :data="members" stripe size="default" style="margin-top: 16px;">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="studentId" label="学号" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="grade" label="年级" width="80" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }"><el-tag size="small">{{ row.role }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="research" label="研究方向" min-width="200" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column label="操作" width="100">
          <template #default><el-button text type="primary" size="small">查看</el-button></template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const members = ref([
  { studentId: '2023301001', name: '张三', grade: '2023', role: '团队成员', research: '深度学习、图像识别', email: 'zhangsan@example.com' },
  { studentId: '2023301002', name: '李四', grade: '2023', role: '团队骨干', research: '自然语言处理', email: 'lisi@example.com' },
  { studentId: '2024301001', name: '王五', grade: '2024', role: '团队成员', research: '知识图谱', email: 'wangwu@example.com' },
  { studentId: '2024301002', name: '赵六', grade: '2024', role: '团队成员', research: '联邦学习', email: 'zhaoliu@example.com' },
])
</script>
<style scoped>.page-section { max-width: 1100px; }</style>
