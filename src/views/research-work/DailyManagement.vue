<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header>
        <div class="section-title">
          请销假信息管理
          <el-button type="primary" size="small" @click="showAdd = true"><el-icon><Plus /></el-icon>请假申请</el-button>
        </div>
      </template>
      <el-table :data="leaves" stripe size="default">
        <el-table-column prop="type" label="请假类型" width="120" />
        <el-table-column prop="reason" label="请假事由" min-width="200" />
        <el-table-column prop="startDate" label="开始日期" width="120" />
        <el-table-column prop="endDate" label="结束日期" width="120" />
        <el-table-column prop="days" label="天数" width="70" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === '已批准' ? 'success' : row.status === '审核中' ? 'warning' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleView(row)">查看</el-button>
            <el-button v-if="row.status === '审核中'" text type="warning" size="small" @click="handleCancel(row)">撤销</el-button>
            <el-button v-if="row.status === '已批准'" text type="success" size="small" @click="handleReturn(row)">销假</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="leaves.length" :page-size="10" />
    </el-card>

    <el-dialog v-model="showAdd" title="请假申请" width="500px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="请假类型" required>
          <el-select v-model="form.type" style="width: 100%;">
            <el-option label="事假" value="事假" />
            <el-option label="病假" value="病假" />
            <el-option label="公假" value="公假" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" required><el-date-picker v-model="form.startDate" type="date" style="width: 100%;" /></el-form-item>
        <el-form-item label="结束日期" required><el-date-picker v-model="form.endDate" type="date" style="width: 100%;" /></el-form-item>
        <el-form-item label="请假事由" required><el-input v-model="form.reason" type="textarea" :rows="3" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const leaves = ref([
  { id: 1, type: '事假', reason: '回家探亲', startDate: '2026-05-01', endDate: '2026-05-05', days: 5, status: '已批准' },
  { id: 2, type: '病假', reason: '感冒发烧', startDate: '2026-06-10', endDate: '2026-06-11', days: 2, status: '审核中' },
])

const showAdd = ref(false)
const form = reactive({ type: '事假', startDate: '', endDate: '', reason: '' })

function handleSubmit() {
  ElMessage.success('请假申请提交成功')
  showAdd.value = false
}
function handleView(row) { ElMessage.info(`查看请假: ${row.reason}`) }
function handleCancel(row) { ElMessage.success('已撤销申请') }
function handleReturn(row) { ElMessage.success('销假成功') }
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
