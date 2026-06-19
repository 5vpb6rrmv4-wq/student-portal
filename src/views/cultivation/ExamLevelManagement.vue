<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">考级管理</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="入学前外语成绩">
          <el-descriptions :column="2" border size="default">
            <el-descriptions-item label="考试类型">CET-6 (大学英语六级)</el-descriptions-item>
            <el-descriptions-item label="考试成绩">568分</el-descriptions-item>
            <el-descriptions-item label="考试日期">2022-12-10</el-descriptions-item>
            <el-descriptions-item label="证书编号">CET62203201001001</el-descriptions-item>
          </el-descriptions>
          <el-button type="primary" size="small" style="margin-top: 12px;">添加成绩记录</el-button>
        </el-tab-pane>
        <el-tab-pane label="外语考试成绩">
          <el-table :data="examRecords" stripe size="default">
            <el-table-column prop="type" label="考试类型" width="160" />
            <el-table-column prop="score" label="成绩" width="100" />
            <el-table-column prop="date" label="考试日期" width="140" />
            <el-table-column prop="certNo" label="证书编号" min-width="180" />
            <el-table-column label="是否达标" width="100">
              <template #default="{ row }"><el-tag :type="row.passed ? 'success' : 'danger'" size="small">{{ row.passed ? '已达标' : '未达标' }}</el-tag></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const examRecords = ref([
  { type: 'CET-6', score: 568, date: '2022-12-10', certNo: 'CET62203201001001', passed: true },
  { type: '研究生学位英语', score: 85, date: '2024-06-15', certNo: '', passed: true },
])
</script>
<style scoped>.page-section { max-width: 800px; }</style>
