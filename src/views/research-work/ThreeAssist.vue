<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">三助一辅</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="岗位申请信息管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;">申请岗位</el-button>
          <el-table :data="applications" stripe size="default">
            <el-table-column prop="position" label="岗位名称" min-width="160" />
            <el-table-column prop="department" label="设岗部门" min-width="140" />
            <el-table-column prop="type" label="岗位类别" width="100">
              <template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }">
                <el-tag :type="row.status === '已通过' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default><el-button text type="primary" size="small">查看</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="退岗申请信息管理">
          <el-table :data="resignations" stripe size="default">
            <el-table-column prop="position" label="岗位名称" min-width="160" />
            <el-table-column prop="reason" label="退岗原因" min-width="180" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }"><el-tag :type="row.status === '已批准' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default><el-button text type="primary" size="small">查看</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const applications = ref([
  { position: '研究生助教', department: '计算机学院', type: '助教', applyDate: '2026-02-20', status: '已通过' },
  { position: '实验室管理员助理', department: '实验中心', type: '助管', applyDate: '2026-03-01', status: '审核中' },
])
const resignations = ref([
  { position: '图书馆管理员助理', reason: '学业繁忙', applyDate: '2025-12-15', status: '已批准' },
])
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
