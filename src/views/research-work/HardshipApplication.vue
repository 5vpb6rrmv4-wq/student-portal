<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">困难申请</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="困难申请信息管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>新增申请</el-button>
          <el-table :data="hardships" stripe size="default">
            <el-table-column prop="type" label="困难类型" width="120" />
            <el-table-column prop="reason" label="申请原因" min-width="200" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default><el-button text type="primary" size="small">查看</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="助学贷款申请管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>贷款申请</el-button>
          <el-table :data="loans" stripe size="default">
            <el-table-column prop="type" label="贷款类型" width="140" />
            <el-table-column prop="amount" label="贷款金额(元)" width="120" />
            <el-table-column prop="bank" label="贷款银行" width="160" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="120">
              <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
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
import { Plus } from '@element-plus/icons-vue'

const hardships = ref([
  { type: '家庭经济困难', reason: '家庭收入较低，难以承担学费', applyDate: '2025-09-15', status: '已通过' },
])
const loans = ref([
  { type: '国家助学贷款', amount: 12000, bank: '中国银行', applyDate: '2025-09-10', status: '已通过' },
])

function statusType(status) {
  return status === '已通过' ? 'success' : status === '审核中' ? 'warning' : 'info'
}
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
