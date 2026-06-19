<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">奖助学金</div></template>
      <el-tabs type="border-card">
        <!-- 奖学金申请 -->
        <el-tab-pane label="奖学金申请管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;">新增申请</el-button>
          <el-table :data="scholarships" stripe size="default">
            <el-table-column prop="name" label="奖学金名称" min-width="160" />
            <el-table-column prop="level" label="级别" width="120" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }">
                <el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default>
                <el-button text type="primary" size="small">查看</el-button>
                <el-button text type="danger" size="small">撤回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 个人评优 -->
        <el-tab-pane label="个人评优申请">
          <el-table :data="personalAwards" stripe size="default">
            <el-table-column prop="name" label="评优名称" min-width="160" />
            <el-table-column prop="level" label="级别" width="120" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default>
                <el-button text type="primary" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 班级评优 -->
        <el-tab-pane label="班级评优申请">
          <el-table :data="classAwards" stripe size="default">
            <el-table-column prop="name" label="评优名称" min-width="160" />
            <el-table-column prop="className" label="班级" width="160" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default><el-button text type="primary" size="small">查看</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 证明打印 -->
        <el-tab-pane label="奖学金证明打印">
          <el-table :data="certificates" stripe size="default">
            <el-table-column prop="name" label="奖学金名称" min-width="160" />
            <el-table-column prop="year" label="获奖年度" width="100" />
            <el-table-column label="操作" width="140">
              <template #default><el-button type="primary" size="small">打印证明</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scholarships = ref([
  { name: '国家奖学金', level: '国家级', applyDate: '2026-03-01', status: '审核中' },
  { name: '学业奖学金一等奖', level: '校级', applyDate: '2025-10-15', status: '已通过' },
])
const personalAwards = ref([
  { name: '优秀研究生', level: '校级', applyDate: '2026-04-10', status: '已通过' },
])
const classAwards = ref([
  { name: '优秀班集体', className: '2023级计算机硕士班', applyDate: '2026-04-20', status: '审核中' },
])
const certificates = ref([
  { name: '学业奖学金一等奖', year: '2025' },
  { name: '国家奖学金', year: '2026' },
])

function statusType(status) {
  return status === '已通过' ? 'success' : status === '审核中' ? 'warning' : 'info'
}
</script>
<style scoped>.page-section { max-width: 1100px; }</style>
